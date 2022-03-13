import {Request, Response} from "express";
import mongoose from "mongoose";
import stripe from '../services/stripe'
import config from "../config/config";
import Stripe from "stripe";
import {
  returnCourtStripeFormat,
  returnStoreStripeFormat,
  returnSubscriptionStripeFormat
} from "../utils/payments/_checkout_helpers";
import {StripeLineItemsFormat, SubInfo, ItemInfo, CourtInfo, StripeMetadata} from "../utils/payments/interfaces";
import {StripePaymentIds} from "../documents/stripe/StripePayment";
import StripePaymentModel from "../models/stripe/stripe-payment.model";
import {updatePaidStatus} from "../utils/payments/_webhook_helpers";
import SubPaymentModel from "../models/subscription/sub-payment.model";
import {User} from "../documents/User";
import {SubPayment} from "../documents/subscription/SubPayment";
import StorePaymentModel from "../models/store/store-payments.model";
import {StorePayments} from "../documents/store/StorePayments";
import StoreConfigModel from "../models/store/store-config.model";
import {receiptMessage} from "../services/sendgrid";


interface ShortPayments {
  _id: string,
  name: string,
  type: string,
  images: string[],
  price: number,
  quantity: number,
  description: string,
}

export async function getAllPayments(req: Request, res: Response) {
  const user: User = res.locals.user
  const subPayments = await SubPaymentModel.findOne({clubCardId: user.clubCardId})
  const storePayments = await StorePaymentModel.findOne({clubCardId: user.clubCardId})
  //TODO courtPayments
  const allPayments: ShortPayments[] = []
  if (subPayments)
    for await (const payment of subPayments.subPayments) {
      if (!payment.paymentInfo.paid)
        allPayments.push({
          _id: payment._id,
          name: payment.subInfo.subType + ' ' + payment.subInfo.subName,
          type: config.payment_type.subscription,
          images: payment.images,
          price: payment.paymentInfo.price,
          quantity: 1,
          description: payment.subInfo.description
        })
    }
  if (storePayments)
    for await (const payment of storePayments.storePayments) {
      if (!payment.paymentInfo.paid)
        allPayments.push({
          _id: payment._id,
          name: payment.itemInfo.name,
          type: config.payment_type.store,
          images: payment.images,
          price: payment.paymentInfo.price,
          quantity: payment.itemInfo.quantity,
          description: payment.itemInfo.description
        })
    }
  // TODO if (courtPayments) ...

  if (!allPayments.length)
    return res.status(200).json(null)
  return res.status(200).json(allPayments)
}

interface PaymentInfo {
  type: string,
  id: string
}

function oneArrayHasAllElementsAnother(one: string[], another: string[]) {
  return one.every(elem => another.includes(elem))
}

async function checkSubPayments(subPays: SubPayment, paymentIdsToDelete: mongoose.Types.ObjectId[], clubCardId: string) {
  const allPayments: string[] = []
  const paymentsToDelete: string[] = []
  if (!subPays.subPayments.length)
    return `Payment not found`
  for await (const payment of subPays.subPayments) {
    if (!payment.paymentInfo.paid)
      allPayments.push(payment._id.toString())
  }
  for await (const paymentToDelete of paymentIdsToDelete) {
    paymentsToDelete.push(paymentToDelete.toString())
  }
  if (!oneArrayHasAllElementsAnother(paymentsToDelete, allPayments))
    return `Some payment not found`


  await SubPaymentModel.updateOne({clubCardId: clubCardId}, {
    $pull: {
      subPayments: {
        "paymentInfo.paid": false,
        _id: {$in: paymentIdsToDelete}
      }
    }
  }, {multi: false})


  return null
}

async function mongooseObjectIdToString(arr: mongoose.Types.ObjectId[]) {
  const new_arr: string[] = []
  for await (const elem of arr) {
    new_arr.push(elem.toString())
  }
  return new_arr
}

async function updateStorePayments(storePays: StorePayments, paymentsIdsToDelete: mongoose.Types.ObjectId[], clubCardId: string) {
  const allPayments: string[] = []
  const paymentsToDelete: string[] = []
  const paymentsForStoreUpdate: { id: mongoose.Types.ObjectId, quantity: number }[] = []
  const paymentsIdsToDeleteStrFormat = await mongooseObjectIdToString(paymentsIdsToDelete)

  if (!storePays.storePayments.length)
    return `Payment not found`
  for await (const payment of storePays.storePayments) {
    if (!payment.paymentInfo.paid)
      allPayments.push(payment._id.toString())
    if (paymentsIdsToDeleteStrFormat.includes(payment._id.toString()))
      paymentsForStoreUpdate.push({id: payment.itemId, quantity: payment.itemInfo.quantity})
  }
  for await (const paymentToDelete of paymentsIdsToDeleteStrFormat) {
    paymentsToDelete.push(paymentToDelete.toString())
  }
  if (!oneArrayHasAllElementsAnother(paymentsToDelete, allPayments))
    return `Some payment not found`

  await StorePaymentModel.updateOne({clubCardId: clubCardId}, {
    $pull: {
      storePayments: {
        "paymentInfo.paid": false,
        _id: {$in: paymentsIdsToDeleteStrFormat}
      }
    }
  }, {multi: false})

  for (const storeItem of paymentsForStoreUpdate)
    await StoreConfigModel.updateOne({_id: storeItem.id}, {$inc: {quantity: storeItem.quantity}})
  return null
}


export async function deletePayments(req: Request, res: Response) {
  const user: User = res.locals.user
  const payments: PaymentInfo[] = req.body.payments

  const [courtIds, storeIds, subIds]: [mongoose.Types.ObjectId[], mongoose.Types.ObjectId[], mongoose.Types.ObjectId[]] = [[], [], []]

  for await (const payment of payments) {
    switch (payment.type) {
      case config.payment_type.subscription:
        subIds.push(mongoose.Types.ObjectId(payment.id))
        break;
      case config.payment_type.court:
        courtIds.push(mongoose.Types.ObjectId(payment.id))
        break;
      case config.payment_type.store:
        storeIds.push(mongoose.Types.ObjectId(payment.id))
        break;
      default:
        return res.status(400).json({msg: `Wrong payment type: ${payment.type}`})
    }
  }
  const finalLength = courtIds.length + storeIds.length + subIds.length

  const allSubPayments = await SubPaymentModel.findOne({clubCardId: user.clubCardId})
  const allStorePayments = await StorePaymentModel.findOne({clubCardId: user.clubCardId})


  if (allSubPayments && allSubPayments.subPayments.length) {
    const subPaymentError = await checkSubPayments(allSubPayments, subIds, user.clubCardId)
    if (subPaymentError)
      return res.status(400).json({msg: subPaymentError})
  }
  if (allStorePayments && allStorePayments.storePayments.length) {
    const updateStorePaymentError = await updateStorePayments(allStorePayments, storeIds, user.clubCardId)
    if (updateStorePaymentError)
      return res.status(400).json({msg: updateStorePaymentError})
  }
  /* TODO  await CourtPaymentModel.updateOne(...)*/

  return res.status(200).json({msg: finalLength > 1 ? 'Payments have been deleted' : 'Payment has been deleted'})

}


//Middleware will validate Body and return found Ids from DB in 'StripeLineItemsFormat'
export async function createCheckoutSession(req: Request, res: Response) {
  const line_items: StripeLineItemsFormat[] = []
  const ids: StripePaymentIds = {
    courtIds: [],
    storeIds: [],
    subIds: []
  }
  const [userClubCardId, subItems, storeItems, courtItems]: [string, SubInfo[] | undefined, ItemInfo[] | undefined, CourtInfo[] | undefined] = [res.locals.user.clubCardId, res.locals.subItems, res.locals.storeItems, res.locals.courtItems]
  if (subItems && subItems.length)
    subItems.forEach(sub => {
      line_items.push(returnSubscriptionStripeFormat(sub))
      ids.subIds.push(mongoose.Types.ObjectId(sub.paymentId))

    })
  if (storeItems && storeItems.length)
    storeItems.forEach(storeItem => {
      line_items.push(returnStoreStripeFormat(storeItem))
      ids.storeIds.push(mongoose.Types.ObjectId(storeItem.paymentId))
    })
  if (courtItems && courtItems.length)
    courtItems.forEach(courtItem => {
      line_items.push(returnCourtStripeFormat(courtItem))
      ids.courtIds.push(mongoose.Types.ObjectId(courtItem.paymentId))
    })


  if (!line_items.length)
    return res.status(400).json({msg: 'No payments were added to the final list'})

  try {
    const stripePayment = new StripePaymentModel({
      userId: userClubCardId,
      ids: ids
    })
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      metadata: {
        clubCardId: userClubCardId,
        paymentId: stripePayment._id.toString()
      },
      mode: "payment",
      line_items: line_items,
      success_url: config.paymentUrls.success_url,
      cancel_url: config.paymentUrls.cancel_url
    })
    await stripePayment.save()
    return res.status(200).json({url: session.url})
  } catch (err) {
    return res.status(400).json({msg: err})
  }
}


export async function webhook(req: Request, res: Response) {
  const stripe_sig = req.headers['stripe-signature'];
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, stripe_sig, String(config.stripe.stripe_webhook_secret))
  } catch (err) {
    // @ts-ignore
    return res.status(400).json({msg: err.message})
  }
  const intent: any = event.data.object
  switch (event.type) {
    case 'payment_intent.succeeded':
      /*      // @ts-ignore
            console.log('succeed receipt url: ' + event.data.object.charges.data[0].receipt_url) // returns valid receipt_url
            // @ts-ignore
            console.log('email: ' + event.data.object.charges.data[0].billing_details.email)
            //@ts-ignore
            console.log('created: ' + event.data.object.charges.data[0].created)
            //@ts-ignore*/
      await receiptMessage(event.data.object.charges.data[0].billing_details.email, event.data.object.charges.data[0].receipt_url, event.data.object.charges.data[0].created)
      break;
    case 'checkout.session.completed':
      const metadata: StripeMetadata = intent.metadata
      const updatePaidStatusError = await updatePaidStatus(metadata)
      if (updatePaidStatusError)
        console.log(updatePaidStatusError) //TODO if error during update - send error to the admin & user
      else
        console.log('Payment completed')
      break;
    case 'payment_intent.payment_failed':
      console.log('payment failed')
      break;
  }
  return res.status(200).json('Webhook works!')
}


import {Request, Response} from "express";
import CourtPaymentsModel from "../models/courts/court-payments.model";
import stripe from '../services/stripe'
import Joi from "joi";
import StorePaymentsModel from "../models/store/store-payments.model";
import {User} from "../documents/user/User";
import {CourtPayments} from "../documents/courts/CourtPayments";
import {StorePayments} from "../documents/store/StorePayments";
import mongoose from "mongoose";
import config from "../config/config";

interface StripePaymentsFormat {
  price_data: {
    currency: string,
    product_data: {
      name: string
    },
    unit_amount: number
  },
  quantity: number
}

const joiPaymentValidation = Joi.object().keys({
  courtPaymentsIds: Joi.array().items(Joi.string()).min(1).optional(),  /*length of array must be > 0 if exists */
  storePaymentsIds: Joi.array().items(Joi.string()).min(1).optional()
})

function returnStripeArrayFormat(name: string, unit_amount: number, quantity) {
  return {
    price_data: {
      currency: 'cad',
      product_data: {
        name: name
      },
      unit_amount: unit_amount
    },
    quantity: quantity
  }
}

async function courtPaymentsArray(_ids: string[]): Promise<[null, string] | [CourtPayments[], null]> {
  // const courtPaymentsStripeFormat: StripePaymentsFormat[] = []
  const courtPayments: CourtPayments[] = []
  for (const id in _ids) {
    const payment = await CourtPaymentsModel.findOne({_id: id, paid: false})
    if (!payment)
      return [null, `Court Payment Id hasn't been found`]
    courtPayments.push(payment)
    //courtPaymentsStripeFormat.push(returnStripeArrayFormat('court', payment.price, 1))
  }
  return [courtPayments, null]
}

async function storePaymentsArray(_ids: string[]): Promise<[null, string] | [StorePayments[], null]> {
  const storePayments: StorePayments[] = []
  for (const id in _ids) {
    const payment = await StorePaymentsModel.findOne({_id: id, paid: false})
    if (!payment)
      return [null, `Store Payment Id hasn't been found`]
    //storePaymentsStripeFormat.push(returnStripeArrayFormat(payment.name, payment.price, payment.quantity))
    storePayments.push(payment)
  }
  return [storePayments, null]
}

export async function payment(req: Request, res: Response) {
  if (!req.body.courtPaymentIds && !req.body.storePaymentIds)
    return res.status(400).json({msg: 'Empty body'})

  const joiBodyValidation = await joiPaymentValidation.validate(req.body)
  if (joiBodyValidation.error)
    return res.status(400).json({msg: joiBodyValidation.error})


  const line_items: StripePaymentsFormat[] = []
  const courtIds_metadata: mongoose.Schema.Types.ObjectId[] = []
  const storeIds_metadata: mongoose.Schema.Types.ObjectId[] = []

  if (req.body.courtPaymentIds) {
    const [courtPayments, courtPaymentsError] = await courtPaymentsArray(req.body.courtPaymentIds)
    if (courtPaymentsError)
      return res.status(400).json({msg: courtPaymentsError})
    if (courtPayments?.length) {
      courtPayments.map(courtPayment => {
        line_items.push(returnStripeArrayFormat('name', courtPayment.price, 1))
        courtIds_metadata.push(courtPayment._id)
      })
    }
  }
  if (req.body.storePaymentIds) {
    const [storePayments, storePaymentsError] = await storePaymentsArray(req.body.storePaymentIds)
    if (storePaymentsError)
      return res.status(400).json({msg: storePaymentsError})
    if (storePayments?.length) {
      storePayments.map(storePayment => {
        line_items.push(returnStripeArrayFormat(storePayment.name, storePayment.price, storePayment.quantity))
        storeIds_metadata.push(storePayment._id)
      })
    }
  }
  if (!line_items.length)
    return res.status(400).json({msg: 'No payments were added to final list'})


  // TODO req.params.items [id: mongoose.objectId, type: string (court or store), quantity]
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    metadata: {
      courtPaymentsIds: courtIds_metadata,
      storePaymentsIds: storeIds_metadata
    },
    mode: "payment",
    line_items: line_items
  })
  return res.status(200).json({url: session.url})
}


/* INTERFACES, FUNCTIONS FOR getAllPayments */
interface ShortCourtPayments {
  _id: string,
  name: string,
  price: number,
  date: string,
  timePeriod: string,
}

interface ShortStorePayments {
  _id: string,
  name: string,
  price: number,
  quantity: number
}

function returnCourtPayments(courtPayments: CourtPayments[]): ShortCourtPayments[] {
  if (!courtPayments.length)
    return []
  return courtPayments.map(court => ({
    _id: court._id,
    name: 'court',
    price: court.price,
    date: court.date,
    timePeriod: `${court.startTime} - ${court.endTime}`
  }))
}

function returnStorePayments(storePayments: StorePayments[]): ShortStorePayments[] {
  if (!storePayments.length)
    return []
  return storePayments.map(storePayment => ({
    _id: storePayment._id,
    name: storePayment.name,
    price: storePayment.price,
    quantity: storePayment.quantity
  }))
}

/* INTERFACES, FUNCTIONS FOR getAllPayments */

export async function getAllPayments(req: Request, res: Response) {
  const user = <User>req.user
  if (!user.profile.memberID)
    return res.status(400).json({msg: 'Wrong user id'})

  const courtPayments = await CourtPaymentsModel.find({_userId: user.profile.memberID, paid: false})
  const storePayments = await StorePaymentsModel.find({_userId: user.profile.memberID, paid: false})


  return res.status(200).json({
    courtPayments: returnCourtPayments(courtPayments),
    storePayments: returnStorePayments(storePayments)
  })
}




export async function webhook(req: Request, res: Response) {
  const stripe_sig = req.headers['stripe-signature'] as string;
  let event;

  try{
    event = stripe.webhooks.constructEvent(req.body.rawBody, stripe_sig, config.stripe_end_point_secret)
  }catch (err){
    return res.status(400).json({msg: 'Error'})
  }
  const intent: any = event.data.object
  switch(event.type){
    case 'payment_intent.succeeded':
    //TODO get metadata courtPaymentsIds & storePaymentsIds, update collection setting paid=true
      break;
    case 'payment_intent.payment_failed':
      return res.status(400).json({msg: 'Payment error'})
  }

}




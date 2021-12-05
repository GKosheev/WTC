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


interface ShortPayments {
    _id: string,
    name: string,
    type: string,
    price: number,
    quantity: number,
    description: string,
}

export async function getAllPayments(req: Request, res: Response) {
    const user: User = res.locals.user
    const subPayments = await SubPaymentModel.findOne({clubCardId: user.clubCardId})
    if (!subPayments)
        return res.status(200).json({msg: 'No payments were found'})

    const allPayments: ShortPayments[] = []
    for await (const payment of subPayments.subPayments) {
        if (!payment.paymentInfo.paid)
            allPayments.push({
                _id: payment._id,
                name: payment.subInfo.subType + ' ' + payment.subInfo.subName,
                type: config.payment_type.subscription,
                price: payment.paymentInfo.price,
                quantity: 1,
                description: payment.subInfo.description
            })
    }
    if (!allPayments.length /* TODO !subPayments.length && !storePayments.length && !courtPayments.length */) {
        return res.status(200).json(null)
    }

    return res.status(200).json(allPayments)
}

interface PaymentInfo {
    type: string,
    id: string
}

function oneArrayHasAllElementsAnother(one: string[], another: string[]) {
    return one.every(elem => another.includes(elem))
}

async function checkSubPayments(subPays: SubPayment, paymentIdsToDelete: mongoose.Types.ObjectId[]) {
    const allPayments: string[] = []
    const paymentsToDelete: string[] = []
    if (!subPays.subPayments.length)
        return `Payment wasn't found`
    for await (const payment of subPays.subPayments) {
        if (!payment.paymentInfo.paid)
            allPayments.push(payment._id.toString())
    }
    for await (const paymentToDelete of paymentIdsToDelete){
        paymentsToDelete.push(paymentToDelete.toString())
    }
    if (!oneArrayHasAllElementsAnother(paymentsToDelete, allPayments))
        return `You can't delete paid payment`
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
    if (!allSubPayments)
        return res.status(400).json({msg: `Payments for user '${user.clubCardId}'  don't exist`})

    const subPaymentError = await checkSubPayments(allSubPayments, subIds)
    if (subPaymentError)
        return res.status(400).json({msg: subPaymentError})

    await SubPaymentModel.updateOne({clubCardId: user.clubCardId}, {
        $pull: {
            subPayments: {
                "paymentInfo.paid": false,
                _id: {$in: subIds}
            }
        }
    }, {multi: false})

    return res.status(200).json({msg: finalLength > 1 ? 'All payments have been deleted' : 'Payment has been deleted'})
    /* TODO
    await CourtPaymentModel.updateOne(...)
    await StorePaymentModel.updateOne(...)
     */


    /*    const allSubPayments = await SubPaymentModel.findOne({clubCardId: user.clubCardId})
        if (!allSubPayments)
            return res.status(400).json({msg: `User with club card Id: ${user.clubCardId}  wasn't found`})
        if (!oneArrayIncludesAnother(subIds, allSubPayments.ids.subIds))*/

    /*
    db.sub_payments.updateOne({clubCardId: "181308"}, {$pull: {subPayments: {"paymentInfo.paid": false, _id: {$in: [ObjectId('61a6474512ab4f917c442502'), ObjectId('61a6476b12ab4f917c442525')]}}}}, {multi: false})
     */

    /*
    {
    items: [{type: string, id: string}]
    }
    */

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
            success_url: 'http://localhost:4200/#/private/user/payments', //TODO success url
            cancel_url: 'https://google.com'  // TODO cancel url
        })
        await stripePayment.save()
        return res.status(200).json({url: session.url})
    } catch (err) {
        return res.status(400).json({msg: err})
    }
}


export async function webhook(req: Request, res: Response) {
    console.log('Webhook works!')
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
            // @ts-ignore
            console.log('succeed receipt url: ' + event.data.object.charges.data[0].receipt_url) // returns valid receipt_url
            //TODO send to user's email intent.receipt_url
            break;
        case 'checkout.session.completed':
            const metadata: StripeMetadata = intent.metadata
            const updatePaidStatusError = await updatePaidStatus(metadata)
            if (updatePaidStatusError)
                console.log(updatePaidStatusError)
            else
                console.log('Payment completed')
            break;
        case 'payment_intent.payment_failed':
            console.log('payment failed')
            break;
    }
    return res.status(200).json('Webhook works!')
}


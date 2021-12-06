import {Request, Response} from "express";
import {SubConfig, SubConfigType} from "../../documents/subscription/SubConfig";
import SubConfigModel from "../../models/subscription/sub-config.model";
import {User} from "../../documents/User";
import SubPaymentModel from "../../models/subscription/sub-payment.model";
import mongoose from "mongoose";


export async function getAllSubscriptions(req: Request, res: Response) {
    const allSubs: SubConfig[] = await SubConfigModel.find({})
    return res.status(200).send(allSubs)
}

interface SubscribeBody {
    subType: string,
    subName: string
}

interface ShortSubPayment {
    images?: string[],
    paymentInfo: {
        price: number,
    },
    subInfo: {
        subType: string,
        subName: string,
        description?: string,
        subStart: string,
        subEnd: string
    },
    subId: mongoose.Schema.Types.ObjectId
}

function initShortSubPayment(sub: SubConfig, subInfo: SubConfigType): ShortSubPayment {
    return {
        images: sub.images,
        subInfo: {
            subType: sub.subType,
            subName: subInfo.name,
            description: subInfo.description,
            subStart: sub.subStart,
            subEnd: sub.subEnd
        },
        paymentInfo: {
            price: subInfo.price,
        },
        subId: sub._id
    }
}

export async function addSubToPayments(req: Request, res: Response) {
    const user: User = res.locals.user
    const body: SubscribeBody = req.body
    const subscription = await SubConfigModel.findOne({subType: body.subType}) //test in mongodb console
    if (!subscription)
        return res.status(400).json({msg: `Sub type '${body.subType}' wasn't found`})
    const subInfo = subscription.subscriptions.find(sub => sub.name === body.subName)
    if (!subInfo)
        return res.status(400).json({msg: `Subscription '${body.subName}' wasn't found`})
    const subPayment = await SubPaymentModel.findOne({clubCardId: user.clubCardId})
    const paymentToAdd: ShortSubPayment = initShortSubPayment(subscription, subInfo)

    if (!subPayment) { // if user have never bought any subscription
        const initNewUser = new SubPaymentModel({
            subPayments: [paymentToAdd]
        })
        initNewUser.clubCardId = user.clubCardId
        await initNewUser.save() //init sub payment with new user
        return res.status(200).json({msg: 'Payment has been inited'})
    }
    await SubPaymentModel.updateOne({clubCardId: user.clubCardId}, {$push: {subPayments: paymentToAdd}})
    return res.status(200).json({msg: 'Payment has been added'})
}

import {NextFunction, Request, Response} from "express";
import SubPaymentModel from "../models/subscription/sub-payment.model";
import {SubInfo} from "../utils/payments/interfaces";
import {User} from "../documents/User";


interface CheckoutSessionBody {
    clubCardId: string,
    subIds?: string[],
    storeIds?: string[],
    courtIds?: string[]
}


export async function checkoutMiddleware(req: Request, res: Response, next: NextFunction) {
    const body: CheckoutSessionBody = req.body
    const user: User = res.locals.user
    if (!body.subIds || !body.subIds.length)
        return next()

    const subsList = body.subIds
    const subPayment = await SubPaymentModel.findOne({clubCardId: user.clubCardId})
    if (!subPayment)
        return res.status(400).json({msg: 'wrong user club card id'})

    const subsInfo: SubInfo[] = []
    subPayment.subPayments.forEach(sub => {
            if (subsList.includes(sub._id.toString()))
                subsInfo.push(
                    {
                        paymentId: sub._id.toString(),
                        description: sub.subInfo.description,
                        images: sub.images,
                        price: sub.paymentInfo.price,
                        subName: sub.subInfo.subName
                    })
        }
    )



    res.locals.clubCardId = user.clubCardId
    res.locals.subItems = subsInfo
    //TODO res.locals.courtItems
    //TODO res.locals.storeItems
    return next()
}

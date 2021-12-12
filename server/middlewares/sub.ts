import {NextFunction, Request, Response} from "express";
import SubConfigModel from "../models/subscription/sub-config.model";
import SubPaymentModel from "../models/subscription/sub-payment.model";
import {User} from "../documents/User";

interface SubscribeBody {
  subType: string,
  subName: string
}

export async function addSubMiddleware(req: Request, res: Response, next: NextFunction) {
  const body: SubscribeBody = req.body
  const user: User = res.locals.user

  const subscription = await SubConfigModel.findOne({subType: body.subType})
  if (!subscription)
    return res.status(400).json({msg: `Sub type '${body.subType}' wasn't found`})
  const subInfo = subscription.subscriptions.find(sub => sub.name === body.subName)
  if (!subInfo)
    return res.status(400).json({msg: `Subscription '${body.subName}' wasn't found`})

  const allSubPayments = await SubPaymentModel.findOne({clubCardId: user.clubCardId})
  if (allSubPayments) {
    const unpaidSubs = allSubPayments.subPayments.filter(payment => payment.paymentInfo.paid === false)
    if (unpaidSubs.length)
      return res.status(400).json({msg: `You already have unpaid subscription`})
  }
  res.locals.subscription = subscription
  res.locals.subInfo = subInfo
  return next()
}

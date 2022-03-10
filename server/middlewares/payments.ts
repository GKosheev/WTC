import {NextFunction, Request, Response} from "express";
import SubPaymentModel from "../models/subscription/sub-payment.model";
import {ItemInfo, SubInfo} from "../utils/payments/interfaces";
import {User} from "../documents/User";
import StorePaymentModel from "../models/store/store-payments.model";


interface CheckoutSessionBody {
  clubCardId: string,
  subIds?: string[],
  storeIds?: string[],
  courtIds?: string[]
}

function ifArrayUndefinedOrEmpty(arr: string[] | undefined): boolean {
  return !arr || !arr.length
}

export async function checkoutMiddleware(req: Request, res: Response, next: NextFunction) {
  const body: CheckoutSessionBody = req.body
  const user: User = res.locals.user
  if (ifArrayUndefinedOrEmpty(body.subIds) && ifArrayUndefinedOrEmpty(body.storeIds) && ifArrayUndefinedOrEmpty(body.courtIds))
    return res.status(400).json({msg: 'No payments were found'})

  const subsList = body.subIds!
  const storeItems = body.storeIds!
  const courtItems = body.courtIds!


  const subsInfo: SubInfo[] = []
  const itemsInfo: ItemInfo[] = []

  if (subsList.length) {
    const subPayment = await SubPaymentModel.findOne({clubCardId: user.clubCardId})
    if (!subPayment)
      return res.status(400).json({msg: 'wrong user club card id'})


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
  }

  if (storeItems.length) {
    const storePayment = await StorePaymentModel.findOne({clubCardId: user.clubCardId})
    if (!storePayment)
      return res.status(400).json({msg: 'wrong user club card id'})
    storePayment.storePayments.forEach(item => {
      if (storeItems.includes(item._id.toString()))
        itemsInfo.push({
          itemName: item.itemInfo.name,
          price: item.paymentInfo.price,
          description: item.itemInfo.description,
          images: item.images,
          quantity: item.itemInfo.quantity,
          paymentId: item._id.toString()
        })
    })
  }


  res.locals.clubCardId = user.clubCardId
  res.locals.subItems = subsInfo
  res.locals.storeItems = itemsInfo
  //TODO res.locals.courtItems
  return next()
}

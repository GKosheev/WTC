import {Request, Response} from "express";
import mongoose from "mongoose";
import StorePaymentModel from "../models/store/store-payments.model";
import {StorePayments} from "../documents/store/StorePayments";
import {User} from "../documents/User";
import config from "../config/config";


export interface StorePurchases {
  _id: string,
  name: string,
  type: string,
  images: string[],
  price: number,
  quantity: number,
  description: string,
  paid: boolean,
  issued: boolean,
  issuedAt: string,
  createdAt: string,
  paidAt: string
}

export async function getAllPurchases(req: Request, res: Response) {
  const user: User = res.locals.user
  const storePayments = await StorePaymentModel.findOne({clubCardId: user.clubCardId})
  const purchases: StorePurchases[] = []
  if (storePayments)
    for await (const payment of storePayments.storePayments) {
      if (payment.paymentInfo.paid)
        purchases.push({
          _id: payment._id,
          name: payment.itemInfo.name,
          type: config.payment_type.store,
          images: payment.images,
          price: payment.paymentInfo.price,
          quantity: payment.itemInfo.quantity,
          description: payment.itemInfo.description ? payment.itemInfo.description : '-',
          paid: payment.paymentInfo.paid,
          issued: payment.itemInfo.issued,
          createdAt: payment.createdAt,
          paidAt: payment.paymentInfo.paidAt,
          issuedAt: payment.paymentInfo.issuedAt
        })
    }
  if (!purchases.length)
    return res.status(200).json(null)
  return res.status(200).json(purchases)
}

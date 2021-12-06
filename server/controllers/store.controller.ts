import {Request, Response} from "express";
import mongoose from "mongoose";
import StoreConfigModel from "../models/store/store-config.model";
import StorePaymentModel from "../models/store/store-payments.model";
import {StoreConfig} from "../documents/store/StoreConfig";
import {User} from "../documents/User";


interface StoreBody {
  _id: string,
  name: string,
  quantity: number
}

interface ShortStorePayment {
  images: string[],
  itemInfo: {
    name: string,
    quantity: number,
    description: string,
  },
  paymentInfo: {
    price: number
  },
  itemId: mongoose.Schema.Types.ObjectId
}


export async function getAllStorePayments(req: Request, res: Response) {
  const allItems: StoreConfig[] = await StoreConfigModel.find({})
  return res.status(200).send(allItems)
}


function initShortStorePayment(itemFromStore: StoreConfig, quantity: number): ShortStorePayment {
  return {
    images: itemFromStore.images,
    itemInfo: {
      name: itemFromStore.name,
      quantity: quantity,
      description: itemFromStore.description
    },
    paymentInfo: {
      price: itemFromStore.price
    },
    itemId: itemFromStore._id,
  }
}


// TODO joi check if item.quantity integer && >0
export async function addItemToStorePayments(req: Request, res: Response) {
  const user: User = res.locals.user
  const item: StoreBody = req.body
  const itemFromStore = await StoreConfigModel.findOne({_id: item._id, name: item.name})
  if (!itemFromStore)
    return res.status(400).json({msg: `Item ${item.name} not found`})
  if (itemFromStore.quantity < item.quantity)
    return res.status(400).json({msg: `You can't buy that amount of items, only ${itemFromStore.quantity}  '${itemFromStore.name}' left`})
  await StoreConfigModel.updateOne({clubCardId: user.clubCardId}, {$set: {quantity: itemFromStore.quantity - item.quantity}})

  const storePayment = await StorePaymentModel.findOne({clubCardId: user.clubCardId})
  const storePaymentToAdd: ShortStorePayment = initShortStorePayment(itemFromStore, item.quantity)
  if (!storePayment) {
    const initNewStorePayment = new StorePaymentModel({
      storePayments: [storePaymentToAdd]
    })
    initNewStorePayment.clubCardId = user.clubCardId
    await initNewStorePayment.save()
    return res.status(200).json({msg: 'Store payment has been inited'})
  }
  await StorePaymentModel.updateOne({clubCardId: user.clubCardId}, {$push: {storePayments: storePaymentToAdd}})
  return res.status(200).json({msg: 'Store payment has been added'})
}


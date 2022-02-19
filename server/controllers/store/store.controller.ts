import {Request, Response} from "express";
import mongoose from "mongoose";
import StoreConfigModel from "../../models/store/store-config.model";
import StorePaymentModel from "../../models/store/store-payments.model";
import {StoreConfig} from "../../documents/store/StoreConfig";
import {User} from "../../documents/User";
import Joi from "joi";


interface StoreBody {
  id: string,
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


export async function getAllStoreItems(req: Request, res: Response) {
  let tag = req.query.tag;
  let allItems: StoreConfig[] = []
  if (tag === 'all')
    allItems = await StoreConfigModel.find({})
  else
    allItems = await StoreConfigModel.find({tags: tag})
  return res.status(200).send(allItems.filter(item => item.quantity > 0))
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

const joiQuantityValidation = Joi.object({

  quantity: Joi.number().integer().required().greater(0).max(5) // quantity must be from 1 to 5
})

export async function addItemToStorePayments(req: Request, res: Response) {

  const user: User = res.locals.user
  const item: StoreBody = req.body

  const quantityValidation = await joiQuantityValidation.validate({quantity: item.quantity})
  if (quantityValidation.error)
    res.status(400).json({msg: quantityValidation.error.message})

  const itemFromStore = await StoreConfigModel.findOne({_id: mongoose.Types.ObjectId(item.id)})
  if (!itemFromStore)
    return res.status(400).json({msg: `Item ${item.name} not found`})
  if (itemFromStore.quantity < item.quantity)
    return res.status(400).json({msg: `You can't buy that amount of items, only ${itemFromStore.quantity}  '${itemFromStore.name}' left`})
  await StoreConfigModel.updateOne({_id: mongoose.Types.ObjectId(item.id)}, {$inc: {quantity: -item.quantity}})
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
  for await (const payment of storePayment.storePayments) {
    if (payment.itemId.toString() === item.id && !payment.paymentInfo.paid) {
      await StorePaymentModel.updateOne({
        clubCardId: user.clubCardId,
        storePayments: {$elemMatch: {itemId: payment.itemId, 'paymentInfo.paid': false}},
      }, {$inc: {'storePayments.$.itemInfo.quantity': item.quantity}})
      return res.status(200).json({msg: 'Item quantity updated'})
    }
  }


  await StorePaymentModel.updateOne({clubCardId: user.clubCardId}, {$push: {storePayments: storePaymentToAdd}})
  return res.status(200).json({msg: 'Store payment has been added'})
}


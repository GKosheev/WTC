import mongoose from "mongoose";


export type StorePayments = mongoose.Document & {
  clubCardId: string,
  storePayments: StoreItem[]
}


export type StoreItem = mongoose.Document & {
  _id: mongoose.Schema.Types.ObjectId,
  images: string[],
  itemInfo: ItemInfo,
  paymentInfo: ItemPaymentInfo,
  itemId: mongoose.Schema.Types.ObjectId, //reference to item id from Store_Config
  createdAt: string,
}

interface ItemInfo {
  name: string,
  quantity: number,
  description: string,
  issued: boolean,
}

interface ItemPaymentInfo {
  price: number,
  paid: boolean,
  paidAt: string,
}

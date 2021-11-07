import mongoose from "mongoose";


export type StorePayments = mongoose.Document & {
  _id: mongoose.Schema.Types.ObjectId,
  _userId: string,
  name: string,
  price: number,
  quantity: number
  paid: boolean,
}

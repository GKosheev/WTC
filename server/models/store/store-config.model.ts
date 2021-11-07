import mongoose from "mongoose"

export type StoreConfig = mongoose.Document & {
  _id: string,
  name: string,
  price: number,
  quantity: number,
  description: string
}

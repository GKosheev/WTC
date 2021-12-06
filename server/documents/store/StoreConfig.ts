import mongoose from "mongoose"

export type StoreConfig = mongoose.Document & {
  _id: mongoose.Types.ObjectId,
  name: string,
  price: number,
  quantity: number,
  images: string[],
  description: string
}

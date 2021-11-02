import mongoose from "mongoose"

export type UserBooking = mongoose.Document & {
  _id: string,
  _userId: mongoose.Schema.Types.ObjectId,
  price: number,
  paid: boolean
  payTime: Date,
  createdAt: Date
}

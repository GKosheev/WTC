import mongoose from "mongoose"

export type UserBooking = mongoose.Document & {
  _id: String,
  _userId: mongoose.Schema.Types.ObjectId,
  price: Number,
  paid: Boolean
  payTime: Date,
  createdAt: Date
}

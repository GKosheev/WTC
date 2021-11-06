import mongoose from "mongoose"

export type UserBooking = mongoose.Document & {
  _id: string,
  _userId: string,
  price: number,
  paid: boolean,
  date: string,
  startTime: string,
  endTime: string,
  payTime: Date,
  createdAt: Date
}

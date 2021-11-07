import mongoose from "mongoose"

export type CourtPayments = mongoose.Document & {
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

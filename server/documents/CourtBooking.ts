import mongoose from "mongoose"

export type CourtBooking = mongoose.Document & {
  _id: string,
  members: mongoose.Schema.Types.ObjectId[],
  guests: mongoose.Schema.Types.ObjectId[],
  courtType: string,
  courtId: number,
  date: string,
  startTime: string,
  endTime: string,
  paid: boolean,
  createdAt: Date,
  createdBy: mongoose.Schema.Types.ObjectId
}



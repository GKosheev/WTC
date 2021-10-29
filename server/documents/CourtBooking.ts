import mongoose from "mongoose"

export type CourtBooking = mongoose.Document & {
  _id: String,
  members: mongoose.Schema.Types.ObjectId[],
  guests: mongoose.Schema.Types.ObjectId[],
  courtType: String,
  courtId: Number,
  date: String,
  startTime: String,
  endTime: String,
  paid: Boolean,
  createdAt: Date,
  createdBy: mongoose.Schema.Types.ObjectId
}



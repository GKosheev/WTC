import mongoose from "mongoose"

export type CourtBooking = mongoose.Document & {
  _id: string,
  members: string[],
  guests: string[],
  courtType: string,
  courtId: number,
  date: string,
  startTime: string,
  endTime: string,
  paid: boolean,
  createdAt: Date,
  createdBy: string
}



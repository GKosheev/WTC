import mongoose from "mongoose";

export interface CourtBooking {
  /*_id: String,*/
  members: mongoose.Schema.Types.ObjectId[],
  guests: mongoose.Schema.Types.ObjectId[],
  courtType: string,
  courtId: number,
  date: string,
  startTime: string,
  endTime: string,
/* paid: Boolean,
 createdAt: Date,*/
  createdBy: string
}

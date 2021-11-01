import mongoose from "mongoose";

export interface CourtBooking {
  /*_id: String,*/
  members: String[],
  guests: String[],
  courtType: String,
  courtId: Number,
  date: String,
  startTime: String,
  endTime: String,
/* paid: Boolean,
 createdAt: Date,*/
  createdBy: String
}

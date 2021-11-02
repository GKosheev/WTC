import mongoose from "mongoose";

export interface CourtBooking {
  /*_id: String,*/
  members: string[],
  guests: string[],
  courtType: string,
  courtId: number,
  date: string,
  startTime: string,
  endTime: string,
/* paid: Boolean,
 createdAt: Date,*/
  createdBy: string
}

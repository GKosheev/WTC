import mongoose from "mongoose";


export type UserBookedCourts = mongoose.Document & {
  _id: string,
  clubCardId: string,
  bookings: CourtBooking[]
}


export type CourtBooking = mongoose.Document & {
  _id: mongoose.Schema.Types.ObjectId,
  courtInfo: CourtInfo,
  paymentInfo: PaymentInfo,
  createdAt: Date
}


export interface CourtInfo {
  courtObjId: string,
  courtType: string,
  courtId: number,
  date: string,
  timePeriod: string,
  canModify: boolean,
  images: string[],
  description: string
}

export interface PaymentInfo {
  price: number,
  paid: boolean,
  paidAt: string
}

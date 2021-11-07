import mongoose from 'mongoose'
import {CourtBooking} from "../../documents/courts/CourtBooking";

let courtBookingSchema = new mongoose.Schema<CourtBooking>({
  members: [{type: mongoose.Schema.Types.ObjectId, required: true, ref: 'UserBooking'}],
  guests: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserBooking'}],
  courtType: {type: String, required: true},
  courtId: {type: Number, required: true},
  date: {type: String, required: true},
  startTime: {type: String, required: true},
  endTime: {type: String, required: true},
  paid: {type: Boolean, required: true, default: false},
  createdAt: {type: Date, required: true, default: Date.now()},
  createdBy: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'}
})
const CourtBookingModel = mongoose.model<CourtBooking>('Courts Booking', courtBookingSchema)
export default CourtBookingModel


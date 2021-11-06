import * as mongoose from 'mongoose'
import {UserBooking} from "../documents/UserBooking";

let userBookingSchema = new mongoose.Schema<UserBooking>({
  _userId: {type: String, required: true},
  price: {type: Number, required: true},
  paid: {type: Boolean, required: true, default: false},
  date: {type: String, required: true},
  startTime: {type: String, required: true},
  endTime: {type: String, required: true},
  payTime: {type: Date},
  createdAt: {type: Date, required: true, default: Date.now()}
})
const UserBookingModel = mongoose.model<UserBooking>('Users Booking', userBookingSchema)
export default UserBookingModel

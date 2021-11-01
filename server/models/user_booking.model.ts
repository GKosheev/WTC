import * as mongoose from 'mongoose'
import {UserBooking} from "../documents/UserBooking";

let userBookingSchema = new mongoose.Schema<UserBooking>({
  _userId: {type: mongoose.Schema.Types.ObjectId, required: true},
  price: {type: Number, required: true},
  paid: {type: Boolean, required: true, default: false},
  payTime: {type: String},
  createdAt: {type: Date, required: true, default: Date.now()}
})
const UserBookingModel = mongoose.model<UserBooking>('Users Booking', userBookingSchema)
export default UserBookingModel

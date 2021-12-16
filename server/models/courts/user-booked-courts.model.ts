import mongoose from "mongoose";
import {UserBookedCourts, CourtBooking} from "../../documents/courts/UserBookedCourts";


const courtBookingSchema = new mongoose.Schema<CourtBooking>({
  courtInfo: {
    courtObjId: {type: mongoose.Schema.Types.ObjectId, required: true},
    courtType: {type: String, required: true},
    courtId: {type: Number, required: true},
    date: {type: String, required: true},
    timePeriod: {type: String, required: true},
    canModify: {type: Boolean, required: true},
    images: [{type: String}],
    description: {type: String}
  },
  paymentInfo: {
    price: {type: Number, required: true},
    paid: {type: Boolean, required: true, default: false},
    paidAt: {type: String, required: true, default: '-'}
  },
  createdAt: {type: Date, required: true, default: Date.now()}
})

const userBookedCourtsSchema = new mongoose.Schema<UserBookedCourts>({
  clubCardId: {type: String, required: true, unique: true},
  bookings: [{type: courtBookingSchema, required: true}]
})

const UserBookedCourtsModel = mongoose.model<UserBookedCourts>('User_Booked_Courts', userBookedCourtsSchema)
export default UserBookedCourtsModel

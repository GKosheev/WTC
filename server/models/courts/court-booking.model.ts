import mongoose from "mongoose";
import {CourtBooking, CourtId, Court, Player} from "../../documents/courts/CourtBooking";


const playerSchema = new mongoose.Schema<Player>({
    _userId: {type: mongoose.Schema.Types.ObjectId, required: true},
    fullName: {type: String, required: true},
    courtPaymentId: mongoose.Schema.Types.ObjectId
}, {_id: false})

const courtSchema = new mongoose.Schema<Court>({
    members: [{type: playerSchema, required: true}],
    guests: [{type: playerSchema}],
    startTime: {type: String, required: true}, // both startTime & endTime config.time_format.momentTimeISOFormat
    endTime: {type: String, required: true},
    createdBy: {type: mongoose.Schema.Types.ObjectId, required: true},
    createdAt: {type: Date, required: true, default: Date.now()}
})

const courtIdSchema = new mongoose.Schema<CourtId>({
    courtId: {type: Number, required: true, unique: true},
    courts: [{type: courtSchema, required: true}]
}, {_id: false})

const courtBookingSchema = new mongoose.Schema<CourtBooking>({
    date: {type: String, required: true, unique: true},   //ISO format from config.time_format.momentDateISOFormat
    courtType: {type: String, required: true},
    courtIds: [{type: courtIdSchema}]
}, {_id: false})


const CourtBookingModel = mongoose.model<CourtBooking>('Court_Payments', courtBookingSchema)
export default CourtBookingModel

import * as mongoose from 'mongoose'
import {CourtPayments} from "../../documents/courts/CourtPayments";

let courtsPaymentsSchema = new mongoose.Schema<CourtPayments>({
  _userId: {type: String, required: true},
  price: {type: Number, required: true},
  paid: {type: Boolean, required: true, default: false},
  date: {type: String, required: true},
  startTime: {type: String, required: true},
  endTime: {type: String, required: true},
  payTime: {type: Date},
  createdAt: {type: Date, required: true, default: Date.now()}
})
const CourtPaymentsModel = mongoose.model<CourtPayments>('Court Payments', courtsPaymentsSchema)
export default CourtPaymentsModel

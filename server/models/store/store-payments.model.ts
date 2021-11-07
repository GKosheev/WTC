import * as mongoose from 'mongoose'
import {StorePayments} from "../../documents/store/StorePayments";

let storePaymentsSchema = new mongoose.Schema<StorePayments>({
  _userId: {type: String, required: true},
  name: {type: String, required: true},
  price: {type: Number, required: true},
  quantity: {type: Number, required: true},
  paid: {type: Boolean, required: true, default: false},
  payDate: {type: Date},
  createdAt: {type: Date, required: true, default: Date.now()}
})

const StorePaymentsModel = mongoose.model<StorePayments>('Store Payments', storePaymentsSchema)
export default StorePaymentsModel

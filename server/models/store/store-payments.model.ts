import mongoose from "mongoose";
import moment from "moment";
import config from "../../config/config";
import {StorePayments, StoreItem} from "../../documents/store/StorePayments";


const storeItemsSchema = new mongoose.Schema<StoreItem>({
  images: [{type: String}],
  itemInfo: {
    name: {type: String, required: true},
    quantity: {type: String, required: true},
    description: {type: String, default: '-'},
    issued: {type: Boolean, required: true, default: false}
  },
  paymentInfo: {
    price: {type: Number, required: true},
    paid: {type: Boolean, required: true, default: false},
    paidAt: {type: String, required: true, default: '-'}
  },
  itemId: {type: mongoose.Schema.Types.ObjectId, required: true},
  createdAt: {
    type: String,
    required: true,
    default: moment(moment.now()).format(config.time_format.momentTimeCustomFullFormat)
  }
})

const storePaymentsModel = new mongoose.Schema<StorePayments>({
  clubCardId: {type: String, required: true, unique: true},
  storePayments: [{type: storeItemsSchema, required: true}]
})

const StorePaymentModel = mongoose.model<StorePayments>('Store_Payments', storePaymentsModel)
export default StorePaymentModel

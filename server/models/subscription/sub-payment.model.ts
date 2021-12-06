import {SubPayment} from "../../documents/subscription/SubPayment";
import mongoose from "mongoose";
import {Subscription} from "../../documents/subscription/SubPayment";
import moment from "moment";
import config from "../../config/config";

const subPaymentSchema = new mongoose.Schema<Subscription>({
  images: [{type: String}],
  subInfo: {
    subType: {type: String, required: true},
    subName: {type: String, required: true},
    description: {type: String, default: '-'},
    subStart: {type: String, required: true},
    subEnd: {type: String, required: true},
  },
  paymentInfo: {
    price: {type: Number, required: true},
    paid: {type: Boolean, required: true, default: false},
    paidAt: {type: String, required: true, default: '-'}
  },
  subId: {type: mongoose.Schema.Types.ObjectId, required: true},
  createdAt: {
    type: String,
    required: true,
    default: moment(moment.now()).format(config.time_format.momentTimeCustomFullFormat)
  }
})

const subscriptionSchema = new mongoose.Schema<SubPayment>({
  clubCardId: {type: String, required: true, unique: true},
  subPayments: [{type: subPaymentSchema, required: true}]
})

const SubPaymentModel = mongoose.model<SubPayment>('Sub_Payments', subscriptionSchema)
export default SubPaymentModel

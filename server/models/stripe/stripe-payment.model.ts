import mongoose from "mongoose";
import {StripePayment} from "../../documents/stripe/StripePayment";

const stripePaymentSchema = new mongoose.Schema<StripePayment>({
    userId: {type: String, required: true},
    ids: {
        courtIds: [{type: mongoose.Schema.Types.ObjectId}],
        storeIds: [{type: mongoose.Schema.Types.ObjectId}],
        subIds: [{type: mongoose.Schema.Types.ObjectId}]
    },
    expiresAt: {type: Date, required: true, default: Date.now(), index: {expires: '25h'}} // Stripe payment id expires in 24 hours
})

const StripePaymentModel = mongoose.model<StripePayment>('Stripe_Payments', stripePaymentSchema)
export default StripePaymentModel

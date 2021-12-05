import mongoose from 'mongoose'

export type StripePayment = mongoose.Document & {
    _id: mongoose.Schema.Types.ObjectId,
    userId: string,
    ids: StripePaymentIds,
    expiresAt: Date,
}

export interface StripePaymentIds {
    courtIds: mongoose.Types.ObjectId[],
    storeIds: mongoose.Types.ObjectId[],
    subIds: mongoose.Types.ObjectId[]
}

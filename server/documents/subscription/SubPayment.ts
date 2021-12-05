import mongoose from "mongoose";


export type SubPayment = mongoose.Document & {
    clubCardId: string, // unique user club card id
    subPayments: Subscription[]
}

export type Subscription = mongoose.Document & {
    _id: mongoose.Schema.Types.ObjectId,
    images: string[],
    subInfo: SubInfo,
    paymentInfo: SubPaymentInfo,
    subId: mongoose.Schema.Types.ObjectId,
    createdAt: Date
}

interface SubPaymentInfo {
    price: number,
    paid: boolean,
    paidAt: Date
}

export interface SubInfo {
    subType: string,
    subName: string,
    description: string,
    subStart: string,
    subEnd: string
}

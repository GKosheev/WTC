import mongoose from "mongoose";

export interface StripeLineItemsFormat {
    price_data: {
        currency: string,
        product_data: {
            name: string,
            description: string,
            images?: string[],
            metadata?: any
        },
        unit_amount: number
    },
    quantity: number
}

export interface SubInfo {
    subName: string,
    description: string,
    images: string[],
    price: number,
    paymentId: string
}

export interface ItemInfo {
    itemName: string,
    price: number,
    description: string,
    images: string[],
    quantity: number
    paymentId: string
}

export interface CourtInfo {
    courtType: string,
    price: number,
    description: string,
    images: string[],
    paymentId: string
}

export interface StripeMetadata {
    clubCardId: string,
    paymentId: mongoose.Types.ObjectId
}

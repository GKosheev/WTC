import mongoose from "mongoose"

export type SubConfig = mongoose.Document & {
    _id: mongoose.Schema.Types.ObjectId,
    subType: string,
    images: string[],
    subStart: string,
    subEnd: string,
    subscriptions: SubConfigType[]
}

export interface SubConfigType {
    name: string,
    price: number,
    description: string
}

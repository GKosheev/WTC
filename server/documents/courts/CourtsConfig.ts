import mongoose from "mongoose";

export type CourtsConfig = mongoose.Document & {
  _id: string,
  description: string,
  images: string[],
  courtType: string,
  courts: CourtList[],
  priceConfigs: PriceConfig[]
}


export interface CourtList {
  courtId: number,
  time: string[]
}

export interface PriceConfig {
  subType: string,
  price: number
}

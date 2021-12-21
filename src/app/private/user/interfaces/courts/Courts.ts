export interface Courts {
  _id: string,
  description: string,
  images: string[],
  courtType: string,
  courts: [{
    courtId: number,
    time: string[]
  }],
  priceConfigs: [{
    subType: string,
    price: number
  }]
}

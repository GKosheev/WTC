export interface SubType {
  _id: string,
  subType: string,
  images: string[],
  subStart: string,
  subEnd: string,
  subscriptions: Sub[]
}

export interface Sub {
  name: string,
  price: number,
  description: string
}

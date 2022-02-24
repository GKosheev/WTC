export interface Purchase {
  _id: string,
  name: string,
  type: string,
  images: string[],
  price: number,
  quantity: number,
  description: string,
  paid: boolean,
  issued: boolean,
  createdAt: string,
  paidAt: string
  issuedAt: string
}

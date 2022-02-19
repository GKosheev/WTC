import mongoose from "mongoose"

export type ItemTag = mongoose.Document & {
  _id: mongoose.Types.ObjectId,
  name: string,
  img?: string,
  createdAt: Date,
  createdBy: string
}

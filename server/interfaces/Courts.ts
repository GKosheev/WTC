import mongoose from "mongoose"
export type Courts = mongoose.Document &{
  courtType: String,
  courtId: Number,
  date: String,
  time: String,
  _userId: mongoose.Schema.Types.ObjectId,
  paid: Boolean,
  bookedType: String
}

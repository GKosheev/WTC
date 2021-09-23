import mongoose from "mongoose"
export type CourtsDocument = mongoose.Document &{
  courtType: String,
  courtId: Number,
  date: String,
  time: String,
  _userId: mongoose.Schema.Types.ObjectId,
  paid: Boolean,
  bookedType: String
}

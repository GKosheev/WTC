import mongoose from "mongoose"

export type CourtsTimeDocument = mongoose.Document &{
  id: number,
  time: String[]
}

export type CourtsConfigDocument = mongoose.Document &{
  courtType: String,
  numberOfCourts: number,
  time: CourtsTimeDocument[],
}

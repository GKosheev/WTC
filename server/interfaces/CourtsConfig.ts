import mongoose from "mongoose"

export type CourtsTimeDocument = mongoose.Document &{
  id: number,
  time: String[]
}

export type CourtsConfig = mongoose.Document &{
  courtType: String,
  numberOfCourts: number,
  time: CourtsTimeDocument[],
}

import mongoose from "mongoose"

export type CourtsConfigDocument = mongoose.Document &{
  courtId: number,
  time: String[]
}

export type CourtsConfig = mongoose.Document &{
  courtType: String,
  courts: CourtsConfigDocument[]
}

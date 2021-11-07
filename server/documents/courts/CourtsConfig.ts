import mongoose from "mongoose"

export type CourtsConfigDocument = mongoose.Document &{
  courtId: number,
  time: string[]
}

export type CourtsConfig = mongoose.Document &{
  courtType: string,
  courts: CourtsConfigDocument[]
}

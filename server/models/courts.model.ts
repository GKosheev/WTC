import * as mongoose from 'mongoose'
import {CourtsDocument} from "../interfaces/CourtsDocument";

let courtsSchema = new mongoose.Schema<CourtsDocument>({
  courtType: {type: String, required: true},
  courtId: {type: Number, required: true},
  date: {type: String, required: true},
  time: {type: String, required: true},
  _userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
  paid: {type: Boolean, required: true},
  bookedType: {type: String, required: true}
})
const Courts = mongoose.model<CourtsDocument>('Courts', courtsSchema)
export default Courts

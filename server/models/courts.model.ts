import * as mongoose from 'mongoose'
import {Courts} from "../documents/Courts";

let courtsSchema = new mongoose.Schema<Courts>({
  courtType: {type: String, required: true},
  courtId: {type: Number, required: true},
  date: {type: String, required: true},
  time: {type: String, required: true},
  _userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
  paid: {type: Boolean, required: true},
  bookedType: {type: String, required: true}
})
const CourtsModel = mongoose.model<Courts>('Courts', courtsSchema)
export default CourtsModel

import mongoose from 'mongoose'
import {CourtsConfigDocument, CourtsConfig} from "../documents/CourtsConfig";

const courtsSchema = new mongoose.Schema<CourtsConfigDocument>({
  courtId: {type: Number, required: true},
  time: [{type: String, required: true}]
})

const courtsConfigSchema = new mongoose.Schema<CourtsConfig>({
  courtType: {type: String, required: true, unique: true},
  courts: [{type: courtsSchema, required: true}]
})
const CourtsConfigModel = mongoose.model<CourtsConfig>('Courts Config', courtsConfigSchema)
export default CourtsConfigModel

import mongoose from "mongoose";
import {CourtsConfig} from "../../documents/courts/CourtsConfig";


const courtsConfigSchema = new mongoose.Schema<CourtsConfig>({
  description: {type: String, default: '-'},
  images: [{type: String}],
  courtType: {type: String, required: true, unique: true},
  courts: [{
    courtId: {type: Number, required: true}, // unique: true?
    time: [{type: String, required: true}],
  }],
  priceConfigs: {
    subType: {type: String, required: true},
    price: {type: Number, required: true}
  }
})

const CourtsConfigModel = mongoose.model<CourtsConfig>('Courts_Config', courtsConfigSchema)
export default CourtsConfigModel

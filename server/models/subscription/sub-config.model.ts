import mongoose from "mongoose";
import {SubConfig, SubConfigType} from "../../documents/subscription/SubConfig";


const subscriptionSchema = new mongoose.Schema<SubConfigType>({
  name: {type: String, required: true},
  price: {type: Number, required: true},
  description: {type: String}
})

const subConfigSchema = new mongoose.Schema<SubConfig>({
  subType: {type: String, required: true, unique: true},
  images: [{type: String}],
  subStart: {type: String, required: true},
  subEnd: {type: String, required: true},
  subscriptions: [{type: subscriptionSchema, required: true}]
})

const SubConfigModel = mongoose.model<SubConfig>('Sub_Config', subConfigSchema)
export default SubConfigModel



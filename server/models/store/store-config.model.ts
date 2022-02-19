import mongoose from "mongoose";
import {StoreConfig} from "../../documents/store/StoreConfig";

const storeConfigSchema = new mongoose.Schema<StoreConfig>({
  name: {type: String, required: true},
  price: {type: Number, required: true},
  quantity: {type: Number, required: true},
  images: [{type: String}],
  description: {type: String},
  tags: [{type: String}]
})

const StoreConfigModel = mongoose.model<StoreConfig>('Store_Config', storeConfigSchema)
export default StoreConfigModel

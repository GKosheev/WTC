import mongoose from "mongoose";
import {StoreConfig} from "../../models/store/store-config.model";

let storeConfigSchema = new mongoose.Schema<StoreConfig>({
  name: {type: String, required: true},
  price: {type: Number, required: true},
  quantity: {type: Number, required: true},
  description: {type: String, required: true}
})

const StoreConfigModel = mongoose.model<StoreConfig>('Store Config', storeConfigSchema)
export default StoreConfigModel

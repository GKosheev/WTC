import mongoose from "mongoose";
import {ItemTag} from "../../documents/store/ItemTag";

const itemTagSchema = new mongoose.Schema<ItemTag>({
  name: {type: String, required: true, unique: true},
  img: {type: String},
  createdAt: {type: Date, required: true, default: Date.now()},
  createdBy: {type: String, required: true}
})

const ItemTagModel = mongoose.model<ItemTag>('Item_Tags', itemTagSchema)
export default ItemTagModel

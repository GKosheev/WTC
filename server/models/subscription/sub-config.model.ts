import mongoose from "mongoose";
import {SubConfig} from "../../documents/subscription/SubConfig";


const subConfigSchema = new mongoose.Schema<SubConfig>({
    subType: {type: String, required: true, unique: true},
    images: [{type: String}],
    subStart: {type: String, required: true},
    subEnd: {type: String, required: true},
    subscriptions: [{
        name: {type: String, required: true, unique: true},
        price: {type: Number, required: true},
        description: {type: String}
    }]
})

const SubConfigModel = mongoose.model<SubConfig>('Sub_Config', subConfigSchema)
export default SubConfigModel



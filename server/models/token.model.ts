import * as mongoose from 'mongoose'
import {TokenDocument} from "../interfaces/TokenDocument";
import moment from 'moment-timezone';


let tokenSchema = new mongoose.Schema<TokenDocument>({
  _userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
  token: {type: String, required: true},
  expireAt: {type: Date, default: moment.tz("Canada/Eastern").format(), index: {expires: '1h'}}
})
const Token = mongoose.model<TokenDocument>('Token', tokenSchema)
export default Token

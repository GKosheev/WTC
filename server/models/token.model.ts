import * as mongoose from 'mongoose'
import {Token} from "../documents/Token";
import moment from 'moment-timezone';


let tokenSchema = new mongoose.Schema<Token>({
  _userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
  token: {type: String, required: true},
  expireAt: {type: Date, default: moment.tz("Canada/Eastern").format(), index: {expires: '1h'}}
})
const TokenModel = mongoose.model<Token>('Token', tokenSchema)
export default TokenModel

import mongoose from "mongoose";
export type TokenDocument = mongoose.Document &{
    _userId: mongoose.Schema.Types.ObjectId,
    token: String,
    expireAt: Date
}

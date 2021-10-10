import mongoose from "mongoose";
export type Token = mongoose.Document &{
    _userId: mongoose.Schema.Types.ObjectId,
    token: String,
    expireAt: Date
}

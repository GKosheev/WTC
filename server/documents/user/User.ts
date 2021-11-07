import {UserProfile} from "./UserProfile";
import mongoose from "mongoose";

export type User = mongoose.Document & {
  _id: mongoose.Schema.Types.ObjectId,
  profile: UserProfile,
  securityQuestion: string,
  securityAnswer: string,
  clubPolicy: string,
  privacyPolicy: string,
  covidPolicy: string,
  hashedPassword: string,
  createdAt: Date,
  roles: string[],
  isVerified: boolean
}

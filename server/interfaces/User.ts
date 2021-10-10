import {UserProfile} from "./UserProfile";
import mongoose from "mongoose";

/*
export interface User {
  _id: String,
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
*/

export type User = mongoose.Document & {
  _id: String,
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

import {UserProfileDocument} from "./UserProfileDocument";
import mongoose from 'mongoose'

export type UserDocument = mongoose.Document & {
  _id: String,
  profile: UserProfileDocument,
  securityQuestion:string,
  securityAnswer: string,
  clubPolicy: string,
  privacyPolicy: string,
  covidPolicy: string,
  hashedPassword: string,
  createdAt: Date,
  roles: string[]
}

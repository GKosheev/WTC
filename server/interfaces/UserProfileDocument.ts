import mongoose from "mongoose";
export type UserProfileDocument = mongoose.Document &{
  firstName: string,
  lastName: string,
  email: string,
  registrationType: string,
  phone: string,
  gender: string,
  dateOfBirth: Date,
  memberID: string,
  twitter: string,
  instagram: string,
  facebook: string,
  receiveClubEmails: boolean,
  shareMyEmail: boolean,
  rating: string
}

import mongoose from "mongoose"

export type User = mongoose.Document & {
  _id: mongoose.Schema.Types.ObjectId,
  clubCardId: string,
  roles: string[],
  wallet: number,
  subscription: Subscription,
  profile: Profile,
  agreements: Agreements,
  private: Private,
  isVerified: boolean,
  createdAt: Date
}

interface Subscription {
  type: string,
  subStart: string,
  subEnd: string,
  price: string,
  paidAt: Date,
}

interface Profile {
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  rating: string,
  gender: string,
  dateOfBirth: Date,
  receiveClubEmails: boolean,
  shareMyEmail: boolean,
  shareMyPhone: boolean,
  twitter: string,
  instagram: string,
  facebook: string
}


interface Agreements {
  privacyPolicy: string,
  covidPolicy: string,
  clubPolicy: string
}

interface Private {
  secureQuestion: string,
  secureAnswer: string,
  hashedPassword: string
}

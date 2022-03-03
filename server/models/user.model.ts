import mongoose from "mongoose";
import {User} from "../documents/User";
import regExp from "../config/regExp";
import config from "../config/config";

const userSchema = new mongoose.Schema<User>({
  clubCardId: {type: String, required: true, unique: true},
  isVerified: {type: Boolean, required: true, default: false},
  roles: [{type: String}],
  wallet: {type: Number, required: true, default: 0.0},
  subscription: {
    type: {type: String, required: true, default: config.roles.nonMember},
    subStarts: {type: String, required: true, default: '-'},
    subEnds: {type: String, required: true, default: '-'},
    price: {type: String, required: true, default: '-'},
    paidAt: {type: String, required: true, default: '-'}
  },
  profile: {
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {
      type: String,
      required: true,
      unique: true,
      match: regExp.email
    },
    phone: {type: String, required: true},
    rating: {type: String, required: true, default: '-'},
    gender: {type: String, required: true},
    dateOfBirth: {type: Date, required: true},
    receiveClubEmails: {type: Boolean, required: true, default: false},
    shareMyEmail: {type: Boolean, required: true, default: false},
    shareMyPhone: {type: Boolean, required: true, default: false},
    twitter: {type: String, default: '-'},
    instagram: {type: String, default: '-'},
    facebook: {type: String, default: '-'},
    img: {type: String, default: '-'}
  },
  agreements: {
    privacyPolicy: {type: String, required: true},
    covidPolicy: {type: String, required: true},
    clubPolicy: {type: String, required: true}
  },
  private: {
    secureQuestion: {type: String, required: true},
    secureAnswer: {type: String, required: true},
    hashedPassword: {type: String, required: true}
  }
})
const UserModel = mongoose.model<User>('User', userSchema)
export default UserModel

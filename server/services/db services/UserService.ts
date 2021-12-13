import {User} from "../../documents/User";
import UserModel from "../../models/user.model";
import mongoose from "mongoose";
import {UserRegisterInput} from "../../interfaces/auth/UserRegisterInput";
import bcrypt from "bcrypt";
import config from "../../config/config";
import {SubPayment} from "../../documents/subscription/SubPayment";


async function generateClubCardId(): Promise<string> {
  let randomNumber = (Math.random() * (999999 - 100000 + 1) | 0) + 100000
  let user = await UserModel.findOne({clubCardId: randomNumber.toString()})
  if (user) {
    return await generateClubCardId()
  }
  return randomNumber.toString();
}


export async function initUser(user: UserRegisterInput): Promise<[User, null] | [null, string]> {
  try {
    const newUser = new UserModel(user)
    newUser.private.hashedPassword = bcrypt.hashSync(user.private.password, 10)
    newUser.private.secureAnswer = bcrypt.hashSync(newUser.private.secureAnswer, 10)
    newUser.clubCardId = await generateClubCardId()
    newUser.roles.push(config.roles.nonMember)

    await newUser.save()
    return [newUser, null]
  } catch (error) {
    return [null, `Error ${JSON.stringify(error)} register new user`]
  }
}

export async function findUserByEmail(email: string): Promise<[User, null] | [null, string]> {
  const user = await UserModel.findOne({"profile.email": email})
  if (!user)
    return [null, `User with email ${email} doesn't exist`]
  return [user, null]
}

export async function findUserById(id: mongoose.Schema.Types.ObjectId): Promise<[User, null] | [null, string]> {
  const user = await UserModel.findOne({_id: id})
  if (!user)
    return [null, `User with id ${id} doesn't exist`]
  return [user, null]
}

export async function findUserByClubCardId(clubCardId: string): Promise<[User, null] | [null, string]> {
  const user = await UserModel.findOne({clubCardId: clubCardId})
  if (!user)
    return [null, `User with id ${clubCardId} doesn't exist`]
  return [user, null]
}


export async function updateUserSubscription(clubCardId: string, paymentId: mongoose.Types.ObjectId, sub: SubPayment) {
  try {
    const subPayment = sub.subPayments.find(payment => payment._id == String(paymentId))
    if (!subPayment)
      return 'Error occurred while finding subPayment to update subscription'

    await UserModel.updateOne({clubCardId: clubCardId}, {
      $set: {
        roles: ['member'],
        'subscription.type': subPayment.subInfo.subType + ' ' + subPayment.subInfo.subName,
        'subscription.subStarts': subPayment.subInfo.subStart,
        'subscription.subEnds': subPayment.subInfo.subEnd,
        'subscription.price': subPayment.paymentInfo.price,
        'subscription.paidAt': subPayment.paymentInfo.paidAt
      }
    })
    return null;
  } catch (e) {
    return 'Uncaught error'
  }
}




import bcrypt from "bcrypt";
import UserModel from "../../models/user.model";
import {User} from "../../documents/User";
import jsonwebtoken from "jsonwebtoken";
import config from "../../config/config";

export async function insertUser(user_: any) {
  let user = user_;

  user.roles = [user.profile.registrationType]
  user.hashedPassword = bcrypt.hashSync(user.password, 10)

  let secureAnswer = user.securityAnswer;
  user.securityAnswer = bcrypt.hashSync(secureAnswer, 10)
  user.profile.memberID = await generateId()
  delete user.password

  user = await new UserModel(user)
  await user.save()
  return user
}

async function generateId(): Promise<number> {
  let randomNumber = (Math.random() * (999999 - 100000 + 1) | 0) + 100000
  let user = await UserModel.findOne({"profile.memberID": randomNumber})
  if (user) {
    return await generateId()
  }
  return randomNumber;
}

interface IGenerateToken {
  token: string,
  expires: string
}

export function generateToken(user: User): IGenerateToken {
  const _id = user._id

  const expiresIn = '1h'

  const payload = {
    sub: _id
  }

  const signedToken = jsonwebtoken.sign(payload, String(config.jwtSecret), {expiresIn: expiresIn})

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn
  }
}

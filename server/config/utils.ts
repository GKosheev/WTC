import {UserDocument} from "../interfaces/UserDocument";
import config from '../config/config'
import jsonwebtoken from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import Joi from 'joi'
import User from '../models/user.model'

const userProfile = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  registrationType: "nonMember",
  phone: Joi.string().required(),
  gender: Joi.required(),
  dateOfBirth: Joi.date().required(),
  receiveClubEmails: Joi.bool().required()
})


const userSchema = Joi.object({
  profile: userProfile,
  password: Joi.string().required().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
  repeatPassword: Joi.string().required().valid(Joi.ref('password')),
  securityQuestion: Joi.string().required(),
  securityAnswer: Joi.string().required(),
  clubPolicy: Joi.string().required(),
  privacyPolicy: Joi.string().required(),
  covidPolicy: Joi.string().required()
})

async function insertUser(data: any) {
  // console.log(JSON.stringify(data))
  let user = data.user;
  console.log("USER: " + JSON.stringify(user))
  user = await userSchema.validate(user);
  user.value.roles = [user.value.profile.registrationType]
  user.value.hashedPassword = bcrypt.hashSync(user.value.password, 10)

  let secureAnswer = user.value.securityAnswer;
  user.value.securityAnswer = bcrypt.hashSync(secureAnswer, 10)
  user.value.profile.memberID = await generateId()
  delete user.value.password

  user = new User(user.value)
  await user.save()
  return user
}

async function generateId(): Promise<number> {
  let randomNumber = (Math.random() * (999999 - 100000 + 1) | 0) + 100000
  let user = await User.findOne({"profile.memberID": randomNumber})
  //console.log("findOne: " + user)
  if (user) {
    return generateId()
  }
  // console.log("return random number: " + randomNumber)
  return randomNumber;
}

interface IGenerateToken {
  token: string,
  expires: string
}

function generateToken(user: UserDocument): IGenerateToken {
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

module.exports.generateToken = generateToken
module.exports.insertUser = insertUser

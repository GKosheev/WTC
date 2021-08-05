const bcrypt = require('bcrypt')
const config = require('../config/config')
const jsonwebtoken = require('jsonwebtoken');

const Joi = require('joi')
const User = require('../models/user.model')

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

async function insertUser(data) {
  //console.log(JSON.stringify(data))
  let user = data.user;
  user = await userSchema.validate(user);
  user.value.roles = [user.value.profile.registrationType]
  user.value.hashedPassword = bcrypt.hashSync(user.value.password, 10)

  let secureAnswer = user.value.securityAnswer;
  user.value.securityAnswer = bcrypt.hashSync(secureAnswer, 10)
  user.value.profile.memberID = await generateId()
  user.value.profile.twitter = '-'
  user.value.profile.instagram = '-'
  user.value.profile.facebook = '-'
  user.value.profile.shareMyEmail = false
  user.value.profile.rating = '-'
  delete user.value.password
  return await new User(user.value).save()
}

async function generateId(){
  let randomNumber = (Math.random() * (999999-100000 + 1) | 0) + 100000
  let user = await User.findOne({"profile.memberID": randomNumber})
  //console.log("findOne: " + user)
  if (user) {
    return generateId()
  }
 // console.log("return random number: " + randomNumber)
  return randomNumber;
}

function generateToken(user) {
  const _id = user._id

  const expiresIn = '1h'

  const payload = {
    sub: _id
  }

  const signedToken = jsonwebtoken.sign(payload, config.jwtSecret, {expiresIn: expiresIn})

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn
  }
}

module.exports.generateToken = generateToken
module.exports.insertUser = insertUser

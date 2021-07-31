const bcrypt = require('bcrypt')
const config = require('../config/config')
const jsonwebtoken = require('jsonwebtoken');

const Joi = require('joi')
const User = require('../models/user.model')


const userSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email(),
  registrationType: "nonMember",
  password: Joi.string().required().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
  repeatPassword: Joi.string().required().valid(Joi.ref('password')),
  gender: Joi.required(),
  dateOfBirth: Joi.date().required(),
  receiveClubEmails: Joi.bool().required(),
  securityQuestion: Joi.string().required(),
  securityAnswer: Joi.string().required(),
  phone: Joi.string().required(),
  clubPolicy: Joi.string().required(),
  privacyPolicy: Joi.string().required(),
  covidPolicy: Joi.string().required()
})

async function insertUser(user) {
  let userRegister = user.userRegister
  userRegister = await userSchema.validate(userRegister)
  userRegister.value.roles = [userRegister.value.registrationType]
  userRegister.value.hashedPassword = bcrypt.hashSync(userRegister.value.password, 10)
  userRegister.value.test = 'test'
  delete userRegister.value.password
  delete userRegister.value.registrationType

  return await new User(userRegister.value).save()
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

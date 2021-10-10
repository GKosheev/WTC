import Joi from "joi";
import regExp from "../../config/regExp";

export const joiEmailValidation = Joi.object({
  email: Joi.string().required().regex(regExp.email)
})

export const joiResetPassword = Joi.object({
  token: Joi.string().min(40).max(40).required(),
  password: Joi.string().required().regex(regExp.password)
})

const joiUserRegisterProfile = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().required().regex(regExp.email),
  registrationType: "nonMember",
  phone: Joi.string().required(),
  gender: Joi.required(),
  dateOfBirth: Joi.date().required(),
  receiveClubEmails: Joi.bool().required()
})

export const joiUserRegister = Joi.object({
  profile: joiUserRegisterProfile,
  password: Joi.string().required().regex(regExp.password),
  repeatPassword: Joi.string().required().valid(Joi.ref('password')),
  securityQuestion: Joi.string().required(),
  securityAnswer: Joi.string().required(),
  clubPolicy: Joi.string().required(),
  privacyPolicy: Joi.string().required(),
  covidPolicy: Joi.string().required()
})

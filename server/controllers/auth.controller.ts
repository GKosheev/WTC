import {Request, Response} from 'express'
import TokenModel from '../models/token.model'
import UserModel from "../models/user.model";
import * as crypto from 'crypto'
import {confirmEmailMessage, forgotPasswordMessage, resendEmailVerifyLinkMessage} from "../utils/auth/auth.email";
import bcrypt from "bcrypt";
import {generateToken, insertUser} from "../utils/auth/auth.utils";
import {joiUserRegister, joiEmailValidation, joiResetPassword} from "../utils/auth/auth.validation";


/*

Main Auth APIs

*/
module.exports.register = async function (req: Request, res: Response) {
  const user_ = req.body.user
  const userRegisterValidation = await joiUserRegister.validate(user_);
  if (userRegisterValidation.error)
    return res.status(400).json({msg: userRegisterValidation.error.message})

  if (await UserModel.find({"profile.email": user_.profile.email}).countDocuments())
    return res.status(400).json({msg: 'User with such email is already exists', userExists: true})

  const user = await insertUser(req.body.user)
  if (!user)
    res.status(400).json({msg: 'Register error'})
  const token = await new TokenModel({_userId: user._id, token: crypto.randomBytes(16).toString('hex')})
  await token.save()
  await confirmEmailMessage(user.profile.firstName, user.profile.email, String(token.token))
  res.status(200).json({msg: 'Check your email to validate your account'})
}

module.exports.login = async function (req: Request, res: Response) {
  const user: any = req.user
  const token = await generateToken(user)
  res.json({user, token})
}


/*

Email Confirmation && Resend Email Confirmation Link

*/
module.exports.confirmEmail = async function (req: Request, res: Response) {
  const token = await TokenModel.findOne({token: req.params.token})
  if (!token)
    return res.status(400).send({
      msg: 'Your verification link may have expired. Please enter your email again',
      resendEmailLink: true
    })
  const user = await UserModel.findOne({_id: token._userId})
  await token.delete() // delete token after we find user with it
  if (!user)
    return res.status(401).send({
      msg: 'We were unable to find a user for this verification. Please SignUp!',
      signup: true
    })
  if (user.isVerified)
    return res.status(200).send({msg: 'User has already been verified. Please Login'})
  user.isVerified = true;
  await user.save()

  return res.status(200).send({msg: 'Your account has been successfully verified'})
}

module.exports.resendEmailLink = async function (req: Request, res: Response) {
  const user = await UserModel.findOne({"profile.email": req.body.email})
  if (!user)
    return res.status(400).send({msg: 'User with such Email does not exist. Please SignUp.', signup: true})
  if (user.isVerified)
    return res.status(200).send({msg: 'User has already been verified. Please Login', login: true})
  const token = await new TokenModel({_userId: user._id, token: crypto.randomBytes(16).toString('hex')})
  await token.save()
  await resendEmailVerifyLinkMessage(user.profile.firstName, user.profile.email, String(token.token))
  return res.status(200).json({msg: 'Check your email to validate your account'})
}


/*

Forgot Password && Reset Password

*/
module.exports.forgotPassword = async function (req: Request, res: Response) {
  const email = req.body.email
  const emailValidation = await joiEmailValidation.validate({email: email})
  if (emailValidation.error)
    return res.status(400).json({msg: 'Validation error'})
  const user = await UserModel.findOne({"profile.email": email})
  if (!user)
    return res.status(400).send({msg: 'User does not exist. Please signup', signup: true})
  const token = await new TokenModel({_userId: user._id, token: crypto.randomBytes(20).toString('hex')})
  await token.save()
  await forgotPasswordMessage(user.profile.firstName, user.profile.email, String(token.token))
  return res.status(200).json({msg: 'Check your email to reset your password'})
}

module.exports.resetPassword = async function (req: Request, res: Response) {
  let token_: string = req.params.token
  let password: string = req.body.password
  const validationResult = await joiResetPassword.validate({
    token: token_,
    password: password
  })
  if (validationResult.error)
    return res.status(400).json({msg: 'Validation error'})

  const token = await TokenModel.findOne({token: token_})
  if (!token)
    return res.status(400).send({msg: 'Token has been expired, please enter your email again', forgotPassword: true})

  const user = await UserModel.findOne({_id: token._userId})
  await token.delete() // delete token after we find user with it
  if (!user)
    return res.status(400).send({msg: 'User with such Email does not exist. Please SignUp.'})

  user.hashedPassword = bcrypt.hashSync(password, 10)
  await user.save()
  return res.status(200).json({msg: "Password has been changed"})
}

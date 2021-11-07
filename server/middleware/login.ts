import {Request, NextFunction, Response} from "express";
import bcrypt from "bcrypt";
import UserModel from "../models/user.model";
import * as crypto from 'crypto'
import TokenModel from "../models/token.model";
import {confirmEmailMessage} from "../utils/auth/email-messages";
import {joiLoginValidation} from "../utils/auth/joi";


export async function loginMiddleware(req: Request, res: Response, next: NextFunction) {
  const email = req.body.email
  const password = req.body.password

  const userLoginValidation = await joiLoginValidation.validate({email: email, password: password});
  if (userLoginValidation.error)
    return res.status(400).json({msg: userLoginValidation.error.message})

  const user = await UserModel.findOne({'profile.email': email})
  if (!user)
    return res.status(400).json({msg: "User with such email doesn't exist", wrongEmail: true})
  if (!bcrypt.compareSync(password, String(user.hashedPassword)))
    return res.status(400).json({msg: "Wrong password", wrongPassword: true})

  if (!user.isVerified) {
    let token = await new TokenModel({_userId: user._id, token: crypto.randomBytes(16).toString('hex')})
    await token.save()
    await confirmEmailMessage(user.profile.firstName, user.profile.email, String(token.token))
    return res.status(400).json({msg: 'Check your email to verify your account'})
  }
  let user_: any = user.toObject()
  delete user_.hashedPassword
  req.user = user_
  return next()
}

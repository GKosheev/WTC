import {Request, NextFunction, Response} from "express";
import bcrypt from "bcrypt";
import UserModel from "../models/user.model";
import * as crypto from 'crypto'
import TokenModel from "../models/token.model";
import {confirmEmailMessage} from "../utils/auth/auth.email";


export async function loginMiddleware(req: Request, res: Response, next: NextFunction) {
  const email = req.body.email
  const password = req.body.password
  const user = await UserModel.findOne({'profile.email': email})
  if (!user)
    return res.status(400).json({msg: "User with such email doesn't exist"})
  if (!bcrypt.compareSync(password, String(user.hashedPassword)))
    return res.status(400).json({msg: "Wrong password"})

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

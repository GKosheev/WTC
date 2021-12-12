import {NextFunction, Request, Response} from "express";
import bcrypt from "bcrypt";
import {confirmEmailMessage} from "../utils/auth/email-messages";
import {joiLoginValidation} from "./validations/auth/joi/login";
import {joiUserRegister} from "./validations/auth/joi/register";
import {UserRegisterInput} from "../interfaces/auth/UserRegisterInput";
import {findUserByEmail} from "../services/db services/UserService";
import {initToken} from "../services/db services/TokenService";
import {subExpired, setSubStatusToDefault} from "../utils/subscription/sub_helpers";
import config from "../config/config";


export async function registerMiddleware(req: Request, res: Response, next: NextFunction) {
  const user_ = req.body
  const userRegisterValidation = await joiUserRegister.validate({
    profile: user_.profile,
    agreements: user_.agreements,
    private: user_.private
  })
  if (userRegisterValidation.error)
    return res.status(400).json({msg: userRegisterValidation.error.message})
  res.locals.user = <UserRegisterInput>user_
  return next()
}

export async function loginMiddleware(req: Request, res: Response, next: NextFunction) {
  const email = req.body.email
  const password = req.body.password

  const userLoginValidation = await joiLoginValidation.validate({email: email, password: password});
  if (userLoginValidation.error)
    return res.status(400).json({msg: userLoginValidation.error.message})

  let [user, error] = await findUserByEmail(email)
  if (!user)
    return res.status(400).json({msg: "User with such email doesn't exist", wrongEmail: true})
  if (error)
    return res.status(500).json({msg: 'Server error'})

  if (!bcrypt.compareSync(password, String(user.private.hashedPassword)))
    return res.status(400).json({msg: "Wrong password", wrongPassword: true})

  if (!user.isVerified) {
    let [token, error] = await initToken(user._id, 16)
    if (!token)
      return res.status(500).json({msg: 'Server error'})
    if (error)
      return res.status(400).json({msg: error})

    await token.save()
    await confirmEmailMessage(user.profile.firstName, user.profile.email, String(token.token))
    return res.status(400).json({msg: 'Check your email to verify your account'})
  }
  if (user.roles[0] === config.roles.member && subExpired(user.subscription.subStarts, user.subscription.subEnds))
    user = await setSubStatusToDefault(user) //setting new user after updating sub status

  let user_ = JSON.parse(JSON.stringify(user))
  delete user_.private.hashedPassword
  delete user_.private.secureAnswer
  res.locals.user = user_
  return next()
}

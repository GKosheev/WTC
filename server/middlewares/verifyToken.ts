import config from '../config/config'
import UserModel from "../models/user.model";
import {NextFunction, Response, Request} from "express";
import jsonwebtoken from "jsonwebtoken";
import {subExpired, setSubStatusToDefault} from "../utils/subscription/sub_helpers";


async function verifyToken(req: Request, res: Response, next: NextFunction) {
  const bearerToken = req.headers.authorization
  if (!bearerToken)
    return res.status(400).json({msg: 'Token expired, please login'})

  const token = bearerToken.replace('Bearer ', '')
  try {
    const decoded = jsonwebtoken.verify(token, String(config.jwtSecret))
    let user = await UserModel.findOne({_id: decoded.sub})
    if (!user)
      return res.status(400).json({msg: `User not found`})
    if (!user.isVerified)
      return res.status(400).json({msg: 'Please verify your email'})

    if (user.roles[0] === config.roles.member && subExpired(user.subscription.subStarts, user.subscription.subEnds))
      user = await setSubStatusToDefault(user) // updating subStatus & user variable


    let user_ = JSON.parse(JSON.stringify(user))
    delete user_.private.hashedPassword
    delete user_.private.secureAnswer
    res.locals.user = user_
    return next()
  } catch (err) {
    return res.status(400).json({msg: err})
  }
}

export default verifyToken

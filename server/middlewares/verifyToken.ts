import config from '../config/config'
import UserModel from "../models/user.model";
import {NextFunction, Response, Request} from "express";
import jsonwebtoken from "jsonwebtoken";

async function verifyToken(req: Request, res: Response, next: NextFunction) {
    const bearerToken = req.headers.authorization
    if (!bearerToken)
        return res.status(400).json({msg: 'Token expired, please login'})

    const token = bearerToken.replace('Bearer ', '')
    try {
        const decoded = jsonwebtoken.verify(token, String(config.jwtSecret))
        const user = await UserModel.findOne({_id: decoded.sub})
        if (!user?.isVerified)
            return res.status(400).json({msg: 'Please verify your email'})

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

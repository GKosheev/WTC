// functions from config/utils
import {Request, Response, NextFunction} from 'express'

const insertUser = require('../config/utils').insertUser
const generateToken = require('../config/utils').generateToken


module.exports.register = async function (req: Request, res: Response, next: NextFunction) {
    let user = await insertUser(req.body)
    user = user.toObject()
    delete user.hashedPassword
    req.user = user
    next()
}

module.exports.login = function (req: Request, res: Response) {
    let user = req.user
    let token = generateToken(user)
    res.json({user, token})
}

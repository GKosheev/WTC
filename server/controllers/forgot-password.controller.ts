import {Request, Response} from "express";
import User from "../models/user.model";
import Token from "../models/token.model";
import * as crypto from 'crypto'
import nodemailer from "nodemailer";
import config from "../config/config";

module.exports.forgotPassword = function (req: Request, res: Response) {
    const email = req.body.email

    User.findOne({"profile.email": email}, (err: any, user: any) => {
      if (err)
        return res.status(500).send({error: err})
      if (!user)
        return res.status(400).send({error: 'User with such email does not exist.'})

      let token = new Token({_userId: user._id, token: crypto.randomBytes(20).toString('hex')})
      token.save((err) => {
        if (err)
          return res.status(500).send({error: err.message})

        let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: config.email,
            pass: config.password
          }
        })

        const mailOptions = {
          from: config.email,
          to: user.profile.email,
          subject: 'Account Verification Link',
          text: 'Hello ' + user.profile.firstName + ',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + 'localhost:4200'/*req.headers.host*/ + '\/#' + '\/reset-password\/' + user.profile.email + '\/' + token.token + '\n\nThank You!\n'
        }

        let sendMailResponse = transporter.sendMail(mailOptions)
        if (!sendMailResponse) {
          res.status(300).json({error: 'Send Mail error'})
        }
        res.status(200).json({message: 'Check your email to validate your account'})

      })
    })
}

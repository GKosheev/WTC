// functions from config/utils
import {Request, Response, NextFunction} from 'express'
import Token from '../models/token.model'
import * as crypto from 'crypto'
import nodemailer from 'nodemailer'
import config from '../config/config'
import User from "../models/user.model";
import mongoose from "mongoose";

const insertUser = require('../config/utils').insertUser
const generateToken = require('../config/utils').generateToken


module.exports.register = async function (req: Request, res: Response, next: NextFunction) {
  try {
    let user = await insertUser(req.body)
    /*
    user = user.toObject()
    delete user.hashedPassword
    req.user = user
    */

    let token = new Token({_userId: user._id, token: crypto.randomBytes(16).toString('hex')})
    await token.save()

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
      subject: 'Email validation',
      text: 'Hello ' + user.profile.firstName + ',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + 'localhost:4200'/*req.headers.host*/+ '\/#' + '\/confirm-email\/' + user.profile.email + '\/' + token.token + '\n\nThank You!\n'
    }

    let sendMailResponse = await transporter.sendMail(mailOptions)
    if (!sendMailResponse) {
      res.status(300).json({error: 'Send Mail error'})
    }
    res.status(200).json('Check your email to validate your account')


    // next() not needed because we no longer login after signup
  } catch (error) {
    res.status(400).json({error: error})
  }
}

module.exports.login = function (req: Request, res: Response) {
  let user = req.user
  let token = generateToken(user)
  res.json({user, token})
}

module.exports.confirmEmail = function (req: Request, res: Response) {
  Token.findOne({token: req.params.token}, (err: any, token: any) => {
    if (!token) {
      return res.status(400).send({error: 'Your verification link may have expired. Please click on resend for verify your Email.'})
    } else {
      User.findOne({_id: token._userId, "profile.email": req.params.email}, (err: any, user: any) => {
        if (!user)
          return res.status(401).send({error: 'We were unable to find a user for this verification. Please SignUp!'})
        else if (user.isVerified)
          return res.status(200).send({message: 'User has already been verified. Please Login'})
        else {
          user.isVerified = true;
          user.save((err: any) => {
            if (err)
              return res.status(500).send({msg: err.message})
            else
              return res.status(200).send({message: 'Your account has been successfully verified'})
          })
        }
      })
    }
  })
}

module.exports.resendLink = function (req: Request, res: Response) {
  User.findOne({"profile.email": req.body.email}, (err: any, user: any) => {
    if (!user)
      return res.status(400).send({error: 'User with such Email does not exist. Make sure your Email is correct'})
    else {
      let token = new Token({_userId: user._id, token: crypto.randomBytes(16).toString('hex')})
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
          text: 'Hello ' + user.profile.firstName + ',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/api\/' + '\auth\/' + '\confirmation\/' + user.profile.email + '\/' + token.token + '\n\nThank You!\n'
        }

        let sendMailResponse = transporter.sendMail(mailOptions)
        if (!sendMailResponse) {
          res.status(300).json({error: 'Send Mail error'})
        }
        res.status(200).json({message: 'Check your email to validate your account'})

      })
    }
  })
}

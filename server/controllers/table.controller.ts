import User from '../models/user.model'
import {Request, Response} from 'express'
import config from '../config/config'
import sgMail from "../config/sendgrid";

module.exports.users = async (req: Request, res: Response) => {
  await User.find({}, (err, users) => {
    let userMap: any = [];
    users.forEach((user) => {
      if (user.isVerified) {
        userMap.push({
          memberID: user.profile.memberID,
          user: {
            'fullName': user.profile.firstName + ' ' + user.profile.lastName,
            'phone': user.profile.phone,
            'email': user.profile.shareMyEmail ? user.profile.email : '-',
            'rating': user.profile.rating
          }
        })
      }
    })

    res.status(200).json(userMap)
  })
}

module.exports.sendMessage = async function (req: Request, res: Response) {
  try {
    let memberID: string = req.body.id //id = memberID
    let user = await User.collection.findOne({'profile.memberID': memberID});
    if (!user) {
      res.status(300).json("UserDocument.ts not found")
    }
    let firstName = user?.profile.firstName
    let lastName = user?.profile.lastName
    let email = user?.profile.email

    const msg = {
      to: email,
      from: String(config.sendgrid_verified_email), // Change to your verified sender
      subject: req.body.subject,
      text: req.body.text
      // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
    await sgMail.send(msg).then(() => {
      res.status(200).json({message: 'Check your email to validate your account'})
    }).catch((error) => {
      res.status(300).json({error: 'Confirm email error'})
    })
  } catch (error) {
    res.status(400).json({error: error})
  }
}


module.exports.userId = async (req: Request, res: Response) => {
  let memberID: string = req.params.id //id = memberID
  await User.collection.findOne({'profile.memberID': memberID}, (err, user) => {
    if (err) {
      res.status(400).json({error: err});
    }
    if (!user) {
      res.status(400).json({message: 'User was not found'})
    } else {
      let userProfile = {
        firstName: user?.profile.firstName,
        lastName: user?.profile.lastName,
        email: user?.profile.shareMyEmail ? user?.profile.email : '-',
        phone: user?.profile.phone,
        rating: user?.profile.rating,
        twitter: user?.profile.twitter,
        instagram: user?.profile.instagram,
        facebook: user?.profile.facebook
      }
      res.status(200).json(userProfile)
    }
  })
}

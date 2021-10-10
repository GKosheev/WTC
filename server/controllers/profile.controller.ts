import UserModel from '../models/user.model'
import {Request, Response} from 'express'
import {User} from "../interfaces/User";
import {joiUpdateProfile} from "../utils/profile/profile.validation";


interface UserPersonalProfile {
  firstName: string,
  lastName: string,
  receiveClubEmails: boolean,
  shareMyEmail: boolean,
  twitter: string,
  instagram: string,
  facebook: string
}

module.exports.updateProfile = async function (req: Request, res: Response) {
  if (!req.user)
    return res.status(500).json({msg: 'Server error'})

  const user = <User> req.user
  let profile: UserPersonalProfile = req.body.profile

  const joiProfileValidation = await joiUpdateProfile.validate({
    firstName: profile.firstName,
    lastName: profile.lastName,
    receiveClubEmails: profile.receiveClubEmails,
    shareMyEmail: profile.shareMyEmail,
    twitter: profile.twitter,
    instagram: profile.instagram,
    facebook: profile.facebook
  })

  if (joiProfileValidation.error)
    return res.status(400).json({msg: 'Validation error'})

  await UserModel.updateOne({'profile.email': user.profile.email}, {
    $set:
      {
        "profile.firstName": profile.firstName,
        "profile.lastName": profile.lastName,
        "profile.twitter": profile.twitter,
        "profile.instagram": profile.instagram,
        "profile.facebook": profile.facebook,
        "profile.receiveClubEmails": profile.receiveClubEmails,
        "profile.shareMyEmail": profile.shareMyEmail
      }
  })
  return res.status(200).json({msg: 'Profile has just been changed'})
}

import UserModel from '../models/user.model'
import {Request, Response} from 'express'
import {sendMessageToUser} from "../utils/users/users.email";
import {User} from "../documents/User";

module.exports.allUsers = async function (req: Request, res: Response) {
  const users = await UserModel.find({})
  if (!users)
    return res.status(400).json({msg: 'no users were found'})

  let userMap: any = [];
  await users.forEach((user) => {
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
  return res.status(200).json(userMap)
}

module.exports.messageToUser = async function (req: Request, res: Response) {
  const memberID: string = req.params.userId
  const user = await UserModel.collection.findOne({'profile.memberID': memberID});
  if (!user)
    return res.status(300).json({msg: "User doesn't exist"})
  if (!req.user)
    return res.status(500).json({msg: 'Server error'})

  const fromUser = <User>req.user
  const fullUserName = fromUser.profile.firstName + ' ' + fromUser.profile.lastName
  await sendMessageToUser(user.profile.email, fullUserName, req.body.subject, req.body.text)
  return res.status(200).json({msg: 'Message has been sent'})
}


module.exports.getById = async function (req: Request, res: Response) {
  const memberID: string = req.params.userId //id = memberID

  const user = await UserModel.collection.findOne({'profile.memberID': memberID})
  if (!user)
    return res.status(400).json({msg: 'User was not found'})

  const userProfile = {
    firstName: user?.profile.firstName,
    lastName: user?.profile.lastName,
    email: user?.profile.shareMyEmail ? user?.profile.email : '-',
    phone: user?.profile.phone,
    rating: user?.profile.rating,
    twitter: user?.profile.twitter,
    instagram: user?.profile.instagram,
    facebook: user?.profile.facebook
  }
  return res.status(200).json(userProfile)
}

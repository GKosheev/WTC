import {Request, Response} from 'express'
import {User} from "../documents/User";
import {editUserProfile} from "../utils/profile/edit-profile";
import {UserEditPersonalProfile} from "../interfaces/user profile/UserEditPersonalProfile";
import path from 'path'
import fs from 'fs'
import UserModel from "../models/user.model";
import config from "../config/config";

const allowedFormats: string[] = ['.jpg', '.png', '.jpeg']

export async function editProfile(req: Request, res: Response) {
  const user: User = res.locals.user
  let profile: UserEditPersonalProfile = req.body.profile
  const updateProfileError = await editUserProfile(user, profile)
  if (updateProfileError)
    return res.status(400).json(updateProfileError)
  return res.status(200).json({msg: 'Profile has just been changed'})
}


export async function uploadImage(req: Request, res: Response) {
  const user: User = res.locals.user
  if (!req.file?.originalname || !req.file.path)
    return res.status(400).json({msg: 'File Error'})

  const tempPath = req.file.path;
  const fileFormat = path.extname(req.file.originalname)
  /*  console.log(JSON.stringify(__dirname))
    return res.status(200).json({msg: 'ok'})*/
  const newName = "profile_picture_" + user.clubCardId + fileFormat
  const targetPath = path.join(__dirname, config.assetsPath + "profile-images/" + newName);

  if (!allowedFormats.includes(fileFormat)) {
    fs.unlink(tempPath, err => {
      if (err)
        return res.status(400).json({msg: 'Unlink error'})
    })
    return res.status(400).json({msg: `Type ${fileFormat} is not allowed`})
  }

  fs.rename(tempPath, targetPath, async err => {
    if (err)
      return res.status(400).json({msg: 'Rename error'})

    await UserModel.updateOne({clubCardId: user.clubCardId}, {$set: {'profile.img': newName}})
    return res.status(200).json({msg: 'Image successfully uploaded'})
  })
}

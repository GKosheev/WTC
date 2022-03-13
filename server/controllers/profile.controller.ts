import {Request, Response} from 'express'
import {User} from "../documents/User";
import {editUserProfile} from "../utils/profile/edit-profile";
import {UserEditPersonalProfile} from "../interfaces/user profile/UserEditPersonalProfile";
import path from 'path'
import UserModel from "../models/user.model";
import config from "../config/config";
import {s3} from "../services/aws";
import fs from 'fs'

const allowedFormats: string[] = ['.jpg', '.png', '.jpeg']
const maxFileSize: number = 2 * 1024 * 1024 // 2 MB

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

  if (!req.file?.originalname)
    return res.status(400).json({msg: 'File Error'})

  const fileFormat = path.extname(req.file.originalname)

  if (!allowedFormats.includes(fileFormat))
    return res.status(400).json({msg: `Type ${fileFormat} is not allowed`})

  if (req.file.size > maxFileSize)
    return res.status(400).json({msg: `Max allowed file size: 2 MB`})

  const fileContent = fs.readFileSync(req.file.path)

  const uploadParams = {
    Bucket: config.aws.s3.bucket_name!,
    Key: "profile-pictures/profile_picture_" + user.clubCardId + fileFormat,
    Body: fileContent,
    ContentType: 'image/' + (fileFormat === '.jpg' ? 'jpeg' : fileFormat.replace('.', '')),
    ACL: 'public-read'
  }

  fs.unlink(req.file.path, (err) => {
    if (err)
      return res.status(400).json({msg: 'Unlink file error'})
  })

  s3.upload(uploadParams, async (err, data) => {

    if (err)
      return res.status(400).json({msg: `Upload Error: ${err.message}`})

    await UserModel.updateOne({clubCardId: user.clubCardId}, {$set: {'profile.img': data.Location}})
    return res.status(200).json({msg: 'Image successfully uploaded'})
  })
  //

}

import UserModel from "../../models/user.model";
import {UserProfile} from "../../interfaces/users list/UserProfile";


export async function getUserByClubCardId(clubCardId: string | undefined): Promise<[null, { msg: string }] | [UserProfile, null]> {
  const user = await UserModel.findOne({clubCardId: clubCardId})
  if (!user)
    return [null, {msg: `User doesn't exist`}]
  const userProfile: UserProfile = {
    firstName: user.profile.firstName,
    lastName: user.profile.lastName,
    email: user.profile.shareMyEmail ? user.profile.email : '-',
    phone: user.profile.shareMyPhone ? user.profile.phone : '-',
    rating: user.profile.rating,
    twitter: user.profile.twitter,
    instagram: user.profile.instagram,
    facebook: user.profile.facebook,
    subType: user.roles.includes('admin') ? 'member' : user.roles[0],
    img: user.profile.img
  }
  return [userProfile, null]
}

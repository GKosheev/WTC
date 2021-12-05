import {Request, Response} from 'express'
import {User} from "../documents/User";
import {editUserProfile} from "../utils/profile/edit-profile";
import {UserEditPersonalProfile} from "../interfaces/user profile/UserEditPersonalProfile";


export async function editProfile(req: Request, res: Response) {
    const user: User = res.locals.user
    let profile: UserEditPersonalProfile = req.body.profile
    const updateProfileError = await editUserProfile(user, profile)
    if (updateProfileError)
        return res.status(400).json(updateProfileError)
    return res.status(200).json({msg: 'Profile has just been changed'})
}

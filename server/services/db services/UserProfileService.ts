import {UserEditPersonalProfile} from "../../interfaces/user profile/UserEditPersonalProfile";
import {User} from "../../documents/User";
import UserModel from "../../models/user.model";


export async function updatePersonalUserProfile(user: User, profile: UserEditPersonalProfile) {
    try {
        await UserModel.updateOne({_id: user._id}, {
            $set:
                {
                    "profile.firstName": profile.firstName,
                    "profile.lastName": profile.lastName,
                    "profile.twitter": profile.twitter,
                    "profile.instagram": profile.instagram,
                    "profile.facebook": profile.facebook,
                    "profile.receiveClubEmails": profile.receiveClubEmails,
                    "profile.shareMyEmail": profile.shareMyEmail,
                    "profile.shareMyPhone": profile.shareMyPhone
                }
        })

    } catch (error) {
        return {msg: 'Error while updating personal user profile'}
    }
}

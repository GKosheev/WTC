import {joiUpdateProfile} from "./joi";
import {UserEditPersonalProfile} from "../../interfaces/user profile/UserEditPersonalProfile";
import {User} from "../../documents/User";
import {updatePersonalUserProfile} from "../../services/db services/UserProfileService";

export async function editUserProfile(user: User, profile: UserEditPersonalProfile): Promise<{ msg: string } | null> {
    const joiProfileValidation = await joiUpdateProfile.validate(profile)
    if (joiProfileValidation.error)
        return {msg: joiProfileValidation.error.message}

    const updateProfileError = await updatePersonalUserProfile(user, profile)
    if (updateProfileError)
        return updateProfileError
    return null
}

import {UserRegisterInput} from "../../interfaces/auth/UserRegisterInput";
import {initUser} from "../../services/db services/UserService";
import {initToken} from "../../services/db services/TokenService";
import {confirmEmailMessage} from "./email-messages";
import UserModel from "../../models/user.model";

export async function registerUser(user_: UserRegisterInput): Promise<string | null> {
    try {
        if (await UserModel.findOne({'profile.email': user_.profile.email}).countDocuments())
            return 'User with such email is already exists'

        const [user, initUserError] = await initUser(user_)
        if (initUserError || !user)
            return JSON.stringify(initUserError)
        const [token, initTokenError] = await initToken(user._id, 16)
        if (initTokenError || !token)
            return JSON.stringify(initUserError)
        await confirmEmailMessage(user.profile.firstName, user.profile.email, String(token.token))
        return null
    } catch (error) {
        return 'Error during register'
    }
}


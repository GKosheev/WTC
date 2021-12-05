import UserModel from "../../models/user.model";
import {initToken} from "../../services/db services/TokenService";
import {forgotPasswordMessage} from "./email-messages";
import {joiEmailValidation} from "../../middlewares/validations/auth/joi/email-validation";

export async function forgotPass(email: string | undefined) {
    if (!email)
        return {msg: 'Email validation error'}

    const emailValidation = joiEmailValidation.validate({email: email})
    if (emailValidation.error)
        return {msg: emailValidation.error.message}

    const user = await UserModel.findOne({"profile.email": email})
    if (!user)
        return {msg: 'User does not exist. Please signup', signup: true}
    const [token, initTokenError] = await initToken(user._id, 20)
    if (initTokenError)
        return {msg: 'Error during init of new token'}
    await forgotPasswordMessage(user.profile.firstName, user.profile.email, token!.token)
    return null
}

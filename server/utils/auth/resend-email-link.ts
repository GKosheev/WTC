import UserModel from "../../models/user.model";
import {initToken} from "../../services/db services/TokenService";
import {resendEmailVerifyLinkMessage} from "./email-messages";
import {joiEmailValidation} from "../../middlewares/validations/auth/joi/email-validation";


export async function resendUserEmailLink(email: string | undefined) {
    if (!email)
        return {msg: 'Email validation error'}

    const joiValidation = joiEmailValidation.validate({email: email})
    if (joiValidation.error)
        return {msg: joiValidation.error.message}

    const user = await UserModel.findOne({"profile.email": email})
    if (!user)
        return {msg: 'User with such Email does not exist. Please SignUp.', signup: true}
    if (user.isVerified)
        return {msg: 'User has already been verified. Please Login', login: true}

    const [token, initTokenError] = await initToken(user._id, 16)
    if (initTokenError)
        return {msg: 'Error during init of new token'}
    await resendEmailVerifyLinkMessage(user.profile.firstName, user.profile.email, token!.token)
    return null
}

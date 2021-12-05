import TokenModel from "../../models/token.model";
import UserModel from "../../models/user.model";


export async function confirmUserEmail(token_: string | undefined) {
    if (!token_)
        return {msg:'Invalid token'}

    const token = await TokenModel.findOne({token: token_})
    if (!token)
        return {msg: 'Your verification link expired. Please enter your email again', resendEmailLink: true}
    const user = await UserModel.findOne({_id: token._userId})
    await token.delete()
    if (!user)
        return {msg: 'We were unable to find a user for this verification. Please SignUp!', signup: true}
    if (user.isVerified)
        return null
    user.isVerified = true
    await user.save()
    return null
}

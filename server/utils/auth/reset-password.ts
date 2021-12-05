import TokenModel from "../../models/token.model";
import UserModel from "../../models/user.model";
import bcrypt from "bcrypt";
import {joiPasswordValidation} from "../../middlewares/validations/auth/joi/password-validation";


export async function resetPass(token_: string | undefined, password: string | undefined) {
  if (!token_ || !password)
    return {msg: 'Token/Password Validation Error'}

  const passwordValidation = await joiPasswordValidation.validate({password: password})
  if (passwordValidation.error)
    return {msg: passwordValidation.error.message}

  const token = await TokenModel.findOne({token: token_})
  if (!token)
    return {
      msg: 'Token has been expired, please enter your email again',
      forgotPassword: true
    }
  await token.delete()
  const user = await UserModel.findOneAndUpdate({_id: token._userId}, {$set: {'private.hashedPassword': bcrypt.hashSync(password, 10)}})
  if (!user)
    return {msg: 'User with such Email does not exist. Please SignUp.'}
  return null
}

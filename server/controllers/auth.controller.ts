import {Request, Response} from 'express'
import {generateToken} from "../utils/auth/login";
import {registerUser} from "../utils/auth/register";
import {User} from "../documents/User";
import {confirmUserEmail} from "../utils/auth/confirm-email";
import {resendUserEmailLink} from "../utils/auth/resend-email-link";
import {forgotPass} from "../utils/auth/forgot-password";
import {resetPass} from "../utils/auth/reset-password";

/*

Main Auth APIs

*/
export async function register(req: Request, res: Response) {
    const registerError = await registerUser(res.locals.user)
    if (registerError)
        return res.status(400).json({msg: registerError})
    return res.status(200).json({msg: 'Check your email to validate your account'})
}

export async function login(req: Request, res: Response) {
    const user: User = res.locals.user
    const token = await generateToken(user)
    return res.json({user, token})
}


/*

Email Confirmation && Resend Email Confirmation Link

*/
export async function confirmEmail(req: Request, res: Response) {
    const confirmError = await confirmUserEmail(req.params.token)
    if (confirmError)
        return res.status(400).json(confirmError)
    return res.status(200).json({msg: 'Your account has been successfully verified'})
}

export async function resendEmailLink(req: Request, res: Response) {
    const resendEmailError = await resendUserEmailLink(req.body.email)
    if (resendEmailError)
        return res.status(400).json(resendEmailError)
    return res.status(200).json({msg: 'Check your email to validate your account'})
}


/*

Forgot Password && Reset Password

*/
export async function forgotPassword(req: Request, res: Response) {
    const forgotPassError = await forgotPass(req.body.email)
    if (forgotPassError)
        return res.status(400).json(forgotPassError)
    return res.status(200).json({msg: 'Check your email to reset your password'})
}

export async function resetPassword(req: Request, res: Response) {
    const resetPasswordError = await resetPass(req.params.token, req.body.password)
    if (resetPasswordError)
        return res.status(400).json(resetPasswordError)
    return res.status(200).json({msg: "Password has been changed"})
}

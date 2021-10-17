import config from "../../config/config";
import {sendMessage} from "../../services/sendgrid";


/* Forgot Password Message */
export async function forgotPasswordMessage(name: string, email: string, token: string) {
  const subject: string = 'Password Reset Link'
  const text: string =
    `Hello ${name}, \n\n
    Please reset your password by clicking the link: ${config.url}/auth/reset-password/${token} \n\n
    Thank you! \n`
  await sendMessage(email, subject, text)
}

/* Confirm Email Message */
export async function confirmEmailMessage(name: string, email: string, token: string) {
  const subject: string = 'Account Verification Link'
  const text: string =
    `Hello ${name}, \n\n
   Please verify your account by clicking the link: ${config.url}/auth/confirm-email/${token} \n\n
    Thank you!\n`
  await sendMessage(email, subject, text)
}

/* Resend Email Verify Link Message */
export async function resendEmailVerifyLinkMessage(name: string, email: string, token: string) {
  const subject: string = 'Account Verification Link (Resend)'
  const text: string =
    `Hello ${name}, \n\n
   Please verify your account by clicking the link: ${config.url}/auth/confirm-email/${token} \n\n
    Thank you!\n`
  await sendMessage(email, subject, text)
}


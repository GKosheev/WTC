import app from 'express'
import asyncHandler from 'express-async-handler'
import passport from 'passport'
import {loginMiddleware} from "../middleware/login";
import {
  register,
  login,
  forgotPassword,
  resetPassword,
  resendEmailLink,
  confirmEmail
} from '../controllers/auth.controller'

const router = app.Router()

/* Main Auth APIs */
router.post('/register', asyncHandler(register))
router.post('/login', asyncHandler(loginMiddleware), asyncHandler(login))
router.get('/me', passport.authenticate('jwt', {session: false}), asyncHandler(login))

/* Email Confirmation && Resend Email Confirmation Link */
router.post('/confirm-email/:token', asyncHandler(confirmEmail))
router.post('/resend-email-link', asyncHandler(resendEmailLink))

/* Forgot Password && Reset Password */
router.post('/forgot-password', asyncHandler(forgotPassword))
router.post('/reset-password/:token', asyncHandler(resetPassword))


export default router


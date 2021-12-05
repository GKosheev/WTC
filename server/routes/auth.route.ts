import app from 'express'
import asyncHandler from 'express-async-handler'
import {registerMiddleware, loginMiddleware} from "../middlewares/auth";
import {
    register,
    login,
    forgotPassword,
    resetPassword,
    resendEmailLink,
    confirmEmail
} from '../controllers/auth.controller'
import verifyToken from "../middlewares/verifyToken";

const router = app.Router()

/* Main Auth APIs */
router.post('/register', asyncHandler(registerMiddleware), asyncHandler(register))
router.post('/login', asyncHandler(loginMiddleware), asyncHandler(login))
router.get('/me', asyncHandler(verifyToken), asyncHandler(login))

/* Email Confirmation && Resend Email Confirmation Link */
router.post('/confirm-email/:token', asyncHandler(confirmEmail))
router.post('/resend-email-link', asyncHandler(resendEmailLink))

/* Forgot Password && Reset Password */
router.post('/forgot-password', asyncHandler(forgotPassword))
router.post('/reset-password/:token', asyncHandler(resetPassword))


export default router


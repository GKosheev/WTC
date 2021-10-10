import app from 'express'
import asyncHandler from 'express-async-handler'
import passport from 'passport'
import {loginMiddleware} from "../middleware/login";

const controller = require('../controllers/auth.controller')
const router = app.Router()

/* Main Auth APIs */
router.post('/register', asyncHandler(controller.register))
router.post('/login', asyncHandler(loginMiddleware), asyncHandler(controller.login))
router.get('/me', passport.authenticate('jwt', {session: false}), asyncHandler(controller.login))

/* Email Confirmation && Resend Email Confirmation Link */
router.post('/confirm-email/:token', asyncHandler(controller.confirmEmail))
router.post('/resend-email-link', asyncHandler(controller.resendEmailLink))

/* Forgot Password && Reset Password */
router.post('/forgot-password', asyncHandler(controller.forgotPassword))
router.post('/reset-password/:token', asyncHandler(controller.resetPassword))



module.exports = router


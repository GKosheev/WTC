import app from 'express'
import asyncHandler from 'express-async-handler'
import passport from "passport";
import {payment, getAllPayments, webhook} from "../controllers/payments.controller";

const router = app.Router()

router.post('/create-checkout-session', passport.authenticate('jwt', {session: false}), asyncHandler(payment))
router.get('/all', passport.authenticate('jwt', {session: false}), asyncHandler(getAllPayments))
router.post('/webhook', asyncHandler(webhook))

export default router

import app from 'express'
import asyncHandler from 'express-async-handler'
import passport from "passport";
import {payment} from "../controllers/payments.controller";

const router = app.Router()

router.post('/create-checkout-session', passport.authenticate('jwt', {session: false}), asyncHandler(payment))

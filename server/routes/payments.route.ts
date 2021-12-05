import app from 'express'
import asyncHandler from 'express-async-handler'
import {createCheckoutSession, deletePayments, getAllPayments, webhook} from "../controllers/payments.controller";
import verifyToken from "../middlewares/verifyToken";
import bodyParser from "body-parser";
import {checkoutMiddleware} from "../middlewares/payments";


const router = app.Router()

router.post('/create-checkout-session', asyncHandler(verifyToken), asyncHandler(checkoutMiddleware), asyncHandler(createCheckoutSession))
router.get('/all', asyncHandler(verifyToken), asyncHandler(getAllPayments))
router.post('/delete', asyncHandler(verifyToken), asyncHandler(deletePayments))
router.post('/webhook', bodyParser.raw({type: 'application/json'}), asyncHandler(webhook))



export default router

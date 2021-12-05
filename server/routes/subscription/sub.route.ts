import app from 'express'
import asyncHandler from "express-async-handler";
import verifyToken from "../../middlewares/verifyToken";
import {getAllSubscriptions, addSubToPayments} from "../../controllers/subscription/sub.controller";

const router = app.Router()


router.get('/all', asyncHandler(verifyToken), asyncHandler(getAllSubscriptions))
router.post('/subscribe', asyncHandler(verifyToken), asyncHandler(addSubToPayments)) //check in middleware if number of users with membership < 500
router.post('/unsubscribe', asyncHandler(verifyToken))//put in 'api/auth/login' to verify if date.now() is between subStart & subEnd

export default router

import app from 'express'
import asyncHandler from "express-async-handler";
import verifyToken from "../../middlewares/verifyToken";
import {getAllSubscriptions, addSubToPayments} from "../../controllers/subscription/sub.controller";
import {addSubMiddleware} from "../../middlewares/sub";
import authRole from "../../middlewares/roles";
import config from "../../config/config";

const router = app.Router()


router.get('/all', asyncHandler(verifyToken), asyncHandler(getAllSubscriptions))
router.post('/subscribe', asyncHandler(verifyToken), authRole([config.roles.nonMember]), asyncHandler(addSubMiddleware), asyncHandler(addSubToPayments)) //check in middleware if number of users with membership < 500

export default router

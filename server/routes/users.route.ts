import app from 'express'
const asyncHandler = require('express-async-handler')
import authRole from "../middlewares/roles";
import config from "../config/config";
import {allUsers, messageToUser, getUserById} from '../controllers/users.controller'
import verifyToken from "../middlewares/verifyToken";

const router = app.Router()

router.get('/:clubCardId', asyncHandler(verifyToken), authRole([config.roles.admin, config.roles.member]), asyncHandler(getUserById))
router.get('', asyncHandler(verifyToken), authRole([config.roles.admin, config.roles.member]), asyncHandler(allUsers))
router.post('/send-message/:clubCardId', asyncHandler(verifyToken), authRole([config.roles.admin, config.roles.member]), asyncHandler(messageToUser)
)
export default router

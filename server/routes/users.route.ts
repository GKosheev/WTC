import app from 'express'
import asyncHandler from "express-async-handler";
import authRole from "../middleware/roles";
import config from "../config/config";

const controller = require("../controllers/users.controller")
const router = app.Router()
const passport = require('passport')

router.get('/:userId', passport.authenticate('jwt', {session: false}), authRole([config.roles.admin, config.roles.member]), asyncHandler(controller.getById))
router.get('', passport.authenticate('jwt', {session: false}), authRole([config.roles.admin, config.roles.member]), asyncHandler(controller.allUsers))
router.post('/send-message/:userId', passport.authenticate('jwt', {session: false}), authRole([config.roles.admin, config.roles.member]), asyncHandler(controller.messageToUser)
)
export default router

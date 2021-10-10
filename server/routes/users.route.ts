import app from 'express'
import asyncHandler from "express-async-handler";
const controller = require("../controllers/users.controller")
const router = app.Router()
const passport = require('passport')

router.get('/:userId', passport.authenticate('jwt', {session: false}), asyncHandler(controller.getById))
router.get('', passport.authenticate('jwt',{session: false}), asyncHandler(controller.allUsers))
router.post('/send-message/:userId', passport.authenticate('jwt', {session: false}), asyncHandler(controller.messageToUser))
module.exports = router

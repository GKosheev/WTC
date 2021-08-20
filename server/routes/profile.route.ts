import app from 'express'
import asyncHandler from "express-async-handler";
import passport from 'passport'

const controller = require('../controllers/profile.controller')
const router = app.Router()

router.post('/edit-profile', passport.authenticate('jwt', {session: false}), asyncHandler(controller.editProfile))

module.exports = router

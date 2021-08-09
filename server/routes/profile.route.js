const app = require('express')
const controller = require('../controllers/profile.controller')
const router = app.Router()
const passport = require('passport')
const asyncHandler = require('express-async-handler')

router.post('/edit-profile', passport.authenticate('jwt', {session: false}), asyncHandler(controller.editProfile))

module.exports = router

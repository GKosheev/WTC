const app = require('express')
const controller = require('../controllers/auth.controller')
const router = app.Router()
const asyncHandler = require('express-async-handler')
const passport = require('passport')


router.post('/register', asyncHandler(controller.register), controller.login)
router.post('/login', passport.authenticate('local'), controller.login)

module.exports = router


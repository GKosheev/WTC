import app from 'express'
import asyncHandler from 'express-async-handler'
import passport from 'passport'

const controller = require('../controllers/auth.controller')
const router = app.Router()

router.post('/register', asyncHandler(controller.register))
router.post('/login', passport.authenticate('local'), controller.login)
router.get('/me', passport.authenticate('jwt', {session: false}), controller.login)
router.get('/confirmation/:email/:token', controller.confirmEmail)
router.post('/resendLink', controller.resendLink)

module.exports = router


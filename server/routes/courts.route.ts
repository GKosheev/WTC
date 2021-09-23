import app from 'express'
import asyncHandler from 'express-async-handler'
import passport from 'passport'


const controller = require('../controllers/courts.controller')
const router = app.Router()

router.get('/:court/:date', passport.authenticate('jwt', {session: false}, controller.getCourt))

module.exports = router

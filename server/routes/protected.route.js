const app = require('express')
const controller = require("../controllers/protected.controller")
const router = app.Router()
const passport = require('passport')

router.get('/protected', passport.authenticate('jwt',{session: false}), controller.protected)

module.exports = router

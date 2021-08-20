import app from 'express'
import passport from "passport";

const controller = require("../controllers/protected.controller")
const router = app.Router()

router.get('/protected', passport.authenticate('jwt',{session: false}), controller.protected)

module.exports = router

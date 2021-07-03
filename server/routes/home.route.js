const app = require('express')
const controller = require('../controllers/home.controller')
const router = app.Router()

router.get('', controller.home)

module.exports = router

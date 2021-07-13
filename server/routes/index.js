const router = require('express').Router()

router.use('/auth', require('./auth.route'))
router.use('/test', require('./protected.route'))

module.exports = router

const router = require('express').Router()

router.use('/auth', require('./auth.route'))
router.use('/test', require('./protected.route'))
router.use('/profile', require('./profile.route'))
router.use('/table', require('./table'))

module.exports = router

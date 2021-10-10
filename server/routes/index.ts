const router = require('express').Router()

router.use('/auth', require('./auth.route'))
router.use('/users', require('./users.route'))
router.use('/profile', require('./profile.route'))

module.exports = router

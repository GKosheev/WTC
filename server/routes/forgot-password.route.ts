import app from 'express';

const controller = require('../controllers/forgot-password.controller')
const router = app.Router()

router.post('/forgot-password', controller.forgotPassword)

module.exports = router



import app from 'express';
import asyncHandler from 'express-async-handler'


const controller = require('../controllers/forgot-password.controller')
const router = app.Router()

router.post('/forgot-password', controller.forgotPassword)
router.post('/reset-password/:email/:token', asyncHandler(controller.resetPassword))

module.exports = router



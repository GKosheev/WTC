import express from "express";
import profile from './profile.route'
import users from './users.route'
import auth from './auth.route'
import payments from './payments.route'
import subscription from './subscription/sub.route'

const router = express.Router()

router.use('/auth', auth)
router.use('/users', users)
router.use('/profile', profile)
/*router.use('/courts', courts) */
router.use('/payments', payments)
router.use('/subscription', subscription)

export default router

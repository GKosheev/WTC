import express from "express";
import profile from './profile.route'
import users from './users.route'
import auth from './auth.route'
import payments from './payments.route'
import subscription from './subscription/sub.route'
import store from './store/store.route'
import courts from './courts/courts.route'
import tags from './store/item_tag.route'

const router = express.Router()

router.use('/auth', auth)
router.use('/users', users)
router.use('/profile', profile)
router.use('/courts', courts)
router.use('/payments', payments)
router.use('/subscription', subscription)
router.use('/store', store)
router.use('/tags', tags)

export default router

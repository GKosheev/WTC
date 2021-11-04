import app from 'express'
import asyncHandler from 'express-async-handler'
import passport from 'passport'
import {getCourts, postCourt, deleteCourt, putCourt} from '../controllers/courts.controller'
import {
  getCourtsMiddleware,
  deleteCourtsMiddleware,
  postCourtsMiddleware,
  putCourtsMiddleware
} from "../middleware/courts";
import authRole from "../middleware/roles";
import config from "../config/config";


const router = app.Router()

// get all courts for a specific day
router.get('/:courtType/:date', passport.authenticate('jwt', {session: false}), authRole([config.roles.admin, config.roles.member]), asyncHandler(getCourtsMiddleware), asyncHandler(getCourts))

// book a court for a specific day and time
router.post('/:courtType/:courtId/:date/:time', passport.authenticate('jwt', {session: false}), authRole([config.roles.admin, config.roles.member]), asyncHandler(postCourtsMiddleware), asyncHandler(postCourt))

// delete booked court
router.delete('/:courtType/:courtId/:date/:time', passport.authenticate('jwt', {session: false}), authRole([config.roles.admin, config.roles.member]), asyncHandler(deleteCourtsMiddleware), asyncHandler(deleteCourt))

// update booked court (allowed only for those who booked a court)
router.put('/:courtType/:courtId/:date/:time', passport.authenticate('jwt', {session: false}), authRole([config.roles.admin, config.roles.member]), asyncHandler(putCourtsMiddleware), asyncHandler(putCourt))

export default router

import app from 'express'
import asyncHandler from 'express-async-handler'
import passport from 'passport'
import * as controller from '../controllers/courts.controller'
import {
  getCourtsMiddleware,
  deleteCourtsMiddleware,
  postCourtsMiddleware,
  putCourtsMiddleware
} from "../middleware/courts";

const router = app.Router()

// get all courts for a specific day
router.get('/:courtType/:date', passport.authenticate('jwt', {session: false}), asyncHandler(getCourtsMiddleware), asyncHandler(controller.getCourts))

// book a court for a specific day and time
router.post('/:courtType/:courtId/:date/:time', passport.authenticate('jwt', {session: false}), asyncHandler(postCourtsMiddleware), asyncHandler(controller.postCourt))

// delete booked court
router.delete('/:courtType/:courtId/:date/:time', passport.authenticate('jwt', {session: false}), asyncHandler(deleteCourtsMiddleware), asyncHandler(controller.deleteCourt))

// update booked court (allowed only for those who booked a court)
router.put('/:courtType/:courtId/:date/:time', passport.authenticate('jwt', {session: false}), asyncHandler(putCourtsMiddleware), asyncHandler(controller.putCourt))

export default router

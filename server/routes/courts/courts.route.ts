import app from 'express'
const asyncHandler = require('express-async-handler')
import verifyToken from "../../middlewares/verifyToken";
import authRole from "../../middlewares/roles";
import config from "../../config/config";
import {getCourts, getGeneralCourtsInfo} from "../../controllers/courts/courts.controller";

const router = app.Router()

router.get('/info', asyncHandler(verifyToken), authRole([config.roles.admin, config.roles.member]), asyncHandler(getGeneralCourtsInfo))
router.get('/:courtType/:date', asyncHandler(verifyToken), authRole([config.roles.admin, config.roles.member]), asyncHandler(getCourts))
router.post ('/book-court')

export default router

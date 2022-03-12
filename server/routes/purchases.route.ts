import app from 'express'
const asyncHandler = require('express-async-handler')
import verifyToken from "../middlewares/verifyToken";
import {getAllPurchases} from "../controllers/purchases.controller";

const router = app.Router()


router.get('/all', asyncHandler(verifyToken), asyncHandler(getAllPurchases))

export default router

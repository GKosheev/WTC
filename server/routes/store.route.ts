import app from 'express'
import asyncHandler from 'express-async-handler'
import verifyToken from "../middlewares/verifyToken";
import {addItemToStorePayments, getAllStorePayments} from "../controllers/store.controller";

const router = app.Router()

router.get('/all', asyncHandler(verifyToken), asyncHandler(getAllStorePayments))
router.post('/buy-item', asyncHandler(verifyToken), asyncHandler(addItemToStorePayments))

export default router

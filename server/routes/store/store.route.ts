import app from 'express'
import asyncHandler from 'express-async-handler'
import verifyToken from "../../middlewares/verifyToken";
import {addItemToStorePayments, getAllStoreItems} from "../../controllers/store/store.controller";
import authRole from "../../middlewares/roles";
import config from "../../config/config";

const router = app.Router()

router.get('/all', asyncHandler(verifyToken), authRole([config.roles.admin, config.roles.member]), asyncHandler(getAllStoreItems))
router.post('/buy-item', asyncHandler(verifyToken), authRole([config.roles.admin, config.roles.member]), asyncHandler(addItemToStorePayments))

export default router

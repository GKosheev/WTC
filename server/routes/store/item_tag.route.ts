import app from 'express'
import asyncHandler from 'express-async-handler'
import verifyToken from "../../middlewares/verifyToken";
import authRole from "../../middlewares/roles";
import config from "../../config/config";
import {getAllStoreTags} from "../../controllers/store/item_tag.controller";

const router = app.Router()

router.get('/all', asyncHandler(verifyToken), authRole([config.roles.admin, config.roles.member]), asyncHandler(getAllStoreTags))

export default router

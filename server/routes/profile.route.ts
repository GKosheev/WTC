import app from 'express'
import asyncHandler from "express-async-handler";
import {editProfile} from "../controllers/profile.controller";
import verifyToken from "../middlewares/verifyToken";

const router = app.Router()

router.post('/edit-profile', asyncHandler(verifyToken), asyncHandler(editProfile))

export default router

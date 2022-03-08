import app from 'express'
import asyncHandler from "express-async-handler";
import {editProfile, uploadImage} from "../controllers/profile.controller";
import verifyToken from "../middlewares/verifyToken";
import multer from "multer"
import config from "../config/config";

const router = app.Router()

const upload = multer({
  dest: config.assetsPath
  // you might also want to set some limits: https://github.com/expressjs/multer#limits
});


router.post('/edit-profile', asyncHandler(verifyToken), asyncHandler(editProfile))
router.post('/upload-image', asyncHandler(verifyToken), upload.single('profile-image'), asyncHandler(uploadImage))

export default router

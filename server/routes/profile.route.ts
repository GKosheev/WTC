import app from 'express'
const asyncHandler = require('express-async-handler')
import {editProfile, uploadImage} from "../controllers/profile.controller";
import verifyToken from "../middlewares/verifyToken";
import multer from "multer"

const router = app.Router()
// SET STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

var upload = multer({ storage: storage })

router.post('/edit-profile', asyncHandler(verifyToken), asyncHandler(editProfile))
router.post('/upload-image', asyncHandler(verifyToken), upload.single('profile-image'), asyncHandler(uploadImage))

export default router

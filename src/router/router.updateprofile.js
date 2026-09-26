
import express from 'express'
export const profileRouter = express.Router()
import { profileUpload } from "../config/config.multer.js"
import { controllerProfile } from '../controller/controller.update.profile.js'
import { userHaveAccess } from '../middleware/middleware.user.accesseblity.js'

profileRouter.post('/updateProfile',userHaveAccess,profileUpload.single('userPic'), controllerProfile )
import express from "express";
const router = express.Router()
import { validateFileData } from "../validators/file.schema.js";
import {upload} from '../config/config.multer.js'
import { uploadCloudinary } from "../controller/controller.file.js";

router.post('/fileupload',upload.array('resume',5), validateFileData, uploadCloudinary)

export default router
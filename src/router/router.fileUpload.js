import express from "express";
const router = express.Router()
import { validateFileData } from "../validators/file.schema.js";
import {upload} from '../config/config.multer.js'
import { uploadCloudinary } from "../controller/controller.file.js";

router.post('/fileupload',upload.array('resume',5), validateFileData, uploadCloudinary)
router.post(
  "/fileupload-test",
  upload.array("resume", 5),
  (req, res) => {
    console.log("FILES:", req.files);

    res.json({
      success: true,
      fileCount: req.files?.length || 0,
      files: req.files?.map((file) => ({
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
      })),
    });
  }
);
export default router
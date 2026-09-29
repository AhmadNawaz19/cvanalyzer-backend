import express from "express";
const router = express.Router()
import { validateFileData } from "../validators/file.schema.js";
import {upload} from '../config/config.multer.js'
import { uploadCloudinary } from "../controller/controller.file.js";

router.post('/fileupload',upload.array('resume',5), validateFileData, uploadCloudinary)
router.post("/fileupload-test", (req, res) => {
  console.log("CONTENT TYPE:", req.headers["content-type"]);
  console.log("CONTENT LENGTH:", req.headers["content-length"]);

  let size = 0;

  req.on("data", (chunk) => {
    size += chunk.length;
  });

  req.on("end", () => {
    console.log("RAW BODY SIZE:", size);

    res.json({
      success: true,
      message: "Raw multipart request received",
      contentType: req.headers["content-type"],
      bodySize: size,
    });
  });

  req.on("error", (error) => {
    console.log("RAW REQUEST ERROR:", error.message);
  });
});
export default router
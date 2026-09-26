import multer from "multer"

const storage = multer.memoryStorage();

const ResumefileFilter = (req, file, cb) => {
  console.log('the filter method cell')
  const allowedType = [
    "application/pdf"
  ]
  if(allowedType.includes(file.mimetype)){
    cb(null, true)
  }else{
    cb(new Error('only pdf file allowed'))
  }
}
const profileFilter = (req, file, cb) => {
   if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed."));
  }
}

export const upload = multer({ 
  storage: storage,
  fileFilter : ResumefileFilter,
  limits : {
    fileSize: 5 * 1024 * 1024,
  }
 })

 export const profileUpload = multer ({
  storage : storage,
  fileFilter : profileFilter,
  limits : {
    fileSize: 5 * 1024 * 1024,
  }
 })
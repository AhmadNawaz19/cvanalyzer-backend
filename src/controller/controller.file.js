import { uploadToCloudinary } from "../services/uploadCloudinary.service.js";
import { FilesToDb, AnalyzedFile } from "../services/fileTodb.service.js"
import { ResumeAnalyze } from "../services/ai.service.js";

export const uploadCloudinary = async (req, res,) => {
   try {const {description} = req.body
    const uploadedFiles = [];
    for (const file of req.files){
        const result = await uploadToCloudinary(file.buffer, "pdfFile");
        uploadedFiles.push({
            description : description,
            file : {
                originalname : file.originalname,
                url : result.secure_url,
                publicId : result.public_id
            }
        })  
    }
     if(!uploadedFiles || uploadedFiles.length === 0){
            res.send('file not upload to cloudinary')
    }else{
        const result = await FilesToDb(uploadedFiles, req.user.id)
        if(!result || result.length === 0){
            res.send('file not upload to db')                           
        }else{
            const response = await ResumeAnalyze(result, req.files, description)
            await AnalyzedFile(req.user.id, response, description)
            res.status(200).json({
                success : true,
                message : "data",
                data : response
            })
        }   
    }}catch (err) {
        res.status(500).json({
            success : false,
            message : 'bad request',
            error : err
        })
    }

};
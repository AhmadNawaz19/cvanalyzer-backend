
import { uploadToCloudinary } from "../services/uploadCloudinary.service.js"
import { updateNamePicture } from "../services/user.service.js"
import { updateName } from "../services/user.service.js"
import { updatePicture } from "../services/user.service.js"

export const controllerProfile = async (req, res, next) => {
    const file = req.file?.buffer
    const userName = req.body?.userName
    console.log(file)
    if (!file && !userName) {
        return res.status(204).json({
            "success": false,
            "message": "there is no content"
        })
    } else {
        if (file && userName) {
            const result = await uploadToCloudinary(file, 'profilePicture');
            if (!result.public_id) {
                return res.status(204).json({
                    "success": false,
                    "message": "file not upload try again"
                })
            } else {
                const response = await updateNamePicture(result.secure_url, userName, req.user.email)
                console.log('response profile update', response)
                if (!response.success) {
                    return res.status(403).json(response)
                } else {
                    return res.status(200).json(response)
                }
            }
        }else if (file) {
            const result = await uploadToCloudinary(file, 'profilePicture');
            if (!result.public_id) {
                return res.status(204).json({
                    "success": false,
                    "message": "file not upload try again"
                })
            } else {
                const response = await updatePicture(result.secure_url, req.user.email)
                console.log('response profile update', response)
                if (!response.success) {
                    return res.status(403).json(response)
                } else {
                    return res.status(200).json(response)
                }
            }
        }
        else{
            const response = await updateName(userName, req.user.email);
            if(!response.success) return res.status(403).json(response);
            return res.status(200).json(response)
        }

    }
}


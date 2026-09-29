
import { checkUserExist } from "../services/user.service.js"

export const userHaveAccess = async (req, res, next) => {
    const result = await checkUserExist(req.user.email)
    if(!result.email){
        return res.status(401).json({
            "success" : false,
            "message" : "Unathurized User"
        })
    }else{
        next()
    }
}
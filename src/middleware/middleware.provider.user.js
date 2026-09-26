
import { checkUserExist } from "../services/user.service.js"
import { createToken } from "../services/jwt.service.js"

export const ProviderUserValidation = async (req, res, next) => {
    try {
        console.log('github..',req.user)
        console.log(req.user.email)
        if (req.user.email) {
            let response = await checkUserExist(req.user.email)
            console.log(response)
            if (!response) {
                next()
            } else {
                const token = await createToken(response.email, response.id);
                res.cookie('token', token, {
                    httpOnly: false,
                    secure: false
                })
                res.redirect("http://localhost:5173/profile")
            }
        }else{
            console.log('faile in provider user validation middleware..')
        }
    } catch {

    }
}
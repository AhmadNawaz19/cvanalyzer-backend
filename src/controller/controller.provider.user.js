
import { CreateProviderUser } from "../services/user.service.js"
import { createToken } from "../services/jwt.service.js"

export const ProviderUser = async (req, res) => {
    try {
        console.log('the CreateProviderUser is called')
        let response = await CreateProviderUser(req.user)
        console.log(response)
        if (!response.email) {
            res.redirect('http://localhost:5173/login')
        } else {
            const token = await createToken(response.email, response.id);
            console.log(token)
            if (token) {
                res.cookie('token', token, {
                    httpOnly: false,
                    secure: false
                })
                 res.redirect("http://localhost:5173/profile")
            }
        }
    } catch (err) {
        console.log(err)
    }
}
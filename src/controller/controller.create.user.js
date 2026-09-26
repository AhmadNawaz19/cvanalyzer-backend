
import { createUser } from "../services/user.service.js"
import crypto from 'crypto'
import { createToken } from "../services/jwt.service.js"
import bcrypt from 'bcrypt'

export const SignUp = (req, res) => {
    try {
        const data = req.body
        bcrypt.hash(data.password, 10, async (err, hash) => {
            if (err) {
                console.log('err in password hash')
            } else {
                const response = await createUser({ ...data, password: hash })
                if (!response.id) {
                    response.send('creation fail')
                } else {
                    const token = await createToken(response.email, response.id)
                    if (token) {
                        res.cookie('token', token, {
                            httpOnly: false,
                            secure: false
                        })
                        res.send(response)
                    }
                }
            }
        })

    } catch (err) {
        console.log(err)
    }
}


export const SignIn = async (req, res) => {
    try {
        const data = req.body;
        const token = await createToken(req.user.email, req.user.id )
        if (token) {
            res.cookie('token', token, {
                httpOnly: false,
                secure: false,
            })
            res.send('user created')
        } else {
            console.log('registration fail')
        }
    } catch (err) {
        console.log(err)
    }

}
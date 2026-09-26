import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const createToken = async (email, id) => {
    try{
        const token = await jwt.sign({
                id,
                email
            },
            process.env.JWT_SECRET
        )
        return token
    }catch(err) {
        console.log(err)
    }
}
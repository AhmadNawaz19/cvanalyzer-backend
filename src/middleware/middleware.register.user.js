import { success } from "zod";
import { checkUserExist } from "../services/user.service.js"
import bcrypt from 'bcrypt'


export const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        let response = await checkUserExist(email)
        console.log(response)
        if (!response) {
            next()
        } else {
            return res.status(409).json({
                message: "Cannot create two accounts with the same email",
            });
        }

    } catch (err) {
        console.log(err)
    }

}


export const validateUser = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const response = await checkUserExist(email);
        console.log('response -> ',response)
        if (!response) {
            return res.status(404).json({
                success : false,
                message: "Invalid email or password",
            });
        } else {
            bcrypt.compare(password, response.password, (err, result) => {
                if (err) return console.log('error in password compare in validatUser')
                else if (!result) return res.status(401).send('Invalid email or password');
                req.user = response
                next()
            })
        }
    } catch (err) {
        console.log(err)
    }
}
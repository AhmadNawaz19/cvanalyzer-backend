import z, { email } from "zod"

const userSchema1 = z.object({
    name: z.string().min(5, "minimum 5 digit name").regex(/[a-zA-Z][a-zA-Z0-9_.' ']+$/, "name constain a-z,A-Z,0-9,._"),
    email: z.email('inter valid email').endsWith('@gmail.com', 'Only Gmail addresses are allowed'),
    password: z.string().min(8, 'password minimum 8 digit').regex(/^[a-zA-Z0-9_.]+$/, "password constain a-z,A-Z,0-9,._")

})
const userSchema2 = z.object({
    email: z.email('inter valid email').endsWith('@gmail.com', 'Only Gmail addresses are allowed'),
    password: z.string().min(8, 'password minimum 8 digit').regex(/^[a-zA-Z0-9_.]+$/, "password constain a-z,A-Z,0-9,._")

})

export const validateCreateUserData = (req, res, next) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        res.status(400).send('this missing value')
    } else {
        const result = userSchema1.safeParse(req.body)
        if (!result.success) {
            return res.status(400).json({
                errors: result.error.flatten().fieldErrors,
            })
        } else {
            next();
        }
    }

}

export const validateLoginUserData = (req, res, next) => {
    try {
        
        const { email, password } = req.body
        if (!email || !password) {
            res.status(400).send('missing values')
        } else {
            const result = userSchema2.safeParse(req.body)
            if (!result.success) {
                return res.status(400).json({
                    errors: result.error.flatten().fieldErrors,
                })
            } else {
                next();
            }
        }
    } catch (err) {
        console.log(err)
    }

}
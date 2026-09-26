
import jwt from 'jsonwebtoken'

export const verifyToken = async (req, res, next) => {
    let token = req.cookies.token;
    if (!token){
       return res.status(401).json({
            success: false,
            message: "Authentication required"
        });
    }else{
        let decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    }
}

export const verifyTokenForLogin = async (req, res, next) => {
    let token = req.cookies.token;
    if (!token){
        next()
    }else{
        res.redirect("http://localhost:5173/profile")
    }
}
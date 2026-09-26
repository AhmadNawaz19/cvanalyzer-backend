

export const logout = (req, res) => {
    if (!req.cookies.token){
        res.status(404).json({
            "success" : false,
            "message" : "No current user login"
        })
    }else{
        res.clearCookie('token')
        res.status(200).json({
            "success" : true,
            "message" : "Account Logout"
        })
    }
}
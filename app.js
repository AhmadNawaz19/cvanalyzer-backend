import express from "express";
import cors from 'cors'
import CookieParser from 'cookie-parser'
import userRouter from "./src/router/router.user.js";
import googleLoginRouter from './src/router/router.googleLogin.js'
import githubLoginRouter from './src/router/router.githubLogin.js'
import fileUploadRouter from './src/router/router.fileUpload.js'
import dataRouter from './src/router/router.userData.js'
import historyRouter from "./src/router/router.history.js";
import "./src/config/config.github.js";
import { profileRouter } from "./src/router/router.updateprofile.js";
import {reviewRouter} from './src/router/router.reviews.js'

import { handleMulterError } from "./src/middleware/middleware.multerError.handling.js";
import { verifyToken, verifyTokenForLogin } from "./src/middleware/middleware.verifyToken.js";
import { logout } from "./src/middleware/middleware.logout.js";

import passport from "./src/config/config.google.js";

const app = express();

app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))
app.use(CookieParser())
app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use(passport.initialize());

app.get('/', (req, res) => {
    res.send('helllo')
})
app.use('/user', userRouter)
app.use('/auth', verifyTokenForLogin, googleLoginRouter)
app.use('/githubauth', verifyTokenForLogin, githubLoginRouter)
app.use('/file',verifyToken, fileUploadRouter)
app.use('/profile', verifyToken, profileRouter)
app.use('/logout', logout)
app.use('/userData', verifyToken, dataRouter)
app.use('/history',verifyToken, historyRouter)
app.use('/preferCV', verifyToken, historyRouter)
app.use('/review', reviewRouter)
app.use('/delete',historyRouter)

app.use(handleMulterError)

export default app
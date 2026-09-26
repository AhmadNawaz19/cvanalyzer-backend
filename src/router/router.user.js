import express from 'express'
const userRouter = express.Router();

import { registerUser, validateUser } from '../middleware/middleware.register.user.js';
import { SignUp, SignIn } from '../controller/controller.create.user.js';
import { validateCreateUserData, validateLoginUserData } from '../validators/user.schema.js';

userRouter.post('/createUser',validateCreateUserData ,registerUser, SignUp)
userRouter.post('/loginUser',validateLoginUserData, validateUser, SignIn)

export default userRouter
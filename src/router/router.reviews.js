import express from 'express'
export const reviewRouter = express.Router()
import {reviews, getReviews, getAllReviews} from '../services/user.service.js'
import { verifyToken } from "../middleware/middleware.verifyToken.js";


reviewRouter.post('/postReview',verifyToken, reviews)
reviewRouter.get('/getReview', getReviews)
reviewRouter.get('/getAllReview', getAllReviews)
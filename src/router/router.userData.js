import express from 'express'
const dataRouter = express.Router()

import {fetchUserData} from '../services/user.service.js'

dataRouter.get('/data', fetchUserData)

export default dataRouter
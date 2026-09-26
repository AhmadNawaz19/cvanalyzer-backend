import express from 'express'
import {historyData, PreferCV, deleteAllUserFiles} from '../services/user.service.js'
const historyRouter = express.Router()

historyRouter.get('/historyData',historyData)
historyRouter.get('/preferCVdata',PreferCV)
historyRouter.post('/deletehistoryData', deleteAllUserFiles)

export default historyRouter
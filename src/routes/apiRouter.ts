import express from 'express'
import { createShortUrl, getLongUrlResponse } from '../controllers/apiController'

export const apiRouter = express.Router()

apiRouter.post('/api/newUrl', createShortUrl)

apiRouter.get('/api/originalUrl', getLongUrlResponse)

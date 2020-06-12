import express from 'express'
import { createShortUrl } from '../controllers/apiController'

export const apiRouter = express.Router()

apiRouter.post('/api/newUrl', createShortUrl)

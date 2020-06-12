import express from 'express'
import { getLongUrl } from '../controllers/rootController'
export const rootRouter = express.Router()

rootRouter.get('/:shortUrl', getLongUrl)

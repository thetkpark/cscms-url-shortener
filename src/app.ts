import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import { apiRouter } from './routes/apiRouter'
import { rootRouter } from './routes/rootRoutes'

export const app = express()

app.use(express.static('web'))
app.use(bodyParser.json())
app.use(apiRouter)
app.use(rootRouter)

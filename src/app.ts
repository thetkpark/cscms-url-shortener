import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import { apiRouter } from './routes/apiRouter'
import { rootRouter } from './routes/rootRoutes'

export const app = express()

app.use(express.static('client/build'))
app.use(cors())
app.use(helmet())
app.use(bodyParser.json())
app.use(apiRouter)
app.use(rootRouter)

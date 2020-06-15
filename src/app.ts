import express from 'express'
import https from 'https'
import fs from 'fs'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import { apiRouter } from './routes/apiRouter'
import { rootRouter } from './routes/rootRoutes'
import dotenv from 'dotenv'
dotenv.config()

let httpsOptions = {}

if (process.env.TLSKEYPATH && process.env.TLSCERTPATH) {
	httpsOptions = {
		key: fs.readFileSync(process.env.TLSKEYPATH),
		cert: fs.readFileSync(process.env.TLSCERTPATH)
	}
}

const app = express()

app.use(express.static('client/build'))
app.use(cors())
app.use(helmet())
app.use(bodyParser.json())
app.use(apiRouter)
app.use(rootRouter)

export const server = https.createServer(httpsOptions, app)

import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import { ApolloServer } from 'apollo-server-express'
import { apiRouter } from './routes/apiRouter'
import { rootRouter } from './routes/rootRoutes'
import schema from './schema/index'
import resolvers from './resolvers/index'

export const app = express()

if (!process.env.COSMOSDB_ENDPOINT) throw new Error('COSMOSDB_ENDPOINT env is required')
if (!process.env.COSMOSDB_KEY) throw new Error('COSMOSDB_KEY env is required')
if (!process.env.ENTRYPOINT) throw new Error('ENTRYPOINT env is required')

app.use(express.static('client/build'))
app.use(cors())
app.use(helmet())
app.use(bodyParser.json())
app.use(apiRouter)
app.use(rootRouter)

// GraphQL
const server = new ApolloServer({
	typeDefs: schema,
	resolvers,
	introspection: true,
	playground: true
})
server.applyMiddleware({ app })

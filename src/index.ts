import { app } from './app'

const port = process.env.PORT || 3050

if (!process.env.COSMOSDB_ENDPOINT) throw new Error('COSMOSDB_ENDPOINT env is required')
if (!process.env.COSMOSDB_KEY) throw new Error('COSMOSDB_KEY env is required')
if (!process.env.ENTRYPOINT) throw new Error('ENTRYPOINT env is required')

app.listen(port, (): void => {
	console.log(`Running on ${port}`)
})

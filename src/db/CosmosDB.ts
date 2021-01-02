import { Container, CosmosClient } from '@azure/cosmos'
import dotenv from 'dotenv'
dotenv.config()

class CosmosDB {
	endpoint: string = ''
	key: string = ''
	client: CosmosClient

	constructor() {
		if (process.env.COSMOSDB_ENDPOINT && process.env.COSMOSDB_KEY) {
			this.endpoint = process.env.COSMOSDB_ENDPOINT
			this.key = process.env.COSMOSDB_KEY
		}
		this.client = new CosmosClient({ endpoint: this.endpoint, key: this.key })
	}

	async getUrlContainer() {
		const { database } = await this.client.databases.createIfNotExists({ id: 'url' })
		const { container } = await database.containers.createIfNotExists({
			id: 'url1'
		})
		return container
	}
}

export const getCosmosContainer = async ():Promise<Container> => {
	const cosmos:CosmosDB = new CosmosDB()
	const container = await cosmos.getUrlContainer()
	return container
}
import { app } from '../app'
import { getCosmosTestContainer } from '../db/CosmosDB'

beforeEach(async () => {
	const container = await getCosmosTestContainer()
	await container.delete()
})

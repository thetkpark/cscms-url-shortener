import { getCosmosTestContainer } from '../db/CosmosDB'

afterEach(async () => {
	const container = await getCosmosTestContainer()
	await container.delete()
})

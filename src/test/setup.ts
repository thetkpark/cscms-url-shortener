import { getCosmosContainer } from '../db/CosmosDB'

afterEach(async () => {
	const container = await getCosmosContainer()
	await container.delete()
})

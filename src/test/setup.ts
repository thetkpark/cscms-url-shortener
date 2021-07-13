import { getCosmosContainer } from '../db/CosmosDB'

afterEach(async () => {
	const container = await getCosmosContainer()
	console.log(container.url)
	// await container.delete()
})

import { customAlphabet } from 'nanoid/async'
import { getCosmosContainer } from '../db/CosmosDB'

const alphabet = '0123456789abcdefghijklmnopqrstuvwxyz'
const nanoid = customAlphabet(alphabet, 6)

export const generateUniqueToken = async (): Promise<string> => {
	const container = await getCosmosContainer()
	let shortenUrl: string = ''
	while (true) {
		shortenUrl = await nanoid()
		const { resources } = await container.items
			.query({
				query: `SELECT c.longurl FROM c WHERE c.shorturl = "${shortenUrl}"`
			})
			.fetchAll()
		if (resources.length === 0) {
			return shortenUrl
		}
	}
}

export const generateToken = () => {
	return nanoid()
}

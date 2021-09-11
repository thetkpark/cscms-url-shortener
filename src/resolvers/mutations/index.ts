import { UserInputError, ApolloError } from 'apollo-server-express'
import { getCosmosContainer } from '../../db/CosmosDB'
import { generateUniqueToken } from '../../util/generateToken'

const shortenUrl = async (_, { url: longurl, prefer }) => {
	try {
		const container = await getCosmosContainer()
		let shortenUrl: string
		if (prefer) {
			const existingURL = await container.items
				.query({
					query: `SELECT * FROM c WHERE c.shorturl = @perfer`,
					parameters: [{ name: '@perfer', value: prefer }]
				})
				.fetchAll()
			if (existingURL.resources.length !== 0)
				throw new UserInputError(`'${prefer}' has been used`)
			shortenUrl = prefer
		} else {
			shortenUrl = await generateUniqueToken()
			const existingURL = await container.items
				.query({
					query: `SELECT * FROM c WHERE c.longurl = @originalUrl`,
					parameters: [{ name: '@originalUrl', value: longurl }]
				})
				.fetchAll()
			if (existingURL.resources.length !== 0) {
				const slugShortenUrl = existingURL.resources.find(
					el => el.shorturl.length !== 6
				)
				return {
					longUrl: longurl,
					shortUrl: slugShortenUrl.shorturl,
					visit: slugShortenUrl.visit
				}
			}
		}

		const url = {
			longUrl: longurl,
			shortUrl: shortenUrl,
			visit: 0
		}

		await container.items.create({
			longurl,
			shorturl: shortenUrl,
			visit: 0
		})
		return url
	} catch (error) {
		throw new ApolloError(error as string)
	}
}

export default { shortenUrl }

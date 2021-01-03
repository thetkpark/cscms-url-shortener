import { UserInputError, ApolloError } from 'apollo-server-express'
import { getCosmosContainer } from '../../db/CosmosDB'
import { generateUniqueToken } from '../../util/generateToken'

const shortenUrl = async (_, { url: longurl, prefer }) => {
	try {
		const container = await getCosmosContainer()
		let shortenUrl: string
		if (prefer) {
			const existingURL = await container.items
				.query(`SELECT * FROM url1 WHERE url1.shorturl = "${prefer}"`)
				.fetchAll()
			if (existingURL.resources.length !== 0)
				throw new UserInputError(`'${prefer}' has been used`)
			shortenUrl = prefer
		} else {
			shortenUrl = await generateUniqueToken()
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
		throw new ApolloError(error)
	}
}

export default { shortenUrl }

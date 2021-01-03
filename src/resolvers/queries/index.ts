import { User } from '@azure/cosmos'
import { UserInputError, ApolloError } from 'apollo-server-express'
import { getCosmosContainer } from '../../db/CosmosDB'

const longUrlQuery = async (_, { shortenPath }) => {
	try {
		const container = await getCosmosContainer()
		const urls = await container.items
			.query(`SELECT * FROM url1 WHERE url1.shorturl = "${shortenPath}"`)
			.fetchAll()
		if (urls.resources.length === 0) throw new UserInputError('URL not found')
		const url = {
			longUrl: urls.resources[0].longurl,
			shortUrl: urls.resources[0].shorturl,
			visit: urls.resources[0].visit ? urls.resources[0].visit : 0
		}
		return url
	} catch (error) {
		throw new ApolloError(error)
	}
}

export default { getLongUrl: longUrlQuery }

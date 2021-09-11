import { User } from '@azure/cosmos'
import { UserInputError, ApolloError } from 'apollo-server-express'
import { getCosmosContainer } from '../../db/CosmosDB'
import { NotFoundError } from '../../errors/NotFoundError'
import { getOriginalUrl } from '../../util/url'

const longUrlQuery = async (_, { shortenPath }) => {
	try {
		const urlData = await getOriginalUrl(shortenPath)
		return {
			longUrl: urlData.longurl,
			shortUrl: urlData.shorturl,
			visit: urlData.visit
		}
	} catch (e) {
		if (e instanceof NotFoundError) {
			throw new UserInputError(e.message)
		}
		throw new ApolloError(e as string)
	}
}

export default { getLongUrl: longUrlQuery }

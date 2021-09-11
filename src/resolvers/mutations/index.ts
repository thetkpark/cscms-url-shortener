import { UserInputError, ApolloError } from 'apollo-server-express'
import { getCosmosContainer } from '../../db/CosmosDB'
import { BadRequestError } from '../../errors/BadRequestError'
import { generateUniqueToken } from '../../util/generateToken'
import { getShortenUrl } from '../../util/url'

const shortenUrl = async (_, { url: longurl, prefer }) => {
	try {
		const urlData = await getShortenUrl(longurl, prefer)
		return {
			longUrl: urlData.longurl,
			shortUrl: urlData.shorturl,
			visit: urlData.visit
		}
	} catch (e) {
		if (e instanceof BadRequestError) {
			throw new UserInputError(e.message)
		}
		throw new ApolloError(e as string)
	}
}

export default { shortenUrl }

import validator from 'validator'
import { getCosmosContainer } from '../db/CosmosDB'
import { BadRequestError } from '../errors/BadRequestError'
import { NotFoundError } from '../errors/NotFoundError'
import { URLData } from '../types/url-data'
import { generateUniqueToken } from './generateToken'

export const getShortenUrl = async (
	originalUrl: string,
	prefer?: string
): Promise<URLData> => {
	if (!validator.isURL(originalUrl)) throw new BadRequestError('Invalid URL')

	const container = await getCosmosContainer()
	const urlData: URLData = {
		longurl: originalUrl,
		shorturl: await generateUniqueToken(),
		visit: 0
	}

	if (prefer) {
		// Check if prefer is exist
		const existingURL = await container.items
			.query({
				query: `SELECT * FROM c WHERE c.shorturl = @prefer`,
				parameters: [{ name: '@prefer', value: prefer }]
			})
			.fetchAll()
		if (existingURL.resources.length !== 0)
			throw new BadRequestError(`${prefer} slug is in used`)

		urlData.shorturl = prefer
	} else {
		// Check if this URL is exist before
		const existingURL = await container.items
			.query({
				query: `SELECT * FROM c WHERE c.longurl = @originalUrl`,
				parameters: [{ name: '@originalUrl', value: originalUrl }]
			})
			.fetchAll()
		if (existingURL.resources.length !== 0) {
			const slugShortenUrl = existingURL.resources.find(
				el => el.shorturl.length !== 6
			)
			if (slugShortenUrl) {
				urlData.shorturl = slugShortenUrl.shorturl
				urlData.visit = slugShortenUrl.visit || 0
			} else {
				urlData.shorturl = existingURL.resources[0].shorturl
				urlData.visit = existingURL.resources[0].visit || 0
			}
			return urlData
		}
	}

	if (!originalUrl.includes('loadTestingUrlThatNoOneGonnaUse')) {
		await container.items.create(urlData)
	}

	return urlData
}

export const getOriginalUrl = async (shortUrl: string): Promise<URLData> => {
	const container = await getCosmosContainer()
	const { resources } = await container.items
		.query({
			query: `SELECT * FROM c WHERE c.shorturl = @shortUrl`,
			parameters: [{ name: '@shortUrl', value: shortUrl }]
		})
		.fetchAll()

	if (resources.length === 0) throw new NotFoundError()

	const urlData = resources[0]
	if (!urlData.visit) urlData.visit = 1
	await container.items.upsert(urlData)

	return urlData
}

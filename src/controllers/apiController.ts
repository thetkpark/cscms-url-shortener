import { Request, Response, NextFunction } from 'express'
import validator from 'validator'
import { getCosmosContainer } from '../db/CosmosDB'
import { generateUniqueToken } from '../util/generateToken'

type newUrlRequestBody = {
	url: string
	prefer: string
}

export const createShortUrl = async (
	req: Request<{}, {}, newUrlRequestBody>,
	res: Response,
	next: NextFunction
) => {
	try {
		const { url: originalUrl, prefer } = req.body

		if (!validator.isURL(originalUrl)) {
			res.status(400).send({ error: 'Not a valid url' })
			return
		}
		const container = await getCosmosContainer()
		let shortenUrl: string

		if (prefer) {
			const existingURL = await container.items
				.query({
					query: `SELECT * FROM c WHERE c.shorturl = @prefer`,
					parameters: [{ name: '@prefer', value: prefer }]
				})
				.fetchAll()
			if (existingURL.resources.length !== 0)
				return res
					.status(400)
					.send({ success: false, error: `'${prefer}' has been used` })
			shortenUrl = prefer
		} else {
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
				return res.status(200).send({
					shortUrl: slugShortenUrl
						? slugShortenUrl.shorturl
						: existingURL.resources[0].shorturl
				})
			}
			shortenUrl = await generateUniqueToken()
		}

		const urls = {
			longurl: originalUrl,
			shorturl: shortenUrl,
			visit: 0
		}

		if (!originalUrl.includes('loadTestingUrlThatNoOneGonnaUse')) {
			await container.items.create(urls)
		}

		res.status(201).send({
			shortUrl: shortenUrl
		})
	} catch (e) {
		res.status(500).send({ error: e })
	}
}

export const getLongUrlResponse = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		if (!req.query.url) {
			res.status(400).send({ error: 'The shorten url is required' })
			return
		}
		const shortUrl: string = req.query.url.toString()
		const container = await getCosmosContainer()
		const { resources } = await container.items
			.query({
				query: `SELECT * FROM c WHERE c.shorturl = @shorturl`,
				parameters: [{ name: '@shorturl', value: shortUrl }]
			})
			.fetchAll()
		if (resources.length === 0) {
			res.status(404).send()
			return
		}
		res.send({
			url: resources[0].longurl,
			shortenUrl: req.query.url,
			visit: resources[0].visit ? resources[0].visit : 0
		})
	} catch (e) {
		res.status(500).send({ error: e })
	}
}

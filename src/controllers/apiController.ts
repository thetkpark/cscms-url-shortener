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
		if (!validator.isURL(req.body.url)) {
			res.status(400).send({ error: 'Not a valid url' })
			return
		}
		const prefer = req.body.prefer
		const container = await getCosmosContainer()
		let shortenUrl: string

		if (prefer) {
			const existingURL = await container.items
				.query(`SELECT * FROM url1 WHERE url1.shorturl = "${prefer}"`)
				.fetchAll()
			if (existingURL.resources.length !== 0)
				return res
					.status(400)
					.send({ success: false, error: `'${prefer}' has been used` })
			shortenUrl = prefer
		} else {
			shortenUrl = await generateUniqueToken()
		}

		const urls = {
			longurl: req.body.url,
			shorturl: shortenUrl,
			visit: 0
		}

		await container.items.create(urls)
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
		const shortUrl: string = req.query.url.toString().toLowerCase()
		const container = await getCosmosContainer()
		const { resources } = await container.items
			.query({
				query: `SELECT * FROM url1 WHERE url1.shorturl = "${shortUrl}"`
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

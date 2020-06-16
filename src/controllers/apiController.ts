import { Request, Response, NextFunction } from 'express'
import validator from 'validator'
import { CosmosDB } from '../db/CosmosDB'
import sha256 from 'crypto-js/sha256'

type newUrlRequestBody = {
	url: string
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
		let unique: boolean = false
		const cosmos = new CosmosDB()
		const container = await cosmos.getUrlContainer()
		const now: Date = new Date()
		const hashedUrl: string = sha256(now.getTime() + req.body.url).toString()
		let shortenUrl: string = ''
		while (!unique) {
			for (let i = 1; i <= 6; i++) {
				const index = Math.round(Math.random() * hashedUrl.length)
				shortenUrl += hashedUrl.charAt(index)
			}
			const { resources } = await container.items
				.query({
					query: `SELECT url1.longurl FROM url1 WHERE url1.shorturl = "${shortenUrl}"`
				})
				.fetchAll()
			if (resources.length === 0) {
				unique = true
			}
		}

		const urls = {
			longurl: req.body.url,
			shorturl: shortenUrl
		}

		container.items.create(urls)

		res.send({
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
		const cosmos = new CosmosDB()
		const container = await cosmos.getUrlContainer()
		const { resources } = await container.items
			.query({
				query: `SELECT url1.longurl FROM url1 WHERE url1.shorturl = "${shortUrl}"`
			})
			.fetchAll()
		if (resources.length === 0) {
			res.status(404).send()
			return
		}
		const longUrl = resources[0].longurl
		res.send({ url: longUrl })
	} catch (e) {
		res.status(500).send({ error: e })
	}
}

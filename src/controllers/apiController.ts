import { Request, Response, NextFunction } from 'express'
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
	const now: Date = new Date()
	const hashedUrl: string = sha256(now.getTime() + req.body.url).toString()
	console.log(hashedUrl)
	let shortenUrl = ''
	for (let i = 1; i <= 6; i++) {
		const index = Math.round(Math.random() * hashedUrl.length)
		console.log(index)
		shortenUrl += hashedUrl.charAt(index)
	}

	const urls = {
		longurl: req.body.url,
		shorturl: shortenUrl
	}

	const cosmos = new CosmosDB()
	const container = await cosmos.getUrlContainer()
	container.items.create(urls)

	res.send({
		shortUrl: shortenUrl
	})
}

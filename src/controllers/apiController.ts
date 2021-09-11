import { Request, Response, NextFunction } from 'express'
import { BadRequestError } from '../errors/BadRequestError'
import { NotFoundError } from '../errors/NotFoundError'
import { getOriginalUrl, getShortenUrl } from '../util/url'

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

		const urlData = await getShortenUrl(originalUrl, prefer)

		res.status(201).send({
			shortUrl: urlData.shorturl
		})
	} catch (e) {
		if (e instanceof BadRequestError) {
			return res.status(400).send({ error: e.message })
		}
		return res.status(500).send({ error: e })
	}
}

export const getLongUrlResponse = async (req: Request, res: Response) => {
	if (!req.query.url) {
		res.status(400).send({ error: 'The shorten url is required' })
		return
	}
	try {
		const {
			longurl: url,
			shorturl: shortenUrl,
			visit
		} = await getOriginalUrl(req.query.url.toString())
		return res.send({
			url,
			shortenUrl,
			visit
		})
	} catch (e) {
		if (e instanceof NotFoundError)
			return res.status(404).send({ error: 'Not Found' })
		return res.status(500).send({ error: e })
	}
}

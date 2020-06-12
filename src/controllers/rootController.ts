import { Request, Response, NextFunction } from 'express'
import { CosmosDB } from '../db/CosmosDB'

export const getLongUrl = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const shortUrl = req.params.shortUrl
		const cosmos = new CosmosDB()
		const container = await cosmos.getUrlContainer()
		const { resources } = await container.items
			.query({
				query: `SELECT url1.longurl FROM url1 WHERE url1.shorturl = "${shortUrl}"`
			})
			.fetchAll()

		const longUrl = resources[0].longurl
		res.redirect(longUrl)
	} catch (e) {
		res.status(500).send({ error: e })
	}
}

import { Request, Response, NextFunction } from 'express'
import { getCosmosContainer } from '../db/CosmosDB'
import { Container } from '@azure/cosmos'

export const getLongUrl = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const shortUrl: string = req.params.shortUrl.toLowerCase()
		const container: Container = await getCosmosContainer()
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
		res.redirect(longUrl)
	} catch (e) {
		res.status(500).send({ error: e })
	}
}

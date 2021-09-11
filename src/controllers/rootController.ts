import { Request, Response, NextFunction } from 'express'
import { getCosmosContainer } from '../db/CosmosDB'
import { Container } from '@azure/cosmos'

interface URL {
	longurl: string
	shorturl: string
	id: string
	visit: number
}

export const getLongUrl = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const shortUrl: string = req.params.shortUrl
		const container: Container = await getCosmosContainer()

		const { resources } = await container.items
			.query({
				query: `SELECT * FROM c WHERE c.shorturl = @shorturl`,
				parameters: [{ name: '@shorturl', value: shortUrl }]
			})
			.fetchAll()
		if (resources.length === 0) {
			return res.redirect(process.env.ENTRYPOINT!)
		}
		const url: URL = resources[0]

		if (!url.visit) {
			url.visit = 1
		} else url.visit += 1

		await container.item(url.id).replace(url)

		const longUrl = url.longurl
		res.redirect(longUrl)
	} catch (e) {
		res.status(500).send({ error: e })
	}
}

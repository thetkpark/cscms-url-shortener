import { Request, Response, NextFunction } from 'express'
import { NotFoundError } from '../errors/NotFoundError'
import { getOriginalUrl } from '../util/url'

export const getLongUrl = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const shortUrl: string = req.params.shortUrl
		const { longurl } = await getOriginalUrl(shortUrl)
		res.redirect(longurl)
	} catch (e) {
		if (e instanceof NotFoundError)
			return res.redirect(process.env.ENTRYPOINT as string + "/404")
		res.status(500).send({ error: e })
	}
}

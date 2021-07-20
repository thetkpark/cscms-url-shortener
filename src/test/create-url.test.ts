import request from 'supertest'
import { app } from '../app'
import { getCosmosContainer } from '../db/CosmosDB'
import { generateToken, generateUniqueToken } from '../util/generateToken'

describe('Create new shorten URL', () => {
	it('return 400 if invalid URL is provided', async () => {
		await request(app)
			.post('/api/newUrl')
			.send({
				url: 'urlThatIsNotValid'
			})
			.expect(400)

		await request(app)
			.post('/api/newUrl')
			.send({
				url: 'hts:/awdjajwdnjan.com'
			})
			.expect(400)
	})

	it('can create shorten url', async () => {
		const originalUrl = 'https://google.com'
		const res = await request(app)
			.post('/api/newUrl')
			.send({
				url: originalUrl
			})
			.expect(201)

		const { shortUrl } = res.body
		expect(shortUrl.length).toEqual(6)

		const container = await getCosmosContainer()
		const url = await container.items
			.query(`SELECT * FROM c WHERE c.shorturl = "${shortUrl}"`)
			.fetchAll()
		expect(url.resources.length).toEqual(1)
		expect(url.resources[0].longurl).toEqual(originalUrl)
	})

	it('can create shorten url with prefered name', async () => {
		const originalUrl = 'https://google.com'
		const preferedUrl = 'google'
		const res = await request(app)
			.post('/api/newUrl')
			.send({
				url: originalUrl,
				prefer: preferedUrl
			})
			.expect(201)

		const { shortUrl } = res.body
		expect(shortUrl).toEqual(preferedUrl)

		const container = await getCosmosContainer()
		const url = await container.items
			.query(`SELECT * FROM c WHERE c.shorturl = "${shortUrl}"`)
			.fetchAll()
		expect(url.resources.length).toEqual(1)
		expect(url.resources[0].longurl).toEqual(originalUrl)
	})

	it('return 400 if existing prefered name is provided', async () => {
		const container = await getCosmosContainer()
		const originalUrl = 'https://google.com'
		const preferedUrl = 'google'

		await container.items.create({
			longurl: originalUrl,
			shorturl: preferedUrl,
			visit: 0
		})

		await request(app)
			.post('/api/newUrl')
			.send({
				url: originalUrl,
				prefer: preferedUrl
			})
			.expect(400)
	})

	it('return existing shortUrl if it exists and no prefered url is provided', async () => {
		const container = await getCosmosContainer()
		const originalUrl = 'https://google.com'
		const preferedUrl = 'google'

		await container.items.create({
			longurl: originalUrl,
			shorturl: preferedUrl,
			visit: 0
		})

		const res = await request(app)
			.post('/api/newUrl')
			.send({ url: originalUrl })
			.expect(200)
		expect(res.body.shortUrl).toEqual(preferedUrl)
	})

	it('return existing unrandom shortUrl if it exists and no prefered url is provided', async () => {
		const container = await getCosmosContainer()
		const originalUrl = 'https://google.com'
		const preferedUrl = 'googleUrl'

		const shortUrl = await Promise.all([generateToken(), generateToken()])
		await Promise.all([
			await container.items.create({
				longurl: originalUrl,
				shorturl: shortUrl[0],
				visit: 0
			}),
			await container.items.create({
				longurl: originalUrl,
				shorturl: shortUrl[1],
				visit: 0
			}),
			await container.items.create({
				longurl: originalUrl,
				shorturl: preferedUrl,
				visit: 0
			})
		])

		const res = await request(app)
			.post('/api/newUrl')
			.send({ url: originalUrl })
			.expect(200)
		expect(res.body.shortUrl).toEqual(preferedUrl)
	})

	it('return existing random shortUrl if it exists, no prefered url is provided, and no existing perfer url', async () => {
		const container = await getCosmosContainer()
		const originalUrl = 'https://google.com'
		const preferedUrl = 'google'

		const shortUrl = await Promise.all([generateToken(), generateToken()])
		await Promise.all([
			await container.items.create({
				longurl: originalUrl,
				shorturl: shortUrl[0],
				visit: 0
			}),
			await container.items.create({
				longurl: originalUrl,
				shorturl: shortUrl[1],
				visit: 0
			})
		])

		const res = await request(app)
			.post('/api/newUrl')
			.send({ url: originalUrl })
			.expect(200)
		expect(
			res.body.shortUrl === shortUrl[0] || res.body.shortUrl === shortUrl[1]
		).toBeTruthy()
	})
})

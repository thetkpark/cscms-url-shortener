import request from 'supertest'
import { app } from '../app'
import { getCosmosContainer } from '../db/CosmosDB'

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
		const originalUrl =
			'https://baconipsum.com/api/?type=all-meat&sentences=1&start-with-lorem=1'
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
		const originalUrl =
			'https://baconipsum.com/api/?type=all-meat&sentences=1&start-with-lorem=1'
		const preferedUrl = 'bacon'
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
		const originalUrl =
			'https://baconipsum.com/api/?type=all-meat&sentences=1&start-with-lorem=1'
		const preferedUrl = 'bacon'

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
})

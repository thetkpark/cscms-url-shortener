import request from 'supertest'
import { app } from '../app'
import { getCosmosContainer } from '../db/CosmosDB'

describe('Get and access the original URL from shorten URL', () => {
	const originalUrl = 'https://google.com'
	const preferedUrl = 'google'
	beforeEach(async () => {
		const container = await getCosmosContainer()
		await container.items.create({
			longurl: originalUrl,
			shorturl: preferedUrl,
			visit: 0
		})
	}, 10000)

	it('return 400 if invalid shorturl is suppiled', async () => {
		await request(app).get('/api/originalUrl').send().expect(400)
	})

	it('return 404 if not found', async () => {
		await request(app).get('/api/originalUrl?url=someUrl').send().expect(404)
	})

	it('can get original url', async () => {
		const res = await request(app)
			.get(`/api/originalUrl?url=${preferedUrl}`)
			.send()
			.expect(200)
		expect(res.body.url).toEqual(originalUrl)
		expect(res.body.shortenUrl).toEqual(preferedUrl)
	})

	it('can redirect user to original url', async () => {
		const res = await request(app).get(`/${preferedUrl}`).send().expect(302)
		expect(res.headers.location).toEqual(originalUrl)
	})
})

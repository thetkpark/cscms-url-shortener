import request from 'supertest'
import { app } from '../app'
import { getCosmosContainer } from '../db/CosmosDB'

describe('Get and access the original URL from shorten URL', () => {
	const originalUrl =
		'https://baconipsum.com/api/?type=all-meat&sentences=1&start-with-lorem=1'
	const preferedUrl = 'bacon-lorem'
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
})

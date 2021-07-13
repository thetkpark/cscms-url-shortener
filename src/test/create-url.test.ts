import request from 'supertest'
import { app } from '../app'

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

	it.skip('can create shorten url', async () => {
		const res = await request(app)
			.post('/api/newUrl')
			.send({
				url: 'https://baconipsum.com/api/?type=all-meat&sentences=1&start-with-lorem=1'
			})
			.expect(201)

		console.log(res.body)
		expect(res.body.longurl).toBeDefined()
		expect(res.body.shorturl.length).toEqual(6)
	})
})

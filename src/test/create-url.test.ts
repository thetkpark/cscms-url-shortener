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
})

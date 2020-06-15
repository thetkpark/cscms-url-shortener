import axios from '../axios/axios'
import { GET_ORIGINAL, CREATE_SHORTEN } from './type'

export const createShorten = url => async dispatch => {
	const res = await axios.post('/api/newUrl', { url: url })
	let host = window.location.href
	if (host === 'http://localhost:3000/') {
		host = 'http://localhost:3050/'
	}
	const response = {
		answer: res.data.shortUrl,
		host: host
	}
	console.log(response)
	dispatch({ type: CREATE_SHORTEN, payload: response })
}

export const getOriginal = url => async dispatch => {
	console.log(url)
	if (url.length > 6 && url.lastIndexOf('/') !== -1) {
		url = url.slice(url.lastIndexOf('/'))
	}
	if (url.length === 6) {
		const res = await axios.get('/api/originalUrl', {
			params: {
				url: url
			}
		})
		console.log('res = ', res)
		dispatch({ type: GET_ORIGINAL, payload: res.data })
	} else {
	}
}

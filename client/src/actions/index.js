import axios from '../axios/axios'
import { GET_ORIGINAL, CREATE_SHORTEN } from './type'

export const createShorten = url => async dispatch => {
	const res = await axios.post('/api/newUrl', { url: url })
	let host = window.location.href
	if (host === 'http://localhost:3000/') {
		host = 'http://localhost:3050/'
	}
	let response = {
		answer: null,
		success: false
	}
	if (res.status === 200) {
		response.answer = host + res.data.shortUrl
		response.success = true
	}
	dispatch({ type: CREATE_SHORTEN, payload: response })
}

export const getOriginal = url => async dispatch => {
	if (url.length > 6 && url.lastIndexOf('/') !== -1) {
		url = url.slice(url.lastIndexOf('/') + 1)
	}
	let response = {
		answer: null,
		success: false
	}
	if (url.length === 6) {
		const res = await axios.get('/api/originalUrl', {
			params: {
				url: url
			}
		})
		if (res.status === 200) {
			response.answer = res.data.url
			response.success = true
		}
	}
	dispatch({ type: GET_ORIGINAL, payload: response })
}

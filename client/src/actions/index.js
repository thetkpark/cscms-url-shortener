import axios from '../axios/axios'
import { FETCH_ORIGINAL, CREATE_SHORTEN } from './type'

export const createShorten = url => async dispatch => {
	console.log('in action url = ', url)
	const res = await axios.post('/api/newUrl', { url: url })
	console.log('res = ', res.data)
	dispatch({ type: CREATE_SHORTEN, payload: res.data })
}

export const getOriginal = url => async dispatch => {
	console.log(url)
	const res = await axios.get('/api/originalUrl', url)
	dispatch({ type: FETCH_ORIGINAL, payload: res.data })
}

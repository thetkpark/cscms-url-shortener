import { CREATE_SHORTEN, FETCH_ORIGINAL } from '../actions/type'

export default function (state = null, action) {
	console.log('action ', action)
	switch (action.type) {
		case CREATE_SHORTEN:
			return action.payload
		case FETCH_ORIGINAL:
			return action.payload
		default:
			return state
	}
}

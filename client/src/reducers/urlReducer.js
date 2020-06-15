import { CREATE_SHORTEN, GET_ORIGINAL } from '../actions/type'
const INITIAL_STATE = {
	answer: null,
	success: false
}
export default function (state = INITIAL_STATE, action) {
	console.log('action ', action)
	switch (action.type) {
		case CREATE_SHORTEN:
			return action.payload
		case GET_ORIGINAL:
			return action.payload
		default:
			return state
	}
}

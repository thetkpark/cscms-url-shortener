import axios from "../axios/axios"
import { GET_ORIGINAL, CREATE_SHORTEN } from "./type"

export const createShorten = (url, slug) => async (dispatch) => {
	let response = {
		answer: null,
		success: false
	}
	try {
		const res = await axios.post("/api/url", { url, slug })
		let host = window.location.href
		response.answer = host + res.data.token
		response.success = true
	} catch (error) {
		console.log(error)
	}
	dispatch({ type: CREATE_SHORTEN, payload: response })
}

// export const createShortenWithSlug = (url, slug) => async (dispatch) => {
// 	let response = {
// 		answer: null,
// 		success: false
// 	}
// 	try {
// 		const res = await axios.post("/api/newUrl", { url: url, prefer: slug })
// 		let host = window.location.href
// 		if (host === "http://localhost:3000/") {
// 			host = "http://localhost:3050/"
// 		}
// 		response.answer = host + res.data.shortUrl
// 		response.success = true
// 	} catch (error) {
// 		console.log(error)
// 	}
// 	dispatch({ type: CREATE_SHORTEN, payload: response })
// }

export const getOriginal = (url) => async (dispatch) => {
	if (url.length > 6 && url.lastIndexOf("/") !== -1) {
		url = url.slice(url.lastIndexOf("/") + 1)
	}
	let response = {
		answer: null,
		success: false
	}
	if (url.length === 6) {
		try {
			const res = await axios.get("/api/originalUrl", {
				params: {
					url: url
				}
			})
			response.answer = res.data.url
			response.success = true
		} catch (error) {
			console.log(error)
		}
	}
	dispatch({ type: GET_ORIGINAL, payload: response })
}

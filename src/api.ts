import { Hono } from "hono"
import { cors } from "hono/cors"
import { customAlphabet } from "nanoid"
import { ENV } from "."
import { getShortenURL, ShortenURL, saveShortenURL } from "./kv"

const api = new Hono<{ Bindings: ENV }>()
api.use("*", cors())

const generator = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 5)

api.post("/url", async (c) => {
	const { url, slug } = await c.req.json()
	if (!url) {
		c.status(400)
		return c.json({ error: "url is required" })
	}
	let token
	if (slug) {
		const existing = await getShortenURL(c.env.CSCMS_URL_SHORTENER, slug)
		if (existing) {
			c.status(400)
			return c.json({ error: "slug already exists" })
		}
		token = slug
	} else {
		token = generator()
	}
	const shortenURL: ShortenURL = {
		token,
		url,
		visit: 0
	}
	await saveShortenURL(c.env.CSCMS_URL_SHORTENER, shortenURL)
	c.status(201)
	return c.json(shortenURL)
})

export { api }

import { Hono } from "hono"
import { serveStatic } from "hono/serve-static.module"
import * as nanoid from "nanoid"
import { getShortenURL, saveShortenURL, ShortenURL } from "./kv"

const app = new Hono()

const generator = nanoid.customAlphabet(
	"abcdefghijklmnopqrstuvwxyz0123456789",
	5
)
app.post("/api/url", async (c) => {
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

app.get("*", serveStatic({ root: "./" }))

export default app

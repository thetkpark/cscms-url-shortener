import { Hono } from "hono"
import { serveStatic } from "hono/cloudflare-workers"
import { api } from "./api"
import { getShortenURL, saveShortenURL } from "./kv"

export type Bindings = {
	CSCMS_URL_SHORTENER: KVNamespace
}

const app = new Hono<{ Bindings: Bindings }>()

app.route("/api", api)
app.get("*", serveStatic({ root: "./" }))
app.notFound(async (c) => {
	const path = /\/+(.*)/.exec(c.req.path)
	if (!path) return c.redirect("/")
	const token = path[1].split("?")[0]
	const shortenURL = await getShortenURL(
		c.env.CSCMS_URL_SHORTENER,
		decodeURI(token)
	)
	if (!shortenURL) return c.redirect("/")
	shortenURL.visit++
	await saveShortenURL(c.env.CSCMS_URL_SHORTENER, shortenURL)
	return c.redirect(shortenURL.url)
})
export default app

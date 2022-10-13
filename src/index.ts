import { Hono } from "hono"
import { serveStatic } from "hono/serve-static.module"
import { api } from "./api"
import { getShortenURL, saveShortenURL } from "./kv"

export interface ENV {
	CSCMS_URL_SHORTENER: KVNamespace
}

const app = new Hono<{ Bindings: ENV }>()

app.route("/api", api)
app.get("*", serveStatic({ root: "./" }))
app.notFound(async (c) => {
	const token = c.req.url.split("/").pop()
	if (!token) return c.redirect("/")
	const shortenURL = await getShortenURL(c.env.CSCMS_URL_SHORTENER, token)
	if (!shortenURL) return c.redirect("/")
	shortenURL.visit++
	await saveShortenURL(c.env.CSCMS_URL_SHORTENER, shortenURL)
	return c.redirect(shortenURL.url)
})
export default app

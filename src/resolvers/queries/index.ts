import { getCosmosContainer } from '../../db/CosmosDB'

const longUrlQuery = async (_, { shortenPath }) => {
	const container = await getCosmosContainer()
	const urls = await container.items
		.query(`SELECT * FROM url1 WHERE url1.shorturl = "${shortenPath}"`)
		.fetchAll()

	const url = {
		longUrl: urls.resources[0].longurl,
		shortUrl: urls.resources[0].shorturl
	}
	return url
}

export default { getLongUrl: longUrlQuery }

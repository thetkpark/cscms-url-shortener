export interface ShortenURL {
	url: string
	token: string
	visit: number
}

export const getShortenURL = async (
	KV: KVNamespace,
	token: string
): Promise<ShortenURL | undefined> => {
	const url = await KV.get(token)
	if (!url) return undefined
	return JSON.parse(url) as ShortenURL
}

export const saveShortenURL = (
	KV: KVNamespace,
	shortenURL: ShortenURL
): Promise<void> => {
	return KV.put(shortenURL.token, JSON.stringify(shortenURL))
}

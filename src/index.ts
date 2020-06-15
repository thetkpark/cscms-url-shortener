import { server } from './app'

const port = process.env.PORT || 3050

server.listen(port, (): void => {
	console.log(`Running on ${port}`)
})

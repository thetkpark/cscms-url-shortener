import longUrlQuery from './queries/index'

const resolvers = {
	Query: {
		getLongUrl: longUrlQuery
	}
}

export default resolvers

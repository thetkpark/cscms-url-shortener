import { gql } from 'apollo-server-express'

const schema = gql`
	type Query {
		getLongUrl(shortenPath: String!): URL!
	}

	type Mutation {
		shortenUrl(url: String!, prefer: String): URL!
	}

	type URL {
		longUrl: String!
		shortUrl: String!
		visit: Int
	}
`

export default schema

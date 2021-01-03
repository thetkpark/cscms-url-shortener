import quries from './queries/index'
import mutations from './mutations/index'

const resolvers = {
	Query: {
		...quries
	},
	Mutation: {
		...mutations
	}
}

export default resolvers

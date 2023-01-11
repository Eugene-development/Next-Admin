import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
    // uri: 'https://gost-remont.com/graphql/',
    uri: 'http://localhost:8001/graphql/',
    // uri: `${process.env.local.NEXT_GRAPHQL_APOLLO_CLIENT}/graphql/`,
    // uri: process.env.NEXT_GRAPHQL_APOLLO_CLIENT,
    cache: new InMemoryCache(),
})

export default client

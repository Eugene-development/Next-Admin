import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
    ssrMode: true,
    // uri: 'https://gost-remont.com/graphql/',
    // uri: 'http://localhost:7795/graphql/',
    // uri: 'http://localhost:8000/graphql/',
    // uri: `${process.env.local.NEXT_GRAPHQL_APOLLO_CLIENT}/graphql/`,
    uri: process.env.NEXT_PUBLIC_GRAPHQL_APOLLO_CLIENT,
    cache: new InMemoryCache(),
})

export default client

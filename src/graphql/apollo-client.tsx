import { ApolloClient, InMemoryCache, from, HttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error'

const link = from([
    new HttpLink({ uri: "https://graphql-pokeapi.vercel.app/api/graphql" })
])

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link,
});

export default client;
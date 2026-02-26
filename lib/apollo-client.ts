import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
 link: new HttpLink({
  uri:
   process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
   "https://graphql.pokeapi.co/v1beta2",
 }),
 cache: new InMemoryCache(),
});

import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://graphql.coreapi.gcpintau.tbm.sh/query",
  cache: new InMemoryCache(),
});

export default client;

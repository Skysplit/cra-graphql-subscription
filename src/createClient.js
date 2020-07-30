import { WebSocketLink } from "@apollo/client/link/ws";
import { HttpLink, split, InMemoryCache, ApolloClient } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";

export function createClient() {
  const wsLink = new WebSocketLink({
    uri: `ws://localhost:3000/graphql`,
    options: {
      reconnect: true,
    },
  });

  const httpLink = new HttpLink({
    uri: "http://localhost:3000/graphql",
  });

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink
  );

  const cache = new InMemoryCache();

  return new ApolloClient({
    cache,
    link: splitLink,
  });
}

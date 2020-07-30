import React, { useState, useEffect } from "react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  split,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { persistCache } from "apollo-cache-persist";
import { TodoList } from "./TodoList";
import { useOnline } from "./hooks/useOnline";

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

function App() {
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState(null);

  useEffect(() => {
    const cache = new InMemoryCache();

    const apolloClient = new ApolloClient({
      cache,
      link: splitLink,
    });

    persistCache({ cache, storage: window.localStorage }).then(() => {
      setClient(apolloClient);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (navigator.onLine && client) {
      client.cache.reset();
    }
  }, [client]);

  const { isOnline } = useOnline();

  if (loading) {
    return "Loading...";
  }

  return (
    <ApolloProvider client={client}>
      You are {isOnline ? "online" : "offline"}
      <TodoList />
    </ApolloProvider>
  );
}

export default App;

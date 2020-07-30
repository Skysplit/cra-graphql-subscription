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
import { createClient } from "./createClient";

function App() {
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState(null);

  useEffect(() => {
    const apolloClient = createClient();

    persistCache({
      cache: apolloClient.cache,
      storage: window.localStorage,
    }).then(() => {
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

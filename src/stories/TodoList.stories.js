import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { withConsole } from "@storybook/addon-console";
import { ApolloProvider } from "@apollo/client";
import { createClient } from "../createClient";
import { TodoList } from "../TodoList";
import { Todo } from "../Todo";

const client = createClient();

storiesOf("TodoList", module)
  .addDecorator((storyFn, context) => withConsole()(storyFn)(context))
  .add("list", () => (
    <ApolloProvider client={client}>
      <TodoList />
    </ApolloProvider>
  ))
  .add("list item (offline)", () => (
    <ApolloProvider client={client}>
      <ul>
        <Todo
          todo={{ id: Date.now(), text: "Checkbox completed", completed: true }}
          isOffline={true}
        />
      </ul>
    </ApolloProvider>
  ))
  .add("list item (online)", () => {
    const [todo, setTodo] = useState({
      id: Date.now(),
      text: "Checkbox not completed",
      completed: false,
    });

    return (
      <ApolloProvider client={client}>
        <ul>
          <Todo
            todo={todo}
            isOffline={false}
            onUpdate={(todo) => {
              console.log("Todo updated!", todo);
              setTodo(todo);
            }}
          />
        </ul>
      </ApolloProvider>
    );
  });

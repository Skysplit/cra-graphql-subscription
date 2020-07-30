import React, { useState } from "react";
import { useCreateTodo } from "./hooks/useCreateTodo";
import { useTodoList } from "./hooks/useTodoList";
import { Todo } from "./Todo";
import { useOnline } from "./hooks/useOnline";

export function TodoList() {
  const [text, setText] = useState("");
  const { isOffline } = useOnline();
  const { createTodo } = useCreateTodo();
  const { loading, data } = useTodoList();

  if (loading) {
    return "loading...";
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        createTodo({
          variables: {
            text,
          },
          optimisticResponse: {
            id: Date.now(),
            completed: false,
            text,
          },
        });

        setText("");
      }}
    >
      <ul>
        {data.todoList.map((todo) => (
          <Todo key={todo.id} todo={todo} isOffline={isOffline} />
        ))}
      </ul>
      <input
        value={text}
        disabled={isOffline}
        onChange={(event) => setText(event.target.value)}
        type="text"
        name="text"
      />
      <button type="submit" disabled={isOffline}>
        Add
      </button>
    </form>
  );
}

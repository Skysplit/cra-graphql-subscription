import React, { useState, useCallback } from "react";
import { useCreateTodo } from "./hooks/useCreateTodo";
import { useTodoList } from "./hooks/useTodoList";
import { Todo } from "./Todo";
import { useOnline } from "./hooks/useOnline";
import { useUpdateTodo } from "./hooks/useUpdateTodo";

export function TodoList() {
  const [text, setText] = useState("");
  const { isOffline } = useOnline();
  const { createTodo } = useCreateTodo();
  const { updateTodo } = useUpdateTodo();
  const { loading, data } = useTodoList();

  const handleUpdate = useCallback(
    (todo) =>
      updateTodo({
        variables: todo,
        optimisticResponse: todo,
      }),
    [updateTodo]
  );

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
          <Todo
            key={todo.id}
            todo={todo}
            onUpdate={handleUpdate}
            isOffline={isOffline}
          />
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

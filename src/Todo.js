import React, { useState, useEffect } from "react";
import { useUpdateTodo } from "./hooks/useUpdateTodo";

export function Todo({ todo, isOffline }) {
  const [text, setText] = useState(todo.text);
  const { updateTodo } = useUpdateTodo();

  useEffect(() => setText(todo.text), [todo.text]);

  return (
    <li key={todo.id}>
      <input
        type="checkbox"
        disabled={isOffline}
        checked={todo.completed}
        onChange={(event) => {
          updateTodo({
            variables: {
              id: todo.id,
              completed: event.target.checked,
            },
            optimisticResponse: {
              ...todo,
              completed: event.target.checked,
            },
          });
        }}
      />{" "}
      <input
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
          border: "none",
        }}
        type="text"
        value={text}
        disabled={isOffline}
        onChange={(event) => setText(event.target.value)}
        onBlur={() => {
          updateTodo({
            variables: {
              id: todo.id,
              text,
            },
            optimisticResponse: {
              ...todo,
              text,
            },
          });
        }}
      />
    </li>
  );
}

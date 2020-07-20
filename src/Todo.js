import React, { useState } from "react";
import { useUpdateTodo } from "./hooks/useUpdateTodo";

export function Todo({ todo }) {
  const [text, setText] = useState(todo.text);
  const { updateTodo } = useUpdateTodo();

  return (
    <li key={todo.id}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={(event) => {
          updateTodo({
            variables: {
              id: todo.id,
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
        onChange={(event) => setText(event.target.values)}
        onBlur={(event) =>
          updateTodo({
            variables: {
              id: todo.id,
              text: event.target.value,
            },
          })
        }
      />
    </li>
  );
}

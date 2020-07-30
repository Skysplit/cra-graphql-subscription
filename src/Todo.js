import React, { useState, useEffect } from "react";

export function Todo({ todo, onUpdate, isOffline }) {
  const [text, setText] = useState(todo.text);

  useEffect(() => setText(todo.text), [todo.text]);

  return (
    <li key={todo.id}>
      <input
        type="checkbox"
        disabled={isOffline}
        checked={todo.completed}
        onChange={(event) =>
          onUpdate({
            ...todo,
            completed: event.target.checked,
          })
        }
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
        onBlur={() => onUpdate({ ...todo, text })}
      />
    </li>
  );
}

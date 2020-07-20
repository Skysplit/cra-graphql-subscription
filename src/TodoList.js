import React, { useState } from "react";
import { useCreateTodo } from "./hooks/useCreateTodo";
import { useTodoList } from "./hooks/useTodoList";
import { useUpdateTodo } from "./hooks/useUpdateTodo";
import { Todo } from "./Todo";

export function TodoList() {
  const [text, setText] = useState("");
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
        });

        setText("");
      }}
    >
      <ul>
        {data.todoList.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </ul>
      <input
        value={text}
        onChange={(event) => setText(event.target.value)}
        type="text"
        name="text"
      />
      <button type="submit">Add</button>
    </form>
  );
}

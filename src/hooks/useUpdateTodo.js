import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

const mutation = gql`
  mutation UpdateTodo($id: Int!, $text: String, $completed: Boolean) {
    updateTodo(id: $id, completed: $completed, text: $text) {
      id
      text
      completed
    }
  }
`;

export function useUpdateTodo() {
  const [updateTodo] = useMutation(mutation);

  return {
    updateTodo,
  };
}

import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

const mutation = gql`
  mutation CreateTodo($text: String!, $description: String) {
    createTodo(text: $text, description: $description) {
      id
    }
  }
`;

export function useCreateTodo() {
  const [createTodo] = useMutation(mutation);

  return {
    createTodo,
  };
}

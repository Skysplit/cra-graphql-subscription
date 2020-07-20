import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";

const query = gql`
  query {
    todoList {
      id
      text
      completed
    }
  }
`;

export function useTodoList() {
  const result = useQuery(query);
  const { subscribeToMore } = result;

  // Todo Added
  useEffect(() => {
    subscribeToMore({
      document: gql`
        subscription TodoAdded {
          todoAdded {
            id
            text
            completed
          }
        }
      `,
      updateQuery(prev, { subscriptionData }) {
        if (!prev.todoList) {
          return prev;
        }

        return Object.assign({}, prev, {
          todoList: [...prev.todoList, subscriptionData.data.todoAdded],
        });
      },
    });
  }, [subscribeToMore]);

  // Todo updated
  useEffect(() => {
    subscribeToMore({
      document: gql`
        subscription {
          todoUpdated {
            id
            text
            completed
          }
        }
      `,
      updateQuery(prev, { subscriptionData }) {
        if (!prev.todoList) {
          return prev;
        }

        const newTodo = subscriptionData.data.todoUpdated;
        const todoIndex = prev.todoList.findIndex(
          (prevTodo) => prevTodo.id === newTodo.id
        );

        return Object.assign({}, prev, {
          todoList: [
            ...prev.todoList.slice(0, todoIndex),
            newTodo,
            ...prev.todoList.slice(todoIndex + 1),
          ],
        });
      },
    });
  }, [subscribeToMore]);

  return result;
}

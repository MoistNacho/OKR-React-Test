import React from "react";

import { generateUseContext } from "lib/context";

import TodoStore from "./TodoStore";

export interface TodoContext {
  todoStore: TodoStore;
}

interface Props {
  children: React.ReactNode;
  stores: TodoContext;
}

const LocalContext = React.createContext<TodoContext | null>(null);

export const useTodoStore = generateUseContext(LocalContext);

const TodoProvider: React.FC<Props> = ({ children, stores }) => {
  return (
    <LocalContext.Provider value={stores}>{children}</LocalContext.Provider>
  );
};

export default TodoProvider;

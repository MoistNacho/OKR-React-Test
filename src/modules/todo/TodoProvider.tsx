import React from "react";

import { useCore } from "core";
import { generateUseContext } from "lib/context";

import TodoStore from "./TodoStore";

export interface TodoContext {
  todoStore: TodoStore;
}

interface Props {
  children: React.ReactNode;
}

const LocalContext = React.createContext<TodoContext | null>(null);

export const useTodoStore = generateUseContext(LocalContext);

const TodoProvider: React.FC<Props> = ({ children }) => {
  const core = useCore();

  const [stores] = React.useState<TodoContext>(() => ({
    todoStore: new TodoStore(core),
  }));

  return (
    <LocalContext.Provider value={stores}>{children}</LocalContext.Provider>
  );
};

export default TodoProvider;

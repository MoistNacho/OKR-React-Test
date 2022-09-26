import React from "react";
import { hot } from "react-hot-loader/root";

import { HomeBody, TodoProvider } from "modules/todo";
import { TodoContext } from "modules/todo/TodoProvider";
import TodoStore from "modules/todo/TodoStore";

const HomePage = () => {
  const [stores] = React.useState<TodoContext>(() => ({
    todoStore: new TodoStore(),
  }));

  return (
    <TodoProvider stores={stores}>
      <HomeBody />
    </TodoProvider>
  );
};

export default hot(HomePage);

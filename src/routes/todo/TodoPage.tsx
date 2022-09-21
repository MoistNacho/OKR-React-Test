import React from "react";
import { hot } from "react-hot-loader/root";

import { HomeBody, TodoProvider } from "modules/todo";

const HomePage = () => {
  return (
    <TodoProvider>
      <HomeBody />
    </TodoProvider>
  );
};

export default hot(HomePage);

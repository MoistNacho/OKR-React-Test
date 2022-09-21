import { observer } from "mobx-react";
import React from "react";
import styled from "styled-components";

import { useTodoStore } from "../TodoProvider";

import TodoAddForm from "./components/TodoAddForm";
import TodoList from "./components/TodoList";

const HomeBody = observer(() => {
  const { todoStore } = useTodoStore();
  const { handleAddItem } = todoStore;

  return (
    <HomeBodyWrap>
      <Title>Simple Todo List</Title>
      <TodoAddForm onCreate={handleAddItem} />
      <TodoList />
    </HomeBodyWrap>
  );
});

export default HomeBody;

const HomeBodyWrap = styled.div`
  width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #303540;

  @media screen and (max-width: 800px) {
    width: 100%;
    padding: 0 10px;
  }
`;

const Title = styled.h2`
  margin: 12px auto;
`;

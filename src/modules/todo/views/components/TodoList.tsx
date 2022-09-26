import { observer } from "mobx-react";
import React from "react";
import styled from "styled-components";

import { useTodoStore } from "modules/todo/TodoProvider";

import TodoItem from "./TodoItem";

const TodoList = observer(() => {
  const { todoStore } = useTodoStore();
  const { todoList, handleUpdateItem, handleRemoveItem } = todoStore;

  return (
    <StyledWrap>
      <ListCount>Item Count: {todoList.length}</ListCount>
      <StyledList>
        {todoList.map((item, index) => {
          return (
            <TodoItem
              key={item.id}
              item={item}
              id={index + 1}
              onUpdate={handleUpdateItem}
              onRemove={handleRemoveItem}
            />
          );
        })}
      </StyledList>
    </StyledWrap>
  );
});

export default TodoList;

const StyledWrap = styled.div`
  width: 600px;
  margin-top: 30px;
`;

const StyledList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 12px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  border: 1.5px solid #ddd;
  border-radius: 10px;

  li {
    padding-bottom: 10px;
    border-bottom: 1.5px solid #ddd;
  }

  li:last-child {
    padding-bottom: 0px;
    border-bottom: none;
  }
`;

const ListCount = styled.div`
  padding-right: 4px;
  margin-bottom: 8px;
  text-align: right;
`;

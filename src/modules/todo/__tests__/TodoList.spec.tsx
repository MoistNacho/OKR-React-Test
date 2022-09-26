/* eslint-disable prefer-destructuring */
import { BaseTheme } from "@meshkorea/vroong-design-system-web";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import React from "react";
import renderer from "react-test-renderer";
import { ThemeProvider } from "styled-components";

import { CoreProvider } from "core";

import TodoProvider, { TodoContext } from "../TodoProvider";
import TodoStore from "../TodoStore";
import TodoList from "../views/components/TodoList";

describe("<TodoList />", () => {
  let stores: TodoContext;
  let wrraper: React.ReactElement;

  beforeEach(() => {
    stores = { todoStore: new TodoStore() };
    wrraper = (
      <CoreProvider>
        <ThemeProvider theme={BaseTheme}>
          <TodoProvider stores={stores}>
            <TodoList />
          </TodoProvider>
        </ThemeProvider>
      </CoreProvider>
    );
  });

  it("renders with snapshot", () => {
    const component = renderer.create(wrraper);
    expect(component.toJSON()).toMatchSnapshot();
  });

  describe("TodoList Integration Test", () => {
    let input: HTMLInputElement;
    let editButton: HTMLElement;
    let updateButton: HTMLButtonElement;
    let removeButton: HTMLElement;

    beforeEach(() => {
      render(wrraper);
    });

    // it("addForm input에 값을 입력후 '확인'버튼을 클릭시 리스트에 아이템이 추가되고 handleAddItem이 호출된다", async () => {
    //   const { todoList, handleAddItem } = stores.todoStore;
    //   const input = screen.getByPlaceholderText("값을 입력해주세요");

    //   await userEvent.type(input, "New Item");

    //   expect(todoList.length).toBe(4);
    //   expect(handleAddItem).toHaveBeenCalledTimes(1);
    // });

    it("Item Update Test", async () => {
      editButton = screen.getAllByRole("button", { name: "수정" })[0];

      await userEvent.click(editButton);
      input = screen.getByPlaceholderText("아이템 이름을 입력해주세요");
      updateButton = screen.getByRole("button", { name: "완료" });

      await userEvent.clear(input);
      await userEvent.type(input, "New Item");
      await userEvent.click(updateButton);

      const changedItem = screen.getByText("1. New Item");

      expect(changedItem).toBeInTheDocument();
      expect(stores.todoStore.todoList[0].name).toBe("New Item");
    });

    it("Item Remove Test", async () => {
      removeButton = screen.getAllByRole("button", { name: "삭제" })[0];

      await userEvent.click(removeButton);
      const itemCount = screen.getByText("Item Count: 2");

      expect(itemCount).toBeInTheDocument();
      expect(stores.todoStore.todoList.length).toBe(2);
    });
  });
});

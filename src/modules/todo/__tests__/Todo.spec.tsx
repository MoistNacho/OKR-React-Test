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
import HomeBody from "../views/HomeBody";

describe("<TodoList />", () => {
  let stores: TodoContext;
  let wrraper: React.ReactElement;

  beforeEach(() => {
    stores = { todoStore: new TodoStore() };
    wrraper = (
      <CoreProvider>
        <ThemeProvider theme={BaseTheme}>
          <TodoProvider stores={stores}>
            <HomeBody />
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
    let addButton: HTMLButtonElement;
    let editButton: HTMLElement;
    let updateButton: HTMLButtonElement;
    let removeButton: HTMLElement;

    beforeEach(() => {
      render(wrraper);
    });

    it("Item Add Test", async () => {
      input = screen.getByPlaceholderText("값을 입력해주세요");
      addButton = screen.getByRole("button", { name: "확인" });

      await userEvent.type(input, "New Item");
      await userEvent.click(addButton);
      const itemCount = screen.getByText("Item Count: 4");

      expect(itemCount).toBeInTheDocument();
      expect(stores.todoStore.todoList.length).toBe(4);
      expect(stores.todoStore.todoList[3].name).toBe("New Item");
    });

    it("Item Update Test", async () => {
      editButton = screen.getAllByRole("button", { name: "수정" })[0];

      await userEvent.click(editButton);
      input = screen.getByPlaceholderText("아이템 이름을 입력해주세요");
      updateButton = screen.getByRole("button", { name: "완료" });

      await userEvent.clear(input);
      await userEvent.type(input, "Update Item");
      await userEvent.click(updateButton);

      const changedItem = screen.getByText("1. Update Item");

      expect(changedItem).toBeInTheDocument();
      expect(stores.todoStore.todoList[0].name).toBe("Update Item");
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

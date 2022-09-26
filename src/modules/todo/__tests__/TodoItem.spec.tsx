import { BaseTheme } from "@meshkorea/vroong-design-system-web";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import React from "react";
import renderer from "react-test-renderer";
import { ThemeProvider } from "styled-components";

import { CoreProvider } from "core";

import TodoItem from "../views/components/TodoItem";

describe("<TodoItem />", () => {
  it("renders with snapshot", () => {
    const component = renderer.create(
      <CoreProvider>
        <ThemeProvider theme={BaseTheme}>
          <TodoItem
            item={{ id: 0, name: "renderTest" }}
            id={1}
            onUpdate={jest.fn()}
            onRemove={jest.fn()}
          />
        </ThemeProvider>
      </CoreProvider>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  describe("Update and Remove Test", () => {
    const onUpdate = jest.fn();
    const onRemove = jest.fn();
    let input: HTMLInputElement;
    let editButton: HTMLButtonElement;
    let updateButton: HTMLButtonElement;
    let removeButton: HTMLButtonElement;

    beforeEach(() => {
      render(
        <CoreProvider>
          <ThemeProvider theme={BaseTheme}>
            <TodoItem
              item={{ id: 0, name: "Test Item" }}
              id={1}
              onUpdate={onUpdate}
              onRemove={onRemove}
            />
          </ThemeProvider>
        </CoreProvider>,
      );
      editButton = screen.getByRole("button", { name: "수정" });
      removeButton = screen.getByRole("button", { name: "삭제" });
    });

    // it("'수정'버튼을 클릭시 '완료' 버튼으로 교체된다", async () => {
    //   await userEvent.click(editButton);
    //   updateButton = screen.getByRole("button", { name: "완료" });

    //   expect(updateButton).toBeInTheDocument();
    // });

    describe("Update", () => {
      beforeEach(async () => {
        await userEvent.click(editButton);
        input = screen.getByPlaceholderText("아이템 이름을 입력해주세요");
        updateButton = screen.getByRole("button", { name: "완료" });
      });

      it("'완료' 버튼을 클릭시 아이템의 이름이 비어있을 경우 오류메시지가 출력된다", async () => {
        await userEvent.clear(input);
        await userEvent.click(updateButton);
        const errorMessage = screen.getByText("아이템 이름은 필수값입니다");

        expect(errorMessage).toBeInTheDocument();
      });

      it("'완료' 버튼을 클릭시 아이템의 값과 함께 onUpdate 함수가 호출된다", async () => {
        await userEvent.clear(input);
        await userEvent.type(input, "New World");
        await userEvent.click(updateButton);

        // onUpdate함수는 item객체의 id값과 name값을 인자로 받는다
        expect(onUpdate).toHaveBeenCalledWith(0, "New World");
      });
    });

    it("'삭제' 버튼을 클릭시 아이템의 id값과 함께 onRemove 함수가 호출된다", async () => {
      await userEvent.click(removeButton);

      expect(onRemove).toHaveBeenCalledWith(0);
    });
  });
});

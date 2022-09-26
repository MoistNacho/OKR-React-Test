import { BaseTheme } from "@meshkorea/vroong-design-system-web";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import renderer from "react-test-renderer";
import { ThemeProvider } from "styled-components";

import { CoreProvider } from "core";

import TodoAddForm from "../views/components/TodoAddForm";

describe("<TodoAddForm />", () => {
  it("renders with snapshot", () => {
    const component = renderer.create(
      <CoreProvider>
        <ThemeProvider theme={BaseTheme}>
          <TodoAddForm onCreate={jest.fn()} />
        </ThemeProvider>
      </CoreProvider>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  describe("Form Test", () => {
    const onCreate = jest.fn();
    let input: HTMLInputElement;
    let submitButton: HTMLButtonElement;

    beforeEach(() => {
      render(
        <CoreProvider>
          <ThemeProvider theme={BaseTheme}>
            <TodoAddForm onCreate={onCreate} />
          </ThemeProvider>
        </CoreProvider>,
      );
      input = screen.getByPlaceholderText("값을 입력해주세요");
      submitButton = screen.getByRole("button", { name: "확인" });
    });

    it("input에 값을 입력시 button의 disabled 값이 false로 변경된다", async () => {
      await userEvent.type(input, "new Item");

      expect(submitButton.disabled).toBe(false);
    });

    it("submit버튼을 클릭시 onCreate함수에 input의 value값이 함께 전달된다", async () => {
      await userEvent.type(input, "new Item");
      await userEvent.click(submitButton);

      expect(onCreate).toHaveBeenCalledWith("new Item");
    });
  });
});

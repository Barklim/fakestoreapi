import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Todo from "../components/Todo";
import { TestId } from ".";

const todoItemText = "Some todo";

describe("StatusBar", () => {

  it("add completed todo", async () => {
    render(<Todo />);

    const inputButton = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.change(inputButton, {
      target: { value: todoItemText },
    });
    const buttonAdd = screen.getByTestId(TestId.ButtonAdd);

    await userEvent.click(buttonAdd);

    const Checkbox = screen.getByTestId(TestId.Checkbox);
    await userEvent.click(Checkbox);

    expect(
        getComputedStyle(screen.getByText(todoItemText)).textDecoration
      ).toBe("line-through");
  });

  it("clear completed todo", async () => {
    render(<Todo />);

    const buttonAdd = screen.getByTestId(TestId.ButtonAdd);
    await userEvent.click(buttonAdd);

    const Todoitem = screen.getByText(todoItemText);

    expect(Todoitem).not.toBe(null);

    const buttonStatusClear = screen.getByTestId(TestId.StatusBarClear);
    await userEvent.click(buttonStatusClear);

    expect(screen.queryByText(todoItemText)).toBe(null);

    screen.debug();
  });
});

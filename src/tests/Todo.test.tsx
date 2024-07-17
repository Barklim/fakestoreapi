import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import initTodosDb from "../config/db.json";
import { INIT_TODOS } from "../config";
import Todo from "../components/Todo";
import { TestId, cleanup } from ".";

const todoItemText = "Some todo";
const todoItemTextRemove = "Remove todo";
const todoItemTextToggle = "Toggle todo";
const initData = initTodosDb.data;
const todoItemText1 = initData.todos[0].title;
const todoItemText2 = initData.todos[1].title;
const todoItemText3 = initData.todos[2].title;

describe("Todos crud", () => {
  if (INIT_TODOS) {
    it("remove inited todo", async () => {
      render(<Todo initState={INIT_TODOS} />);

      const buttonAdd = screen.getByTestId(TestId.ButtonAdd);
      await userEvent.click(buttonAdd);

      const Todoitem1 = screen.getByText(todoItemText1);
      await userEvent.hover(Todoitem1);
      const TodoItemDelete1 = screen.getByTestId(TestId.TodoItemDelete);
      await userEvent.click(TodoItemDelete1);

      const Todoitem2 = screen.getByText(todoItemText2);
      await userEvent.hover(Todoitem2);
      const TodoItemDelete2 = screen.getByTestId(TestId.TodoItemDelete);
      await userEvent.click(TodoItemDelete2);

      const Todoitem3 = screen.getByText(todoItemText3);
      await userEvent.hover(Todoitem3);
      const TodoItemDelete3 = screen.getByTestId(TestId.TodoItemDelete);
      await userEvent.click(TodoItemDelete3);

      expect(screen.queryByText(todoItemText1)).toBe(null);
      expect(screen.queryByText(todoItemText2)).toBe(null);
      expect(screen.queryByText(todoItemText2)).toBe(null);
    });
  }

  it("adds a todo", async () => {
    render(<Todo />);

    const inputButton = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.change(inputButton, {
      target: { value: todoItemText },
    });
    const buttonAdd = screen.getByTestId(TestId.ButtonAdd);

    await userEvent.click(buttonAdd);
  });
  
  it("remove a todo", async () => {
    render(<Todo />);

    const inputButton = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.change(inputButton, {
      target: { value: todoItemTextRemove },
    });
    const buttonAdd = screen.getByTestId(TestId.ButtonAdd);

    await userEvent.click(buttonAdd);

    const Todoitem = screen.getByText(todoItemTextRemove);
    await userEvent.hover(Todoitem);
    const TodoItemDelete = screen.getByTestId(TestId.TodoItemDelete);
    await userEvent.click(TodoItemDelete);

    expect(screen.queryByText(todoItemTextRemove)).toBe(null);
  });
});

describe("Todos toggle", () => {

  it("toggle todo", async () => {
    render(<Todo />);
    cleanup()

    const inputButton = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.change(inputButton, {
      target: { value: todoItemTextToggle },
    });
    const buttonAdd = screen.getByTestId(TestId.ButtonAdd);

    await userEvent.click(buttonAdd);

    expect(
      getComputedStyle(screen.getByText(todoItemTextToggle)).textDecoration
    ).toBe("none");

    const Checkbox = screen.getByTestId(TestId.Checkbox);
    await userEvent.click(Checkbox);

    expect(
      getComputedStyle(screen.getByText(todoItemTextToggle)).textDecoration
    ).toBe("line-through");
  });
});

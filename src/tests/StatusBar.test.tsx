import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import UsersPage from "../components/Page";
import { TestId } from ".";

const itemText = "Some item list";

describe("StatusBar", () => {

  it("add favorite user item", async () => {
    render(<UsersPage />);

    const inputButton = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.change(inputButton, {
      target: { value: itemText },
    });
    const buttonAdd = screen.getByTestId(TestId.ButtonAdd);

    await userEvent.click(buttonAdd);

    const Checkbox = screen.getByTestId(TestId.Checkbox);
    await userEvent.click(Checkbox);

    expect(
        getComputedStyle(screen.getByText(itemText)).textDecoration
      ).toBe("line-through");
  });

  it("clear favorite user item", async () => {
    render(<UsersPage />);

    const buttonAdd = screen.getByTestId(TestId.ButtonAdd);
    await userEvent.click(buttonAdd);

    const item = screen.getByText(itemText);

    expect(item).not.toBe(null);

    const buttonStatusClear = screen.getByTestId(TestId.StatusBarClear);
    await userEvent.click(buttonStatusClear);

    expect(screen.queryByText(itemText)).toBe(null);

    screen.debug();
  });
});

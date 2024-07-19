import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import initListDb from "../config/db.json";
import { INIT_LIST } from "../config";
import PageUsers from "../components/Page";
import { TestId, cleanup } from ".";

const itemText = "Some item";
const itemTextRemove = "Remove item";
const temTextToggle = "Toggle item";
const initData = initListDb.data;
const temText1 = initData.list[0].title;
const itemText2 = initData.list[1].title;
const itemText3 = initData.list[2].title;

describe("User list crud", () => {
  if (INIT_LIST) {
    it("remove inited users", async () => {
      render(<PageUsers initState={INIT_LIST} />);

      const buttonAdd = screen.getByTestId(TestId.ButtonAdd);
      await userEvent.click(buttonAdd);

      const item1 = screen.getByText(temText1);
      await userEvent.hover(item1);
      const itemDelete1 = screen.getByTestId(TestId.ItemDelete);
      await userEvent.click(itemDelete1);

      const item2 = screen.getByText(itemText2);
      await userEvent.hover(item2);
      const itemDelete2 = screen.getByTestId(TestId.ItemDelete);
      await userEvent.click(itemDelete2);

      const item3 = screen.getByText(itemText3);
      await userEvent.hover(item3);
      const itemDelete3 = screen.getByTestId(TestId.ItemDelete);
      await userEvent.click(itemDelete3);

      expect(screen.queryByText(temText1)).toBe(null);
      expect(screen.queryByText(itemText2)).toBe(null);
      expect(screen.queryByText(itemText2)).toBe(null);
    });
  }

  it("adds a item", async () => {
    render(<PageUsers />);

    const inputButton = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.change(inputButton, {
      target: { value: itemText },
    });
    const buttonAdd = screen.getByTestId(TestId.ButtonAdd);

    await userEvent.click(buttonAdd);
  });
  
  it("remove a item", async () => {
    render(<PageUsers />);

    const inputButton = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.change(inputButton, {
      target: { value: itemTextRemove },
    });
    const buttonAdd = screen.getByTestId(TestId.ButtonAdd);

    await userEvent.click(buttonAdd);

    const item = screen.getByText(itemTextRemove);
    await userEvent.hover(item);
    const itemDelete = screen.getByTestId(TestId.ItemDelete);
    await userEvent.click(itemDelete);

    expect(screen.queryByText(itemTextRemove)).toBe(null);
  });
});

describe("Users list toggle", () => {

  it("toggle item", async () => {
    render(<PageUsers />);
    cleanup()

    const inputButton = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.change(inputButton, {
      target: { value: temTextToggle },
    });
    const buttonAdd = screen.getByTestId(TestId.ButtonAdd);

    await userEvent.click(buttonAdd);

    expect(
      getComputedStyle(screen.getByText(temTextToggle)).textDecoration
    ).toBe("none");

    const Checkbox = screen.getByTestId(TestId.Checkbox);
    await userEvent.click(Checkbox);

    expect(
      getComputedStyle(screen.getByText(temTextToggle)).textDecoration
    ).toBe("line-through");
  });
});

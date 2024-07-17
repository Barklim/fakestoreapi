import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Checkbox from "../components/Checkbox";
import { TestId } from ".";

describe("Checkbox", () => {
  it("renders Checkbox", () => {
    render(<Checkbox />);
  });
  it("renders with default dimensions", () => {
    render(<Checkbox />);
    const checkbox = screen.getByTestId(TestId.Checkbox);
    expect(getComputedStyle(checkbox).width).toBe("100px");
    expect(getComputedStyle(checkbox).height).toBe("100px");
  });

  it("renders with width & height props", () => {
    render(<Checkbox width={200} height={200} />);
    const checkbox = screen.getByTestId(TestId.Checkbox);
    expect(getComputedStyle(checkbox).width).toBe("200px");
    expect(getComputedStyle(checkbox).height).toBe("200px");
  });
});

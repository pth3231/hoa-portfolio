import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, expect, it } from "vitest";
import { ThemeToggle } from "./ThemeToggle";

beforeEach(() => localStorage.clear());

describe("ThemeToggle", () => {
  it("renders a labelled button showing moon in dark mode", () => {
    render(<ThemeToggle />);
    const btn = screen.getByLabelText("toggle theme");
    expect(btn).toHaveTextContent("☾");
  });

  it("clicking switches the document to light theme and shows sun", () => {
    render(<ThemeToggle />);
    fireEvent.click(screen.getByLabelText("toggle theme"));
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    expect(screen.getByLabelText("toggle theme")).toHaveTextContent("☀");
  });
});

import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { Nav } from "./Nav";

it("renders mark, section links and theme toggle", () => {
  render(<Nav />);
  expect(screen.getByLabelText("toggle theme")).toBeInTheDocument();
  expect(screen.getAllByRole("link", { name: /projects/i }).length).toBeGreaterThan(0);
});

import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { SectionHeader } from "./SectionHeader";

it("renders the numbered title", () => {
  render(<SectionHeader index="04" title="Projects" />);
  expect(screen.getByText("/04")).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Projects" })).toBeInTheDocument();
});

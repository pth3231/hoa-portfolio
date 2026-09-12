import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { FuturePlans } from "./FuturePlans";

it("renders open todo items and the plans file hint", () => {
  render(<FuturePlans />);
  expect(screen.getByRole("heading", { name: "Future Plans" })).toBeInTheDocument();
  const isItemWith = (marker: string) => (_: unknown, el: Element | null) =>
    [...(el?.children ?? [])].some((c) => c.textContent === marker);
  const openMarkers = screen.getAllByText(isItemWith("- [ ]"));
  expect(openMarkers).toHaveLength(2);
  const doneMarkers = screen.queryAllByText(isItemWith("- [x]"));
  expect(doneMarkers).toHaveLength(0);
  expect(screen.getByText(/src\/content\/plans\.ts/)).toBeInTheDocument();
});

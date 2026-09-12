import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { FuturePlans } from "./FuturePlans";

it("renders todo items with completion markers and the plans content hint", () => {
  render(<FuturePlans />);
  expect(screen.getByRole("heading", { name: "Future Plans" })).toBeInTheDocument();
  const doneMarkers = screen.getAllByText((_, el) => el?.textContent?.includes("- [x]") ?? false);
  expect(doneMarkers.length).toBeGreaterThan(0);
  expect(screen.getByText(/src\/content\/plans\.ts/)).toBeInTheDocument();
});

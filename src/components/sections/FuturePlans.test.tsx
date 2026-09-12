import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { FuturePlans } from "./FuturePlans";

it("renders todo items marked as samples with the edit hint", () => {
  render(<FuturePlans />);
  expect(screen.getByRole("heading", { name: "Future Plans" })).toBeInTheDocument();
  expect(screen.getAllByText(/sample/).length).toBeGreaterThan(0);
  expect(screen.getByText(/edit src\/content\/plans\.ts/)).toBeInTheDocument();
});

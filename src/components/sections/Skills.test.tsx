import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { Skills } from "./Skills";

it("renders all five groups and a sample item", () => {
  render(<Skills />);
  expect(screen.getByRole("heading", { name: "Skills" })).toBeInTheDocument();
  for (const name of ["Languages", "Frontend", "Backend", "Databases", "Deployment & Testing"]) {
    expect(screen.getByText(name)).toBeInTheDocument();
  }
  expect(screen.getByText("FastAPI")).toBeInTheDocument();
});

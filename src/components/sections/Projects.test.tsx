import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { Projects } from "./Projects";

it("renders both projects with facts and repo links", () => {
  render(<Projects />);
  expect(screen.getByRole("heading", { name: "Projects" })).toBeInTheDocument();
  expect(screen.getAllByText("blog-list").length).toBeGreaterThan(0);
  expect(screen.getByText("gmail-notification")).toBeInTheDocument();
  expect(screen.getByText(/p95 < 300 ms/)).toBeInTheDocument();
  expect(screen.getByText(/~3,000 concurrent users/)).toBeInTheDocument();
  expect(screen.getAllByRole("link", { name: /view repo/i })).toHaveLength(2);
});

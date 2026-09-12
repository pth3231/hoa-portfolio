import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { Timeline } from "./Timeline";

it("renders the three CV entries with periods and orgs", () => {
  render(<Timeline />);
  expect(screen.getByRole("heading", { name: "Timeline" })).toBeInTheDocument();
  expect(
    screen.getByText((_, el) => el?.textContent === "Aug 2025 – Jun 2026 · Hanoi, Vietnam"),
  ).toBeInTheDocument();
  expect(
    screen.getByText((_, el) => el?.textContent === "Apr 2026 – Aug 2026 · Hanoi, Vietnam"),
  ).toBeInTheDocument();
  expect(screen.getByText(/International Christian University/)).toBeInTheDocument();
  expect(screen.getByText(/Research Assistant/)).toBeInTheDocument();
});

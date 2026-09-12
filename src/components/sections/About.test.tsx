import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { About } from "./About";

it("renders the section header, whoami vignette and qualifications", () => {
  render(<About />);
  expect(screen.getByRole("heading", { name: "About" })).toBeInTheDocument();
  expect(screen.getByText((_, el) => el?.textContent === "$ whoami")).toBeInTheDocument();
  expect(screen.getByText("IELTS")).toBeInTheDocument();
  expect(screen.getByText("8.0")).toBeInTheDocument();
});

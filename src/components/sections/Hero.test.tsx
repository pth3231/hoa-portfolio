import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { Hero } from "./Hero";

it("renders name, role, location badge and profile links", () => {
  render(<Hero />);
  expect(screen.getByRole("heading", { name: /phan thai hoa/i })).toBeInTheDocument();
  expect(screen.getByText(/> Full-stack developer/)).toBeInTheDocument();
  expect(screen.getByText(/based in tokyo, japan/i)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute(
    "href",
    "https://github.com/pth3231",
  );
});

import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { Contact } from "./Contact";

it("renders the three contact channels", () => {
  render(<Contact />);
  expect(screen.getByRole("heading", { name: "Contact" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /phanthaihoa070707@gmail\.com/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /linkedin/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /github/i })).toBeInTheDocument();
});

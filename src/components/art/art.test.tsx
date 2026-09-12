import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { EnvelopeArt } from "./EnvelopeArt";
import { StackArt } from "./StackArt";
import { TimelineArt } from "./TimelineArt";

it.each([
  ["TimelineArt", TimelineArt],
  ["StackArt", StackArt],
  ["EnvelopeArt", EnvelopeArt],
])("%s renders a hidden svg", (_name, Art) => {
  const { container } = render(<Art />);
  const svg = container.querySelector("svg");
  expect(svg).toBeInTheDocument();
  expect(svg?.getAttribute("aria-hidden")).toBe("true");
});

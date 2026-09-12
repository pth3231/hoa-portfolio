import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { Terminal } from "./Terminal";

it("shows the filename tab and children", () => {
  render(
    <Terminal title="whoami.sh">
      <p>$ whoami</p>
    </Terminal>,
  );
  expect(screen.getByText("whoami.sh")).toBeInTheDocument();
  expect(screen.getByText("$ whoami")).toBeInTheDocument();
});

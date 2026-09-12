import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { GmailSim } from "./GmailSim";

function stubIntersection(intersecting: boolean) {
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      cb: IntersectionObserverCallback;
      constructor(cb: IntersectionObserverCallback) {
        this.cb = cb;
      }
      observe() {
        this.cb(
          [{ isIntersecting: intersecting } as IntersectionObserverEntry],
          {} as IntersectionObserver,
        );
      }
      unobserve() {}
      disconnect() {}
      takeRecords() {
        return [];
      }
      root = null;
      rootMargin = "";
      thresholds = [];
    },
  );
}

function stubReduced(reduced: boolean) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockReturnValue({
      matches: reduced,
      addEventListener: () => {},
      removeEventListener: () => {},
    }),
  );
}

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.unstubAllGlobals());

it("shows the full final frame immediately under reduced motion", () => {
  stubIntersection(true);
  stubReduced(true);
  render(<GmailSim />);
  expect(screen.getByText((_, el) => el?.textContent === "cron run gmail-summarize")).toBeInTheDocument();
  expect(screen.getByText("✓ push notification sent")).toBeInTheDocument();
});

it("types the command then reveals lines in sequence", () => {
  stubIntersection(true);
  stubReduced(false);
  render(<GmailSim />);

  // Command is 24 chars at 45ms → done just after ~1080ms. Lines: 7 × 350ms.
  expect(screen.queryByText("✓ push notification sent")).not.toBeInTheDocument();
  // Two act blocks: React batches the typewriter ticks, so the line interval is
  // only registered once the `done` render flushes at the end of the first block.
  act(() => {
    vi.advanceTimersByTime(1100);
  });
  expect(screen.queryByText("✓ push notification sent")).not.toBeInTheDocument();
  act(() => {
    vi.advanceTimersByTime(7 * 350 + 100);
  });
  expect(screen.getByText("✓ push notification sent")).toBeInTheDocument();
});

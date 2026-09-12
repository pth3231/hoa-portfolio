import { act, render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { useInView } from "./useInView";

function Probe() {
  const { ref, inView } = useInView<HTMLDivElement>();
  return <div ref={ref}>{inView ? "visible" : "hidden"}</div>;
}

it("flips inView when the observer reports intersection, once", async () => {
  let observerCb: IntersectionObserverCallback | undefined;
  const instances: MockIO[] = [];
  class MockIO {
    cb: IntersectionObserverCallback;
    disconnected = false;
    constructor(cb: IntersectionObserverCallback) {
      this.cb = cb;
      observerCb = cb;
      instances.push(this);
    }
    observe() {}
    unobserve() {}
    disconnect() {
      this.disconnected = true;
    }
    takeRecords() {
      return [];
    }
    root = null;
    rootMargin = "";
    thresholds = [];
  }
  vi.stubGlobal("IntersectionObserver", MockIO);

  render(<Probe />);
  expect(screen.getByText("hidden")).toBeInTheDocument();

  act(() =>
    observerCb!(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    ),
  );
  expect(await screen.findByText("visible")).toBeInTheDocument();

  act(() =>
    observerCb!(
      [{ isIntersecting: false } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    ),
  );
  expect(screen.getByText("visible")).toBeInTheDocument(); // stays visible
  expect(instances[0].disconnected).toBe(true);
  vi.unstubAllGlobals();
});

import { renderHook } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

afterEach(() => vi.unstubAllGlobals());

it("returns the current matchMedia state", () => {
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockReturnValue({ matches: true, addEventListener: () => {}, removeEventListener: () => {} }),
  );
  const { result } = renderHook(() => usePrefersReducedMotion());
  expect(result.current).toBe(true);
});

it("defaults to false when matchMedia reports no preference", () => {
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockReturnValue({ matches: false, addEventListener: () => {}, removeEventListener: () => {} }),
  );
  const { result } = renderHook(() => usePrefersReducedMotion());
  expect(result.current).toBe(false);
});

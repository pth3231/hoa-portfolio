import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { useTypewriter } from "./useTypewriter";

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

it("types progressively when active", () => {
  const { result } = renderHook(() =>
    useTypewriter("hi", { active: true, speedMs: 10 }),
  );
  expect(result.current.out).toBe("");
  act(() => vi.advanceTimersByTime(10));
  expect(result.current.out).toBe("h");
  expect(result.current.done).toBe(false);
  act(() => vi.advanceTimersByTime(10));
  expect(result.current.out).toBe("hi");
  expect(result.current.done).toBe(true);
});

it("returns full text immediately when reduced motion is set", () => {
  const { result } = renderHook(() =>
    useTypewriter("hi", { active: true, reduced: true }),
  );
  expect(result.current.out).toBe("hi");
  expect(result.current.done).toBe(true);
});

it("stays empty while inactive", () => {
  const { result } = renderHook(() =>
    useTypewriter("hi", { active: false }),
  );
  expect(result.current.out).toBe("");
  expect(result.current.done).toBe(false);
});

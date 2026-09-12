import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { BlogEmbed } from "./BlogEmbed";

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

it("renders the fallback panel when url is empty", () => {
  render(<BlogEmbed url="" repoUrl="https://github.com/pth3231/blog_list" note="demo" />);
  expect(screen.getByRole("link", { name: /open the repo/i })).toHaveAttribute(
    "href",
    "https://github.com/pth3231/blog_list",
  );
  expect(screen.queryByTitle("blog-list live demo")).not.toBeInTheDocument();
});

it("renders an iframe when url is set and loads in time", () => {
  render(<BlogEmbed url="https://blog.example.com" repoUrl="https://github.com/pth3231/blog_list" note="demo" />);
  const frame = screen.getByTitle("blog-list live demo");
  act(() => {
    fireEvent.load(frame);
    vi.advanceTimersByTime(4000);
  });
  expect(screen.getByTitle("blog-list live demo")).toBeInTheDocument();
});

it("falls back when the iframe has not loaded after 4 seconds", () => {
  render(<BlogEmbed url="https://blog.example.com" repoUrl="https://github.com/pth3231/blog_list" note="demo" />);
  act(() => {
    vi.advanceTimersByTime(4100);
  });
  expect(screen.queryByTitle("blog-list live demo")).not.toBeInTheDocument();
  expect(screen.getByRole("link", { name: /open the repo/i })).toBeInTheDocument();
});

it("falls back on small viewports", () => {
  const original = window.innerWidth;
  Object.defineProperty(window, "innerWidth", { value: 400, configurable: true });
  render(<BlogEmbed url="https://blog.example.com" repoUrl="https://github.com/pth3231/blog_list" note="demo" />);
  expect(screen.queryByTitle("blog-list live demo")).not.toBeInTheDocument();
  Object.defineProperty(window, "innerWidth", { value: original, configurable: true });
});

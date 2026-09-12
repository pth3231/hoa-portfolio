import { useTheme } from "../../hooks/useTheme";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="toggle theme"
      className="rounded-md border border-border px-2.5 py-1 text-base text-muted transition-colors hover:border-accent hover:text-accent"
    >
      {theme === "dark" ? "☾" : "☀"}
    </button>
  );
}

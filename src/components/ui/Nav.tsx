import { useEffect, useState } from "react";
import { SECTIONS } from "../sections/sections";
import { ThemeToggle } from "./ThemeToggle";

type SectionId = (typeof SECTIONS)[number]["id"];

export function Nav() {
  const [active, setActive] = useState<SectionId>(SECTIONS[0].id);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 140;
      let current: SectionId = SECTIONS[0].id;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= y) current = s.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-bg/85 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-3">
        <a href="#hero" className="text-lg font-bold text-accent">
          {"</>"}
        </a>
        <ul className="hidden items-center gap-5 md:flex">
          {SECTIONS.slice(1).map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={`text-[15px] transition-colors hover:text-accent ${
                  active === s.id ? "text-accent" : "text-muted"
                }`}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            type="button"
            aria-label="menu"
            className="rounded-md border border-border px-2.5 py-1 text-muted md:hidden"
            onClick={() => setOpen((o) => !o)}
          >
            ≡
          </button>
        </div>
      </nav>
      {open && (
        <ul className="border-t border-border bg-bg px-6 py-2 md:hidden">
          {SECTIONS.slice(1).map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={() => setOpen(false)}
                className={`block py-2 text-[15px] ${active === s.id ? "text-accent" : "text-muted"}`}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}

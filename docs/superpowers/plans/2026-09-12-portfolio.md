# Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the single-page portfolio site specified in `docs/superpowers/specs/2026-09-12-portfolio-design.md` — code-editor aesthetic, dark-default theming, scroll reveals, two project demos, static output for Cloudflare Pages.

**Architecture:** Vite + React SPA, zero runtime dependencies beyond react/react-dom. All copy lives in typed files under `src/content/`; components consume content via props. Theming is CSS custom properties flipped by `data-theme` on `<html>`. Motion is two systems only: scroll reveal (IntersectionObserver + CSS) and the GmailSim scripted terminal.

**Tech Stack:** Vite, React 19, TypeScript, Tailwind CSS v4 (via `@tailwindcss/vite`), JetBrains Mono (self-hosted via `@fontsource-variable/jetbrains-mono` — font assets only, no runtime JS), Vitest + React Testing Library + jsdom.

## Global Constraints

- Default theme is **always dark**; user's explicit toggle (persisted in `localStorage` key `"theme"`) is the only override — never read OS preference for theme choice.
- Color tokens (exact values from spec): dark `--bg #0D1B2A, --surface #13273B, --surface-deep #0A1622, --border #2A4058, --text #E8EDF4, --muted #8A97A8, --accent #FF6B57, --comment #5EB1A0`; light `--bg #F7F6F2, --surface #FFFFFF, --surface-deep #FBFAF7, --border #D8DEE6, --text #16283C, --muted #5C6B7E, --accent #E04E3A, --comment #3A7D6C`. Components reference tokens, never raw hex.
- Type scale: body 18px/1.7, terminal text ≥16px, captions 15px, section headers ~32px, hero name `clamp(48px, 8vw, 88px)`. Entire site is JetBrains Mono.
- Zero runtime JS dependencies beyond `react` + `react-dom`. Dev deps only for tooling/fonts.
- English only. No fabricated stats — only real numbers from the CV (p95 < 300 ms, ~3,000 concurrent, IELTS 8.0, SAT 1470).
- Reduced motion (`prefers-reduced-motion: reduce`): reveals render instantly in final state; GmailSim shows full script without typing.
- Section ids and nav order: `hero, about, timeline, projects, skills, plans, contact`; section labels `/01`–`/07`.
- Commit messages: plain conventional style, no co-author trailers.
- Commands: `npm run dev` (dev server), `npm run build` (typecheck + build), `npm run test` (all tests), `npx vitest run <file>` (single test file).

---

### Task 1: Project scaffold & design tokens

**Files:**
- Create: `package.json`, `tsconfig.json`, `vite.config.ts`, `index.html`, `.gitignore` (already exists — leave as is), `public/favicon.svg`, `src/main.tsx`, `src/App.tsx`, `src/index.css`, `src/test-setup.ts`, `src/App.test.tsx`

**Interfaces:**
- Consumes: nothing (first task).
- Produces: runnable app shell; `App` default-exports a React component; CSS token names `--bg --surface --surface-deep --border --text --muted --accent --comment` mapped to Tailwind utilities (`bg-bg`, `bg-surface`, `bg-surface-deep`, `border-border`, `text-text`, `text-muted`, `text-accent`, `text-comment`); reveal CSS classes `.reveal` / `.is-visible`; `.animate-blink`; test setup polyfills `IntersectionObserver` and `matchMedia` on `window`.

- [ ] **Step 1: Write package.json**

```json
{
  "name": "hoa-portfolio",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  },
  "devDependencies": {
    "@fontsource-variable/jetbrains-mono": "^5.2.5",
    "@tailwindcss/vite": "^4.1.0",
    "@testing-library/jest-dom": "^6.6.0",
    "@testing-library/react": "^16.3.0",
    "@types/react": "^19.1.0",
    "@types/react-dom": "^19.1.0",
    "@vitejs/plugin-react": "^4.5.0",
    "jsdom": "^26.1.0",
    "tailwindcss": "^4.1.0",
    "typescript": "^5.8.0",
    "vite": "^6.3.0",
    "vitest": "^3.1.0"
  }
}
```

- [ ] **Step 2: Write tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noEmit": true,
    "skipLibCheck": true,
    "types": ["vite/client", "vitest/globals"]
  },
  "include": ["src"]
}
```

- [ ] **Step 3: Write vite.config.ts**

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["src/test-setup.ts"],
  },
});
```

- [ ] **Step 4: Write index.html** (meta, favicon, pre-paint theme script — no flash)

```html
<!doctype html>
<html lang="en" data-theme="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Phan Thai Hoa — Full-stack developer</title>
    <meta name="description" content="Portfolio of Phan Thai Hoa — full-stack developer in Tokyo. Projects, skills, and contact." />
    <meta property="og:title" content="Phan Thai Hoa — Full-stack developer" />
    <meta property="og:description" content="Full-stack developer in Tokyo. Projects, skills, and contact." />
    <meta property="og:type" content="website" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <script>
      (function () {
        var t = "dark";
        try {
          if (localStorage.getItem("theme") === "light") t = "light";
        } catch (e) {}
        document.documentElement.setAttribute("data-theme", t);
      })();
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 5: Write public/favicon.svg** (coral `</>` on navy)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="#0D1B2A"/>
  <text x="32" y="44" font-family="monospace" font-size="30" font-weight="bold" fill="#FF6B57" text-anchor="middle">&lt;/&gt;</text>
</svg>
```

- [ ] **Step 6: Write src/index.css** (tokens, Tailwind theme mapping, base type, reveal + blink animation)

```css
@import "tailwindcss";
@import "@fontsource-variable/jetbrains-mono";

:root,
[data-theme="dark"] {
  --bg: #0d1b2a;
  --surface: #13273b;
  --surface-deep: #0a1622;
  --border: #2a4058;
  --text: #e8edf4;
  --muted: #8a97a8;
  --accent: #ff6b57;
  --comment: #5eb1a0;
}

[data-theme="light"] {
  --bg: #f7f6f2;
  --surface: #ffffff;
  --surface-deep: #fbfaf7;
  --border: #d8dee6;
  --text: #16283c;
  --muted: #5c6b7e;
  --accent: #e04e3a;
  --comment: #3a7d6c;
}

@theme inline {
  --color-bg: var(--bg);
  --color-surface: var(--surface);
  --color-surface-deep: var(--surface-deep);
  --color-border: var(--border);
  --color-text: var(--text);
  --color-muted: var(--muted);
  --color-accent: var(--accent);
  --color-comment: var(--comment);
  --font-mono: "JetBrains Mono Variable", ui-monospace, Menlo, monospace;
}

html {
  background: var(--bg);
}

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-mono);
  font-size: 18px;
  line-height: 1.7;
}

/* Scroll reveal (Task 4 uses these classes) */
.reveal {
  opacity: 0;
  transform: translateY(18px);
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
}
.reveal.is-visible {
  opacity: 1;
  transform: none;
}

/* Blinking terminal cursor */
@keyframes blink {
  50% {
    opacity: 0;
  }
}
.animate-blink {
  animation: blink 1.1s step-end infinite;
}

@media (prefers-reduced-motion: reduce) {
  .reveal,
  .reveal.is-visible {
    transition: none;
    opacity: 1;
    transform: none;
  }
  .animate-blink {
    animation: none;
  }
}
```

- [ ] **Step 7: Write src/main.tsx, src/App.tsx (minimal), src/test-setup.ts, src/App.test.tsx**

`src/main.tsx`:

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

`src/App.tsx` (minimal now; later tasks add Nav and sections):

```tsx
export default function App() {
  return <main className="min-h-screen" />;
}
```

`src/test-setup.ts` (polyfills jsdom gaps; individual tests override these):

```ts
import "@testing-library/jest-dom/vitest";

class IntersectionObserverStub implements IntersectionObserver {
  root = null;
  rootMargin = "";
  thresholds = [];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

if (!("IntersectionObserver" in window)) {
  (window as unknown as Record<string, unknown>).IntersectionObserver = IntersectionObserverStub;
}

if (!window.matchMedia) {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
}
```

`src/App.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders without crashing", () => {
    render(<App />);
    expect(document.querySelector("main")).toBeInTheDocument();
  });
});
```

- [ ] **Step 8: Install and verify**

Run: `npm install`
Expected: completes with no errors (a few deprecation warnings are fine).

Run: `npm run test`
Expected: `Test Files  1 passed (1)` — the App smoke test passes.

Run: `npm run build`
Expected: `tsc --noEmit` silent, then `vite build` prints `✓ built in ...` and creates `dist/`.

- [ ] **Step 9: Commit**

```bash
git add package.json package-lock.json tsconfig.json vite.config.ts index.html public/ src/
git commit -m "chore: scaffold Vite+React+Tailwind app with design tokens"
```

---

### Task 2: Theme system — useTheme hook + ThemeToggle

**Files:**
- Create: `src/hooks/useTheme.ts`, `src/components/ui/ThemeToggle.tsx`
- Test: `src/hooks/useTheme.test.ts`, `src/components/ui/ThemeToggle.test.tsx`

**Interfaces:**
- Consumes: token attributes from Task 1 (`data-theme` on `<html>`).
- Produces: `useTheme(): { theme: "dark" | "light"; toggle: () => void }`; `<ThemeToggle />` (no props, renders one `<button aria-label="toggle theme">`).

- [ ] **Step 1: Write failing hook test** `src/hooks/useTheme.test.ts`

```tsx
import { act, renderHook } from "@testing-library/react";
import { beforeEach, expect, it } from "vitest";
import { useTheme } from "./useTheme";

beforeEach(() => {
  localStorage.clear();
  document.documentElement.removeAttribute("data-theme");
});

describe("useTheme", () => {
  it("defaults to dark", () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe("dark");
  });

  it("toggling switches to light, sets the DOM attribute and persists", () => {
    const { result } = renderHook(() => useTheme());
    act(() => result.current.toggle());
    expect(result.current.theme).toBe("light");
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    expect(localStorage.getItem("theme")).toBe("light");
  });

  it("restores light theme from localStorage on next mount", () => {
    localStorage.setItem("theme", "light");
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe("light");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/hooks/useTheme.test.ts`
Expected: FAIL — `Cannot find module './useTheme'` (or equivalent resolve error).

- [ ] **Step 3: Implement** `src/hooks/useTheme.ts`

```ts
import { useCallback, useEffect, useState } from "react";

export type Theme = "dark" | "light";

function initialTheme(): Theme {
  try {
    return localStorage.getItem("theme") === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* storage unavailable (private mode) — theme still applies for this session */
    }
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  return { theme, toggle };
}
```

- [ ] **Step 4: Run hook test to verify it passes**

Run: `npx vitest run src/hooks/useTheme.test.ts`
Expected: `3 passed`.

- [ ] **Step 5: Write failing component test** `src/components/ui/ThemeToggle.test.tsx`

```tsx
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, expect, it } from "vitest";
import { ThemeToggle } from "./ThemeToggle";

beforeEach(() => localStorage.clear());

describe("ThemeToggle", () => {
  it("renders a labelled button showing moon in dark mode", () => {
    render(<ThemeToggle />);
    const btn = screen.getByLabelText("toggle theme");
    expect(btn).toHaveTextContent("☾");
  });

  it("clicking switches the document to light theme and shows sun", () => {
    render(<ThemeToggle />);
    fireEvent.click(screen.getByLabelText("toggle theme"));
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    expect(screen.getByLabelText("toggle theme")).toHaveTextContent("☀");
  });
});
```

- [ ] **Step 6: Run to verify it fails**

Run: `npx vitest run src/components/ui/ThemeToggle.test.tsx`
Expected: FAIL — `Cannot find module './ThemeToggle'`.

- [ ] **Step 7: Implement** `src/components/ui/ThemeToggle.tsx`

```tsx
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
```

- [ ] **Step 8: Run component test, then full suite**

Run: `npx vitest run src/components/ui/ThemeToggle.test.tsx`
Expected: `2 passed`.

Run: `npm run test`
Expected: all files pass (Task 1 + Task 2 tests).

- [ ] **Step 9: Commit**

```bash
git add src/hooks/useTheme.ts src/components/ui/ThemeToggle.tsx src/hooks/useTheme.test.ts src/components/ui/ThemeToggle.test.tsx
git commit -m "feat: theme system with dark default and persistence"
```

---

### Task 3: Content modules (all CV data)

**Files:**
- Create: `src/content/profile.ts`, `src/content/education.ts`, `src/content/skills.ts`, `src/content/projects.ts`, `src/content/plans.ts`, `src/content/links.ts`
- Test: `src/content/content.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces (exact export names and shapes used by every later task):
  - `profile: { name: string; role: string; location: string; intro: string; aboutParagraphs: string[]; aboutLines: string[]; qualifications: { label: string; value: string }[] }`
  - `timeline: TimelineEntry[]` where `TimelineEntry = { period: string; title: string; org: string; place: string; kind: "education" | "experience"; detail?: string }`
  - `skillGroups: { name: string; items: string[] }[]`
  - `gmailSimScript: { command: string; lines: { text: string; tone: "info" | "mail" | "ok" | "accent" }[] }`
  - `projects: { id: string; name: string; tagline: string; repo: string; embedUrl: string; facts: string[] }[]` — `embedUrl: ""` means "render fallback" (user fills at deploy time)
  - `plans: { text: string; sample: boolean }[]`
  - `links: { email: string; phone: string; linkedin: string; github: string }`

- [ ] **Step 1: Write failing shape test** `src/content/content.test.ts`

```ts
import { expect, it } from "vitest";
import { profile } from "./profile";
import { timeline } from "./education";
import { skillGroups } from "./skills";
import { gmailSimScript, projects } from "./projects";
import { plans } from "./plans";
import { links } from "./links";

it("profile has the identity fields", () => {
  expect(profile.name).toBe("Phan Thai Hoa");
  expect(profile.role).toBe("Full-stack developer");
  expect(profile.location).toBe("Tokyo, Japan");
  expect(profile.intro.length).toBeGreaterThan(0);
  expect(profile.aboutParagraphs.length).toBeGreaterThanOrEqual(2);
  expect(profile.qualifications.length).toBe(3);
});

it("timeline has the three CV entries in order", () => {
  expect(timeline.map((e) => e.kind)).toEqual(["education", "experience", "education"]);
  expect(timeline[2].org).toBe("International Christian University");
});

it("skills keeps the five CV groups", () => {
  expect(skillGroups.map((g) => g.name)).toEqual([
    "Languages",
    "Frontend",
    "Backend",
    "Databases",
    "Deployment & Testing",
  ]);
});

it("projects has both repos; blog-list embed URL starts empty (fallback mode)", () => {
  expect(projects.map((p) => p.id)).toEqual(["blog-list", "gmail-notification"]);
  expect(projects[0].embedUrl).toBe("");
  expect(projects.every((p) => p.repo.startsWith("https://github.com/pth3231/"))).toBe(true);
});

it("gmail sim script is a non-empty typed sequence", () => {
  expect(gmailSimScript.command).toBe("cron run gmail-summarize");
  expect(gmailSimScript.lines.length).toBe(7);
  expect(gmailSimScript.lines.at(-1)?.tone).toBe("accent");
});

it("plans ship as marked samples", () => {
  expect(plans.length).toBeGreaterThan(0);
  expect(plans.every((p) => p.sample)).toBe(true);
});

it("links carry the real contact targets", () => {
  expect(links.email).toBe("phanthaihoa070707@gmail.com");
  expect(links.github).toBe("https://github.com/pth3231");
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run src/content/content.test.ts`
Expected: FAIL — cannot resolve `./profile` (first import error).

- [ ] **Step 3: Write the six content files**

`src/content/profile.ts`:

```ts
export const profile = {
  name: "Phan Thai Hoa",
  role: "Full-stack developer",
  location: "Tokyo, Japan",
  intro:
    "I build and run web services end to end — React frontends, Node and Python backends, and the CI/CD, load-testing and monitoring wrapped around them.",
  aboutParagraphs: [
    "I'm Hoa — a developer who likes owning software end to end: the interface, the API behind it, and the pipeline that ships it.",
    "Most recently that meant a full-stack blog platform stress-tested to ~3,000 concurrent users with p95 under 300 ms, deployed to bare metal through GitHub Actions and watched with Prometheus + Grafana.",
  ],
  aboutLines: [
    "B.S. Information Technology — Hanoi University of Science and Technology (2025–2026)",
    "B.A. Information Sciences — International Christian University, Tokyo (2026– )",
    "Full-stack: React · Node/Express · FastAPI",
    "Ops-minded: CI/CD · Docker · k6 · Prometheus + Grafana",
  ],
  qualifications: [
    { label: "IELTS", value: "8.0" },
    { label: "SAT", value: "1470" },
    { label: "Scholarship", value: "Fast Retailing Foundation — full-funded" },
  ],
};
```

`src/content/education.ts`:

```ts
export type TimelineEntry = {
  period: string;
  title: string;
  org: string;
  place: string;
  kind: "education" | "experience";
  detail?: string;
};

export const timeline: TimelineEntry[] = [
  {
    period: "Aug 2025 – Jun 2026",
    title: "B.S. Information Technology",
    org: "Hanoi University of Science and Technology",
    place: "Hanoi, Vietnam",
    kind: "education",
  },
  {
    period: "Apr 2026 – Aug 2026",
    title: "Research Assistant — CBMC enhancement for ISR verification",
    org: "Hanoi University of Science and Technology",
    place: "Hanoi, Vietnam",
    kind: "experience",
    detail:
      "Built a benchmark kit combining open-source automotive projects with Python scripts for quick performance summarization.",
  },
  {
    period: "Sep 2026 – present",
    title: "B.A. Information Sciences",
    org: "International Christian University",
    place: "Tokyo, Japan",
    kind: "education",
  },
];
```

`src/content/skills.ts`:

```ts
export type SkillGroup = { name: string; items: string[] };

export const skillGroups: SkillGroup[] = [
  { name: "Languages", items: ["C/C++", "Python", "JavaScript/TypeScript", "Go"] },
  { name: "Frontend", items: ["HTML/CSS/JS", "Tailwind CSS", "React", "Zustand", "React Router"] },
  { name: "Backend", items: ["Node.js", "Express", "Morgan", "FastAPI"] },
  { name: "Databases", items: ["Redis", "MongoDB", "Postgres"] },
  {
    name: "Deployment & Testing",
    items: ["Docker", "GitHub Actions", "k6", "Cloudflare", "AWS", "GCP", "Prometheus", "Grafana"],
  },
];
```

`src/content/projects.ts`:

```ts
export type SimTone = "info" | "mail" | "ok" | "accent";

export const gmailSimScript = {
  command: "cron run gmail-summarize",
  lines: [
    { text: "▸ gmail api: 3 unread fetched", tone: "info" } as const,
    { text: "· recruiter@tokyo.dev — interview offer", tone: "mail" } as const,
    { text: "· notifications@github — PR merged", tone: "mail" } as const,
    { text: "· registrar@icu.ac.jp — schedule update", tone: "mail" } as const,
    { text: "▸ ollama: summarizing…", tone: "info" } as const,
    { text: "» 1 action needed, 2 FYI — 40 words total", tone: "ok" } as const,
    { text: "✓ push notification sent", tone: "accent" } as const,
  ],
};

export const projects = [
  {
    id: "blog-list",
    name: "blog-list",
    tagline: "Full-stack blog platform, deployed on bare metal",
    repo: "https://github.com/pth3231/blog_list",
    // Set at deploy time (see spec §6.1). Empty string → BlogEmbed renders its fallback panel.
    embedUrl: "",
    facts: [
      "CI/CD via GitHub Actions → bare-metal deploy",
      "k6 + vitest + supertest: ~3,000 concurrent users, p95 < 300 ms",
      "Registered domain served through Cloudflare Tunnel",
      "Prometheus + Grafana monitoring",
    ],
  },
  {
    id: "gmail-notification",
    name: "gmail-notification",
    tagline: "LLM inbox summarizer with push notifications",
    repo: "https://github.com/pth3231/gmail-notification",
    facts: [
      "Ollama LLM + Gmail API",
      "GCP VM, cron every 3 hours",
      "Fetch → summarize → push, unattended",
    ],
  },
];
```

`src/content/plans.ts`:

```ts
export type Plan = { text: string; sample: boolean };

// Sample items — replace after launch (spec §6.3). `sample: true` renders a muted "(sample)" tag.
export const plans: Plan[] = [
  { text: "Finish B.A. in Information Sciences at ICU", sample: true },
  { text: "Software engineering internship in Japan", sample: true },
  { text: "Ship portfolio v2 with project case studies", sample: true },
];
```

`src/content/links.ts`:

```ts
export const links = {
  email: "phanthaihoa070707@gmail.com",
  phone: "+81 90 7780 1063",
  linkedin: "https://www.linkedin.com/in/hganyu",
  github: "https://github.com/pth3231",
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/content/content.test.ts`
Expected: `7 passed`.

- [ ] **Step 5: Commit**

```bash
git add src/content/
git commit -m "feat: typed content modules with CV data"
```

---

### Task 4: Observation & motion hooks, Reveal component

**Files:**
- Create: `src/hooks/useInView.ts`, `src/hooks/usePrefersReducedMotion.ts`, `src/hooks/useTypewriter.ts`, `src/components/ui/Reveal.tsx`
- Test: `src/hooks/useInView.test.ts`, `src/hooks/usePrefersReducedMotion.test.ts`, `src/hooks/useTypewriter.test.ts`

**Interfaces:**
- Consumes: `.reveal` / `.is-visible` CSS from Task 1.
- Produces:
  - `useInView<T extends Element>(): { ref: RefObject<T | null>; inView: boolean }` — fires once, then stops observing.
  - `usePrefersReducedMotion(): boolean`
  - `useTypewriter(text: string, opts: { active: boolean; speedMs?: number; reduced?: boolean }): { out: string; done: boolean }` — `done` is true when full text is typed (or immediately when `reduced`).
  - `<Reveal delayMs?: number; className?: string>` — wraps children in the reveal div.

- [ ] **Step 1: Write failing test** `src/hooks/useInView.test.ts`

```tsx
import { render, screen } from "@testing-library/react";
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

  observerCb!(
    [{ isIntersecting: true } as IntersectionObserverEntry],
    {} as IntersectionObserver,
  );
  expect(await screen.findByText("visible")).toBeInTheDocument();

  observerCb!(
    [{ isIntersecting: false } as IntersectionObserverEntry],
    {} as IntersectionObserver,
  );
  expect(screen.getByText("visible")).toBeInTheDocument(); // stays visible
  expect(instances[0].disconnected).toBe(true);
  vi.unstubAllGlobals();
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run src/hooks/useInView.test.ts`
Expected: FAIL — cannot resolve `./useInView`.

- [ ] **Step 3: Implement** `src/hooks/useInView.ts`

```ts
import { useEffect, useRef, useState } from "react";

/** Fires once when the element enters the viewport, then stops observing. */
export function useInView<T extends Element>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, inView };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/hooks/useInView.test.ts`
Expected: `1 passed`.

- [ ] **Step 5: Write failing test** `src/hooks/usePrefersReducedMotion.test.ts`

```tsx
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
```

- [ ] **Step 6: Run to verify it fails**

Run: `npx vitest run src/hooks/usePrefersReducedMotion.test.ts`
Expected: FAIL — cannot resolve `./usePrefersReducedMotion`.

- [ ] **Step 7: Implement** `src/hooks/usePrefersReducedMotion.ts`

```ts
import { useEffect, useState } from "react";

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
```

- [ ] **Step 8: Run test to verify it passes**

Run: `npx vitest run src/hooks/usePrefersReducedMotion.test.ts`
Expected: `2 passed`.

- [ ] **Step 9: Write failing test** `src/hooks/useTypewriter.test.ts`

```tsx
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
```

- [ ] **Step 10: Run to verify it fails**

Run: `npx vitest run src/hooks/useTypewriter.test.ts`
Expected: FAIL — cannot resolve `./useTypewriter`.

- [ ] **Step 11: Implement** `src/hooks/useTypewriter.ts`

```ts
import { useEffect, useState } from "react";

export function useTypewriter(
  text: string,
  opts: { active: boolean; speedMs?: number; reduced?: boolean },
) {
  const { active, speedMs = 45, reduced = false } = opts;
  const [out, setOut] = useState("");

  useEffect(() => {
    if (reduced) {
      setOut(text);
      return;
    }
    if (!active) {
      setOut("");
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speedMs);
    return () => clearInterval(id);
  }, [active, reduced, text, speedMs]);

  const done = reduced || (active && out.length >= text.length);
  return { out, done };
}
```

- [ ] **Step 12: Run test to verify it passes**

Run: `npx vitest run src/hooks/useTypewriter.test.ts`
Expected: `3 passed`.

- [ ] **Step 13: Implement Reveal component** `src/components/ui/Reveal.tsx` (visual wrapper; covered indirectly by section smoke tests — no dedicated test file)

```tsx
import type { ReactNode } from "react";
import { useInView } from "../../hooks/useInView";

export function Reveal({
  children,
  delayMs = 0,
  className = "",
}: {
  children: ReactNode;
  delayMs?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={`reveal ${inView ? "is-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 14: Run full suite and typecheck**

Run: `npm run test && npx tsc --noEmit`
Expected: all tests pass; tsc silent.

- [ ] **Step 15: Commit**

```bash
git add src/hooks/ src/components/ui/Reveal.tsx
git commit -m "feat: in-view, reduced-motion and typewriter hooks with Reveal wrapper"
```

---

### Task 5: Nav & UI primitives (SectionHeader, Terminal)

**Files:**
- Create: `src/components/ui/SectionHeader.tsx`, `src/components/ui/Terminal.tsx`, `src/components/ui/Nav.tsx`, `src/components/sections/sections.ts`
- Modify: `src/App.tsx`
- Test: `src/components/ui/SectionHeader.test.tsx`, `src/components/ui/Terminal.test.tsx`, `src/components/ui/Nav.test.tsx`

**Interfaces:**
- Consumes: `ThemeToggle` (Task 2).
- Produces:
  - `<SectionHeader index: string; title: string />` (e.g. index `"01"`).
  - `<Terminal title: string>{children}</Terminal>` — window chrome, `--surface-deep` interior, min 16px text.
  - `SECTIONS: { id: string; label: string; index: string }[]` (single source of section ids/order, exported from `sections.ts`).
  - `<Nav />` — fixed bar, active-section underline, mobile menu; assumes each section element exists with `id` from `SECTIONS`.

- [ ] **Step 1: Write failing tests** `src/components/ui/SectionHeader.test.tsx`

```tsx
import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { SectionHeader } from "./SectionHeader";

it("renders the numbered title", () => {
  render(<SectionHeader index="04" title="Projects" />);
  expect(screen.getByText("/04")).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Projects" })).toBeInTheDocument();
});
```

`src/components/ui/Terminal.test.tsx`:

```tsx
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
```

`src/components/ui/Nav.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { Nav } from "./Nav";

it("renders mark, section links and theme toggle", () => {
  render(<Nav />);
  expect(screen.getByLabelText("toggle theme")).toBeInTheDocument();
  expect(screen.getAllByRole("link", { name: /projects/i }).length).toBeGreaterThan(0);
});
```

- [ ] **Step 2: Run to verify they fail**

Run: `npx vitest run src/components/ui/`
Expected: FAIL — cannot resolve the three new modules.

- [ ] **Step 3: Implement the shared section registry** `src/components/sections/sections.ts`

```ts
export const SECTIONS = [
  { id: "hero", label: "home", index: "01" },
  { id: "about", label: "about", index: "02" },
  { id: "timeline", label: "timeline", index: "03" },
  { id: "projects", label: "projects", index: "04" },
  { id: "skills", label: "skills", index: "05" },
  { id: "plans", label: "plans", index: "06" },
  { id: "contact", label: "contact", index: "07" },
] as const;
```

- [ ] **Step 4: Implement** `src/components/ui/SectionHeader.tsx`

```tsx
export function SectionHeader({ index, title }: { index: string; title: string }) {
  return (
    <div className="mb-10 flex items-baseline gap-4">
      <span className="text-lg text-accent">/{index}</span>
      <h2 className="text-[32px] font-bold leading-tight tracking-tight">{title}</h2>
      <span className="hidden h-px flex-1 self-center bg-border md:block" />
    </div>
  );
}
```

- [ ] **Step 5: Implement** `src/components/ui/Terminal.tsx`

```tsx
import type { ReactNode } from "react";

export function Terminal({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface-deep">
      <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-comment" />
        <span className="h-2.5 w-2.5 rounded-full bg-comment/50" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="ml-2 text-[15px] text-muted">{title}</span>
      </div>
      <div className="p-4 text-[16px] leading-loose">{children}</div>
    </div>
  );
}
```

- [ ] **Step 6: Implement** `src/components/ui/Nav.tsx`

```tsx
import { useEffect, useState } from "react";
import { SECTIONS } from "../sections/sections";
import { ThemeToggle } from "./ThemeToggle";

export function Nav() {
  const [active, setActive] = useState(SECTIONS[0].id);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 140;
      let current = SECTIONS[0].id;
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
```

- [ ] **Step 7: Mount Nav in App** — replace `src/App.tsx`:

```tsx
import { Nav } from "./components/ui/Nav";

export default function App() {
  return (
    <>
      <Nav />
      <main className="min-h-screen pt-16" />
    </>
  );
}
```

- [ ] **Step 8: Run tests, typecheck, build**

Run: `npm run test && npm run build`
Expected: all tests pass; build succeeds.

- [ ] **Step 9: Commit**

```bash
git add src/components/ src/App.tsx
git commit -m "feat: nav with active tracking, section header, terminal chrome"
```

---

### Task 6: Line-art SVG components

**Files:**
- Create: `src/components/art/HeroArt.tsx`, `src/components/art/TimelineArt.tsx`, `src/components/art/StackArt.tsx`, `src/components/art/EnvelopeArt.tsx`
- Test: `src/components/art/art.test.tsx`

**Interfaces:**
- Consumes: CSS token variables (Task 1).
- Produces: `<HeroArt />`, `<TimelineArt />`, `<StackArt />`, `<EnvelopeArt />` — each takes `className?: string`, renders an accessible-hidden static SVG (`aria-hidden="true"`), strokes in `var(--border)`, exactly one coral (`var(--accent)`) element per drawing.

- [ ] **Step 1: Write failing smoke test** `src/components/art/art.test.tsx`

```tsx
import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { EnvelopeArt } from "./EnvelopeArt";
import { HeroArt } from "./HeroArt";
import { StackArt } from "./StackArt";
import { TimelineArt } from "./TimelineArt";

it.each([
  ["HeroArt", HeroArt],
  ["TimelineArt", TimelineArt],
  ["StackArt", StackArt],
  ["EnvelopeArt", EnvelopeArt],
])("%s renders a hidden svg", (_name, Art) => {
  const { container } = render(<Art />);
  const svg = container.querySelector("svg");
  expect(svg).toBeInTheDocument();
  expect(svg?.getAttribute("aria-hidden")).toBe("true");
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run src/components/art/art.test.tsx`
Expected: FAIL — cannot resolve the modules.

- [ ] **Step 3: Implement the four drawings**

`src/components/art/HeroArt.tsx` (terminal outline + code lines + big coral caret):

```tsx
export function HeroArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 240" className={className} fill="none" aria-hidden="true">
      <rect x="20" y="20" width="280" height="200" rx="10" stroke="var(--border)" strokeWidth="2" />
      <line x1="20" y1="52" x2="300" y2="52" stroke="var(--border)" strokeWidth="2" />
      <circle cx="36" cy="36" r="4" stroke="var(--comment)" strokeWidth="2" />
      <circle cx="52" cy="36" r="4" stroke="var(--comment)" strokeWidth="2" />
      <circle cx="68" cy="36" r="4" stroke="var(--border)" strokeWidth="2" />
      <line x1="44" y1="76" x2="150" y2="76" stroke="var(--muted)" strokeWidth="2" strokeLinecap="round" />
      <line x1="44" y1="100" x2="220" y2="100" stroke="var(--muted)" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <line x1="58" y1="124" x2="180" y2="124" stroke="var(--muted)" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      <line x1="58" y1="148" x2="120" y2="148" stroke="var(--comment)" strokeWidth="2" strokeLinecap="round" />
      <rect x="44" y="176" width="30" height="9" fill="var(--accent)" />
    </svg>
  );
}
```

`src/components/art/TimelineArt.tsx` (dashed travel path, Hanoi node, coral Tokyo node):

```tsx
export function TimelineArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 120" className={className} fill="none" aria-hidden="true">
      <path
        d="M24 92 C 100 16, 190 112, 296 32"
        stroke="var(--border)"
        strokeWidth="2"
        strokeDasharray="6 6"
      />
      <circle cx="24" cy="92" r="7" fill="var(--surface)" stroke="var(--border)" strokeWidth="2" />
      <circle cx="296" cy="32" r="7" fill="var(--accent)" />
      <text x="24" y="116" textAnchor="middle" fontSize="12" fill="var(--muted)" fontFamily="monospace">
        HAN
      </text>
      <text x="296" y="20" textAnchor="middle" fontSize="12" fill="var(--muted)" fontFamily="monospace">
        TYO
      </text>
    </svg>
  );
}
```

`src/components/art/StackArt.tsx` (three stacked layers, one coral dot):

```tsx
export function StackArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 140" className={className} fill="none" aria-hidden="true">
      <rect x="30" y="92" width="140" height="24" rx="6" stroke="var(--border)" strokeWidth="2" />
      <rect x="30" y="58" width="140" height="24" rx="6" stroke="var(--border)" strokeWidth="2" />
      <rect x="30" y="24" width="140" height="24" rx="6" stroke="var(--border)" strokeWidth="2" />
      <circle cx="152" cy="36" r="4" fill="var(--accent)" />
    </svg>
  );
}
```

`src/components/art/EnvelopeArt.tsx` (rectangle + single V fold + coral seal — the simplified version):

```tsx
export function EnvelopeArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 160" className={className} fill="none" aria-hidden="true">
      <rect x="30" y="36" width="180" height="92" rx="8" stroke="var(--border)" strokeWidth="2" />
      <path
        d="M40 46 L120 100 L200 46"
        stroke="var(--border)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="120" cy="104" r="5" fill="var(--accent)" />
    </svg>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/art/art.test.tsx`
Expected: `4 passed`.

- [ ] **Step 5: Commit**

```bash
git add src/components/art/
git commit -m "feat: static line-art illustrations"
```

---

### Task 7: Hero & About sections

**Files:**
- Create: `src/components/sections/Hero.tsx`, `src/components/sections/About.tsx`
- Modify: `src/App.tsx`
- Test: `src/components/sections/Hero.test.tsx`, `src/components/sections/About.test.tsx`

**Interfaces:**
- Consumes: `profile` (Task 3), `links` (Task 3), `Reveal` (Task 4), `HeroArt` (Task 6), `Terminal` (Task 5).
- Produces: `<Hero />` (section `id="hero"`), `<About />` (section `id="about"`). Both self-contained; App just renders them.

- [ ] **Step 1: Write failing tests** `src/components/sections/Hero.test.tsx`

```tsx
import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { Hero } from "./Hero";

it("renders name, role, location badge and profile links", () => {
  render(<Hero />);
  expect(screen.getByRole("heading", { name: /phan thai hoa/i })).toBeInTheDocument();
  expect(screen.getByText(/> Full-stack developer/)).toBeInTheDocument();
  expect(screen.getByText(/based in tokyo, japan/i)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute(
    "href",
    "https://github.com/pth3231",
  );
});
```

`src/components/sections/About.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { About } from "./About";

it("renders the section header, whoami vignette and qualifications", () => {
  render(<About />);
  expect(screen.getByRole("heading", { name: "About" })).toBeInTheDocument();
  expect(screen.getByText("$ whoami")).toBeInTheDocument();
  expect(screen.getByText("IELTS")).toBeInTheDocument();
  expect(screen.getByText("8.0")).toBeInTheDocument();
});
```

- [ ] **Step 2: Run to verify they fail**

Run: `npx vitest run src/components/sections/`
Expected: FAIL — cannot resolve `./Hero`, `./About`.

- [ ] **Step 3: Implement** `src/components/sections/Hero.tsx`

```tsx
import { links } from "../../content/links";
import { profile as me } from "../../content/profile";
import { HeroArt } from "../art/HeroArt";
import { Reveal } from "../ui/Reveal";

export function Hero() {
  return (
    <section id="hero" className="scroll-mt-24">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 pb-24 pt-20 md:flex-row md:items-center">
        <div className="flex-1">
          <Reveal>
            <span className="inline-block rounded-full border border-border px-3 py-1 text-[15px] text-muted">
              ▸ Based in {me.location}
            </span>
          </Reveal>
          <Reveal delayMs={100}>
            <h1
              className="mt-6 font-bold leading-none tracking-tight"
              style={{ fontSize: "clamp(48px, 8vw, 88px)" }}
            >
              {me.name}
            </h1>
          </Reveal>
          <Reveal delayMs={200}>
            <p className="mt-4 text-xl text-accent">{"> " + me.role}</p>
          </Reveal>
          <Reveal delayMs={300}>
            <p className="mt-4 max-w-xl text-muted">{me.intro}</p>
          </Reveal>
          <Reveal delayMs={400}>
            <div className="mt-8 flex gap-6">
              <a href={links.github} target="_blank" rel="noreferrer" className="underline decoration-border underline-offset-4 hover:text-accent">
                github ↗
              </a>
              <a href={links.linkedin} target="_blank" rel="noreferrer" className="underline decoration-border underline-offset-4 hover:text-accent">
                linkedin ↗
              </a>
            </div>
          </Reveal>
        </div>
        <Reveal delayMs={300} className="hidden flex-1 md:block">
          <HeroArt className="w-full max-w-sm mx-auto" />
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Implement** `src/components/sections/About.tsx`

```tsx
import { profile } from "../../content/profile";
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";
import { Terminal } from "../ui/Terminal";

export function About() {
  return (
    <section id="about" className="scroll-mt-24">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <SectionHeader index="02" title="About" />
        <div className="grid gap-10 md:grid-cols-2">
          <Reveal>
            <Terminal title="whoami.sh">
              <div>
                <span className="text-comment">$</span> <span>whoami</span>
              </div>
              <div className="pl-4 text-accent">{profile.name}</div>
              <div>
                <span className="text-comment">$</span> <span>cat about.md</span>
              </div>
              {profile.aboutLines.map((line) => (
                <div key={line} className="pl-4 text-muted">
                  {line}
                </div>
              ))}
            </Terminal>
          </Reveal>
          <div>
            {profile.aboutParagraphs.map((p, i) => (
              <Reveal key={p.slice(0, 24)} delayMs={i * 100}>
                <p className={i > 0 ? "mt-4" : ""}>{p}</p>
              </Reveal>
            ))}
            <Reveal delayMs={200}>
              <div className="mt-8 flex flex-wrap gap-3">
                {profile.qualifications.map((q) => (
                  <span key={q.label} className="rounded-md border border-border bg-surface px-3 py-1.5 text-[15px]">
                    <span className="text-muted">{q.label}</span>{" "}
                    <span className="text-accent">{q.value}</span>
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Wire into App** — `src/App.tsx`:

```tsx
import { About } from "./components/sections/About";
import { Hero } from "./components/sections/Hero";
import { Nav } from "./components/ui/Nav";

export default function App() {
  return (
    <>
      <Nav />
      <main className="min-h-screen pt-16">
        <Hero />
        <About />
      </main>
    </>
  );
}
```

- [ ] **Step 6: Run tests and typecheck**

Run: `npm run test && npx tsc --noEmit`
Expected: all pass, tsc silent (unused-import errors would fail here — the corrected imports from Step 3 matter).

- [ ] **Step 7: Visual check**

Run: `npm run dev` and open the printed localhost URL.
Expected: hero with badge/name/role/links and the terminal-outline drawing; About with whoami vignette and qualification chips. Dark navy background, coral accents. Fix only layout-level problems (spacing, obvious breakage) — polish passes come after all sections exist.

- [ ] **Step 8: Commit**

```bash
git add src/components/sections/ src/App.tsx
git commit -m "feat: hero and about sections"
```

---

### Task 8: Demo components — BlogEmbed & GmailSim

**Files:**
- Create: `src/demos/BlogEmbed.tsx`, `src/demos/GmailSim.tsx`, `public/images/blog-list-card.svg`
- Test: `src/demos/BlogEmbed.test.tsx`, `src/demos/GmailSim.test.tsx`

**Interfaces:**
- Consumes: `useInView`/`useTypewriter`/`usePrefersReducedMotion` (Task 4), `gmailSimScript` (Task 3), `Terminal` (Task 5).
- Produces:
  - `<BlogEmbed url: string; repoUrl: string; note: string />` — iframe when `url` set, viewport ≥640px, and load confirmed within 4 s; otherwise fallback card (image + repo link). Never renders a blank box.
  - `<GmailSim />` — scripted terminal, plays once on first in-view; reduced motion shows the full final frame instantly.

- [ ] **Step 1: Write failing test** `src/demos/BlogEmbed.test.tsx`

```tsx
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
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run src/demos/BlogEmbed.test.tsx`
Expected: FAIL — cannot resolve `./BlogEmbed`.

- [ ] **Step 3: Write the fallback card image** `public/images/blog-list-card.svg`

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400">
  <rect width="640" height="400" fill="#0D1B2A"/>
  <rect x="40" y="40" width="560" height="320" rx="10" fill="#0A1622" stroke="#2A4058" stroke-width="2"/>
  <rect x="40" y="40" width="560" height="36" rx="10" fill="#13273B"/>
  <line x1="40" y1="76" x2="600" y2="76" stroke="#2A4058" stroke-width="2"/>
  <circle cx="62" cy="58" r="5" fill="#5EB1A0"/>
  <circle cx="80" cy="58" r="5" fill="#5EB1A0" opacity="0.5"/>
  <circle cx="98" cy="58" r="5" fill="#2A4058"/>
  <text x="320" y="63" text-anchor="middle" font-family="monospace" font-size="14" fill="#8A97A8">blog-list</text>
  <rect x="90" y="120" width="300" height="14" rx="7" fill="#E8EDF4" opacity="0.85"/>
  <rect x="90" y="156" width="420" height="10" rx="5" fill="#8A97A8" opacity="0.6"/>
  <rect x="90" y="180" width="380" height="10" rx="5" fill="#8A97A8" opacity="0.45"/>
  <rect x="90" y="204" width="440" height="10" rx="5" fill="#8A97A8" opacity="0.3"/>
  <rect x="90" y="260" width="120" height="30" rx="8" fill="none" stroke="#FF6B57" stroke-width="2"/>
  <text x="150" y="280" text-anchor="middle" font-family="monospace" font-size="14" fill="#FF6B57">read →</text>
</svg>
```

- [ ] **Step 4: Implement** `src/demos/BlogEmbed.tsx`

```tsx
import { useEffect, useRef, useState } from "react";

const SMALL_VIEWPORT = 640;
const LOAD_TIMEOUT_MS = 4000;

export function BlogEmbed({ url, repoUrl, note }: { url: string; repoUrl: string; note: string }) {
  const [loaded, setLoaded] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const [small, setSmall] = useState(
    () => typeof window !== "undefined" && window.innerWidth < SMALL_VIEWPORT,
  );
  const timerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!url) return;
    timerRef.current = window.setTimeout(() => setTimedOut(true), LOAD_TIMEOUT_MS);
    return () => window.clearTimeout(timerRef.current);
  }, [url]);

  useEffect(() => {
    const onResize = () => setSmall(window.innerWidth < SMALL_VIEWPORT);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const showIframe = url !== "" && !small && !timedOut;

  if (!showIframe) {
    return (
      <figure className="overflow-hidden rounded-lg border border-border bg-surface-deep">
        <img
          src="/images/blog-list-card.svg"
          alt="blog-list interface card"
          className="aspect-[16/10] w-full object-cover"
        />
        <figcaption className="flex items-center justify-between gap-4 border-t border-border px-4 py-3 text-[15px]">
          <span className="text-muted">{note}</span>
          <a href={repoUrl} target="_blank" rel="noreferrer" className="text-accent hover:underline">
            open the repo ↗
          </a>
        </figcaption>
      </figure>
    );
  }

  return (
    <figure className="overflow-hidden rounded-lg border border-border bg-surface">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-comment" />
        <span className="h-2.5 w-2.5 rounded-full bg-comment/50" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="ml-2 truncate text-[15px] text-muted">{url}</span>
        {loaded && <span className="ml-auto text-[15px] text-comment">● live</span>}
      </div>
      <iframe
        title="blog-list live demo"
        src={url}
        loading="lazy"
        className="aspect-[16/10] w-full bg-surface-deep"
        onLoad={() => {
          setLoaded(true);
          if (timerRef.current !== undefined) window.clearTimeout(timerRef.current);
        }}
      />
    </figure>
  );
}
```

- [ ] **Step 5: Run BlogEmbed tests to verify they pass**

Run: `npx vitest run src/demos/BlogEmbed.test.tsx`
Expected: `4 passed`.

- [ ] **Step 6: Write failing test** `src/demos/GmailSim.test.tsx`

```tsx
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
  expect(screen.getByText("cron run gmail-summarize")).toBeInTheDocument();
  expect(screen.getByText("✓ push notification sent")).toBeInTheDocument();
});

it("types the command then reveals lines in sequence", () => {
  stubIntersection(true);
  stubReduced(false);
  render(<GmailSim />);

  // Command is 24 chars at 45ms → done just after ~1080ms. Lines: 7 × 350ms.
  expect(screen.queryByText("✓ push notification sent")).not.toBeInTheDocument();
  act(() => {
    vi.advanceTimersByTime(1100 + 7 * 350 + 100);
  });
  expect(screen.getByText("✓ push notification sent")).toBeInTheDocument();
});
```

- [ ] **Step 7: Run to verify it fails**

Run: `npx vitest run src/demos/GmailSim.test.tsx`
Expected: FAIL — cannot resolve `./GmailSim`.

- [ ] **Step 8: Implement** `src/demos/GmailSim.tsx`

```tsx
import { useEffect, useState } from "react";
import { gmailSimScript } from "../content/projects";
import { Terminal } from "../components/ui/Terminal";
import { useInView } from "../hooks/useInView";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { useTypewriter } from "../hooks/useTypewriter";

const LINE_INTERVAL_MS = 350;

const TONE_CLASS: Record<string, string> = {
  info: "text-muted",
  mail: "pl-4",
  ok: "pl-4 text-comment",
  accent: "text-accent",
};

export function GmailSim() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = usePrefersReducedMotion();
  const { out, done } = useTypewriter(gmailSimScript.command, { active: inView, reduced });
  const [lineCount, setLineCount] = useState(0);

  const startLines = inView && (done || reduced);

  useEffect(() => {
    if (!startLines || reduced) return;
    const id = setInterval(() => {
      setLineCount((n) => Math.min(n + 1, gmailSimScript.lines.length));
    }, LINE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [startLines, reduced]);

  const visible = !inView ? 0 : reduced ? gmailSimScript.lines.length : lineCount;

  return (
    <div ref={ref}>
      <Terminal title="cron — gmail-summarize">
        <div>
          <span className="text-comment">cron</span> {out}
          {!done && <span className="animate-blink text-accent">▊</span>}
        </div>
        {gmailSimScript.lines.slice(0, visible).map((line) => (
          <div key={line.text} className={TONE_CLASS[line.tone]}>
            {line.text}
          </div>
        ))}
      </Terminal>
    </div>
  );
}
```

- [ ] **Step 9: Run GmailSim tests to verify they pass**

Run: `npx vitest run src/demos/GmailSim.test.tsx`
Expected: `2 passed`.

- [ ] **Step 10: Run full suite and commit**

Run: `npm run test`
Expected: all files pass.

```bash
git add src/demos/ public/images/
git commit -m "feat: blog embed with fallback and scripted gmail sim"
```

---

### Task 9: Timeline & Skills sections

**Files:**
- Create: `src/components/sections/Timeline.tsx`, `src/components/sections/Skills.tsx`
- Modify: `src/App.tsx`
- Test: `src/components/sections/Timeline.test.tsx`, `src/components/sections/Skills.test.tsx`

**Interfaces:**
- Consumes: `timeline` (Task 3), `skillGroups` (Task 3), `Reveal`/`SectionHeader` (Tasks 4–5), `TimelineArt`/`StackArt` (Task 6).
- Produces: `<Timeline />` (`id="timeline"`), `<Skills />` (`id="skills"`).

- [ ] **Step 1: Write failing tests** `src/components/sections/Timeline.test.tsx`

```tsx
import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { Timeline } from "./Timeline";

it("renders the three CV entries with periods and orgs", () => {
  render(<Timeline />);
  expect(screen.getByRole("heading", { name: "Timeline" })).toBeInTheDocument();
  expect(screen.getByText("Aug 2025 – Jun 2026")).toBeInTheDocument();
  expect(screen.getByText("Apr 2026 – Aug 2026")).toBeInTheDocument();
  expect(screen.getByText(/International Christian University/)).toBeInTheDocument();
  expect(screen.getByText(/Research Assistant/)).toBeInTheDocument();
});
```

`src/components/sections/Skills.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { Skills } from "./Skills";

it("renders all five groups and a sample item", () => {
  render(<Skills />);
  expect(screen.getByRole("heading", { name: "Skills" })).toBeInTheDocument();
  for (const name of ["Languages", "Frontend", "Backend", "Databases", "Deployment & Testing"]) {
    expect(screen.getByText(name)).toBeInTheDocument();
  }
  expect(screen.getByText("FastAPI")).toBeInTheDocument();
});
```

- [ ] **Step 2: Run to verify they fail**

Run: `npx vitest run src/components/sections/Timeline.test.tsx src/components/sections/Skills.test.tsx`
Expected: FAIL — cannot resolve the modules.

- [ ] **Step 3: Implement** `src/components/sections/Timeline.tsx`

```tsx
import { timeline } from "../../content/education";
import { TimelineArt } from "../art/TimelineArt";
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";

export function Timeline() {
  return (
    <section id="timeline" className="scroll-mt-24">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <SectionHeader index="03" title="Timeline" />
        <Reveal>
          <TimelineArt className="mb-10 w-full max-w-md" />
        </Reveal>
        <ol className="relative border-l border-border pl-8">
          {timeline.map((entry, i) => (
            <li key={entry.period + entry.title} className="relative pb-10 last:pb-0">
              <span
                className={`absolute -left-[37px] top-2 h-3 w-3 rounded-full border-2 ${
                  entry.kind === "experience" ? "border-accent" : "border-border"
                } bg-bg`}
              />
              <Reveal delayMs={i * 100}>
                <p className="text-[15px] text-muted">{entry.period} · {entry.place}</p>
                <h3 className="mt-1 text-xl">{entry.title}</h3>
                <p className="mt-1 text-muted">{entry.org}</p>
                {entry.detail && <p className="mt-2 max-w-2xl">{entry.detail}</p>}
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Implement** `src/components/sections/Skills.tsx`

```tsx
import { skillGroups } from "../../content/skills";
import { StackArt } from "../art/StackArt";
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <SectionHeader index="05" title="Skills" />
        <Reveal>
          <StackArt className="mb-10 w-40" />
        </Reveal>
        <div className="grid gap-8 md:grid-cols-2">
          {skillGroups.map((group, i) => (
            <Reveal key={group.name} delayMs={(i % 2) * 100}>
              <div className="rounded-lg border border-border bg-surface p-5">
                <h3 className="text-[15px] text-accent">{group.name}</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="rounded-md bg-surface-deep px-2.5 py-1 text-[15px]">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Wire into App** — `src/App.tsx`:

```tsx
import { About } from "./components/sections/About";
import { Hero } from "./components/sections/Hero";
import { Skills } from "./components/sections/Skills";
import { Timeline } from "./components/sections/Timeline";
import { Nav } from "./components/ui/Nav";

export default function App() {
  return (
    <>
      <Nav />
      <main className="min-h-screen pt-16">
        <Hero />
        <About />
        <Timeline />
        <Skills />
      </main>
    </>
  );
}
```

- [ ] **Step 6: Run tests and commit**

Run: `npm run test && npx tsc --noEmit`
Expected: all pass, tsc silent.

```bash
git add src/components/sections/ src/App.tsx
git commit -m "feat: timeline and skills sections"
```

---

### Task 10: Projects, FuturePlans & Contact sections — App complete

**Files:**
- Create: `src/components/sections/Projects.tsx`, `src/components/sections/FuturePlans.tsx`, `src/components/sections/Contact.tsx`
- Modify: `src/App.tsx`
- Test: `src/components/sections/Projects.test.tsx`, `src/components/sections/FuturePlans.test.tsx`, `src/components/sections/Contact.test.tsx`

**Interfaces:**
- Consumes: `projects` (Task 3), `plans` (Task 3), `links` (Task 3), `BlogEmbed`/`GmailSim` (Task 8), `Terminal` (Task 5), `EnvelopeArt` (Task 6), `Reveal`/`SectionHeader`.
- Produces: `<Projects />` (`id="projects"`), `<FuturePlans />` (`id="plans"`), `<Contact />` (`id="contact"`); final App with all seven sections + footer.

- [ ] **Step 1: Write failing tests** `src/components/sections/Projects.test.tsx`

```tsx
import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { Projects } from "./Projects";

it("renders both projects with facts and repo links", () => {
  render(<Projects />);
  expect(screen.getByRole("heading", { name: "Projects" })).toBeInTheDocument();
  expect(screen.getAllByText("blog-list").length).toBeGreaterThan(0);
  expect(screen.getByText("gmail-notification")).toBeInTheDocument();
  expect(screen.getByText(/p95 < 300 ms/)).toBeInTheDocument();
  expect(screen.getByText(/~3,000 concurrent users/)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /view repo/i })).toBeInTheDocument();
});
```

`src/components/sections/FuturePlans.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { FuturePlans } from "./FuturePlans";

it("renders todo items marked as samples with the edit hint", () => {
  render(<FuturePlans />);
  expect(screen.getByRole("heading", { name: "Future Plans" })).toBeInTheDocument();
  expect(screen.getAllByText(/sample/).length).toBeGreaterThan(0);
  expect(screen.getByText(/edit src\/content\/plans\.ts/)).toBeInTheDocument();
});
```

`src/components/sections/Contact.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { Contact } from "./Contact";

it("renders all four contact channels", () => {
  render(<Contact />);
  expect(screen.getByRole("heading", { name: "Contact" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /phanthaihoa070707@gmail\.com/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /\+81 90 7780 1063/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /linkedin/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /github/i })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run to verify they fail**

Run: `npx vitest run src/components/sections/Projects.test.tsx src/components/sections/FuturePlans.test.tsx src/components/sections/Contact.test.tsx`
Expected: FAIL — cannot resolve the modules.

- [ ] **Step 3: Implement** `src/components/sections/Projects.tsx`

```tsx
import { gmailSimScript, projects } from "../../content/projects";
import { BlogEmbed } from "../../demos/BlogEmbed";
import { GmailSim } from "../../demos/GmailSim";
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";

function ProjectFacts({ facts }: { facts: readonly string[] }) {
  return (
    <ul className="space-y-2">
      {facts.map((fact) => (
        <li key={fact} className="flex gap-2">
          <span className="text-accent">▸</span>
          <span>{fact}</span>
        </li>
      ))}
    </ul>
  );
}

export function Projects() {
  const [blogList, gmail] = projects;

  return (
    <section id="projects" className="scroll-mt-24">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <SectionHeader index="04" title="Projects" />

        <div className="grid items-center gap-10 md:grid-cols-2">
          <Reveal>
            <h3 className="text-2xl">
              <span className="text-accent">{blogList.name}</span>
            </h3>
            <p className="mt-1 text-muted">{blogList.tagline}</p>
            <div className="mt-5">
              <ProjectFacts facts={blogList.facts} />
            </div>
            <a
              href={blogList.repo}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-block underline decoration-border underline-offset-4 hover:text-accent"
            >
              view repo ↗
            </a>
          </Reveal>
          <Reveal delayMs={150}>
            <BlogEmbed url={blogList.embedUrl} repoUrl={blogList.repo} note={blogList.tagline} />
          </Reveal>
        </div>

        <div className="mt-20 grid items-center gap-10 md:grid-cols-2">
          <Reveal>
            <h3 className="text-2xl">
              <span className="text-accent">{gmail.name}</span>
            </h3>
            <p className="mt-1 text-muted">{gmail.tagline}</p>
            <div className="mt-5">
              <ProjectFacts facts={gmail.facts} />
            </div>
            <a
              href={gmail.repo}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-block underline decoration-border underline-offset-4 hover:text-accent"
            >
              view repo ↗
            </a>
          </Reveal>
          <Reveal delayMs={150}>
            <GmailSim />
          </Reveal>
        </div>

        <p className="mt-16 text-[15px] text-muted">
          # sim script: {gmailSimScript.lines.length} lines — edit in src/content/projects.ts
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Implement** `src/components/sections/FuturePlans.tsx`

```tsx
import { plans } from "../../content/plans";
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";
import { Terminal } from "../ui/Terminal";

export function FuturePlans() {
  return (
    <section id="plans" className="scroll-mt-24">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <SectionHeader index="06" title="Future Plans" />
        <div className="max-w-2xl">
          <Reveal>
            <Terminal title="todo.md">
              {plans.map((plan) => (
                <div key={plan.text}>
                  <span className="text-comment">- [ ]</span> {plan.text}{" "}
                  {plan.sample && <span className="text-muted">(sample)</span>}
                </div>
              ))}
              <div className="mt-2 text-muted">
                <span className="text-comment">#</span> edit src/content/plans.ts
              </div>
            </Terminal>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Implement** `src/components/sections/Contact.tsx`

```tsx
import { links } from "../../content/links";
import { EnvelopeArt } from "../art/EnvelopeArt";
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";
import { Terminal } from "../ui/Terminal";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <SectionHeader index="07" title="Contact" />
        <div className="grid items-center gap-10 md:grid-cols-2">
          <Reveal>
            <Terminal title="say-hello.sh">
              <div>
                <span className="text-comment">$</span> mail -s "hello" {links.email}
              </div>
              <div className="pl-4 text-muted"># thank you for watching — I read everything</div>
            </Terminal>
            <ul className="mt-6 space-y-2">
              <li>
                <a href={`mailto:${links.email}`} className="underline decoration-border underline-offset-4 hover:text-accent">
                  {links.email}
                </a>
              </li>
              <li>
                <a href={`tel:${links.phone.replace(/\s/g, "")}`} className="underline decoration-border underline-offset-4 hover:text-accent">
                  {links.phone}
                </a>
              </li>
              <li>
                <a href={links.linkedin} target="_blank" rel="noreferrer" className="underline decoration-border underline-offset-4 hover:text-accent">
                  linkedin ↗
                </a>
              </li>
              <li>
                <a href={links.github} target="_blank" rel="noreferrer" className="underline decoration-border underline-offset-4 hover:text-accent">
                  github ↗
                </a>
              </li>
            </ul>
          </Reveal>
          <Reveal delayMs={150}>
            <EnvelopeArt className="mx-auto w-full max-w-sm" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Complete App** — `src/App.tsx`:

```tsx
import { About } from "./components/sections/About";
import { Contact } from "./components/sections/Contact";
import { FuturePlans } from "./components/sections/FuturePlans";
import { Hero } from "./components/sections/Hero";
import { Projects } from "./components/sections/Projects";
import { Skills } from "./components/sections/Skills";
import { Timeline } from "./components/sections/Timeline";
import { Nav } from "./components/ui/Nav";

export default function App() {
  return (
    <>
      <Nav />
      <main className="min-h-screen pt-16">
        <Hero />
        <About />
        <Timeline />
        <Projects />
        <Skills />
        <FuturePlans />
        <Contact />
      </main>
      <footer className="border-t border-border">
        <p className="mx-auto max-w-5xl px-6 py-6 text-[15px] text-muted">
          © 2026 Phan Thai Hoa — built with Vite + React
        </p>
      </footer>
    </>
  );
}
```

- [ ] **Step 7: Run tests and commit**

Run: `npm run test && npm run build`
Expected: all tests pass; build succeeds.

```bash
git add src/components/sections/ src/App.tsx
git commit -m "feat: projects, future plans and contact sections — site complete"
```

---

### Task 11: Verification pass & project docs

**Files:**
- Modify: `CLAUDE.md`

**Interfaces:**
- Consumes: the complete site from Tasks 1–10.
- Produces: verified site + updated CLAUDE.md (commands + architecture for future sessions).

- [ ] **Step 1: Full automated verification**

Run: `npm run test`
Expected: all test files pass (should be 13 files: App, useTheme, ThemeToggle, content, useInView, usePrefersReducedMotion, useTypewriter, SectionHeader, Terminal, Nav, art, BlogEmbed, GmailSim, plus 7 section tests — the count is whatever Task 10 left green; zero failures is the requirement).

Run: `npm run build`
Expected: typecheck silent, `dist/` produced.

- [ ] **Step 2: Manual browser verification**

Run: `npm run preview` and open the printed URL. Work through this checklist:

1. Load page — dark theme by default, no white flash, hero reveals.
2. Toggle theme — light "warm paper" mode; reload — choice persists.
3. Scroll — each section reveals as entered; nav underline tracks the active section.
4. Projects — blog-list shows the fallback card (URL unset); gmail sim types then sequences lines.
5. Narrow the window below 640px — nav collapses to ≡ menu; layout single-column.
6. DevTools → Rendering → "Emulate CSS prefers-reduced-motion: reduce", reload — content fully visible, no reveals, sim shows final frame.
7. Click every external link (github, linkedin, mailto) — correct targets.

Fix anything broken (this is the polish pass); re-run `npm run test && npm run build` after any fix.

- [ ] **Step 3: Update CLAUDE.md** — replace the "Project Purpose" paragraph's scaffolding caveat with real commands and architecture. Replace the paragraph starting "The repository currently contains only design/reference assets…" with:

```markdown
## Commands

- `npm run dev` — dev server
- `npm run build` — typecheck + production build (`dist/`)
- `npm run preview` — serve the built site
- `npm run test` — all tests (Vitest + React Testing Library, jsdom)
- `npx vitest run src/demos/GmailSim.test.tsx` — run one test file
- `npx vitest run -t "defaults to dark"` — run tests matching a name

## Architecture

Static React SPA (Vite + TypeScript + Tailwind v4), deployed to Cloudflare Pages.

- All site copy lives in typed files in `src/content/` — edit copy there, never in components. `projects.ts` holds the blog-list `embedUrl` (empty string = fallback card) and the GmailSim script lines.
- Theming: CSS custom properties (`--bg --surface --surface-deep --border --text --muted --accent --comment`) flipped by `data-theme` on `<html>`; inline pre-paint script in `index.html`; default dark; choice persisted in `localStorage`.
- Motion is limited to scroll reveals (`Reveal` + `useInView`) and the GmailSim scripted terminal; both honor `prefers-reduced-motion`.
- Zero runtime dependencies beyond react/react-dom. Fonts self-hosted via `@fontsource-variable/jetbrains-mono`.
```

Keep the rest of CLAUDE.md (Source Assets, Design Direction, Content Map sections) unchanged.

- [ ] **Step 4: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: project commands and architecture in CLAUDE.md"
```

---

## Self-Review (completed during planning)

- **Spec coverage:** palette/theming §3.1–3.2 → Tasks 1–2; typography §3.3 → Tasks 1, 5 (SectionHeader/Terminal sizes); illustration mapping §3.4 → Tasks 6–10; information architecture §4 → Tasks 5, 7, 9, 10; motion §5 → Tasks 4, 8; demos §6 → Task 8 (+ fallback image), §6.3 → Task 10 FuturePlans; architecture §7 → all file tasks; edge cases §8 → Task 8 (BlogEmbed) + Task 1 CSS (reduced-motion, no-flash); testing §9 → per-task tests + Task 11; delivery §10 → build output (Cloudflare Pages setup itself is post-plan, needs the user's account).
- **Placeholders:** none — every step carries complete code or exact commands.
- **Type consistency:** `useTypewriter` signature identical in Task 4 and Task 8; `gmailSimScript` shape identical in Task 3 and Task 8; `SECTIONS` ids match section `id` attributes in Tasks 7/9/10; `BlogEmbed` props identical in Tasks 8 and 10.

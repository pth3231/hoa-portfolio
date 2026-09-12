# Portfolio Design Spec — Phan Thai Hoa

Date: 2026-09-12
Status: Approved through collaborative brainstorming

## 1. Overview

A single-page, minimalistic personal portfolio for Phan Thai Hoa (full-stack developer, Tokyo) that keeps the "code-editor soul" of the reference mockup (`layout of portfolio.png`) — monospace type, navy/coral palette, `</>` motifs, `/01`-style section numbering — stripped down to a calm, elegant layout with generous whitespace. All content comes from `CV - PHAN THAI HOA.pdf`; placeholder content from the mockup is never shipped.

**Goals**

- Simple, minimal, elegant; dark by default with a light "warm paper" mode
- Motion in exactly two forms: scroll reveals and one scripted project demo
- Illustrations derived from CV content (hybrid: technical line-art + terminal vignettes)
- A future-plans section shipped as structure with clearly-marked sample items
- Zero runtime dependencies beyond React

**Non-goals (YAGNI)**

- No multi-language (English only), no Framer Motion/GSAP, no multi-page routing
- No fabricated statistics (mockup's "150+ clients" etc. die here)
- No CMS — content is typed files in `src/content/`
- No analytics, comments, or contact-form backend (contact = mailto + links)

## 2. Decisions Log

| Decision | Choice |
|---|---|
| Design direction | Keep code-editor soul, stripped down |
| Project demos | Real iframe embed (blog-list) + scripted simulation (gmail-notification) |
| Stack | Vite + React + TypeScript + Tailwind, zero other runtime deps |
| Deployment | Cloudflare Pages, git-connected (push to main = deploy) |
| Illustration style | Hybrid: line-art for section decoration; terminal vignettes where content is code |
| Language | English only |
| Future plans | Structure only; user fills `plans.ts` after launch |
| Motion | Scroll reveal + GmailSim only (draw-in dropped per user feedback) |

## 3. Design Language

### 3.1 Palette (CSS custom properties, one set per mode)

| Token | Dark (default) | Light |
|---|---|---|
| `--bg` | `#0D1B2A` | `#F7F6F2` |
| `--bg-light` (gradient start) | `#1E3450` | `#FBFAF6` |
| `--bg-deep` (gradient end) | `#0A1520` | `#EDEAE1` |
| `--surface` | `#13273B` | `#FFFFFF` |
| `--surface-deep` (terminal interiors) | `#0A1622` | `#FBFAF7` |
| `--border` | `#2A4058` | `#D8DEE6` |
| `--text` | `#E8EDF4` | `#16283C` |
| `--muted` | `#8A97A8` | `#5C6B7E` |
| `--accent` (coral) | `#FF6B57` | `#C8402E` |
| `--comment` (teal, prompts/comments) | `#5EB1A0` | `#3A7D6C` |

The page background is a subtle diagonal sheen (from the mockup): `linear-gradient(115deg, var(--bg-light) 0%, var(--bg) 55%, var(--bg-deep) 100%)` fixed to the viewport — lighter top-left, near-black bottom-right in dark mode; a faint warm-paper sheen in light mode. Coral is the identity anchor; light mode deepens accent/comment for ≥ 4.5:1 text contrast. Components reference tokens only (via Tailwind utilities mapped to the variables) — they never know which mode is active.

### 3.2 Theming mechanics

- `data-theme="dark" | "light"` attribute on `<html>` flips all tokens
- Inline script in `index.html` applies stored choice before first paint (no flash)
- Default is **always dark**; the user's explicit toggle (`localStorage`) is the only override
- Toggle control in the fixed nav, sun/moon glyph

### 3.3 Typography

- **Everything is JetBrains Mono** — self-hosted variable woff2, latin subset, preloaded; fallback stack `ui-monospace, Menlo, monospace`
- Type scale runs 1–2 steps above conventional defaults (user request):
  - Body: 18px / 1.7
  - Terminal text: 16px minimum
  - Captions/muted: 15px
  - Section headers: ~32px
  - Hero name: `clamp(48px, 8vw, 88px)`

### 3.4 Illustration mapping (hybrid style)

Line-art: thin 1.5–2px strokes in `--border` tone, exactly one coral accent element per drawing, static (no draw-in animation). Terminal vignettes: reusable `Terminal` chrome (`--surface-deep`, traffic dots, filename tab) containing real CV content.

| Section | Illustration |
|---|---|
| Hero | Line-art terminal/caret composition (static, revealed by scroll) |
| About | Terminal vignette: `$ whoami`, `$ cat about.md` |
| Timeline | Line-art: connected nodes; one path travels Hanoi → Tokyo |
| Projects | Terminal vignettes — the demos themselves |
| Skills | Small line-art stack diagram accent |
| Future Plans | Terminal vignette: `todo.md` with checkboxes |
| Contact | Simplified line-art envelope: rectangle + single V fold + coral seal |

## 4. Information Architecture

Single-page scroll. Fixed slim nav: `</>` mark, section links (short labels), theme toggle; collapses on mobile to mark + toggle + compact menu. Sections numbered `/01`–`/07` in headers and nav.

| # | Section | Content (source: CV) |
|---|---|---|
| /01 | Hero | Name; "Full-stack developer"; "Based in Tokyo, Japan" badge; one-line intro; GitHub + LinkedIn links |
| /02 | About | `whoami` narrative: HUST→ICU path, what I build; qualifications strip: IELTS 8.0 · SAT 1470 · Fast Retailing Foundation scholarship |
| /03 | Timeline | Education: B.S. IT, Hanoi University of Science and Technology (Aug 2025–Jun 2026); B.A. Information Sciences, International Christian University, Tokyo (Sep 2026–present). Experience: Research Assistant — CBMC enhancement for ISR verification, HUST (Apr 2026–Aug 2026), benchmark kit for open-source automotive projects |
| /04 | Projects | **blog-list**: full-stack blog; GitHub Actions CI/CD to bare metal; k6/vitest/supertest ~3000 concurrent, p95 < 300ms; Cloudflare Tunnel; Prometheus + Grafana. Live iframe demo. **gmail-notification**: Ollama LLM + Gmail API summarizer; GCP VM; cron every 3h. Scripted sim demo. Both link to github.com/pth3231/* |
| /05 | Skills | CV groupings verbatim: Languages (C/C++, Python, TS/JS, Go) · Frontend (HTML/CSS/JS, Tailwind, React, Zustand, React Router) · Backend (Node/Express, Morgan, FastAPI) · Databases (Redis, MongoDB, Postgres) · DevOps/Testing (Docker, Grafana, Prometheus, k6, Cloudflare, AWS, GCP) |
| /06 | Future Plans | `todo.md` structure with sample items (see §6.3); user replaces content post-launch |
| /07 | Contact | Email phanthaihoa070707@gmail.com · LinkedIn linkedin.com/in/hganyu · GitHub github.com/pth3231; `$ mail` prompt vignette. (Phone omitted by request.) |

**Honesty rule:** only real numbers from the CV appear, presented as project facts (p95 < 300ms, ~3000 concurrent, IELTS 8.0), never as vanity counters.

## 5. Motion

Exactly two motion systems (user-trimmed from three):

1. **Scroll reveal** — `useInView` hook (IntersectionObserver, fires once) toggles a class; CSS transitions rise + fade elements; children stagger via `transition-delay`. Applies to all sections.
2. **GmailSim** — scripted terminal: types `cron run gmail-summarize`, then sequenced lines (fetch → emails → ollama summary → push sent). Triggered on first in-view, plays once.

Nav underline tracks the active section (subtle micro-motion, part of nav behavior). All other art is static.

**Reduced motion:** `usePrefersReducedMotion` — reveals render instantly in final state; GmailSim shows its final frame without typing.

## 6. The Two Demos

### 6.1 `<BlogEmbed>` — real embed + fallback

- Lazy-loaded iframe of the deployed blog-list, styled as a browser window (`--surface` chrome, URL bar), aspect ~16:10
- **Fallback replaces the iframe when:** load not confirmed within 4s, viewport < 640px, or embed URL unset. Fallback = styled screenshot + "open live ↗" link (repo link until URL configured)
- Embed URL lives in `content/projects.ts`; until the user sets it at deploy time, the component renders the fallback panel — never a blank box
- **User prereq:** blog-list must send `Content-Security-Policy: frame-ancestors` allowing the portfolio's Cloudflare Pages domain (one config line on their server)

### 6.2 `<GmailSim>` — scripted simulation

- Scripted line sequence: `cron run gmail-summarize` → `▸ gmail api: 3 unread` → 3 email lines (recruiter / GitHub / university) → `▸ ollama: summarizing…` → one summary line → `✓ push notification sent`; the sequence lives as a typed array in `content/projects.ts` so wording is editable without touching the component
- Types the command via `useTypewriter`; output lines fade in sequence; plays once on first in-view
- Example email addresses are illustrative (fake), clearly generic — no real data

### 6.3 Future Plans structure

`todo.md`-styled list inside a Terminal vignette. Items live in `content/plans.ts` as real roadmap content. Each item carries a `done: boolean` field — `done: true` renders a `- [x]` marker with a muted strikethrough on the line; `done: false` renders `- [ ]`. A `sample: true` flag (kept for future placeholder items) renders a muted "(sample)" tag. Current items:

- [x] Finish B.A. in Information Sciences at ICU
- [x] Software engineering internship in Japan
- [ ] Ship portfolio v2 with project case studies

The user edits `plans.ts` freely; markup never changes.

## 7. Architecture

```
src/
  content/      ← ALL copy & config: profile.ts, projects.ts, plans.ts, links.ts (typed)
  components/
    sections/   ← Hero, About, Timeline, Projects, Skills, FuturePlans, Contact
    ui/         ← Terminal, SectionHeader, ThemeToggle, Nav
  demos/        ← BlogEmbed.tsx, GmailSim.tsx
  hooks/        ← useInView, useTheme, useTypewriter, usePrefersReducedMotion
  assets/       ← line-art SVGs as React components
```

- **Content-as-data:** every word on the site lives in `src/content/`; TypeScript types enforce required fields, so a missing field is a build error
- **Each section is isolated:** takes typed content props, owns its layout and reveal; renderable and testable alone
- **Static output only:** `vite build` → `dist/` → Cloudflare Pages. No server, no API
- SPA renders body via JS; accepted limitation: without JS the page shows meta tags only. Meta description, Open Graph tags, and a coral `</>` favicon are in `index.html`

## 8. Edge Cases

| Case | Behavior |
|---|---|
| iframe slow/down/blocked/mobile/unset | Fallback panel (screenshot + link) after 4s timeout or immediately on < 640px |
| Theme flash on load | Pre-paint inline script applies stored theme |
| User prefers reduced motion | Instant reveals; sim shows final frame |
| Plans content not yet filled | Sample items visible, tagged "sample" |
| Narrow viewports | Nav collapses; single-column sections; embed → fallback |

## 9. Testing & Verification

**Vitest + React Testing Library**, behavior only:

- `useTheme`: defaults dark; persists toggle across reload
- `useTypewriter`: types in order, respects reduced motion (returns full text)
- `BlogEmbed`: falls back on timeout; renders fallback when URL unset; iframe when URL set and loaded
- One render smoke test per section (renders with sample content, no throw)

**Manual verification before launch:** both themes side by side; mobile viewport; reduced-motion emulation; fallback path exercised (block iframe); Lighthouse pass ≥ 95 on all four categories for the static page.

## 10. Delivery

- Cloudflare Pages, git-connected: push to `main` deploys
- Custom domain optional (user decides at deploy); CSP `frame-ancestors` allowance added to blog-list when domain is known
- The two source assets (`CV` pdf, `layout` png) and `CLAUDE.md` stay in the repo root, untouched

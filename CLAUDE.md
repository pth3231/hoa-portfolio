# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Purpose

Personal portfolio website for **Phan Thai Hoa** — a full-stack developer currently based in Tokyo, Japan. The repository currently contains only design/reference assets; no framework, build tooling, or source code has been chosen yet. Once scaffolding exists, update this file with build/lint/test commands and architecture notes.

This is not a git repository.

## Source Assets (do not modify or delete)

- `layout of portfolio.png` — design reference. A template mockup for a dark, code-editor/terminal-inspired portfolio site.
- `CV - PHAN THAI HOA.pdf` — content source of truth. All real text for the site comes from here.

The mockup contains **placeholder content** ("Matthew Dodger", "Based in Name town", "Web Developer", "2029", invented stats like "150+ Happy Clients"). Always substitute real data from the CV — never ship the placeholder names, stats, or years. "Web Developer" is accurate as a title; Hoa's stack is full-stack (React/Node/Python/Go).

## Design Direction (from the mockup)

- **Aesthetic:** code-editor / terminal identity — monospace typography everywhere, comment-style markers (`//`, `>`, `</>`) as decorative elements
- **Colors:** deep dark navy background (`#0D1B2A`–`#10263F` range), bright coral/red-orange accent for highlights/tags/links, white and soft-gray text, muted teal for comment-style secondary text, flat surfaces with subtle borders (no heavy gradients)
- **Page sections:** hero (large "Portfolio" title + name + location badge + "Read More"), table of contents (`/01`-style numbering), About Me (photo + bio + highlights + languages/databases cards), Technical Skills with stat counters, timeline/education, project showcases (gallery cards with metadata), and contact ("Say Hello")

## Content Map (extracted from the CV)

- **Contact:** phanthaihoa070707@gmail.com · +81 90 7780 1063 · linkedin.com/in/hganyu · GitHub: github.com/pth3231
- **Education:** B.S. Information Technology, Hanoi University of Science and Technology (Aug 2025 – Jun 2026) → B.A. Information Sciences, International Christian University, Tokyo (Sep 2026 – present)
- **Projects:**
  - `blog-list` (github.com/pth3231/blog_list) — full-stack blog app; CI/CD via GitHub Actions deploying to bare metal, stress-tested with k6/vitest/supertest (~3000 concurrent requests, p95 < 300ms), Cloudflare Tunnel, Prometheus + Grafana monitoring
  - `gmail-notification` (github.com/pth3231/gmail-notification) — Ollama LLM + Gmail API inbox summarizer, GCP VM, cronjob every 3 hours
- **Experience:** Research Assistant — CBMC enhancement for ISR verification, HUST (Apr 2026 – Aug 2026); built a benchmark kit combining open-source automotive projects with Python scripts
- **Qualifications:** SAT 1470 · IELTS 8.0 · Fast Retailing Foundation full-funded scholarship
- **Skills:** C/C++, Python, TypeScript/JavaScript, Go · React, Tailwind, Zustand, React Router · Node/Express, FastAPI · Redis, MongoDB, Postgres · Docker, AWS, GCP, Cloudflare, Prometheus, Grafana, k6

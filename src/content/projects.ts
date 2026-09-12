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
    // No live embed — this project renders the scripted sim instead.
    embedUrl: "",
    facts: [
      "Ollama LLM + Gmail API",
      "GCP VM, cron every 3 hours",
      "Fetch → summarize → push, unattended",
    ],
  },
];

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
    tagline: "A full-stack blog platform, deployed on a bare-metal machine",
    repo: "https://github.com/pth3231/blog_list",
    // Set at deploy time (see spec §6.1). Empty string → BlogEmbed renders its fallback panel.
    embedUrl: "",
    facts: [
      "Simple CI/CD pipeline with GitHub Actions — automatic testing, then deploy to bare metal",
      "Stress-tested with k6, vitest, supertest: ~3,000 simultaneous requests, p95 under 300 ms",
      "Deployable with a registered domain through Cloudflare Tunnel",
      "Learning monitoring systems with Prometheus and Grafana",
    ],
  },
  {
    id: "gmail-notification",
    name: "gmail-notification",
    tagline: "Summarizing my inbox with a local LLM, every 3 hours",
    repo: "https://github.com/pth3231/gmail-notification",
    // No live embed — this project renders the scripted sim instead.
    embedUrl: "",
    facts: [
      "Uses Ollama LLM and the Gmail API to process and summarize my inbox",
      "Hosted on a small Google Cloud Platform VM",
      "Cronjob every 3 hours: fetch → summarize → push notification",
    ],
  },
];

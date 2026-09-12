export type Plan = { text: string; sample: boolean; done: boolean };

// Real roadmap items — edit freely. `done: true` renders `[x]` with muted strikethrough;
// `sample: true` would render a muted "(sample)" tag (kept for future placeholder items).
export const plans: Plan[] = [
  { text: "Finish B.A. in Information Sciences at ICU", sample: false, done: true },
  { text: "Software engineering internship in Japan", sample: false, done: true },
  { text: "Ship portfolio v2 with project case studies", sample: false, done: false },
];

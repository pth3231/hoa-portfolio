export type Plan = { text: string; sample: boolean };

// Sample items — replace after launch (spec §6.3). `sample: true` renders a muted "(sample)" tag.
export const plans: Plan[] = [
  { text: "Finish B.A. in Information Sciences at ICU", sample: true },
  { text: "Software engineering internship in Japan", sample: true },
  { text: "Ship portfolio v2 with project case studies", sample: true },
];

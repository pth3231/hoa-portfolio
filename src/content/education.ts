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

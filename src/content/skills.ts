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

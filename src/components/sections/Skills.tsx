import type { ReactElement } from "react";
import { skillGroups } from "../../content/skills";
import { StackArt } from "../art/StackArt";
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";

const ICON_STROKE = {
  fill: "none",
  stroke: "var(--comment)",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function SkillIcon({ name }: { name: string }): ReactElement {
  switch (name) {
    case "Languages":
      return (
        <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0" aria-hidden="true" {...ICON_STROKE}>
          <path d="M5.5 4 2.5 8l3 4" />
          <path d="M10.5 4l3 4-3 4" />
        </svg>
      );
    case "Frontend":
      return (
        <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0" aria-hidden="true" {...ICON_STROKE}>
          <rect x="2" y="3" width="12" height="8.5" rx="1" />
          <path d="M6 14h4M8 11.5V14" />
        </svg>
      );
    case "Backend":
      return (
        <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0" aria-hidden="true" {...ICON_STROKE}>
          <rect x="2.5" y="2.5" width="11" height="4.5" rx="1" />
          <rect x="2.5" y="9" width="11" height="4.5" rx="1" />
          <path d="M5 4.75h.01M5 11.25h.01" strokeWidth={2.4} />
        </svg>
      );
    case "Databases":
      return (
        <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0" aria-hidden="true" {...ICON_STROKE}>
          <ellipse cx="8" cy="4" rx="5.5" ry="2" />
          <path d="M2.5 4v8c0 1.1 2.46 2 5.5 2s5.5-.9 5.5-2V4" />
          <path d="M2.5 8c0 1.1 2.46 2 5.5 2s5.5-.9 5.5-2" />
        </svg>
      );
    default:
      // Deployment & Testing — a gear
      return (
        <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0" aria-hidden="true" {...ICON_STROKE}>
          <circle cx="8" cy="8" r="2.5" />
          <path d="M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3.4 3.4l1.4 1.4M11.2 11.2l1.4 1.4M12.6 3.4l-1.4 1.4M4.8 11.2l-1.4 1.4" />
        </svg>
      );
  }
}

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
                <h3 className="flex items-center gap-2 text-[15px] text-accent">
                  <SkillIcon name={group.name} />
                  {group.name}
                </h3>
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

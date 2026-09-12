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

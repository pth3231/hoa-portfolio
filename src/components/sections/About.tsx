import { profile } from "../../content/profile";
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";
import { Terminal } from "../ui/Terminal";

export function About() {
  return (
    <section id="about" className="scroll-mt-24">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <SectionHeader index="02" title="About" />
        <div className="grid gap-10 md:grid-cols-2">
          <Reveal>
            <Terminal title="whoami.sh">
              <div>
                <span className="text-comment">$</span> <span>whoami</span>
              </div>
              <div className="pl-4 text-accent">{profile.name}</div>
              <div>
                <span className="text-comment">$</span> <span>cat about.md</span>
              </div>
              {profile.aboutLines.map((line) => (
                <div key={line} className="pl-4 text-muted">
                  {line}
                </div>
              ))}
            </Terminal>
          </Reveal>
          <div>
            {profile.aboutParagraphs.map((p, i) => (
              <Reveal key={p.slice(0, 24)} delayMs={i * 100}>
                <p className={i > 0 ? "mt-4" : ""}>{p}</p>
              </Reveal>
            ))}
            <Reveal delayMs={200}>
              <div className="mt-8 flex flex-wrap gap-3">
                {profile.qualifications.map((q) => (
                  <span key={q.label} className="rounded-md border border-border bg-surface px-3 py-1.5 text-[15px]">
                    <span className="text-muted">{q.label}</span>{" "}
                    <span className="text-accent">{q.value}</span>
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

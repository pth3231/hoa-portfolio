import { skillGroups } from "../../content/skills";
import { StackArt } from "../art/StackArt";
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";

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
                <h3 className="text-[15px] text-accent">{group.name}</h3>
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

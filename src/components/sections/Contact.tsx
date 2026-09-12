import { links } from "../../content/links";
import { EnvelopeArt } from "../art/EnvelopeArt";
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";
import { Terminal } from "../ui/Terminal";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <SectionHeader index="07" title="Contact" />
        <div className="grid items-center gap-10 md:grid-cols-2">
          <Reveal>
            <Terminal title="say-hello.sh">
              <div>
                <span className="text-comment">$</span> mail -s "hello" {links.email}
              </div>
              <div className="pl-4 text-muted"># thank you for watching — I read everything</div>
            </Terminal>
            <ul className="mt-6 space-y-2">
              <li>
                <a href={`mailto:${links.email}`} className="underline decoration-border underline-offset-4 hover:text-accent">
                  {links.email}
                </a>
              </li>
              <li>
                <a href={`tel:${links.phone.replace(/\s/g, "")}`} className="underline decoration-border underline-offset-4 hover:text-accent">
                  {links.phone}
                </a>
              </li>
              <li>
                <a href={links.linkedin} target="_blank" rel="noreferrer" className="underline decoration-border underline-offset-4 hover:text-accent">
                  linkedin ↗
                </a>
              </li>
              <li>
                <a href={links.github} target="_blank" rel="noreferrer" className="underline decoration-border underline-offset-4 hover:text-accent">
                  github ↗
                </a>
              </li>
            </ul>
          </Reveal>
          <Reveal delayMs={150}>
            <EnvelopeArt className="mx-auto w-full max-w-sm" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

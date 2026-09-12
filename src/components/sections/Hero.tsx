import { links } from "../../content/links";
import { profile as me } from "../../content/profile";
import { Reveal } from "../ui/Reveal";

export function Hero() {
  return (
    <section id="hero" className="scroll-mt-24">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 pb-24 pt-20 md:flex-row md:items-center">
        <div className="flex-1">
          <Reveal>
            <span className="inline-block rounded-full border border-border px-3 py-1 text-[15px] text-muted">
              ▸ Based in {me.location}
            </span>
          </Reveal>
          <Reveal delayMs={100}>
            <h1
              className="mt-6 font-bold leading-none tracking-tight"
              style={{ fontSize: "clamp(48px, 8vw, 88px)" }}
            >
              {me.name}
            </h1>
          </Reveal>
          <Reveal delayMs={200}>
            <p className="mt-4 text-xl text-accent">{"> " + me.role}</p>
          </Reveal>
          <Reveal delayMs={300}>
            <p className="mt-4 max-w-xl text-muted">{me.intro}</p>
          </Reveal>
          <Reveal delayMs={400}>
            <div className="mt-8 flex gap-6">
              <a href={links.github} target="_blank" rel="noreferrer" className="underline decoration-border underline-offset-4 hover:text-accent">
                github ↗
              </a>
              <a href={links.linkedin} target="_blank" rel="noreferrer" className="underline decoration-border underline-offset-4 hover:text-accent">
                linkedin ↗
              </a>
            </div>
          </Reveal>
        </div>
        <Reveal delayMs={300} className="hidden flex-1 md:block">
          <img
            src="/images/hero-portrait.jpg"
            alt={`Portrait of ${me.name}`}
            width={800}
            height={1000}
            className="mx-auto aspect-[4/5] w-full max-w-sm rounded-xl border border-border object-cover"
          />
        </Reveal>
      </div>
    </section>
  );
}

import { projects } from "../../content/projects";
import { BlogEmbed } from "../../demos/BlogEmbed";
import { GmailSim } from "../../demos/GmailSim";
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";

function ProjectFacts({ facts }: { facts: readonly string[] }) {
  return (
    <ul className="space-y-2">
      {facts.map((fact) => (
        <li key={fact} className="flex gap-2">
          <span className="text-accent">▸</span>
          <span>{fact}</span>
        </li>
      ))}
    </ul>
  );
}

export function Projects() {
  const [blogList, gmail] = projects;

  return (
    <section id="projects" className="scroll-mt-24">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <SectionHeader index="04" title="Projects" />

        <div className="grid items-center gap-10 md:grid-cols-2">
          <Reveal>
            <h3 className="text-2xl">
              <span className="text-accent">{blogList.name}</span>
            </h3>
            <p className="mt-1 text-muted">{blogList.tagline}</p>
            <div className="mt-5">
              <ProjectFacts facts={blogList.facts} />
            </div>
            <a
              href={blogList.repo}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-block underline decoration-border underline-offset-4 hover:text-accent"
            >
              view repo ↗
            </a>
          </Reveal>
          <Reveal delayMs={150}>
            <BlogEmbed url={blogList.embedUrl} repoUrl={blogList.repo} note={blogList.tagline} />
          </Reveal>
        </div>

        <div className="mt-20 grid items-center gap-10 md:grid-cols-2">
          <Reveal>
            <h3 className="text-2xl">
              <span className="text-accent">{gmail.name}</span>
            </h3>
            <p className="mt-1 text-muted">{gmail.tagline}</p>
            <div className="mt-5">
              <ProjectFacts facts={gmail.facts} />
            </div>
            <a
              href={gmail.repo}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-block underline decoration-border underline-offset-4 hover:text-accent"
            >
              view repo ↗
            </a>
          </Reveal>
          <Reveal delayMs={150}>
            <GmailSim />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

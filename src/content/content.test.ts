import { expect, it } from "vitest";
import { profile } from "./profile";
import { timeline } from "./education";
import { skillGroups } from "./skills";
import { gmailSimScript, projects } from "./projects";
import { plans } from "./plans";
import { links } from "./links";

it("profile has the identity fields", () => {
  expect(profile.name).toBe("Phan Thai Hoa");
  expect(profile.role).toBe("Full-stack developer");
  expect(profile.location).toBe("Tokyo, Japan");
  expect(profile.intro.length).toBeGreaterThan(0);
  expect(profile.aboutParagraphs.length).toBeGreaterThanOrEqual(2);
  expect(profile.qualifications.length).toBe(3);
});

it("timeline has the three CV entries in order", () => {
  expect(timeline.map((e) => e.kind)).toEqual(["education", "experience", "education"]);
  expect(timeline[2].org).toBe("International Christian University");
});

it("skills keeps the five CV groups", () => {
  expect(skillGroups.map((g) => g.name)).toEqual([
    "Languages",
    "Frontend",
    "Backend",
    "Databases",
    "Deployment & Testing",
  ]);
});

it("projects has both repos; blog-list embed URL starts empty (fallback mode)", () => {
  expect(projects.map((p) => p.id)).toEqual(["blog-list", "gmail-notification"]);
  expect(projects[0].embedUrl).toBe("");
  expect(projects.every((p) => p.repo.startsWith("https://github.com/pth3231/"))).toBe(true);
});

it("gmail sim script is a non-empty typed sequence", () => {
  expect(gmailSimScript.command).toBe("cron run gmail-summarize");
  expect(gmailSimScript.lines.length).toBe(7);
  expect(gmailSimScript.lines.at(-1)?.tone).toBe("accent");
});

it("plans ship as marked samples", () => {
  expect(plans.length).toBeGreaterThan(0);
  expect(plans.every((p) => p.sample)).toBe(true);
});

it("links carry the real contact targets", () => {
  expect(links.email).toBe("phanthaihoa070707@gmail.com");
  expect(links.github).toBe("https://github.com/pth3231");
});

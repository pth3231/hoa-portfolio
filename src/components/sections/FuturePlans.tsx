import { plans } from "../../content/plans";
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";
import { Terminal } from "../ui/Terminal";

export function FuturePlans() {
  return (
    <section id="plans" className="scroll-mt-24">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <SectionHeader index="06" title="Future Plans" />
        <div className="max-w-2xl">
          <Reveal>
            <Terminal title="todo.md">
              {plans.map((plan) => (
                <div key={plan.text} className={plan.done ? "text-muted line-through" : ""}>
                  <span className="text-comment">{plan.done ? "- [x]" : "- [ ]"}</span> {plan.text}{" "}
                  {plan.sample && <span className="text-muted">(sample)</span>}
                </div>
              ))}
              <div className="mt-2 text-muted">
                <span className="text-comment">#</span> src/content/plans.ts
              </div>
            </Terminal>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

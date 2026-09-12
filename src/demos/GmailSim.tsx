import { useEffect, useState } from "react";
import { gmailSimScript } from "../content/projects";
import { Terminal } from "../components/ui/Terminal";
import { useInView } from "../hooks/useInView";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { useTypewriter } from "../hooks/useTypewriter";

const LINE_INTERVAL_MS = 350;

const TONE_CLASS: Record<string, string> = {
  info: "text-muted",
  mail: "pl-4",
  ok: "pl-4 text-comment",
  accent: "text-accent",
};

export function GmailSim() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = usePrefersReducedMotion();
  const { out, done } = useTypewriter(gmailSimScript.command, { active: inView, reduced });
  const [lineCount, setLineCount] = useState(0);

  const startLines = inView && (done || reduced);

  useEffect(() => {
    if (!startLines || reduced) return;
    const id = setInterval(() => {
      setLineCount((n) => {
        if (n >= gmailSimScript.lines.length) {
          clearInterval(id);
          return n;
        }
        return n + 1;
      });
    }, LINE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [startLines, reduced]);

  const visible = !inView ? 0 : reduced ? gmailSimScript.lines.length : lineCount;

  return (
    <div ref={ref}>
      <Terminal title="cron — gmail-summarize">
        <div>
          {out}
          {!done && <span className="animate-blink text-accent">▊</span>}
        </div>
        {gmailSimScript.lines.slice(0, visible).map((line) => (
          <div key={line.text} className={TONE_CLASS[line.tone]}>
            {line.text}
          </div>
        ))}
      </Terminal>
    </div>
  );
}

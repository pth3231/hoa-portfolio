import { useEffect, useState } from "react";

export function useTypewriter(
  text: string,
  opts: { active: boolean; speedMs?: number; reduced?: boolean },
) {
  const { active, speedMs = 45, reduced = false } = opts;
  const [out, setOut] = useState("");

  useEffect(() => {
    if (reduced) {
      setOut(text);
      return;
    }
    if (!active) {
      setOut("");
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speedMs);
    return () => clearInterval(id);
  }, [active, reduced, text, speedMs]);

  const done = reduced || (active && out.length >= text.length);
  return { out, done };
}

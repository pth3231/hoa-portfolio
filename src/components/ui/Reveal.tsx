import type { ReactNode } from "react";
import { useInView } from "../../hooks/useInView";

export function Reveal({
  children,
  delayMs = 0,
  className = "",
}: {
  children: ReactNode;
  delayMs?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={`reveal ${inView ? "is-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

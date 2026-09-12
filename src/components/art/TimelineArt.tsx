export function TimelineArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 120" className={className} fill="none" aria-hidden="true">
      <path
        d="M24 92 C 100 16, 190 112, 296 32"
        stroke="var(--border)"
        strokeWidth="2"
        strokeDasharray="6 6"
      />
      <circle cx="24" cy="92" r="7" fill="var(--surface)" stroke="var(--border)" strokeWidth="2" />
      <circle cx="296" cy="32" r="7" fill="var(--accent)" />
      <text x="24" y="116" textAnchor="middle" fontSize="12" fill="var(--muted)" fontFamily="monospace">
        HAN
      </text>
      <text x="296" y="20" textAnchor="middle" fontSize="12" fill="var(--muted)" fontFamily="monospace">
        TYO
      </text>
    </svg>
  );
}

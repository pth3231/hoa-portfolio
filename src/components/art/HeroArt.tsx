export function HeroArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 240" className={className} fill="none" aria-hidden="true">
      <rect x="20" y="20" width="280" height="200" rx="10" stroke="var(--border)" strokeWidth="2" />
      <line x1="20" y1="52" x2="300" y2="52" stroke="var(--border)" strokeWidth="2" />
      <circle cx="36" cy="36" r="4" stroke="var(--comment)" strokeWidth="2" />
      <circle cx="52" cy="36" r="4" stroke="var(--comment)" strokeWidth="2" />
      <circle cx="68" cy="36" r="4" stroke="var(--border)" strokeWidth="2" />
      <line x1="44" y1="76" x2="150" y2="76" stroke="var(--muted)" strokeWidth="2" strokeLinecap="round" />
      <line x1="44" y1="100" x2="220" y2="100" stroke="var(--muted)" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <line x1="58" y1="124" x2="180" y2="124" stroke="var(--muted)" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      <line x1="58" y1="148" x2="120" y2="148" stroke="var(--comment)" strokeWidth="2" strokeLinecap="round" />
      <rect x="44" y="176" width="30" height="9" fill="var(--accent)" />
    </svg>
  );
}

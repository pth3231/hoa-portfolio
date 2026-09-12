export function EnvelopeArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 160" className={className} fill="none" aria-hidden="true">
      <rect x="30" y="36" width="180" height="92" rx="8" stroke="var(--border)" strokeWidth="2" />
      <path
        d="M40 46 L120 100 L200 46"
        stroke="var(--border)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="120" cy="104" r="5" fill="var(--accent)" />
    </svg>
  );
}

export function StackArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 140" className={className} fill="none" aria-hidden="true">
      <rect x="30" y="92" width="140" height="24" rx="6" stroke="var(--border)" strokeWidth="2" />
      <rect x="30" y="58" width="140" height="24" rx="6" stroke="var(--border)" strokeWidth="2" />
      <rect x="30" y="24" width="140" height="24" rx="6" stroke="var(--border)" strokeWidth="2" />
      <circle cx="152" cy="36" r="4" fill="var(--accent)" />
    </svg>
  );
}

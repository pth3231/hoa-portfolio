export function SectionHeader({ index, title }: { index: string; title: string }) {
  return (
    <div className="mb-10 flex items-baseline gap-4">
      <span className="text-lg text-accent">/{index}</span>
      <h2 className="text-[32px] font-bold leading-tight tracking-tight">{title}</h2>
      <span className="hidden h-px flex-1 self-center bg-border md:block" />
    </div>
  );
}

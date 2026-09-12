import type { ReactNode } from "react";

export function Terminal({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface-deep">
      <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-comment" />
        <span className="h-2.5 w-2.5 rounded-full bg-comment/50" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="ml-2 text-[15px] text-muted">{title}</span>
      </div>
      <div className="p-4 text-[16px] leading-loose">{children}</div>
    </div>
  );
}

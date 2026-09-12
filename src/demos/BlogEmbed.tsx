import { useEffect, useRef, useState } from "react";

const SMALL_VIEWPORT = 640;
const LOAD_TIMEOUT_MS = 4000;

export function BlogEmbed({ url, repoUrl, note }: { url: string; repoUrl: string; note: string }) {
  const [loaded, setLoaded] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const [small, setSmall] = useState(
    () => typeof window !== "undefined" && window.innerWidth < SMALL_VIEWPORT,
  );
  const timerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!url) return;
    timerRef.current = window.setTimeout(() => setTimedOut(true), LOAD_TIMEOUT_MS);
    return () => window.clearTimeout(timerRef.current);
  }, [url]);

  useEffect(() => {
    const onResize = () => setSmall(window.innerWidth < SMALL_VIEWPORT);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const showIframe = url !== "" && !small && !timedOut;

  if (!showIframe) {
    return (
      <figure className="overflow-hidden rounded-lg border border-border bg-surface-deep">
        <img
          src="/images/blog-list-card.svg"
          alt="blog-list interface card"
          className="aspect-[16/10] w-full object-cover"
        />
        <figcaption className="flex items-center justify-between gap-4 border-t border-border px-4 py-3 text-[15px]">
          <span className="text-muted">{note}</span>
          <a href={repoUrl} target="_blank" rel="noreferrer" className="text-accent hover:underline">
            open the repo ↗
          </a>
        </figcaption>
      </figure>
    );
  }

  return (
    <figure className="overflow-hidden rounded-lg border border-border bg-surface">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-comment" />
        <span className="h-2.5 w-2.5 rounded-full bg-comment/50" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="ml-2 truncate text-[15px] text-muted">{url}</span>
        {loaded && <span className="ml-auto text-[15px] text-comment">● live</span>}
      </div>
      <iframe
        title="blog-list live demo"
        src={url}
        loading="lazy"
        className="aspect-[16/10] w-full bg-surface-deep"
        onLoad={() => {
          setLoaded(true);
          if (timerRef.current !== undefined) window.clearTimeout(timerRef.current);
        }}
      />
    </figure>
  );
}

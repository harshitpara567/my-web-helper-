import { cn } from "@/lib/utils";

export function Marquee({
  items,
  className,
  tone = "light"
}: {
  items: string[];
  className?: string;
  tone?: "light" | "dark";
}) {
  const row = [...items, ...items];
  return (
    <div className={cn("group relative flex overflow-hidden", className)}>
      <div className="flex min-w-full shrink-0 animate-marquee items-center gap-14 group-hover:[animation-play-state:paused]">
        {row.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className={cn(
              "whitespace-nowrap font-display text-2xl font-bold tracking-tight sm:text-3xl",
              tone === "dark" ? "text-paper/40" : "text-ink/25"
            )}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

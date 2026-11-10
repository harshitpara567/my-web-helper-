import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
  tone = "lime"
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "lime" | "ink" | "outline" | "brand";
}) {
  const tones = {
    lime: "bg-lime text-ink",
    ink: "bg-ink text-paper",
    brand: "bg-brand-50 text-brand-700",
    outline: "border border-ink/20 text-ink/70"
  } as const;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em]",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

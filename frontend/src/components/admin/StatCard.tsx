import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatCard({
  icon: Icon,
  label,
  value,
  hint,
  className
}: {
  icon: LucideIcon;
  label: string;
  value: number | string;
  hint?: string;
  className?: string;
}) {
  return (
    <div className={cn("rounded-2xl border border-ink/10 bg-paper p-5", className)}>
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <p className="mt-4 font-display text-3xl font-bold tracking-tight text-ink">{value}</p>
      <p className="mt-1 text-sm font-medium text-ink/60">{label}</p>
      {hint ? <p className="mt-2 text-xs text-ink/45">{hint}</p> : null}
    </div>
  );
}

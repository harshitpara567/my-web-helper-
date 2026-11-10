import { cn } from "@/lib/utils";
import type { ServiceStatus } from "@/types";

const styles: Record<ServiceStatus, { label: string; className: string }> = {
  new: { label: "New", className: "bg-brand-50 text-brand-700 border-brand-200" },
  read: { label: "Read", className: "bg-ink/5 text-ink/70 border-ink/15" },
  "in-progress": { label: "In progress", className: "bg-lime/40 text-ink border-lime-deep" },
  closed: { label: "Closed", className: "bg-emerald-50 text-emerald-700 border-emerald-200" }
};

export function StatusPill({ status, className }: { status: ServiceStatus; className?: string }) {
  const style = styles[status] ?? styles.read;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold",
        style.className,
        className
      )}
    >
      {style.label}
    </span>
  );
}

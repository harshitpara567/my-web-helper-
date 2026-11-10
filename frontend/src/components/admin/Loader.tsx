import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function Loader({
  label = "Loading…",
  className
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex flex-col items-center justify-center gap-3 py-16 text-ink/55",
        className
      )}
    >
      <Loader2 className="h-6 w-6 animate-spin text-brand-500" aria-hidden="true" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}

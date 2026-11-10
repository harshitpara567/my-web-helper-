import type { LucideIcon } from "lucide-react";
import { Inbox } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
  className
}: {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-ink/15 bg-paper px-6 py-14 text-center",
        className
      )}
    >
      <span className="grid h-12 w-12 place-items-center rounded-full bg-paper-soft text-ink/50">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="space-y-1">
        <p className="font-display text-base font-bold tracking-tight text-ink">{title}</p>
        {description ? <p className="mx-auto max-w-sm text-sm text-ink/55">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

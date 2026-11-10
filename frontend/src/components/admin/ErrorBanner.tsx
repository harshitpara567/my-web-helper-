import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function ErrorBanner({
  message,
  onRetry,
  className
}: {
  message: string;
  onRetry?: () => void;
  className?: string;
}) {
  if (!message) return null;
  return (
    <div
      role="alert"
      className={cn(
        "flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700",
        className
      )}
    >
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <p className="flex-1">{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="shrink-0 font-semibold underline underline-offset-4 hover:text-red-800"
        >
          Retry
        </button>
      ) : null}
    </div>
  );
}

import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} home`}
      className={cn("group inline-flex items-center gap-3", className)}
    >
      <span className="relative grid h-11 w-14 place-items-center overflow-hidden rounded-lg bg-ink">
        <svg viewBox="0 0 120 80" className="h-full w-full" aria-hidden="true">
          <text
            x="60"
            y="56"
            textAnchor="middle"
            fontFamily="Arial Black, Arial, sans-serif"
            fontWeight="900"
            fontSize="52"
            fill="#F5A623"
            letterSpacing="-2"
          >
            MWH
          </text>
          <line
            x1="8"
            y1="76"
            x2="112"
            y2="6"
            stroke="#E8E8E8"
            strokeWidth="5"
            strokeLinecap="round"
            opacity="0.95"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-base font-extrabold tracking-tight sm:text-lg",
            tone === "dark" ? "text-ink" : "text-paper"
          )}
        >
          My Web Helper
        </span>
        <span
          className={cn(
            "text-[0.6rem] font-semibold uppercase tracking-[0.28em] sm:text-[0.65rem]",
            tone === "dark" ? "text-ink/45" : "text-paper/50"
          )}
        >
          The Marketing Machine
        </span>
      </span>
    </Link>
  );
}

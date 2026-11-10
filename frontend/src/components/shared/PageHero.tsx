import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumb,
  align = "left"
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  breadcrumb?: { label: string; href?: string }[];
  align?: "left" | "center";
}) {
  return (
    <section className="relative overflow-hidden border-b border-ink/10 bg-paper">
      <div
        className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-brand-100/60 blur-3xl"
        aria-hidden="true"
      />
      <div
        className={cn(
          "shell relative py-16 lg:py-24",
          align === "center" && "mx-auto max-w-4xl text-center"
        )}
      >
        {breadcrumb?.length ? (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol
              className={cn(
                "flex flex-wrap items-center gap-1.5 text-xs font-medium text-ink/50",
                align === "center" && "justify-center"
              )}
            >
              {breadcrumb.map((crumb, index) => (
                <li key={crumb.label} className="inline-flex items-center gap-1.5">
                  {crumb.href ? (
                    <Link href={crumb.href} className="transition-colors hover:text-ink">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-ink/70">{crumb.label}</span>
                  )}
                  {index < breadcrumb.length - 1 ? <ChevronRight className="h-3 w-3" /> : null}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1 className="mt-4 max-w-4xl text-display-2 text-balance">{title}</h1>
        {description ? (
          <p
            className={cn(
              "mt-6 max-w-2xl text-lg leading-relaxed text-ink/70 text-pretty",
              align === "center" && "mx-auto"
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}

"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import type { Portfolio } from "@/types";

export function WorkGrid({ projects }: { projects: Portfolio[] }) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((project) => project.category)))],
    [projects]
  );
  const [active, setActive] = useState<string>("All");

  const filtered =
    active === "All" ? projects : projects.filter((project) => project.category === active);

  return (
    <section className="shell py-20 lg:py-28">
      <div
        className="flex flex-wrap gap-3"
        role="group"
        aria-label="Filter projects by category"
      >
        {categories.map((category) => {
          const isActive = category === active;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              aria-pressed={isActive}
              className={cn(
                "rounded-full border px-5 py-2 text-sm font-semibold transition-colors duration-300",
                isActive
                  ? "border-ink bg-ink text-paper"
                  : "border-ink/15 text-ink/70 hover:border-ink hover:text-ink"
              )}
            >
              {category}
            </button>
          );
        })}
      </div>

      <motion.div layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.article
              key={project.slug}
              id={project.slug}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="group flex scroll-mt-28 flex-col overflow-hidden rounded-2xl border border-ink/10 bg-paper"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col p-7">
                <div className="flex items-center justify-between gap-3">
                  <Badge tone="brand">{project.category}</Badge>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink/40">
                    {project.year}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-bold tracking-tight text-ink">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm font-medium text-brand-600">{project.client}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/65">
                  {project.summary}
                </p>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {project.results.slice(0, 3).map((result) => (
                    <li
                      key={result}
                      className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700"
                    >
                      {result}
                    </li>
                  ))}
                </ul>

                <ul className="mt-4 flex flex-wrap gap-2 border-t border-ink/10 pt-4">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full bg-paper-soft px-2.5 py-1 text-xs font-medium text-ink/60"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed border-ink/15 bg-paper-soft p-12 text-center">
          <p className="text-lg font-semibold text-ink">No projects in this category yet.</p>
          <p className="mt-2 text-sm text-ink/60">
            Try a different filter to explore more of our work.
          </p>
        </div>
      ) : null}
    </section>
  );
}

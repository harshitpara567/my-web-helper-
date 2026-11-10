import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { portfolioProjects } from "@/lib/seed/portfolio";

export function FeaturedWork() {
  const featured = portfolioProjects.filter((project) => project.featured).slice(0, 3);
  const [lead, ...rest] = featured;

  return (
    <section className="border-t border-ink/10 bg-paper-soft py-20 lg:py-28">
      <div className="shell">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Selected work"
              title="Projects we're proud of."
              description="A snapshot of platforms, products and storefronts we've shipped for ambitious clients."
            />
            <Button href="/work" variant="outline">
              View all work
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {lead ? (
            <Reveal className="lg:row-span-2">
              <Link href={`/work#${lead.slug}`} className="group block h-full">
                <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-paper">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={lead.coverImage}
                      alt={lead.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-8">
                    <Badge tone="brand">{lead.category}</Badge>
                    <h3 className="mt-5 text-2xl font-bold tracking-tight text-ink">{lead.title}</h3>
                    <p className="mt-3 flex-1 text-ink/65">{lead.summary}</p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {lead.results.slice(0, 3).map((result) => (
                        <li
                          key={result}
                          className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700"
                        >
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Link>
            </Reveal>
          ) : null}

          {rest.map((project, index) => (
            <Reveal key={project.slug} delay={0.1 + index * 0.08}>
              <Link href={`/work#${project.slug}`} className="group block h-full">
                <article className="flex h-full items-stretch overflow-hidden rounded-2xl border border-ink/10 bg-paper">
                  <div className="relative hidden w-2/5 shrink-0 overflow-hidden sm:block">
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      sizes="25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-7">
                    <div>
                      <Badge tone="outline">{project.category}</Badge>
                      <h3 className="mt-4 text-xl font-bold tracking-tight text-ink">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink/65">{project.summary}</p>
                    </div>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
                      Read case study
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </article>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

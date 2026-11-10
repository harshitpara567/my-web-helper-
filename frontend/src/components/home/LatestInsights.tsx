import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatDate } from "@/lib/utils";
import type { Blog } from "@/types";

export function LatestInsights({ posts }: { posts: Blog[] }) {
  const [lead, ...rest] = posts.slice(0, 4);
  const categoryLabel = (value: Blog["category"]): string =>
    typeof value === "string" ? value : (value?.name ?? "General");

  return (
    <section className="border-t border-ink/10 bg-paper-soft py-20 lg:py-28">
      <div className="shell">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Insights"
              title="Ideas from the team."
              description="Practical thinking on design, engineering, growth and everything in between."
            />
            <Button href="/insights" variant="outline">
              All insights
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          {lead ? (
            <Reveal>
              <Link href={`/insights/${lead.slug}`} className="group block h-full">
                <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-paper">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={lead.coverImage}
                      alt={lead.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
                      {categoryLabel(lead.category)} · {lead.readingTime} min read
                    </p>
                    <h3 className="mt-4 text-2xl font-bold tracking-tight text-ink">{lead.title}</h3>
                    <p className="mt-3 flex-1 text-ink/65">{lead.excerpt}</p>
                    <p className="mt-6 text-xs text-ink/50">
                      {lead.publishedAt ? formatDate(lead.publishedAt) : ""}
                    </p>
                  </div>
                </article>
              </Link>
            </Reveal>
          ) : null}

          <div className="flex flex-col divide-y divide-ink/10">
            {rest.map((post, index) => (
              <Reveal key={post.slug} delay={index * 0.07}>
                <Link href={`/insights/${post.slug}`} className="group flex gap-5 py-6 first:pt-0">
                  <div className="flex-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
                      {categoryLabel(post.category)}
                    </p>
                    <h3 className="mt-2 text-lg font-bold leading-snug tracking-tight text-ink transition-colors group-hover:text-brand-600">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm text-ink/60">
                      {post.publishedAt ? formatDate(post.publishedAt) : ""} · {post.readingTime} min
                    </p>
                  </div>
                  <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-ink/30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-600" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

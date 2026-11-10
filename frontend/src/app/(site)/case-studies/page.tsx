import type { Metadata } from "next";
import Image from "next/image";
import { CTASection } from "@/components/shared/CTASection";
import { PageHero } from "@/components/shared/PageHero";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { caseStudies } from "@/lib/seed/site-content";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Detailed case studies from My Web Helper — the challenge, the solution and the measurable outcomes behind our client work.",
  alternates: { canonical: "/case-studies" }
};

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case studies"
        title="In-depth looks at work that moved the needle."
        description="The brief, the approach and the numbers behind a few of the platforms we're proudest of."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Case Studies" }]}
      />

      {caseStudies.map((study, index) => {
        const reversed = index % 2 === 1;

        return (
          <section
            key={study.slug}
            id={study.slug}
            className={cn(
              "scroll-mt-28 border-t border-ink/10 py-20 lg:py-28",
              reversed ? "bg-paper-soft" : "bg-paper"
            )}
          >
            <div className="shell">
              <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
                <Reveal className={cn(reversed && "lg:order-2")}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-ink/10 bg-paper-soft">
                    <Image
                      src={study.image}
                      alt={study.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                </Reveal>

                <Reveal delay={0.1} className={cn(reversed && "lg:order-1")}>
                  <Badge tone="brand">{study.client}</Badge>
                  <h2 className="mt-5 text-display-3 text-balance text-ink">{study.title}</h2>

                  <div className="mt-8 grid gap-6 sm:grid-cols-2">
                    <div>
                      <p className="eyebrow">Challenge</p>
                      <p className="mt-3 text-sm leading-relaxed text-ink/70">{study.challenge}</p>
                    </div>
                    <div>
                      <p className="eyebrow">Solution</p>
                      <p className="mt-3 text-sm leading-relaxed text-ink/70">{study.solution}</p>
                    </div>
                  </div>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {study.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-ink/15 px-3 py-1 text-xs font-medium text-ink/60"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>

              <Reveal delay={0.15}>
                <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-3">
                  {study.outcomes.map((outcome) => {
                    const [head, ...tail] = outcome.split(" ");
                    return (
                      <div key={outcome} className="bg-paper p-8">
                        <dd className="font-display text-3xl font-bold tracking-tight text-brand-600">
                          {head}
                        </dd>
                        <dt className="mt-2 text-sm leading-relaxed text-ink/65">
                          {tail.join(" ")}
                        </dt>
                      </div>
                    );
                  })}
                </dl>
              </Reveal>
            </div>
          </section>
        );
      })}

      <CTASection />
    </>
  );
}

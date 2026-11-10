import { Quote } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { caseStudies } from "@/lib/seed/site-content";

export function SuccessStories() {
  return (
    <section className="relative overflow-hidden bg-ink py-20 text-paper lg:py-28">
      <div className="grain pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="shell relative">
        <Reveal>
          <SectionHeading
            eyebrow="Client success"
            title="Outcomes we can point to."
            description="Every engagement is measured against a business result. Here are a few we're especially proud of."
            tone="dark"
          />
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {caseStudies.map((study, index) => (
            <Reveal key={study.slug} delay={index * 0.08}>
              <article className="flex h-full flex-col rounded-2xl border border-paper/12 bg-paper/[0.04] p-8 backdrop-blur-sm transition-colors duration-300 hover:border-lime/40">
                <Quote className="h-8 w-8 text-lime" />
                <p className="mt-6 flex-1 text-lg font-medium leading-relaxed text-paper/90">
                  {study.title}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-paper/60">{study.challenge}</p>
                <ul className="mt-6 space-y-2 border-t border-paper/10 pt-6">
                  {study.outcomes.map((outcome) => (
                    <li key={outcome} className="flex items-center gap-2 text-sm text-paper/80">
                      <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                      {outcome}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-paper/45">
                  {study.client}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

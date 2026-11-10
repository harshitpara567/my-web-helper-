import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CTASection } from "@/components/shared/CTASection";
import { PageHero } from "@/components/shared/PageHero";
import { Icon } from "@/components/ui/Icon";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/lib/seed/services";
import { process, technologies } from "@/lib/seed/site-content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore the nine digital practices My Web Helper delivers — from web development and mobile apps to UI/UX, commerce, marketing, SEO, cloud and enterprise solutions.",
  alternates: { canonical: "/services" }
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Capabilities that cover the full digital journey."
        description="Strategy, design, engineering and growth working as one senior team — nine practices that plug together around your goals."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />

      <section className="shell py-20 lg:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="What we do"
            title="Nine practices, one accountable team."
            description="Pick a single discipline or bring us the whole problem — every engagement is led by the people doing the work."
          />
        </Reveal>

        <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col bg-paper p-8 transition-colors duration-300 hover:bg-ink"
              >
                <div className="flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600 transition-colors duration-300 group-hover:bg-lime group-hover:text-ink">
                    <Icon name={service.icon} className="h-6 w-6" />
                  </span>
                  <span className="font-display text-sm font-bold text-ink/25 transition-colors duration-300 group-hover:text-paper/40">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-8 text-xl font-bold tracking-tight text-ink transition-colors duration-300 group-hover:text-paper">
                  {service.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/65 transition-colors duration-300 group-hover:text-paper/65">
                  {service.summary}
                </p>

                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 transition-colors duration-300 group-hover:text-lime">
                  Explore service
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </RevealGroup>
      </section>

      <section className="border-t border-ink/10 bg-paper-soft py-20 lg:py-28">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="How we work"
              title="A delivery process built for momentum."
              description="Four deliberate phases that keep strategy, craft and measurement connected from first workshop to long-term growth."
            />
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step, index) => (
              <Reveal key={step.step} delay={index * 0.08}>
                <div className="h-full rounded-2xl border border-ink/10 bg-paper p-7">
                  <span className="font-display text-3xl font-bold text-brand-500/30">
                    {step.step}
                  </span>
                  <h3 className="mt-4 text-lg font-bold tracking-tight text-ink">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/65">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="shell py-20 lg:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Technology expertise"
            title="A modern stack, chosen deliberately."
            description="We pick boring, proven tools where reliability matters and modern ones where they unlock a real advantage."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
            {technologies.map((group) => (
              <div key={group.group} className="bg-paper p-7">
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-600">
                  {group.group}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-ink/12 px-3 py-1 text-xs font-medium text-ink/70"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <CTASection />
    </>
  );
}

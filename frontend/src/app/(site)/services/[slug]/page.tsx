import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check, ChevronRight } from "lucide-react";
import { CTASection } from "@/components/shared/CTASection";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getServiceBySlug, services } from "@/lib/seed/services";
import { img } from "@/lib/images";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    return { title: "Service not found" };
  }

  return {
    title: service.title,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.title} — My Web Helper`,
      description: service.summary,
      url: `/services/${service.slug}`,
      type: "website"
    }
  };
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  const related = services.filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden border-b border-ink/10 bg-paper">
        <div
          className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-brand-100/60 blur-3xl"
          aria-hidden="true"
        />
        <div className="shell relative py-16 lg:py-24">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-ink/50">
              <li className="inline-flex items-center gap-1.5">
                <Link href="/services" className="transition-colors hover:text-ink">
                  Services
                </Link>
                <ChevronRight className="h-3 w-3" />
              </li>
              <li className="inline-flex items-center gap-1.5">
                <span className="text-ink/70">{service.title}</span>
              </li>
            </ol>
          </nav>

          <p className="eyebrow">Services</p>
          <h1 className="mt-4 max-w-4xl text-display-2 text-balance">{service.title}</h1>
          <p className="mt-5 text-lg font-medium text-brand-600">{service.tagline}</p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/70 text-pretty">
            {service.summary}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href="/contact" variant="dark" size="lg">
              Start a project
              <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
            <Button href="/work" variant="outline" size="lg">
              See our work
            </Button>
          </div>

          <div className="relative mt-14 aspect-[16/9] overflow-hidden rounded-2xl border border-ink/10 bg-paper-soft">
            <Image
              src={img(
                `${service.title} concept — ${service.tagline}, premium editorial product photography, soft green accents`,
                "landscape_16_9"
              )}
              alt={`${service.title} at My Web Helper`}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="shell py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="eyebrow">Overview</p>
              <h2 className="mt-4 text-display-3 text-ink text-balance">
                What this service delivers
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-ink/70 text-pretty">
                {service.description}
              </p>
            </Reveal>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {service.benefits.map((benefit, index) => (
                <Reveal key={benefit.title} delay={index * 0.06}>
                  <div className="h-full rounded-2xl border border-ink/10 bg-paper p-6">
                    <h3 className="text-base font-bold tracking-tight text-ink">
                      {benefit.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/65">
                      {benefit.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <aside>
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <div className="rounded-2xl border border-ink/10 bg-paper-soft p-8">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-600">
                    Technologies
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {service.technologies.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full border border-ink/10 bg-paper px-3 py-1 text-xs font-medium text-ink/70"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 border-t border-ink/10 pt-8">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-600">
                      Deliverables
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {service.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm text-ink/75">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button href="/contact" variant="dark" className="mt-8 w-full">
                    Start a project
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Button>
                </div>
              </Reveal>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-paper-soft py-20 lg:py-28">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Related services"
              title="Keep exploring."
              description="Most engagements pair this practice with one or two others. Here are a few that work well together."
            />
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item, index) => (
              <Reveal key={item.slug} delay={index * 0.06}>
                <Link
                  href={`/services/${item.slug}`}
                  className="group flex h-full flex-col bg-paper p-8 transition-colors duration-300 hover:bg-ink"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600 transition-colors duration-300 group-hover:bg-lime group-hover:text-ink">
                    <Icon name={item.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 text-lg font-bold tracking-tight text-ink transition-colors duration-300 group-hover:text-paper">
                    {item.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/65 transition-colors duration-300 group-hover:text-paper/65">
                    {item.summary}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 transition-colors duration-300 group-hover:text-lime">
                    Explore service
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

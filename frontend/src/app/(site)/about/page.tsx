import type { Metadata } from "next";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { CTASection } from "@/components/shared/CTASection";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { img } from "@/lib/images";
import { milestones, offices, stats, team, values } from "@/lib/seed/site-content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet My Web Helper — a senior team of strategists, designers and engineers crafting high-performance digital products for ambitious brands.",
  alternates: { canonical: "/about" }
};

const storyImage = img(
  "wide shot of a bright modern agency studio with designers and engineers collaborating at desks, plants and natural light, editorial photography",
  "landscape_4_3"
);

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About My Web Helper"
        title="A digital partner built around craft, candour and outcomes."
        description="Since 2014 we have helped ambitious teams design, build and grow digital products that people genuinely enjoy using — and that move the numbers that matter."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* Story & mission */}
      <section className="shell py-20 lg:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <div className="overflow-hidden rounded-[1.75rem] border border-ink/10">
              <Image
                src={storyImage}
                alt="The My Web Helper team collaborating in the studio"
                width={1200}
                height={900}
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Badge tone="brand">Our story</Badge>
            <h2 className="mt-5 text-display-3 text-balance">
              Started as two people who cared about the details.
            </h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink/70 text-pretty">
              <p>
                My Web Helper began in 2014 as a two-person studio with a simple belief: digital
                work should be fast, accessible and genuinely well made. That belief has scaled — with
                the same senior people solving problems, now across 14 industries.
              </p>
              <p>
                <span className="font-semibold text-ink">Our mission</span> is to design and engineer
                digital products that make a measurable difference to our clients and the people they
                serve — advancing the standard of what &ldquo;good&rdquo; looks like online.
              </p>
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="border-l border-ink/15 pl-5">
                  <dt className="text-sm font-medium text-ink/60">{stat.label}</dt>
                  <dd className="mt-1 font-display text-3xl font-extrabold text-brand-600">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="border-t border-ink/10 bg-paper-soft py-20 lg:py-28">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Our values"
              title="The principles behind every decision we make."
              description="They are not posters on a wall — they shape how we hire, how we work and what we ship."
            />
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 0.06}>
                <article className="h-full rounded-2xl border border-ink/10 bg-paper p-7">
                  <span className="font-display text-sm font-bold text-brand-600">
                    0{index + 1}
                  </span>
                  <h3 className="mt-4 text-lg font-bold tracking-tight text-ink">{value.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/65">{value.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="shell py-20 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Our journey"
              title="Milestones that shaped us."
              description="A decade of steady, deliberate growth — measured in the work and the relationships, not headcount for its own sake."
            />
          </Reveal>

          <Reveal>
            <ol className="relative border-l border-ink/15">
              {milestones.map((milestone) => (
                <li key={milestone.year} className="relative pb-10 pl-8 last:pb-0">
                  <span
                    className="absolute -left-[2.55rem] top-1 grid h-4 w-4 place-items-center rounded-full border-2 border-brand-500 bg-paper"
                    aria-hidden="true"
                  />
                  <p className="font-display text-2xl font-extrabold tracking-tight text-brand-600">
                    {milestone.year}
                  </p>
                  <p className="mt-2 text-base leading-relaxed text-ink/70">{milestone.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* Team */}
      <section className="border-t border-ink/10 bg-paper-soft py-20 lg:py-28">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Our people"
              title="Senior specialists, close to the work."
            />
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <Reveal key={member.name} delay={index * 0.06}>
                <figure className="group h-full overflow-hidden rounded-2xl border border-ink/10 bg-paper">
                  <div className="overflow-hidden">
                    <Image
                      src={member.image}
                      alt={`Portrait of ${member.name}, ${member.role}`}
                      width={600}
                      height={800}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 22vw"
                      className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <figcaption className="p-6">
                    <p className="text-base font-bold tracking-tight text-ink">{member.name}</p>
                    <p className="mt-1 text-sm text-brand-600">{member.role}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Offices */}
      <section className="shell py-20 lg:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Where we are"
            title="Studios across three time zones."
            description="Distributed by design — so we stay available to teams wherever they are building."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {offices.map((office, index) => (
            <Reveal key={office.city} delay={index * 0.06}>
              <article className="h-full rounded-2xl border border-ink/10 bg-paper p-7">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-ink text-lime">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-lg font-bold tracking-tight text-ink">{office.city}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{office.detail}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-10 text-sm text-ink/60">
            Prefer email? Reach us at{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-medium text-brand-600 underline underline-offset-4 hover:text-brand-700"
            >
              {siteConfig.email}
            </a>
            .
          </p>
        </Reveal>
      </section>

      <CTASection />
    </>
  );
}

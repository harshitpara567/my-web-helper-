import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { CTASection } from "@/components/shared/CTASection";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { img } from "@/lib/images";
import { openings, perks } from "@/lib/seed/site-content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join My Web Helper. Explore open roles, our hiring process and a remote-first culture built around craft, ownership and care.",
  alternates: { canonical: "/careers" }
};

const hiringSteps = [
  {
    step: "01",
    title: "Apply",
    description: "Send us your CV, portfolio or work samples. We read every application ourselves."
  },
  {
    step: "02",
    title: "Intro call",
    description: "A relaxed 30-minute conversation about your goals, the role and how we work."
  },
  {
    step: "03",
    title: "Craft interview",
    description: "A practical, paid exercise or pairing session that reflects the real work you would do."
  },
  {
    step: "04",
    title: "Offer",
    description: "We move quickly, share feedback either way and make a decision you can trust."
  }
];

const cultureImage = img(
  "candid photo of a remote team on a video call with two colleagues in a bright studio, notebooks and laptops, warm natural light, editorial photography",
  "landscape_4_3"
);

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Do the best work of your career, with people who care."
        description="We are a remote-first team of senior specialists who value craft, candour and real ownership. If that sounds like you, we would love to talk."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Careers" }]}
      />

      {/* Why work here */}
      <section className="shell py-20 lg:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Why work here"
            title="A workplace designed for focused, meaningful work."
            description="No layers of process, no vanity metrics — just the environment and support you need to do your best work."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {perks.map((perk, index) => (
            <Reveal key={perk.title} delay={index * 0.05}>
              <article className="group h-full rounded-2xl border border-ink/10 bg-paper p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-xl">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-ink text-lime transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-paper">
                  <Icon name={perk.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-6 text-lg font-bold tracking-tight text-ink">{perk.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/65">{perk.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Open roles */}
      <section className="border-t border-ink/10 bg-paper-soft py-20 lg:py-28">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Open roles"
              title="Where you could make an impact next."
              description="Do not see a perfect fit? We are always keen to meet exceptional people — get in touch anyway."
            />
          </Reveal>

          <ul className="mt-14 divide-y divide-ink/10 overflow-hidden rounded-2xl border border-ink/10 bg-paper">
            {openings.map((role, index) => (
              <Reveal key={role.title} delay={index * 0.04} as="li">
                <article className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                  <div>
                    <Badge tone="brand">{role.team}</Badge>
                    <h3 className="mt-4 text-xl font-bold tracking-tight text-ink">{role.title}</h3>
                    <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink/60">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" aria-hidden="true" />
                        {role.location}
                      </span>
                      <span>{role.type}</span>
                    </div>
                  </div>
                  <Button
                    href={`mailto:${siteConfig.email}?subject=Application: ${encodeURIComponent(role.title)}`}
                    variant="outline"
                    className="shrink-0"
                  >
                    Apply
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </Button>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Hiring process */}
      <section className="shell py-20 lg:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="How we hire"
            title="A clear, respectful process — start to offer."
            description="We keep it human and quick, and we give you honest feedback at every stage."
          />
        </Reveal>

        <Reveal>
          <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {hiringSteps.map((item) => (
              <li key={item.step} className="h-full rounded-2xl border border-ink/10 bg-paper p-7">
                <span className="font-display text-3xl font-extrabold text-brand-500/30">
                  {item.step}
                </span>
                <h3 className="mt-4 text-lg font-bold tracking-tight text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/65">{item.description}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      {/* Culture */}
      <section className="border-t border-ink/10 bg-paper-soft py-20 lg:py-28">
        <div className="shell grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <Badge tone="brand">Life at MWH</Badge>
            <h2 className="mt-5 text-display-3 text-balance">
              Async-first, outcome-driven, genuinely supportive.
            </h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink/70 text-pretty">
              <p>
                We work asynchronously by default, protect deep-focus time and judge progress by
                outcomes rather than hours. Small teams carry real ownership, so your ideas actually
                ship.
              </p>
              <p>
                We invest in people for the long term — through mentorship, a real learning budget and
                a culture where asking for help is a strength, not a weakness.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-[1.75rem] border border-ink/10">
              <Image
                src={cultureImage}
                alt="My Web Helper colleagues collaborating remotely and in the studio"
                width={1200}
                height={900}
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Ready to build great things with us?"
        description="Tell us about yourself and the kind of work you want to do. We will take it from there."
      />
    </>
  );
}

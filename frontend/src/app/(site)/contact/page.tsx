import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { offices } from "@/lib/seed/site-content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Start a conversation with My Web Helper. Share your project, budget and goals and our team will respond within one business day.",
  alternates: { canonical: "/contact" }
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about what you're building."
        description="Share a few details and we will come back within one business day with a clear point of view, next steps and the right senior people to help."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      {/* Contact details + form */}
      <section className="shell py-20 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr]">
          {/* Left: details */}
          <div className="space-y-10">
            <Reveal>
              <h2 className="text-display-3 text-balance">Get in touch</h2>
              <p className="mt-5 text-lg leading-relaxed text-ink/70 text-pretty">
                Prefer email or a call? Reach us directly using the details below — a real person on
                the team will get back to you.
              </p>
            </Reveal>

            <Reveal delay={0.05}>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ink text-lime">
                    <Mail className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">Email</p>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-sm text-ink/70 underline-offset-4 hover:text-brand-600 hover:underline"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ink text-lime">
                    <Phone className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">Phone</p>
                    <a
                      href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`}
                      className="text-sm text-ink/70 underline-offset-4 hover:text-brand-600 hover:underline"
                    >
                      {siteConfig.phone}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ink text-lime">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">Head office</p>
                    <p className="text-sm leading-relaxed text-ink/70">{siteConfig.address}</p>
                  </div>
                </li>
              </ul>
            </Reveal>

            <Reveal delay={0.1}>
              <div>
                <p className="text-sm font-semibold text-ink">Follow us</p>
                <ul className="mt-3 flex flex-wrap gap-3">
                  {siteConfig.socials.map((social) => (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex rounded-full border border-ink/15 px-4 py-2 text-xs font-semibold text-ink/70 transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                      >
                        {social.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div>
                <p className="text-sm font-semibold text-ink">Our offices</p>
                <ul className="mt-4 space-y-4">
                  {offices.map((office) => (
                    <li key={office.city} className="rounded-xl border border-ink/10 bg-paper-soft p-5">
                      <p className="text-sm font-bold tracking-tight text-ink">{office.city}</p>
                      <p className="mt-1 text-sm text-ink/65">{office.detail}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="flex items-start gap-3 rounded-xl border border-brand-500/25 bg-brand-50 p-5">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
                <p className="text-sm leading-relaxed text-brand-800">
                  <span className="font-semibold">Response time.</span> We reply to most enquiries within
                  one business day, Monday to Friday.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right: form */}
          <Reveal delay={0.1}>
            <EnquiryForm />
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-ink/10 bg-paper-soft py-20 lg:py-28">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Good to know"
              title="Questions we hear most often."
              description="A few quick answers before you get in touch. Anything else, just ask."
            />
          </Reveal>

          <div className="mt-12 max-w-3xl">
            <FaqAccordion />
          </div>
        </div>
      </section>

      {/* Slim closing band */}
      <section className="border-t border-ink/10 bg-ink py-14 text-paper">
        <div className="shell flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-lg font-semibold tracking-tight">
            Prefer a live conversation? Book a discovery call.
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-sm font-medium text-lime underline underline-offset-4 hover:text-lime-soft"
          >
            {siteConfig.email}
          </a>
        </div>
      </section>
    </>
  );
}

import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/lib/site";

export function CTASection({
  title = "Let's build something your customers will love.",
  description = "Tell us about your goals and we'll come back with a clear point of view, a plan and senior people to deliver it."
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="shell py-20 lg:py-28">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] bg-ink px-6 py-16 text-paper sm:px-12 lg:px-16 lg:py-20">
          <div className="grain pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-500/30 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:items-end">
            <div>
              <p className="eyebrow text-lime">Start a conversation</p>
              <h2 className="mt-4 max-w-2xl text-display-2 text-balance">{title}</h2>
              <p className="mt-6 max-w-xl text-lg text-paper/70">{description}</p>
            </div>
            <div className="flex flex-col gap-4 lg:items-end">
              <Button href="/contact" variant="primary" size="lg">
                Book a discovery call
                <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-sm text-paper/60 transition-colors hover:text-lime"
              >
                or email {siteConfig.email}
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

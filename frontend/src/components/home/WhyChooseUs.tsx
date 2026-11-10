import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { whyChooseUs } from "@/lib/seed/site-content";

export function WhyChooseUs() {
  return (
    <section className="shell py-20 lg:py-28">
      <Reveal>
        <SectionHeading
          eyebrow="Why choose us"
          title="Reasons teams keep choosing My Web Helper."
          description="The difference is in how we work — and what we refuse to compromise on."
        />
      </Reveal>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {whyChooseUs.map((reason, index) => (
          <Reveal key={reason.title} delay={index * 0.05}>
            <div className="group h-full rounded-2xl border border-ink/10 bg-paper p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-xl">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-ink text-lime transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-paper">
                <Icon name={reason.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-6 text-lg font-bold tracking-tight text-ink">{reason.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/65">{reason.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { process, technologies } from "@/lib/seed/site-content";

export function Technologies() {
  return (
    <section className="border-t border-ink/10 bg-paper py-20 lg:py-28">
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow="Technology expertise"
            title="A modern stack, chosen deliberately."
            description="We pick boring, proven tools where reliability matters and modern ones where they unlock real advantage."
          />
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div className="grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2">
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

          <Reveal delay={0.1}>
            <div className="rounded-2xl bg-ink p-8 text-paper">
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-lime">
                How we work
              </h3>
              <ol className="mt-6 space-y-6">
                {process.map((step, index) => (
                  <li key={step.step} className="flex gap-5">
                    <span className="font-display text-sm font-bold text-lime/70">{step.step}</span>
                    <div className={index < process.length - 1 ? "border-b border-paper/10 pb-6" : ""}>
                      <p className="font-display text-lg font-bold tracking-tight">{step.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-paper/60">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

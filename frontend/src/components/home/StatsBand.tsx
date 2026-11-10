import { Reveal } from "@/components/ui/Reveal";
import { stats } from "@/lib/seed/site-content";

export function StatsBand() {
  return (
    <section className="border-y border-ink/10 bg-brand-600 py-16 text-paper lg:py-20">
      <div className="shell">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.06}>
              <div className="border-l border-paper/20 pl-6">
                <p className="font-display text-5xl font-extrabold tracking-tight text-lime">
                  {stat.value}
                </p>
                <p className="mt-3 text-base font-semibold text-paper">{stat.label}</p>
                <p className="mt-1 text-sm text-paper/65">{stat.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

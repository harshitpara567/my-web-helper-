import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { img } from "@/lib/images";

const points = [
  "Senior, cross-functional teams — strategy, design and engineering in one room",
  "Performance and accessibility enforced as delivery requirements, not afterthoughts",
  "Measurement frameworks that tie every release to a business outcome"
];

const introImage = img(
  "close up of a designer and developer reviewing a website interface on a large monitor, minimal bright studio with green plant, corporate editorial photography",
  "portrait_4_3"
);

export function Intro() {
  return (
    <section className="shell py-20 lg:py-28">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <div className="relative">
            <div className="overflow-hidden rounded-[1.75rem] border border-ink/10">
              <Image
                src={introImage}
                alt="My Web Helper designer and engineer reviewing an interface"
                width={900}
                height={1200}
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 right-6 rounded-2xl border border-ink/10 bg-paper p-6 shadow-xl lg:-right-6">
              <p className="font-display text-4xl font-extrabold text-brand-600">12</p>
              <p className="text-xs font-medium text-ink/60">years of delivery</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="eyebrow">Who we are</p>
          <h2 className="mt-4 text-display-3 text-balance">
            A partner that cares about your product as much as you do.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink/70 text-pretty">
            My Web Helper exists to make digital work that is genuinely good — fast, accessible,
            beautiful and built to last. We combine the craft of a design studio with the discipline
            of a technology consultancy, so you get ideas you love and systems you can trust.
          </p>

          <ul className="mt-8 space-y-4">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-ink/75">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-500 text-paper">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <Button href="/about" variant="outline">
              More about us
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

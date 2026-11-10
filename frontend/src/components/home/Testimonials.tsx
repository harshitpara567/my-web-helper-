import Image from "next/image";
import { Star } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Testimonial } from "@/types";

export function Testimonials({ items }: { items: Testimonial[] }) {
  const [lead, ...rest] = items;

  return (
    <section id="testimonials" className="shell py-20 lg:py-28">
      <Reveal>
        <SectionHeading
          eyebrow="Testimonials"
          title="What our clients say."
          description="We'd rather let the people we work with do the talking."
        />
      </Reveal>

      <div className="mt-14 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        {lead ? (
          <Reveal>
            <figure className="flex h-full flex-col justify-between rounded-2xl bg-ink p-10 text-paper">
              <div className="flex gap-1">
                {Array.from({ length: lead.rating }).map((_, index) => (
                  <Star key={index} className="h-5 w-5 fill-lime text-lime" />
                ))}
              </div>
              <blockquote className="mt-8 font-display text-2xl font-semibold leading-snug tracking-tight text-paper lg:text-3xl">
                “{lead.quote}”
              </blockquote>
              <figcaption className="mt-10 flex items-center gap-4 border-t border-paper/10 pt-8">
                {lead.avatar ? (
                  <Image
                    src={lead.avatar}
                    alt={lead.name}
                    width={56}
                    height={56}
                    className="h-14 w-14 rounded-full object-cover"
                  />
                ) : null}
                <div>
                  <p className="font-semibold text-paper">{lead.name}</p>
                  <p className="text-sm text-paper/60">
                    {lead.role}, {lead.company}
                  </p>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ) : null}

        <div className="grid gap-6">
          {rest.slice(0, 2).map((item, index) => (
            <Reveal key={item._id} delay={index * 0.08}>
              <figure className="flex h-full flex-col rounded-2xl border border-ink/10 bg-paper p-8">
                <div className="flex gap-1">
                  {Array.from({ length: item.rating }).map((_, starIndex) => (
                    <Star key={starIndex} className="h-4 w-4 fill-lime-deep text-lime-deep" />
                  ))}
                </div>
                <blockquote className="mt-5 flex-1 leading-relaxed text-ink/80">
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  {item.avatar ? (
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      width={44}
                      height={44}
                      className="h-11 w-11 rounded-full object-cover"
                    />
                  ) : null}
                  <div>
                    <p className="text-sm font-semibold text-ink">{item.name}</p>
                    <p className="text-xs text-ink/55">
                      {item.role}, {item.company}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

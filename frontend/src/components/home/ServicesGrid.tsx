"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { Reveal, RevealGroup, revealItemVariants } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/lib/seed/services";
import type { Service } from "@/types";
import { motion } from "framer-motion";

export function ServicesGrid({ items = services }: { items?: Service[] }) {
  return (
    <section className="border-t border-ink/10 bg-paper-soft py-20 lg:py-28">
      <div className="shell">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="What we do"
              title="Capabilities that cover the full digital journey."
              description="From strategy and design through to engineering, growth and cloud — nine practices that work as one team."
            />
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-600"
            >
              All services
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((service, index) => (
            <motion.div key={service.slug} variants={revealItemVariants}>
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col bg-paper p-8 transition-colors duration-300 hover:bg-ink"
              >
                <div className="flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600 transition-colors duration-300 group-hover:bg-lime group-hover:text-ink">
                    <Icon name={service.icon} className="h-6 w-6" />
                  </span>
                  <span className="font-display text-sm font-bold text-ink/25 transition-colors duration-300 group-hover:text-paper/40">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-8 text-xl font-bold tracking-tight text-ink transition-colors duration-300 group-hover:text-paper">
                  {service.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/65 transition-colors duration-300 group-hover:text-paper/65">
                  {service.summary}
                </p>

                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 transition-colors duration-300 group-hover:text-lime">
                  Explore service
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </motion.div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { img } from "@/lib/images";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } }
};

const item = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } }
};

const heroImage = img(
  "premium modern agency workspace, designers and engineers collaborating around screens, bright minimal office with green plants, editorial corporate photography, soft natural light",
  "landscape_4_3"
);

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[38rem] bg-gradient-to-b from-brand-50/70 to-transparent"
        aria-hidden="true"
      />
      <div className="shell relative grid items-center gap-14 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <motion.div initial="hidden" animate="visible" variants={container}>
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-ink/70">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              Digital agency · Est. 2014
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-7 text-display-1 text-balance text-ink"
          >
            Digital care,
            <br />
            engineered for{" "}
            <span className="relative inline-block text-brand-600">
              growth
              <svg
                className="absolute -bottom-2 left-0 h-3 w-full text-lime"
                viewBox="0 0 200 12"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M2 9C48 3 152 3 198 9"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            .
          </motion.h1>

          <motion.p variants={item} className="mt-8 max-w-xl text-lg leading-relaxed text-ink/70">
            My Web Helper designs and engineers premium websites, mobile products and enterprise
            platforms — combining the craft of a design studio with the rigour of a technology
            consultancy.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
            <Button href="/contact" variant="dark" size="lg">
              Start a project
              <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
            <Button href="/work" variant="outline" size="lg">
              View our work
              <ArrowDownRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-0.5" />
            </Button>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-ink/10 pt-8"
          >
            <div className="flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-lime-deep text-lime-deep" />
                ))}
              </div>
              <span className="text-sm font-medium text-ink/70">4.9 average client rating</span>
            </div>
            <p className="text-sm text-ink/60">
              <span className="font-semibold text-ink">180+</span> projects delivered
            </p>
            <p className="text-sm text-ink/60">
              <span className="font-semibold text-ink">98%</span> client retention
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-[1.75rem] border border-ink/10 bg-ink/5 shadow-2xl">
            <Image
              src={heroImage}
              alt="My Web Helper team collaborating in a modern studio"
              width={1200}
              height={900}
              priority
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="h-full w-full object-cover"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="absolute -bottom-6 -left-4 w-56 rounded-2xl border border-ink/10 bg-paper p-5 shadow-xl sm:-left-8"
          >
            <p className="eyebrow">Core Web Vitals</p>
            <p className="mt-2 font-display text-3xl font-extrabold text-ink">
              0.9<span className="text-lg">s</span>
            </p>
            <p className="text-xs text-ink/60">median page load across launches</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="absolute -right-3 top-8 rounded-2xl border border-ink/10 bg-lime px-5 py-4 shadow-xl sm:-right-6"
          >
            <p className="font-display text-2xl font-extrabold text-ink">+41%</p>
            <p className="text-xs font-medium text-ink/70">avg. conversion lift</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

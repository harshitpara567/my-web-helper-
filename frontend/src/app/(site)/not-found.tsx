import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-brand-100/60 blur-3xl"
        aria-hidden="true"
      />
      <div className="shell relative flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <p className="eyebrow">Error 404</p>
        <p className="mt-4 font-display text-[clamp(5rem,18vw,12rem)] font-black leading-none tracking-tight text-ink">
          404
        </p>
        <h1 className="mt-6 max-w-2xl text-display-3 text-balance">
          We couldn&apos;t find that page.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/70 text-pretty">
          The page you&apos;re looking for may have been moved, renamed or never existed. Let&apos;s
          get you back on track.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button href="/" variant="primary" size="lg">
            Back to home
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Button>
          <Button href="/contact" variant="outline" size="lg">
            Contact us
          </Button>
        </div>
        <p className="mt-8 text-sm text-ink/50">
          Or explore our{" "}
          <Link href="/insights" className="font-medium text-brand-600 underline underline-offset-4">
            latest insights
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

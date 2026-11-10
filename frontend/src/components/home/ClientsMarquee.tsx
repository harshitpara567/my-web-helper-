import { Marquee } from "@/components/ui/Marquee";
import { clients } from "@/lib/seed/site-content";

export function ClientsMarquee() {
  return (
    <section className="border-y border-ink/10 bg-paper py-12" aria-label="Selected clients">
      <div className="shell mb-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.28em] text-ink/40">
          Trusted by teams building at scale
        </p>
      </div>
      <Marquee items={clients} />
    </section>
  );
}

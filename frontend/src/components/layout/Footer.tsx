import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { NewsletterForm } from "@/components/layout/NewsletterForm";
import { footerColumns, siteConfig } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      <div className="grain pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="shell relative py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo tone="light" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-paper/60">
              {siteConfig.description}
            </p>
            <p className="mt-6 text-sm font-semibold text-paper/80">
              {siteConfig.tagline}
            </p>
            <NewsletterForm />
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-lime">
                {column.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.href}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-paper/65 transition-colors hover:text-paper"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-6 border-t border-paper/10 pt-10 sm:grid-cols-3">
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-3 text-sm text-paper/70 transition-colors hover:text-paper"
          >
            <Mail className="h-4 w-4 text-lime" />
            {siteConfig.email}
          </a>
          <a
            href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
            className="flex items-center gap-3 text-sm text-paper/70 transition-colors hover:text-paper"
          >
            <Phone className="h-4 w-4 text-lime" />
            {siteConfig.phone}
          </a>
          <p className="flex items-start gap-3 text-sm text-paper/70">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-lime" />
            {siteConfig.address}
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-6 border-t border-paper/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-paper/50">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            {siteConfig.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-paper/60 transition-colors hover:text-lime"
              >
                {social.label}
                <ArrowUpRight className="h-3 w-3" />
              </a>
            ))}
            <Link
              href="/admin/login"
              className="text-xs font-medium text-paper/40 transition-colors hover:text-paper/70"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

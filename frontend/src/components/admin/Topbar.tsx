"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, LogOut, Menu } from "lucide-react";
import { useAdmin } from "./AuthProvider";

const pageTitles: { match: (pathname: string) => boolean; title: string }[] = [
  { match: (p) => p === "/admin", title: "Overview" },
  { match: (p) => p.startsWith("/admin/enquiries"), title: "Enquiries" },
  { match: (p) => p.startsWith("/admin/blogs"), title: "Blogs" },
  { match: (p) => p.startsWith("/admin/portfolio"), title: "Portfolio" },
  { match: (p) => p.startsWith("/admin/testimonials"), title: "Testimonials" },
  { match: (p) => p.startsWith("/admin/categories"), title: "Categories" }
];

function initials(name?: string) {
  if (!name) return "A";
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const pathname = usePathname();
  const { admin, logout } = useAdmin();
  const title = pageTitles.find((entry) => entry.match(pathname))?.title ?? "Dashboard";

  return (
    <header className="sticky top-0 z-30 border-b border-ink/10 bg-paper/90 backdrop-blur-xl">
      <div className="flex items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open menu"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-ink/10 text-ink transition-colors hover:border-ink lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="min-w-0 flex-1">
          <h1 className="truncate font-display text-xl font-bold tracking-tight text-ink">{title}</h1>
          <p className="hidden truncate text-xs text-ink/50 sm:block">My Web Helper · Admin console</p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-1.5 rounded-full border border-ink/15 px-3.5 py-2 text-sm font-medium text-ink/75 transition-colors hover:border-ink hover:text-ink sm:inline-flex"
          >
            View site
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>

          <div className="hidden items-center gap-2 rounded-full border border-ink/10 bg-paper-soft px-3 py-1.5 md:flex">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-ink text-[0.65rem] font-bold text-paper">
              {initials(admin?.name)}
            </span>
            <span className="max-w-[10rem] truncate text-sm font-medium text-ink">
              {admin?.name ?? "Admin"}
            </span>
          </div>

          <button
            type="button"
            onClick={logout}
            aria-label="Log out"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-ink/10 text-ink/70 transition-colors hover:border-ink hover:text-ink"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}

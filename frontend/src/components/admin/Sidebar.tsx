"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  FileText,
  Inbox,
  LayoutDashboard,
  LogOut,
  Quote,
  Tags,
  X,
  type LucideIcon
} from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { cn } from "@/lib/utils";
import { useAdmin } from "./AuthProvider";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  exact?: boolean;
}

const navItems: NavItem[] = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard, exact: true },
  { label: "Enquiries", href: "/admin/enquiries", icon: Inbox },
  { label: "Blogs", href: "/admin/blogs", icon: FileText },
  { label: "Portfolio", href: "/admin/portfolio", icon: Briefcase },
  { label: "Testimonials", href: "/admin/testimonials", icon: Quote },
  { label: "Categories", href: "/admin/categories", icon: Tags }
];

function isActive(pathname: string, item: NavItem) {
  if (item.exact) return pathname === item.href;
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const { logout } = useAdmin();

  return (
    <div className="flex h-full flex-col">
      <div className="px-6 py-6">
        <Logo tone="light" />
      </div>

      <nav aria-label="Admin navigation" className="flex-1 space-y-1 overflow-y-auto px-3">
        {navItems.map((item) => {
          const active = isActive(pathname, item);
          const ItemIcon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-lime text-ink"
                  : "text-paper/65 hover:bg-paper/10 hover:text-paper"
              )}
            >
              <ItemIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-paper/10 p-3">
        <button
          type="button"
          onClick={() => {
            onNavigate?.();
            logout();
          }}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-paper/65 transition-colors hover:bg-paper/10 hover:text-paper"
        >
          <LogOut className="h-5 w-5 shrink-0" aria-hidden="true" />
          Log out
        </button>
      </div>
    </div>
  );
}

export function Sidebar({
  mobileOpen,
  onClose
}: {
  mobileOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 bg-ink lg:block">
        <SidebarContent />
      </aside>

      <AnimatePresence>
        {mobileOpen ? (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              className="absolute inset-0 bg-ink/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              aria-hidden="true"
            />
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label="Admin navigation"
              className="absolute inset-y-0 left-0 w-72 bg-ink"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="absolute right-3 top-5 grid h-9 w-9 place-items-center rounded-full text-paper/60 transition-colors hover:bg-paper/10 hover:text-paper"
              >
                <X className="h-4 w-4" />
              </button>
              <SidebarContent onNavigate={onClose} />
            </motion.aside>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Briefcase, FileText, Inbox, Mail, Quote, Tags } from "lucide-react";
import { fetchDashboardStats } from "@/services/api.service";
import { getErrorMessage } from "@/services/http";
import type { DashboardStats, Enquiry } from "@/types";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { ErrorBanner } from "@/components/admin/ErrorBanner";
import { Loader } from "@/components/admin/Loader";
import { StatCard } from "@/components/admin/StatCard";
import { StatusPill } from "@/components/admin/StatusPill";
import { formatDate } from "@/lib/utils";

const recentColumns: Column<Enquiry>[] = [
  {
    key: "name",
    header: "Contact",
    render: (row) => (
      <div>
        <p className="font-medium text-ink">{row.name}</p>
        <p className="text-xs text-ink/50">{row.email}</p>
      </div>
    )
  },
  { key: "service", header: "Service", render: (row) => row.service || "—" },
  { key: "status", header: "Status", render: (row) => <StatusPill status={row.status} /> },
  { key: "createdAt", header: "Received", render: (row) => formatDate(row.createdAt) }
];

const quickLinks = [
  { label: "Review enquiries", description: "Triage new inbound leads.", href: "/admin/enquiries", icon: Inbox },
  { label: "Manage blogs", description: "Draft, publish and edit insights.", href: "/admin/blogs", icon: FileText },
  { label: "Manage portfolio", description: "Showcase your latest projects.", href: "/admin/portfolio", icon: Briefcase },
  { label: "Manage testimonials", description: "Curate client social proof.", href: "/admin/testimonials", icon: Quote },
  { label: "Manage categories", description: "Organise blog and portfolio tags.", href: "/admin/categories", icon: Tags }
];

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setStats(await fetchDashboardStats());
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  if (loading) return <Loader label="Loading dashboard…" />;
  if (error && !stats) return <ErrorBanner message={error} onRetry={() => void load()} />;
  if (!stats) return null;

  const cards = [
    { icon: Inbox, label: "Total Enquiries", value: stats.totalEnquiries, hint: "All time" },
    { icon: Mail, label: "New Enquiries", value: stats.newEnquiries, hint: "Awaiting triage" },
    {
      icon: FileText,
      label: "Published Blogs",
      value: `${stats.publishedBlogs} / ${stats.totalBlogs}`,
      hint: "Published of total"
    },
    { icon: Briefcase, label: "Portfolio Projects", value: stats.totalPortfolio, hint: "Case studies" },
    { icon: Quote, label: "Testimonials", value: stats.totalTestimonials, hint: "Client quotes" }
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {cards.map((card) => (
          <StatCard key={card.label} icon={card.icon} label={card.label} value={card.value} hint={card.hint} />
        ))}
      </div>

      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display text-lg font-bold tracking-tight text-ink">Recent enquiries</h2>
          <Link
            href="/admin/enquiries"
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            View all
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
        <DataTable
          columns={recentColumns}
          rows={stats.recentEnquiries}
          getRowKey={(row) => row._id}
          emptyTitle="No enquiries yet"
          emptyDescription="New enquiries from the contact form will appear here."
        />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-display text-lg font-bold tracking-tight text-ink">Quick links</h2>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {quickLinks.map((link) => {
            const LinkIcon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-start gap-3 rounded-2xl border border-ink/10 bg-paper p-4 transition-colors hover:border-ink/25"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-paper-soft text-brand-600">
                  <LinkIcon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="flex items-center gap-1 font-semibold text-ink">
                    {link.label}
                    <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                  </span>
                  <span className="mt-0.5 block text-sm text-ink/55">{link.description}</span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

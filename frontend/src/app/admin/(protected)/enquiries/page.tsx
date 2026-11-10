"use client";

import { useCallback, useEffect, useState } from "react";
import { Eye, Search, Trash2 } from "lucide-react";
import { deleteEnquiry, fetchEnquiries, updateEnquiryStatus } from "@/services/api.service";
import { getErrorMessage } from "@/services/http";
import { cn, formatDate } from "@/lib/utils";
import type { Enquiry, ServiceStatus } from "@/types";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { ErrorBanner } from "@/components/admin/ErrorBanner";
import { Modal } from "@/components/admin/Modal";
import { StatusPill } from "@/components/admin/StatusPill";
import { Toast, type ToastMessage } from "@/components/admin/Toast";
import { Select, inputClasses } from "@/components/ui/form";

type Filter = "all" | ServiceStatus;

const statusFilters: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "new", label: "New" },
  { value: "read", label: "Read" },
  { value: "in-progress", label: "In progress" },
  { value: "closed", label: "Closed" }
];

const statusOptions: ServiceStatus[] = ["new", "read", "in-progress", "closed"];

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-ink/45">{label}</dt>
      <dd className="text-sm text-ink">{value}</dd>
    </div>
  );
}

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Enquiry | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Enquiry | null>(null);
  const [notice, setNotice] = useState<ToastMessage | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setQuery(search.trim()), 350);
    return () => clearTimeout(timer);
  }, [search]);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setEnquiries(
        await fetchEnquiries({
          status: status === "all" ? undefined : status,
          search: query || undefined
        })
      );
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [status, query]);

  useEffect(() => {
    void load();
  }, [load]);

  async function changeStatus(enquiry: Enquiry, next: ServiceStatus) {
    try {
      await updateEnquiryStatus(enquiry._id, next);
      setNotice({ type: "success", text: `Enquiry marked as ${next}` });
      await load();
    } catch (err) {
      setNotice({ type: "error", text: getErrorMessage(err) });
    }
  }

  const columns: Column<Enquiry>[] = [
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
    { key: "company", header: "Company", render: (row) => row.company || "—" },
    { key: "service", header: "Service", render: (row) => row.service || "—" },
    {
      key: "status",
      header: "Status",
      render: (row) => (
        <div className="flex items-center gap-2">
          <StatusPill status={row.status} />
          <label className="sr-only" htmlFor={`status-${row._id}`}>
            Update status for {row.name}
          </label>
          <Select
            id={`status-${row._id}`}
            value={row.status}
            onChange={(event) => void changeStatus(row, event.target.value as ServiceStatus)}
            className="w-auto py-1.5 pr-8 text-xs"
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </div>
      )
    },
    { key: "createdAt", header: "Date", render: (row) => formatDate(row.createdAt) },
    {
      key: "actions",
      header: "",
      align: "right",
      render: (row) => (
        <div className="flex items-center justify-end gap-1">
          <button
            type="button"
            onClick={() => setSelected(row)}
            aria-label={`View enquiry from ${row.name}`}
            className="grid h-8 w-8 place-items-center rounded-lg text-ink/55 transition-colors hover:bg-ink/5 hover:text-ink"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setPendingDelete(row)}
            aria-label={`Delete enquiry from ${row.name}`}
            className="grid h-8 w-8 place-items-center rounded-lg text-ink/55 transition-colors hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {statusFilters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => setStatus(filter.value)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                status === filter.value
                  ? "border-ink bg-ink text-paper"
                  : "border-ink/15 text-ink/70 hover:border-ink/40 hover:text-ink"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <div className="relative lg:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" aria-hidden="true" />
          <label htmlFor="enquiry-search" className="sr-only">
            Search enquiries
          </label>
          <input
            id="enquiry-search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search name, email, company…"
            className={cn(inputClasses, "pl-9")}
          />
        </div>
      </div>

      {error ? (
        <ErrorBanner message={error} onRetry={() => void load()} />
      ) : (
        <DataTable
          columns={columns}
          rows={enquiries}
          loading={loading}
          getRowKey={(row) => row._id}
          emptyTitle="No enquiries found"
          emptyDescription="Try adjusting your filters or search terms."
        />
      )}

      <Modal open={Boolean(selected)} onClose={() => setSelected(null)} title="Enquiry details">
        {selected ? (
          <div className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Detail label="Name" value={selected.name} />
              <Detail label="Email" value={selected.email} />
              <Detail label="Company" value={selected.company || "—"} />
              <Detail label="Phone" value={selected.phone || "—"} />
              <Detail label="Service" value={selected.service || "—"} />
              <Detail label="Budget" value={selected.budget || "—"} />
              <Detail label="Received" value={formatDate(selected.createdAt)} />
              <div className="flex flex-col gap-1">
                <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-ink/45">Status</dt>
                <dd>
                  <StatusPill status={selected.status} />
                </dd>
              </div>
            </div>
            <div className="flex flex-col gap-1 border-t border-ink/10 pt-4">
              <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-ink/45">Message</dt>
              <dd className="whitespace-pre-line text-sm text-ink/80">{selected.message}</dd>
            </div>
            <a
              href={`mailto:${selected.email}`}
              className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
            >
              Reply via email
            </a>
          </div>
        ) : null}
      </Modal>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        onClose={() => setPendingDelete(null)}
        onConfirm={async () => {
          if (!pendingDelete) return;
          await deleteEnquiry(pendingDelete._id);
          setNotice({ type: "success", text: "Enquiry deleted" });
          await load();
        }}
        title="Delete enquiry"
        message={`This will permanently remove the enquiry from ${pendingDelete?.name ?? "this contact"}. This action cannot be undone.`}
        confirmLabel="Delete"
      />

      <Toast message={notice} onDismiss={() => setNotice(null)} />
    </div>
  );
}

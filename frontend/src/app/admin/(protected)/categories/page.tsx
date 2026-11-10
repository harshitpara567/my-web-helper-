"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Pencil, Plus, Tags, Trash2 } from "lucide-react";
import {
  createCategory,
  deleteCategory,
  fetchCategories,
  updateCategory
} from "@/services/api.service";
import { getErrorMessage } from "@/services/http";
import { cn } from "@/lib/utils";
import type { Category, CategoryType } from "@/types";
import { CategoryForm } from "@/components/admin/CategoryForm";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { ErrorBanner } from "@/components/admin/ErrorBanner";
import { Toast, type ToastMessage } from "@/components/admin/Toast";
import { Button } from "@/components/ui/Button";

type Filter = "all" | CategoryType;

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "blog", label: "Blog" },
  { value: "portfolio", label: "Portfolio" }
];

function TypePill({ type }: { type: CategoryType }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold",
        type === "blog"
          ? "border-brand-200 bg-brand-50 text-brand-700"
          : "border-ink/15 bg-ink/5 text-ink/70"
      )}
    >
      {type === "blog" ? "Blog" : "Portfolio"}
    </span>
  );
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Category | null>(null);
  const [notice, setNotice] = useState<ToastMessage | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setCategories(await fetchCategories());
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const rows = useMemo(
    () => (filter === "all" ? categories : categories.filter((item) => item.type === filter)),
    [categories, filter]
  );

  const columns: Column<Category>[] = [
    {
      key: "name",
      header: "Name",
      render: (row) => <span className="font-medium text-ink">{row.name}</span>
    },
    { key: "slug", header: "Slug", render: (row) => <span className="text-ink/60">{row.slug}</span> },
    { key: "type", header: "Type", render: (row) => <TypePill type={row.type} /> },
    {
      key: "description",
      header: "Description",
      render: (row) => <span className="text-ink/60">{row.description || "—"}</span>
    },
    {
      key: "actions",
      header: "",
      align: "right",
      render: (row) => (
        <div className="flex items-center justify-end gap-1">
          <button
            type="button"
            onClick={() => {
              setEditing(row);
              setFormOpen(true);
            }}
            aria-label={`Edit ${row.name}`}
            className="grid h-8 w-8 place-items-center rounded-lg text-ink/55 transition-colors hover:bg-ink/5 hover:text-ink"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setPendingDelete(row)}
            aria-label={`Delete ${row.name}`}
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
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {filters.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setFilter(item.value)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                filter === item.value
                  ? "border-ink bg-ink text-paper"
                  : "border-ink/15 text-ink/70 hover:border-ink/40 hover:text-ink"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        <Button
          type="button"
          variant="dark"
          onClick={() => {
            setEditing(null);
            setFormOpen(true);
          }}
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          New category
        </Button>
      </div>

      {error ? (
        <ErrorBanner message={error} onRetry={() => void load()} />
      ) : (
        <DataTable
          columns={columns}
          rows={rows}
          loading={loading}
          getRowKey={(row) => row._id}
          emptyTitle="No categories found"
          emptyDescription="Create categories to organise your blog and portfolio content."
          emptyIcon={Tags}
        />
      )}

      <CategoryForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        initial={editing}
        onSubmit={async (payload) => {
          if (editing) {
            await updateCategory(editing._id, payload);
            setNotice({ type: "success", text: "Category updated" });
          } else {
            await createCategory(payload);
            setNotice({ type: "success", text: "Category created" });
          }
          await load();
        }}
      />

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        onClose={() => setPendingDelete(null)}
        onConfirm={async () => {
          if (!pendingDelete) return;
          await deleteCategory(pendingDelete._id);
          setNotice({ type: "success", text: "Category deleted" });
          await load();
        }}
        title="Delete category"
        message={`This will permanently delete “${pendingDelete?.name ?? "this category"}”. This action cannot be undone.`}
        confirmLabel="Delete"
      />

      <Toast message={notice} onDismiss={() => setNotice(null)} />
    </div>
  );
}

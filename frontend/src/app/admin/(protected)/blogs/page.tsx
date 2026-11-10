"use client";

import { useCallback, useEffect, useState } from "react";
import { Eye, EyeOff, Pencil, Plus, Trash2 } from "lucide-react";
import {
  createBlog,
  deleteBlog,
  fetchAdminBlogs,
  toggleBlogPublish,
  updateBlog
} from "@/services/api.service";
import { getErrorMessage } from "@/services/http";
import { formatDate } from "@/lib/utils";
import type { Blog } from "@/types";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { BlogForm } from "@/components/admin/BlogForm";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { ErrorBanner } from "@/components/admin/ErrorBanner";
import { Toast, type ToastMessage } from "@/components/admin/Toast";
import { Button } from "@/components/ui/Button";

function BlogStatusPill({ status }: { status: Blog["status"] }) {
  return (
    <span
      className={
        status === "published"
          ? "inline-flex items-center rounded-full border border-brand-200 bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700"
          : "inline-flex items-center rounded-full border border-ink/15 bg-ink/5 px-2.5 py-1 text-xs font-semibold text-ink/60"
      }
    >
      {status === "published" ? "Published" : "Draft"}
    </span>
  );
}

function categoryLabel(blog: Blog): string {
  if (!blog.category) return "—";
  return typeof blog.category === "string" ? blog.category : blog.category.name;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Blog | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Blog | null>(null);
  const [notice, setNotice] = useState<ToastMessage | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setBlogs(await fetchAdminBlogs());
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  function openCreate() {
    setEditing(null);
    setFormOpen(true);
  }

  function openEdit(blog: Blog) {
    setEditing(blog);
    setFormOpen(true);
  }

  async function togglePublish(blog: Blog) {
    try {
      await toggleBlogPublish(blog._id);
      setNotice({
        type: "success",
        text: blog.status === "published" ? "Post unpublished" : "Post published"
      });
      await load();
    } catch (err) {
      setNotice({ type: "error", text: getErrorMessage(err) });
    }
  }

  const columns: Column<Blog>[] = [
    {
      key: "title",
      header: "Title",
      render: (row) => (
        <div className="max-w-md">
          <p className="font-medium text-ink">{row.title}</p>
          <p className="truncate text-xs text-ink/50">{row.excerpt}</p>
        </div>
      )
    },
    { key: "category", header: "Category", render: categoryLabel },
    { key: "status", header: "Status", render: (row) => <BlogStatusPill status={row.status} /> },
    {
      key: "publishedAt",
      header: "Published",
      render: (row) => (row.publishedAt ? formatDate(row.publishedAt) : "—")
    },
    {
      key: "actions",
      header: "",
      align: "right",
      render: (row) => (
        <div className="flex items-center justify-end gap-1">
          <button
            type="button"
            onClick={() => openEdit(row)}
            aria-label={`Edit ${row.title}`}
            className="grid h-8 w-8 place-items-center rounded-lg text-ink/55 transition-colors hover:bg-ink/5 hover:text-ink"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => void togglePublish(row)}
            aria-label={row.status === "published" ? `Unpublish ${row.title}` : `Publish ${row.title}`}
            className="grid h-8 w-8 place-items-center rounded-lg text-ink/55 transition-colors hover:bg-ink/5 hover:text-ink"
          >
            {row.status === "published" ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={() => setPendingDelete(row)}
            aria-label={`Delete ${row.title}`}
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
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-ink/55">
          {loading ? "Loading…" : `${blogs.length} post${blogs.length === 1 ? "" : "s"}`}
        </p>
        <Button type="button" variant="dark" onClick={openCreate}>
          <Plus className="h-4 w-4" aria-hidden="true" />
          New blog
        </Button>
      </div>

      {error ? (
        <ErrorBanner message={error} onRetry={() => void load()} />
      ) : (
        <DataTable
          columns={columns}
          rows={blogs}
          loading={loading}
          getRowKey={(row) => row._id}
          emptyTitle="No blog posts yet"
          emptyDescription="Create your first insight to get started."
        />
      )}

      <BlogForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        initial={editing}
        onSubmit={async (payload) => {
          if (editing) {
            await updateBlog(editing._id, payload);
            setNotice({ type: "success", text: "Blog post updated" });
          } else {
            await createBlog(payload);
            setNotice({ type: "success", text: "Blog post created" });
          }
          await load();
        }}
      />

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        onClose={() => setPendingDelete(null)}
        onConfirm={async () => {
          if (!pendingDelete) return;
          await deleteBlog(pendingDelete._id);
          setNotice({ type: "success", text: "Blog post deleted" });
          await load();
        }}
        title="Delete blog post"
        message={`This will permanently delete “${pendingDelete?.title ?? "this post"}”. This action cannot be undone.`}
        confirmLabel="Delete"
      />

      <Toast message={notice} onDismiss={() => setNotice(null)} />
    </div>
  );
}

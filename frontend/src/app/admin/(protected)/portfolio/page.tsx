"use client";

import { useCallback, useEffect, useState } from "react";
import { ImageOff, Pencil, Plus, Star, Trash2 } from "lucide-react";
import {
  createPortfolio,
  deletePortfolio,
  fetchPortfolio,
  updatePortfolio
} from "@/services/api.service";
import { getErrorMessage } from "@/services/http";
import type { Portfolio } from "@/types";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { ErrorBanner } from "@/components/admin/ErrorBanner";
import { EmptyState } from "@/components/admin/EmptyState";
import { Loader } from "@/components/admin/Loader";
import { PortfolioForm } from "@/components/admin/PortfolioForm";
import { Toast, type ToastMessage } from "@/components/admin/Toast";
import { Button } from "@/components/ui/Button";

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Portfolio | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Portfolio | null>(null);
  const [notice, setNotice] = useState<ToastMessage | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setProjects(await fetchPortfolio());
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-ink/55">
          {loading ? "Loading…" : `${projects.length} project${projects.length === 1 ? "" : "s"}`}
        </p>
        <Button
          type="button"
          variant="dark"
          onClick={() => {
            setEditing(null);
            setFormOpen(true);
          }}
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          New project
        </Button>
      </div>

      {error ? <ErrorBanner message={error} onRetry={() => void load()} /> : null}

      {!error && loading ? <Loader label="Loading projects…" /> : null}

      {!error && !loading && projects.length === 0 ? (
        <EmptyState
          title="No projects yet"
          description="Add your first case study to showcase on the portfolio."
          icon={ImageOff}
          action={
            <Button
              type="button"
              variant="dark"
              size="sm"
              onClick={() => {
                setEditing(null);
                setFormOpen(true);
              }}
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              New project
            </Button>
          }
        />
      ) : null}

      {!error && !loading && projects.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project._id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-paper"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-paper-soft">
                {project.coverImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <span className="grid h-full w-full place-items-center text-ink/30">
                    <ImageOff className="h-6 w-6" aria-hidden="true" />
                  </span>
                )}
                {project.featured ? (
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-lime px-2.5 py-1 text-xs font-semibold text-ink">
                    <Star className="h-3 w-3 fill-ink" aria-hidden="true" />
                    Featured
                  </span>
                ) : null}
              </div>

              <div className="flex flex-1 flex-col gap-3 p-4">
                <div>
                  <p className="font-display text-base font-bold tracking-tight text-ink">{project.title}</p>
                  <p className="text-sm text-ink/55">{project.client}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-ink/55">
                  <span className="rounded-full border border-ink/10 bg-paper-soft px-2.5 py-1 font-medium">
                    {project.category}
                  </span>
                  <span className="rounded-full border border-ink/10 bg-paper-soft px-2.5 py-1 font-medium">
                    {project.year}
                  </span>
                </div>
                <div className="mt-auto flex items-center justify-end gap-1 border-t border-ink/5 pt-3">
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(project);
                      setFormOpen(true);
                    }}
                    aria-label={`Edit ${project.title}`}
                    className="grid h-8 w-8 place-items-center rounded-lg text-ink/55 transition-colors hover:bg-ink/5 hover:text-ink"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPendingDelete(project)}
                    aria-label={`Delete ${project.title}`}
                    className="grid h-8 w-8 place-items-center rounded-lg text-ink/55 transition-colors hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : null}

      <PortfolioForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        initial={editing}
        onSubmit={async (payload) => {
          if (editing) {
            await updatePortfolio(editing._id, payload);
            setNotice({ type: "success", text: "Project updated" });
          } else {
            await createPortfolio(payload);
            setNotice({ type: "success", text: "Project created" });
          }
          await load();
        }}
      />

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        onClose={() => setPendingDelete(null)}
        onConfirm={async () => {
          if (!pendingDelete) return;
          await deletePortfolio(pendingDelete._id);
          setNotice({ type: "success", text: "Project deleted" });
          await load();
        }}
        title="Delete project"
        message={`This will permanently delete “${pendingDelete?.title ?? "this project"}”. This action cannot be undone.`}
        confirmLabel="Delete"
      />

      <Toast message={notice} onDismiss={() => setNotice(null)} />
    </div>
  );
}

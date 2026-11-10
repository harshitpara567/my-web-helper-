"use client";

import { useCallback, useEffect, useState } from "react";
import { Pencil, Plus, Quote, Star, Trash2, UserRound } from "lucide-react";
import {
  createTestimonial,
  deleteTestimonial,
  fetchTestimonials,
  updateTestimonial
} from "@/services/api.service";
import { getErrorMessage } from "@/services/http";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { EmptyState } from "@/components/admin/EmptyState";
import { ErrorBanner } from "@/components/admin/ErrorBanner";
import { Loader } from "@/components/admin/Loader";
import { TestimonialForm } from "@/components/admin/TestimonialForm";
import { Toast, type ToastMessage } from "@/components/admin/Toast";
import { Button } from "@/components/ui/Button";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={value}
          className={cn("h-3.5 w-3.5", value <= rating ? "fill-lime-deep text-lime-deep" : "text-ink/20")}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Testimonial | null>(null);
  const [notice, setNotice] = useState<ToastMessage | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setTestimonials(await fetchTestimonials());
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function toggleFeatured(item: Testimonial) {
    try {
      await updateTestimonial(item._id, { featured: !item.featured });
      setNotice({ type: "success", text: item.featured ? "Removed from featured" : "Marked as featured" });
      await load();
    } catch (err) {
      setNotice({ type: "error", text: getErrorMessage(err) });
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-ink/55">
          {loading ? "Loading…" : `${testimonials.length} testimonial${testimonials.length === 1 ? "" : "s"}`}
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
          New testimonial
        </Button>
      </div>

      {error ? <ErrorBanner message={error} onRetry={() => void load()} /> : null}
      {!error && loading ? <Loader label="Loading testimonials…" /> : null}

      {!error && !loading && testimonials.length === 0 ? (
        <EmptyState
          title="No testimonials yet"
          description="Add client quotes to build trust with prospective customers."
          icon={Quote}
        />
      ) : null}

      {!error && !loading && testimonials.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((item) => (
            <article
              key={item._id}
              className="flex flex-col gap-4 rounded-2xl border border-ink/10 bg-paper p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {item.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.avatar}
                      alt={item.name}
                      loading="lazy"
                      className="h-11 w-11 rounded-full object-cover"
                    />
                  ) : (
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-paper-soft text-ink/40">
                      <UserRound className="h-5 w-5" aria-hidden="true" />
                    </span>
                  )}
                  <div>
                    <p className="font-semibold text-ink">{item.name}</p>
                    <p className="text-xs text-ink/55">
                      {item.role} · {item.company}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => void toggleFeatured(item)}
                  aria-pressed={item.featured}
                  aria-label={item.featured ? `Unfeature ${item.name}` : `Feature ${item.name}`}
                  className={cn(
                    "grid h-8 w-8 shrink-0 place-items-center rounded-lg transition-colors",
                    item.featured ? "bg-lime text-ink" : "text-ink/40 hover:bg-ink/5 hover:text-ink"
                  )}
                >
                  <Star className={cn("h-4 w-4", item.featured && "fill-ink")} aria-hidden="true" />
                </button>
              </div>

              <Stars rating={item.rating} />

              <p className="text-sm text-ink/75">“{item.quote}”</p>

              <div className="mt-auto flex items-center justify-between gap-2 border-t border-ink/5 pt-3">
                <span className="text-xs font-medium text-ink/45">Order #{item.order}</span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(item);
                      setFormOpen(true);
                    }}
                    aria-label={`Edit ${item.name}`}
                    className="grid h-8 w-8 place-items-center rounded-lg text-ink/55 transition-colors hover:bg-ink/5 hover:text-ink"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPendingDelete(item)}
                    aria-label={`Delete ${item.name}`}
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

      <TestimonialForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        initial={editing}
        onSubmit={async (payload) => {
          if (editing) {
            await updateTestimonial(editing._id, payload);
            setNotice({ type: "success", text: "Testimonial updated" });
          } else {
            await createTestimonial(payload);
            setNotice({ type: "success", text: "Testimonial created" });
          }
          await load();
        }}
      />

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        onClose={() => setPendingDelete(null)}
        onConfirm={async () => {
          if (!pendingDelete) return;
          await deleteTestimonial(pendingDelete._id);
          setNotice({ type: "success", text: "Testimonial deleted" });
          await load();
        }}
        title="Delete testimonial"
        message={`This will permanently delete ${pendingDelete?.name ?? "this testimonial"}'s quote. This action cannot be undone.`}
        confirmLabel="Delete"
      />

      <Toast message={notice} onDismiss={() => setNotice(null)} />
    </div>
  );
}

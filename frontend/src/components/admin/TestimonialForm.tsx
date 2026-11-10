"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { Field, Input, Select, Textarea } from "@/components/ui/form";
import { getErrorMessage } from "@/services/http";
import { testimonialSchema, type TestimonialFormValues } from "@/lib/validations";
import type { Testimonial } from "@/types";
import { ErrorBanner } from "./ErrorBanner";
import { Modal } from "./Modal";

export function TestimonialForm({
  open,
  onClose,
  initial,
  onSubmit
}: {
  open: boolean;
  onClose: () => void;
  initial?: Testimonial | null;
  onSubmit: (payload: Partial<Testimonial>) => Promise<void>;
}) {
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      name: "",
      role: "",
      company: "",
      quote: "",
      rating: 5,
      featured: false,
      order: 0,
      avatar: ""
    }
  });

  useEffect(() => {
    if (!open) return;
    setServerError("");
    reset({
      name: initial?.name ?? "",
      role: initial?.role ?? "",
      company: initial?.company ?? "",
      quote: initial?.quote ?? "",
      rating: initial?.rating ?? 5,
      featured: initial?.featured ?? false,
      order: initial?.order ?? 0,
      avatar: initial?.avatar ?? ""
    });
  }, [open, initial, reset]);

  async function submit(values: TestimonialFormValues) {
    setServerError("");
    try {
      const payload: Partial<Testimonial> = {
        name: values.name,
        role: values.role,
        company: values.company,
        quote: values.quote,
        rating: values.rating,
        featured: values.featured,
        order: values.order,
        avatar: values.avatar?.trim() || undefined
      };
      await onSubmit(payload);
      onClose();
    } catch (error) {
      setServerError(getErrorMessage(error));
    }
  }

  return (
    <Modal open={open} onClose={onClose} title={initial ? "Edit testimonial" : "New testimonial"}>
      <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4" noValidate>
        {serverError ? <ErrorBanner message={serverError} /> : null}

        <Field label="Name" htmlFor="testimonial-name" error={errors.name?.message} required>
          <Input id="testimonial-name" placeholder="Jordan Lee" {...register("name")} />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Role" htmlFor="testimonial-role" error={errors.role?.message} required>
            <Input id="testimonial-role" placeholder="Head of Product" {...register("role")} />
          </Field>
          <Field label="Company" htmlFor="testimonial-company" error={errors.company?.message} required>
            <Input id="testimonial-company" placeholder="Northwind Retail" {...register("company")} />
          </Field>
        </div>

        <Field label="Quote" htmlFor="testimonial-quote" error={errors.quote?.message} required>
          <Textarea id="testimonial-quote" className="min-h-[8rem]" {...register("quote")} />
        </Field>

        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Rating" htmlFor="testimonial-rating" error={errors.rating?.message} required>
            <Select id="testimonial-rating" {...register("rating", { valueAsNumber: true })}>
              {[5, 4, 3, 2, 1].map((value) => (
                <option key={value} value={value}>
                  {value} star{value > 1 ? "s" : ""}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Order" htmlFor="testimonial-order" error={errors.order?.message} required>
            <Input id="testimonial-order" type="number" inputMode="numeric" {...register("order", { valueAsNumber: true })} />
          </Field>
          <Field label="Avatar URL" htmlFor="testimonial-avatar" error={errors.avatar?.message}>
            <Input id="testimonial-avatar" type="url" placeholder="https://…" {...register("avatar")} />
          </Field>
        </div>

        <label htmlFor="testimonial-featured" className="flex items-center gap-3 text-sm font-medium text-ink">
          <input
            id="testimonial-featured"
            type="checkbox"
            className="h-4 w-4 rounded border-ink/30 text-brand-500 focus:ring-brand-500/30"
            {...register("featured")}
          />
          Feature this testimonial
        </label>

        <div className="flex items-center justify-end gap-3 pt-1">
          <Button type="button" variant="ghost" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" variant="dark" disabled={isSubmitting}>
            {isSubmitting ? "Saving…" : initial ? "Save changes" : "Create testimonial"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

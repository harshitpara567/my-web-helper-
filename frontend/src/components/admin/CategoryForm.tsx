"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { Field, Input, Select, Textarea } from "@/components/ui/form";
import { getErrorMessage } from "@/services/http";
import { slugify } from "@/lib/utils";
import { categorySchema, type CategoryFormValues } from "@/lib/validations";
import type { Category } from "@/types";
import { ErrorBanner } from "./ErrorBanner";
import { Modal } from "./Modal";

export function CategoryForm({
  open,
  onClose,
  initial,
  onSubmit
}: {
  open: boolean;
  onClose: () => void;
  initial?: Category | null;
  onSubmit: (payload: Partial<Category>) => Promise<void>;
}) {
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: "", slug: "", type: "blog", description: "" }
  });

  useEffect(() => {
    if (!open) return;
    setServerError("");
    reset({
      name: initial?.name ?? "",
      slug: initial?.slug ?? "",
      type: initial?.type ?? "blog",
      description: initial?.description ?? ""
    });
  }, [open, initial, reset]);

  async function submit(values: CategoryFormValues) {
    setServerError("");
    try {
      const payload: Partial<Category> = {
        name: values.name,
        slug: values.slug?.trim() ? values.slug : slugify(values.name),
        type: values.type,
        description: values.description?.trim() || undefined
      };
      await onSubmit(payload);
      onClose();
    } catch (error) {
      setServerError(getErrorMessage(error));
    }
  }

  return (
    <Modal open={open} onClose={onClose} title={initial ? "Edit category" : "New category"} size="sm">
      <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4" noValidate>
        {serverError ? <ErrorBanner message={serverError} /> : null}

        <Field label="Name" htmlFor="category-name" error={errors.name?.message} required>
          <Input id="category-name" placeholder="Industry Insights" {...register("name")} />
        </Field>

        <Field label="Slug" htmlFor="category-slug" error={errors.slug?.message} hint="Leave blank to auto-generate.">
          <Input id="category-slug" placeholder="industry-insights" {...register("slug")} />
        </Field>

        <Field label="Type" htmlFor="category-type" error={errors.type?.message} required>
          <Select id="category-type" {...register("type")}>
            <option value="blog">Blog</option>
            <option value="portfolio">Portfolio</option>
          </Select>
        </Field>

        <Field label="Description" htmlFor="category-description" error={errors.description?.message}>
          <Textarea id="category-description" className="min-h-[6rem]" {...register("description")} />
        </Field>

        <div className="flex items-center justify-end gap-3 pt-1">
          <Button type="button" variant="ghost" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" variant="dark" disabled={isSubmitting}>
            {isSubmitting ? "Saving…" : initial ? "Save changes" : "Create category"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

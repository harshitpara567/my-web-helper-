"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { Field, Input, Textarea } from "@/components/ui/form";
import { getErrorMessage } from "@/services/http";
import { slugify } from "@/lib/utils";
import { portfolioSchema, type PortfolioFormValues } from "@/lib/validations";
import type { Portfolio } from "@/types";
import { ErrorBanner } from "./ErrorBanner";
import { Modal } from "./Modal";

function splitList(value?: string): string[] {
  if (!value) return [];
  return value
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function PortfolioForm({
  open,
  onClose,
  initial,
  onSubmit
}: {
  open: boolean;
  onClose: () => void;
  initial?: Portfolio | null;
  onSubmit: (payload: Partial<Portfolio>) => Promise<void>;
}) {
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<PortfolioFormValues>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: {
      title: "",
      slug: "",
      client: "",
      summary: "",
      description: "",
      coverImage: "",
      category: "",
      technologies: "",
      results: "",
      year: new Date().getFullYear(),
      liveUrl: "",
      featured: false
    }
  });

  useEffect(() => {
    if (!open) return;
    setServerError("");
    reset({
      title: initial?.title ?? "",
      slug: initial?.slug ?? "",
      client: initial?.client ?? "",
      summary: initial?.summary ?? "",
      description: initial?.description ?? "",
      coverImage: initial?.coverImage ?? "",
      category: initial?.category ?? "",
      technologies: initial?.technologies?.join(", ") ?? "",
      results: initial?.results?.join("\n") ?? "",
      year: initial?.year ?? new Date().getFullYear(),
      liveUrl: initial?.liveUrl ?? "",
      featured: initial?.featured ?? false
    });
  }, [open, initial, reset]);

  async function submit(values: PortfolioFormValues) {
    setServerError("");
    try {
      const payload: Partial<Portfolio> = {
        title: values.title,
        slug: values.slug?.trim() ? values.slug : slugify(values.title),
        client: values.client,
        summary: values.summary,
        description: values.description,
        coverImage: values.coverImage,
        category: values.category,
        technologies: splitList(values.technologies),
        results: splitList(values.results),
        year: values.year,
        liveUrl: values.liveUrl?.trim() || undefined,
        featured: values.featured
      };
      await onSubmit(payload);
      onClose();
    } catch (error) {
      setServerError(getErrorMessage(error));
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={initial ? "Edit project" : "New project"}
      size="lg"
    >
      <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4" noValidate>
        {serverError ? <ErrorBanner message={serverError} /> : null}

        <Field label="Title" htmlFor="portfolio-title" error={errors.title?.message} required>
          <Input id="portfolio-title" placeholder="Northwind commerce platform" {...register("title")} />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Slug" htmlFor="portfolio-slug" error={errors.slug?.message} hint="Leave blank to auto-generate.">
            <Input id="portfolio-slug" placeholder="northwind-commerce" {...register("slug")} />
          </Field>
          <Field label="Client" htmlFor="portfolio-client" error={errors.client?.message} required>
            <Input id="portfolio-client" placeholder="Northwind Retail" {...register("client")} />
          </Field>
        </div>

        <Field label="Summary" htmlFor="portfolio-summary" error={errors.summary?.message} required>
          <Textarea id="portfolio-summary" className="min-h-[5rem]" {...register("summary")} />
        </Field>

        <Field label="Description" htmlFor="portfolio-description" error={errors.description?.message} required>
          <Textarea id="portfolio-description" className="min-h-[10rem]" {...register("description")} />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Cover image URL" htmlFor="portfolio-cover" error={errors.coverImage?.message}>
            <Input id="portfolio-cover" type="url" placeholder="https://images.example.com/project.jpg" {...register("coverImage")} />
          </Field>
          <Field label="Category" htmlFor="portfolio-category" error={errors.category?.message} required>
            <Input id="portfolio-category" placeholder="E-commerce" {...register("category")} />
          </Field>
        </div>

        <Field label="Technologies" htmlFor="portfolio-tech" error={errors.technologies?.message} hint="Comma separated.">
          <Textarea id="portfolio-tech" className="min-h-[5rem]" placeholder="Next.js, Stripe, Sanity" {...register("technologies")} />
        </Field>

        <Field label="Results" htmlFor="portfolio-results" error={errors.results?.message} hint="One result per line.">
          <Textarea id="portfolio-results" className="min-h-[5rem]" placeholder={"38% faster checkout\n2.4x conversion lift"} {...register("results")} />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Year" htmlFor="portfolio-year" error={errors.year?.message} required>
            <Input id="portfolio-year" type="number" inputMode="numeric" {...register("year", { valueAsNumber: true })} />
          </Field>
          <Field label="Live URL" htmlFor="portfolio-live" error={errors.liveUrl?.message}>
            <Input id="portfolio-live" type="url" placeholder="https://client.com" {...register("liveUrl")} />
          </Field>
        </div>

        <label htmlFor="portfolio-featured" className="flex items-center gap-3 text-sm font-medium text-ink">
          <input
            id="portfolio-featured"
            type="checkbox"
            className="h-4 w-4 rounded border-ink/30 text-brand-500 focus:ring-brand-500/30"
            {...register("featured")}
          />
          Feature on the portfolio homepage
        </label>

        <div className="flex items-center justify-end gap-3 pt-1">
          <Button type="button" variant="ghost" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" variant="dark" disabled={isSubmitting}>
            {isSubmitting ? "Saving…" : initial ? "Save changes" : "Create project"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

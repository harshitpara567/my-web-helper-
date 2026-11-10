"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { Field, Input, Select, Textarea } from "@/components/ui/form";
import { getErrorMessage } from "@/services/http";
import { slugify } from "@/lib/utils";
import { blogSchema, type BlogFormValues } from "@/lib/validations";
import type { Blog } from "@/types";
import { ErrorBanner } from "./ErrorBanner";
import { Modal } from "./Modal";

function splitList(value?: string): string[] {
  if (!value) return [];
  return value
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function BlogForm({
  open,
  onClose,
  initial,
  onSubmit
}: {
  open: boolean;
  onClose: () => void;
  initial?: Blog | null;
  onSubmit: (payload: Partial<Blog>) => Promise<void>;
}) {
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      coverImage: "",
      category: "",
      author: "",
      tags: "",
      status: "draft",
      metaTitle: "",
      metaDescription: ""
    }
  });

  useEffect(() => {
    if (!open) return;
    setServerError("");
    const initialCategory = initial?.category;
    reset({
      title: initial?.title ?? "",
      slug: initial?.slug ?? "",
      excerpt: initial?.excerpt ?? "",
      content: initial?.content ?? "",
      coverImage: initial?.coverImage ?? "",
      category:
        initialCategory && typeof initialCategory === "object"
          ? initialCategory.name
          : (initialCategory ?? ""),
      author: initial?.author ?? "",
      tags: initial?.tags?.join(", ") ?? "",
      status: initial?.status ?? "draft",
      metaTitle: initial?.seo?.metaTitle ?? "",
      metaDescription: initial?.seo?.metaDescription ?? ""
    });
  }, [open, initial, reset]);

  async function submit(values: BlogFormValues) {
    setServerError("");
    try {
      const payload: Partial<Blog> = {
        title: values.title,
        slug: values.slug?.trim() ? values.slug : slugify(values.title),
        excerpt: values.excerpt,
        content: values.content,
        coverImage: values.coverImage,
        category: values.category?.trim() ? values.category : undefined,
        author: values.author,
        tags: splitList(values.tags),
        status: values.status,
        seo: {
          metaTitle: values.metaTitle?.trim() || undefined,
          metaDescription: values.metaDescription?.trim() || undefined
        }
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
      title={initial ? "Edit blog post" : "New blog post"}
      size="lg"
    >
      <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4" noValidate>
        {serverError ? <ErrorBanner message={serverError} /> : null}

        <Field label="Title" htmlFor="blog-title" error={errors.title?.message} required>
          <Input id="blog-title" placeholder="How we build resilient web platforms" {...register("title")} />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Slug" htmlFor="blog-slug" error={errors.slug?.message} hint="Leave blank to auto-generate.">
            <Input id="blog-slug" placeholder="resilient-web-platforms" {...register("slug")} />
          </Field>
          <Field label="Author" htmlFor="blog-author" error={errors.author?.message} required>
            <Input id="blog-author" placeholder="My Web Helper" {...register("author")} />
          </Field>
        </div>

        <Field label="Excerpt" htmlFor="blog-excerpt" error={errors.excerpt?.message} required>
          <Textarea id="blog-excerpt" className="min-h-[6rem]" {...register("excerpt")} />
        </Field>

        <Field label="Content" htmlFor="blog-content" error={errors.content?.message} required>
          <Textarea id="blog-content" className="min-h-[12rem]" {...register("content")} />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Cover image URL" htmlFor="blog-cover" error={errors.coverImage?.message}>
            <Input id="blog-cover" type="url" placeholder="https://images.example.com/cover.jpg" {...register("coverImage")} />
          </Field>
          <Field label="Category" htmlFor="blog-category" error={errors.category?.message} hint="Category name or ID.">
            <Input id="blog-category" placeholder="Engineering" {...register("category")} />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Tags" htmlFor="blog-tags" error={errors.tags?.message} hint="Comma separated.">
            <Input id="blog-tags" placeholder="nextjs, performance, seo" {...register("tags")} />
          </Field>
          <Field label="Status" htmlFor="blog-status" error={errors.status?.message} required>
            <Select id="blog-status" {...register("status")}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </Select>
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Meta title" htmlFor="blog-meta-title" error={errors.metaTitle?.message}>
            <Input id="blog-meta-title" {...register("metaTitle")} />
          </Field>
          <Field label="Meta description" htmlFor="blog-meta-desc" error={errors.metaDescription?.message}>
            <Input id="blog-meta-desc" {...register("metaDescription")} />
          </Field>
        </div>

        <div className="flex items-center justify-end gap-3 pt-1">
          <Button type="button" variant="ghost" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" variant="dark" disabled={isSubmitting}>
            {isSubmitting ? "Saving…" : initial ? "Save changes" : "Create post"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

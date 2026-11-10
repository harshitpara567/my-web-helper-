import { blogPosts, getBlogBySlug } from "@/lib/seed/blogs";
import { portfolioProjects } from "@/lib/seed/portfolio";
import { testimonials as seedTestimonials } from "@/lib/seed/testimonials";
import type { Blog, Portfolio, Testimonial } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
}

/**
 * Server-side fetch that degrades gracefully to curated seed content when the
 * API is unreachable, so the marketing site always renders.
 */
async function safeFetch<T>(path: string, fallback: T, revalidate = 300): Promise<T> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);
    const res = await fetch(`${API_URL}${path}`, {
      next: { revalidate },
      signal: controller.signal
    });
    clearTimeout(timeout);
    if (!res.ok) return fallback;
    const json = (await res.json()) as ApiEnvelope<T>;
    if (!json?.success || json.data === undefined || json.data === null) return fallback;
    if (Array.isArray(json.data) && json.data.length === 0) return fallback;
    return json.data;
  } catch {
    return fallback;
  }
}

export async function getBlogs(): Promise<Blog[]> {
  const data = await safeFetch<Blog[]>("/blogs?limit=24", blogPosts);
  return data.slice().sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));
}

export async function getBlog(slug: string): Promise<Blog | undefined> {
  const fallback = getBlogBySlug(slug);
  const data = await safeFetch<Blog | null>(`/blogs/${slug}`, fallback ?? null);
  return data ?? fallback;
}

export async function getPortfolio(): Promise<Portfolio[]> {
  return safeFetch<Portfolio[]>("/portfolio", portfolioProjects);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const data = await safeFetch<Testimonial[]>("/testimonials", seedTestimonials);
  return data.slice().sort((a, b) => a.order - b.order);
}

export function getRelatedBlogs(current: Blog, all: Blog[], limit = 3): Blog[] {
  return all
    .filter((post) => post.slug !== current.slug)
    .sort((a, b) => Number(b.category === current.category) - Number(a.category === current.category))
    .slice(0, limit);
}

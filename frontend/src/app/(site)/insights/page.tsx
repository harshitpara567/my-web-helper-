import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { CTASection } from "@/components/shared/CTASection";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { getBlogs } from "@/lib/content";
import { formatDate, slugify, truncate } from "@/lib/utils";
import type { Blog } from "@/types";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Practical thinking on design, engineering, growth and everything in between — written by the My Web Helper team.",
  alternates: { canonical: "/insights" }
};

function categoryLabel(category: Blog["category"]): string {
  return typeof category === "string" ? category : category?.name ?? "";
}

function publishedLabel(post: Blog): string {
  return formatDate(post.publishedAt ?? post.createdAt);
}

export default async function InsightsPage() {
  const posts = await getBlogs();
  const [featured, ...rest] = posts;
  const categories = Array.from(
    new Set(posts.map((post) => categoryLabel(post.category)).filter((value) => value.length > 0))
  );

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Ideas from the team."
        description="Practical thinking on design, engineering, growth and everything in between."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Insights" }]}
      />

      <section className="shell py-20 lg:py-28">
        {featured ? (
          <Reveal>
            <Link href={`/insights/${featured.slug}`} className="group block">
              <article className="grid overflow-hidden rounded-3xl border border-ink/10 bg-paper lg:grid-cols-2">
                <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[24rem]">
                  <Image
                    src={featured.coverImage}
                    alt={featured.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-center gap-5 p-8 lg:p-12">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone="lime">Featured</Badge>
                    {categoryLabel(featured.category) ? (
                      <Badge tone="outline">{categoryLabel(featured.category)}</Badge>
                    ) : null}
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight text-ink transition-colors group-hover:text-brand-600 sm:text-3xl">
                    {featured.title}
                  </h2>
                  <p className="text-ink/70">{featured.excerpt}</p>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-ink/50">
                    <time dateTime={featured.publishedAt ?? featured.createdAt}>
                      {publishedLabel(featured)}
                    </time>
                    <span aria-hidden="true">·</span>
                    <span>{featured.readingTime} min read</span>
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
                    Read article
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </article>
            </Link>
          </Reveal>
        ) : (
          <p className="text-ink/60">New insights are on the way. Check back soon.</p>
        )}

        {categories.length > 1 ? (
          <Reveal>
            <div className="mt-14 flex flex-wrap items-center gap-2" aria-label="Filter insights by category">
              <Link
                href="/insights"
                className="rounded-full border border-ink bg-ink px-4 py-2 text-sm font-medium text-paper transition-colors"
              >
                All
              </Link>
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/insights?category=${slugify(category)}`}
                  className="rounded-full border border-ink/15 px-4 py-2 text-sm font-medium text-ink/70 transition-colors hover:border-ink hover:text-ink"
                >
                  {category}
                </Link>
              ))}
            </div>
          </Reveal>
        ) : null}

        {rest.length > 0 ? (
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, index) => (
              <Reveal key={post.slug} delay={(index % 3) * 0.06}>
                <Link href={`/insights/${post.slug}`} className="group block h-full">
                  <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-paper transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      {categoryLabel(post.category) ? (
                        <Badge tone="brand" className="self-start">
                          {categoryLabel(post.category)}
                        </Badge>
                      ) : null}
                      <h3 className="mt-4 text-lg font-bold leading-snug tracking-tight text-ink transition-colors group-hover:text-brand-600">
                        {post.title}
                      </h3>
                      <p className="mt-3 flex-1 text-sm text-ink/65">{truncate(post.excerpt, 140)}</p>
                      <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-ink/50">
                        <time dateTime={post.publishedAt ?? post.createdAt}>
                          {publishedLabel(post)}
                        </time>
                        <span aria-hidden="true">·</span>
                        <span>{post.readingTime} min read</span>
                      </div>
                    </div>
                  </article>
                </Link>
              </Reveal>
            ))}
          </div>
        ) : null}
      </section>

      <CTASection />
    </>
  );
}

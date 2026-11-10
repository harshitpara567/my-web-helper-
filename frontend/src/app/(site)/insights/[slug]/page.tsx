import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Markdown } from "@/components/shared/Markdown";
import { PageHero } from "@/components/shared/PageHero";
import { CTASection } from "@/components/shared/CTASection";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { blogPosts } from "@/lib/seed/blogs";
import { getBlog, getBlogs, getRelatedBlogs } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import type { Blog } from "@/types";

export const revalidate = 300;

const siteUrl = siteConfig.url.replace(/\/$/, "");

function categoryLabel(category: Blog["category"]): string {
  return typeof category === "string" ? category : category?.name ?? "";
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getBlog(params.slug);

  if (!post) {
    return { title: "Insight not found" };
  }

  const title = post.seo?.metaTitle ?? post.title;
  const description = post.seo?.metaDescription ?? post.excerpt;
  const keywords = post.seo?.keywords ?? post.tags;
  const canonical = `/insights/${post.slug}`;
  const publishedTime = post.publishedAt ?? post.createdAt;

  return {
    title: { absolute: title },
    description,
    keywords,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      images: [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }],
      publishedTime,
      authors: [post.author],
      tags: post.tags
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [post.coverImage]
    }
  };
}

export default async function InsightDetailPage({ params }: { params: { slug: string } }) {
  const post = await getBlog(params.slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getBlogs();
  const related = getRelatedBlogs(post, allPosts, 3);
  const category = categoryLabel(post.category);
  const publishedTime = post.publishedAt ?? post.createdAt;
  const canonicalUrl = `${siteUrl}/insights/${post.slug}`;
  const keywords = post.seo?.keywords ?? post.tags;

  const twitterShare = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    canonicalUrl
  )}&text=${encodeURIComponent(post.title)}`;
  const linkedInShare = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    canonicalUrl
  )}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: [post.coverImage],
    datePublished: publishedTime,
    dateModified: post.updatedAt ?? publishedTime,
    author: { "@type": "Organization", name: post.author },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    keywords: keywords.join(", "),
    articleSection: category
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow={category || "Insight"}
        title={post.title}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Insights", href: "/insights" },
          { label: post.title }
        ]}
      />

      <section className="shell py-16 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3 text-sm text-ink/60">
            <span className="font-semibold text-ink">{post.author}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={publishedTime}>{formatDate(publishedTime)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime} min read</span>
          </div>

          {post.tags.length > 0 ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} tone="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          ) : null}
        </div>

        <figure className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-3xl border border-ink/10">
          <Image
            src={post.coverImage}
            alt={post.title}
            width={1600}
            height={900}
            priority
            sizes="(max-width: 1024px) 100vw, 60rem"
            className="h-auto w-full object-cover"
          />
        </figure>

        <div className="mx-auto mt-12 max-w-3xl">
          <Markdown content={post.content} />
        </div>

        <div className="mx-auto mt-14 flex max-w-3xl flex-col gap-6 border-t border-ink/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ink/50">
            Written by <span className="font-semibold text-ink/70">{post.author}</span>
          </p>
          <div className="flex items-center gap-5 text-sm font-medium">
            <span className="text-ink/50">Share</span>
            <a
              href={twitterShare}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink/70 transition-colors hover:text-brand-600"
            >
              X
            </a>
            <a
              href={linkedInShare}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink/70 transition-colors hover:text-brand-600"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="border-t border-ink/10 bg-paper-soft py-20 lg:py-28">
          <div className="shell">
            <Reveal>
              <SectionHeading
                eyebrow="Keep reading"
                title="Related insights"
                description="More thinking from the My Web Helper team."
              />
            </Reveal>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, index) => (
                <Reveal key={item.slug} delay={index * 0.06}>
                  <Link href={`/insights/${item.slug}`} className="group block h-full">
                    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-paper transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={item.coverImage}
                          alt={item.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        {categoryLabel(item.category) ? (
                          <Badge tone="brand" className="self-start">
                            {categoryLabel(item.category)}
                          </Badge>
                        ) : null}
                        <h3 className="mt-4 text-lg font-bold leading-snug tracking-tight text-ink transition-colors group-hover:text-brand-600">
                          {item.title}
                        </h3>
                        <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-ink/50">
                          <time dateTime={item.publishedAt ?? item.createdAt}>
                            {formatDate(item.publishedAt ?? item.createdAt)}
                          </time>
                          <span aria-hidden="true">·</span>
                          <span>{item.readingTime} min read</span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </Reveal>
              ))}
            </div>

            <div className="mt-12">
              <Link
                href="/insights"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
              >
                All insights
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      <CTASection />
    </>
  );
}

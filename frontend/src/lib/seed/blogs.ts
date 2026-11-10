import type { Blog } from "@/types";
import { img } from "@/lib/images";

const content = {
  performance: `
## Why performance is a business metric, not a technical one

Every 100 milliseconds of latency costs conversion. Yet most teams only treat performance as a launch checklist item. The organisations that outperform their competitors treat speed as a product feature — one that is measured, owned and improved continuously.

### Set budgets, not aspirations

A performance budget is a contract. Define the maximum JavaScript, the largest image, the target LCP — and fail the build when it is breached. This turns a vague ambition into an enforceable standard.

### Measure what users feel

Lab scores are useful, but field data from real users is the truth. Instrument Core Web Vitals, segment by device and geography, and review the trend every sprint rather than once a year.

- Largest Contentful Paint under 2.5 seconds
- Interaction to Next Paint under 200 milliseconds
- Cumulative Layout Shift under 0.1

### Architecture is destiny

Framework choices, rendering strategies and third-party scripts determine your ceiling. Choose rendering per route, lazy-load relentlessly, and treat every dependency as a cost you must justify.

> Performance is the cheapest feature you will ever ship — and the most expensive one to retrofit.
`,
  design: `
## Design systems that actually scale

A design system is not a Figma library. It is a shared language — tokens, components and rules — that lets dozens of people ship consistent work without slowing down.

### Start with tokens

Colour, spacing, typography and motion should be expressed once, as tokens, and consumed everywhere. When a token changes, everything changes — from design files to production code.

### Document the why

Components without guidance get misused. Each component deserves examples, accessibility notes and clear do's and don'ts.

### Govern without blocking

The best systems have a clear contribution model. Teams can propose, review and ship new patterns through a lightweight process that keeps quality high and momentum intact.

- A single source of truth for tokens
- Versioned component releases
- Accessibility baked into every pattern
`,
  headless: `
## The case for headless commerce

Headless architecture separates the storefront you control from the commerce engine you rely on. The result is freedom to craft experiences without compromising on the operational backbone.

### Experience is the differentiator

When every competitor uses the same platform, experience is what separates you. Headless lets you design and ship interfaces that platform themes cannot express.

### Performance you can defend

Server-rendered storefronts with edge caching consistently outperform legacy themes on the metrics that matter: LCP, search visibility and conversion.

### Keep the operational wins

You still get inventory, payments, tax and fulfilment from a mature commerce backend — you simply stop inheriting its frontend constraints.

> Headless is not a fashion. It is a deliberate trade of complexity for control — and it pays off when experience is your edge.
`,
  cloud: `
## Cloud cost control without slowing delivery

Cloud spend grows quietly. Without deliberate governance it becomes one of the largest line items in your technology budget, while teams still feel they move too slowly.

### Make cost visible

You cannot manage what you cannot see. Tag resources, attribute spend to teams and surface it in the tools engineers already use.

### Right-size relentlessly

Most waste hides in over-provisioned compute and idle environments. Automated schedules, sensible defaults and regular reviews recover most of it.

### Invest in platform engineering

Golden paths and self-service infrastructure reduce both cost and cognitive load. When the easy route is also the correct route, teams move faster for less.

- Tagging and showback
- Environment scheduling
- Golden-path templates
`,
  seo: `
## SEO in the age of AI search

Search is changing, but the fundamentals still win. Systems that understand your content and trust your brand will keep surfacing it — provided your foundations are excellent.

### Build for clarity

Semantic HTML, clean information architecture and structured data make your content legible to every crawler, classic or otherwise.

### Earn authority with substance

Thin content no longer ranks. Depth, originality and genuine usefulness are the currency of durable visibility.

### Optimise for the whole journey

Rankings are a means, not an end. Connect organic traffic to conversion data so you optimise for revenue rather than vanity positions.

- Technical health
- Topical depth
- Conversion measurement
`,
  enterprise: `
## Modernising enterprise platforms without the drama

Large organisations rarely get to start over. Modernisation is a sequence of safe, valuable steps — not a big-bang rewrite.

### Strangle, don't replace

Introduce a modern facade and migrate capability by capability. Each step ships value and reduces risk, and the old system is retired only when it has nothing left to do.

### Prioritise by value and risk

Not everything deserves a rebuild. Rank candidates by business value, technical risk and reversibility, then attack in that order.

### Bring people along

Technology change fails without adoption. Invest in training, communication and visible wins to build momentum across the organisation.

- Incremental migration
- Value-ranked backlog
- Adoption enablement
`
};

const base = {
  tags: ["Strategy", "Engineering"],
  author: "My Web Helper",
  status: "published" as const
};

export const blogPosts: Blog[] = [
  {
    ...base,
    _id: "blog-1",
    title: "Performance Is a Business Metric",
    slug: "performance-is-a-business-metric",
    excerpt:
      "Why the fastest product usually wins, and how to turn speed into an enforceable, revenue-linked discipline.",
    content: content.performance.trim(),
    coverImage: img("developer workstation with performance dashboards on screens, dark modern studio, green accents"),
    category: "Engineering",
    tags: ["Performance", "Core Web Vitals", "Engineering"],
    readingTime: 6,
    publishedAt: "2026-02-18T09:00:00.000Z",
    createdAt: "2026-02-18T09:00:00.000Z",
    updatedAt: "2026-02-18T09:00:00.000Z",
    seo: {
      metaTitle: "Performance Is a Business Metric | My Web Helper",
      metaDescription:
        "Turn web performance into an enforceable, revenue-linked discipline with budgets, field data and architecture.",
      keywords: ["web performance", "core web vitals", "conversion"]
    }
  },
  {
    ...base,
    _id: "blog-2",
    title: "Design Systems That Actually Scale",
    slug: "design-systems-that-actually-scale",
    excerpt:
      "Tokens, documentation and governance — the three pillars that let design systems survive contact with real teams.",
    content: content.design.trim(),
    coverImage: img("design system components and color tokens laid out on a minimal surface, editorial"),
    category: "Design",
    tags: ["Design Systems", "UX", "Tokens"],
    readingTime: 5,
    publishedAt: "2026-01-29T09:00:00.000Z",
    createdAt: "2026-01-29T09:00:00.000Z",
    updatedAt: "2026-01-29T09:00:00.000Z",
    seo: {
      metaTitle: "Design Systems That Actually Scale | My Web Helper",
      metaDescription: "How tokens, documentation and governance make design systems durable.",
      keywords: ["design system", "design tokens", "ux"]
    }
  },
  {
    ...base,
    _id: "blog-3",
    title: "The Case for Headless Commerce",
    slug: "the-case-for-headless-commerce",
    excerpt:
      "When to trade platform convenience for experience control — and how to know if it is the right move for you.",
    content: content.headless.trim(),
    coverImage: img("headless ecommerce storefront on a desktop screen, minimal retail studio, warm light"),
    category: "Commerce",
    tags: ["Ecommerce", "Headless", "Shopify"],
    readingTime: 6,
    publishedAt: "2026-01-12T09:00:00.000Z",
    createdAt: "2026-01-12T09:00:00.000Z",
    updatedAt: "2026-01-12T09:00:00.000Z",
    seo: {
      metaTitle: "The Case for Headless Commerce | My Web Helper",
      metaDescription: "A pragmatic look at headless commerce: when it pays off and when it does not.",
      keywords: ["headless commerce", "shopify", "ecommerce"]
    }
  },
  {
    ...base,
    _id: "blog-4",
    title: "Cloud Cost Control Without Slowing Delivery",
    slug: "cloud-cost-control-without-slowing-delivery",
    excerpt:
      "Visibility, right-sizing and platform engineering — a practical FinOps playbook for growing teams.",
    content: content.cloud.trim(),
    coverImage: img("cloud infrastructure dashboard with cost graphs on a monitor, dark studio setting"),
    category: "Cloud",
    tags: ["Cloud", "FinOps", "DevOps"],
    readingTime: 7,
    publishedAt: "2025-12-15T09:00:00.000Z",
    createdAt: "2025-12-15T09:00:00.000Z",
    updatedAt: "2025-12-15T09:00:00.000Z",
    seo: {
      metaTitle: "Cloud Cost Control Without Slowing Delivery | My Web Helper",
      metaDescription: "A FinOps playbook: visibility, right-sizing and platform engineering.",
      keywords: ["finops", "cloud cost", "devops"]
    }
  },
  {
    ...base,
    _id: "blog-5",
    title: "SEO in the Age of AI Search",
    slug: "seo-in-the-age-of-ai-search",
    excerpt:
      "The fundamentals that still decide visibility, and how to structure content for both humans and machines.",
    content: content.seo.trim(),
    coverImage: img("search analytics and serp trends on a large screen, minimal editorial photography"),
    category: "Marketing",
    tags: ["SEO", "Content", "Marketing"],
    readingTime: 5,
    publishedAt: "2025-11-27T09:00:00.000Z",
    createdAt: "2025-11-27T09:00:00.000Z",
    updatedAt: "2025-11-27T09:00:00.000Z",
    seo: {
      metaTitle: "SEO in the Age of AI Search | My Web Helper",
      metaDescription: "Build durable organic visibility with clarity, substance and full-journey measurement.",
      keywords: ["seo", "ai search", "content strategy"]
    }
  },
  {
    ...base,
    _id: "blog-6",
    title: "Modernising Enterprise Platforms Without the Drama",
    slug: "modernising-enterprise-platforms-without-the-drama",
    excerpt:
      "Strangle, prioritise and enable adoption — how to modernise incrementally and keep the business on side.",
    content: content.enterprise.trim(),
    coverImage: img("enterprise operations center with large displays, dark modern architecture, green highlights"),
    category: "Enterprise",
    tags: ["Enterprise", "Modernisation", "Strategy"],
    readingTime: 6,
    publishedAt: "2025-11-06T09:00:00.000Z",
    createdAt: "2025-11-06T09:00:00.000Z",
    updatedAt: "2025-11-06T09:00:00.000Z",
    seo: {
      metaTitle: "Modernising Enterprise Platforms Without the Drama | My Web Helper",
      metaDescription: "Incremental, value-ranked enterprise modernisation that keeps the business on side.",
      keywords: ["enterprise", "modernisation", "legacy"]
    }
  }
];

export function getBlogBySlug(slug: string): Blog | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

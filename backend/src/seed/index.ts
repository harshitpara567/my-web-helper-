import { connectDB, disconnectDB } from "../config/db";
import { createDefaultAdmin } from "../services/auth.service";
import { Blog } from "../models/Blog";
import { Category } from "../models/Category";
import { Portfolio } from "../models/Portfolio";
import { Testimonial } from "../models/Testimonial";
import { slugify } from "../utils/slug";

function img(prompt: string, size = "landscape_16_9"): string {
  const clean = prompt.replace(/\s+/g, " ").trim();
  return `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent(
    clean
  )}&image_size=${size}`;
}

const categories = [
  { name: "Engineering", description: "Performance, architecture and platform engineering." },
  { name: "Design", description: "Design systems, UX and interface craft." },
  { name: "Commerce", description: "Headless commerce and digital retail experiences." },
  { name: "Cloud", description: "Cloud, DevOps and cost governance." },
  { name: "Marketing", description: "SEO, content and growth strategy." },
  { name: "Enterprise", description: "Modernising large, long-lived platforms." }
];

const blogPosts = [
  {
    title: "Performance Is a Business Metric",
    category: "Engineering",
    excerpt:
      "Why the fastest product usually wins, and how to turn speed into an enforceable, revenue-linked discipline.",
    tags: ["Performance", "Core Web Vitals", "Engineering"],
    readingTime: 6,
    publishedAt: "2026-02-18T09:00:00.000Z",
    coverImage: img(
      "developer workstation with performance dashboards on screens, dark modern studio, green accents"
    ),
    content:
      "Every 100 milliseconds of latency costs conversion. Yet most teams only treat performance as a launch checklist item. The organisations that outperform their competitors treat speed as a product feature that is measured, owned and improved continuously.\n\nSet budgets, not aspirations. A performance budget is a contract: define the maximum JavaScript, the largest image and the target LCP, then fail the build when it is breached.\n\nMeasure what users feel. Lab scores are useful, but field data from real users is the truth. Instrument Core Web Vitals and review the trend every sprint. Architecture is destiny — choose rendering per route and treat every dependency as a cost you must justify.",
    seo: {
      metaTitle: "Performance Is a Business Metric | My Web Helper",
      metaDescription:
        "Turn web performance into an enforceable, revenue-linked discipline with budgets, field data and architecture.",
      keywords: ["web performance", "core web vitals", "conversion"]
    }
  },
  {
    title: "Design Systems That Actually Scale",
    category: "Design",
    excerpt:
      "Tokens, documentation and governance — the three pillars that let design systems survive contact with real teams.",
    tags: ["Design Systems", "UX", "Tokens"],
    readingTime: 5,
    publishedAt: "2026-01-29T09:00:00.000Z",
    coverImage: img(
      "design system components and color tokens laid out on a minimal surface, editorial"
    ),
    content:
      "A design system is not a Figma library. It is a shared language — tokens, components and rules — that lets dozens of people ship consistent work without slowing down.\n\nStart with tokens: colour, spacing, typography and motion expressed once and consumed everywhere. Document the why: each component deserves examples, accessibility notes and clear do's and don'ts. Govern without blocking by keeping a lightweight contribution model that protects quality while preserving momentum.",
    seo: {
      metaTitle: "Design Systems That Actually Scale | My Web Helper",
      metaDescription: "How tokens, documentation and governance make design systems durable.",
      keywords: ["design system", "design tokens", "ux"]
    }
  },
  {
    title: "The Case for Headless Commerce",
    category: "Commerce",
    excerpt:
      "When to trade platform convenience for experience control — and how to know if it is the right move for you.",
    tags: ["Ecommerce", "Headless", "Shopify"],
    readingTime: 6,
    publishedAt: "2026-01-12T09:00:00.000Z",
    coverImage: img(
      "headless ecommerce storefront on a desktop screen, minimal retail studio, warm light"
    ),
    content:
      "Headless architecture separates the storefront you control from the commerce engine you rely on. The result is freedom to craft experiences without compromising the operational backbone.\n\nWhen every competitor uses the same platform, experience becomes the differentiator. Server-rendered storefronts with edge caching consistently outperform legacy themes on the metrics that matter: LCP, search visibility and conversion. You still inherit inventory, payments, tax and fulfilment — you simply stop inheriting frontend constraints.",
    seo: {
      metaTitle: "The Case for Headless Commerce | My Web Helper",
      metaDescription: "A pragmatic look at headless commerce: when it pays off and when it does not.",
      keywords: ["headless commerce", "shopify", "ecommerce"]
    }
  },
  {
    title: "Cloud Cost Control Without Slowing Delivery",
    category: "Cloud",
    excerpt:
      "Visibility, right-sizing and platform engineering — a practical FinOps playbook for growing teams.",
    tags: ["Cloud", "FinOps", "DevOps"],
    readingTime: 7,
    publishedAt: "2025-12-15T09:00:00.000Z",
    coverImage: img("cloud infrastructure dashboard with cost graphs on a monitor, dark studio setting"),
    content:
      "Cloud spend grows quietly. Without deliberate governance it becomes one of the largest line items in your technology budget, while teams still feel they move too slowly.\n\nMake cost visible: tag resources, attribute spend to teams and surface it where engineers already work. Right-size relentlessly — most waste hides in over-provisioned compute and idle environments. Invest in platform engineering so the easy route is also the correct route, letting teams move faster for less.",
    seo: {
      metaTitle: "Cloud Cost Control Without Slowing Delivery | My Web Helper",
      metaDescription: "A FinOps playbook: visibility, right-sizing and platform engineering.",
      keywords: ["finops", "cloud cost", "devops"]
    }
  },
  {
    title: "SEO in the Age of AI Search",
    category: "Marketing",
    excerpt:
      "The fundamentals that still decide visibility, and how to structure content for both humans and machines.",
    tags: ["SEO", "Content", "Marketing"],
    readingTime: 5,
    publishedAt: "2025-11-27T09:00:00.000Z",
    coverImage: img(
      "search analytics and serp trends on a large screen, minimal editorial photography"
    ),
    content:
      "Search is changing, but the fundamentals still win. Systems that understand your content and trust your brand will keep surfacing it — provided your foundations are excellent.\n\nBuild for clarity with semantic HTML, clean information architecture and structured data. Earn authority with substance, because thin content no longer ranks. Optimise the whole journey: connect organic traffic to conversion data so you optimise for revenue rather than vanity positions.",
    seo: {
      metaTitle: "SEO in the Age of AI Search | My Web Helper",
      metaDescription:
        "Build durable organic visibility with clarity, substance and full-journey measurement.",
      keywords: ["seo", "ai search", "content strategy"]
    }
  },
  {
    title: "Modernising Enterprise Platforms Without the Drama",
    category: "Enterprise",
    excerpt:
      "Strangle, prioritise and enable adoption — how to modernise incrementally and keep the business on side.",
    tags: ["Enterprise", "Modernisation", "Strategy"],
    readingTime: 6,
    publishedAt: "2025-11-06T09:00:00.000Z",
    coverImage: img(
      "enterprise operations center with large displays, dark modern architecture, green highlights"
    ),
    content:
      "Large organisations rarely get to start over. Modernisation is a sequence of safe, valuable steps — not a big-bang rewrite.\n\nStrangle, don't replace: introduce a modern facade and migrate capability by capability so the old system is retired only when it has nothing left to do. Prioritise by value and risk, and invest in training and communication so adoption keeps pace with the technology change.",
    seo: {
      metaTitle: "Modernising Enterprise Platforms Without the Drama | My Web Helper",
      metaDescription:
        "Incremental, value-ranked enterprise modernisation that keeps the business on side.",
      keywords: ["enterprise", "modernisation", "legacy"]
    }
  }
];

const projects = [
  {
    title: "Meridian Banking Platform",
    client: "Meridian Financial",
    category: "Enterprise Solutions",
    summary: "A unified digital banking experience serving 2.4M customers across web and mobile.",
    description:
      "Meridian's legacy portal was slow and fragmented. We rebuilt it as a single, accessible platform spanning web and mobile, introducing a design system and a self-service hub that cut support calls dramatically.",
    coverImage: img(
      "modern digital banking dashboard on a laptop screen, minimal studio desk, cool green accents"
    ),
    images: [img("financial services mobile app screens on a smartphone, clean studio background")],
    technologies: ["Next.js", "React Native", "Node.js", "PostgreSQL", "AWS"],
    results: ["48% faster page loads", "3.1M monthly active sessions", "-32% support tickets"],
    featured: true,
    year: 2025,
    liveUrl: "https://example.com"
  },
  {
    title: "Verde Commerce",
    client: "Verde Living",
    category: "E-commerce",
    summary: "A headless Shopify storefront that lifted conversion by 41% in one quarter.",
    description:
      "We replatformed Verde Living onto a headless architecture with editorial merchandising tools, a rebuilt checkout and an Algolia-powered search that made discovery effortless.",
    coverImage: img(
      "premium sustainable home goods ecommerce website on a desktop monitor, warm minimal studio"
    ),
    images: [img("ecommerce product detail page on a tablet, minimal styling")],
    technologies: ["Shopify Hydrogen", "Next.js", "Algolia", "Stripe", "Sanity"],
    results: ["+41% conversion rate", "+27% average order value", "1.1s LCP"],
    featured: true,
    year: 2025
  },
  {
    title: "Northwind Health App",
    client: "Northwind Health",
    category: "Mobile Apps",
    summary: "A patient companion app connecting 180k users to care teams in real time.",
    description:
      "Northwind needed a HIPAA-conscious mobile companion for patients. We delivered a cross-platform app with secure messaging, appointment scheduling and wearable integrations.",
    coverImage: img("healthcare mobile application on smartphones held in hand, soft green tones"),
    images: [img("medical scheduling interface on a tablet in a clinic, bright and clean")],
    technologies: ["React Native", "Expo", "Firebase", "GraphQL", "HealthKit"],
    results: ["180k patients onboarded", "4.8 star App Store rating", "+58% appointment adherence"],
    featured: true,
    year: 2024
  },
  {
    title: "Atlas Logistics Suite",
    client: "Atlas Freight",
    category: "Custom Software",
    summary: "Operations software giving dispatchers a single source of truth for 12k daily shipments.",
    description:
      "We replaced six disconnected tools with one custom operations platform featuring real-time tracking, automated routing and role-based dashboards.",
    coverImage: img("logistics control room with large screens showing maps and dashboards"),
    images: [img("fleet tracking interface on a wide monitor, dark ui")],
    technologies: ["NestJS", "PostgreSQL", "Redis", "Docker", "AWS"],
    results: ["12k shipments per day managed", "-44% manual data entry", "99.99% uptime"],
    featured: false,
    year: 2024
  },
  {
    title: "Lumen SaaS Rebrand",
    client: "Lumen Analytics",
    category: "UI/UX Design",
    summary: "A full brand, design system and marketing site relaunch for a B2B analytics leader.",
    description:
      "Lumen had outgrown its identity. We delivered a complete rebrand, a scalable design system and a conversion-optimised marketing site that positioned them for enterprise buyers.",
    coverImage: img("modern b2b saas marketing website on a laptop, minimal desk with plant"),
    images: [img("design system components grid on a monitor, clean minimal")],
    technologies: ["Figma", "Next.js", "Tailwind CSS", "Storybook", "Framer Motion"],
    results: ["+64% demo requests", "Design system adopted across 6 teams", "2.3x content velocity"],
    featured: true,
    year: 2025
  },
  {
    title: "Skyline Property Portal",
    client: "Skyline Realty",
    category: "Web Development",
    summary: "A property discovery platform with immersive search across 40k live listings.",
    description:
      "Skyline needed buyers to fall in love with properties online. We built a fast, map-first discovery experience with rich media, saved searches and agent booking built in.",
    coverImage: img("real estate property listing website on a large screen, bright airy office"),
    images: [img("map based property search interface on a laptop")],
    technologies: ["Next.js", "Mapbox", "Elasticsearch", "Node.js", "Cloudinary"],
    results: ["40k active listings", "+52% qualified leads", "0.9s median load"],
    featured: false,
    year: 2023
  }
];

const testimonials = [
  {
    name: "Amara Okafor",
    role: "Chief Digital Officer",
    company: "Meridian Financial",
    avatar: img("professional corporate headshot of a confident woman", "square"),
    quote:
      "My Web Helper rebuilt our platform without a single day of downtime. They are equally strong on strategy, design and engineering.",
    rating: 5,
    featured: true,
    order: 1
  },
  {
    name: "Daniel Reyes",
    role: "Founder & CEO",
    company: "Verde Living",
    avatar: img("professional corporate headshot of a man", "square"),
    quote:
      "Our conversion rate jumped 41% in a single quarter. The team obsesses over detail, performance and the numbers that matter.",
    rating: 5,
    featured: true,
    order: 2
  },
  {
    name: "Priya Nair",
    role: "VP Product",
    company: "Northwind Health",
    avatar: img("professional headshot of a woman in a bright office", "square"),
    quote:
      "They shipped a patient app our users genuinely love, with 4.8 stars and climbing. Communication was exceptional from kickoff to launch.",
    rating: 5,
    featured: true,
    order: 3
  },
  {
    name: "Marcus Feld",
    role: "COO",
    company: "Atlas Freight",
    avatar: img("professional headshot of a man in business attire", "square"),
    quote:
      "Our dispatchers reclaimed hours every day. My Web Helper understood the operational reality, not just the technical brief.",
    rating: 5,
    featured: true,
    order: 4
  },
  {
    name: "Sofia Bianchi",
    role: "Head of Marketing",
    company: "Lumen Analytics",
    avatar: img("professional headshot of a woman, minimal studio lighting", "square"),
    quote:
      "The rebrand and new site lifted demo requests by 64%. It finally reflects the ambition of the company.",
    rating: 5,
    featured: false,
    order: 5
  },
  {
    name: "James Whitmore",
    role: "CTO",
    company: "Skyline Realty",
    avatar: img("professional headshot of a man, corporate portrait", "square"),
    quote:
      "Fast, secure and maintainable. Their engineering standards are the highest we have seen from an agency partner.",
    rating: 5,
    featured: false,
    order: 6
  }
];

async function seed(): Promise<void> {
  await connectDB();

  const admin = await createDefaultAdmin();

  for (const category of categories) {
    await Category.updateOne(
      { slug: slugify(category.name) },
      {
        $set: {
          name: category.name,
          slug: slugify(category.name),
          type: "blog",
          description: category.description
        }
      },
      { upsert: true }
    );
  }

  for (const post of blogPosts) {
    await Blog.updateOne(
      { slug: slugify(post.title) },
      { $set: { ...post, slug: slugify(post.title), author: "My Web Helper", status: "published" } },
      { upsert: true }
    );
  }

  for (const project of projects) {
    await Portfolio.updateOne(
      { slug: slugify(project.title) },
      { $set: { ...project, slug: slugify(project.title) } },
      { upsert: true }
    );
  }

  for (const testimonial of testimonials) {
    await Testimonial.updateOne(
      { name: testimonial.name, company: testimonial.company },
      { $set: testimonial },
      { upsert: true }
    );
  }

  console.log("[seed] Seeding complete");
  console.log(`[seed] Admin ready: ${admin.email}`);
  console.log(`[seed] Categories: ${categories.length}`);
  console.log(`[seed] Blog posts: ${blogPosts.length}`);
  console.log(`[seed] Portfolio projects: ${projects.length}`);
  console.log(`[seed] Testimonials: ${testimonials.length}`);

  await disconnectDB();
  console.log("[seed] Database connection closed");
}

seed()
  .then(() => process.exit(0))
  .catch((error: unknown) => {
    console.error("[seed] Seeding failed:", error);
    process.exit(1);
  });

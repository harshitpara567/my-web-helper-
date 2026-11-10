import type { Service } from "@/types";

export const services: Service[] = [
  {
    slug: "web-development",
    title: "Web Development",
    tagline: "Fast, resilient, beautifully engineered web platforms.",
    summary:
      "High-performance websites and web applications built on modern JavaScript frameworks with accessibility and Core Web Vitals baked in.",
    description:
      "We design and build web experiences that load in milliseconds and scale to millions of sessions. From marketing sites to complex web applications, our engineering teams pair a component-driven architecture with rigorous performance budgets so your digital estate stays fast, secure and maintainable as it grows.",
    icon: "Code2",
    benefits: [
      { title: "Performance first", description: "Sub-second loads via SSR, edge caching and aggressive bundle budgets." },
      { title: "Accessible by default", description: "WCAG 2.2 AA compliance validated with automated and manual audits." },
      { title: "Composable architecture", description: "Reusable component systems that keep releases predictable." },
      { title: "SEO foundations", description: "Semantic HTML, structured data and clean indexing out of the box." }
    ],
    technologies: ["Next.js", "React", "TypeScript", "Node.js", "Tailwind CSS", "GraphQL", "PostgreSQL"],
    deliverables: ["Technical discovery", "Design system", "Production build", "CI/CD pipeline", "Performance report"]
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    tagline: "Native-grade products in your customers' pockets.",
    summary:
      "iOS and Android applications engineered for retention — from MVP to enterprise scale, with analytics and release automation from day one.",
    description:
      "We build mobile products that feel instant and native. Our cross-platform and native teams handle everything from product strategy and prototyping through to App Store and Play Store release, backed by crash analytics, remote configuration and a roadmap that keeps shipping after launch.",
    icon: "Smartphone",
    benefits: [
      { title: "One codebase, two platforms", description: "Shared logic with platform-perfect interaction patterns." },
      { title: "Offline resilient", description: "Local-first data models keep the app useful without connectivity." },
      { title: "Release automation", description: "Automated builds, signing and staged rollouts." },
      { title: "Growth instrumentation", description: "Funnels, retention and attribution wired in from the start." }
    ],
    technologies: ["React Native", "Expo", "Swift", "Kotlin", "Firebase", "GraphQL", "Fastlane"],
    deliverables: ["Product strategy", "Interactive prototype", "iOS & Android release", "Analytics suite", "Release runbook"]
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    tagline: "Interfaces people trust at first glance.",
    summary:
      "Research-led product design that turns complex workflows into intuitive, on-brand experiences across web and mobile.",
    description:
      "Great design is a business asset. We run discovery and research to understand your users, then craft design systems, prototypes and polished interfaces that reduce friction, raise conversion and give your brand a distinctive, premium feel.",
    icon: "PenTool",
    benefits: [
      { title: "Evidence-based", description: "Decisions grounded in user research and usability testing." },
      { title: "Design systems", description: "Tokenised, documented components your team can reuse." },
      { title: "Conversion focused", description: "Interfaces tuned for measurable business outcomes." },
      { title: "Accessible", description: "Inclusive design principles applied throughout." }
    ],
    technologies: ["Figma", "Framer", "Storybook", "Design Tokens", "Maze", "Miro"],
    deliverables: ["User research", "Journey maps", "Wireframes", "High-fidelity UI", "Design system"]
  },
  {
    slug: "ecommerce-development",
    title: "E-commerce Development",
    tagline: "Storefronts built to convert and scale.",
    summary:
      "Headless and platform commerce experiences that combine merchandising flexibility with enterprise-grade reliability.",
    description:
      "We build commerce experiences that sell. Whether you need a headless storefront on Shopify or a fully bespoke marketplace, we handle catalogue architecture, checkout optimisation, payment integrations and performance so every session converts.",
    icon: "ShoppingBag",
    benefits: [
      { title: "Headless flexibility", description: "Best-of-breed frontend with a commerce backend you trust." },
      { title: "Checkout optimisation", description: "Reduced friction and recovered carts that lift revenue." },
      { title: "Global ready", description: "Multi-currency, multi-language and tax compliance." },
      { title: "Merchandising control", description: "Content and campaign tooling for non-technical teams." }
    ],
    technologies: ["Shopify", "Hydrogen", "Stripe", "Sanity", "Next.js", "Algolia"],
    deliverables: ["Commerce strategy", "Storefront build", "Payment integration", "Analytics", "Launch support"]
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    tagline: "Growth systems, not one-off campaigns.",
    summary:
      "Full-funnel marketing programmes spanning paid media, content, CRM and lifecycle automation — measured against revenue.",
    description:
      "We build growth engines. By connecting acquisition, conversion and retention data, we run campaigns and lifecycle programmes that compound over time — with transparent reporting tied directly to pipeline and revenue, not vanity metrics.",
    icon: "Megaphone",
    benefits: [
      { title: "Full-funnel", description: "Awareness through retention managed as one system." },
      { title: "Revenue attribution", description: "Transparent reporting down to pipeline impact." },
      { title: "Lifecycle automation", description: "Emails and journeys that nurture at scale." },
      { title: "Continuous testing", description: "Relentless experimentation drives incremental gains." }
    ],
    technologies: ["Google Ads", "Meta Ads", "HubSpot", "Klaviyo", "GA4", "Segment"],
    deliverables: ["Channel strategy", "Campaign build", "Lifecycle journeys", "Reporting dashboard", "Growth roadmap"]
  },
  {
    slug: "seo-optimization",
    title: "SEO Optimization",
    tagline: "Sustainable visibility that compounds monthly.",
    summary:
      "Technical SEO, content strategy and authority building that win durable rankings and qualified organic demand.",
    description:
      "We treat SEO as an engineering discipline. Our specialists combine technical audits, information architecture and editorial strategy to win rankings you keep — while keeping performance, accessibility and indexation in perfect health.",
    icon: "TrendingUp",
    benefits: [
      { title: "Technical excellence", description: "Crawlability, indexation and speed fixed at the source." },
      { title: "Topical authority", description: "Content clusters built around real search demand." },
      { title: "Rich results", description: "Structured data that earns visibility and clicks." },
      { title: "Clear reporting", description: "Rankings, traffic and revenue in one view." }
    ],
    technologies: ["Ahrefs", "Semrush", "Search Console", "Screaming Frog", "Schema.org"],
    deliverables: ["Technical audit", "Keyword strategy", "Content plan", "On-page optimisation", "Monthly reporting"]
  },
  {
    slug: "custom-software-development",
    title: "Custom Software Development",
    tagline: "Software shaped precisely around your business.",
    summary:
      "Bespoke platforms, internal tools and integrations that remove operational friction and unlock new revenue.",
    description:
      "When off-the-shelf software no longer fits, we build exactly what your business needs. Our teams deliver bespoke platforms, workflow tools and system integrations with the same rigour we apply to consumer products — documented, tested and built to endure.",
    icon: "Blocks",
    benefits: [
      { title: "Fit for purpose", description: "Software modelled on how your business actually works." },
      { title: "Integration ready", description: "APIs and middleware that connect your stack." },
      { title: "Automation", description: "Manual processes replaced with reliable workflows." },
      { title: "Maintainable", description: "Clean architecture and documentation your team can own." }
    ],
    technologies: ["Node.js", "NestJS", "PostgreSQL", "Redis", "Docker", "AWS"],
    deliverables: ["Requirement analysis", "Architecture design", "Build & QA", "Deployment", "Handover documentation"]
  },
  {
    slug: "enterprise-solutions",
    title: "Enterprise Solutions",
    tagline: "Modern platforms for complex organisations.",
    summary:
      "Large-scale portals, integrations and modernisation programmes delivered with governance, security and change management.",
    description:
      "Enterprise programmes demand discipline. We deliver secure, compliant platforms and modernisation initiatives with clear governance, phased delivery and rigorous change management — so transformation lands without disrupting the business.",
    icon: "Building2",
    benefits: [
      { title: "Governance built-in", description: "Clear reporting, risk registers and delivery cadence." },
      { title: "Security & compliance", description: "Solutions aligned to your regulatory obligations." },
      { title: "Legacy modernisation", description: "Incremental migration off brittle systems." },
      { title: "Change enablement", description: "Training and adoption support for every team." }
    ],
    technologies: ["Azure", "AWS", "Kubernetes", "Kafka", "PostgreSQL", "Salesforce"],
    deliverables: ["Discovery & roadmap", "Solution architecture", "Phased delivery", "Security review", "Adoption programme"]
  },
  {
    slug: "cloud-technology-consulting",
    title: "Cloud & Technology Consulting",
    tagline: "Strategy and platforms that keep you ahead.",
    summary:
      "Cloud architecture, DevOps and technology strategy that reduce cost, increase resilience and accelerate delivery.",
    description:
      "We help leadership teams make confident technology decisions. From cloud migration and platform engineering to DevOps maturity and cost optimisation, our consultants translate business ambition into a pragmatic, well-sequenced technical roadmap.",
    icon: "Cloud",
    benefits: [
      { title: "Right-sized architecture", description: "Cloud that fits your scale and budget." },
      { title: "Resilience", description: "Observability, redundancy and tested recovery." },
      { title: "Cost control", description: "FinOps practices that cut waste without hurting velocity." },
      { title: "Delivery velocity", description: "Platform engineering that unblocks your teams." }
    ],
    technologies: ["AWS", "Azure", "Terraform", "Kubernetes", "GitHub Actions", "Grafana"],
    deliverables: ["Maturity assessment", "Target architecture", "Migration plan", "Platform build", "Cost optimisation"]
  }
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

import type { Portfolio } from "@/types";
import { img } from "@/lib/images";

export const portfolioProjects: Portfolio[] = [
  {
    _id: "pf-1",
    title: "Meridian Banking Platform",
    slug: "meridian-banking-platform",
    client: "Meridian Financial",
    summary:
      "A unified digital banking experience serving 2.4M customers across web and mobile.",
    description:
      "Meridian's legacy portal was slow and fragmented. We rebuilt it as a single, accessible platform spanning web and mobile — introducing a design system, real-time notifications and a self-service hub that cut support calls dramatically.",
    coverImage: img("modern digital banking dashboard on a laptop screen, minimal studio desk, cool green accents, editorial photography"),
    images: [
      img("financial services mobile app screens on a smartphone, clean studio background"),
      img("banking analytics charts on a large monitor in a bright modern office")
    ],
    category: "Enterprise Solutions",
    technologies: ["Next.js", "React Native", "Node.js", "PostgreSQL", "AWS"],
    results: ["48% faster page loads", "3.1M monthly active sessions", "-32% support tickets", "WCAG 2.2 AA certified"],
    featured: true,
    year: 2025,
    liveUrl: "https://example.com"
  },
  {
    _id: "pf-2",
    title: "Verde Commerce",
    slug: "verde-commerce",
    client: "Verde Living",
    summary: "A headless Shopify storefront that lifted conversion by 41% in one quarter.",
    description:
      "We replatformed Verde Living onto a headless architecture with editorial merchandising tools, a rebuilt checkout and an Algolia-powered search that made discovery effortless.",
    coverImage: img("premium sustainable home goods ecommerce website on a desktop monitor, warm minimal studio"),
    images: [img("ecommerce product detail page on a tablet, minimal styling")],
    category: "E-commerce",
    technologies: ["Shopify Hydrogen", "Next.js", "Algolia", "Stripe", "Sanity"],
    results: ["+41% conversion rate", "+27% average order value", "1.1s LCP", "99.98% uptime"],
    featured: true,
    year: 2025
  },
  {
    _id: "pf-3",
    title: "Northwind Health App",
    slug: "northwind-health-app",
    client: "Northwind Health",
    summary: "A patient companion app connecting 180k users to care teams in real time.",
    description:
      "Northwind needed a HIPAA-conscious mobile companion for patients. We delivered a cross-platform app with secure messaging, appointment scheduling and wearable integrations — plus a clinician dashboard.",
    coverImage: img("healthcare mobile application on smartphones held in hand, clean clinical photography, soft green tones"),
    images: [img("medical scheduling interface on a tablet in a clinic, bright and clean")],
    category: "Mobile Apps",
    technologies: ["React Native", "Expo", "Firebase", "GraphQL", "HealthKit"],
    results: ["180k patients onboarded", "4.8★ App Store rating", "+58% appointment adherence"],
    featured: true,
    year: 2024
  },
  {
    _id: "pf-4",
    title: "Atlas Logistics Suite",
    slug: "atlas-logistics-suite",
    client: "Atlas Freight",
    summary: "Operations software that gives dispatchers a single source of truth for 12k daily shipments.",
    description:
      "We replaced six disconnected tools with one custom operations platform — real-time tracking, automated routing and role-based dashboards that saved dispatchers hours every day.",
    coverImage: img("logistics control room with large screens showing maps and dashboards, dark modern interior"),
    images: [img("fleet tracking interface on a wide monitor, dark ui")],
    category: "Custom Software",
    technologies: ["NestJS", "PostgreSQL", "Redis", "Docker", "AWS"],
    results: ["12k shipments/day managed", "-44% manual data entry", "99.99% platform uptime"],
    featured: false,
    year: 2024
  },
  {
    _id: "pf-5",
    title: "Lumen SaaS Rebrand",
    slug: "lumen-saas-rebrand",
    client: "Lumen Analytics",
    summary: "A full brand, design system and marketing site relaunch for a B2B analytics leader.",
    description:
      "Lumen had outgrown its identity. We delivered a complete rebrand, a scalable design system and a conversion-optimised marketing site that positioned them for enterprise buyers.",
    coverImage: img("modern b2b saas marketing website on a laptop, minimal desk with plant, editorial"),
    images: [img("design system components grid on a monitor, clean minimal")],
    category: "UI/UX Design",
    technologies: ["Figma", "Next.js", "Tailwind CSS", "Storybook", "Framer Motion"],
    results: ["+64% demo requests", "Design system adopted across 6 teams", "2.3× content velocity"],
    featured: true,
    year: 2025
  },
  {
    _id: "pf-6",
    title: "Skyline Property Portal",
    slug: "skyline-property-portal",
    client: "Skyline Realty",
    summary: "A property discovery platform with immersive search across 40k live listings.",
    description:
      "Skyline needed buyers to fall in love with properties online. We built a fast, map-first discovery experience with rich media, saved searches and agent booking built in.",
    coverImage: img("real estate property listing website on a large screen, bright airy office, green plants"),
    images: [img("map based property search interface on a laptop")],
    category: "Web Development",
    technologies: ["Next.js", "Mapbox", "Elasticsearch", "Node.js", "Cloudinary"],
    results: ["40k active listings", "+52% qualified leads", "0.9s median load"],
    featured: false,
    year: 2023
  }
];

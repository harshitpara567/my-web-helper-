import { img } from "@/lib/images";

export const stats = [
  { value: "180+", label: "Projects delivered", detail: "across 14 industries" },
  { value: "98%", label: "Client retention", detail: "year over year" },
  { value: "42", label: "Specialists", detail: "design, engineering & growth" },
  { value: "12", label: "Years in delivery", detail: "shipping since 2014" }
];

export const whyChooseUs = [
  {
    title: "Senior teams, not account layers",
    description:
      "You work directly with the strategists, designers and engineers doing the work — no telephone game between you and delivery.",
    icon: "Users"
  },
  {
    title: "Engineering-led delivery",
    description:
      "Performance, accessibility and security are treated as first-class requirements, verified before anything ships.",
    icon: "ShieldCheck"
  },
  {
    title: "Design with a point of view",
    description:
      "We avoid templates. Every engagement starts from your brand, your users and the outcomes you need to move.",
    icon: "Sparkles"
  },
  {
    title: "Measured against outcomes",
    description:
      "We define success metrics up front and report against them — conversion, revenue, retention and speed.",
    icon: "Target"
  },
  {
    title: "Built to be handed over",
    description:
      "Clean architecture, documentation and enablement so your team can own and extend what we build.",
    icon: "Puzzle"
  },
  {
    title: "Partnerships that last",
    description:
      "Most of our clients stay for years. We grow with you through roadmaps, iterations and new products.",
    icon: "HeartHandshake"
  }
];

export const technologies = [
  { group: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vue"] },
  { group: "Backend", items: ["Node.js", "NestJS", "Express", "PostgreSQL", "MongoDB", "GraphQL"] },
  { group: "Mobile", items: ["React Native", "Expo", "Swift", "Kotlin", "Firebase"] },
  { group: "Cloud & DevOps", items: ["AWS", "Azure", "Docker", "Kubernetes", "Terraform", "GitHub Actions"] },
  { group: "Data & AI", items: ["Python", "OpenAI", "Pinecone", "BigQuery", "dbt"] },
  { group: "Commerce & CMS", items: ["Shopify", "Hydrogen", "Sanity", "Contentful", "Stripe"] }
];

export const process = [
  {
    step: "01",
    title: "Discover",
    description: "We interrogate the brief, the users and the numbers to define what success actually looks like."
  },
  {
    step: "02",
    title: "Design",
    description: "Strategy becomes prototypes and a design system — validated with real users before a line of code."
  },
  {
    step: "03",
    title: "Build",
    description: "Senior engineers ship in tight iterations with performance, accessibility and security enforced in CI."
  },
  {
    step: "04",
    title: "Grow",
    description: "Post-launch we measure, iterate and extend — turning a release into a compounding asset."
  }
];

export const clients = [
  "Meridian Financial",
  "Verde Living",
  "Northwind Health",
  "Atlas Freight",
  "Lumen Analytics",
  "Skyline Realty",
  "Orbit Retail",
  "Helix Labs",
  "Cobalt Energy",
  "Pinnacle Group"
];

export const caseStudies = [
  {
    slug: "meridian-banking-platform",
    client: "Meridian Financial",
    title: "Rebuilding digital banking for 2.4M customers",
    challenge:
      "A decade-old portal had fragmented experiences across web and mobile, poor performance and rising support costs.",
    solution:
      "A single accessible platform with a shared design system, real-time notifications and a self-service hub, delivered in phased releases with zero downtime.",
    outcomes: ["48% faster page loads", "3.1M monthly active sessions", "-32% support tickets"],
    image: img("modern banking dashboard on laptop and phone, premium studio scene, green accents"),
    tags: ["Enterprise", "Web", "Mobile"]
  },
  {
    slug: "verde-commerce",
    client: "Verde Living",
    title: "A headless storefront that lifted conversion 41%",
    challenge:
      "A rigid commerce theme blocked merchandising creativity and slowed the site to a crawl on mobile.",
    solution:
      "A headless Shopify build with editorial tools, rebuilt checkout and instant search — measured against a strict performance budget.",
    outcomes: ["+41% conversion", "+27% AOV", "1.1s LCP"],
    image: img("sustainable home goods storefront on a desktop monitor, warm minimal studio"),
    tags: ["E-commerce", "Performance"]
  },
  {
    slug: "northwind-health-app",
    client: "Northwind Health",
    title: "A patient companion app clinicians trust",
    challenge:
      "Patients lacked a simple way to book appointments, message care teams and track their care between visits.",
    solution:
      "A cross-platform companion app with secure messaging, scheduling and wearable integrations, plus a clinician dashboard.",
    outcomes: ["180k patients onboarded", "4.8★ rating", "+58% adherence"],
    image: img("healthcare app on smartphone in hand, clean clinical editorial photography"),
    tags: ["Mobile", "Health"]
  }
];

export const values = [
  {
    title: "Craft",
    description: "We sweat the details others skip — because quality compounds."
  },
  {
    title: "Candour",
    description: "We tell you what we think, early and honestly, even when it is inconvenient."
  },
  {
    title: "Outcomes",
    description: "We measure ourselves by your results, not our output."
  },
  {
    title: "Care",
    description: "We look after our people, our clients and the products we put into the world."
  }
];

export const team = [
  { name: "Harshit Para", role: "Founder & Principal Engineer", image: img("confident software engineering leader portrait, studio lighting", "portrait_4_3") },
  { name: "Elena Moreau", role: "Design Director", image: img("creative design director portrait, bright studio", "portrait_4_3") },
  { name: "Tobias Klein", role: "Head of Engineering", image: img("senior software engineer portrait, neutral studio", "portrait_4_3") },
  { name: "Neha Kapoor", role: "Growth Lead", image: img("marketing growth lead portrait, modern office", "portrait_4_3") }
];

export const milestones = [
  { year: "2014", text: "My Web Helper founded as a two-person studio." },
  { year: "2017", text: "Opened design and engineering practice; 20th client shipped." },
  { year: "2020", text: "Launched cloud & data practice; remote-first across three time zones." },
  { year: "2023", text: "Crossed 150 delivered projects and 98% retention." },
  { year: "2026", text: "42 specialists delivering products across 14 industries." }
];

export const openings = [
  { title: "Senior Frontend Engineer", team: "Engineering", location: "Remote / Hybrid", type: "Full-time" },
  { title: "Product Designer", team: "Design", location: "San Francisco, CA", type: "Full-time" },
  { title: "Backend Engineer (Node.js)", team: "Engineering", location: "Remote", type: "Full-time" },
  { title: "SEO Strategist", team: "Growth", location: "London, UK", type: "Full-time" },
  { title: "Delivery Manager", team: "Operations", location: "Remote / Hybrid", type: "Contract" }
];

export const perks = [
  { title: "Remote-first", description: "Work from where you are most productive.", icon: "Globe" },
  { title: "Learning budget", description: "Annual budget for courses, books and conferences.", icon: "GraduationCap" },
  { title: "Flexible hours", description: "Async-friendly culture built around outcomes.", icon: "Clock" },
  { title: "Health & wellbeing", description: "Comprehensive health cover and wellbeing support.", icon: "HeartPulse" },
  { title: "Real ownership", description: "Small teams with genuine autonomy over the work.", icon: "Rocket" },
  { title: "Great kit", description: "Top-tier hardware and tooling, refreshed regularly.", icon: "Laptop" }
];

export const offices = [
  { city: "San Francisco", detail: "220 Market Street, Level 12, CA 94105" },
  { city: "London", detail: "18 Finsbury Circus, EC2M 7EB" },
  { city: "Bengaluru", detail: "Prestige Tech Park, Kadubeesanahalli" }
];

export const faqs = [
  {
    q: "What size of organisation do you work with?",
    a: "We partner with funded startups through to global enterprises. What matters most is ambition and a clear outcome."
  },
  {
    q: "How do engagements usually run?",
    a: "Most start with a short discovery to define scope, metrics and architecture, followed by design and delivery in iterative sprints."
  },
  {
    q: "Do you work fixed-price or time and materials?",
    a: "We offer both. After discovery we recommend the model that best balances clarity and flexibility for your goals."
  },
  {
    q: "Who owns the intellectual property?",
    a: "You do. All work product, code and design assets are yours on final payment."
  },
  {
    q: "Can you work with our existing team?",
    a: "Absolutely. We embed with in-house teams regularly and adapt to your rituals, tooling and standards."
  },
  {
    q: "How quickly can we start?",
    a: "Subject to availability, discovery typically begins within two to three weeks of a signed agreement."
  }
];

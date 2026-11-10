export const siteConfig = {
  name: "My Web Helper",
  shortName: "MWH",
  tagline: "The Marketing Machine.",
  description:
    "My Web Helper is a premium digital agency crafting high-performance websites, mobile products and enterprise platforms for ambitious brands.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "hello@mywebhelper.com",
  phone: "+1 (415) 555-0142",
  address: "Level 12, Innovate Tower, 220 Market Street, San Francisco, CA 94105",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com" },
    { label: "X", href: "https://x.com" },
    { label: "Dribbble", href: "https://dribbble.com" },
    { label: "GitHub", href: "https://github.com" }
  ]
};

export const navLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Insights", href: "/insights" },
  { label: "Careers", href: "/careers" }
];

export const footerColumns = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Work", href: "/work" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" }
    ]
  },
  {
    title: "Services",
    links: [
      { label: "Web Development", href: "/services/web-development" },
      { label: "Mobile Apps", href: "/services/mobile-app-development" },
      { label: "UI/UX Design", href: "/services/ui-ux-design" },
      { label: "E-commerce", href: "/services/ecommerce-development" },
      { label: "SEO Optimization", href: "/services/seo-optimization" }
    ]
  },
  {
    title: "Resources",
    links: [
      { label: "Insights", href: "/insights" },
      { label: "Technology Expertise", href: "/services" },
      { label: "Testimonials", href: "/#testimonials" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms" }
    ]
  }
];

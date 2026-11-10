# Product Requirements Document — My Web Helper

## 1. Product Overview
My Web Helper is a premium digital agency marketing website plus a protected content-management backend. It is a full-stack, enterprise-grade web product whose visual quality and interaction design are benchmarked against Deloitte Digital, while using a fully original brand identity.

## 2. Goals
- Present a credible, premium agency brand.
- Convert visitors into leads via enquiry forms (persisted to MongoDB).
- Publish thought-leadership content (blog / insights) and portfolio case studies.
- Give non-technical admins a secure dashboard to manage all content and leads.

## 3. Target Audience
- Enterprise and mid-market decision makers sourcing digital delivery partners.
- Startup founders looking for web, mobile, e-commerce and product engineering.

## 4. Brand Identity (original)
- Name: **My Web Helper**
- Tagline: *"Digital care, engineered for growth."*
- Palette: ink `#0A0D0B`, paper `#F7F7F4`, primary green `#0E7A4F`, accent lime `#C7F284`, neutral greys.
- Typography: Display **Archivo** (heavy, tight tracking) + Body **Manrope**.
- Tone: confident, editorial, minimal, generous whitespace, sharp accents.

## 5. Scope — Public Frontend
1. Home
2. About Us
3. Services (index)
4. Service detail (dynamic, per service)
5. Our Work / Portfolio
6. Case Studies
7. Insights / Blog (index)
8. Blog detail (dynamic)
9. Contact Us
10. Careers
11. Privacy Policy
12. Terms & Conditions

### Homepage sections
Sticky navbar → Hero → Marquee/intro → Featured services → Why choose us → Featured work → Client success stories → Technology expertise → Statistics → Latest insights → Testimonials → Contact CTA → Multi-column footer.

## 6. Services (editable data source)
Web Development, Mobile App Development, UI/UX Design, E-commerce Development, Digital Marketing, SEO Optimization, Custom Software Development, Enterprise Solutions, Cloud & Technology Consulting. Each has description, benefits list, technology list, and CTA.

## 7. Scope — Backend
- Admin auth (JWT, bcrypt hashing, protected routes, authorization middleware).
- Contact enquiry API with validation + status management.
- Blog CRUD incl. publish/unpublish, categories, SEO metadata.
- Portfolio CRUD incl. categories and images.
- Testimonial CRUD.
- Category CRUD.
- Dashboard statistics + recent enquiries.

## 8. Data Models
Admin, ContactEnquiry, Blog, Category, Portfolio, Testimonial — with schema validation, timestamps, indexes and references.

## 9. Admin Panel
Login, overview dashboard, manage enquiries, blogs, portfolio, testimonials, categories, logout. Reusable dashboard components; loading / empty / error states.

## 10. SEO & Performance
SSR/SSG where appropriate, per-page metadata, dynamic blog metadata, sitemap.xml, robots.txt, Open Graph, optimized images, lazy loading, caching, semantic HTML, accessibility, mobile-first, Core Web Vitals.

## 11. Security
Input validation, sanitization, secure hashing, protected admin APIs, CORS config, rate limiting, Helmet, env variables, `.env.example`, no secrets in frontend, safe error handling.

## 12. Non-Functional Requirements
TypeScript strictness, no `any`, reusable components, no duplicated code, consistent naming, production error handling, no broken links, no console errors.

## 13. Success Criteria
- Both apps build and lint cleanly.
- All pages reachable and responsive.
- Core APIs functional and verified (health, auth, enquiry, CRUD).
- Changes committed and pushed to `origin/main`.

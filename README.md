# My Web Helper — Premium Digital Agency Website

A complete, production-ready, full-stack digital agency website. The frontend is a premium, Deloitte-Digital-inspired marketing site plus a protected content-management dashboard; the backend is a secure REST API with JWT authentication and MongoDB persistence.

> Brand identity, copy, imagery and design are 100% original. No third-party logos or copyrighted assets are used.

---

## Table of Contents

1. [Features](#features)
2. [Technology Stack](#technology-stack)
3. [Folder Structure](#folder-structure)
4. [Installation](#installation)
5. [Frontend Setup](#frontend-setup)
6. [Backend Setup](#backend-setup)
7. [MongoDB Configuration](#mongodb-configuration)
8. [Environment Variables](#environment-variables)
9. [API Documentation](#api-documentation)
10. [Admin Setup](#admin-setup)
11. [Development Commands](#development-commands)
12. [Production Deployment](#production-deployment)

---

## Features

### Public website
- Premium sticky navbar with scroll state and animated mobile menu
- Full-width hero with staggered entrance animations and floating stat cards
- Client marquee, introduction, featured services, "why choose us"
- Featured work, client success stories, technology expertise, statistics band
- Latest insights, testimonials and a strong contact call-to-action
- Multi-column footer with a working newsletter subscribe form
- 12 public pages: Home, About, Services, Service detail, Work, Case Studies,
  Insights, Blog detail, Contact, Careers, Privacy Policy, Terms & Conditions

### Backend & admin
- JWT authentication with bcrypt password hashing and protected routes
- Contact enquiry capture with validation and status management
- Full CRUD for blogs (with publish/unpublish + SEO metadata), portfolio,
  testimonials and categories
- Protected admin dashboard with overview statistics, recent enquiries and
  reusable components (data tables, modals, forms) with loading / empty / error states
- Swagger API documentation at `/api-docs`

### Engineering quality
- TypeScript throughout, strict mode, no `any`
- Reusable components, clean separation of concerns, graceful fallbacks
- SEO: per-page metadata, dynamic blog metadata, Open Graph, `sitemap.xml`, `robots.txt`, JSON-LD
- Security: Helmet, CORS allow-list, rate limiting, input validation, env-based secrets
- Responsive, accessible, mobile-first UI with Core Web Vitals in mind

---

## Technology Stack

| Area | Technology |
| --- | --- |
| Frontend | Next.js 14 (App Router), React 18, TypeScript |
| Styling | Tailwind CSS (custom design tokens) |
| Animation | Framer Motion |
| Icons | lucide-react |
| Forms | React Hook Form + Zod |
| HTTP | Axios |
| Backend | Node.js, Express 4, TypeScript |
| Database | MongoDB + Mongoose 8 |
| Auth | JWT, bcryptjs |
| Security | helmet, cors, express-rate-limit, express-validator |
| Docs | swagger-jsdoc + swagger-ui-express |
| Tooling | ESLint, Prettier |

---

## Folder Structure

```
healthy-web-care/
├── frontend/                     # Next.js 14 App Router application
│   └── src/
│       ├── app/
│       │   ├── (site)/           # Public marketing routes (navbar + footer shell)
│       │   │   ├── page.tsx      # Home
│       │   │   ├── about/ services/ work/ case-studies/
│       │   │   ├── insights/ contact/ careers/
│       │   │   └── privacy-policy/ terms/ not-found.tsx loading.tsx
│       │   ├── admin/            # Protected admin dashboard
│       │   │   ├── layout.tsx  login/
│       │   │   └── (protected)/  # overview, enquiries, blogs, portfolio, testimonials, categories
│       │   ├── sitemap.ts  robots.ts  layout.tsx  globals.css
│       ├── components/
│       │   ├── ui/               # Button, Badge, Reveal, SectionHeading, Icon, form, Marquee
│       │   ├── layout/           # Navbar, Footer, NewsletterForm
│       │   ├── home/             # Homepage sections
│       │   ├── shared/           # Logo, PageHero, CTASection, Markdown, FaqAccordion
│       │   ├── forms/            # EnquiryForm
│       │   ├── work/             # WorkGrid
│       │   └── admin/            # Dashboard shell, tables, modals, forms
│       ├── hooks/                # (reserved)
│       ├── lib/                  # site config, utils, validations, images, content, seed data
│       ├── services/             # api.service.ts (Axios), http.ts
│       └── types/                # Shared TypeScript types
│
├── backend/                      # Express + TypeScript REST API
│   └── src/
│       ├── config/               # env, db
│       ├── controllers/          # auth, enquiry, blog, portfolio, testimonial, category, dashboard
│       ├── models/               # Admin, ContactEnquiry, Blog, Category, Portfolio, Testimonial
│       ├── routes/               # index + per-resource routers
│       ├── middleware/           # auth, validate, error, rateLimit
│       ├── services/             # business logic layer
│       ├── validators/           # express-validator chains
│       ├── utils/                # ApiError, asyncHandler, token, slug, sanitize
│       ├── docs/                 # swagger.ts
│       ├── seed/                 # database seeder
│       ├── app.ts                # express app
│       └── server.ts             # entry point
│
├── .trae/documents/              # PRD + Technical Architecture
├── package.json                  # root convenience scripts
├── .gitignore
└── README.md
```

---

## Installation

Requirements: **Node.js ≥ 18.18**, **npm**, and a **MongoDB** instance (local or Atlas).

```bash
# 1. Clone
git clone https://github.com/harshitpara567/my-web-helper-.git
cd my-web-helper-

# 2. Install both apps
npm run install:all
# or individually:
npm --prefix frontend install
npm --prefix backend install
```

---

## Frontend Setup

```bash
cd frontend
cp .env.example .env.local     # then edit values
npm run dev                    # http://localhost:3000
```

The marketing site renders from curated content and gracefully falls back to it if
the API is unreachable, so you can preview the UI with or without the backend running.

---

## Backend Setup

```bash
cd backend
cp .env.example .env           # then edit values
npm run seed                   # creates the default admin + sample content (needs MongoDB)
npm run dev                    # http://localhost:5000  (docs at /api-docs)
```

---

## MongoDB Configuration

- **Local:** start `mongod` and use `MONGODB_URI=mongodb://127.0.0.1:27017/healthy_web_care`
- **Atlas:** create a cluster and use
  `MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>/healthy_web_care?retryWrites=true&w=majority`
- Whitelist your IP and create a database user with read/write access.
- Collections are created automatically by Mongoose on first write. Run `npm run seed`
  in `backend/` to populate the default admin and sample data.

---

## Environment Variables

### Frontend — `frontend/.env.local`

| Variable | Description | Example |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | Base URL of the backend API | `http://localhost:5000/api` |
| `NEXT_PUBLIC_SITE_URL` | Canonical public site URL (metadata, sitemap, OG) | `http://localhost:3000` |

### Backend — `backend/.env`

| Variable | Description | Example |
| --- | --- | --- |
| `NODE_ENV` | Environment | `development` |
| `PORT` | API port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://127.0.0.1:27017/healthy_web_care` |
| `JWT_SECRET` | Long random secret for signing tokens | `a-long-random-string` |
| `JWT_EXPIRES_IN` | Token lifetime | `7d` |
| `CORS_ORIGINS` | Comma-separated allowed origins | `http://localhost:3000` |
| `RATE_LIMIT_WINDOW_MS` | Rate-limit window (ms) | `900000` |
| `RATE_LIMIT_MAX` | Max requests per window | `300` |
| `ADMIN_NAME` | Default admin name (seed) | `My Web Helper Admin` |
| `ADMIN_EMAIL` | Default admin email (seed) | `admin@mywebhelper.com` |
| `ADMIN_PASSWORD` | Default admin password (seed) | `Admin@12345` |

> Never commit real `.env` files — they are gitignored. Use `.env.example` as the template.

---

## API Documentation

Base URL: `http://localhost:5000/api` — interactive docs at `http://localhost:5000/api-docs`.

All responses use the envelope `{ "success": boolean, "message"?: string, "data": T }`.

| Method | Endpoint | Auth | Purpose |
| --- | --- | --- | --- |
| GET | `/health` | — | Health check |
| POST | `/auth/login` | — | Admin login → JWT |
| GET | `/auth/me` | ✅ | Current admin |
| POST | `/enquiries` | — | Create enquiry |
| GET | `/enquiries` | ✅ | List enquiries (filter by status/search) |
| PATCH | `/enquiries/:id/status` | ✅ | Update enquiry status |
| DELETE | `/enquiries/:id` | ✅ | Delete enquiry |
| GET | `/blogs` | — | Published blogs (category/search/page) |
| GET | `/blogs/:slug` | — | Blog by slug |
| GET | `/blogs/admin/all` | ✅ | All blogs |
| POST | `/blogs` | ✅ | Create blog |
| PUT | `/blogs/:id` | ✅ | Update blog |
| PATCH | `/blogs/:id/publish` | ✅ | Publish / unpublish |
| DELETE | `/blogs/:id` | ✅ | Delete blog |
| GET | `/portfolio` | — | List projects |
| GET | `/portfolio/:slug` | — | Project by slug |
| POST | `/portfolio` | ✅ | Create project |
| PUT | `/portfolio/:id` | ✅ | Update project |
| DELETE | `/portfolio/:id` | ✅ | Delete project |
| GET | `/testimonials` | — | List testimonials |
| POST | `/testimonials` | ✅ | Create testimonial |
| PUT | `/testimonials/:id` | ✅ | Update testimonial |
| DELETE | `/testimonials/:id` | ✅ | Delete testimonial |
| GET | `/categories` | — | List categories |
| POST | `/categories` | ✅ | Create category |
| PUT | `/categories/:id` | ✅ | Update category |
| DELETE | `/categories/:id` | ✅ | Delete category |
| GET | `/dashboard/stats` | ✅ | Dashboard statistics + recent enquiries |

Authenticated requests must send `Authorization: Bearer <token>`.

---

## Admin Setup

1. Ensure `backend/.env` has `ADMIN_EMAIL` / `ADMIN_PASSWORD` set.
2. Run `npm run seed` in `backend/` to create the admin and sample content.
3. Start the backend (`npm run dev`) and frontend (`npm run dev`).
4. Visit `http://localhost:3000/admin/login` and sign in with the seeded credentials
   (default: `admin@mywebhelper.com` / `Admin@12345` — change these in production).

The dashboard provides: overview statistics, enquiry management, blog management
(create/edit/publish), portfolio management, testimonial management and category management.

---

## Development Commands

| Location | Command | Description |
| --- | --- | --- |
| root | `npm run install:all` | Install both apps |
| root | `npm run dev:frontend` | Run frontend dev server |
| root | `npm run dev:backend` | Run backend dev server |
| root | `npm run build:frontend` | Build frontend |
| root | `npm run build:backend` | Build backend |
| root | `npm run lint` | Lint both apps |
| frontend | `npm run dev` / `build` / `start` / `lint` / `typecheck` | Next.js scripts |
| backend | `npm run dev` / `build` / `start` / `seed` / `lint` / `typecheck` | API scripts |

---

## Production Deployment

### Backend
```bash
cd backend
npm run build          # compiles TypeScript to dist/
NODE_ENV=production npm start
```
Deploy to any Node host (Render, Railway, Fly.io, EC2). Set all backend env vars,
point `CORS_ORIGINS` at your production frontend domain, and use a strong `JWT_SECRET`.

### Frontend (Vercel recommended)
```bash
cd frontend
npm run build && npm start
```
Set `NEXT_PUBLIC_API_URL` to the deployed API URL and `NEXT_PUBLIC_SITE_URL` to the
production domain. Add both the frontend and API domains to `CORS_ORIGINS` on the backend.

---

© My Web Helper. Built as a premium, original brand identity.

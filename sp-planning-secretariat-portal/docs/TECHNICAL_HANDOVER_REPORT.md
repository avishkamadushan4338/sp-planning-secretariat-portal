# Technical Analysis Report
## SP Planning Secretariat Portal
### Provincial Planning Secretariat — Southern Province, Sri Lanka

**Document Reference:** TR-SPPS-2026-001  
**Version:** 1.0  
**Date:** June 2026  
**Classification:** Restricted — Authorized Technical Personnel Only

---

## TABLE OF CONTENTS

1. [Executive Summary](#1-executive-summary)
2. [System Architecture Overview](#2-system-architecture-overview)
3. [Technology Stack](#3-technology-stack)
4. [Project Repository Structure](#4-project-repository-structure)
5. [Frontend Application — Technical Analysis](#5-frontend-application--technical-analysis)
6. [Backend Application — Technical Analysis](#6-backend-application--technical-analysis)
7. [Database Layer — Technical Analysis](#7-database-layer--technical-analysis)
8. [Authentication & Authorization Systems](#8-authentication--authorization-systems)
9. [Content Management System (CMS)](#9-content-management-system-cms)
10. [Store Management Portal (SMP)](#10-store-management-portal-smp)
11. [Public Portal — Module Analysis](#11-public-portal--module-analysis)
12. [REST API Reference](#12-rest-api-reference)
13. [Deployment Configuration](#13-deployment-configuration)
14. [Environment Variables Reference](#14-environment-variables-reference)
15. [Security Assessment](#15-security-assessment)
16. [Known Limitations & Recommendations](#16-known-limitations--recommendations)

---

## 1. EXECUTIVE SUMMARY

The SP Planning Secretariat Portal is an official government web platform developed for the Provincial Planning Secretariat, Southern Province, Sri Lanka. The system is a full-stack JavaScript monorepo comprising three sub-systems delivered as a single React Single Page Application (SPA):

| Sub-system | Purpose | Route Prefix |
|---|---|---|
| **Public Portal** | Official government website for the general public | `/home`, `/about`, `/departments`, etc. |
| **Content Management System (CMS)** | Web-based content administration dashboard | `/cms/*` |
| **Store Management Portal (SMP)** | Government inventory & stationery management | `/smp/*` |

**Core Technologies:** React 18, Vite, React Router v6, Node.js, Express.js, JWT, bcryptjs  
**Data Storage:** JSON flat-file system (no external database dependency)  
**Frontend Hosting:** Vercel CDN  
**Backend Hosting:** Node.js on self-hosted VPS or compatible PaaS  
**Version:** 1.0.0 (Initial Production Release)

---

## 2. SYSTEM ARCHITECTURE OVERVIEW

### 2.1 High-Level Architecture

```
┌───────────────────────────────────────────────────────────────────┐
│                     CDN / Frontend Host                            │
│                                                                     │
│   ┌─────────────────────────────────────────────────────────┐     │
│   │  React SPA  (Vite Build — Single index.html)             │     │
│   │                                                           │     │
│   │  ┌──────────────┐ ┌──────────────┐ ┌────────────────┐   │     │
│   │  │ Public Portal │ │  CMS Admin   │ │  SMP Portal    │   │     │
│   │  │  /home, ...   │ │  /cms/*      │ │  /smp/*        │   │     │
│   │  └──────────────┘ └──────────────┘ └────────────────┘   │     │
│   └──────────────────────────┬──────────────────────────────┘     │
└─────────────────────────────│───────────────────────────────────────┘
                               │  HTTP/HTTPS  (Axios, REST JSON)
                               ▼
┌───────────────────────────────────────────────────────────────────┐
│               Node.js / Express REST API  (Port 5000)              │
│                                                                     │
│  Middleware:  CORS → express.json → requireAuth → requireRole       │
│                                                                     │
│  /api/health           /api/news-bar        /api/contact            │
│  /api/smp/auth         /api/smp/users       /api/smp/items          │
│  /api/smp/issued       /api/smp/borrow      /api/smp/disposal       │
│  /api/smp/reports                                                   │
│                                                                     │
│  Cron:  node-cron  →  daily midnight  →  login log cleanup          │
└──────────────────────────────┬────────────────────────────────────┘
                               │  fs.readFileSync / fs.writeFileSync
                               ▼
┌───────────────────────────────────────────────────────────────────┐
│              Data Layer  —  JSON Flat Files                         │
│              backend/src/data/                                      │
│                                                                     │
│  smp_users.json        smp_items.json        smp_unique_items.json  │
│  smp_categories.json   smp_transactions.json smp_issued.json        │
│  smp_borrowed.json     smp_reservations.json smp_disposals.json     │
│  smp_audit_logs.json   smp_login_logs.json                          │
│  complaints.json       news-bar.json                                │
└───────────────────────────────────────────────────────────────────┘
```

### 2.2 Monorepo Workspace Layout

The root `package.json` defines three NPM workspaces:

| Workspace | Path | Status |
|---|---|---|
| `frontend` | `sp-planning-secretariat-portal/frontend/` | Active — production React SPA |
| `backend` | `sp-planning-secretariat-portal/backend/` | Active — production Express API |
| `admin` | `sp-planning-secretariat-portal/admin/` | Stub — reserved, not yet implemented |

### 2.3 Request Flow

```
Browser Request
    │
    ├──→ Static assets / SPA (CDN)
    │        React Router intercepts path
    │        Component renders, may call API
    │
    └──→ API Call (Axios → VITE_API_URL/api/...)
             │
             ├── CORS check (origin whitelist)
             ├── express.json() parse body
             ├── requireAuth()  — validates Bearer JWT
             ├── requireRole()  — checks user.role
             ├── Route handler  — reads/writes JSON files
             └── JSON response
```

---

## 3. TECHNOLOGY STACK

### 3.1 Frontend Dependencies

| Package | Purpose |
|---|---|
| `react` 18.x | Core UI library |
| `react-dom` 18.x | DOM renderer |
| `react-router-dom` 6.x | Client-side routing, nested layouts |
| `vite` | Build tool & HMR dev server |
| `framer-motion` | Declarative animation (page transitions, modals, micro-interactions) |
| `gsap` + `@gsap/react` | Imperative scroll-trigger animations |
| `lenis` | Smooth-scroll engine synchronized to GSAP ticker |
| `axios` | HTTP client for all backend API calls |
| `tailwindcss` | Utility-first CSS framework |
| `postcss` + `autoprefixer` | CSS processing pipeline |
| `react-icons` | Icon sets (Feather, Font Awesome, etc.) |
| `lucide-react` | Additional icon set |
| `sonner` | Toast notification system |
| `react-helmet-async` | `<head>` / SEO meta management |
| `swiper` | Touch-capable slider / carousel |
| `react-countup` | Animated number counter |
| `react-intersection-observer` | IntersectionObserver hook |
| `tailwind-merge` | Conditional Tailwind class merging |

**External Fonts (loaded via CSS `@import` or Google Fonts CDN):**
- `Inter` — body text
- `Playfair Display` — display headings
- `Cinzel` — formal label text (CMS/SMP chrome)
- `Noto Sans Sinhala` — Sinhala language content
- `Noto Sans Tamil` — Tamil language content

### 3.2 Backend Dependencies

| Package | Purpose |
|---|---|
| `express` 4.x | HTTP server and routing framework |
| `jsonwebtoken` | JWT signing (`signToken`) and verification (`verifyToken`) |
| `bcryptjs` | Password hashing — bcrypt, cost factor 10 |
| `express-rate-limit` | Rate limiting middleware on login endpoint |
| `cors` | Cross-Origin Resource Sharing header management |
| `nodemailer` | SMTP email delivery for contact form |
| `node-cron` | Cron scheduler for automated log cleanup |
| `uuid` | RFC 4122 v4 UUID generation for all record IDs |
| `dotenv` | `.env` file loading into `process.env` |

### 3.3 Build & Tooling

| Tool | Purpose |
|---|---|
| Vite 5.x | Frontend bundler — outputs `frontend/dist/` |
| ESLint | JavaScript linting (`frontend/.eslintrc.json`) |
| PostCSS / Autoprefixer | CSS vendor prefix injection |
| npm workspaces | Monorepo dependency management |
| nodemon | Backend auto-restart during development |

---

## 4. PROJECT REPOSITORY STRUCTURE

```
d:/planing_se/
├── vercel.json                          ← Root deployment config
├── package-lock.json
│
└── sp-planning-secretariat-portal/
    ├── package.json                     ← Monorepo workspace root
    ├── docker-compose.yml               ← (Stub — not in use)
    ├── .env.example                     ← (Stub — not populated)
    ├── README.md
    │
    ├── frontend/                        ← React SPA (Vite)
    │   ├── package.json
    │   ├── vite.config.js
    │   ├── tailwind.config.js
    │   ├── vercel.json
    │   ├── .eslintrc.json
    │   │
    │   ├── public/
    │   │   ├── branding/
    │   │   │   ├── logo.png             ← Splash screen logo (384×384 display)
    │   │   │   ├── f-logo.svg           ← Formal SVG logo (CMS/SMP login panels)
    │   │   │   ├── logo.svg             ← SVG variant
    │   │   │   ├── hero.jpeg            ← Home hero slide 1
    │   │   │   ├── hero2.jpeg           ← Home hero slide 2
    │   │   │   ├── hero3.jpeg           ← Home hero slide 3
    │   │   │   ├── ddsp1-6.png          ← Deputy Secretary photo gallery
    │   │   │   ├── sec-ho.png           ← Secretariat building photo
    │   │   │   ├── sec-prof.png         ← Secretary profile photo
    │   │   │   ├── ao.png               ← Admin officer photo
    │   │   │   ├── dir.png              ← Director photo
    │   │   │   ├── govlo.jpg            ← Sri Lanka government emblem
    │   │   │   ├── office.png           ← Office photo
    │   │   │   ├── af1-6.png            ← Additional facility photos
    │   │   │   └── tp1-3.png            ← Third-party/event photos
    │   │   ├── robots.txt
    │   │   ├── sitemap.xml
    │   │   ├── sitemap-news.xml
    │   │   ├── browserconfig.xml
    │   │   └── schemas.jsonld           ← JSON-LD structured data (SEO)
    │   │
    │   └── src/
    │       ├── main.jsx                 ← Entry: GSAP registration, Lenis init, ReactDOM.render
    │       ├── Root.jsx                 ← Provider tree root
    │       ├── App.jsx                  ← Route definitions (React Router v6)
    │       ├── styles/
    │       │   └── index.css            ← Global CSS + Tailwind @layer base/components
    │       │
    │       ├── features/
    │       │   ├── portal/              ← Public-facing website pages
    │       │   │   ├── landing/
    │       │   │   │   └── LandingPage.jsx   ← Language selection gateway (EN/SI/TA)
    │       │   │   ├── home/
    │       │   │   │   ├── Home.jsx               ← Hero slider + section assembly
    │       │   │   │   ├── HomeNewsBar.jsx         ← Live ticker from API
    │       │   │   │   ├── HomeQuickLinks.jsx      ← Navigation grid
    │       │   │   │   ├── HomeAboutSecretariat.jsx← About + animated counters
    │       │   │   │   ├── HomeDeputySecretaryMessage.jsx
    │       │   │   │   ├── HomeEventsAndInstitutes.jsx
    │       │   │   │   └── HomeFAQHighlights.jsx
    │       │   │   ├── about/
    │       │   │   │   ├── About.jsx                  ← Nested route host
    │       │   │   │   ├── History.jsx
    │       │   │   │   ├── OrganizationStructureChart.jsx
    │       │   │   │   └── aboutData.js               ← Static about content
    │       │   │   ├── about-deputy-secretary/
    │       │   │   │   └── AboutDeputySecretary.jsx
    │       │   │   ├── departments/
    │       │   │   │   ├── Departments.jsx        ← Grid listing
    │       │   │   │   ├── DepartmentDetail.jsx   ← Detail for accounts/admin/development
    │       │   │   │   └── DepartmentProfile.jsx  ← Profile for head-administration/head-accounts
    │       │   │   ├── news/        └── News.jsx
    │       │   │   ├── notices/     └── Notices.jsx
    │       │   │   ├── gallery/     └── Gallery.jsx
    │       │   │   ├── documents/   └── Documents.jsx
    │       │   │   ├── downloads/   └── Downloads.jsx
    │       │   │   ├── faq/         └── FAQ.jsx
    │       │   │   ├── contact/     └── Contact.jsx
    │       │   │   ├── terms/       └── TermsAndServices.jsx
    │       │   │   ├── coming-soon/ └── ComingSoonPage.jsx
    │       │   │   └── not-found/   └── NotFound.jsx
    │       │   │
    │       │   ├── cms/                 ← Content Management System
    │       │   │   ├── CMSLogin.jsx          ← Login UI (client-side auth)
    │       │   │   ├── CMSDashboard.jsx      ← Full dashboard (1300+ lines)
    │       │   │   ├── CMSHomeNewsBar.jsx    ← News bar editor widget
    │       │   │   ├── CMSHomeEvents.jsx     ← Events editor widget
    │       │   │   └── cmsAuth.js            ← localStorage credential manager
    │       │   │
    │       │   └── smp/                 ← Store Management Portal
    │       │       ├── SMPLogin.jsx
    │       │       ├── SMPLayout.jsx         ← Sidebar shell with nav
    │       │       ├── SMPContext.jsx         ← Auth state (React Context)
    │       │       ├── SMPDashboard.jsx
    │       │       ├── SMPInventory.jsx
    │       │       ├── SMPIssue.jsx
    │       │       ├── SMPBorrow.jsx
    │       │       ├── SMPReservations.jsx
    │       │       ├── SMPDisposal.jsx
    │       │       ├── SMPReports.jsx
    │       │       ├── SMPUsers.jsx
    │       │       ├── SMPLoginLogs.jsx
    │       │       ├── SMPTransactions.jsx
    │       │       └── smpApi.js              ← Axios API client (all SMP endpoints)
    │       │
    │       └── shared/
    │           ├── animation/           ← Reusable animation component library
    │           │   ├── index.js         ← Barrel export
    │           │   ├── motion.js        ← Shared Framer Motion variants
    │           │   ├── LoadingScreen.jsx
    │           │   ├── PageTransition.jsx
    │           │   ├── RevealOnScroll.jsx
    │           │   ├── StaggerContainer.jsx
    │           │   ├── AnimatedCard.jsx
    │           │   ├── AnimatedButton.jsx
    │           │   ├── AnimatedCounter.jsx
    │           │   ├── AnimatedTimeline.jsx
    │           │   ├── AnimatedBackground.jsx
    │           │   ├── ScrollProgress.jsx
    │           │   └── SectionHeader.jsx
    │           ├── components/
    │           │   ├── Navbar.jsx           ← Multilingual mega-menu navigation
    │           │   ├── Footer.jsx           ← Multilingual footer
    │           │   ├── ComingSoon.jsx       ← Inline coming-soon component
    │           │   └── ProgressiveImage.jsx ← Lazy-load + blur-up image
    │           ├── contexts/
    │           │   ├── SitePublishContext.jsx       ← Provider
    │           │   ├── SitePublishContextInstance.js← Context object
    │           │   ├── useSitePublish.js            ← Consumer hook
    │           │   └── FooterContext.jsx             ← Footer visibility context
    │           ├── hooks/
    │           │   ├── useReducedMotion.js
    │           │   ├── useAnimatedCounter.js
    │           │   ├── useMagneticHover.js
    │           │   ├── useGSAPScrollTrigger.js
    │           │   ├── useParallax.js
    │           │   ├── useScrollReveal.js
    │           │   └── usePageHold.js
    │           ├── layouts/
    │           │   └── MainLayout.jsx       ← Navbar + <Outlet> + Footer shell
    │           └── seo/
    │               ├── index.js
    │               └── SeoHead.jsx          ← react-helmet-async wrapper
    │
    ├── backend/                         ← Node.js / Express REST API
    │   ├── src/
    │   │   ├── server.js                ← Entry: Express app, CORS, route registration
    │   │   ├── db/
    │   │   │   ├── index.js             ← JSON file CRUD abstraction layer
    │   │   │   └── seed.js              ← First-run data initializer
    │   │   ├── middleware/
    │   │   │   ├── auth.js              ← JWT sign / verify / requireAuth / requireRole
    │   │   │   └── audit.js             ← Response-intercepting audit log writer
    │   │   ├── utils/
    │   │   │   └── cleanup.js           ← node-cron: prune login logs > 28 days
    │   │   └── features/
    │   │       ├── portal/routes/
    │   │       │   ├── newsBar.js        ← GET + PUT /api/news-bar
    │   │       │   └── contact.js        ← POST/GET/PATCH/DELETE /api/contact
    │   │       └── smp/routes/
    │   │           ├── smpAuth.js        ← Login / Logout / Me
    │   │           ├── smpUsers.js       ← User CRUD (admin-only)
    │   │           ├── smpItems.js       ← Inventory CRUD + stock-in/out
    │   │           ├── smpIssued.js      ← Issue records
    │   │           ├── smpBorrow.js      ← Borrow + Reservation lifecycle
    │   │           ├── smpDisposal.js    ← Disposal workflow
    │   │           └── smpReports.js     ← Dashboard + all report endpoints
    │   │
    │   ├── data/                        ← Auto-created by seed.js; all persistent data
    │   │   ├── smp_users.json
    │   │   ├── smp_items.json
    │   │   ├── smp_unique_items.json
    │   │   ├── smp_categories.json
    │   │   ├── smp_transactions.json
    │   │   ├── smp_issued.json
    │   │   ├── smp_borrowed.json
    │   │   ├── smp_reservations.json
    │   │   ├── smp_disposals.json
    │   │   ├── smp_audit_logs.json
    │   │   ├── smp_login_logs.json
    │   │   ├── complaints.json
    │   │   └── news-bar.json
    │   │
    │   └── credentials.json             ← Google Cloud Service Account key ⚠ SENSITIVE
    │
    └── admin/                           ← Reserved workspace (stub, no code)
        ├── package.json
        └── src/App.jsx                  ← Empty file
```

---

## 5. FRONTEND APPLICATION — TECHNICAL ANALYSIS

### 5.1 Application Entry Point

**File:** `frontend/src/main.jsx`

Bootstrap sequence on page load:

```
1. gsap.registerPlugin(ScrollTrigger)
2. new Lenis({ duration: 1.3, easing: exponential-out, smoothWheel: true })
3. lenis.on('scroll', ScrollTrigger.update)       ← sync Lenis to GSAP
4. gsap.ticker.add((t) => lenis.raf(t * 1000))   ← drive Lenis from GSAP ticker
5. gsap.ticker.lagSmoothing(0)
6. ReactDOM.createRoot('#root').render(<React.StrictMode><Root /></React.StrictMode>)
```

### 5.2 Provider Tree

**File:** `frontend/src/Root.jsx`

```jsx
<LoadingScreen onDone={() => setAppReady(true)} />     // animated splash, ~1.2s auto-dismiss
<div style={{ opacity: appReady ? 1 : 0 }}>            // fade-in after loading
  <HelmetProvider>                                       // react-helmet-async
    <BrowserRouter>
      <SitePublishProvider>                             // publish-mode flag
        <App />                                         // route tree
        <Toaster position="top-right" richColors />     // sonner toast
      </SitePublishProvider>
    </BrowserRouter>
  </HelmetProvider>
</div>
```

### 5.3 Route Architecture

**File:** `frontend/src/App.jsx`

React Router v6 with three distinct layout shells:

**Shell 1 — Standalone** (no Navbar/Footer):
```
/                    → LandingPage        (PortalGate wrapped)
/terms               → TermsAndServices   (PortalGate wrapped)
/cms                 → CMSLogin
/cms/dashboard       → CMSDashboard
/smp                 → SMPLogin
```

**Shell 2 — SMP Layout** (`SMPLayout` = sidebar + `<Outlet>`):
```
/smp/dashboard       → SMPDashboard
/smp/inventory       → SMPInventory
/smp/disposal        → SMPDisposal
/smp/transactions    → SMPTransactions
/smp/reports         → SMPReports
/smp/login-logs      → SMPLoginLogs       (admin only rendered in sidebar)
/smp/users           → SMPUsers           (admin only rendered in sidebar)
```

**Shell 3 — Main Layout** (`Navbar` + `<Outlet>` + `Footer`, PortalGate wrapped):
```
/home                        → Home
/about/*                     → About (nested routes handled internally)
/about-deputy-secretary      → AboutDeputySecretary
/departments                 → Departments
/departments/:slug           → DepartmentRouter
    slug ∈ {accounts, administration, development} → DepartmentDetail
    slug ∈ {head-administration, head-accounts}    → DepartmentProfile
    else                                           → Navigate /departments
/documents                   → Documents
/news                        → News
/notices                     → Notices
/gallery                     → Gallery
/contact                     → Contact
/downloads                   → Downloads
/*                           → NotFound
```

### 5.4 Portal Publish Gate

**Files:** `shared/contexts/SitePublishContext.jsx`, `SitePublishContextInstance.js`, `useSitePublish.js`

A client-side feature flag stored in `localStorage` under key `site_publish_mode`.

| `localStorage` value | Portal behaviour |
|---|---|
| `"live"` | All public portal routes render normally |
| `"coming_soon"` or absent | `<ComingSoonPage />` renders instead of portal content |

The gate wraps only the public portal and landing page — CMS and SMP routes are never gated. Flag changes propagate across open browser tabs via the `storage` DOM event. The CMS "Publish Site" section calls `setLive(true/false)` to toggle.

> This is a **UI-level gate only**. It does not restrict access at the server or network level.

### 5.5 Multilingual System

The portal supports three languages: **English (en)**, **Sinhala (si)**, **Tamil (ta)**.

- Language selection occurs at `/` (`LandingPage`). Selection is stored in `localStorage` as `lang`.
- The `Navbar` and `Footer` components consume `lang` from `localStorage` and render all labels, links, and typography settings from embedded translation objects (`FOOTER_T`, `ABOUT_US_MENU`, etc.) keyed by language code.
- Sinhala content uses `Noto Sans Sinhala` font; Tamil uses `Noto Sans Tamil`.
- The `Home.jsx` hero slider content is also language-keyed (`SLIDES.en`, `SLIDES.si`, `SLIDES.ta`).

### 5.6 Animation Architecture

**Directory:** `shared/animation/`

All animation components are built on **Framer Motion**. Scroll-trigger animations additionally use **GSAP + ScrollTrigger** via custom hooks.

| Component | Behaviour | Key Prop |
|---|---|---|
| `LoadingScreen` | Animated progress arc + logo reveal. Auto-dismisses at 100%. Calls `onDone`. | `onDone: () => void` |
| `PageTransition` | Wraps `<Outlet>` in `MainLayout`. Fade + slight Y-translate on route change. | — |
| `RevealOnScroll` | Fades in child when it enters the viewport. | `delay`, `direction` |
| `StaggerContainer` | Applies staggered delay to each direct child's entrance animation. | `staggerDelay` |
| `AnimatedCard` | Card with hover lift + shadow transition via `whileHover`. | — |
| `AnimatedButton` | Magnetic hover — mouse offset tracked, element shifts toward cursor. | — |
| `AnimatedCounter` | Counts up from 0 to target number on scroll-into-view. | `target`, `suffix` |
| `AnimatedTimeline` | Vertical timeline with sequenced line-draw and node reveal. | `items[]` |
| `AnimatedBackground` | Decorative SVG/canvas animated backdrop. | — |
| `ScrollProgress` | Fixed top-of-page progress bar tracking scroll depth. | `height`, `zIndex` |
| `SectionHeader` | Animated section heading with ornamental divider. | `title`, `subtitle` |

**Custom Hooks:**

| Hook | Implementation |
|---|---|
| `useReducedMotion` | Reads `window.matchMedia('(prefers-reduced-motion: reduce)')` — disables animations for accessibility |
| `useAnimatedCounter` | IntersectionObserver + requestAnimationFrame count-up |
| `useMagneticHover` | `mousemove` listener → computes offset vector → updates element transform |
| `useGSAPScrollTrigger` | Wraps `gsap.fromTo()` inside a `ScrollTrigger` — cleans up on unmount |
| `useParallax` | `scroll` listener → CSS `transform: translateY()` proportional to scroll position |
| `useScrollReveal` | IntersectionObserver → toggles `data-revealed` attribute |
| `usePageHold` | Prevents React Router navigation while Framer Motion exit animation runs |

### 5.7 MainLayout Shell

**File:** `shared/layouts/MainLayout.jsx`

```
<div className="layout">
  <ScrollProgress height={2} zIndex={9998} />   ← fixed progress bar
  <Navbar />
  <main className="main-content">
    <PageTransition>                             ← route-change animation
      <PageErrorBoundary>                        ← class-based error boundary
        <Outlet />                               ← active page component
      </PageErrorBoundary>
    </PageTransition>
  </main>
  {!hidden && <Footer />}                        ← FooterContext controls visibility
</div>
```

### 5.8 Navbar

**File:** `shared/components/Navbar.jsx`

- **Mega-menu** dropdown for "About Us" with icons, titles, and descriptions in all three languages.
- Fixed top position; becomes opaque on scroll.
- Hamburger mobile menu with full-screen overlay.
- Active route detection via `useLocation`.
- Language-aware: all label strings and nav links come from translation objects keyed by `lang`.

### 5.9 SEO Implementation

**File:** `shared/seo/SeoHead.jsx`

Wraps `react-helmet-async`'s `<Helmet>` to inject per-page:
- `<title>` and `<meta name="description">`
- Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`)
- Twitter card tags

**Static SEO files in `public/`:**

| File | Purpose |
|---|---|
| `robots.txt` | Instructs search crawler bots |
| `sitemap.xml` | Full site URL map for indexing |
| `sitemap-news.xml` | Google News-format sitemap |
| `schemas.jsonld` | Structured data: `Organization`, `GovernmentOrganization` types |
| `browserconfig.xml` | IE / Edge tile pin configuration |

### 5.10 Brand Colour Tokens

Used as inline constants throughout all feature components:

| Token | Hex | Usage |
|---|---|---|
| `MAROON` | `#4A0918` | Primary brand — backgrounds, text, buttons |
| `MAROON2` | `#3A0712` | Darker variant — CMS/SMP login panel backgrounds |
| `GOLD` | `#C79A2B` | Accent — borders, icons, hover states, ornaments |
| `CREAM` | `#FCFBFA` | Light background for form panels |

---

## 6. BACKEND APPLICATION — TECHNICAL ANALYSIS

### 6.1 Server Bootstrap

**File:** `backend/src/server.js`

```js
require('dotenv').config()
const app = express()

// CORS: whitelist from FRONTEND_URL env var; also allow any localhost port
app.use(cors({ origin: (origin, cb) => { ... } }))
app.use(express.json())

// Portal routes
app.get('/api/health', ...)
app.use('/api/news-bar', newsBarRouter)
app.use('/api/contact',  contactRouter)

// SMP routes
app.use('/api/smp/auth',     smpAuth)
app.use('/api/smp/users',    smpUsers)
app.use('/api/smp/items',    smpItems)
app.use('/api/smp/disposal', smpDisposal)
app.use('/api/smp/reports',  smpReports)
// Note: smpIssued and smpBorrow are registered inside smpItems/smpBorrow files

startCleanupCron()
app.listen(PORT || 5000)
```

> `smpBorrow` includes both `/api/smp/borrow` (borrowing) and `/api/smp/borrow/reservations` (institutional reservations) in one router file.

### 6.2 Authentication Middleware

**File:** `backend/src/middleware/auth.js`

```js
// Signing
signToken(payload)    → jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' })

// Verification
verifyToken(token)    → jwt.verify(token, JWT_SECRET)

// Route middleware — must be used on protected routes
requireAuth(req, res, next)        → checks Authorization: Bearer <token>; sets req.user
requireRole(...roles)(req, res, next) → checks req.user.role ∈ roles
```

JWT payload shape: `{ id, username, role, name, logId }`

### 6.3 Audit Log Middleware

**File:** `backend/src/middleware/audit.js`

A higher-order Express middleware that monkey-patches `res.json()`. On any successful (`statusCode < 400`) response to an authenticated user, it writes a record to `smp_audit_logs.json`:

```js
{
  id, userId, username, action, resourceType,
  resourceId, details, ip, createdAt
}
```

Usage: `router.post('/', requireAuth, auditLog('created', 'item', 'id', {...}), handler)`

### 6.4 Login Rate Limiting

**File:** `backend/src/features/smp/routes/smpAuth.js`

```js
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,   // 15 minutes
  max: 10,                      // 10 attempts per window per IP
  message: { error: 'Too many login attempts. Please wait 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
})
router.post('/login', loginLimiter, async (req, res) => { ... })
```

### 6.5 Email Notification System

**File:** `backend/src/features/portal/routes/contact.js`

When a contact form is submitted (`POST /api/contact`):

1. Record is written to `complaints.json` immediately.
2. `201 { ok: true, id }` is returned to the client.
3. Email delivery runs **asynchronously** (fire-and-forget — errors are logged but do not affect the response).

Two HTML emails are dispatched via Nodemailer SMTP:

| Recipient | Subject format | Content |
|---|---|---|
| `ADMIN_EMAIL` env var | `⚑ [Complaint] <subject> — Ref #<refId>` | Full submission with Reply CTA |
| Submitter's email | `✅ Received: <subject> (Ref #<refId>)` | Acknowledgement with reference number and 3-step process |

Reference ID: last 8 characters of `Date.now().toString().slice(-8).toUpperCase()`

SMTP is configured via env vars: `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`.

Timeouts: `connectionTimeout: 8000ms`, `greetingTimeout: 5000ms`, `socketTimeout: 10000ms`

The CMS can also read all submissions (`GET /api/contact`), update status (`PATCH /api/contact/:id`), and delete records (`DELETE /api/contact/:id`). These endpoints have no authentication.

### 6.6 News Bar API

**File:** `backend/src/features/portal/routes/newsBar.js`

Simple two-endpoint file-backed API:

| Method | Endpoint | Body | Returns |
|---|---|---|---|
| GET | `/api/news-bar` | — | `[{ text, ... }, ...]` |
| PUT | `/api/news-bar` | `[{ text, ... }, ...]` | `{ ok: true }` |

Data stored at `backend/data/news-bar.json`. No authentication. The CMS saves the entire array on every edit.

### 6.7 Scheduled Cleanup

**File:** `backend/src/utils/cleanup.js`

```js
cron.schedule('0 0 * * *', () => {
  const cutoff = new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString()
  db.removeWhere('login_logs', r => r.createdAt < cutoff)
}, { timezone: 'Asia/Colombo' })
```

Runs at `00:00 Asia/Colombo` daily. Removes `smp_login_logs.json` entries older than 28 days.

---

## 7. DATABASE LAYER — TECHNICAL ANALYSIS

### 7.1 Architecture

**File:** `backend/src/db/index.js`

All persistence is via synchronous `fs.readFileSync` / `fs.writeFileSync` on JSON files in `backend/src/data/`. A unified CRUD abstraction handles all collections through a `FILES` dictionary keyed by short names.

```js
const FILES = {
  users, login_logs, items, unique_items, categories,
  transactions, issued, borrowed, reservations,
  disposals, audit_logs
}
```

**Exposed functions:**

| Function | Signature | Behaviour |
|---|---|---|
| `findAll(key)` | `→ Record[]` | Parse and return entire file |
| `findById(key, id)` | `→ Record \| null` | Linear scan by `r.id === id` |
| `findWhere(key, fn)` | `→ Record[]` | `Array.filter(fn)` |
| `findOneWhere(key, fn)` | `→ Record \| null` | `Array.find(fn)` |
| `insert(key, record)` | `→ Record` | Push to array, write file |
| `update(key, id, patch)` | `→ Record \| null` | Merge patch + set `updatedAt`, write file |
| `remove(key, id)` | `→ boolean` | Filter out by id, write file |
| `removeWhere(key, fn)` | `→ number` | Filter out matches, write file, return removed count |

All reads: `fs.readFileSync` (sync). All writes: `fs.writeFileSync` (sync, entire file rewritten on each mutation).

### 7.2 Data Files — Schema Reference

#### `smp_users.json`
```json
[{
  "id": "uuid",
  "username": "string",
  "password": "bcrypt-hash",
  "role": "admin | storekeeper | viewer",
  "name": "string",
  "email": "string",
  "active": true,
  "createdAt": "ISO-8601"
}]
```

#### `smp_items.json`
```json
[{
  "id": "uuid",
  "name": "string",
  "sku": "SPPS-NNNNN",
  "category": "string",
  "description": "string",
  "qty": 0,
  "condition": "Good | Damaged | Worn",
  "reservedQty": 0,
  "borrowedQty": 0,
  "purchaseValue": 0,
  "currentValue": 0,
  "valueHistory": [{ "date", "updatedBy", "prevPurchaseValue", "prevCurrentValue", "newPurchaseValue", "newCurrentValue" }],
  "createdBy": "username",
  "createdAt": "ISO-8601",
  "updatedAt": "ISO-8601"
}]
```

> **Computed fields** (not stored, added by `enrichItem()` on every read):  
> `status: "available | out_of_stock | reserved | damaged"`, `availableQty`, `uniqueIdCount`

#### `smp_unique_items.json`
```json
[{
  "id": "uuid",
  "parentItemId": "uuid",
  "itemName": "string",
  "sku": "string",
  "category": "string",
  "uniqueNo": "string",
  "status": "available | reserved | issued | borrowed | disposed",
  "condition": "Good | Damaged | Worn",
  "purchaseValue": 0,
  "currentValue": 0,
  "location": "string",
  "note": "string",
  "createdAt": "ISO-8601",
  "updatedAt": "ISO-8601"
}]
```

#### `smp_transactions.json`
```json
[{
  "id": "uuid",
  "userId": "uuid",
  "username": "string",
  "action": "created | edited | deleted | stock_in | stock_out | issued | borrowed | returned | reserved | disposed",
  "itemId": "uuid",
  "itemName": "string",
  "qtyBefore": 0,
  "qtyAfter": 0,
  "note": "string",
  "meta": {},
  "createdAt": "ISO-8601"
}]
```

#### `smp_issued.json`
```json
[{
  "id": "uuid",
  "itemId": "uuid",
  "itemName": "string",
  "sku": "string",
  "qty": 0,
  "issuedBy": "username",
  "receiverName": "string",
  "receiverNIC": "string",
  "receiverDept": "string",
  "receiverPhone": "string",
  "purpose": "string",
  "approvedBy": "string",
  "carrierName": "string",
  "expectedReturnDate": "date | null",
  "note": "string",
  "issuedAt": "ISO-8601",
  "createdAt": "ISO-8601"
}]
```

#### `smp_borrowed.json`
```json
[{
  "id": "uuid",
  "itemId": "uuid", "itemName": "string", "sku": "string",
  "qty": 0,
  "borrowerName": "string", "borrowerNIC": "string",
  "borrowerDept": "string", "borrowerPhone": "string",
  "purpose": "string",
  "expectedReturnDate": "date",
  "approvedBy": "string",
  "issuedBy": "username",
  "status": "borrowed | returned",
  "borrowedAt": "ISO-8601",
  "returnedAt": "ISO-8601 | null",
  "returnCondition": "Good | Damaged | null",
  "returnNote": "string | null",
  "createdAt": "ISO-8601"
}]
```

> **Computed field** added by GET handler: `overdue: boolean` (true if `status === 'borrowed'` and `expectedReturnDate < now`)

#### `smp_reservations.json`
```json
[{
  "id": "uuid",
  "reservationId": "RES-XXXXXXXXX",
  "itemId": "uuid", "itemName": "string", "sku": "string",
  "uniqueItemNos": ["string"],
  "qty": 0,
  "instituteName": "string",
  "reservedFromDivision": "string",
  "reservationStartDate": "date",
  "reservationEndDate": "date",
  "reservationDate": "ISO-8601",
  "approvedBy": "string",
  "notes": "string",
  "reservationStatus": "pending | approved | active | completed | cancelled",
  "reservedBy": "username",
  "completedAt": "ISO-8601 | null",
  "cancelledAt": "ISO-8601 | null",
  "createdAt": "ISO-8601",
  "updatedAt": "ISO-8601"
}]
```

#### `smp_disposals.json`
```json
[{
  "id": "uuid",
  "itemId": "uuid", "itemName": "string", "sku": "string", "category": "string",
  "uniqueItemIds": ["uniqueNo"],
  "qty": 0,
  "disposalReason": "string",
  "disposalMethod": "Written Off | Auctioned | Recycled | Donated | Destroyed",
  "institute": "string",
  "authorizedBy": "string",
  "disposalNotes": "string",
  "estimatedDisposalValue": 0,
  "status": "pending_approval | approved | disposed | recycled | auctioned | written_off",
  "disposedBy": "username",
  "disposalDate": "ISO-8601",
  "approvedAt": "ISO-8601 | null",
  "approvedBy": "string | null",
  "createdAt": "ISO-8601",
  "updatedAt": "ISO-8601"
}]
```

#### `smp_login_logs.json`
```json
[{
  "id": "uuid",
  "userId": "uuid | null",
  "username": "string",
  "loginTime": "ISO-8601",
  "logoutTime": "ISO-8601 | null",
  "ip": "string",
  "deviceInfo": "User-Agent string",
  "status": "success | failed",
  "failReason": "invalid_credentials | wrong_password | null",
  "createdAt": "ISO-8601"
}]
```

#### `complaints.json`
```json
[{
  "id": "unix-timestamp-number",
  "createdAt": "ISO-8601",
  "status": "New | In Review | Resolved | Closed",
  "name": "string", "email": "string", "phone": "string | null",
  "type": "Complaint | Suggestion | General Inquiry | Service Feedback | Right to Information (RTI)",
  "dept": "string | null",
  "subject": "string",
  "message": "string"
}]
```

### 7.3 Data Seeder

**File:** `backend/src/db/seed.js`

Run once on initial deployment:
```bash
cd sp-planning-secretariat-portal/backend
node src/db/seed.js
```

Creates all JSON files if they do not already exist. Sets up:
- Default SMP admin: `username: Store`, `password: Store@123` (bcrypt hashed)
- 8 default categories: Stationery, Furniture, Electronics, Cleaning, Printing, Borrowable, Equipment, Tools
- Empty arrays for all other collections

---

## 8. AUTHENTICATION & AUTHORIZATION SYSTEMS

### 8.1 CMS Authentication

**File:** `frontend/src/features/cms/cmsAuth.js`

The CMS uses **client-side-only authentication** with no backend involvement.

```
Credential storage: localStorage key "cms_creds"
Format: { username: string, hash: string }
Hash algorithm: SHA-256 (Web Crypto API — crypto.subtle.digest)
Session token: sessionStorage key "cms_auth" = "1"
```

**First-access defaults:**
- Username: `Admin`
- Password: `Admin@123`

**Available functions exported from `cmsAuth.js`:**

| Function | Parameters | Behaviour |
|---|---|---|
| `verifyLogin(username, password)` | `string, string` | SHA-256 hashes password, compares with stored hash |
| `changeUsername(newUsername, currentPassword)` | `string, string` | Verifies current password, updates stored username |
| `changePassword(currentPassword, newPassword)` | `string, string` | Verifies current, stores new SHA-256 hash |
| `getCredentials()` | — | Returns raw `{ username, hash }` from localStorage |

**CMS session guard:** `CMSDashboard.jsx` checks `sessionStorage.getItem('cms_auth') === '1'` on mount. If absent, redirects to `/cms`.

### 8.2 SMP Authentication — Full JWT Flow

```
1. POST /api/smp/auth/login
   Body: { username, password }
   → bcrypt.compare(password, user.password)
   → insert login_log record (status: success/failed, ip, deviceInfo)
   → jwt.sign({ id, username, role, name, logId }, JWT_SECRET, { expiresIn: '8h' })
   ← { token, user: { id, username, role, name, email } }

2. Frontend stores in localStorage:
   "smp_token" = JWT string
   "smp_user"  = JSON.stringify(user)

3. All SMP API requests:
   Header: Authorization: Bearer <smp_token>
   → requireAuth middleware decodes token → sets req.user
   → requireRole(...) checks req.user.role

4. 401 response anywhere:
   Axios interceptor removes localStorage keys
   window.location.href = '/smp'  (hard redirect)

5. POST /api/smp/auth/logout
   → updates login_log: logoutTime = now
   Frontend removes smp_token + smp_user from localStorage
```

### 8.3 SMP Role Permission Matrix

| Endpoint Category | `viewer` | `storekeeper` | `admin` |
|---|---|---|---|
| Read items / categories / unique-IDs | ✅ | ✅ | ✅ |
| Create / edit items, stock-in/out | ✗ | ✅ | ✅ |
| Delete items | ✗ | ✗ | ✅ |
| Issue items | ✗ | ✅ | ✅ |
| Borrow / return | ✗ | ✅ | ✅ |
| Create reservations | ✗ | ✅ | ✅ |
| Approve reservations | ✗ | ✗ | ✅ |
| Create disposals | ✗ | ✅ | ✅ |
| Approve disposals | ✗ | ✗ | ✅ |
| All reports | ✅ | ✅ | ✅ |
| User management | ✗ | ✗ | ✅ |
| View login logs | ✗ | ✗ | ✅ |

---

## 9. CONTENT MANAGEMENT SYSTEM (CMS)

### 9.1 Access Points

| URL | Component | Guard |
|---|---|---|
| `/cms` | `CMSLogin.jsx` | None |
| `/cms/dashboard` | `CMSDashboard.jsx` | `sessionStorage.cms_auth === '1'` |

### 9.2 Dashboard Navigation Structure

The sidebar is built from `NAV_GROUPS` in `CMSDashboard.jsx`:

```
Content
├── Overview          → Statistics cards, recent activity
├── News              → CRUD for news articles (Published/Draft status)
├── Home News Bar     → Editor for scrolling ticker (synced to backend API)
├── Home Events       → Events list for homepage
└── Notices           → Official notice board (with expiry dates)

Media
├── Downloads         → Downloadable file management
└── Gallery           → Photo gallery management

Feedback
└── Complaints & Feedback → View/status-update all contact form submissions

Pages
└── Page Visibility   → Toggle individual page on/off

System
├── Publish Site      → Toggle portal between "Live" and "Coming Soon"
├── Settings          → Change CMS username and password
└── Policy & Privacy  → Read-only policy viewer
```

### 9.3 CMS Data Storage Model

| Content type | Storage mechanism | Sync'd to backend |
|---|---|---|
| News articles | `localStorage` key `cms_news` | No |
| Notices | `localStorage` key `cms_notices` | No |
| Gallery items | `localStorage` key `cms_gallery` | No |
| Downloads | `localStorage` key `cms_downloads` | No |
| Home News Bar items | `localStorage` + `PUT /api/news-bar` | **Yes** |
| Home Events | `localStorage` key `cms_events` | No |
| Page visibility | `localStorage` key `cms_pages` | No |
| Publish mode flag | `localStorage` key `site_publish_mode` | No |
| Complaints data | Read from `GET /api/contact` | Backend-sourced |

### 9.4 Cross-Tab Sync

- `BroadcastChannel('cms_notices')` — broadcasts notice updates to other open CMS tabs.
- `window.dispatchEvent(new StorageEvent('storage', { key: 'site_publish_mode', ... }))` — propagates publish mode changes to portal tabs.
- `window.addEventListener('storage', ...)` in `SitePublishContext` — reacts to cross-tab changes.

### 9.5 CMS Sidebar Dimensions

```js
const SIDEBAR_FULL = 242  // px — expanded sidebar width
const SIDEBAR_MINI = 66   // px — icon-only collapsed state
```

---

## 10. STORE MANAGEMENT PORTAL (SMP)

### 10.1 Layout Shell

**File:** `frontend/src/features/smp/SMPLayout.jsx`

`SMPLayout` wraps all `/smp/*` routes with a `SMPProvider` context and a fixed left sidebar:

```
<SMPProvider>            ← JWT auth context
  <Sidebar />            ← 248px fixed, collapsible on mobile
  <main>
    <Outlet />           ← active SMP page
  </main>
</SMPProvider>
```

Sidebar navigation items (built via `buildNav(isAdmin)`):
- Dashboard, Inventory, Disposal, Transactions, Reports — visible to all
- Login Logs, Users — visible to `admin` role only

The sidebar also provides an inline **Change Password** modal.

### 10.2 SMP Auth Context

**File:** `frontend/src/features/smp/SMPContext.jsx`

```js
const { user, loading, error, signIn, signOut, isAdmin, isStorekeeper, isViewer } = useSMP()
```

- `signIn(username, password)` → calls `POST /api/smp/auth/login`, stores token + user in localStorage
- `signOut()` → calls `POST /api/smp/auth/logout` (best-effort), clears localStorage
- `isAdmin` → `user.role === 'admin'`
- `isStorekeeper` → `user.role === 'storekeeper' || user.role === 'admin'`
- `isViewer` → `!!user` (any authenticated user)

### 10.3 SMP API Client

**File:** `frontend/src/features/smp/smpApi.js`

Axios instance with `baseURL = VITE_API_URL/api/smp`.

Request interceptor: attaches `Authorization: Bearer <smp_token>` from localStorage.

Response interceptor: on `401`, clears localStorage and redirects to `/smp`.

All API functions exported:

```js
// Auth
login(u, p) | logout() | getMe()

// Users
getUsers() | createUser(d) | updateUser(id,d) | deleteUser(id) | changePassword(d)

// Items
getItems() | getItem(id) | createItem(d) | updateItem(id,d) | deleteItem(id)
getCategories() | createCategory(d)
getUniqueIds(itemId) | getAllUniqueIds() | updateUniqueId(uid,d)

// Stock
(via createItem/updateItem + stock-in/out endpoints)

// Disposal
createDisposal(d) | getDisposals(p) | getDisposalById(id)
approveDisposal(id) | updateDisposalStatus(id,d)

// Reports
getDashboard() | getTransactions(p) | getAuditLogs(p)
getLoginLogs(p) | getDisposalReport(p) | getValueSummary()
```

### 10.4 Inventory Item Lifecycle

```
createItem (POST /api/smp/items)
  ├── Validates qty and unique ID count must match
  ├── Generates SKU: "SPPS-" + random 5-digit number
  ├── Inserts to smp_items.json
  ├── Inserts N records to smp_unique_items.json (one per unit)
  └── Logs "created" transaction

stockIn (POST /api/smp/items/:id/stock-in)
  ├── Validates new unique IDs provided (count = qty added)
  ├── Updates item qty += addQty
  ├── Inserts new unique_items records
  └── Logs "stock_in" transaction

stockOut (POST /api/smp/items/:id/stock-out)
  ├── Validates sufficient qty
  ├── Updates item qty -= qty
  └── Logs "stock_out" transaction

deleteItem (DELETE /api/smp/items/:id)   — admin only
  ├── Removes from smp_items.json
  ├── Removes all linked smp_unique_items.json entries
  └── Logs "deleted" transaction
```

### 10.5 Disposal Workflow

```
Storekeeper/Admin: POST /api/smp/disposal
  ├── Validates: item exists, sufficient qty
  ├── If uniqueItemIds provided: marks each unique_item status = "disposed"
  ├── Reduces item.qty by disposal qty
  ├── Creates disposal record: status = "pending_approval"
  └── Logs "disposed" transaction

Admin: PATCH /api/smp/disposal/:id/approve
  └── Sets status = "approved", approvedAt, approvedBy

Admin: PATCH /api/smp/disposal/:id/status
  └── Sets status to any of: pending_approval | approved | disposed | recycled | auctioned | written_off
```

### 10.6 Reservation Lifecycle

```
POST /api/smp/borrow/reservations
  ├── Checks for overlapping reservations on same item and date range
  ├── Validates available qty (total qty − borrowedQty − overlapping reserved)
  ├── If uniqueItemIds provided: locks specific units (status = "reserved")
  ├── Updates item.reservedQty += qty
  ├── Creates reservation: status = "pending"
  └── Logs "reserved" transaction

PATCH .../approve     → status = "approved"   (admin only)
PATCH .../activate    → status = "active"
PATCH .../complete    → status = "completed"; releases reservedQty; releases unique IDs
PATCH .../cancel      → status = "cancelled"; releases reservedQty; releases unique IDs
```

### 10.7 SMP Dashboard Metrics

**File:** `backend/src/features/smp/routes/smpReports.js` — `GET /api/smp/reports/dashboard`

| Metric | Calculation |
|---|---|
| `totalItems` | `items.length` |
| `totalQty` | `sum(item.qty)` |
| `outOfStockCount` | `items.filter(i => i.qty === 0).length` |
| `activeUsers` | `users.filter(u => u.active).length` |
| `pendingDisposals` | `disposals.filter(d => d.status === 'pending_approval').length` |
| `totalStockValue` | `sum(item.currentValue × item.qty)` in LKR |
| `categoryBreakdown` | Items grouped by category — count and qty per category |
| `monthlyMovement` | Transactions grouped by month (last 6 months) — stock_in/out/issued/disposed deltas |
| `recentTransactions` | Last 15 transactions sorted by `createdAt` desc |
| `topDisposedItems` | Top 5 items by total disposed qty |

---

## 11. PUBLIC PORTAL — MODULE ANALYSIS

### 11.1 Landing Page (`/`)

**File:** `features/portal/landing/LandingPage.jsx`

Three-panel language selector. Languages: Sinhala (si), Tamil (ta), English (en). Selection stored in `localStorage` as `lang`, then navigates to `/home`.

Visual: full-screen, maroon gradient background with animated Framer Motion card entrance for each language option. Footer strip shows multilingual taglines.

### 11.2 Home Page (`/home`)

**File:** `features/portal/home/Home.jsx`

Assembled from independent sub-components:

| Sub-component | Description |
|---|---|
| `HomeNewsBar` | Horizontal auto-scrolling ticker. Fetches items from `GET /api/news-bar`. CSS `@keyframes` scroll animation. |
| Hero Slider | 3-slide full-viewport hero with background images. Auto-advances every 6000ms. Two CTA buttons per slide. Language-keyed content. |
| `HomeQuickLinks` | Grid of navigation shortcut cards with icons. |
| `HomeAboutSecretariat` | Textual about section + 4 animated counter statistics (CountUp + IntersectionObserver). |
| `HomeDeputySecretaryMessage` | Photo + official message from Deputy Secretary. |
| `HomeEventsAndInstitutes` | Events listing + affiliated institutes grid. |
| `HomeFAQHighlights` | Highlighted FAQ accordion items. |

Additional imports: `react-countup`, `react-intersection-observer` for the stat counters.

### 11.3 About Section (`/about/*`)

**File:** `features/portal/about/About.jsx`

Hosts nested sub-routes internally (not via React Router `<Route>` children — uses internal `activeTab` state instead):
- Secretariat Overview
- Organization Structure (rendered by `OrganizationStructureChart.jsx` — SVG org chart)
- History (`History.jsx`)
- Functions & Duties
- Vision & Mission

Static content data stored in `features/portal/about/aboutData.js`.

### 11.4 Departments (`/departments`, `/departments/:slug`)

Slug routing via `DepartmentRouter` in `App.jsx`:

```js
const DEPT_KEYS    = new Set(['accounts', 'administration', 'development'])
const PROFILE_KEYS = new Set(['head-administration', 'head-accounts'])

if (DEPT_KEYS.has(slug))    → <DepartmentDetail />
if (PROFILE_KEYS.has(slug)) → <DepartmentProfile />
else                        → <Navigate to="/departments" replace />
```

### 11.5 Contact Form (`/contact`)

**File:** `features/portal/contact/Contact.jsx`

Form fields: Name, Email, Phone (optional), Type (dropdown), Department (optional), Subject, Message.

Client-side validation before submit:
- Email format regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Message minimum length: 20 characters

Server-side validation (`contact.js`):
- Name required, email format, subject required, message ≥ 20 chars
- Returns `400` with descriptive error message on failure

### 11.6 Page Structure Summary

| Route | Component | Key Features |
|---|---|---|
| `/` | LandingPage | Language picker, 3 languages |
| `/home` | Home | Hero slider, news bar (API), stat counters |
| `/about/*` | About | Nested tabs, org chart SVG |
| `/about-deputy-secretary` | AboutDeputySecretary | Profile with gallery carousel |
| `/departments` | Departments | Cards grid |
| `/departments/:slug` | DepartmentRouter | Slug-dispatch to detail/profile |
| `/news` | News | Article listing with search/filter |
| `/notices` | Notices | Notice board with date filtering |
| `/gallery` | Gallery | Photo grid with lightbox |
| `/documents` | Documents | Categorized document listing |
| `/downloads` | Downloads | File download listing |
| `/faq` | FAQ | Accordion Q&A |
| `/contact` | Contact | Form → backend → email |
| `/terms` | TermsAndServices | Static terms page |
| `/*` | NotFound | 404 page |

---

## 12. REST API REFERENCE

### 12.1 Health & Portal

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/health` | None | Returns `{ status: "ok" }` |
| GET | `/api/news-bar` | None | Returns all news bar items |
| PUT | `/api/news-bar` | None | Replaces all news bar items |
| POST | `/api/contact` | None | Submit contact/complaint; triggers emails |
| GET | `/api/contact` | None | Returns all submissions |
| PATCH | `/api/contact/:id` | None | Update submission status |
| DELETE | `/api/contact/:id` | None | Delete a submission |

### 12.2 SMP — Authentication

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/smp/auth/login` | None (rate-limited) | Login → returns JWT |
| POST | `/api/smp/auth/logout` | JWT | Records logout time |
| GET | `/api/smp/auth/me` | JWT | Returns current user (no password) |

### 12.3 SMP — User Management

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/smp/users` | Admin | List all users (no passwords) |
| POST | `/api/smp/users` | Admin | Create user; bcrypt-hashes password |
| PATCH | `/api/smp/users/:id` | Admin | Update name/email/role/active/password |
| DELETE | `/api/smp/users/:id` | Admin | Delete (cannot delete self) |
| PATCH | `/api/smp/users/me/password` | JWT | Change own password (requires currentPassword) |

### 12.4 SMP — Inventory

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/smp/items` | JWT | All items with computed fields |
| GET | `/api/smp/items/:id` | JWT | Single item |
| POST | `/api/smp/items` | Admin/SK | Create; requires N unique IDs matching qty |
| PATCH | `/api/smp/items/:id` | Admin/SK | Edit name/category/description/condition/values |
| DELETE | `/api/smp/items/:id` | Admin | Delete item + all linked unique IDs |
| POST | `/api/smp/items/:id/stock-in` | Admin/SK | Add stock + new unique IDs |
| POST | `/api/smp/items/:id/stock-out` | Admin/SK | Remove stock (no unique ID tracking) |
| GET | `/api/smp/items/meta/categories` | JWT | All categories |
| POST | `/api/smp/items/meta/categories` | Admin | Create category |
| GET | `/api/smp/items/:id/unique-ids` | JWT | All unique IDs for an item |
| GET | `/api/smp/items/unique-ids/all` | JWT | All unique IDs system-wide |
| PATCH | `/api/smp/items/unique-ids/:uid` | Admin/SK | Update status/condition/location/note |

### 12.5 SMP — Issued Items

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/smp/issued` | Admin/SK | Issue items; reduces item qty |
| GET | `/api/smp/issued` | JWT | Filter by `?itemId=` or `?receiver=` |
| GET | `/api/smp/issued/:id` | JWT | Single issued record |

### 12.6 SMP — Borrow & Reservations

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/smp/borrow` | Admin/SK | Create borrow record |
| GET | `/api/smp/borrow` | JWT | Filter by `?status=` or `?itemId=`; adds `overdue` field |
| PATCH | `/api/smp/borrow/:id/return` | Admin/SK | Process return; restores qty |
| POST | `/api/smp/borrow/reservations` | Admin/SK | Create reservation; validates overlap |
| GET | `/api/smp/borrow/reservations` | JWT | Filter by `?itemId=`, `?status=`, `?instituteName=` |
| GET | `/api/smp/borrow/reservations/:id` | JWT | Single reservation |
| PATCH | `/api/smp/borrow/reservations/:id/approve` | Admin | pending → approved |
| PATCH | `/api/smp/borrow/reservations/:id/activate` | Admin/SK | pending/approved → active |
| PATCH | `/api/smp/borrow/reservations/:id/complete` | Admin/SK | active/approved → completed |
| PATCH | `/api/smp/borrow/reservations/:id/cancel` | Admin/SK | any → cancelled |

### 12.7 SMP — Disposal

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/smp/disposal` | Admin/SK | Create; sets status `pending_approval` |
| GET | `/api/smp/disposal` | JWT | Filter by `?status=`, `?itemId=`, `?from=`, `?to=` |
| GET | `/api/smp/disposal/:id` | JWT | Single disposal record |
| PATCH | `/api/smp/disposal/:id/approve` | Admin | Sets status `approved` |
| PATCH | `/api/smp/disposal/:id/status` | Admin | Set any valid status |

### 12.8 SMP — Reports

| Method | Endpoint | Auth | Query Params | Description |
|---|---|---|---|---|
| GET | `/api/smp/reports/dashboard` | JWT | — | Aggregated dashboard metrics |
| GET | `/api/smp/reports/transactions` | JWT | `action, itemId, userId, from, to` | Filtered transactions |
| GET | `/api/smp/reports/audit-logs` | JWT | `userId, action, from, to` | Filtered audit logs |
| GET | `/api/smp/reports/login-logs` | JWT | `username, status, from, to` | Filtered login history |
| GET | `/api/smp/reports/disposals` | JWT | `status, from, to` | Filtered disposal records |
| GET | `/api/smp/reports/value-summary` | JWT | — | Per-item and total purchase/current value |

---

## 13. DEPLOYMENT CONFIGURATION

### 13.1 Frontend Build

**File:** `vercel.json` (repository root)

```json
{
  "buildCommand": "cd sp-planning-secretariat-portal/frontend && npm install && npm run build",
  "outputDirectory": "sp-planning-secretariat-portal/frontend/dist",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

- Vite builds to `frontend/dist/` — static HTML/CSS/JS.
- All routes rewrite to `/index.html` — required for React Router client-side routing.
- Deploy to any static CDN host or server capable of serving static files.

**Frontend `vercel.json`** (also exists at `frontend/vercel.json` — same rewrite rule for nested deployment):

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

### 13.2 Backend Deployment

Standard Node.js Express application. Requirements:

- Node.js ≥ 18
- Writable filesystem (for JSON data file persistence in `backend/src/data/`)
- Outbound SMTP (port 587 or 465) access for email delivery
- One open port (default 5000)

**First-time setup:**
```bash
cd sp-planning-secretariat-portal/backend
node src/db/seed.js        # initialize all JSON data files
npm start                   # or: npx nodemon src/server.js for dev
```

**Production process management:**
```bash
# Using PM2
pm2 start src/server.js --name sp-backend
pm2 save && pm2 startup
```

### 13.3 Development Commands (from monorepo root)

```bash
cd sp-planning-secretariat-portal

npm install               # install all workspace dependencies

npm run dev:frontend      # Vite dev server on http://localhost:5173 (HMR)
npm run dev:backend       # nodemon on http://localhost:5000

npm run build             # production Vite build → frontend/dist/
npm run lint              # ESLint on frontend workspace
```

---

## 14. ENVIRONMENT VARIABLES REFERENCE

### 14.1 Frontend Environment Variables

Set in hosting platform dashboard or `.env` file at `frontend/.env.local`:

| Variable | Required | Default | Description |
|---|---|---|---|
| `VITE_API_URL` | Yes (prod) | `""` (empty = same origin) | Base URL of the backend server, e.g. `https://api.example.com` |

> In development, if backend runs on `localhost:5000` and Vite proxy is not configured, set `VITE_API_URL=http://localhost:5000`.

### 14.2 Backend Environment Variables

Set in `.env` file at `backend/.env` or as system environment variables:

| Variable | Required | Default | Description |
|---|---|---|---|
| `PORT` | No | `5000` | TCP port for Express server |
| `JWT_SECRET` | **Yes** | `"smp_secret_key_change_in_production"` | HMAC secret for JWT signing — must be changed |
| `FRONTEND_URL` | Yes (prod) | `"http://localhost:3000"` | Allowed CORS origin(s), comma-separated |
| `SMTP_HOST` | Yes | — | SMTP server hostname |
| `SMTP_PORT` | Yes | `587` | SMTP port |
| `SMTP_SECURE` | No | `"false"` | `"true"` for port 465 (SSL), `"false"` for STARTTLS |
| `SMTP_USER` | Yes | — | SMTP authentication username / sender address |
| `SMTP_PASS` | Yes | — | SMTP authentication password / app password |
| `SMTP_FROM_NAME` | No | `"SP Planning Portal"` | Display name in From header |
| `ADMIN_EMAIL` | No | `"info@splanning.gov.lk"` | Destination for admin notification emails |

---

## 15. SECURITY ASSESSMENT

### 15.1 Issue Summary

| # | Issue | Location | Severity |
|---|---|---|---|
| 1 | Private key committed to repository | `backend/credentials.json` | CRITICAL |
| 2 | Hardcoded JWT secret fallback | `backend/src/middleware/auth.js:4` | HIGH |
| 3 | Default SMP admin password never forced to change | `backend/src/db/seed.js` | HIGH |
| 4 | Default CMS password hardcoded in source | `frontend/src/features/cms/cmsAuth.js:15` | HIGH |
| 5 | Contact API management endpoints have no authentication | `backend/src/features/portal/routes/contact.js` | MEDIUM |
| 6 | News bar PUT endpoint has no authentication | `backend/src/features/portal/routes/newsBar.js` | MEDIUM |
| 7 | CMS credentials stored client-side (localStorage) | `frontend/src/features/cms/cmsAuth.js` | MEDIUM |
| 8 | Publish mode gate is client-side only (bypassable) | `frontend/src/shared/contexts/SitePublishContext.jsx` | LOW |

### 15.2 Issue Details

**Issue 1 — `backend/credentials.json`**  
A Google Cloud Service Account JSON key (with RSA private key) is committed to the repository. If the repository is shared or becomes public, this key grants unauthorized access to the associated Google Cloud project.  
**Action required:** Revoke the existing key in Google Cloud IAM Console, generate a replacement, store it as an environment variable or secret manager entry, and add `credentials.json` to `.gitignore`.

**Issue 2 — Default JWT Secret**  
`auth.js` line 4: `const SECRET = process.env.JWT_SECRET || 'smp_secret_key_change_in_production'`  
If `JWT_SECRET` is not set, the fallback is a publicly known string. An attacker knowing this can forge valid JWTs.  
**Action required:** Set `JWT_SECRET` to a cryptographically random string (minimum 32 characters) in the server environment before production use.

**Issue 3 — Default SMP Password**  
Seed creates user `Store` with password `Store@123`. There is no forced password change on first login.  
**Action required:** Change via `PATCH /api/smp/users/me/password` or via the SMP Users UI immediately after deployment.

**Issue 4 — Default CMS Password**  
`cmsAuth.js` line 15: `await sha256('Admin@123')` — hardcoded default, set if no credentials exist in localStorage.  
**Action required:** Log in to CMS and change the password via Settings immediately after deployment.

**Issue 5 & 6 — Unauthenticated Management Endpoints**  
`GET /api/contact`, `PATCH /api/contact/:id`, `DELETE /api/contact/:id`, and `PUT /api/news-bar` require no authentication. Anyone who knows the API URL can read all complaint submissions or modify the news bar.  
**Recommendation:** Add a shared secret or CMS session token check to these endpoints.

---

## 16. KNOWN LIMITATIONS & RECOMMENDATIONS

### 16.1 Architecture Limitations

| Area | Current State | Recommendation |
|---|---|---|
| **Database** | Synchronous JSON file I/O — no concurrency protection | Migrate to MongoDB or PostgreSQL for concurrent write safety at scale |
| **CMS Storage** | Browser `localStorage` — device-specific, lost on browser data clear | Migrate CMS content to backend API-backed storage |
| **File Uploads** | No file upload implementation — gallery/documents use URLs or localStorage text | Implement file upload API (multer + cloud storage: S3, GCS, or Vercel Blob) |
| **Search** | All search/filter is client-side — full dataset loaded per request | Implement server-side search with pagination for large datasets |
| **Caching** | No HTTP caching headers on any API response | Add `Cache-Control` headers for read-only endpoints (news-bar, categories) |
| **Backup** | Manual — no automated backup mechanism | Implement automated daily backup of `backend/data/` directory |
| **Admin workspace** | Stub — `admin/` package contains only empty files | Either implement or remove to reduce confusion |

### 16.2 Technical Debt

| Item | Description |
|---|---|
| `smpIssued` route not registered in `server.js` | `smpIssued.js` exists but the route `app.use('/api/smp/issued', ...)` appears missing from `server.js` — verify and add if required |
| No input sanitization beyond basic validation | Backend does not sanitize string inputs against XSS before storing — safe since data is served as JSON (not HTML), but worth reviewing if content is ever rendered as HTML |
| No HTTPS enforcement | Backend does not redirect HTTP to HTTPS — should be handled at reverse proxy (nginx, Cloudflare) level |
| `docker-compose.yml` and `.env.example` are empty stubs | Should either be completed or removed |

### 16.3 Compatibility Notes

The frontend uses modern browser APIs that require attention:

| API | Browser support | Fallback |
|---|---|---|
| `BroadcastChannel` | Not in Safari < 15.4, IE | Gracefully checked: `typeof BroadcastChannel !== 'undefined'` |
| `crypto.subtle` (SHA-256) | Requires **HTTPS** in all browsers | CMS login will fail on plain HTTP in production |
| `IntersectionObserver` | All modern browsers | No fallback — animations simply won't trigger in very old browsers |
| CSS custom properties | All modern browsers | No IE11 support |

---

*Document Reference: TR-SPPS-2026-001*  
*Version 1.0 — June 2026*  
*Provincial Planning Secretariat — Southern Province, Sri Lanka*  
*Classification: Restricted — Authorized Technical Personnel Only*

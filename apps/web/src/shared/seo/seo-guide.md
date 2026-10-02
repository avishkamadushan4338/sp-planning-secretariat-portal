# Provincial Planning Secretariat – Southern Province
# Premium SEO Implementation Guide — 2026

---

## 1. RECOMMENDED HEADING STRUCTURE (H1–H6)

### Home Page (`/`)
```html
<h1>Provincial Planning Secretariat – Southern Province</h1>
  <h2>Integrated Provincial Development for a Prosperous Southern Sri Lanka</h2>
    <h3>Our Development Sectors</h3>
      <h4>Agriculture Development</h4>
      <h4>Tourism Development</h4>
      <h4>Fisheries Development</h4>
      <h4>Industrial Development</h4>
      <h4>Education Development</h4>
      <h4>Health Development</h4>
      <h4>Environmental Affairs</h4>
      <h4>Infrastructure Development</h4>
    <h3>Latest News & Notices</h3>
      <h4>[Article Title 1]</h4>
      <h4>[Article Title 2]</h4>
    <h3>Active Tenders & Procurement</h3>
    <h3>Development Statistics – Southern Province</h3>
      <h4>Galle District</h4>
      <h4>Matara District</h4>
      <h4>Hambantota District</h4>
    <h3>About the Secretariat</h3>
      <h4>Our Mandate</h4>
      <h4>Leadership & Administration</h4>
    <h3>Upcoming Events & Programs</h3>
    <h3>Contact the Secretariat</h3>
      <h4>Office Location – Dakshinapaya, Labuduwa, Galle</h4>
      <h4>Contact Information</h4>
```

### About Page (`/about/`)
```html
<h1>About the Provincial Planning Secretariat – Southern Province</h1>
  <h2>Our Mission & Vision</h2>
  <h2>Mandate & Functions</h2>
    <h3>Planning & Coordination</h3>
    <h3>Development Program Oversight</h3>
    <h3>Policy Advisory</h3>
  <h2>History of the Secretariat</h2>
  <h2>Leadership</h2>
    <h3>Provincial Planning Secretary</h3>
    <h3>Senior Management Team</h3>
  <h2>Organizational Structure</h2>
  <h2>Our Divisions</h2>
    <h3>Agriculture & Rural Development Division</h3>
    <h3>Tourism & Industry Division</h3>
    <h3>Infrastructure & Environment Division</h3>
    <h3>Social Services Division (Education & Health)</h3>
```

### Programs Page (`/programs/`)
```html
<h1>Development Programs – Southern Province Planning Secretariat</h1>
  <h2>Provincial Development Sectors</h2>
    <h3>Agriculture Development</h3>
      <h4>Crop Development Programs</h4>
      <h4>Farmer Support Initiatives</h4>
    <h3>Tourism Development – Ruhunu Region</h3>
      <h4>Heritage Tourism</h4>
      <h4>Eco-Tourism Initiatives</h4>
    <h3>Fisheries Development</h3>
    <h3>Industrial Development</h3>
    <h3>Education Development</h3>
    <h3>Health Development</h3>
    <h3>Environmental Affairs</h3>
    <h3>Rural Development – Ruhunu</h3>
  <h2>Current Development Plans</h2>
  <h2>Completed Projects</h2>
```

---

## 2. IMAGE SEO RECOMMENDATIONS

### General Rules
- Always include descriptive `alt` attributes — never leave alt empty for meaningful images (empty `alt=""` is correct ONLY for purely decorative images)
- Use WebP format as primary, JPEG/PNG as fallback
- Implement `<picture>` element with `srcset` for responsive images
- All images must have `width` and `height` attributes to prevent CLS
- Compress images: WebP quality 80–85, JPEG quality 75–85
- Hero image maximum: 200KB; thumbnails: under 30KB; logos: under 20KB

### Naming Convention
```
[section]-[description]-[dimensions].[ext]
Examples:
  hero-southern-province-secretariat-1920x1080.webp
  about-dakshinapaya-office-exterior-800x600.webp
  program-agriculture-paddy-fields-galle-600x400.webp
  news-development-meeting-2026-600x400.webp
  logo-provincial-planning-secretariat-512x512.png
  logo-coat-of-arms-sri-lanka-200x200.png
  staff-secretary-portrait-300x400.webp
```

### HTML Implementation
```html
<!-- Hero Image (above-the-fold, LCP element) -->
<img
  src="/assets/images/hero/hero-southern-province-secretariat-1920x1080.webp"
  srcset="
    /assets/images/hero/hero-southern-province-secretariat-480w.webp 480w,
    /assets/images/hero/hero-southern-province-secretariat-768w.webp 768w,
    /assets/images/hero/hero-southern-province-secretariat-1200w.webp 1200w,
    /assets/images/hero/hero-southern-province-secretariat-1920w.webp 1920w
  "
  sizes="(max-width: 480px) 480px, (max-width: 768px) 768px, (max-width: 1200px) 1200px, 1920px"
  alt="Provincial Planning Secretariat Southern Province – Dakshinapaya, Galle, Sri Lanka"
  width="1920"
  height="1080"
  fetchpriority="high"
  decoding="async"
  loading="eager"
/>

<!-- Content Images (below-the-fold) -->
<picture>
  <source
    srcset="/assets/images/programs/agriculture-paddy-fields-galle.webp"
    type="image/webp"
  />
  <img
    src="/assets/images/programs/agriculture-paddy-fields-galle.jpg"
    alt="Paddy field development program in Galle District under Southern Province Agriculture Development initiative"
    width="800"
    height="600"
    loading="lazy"
    decoding="async"
  />
</picture>

<!-- Logo -->
<img
  src="/assets/images/logo/logo-provincial-planning-secretariat.svg"
  alt="Provincial Planning Secretariat Southern Province – Official Government Logo"
  width="200"
  height="80"
  fetchpriority="high"
  loading="eager"
  decoding="sync"
/>

<!-- Government Coat of Arms -->
<img
  src="/assets/images/logo/sri-lanka-coat-of-arms.svg"
  alt="Official Coat of Arms of the Democratic Socialist Republic of Sri Lanka"
  width="60"
  height="60"
  loading="eager"
/>
```

### Open Graph Images
- Dimensions: 1200×630px exactly
- File size: under 500KB (target <200KB WebP)
- Include text overlay with site name for branding
- Create per-section OG images: home, about, programs, news, contact
- Store at: `/assets/images/og/og-[page-name]-1200x630.jpg`

### Image Sitemap Entry Template
```xml
<url>
  <loc>https://www.planningsec.sp.gov.lk/programs/agriculture/</loc>
  <image:image>
    <image:loc>https://www.planningsec.sp.gov.lk/assets/images/programs/agriculture-paddy-fields-galle.webp</image:loc>
    <image:caption>Agriculture development program — paddy fields in Galle District, Southern Province</image:caption>
    <image:title>Southern Province Agriculture Development – Paddy Cultivation</image:title>
    <image:geo_location>Galle District, Southern Province, Sri Lanka</image:geo_location>
    <image:license>https://www.planningsec.sp.gov.lk/legal/image-license</image:license>
  </image:image>
</url>
```

---

## 3. ACCESSIBILITY SEO RECOMMENDATIONS

### Skip Navigation (WCAG 2.1 AA)
```html
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <a href="#main-navigation" class="skip-link">Skip to navigation</a>
  <a href="#search" class="skip-link">Skip to search</a>
```

### ARIA Landmarks
```html
<header role="banner" aria-label="Government website header">
<nav id="main-navigation" role="navigation" aria-label="Main navigation">
<main id="main-content" role="main" aria-label="Main content area">
<aside role="complementary" aria-label="Related information">
<footer role="contentinfo" aria-label="Website footer">
<form role="search" aria-label="Site search">
```

### Language Attributes
```html
<!-- English page -->
<html lang="en">

<!-- Sinhala page -->
<html lang="si">

<!-- Tamil page -->
<html lang="ta">

<!-- Inline language switching within a page -->
<span lang="si">දකුණු පළාත</span>
<span lang="ta">தென் மாகாணம்</span>
```

### Focus Management
```css
/* Visible focus ring — never use outline: none without alternative */
:focus-visible {
  outline: 3px solid #006633;
  outline-offset: 2px;
  border-radius: 2px;
}
```

### Color Contrast (WCAG AA minimum)
- Body text on white: #1a1a1a on #ffffff — ratio 17.1:1 ✓
- Primary green (#006633) on white — ratio 8.1:1 ✓
- White on primary green — ratio 8.1:1 ✓
- Links: #0044aa on white — ratio 8.6:1 ✓
- Never use color alone to convey information

### Form Accessibility
```html
<label for="search-input">Search the website</label>
<input
  type="search"
  id="search-input"
  name="q"
  placeholder="Search..."
  aria-label="Search the Provincial Planning Secretariat website"
  aria-describedby="search-hint"
  autocomplete="off"
/>
<span id="search-hint" class="visually-hidden">
  Type your query and press Enter to search
</span>
```

### Document Structure Requirements
- Exactly ONE `<h1>` per page
- Heading hierarchy: never skip levels (H1 → H2 → H3, not H1 → H3)
- All interactive elements keyboard-accessible
- All form fields have associated `<label>` elements
- All links have descriptive text (not "click here" or "read more")
- All tables have `<caption>` and `scope` attributes
- All PDFs linked with file size: `Annual Report 2025 (PDF, 2.4MB)`

### WCAG 2.1 AA Compliance Checklist
- [x] Text alternatives for non-text content (alt attributes)
- [x] Captions for pre-recorded audio content
- [x] Content adaptable without losing information
- [x] Color contrast ratio ≥ 4.5:1 for normal text
- [x] Keyboard accessible for all functionality
- [x] No keyboard trap
- [x] Skip navigation links
- [x] Meaningful page titles (unique per page)
- [x] Focus visible at all times
- [x] Language of page declared
- [x] Error identification for forms
- [x] Labels for form inputs
- [x] Status messages (ARIA live regions)
- [x] Text resize up to 200% without loss of content

---

## 4. INTERNAL LINKING STRATEGY

### Core Hub-and-Spoke Architecture
```
Home (Hub)
├── About (Spoke)
│   ├── Mandate
│   ├── History
│   ├── Leadership
│   └── Organizational Structure
├── Programs (Hub)
│   ├── Agriculture (Spoke)
│   ├── Tourism (Spoke)
│   ├── Fisheries (Spoke)
│   ├── Industrial (Spoke)
│   ├── Education (Spoke)
│   ├── Health (Spoke)
│   ├── Environment (Spoke)
│   └── Infrastructure (Spoke)
├── News & Notices (Hub)
│   ├── Latest News
│   ├── Public Notices
│   └── Announcements
├── Tenders (Hub)
│   ├── Active Tenders
│   └── Tender Archive
├── Publications (Hub)
│   ├── Annual Reports
│   ├── Development Plans
│   └── Research Papers
└── Contact
```

### Anchor Text Guidelines
- Use descriptive, keyword-rich anchor text
- Example: "Agriculture Development Programs in Southern Province" (good)
- Example: "click here" or "read more" (bad — use aria-label if needed)
- Vary anchor text for the same page; avoid repetition
- Internal links: use relative URLs (`/programs/agriculture/`)
- External government links: open in same tab with `rel="noopener"`

### Linking Rules
1. Every page should link back to its parent section
2. Related programs should cross-link: Agriculture ↔ Rural Development ↔ Fisheries
3. News articles should link to relevant program pages
4. Tender pages should link to relevant program sections
5. Footer: link all major sections + contact + legal pages
6. Breadcrumbs on every page except home

### Footer Link Structure
```html
<footer>
  <nav aria-label="Footer navigation">
    <div>
      <h3>About</h3>
      <ul>
        <li><a href="/about/">About the Secretariat</a></li>
        <li><a href="/about/mandate/">Our Mandate</a></li>
        <li><a href="/about/leadership/">Leadership</a></li>
      </ul>
    </div>
    <div>
      <h3>Development Programs</h3>
      <ul>
        <li><a href="/programs/agriculture/">Agriculture</a></li>
        <li><a href="/programs/tourism/">Tourism</a></li>
        <li><a href="/programs/fisheries/">Fisheries</a></li>
        <li><a href="/programs/education/">Education</a></li>
        <li><a href="/programs/health/">Health</a></li>
        <li><a href="/programs/environment/">Environment</a></li>
      </ul>
    </div>
    <div>
      <h3>Resources</h3>
      <ul>
        <li><a href="/news/">News & Notices</a></li>
        <li><a href="/tenders/">Tenders</a></li>
        <li><a href="/publications/">Publications</a></li>
        <li><a href="/data/">Open Data</a></li>
        <li><a href="/faq/">FAQ</a></li>
      </ul>
    </div>
    <div>
      <h3>Legal</h3>
      <ul>
        <li><a href="/legal/terms/">Terms of Use</a></li>
        <li><a href="/legal/privacy/">Privacy Policy</a></li>
        <li><a href="/legal/accessibility/">Accessibility</a></li>
        <li><a href="/sitemap.xml">Sitemap</a></li>
      </ul>
    </div>
  </nav>
</footer>
```

---

## 5. GOVERNMENT TRUST SIGNALS

### On-Page Trust Signals
```html
<!-- Government Header Bar -->
<div class="gov-bar" role="banner" aria-label="Official Sri Lanka Government website">
  <img
    src="/assets/images/logo/sri-lanka-coat-of-arms.svg"
    alt="Coat of Arms of Sri Lanka"
    width="40"
    height="40"
  />
  <span>An Official Website of the Government of Sri Lanka</span>
  <a href="#how-to-verify" aria-label="How to verify this is an official government website">
    How to verify →
  </a>
</div>

<!-- Official domain notice -->
<div class="official-notice" id="how-to-verify" hidden>
  <p>
    <strong>Official government websites use gov.lk domains.</strong>
    This site uses <strong>planningsec.sp.gov.lk</strong> —
    a secure, official Government of Sri Lanka domain.
  </p>
  <p>
    <strong>Secure connections use HTTPS.</strong>
    This site is secured with HTTPS (look for the padlock icon in your browser).
  </p>
</div>
```

### Technical Trust Signals
- HTTPS enforced (HSTS header)
- `.gov.lk` official domain
- Valid SSL certificate (EV certificate preferred for government)
- DNSSEC enabled
- Domain registered under ICTA Sri Lanka
- WHOIS shows government registrant
- Physical address matches official records
- Google Knowledge Panel verified
- Wikidata entry with verified links

### Content Trust Signals
- "Official website" stated clearly in title, meta description, and page header
- Government logo / coat of arms prominently displayed
- Physical address and contact details in footer
- Staff directory with official designations
- Published privacy policy and terms of use
- Accessible copyright notice with current year
- Last-updated date on all pages
- Links to parent government body (Southern Province Provincial Council)
- Links to gov.lk central government portal

---

## 6. AI SEARCH ENGINE OPTIMIZATION

### What AI Search Engines Need
AI-powered search engines (Perplexity, Google AI Overviews, ChatGPT Search, Copilot) require:
1. **Clear factual statements** — not marketing language
2. **Structured information** — definitions, lists, tables
3. **Entity clarity** — clearly define WHO, WHAT, WHERE, WHEN
4. **Source authority signals** — government domain, schema markup, Wikipedia/Wikidata
5. **Consistent NAP** — Name, Address, Phone consistent across all pages and external directories

### Recommended Content Patterns for AI Optimization
```html
<!-- Entity definition block — high AI-citation probability -->
<section aria-labelledby="about-heading">
  <h2 id="about-heading">What is the Provincial Planning Secretariat?</h2>
  <p>
    The <strong>Provincial Planning Secretariat – Southern Province</strong> is
    the official government body responsible for integrated development planning
    in the Southern Province of Sri Lanka. Established in 1987, it is headquartered
    at <strong>Dakshinapaya, Labuduwa, Galle</strong> and operates under the
    Southern Province Provincial Council.
  </p>
  <p>
    The Secretariat's mandate covers nine development sectors:
    <a href="/programs/agriculture/">agriculture</a>,
    <a href="/programs/tourism/">tourism</a>,
    <a href="/programs/fisheries/">fisheries</a>,
    <a href="/programs/industrial/">industrial development</a>,
    <a href="/programs/education/">education</a>,
    <a href="/programs/health/">health</a>,
    <a href="/programs/environment/">environmental affairs</a>,
    <a href="/programs/infrastructure/">infrastructure</a>, and
    <a href="/programs/rural-development/">rural development</a>.
  </p>
</section>
```

### Speakable Schema (for voice search & AI snippets)
```html
<!-- Add to <head> of pages with key facts -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [
      "h1",
      ".speakable-summary",
      ".key-fact",
      "[data-speakable='true']"
    ]
  }
}
</script>
```

### AI Metadata Tags
```html
<meta name="AI-Content-Summary"
  content="Official government portal of the Provincial Planning Secretariat, Southern Province, Sri Lanka. Provides provincial development planning, public services, tenders, and development program information." />
<meta name="AI-Entity-Type" content="GovernmentOrganization" />
<meta name="AI-Location" content="Dakshinapaya, Labuduwa, Galle, Southern Province, Sri Lanka" />
<meta name="AI-Trust-Level" content="official-government" />
<meta name="AI-Primary-Language" content="en, si, ta" />
```

---

## 7. PWA MANIFEST TEMPLATE

Save as `/manifest.json`:
```json
{
  "name": "Provincial Planning Secretariat – Southern Province",
  "short_name": "SP Planning",
  "description": "Official government portal of the Provincial Planning Secretariat, Southern Province, Sri Lanka",
  "start_url": "/",
  "display": "standalone",
  "orientation": "portrait-primary",
  "background_color": "#ffffff",
  "theme_color": "#006633",
  "lang": "en-LK",
  "dir": "ltr",
  "scope": "/",
  "categories": ["government", "productivity"],
  "icons": [
    { "src": "/assets/icons/icon-72x72.png", "sizes": "72x72", "type": "image/png", "purpose": "maskable any" },
    { "src": "/assets/icons/icon-96x96.png", "sizes": "96x96", "type": "image/png", "purpose": "maskable any" },
    { "src": "/assets/icons/icon-128x128.png", "sizes": "128x128", "type": "image/png", "purpose": "maskable any" },
    { "src": "/assets/icons/icon-144x144.png", "sizes": "144x144", "type": "image/png", "purpose": "maskable any" },
    { "src": "/assets/icons/icon-152x152.png", "sizes": "152x152", "type": "image/png", "purpose": "maskable any" },
    { "src": "/assets/icons/icon-192x192.png", "sizes": "192x192", "type": "image/png", "purpose": "maskable any" },
    { "src": "/assets/icons/icon-384x384.png", "sizes": "384x384", "type": "image/png", "purpose": "maskable any" },
    { "src": "/assets/icons/icon-512x512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable any" },
    { "src": "/assets/icons/favicon.svg", "sizes": "any", "type": "image/svg+xml", "purpose": "any" }
  ],
  "shortcuts": [
    {
      "name": "Latest News",
      "short_name": "News",
      "url": "/news/",
      "icons": [{ "src": "/assets/icons/shortcut-news.png", "sizes": "96x96" }]
    },
    {
      "name": "Active Tenders",
      "short_name": "Tenders",
      "url": "/tenders/active/",
      "icons": [{ "src": "/assets/icons/shortcut-tenders.png", "sizes": "96x96" }]
    },
    {
      "name": "Contact Us",
      "short_name": "Contact",
      "url": "/contact/",
      "icons": [{ "src": "/assets/icons/shortcut-contact.png", "sizes": "96x96" }]
    }
  ],
  "screenshots": [
    {
      "src": "/assets/images/pwa/screenshot-home-mobile.png",
      "sizes": "390x844",
      "type": "image/png",
      "form_factor": "narrow",
      "label": "Home page – Provincial Planning Secretariat"
    },
    {
      "src": "/assets/images/pwa/screenshot-home-desktop.png",
      "sizes": "1280x800",
      "type": "image/png",
      "form_factor": "wide",
      "label": "Home page – Provincial Planning Secretariat (desktop)"
    }
  ],
  "related_applications": [],
  "prefer_related_applications": false
}
```

---

## 8. SECURITY HEADERS (Express.js / Node.js)

Add to your Express backend (`backend/app.js` or via `helmet`):
```javascript
import helmet from 'helmet';

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        "https://www.googletagmanager.com",
        "https://www.google-analytics.com",
        (req, res) => `'nonce-${res.locals.nonce}'`
      ],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://www.google-analytics.com"],
      frameAncestors: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"],
      upgradeInsecureRequests: [],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  permissionsPolicy: {
    camera: [],
    microphone: [],
    geolocation: ["'self'"],
  },
}));

// Additional security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
  next();
});
```

---

## 9. GOOGLE INDEXING RECOMMENDATIONS

### Search Console Setup
1. Add property: `https://www.planningsec.sp.gov.lk/`
2. Verify via DNS TXT record (most reliable for government sites)
3. Submit all sitemaps:
   - `https://www.planningsec.sp.gov.lk/sitemap.xml`
   - `https://www.planningsec.sp.gov.lk/sitemap-news.xml`
   - `https://www.planningsec.sp.gov.lk/sitemap-images.xml`
4. Enable email alerts for coverage issues
5. Monitor Core Web Vitals report weekly

### Indexing Priorities
1. Ensure homepage returns HTTP 200 (not redirect)
2. XML sitemaps return HTTP 200
3. `robots.txt` returns HTTP 200
4. No accidental `noindex` tags in production
5. Canonical URLs match sitemap URLs exactly
6. No `?` duplicate pages being indexed
7. Consistent www vs non-www (redirect non-www → www)
8. Consistent HTTPS (redirect HTTP → HTTPS)

### Rich Snippet Eligibility
Schemas enabling rich results:
- **FAQ** → FAQ rich result (expandable questions in SERP)
- **Organization** → Knowledge Panel (Google entity card)
- **BreadcrumbList** → Breadcrumbs in SERP URL
- **WebSite + SearchAction** → Sitelinks Search Box
- **NewsArticle** → News carousel eligibility
- **Event** → Event rich result
- **Dataset** → Dataset Search (Google Dataset Search)
- **SpecialAnnouncement** → Special announcement banner

---

## 10. LOCAL SEO FOR SRI LANKA

### Google Business Profile
- Create / claim: Google Business Profile for "Provincial Planning Secretariat – Southern Province"
- Category: "Government office" (primary) + "Provincial government office"
- Address: Dakshinapaya, Labuduwa, Galle 80000
- Phone: +94-91-XXXXXXX
- Website: https://www.planningsec.sp.gov.lk/
- Hours: Mon–Fri 8:30–16:30
- Add photos: exterior, interior, staff working
- Post updates regularly (weekly minimum)
- Enable Q&A monitoring
- Languages: English, Sinhala, Tamil

### Local Citations (NAP Consistency)
Ensure consistent Name, Address, Phone on:
- gov.lk central government directory
- Southern Province Provincial Council website
- ICTA government web directory
- Google Maps
- Bing Places
- Apple Maps
- OpenStreetMap (add government POI)
- Wikipedia / Wikidata entry

### Local Keywords to Target
Primary:
- "Provincial Planning Secretariat Southern Province"
- "Planning Secretariat Galle"
- "Dakshinapaya Galle government office"
- "Southern Province development planning"

Secondary:
- "Ruhunu development planning"
- "Southern Province agriculture development"
- "Southern Province tourism development"
- "Galle government offices"
- "Southern Province tenders Sri Lanka"

Sinhala:
- "දකුණු පළාත් ප්‍රාදේශීය සැලසුම් ලේකම් කාර්යාලය"
- "ගාල්ල රජයේ කාර්යාලය"
- "දකුණු පළාත් සංවර්ධනය"

Tamil:
- "தென் மாகாண திட்டமிடல் செயலகம்"
- "கல் மாவட்ட அரசு அலுவலகம்"

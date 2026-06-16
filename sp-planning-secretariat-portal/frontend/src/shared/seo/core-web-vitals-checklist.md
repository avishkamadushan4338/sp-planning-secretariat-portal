# Core Web Vitals & Performance Optimization Checklist
# Provincial Planning Secretariat – Southern Province
# Standard: 2026 Google CWV Thresholds

---

## TARGET SCORES (Google's "Good" thresholds)
| Metric | Good    | Needs Improvement | Poor    |
|--------|---------|------------------|---------|
| LCP    | ≤ 2.5s  | 2.5s – 4.0s      | > 4.0s  |
| INP    | ≤ 200ms | 200ms – 500ms    | > 500ms |
| CLS    | ≤ 0.1   | 0.1 – 0.25       | > 0.25  |
| FCP    | ≤ 1.8s  | 1.8s – 3.0s      | > 3.0s  |
| TTFB   | ≤ 800ms | 800ms – 1800ms   | > 1800ms|

Target for this site: LCP < 2.0s | INP < 150ms | CLS < 0.05

---

## 1. LCP (Largest Contentful Paint) — Target: < 2.0s

### Critical Actions
- [ ] Identify LCP element on each page (typically hero image or H1)
- [ ] Add `fetchpriority="high"` to hero `<img>` element
- [ ] Add `loading="eager"` to hero image (never `lazy`)
- [ ] Preload hero image in `<head>`:
      `<link rel="preload" href="/hero.webp" as="image" fetchpriority="high" />`
- [ ] Convert all images to WebP (with JPEG/PNG fallback)
- [ ] Hero image: max 200KB (WebP quality 80)
- [ ] Serve images via CDN with edge caching
- [ ] Inline critical CSS (above-the-fold styles)
- [ ] Defer all non-critical CSS using `media="print"` trick
- [ ] Remove render-blocking resources from `<head>`
- [ ] Use `font-display: swap` for all custom fonts
- [ ] Preconnect to font CDN: `<link rel="preconnect" href="https://fonts.gstatic.com">`
- [ ] Preload critical fonts (Noto Sans, Noto Sans Sinhala, Noto Sans Tamil)
- [ ] Server response time (TTFB) under 200ms
- [ ] Enable gzip/Brotli compression on the Express server
- [ ] Enable HTTP/2 (or HTTP/3) on web server
- [ ] Use long-lived cache headers for static assets (1 year for versioned files)

### Express.js Compression
```javascript
import compression from 'compression';
app.use(compression({ level: 6, threshold: 1024 }));
```

### Cache-Control Headers (Express.js)
```javascript
app.use('/assets', express.static('public/assets', {
  maxAge: '1y',       // 1 year for fingerprinted static assets
  immutable: true,
  etag: true,
  lastModified: true
}));

app.use(express.static('public', {
  maxAge: '1h',       // 1 hour for HTML
  etag: true
}));
```

---

## 2. INP (Interaction to Next Paint) — Target: < 150ms

### Critical Actions
- [ ] Minimize JavaScript bundle size (target: < 150KB gzipped JS total)
- [ ] Code-split React app (lazy load non-critical routes)
- [ ] Use `React.lazy()` + `<Suspense>` for below-fold components
- [ ] Remove unused JavaScript (run `npm run analyze` with bundle analyzer)
- [ ] Defer third-party scripts (GTM, analytics) to after `load` event
- [ ] Move Google Analytics to Partytown (run off main thread)
- [ ] Use `scheduler.postTask()` for non-urgent DOM work
- [ ] Avoid long tasks (> 50ms) on main thread
- [ ] Use `requestIdleCallback` for non-critical initialization
- [ ] Minimize event listener overhead on scroll
- [ ] Use virtual lists for large data tables (react-window)
- [ ] Avoid layout thrashing: batch DOM reads before writes

### Vite Build Optimization (frontend/vite.config.js)
```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['clsx'],
        }
      }
    },
    minify: 'terser',
    cssMinify: true,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 500,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  }
});
```

---

## 3. CLS (Cumulative Layout Shift) — Target: < 0.05

### Critical Actions
- [ ] ALL `<img>` elements have explicit `width` and `height` attributes
- [ ] ALL `<video>` elements have explicit `width` and `height` attributes
- [ ] Reserve space for ads / embeds with CSS aspect-ratio
- [ ] Avoid inserting content above existing content dynamically
- [ ] Load fonts using `font-display: swap` or `font-display: optional`
- [ ] Pre-reserve space for dynamic content (cookie banners, notifications)
- [ ] Avoid animations that affect layout properties (margin, padding, width)
- [ ] Use `transform` and `opacity` for animations instead
- [ ] Reserve skeleton space for async-loaded content
- [ ] No FOUT (Flash of Unstyled Text) — preload critical fonts

### CSS Aspect Ratio for Images
```css
/* Prevent CLS for images with known ratios */
.hero-image { aspect-ratio: 16 / 9; }
.card-thumbnail { aspect-ratio: 4 / 3; }
.news-image { aspect-ratio: 16 / 9; }
.staff-portrait { aspect-ratio: 3 / 4; }
.logo { aspect-ratio: 5 / 2; }

/* Skeleton loader for async content */
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 4px;
}
@keyframes skeleton-loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

---

## 4. FIRST CONTENTFUL PAINT (FCP) — Target: < 1.2s

- [ ] Inline above-the-fold critical CSS (< 14KB)
- [ ] Server-side render (SSR) or static generation for above-fold content
- [ ] Remove unused CSS (purge Tailwind / unused stylesheets)
- [ ] Minify all CSS
- [ ] Move `<script>` tags to bottom of `<body>` or use `defer`
- [ ] Use `<link rel="preload">` for critical resources

---

## 5. TTFB (Time to First Byte) — Target: < 200ms

- [ ] Enable server-side caching (Redis) for database query results
- [ ] Use CDN for static assets and HTML (Cloudflare or similar)
- [ ] Optimize database queries (add indexes for frequent queries)
- [ ] Enable connection pooling for MongoDB
- [ ] Use HTTP/2 server push for critical resources
- [ ] Reduce server-side processing time (profile Express route handlers)

### MongoDB Connection Pool (backend)
```javascript
mongoose.connect(process.env.MONGODB_URI, {
  maxPoolSize: 10,
  minPoolSize: 2,
  maxIdleTimeMS: 30000,
  serverSelectionTimeoutMS: 5000,
});
```

---

## 6. PERFORMANCE BUDGET

| Resource Type         | Budget (compressed) |
|-----------------------|---------------------|
| Total page weight     | < 500KB             |
| JavaScript (total)    | < 150KB             |
| CSS (total)           | < 50KB              |
| Critical CSS (inline) | < 14KB              |
| Hero image            | < 200KB (WebP)      |
| Fonts total           | < 100KB             |
| Third-party scripts   | < 50KB              |
| HTML                  | < 30KB              |

---

## 7. REACT-SPECIFIC PERFORMANCE

```jsx
// Lazy load route components
import { lazy, Suspense } from 'react';

const Programs = lazy(() => import('./pages/Programs'));
const News = lazy(() => import('./pages/News'));
const Contact = lazy(() => import('./pages/Contact'));

// Route-level code splitting
<Routes>
  <Route path="/" element={<Home />} /> {/* loaded eagerly */}
  <Route path="/programs/*" element={
    <Suspense fallback={<PageSkeleton />}>
      <Programs />
    </Suspense>
  } />
  <Route path="/news/*" element={
    <Suspense fallback={<PageSkeleton />}>
      <News />
    </Suspense>
  } />
</Routes>

// Memoize expensive components
import { memo, useMemo, useCallback } from 'react';
const ProgramCard = memo(function ProgramCard({ program }) { ... });

// Use useMemo for expensive computations
const sortedPrograms = useMemo(
  () => programs.sort((a, b) => a.priority - b.priority),
  [programs]
);
```

---

## 8. IMAGE OPTIMIZATION PIPELINE

```bash
# Install sharp for server-side image processing
npm install sharp

# Convert and optimize images (Node.js script)
const sharp = require('sharp');

await sharp('input.jpg')
  .resize(1920, 1080, { fit: 'cover', position: 'center' })
  .webp({ quality: 82, effort: 6 })
  .toFile('output-1920.webp');

# Generate responsive variants
const sizes = [480, 768, 1200, 1920];
for (const width of sizes) {
  await sharp('hero.jpg')
    .resize(width)
    .webp({ quality: 82 })
    .toFile(`hero-${width}w.webp`);
}
```

---

## 9. LIGHTHOUSE SCORE TARGETS

| Category       | Target Score |
|----------------|-------------|
| Performance    | ≥ 95        |
| Accessibility  | 100         |
| Best Practices | 100         |
| SEO            | 100         |
| PWA            | ≥ 90        |

### Measurement Tools
- **Lighthouse**: Chrome DevTools → Lighthouse tab
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **WebPageTest**: https://webpagetest.org/
- **CrUX Dashboard**: Google Search Console → Core Web Vitals
- **Real User Monitoring**: Google Analytics 4 (CWV in Explore)

---

## 10. MULTILINGUAL PERFORMANCE

### Font Loading Strategy for Sinhala & Tamil
```css
/* Noto Sans for Latin (subset) */
@font-face {
  font-family: 'Noto Sans';
  src: url('/assets/fonts/NotoSans-Regular-subset.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC;
}

/* Noto Sans Sinhala */
@font-face {
  font-family: 'Noto Sans Sinhala';
  src: url('/assets/fonts/NotoSansSinhala-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
  unicode-range: U+0D80-0DFF; /* Sinhala block */
}

/* Noto Sans Tamil */
@font-face {
  font-family: 'Noto Sans Tamil';
  src: url('/assets/fonts/NotoSansTamil-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
  unicode-range: U+0B80-0BFF; /* Tamil block */
}

/* Font stack */
body {
  font-family:
    'Noto Sans',
    'Noto Sans Sinhala',
    'Noto Sans Tamil',
    system-ui,
    -apple-system,
    sans-serif;
}
```

### Load Language Fonts on Demand
```javascript
// Only preload the font for the active language
const lang = document.documentElement.lang;

if (lang === 'si') {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = '/assets/fonts/NotoSansSinhala-Regular.woff2';
  link.as = 'font';
  link.type = 'font/woff2';
  link.crossOrigin = 'anonymous';
  document.head.appendChild(link);
}
```

---

## 11. MONITORING & ALERTS

### Set Up Automated CWV Monitoring
1. **Google Search Console** → Core Web Vitals report (real-user data)
2. **Sentry Performance** → Track INP and LCP regressions per release
3. **Uptime Robot** → TTFB monitoring, alert if > 1s
4. **Lighthouse CI** → Run in GitHub Actions on every PR:

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [pull_request]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '22' }
      - run: npm ci && npm run build
      - uses: treosh/lighthouse-ci-action@v12
        with:
          urls: |
            https://staging.planningsec.sp.gov.lk/
            https://staging.planningsec.sp.gov.lk/programs/
          budgetPath: ./budget.json
          uploadArtifacts: true
```

```json
// budget.json
[
  {
    "path": "/*",
    "timings": [
      { "metric": "interactive", "budget": 3000 },
      { "metric": "first-contentful-paint", "budget": 1200 },
      { "metric": "largest-contentful-paint", "budget": 2000 }
    ],
    "resourceSizes": [
      { "resourceType": "script", "budget": 150 },
      { "resourceType": "stylesheet", "budget": 50 },
      { "resourceType": "image", "budget": 300 },
      { "resourceType": "total", "budget": 500 }
    ],
    "resourceCounts": [
      { "resourceType": "third-party", "budget": 5 }
    ]
  }
]
```

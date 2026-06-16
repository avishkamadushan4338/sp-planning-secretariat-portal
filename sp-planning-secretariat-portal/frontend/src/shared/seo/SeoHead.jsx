/**
 * SeoHead.jsx
 * Reusable React SEO component for the SP Planning Secretariat Portal.
 * Usage: <SeoHead page="home" /> or <SeoHead page="programs" section="agriculture" />
 *
 * Requirements: react-helmet-async
 *   npm install react-helmet-async
 *   Wrap your app root: <HelmetProvider><App /></HelmetProvider>
 */

import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

const SITE = {
  name:        'Provincial Planning Secretariat – Southern Province',
  shortName:   'SP Planning Secretariat',
  url:         'https://www.planningsec.sp.gov.lk',
  locale:      'en_LK',
  twitter:     '@SPPlanningSL',
  themeColor:  '#006633',
  ogImage:     '/assets/images/og/og-home-1200x630.jpg',
  orgId:       'https://www.planningsec.sp.gov.lk/#organization',
};

const PAGE_META = {
  home: {
    title:       `${SITE.name} | Official Government Portal | Galle, Sri Lanka`,
    description: 'Official website of the Provincial Planning Secretariat, Southern Province, Sri Lanka. Driving integrated provincial development from Dakshinapaya, Galle.',
    canonical:   `${SITE.url}/`,
    ogImage:     '/assets/images/og/og-home-1200x630.jpg',
    lang:        'en',
  },
  about: {
    title:       `About | ${SITE.shortName}`,
    description: 'Learn about the Provincial Planning Secretariat of the Southern Province — our mandate, history, leadership team, and organisational structure based in Dakshinapaya, Galle, Sri Lanka.',
    canonical:   `${SITE.url}/about/`,
    ogImage:     '/assets/images/og/og-about-1200x630.jpg',
    lang:        'en',
  },
  news: {
    title:       `News | ${SITE.shortName}`,
    description: 'Latest news and official announcements from the Provincial Planning Secretariat, Southern Province, Sri Lanka.',
    canonical:   `${SITE.url}/news/`,
    ogImage:     '/assets/images/og/og-news-1200x630.jpg',
    lang:        'en',
  },
  notices: {
    title:       `Notices | ${SITE.shortName}`,
    description: 'Official public notices and circulars issued by the Provincial Planning Secretariat, Southern Province, Sri Lanka.',
    canonical:   `${SITE.url}/notices/`,
    ogImage:     '/assets/images/og/og-notices-1200x630.jpg',
    lang:        'en',
  },
  documents: {
    title:       `Documents | ${SITE.shortName}`,
    description: 'Official documents, reports, and publications from the Provincial Planning Secretariat, Southern Province, Sri Lanka.',
    canonical:   `${SITE.url}/documents/`,
    ogImage:     '/assets/images/og/og-documents-1200x630.jpg',
    lang:        'en',
  },
  downloads: {
    title:       `Downloads | ${SITE.shortName}`,
    description: 'Download official forms, publications, and resources from the Provincial Planning Secretariat, Southern Province, Sri Lanka.',
    canonical:   `${SITE.url}/downloads/`,
    ogImage:     '/assets/images/og/og-downloads-1200x630.jpg',
    lang:        'en',
  },
  departments: {
    title:       `Departments & Divisions | ${SITE.shortName}`,
    description: 'Explore the departments and divisions of the Provincial Planning Secretariat — Accounts, Administration, and Development — serving the Southern Province of Sri Lanka.',
    canonical:   `${SITE.url}/departments/`,
    ogImage:     '/assets/images/og/og-departments-1200x630.jpg',
    lang:        'en',
  },
  gallery: {
    title:       `Photo Gallery | ${SITE.shortName}`,
    description: 'Photo gallery showcasing events, projects, and activities of the Provincial Planning Secretariat, Southern Province, Sri Lanka.',
    canonical:   `${SITE.url}/gallery/`,
    ogImage:     '/assets/images/og/og-gallery-1200x630.jpg',
    lang:        'en',
  },
  contact: {
    title:       `Contact Us | ${SITE.shortName}`,
    description: 'Contact the Provincial Planning Secretariat, Southern Province. Visit us at Dakshinapaya, Labuduwa, Galle, Sri Lanka or reach us by phone and email.',
    canonical:   `${SITE.url}/contact/`,
    ogImage:     '/assets/images/og/og-contact-1200x630.jpg',
    lang:        'en',
  },
  faq: {
    title:       `Frequently Asked Questions | ${SITE.shortName}`,
    description: 'Answers to frequently asked questions about the Provincial Planning Secretariat, Southern Province — services, contacts, and development programmes.',
    canonical:   `${SITE.url}/faq/`,
    ogImage:     '/assets/images/og/og-home-1200x630.jpg',
    lang:        'en',
  },
  terms: {
    title:       `Terms & Services | ${SITE.shortName}`,
    description: 'Terms of use and service conditions for the official website of the Provincial Planning Secretariat, Southern Province, Sri Lanka.',
    canonical:   `${SITE.url}/terms/`,
    ogImage:     '/assets/images/og/og-home-1200x630.jpg',
    lang:        'en',
  },
  'not-found': {
    title:       `Page Not Found | ${SITE.shortName}`,
    description: 'The page you are looking for could not be found on the Provincial Planning Secretariat, Southern Province portal.',
    canonical:   `${SITE.url}/`,
    ogImage:     '/assets/images/og/og-home-1200x630.jpg',
    lang:        'en',
  },
};

export default function SeoHead({
  page = 'home',
  title,
  description,
  canonical,
  ogImage,
  ogType = 'website',
  lang = 'en',
  noIndex = false,
  jsonLd,
  breadcrumbs,
}) {
  const meta = PAGE_META[page] || PAGE_META.home;

  const resolvedTitle       = title       || meta.title;
  const resolvedDescription = description || meta.description;
  const resolvedCanonical   = canonical   || meta.canonical;
  const resolvedOgImage     = ogImage     || meta.ogImage;
  const resolvedLang        = lang        || meta.lang || 'en';

  const breadcrumbSchema = breadcrumbs && breadcrumbs.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: `${SITE.url}${item.path}`,
        })),
      }
    : null;

  return (
    <Helmet>
      {/* Language */}
      <html lang={resolvedLang} />

      {/* Core */}
      <title>{resolvedTitle}</title>
      <meta name="description" content={resolvedDescription} />
      <link rel="canonical" href={resolvedCanonical} />

      {/* Robots */}
      <meta
        name="robots"
        content={
          noIndex
            ? 'noindex, nofollow'
            : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
        }
      />

      {/* Hreflang */}
      <link rel="alternate" hrefLang="en" href={resolvedCanonical} />
      <link rel="alternate" hrefLang="si" href={resolvedCanonical.replace(SITE.url, `${SITE.url}/si`)} />
      <link rel="alternate" hrefLang="ta" href={resolvedCanonical.replace(SITE.url, `${SITE.url}/ta`)} />
      <link rel="alternate" hrefLang="x-default" href={resolvedCanonical} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:url" content={resolvedCanonical} />
      <meta property="og:image" content={`${SITE.url}${resolvedOgImage}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={resolvedTitle} />
      <meta property="og:locale" content={SITE.locale} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SITE.twitter} />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      <meta name="twitter:image" content={`${SITE.url}${resolvedOgImage}`} />
      <meta name="twitter:image:alt" content={resolvedTitle} />

      {/* Theme */}
      <meta name="theme-color" content={SITE.themeColor} />

      {/* Breadcrumb Schema */}
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}

      {/* Custom JSON-LD (page-specific) */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}

SeoHead.propTypes = {
  page: PropTypes.oneOf(Object.keys(PAGE_META)),
  title:       PropTypes.string,
  description: PropTypes.string,
  canonical:   PropTypes.string,
  ogImage:     PropTypes.string,
  ogType:      PropTypes.string,
  lang:        PropTypes.oneOf(['en', 'si', 'ta']),
  noIndex:     PropTypes.bool,
  jsonLd:      PropTypes.object,
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// USAGE EXAMPLES
// ─────────────────────────────────────────────────────────────────────────────
//
// Home page:
//   <SeoHead page="home" />
//
// About page:
//   <SeoHead page="about" breadcrumbs={[
//     { name: 'Home', path: '/' },
//     { name: 'About', path: '/about/' },
//   ]} />
//
// Agriculture program page:
//   <SeoHead
//     page="programs"
//     title="Agriculture Development – Southern Province | SP Planning Secretariat"
//     description="Agriculture development programs supporting paddy cultivation, farming communities, and agri-business in the Southern Province of Sri Lanka."
//     canonical="https://www.planningsec.sp.gov.lk/programs/agriculture/"
//     ogImage="/assets/images/og/og-agriculture-1200x630.jpg"
//     breadcrumbs={[
//       { name: 'Home', path: '/' },
//       { name: 'Programs', path: '/programs/' },
//       { name: 'Agriculture', path: '/programs/agriculture/' },
//     ]}
//   />
//
// News article:
//   <SeoHead
//     page="news"
//     title="Article Title Here | SP Planning Secretariat"
//     description="Article description here."
//     canonical={`https://www.planningsec.sp.gov.lk/news/${article.slug}/`}
//     ogType="article"
//     ogImage={article.image}
//     jsonLd={{
//       '@context': 'https://schema.org',
//       '@type': 'NewsArticle',
//       headline: article.title,
//       datePublished: article.publishedAt,
//       author: { '@type': 'Organization', name: 'Provincial Planning Secretariat – Southern Province' },
//     }}
//     breadcrumbs={[
//       { name: 'Home', path: '/' },
//       { name: 'News', path: '/news/' },
//       { name: article.title, path: `/news/${article.slug}/` },
//     ]}
//   />
//
// Sinhala page:
//   <SeoHead
//     page="home"
//     lang="si"
//     title="දකුණු පළාත් ප්‍රාදේශීය සැලසුම් ලේකම් කාර්යාලය | නිල රජයේ ද්වාරය"
//     description="..."
//     canonical="https://www.planningsec.sp.gov.lk/si/"
//   />

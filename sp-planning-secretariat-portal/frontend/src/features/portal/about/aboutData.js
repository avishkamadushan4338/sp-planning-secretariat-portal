/* ─────────────────────────────────────────────────────────────────────────────
   aboutData.js — Southern Province Planning Secretariat
   Central data source for static About route metadata (topic pages only).
   Staff data (Key Officials / Deputy Directors) now comes from the CMS via
   staffApi — see About.jsx, which fetches staffApi.list() and filters by
   `tier` instead of importing hardcoded KEY_OFFICIALS / DEPUTY_DIRECTORS.
───────────────────────────────────────────────────────────────────────────── */

/* ── Topic pages ─────────────────────────────────────────────────────────── */
export const ABOUT_TOPICS = [
  {
    id: 'overview',
    path: '/about/overview',
    label: 'Planning Secretariat Overview',
    labelSi: 'සැලසුම් ලේකම් කාර්යාල දළ විශ්ලේෂණය',
    labelTa: 'திட்டமிடல் செயலாலய கண்ணோட்டம்',
    heroTitle: 'Planning Secretariat Overview',
    heroSub: 'Vision, mission, and the institutional mandate of the Southern Province Planning Secretariat.',
    icon: 'overview',
  },
  {
    id: 'organization-structure',
    path: '/about/organization-structure',
    label: 'Organization Structure',
    labelSi: 'සංවිධාන ව්‍යූහය',
    labelTa: 'நிறுவன அமைப்பு',
    heroTitle: 'Organization Structure',
    heroSub: 'The hierarchical framework and administrative units of the Secretariat.',
    icon: 'structure',
  },
  {
    id: 'functions-duties',
    path: '/about/functions-duties',
    label: 'Functions & Duties',
    labelSi: 'කාර්ය සාධන හා යුතුකම්',
    labelTa: 'செயல்பாடுகள் மற்றும் கடமைகள்',
    heroTitle: 'Functions & Duties',
    heroSub: 'Statutory responsibilities and core functions entrusted to the Secretariat.',
    icon: 'functions',
  },
  {
    id: 'history',
    path: '/about/history',
    label: 'History',
    labelSi: 'ඉතිහාසය',
    labelTa: 'வரலாறு',
    heroTitle: 'Our History',
    heroSub: 'A chronicle of institutional milestones and development of the Planning Secretariat.',
    icon: 'history',
  },
]

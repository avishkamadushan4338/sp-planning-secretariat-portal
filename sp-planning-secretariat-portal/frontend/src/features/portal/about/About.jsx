/* ─────────────────────────────────────────────────────────────────────────────
   About.jsx — Southern Province Planning Secretariat
   Complete About section: Overview, Topic pages, Official profile pages.
   Light theme · Futuristic 2050 government UI
───────────────────────────────────────────────────────────────────────────── */
import { useState, useEffect, useMemo, useContext, createContext, memo, useCallback } from 'react'
import { Link, useLocation, useParams, Route, Routes, Navigate } from 'react-router-dom'
import { SeoHead } from '@/shared/seo'
import { usePageHold } from '@/shared/hooks/usePageHold'
import ComingSoon from '@/shared/components/ComingSoon'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiChevronRight, FiChevronDown, FiChevronLeft,
  FiUsers, FiUser, FiGrid,
  FiBook, FiClock, FiLayers, FiShield,
  FiBriefcase, FiMail, FiPhone, FiMapPin,
  FiStar, FiAward,
  FiCheckCircle, FiTarget, FiClipboard, FiTrendingUp,
  FiFileText, FiBarChart2, FiDatabase, FiSearch,
  FiSend, FiThumbsUp, FiMap, FiActivity,
  FiAlignLeft, FiGlobe,
  FiHeart, FiZap, FiEye,
  FiFlag, FiCompass, FiUnlock, FiLink,
} from 'react-icons/fi'
import {
  HiOutlineOfficeBuilding,
  HiOutlineChartBar,
  HiOutlineCollection,
} from 'react-icons/hi'
import './About.css'
import '../departments/Departments.css'
import { ABOUT_TOPICS } from './aboutData'
import { staffApi, aboutOverviewApi, aboutFunctionsApi } from '@/features/cms/cmsContentApi'
import { resolveUploadUrl } from '@/shared/utils/resolveUploadUrl'
import OrganizationStructureChart from './OrganizationStructureChart'
import HistoryPage from './History'

/* ─────────────────────────────────────────────────────────────────────────────
   Staff → About-page-shape adapters
   Key Officials (tier: deputy-secretary, director) and Deputy Directors
   (tier: deputy-director) used to be hardcoded KEY_OFFICIALS/DEPUTY_DIRECTORS
   arrays in aboutData.js. They now come from staffApi.list() and are mapped
   into the same shape the route-generation and profile pages below expect
   (id/path/label/name/position/photo/responsibilities/contact/...).
───────────────────────────────────────────────────────────────────────────── */
function staffToOfficial(s) {
  return {
    id: s.id,
    path: `/about/${s.id}`,
    label: s.position?.en || '',
    labelSi: s.position?.si || '',
    labelTa: s.position?.ta || '',
    name: s.name?.en || '',
    position: s.position?.en || '',
    department: 'Planning Secretariat, Southern Province',
    positionRank: s.positionRank || s.position?.en || '',
    photo: resolveUploadUrl(s.photo),
    heroTitle: s.position?.en || '',
    heroSub: '',
    icon: s.tier === 'deputy-secretary' ? 'deputy-sec' : 'director',
    responsibilities: (s.responsibilities?.en?.length ? s.responsibilities.en : []),
    contact: {
      phone: s.phone || '',
      email: s.email || '',
      office: s.office || 'Planning Secretariat, Southern Province',
    },
  }
}

function staffToDeputyDirector(s, index) {
  // Route id/path segment mirrors the legacy DEPUTY_DIRECTORS array ('1'..'6'
  // by list position), NOT positionNumber (which is a Roman numeral label).
  const routeId = String(index + 1)
  return {
    id: routeId,
    path: `/about/deputy-directors/${routeId}`,
    label: `Deputy Director ${s.positionNumber || ''}`.trim(),
    name: s.name?.en || '',
    position: s.position?.en || '',
    positionNumber: s.positionNumber || '',
    department: `Planning Division – ${s.positionNumber || ''}`.trim(),
    photo: resolveUploadUrl(s.photo),
    heroTitle: s.position?.en || '',
    heroSub: 'Deputy Director of the Southern Province Planning Secretariat.',
    responsibilities: (s.responsibilities?.en?.length ? s.responsibilities.en : []),
    contact: {
      phone: s.phone || '',
      email: s.email || '',
      office: s.office || 'Planning Secretariat, Southern Province',
    },
  }
}

/* ─────────────────────────────────────────────────────────────────────────────
   AboutStaffContext — fetched once at the About() root, consumed by
   AboutLayout's sidebar/quick-link components and the route generation below
   without threading props through every call site.
───────────────────────────────────────────────────────────────────────────── */
const AboutStaffContext = createContext({ keyOfficials: [], deputyDirectors: [] })

/* ─────────────────────────────────────────────────────────────────────────────
   Helpers
───────────────────────────────────────────────────────────────────────────── */
const TOPIC_ICONS = {
  overview: <HiOutlineOfficeBuilding />,
  structure: <HiOutlineChartBar />,
  functions: <HiOutlineCollection />,
  history: <FiClock />,
  divisions: <FiLayers />,
  'deputy-sec': <FiShield />,
  director: <FiBriefcase />,
  team: <FiUsers />,
}

function topicIcon(iconKey) {
  return TOPIC_ICONS[iconKey] ?? <FiGrid />
}

/* Framer Motion variants */
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] } },
}

const stagger = (delay = 0.07) => ({
  hidden: {},
  visible: { transition: { staggerChildren: delay } },
})

const slideIn = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.36, ease: [0.16, 1, 0.3, 1] } },
}

/* ─────────────────────────────────────────────────────────────────────────────
   AboutHero
───────────────────────────────────────────────────────────────────────────── */
function AbHoneycomb() {
  const r = 20, hx = r * Math.sqrt(3), vy = r * 1.5
  const cells = []
  for (let row = 0; row < 10; row++)
    for (let col = 0; col < 20; col++) {
      const cx = col * hx + (row % 2 ? hx / 2 : 0) + r
      const cy = row * vy + r
      const pts = Array.from({ length: 6 }, (_, i) => {
        const a = (Math.PI / 180) * (60 * i)
        return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`
      }).join(' ')
      cells.push(<polygon key={`${row}-${col}`} points={pts} stroke="#C79A2B" strokeWidth="1" fill="none" />)
    }
  const W = 20 * hx + r + 4, H = 9 * vy + r * 2 + 4
  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" fill="none">
      {cells}
    </svg>
  )
}

const AboutHero = memo(function AboutHero({ title, sub }) {
  const staggerV = { hidden: {}, visible: { transition: { staggerChildren: 0.10 } } }
  const itemV    = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 0.60, ease: [0.16, 1, 0.3, 1] } } }
  const slideR   = { hidden: { opacity: 0, x: 36 }, visible: { opacity: 1, x: 0, transition: { duration: 0.70, ease: [0.16, 1, 0.3, 1] } } }

  return (
    <section className="ab-hero" aria-label={`Hero: ${title}`}>
      <div className="ab-hero__bg" aria-hidden="true" />
      <div className="ab-hero__noise" aria-hidden="true" />
      <div className="ab-hero__grid-lines" aria-hidden="true" />
      <div className="ab-hero__glow ab-hero__glow--gold"   aria-hidden="true" />
      <div className="ab-hero__glow ab-hero__glow--maroon" aria-hidden="true" />
      <div className="ab-hero__glow ab-hero__glow--right"  aria-hidden="true" />
      <div className="ab-hero__hc" aria-hidden="true"><AbHoneycomb /></div>
      {[...Array(6)].map((_, i) => (
        <div key={i} className={`ab-hero__dot ab-hero__dot--${i + 1}`} aria-hidden="true" />
      ))}
      <div className="ab-hero__watermark" aria-hidden="true">ABOUT</div>

      <div className="ab-hero__inner">
        <motion.div className="ab-hero__left" initial="hidden" animate="visible" variants={staggerV}>

          <motion.div className="ab-hero__badge" variants={itemV}>
            <span className="ab-hero__badge-dot" aria-hidden="true" />
            <span style={{ fontFamily: "'Cinzel', serif", letterSpacing: '0.13em', textTransform: 'uppercase' }}>
              {title}
            </span>
          </motion.div>

          <motion.h1 className="ab-hero__title" variants={itemV}>
            {title}
          </motion.h1>

          <motion.div
            className="ab-hero__rule"
            variants={{
              hidden:  { scaleX: 0, opacity: 0 },
              visible: { scaleX: 1, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
            }}
            aria-hidden="true"
          />

          {sub && (
            <motion.p className="ab-hero__sub" variants={itemV}>
              {sub}
            </motion.p>
          )}
        </motion.div>

        <motion.div className="ab-hero__right" initial="hidden" animate="visible" variants={slideR}>
          <img
            src="/branding/f-logo.svg"
            alt="Southern Province Planning Secretariat"
            className="ab-hero__logo"
            onError={e => { e.currentTarget.style.display = 'none' }}
          />
        </motion.div>
      </div>

      <svg className="ab-hero__wave" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,80 C240,20 480,60 720,40 C960,20 1200,60 1440,30 L1440,80 Z" fill="#F9F6F1" />
      </svg>
    </section>
  )
})

/* ─────────────────────────────────────────────────────────────────────────────
   useAllQuickLinks — builds the ALL_QUICK_LINKS-shaped sidebar data from the
   fetched staff context (replaces the old hardcoded aboutData.js export).
───────────────────────────────────────────────────────────────────────────── */
function useAllQuickLinks() {
  const { keyOfficials } = useContext(AboutStaffContext)
  return useMemo(() => [
    { group: 'About', items: ABOUT_TOPICS },
    {
      group: 'Key Officials',
      items: [
        ...keyOfficials,
        {
          id: 'deputy-directors',
          path: '/about/deputy-directors',
          label: 'Deputy Directors',
          labelSi: 'නියෝජ්‍ය අධ්‍යක්ෂවරු',
          labelTa: 'துணை இயக்குநர்கள்',
          heroTitle: 'Deputy Directors',
          heroSub: 'Planning team deputy directors of the Southern Province Planning Secretariat.',
          icon: 'team',
        },
      ],
    },
  ], [keyOfficials])
}

/* ─────────────────────────────────────────────────────────────────────────────
   AboutQuickLinks — Sidebar (desktop)
───────────────────────────────────────────────────────────────────────────── */
const AboutQuickLinks = memo(function AboutQuickLinks({ activePath }) {
  const allQuickLinks = useAllQuickLinks()
  return (
    <aside className="ab-sidebar" aria-label="About quick links">
      <div className="ab-sidebar__inner">
        <div className="ab-sidebar__header">
          <FiGrid className="ab-sidebar__header-icon" aria-hidden="true" />
          <span className="ab-sidebar__header-title">Quick Links</span>
        </div>

        {allQuickLinks.map((group) => (
          <div key={group.group} className="ab-sidebar__group">
            <p className="ab-sidebar__group-label" aria-hidden="true">{group.group}</p>
            {group.items.map((item) => {
              const isActive = activePath === item.path ||
                (item.path === '/about/deputy-directors' && activePath.startsWith('/about/deputy-directors'))
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`ab-sidebar__link${isActive ? ' ab-sidebar__link--active' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="ab-sidebar__link-dot" aria-hidden="true" />
                  {item.label}
                </Link>
              )
            })}
          </div>
        ))}
      </div>
    </aside>
  )
})

/* ─────────────────────────────────────────────────────────────────────────────
   AboutQuickLinksMobile — collapsible accordion (mobile)
───────────────────────────────────────────────────────────────────────────── */
const AboutQuickLinksMobile = memo(function AboutQuickLinksMobile({ activePath }) {
  const [open, setOpen] = useState(false)
  const allQuickLinks = useAllQuickLinks()

  const toggle = useCallback(() => setOpen(v => !v), [])

  const activeLabel = useMemo(() => {
    for (const g of allQuickLinks) {
      for (const item of g.items) {
        if (activePath === item.path ||
          (item.path === '/about/deputy-directors' && activePath.startsWith('/about/deputy-directors'))) {
          return item.label
        }
      }
    }
    return 'Quick Links'
  }, [activePath, allQuickLinks])

  return (
    <nav className="ab-quicklinks-mobile" aria-label="About navigation (mobile)">
      <button
        className="ab-quicklinks-mobile__toggle"
        aria-expanded={open}
        aria-controls="ql-mobile-panel"
        onClick={toggle}
      >
        <span>{activeLabel}</span>
        <FiChevronDown
          className={`ab-quicklinks-mobile__toggle-icon${open ? ' ab-quicklinks-mobile__toggle-icon--open' : ''}`}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="ql-mobile-panel"
            className="ab-quicklinks-mobile__panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
          >
            {allQuickLinks.map((group) => (
              <div key={group.group}>
                <p className="ab-quicklinks-mobile__group-label" aria-hidden="true">{group.group}</p>
                {group.items.map((item) => {
                  const isActive = activePath === item.path ||
                    (item.path === '/about/deputy-directors' && activePath.startsWith('/about/deputy-directors'))
                  return (
                    <Link
                      key={item.id}
                      to={item.path}
                      className={`ab-quicklinks-mobile__link${isActive ? ' ab-quicklinks-mobile__link--active' : ''}`}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={() => setOpen(false)}
                    >
                      <span className="ab-quicklinks-mobile__link-dot" aria-hidden="true" />
                      {item.label}
                    </Link>
                  )
                })}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
})

/* ─────────────────────────────────────────────────────────────────────────────
   AboutQuickLinksTablet — horizontal scrolling pills (tablet)
───────────────────────────────────────────────────────────────────────────── */
const AboutQuickLinksTablet = memo(function AboutQuickLinksTablet({ activePath }) {
  const allQuickLinks = useAllQuickLinks()
  const allItems = useMemo(() => allQuickLinks.flatMap(g => g.items), [allQuickLinks])
  return (
    <nav className="ab-quicklinks-tablet" aria-label="About navigation (tablet)">
      {allItems.map((item) => {
        const isActive = activePath === item.path ||
          (item.path === '/about/deputy-directors' && activePath.startsWith('/about/deputy-directors'))
        return (
          <Link
            key={item.id}
            to={item.path}
            className={`ab-quicklinks-tablet__pill${isActive ? ' ab-quicklinks-tablet__pill--active' : ''}`}
            aria-current={isActive ? 'page' : undefined}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
})

/* ─────────────────────────────────────────────────────────────────────────────
   AboutLayout — shared page shell
───────────────────────────────────────────────────────────────────────────── */
function AboutLayout({ heroTitle, heroSub, children }) {
  const { pathname } = useLocation()

  return (
    <div className="ab-page">
      <AboutHero title={heroTitle} sub={heroSub} />
      <AboutQuickLinksTablet activePath={pathname} />
      <AboutQuickLinksMobile activePath={pathname} />
      <div className="ab-body">
        <AboutQuickLinks activePath={pathname} />
        <main className="ab-main" id="main-content" tabIndex={-1}>
          {children}
        </main>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   Functions & Duties — multilingual data
───────────────────────────────────────────────────────────────────────────── */
const FD_ICON_COMPONENTS = [
  FiSend, FiClipboard, FiTarget, FiCheckCircle,
  FiThumbsUp, FiMap, FiActivity, FiBarChart2,
  FiFileText, FiDatabase, FiSearch, FiGlobe,
  FiAlignLeft, FiTrendingUp,
]

/* Functions & Duties content now comes from aboutFunctionsApi.get() (see
   FunctionsDutiesPage below) — replaces the previously hardcoded FD_DATA
   module constant. */

/* ─────────────────────────────────────────────────────────────────────────────
   useLang — reads localStorage 'lang' key (same system as other pages)
───────────────────────────────────────────────────────────────────────────── */
function useLang() {
  const [lang, setLang] = useState(() => {
    const stored = localStorage.getItem('lang')
    return stored === 'si' || stored === 'ta' ? stored : 'en'
  })

  useEffect(() => {
    const handler = () => {
      const stored = localStorage.getItem('lang')
      setLang(stored === 'si' || stored === 'ta' ? stored : 'en')
    }
    window.addEventListener('storage', handler)
    window.addEventListener('langChange', handler)
    return () => {
      window.removeEventListener('storage', handler)
      window.removeEventListener('langChange', handler)
    }
  }, [])

  return lang
}

/* ─────────────────────────────────────────────────────────────────────────────
   FunctionsDutiesPage — content page for /about/functions-duties
───────────────────────────────────────────────────────────────────────────── */
function FunctionsDutiesPage({ topic }) {
  const lang = useLang()
  const [data, setData] = useState(null)

  useEffect(() => {
    let cancelled = false
    aboutFunctionsApi.get()
      .then(({ data }) => { if (!cancelled) setData(data) })
      .catch((err) => console.error('FunctionsDutiesPage: failed to load functions', err))
    return () => { cancelled = true }
  }, [])

  if (!data) return null

  const t = data[lang] ?? data.en
  const isNonLatin = lang === 'si' || lang === 'ta'

  return (
    <AboutLayout heroTitle={topic.heroTitle} heroSub={topic.heroSub}>
      <motion.div
        className="ab-content"
        initial="hidden"
        animate="visible"
        variants={stagger(0.08)}
      >
        {/* ── Intro glass card ── */}
        <motion.div className="ab-fd-intro" variants={fadeUp} role="note">
          <div className="ab-fd-intro__icon" aria-hidden="true">
            <HiOutlineCollection />
          </div>
          <div className="ab-fd-intro__body">
            <h2 className="ab-fd-intro__title" style={{ fontFamily: isNonLatin ? t.font : undefined }}>
              {t.sectionLabel}
            </h2>
            <p className="ab-fd-intro__text" style={{ fontFamily: t.font }}>
              {t.intro}
            </p>
          </div>
        </motion.div>

        {/* ── Duty cards grid ── */}
        <motion.ol
          className="ab-fd-grid"
          variants={stagger(0.055)}
          aria-label={t.sectionLabel}
        >
          {t.duties.map((duty, i) => (
            <motion.li
              key={i}
              className="ab-fd-card"
              variants={fadeUp}
            >
              <div className="ab-fd-card__left">
                <div className="ab-fd-card__icon-wrap" aria-hidden="true">
                  {(() => { const Icon = FD_ICON_COMPONENTS[i % FD_ICON_COMPONENTS.length]; return <Icon /> })()}
                </div>
                <div className="ab-fd-card__number" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </div>
              </div>
              <p
                className="ab-fd-card__text"
                style={{ fontFamily: t.font }}
              >
                {duty}
              </p>
            </motion.li>
          ))}
        </motion.ol>

        {/* ── Bottom glass accent ── */}
        <motion.div className="ab-glass-accent" variants={fadeUp}>
          <div className="ab-glass-accent__icon" aria-hidden="true">
            <FiShield />
          </div>
          <div className="ab-glass-accent__content">
            <div className="ab-glass-accent__title">Official Government Content</div>
            <div className="ab-glass-accent__sub">
              All information published on this page is sourced from the Southern Province
              Planning Secretariat and is subject to official review before publication.
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AboutLayout>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   AboutContentPage — generic topic page with placeholder layout
───────────────────────────────────────────────────────────────────────────── */
function AboutContentPage({ topic }) {
  return (
    <AboutLayout heroTitle={topic.heroTitle} heroSub={topic.heroSub}>
      <motion.div
        className="ab-content"
        initial="hidden"
        animate="visible"
        variants={stagger(0.1)}
      >
        {/* Placeholder main card */}
        <motion.div className="ab-placeholder-card" variants={fadeUp}>
          <div className="ab-placeholder-card__icon-wrap" aria-hidden="true">
            {topicIcon(topic.icon)}
          </div>
          <h2 className="ab-placeholder-card__title">{topic.heroTitle}</h2>
          <p className="ab-placeholder-card__sub">
            Content for this section is being prepared and will be published soon.
            This page is part of the Southern Province Planning Secretariat&apos;s official About section.
          </p>
          <span className="ab-placeholder-card__badge">
            <FiClock aria-hidden="true" /> Coming Soon
          </span>
        </motion.div>

        {/* Stat placeholder row */}
        <motion.div className="ab-stat-row" variants={stagger(0.06)} role="list" aria-label="Key statistics">
          {[
            { icon: <FiUsers />, label: 'Established', value: '1978', desc: 'Year of establishment' },
            { icon: <HiOutlineOfficeBuilding />, label: 'Province', value: 'Southern', desc: 'Provincial coverage' },
            { icon: <FiLayers />, label: 'Divisions', value: '6', desc: 'Planning divisions' },
            { icon: <FiBook />, label: 'Districts', value: '3', desc: 'Districts covered' },
          ].map((s) => (
            <motion.div className="ab-stat-card" key={s.label} variants={slideIn} role="listitem">
              <div className="ab-stat-card__icon" aria-hidden="true">{s.icon}</div>
              <div className="ab-stat-card__label">{s.label}</div>
              <div className="ab-stat-card__value">{s.value}</div>
              <div className="ab-stat-card__desc">{s.desc}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Glass accent panel */}
        <motion.div className="ab-glass-accent" variants={fadeUp}>
          <div className="ab-glass-accent__icon" aria-hidden="true">
            <FiShield />
          </div>
          <div className="ab-glass-accent__content">
            <div className="ab-glass-accent__title">Official Government Content</div>
            <div className="ab-glass-accent__sub">
              All information published on this page is sourced from the Southern Province
              Planning Secretariat and is subject to official review before publication.
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AboutLayout>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   PremiumProfileHero — shared dark hero with spinning ring avatar
───────────────────────────────────────────────────────────────────────────── */
function AbHoneycombProfile() {
  const r = 20, hx = r * Math.sqrt(3), vy = r * 1.5
  const cells = []
  for (let row = 0; row < 10; row++)
    for (let col = 0; col < 20; col++) {
      const cx = col * hx + (row % 2 ? hx / 2 : 0) + r
      const cy = row * vy + r
      const pts = Array.from({ length: 6 }, (_, i) => {
        const a = (Math.PI / 180) * (60 * i)
        return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`
      }).join(' ')
      cells.push(<polygon key={`${row}-${col}`} points={pts} stroke="#C79A2B" strokeWidth="1" fill="none" />)
    }
  const W = 20 * hx + r + 4, H = 9 * vy + r * 2 + 4
  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" fill="none">
      {cells}
    </svg>
  )
}

function PremiumProfileHero({ name, position, badge, imgSrc, backPath, backLabel, contactPath }) {
  const staggerV = { hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }
  const itemV    = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } } }
  const imgV     = { hidden: { opacity: 0, scale: 0.88 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.70, ease: [0.22, 1, 0.36, 1] } } }

  const [imgOk, setImgOk] = useState(true)

  return (
    <section className="dprof-hero" aria-label={`Profile: ${name}`}>
      <div className="dprof-hero__noise"       aria-hidden="true" />
      <div className="dprof-hero__grid-lines"  aria-hidden="true" />
      <div className="dprof-hero__glow dprof-hero__glow--gold"  aria-hidden="true" />
      <div className="dprof-hero__glow dprof-hero__glow--right" aria-hidden="true" />
      <div className="dep-hero__hc" aria-hidden="true" style={{ opacity: 0.05 }}><AbHoneycombProfile /></div>
      {[...Array(6)].map((_, i) => (
        <div key={i} className={`dep-hero__dot dep-hero__dot--${i + 1}`} aria-hidden="true" />
      ))}

      <div className="dprof-hero__inner">
        {/* ── Avatar column ── */}
        <motion.div initial="hidden" animate="visible" variants={imgV} style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="dprof__img-frame" role="img" aria-label={name}>
            {imgSrc && imgOk
              ? <img src={imgSrc} alt={name} className="dprof__img" onError={() => setImgOk(false)} />
              : <div className="dprof__img-placeholder" aria-hidden="true"><FiUser size={48} /></div>
            }
          </div>
        </motion.div>

        {/* ── Text column ── */}
        <motion.div className="dprof-hero__content" initial="hidden" animate="visible" variants={staggerV}>
          <motion.div className="dprof-hero__badge" variants={itemV}>
            <span className="dprof-hero__badge-dot" aria-hidden="true" />
            <span style={{ fontFamily: "'Cinzel', serif", letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: '0.72rem' }}>
              {badge}
            </span>
          </motion.div>

          <motion.h1 className="dprof-hero__name" style={{ fontFamily: "'Playfair Display', Georgia, serif" }} variants={itemV}>
            {name}
          </motion.h1>

          <motion.div
            className="dprof-hero__rule"
            variants={{ hidden: { scaleX: 0, opacity: 0 }, visible: { scaleX: 1, opacity: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } } }}
            aria-hidden="true"
          />

          <motion.p className="dprof-hero__position" variants={itemV}>{position}</motion.p>

          <motion.div className="dprof-hero__actions" variants={itemV}>
            {contactPath && (
              <Link to={contactPath} className="dprof-hero__btn dprof-hero__btn--gold">
                <FiPhone size={14} /><span>Contact Office</span>
              </Link>
            )}
            <Link to={backPath} className="dprof-hero__btn dprof-hero__btn--ghost">
              <FiChevronLeft size={14} /><span>{backLabel}</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <svg className="dprof-hero__wave" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,80 C240,20 480,60 720,40 C960,20 1200,60 1440,30 L1440,80 Z" fill="#FCFBFA" />
      </svg>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   OfficialProfilePage — Deputy Secretary / Director profile
───────────────────────────────────────────────────────────────────────────── */
function OfficialProfilePage({ official }) {
  return (
    <div className="dprof-wrap">
      <PremiumProfileHero
        name={official.name}
        position={official.position}
        badge={official.positionRank ?? official.position}
        imgSrc={official.photo}
        backPath="/about"
        backLabel="Back to About"
        contactPath="/contact"
      />

      {/* ── Body: sidebar + main ── */}
      <div className="dprof-body">
        {/* Sidebar */}
        <aside className="dprof-sidebar">
          {/* Contact card */}
          <motion.div
            className="dprof-info-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="dprof-info-card__heading">
              <FiPhone size={15} style={{ color: '#C79A2B' }} aria-hidden="true" />
              Contact
            </div>

            <div className="dprof-info-row">
              <div className="dprof-info-row__icon"><FiPhone aria-hidden="true" /></div>
              <div>
                <div className="dprof-info-row__label">Telephone</div>
                <div className="dprof-info-row__value">
                  <a href={`tel:${official.contact.phone}`}>{official.contact.phone}</a>
                </div>
              </div>
            </div>

            <div className="dprof-info-row">
              <div className="dprof-info-row__icon"><FiMail aria-hidden="true" /></div>
              <div>
                <div className="dprof-info-row__label">Email</div>
                <div className="dprof-info-row__value">
                  <a href={`mailto:${official.contact.email}`}>{official.contact.email}</a>
                </div>
              </div>
            </div>

            <div className="dprof-info-row">
              <div className="dprof-info-row__icon"><FiMapPin aria-hidden="true" /></div>
              <div>
                <div className="dprof-info-row__label">Office</div>
                <div className="dprof-info-row__value">{official.contact.office}</div>
              </div>
            </div>
          </motion.div>

          {/* Department card */}
          <motion.div
            className="dprof-info-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="dprof-info-card__heading">
              <FiBriefcase size={15} style={{ color: '#C79A2B' }} aria-hidden="true" />
              Division
            </div>
            <div className="dprof-info-row">
              <div className="dprof-info-row__icon"><FiBriefcase aria-hidden="true" /></div>
              <div>
                <div className="dprof-info-row__label">Unit</div>
                <div className="dprof-info-row__value">{official.department ?? 'Planning Secretariat, Southern Province'}</div>
              </div>
            </div>
          </motion.div>
        </aside>

        {/* Main content */}
        <main className="dprof-main-content">
          <motion.div
            className="dprof-section-card"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="dprof-section-card__heading">Key Responsibilities</h2>
            <div className="dprof-section-card__body">
              <ul className="dprof-resp-list" role="list">
                {official.responsibilities.map((r, i) => (
                  <li key={i} className={typeof r !== 'string' ? 'dprof-resp-list__has-sub' : ''}>
                    {typeof r === 'string' ? r : (
                      <>
                        <span>{r.text}</span>
                        <ul className="dprof-resp-sublist">
                          {r.subItems.map((s, j) => <li key={j}>{s}</li>)}
                        </ul>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            className="dprof-contact-cta"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="dprof-contact-cta__text">
              <div className="dprof-contact-cta__title">Get in touch with the Secretariat</div>
              <p>For official correspondence, use the contact details provided or visit our Contact page.</p>
            </div>
            <Link to="/contact" className="dprof-contact-cta__btn">
              Contact Office <FiChevronRight size={14} aria-hidden="true" />
            </Link>
          </motion.div>
        </main>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   DeputyDirectorProfilePage — single DD profile
───────────────────────────────────────────────────────────────────────────── */
function DeputyDirectorProfilePageWrapper() {
  const { id } = useParams()
  return (
    <SubHold holdKey={`about__deputy-directors__${id}`} pageKey="about__deputy-directors">
      <DeputyDirectorProfilePage />
    </SubHold>
  )
}

function DeputyDirectorProfilePage() {
  const { id } = useParams()
  const { deputyDirectors } = useContext(AboutStaffContext)
  const dd = useMemo(() => deputyDirectors.find(d => d.id === id), [id, deputyDirectors])

  if (!dd) {
    return <Navigate to="/about/deputy-directors" replace />
  }

  return (
    <div className="dprof-wrap">
      <PremiumProfileHero
        name={dd.name}
        position={dd.position}
        badge="Deputy Director – Planning"
        imgSrc={dd.photo}
        backPath="/about/deputy-directors"
        backLabel="Deputy Directors"
        contactPath="/contact"
      />

      {/* ── Body: sidebar + main ── */}
      <div className="dprof-body">
        {/* Sidebar */}
        <aside className="dprof-sidebar">
          {/* Contact card */}
          <motion.div
            className="dprof-info-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="dprof-info-card__heading">
              <FiPhone size={15} style={{ color: '#C79A2B' }} aria-hidden="true" />
              Contact
            </div>

            <div className="dprof-info-row">
              <div className="dprof-info-row__icon"><FiPhone aria-hidden="true" /></div>
              <div>
                <div className="dprof-info-row__label">Telephone</div>
                <div className="dprof-info-row__value">
                  <a href={`tel:${dd.contact.phone}`}>{dd.contact.phone}</a>
                </div>
              </div>
            </div>

            <div className="dprof-info-row">
              <div className="dprof-info-row__icon"><FiMail aria-hidden="true" /></div>
              <div>
                <div className="dprof-info-row__label">Email</div>
                <div className="dprof-info-row__value">
                  <a href={`mailto:${dd.contact.email}`}>{dd.contact.email}</a>
                </div>
              </div>
            </div>

            <div className="dprof-info-row">
              <div className="dprof-info-row__icon"><FiMapPin aria-hidden="true" /></div>
              <div>
                <div className="dprof-info-row__label">Office</div>
                <div className="dprof-info-row__value">{dd.contact.office}</div>
              </div>
            </div>
          </motion.div>

        </aside>

        {/* Main content */}
        <main className="dprof-main-content">
          <motion.div
            className="dprof-section-card"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="dprof-section-card__heading">Key Responsibilities</h2>
            <div className="dprof-section-card__body">
              <ul className="dprof-resp-list" role="list">
                {dd.responsibilities.map((r, i) => (
                  <li key={i} className={typeof r !== 'string' ? 'dprof-resp-list__has-sub' : ''}>
                    {typeof r === 'string' ? r : (
                      <>
                        <span>{r.text}</span>
                        <ul className="dprof-resp-sublist">
                          {r.subItems.map((s, j) => <li key={j}>{s}</li>)}
                        </ul>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            className="dprof-contact-cta"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="dprof-contact-cta__text">
              <div className="dprof-contact-cta__title">Get in touch with the Secretariat</div>
              <p>For official correspondence, use the contact details provided or visit our Contact page.</p>
            </div>
            <Link to="/contact" className="dprof-contact-cta__btn">
              Contact Office <FiChevronRight size={14} aria-hidden="true" />
            </Link>
          </motion.div>
        </main>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   DeputyDirectorsListPage — grid of all 6 DDs
───────────────────────────────────────────────────────────────────────────── */
function DeputyDirectorsListPage() {
  const { deputyDirectors } = useContext(AboutStaffContext)
  return (
    <AboutLayout
      heroTitle="Deputy Directors – Planning"
      heroSub="Meet the planning team's deputy directors of the Southern Province Planning Secretariat."
    >
      <motion.div
        className="ab-content"
        initial="hidden"
        animate="visible"
        variants={stagger(0.09)}
      >
        {/* Back */}
        <motion.div variants={fadeUp}>
          <Link to="/about" className="ab-back-link">
            <FiChevronLeft aria-hidden="true" /> About Overview
          </Link>
        </motion.div>

        {/* DD grid */}
        <motion.div
          className="ab-dd-list"
          variants={stagger(0.07)}
          role="list"
          aria-label="Deputy Directors"
        >
          {deputyDirectors.map((dd) => (
            <motion.div key={dd.id} variants={fadeUp} role="listitem">
              <Link
                to={dd.path}
                className="ab-dd-card"
                aria-label={`View profile: ${dd.position}`}
              >
                <div className="ab-dd-card__avatar" aria-hidden="true" role="img">
                  {dd.photo
                    ? <img src={dd.photo} alt={dd.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'block' }} />
                    : null}
                  <FiUser style={dd.photo ? { display: 'none' } : {}} />
                </div>
                <span className="ab-dd-card__name">{dd.name}</span>
                <span className="ab-dd-card__cta">
                  View Profile <FiChevronRight aria-hidden="true" />
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Glass accent */}
        <motion.div className="ab-glass-accent" variants={fadeUp}>
          <div className="ab-glass-accent__icon" aria-hidden="true"><FiUsers /></div>
          <div className="ab-glass-accent__content">
            <div className="ab-glass-accent__title">Planning Team</div>
            <div className="ab-glass-accent__sub">
              Six Deputy Directors lead the planning divisions across the Southern Province.
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AboutLayout>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   Values — multilingual data
───────────────────────────────────────────────────────────────────────────── */
const VALUE_ICONS = [
  FiHeart, FiUnlock, FiUsers, FiEye,
  FiStar, FiShield, FiFlag, FiLink,
]

/* Values, Objectives, and Awards content now come from aboutOverviewApi.get()
   (see AboutOverviewDashboard below) — replaces the previously hardcoded
   overviewValues / overviewObjectives / overviewAwards module constants. */

/* ─────────────────────────────────────────────────────────────────────────────
   OverviewValues — animated glassmorphism value cards grid
───────────────────────────────────────────────────────────────────────────── */
function OverviewValues({ lang, data }) {
  const t = data[lang] ?? data.en
  const fontFamily = lang === 'si'
    ? "'Noto Sans Sinhala', sans-serif"
    : lang === 'ta'
      ? "'Noto Sans Tamil', sans-serif"
      : 'inherit'

  return (
    <motion.section
      className="ab-ov-values"
      variants={fadeUp}
      aria-labelledby="ov-values-heading"
    >
      <div className="ab-ov-section-header">
        <p className="ab-ov-section-label" id="ov-values-heading" aria-label={t.sectionLabel}>
          {t.sectionLabel}
        </p>
      </div>

      <motion.div
        className="ab-ov-values__grid"
        variants={stagger(0.06)}
        role="list"
        aria-label={t.sectionLabel}
      >
        {t.items.map((value, i) => {
          const Icon = VALUE_ICONS[i % VALUE_ICONS.length]
          return (
            <motion.div
              key={i}
              className="ab-ov-value-card"
              variants={fadeUp}
              role="listitem"
              whileHover={{ y: -4, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } }}
            >
              <div className="ab-ov-value-card__icon-wrap" aria-hidden="true">
                <Icon className="ab-ov-value-card__icon" />
              </div>
              <span
                className="ab-ov-value-card__label"
                style={{ fontFamily: lang !== 'en' ? fontFamily : undefined }}
              >
                {value}
              </span>
              <div className="ab-ov-value-card__glow" aria-hidden="true" />
            </motion.div>
          )
        })}
      </motion.div>
    </motion.section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   OverviewObjectives — numbered timeline-style objective cards
───────────────────────────────────────────────────────────────────────────── */
const OBJ_ICONS = [FiCompass, FiClipboard, FiLink, FiZap]

function OverviewObjectives({ lang, data }) {
  const t = data[lang] ?? data.en
  const fontFamily = lang === 'si'
    ? "'Noto Sans Sinhala', sans-serif"
    : lang === 'ta'
      ? "'Noto Sans Tamil', sans-serif"
      : 'inherit'

  return (
    <motion.section
      className="ab-ov-objectives"
      variants={fadeUp}
      aria-labelledby="ov-objectives-heading"
    >
      <div className="ab-ov-section-header">
        <p className="ab-ov-section-label" id="ov-objectives-heading" aria-label={t.sectionLabel}>
          {t.sectionLabel}
        </p>
      </div>

      <motion.ol
        className="ab-ov-obj-list"
        variants={stagger(0.08)}
        aria-label={t.sectionLabel}
      >
        {t.items.map((obj, i) => {
          const Icon = OBJ_ICONS[i % OBJ_ICONS.length]
          return (
            <motion.li
              key={i}
              className="ab-ov-obj-card"
              variants={fadeUp}
            >
              <div className="ab-ov-obj-card__left" aria-hidden="true">
                <div className="ab-ov-obj-card__num">{String(i + 1).padStart(2, '0')}</div>
                <div className="ab-ov-obj-card__icon-wrap">
                  <Icon />
                </div>
                {i < t.items.length - 1 && <div className="ab-ov-obj-card__connector" />}
              </div>
              <div className="ab-ov-obj-card__body">
                <p
                  className="ab-ov-obj-card__text"
                  style={{ fontFamily }}
                >
                  {obj}
                </p>
              </div>
            </motion.li>
          )
        })}
      </motion.ol>
    </motion.section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   OverviewAwards — premium showcase cards with image fallback
───────────────────────────────────────────────────────────────────────────── */
function AwardCard({ award, lang }) {
  const [imgError, setImgError] = useState(false)
  const title = award.title[lang] ?? award.title.en
  const desc  = award.desc[lang]  ?? award.desc.en
  const fontFamily = lang === 'si'
    ? "'Noto Sans Sinhala', sans-serif"
    : lang === 'ta'
      ? "'Noto Sans Tamil', sans-serif"
      : 'inherit'

  return (
    <motion.article
      className="ab-award-card"
      variants={fadeUp}
      whileHover={{ y: -6, transition: { duration: 0.24, ease: [0.16, 1, 0.3, 1] } }}
      aria-labelledby={`award-title-${award.id}`}
    >
      <div className="ab-award-card__img-wrap" aria-label={title} role="img">
        <img
          key={award.img}
          src={award.img}
          alt={title}
          className="ab-award-card__img"
          onError={e => { e.currentTarget.style.display = 'none'; setImgError(true) }}
          onLoad={e => { e.currentTarget.style.display = 'block'; setImgError(false) }}
          loading="lazy"
          style={{ display: 'block' }}
        />
        {imgError && (
          <div className="ab-award-card__img-fallback" aria-hidden="true">
            <FiAward className="ab-award-card__img-fallback-icon" />
            <span className="ab-award-card__img-fallback-text">Award Image</span>
          </div>
        )}
        <div className="ab-award-card__year-badge" aria-label={`Year: ${award.year}`}>
          {award.year}
        </div>
      </div>

      <div className="ab-award-card__body">
        <div className="ab-award-card__badge-row" aria-hidden="true">
          <div className="ab-award-card__badge-icon">
            <FiAward />
          </div>
          <div className="ab-award-card__badge-line" />
        </div>
        <h3
          className="ab-award-card__title"
          id={`award-title-${award.id}`}
          style={{ fontFamily: lang !== 'en' ? fontFamily : undefined }}
        >
          {title}
        </h3>
        <p
          className="ab-award-card__desc"
          style={{ fontFamily }}
        >
          {desc}
        </p>
      </div>

      <div className="ab-award-card__glow" aria-hidden="true" />
    </motion.article>
  )
}

function OverviewAwards({ lang, data }) {
  const sectionLabel = data.sectionLabel[lang] ?? data.sectionLabel.en

  return (
    <motion.section
      className="ab-ov-awards"
      variants={fadeUp}
      aria-labelledby="ov-awards-heading"
    >
      <div className="ab-ov-section-header">
        <p className="ab-ov-section-label" id="ov-awards-heading" aria-label={sectionLabel}>
          {sectionLabel}
        </p>
      </div>

      <motion.div
        className="ab-ov-awards__grid"
        variants={stagger(0.09)}
        role="list"
        aria-label={sectionLabel}
      >
        {data.items.map((award) => (
          <div key={award.id} role="listitem">
            <AwardCard award={award} lang={lang} />
          </div>
        ))}
      </motion.div>
    </motion.section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   Overview multilingual content now comes from aboutOverviewApi.get() (see
   AboutOverviewDashboard below) — replaces the previously hardcoded
   overviewContent module constant.
───────────────────────────────────────────────────────────────────────────── */

/* ─────────────────────────────────────────────────────────────────────────────
   OverviewIntro — Image + text two-column introduction
───────────────────────────────────────────────────────────────────────────── */
function OverviewIntro({ t, lang, image, establishedBadge }) {
  const [imgError, setImgError] = useState(false)
  const fontFamily = lang === 'si'
    ? "'Noto Sans Sinhala', sans-serif"
    : lang === 'ta'
      ? "'Noto Sans Tamil', sans-serif"
      : 'inherit'
  const imgSrc = resolveUploadUrl(image)

  return (
    <motion.section
      className="ab-ov-intro"
      variants={fadeUp}
      aria-labelledby="ov-intro-heading"
    >
      {/* Section label */}
      <p className="ab-ov-section-label" aria-hidden="true">{t.introLabel}</p>

      {/* Image — full width above text */}
      <div className="ab-ov-intro__img-col">
        <div className="ab-ov-intro__img-frame" aria-label={t.imageAlt} role="img">
          <img
            src={imgSrc}
            alt={t.imageAlt}
            className="ab-ov-intro__img"
            onError={e => { e.currentTarget.style.display = 'none'; setImgError(true) }}
            onLoad={e => { e.currentTarget.style.display = 'block'; setImgError(false) }}
            loading="lazy"
            style={{ display: 'block' }}
          />
          {imgError && (
            <div className="ab-ov-intro__img-fallback" aria-hidden="true">
              <HiOutlineOfficeBuilding className="ab-ov-intro__img-fallback-icon" />
              <span className="ab-ov-intro__img-fallback-text">Southern Province<br />Planning Secretariat</span>
            </div>
          )}
          <div className="ab-ov-intro__img-badge" aria-hidden="true">
            <FiAward className="ab-ov-intro__img-badge-icon" />
            <span>{establishedBadge}</span>
          </div>
        </div>
      </div>

      {/* Text — full width below image */}
      <div className="ab-ov-intro__text-col">
        <h2
          className="ab-ov-intro__title"
          id="ov-intro-heading"
          style={{ fontFamily: lang !== 'en' ? fontFamily : undefined }}
        >
          {t.introTitle}
        </h2>
        <div className="ab-ov-intro__divider" aria-hidden="true" />
        <div className="ab-ov-intro__paras">
          {t.introParagraphs.map((para, i) => (
            <p
              key={i}
              className="ab-ov-intro__para"
              style={{ fontFamily }}
            >
              {para}
            </p>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   VisionMissionCards — Vision + Mission side by side cards
───────────────────────────────────────────────────────────────────────────── */
function VisionMissionCards({ t, lang }) {
  const fontFamily = lang === 'si'
    ? "'Noto Sans Sinhala', sans-serif"
    : lang === 'ta'
      ? "'Noto Sans Tamil', sans-serif"
      : 'inherit'

  return (
    <motion.div
      className="ab-vm-row"
      variants={stagger(0.1)}
      role="list"
      aria-label="Vision and Mission"
    >
      {/* Vision card */}
      <motion.article
        className="ab-vm-card ab-vm-card--vision"
        variants={fadeUp}
        role="listitem"
        aria-labelledby="vm-vision-title"
      >
        <div className="ab-vm-card__header">
          <div className="ab-vm-card__icon-wrap" aria-hidden="true">
            <FiTarget />
          </div>
          <div className="ab-vm-card__label-group">
            <span className="ab-vm-card__eyebrow" aria-hidden="true">
              {lang === 'si' ? 'දැක්ම' : lang === 'ta' ? 'பார்வை' : 'Vision'}
            </span>
            <h3
              id="vm-vision-title"
              className="ab-vm-card__title"
            >
              {t.visionLabel}
            </h3>
          </div>
        </div>
        <div className="ab-vm-card__sep" aria-hidden="true" />
        <p
          className="ab-vm-card__text"
          style={{ fontFamily }}
        >
          {t.visionText}
        </p>
        <div className="ab-vm-card__glow" aria-hidden="true" />
      </motion.article>

      {/* Mission card */}
      <motion.article
        className="ab-vm-card ab-vm-card--mission"
        variants={fadeUp}
        role="listitem"
        aria-labelledby="vm-mission-title"
      >
        <div className="ab-vm-card__header">
          <div className="ab-vm-card__icon-wrap" aria-hidden="true">
            <FiStar />
          </div>
          <div className="ab-vm-card__label-group">
            <span className="ab-vm-card__eyebrow" aria-hidden="true">
              {lang === 'si' ? 'මෙහෙවර' : lang === 'ta' ? 'நோக்கம்' : 'Mission'}
            </span>
            <h3
              id="vm-mission-title"
              className="ab-vm-card__title"
            >
              {t.missionLabel}
            </h3>
          </div>
        </div>
        <div className="ab-vm-card__sep" aria-hidden="true" />
        <p
          className="ab-vm-card__text"
          style={{ fontFamily }}
        >
          {t.missionText}
        </p>
        <div className="ab-vm-card__glow ab-vm-card__glow--mission" aria-hidden="true" />
      </motion.article>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   OrganizationStructurePage — /about/organization-structure
───────────────────────────────────────────────────────────────────────────── */
function OrganizationStructurePage({ topic }) {
  const lang = useLang()

  return (
    <AboutLayout heroTitle={topic.heroTitle} heroSub={topic.heroSub}>
      <motion.div
        className="ab-content"
        initial="hidden"
        animate="visible"
        variants={stagger(0.08)}
      >
        <OrganizationStructureChart lang={lang} />
      </motion.div>
    </AboutLayout>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   AboutOverviewDashboard — /about and /about/overview
   · No topic section
   · Key Officials panel: visible only on mobile + tablet (hidden on desktop)
───────────────────────────────────────────────────────────────────────────── */
function AboutOverviewDashboard() {
  const lang = useLang()
  const [data, setData] = useState(null)
  const { keyOfficials, deputyDirectors } = useContext(AboutStaffContext)

  useEffect(() => {
    let cancelled = false
    aboutOverviewApi.get()
      .then(({ data }) => { if (!cancelled) setData(data) })
      .catch((err) => console.error('AboutOverviewDashboard: failed to load overview', err))
    return () => { cancelled = true }
  }, [])

  if (!data) return null

  const t = data.intro[lang] ?? data.intro.en
  const establishedBadge = data.establishedBadge[lang] ?? data.establishedBadge.en

  return (
    <AboutLayout
      heroTitle="About the Secretariat"
      heroSub="Learn about the Southern Province Planning Secretariat — its structure, history, functions, and key officials."
    >
      <motion.div
        className="ab-ov-shell"
        initial="hidden"
        animate="visible"
        variants={stagger(0.09)}
      >
        {/* ── Introduction section ── */}
        <OverviewIntro t={t} lang={lang} image={data.image} establishedBadge={establishedBadge} />

        {/* ── Vision & Mission cards ── */}
        <VisionMissionCards t={t} lang={lang} />

        {/* ── Values ── */}
        <OverviewValues lang={lang} data={data.values} />

        {/* ── Awards ── */}
        <OverviewAwards lang={lang} data={data.awards} />

        {/* ── Objectives ── */}
        <OverviewObjectives lang={lang} data={data.objectives} />

        {/* ── Key Officials — mobile + tablet only (hidden on desktop) ── */}
        <motion.section
          className="ab-ov-officials"
          variants={stagger(0.08)}
          aria-labelledby="ov-officials-heading"
        >
          <motion.p
            id="ov-officials-heading"
            className="ab-ov-section-label"
            variants={fadeUp}
          >
            Key Officials
          </motion.p>

          {/* Senior officials row */}
          <motion.div className="ab-ov-officials__row" variants={stagger(0.07)}>
            {keyOfficials.map((official) => (
              <motion.div key={official.id} variants={fadeUp}>
                <Link
                  to={official.path}
                  className="ab-ov-official-card"
                  aria-label={`View profile: ${official.position}`}
                >
                  <div className="ab-ov-official-card__avatar" role="img" aria-label={`${official.name} avatar`}>
                    <FiUser aria-hidden="true" />
                  </div>
                  <div className="ab-ov-official-card__body">
                    <span className="ab-ov-official-card__pos">{official.position}</span>
                    <span className="ab-ov-official-card__name">{official.name}</span>
                  </div>
                  <FiChevronRight className="ab-ov-official-card__arrow" aria-hidden="true" />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Deputy Directors grid */}
          <motion.div className="ab-ov-dd-block" variants={fadeUp}>
            <p className="ab-ov-section-label ab-ov-section-label--sub">Planning Team — Deputy Directors</p>
            <div className="ab-ov-dd-grid" role="list" aria-label="Deputy Directors">
              {deputyDirectors.map((dd) => (
                <div key={dd.id} role="listitem">
                  <Link
                    to={dd.path}
                    className="ab-ov-dd-pill"
                    aria-label={dd.label}
                  >
                    <div className="ab-ov-dd-pill__avatar" aria-hidden="true">
                      <FiUser />
                    </div>
                    <div className="ab-ov-dd-pill__text">
                      <span className="ab-ov-dd-pill__num">{dd.label}</span>
                    </div>
                    <FiChevronRight className="ab-ov-dd-pill__arrow" aria-hidden="true" />
                  </Link>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Glass footer accent */}
          <motion.div className="ab-glass-accent" variants={fadeUp}>
            <div className="ab-glass-accent__icon" aria-hidden="true"><FiShield /></div>
            <div className="ab-glass-accent__content">
              <div className="ab-glass-accent__title">{t.officialGovt}</div>
              <div className="ab-glass-accent__sub">{t.officialGovtSub}</div>
            </div>
          </motion.div>
        </motion.section>

        {/* Glass footer accent — desktop (always visible) */}
        <motion.div className="ab-glass-accent ab-ov-glass-desktop" variants={fadeUp}>
          <div className="ab-glass-accent__icon" aria-hidden="true"><FiShield /></div>
          <div className="ab-glass-accent__content">
            <div className="ab-glass-accent__title">{t.officialGovt}</div>
            <div className="ab-glass-accent__sub">{t.officialGovtSub}</div>
          </div>
        </motion.div>
      </motion.div>
    </AboutLayout>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   About — Root component with all nested routes
───────────────────────────────────────────────────────────────────────────── */
// Wraps a sub-page element — shows ComingSoon if that specific sub-page is on hold
function SubHold({ holdKey, pageKey, children }) {
  const held = usePageHold(holdKey)
  if (held) return <ComingSoon pageKey={pageKey} />
  return children
}

export default function About() {
  const held = usePageHold('about')
  const [keyOfficials, setKeyOfficials]         = useState([])
  const [deputyDirectors, setDeputyDirectors]   = useState([])

  useEffect(() => {
    let cancelled = false
    staffApi.list()
      .then(({ data }) => {
        if (cancelled || !Array.isArray(data)) return
        const officials = data
          .filter((s) => s.tier === 'deputy-secretary' || s.tier === 'director')
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
          .map(staffToOfficial)
        const deputies = data
          .filter((s) => s.tier === 'deputy-director')
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0) || String(a.positionNumber).localeCompare(String(b.positionNumber)))
          .map(staffToDeputyDirector)
        setKeyOfficials(officials)
        setDeputyDirectors(deputies)
      })
      .catch((err) => console.error('About: failed to load staff', err))
    return () => { cancelled = true }
  }, [])

  if (held) return <ComingSoon pageKey="about" />

  const staffContextValue = { keyOfficials, deputyDirectors }

  return (
    <AboutStaffContext.Provider value={staffContextValue}>
      <SeoHead page="about" />
      <Routes>
      {/* Overview dashboard */}
      <Route index element={
        <SubHold holdKey="about__overview" pageKey="about">
          <AboutOverviewDashboard />
        </SubHold>
      } />
      <Route path="overview" element={
        <SubHold holdKey="about__overview" pageKey="about">
          <AboutOverviewDashboard />
        </SubHold>
      } />

      {/* Topic pages */}
      {ABOUT_TOPICS.map((topic) => {
        const topicEl =
          topic.id === 'functions-duties'      ? <FunctionsDutiesPage topic={topic} /> :
          topic.id === 'organization-structure' ? <OrganizationStructurePage topic={topic} /> :
          topic.id === 'history'                ? <AboutLayout heroTitle={topic.heroTitle} heroSub={topic.heroSub}><HistoryPage /></AboutLayout> :
                                                  <AboutContentPage topic={topic} />
        return (
          <Route key={topic.id} path={topic.id} element={
            <SubHold holdKey={`about__${topic.id}`} pageKey="about">
              {topicEl}
            </SubHold>
          } />
        )
      })}

      {/* Key Officials */}
      {keyOfficials.map((official) => (
        <Route key={official.id} path={official.id} element={
          <SubHold holdKey={`about__${official.id}`} pageKey="about">
            <OfficialProfilePage official={official} />
          </SubHold>
        } />
      ))}

      {/* Deputy Directors list */}
      <Route path="deputy-directors" element={
        <SubHold holdKey="about__deputy-directors" pageKey="about">
          <DeputyDirectorsListPage />
        </SubHold>
      } />

      {/* Deputy Director individual profiles — held by parent OR individual key */}
      <Route path="deputy-directors/:id" element={
        <SubHold holdKey="about__deputy-directors" pageKey="about">
          <DeputyDirectorProfilePageWrapper />
        </SubHold>
      } />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/about" replace />} />
    </Routes>
    </AboutStaffContext.Provider>
  )
}

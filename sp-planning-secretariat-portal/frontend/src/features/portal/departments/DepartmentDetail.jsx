import { useState, useEffect, useMemo } from 'react'
import { Link, useParams, Navigate, useNavigate } from 'react-router-dom'
import { usePageHold } from '@/shared/hooks/usePageHold'
import ComingSoon from '@/shared/components/ComingSoon'
import { motion } from 'framer-motion'
import {
  BookOpen, Settings, TrendingUp, Users, ChevronRight,
  FileText, UserCircle2,
  ClipboardList, Shield, Briefcase, Landmark,
  PieChart, CheckCircle, Globe, Building2
} from 'lucide-react'
import { departmentsApi, staffApi } from '@/features/cms/cmsContentApi'
import { resolveUploadUrl } from '@/shared/utils/resolveUploadUrl'
import './Departments.css'

/* Icon name (string, from CMS) → lucide-react component lookup — same
   seeded set as Departments.jsx (BookOpen / Settings / TrendingUp),
   Building2 as a sensible fallback for any future/unmapped icon name. */
const ICON_MAP = { BookOpen, Settings, TrendingUp, Users, ClipboardList }
const DEFAULT_ICON = Building2

/* ─── Constants ──────────────────────────────────────────────────── */

const MAROON = '#4A0918'
const GOLD   = '#C79A2B'
const CREAM  = '#FCFBFA'

const LANG_META = {
  en: { font: 'Inter, sans-serif',               headFont: "'Playfair Display', Georgia, serif", isNonLatin: false },
  si: { font: "'Noto Sans Sinhala', sans-serif", headFont: "'Noto Sans Sinhala', sans-serif",   isNonLatin: true  },
  ta: { font: "'Noto Sans Tamil', sans-serif",   headFont: "'Noto Sans Tamil', sans-serif",     isNonLatin: true  },
}

/* ─── UI Translations ────────────────────────────────────────────── */

const UI = {
  en: {
    backBtn:        'Back to Divisions',
    breadHome:      'Home',
    breadDepts:     'Divisions',
    overview:       'Division Overview',
    functions:      'Key Functions',
    responsibilities: 'Responsibilities',
    downloads:      'Downloads & Resources',
    headCard:       'Head of Division',
    viewProfile:    'View Profile',
    contactDept:    'Contact Division',
    staffLabel:     'Staff Members',
    locationLabel:  'Location',
    staffPlaceholder: '—',
    locationValue:  'Southern Province Planning Secretariat - Galle',
    services:       'Division Services',
    noHead:         'Head of Division information is being updated.',
  },
  si: {
    backBtn:        'අංශ වෙත ආපසු',
    breadHome:      'මුල් පිටුව',
    breadDepts:     'අංශ',
    overview:       'අංශ දළ විශ්ලේෂණය',
    functions:      'ප්‍රධාන කාර්යයන්',
    responsibilities: 'වගකීම්',
    downloads:      'බාගැනීම් හා සම්පත්',
    headCard:       'අංශ ප්‍රධානී',
    viewProfile:    'පැතිකඩ බලන්න',
    contactDept:    'අංශය අමතන්න',
    staffLabel:     'කාර්ය මණ්ඩලය',
    locationLabel:  'ස්ථානය',
    staffPlaceholder: '—',
    locationValue:  'ලේකම් ගොඩනැගිල්ල, ගාල්ල',
    services:       'අංශ සේවාවන්',
    noHead:         'අංශ ප්‍රධානීගේ තොරතුරු යාවත්කාලීන කෙරෙමින් පවතී.',
  },
  ta: {
    backBtn:        'துறைகளுக்கு திரும்பு',
    breadHome:      'முகப்பு',
    breadDepts:     'துறைகள்',
    overview:       'துறை கண்ணோட்டம்',
    functions:      'முக்கிய செயல்பாடுகள்',
    responsibilities: 'பொறுப்புகள்',
    downloads:      'பதிவிறக்கங்கள் & வளங்கள்',
    headCard:       'துறை தலைவர்',
    viewProfile:    'சுயவிவரம் காண்க',
    contactDept:    'துறையை தொடர்பு கொள்',
    staffLabel:     'ஊழியர்கள்',
    locationLabel:  'இடம்',
    staffPlaceholder: '—',
    locationValue:  'செயலக கட்டிடம், காலி',
    services:       'துறை சேவைகள்',
    noHead:         'துறை தலைவர் தகவல்கள் புதுப்பிக்கப்படுகின்றன.',
  },
}

/* ─── Department Content Data ─────────────────────────────────────
   Fetched from departmentsApi.list() (matched by :slug === key) and
   staffApi.list() (tier === 'department-head' && departmentId === dept.id)
   for the head-of-division card — see DepartmentDetail() below. Replaces the
   old hardcoded DEPT_DATA map (backend/src/db/seedData.js -> departmentsSeed
   + staffSeed). ─────────────────────────────────────────────────────── */

/* ─── Quick-nav links ────────────────────────────────────────────── */

const QUICK_LINKS = [
  { key: 'accounts',       path: '/departments/accounts',         labelKey: 'navAccounts',  icon: BookOpen      },
  { key: 'administration', path: '/departments/administration',    labelKey: 'navAdmin',     icon: Settings      },
  { key: 'development',    path: '/departments/development',       labelKey: 'navDev',       icon: TrendingUp    },
  { key: 'head-admin',     path: '/departments/head-administration',labelKey: 'navHeadAdmin',icon: Users         },
  { key: 'head-accounts',  path: '/departments/head-accounts',     labelKey: 'navHeadAcc',  icon: ClipboardList },
]

const NAV_T = {
  en: { navAccounts: 'Accounts', navAdmin: 'Administration', navDev: 'Development', navHeadAdmin: 'Head of Administration', navHeadAcc: 'Head of Accounts', quickNav: 'Quick Navigation' },
  si: { navAccounts: 'ගිණුම්',   navAdmin: 'පරිපාලන',       navDev: 'සංවර්ධන',     navHeadAdmin: 'පරිපාලන ප්‍රධානී',      navHeadAcc: 'ගිණුම් ප්‍රධානී',  quickNav: 'ශීඝ්‍ර සංචලනය' },
  ta: { navAccounts: 'கணக்குகள்',navAdmin: 'நிர்வாகம்',    navDev: 'வளர்ச்சி',    navHeadAdmin: 'நிர்வாக தலைவர்',         navHeadAcc: 'கணக்கு தலைவர்', quickNav: 'விரைவு வழிசெலுத்தல்' },
}

/* ─── Animation variants ─────────────────────────────────────────── */

const fadeUpV  = (delay = 0) => ({ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] } } })
const staggerV = { hidden: {}, visible: { transition: { staggerChildren: 0.10 } } }
const itemV    = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } } }
const slideRV  = { hidden: { opacity: 0, x: 36 }, visible: { opacity: 1, x: 0, transition: { duration: 0.70, ease: [0.16, 1, 0.3, 1] } } }

/* ─── Honeycomb ─────────────────────────────────────────────────── */

function HoneycombBg() {
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
      cells.push(<polygon key={`${row}-${col}`} points={pts} stroke={GOLD} strokeWidth="1" fill="none" />)
    }
  const W = 20 * hx + r + 4, H = 9 * vy + r * 2 + 4
  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" fill="none">
      {cells}
    </svg>
  )
}

/* ─── Sub-components ────────────────────────────────────────────── */

function DetailHero({ dept, lang, meta }) {
  return (
    <section className="dep-hero" aria-labelledby="dep-detail-title">
      <div className="dep-hero__bg"         aria-hidden="true" />
      <div className="dep-hero__noise"       aria-hidden="true" />
      <div className="dep-hero__grid-lines"  aria-hidden="true" />
      <div className="dep-hero__glow dep-hero__glow--gold"   aria-hidden="true" />
      <div className="dep-hero__glow dep-hero__glow--maroon" aria-hidden="true" />
      <div className="dep-hero__glow dep-hero__glow--right"  aria-hidden="true" />
      <div className="dep-hero__watermark" aria-hidden="true">{dept.key.toUpperCase().slice(0,4)}</div>
      <div className="dep-hero__hc" aria-hidden="true"><HoneycombBg /></div>
      {[...Array(6)].map((_, i) => (
        <div key={i} className={`dep-hero__dot dep-hero__dot--${i + 1}`} aria-hidden="true" />
      ))}

      <div className="dep-hero__inner">
        <motion.div className="dep-hero__left" initial="hidden" animate="visible" variants={staggerV}>
          <motion.div className="dep-hero__badge" variants={itemV}>
            <span className="dep-hero__badge-dot" aria-hidden="true" />
            <span style={{
              fontFamily:    meta.isNonLatin ? meta.font : "'Cinzel', serif",
              letterSpacing: meta.isNonLatin ? 0 : '0.13em',
              textTransform: meta.isNonLatin ? 'none' : 'uppercase',
            }}>
              {dept.badge[lang]}
            </span>
          </motion.div>

          <motion.h1
            id="dep-detail-title"
            className="dep-hero__title"
            style={{ fontFamily: meta.headFont, lineHeight: meta.isNonLatin ? 1.35 : 1.06 }}
            variants={itemV}
          >
            {dept.title[lang]}
          </motion.h1>

          <motion.div
            className="dep-hero__rule"
            variants={{ hidden: { scaleX: 0, opacity: 0 }, visible: { scaleX: 1, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}
            aria-hidden="true"
          />

          <motion.p className="dep-hero__sub" style={{ fontFamily: meta.font }} variants={itemV}>
            {dept.subtitle[lang]}
          </motion.p>
        </motion.div>

        <motion.div className="dep-hero__right" initial="hidden" animate="visible" variants={slideRV} aria-hidden="true">
          <img
            src="/branding/f-logo.svg"
            alt=""
            className="dep-hero__logo"
            onError={e => { e.currentTarget.style.display = 'none' }}
          />
        </motion.div>
      </div>

      <svg className="dep-hero__wave" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,80 C240,20 480,60 720,40 C960,20 1200,60 1440,30 L1440,80 Z" fill={CREAM} />
      </svg>
    </section>
  )
}

function QuickNav({ lang, meta, activePath }) {
  const nav  = useNavigate()
  const navT = NAV_T[lang] || NAV_T.en
  return (
    <nav className="dep-ql" aria-label={navT.quickNav}>
      <div className="dep-ql__inner">
        {QUICK_LINKS.map(({ key, path, labelKey, icon: Icon }) => (
          <button
            key={key}
            className={`dep-ql__pill${activePath === path ? ' active' : ''}`}
            onClick={() => nav(path)}
            style={{ fontFamily: meta.font }}
            aria-current={activePath === path ? 'page' : undefined}
          >
            <Icon size={14} aria-hidden="true" />
            {navT[labelKey]}
          </button>
        ))}
      </div>
    </nav>
  )
}

function OverviewSection({ dept, lang, meta, ui }) {
  const serviceIcons = [Shield, Briefcase, Landmark, PieChart, Globe, CheckCircle]
  return (
    <section className="dep-section" aria-labelledby="dep-overview-heading">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={fadeUpV(0)}
      >
        <div className="dep-section__eyebrow" style={{ fontFamily: "'Cinzel', serif" }} aria-hidden="true">
          {ui.overview}
        </div>

        <div className="dep-overview">
          <div className="dep-overview__grid">
            <div>
              <h2
                id="dep-overview-heading"
                className="dep-overview__heading"
                style={{ fontFamily: meta.headFont, lineHeight: meta.isNonLatin ? 1.45 : 1.2 }}
              >
                {dept.title[lang]}
              </h2>
              <p className="dep-overview__body" style={{ fontFamily: meta.font }}>
                {dept.overview[lang]}
              </p>
            </div>
            <div className="dep-overview__stats">
              <div className="dep-stat">
                <div className="dep-stat__icon"><Users size={18} color={GOLD} aria-hidden="true" /></div>
                <div>
                  <div className="dep-stat__label" style={{ fontFamily: meta.font }}>{ui.staffLabel}</div>
                  <div className="dep-stat__value" style={{ fontFamily: "'Cinzel', serif" }}>{dept.staff}</div>
                </div>
              </div>

              <div className="dep-stat">
                <div className="dep-stat__icon"><Globe size={18} color={GOLD} aria-hidden="true" /></div>
                <div>
                  <div className="dep-stat__label" style={{ fontFamily: meta.font }}>{ui.locationLabel}</div>
                  <div className="dep-stat__value" style={{ fontFamily: meta.font, fontSize: '0.88rem' }}>{ui.locationValue}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Services tags */}
          <div style={{ marginTop: '1.75rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(199,154,43,0.10)' }}>
            <div className="dep-section__eyebrow" style={{ fontFamily: "'Cinzel', serif", marginBottom: '0.75rem' }} aria-hidden="true">
              {ui.services}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {(dept.services?.[lang] ?? []).map((s, i) => {
                const SIcon = serviceIcons[i % serviceIcons.length]
                return (
                  <span key={i} style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    padding: '6px 14px',
                    background: 'rgba(199,154,43,0.07)',
                    border: '1px solid rgba(199,154,43,0.18)',
                    borderRadius: '50px',
                    fontSize: 'clamp(0.70rem,0.88vw,0.78rem)',
                    fontWeight: 600,
                    color: MAROON,
                    fontFamily: meta.font,
                  }}>
                    <SIcon size={12} color={GOLD} aria-hidden="true" />
                    {s}
                  </span>
                )
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

function FunctionsSection({ dept, lang, meta, ui }) {
  return (
    <section className="dep-section" style={{ paddingTop: 0 }} aria-labelledby="dep-functions-heading">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={staggerV}
      >
        <motion.div variants={itemV} style={{ marginBottom: '1.5rem' }}>
          <div className="dep-section__eyebrow" style={{ fontFamily: "'Cinzel', serif" }} aria-hidden="true">
            {ui.functions}
          </div>
          <h2
            id="dep-functions-heading"
            className="dep-section__heading"
            style={{ fontFamily: meta.headFont, lineHeight: meta.isNonLatin ? 1.45 : 1.15 }}
          >
            {ui.functions}
          </h2>
        </motion.div>

        <motion.div className="dep-func-grid" variants={staggerV}>
          {(dept.functions[lang]?.length ? dept.functions[lang] : dept.functions.en).map((fn, i) => (
            <motion.div key={i} className="dep-func-card" variants={itemV}>
              <div className="dep-func-card__num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </div>
              <p className="dep-func-card__text" style={{ fontFamily: meta.font }}>
                {fn}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

function ResponsibilitiesSection({ dept, lang, meta, ui }) {
  return (
    <section className="dep-section" style={{ paddingTop: 0 }} aria-labelledby="dep-resp-heading">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={staggerV}
      >
        <motion.div variants={itemV} style={{ marginBottom: '1.5rem' }}>
          <div className="dep-section__eyebrow" style={{ fontFamily: "'Cinzel', serif" }} aria-hidden="true">
            {ui.responsibilities}
          </div>
          <h2
            id="dep-resp-heading"
            className="dep-section__heading"
            style={{ fontFamily: meta.headFont, lineHeight: meta.isNonLatin ? 1.45 : 1.15 }}
          >
            {ui.responsibilities}
          </h2>
        </motion.div>

        <motion.ul className="dep-resp-list" variants={staggerV} role="list">
          {(dept.responsibilities[lang]?.length ? dept.responsibilities[lang] : dept.responsibilities.en).map((r, i) => (
            <motion.li key={i} className="dep-resp-item" variants={itemV}>
              <span className="dep-resp-item__dot" aria-hidden="true" />
              <span style={{ fontFamily: meta.font }}>{r}</span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  )
}

function HeadCard({ dept, lang, meta, ui }) {
  if (!dept.profilePath) return null
  return (
    <section className="dep-section" style={{ paddingTop: 0 }} aria-labelledby="dep-head-heading">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        variants={fadeUpV(0)}
      >
        <div className="dep-section__eyebrow" style={{ fontFamily: "'Cinzel', serif", marginBottom: '1rem' }} aria-hidden="true">
          {ui.headCard}
        </div>
        <div className="dep-head-card" role="region" aria-labelledby="dep-head-heading">
          <img
            src={dept.headPhoto}
            alt={dept.headName[lang]}
            className="dep-head-card__avatar"
            onError={e => {
              e.currentTarget.style.display = 'none'
              e.currentTarget.nextElementSibling.style.display = 'flex'
            }}
          />
          <div className="dep-head-card__avatar-placeholder" style={{ display: 'none' }} aria-hidden="true">
            <UserCircle2 size={36} color="rgba(199,154,43,0.7)" />
          </div>
          <div className="dep-head-card__info">
            <div className="dep-head-card__role" aria-hidden="true">{ui.headCard}</div>
            <h3 id="dep-head-heading" className="dep-head-card__name" style={{ fontFamily: meta.headFont }}>
              {dept.headName[lang]}
            </h3>
            <p className="dep-head-card__position" style={{ fontFamily: meta.font }}>
              {dept.headPosition[lang]}
            </p>
          </div>
          <Link to={dept.profilePath} className="dep-head-card__btn" style={{ fontFamily: meta.font }}>
            <UserCircle2 size={15} aria-hidden="true" />
            {ui.viewProfile}
          </Link>
        </div>
      </motion.div>
    </section>
  )
}

function DownloadsSection({ dept, lang, meta, ui }) {
  const typeColors = { PDF: '#C73A3A', DOCX: '#1A73E8', XLSX: '#1E7C3E' }
  return (
    <section className="dep-section" style={{ paddingTop: 0 }} aria-labelledby="dep-dl-heading">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        variants={fadeUpV(0)}
      >
        <div className="dep-section__eyebrow" style={{ fontFamily: "'Cinzel', serif", marginBottom: '1rem' }} aria-hidden="true">
          {ui.downloads}
        </div>
        <h2
          id="dep-dl-heading"
          className="dep-section__heading"
          style={{ fontFamily: meta.headFont, marginBottom: '1.25rem', lineHeight: meta.isNonLatin ? 1.45 : 1.15 }}
        >
          {ui.downloads}
        </h2>
        <div className="dep-downloads-grid">
          {dept.downloads[lang].map((dl, i) => (
            <a
              key={i}
              href="#"
              className="dep-dl-item"
              aria-label={`${dl.name} (${dl.type}, ${dl.size})`}
              onClick={e => e.preventDefault()}
            >
              <div className="dep-dl-icon">
                <FileText size={18} color={typeColors[dl.type] || GOLD} aria-hidden="true" />
              </div>
              <div>
                <div className="dep-dl-name" style={{ fontFamily: meta.font }}>{dl.name}</div>
                <div className="dep-dl-meta" style={{ fontFamily: "'Cinzel', serif" }}>
                  <span style={{ color: typeColors[dl.type] || GOLD }}>{dl.type}</span>
                  <span style={{ margin: '0 6px', color: '#BBA090' }}>·</span>
                  <span>{dl.size}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

/* ─── Main export ────────────────────────────────────────────────── */

export default function DepartmentDetail() {
  const heldParent = usePageHold('departments')
  const { slug: deptKey } = useParams()
  const heldSub = usePageHold(`departments__${deptKey}`)
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en')
  const [dept, setDept] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const h = (e) => setLang(e.detail || 'en')
    window.addEventListener('langChange', h)
    return () => window.removeEventListener('langChange', h)
  }, [])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setDept(null)

    Promise.all([departmentsApi.list(), staffApi.list()])
      .then(([deptRes, staffRes]) => {
        if (cancelled) return
        const found = (deptRes.data || []).find((d) => d.key === deptKey)
        if (!found) return
        const head = (staffRes.data || []).find(
          (s) => s.tier === 'department-head' && s.departmentId === found.id
        )
        setDept({
          key:         found.key,
          icon:        ICON_MAP[found.icon] || DEFAULT_ICON,
          accentColor: found.accentColor,
          staff:       found.staffCount,
          profilePath: head?.slug ? `/${head.slug}` : null,
          headName:    head?.name,
          headPosition: head?.position,
          headPhoto:   resolveUploadUrl(head?.photo || '/branding/ao.webp'),
          title:       found.label,
          badge:       found.badge,
          subtitle:    found.subtitle,
          overview:    found.overview,
          functions:   found.functions,
          responsibilities: found.responsibilities,
          services:    found.services,
        })
      })
      .catch((err) => console.error('DepartmentDetail: failed to load department', err))
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }
  }, [deptKey])

  const meta = useMemo(() => LANG_META[lang] || LANG_META.en, [lang])
  const ui   = useMemo(() => UI[lang]        || UI.en,        [lang])

  if (heldParent || heldSub) return <ComingSoon pageKey="departments" />
  if (!loading && !dept) return <Navigate to="/departments" replace />
  if (!dept) return null

  const activePath = `/departments/${deptKey}`

  return (
    <div className="dep-wrap">
      <DetailHero dept={{ ...dept, key: deptKey }} lang={lang} meta={meta} />
      <QuickNav lang={lang} meta={meta} activePath={activePath} />

      {/* Breadcrumb */}
      <nav className="dep-breadcrumb" aria-label="Breadcrumb">
        <div className="dep-breadcrumb__inner">
          <Link to="/home"        style={{ fontFamily: meta.font }}>{ui.breadHome}</Link>
          <span className="dep-breadcrumb__sep" aria-hidden="true"><ChevronRight size={12} /></span>
          <Link to="/departments" style={{ fontFamily: meta.font }}>{ui.breadDepts}</Link>
          <span className="dep-breadcrumb__sep" aria-hidden="true"><ChevronRight size={12} /></span>
          <span className="dep-breadcrumb__cur" style={{ fontFamily: meta.font }}>{dept.title[lang]}</span>
        </div>
      </nav>

      <div className="dep-divider" />

      <OverviewSection         dept={{ ...dept, key: deptKey }} lang={lang} meta={meta} ui={ui} />
      <div className="dep-divider" />
      <FunctionsSection        dept={{ ...dept, key: deptKey }} lang={lang} meta={meta} ui={ui} />
      <div className="dep-divider" />
      <ResponsibilitiesSection dept={{ ...dept, key: deptKey }} lang={lang} meta={meta} ui={ui} />
      {dept.profilePath && <div className="dep-divider" />}
      <HeadCard                dept={{ ...dept, key: deptKey }} lang={lang} meta={meta} ui={ui} />
    </div>
  )
}

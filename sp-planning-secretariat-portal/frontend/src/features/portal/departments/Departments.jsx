import { useState, useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { usePageHold } from '@/shared/hooks/usePageHold'
import ComingSoon from '@/shared/components/ComingSoon'
import { SeoHead } from '@/shared/seo'
import { motion } from 'framer-motion'
import {
  BookOpen, Settings, TrendingUp, Users,
  ClipboardList, ArrowRight, Building2
} from 'lucide-react'
import { departmentsApi } from '@/features/cms/cmsContentApi'
import './Departments.css'

/* Icon name (string, from CMS) → lucide-react component lookup.
   Seeded icon names are BookOpen / Settings / TrendingUp (see
   backend/src/db/seedData.js -> departmentsSeed); Building2 is the fallback
   for any future department whose icon name isn't in this map. */
const ICON_MAP = { BookOpen, Settings, TrendingUp, Users, ClipboardList }
const DEFAULT_ICON = Building2

/* ─── Constants ─────────────────────────────────────────────────────── */

const GOLD   = '#C79A2B'
const CREAM  = '#FCFBFA'

const LANG_META = {
  en: { font: 'Inter, sans-serif',               headFont: "'Playfair Display', Georgia, serif", isNonLatin: false },
  si: { font: "'Noto Sans Sinhala', sans-serif", headFont: "'Noto Sans Sinhala', sans-serif",   isNonLatin: true  },
  ta: { font: "'Noto Sans Tamil', sans-serif",   headFont: "'Noto Sans Tamil', sans-serif",     isNonLatin: true  },
}

/* ─── Translation data ───────────────────────────────────────────────── */

const T = {
  en: {
    badgeLabel:   'Divisions',
    pageTitle:    'Divisions',
    pageSub:      'Explore the key divisions of the Planning Secretariat and their responsibilities.',
    pageSub2:     'සැලසුම් ලේකම් කාර්යාලයේ ප්‍රධාන අංශ සහ ඒවායේ වගකීම්',
    pageSub3:     'திட்டமிடல் செயலகத்தின் முக்கிய துறைகள் மற்றும் அவற்றின் பொறுப்புகள்',
    allDepts:     'All Divisions',
    staffLabel:   'Staff Members',
    readMore:     'Read More',
    quickNav:     'Quick Navigation',
    navAccounts:  'Accounts',
    navAdmin:     'Administration',
    navDev:       'Development',
    navHeadAdmin: 'Head of Administration',
    navHeadAcc:   'Head of Accounts',
    deptEyebrow:  'Our Divisions',
    deptHeading:  'Organisational Units',
    deptSub:      'Each division plays a vital role in fulfilling the mandate of the Planning Secretariat across the Southern Province.',
  },
  si: {
    badgeLabel:   'අංශ',
    pageTitle:    'අංශ',
    pageSub:      'සැලසුම් ලේකම් කාර්යාලයේ ප්‍රධාන අංශ සහ ඒවායේ වගකීම් පිළිබඳව දැනගන්න.',
    pageSub2:     'Explore the key departments of the Planning Secretariat.',
    pageSub3:     'திட்டமிடல் செயலகத்தின் முக்கிய துறைகள்',
    allDepts:     'සියලු අංශ',
    staffLabel:   'කාර්ය මණ්ඩලය',
    readMore:     'තව කියවන්න',
    quickNav:     'ශීඝ්‍ර සංචලනය',
    navAccounts:  'ගිණුම්',
    navAdmin:     'පරිපාලන',
    navDev:       'සංවර්ධන',
    navHeadAdmin: 'පරිපාලන ප්‍රධානී',
    navHeadAcc:   'ගිණුම් ප්‍රධානී',
    deptEyebrow:  'අපේ අංශ',
    deptHeading:  'සංවිධාන ඒකක',
    deptSub:      'සෑම අංශයක්ම දකුණු පළාතේ සැලසුම් ලේකම් කාර්යාලයේ කාර්යභාරය ඉටු කිරීමේදී ඉතා වැදගත් කාර්යභාරයක් ඉටු කරයි.',
  },
  ta: {
    badgeLabel:   'துறைகள்',
    pageTitle:    'துறைகள்',
    pageSub:      'திட்டமிடல் செயலகத்தின் முக்கிய துறைகள் மற்றும் அவற்றின் பொறுப்புகளை அறிந்துகொள்ளுங்கள்.',
    pageSub2:     'சைலசும் லேகம் காரியாலயத்தின் முக்கிய துறைகள்',
    pageSub3:     'Explore the key departments of the Planning Secretariat.',
    allDepts:     'அனைத்து துறைகள்',
    staffLabel:   'ஊழியர்கள்',
    readMore:     'மேலும் படிக்க',
    quickNav:     'விரைவு வழிசெலுத்தல்',
    navAccounts:  'கணக்குகள்',
    navAdmin:     'நிர்வாகம்',
    navDev:       'வளர்ச்சி',
    navHeadAdmin: 'நிர்வாக தலைவர்',
    navHeadAcc:   'கணக்கு தலைவர்',
    deptEyebrow:  'எங்கள் துறைகள்',
    deptHeading:  'நிறுவன பிரிவுகள்',
    deptSub:      'ஒவ்வொரு துறையும் தென் மாகாண திட்டமிடல் செயலகத்தின் ஆணையை நிறைவேற்றுவதில் முக்கிய பங்கு வகிக்கிறது.',
  },
}

/* ─── Department data ────────────────────────────────────────────────── */
/* Fetched from departmentsApi.list() — see Departments() below. Each record's
   `icon` is a string name (e.g. "BookOpen") resolved via ICON_MAP above. */

const QUICK_LINKS = [
  { key: 'accounts',       pathKey: '/departments/accounts',        icon: BookOpen,      labelKey: 'navAccounts'  },
  { key: 'administration', pathKey: '/departments/administration',   icon: Settings,      labelKey: 'navAdmin'     },
  { key: 'development',    pathKey: '/departments/development',      icon: TrendingUp,    labelKey: 'navDev'       },
  { key: 'head-admin',     pathKey: '/departments/head-administration', icon: Users,      labelKey: 'navHeadAdmin' },
  { key: 'head-accounts',  pathKey: '/departments/head-accounts',    icon: ClipboardList, labelKey: 'navHeadAcc'   },
]

/* ─── Animation variants ────────────────────────────────────────────── */

const staggerV  = { hidden: {}, visible: { transition: { staggerChildren: 0.10 } } }
const itemV     = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 0.60, ease: [0.16, 1, 0.3, 1] } } }
const slideRV   = { hidden: { opacity: 0, x: 36 }, visible: { opacity: 1, x: 0, transition: { duration: 0.70, ease: [0.16, 1, 0.3, 1] } } }
const cardV     = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } }
const cardContV = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }

/* ─── Honeycomb SVG ─────────────────────────────────────────────────── */

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

/* ─── Hero ──────────────────────────────────────────────────────────── */

function PageHero({ t, meta }) {
  return (
    <section className="dep-hero" aria-labelledby="dep-hero-title">
      <div className="dep-hero__bg"         aria-hidden="true" />
      <div className="dep-hero__noise"       aria-hidden="true" />
      <div className="dep-hero__grid-lines"  aria-hidden="true" />
      <div className="dep-hero__glow dep-hero__glow--gold"   aria-hidden="true" />
      <div className="dep-hero__glow dep-hero__glow--maroon" aria-hidden="true" />
      <div className="dep-hero__glow dep-hero__glow--right"  aria-hidden="true" />
      <div className="dep-hero__watermark" aria-hidden="true">DEPT</div>
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
              {t.badgeLabel}
            </span>
          </motion.div>

          <motion.h1
            id="dep-hero-title"
            className="dep-hero__title"
            style={{ fontFamily: meta.headFont, lineHeight: meta.isNonLatin ? 1.35 : 1.06 }}
            variants={itemV}
          >
            {t.pageTitle}
          </motion.h1>

          <motion.div
            className="dep-hero__rule"
            variants={{ hidden: { scaleX: 0, opacity: 0 }, visible: { scaleX: 1, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}
            aria-hidden="true"
          />

          <motion.div className="dep-hero__langs" variants={itemV}>
            <p className="dep-hero__sub" style={{ fontFamily: meta.font }}>
              {t.pageSub}
            </p>
            {!meta.isNonLatin && (
              <>
                <p className="dep-hero__lang-sub" style={{ fontFamily: "'Noto Sans Sinhala', sans-serif" }}>
                  {t.pageSub2}
                </p>
                <p className="dep-hero__lang-sub" style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}>
                  {t.pageSub3}
                </p>
              </>
            )}
          </motion.div>

        </motion.div>

        <motion.div className="dep-hero__right" initial="hidden" animate="visible" variants={slideRV}>
          <img
            src="/branding/f-logo.svg"
            alt="Southern Province Planning Secretariat"
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

/* ─── Quick Navigation ──────────────────────────────────────────────── */

function QuickNav({ t, meta, activePath }) {
  const navigate = useNavigate()
  return (
    <nav className="dep-ql" aria-label={t.quickNav}>
      <div className="dep-ql__inner">
        {QUICK_LINKS.map(({ key, pathKey, icon: Icon, labelKey }) => (
          <button
            key={key}
            className={`dep-ql__pill${activePath === pathKey ? ' active' : ''}`}
            onClick={() => navigate(pathKey)}
            style={{ fontFamily: meta.font }}
            aria-current={activePath === pathKey ? 'page' : undefined}
          >
            <Icon size={14} aria-hidden="true" />
            {t[labelKey]}
          </button>
        ))}
      </div>
    </nav>
  )
}

/* ─── Department Card ───────────────────────────────────────────────── */

function DepartmentCard({ dept, lang, meta, t, index }) {
  const Icon = dept.icon

  return (
    <motion.div variants={cardV}>
      <Link
        to={dept.path}
        className="dep-card"
        aria-label={`${dept.label[lang]} — ${t.readMore}`}
      >
        <div className="dep-card__header">
          <div className="dep-card__icon-wrap" style={{ color: dept.color }} aria-hidden="true">
            <Icon size={clamp(22, 26, 30)} style={{ color: dept.color }} />
          </div>
          <div className="dep-card__title-wrap">
            <div className="dep-card__label" aria-hidden="true">
              {meta.isNonLatin ? '' : `Div. ${String(index + 1).padStart(2, '0')}`}
            </div>
            <h2
              className="dep-card__title"
              style={{ fontFamily: meta.headFont, lineHeight: meta.isNonLatin ? 1.45 : 1.25 }}
            >
              {dept.label[lang]}
            </h2>
          </div>
        </div>

        <p className="dep-card__desc" style={{ fontFamily: meta.font }}>
          {dept.desc[lang]}
        </p>

        <div className="dep-card__meta" style={{ fontFamily: meta.font }}>
          <Users size={13} aria-hidden="true" />
          <span>{t.staffLabel}: {dept.staff}</span>
        </div>

        <div className="dep-card__footer">
          <span className="dep-card__btn" style={{ fontFamily: meta.font }} aria-hidden="true">
            {t.readMore}
            <ArrowRight size={14} className="dep-card__btn-arrow" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

function clamp(min, val, max) { return Math.min(max, Math.max(min, val)) }

/* ─── Cards Section ─────────────────────────────────────────────────── */

function DepartmentsSection({ lang, meta, t, departments, loading }) {
  return (
    <section className="dep-cards-section" aria-labelledby="dep-cards-heading">
      <div className="dep-cards-section__inner">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 'clamp(1.5rem,3vw,2.5rem)' }}
        >
          <div className="dep-section__eyebrow" style={{ fontFamily: "'Cinzel', serif" }} aria-hidden="true">
            {t.deptEyebrow}
          </div>
          <h2
            id="dep-cards-heading"
            className="dep-section__heading"
            style={{ fontFamily: meta.headFont, lineHeight: meta.isNonLatin ? 1.45 : 1.15 }}
          >
            {t.deptHeading}
          </h2>
          <p className="dep-section__sub" style={{ fontFamily: meta.font }}>
            {t.deptSub}
          </p>
        </motion.div>

        <motion.div
          className="dep-cards-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={cardContV}
        >
          {loading ? null : departments.map((dept, i) => (
            <DepartmentCard
              key={dept.key}
              dept={dept}
              lang={lang}
              meta={meta}
              t={t}
              index={i}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Main export ───────────────────────────────────────────────────── */

export default function Departments() {
  const held = usePageHold('departments')
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en')
  const [departments, setDepartments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const h = (e) => setLang(e.detail || 'en')
    window.addEventListener('langChange', h)
    return () => window.removeEventListener('langChange', h)
  }, [])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    departmentsApi.list()
      .then(({ data }) => {
        if (cancelled || !Array.isArray(data)) return
        const normalized = [...data]
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
          .map((d) => ({
            key:        d.key,
            path:       `/departments/${d.key}`,
            icon:       ICON_MAP[d.icon] || DEFAULT_ICON,
            color:      d.accentColor,
            staff:      d.staffCount,
            label:      d.label,
            desc:       d.desc,
            shortLabel: d.shortLabel,
          }))
        setDepartments(normalized)
      })
      .catch((err) => console.error('Departments: failed to load departments', err))
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  const meta = useMemo(() => LANG_META[lang] || LANG_META.en, [lang])
  const t    = useMemo(() => T[lang]         || T.en,         [lang])

  if (held) return <ComingSoon pageKey="departments" />

  return (
    <>
      <SeoHead page="departments" />
      <div style={{ background: CREAM, minHeight: '100vh' }}>
        <PageHero t={t} meta={meta} />
        <QuickNav t={t} meta={meta} activePath="/departments" />
        <DepartmentsSection lang={lang} meta={meta} t={t} departments={departments} loading={loading} />
      </div>
    </>
  )
}

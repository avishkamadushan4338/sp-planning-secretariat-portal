/* ─────────────────────────────────────────────────────────────────────────────
   History.jsx — Southern Province Planning Secretariat
   Premium 2050-level institutional history page
   Multilingual (EN / SI / TA) · Fully responsive 320px → 4K
───────────────────────────────────────────────────────────────────────────── */
import { useState, useEffect, useMemo, memo } from 'react'
import { motion } from 'framer-motion'
import {
  FiShield, FiUsers, FiAward,
  FiExternalLink, FiCalendar,
} from 'react-icons/fi'
import { HiOutlineOfficeBuilding } from 'react-icons/hi'
import { aboutHistoryApi } from '@/features/cms/cmsContentApi'
import './History.css'

/* ─────────────────────────────────────────────────────────────────────────────
   Motion variants
───────────────────────────────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.44, ease: [0.16, 1, 0.3, 1] } },
}
const stagger = (d = 0.07) => ({
  hidden: {},
  visible: { transition: { staggerChildren: d } },
})
const slideLeft = {
  hidden: { opacity: 0, x: -14 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] } },
}

/* ─────────────────────────────────────────────────────────────────────────────
   useLang hook — reads localStorage 'lang' (same system as About.jsx)
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
   History content now comes from aboutHistoryApi.get() (see HistoryPage
   below) — replaces the previously hardcoded historyData module constant.
───────────────────────────────────────────────────────────────────────────── */

/* ─────────────────────────────────────────────────────────────────────────────
   Section 1 — Intro
───────────────────────────────────────────────────────────────────────────── */
const HistoryIntro = memo(function HistoryIntro({ t, stats, statLabels }) {
  const isNonLatin = t.font !== "'Plus Jakarta Sans', sans-serif"
  return (
    <motion.section
      className="hist-intro"
      variants={stagger(0.09)}
      initial="hidden"
      animate="visible"
      aria-labelledby="hist-intro-heading"
    >
      <motion.div className="hist-section-label" variants={fadeUp}>
        <span className="hist-section-label__dot" aria-hidden="true" />
        <span style={{ fontFamily: isNonLatin ? t.font : undefined }}>
          {t.introLabel}
        </span>
      </motion.div>

      <motion.div className="hist-intro-card" variants={fadeUp}>
        <div className="hist-intro-card__accent" aria-hidden="true" />
        <div className="hist-intro-card__inner">
          <div className="hist-intro-card__icon-wrap" aria-hidden="true">
            <HiOutlineOfficeBuilding />
          </div>
          <div className="hist-intro-card__body">
            <h2
              id="hist-intro-heading"
              className="hist-intro-card__title"
              style={{ fontFamily: isNonLatin ? t.font : undefined }}
            >
              {t.introTitle}
            </h2>
            <div className="hist-intro-card__rule" aria-hidden="true" />
            <p className="hist-intro-card__text" style={{ fontFamily: t.font }}>
              {t.introPara1}
            </p>
            <p className="hist-intro-card__text" style={{ fontFamily: t.font }}>
              {t.introPara2}
            </p>
          </div>
        </div>
        <div className="hist-intro-card__ornament" aria-hidden="true">
          <svg viewBox="0 0 80 80" fill="none" width="80" height="80">
            <circle cx="40" cy="40" r="36" stroke="rgba(199,154,43,0.18)" strokeWidth="1.5" strokeDasharray="4 6" />
            <circle cx="40" cy="40" r="24" stroke="rgba(199,154,43,0.12)" strokeWidth="1" />
            <circle cx="40" cy="40" r="10" fill="rgba(199,154,43,0.08)" />
          </svg>
        </div>
      </motion.div>

      <motion.div className="hist-stat-strip" variants={stagger(0.07)} role="list" aria-label="Key facts">
        {[
          { icon: <FiCalendar />, label: statLabels.established, value: stats.established },
          { icon: <HiOutlineOfficeBuilding />, label: statLabels.province, value: stats.province },
          { icon: <FiUsers />, label: statLabels.districts, value: stats.districts },
          { icon: <FiAward />, label: statLabels.yearsOfService, value: stats.yearsOfService },
        ].map((s) => (
          <motion.div className="hist-stat-card" key={s.label} variants={slideLeft} role="listitem">
            <div className="hist-stat-card__icon" aria-hidden="true">{s.icon}</div>
            <div className="hist-stat-card__value">{s.value}</div>
            <div className="hist-stat-card__label">{s.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
})

/* ─────────────────────────────────────────────────────────────────────────────
   Section 2 — Past Directors Table
───────────────────────────────────────────────────────────────────────────── */
const HistoryDirectorsTable = memo(function HistoryDirectorsTable({ t }) {
  const isNonLatin = t.font !== "'Plus Jakarta Sans', sans-serif"
  return (
    <motion.section
      className="hist-directors-section"
      aria-labelledby="hist-directors-heading"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={stagger(0.08)}
    >
      <motion.div className="hist-section-label" variants={fadeUp}>
        <span className="hist-section-label__dot" aria-hidden="true" />
        <span
          id="hist-directors-heading"
          style={{ fontFamily: isNonLatin ? t.font : undefined }}
        >
          {t.tableTitle}
        </span>
      </motion.div>

      <motion.div className="hist-directors-card" variants={fadeUp}>
        {/* Desktop/tablet table */}
        <div className="hist-directors-table-wrap">
          <table className="hist-directors-table" aria-label={t.tableTitle}>
            <thead>
              <tr>
                <th scope="col" className="hist-directors-table__th hist-directors-table__th--num">#</th>
                <th scope="col" className="hist-directors-table__th">{t.tableName}</th>
                <th scope="col" className="hist-directors-table__th">{t.tableService}</th>
              </tr>
            </thead>
            <tbody>
              {t.directors.map((d, i) => (
                <tr key={i} className="hist-directors-table__row" tabIndex={0}>
                  <td className="hist-directors-table__td hist-directors-table__td--num">{i + 1}</td>
                  <td
                    className="hist-directors-table__td hist-directors-table__td--name"
                    style={{ fontFamily: isNonLatin ? t.font : undefined }}
                  >
                    {d.name}
                  </td>
                  <td className="hist-directors-table__td hist-directors-table__td--period">
                    {d.period}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards — shown via CSS below 600px */}
        <ul className="hist-directors-cards" aria-label={t.tableTitle}>
          {t.directors.map((d, i) => (
            <li key={i} className="hist-directors-card-item" tabIndex={0}>
              <div className="hist-directors-card-item__num">{i + 1}</div>
              <div className="hist-directors-card-item__body">
                <div
                  className="hist-directors-card-item__name"
                  style={{ fontFamily: isNonLatin ? t.font : undefined }}
                >
                  {d.name}
                </div>
                <div className="hist-directors-card-item__period">
                  <FiCalendar aria-hidden="true" style={{ flexShrink: 0 }} />
                  {d.period}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.section>
  )
})

/* ─────────────────────────────────────────────────────────────────────────────
   Section 3 — Special Projects
───────────────────────────────────────────────────────────────────────────── */
function ProjectCard({ project, t, isNonLatin }) {
  const [imgErr, setImgErr] = useState(false)
  return (
    <motion.div
      className="hist-project-card"
      variants={fadeUp}
      tabIndex={0}
      aria-label={project.title}
    >
      <div className="hist-project-card__img-wrap" aria-hidden="true">
        {!imgErr ? (
          <img
            src={project.img}
            alt={project.title}
            className="hist-project-card__img"
            onError={() => setImgErr(true)}
            loading="lazy"
          />
        ) : (
          <div className="hist-project-card__img-placeholder">
            <FiAward className="hist-project-card__placeholder-icon" aria-hidden="true" />
            <span className="hist-project-card__placeholder-abbr">{project.abbr}</span>
          </div>
        )}
        <div className="hist-project-card__img-overlay" aria-hidden="true" />
      </div>
      <div className="hist-project-card__body">
        <div className="hist-project-card__year">{project.year}</div>
        <h3
          className="hist-project-card__title"
          style={{ fontFamily: isNonLatin ? t.font : undefined }}
        >
          {project.title}
        </h3>
        <p className="hist-project-card__desc" style={{ fontFamily: t.font }}>
          {project.desc}
        </p>
        <button
          className="hist-project-card__btn"
          aria-label={`${t.projectsRead}: ${project.title}`}
        >
          {t.projectsRead}
          <FiExternalLink aria-hidden="true" />
        </button>
      </div>
      <div className="hist-project-card__glow" aria-hidden="true" />
    </motion.div>
  )
}

const HistoryProjects = memo(function HistoryProjects({ t }) {
  const isNonLatin = t.font !== "'Plus Jakarta Sans', sans-serif"
  return (
    <motion.section
      className="hist-projects-section"
      aria-labelledby="hist-projects-heading"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={stagger(0.09)}
    >
      <motion.div className="hist-section-label" variants={fadeUp}>
        <span className="hist-section-label__dot" aria-hidden="true" />
        <span
          id="hist-projects-heading"
          style={{ fontFamily: isNonLatin ? t.font : undefined }}
        >
          {t.projectsTitle}
        </span>
      </motion.div>

      <motion.div className="hist-projects-grid" variants={stagger(0.09)}>
        {t.projects.map((p) => (
          <ProjectCard key={p.id} project={p} t={t} isNonLatin={isNonLatin} />
        ))}
      </motion.div>
    </motion.section>
  )
})

/* Font-per-language lookup — the fetched API payload (aboutHistoryApi.get())
   only carries text content, not font-family metadata (that was previously
   hardcoded per-language alongside the text in historyData). Re-derive it
   from `lang` here and merge it onto `t` so HistoryIntro / HistoryDirectorsTable
   / HistoryProjects / ProjectCard can keep reading `t.font` unchanged. */
const FONT_BY_LANG = {
  en: "'Plus Jakarta Sans', sans-serif",
  si: "'Noto Sans Sinhala', sans-serif",
  ta: "'Noto Sans Tamil', sans-serif",
}

/* ─────────────────────────────────────────────────────────────────────────────
   HistoryPage — root export (used from About.jsx)
───────────────────────────────────────────────────────────────────────────── */
export default function HistoryPage() {
  const lang = useLang()
  const [data, setData] = useState(null)

  useEffect(() => {
    let cancelled = false
    aboutHistoryApi.get()
      .then(({ data }) => { if (!cancelled) setData(data) })
      .catch((err) => console.error('HistoryPage: failed to load history', err))
    return () => { cancelled = true }
  }, [])

  const t = useMemo(() => {
    if (!data) return null
    const langData = data[lang] ?? data.en
    return { ...langData, font: FONT_BY_LANG[lang] ?? FONT_BY_LANG.en }
  }, [data, lang])

  if (!data || !t) return null

  const stats = data.stats
  const statLabels = stats.labels[lang] ?? stats.labels.en

  return (
    <motion.div
      className="hist-content"
      initial="hidden"
      animate="visible"
      variants={stagger(0.06)}
    >
      <HistoryIntro t={t} stats={stats} statLabels={statLabels} />
      <HistoryDirectorsTable t={t} />
      {/* Special Development Projects — hidden, do not remove */}
      {false && <HistoryProjects t={t} />}

      <motion.div className="ab-glass-accent" variants={fadeUp}>
        <div className="ab-glass-accent__icon" aria-hidden="true">
          <FiShield />
        </div>
        <div className="ab-glass-accent__content">
          <div className="ab-glass-accent__title">{t.officialGovt}</div>
          <div className="ab-glass-accent__sub">{t.officialGovtSub}</div>
        </div>
      </motion.div>
    </motion.div>
  )
}

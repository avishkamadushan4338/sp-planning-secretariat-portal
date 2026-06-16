import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft, ChevronRight, Calendar, Clock, MapPin,
  X, Star, ArrowRight,
} from 'lucide-react'
import ProgressiveImage from '@/shared/components/ProgressiveImage'
import './HomeEventsAndInstitutes.css'

/* ── Brand tokens ────────────────────────────────────────────────────────── */
const MAROON = '#4A0918'
const GOLD   = '#C79A2B'

/* ── Translations ────────────────────────────────────────────────────────── */
const T = {
  en: {
    sectionEyebrow:  'What\'s On',
    sectionTitle:    'Events Calendar',
    upcomingLabel:   'Upcoming Events',
    readMore:        'Read More',
    noEvents:        'No events scheduled',
    noUpcoming:      'No upcoming events',
    close:           'Close',
    viewAll:         'View All Events',
    featured:        'Featured',
    location:        'Location',
    time:            'Time',
    institutesTitle: 'Affiliated Institutes',
    visitSite:       'Visit Site',
  },
  si: {
    sectionEyebrow:  'සිදුවීම්',
    sectionTitle:    'සිදුවීම් දින දර්ශනය',
    upcomingLabel:   'ඉදිරි සිදුවීම්',
    readMore:        'තව කියවන්න',
    noEvents:        'කිසිදු සිදුවීමක් නොමැත',
    noUpcoming:      'ඉදිරි සිදුවීම් නොමැත',
    close:           'වසන්න',
    viewAll:         'සියලු සිදුවීම් බලන්න',
    featured:        'විශේෂ',
    location:        'ස්ථානය',
    time:            'වේලාව',
    institutesTitle: 'අනුබද්ධිත ආයතන',
    visitSite:       'වෙබ් අඩවිය',
  },
  ta: {
    sectionEyebrow:  'நிகழ்வுகள்',
    sectionTitle:    'நிகழ்வு நாட்காட்டி',
    upcomingLabel:   'வரவிருக்கும் நிகழ்வுகள்',
    readMore:        'மேலும் படிக்க',
    noEvents:        'நிகழ்வுகள் இல்லை',
    noUpcoming:      'வரவிருக்கும் நிகழ்வுகள் இல்லை',
    close:           'மூடு',
    viewAll:         'அனைத்து நிகழ்வுகளையும் காண்க',
    featured:        'சிறப்பு',
    location:        'இடம்',
    time:            'நேரம்',
    institutesTitle: 'இணைந்த நிறுவனங்கள்',
    visitSite:       'தளம் பார்க்க',
  },
}

/* ── Default dummy events (shown when CMS has no data) ───────────────────── */
const DUMMY_EVENTS = []

/* ── Affiliated institutes data ──────────────────────────────────────────── */
const INSTITUTES = [
  { id: 1, name: 'Southern Development Authority',    url: 'https://www.southern.gov.lk',      logo: '/branding/af1.png' },
  { id: 2, name: 'Provincial Planning Unit',          url: 'https://www.southern.gov.lk',      logo: '/branding/af2.png' },
  { id: 3, name: 'Education Development Center',      url: 'https://www.moe.gov.lk',            logo: '/branding/af3.png' },
  { id: 4, name: 'Infrastructure Division',           url: 'https://www.southern.gov.lk',      logo: '/branding/af4.png' },
  { id: 5, name: 'Agriculture Planning Board',        url: 'https://www.doa.gov.lk',            logo: '/branding/af5.png' },
  { id: 6, name: 'Affiliated Institute',              url: 'https://www.southern.gov.lk',      logo: '/branding/af6.png' },
]

/* ── Helpers ─────────────────────────────────────────────────────────────── */
const DAYS_SHORT = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS     = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
]

function parseDate(str) {
  const [y, m, d] = str.split('-').map(Number)
  return new Date(y, m - 1, d)
}

function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear()
    && a.getMonth()    === b.getMonth()
    && a.getDate()     === b.getDate()
}

/* ── Animation variants ──────────────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 24, filter: 'blur(5px)' },
  visible: { opacity: 1, y: 0,  filter: 'blur(0px)',
    transition: { duration: 0.62, delay, ease: [0.22, 1, 0.36, 1] } },
})

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
}

/* ════════════════════════════════════════════════════════════════════════════
   Root component
   ════════════════════════════════════════════════════════════════════════════ */
export default function HomeEventsAndInstitutes({ lang: propLang }) {
  const [lang,    setLang]    = useState(() => propLang || localStorage.getItem('lang') || 'en')
  const [reduced, setReduced] = useState(false)
  const [events,  setEvents]  = useState([])

  /* Language sync */
  useEffect(() => {
    const h = (e) => setLang(e.detail || 'en')
    window.addEventListener('langChange', h)
    return () => window.removeEventListener('langChange', h)
  }, [])
  useEffect(() => { if (propLang) setLang(propLang) }, [propLang])

  /* Reduced-motion */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const h = (e) => setReduced(e.matches)
    mq.addEventListener('change', h)
    return () => mq.removeEventListener('change', h)
  }, [])

  /* CMS data — localStorage + realtime sync */
  const loadEvents = useCallback(() => {
    try {
      const raw = localStorage.getItem('cms_home_events')
      if (raw) {
        const parsed = JSON.parse(raw)
        const active = parsed.filter(ev => ev.status === 'Active')
        setEvents(active.length ? active : DUMMY_EVENTS)
      } else {
        setEvents(DUMMY_EVENTS)
      }
    } catch {
      setEvents(DUMMY_EVENTS)
    }
  }, [])

  useEffect(() => {
    loadEvents()

    const onStorage = (e) => { if (e.key === 'cms_home_events') loadEvents() }
    const onCustom  = () => loadEvents()
    window.addEventListener('storage',              onStorage)
    window.addEventListener('cms_home_events_updated', onCustom)

    let bc
    try {
      bc = new BroadcastChannel('cms_home_events')
      bc.onmessage = loadEvents
    } catch (_) { /* BroadcastChannel not supported */ }

    return () => {
      window.removeEventListener('storage',              onStorage)
      window.removeEventListener('cms_home_events_updated', onCustom)
      bc?.close()
    }
  }, [loadEvents])

  const t          = T[lang] || T.en
  const isNonLatin = lang === 'si' || lang === 'ta'

  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const animState = reduced ? 'visible' : (inView ? 'visible' : 'hidden')

  return (
    <section ref={sectionRef} className="hei" aria-label={t.sectionTitle}>

      {/* ── Decorative background ── */}
      <div className="hei__bg-art" aria-hidden="true">
        <div className="hei__orb hei__orb--a" />
        <div className="hei__orb hei__orb--b" />
        <div className="hei__orb hei__orb--c" />
        <svg className="hei__lattice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <pattern id="heiGrid" x="0" y="0" width="44" height="44" patternUnits="userSpaceOnUse">
              <path d="M44 0L0 0L0 44" fill="none" stroke="rgba(199,154,43,0.055)" strokeWidth="0.7"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#heiGrid)" />
        </svg>
        <div className="hei__shimmer-line hei__shimmer-line--top"    />
        <div className="hei__shimmer-line hei__shimmer-line--bottom" />
      </div>

      <div className="hei__container">

        {/* ── Section header ── */}
        <motion.div
          className="hei__header"
          variants={stagger}
          initial="hidden"
          animate={animState}
        >
          <motion.div className="hei__eyebrow" variants={fadeUp(0)}>
            <span className="hei__eyebrow-diamond" aria-hidden="true" />
            <span className={`hei__eyebrow-text${isNonLatin ? ' hei__nl' : ''}`}>{t.sectionEyebrow}</span>
          </motion.div>
          <motion.h2
            className={`hei__section-title${isNonLatin ? ' hei__section-title--nl' : ''}`}
            variants={fadeUp(0.08)}
          >
            {t.sectionTitle}
          </motion.h2>
          <motion.div
            className="hei__rule"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={animState === 'visible'
              ? { scaleX: 1, opacity: 1, transition: { duration: 0.55, delay: 0.18, ease: [0.16, 1, 0.3, 1] } }
              : { scaleX: 0, opacity: 0 }
            }
          />
        </motion.div>

        {/* ── Two-column body ── */}
        <div className="hei__body">

          {/* LEFT — calendar */}
          <motion.div
            className="hei__left"
            variants={fadeUp(0.12)}
            initial="hidden"
            animate={animState}
          >
            <EventCalendarPanel
              events={events}
              lang={lang}
              t={t}
              isNonLatin={isNonLatin}
              reduced={reduced}
            />
          </motion.div>

          {/* RIGHT — institutes */}
          <motion.div
            className="hei__right"
            variants={fadeUp(0.22)}
            initial="hidden"
            animate={animState}
          >
            <AffiliatedInstitutes
              t={t}
              reduced={reduced}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   Event Calendar Panel
   ════════════════════════════════════════════════════════════════════════════ */
function EventCalendarPanel({ events, lang, t, isNonLatin, reduced }) {
  const today = useMemo(() => { const d = new Date(); d.setHours(0,0,0,0); return d }, [])
  const [viewYear,  setViewYear]  = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [selected,  setSelected]  = useState(() => { const d = new Date(); d.setHours(0,0,0,0); return d })   /* Date object */
  const [popup,     setPopup]     = useState(null)   /* event object */

  /* Days array for current view month */
  const { cells, eventDates } = useMemo(() => {
    const first    = new Date(viewYear, viewMonth, 1)
    const lastDay  = new Date(viewYear, viewMonth + 1, 0).getDate()
    const startDow = first.getDay()
    const cells    = []

    /* Leading empties */
    for (let i = 0; i < startDow; i++) cells.push(null)
    /* Day numbers */
    for (let d = 1; d <= lastDay; d++) cells.push(new Date(viewYear, viewMonth, d))

    /* Set of date strings for O(1) lookup */
    const eventDates = new Set(
      events
        .filter(ev => ev.status === 'Active')
        .map(ev => ev.date)
    )

    return { cells, eventDates }
  }, [viewYear, viewMonth, events])

  /* Events for selected day */
  const selectedEvents = useMemo(() => {
    if (!selected) return []
    const key = `${selected.getFullYear()}-${String(selected.getMonth()+1).padStart(2,'0')}-${String(selected.getDate()).padStart(2,'0')}`
    return events.filter(ev => ev.date === key && ev.status === 'Active')
  }, [selected, events])


  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11) }
    else setViewMonth(m => m - 1)
    setSelected(null)
  }
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0) }
    else setViewMonth(m => m + 1)
    setSelected(null)
  }

  const handleDayClick = (date) => {
    if (!date) return
    setSelected(prev => (prev && isSameDay(prev, date)) ? null : date)
  }

  const getTitle = (ev) => {
    if (lang === 'si' && ev.titleSi) return ev.titleSi
    if (lang === 'ta' && ev.titleTa) return ev.titleTa
    return ev.titleEn
  }

  const categoryColor = (cat) => {
    const map = {
      Meeting:    { bg: 'rgba(74,9,24,0.10)',  dot: MAROON  },
      Workshop:   { bg: 'rgba(199,154,43,0.14)', dot: GOLD  },
      Conference: { bg: 'rgba(74,9,24,0.10)',  dot: MAROON  },
      Evaluation: { bg: 'rgba(120,80,20,0.12)', dot: '#8B5E10' },
      Training:   { bg: 'rgba(50,100,50,0.10)', dot: '#2E7D32' },
    }
    return map[cat] || { bg: 'rgba(74,9,24,0.08)', dot: MAROON }
  }

  return (
    <div className="hei__cal-wrap">

      {/* Calendar card */}
      <div className="hei__cal-card" role="region" aria-label="Event calendar">

        {/* Month navigator */}
        <div className="hei__cal-nav">
          <button
            className="hei__cal-nav-btn"
            onClick={prevMonth}
            aria-label="Previous month"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="hei__cal-month-label">
            {MONTHS[viewMonth]} {viewYear}
          </span>
          <button
            className="hei__cal-nav-btn"
            onClick={nextMonth}
            aria-label="Next month"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Day-of-week headers */}
        <div className="hei__cal-dow-row" role="row">
          {DAYS_SHORT.map(d => (
            <span key={d} className="hei__cal-dow" role="columnheader" aria-label={d}>{d}</span>
          ))}
        </div>

        {/* Day cells */}
        <div className="hei__cal-grid" role="grid" aria-label={`${MONTHS[viewMonth]} ${viewYear}`}>
          {cells.map((date, idx) => {
            if (!date) return <span key={`e-${idx}`} className="hei__cal-cell hei__cal-cell--empty" aria-hidden="true" />

            const isToday    = isSameDay(date, today)
            const isSelected = selected && isSameDay(date, selected)
            const dateKey    = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`
            const hasEvent   = eventDates.has(dateKey)

            return (
              <button
                key={dateKey}
                className={[
                  'hei__cal-cell',
                  isToday    ? 'hei__cal-cell--today'    : '',
                  isSelected ? 'hei__cal-cell--selected' : '',
                  hasEvent   ? 'hei__cal-cell--event'    : '',
                ].join(' ')}
                onClick={() => handleDayClick(date)}
                aria-label={`${date.getDate()} ${MONTHS[viewMonth]}${hasEvent ? ', has events' : ''}`}
                aria-pressed={isSelected}
                role="gridcell"
              >
                <span className="hei__cal-cell-num">{date.getDate()}</span>
                {hasEvent && <span className="hei__cal-event-dot" aria-hidden="true" />}
              </button>
            )
          })}
        </div>

        {/* Legend */}
        <div className="hei__cal-legend" aria-hidden="true">
          <span className="hei__legend-item">
            <span className="hei__legend-dot hei__legend-dot--today" />
            Today
          </span>
          <span className="hei__legend-item">
            <span className="hei__legend-dot hei__legend-dot--event" />
            Event
          </span>
          <span className="hei__legend-item">
            <span className="hei__legend-dot hei__legend-dot--selected" />
            Selected
          </span>
        </div>
      </div>

      {/* Selected day events */}
      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={selected.toISOString()}
            className="hei__day-events"
            initial={reduced ? {} : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? {} : { opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="hei__day-events-heading">
              {selected.getDate()} {MONTHS[selected.getMonth()]} {selected.getFullYear()}
            </p>
            {selectedEvents.length === 0 ? (
              <p className="hei__day-events-empty">{t.noEvents}</p>
            ) : (
              selectedEvents.map(ev => (
                <button
                  key={ev.id}
                  className="hei__day-event-chip"
                  onClick={() => setPopup(ev)}
                  aria-label={`${getTitle(ev)} — click to view details`}
                >
                  <span
                    className="hei__chip-dot"
                    style={{ background: categoryColor(ev.category).dot }}
                    aria-hidden="true"
                  />
                  <span className={`hei__chip-title${isNonLatin ? ' hei__nl' : ''}`}>{getTitle(ev)}</span>
                  <span className="hei__chip-time">{ev.time}</span>
                  <ArrowRight size={13} className="hei__chip-arrow" aria-hidden="true" />
                </button>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Event detail popup */}
      <AnimatePresence>
        {popup && (
          <EventPopup
            ev={popup}
            lang={lang}
            t={t}
            isNonLatin={isNonLatin}
            onClose={() => setPopup(null)}
            reduced={reduced}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   Event Detail Popup
   ════════════════════════════════════════════════════════════════════════════ */
function EventPopup({ ev, lang, t, isNonLatin, onClose, reduced }) {

  const getTitle = (e) => {
    if (lang === 'si' && e.titleSi) return e.titleSi
    if (lang === 'ta' && e.titleTa) return e.titleTa
    return e.titleEn
  }

  const getDesc = (e) => {
    if (lang === 'si' && e.descriptionSi) return e.descriptionSi
    if (lang === 'ta' && e.descriptionTa) return e.descriptionTa
    return e.descriptionEn
  }

  /* Close on Escape */
  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose])

  const d = parseDate(ev.date)

  return (
    <motion.div
      className="hei__popup-overlay"
      initial={reduced ? {} : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduced ? {} : { opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={getTitle(ev)}
    >
      <motion.div
        className="hei__popup"
        initial={reduced ? {} : { scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={reduced ? {} : { scale: 0.92, opacity: 0, y: 20 }}
        transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Image or gradient placeholder */}
        <div className="hei__popup-img-wrap">
          {ev.imageUrl ? (
            <ProgressiveImage
              src={ev.imageUrl}
              alt={getTitle(ev)}
              className="hei__popup-img"
              loading="lazy"
              fallback={
                <div className="hei__popup-img-placeholder" aria-hidden="true">
                  <Calendar size={32} color={GOLD} />
                </div>
              }
            />
          ) : (
            <div className="hei__popup-img-placeholder" aria-hidden="true">
              <Calendar size={32} color={GOLD} />
            </div>
          )}
          {ev.featured && (
            <span className="hei__popup-featured-badge">
              <Star size={11} aria-hidden="true" /> {t.featured}
            </span>
          )}
          <button
            className="hei__popup-close"
            onClick={onClose}
            aria-label={t.close}
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="hei__popup-body">
          <span className="hei__popup-cat">{ev.category}</span>

          <h3 className={`hei__popup-title${isNonLatin ? ' hei__nl' : ''}`}>{getTitle(ev)}</h3>

          <div className="hei__popup-meta-row">
            <span className="hei__popup-meta-item">
              <Calendar size={13} aria-hidden="true" />
              {d.getDate()} {MONTHS[d.getMonth()]} {d.getFullYear()}
            </span>
            {ev.time && (
              <span className="hei__popup-meta-item">
                <Clock size={13} aria-hidden="true" />
                {ev.time}
              </span>
            )}
            {ev.location && (
              <span className="hei__popup-meta-item">
                <MapPin size={13} aria-hidden="true" />
                {ev.location}
              </span>
            )}
          </div>

          <p className={`hei__popup-desc${isNonLatin ? ' hei__nl' : ''}`}>{getDesc(ev)}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   Affiliated Institutes
   ════════════════════════════════════════════════════════════════════════════ */
function AffiliatedInstitutes({ t, reduced }) {
  return (
    <div className="hei__inst-wrap">

      {/* Subtle section label */}
      <div className="hei__inst-header" aria-hidden="true">
        <span className="hei__inst-eyebrow-line" />
        <span className="hei__inst-eyebrow-text">{t.institutesTitle}</span>
        <span className="hei__inst-eyebrow-line" />
      </div>

      {/* Logo grid */}
      <div className="hei__inst-grid" role="list" aria-label={t.institutesTitle}>
        {INSTITUTES.map((inst, i) => (
          <InstCard key={inst.id} inst={inst} t={t} index={i} reduced={reduced} />
        ))}
      </div>
    </div>
  )
}

/* ── Single institute card ───────────────────────────────────────────────── */
function InstCard({ inst, t, index, reduced }) {
  return (
    <motion.a
      href={inst.url}
      target="_blank"
      rel="noopener noreferrer"
      className="hei__inst-card"
      role="listitem"
      aria-label={`${inst.name} — ${t.visitSite}`}
      initial={reduced ? {} : { opacity: 0, y: 20, filter: 'blur(4px)' }}
      whileInView={reduced ? {} : { opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: 0.05 + index * 0.08, duration: 0.5, ease: [0.22,1,0.36,1] }}
      whileHover={reduced ? {} : { y: -4, scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Logo only — no text */}
      <ProgressiveImage
        src={inst.logo}
        alt={inst.name}
        className="hei__inst-logo"
        loading="lazy"
        fill={false}
        fallback={
          <div className="hei__inst-logo-fallback" aria-hidden="true">
            <svg viewBox="0 0 48 48" fill="none" width="48" height="48" aria-hidden="true">
              <circle cx="24" cy="24" r="20" stroke={GOLD} strokeWidth="1.4" fill="none" opacity="0.5"/>
              <rect x="10" y="18" width="28" height="18" rx="3" stroke={GOLD} strokeWidth="1.4"/>
              <path d="M18 18V15a6 6 0 0 1 12 0v3" stroke={GOLD} strokeWidth="1.4"/>
              <circle cx="24" cy="26" r="3" stroke={GOLD} strokeWidth="1.4"/>
            </svg>
          </div>
        }
      />

      {/* Glow border on hover */}
      <span className="hei__inst-glow-border" aria-hidden="true" />
    </motion.a>
  )
}

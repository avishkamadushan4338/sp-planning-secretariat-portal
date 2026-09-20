import { useState, useEffect, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { SeoHead } from '@/shared/seo'
import {
  FiHelpCircle, FiArrowRight, FiHome, FiMail, FiSearch, FiX,
  FiChevronDown, FiPhone, FiMessageSquare,
} from 'react-icons/fi'
import { faqsApi } from '@/features/cms/cmsContentApi'
import './FAQ.css'

/* ─── Brand tokens ──────────────────────────────────────────────────────────── */
const GOLD  = '#C79A2B'
const CREAM = '#FCFBFA'

/* ─── Lang meta ─────────────────────────────────────────────────────────────── */
const LANG_META = {
  en: { font: 'Inter, sans-serif',               headFont: "'Playfair Display', Georgia, serif", isNonLatin: false },
  si: { font: "'Noto Sans Sinhala', sans-serif", headFont: "'Noto Sans Sinhala', sans-serif",   isNonLatin: true  },
  ta: { font: "'Noto Sans Tamil', sans-serif",   headFont: "'Noto Sans Tamil', sans-serif",     isNonLatin: true  },
}

/* ─── UI Strings ────────────────────────────────────────────────────────────── */
const T = {
  en: {
    heroAccent:   'Southern Province Planning Secretariat',
    pageTitle:    'FAQ',
    badgeLabel:   'FAQ',
    pageSub:      'Find answers to common questions about the Southern Province Planning Secretariat, our services, and how to interact with our office.',
    breadHome:    'Home',
    breadCur:     'FAQ',
    backHome:     'Back to Home',
    contactUs:    'Contact Us',
    /* intro */
    introTitle:   'Frequently Asked Questions',
    introSub:     'Find answers to common questions related to services, planning, reports, downloads, departments, and public information.',
    /* search */
    searchPh:     'Search questions…',
    searchLabel:  'Search FAQ',
    noResults:    'No questions match your search.',
    noResultsSub: 'Try a different keyword or browse a category.',
    /* categories */
    catAll:       'All',
    catGeneral:   'General',
    catPlanning:  'Planning',
    catDownloads: 'Downloads',
    catReports:   'Reports',
    catDepts:     'Divisions',
    catTech:      'Technical Support',
    /* help card */
    helpTitle:    'Need More Assistance?',
    helpSub:      'Contact the Planning Secretariat for further guidance.',
    helpContact:  'Contact Us',
    helpDir:      'Telephone Directory',
    /* still need help */
    snhTitle:     'Still Haven\'t Found Your Answer?',
    snhSub:       'Our team is available during office hours to assist you with any questions.',
    snhBtn:       'Send Us a Message',
    snhHours:     'Office Hours: Mon – Fri · 8:30 AM – 4:15 PM',
    snhEmail:     'info@sppsgn.lk',
  },
  si: {
    heroAccent:   'දකුණු පළාත් සැලසුම් ලේකම් කාර්යාලය',
    pageTitle:    'FAQ',
    badgeLabel:   'නිතර අසන පැන',
    pageSub:      'දකුණු පළාත් සැලසුම් ලේකම් කාර්යාලය, අපගේ සේවාවන් සහ කාර්යාලය සමඟ ක්‍රියා කිරීම ගැන පොදු ප්‍රශ්නවලට පිළිතුරු සොයා ගන්න.',
    breadHome:    'මුල් පිටුව',
    breadCur:     'නිතර අසන පැන',
    backHome:     'මුල් පිටුවට',
    contactUs:    'අප අමතන්න',
    introTitle:   'නිතර අසන ප්‍රශ්න',
    introSub:     'සේවාවන්, සැලසුම්, වාර්තා, බාගත කිරීම්, අංශ සහ මහජන තොරතුරු සම්බන්ධ පොදු ප්‍රශ්න සඳහා පිළිතුරු සොයා ගන්න.',
    searchPh:     'ප්‍රශ්න සොයන්න…',
    searchLabel:  'FAQ සොයන්න',
    noResults:    'ඔබගේ සෙවුමට ගැලපෙන ප්‍රශ්න නොමැත.',
    noResultsSub: 'වෙනත් මූල පදයක් උත්සාහ කරන්න.',
    catAll:       'සියල්ල',
    catGeneral:   'සාමාන්‍ය',
    catPlanning:  'සැලසුම්',
    catDownloads: 'බාගත කිරීම්',
    catReports:   'වාර්තා',
    catDepts:     'අංශ',
    catTech:      'තාක්ෂණික සහාය',
    helpTitle:    'තවත් සහාය අවශ්‍යද?',
    helpSub:      'තවදුරටත් මඟ පෙන්වීම සඳහා සැලසුම් ලේකම් කාර්යාලය අමතන්න.',
    helpContact:  'අප අමතන්න',
    helpDir:      'දුරකථන නාමාවලිය',
    snhTitle:     'තවමත් පිළිතුර සොයාගත නොහැකිද?',
    snhSub:       'කාර්යාල වේලාවන් තුළ ඔබගේ ඕනෑම ප්‍රශ්නයකට සහාය දීමට අපගේ කණ්ඩායම සූදානම්.',
    snhBtn:       'පණිවිඩයක් එවන්න',
    snhHours:     'කාර්යාල වේලාවන්: සඳු – සිකු · පෙ.ව. 8:30 – ප.ව. 4:15',
    snhEmail:     'info@sppsgn.lk',
  },
  ta: {
    heroAccent:   'தென் மாகாண திட்டமிடல் செயலகம்',
    pageTitle:    'FAQ',
    badgeLabel:   'கேள்வி-பதில்',
    pageSub:      'தென் மாகாண திட்டமிடல் செயலகம், எங்கள் சேவைகள் மற்றும் அலுவலகத்துடன் தொடர்புகொள்வது பற்றிய பொதுவான கேள்விகளுக்கு பதில்கள் காணுங்கள்.',
    breadHome:    'முகப்பு',
    breadCur:     'அடிக்கடி கேட்கப்படும் கேள்விகள்',
    backHome:     'முகப்புக்கு',
    contactUs:    'தொடர்பு கொள்ளுங்கள்',
    introTitle:   'அடிக்கடி கேட்கப்படும் கேள்விகள்',
    introSub:     'சேவைகள், திட்டமிடல், அறிக்கைகள், பதிவிறக்கங்கள், துறைகள் மற்றும் பொதுத் தகவல்கள் தொடர்பான பொதுவான கேள்விகளுக்கான பதில்களை கண்டறியுங்கள்.',
    searchPh:     'கேள்விகளை தேடுங்கள்…',
    searchLabel:  'FAQ தேடுக',
    noResults:    'உங்கள் தேடலுக்கு பொருந்தும் கேள்விகள் இல்லை.',
    noResultsSub: 'வேறு முக்கிய வார்த்தையை முயற்சிக்கவும்.',
    catAll:       'அனைத்தும்',
    catGeneral:   'பொது',
    catPlanning:  'திட்டமிடல்',
    catDownloads: 'பதிவிறக்கங்கள்',
    catReports:   'அறிக்கைகள்',
    catDepts:     'துறைகள்',
    catTech:      'தொழில்நுட்ப ஆதரவு',
    helpTitle:    'மேலும் உதவி தேவையா?',
    helpSub:      'மேலும் வழிகாட்டுதலுக்கு திட்டமிடல் செயலகத்தை தொடர்பு கொள்ளுங்கள்.',
    helpContact:  'தொடர்பு கொள்ளுங்கள்',
    helpDir:      'தொலைபேசி அட்டவணை',
    snhTitle:     'இன்னும் உங்கள் பதிலைக் காணவில்லையா?',
    snhSub:       'அலுவலக நேரங்களில் உங்கள் கேள்விகளுக்கு உதவ எங்கள் குழு தயாராக உள்ளது.',
    snhBtn:       'செய்தி அனுப்புங்கள்',
    snhHours:     'அலுவலக நேரம்: திங் – வெள் · 8:30 AM – 4:15 PM',
    snhEmail:     'info@sppsgn.lk',
  },
}

/* ─── FAQ Data ────────────────────────────────────────────────────────────────
   Fetched from faqsApi.list() — see FAQ() below. faqData used to be a large
   hardcoded 35-entry x 3-language object; it now lives in the CMS "faqs"
   table (backend/src/db/seedData.js -> faqsSeed) and is grouped by category
   client-side after fetch. ─────────────────────────────────────────────── */

/* ─── Category definitions ──────────────────────────────────────────────────── */
const CATEGORIES = [
  { id: 'all',       labelKey: 'catAll'       },
  { id: 'general',   labelKey: 'catGeneral'   },
  { id: 'planning',  labelKey: 'catPlanning'  },
  { id: 'downloads', labelKey: 'catDownloads' },
  { id: 'reports',   labelKey: 'catReports'   },
  { id: 'departments', labelKey: 'catDepts'   },
  { id: 'tech',      labelKey: 'catTech'      },
]

/* ─── HoneycombBg (kept from original) ─────────────────────────────────────── */
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

/* ─── PageHero (original, unchanged) ───────────────────────────────────────── */
function PageHero({ t, meta }) {
  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.10 } } }
  const itemV   = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 0.60, ease: [0.16, 1, 0.3, 1] } } }
  const slideR  = { hidden: { opacity: 0, x: 36 }, visible: { opacity: 1, x: 0, transition: { duration: 0.70, ease: [0.16, 1, 0.3, 1] } } }

  return (
    <section className="faq-hero">
      <div className="faq-hero__bg" aria-hidden="true" />
      <div className="faq-hero__noise" aria-hidden="true" />
      <div className="faq-hero__grid-lines" aria-hidden="true" />
      <div className="faq-hero__glow faq-hero__glow--gold"   aria-hidden="true" />
      <div className="faq-hero__glow faq-hero__glow--maroon" aria-hidden="true" />
      <div className="faq-hero__glow faq-hero__glow--right"  aria-hidden="true" />
      <div className="faq-hero__watermark" aria-hidden="true">FAQ</div>
      <div className="faq-hero__hc" aria-hidden="true"><HoneycombBg /></div>
      {[...Array(6)].map((_, i) => (
        <div key={i} className={`faq-hero__dot faq-hero__dot--${i + 1}`} aria-hidden="true" />
      ))}

      <div className="faq-hero__inner">
        <motion.div className="faq-hero__left" initial="hidden" animate="visible" variants={stagger}>
          <motion.div className="faq-hero__badge" variants={itemV}>
            <span className="faq-hero__badge-dot" aria-hidden="true" />
            <span style={{
              fontFamily:    meta.isNonLatin ? meta.font : "'Cinzel', serif",
              letterSpacing: meta.isNonLatin ? 0 : '0.13em',
              textTransform: meta.isNonLatin ? 'none' : 'uppercase',
            }}>
              {t.badgeLabel}
            </span>
          </motion.div>

          <motion.h1
            className="faq-hero__title"
            style={{ fontFamily: meta.headFont, lineHeight: meta.isNonLatin ? 1.35 : 1.08 }}
            variants={itemV}
          >
            {t.pageTitle}
          </motion.h1>

          <motion.div
            className="faq-hero__rule"
            variants={{ hidden: { scaleX: 0, opacity: 0 }, visible: { scaleX: 1, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}
            aria-hidden="true"
          />

          <motion.p className="faq-hero__sub" style={{ fontFamily: meta.font }} variants={itemV}>
            {t.pageSub}
          </motion.p>

          <motion.div className="faq-hero__actions" variants={itemV}>
            <Link to="/contact" className="faq-hero__btn faq-hero__btn--gold" style={{ fontFamily: meta.font }}>
              <FiMail size={15} /><span>{t.contactUs}</span>
            </Link>
            <Link to="/home" className="faq-hero__btn faq-hero__btn--ghost" style={{ fontFamily: meta.font }}>
              <FiHome size={15} /><span>{t.backHome}</span><FiArrowRight size={13} className="faq-hero__btn-arrow" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div className="faq-hero__right" initial="hidden" animate="visible" variants={slideR}>
          <img
            src="/branding/f-logo.svg"
            alt="Southern Province Planning Secretariat"
            className="faq-hero__logo"
            onError={e => { e.currentTarget.style.display = 'none' }}
          />
        </motion.div>
      </div>

      <svg className="faq-hero__wave" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,80 C240,20 480,60 720,40 C960,20 1200,60 1440,30 L1440,80 Z" fill={CREAM} />
      </svg>
    </section>
  )
}

/* ─── FAQHero intro card ────────────────────────────────────────────────────── */
function FAQHero({ t, meta }) {
  return (
    <motion.div
      className="faq-intro"
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="faq-intro__icon" aria-hidden="true">
        <FiHelpCircle size={28} color={GOLD} />
      </div>
      <h2 className="faq-intro__title" style={{ fontFamily: meta.headFont, lineHeight: meta.isNonLatin ? 1.4 : 1.18 }}>
        {t.introTitle}
      </h2>
      <p className="faq-intro__sub" style={{ fontFamily: meta.font }}>
        {t.introSub}
      </p>
    </motion.div>
  )
}

/* ─── FAQSearch ─────────────────────────────────────────────────────────────── */
function FAQSearch({ query, setQuery, t, meta }) {
  const inputRef = useRef(null)
  return (
    <div className="faq-search" role="search" aria-label={t.searchLabel}>
      <span className="faq-search__icon" aria-hidden="true"><FiSearch size={18} /></span>
      <input
        ref={inputRef}
        className="faq-search__input"
        type="search"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder={t.searchPh}
        aria-label={t.searchLabel}
        style={{ fontFamily: meta.font }}
        autoComplete="off"
        spellCheck={false}
      />
      {query && (
        <button
          className="faq-search__clear"
          onClick={() => { setQuery(''); inputRef.current?.focus() }}
          aria-label="Clear search"
          type="button"
        >
          <FiX size={16} />
        </button>
      )}
    </div>
  )
}

/* ─── FAQCategories ─────────────────────────────────────────────────────────── */
function FAQCategories({ activeCategory, setActiveCategory, t, meta }) {
  const tabsRef = useRef(null)

  const scrollActive = (id) => {
    setActiveCategory(id)
    const el = tabsRef.current?.querySelector(`[data-cat="${id}"]`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }

  return (
    <div className="faq-cats" role="tablist" aria-label="FAQ categories">
      <div className="faq-cats__track" ref={tabsRef}>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            data-cat={cat.id}
            className={`faq-cats__pill${activeCategory === cat.id ? ' faq-cats__pill--active' : ''}`}
            role="tab"
            aria-selected={activeCategory === cat.id}
            onClick={() => scrollActive(cat.id)}
            style={{ fontFamily: meta.font }}
          >
            {t[cat.labelKey]}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ─── FAQ Accordion item ────────────────────────────────────────────────────── */
function FAQItem({ item, isOpen, onToggle, meta }) {
  const contentRef = useRef(null)
  const id = `faq-panel-${item.id}`
  const btnId = `faq-btn-${item.id}`

  return (
    <div className={`faq-item${isOpen ? ' faq-item--open' : ''}`}>
      <button
        id={btnId}
        className="faq-item__trigger"
        aria-expanded={isOpen}
        aria-controls={id}
        onClick={onToggle}
        style={{ fontFamily: meta.headFont }}
      >
        <span className="faq-item__q">{item.q}</span>
        <span className="faq-item__arrow" aria-hidden="true">
          <FiChevronDown size={20} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={id}
            role="region"
            aria-labelledby={btnId}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="faq-item__body" ref={contentRef} style={{ fontFamily: meta.font }}>
              {item.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── FAQAccordion ──────────────────────────────────────────────────────────── */
function FAQAccordion({ items, meta, t, loading }) {
  const [openId, setOpenId] = useState(null)

  useEffect(() => { setOpenId(null) }, [items])

  const toggle = (id) => setOpenId(prev => prev === id ? null : id)

  if (loading) {
    return (
      <div className="faq-empty">
        <FiSearch size={32} color={GOLD} style={{ opacity: 0.35, animation: 'spin 1.2s linear infinite' }} />
      </div>
    )
  }

  if (!items.length) {
    return (
      <div className="faq-empty">
        <FiSearch size={32} color={GOLD} style={{ opacity: 0.5 }} />
        <p className="faq-empty__msg" style={{ fontFamily: meta.headFont }}>{t.noResults}</p>
        <p className="faq-empty__sub" style={{ fontFamily: meta.font }}>{t.noResultsSub}</p>
      </div>
    )
  }

  return (
    <div className="faq-accordion" role="list">
      {items.map((item, idx) => (
        <motion.div
          key={item.id}
          role="listitem"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.40, delay: idx * 0.045, ease: [0.16, 1, 0.3, 1] }}
        >
          <FAQItem
            item={item}
            isOpen={openId === item.id}
            onToggle={() => toggle(item.id)}
            meta={meta}
          />
        </motion.div>
      ))}
    </div>
  )
}

/* ─── FAQHelpCard ───────────────────────────────────────────────────────────── */
function FAQHelpCard({ t, meta }) {
  return (
    <aside className="faq-help" aria-label="Quick Help">
      <div className="faq-help__glow" aria-hidden="true" />
      <div className="faq-help__icon" aria-hidden="true">
        <FiMessageSquare size={22} color={GOLD} />
      </div>
      <h3 className="faq-help__title" style={{ fontFamily: meta.headFont, lineHeight: meta.isNonLatin ? 1.5 : 1.2 }}>
        {t.helpTitle}
      </h3>
      <p className="faq-help__sub" style={{ fontFamily: meta.font }}>
        {t.helpSub}
      </p>
      <div className="faq-help__actions">
        <Link to="/contact" className="faq-help__btn faq-help__btn--primary" style={{ fontFamily: meta.font }}>
          <FiMail size={14} /><span>{t.helpContact}</span>
        </Link>
        <Link to="/contact#directory" className="faq-help__btn faq-help__btn--ghost" style={{ fontFamily: meta.font }}>
          <FiPhone size={14} /><span>{t.helpDir}</span>
        </Link>
      </div>
      <div className="faq-help__divider" aria-hidden="true" />
      <div className="faq-help__hours">
        <span className="faq-help__hours-dot" aria-hidden="true" />
        <span style={{ fontFamily: meta.font, fontSize: '0.78rem', color: '#7A4558' }}>
          Mon – Fri · 8:30 AM – 4:15 PM
        </span>
      </div>
    </aside>
  )
}

/* ─── StillNeedHelp ─────────────────────────────────────────────────────────── */
function StillNeedHelp({ t, meta }) {
  return (
    <section className="faq-snh" aria-label={t.snhTitle}>
      <div className="faq-snh__glass" />
      <div className="faq-snh__inner">
        <div className="faq-snh__left">
          <h3 className="faq-snh__title" style={{ fontFamily: meta.headFont, lineHeight: meta.isNonLatin ? 1.5 : 1.2 }}>
            {t.snhTitle}
          </h3>
          <p className="faq-snh__sub" style={{ fontFamily: meta.font }}>{t.snhSub}</p>
          <p className="faq-snh__hours" style={{ fontFamily: meta.font }}>{t.snhHours}</p>
        </div>
        <div className="faq-snh__right">
          <Link to="/contact" className="faq-snh__btn" style={{ fontFamily: meta.font }}>
            <FiMail size={16} /><span>{t.snhBtn}</span><FiArrowRight size={14} />
          </Link>
          <a href={`mailto:${t.snhEmail}`} className="faq-snh__email" style={{ fontFamily: meta.font }}>
            {t.snhEmail}
          </a>
        </div>
      </div>
    </section>
  )
}

/* ─── Main export ───────────────────────────────────────────────────────────── */
export default function FAQ() {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en')
  const [query, setQuery]           = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [faqs, setFaqs]         = useState([])
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    const h = (e) => { setLang(e.detail || 'en'); setQuery(''); setActiveCategory('all') }
    window.addEventListener('langChange', h)
    return () => window.removeEventListener('langChange', h)
  }, [])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    faqsApi.list()
      .then(({ data }) => {
        if (cancelled || !Array.isArray(data)) return
        setFaqs([...data].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)))
      })
      .catch((err) => console.error('FAQ: failed to load FAQs', err))
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  const meta = LANG_META[lang] || LANG_META.en
  const t    = T[lang]         || T.en

  // Flatten fetched CMS records into the {id, category, q, a} shape this
  // page's search/category filtering already expects, reading the active
  // language exactly like the old per-language faqData arrays did.
  const data = useMemo(() => faqs.map((f) => ({
    id:       f.id,
    category: f.category,
    q:        f.question?.[lang] || f.question?.en || '',
    a:        f.answer?.[lang]   || f.answer?.en   || '',
  })), [faqs, lang])

  const filtered = useMemo(() => {
    let list = activeCategory === 'all' ? data : data.filter(i => i.category === activeCategory)
    if (query.trim()) {
      const q = query.trim().toLowerCase()
      list = list.filter(i => i.q.toLowerCase().includes(q) || i.a.toLowerCase().includes(q))
    }
    return list
  }, [data, activeCategory, query])

  return (
    <>
      <SeoHead page="faq" />
      <div className="faq-page" style={{ background: CREAM, minHeight: '100vh' }}>
      <PageHero t={t} meta={meta} />

      <main className="faq-main">
        <div className="faq-layout">

          {/* ── Left / main content column ── */}
          <div className="faq-content">
            <FAQHero t={t} meta={meta} />
            <FAQSearch query={query} setQuery={setQuery} t={t} meta={meta} />
            <FAQCategories activeCategory={activeCategory} setActiveCategory={setActiveCategory} t={t} meta={meta} />
            <FAQAccordion items={filtered} meta={meta} t={t} loading={loading} />
          </div>

          {/* ── Right sidebar / help card ── */}
          <div className="faq-sidebar">
            <FAQHelpCard t={t} meta={meta} />
          </div>

        </div>
      </main>

      <StillNeedHelp t={t} meta={meta} />
    </div>
    </>
  )
}

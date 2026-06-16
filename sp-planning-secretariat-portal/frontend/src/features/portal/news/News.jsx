import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import { usePageHold } from '@/shared/hooks/usePageHold'
import ComingSoon from '@/shared/components/ComingSoon'
import { SeoHead } from '@/shared/seo'
import {
  FiCalendar, FiArrowRight, FiDownload, FiExternalLink,
  FiSearch, FiX, FiChevronLeft, FiChevronRight, FiEye,
  FiFileText, FiBell, FiImage,
} from 'react-icons/fi'
import { HiOutlineNewspaper } from 'react-icons/hi'
import './News.css'

/* ── Brand tokens ──────────────────────────────────────────────────────── */
const MAROON = '#4A0918'
const GOLD   = '#C79A2B'
const CREAM  = '#FCFBFA'

/* ── i18n ──────────────────────────────────────────────────────────────── */
const T = {
  en: {
    heroTitle:    'Media Center',
    heroSub:      'News · Gallery · Notices',
    heroBody:     'Stay informed with the latest updates, announcements, and visual stories from the Southern Province Planning Secretariat.',
    tabNews:      'News & Updates',
    tabGallery:   'Photo Gallery',
    tabNotices:   'Official Notices',
    searchPh:     'Search news…',
    allCats:      'All Categories',
    featured:     'Featured',
    readMore:     'Read More',
    viewAll:      'View All',
    download:     'Download',
    noticeDl:     'Download Notice',
    galleryView:  'View Photo',
    prevImg:      'Previous',
    nextImg:      'Next',
    closeLight:   'Close',
    loadMore:     'Load More',
    newBadge:     'New',
  },
  si: {
    heroTitle:    'මාධ්‍ය මධ්‍යස්ථානය',
    heroSub:      'පුවත් · ඡායාරූප · නිවේදන',
    heroBody:     'දකුණු පළාත් සැලසුම් ලේකම් කාර්යාලයේ නවතම තොරතුරු, නිවේදන සහ දෘශ්‍ය කතා සමඟ යාවත්කාලීන වන්න.',
    tabNews:      'පුවත් සහ යාවත්කාලීන',
    tabGallery:   'ඡායාරූප ගැලරිය',
    tabNotices:   'නිල නිවේදන',
    searchPh:     'පුවත් සොයන්න…',
    allCats:      'සියලු කාණ්ඩ',
    featured:     'විශේෂාංග',
    readMore:     'තවත් කියවන්න',
    viewAll:      'සියල්ල බලන්න',
    download:     'බාගන්න',
    noticeDl:     'නිවේදනය බාගන්න',
    galleryView:  'ඡායාරූපය බලන්න',
    prevImg:      'පෙර',
    nextImg:      'ඊළඟ',
    closeLight:   'වසන්න',
    loadMore:     'තවත් පූරණය කරන්න',
    newBadge:     'නව',
  },
  ta: {
    heroTitle:    'ஊடக மையம்',
    heroSub:      'செய்திகள் · தொகுப்பு · அறிவிப்புகள்',
    heroBody:     'தென் மாகாண திட்டமிடல் செயலகத்தின் சமீபத்திய புதுப்பிப்புகள், அறிவிப்புகள் மற்றும் காட்சிக் கதைகளுடன் தகவல் பெறுங்கள்.',
    tabNews:      'செய்திகள் & புதுப்பிப்புகள்',
    tabGallery:   'புகைப்பட தொகுப்பு',
    tabNotices:   'அதிகாரப்பூர்வ அறிவிப்புகள்',
    searchPh:     'செய்திகளைத் தேடுங்கள்…',
    allCats:      'அனைத்து வகைகளும்',
    featured:     'சிறப்பு',
    readMore:     'மேலும் படிக்க',
    viewAll:      'அனைத்தையும் காண்க',
    download:     'பதிவிறக்கம்',
    noticeDl:     'அறிவிப்பை பதிவிறக்கவும்',
    galleryView:  'புகைப்படம் காண்க',
    prevImg:      'முந்தையது',
    nextImg:      'அடுத்தது',
    closeLight:   'மூடு',
    loadMore:     'மேலும் ஏற்றவும்',
    newBadge:     'புதிய',
  },
}

const LANG_FONT = {
  en: "'Plus Jakarta Sans', Inter, sans-serif",
  si: "'Noto Sans Sinhala', sans-serif",
  ta: "'Noto Sans Tamil', sans-serif",
}

const CATEGORIES = ['All Categories', 'Development', 'Infrastructure', 'Planning', 'Community', 'Environment']
const NOTICE_TYPES = ['All', 'Circular', 'Notice']

const NOTICE_TYPE_COLORS = {
  Circular: { bg: 'rgba(74,9,24,0.09)',    text: MAROON,    border: 'rgba(74,9,24,0.20)'    },
  Notice:   { bg: 'rgba(154,117,32,0.09)', text: '#9A7520', border: 'rgba(154,117,32,0.28)' },
}

/* ── Animation variants ─────────────────────────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 22 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.48, delay: i * 0.065, ease: [0.16, 1, 0.3, 1] },
  }),
}

const tabContent = {
  hidden:  { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.36, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, y: -10, transition: { duration: 0.20, ease: [0.4, 0, 1, 1] } },
}

/* ── Helpers ─────────────────────────────────────────────────────────────── */
function formatDate(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  if (isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

function DiamondDivider() {
  return (
    <div className="nc-divider" aria-hidden="true">
      <span className="nc-divider__line" />
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path d="M5 0.5 L9.5 5 L5 9.5 L0.5 5 Z" fill={GOLD} />
      </svg>
      <span className="nc-divider__line" />
    </div>
  )
}

function SectionLabel({ icon: Icon, label }) {
  return (
    <div className="nc-section-label">
      {Icon && <Icon size={13} style={{ color: GOLD }} aria-hidden="true" />}
      <span>{label}</span>
    </div>
  )
}

/* ── Detect touch/mobile for animation optimisation ─────────────────────── */
function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.matchMedia('(max-width: 640px)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)')
    const h = (e) => setMobile(e.matches)
    mq.addEventListener('change', h)
    return () => mq.removeEventListener('change', h)
  }, [])
  return mobile
}

/* ══════════════════════════════════════════════════════════════════════════
   PAGE ROOT
══════════════════════════════════════════════════════════════════════════ */
const VALID_TABS = ['news', 'gallery', 'notices']

export default function News() {
  const held = usePageHold('news')
  const [lang, setLang]           = useState(() => localStorage.getItem('lang') || 'en')
  const [searchParams]            = useSearchParams()
  const [activeTab, setActiveTab] = useState(() => {
    const tab = searchParams.get('tab')
    return VALID_TABS.includes(tab) ? tab : 'news'
  })

  useEffect(() => {
    const tab = searchParams.get('tab')
    if (VALID_TABS.includes(tab)) setActiveTab(tab)
  }, [searchParams])

  useEffect(() => {
    const h = (e) => setLang(e.detail || 'en')
    window.addEventListener('langChange', h)
    return () => window.removeEventListener('langChange', h)
  }, [])

  const t    = T[lang]    || T.en
  const font = LANG_FONT[lang] || LANG_FONT.en

  if (held) return <ComingSoon pageKey="news" />

  return (
    <>
      <SeoHead page="news" />
      <div className="nc-page" style={{ background: CREAM, fontFamily: font }}>
      <MediaHero t={t} font={font} />
      <TabNav activeTab={activeTab} setActiveTab={setActiveTab} t={t} font={font} />
      <div className="nc-tab-body">
        <AnimatePresence mode="wait">
          {activeTab === 'news' && (
            <motion.div key="news" variants={tabContent} initial="hidden" animate="visible" exit="exit">
              <NewsSection t={t} font={font} lang={lang} />
            </motion.div>
          )}
          {activeTab === 'gallery' && (
            <motion.div key="gallery" variants={tabContent} initial="hidden" animate="visible" exit="exit">
              <GallerySection t={t} font={font} />
            </motion.div>
          )}
          {activeTab === 'notices' && (
            <motion.div key="notices" variants={tabContent} initial="hidden" animate="visible" exit="exit">
              <NoticesSection t={t} font={font} lang={lang} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <PageFooterRibbon />
    </div>
    </>
  )
}

/* ── Honeycomb SVG for Media Center hero ─────────────────────────────────── */
function NcHoneycomb() {
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

/* ══════════════════════════════════════════════════════════════════════════
   HERO — dark split layout
══════════════════════════════════════════════════════════════════════════ */
function MediaHero({ t, font }) {
  const isNonLatin = font.includes('Noto Sans Sinhala') || font.includes('Noto Sans Tamil')
  const headFont = isNonLatin ? font : "'Playfair Display', Georgia, serif"
  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.10 } } }
  const itemV   = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 0.60, ease: [0.16, 1, 0.3, 1] } } }
  const slideR  = { hidden: { opacity: 0, x: 36 }, visible: { opacity: 1, x: 0, transition: { duration: 0.70, ease: [0.16, 1, 0.3, 1] } } }

  return (
    <section className="nc-hero">
      <div className="nc-hero__bg" aria-hidden="true" />
      <div className="nc-hero__noise" aria-hidden="true" />
      <div className="nc-hero__grid-lines" aria-hidden="true" />
      <div className="nc-hero__glow nc-hero__glow--gold"   aria-hidden="true" />
      <div className="nc-hero__glow nc-hero__glow--maroon" aria-hidden="true" />
      <div className="nc-hero__glow nc-hero__glow--right"  aria-hidden="true" />
      <div className="nc-hero__watermark" aria-hidden="true">MEDIA</div>
      <div className="nc-hero__hc" aria-hidden="true"><NcHoneycomb /></div>
      {[...Array(6)].map((_, i) => (
        <div key={i} className={`nc-hero__dot nc-hero__dot--${i + 1}`} aria-hidden="true" />
      ))}

      <div className="nc-hero__inner">
        <motion.div className="nc-hero__left" initial="hidden" animate="visible" variants={stagger}>

          <motion.div className="nc-hero__badge" variants={itemV}>
            <span className="nc-hero__badge-dot" aria-hidden="true" />
            <span style={{
              fontFamily:    isNonLatin ? font : "'Cinzel', serif",
              letterSpacing: isNonLatin ? 0 : '0.13em',
              textTransform: isNonLatin ? 'none' : 'uppercase',
            }}>
              {t.heroTitle}
            </span>
          </motion.div>

          <motion.h1
            className="nc-hero__title"
            style={{ fontFamily: headFont, lineHeight: isNonLatin ? 1.35 : 1.08 }}
            variants={itemV}
          >
            {t.heroTitle}
          </motion.h1>

          <motion.div
            className="nc-hero__rule"
            variants={{
              hidden:  { scaleX: 0, opacity: 0 },
              visible: { scaleX: 1, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
            }}
            aria-hidden="true"
          />

          <motion.p className="nc-hero__body" style={{ fontFamily: font }} variants={itemV}>
            {t.heroBody}
          </motion.p>

          <motion.div className="nc-hero__quick" variants={itemV} aria-hidden="true">
            {[t.tabNews, t.tabGallery, t.tabNotices].map((label, i) => (
              <span key={i} className="nc-hero__quick-pill" style={{ fontFamily: font }}>{label}</span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div className="nc-hero__right" initial="hidden" animate="visible" variants={slideR}>
          <img
            src="/branding/f-logo.svg"
            alt="Southern Province Planning Secretariat"
            className="nc-hero__logo"
            onError={e => { e.currentTarget.style.display = 'none' }}
          />
        </motion.div>
      </div>

      <svg className="nc-hero__wave" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,80 C240,20 480,60 720,40 C960,20 1200,60 1440,30 L1440,80 Z" fill={CREAM} />
      </svg>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   TAB NAVIGATION
══════════════════════════════════════════════════════════════════════════ */
function TabNav({ activeTab, setActiveTab, t, font }) {
  const tabsRef = useRef(null)
  const tabs = [
    { id: 'news',    label: t.tabNews,    icon: HiOutlineNewspaper },
    { id: 'gallery', label: t.tabGallery, icon: FiImage },
    { id: 'notices', label: t.tabNotices, icon: FiBell },
  ]

  /* Scroll active tab into view on mobile */
  useEffect(() => {
    if (!tabsRef.current) return
    const activeEl = tabsRef.current.querySelector('.nc-tabnav__btn--active')
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  }, [activeTab])

  return (
    <nav className="nc-tabnav" aria-label="Media Center tabs">
      <div className="nc-tabnav__inner" ref={tabsRef} role="tablist">
        {tabs.map(({ id, label, icon: Icon }) => {
          const active = activeTab === id
          return (
            <button
              key={id}
              role="tab"
              aria-selected={active}
              aria-controls={`nc-panel-${id}`}
              id={`nc-tab-${id}`}
              className={`nc-tabnav__btn ${active ? 'nc-tabnav__btn--active' : ''}`}
              onClick={() => setActiveTab(id)}
              style={{ fontFamily: font }}
            >
              <Icon size={15} aria-hidden="true" />
              <span>{label}</span>
              {active && (
                <motion.span
                  layoutId="tab-indicator"
                  className="nc-tabnav__indicator"
                  aria-hidden="true"
                />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   NEWS SECTION
══════════════════════════════════════════════════════════════════════════ */
function NewsSection({ t, font, lang = 'en' }) {
  const isMobile = useIsMobile()
  const [query, setQuery]         = useState('')
  const [activeCat, setActiveCat] = useState('All Categories')
  const [cmsNews, setCmsNews]     = useState([])

  useEffect(() => {
    const load = () => {
      try {
        const saved = JSON.parse(localStorage.getItem('cms_news') || '[]')
        setCmsNews(saved.filter(n => n.status === 'Active' || n.status === 'Published'))
      } catch { /* ignore */ }
    }
    load()
    window.addEventListener('storage', load)
    return () => window.removeEventListener('storage', load)
  }, [])

  const newsItems = cmsNews.map(n => ({
    id:       n.id,
    featured: n.featured || false,
    category: n.category,
    date:     n.date,
    title:    n.title,
    titleSi:  n.titleSi || '',
    titleTa:  n.titleTa || '',
    excerpt:  n.excerpt || '',
    image:    n.imageUrl || '',
    tag:      null,
  }))

  const filtered = newsItems.filter(n => {
    const matchCat = activeCat === 'All Categories' || n.category === activeCat
    const matchQ   = !query || n.title.toLowerCase().includes(query.toLowerCase())
    return matchCat && matchQ
  })

  const featured = filtered.find(n => n.featured)
  const rest     = filtered.filter(n => !n.featured)

  const hoverProps = isMobile ? {} : { whileHover: { y: -5, transition: { duration: 0.22 } } }

  return (
    <section
      className="nc-section"
      id="nc-panel-news"
      role="tabpanel"
      aria-labelledby="nc-tab-news"
    >
      <div className="nc-section__inner">

        {/* Toolbar */}
        <div className="nc-news-toolbar">
          <div className="nc-search">
            <FiSearch size={15} className="nc-search__icon" aria-hidden="true" />
            <input
              className="nc-search__input"
              style={{ fontFamily: font }}
              placeholder={t.searchPh}
              value={query}
              onChange={e => setQuery(e.target.value)}
              aria-label={t.searchPh}
              type="search"
            />
            {query && (
              <button
                className="nc-search__clear"
                onClick={() => setQuery('')}
                aria-label="Clear search"
              >
                <FiX size={13} />
              </button>
            )}
          </div>
          <div className="nc-cats" role="group" aria-label="Filter by category">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`nc-cats__btn ${activeCat === cat ? 'nc-cats__btn--active' : ''}`}
                style={{ fontFamily: font }}
                onClick={() => setActiveCat(cat)}
                aria-pressed={activeCat === cat}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="nc-empty-state">
            <HiOutlineNewspaper size={40} style={{ color: GOLD, opacity: 0.5 }} aria-hidden="true" />
            <p style={{ fontFamily: font }}>No data found.</p>
          </div>
        )}

        {/* Featured article */}
        {featured && (
          <motion.div
            className="nc-featured"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
          >
            <div className="nc-featured__img-wrap">
              <img
                src={featured.image}
                alt={featured.title}
                className="nc-featured__img"
                onError={e => { e.currentTarget.style.opacity = '0' }}
                loading="lazy"
              />
              <div className="nc-featured__img-overlay" aria-hidden="true" />
              <span className="nc-featured__badge" aria-label="Featured article">{t.featured}</span>
            </div>
            <div className="nc-featured__body">
              <div className="nc-featured__meta">
                <span className="nc-cat-pill">{featured.category}</span>
                <span className="nc-date">
                  <FiCalendar size={11} aria-hidden="true" /> {formatDate(featured.date)}
                </span>
              </div>
              <h2 className="nc-featured__title" style={{ fontFamily: font }}>
                {(lang === 'si' && featured.titleSi) || (lang === 'ta' && featured.titleTa) || featured.title}
              </h2>
              <p className="nc-featured__excerpt" style={{ fontFamily: font }}>{featured.excerpt}</p>
              <button className="nc-btn-primary" style={{ fontFamily: font }}>
                {t.readMore} <FiArrowRight size={14} aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        )}

        <DiamondDivider />
        <SectionLabel icon={HiOutlineNewspaper} label="Latest Updates" />

        {/* Grid */}
        <div className="nc-news-grid" role="list">
          {rest.map((item, i) => (
            <motion.article
              key={item.id}
              className="nc-news-card"
              variants={fadeUp}
              custom={i % 3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.08 }}
              role="listitem"
              tabIndex={0}
              {...hoverProps}
            >
              <div className="nc-news-card__img-wrap">
                <img
                  src={item.image}
                  alt={item.title}
                  className="nc-news-card__img"
                  onError={e => { e.currentTarget.style.opacity = '0' }}
                  loading="lazy"
                />
                <div className="nc-news-card__img-overlay" aria-hidden="true" />
                <span className="nc-cat-pill nc-cat-pill--over">{item.category}</span>
              </div>
              <div className="nc-news-card__body">
                <span className="nc-date">
                  <FiCalendar size={11} aria-hidden="true" /> {formatDate(item.date)}
                </span>
                <h3 className="nc-news-card__title" style={{ fontFamily: font }}>
                  {(lang === 'si' && item.titleSi) || (lang === 'ta' && item.titleTa) || item.title}
                </h3>
                <p className="nc-news-card__excerpt" style={{ fontFamily: font }}>{item.excerpt}</p>
                <button className="nc-news-card__link" style={{ fontFamily: font }}>
                  {t.readMore} <FiArrowRight size={12} aria-hidden="true" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   GALLERY SECTION
══════════════════════════════════════════════════════════════════════════ */
const SPAN_CYCLE = ['wide', 'normal', 'tall', 'normal', 'normal', 'wide']

function AlbumViewer({ album, font, t, onClose }) {
  const images = album.images?.length ? album.images : (album.imageUrl ? [album.imageUrl] : [])
  const [idx, setIdx] = useState(0)

  const prev = useCallback(() => setIdx(i => (i - 1 + images.length) % images.length), [images.length])
  const next = useCallback(() => setIdx(i => (i + 1) % images.length), [images.length])

  const caption = font.includes('Sinhala') && album.titleSi
    ? album.titleSi
    : font.includes('Tamil') && album.titleTa
      ? album.titleTa
      : album.titleEn || album.titleSi || album.titleTa || 'Gallery Album'

  useEffect(() => {
    const h = (e) => {
      if (e.key === 'Escape')      onClose()
      if (e.key === 'ArrowLeft')   prev()
      if (e.key === 'ArrowRight')  next()
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [prev, next, onClose])

  /* Lock body scroll while lightbox open */
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  if (!images.length) return null

  return (
    <motion.div
      className="nc-lightbox"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Album viewer"
    >
      <motion.div
        className="nc-lightbox__card"
        initial={{ scale: 0.93, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.93, opacity: 0 }}
        transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
        onClick={e => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={idx}
            src={images[idx]}
            alt={`${caption} — image ${idx + 1} of ${images.length}`}
            className="nc-lightbox__img"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.20 }}
          />
        </AnimatePresence>

        <div className="nc-lightbox__footer">
          <p className="nc-lightbox__caption" style={{ fontFamily: font }}>{caption}</p>
          <span className="nc-lightbox__counter">{idx + 1} / {images.length}</span>
        </div>

        {images.length > 1 && (
          <div style={{
            position: 'absolute', bottom: 56, left: '50%', transform: 'translateX(-50%)',
            display: 'flex', gap: 6, zIndex: 2,
          }} aria-hidden="true">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setIdx(i) }}
                style={{
                  width: i === idx ? 18 : 7, height: 7, borderRadius: 4,
                  background: i === idx ? '#fff' : 'rgba(255,255,255,0.35)',
                  border: 'none', padding: 0, cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              />
            ))}
          </div>
        )}

        <button className="nc-lightbox__close" onClick={onClose} aria-label={t.closeLight}>
          <FiX size={17} />
        </button>
        {images.length > 1 && (
          <>
            <button className="nc-lightbox__prev" onClick={prev} aria-label={t.prevImg}>
              <FiChevronLeft size={21} />
            </button>
            <button className="nc-lightbox__next" onClick={next} aria-label={t.nextImg}>
              <FiChevronRight size={21} />
            </button>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}

function GallerySection({ t, font }) {
  const isMobile = useIsMobile()
  const [lightboxIdx,  setLightboxIdx]  = useState(null)
  const [albumViewer,  setAlbumViewer]  = useState(null)
  const [cmsAlbums,    setCmsAlbums]    = useState([])

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('cms_gallery_albums') || '[]')
      setCmsAlbums(saved)
    } catch { /* ignore */ }
  }, [])

  const cmsItems = cmsAlbums.map((a, i) => ({
    id: `cms-${a.id}`,
    caption: a.titleEn || a.titleSi || a.titleTa || 'Gallery Album',
    captionSi: a.titleSi,
    captionTa: a.titleTa,
    image: a.imageUrl || '/branding/hero.jpeg',
    span: SPAN_CYCLE[i % SPAN_CYCLE.length],
    isAlbum: true,
    albumData: a,
    photoCount: a.photos || 0,
  }))

  const allItems = useMemo(() => [...cmsItems], [cmsItems])

  const openItem = (item) => {
    if (item.isAlbum) {
      setAlbumViewer(item.albumData)
    } else {
      const flatIdx = allItems.findIndex(x => x.id === item.id)
      setLightboxIdx(flatIdx)
    }
  }

  const closeLight = useCallback(() => setLightboxIdx(null), [])
  const closeAlbum = useCallback(() => setAlbumViewer(null), [])

  const regularItems = allItems.filter(x => !x.isAlbum)
  const lightItem    = lightboxIdx !== null ? allItems[lightboxIdx] : null

  const prevLight = useCallback(() => {
    setLightboxIdx(i => {
      let next = (i - 1 + allItems.length) % allItems.length
      while (allItems[next]?.isAlbum) next = (next - 1 + allItems.length) % allItems.length
      return next
    })
  }, [allItems])

  const nextLight = useCallback(() => {
    setLightboxIdx(i => {
      let next = (i + 1) % allItems.length
      while (allItems[next]?.isAlbum) next = (next + 1) % allItems.length
      return next
    })
  }, [allItems])

  useEffect(() => {
    if (lightboxIdx === null) return
    const h = (e) => {
      if (e.key === 'Escape')     closeLight()
      if (e.key === 'ArrowLeft')  prevLight()
      if (e.key === 'ArrowRight') nextLight()
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [lightboxIdx, prevLight, nextLight, closeLight])

  /* Lock body scroll while lightbox open */
  useEffect(() => {
    if (lightItem) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [lightItem])

  const getCaption = (item) => {
    if (!item) return ''
    if (font.includes('Sinhala') && item.captionSi) return item.captionSi
    if (font.includes('Tamil')   && item.captionTa) return item.captionTa
    return item.caption
  }

  const hoverProps = isMobile ? {} : { whileHover: { scale: 1.01, transition: { duration: 0.22 } } }

  return (
    <section
      className="nc-section"
      id="nc-panel-gallery"
      role="tabpanel"
      aria-labelledby="nc-tab-gallery"
    >
      <div className="nc-section__inner">
        <SectionLabel icon={FiImage} label="Photo Gallery" />

        {allItems.length === 0 && (
          <div className="nc-empty-state">
            <FiImage size={40} style={{ color: GOLD, opacity: 0.5 }} aria-hidden="true" />
            <p style={{ fontFamily: font }}>No data found.</p>
          </div>
        )}

        <div className="nc-gallery-grid" role="list">
          {allItems.map((item, i) => (
            <motion.div
              key={item.id}
              className={`nc-gallery-item nc-gallery-item--${item.span}`}
              variants={fadeUp}
              custom={i % 4}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.08 }}
              onClick={() => openItem(item)}
              role="listitem"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openItem(item) }}
              aria-label={`${getCaption(item)}${item.isAlbum ? ' (album)' : ''} — press to open`}
              {...hoverProps}
            >
              <img
                src={item.image}
                alt={getCaption(item)}
                className="nc-gallery-item__img"
                onError={e => { e.currentTarget.style.opacity = '0' }}
                loading="lazy"
              />
              <div className="nc-gallery-item__overlay" aria-hidden="true">
                <div className="nc-gallery-item__icon">
                  <FiEye size={20} style={{ color: '#fff' }} />
                </div>
                <p className="nc-gallery-item__caption" style={{ fontFamily: font }}>
                  {getCaption(item)}
                </p>
              </div>
              {item.isAlbum && item.photoCount > 0 && (
                <div style={{
                  position: 'absolute', top: 10, right: 10,
                  background: 'rgba(0,0,0,0.52)', backdropFilter: 'blur(4px)',
                  WebkitBackdropFilter: 'blur(4px)',
                  borderRadius: 6, padding: '3px 8px',
                  display: 'flex', alignItems: 'center', gap: 4,
                  fontSize: '0.65rem', fontWeight: 700, color: '#fff',
                  pointerEvents: 'none',
                }} aria-hidden="true">
                  <FiImage size={10} /> {item.photoCount}
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>

      <AnimatePresence>
        {albumViewer && (
          <AlbumViewer album={albumViewer} font={font} t={t} onClose={closeAlbum} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {lightItem && !lightItem.isAlbum && (
          <motion.div
            className="nc-lightbox"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={closeLight}
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
          >
            <motion.div
              className="nc-lightbox__card"
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()}
            >
              <img
                key={lightboxIdx}
                src={lightItem.image}
                alt={getCaption(lightItem)}
                className="nc-lightbox__img"
              />
              <div className="nc-lightbox__footer">
                <p className="nc-lightbox__caption" style={{ fontFamily: font }}>
                  {getCaption(lightItem)}
                </p>
                <span className="nc-lightbox__counter">
                  {regularItems.findIndex(x => x.id === lightItem.id) + 1} / {regularItems.length}
                </span>
              </div>
              <button className="nc-lightbox__close" onClick={closeLight} aria-label={t.closeLight}>
                <FiX size={17} />
              </button>
              <button className="nc-lightbox__prev" onClick={prevLight} aria-label={t.prevImg}>
                <FiChevronLeft size={21} />
              </button>
              <button className="nc-lightbox__next" onClick={nextLight} aria-label={t.nextImg}>
                <FiChevronRight size={21} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

/* ── Download helpers ────────────────────────────────────────────────────── */
async function openSignedUrl(fileUrl, forceDownload = false, fileName = 'notice-attachment') {
  try {
    if (!fileUrl) throw new Error('No file URL provided')
    if (forceDownload) {
      const a = document.createElement('a')
      a.href = fileUrl
      a.download = fileName
      a.rel = 'noopener noreferrer'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    } else {
      window.open(fileUrl, '_blank', 'noopener,noreferrer')
    }
  } catch (err) {
    alert(`Download failed: ${err.message}`)
  }
}

function canDownload(notice) {
  if (!notice.fileUrl) return false
  const access = notice.downloadAccess || 'Everyone'
  if (access === 'Everyone') return true
  if (access === 'RegisteredOnly') return !!sessionStorage.getItem('cms_auth')
  if (access === 'AdminOnly')      return !!sessionStorage.getItem('cms_auth')
  return false
}

/* ══════════════════════════════════════════════════════════════════════════
   NOTICES SECTION
══════════════════════════════════════════════════════════════════════════ */
function NoticesSection({ t, font, lang = 'en' }) {
  const [activeType,  setActiveType]  = useState('All')
  const [cmsNotices,  setCmsNotices]  = useState([])

  useEffect(() => {
    const load = () => {
      try {
        const saved = JSON.parse(localStorage.getItem('cms_notices') || '[]')
        const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
        setCmsNotices(
          saved
            .filter(n => n.status === 'Active')
            .map(n => ({ ...n, isNew: n.isNew || new Date(n.date).getTime() > sevenDaysAgo }))
        )
      } catch { /* ignore */ }
    }
    load()
    const bc = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('cms_notices') : null
    if (bc) bc.onmessage = load
    window.addEventListener('storage', load)
    window.addEventListener('cms_notices_updated', load)
    return () => {
      bc?.close()
      window.removeEventListener('storage', load)
      window.removeEventListener('cms_notices_updated', load)
    }
  }, [])

  const filtered = cmsNotices.filter(n => activeType === 'All' || n.type === activeType)

  return (
    <section
      className="nc-section"
      id="nc-panel-notices"
      role="tabpanel"
      aria-labelledby="nc-tab-notices"
    >
      <div className="nc-section__inner">
        <SectionLabel icon={FiBell} label="Official Notices" />

        <div className="nc-notice-filter" role="group" aria-label="Filter by notice type">
          {NOTICE_TYPES.map(type => (
            <button
              key={type}
              className={`nc-cats__btn ${activeType === type ? 'nc-cats__btn--active' : ''}`}
              style={{ fontFamily: font }}
              onClick={() => setActiveType(type)}
              aria-pressed={activeType === type}
            >
              {type}
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="nc-empty-state">
            <FiBell size={40} style={{ color: GOLD, opacity: 0.5 }} aria-hidden="true" />
            <p style={{ fontFamily: font }}>No data found.</p>
          </div>
        )}

        <div className="nc-notice-list" role="list">
          {filtered.map((notice, i) => {
            const colors = NOTICE_TYPE_COLORS[notice.type] || NOTICE_TYPE_COLORS.Notice
            return (
              <motion.div
                key={notice.id}
                className={`nc-notice-row ${notice.isNew ? 'nc-notice-row--new' : ''}`}
                variants={fadeUp}
                custom={i % 4}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.08 }}
                role="listitem"
              >
                <div
                  className="nc-notice-row__bar"
                  style={{ background: colors.text }}
                  aria-hidden="true"
                />

                <div
                  className="nc-notice-row__icon-wrap"
                  style={{ background: colors.bg, border: `1px solid ${colors.border}` }}
                  aria-hidden="true"
                >
                  <FiFileText size={18} style={{ color: colors.text }} />
                </div>

                <div className="nc-notice-row__content">
                  <div className="nc-notice-row__meta">
                    <span
                      className="nc-notice-type-pill"
                      style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
                    >
                      {notice.type}
                    </span>
                    {notice.isNew && (
                      <span className="nc-notice-new-badge">{t.newBadge}</span>
                    )}
                    <span className="nc-date" style={{ marginLeft: 'auto' }}>
                      <FiCalendar size={11} aria-hidden="true" /> {formatDate(notice.date)}
                    </span>
                  </div>

                  <p className="nc-notice-row__ref" style={{ fontFamily: font }}>{notice.ref}</p>
                  <h3 className="nc-notice-row__title" style={{ fontFamily: font }}>
                    {(lang === 'si' && notice.titleSi) || (lang === 'ta' && notice.titleTa) || notice.title}
                  </h3>

                  {notice.deadline && formatDate(notice.deadline) && (
                    <p className="nc-notice-row__deadline" style={{ fontFamily: font }}>
                      Closing Date: <strong>{formatDate(notice.deadline)}</strong>
                    </p>
                  )}
                </div>

                <div className="nc-notice-row__actions">
                  <button
                    className={`nc-btn-dl ${notice.fileUrl ? '' : 'nc-btn-dl--disabled'}`}
                    onClick={() => notice.fileUrl ? openSignedUrl(notice.fileUrl, false) : null}
                    style={{ fontFamily: font }}
                    aria-label="View document"
                    disabled={!notice.fileUrl}
                    title={notice.fileUrl ? 'View document' : 'No document link available'}
                  >
                    <FiExternalLink size={13} aria-hidden="true" />
                    <span>View</span>
                  </button>
                  {canDownload(notice) && (
                    <button
                      className="nc-btn-dl"
                      onClick={() => openSignedUrl(notice.fileUrl, true, notice.fileName)}
                      style={{ fontFamily: font }}
                      aria-label={t.noticeDl}
                    >
                      <FiDownload size={13} aria-hidden="true" />
                      <span>{t.download}</span>
                    </button>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

/* ── Footer ribbon ───────────────────────────────────────────────────────── */
function PageFooterRibbon() {
  return (
    <div className="nc-footer-ribbon" aria-hidden="true">
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ width: '100%', height: 80, display: 'block' }}>
        <defs>
          <linearGradient id="ncRibbon" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#7A5A10" stopOpacity="0.8" />
            <stop offset="50%"  stopColor={GOLD}    stopOpacity="0.65" />
            <stop offset="100%" stopColor="#7A5A10" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <path d="M-40,55 Q360,12 800,38 Q1100,58 1480,18 L1480,80 L-40,80 Z" fill="url(#ncRibbon)" />
        <path d="M-40,65 Q300,28 720,48 Q1080,65 1480,32 L1480,80 L-40,80 Z" fill={MAROON} />
      </svg>
    </div>
  )
}

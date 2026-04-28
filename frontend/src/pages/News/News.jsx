import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import {
  FiCalendar, FiArrowRight, FiDownload, FiExternalLink,
  FiSearch, FiX, FiChevronLeft, FiChevronRight, FiEye,
  FiFileText, FiBell, FiImage,
} from 'react-icons/fi'
import { HiOutlineNewspaper } from 'react-icons/hi'
import { useInView } from 'react-intersection-observer'
import './News.css'

/* ── Brand tokens ──────────────────────────────────────────────────────────── */
const MAROON = '#4A0918'
const GOLD   = '#C79A2B'
const CREAM  = '#FCFBFA'

/* ── i18n ──────────────────────────────────────────────────────────────────── */
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

/* ── Mock data ─────────────────────────────────────────────────────────────── */
const NEWS_ITEMS = [
  {
    id: 1,
    featured: true,
    category: 'Development',
    date: '2026-04-18',
    title: 'Southern Province Annual Development Review 2025/2026',
    excerpt: 'The Planning Secretariat concluded its annual review highlighting key achievements across infrastructure, social welfare, and economic development sectors throughout the Southern Province.',
    image: '/branding/hero.jpeg',
    tag: 'New',
  },
  {
    id: 2,
    category: 'Infrastructure',
    date: '2026-04-14',
    title: 'New Road Development Projects Approved for Hambantota District',
    excerpt: 'A total of 12 road development projects covering over 85 km have been approved under the provincial infrastructure fund for Hambantota district.',
    image: '/branding/hero2.jpeg',
    tag: null,
  },
  {
    id: 3,
    category: 'Planning',
    date: '2026-04-10',
    title: 'Strategic Planning Workshop Held for District Officers',
    excerpt: 'District planning officers attended a two-day workshop on integrated strategic planning methodologies aligned with national development goals.',
    image: '/branding/hero3.jpeg',
    tag: null,
  },
  {
    id: 4,
    category: 'Community',
    date: '2026-04-05',
    title: 'Community Development Fund Disbursement — Q1 2026',
    excerpt: 'Over LKR 45 million has been disbursed to 38 community projects across the three districts of the Southern Province in Q1 2026.',
    image: '/branding/hero.jpeg',
    tag: null,
  },
  {
    id: 5,
    category: 'Environment',
    date: '2026-03-28',
    title: 'Environmental Impact Assessment for Coastal Development',
    excerpt: 'The Secretariat has commissioned a comprehensive EIA for proposed coastal development zones in Galle and Matara districts.',
    image: '/branding/hero2.jpeg',
    tag: null,
  },
  {
    id: 6,
    category: 'Development',
    date: '2026-03-22',
    title: 'Provincial Budget Allocation 2026/2027 Announced',
    excerpt: 'The Provincial Planning Secretariat announces the development budget allocation for fiscal year 2026/2027 with a 14% increase from the previous year.',
    image: '/branding/hero3.jpeg',
    tag: null,
  },
]

const GALLERY_ITEMS = [
  { id: 1,  caption: 'Annual Planning Review — April 2026',          image: '/branding/hero.jpeg',  span: 'wide' },
  { id: 2,  caption: 'District Officers Workshop',                   image: '/branding/hero2.jpeg', span: 'tall' },
  { id: 3,  caption: 'Community Engagement Program — Hambantota',    image: '/branding/hero3.jpeg', span: 'normal' },
  { id: 4,  caption: 'Secretariat Headquarters — Galle',             image: '/branding/hero.jpeg',  span: 'normal' },
  { id: 5,  caption: 'Southern Province Infrastructure Tour 2026',   image: '/branding/hero2.jpeg', span: 'wide' },
  { id: 6,  caption: 'Environmental Monitoring Field Visit',         image: '/branding/hero3.jpeg', span: 'normal' },
  { id: 7,  caption: 'Public Consultation Meeting — Matara',         image: '/branding/hero.jpeg',  span: 'normal' },
  { id: 8,  caption: 'Budget Review Committee Session',              image: '/branding/hero2.jpeg', span: 'normal' },
]

const NOTICES = [
  {
    id: 1,
    type: 'Circular',
    date: '2026-04-22',
    ref: 'SPPS/CIR/2026/014',
    title: 'Annual Performance Appraisal — Submission Guidelines for 2025/2026',
    isNew: true,
    fileSize: '1.2 MB',
    fileType: 'PDF',
  },
  {
    id: 3,
    type: 'Notice',
    date: '2026-04-15',
    ref: 'SPPS/NOT/2026/031',
    title: 'Public Notice: Land Use Planning Consultation — Galle District',
    isNew: false,
    fileSize: '620 KB',
    fileType: 'PDF',
  },
  {
    id: 4,
    type: 'Circular',
    date: '2026-04-08',
    ref: 'SPPS/CIR/2026/013',
    title: 'Updated Work-from-Home Policy for Provincial Staff — April 2026',
    isNew: false,
    fileSize: '480 KB',
    fileType: 'PDF',
  },
  {
    id: 6,
    type: 'Notice',
    date: '2026-03-26',
    ref: 'SPPS/NOT/2026/030',
    title: 'Vacancy Announcement — Assistant Director (Planning), Grade I',
    isNew: false,
    fileSize: '540 KB',
    fileType: 'PDF',
    deadline: '2026-04-20',
  },
  {
    id: 7,
    type: 'Circular',
    date: '2026-03-18',
    ref: 'SPPS/CIR/2026/012',
    title: 'Official Gazette Notification — Revised Salary Scales 2026',
    isNew: false,
    fileSize: '920 KB',
    fileType: 'PDF',
  },
  {
    id: 8,
    type: 'Notice',
    date: '2026-03-12',
    ref: 'SPPS/NOT/2026/029',
    title: 'Environmental Clearance Application — Southern Expressway Extension',
    isNew: false,
    fileSize: '2.4 MB',
    fileType: 'PDF',
  },
]

const CATEGORIES = ['All Categories', 'Development', 'Infrastructure', 'Planning', 'Community', 'Environment']
const NOTICE_TYPES = ['All', 'Circular', 'Notice']

const NOTICE_TYPE_COLORS = {
  Circular: { bg: 'rgba(74,9,24,0.10)',    text: MAROON,    border: 'rgba(74,9,24,0.22)'    },
  Notice:   { bg: 'rgba(154,117,32,0.10)', text: '#9A7520', border: 'rgba(154,117,32,0.30)' },
}

/* ── Animation variants ─────────────────────────────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] },
  }),
}

const tabContent = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, y: -12, transition: { duration: 0.22, ease: [0.4, 0, 1, 1] } },
}

/* ── Helpers ─────────────────────────────────────────────────────────────────── */
function formatDate(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  if (isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

function DiamondDivider() {
  return (
    <div className="nc-divider">
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
      {Icon && <Icon size={13} style={{ color: GOLD }} />}
      <span>{label}</span>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════════════
   PAGE ROOT
══════════════════════════════════════════════════════════════════════════════ */
const VALID_TABS = ['news', 'gallery', 'notices']

export default function News() {
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

  return (
    <div className="nc-page" style={{ background: CREAM, fontFamily: font }}>
      <MediaHero t={t} font={font} />
      <TabNav activeTab={activeTab} setActiveTab={setActiveTab} t={t} font={font} />
      <div className="nc-tab-body">
        <AnimatePresence mode="wait">
          {activeTab === 'news' && (
            <motion.div key="news" variants={tabContent} initial="hidden" animate="visible" exit="exit">
              <NewsSection t={t} font={font} />
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
  )
}

/* ══════════════════════════════════════════════════════════════════════════════
   HERO  — split composition
══════════════════════════════════════════════════════════════════════════════ */
function MediaHero({ t, font }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section ref={ref} className="nc-hero" style={{ fontFamily: font }}>
      <div className="nc-hero__bg" />
      <div className="nc-hero__pattern" />
      <div className="nc-hero__watermark" aria-hidden>MEDIA</div>

      <div className="nc-hero__center">
        <motion.div
          className="nc-hero__eyebrow"
          initial={{ opacity: 0, y: -12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="nc-hero__dot" />
          <span style={{ fontFamily: font }}>{t.heroSub}</span>
        </motion.div>

        <motion.h1
          className="nc-hero__title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          {t.heroTitle}
        </motion.h1>

        <motion.div
          className="nc-hero__rule"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        />

        <motion.p
          className="nc-hero__body"
          style={{ fontFamily: font }}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
        >
          {t.heroBody}
        </motion.p>

        <motion.div
          className="nc-hero__quick"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
        >
          {[t.tabNews, t.tabGallery, t.tabNotices].map((label, i) => (
            <span key={i} className="nc-hero__quick-pill" style={{ fontFamily: font }}>{label}</span>
          ))}
        </motion.div>
      </div>

      <svg className="nc-hero__wave" viewBox="0 0 1440 60" preserveAspectRatio="none">
        <path d="M0,60 Q360,8 720,32 Q1080,56 1440,12 L1440,60 Z" fill="#F7F0E6" />
      </svg>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════════════════════
   TAB NAVIGATION
══════════════════════════════════════════════════════════════════════════════ */
function TabNav({ activeTab, setActiveTab, t, font }) {
  const tabs = [
    { id: 'news',    label: t.tabNews,    icon: HiOutlineNewspaper },
    { id: 'gallery', label: t.tabGallery, icon: FiImage },
    { id: 'notices', label: t.tabNotices, icon: FiBell },
  ]

  return (
    <div className="nc-tabnav">
      <div className="nc-tabnav__inner">
        {tabs.map(({ id, label, icon: Icon }) => {
          const active = activeTab === id
          return (
            <button
              key={id}
              className={`nc-tabnav__btn ${active ? 'nc-tabnav__btn--active' : ''}`}
              onClick={() => setActiveTab(id)}
              style={{ fontFamily: font }}
            >
              <Icon size={16} />
              <span>{label}</span>
              {active && (
                <motion.span
                  layoutId="tab-indicator"
                  className="nc-tabnav__indicator"
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════════════
   NEWS SECTION
══════════════════════════════════════════════════════════════════════════════ */
function NewsSection({ t, font }) {
  const [query, setQuery]         = useState('')
  const [activeCat, setActiveCat] = useState('All Categories')

  const filtered = NEWS_ITEMS.filter(n => {
    const matchCat = activeCat === 'All Categories' || n.category === activeCat
    const matchQ   = !query || n.title.toLowerCase().includes(query.toLowerCase())
    return matchCat && matchQ
  })

  const featured = filtered.find(n => n.featured)
  const rest     = filtered.filter(n => !n.featured)

  return (
    <section className="nc-section">
      <div className="nc-section__inner">

        {/* Toolbar */}
        <div className="nc-news-toolbar">
          <div className="nc-search">
            <FiSearch size={15} className="nc-search__icon" />
            <input
              className="nc-search__input"
              style={{ fontFamily: font }}
              placeholder={t.searchPh}
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            {query && (
              <button className="nc-search__clear" onClick={() => setQuery('')}>
                <FiX size={13} />
              </button>
            )}
          </div>
          <div className="nc-cats">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`nc-cats__btn ${activeCat === cat ? 'nc-cats__btn--active' : ''}`}
                style={{ fontFamily: font }}
                onClick={() => setActiveCat(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured article */}
        {featured && (
          <motion.div
            className="nc-featured"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <div className="nc-featured__img-wrap">
              <img
                src={featured.image}
                alt={featured.title}
                className="nc-featured__img"
                onError={e => { e.currentTarget.style.opacity = '0' }}
              />
              <div className="nc-featured__img-overlay" />
              <span className="nc-featured__badge">{t.featured}</span>
            </div>
            <div className="nc-featured__body">
              <div className="nc-featured__meta">
                <span className="nc-cat-pill">{featured.category}</span>
                <span className="nc-date"><FiCalendar size={11} /> {formatDate(featured.date)}</span>
              </div>
              <h2 className="nc-featured__title" style={{ fontFamily: font }}>{featured.title}</h2>
              <p className="nc-featured__excerpt" style={{ fontFamily: font }}>{featured.excerpt}</p>
              <button className="nc-btn-primary" style={{ fontFamily: font }}>
                {t.readMore} <FiArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        )}

        <DiamondDivider />
        <SectionLabel icon={HiOutlineNewspaper} label="Latest Updates" />

        {/* Grid */}
        <div className="nc-news-grid">
          {rest.map((item, i) => (
            <motion.article
              key={item.id}
              className="nc-news-card"
              variants={fadeUp}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
            >
              <div className="nc-news-card__img-wrap">
                <img
                  src={item.image}
                  alt={item.title}
                  className="nc-news-card__img"
                  onError={e => { e.currentTarget.style.opacity = '0' }}
                />
                <div className="nc-news-card__img-overlay" />
                <span className="nc-cat-pill nc-cat-pill--over">{item.category}</span>
              </div>
              <div className="nc-news-card__body">
                <span className="nc-date"><FiCalendar size={11} /> {formatDate(item.date)}</span>
                <h3 className="nc-news-card__title" style={{ fontFamily: font }}>{item.title}</h3>
                <p className="nc-news-card__excerpt" style={{ fontFamily: font }}>{item.excerpt}</p>
                <button className="nc-news-card__link" style={{ fontFamily: font }}>
                  {t.readMore} <FiArrowRight size={12} />
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="nc-load-more-row">
          <button className="nc-btn-outline" style={{ fontFamily: font }}>
            {t.loadMore} <FiArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════════════════════
   GALLERY SECTION
══════════════════════════════════════════════════════════════════════════════ */
const SPAN_CYCLE = ['wide', 'normal', 'tall', 'normal', 'normal', 'wide']

/* ── Album viewer — full-screen slideshow for a single CMS album ── */
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

  if (!images.length) return null

  return (
    <motion.div
      className="nc-lightbox"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={onClose}
    >
      <motion.div
        className="nc-lightbox__card"
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        onClick={e => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={idx}
            src={images[idx]}
            alt={caption}
            className="nc-lightbox__img"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.22 }}
          />
        </AnimatePresence>

        <div className="nc-lightbox__footer">
          <p className="nc-lightbox__caption" style={{ fontFamily: font }}>{caption}</p>
          <span className="nc-lightbox__counter">{idx + 1} / {images.length}</span>
        </div>

        {/* Dot strip */}
        {images.length > 1 && (
          <div style={{
            position: 'absolute', bottom: 54, left: '50%', transform: 'translateX(-50%)',
            display: 'flex', gap: 6, zIndex: 2,
          }}>
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setIdx(i) }}
                style={{
                  width: i === idx ? 18 : 7, height: 7, borderRadius: 4,
                  background: i === idx ? '#fff' : 'rgba(255,255,255,0.38)',
                  border: 'none', padding: 0, cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              />
            ))}
          </div>
        )}

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div style={{
            position: 'absolute', bottom: 70, left: '50%', transform: 'translateX(-50%)',
            display: 'none',
          }} />
        )}

        <button className="nc-lightbox__close" onClick={onClose} aria-label={t.closeLight}>
          <FiX size={18} />
        </button>
        {images.length > 1 && (
          <>
            <button className="nc-lightbox__prev" onClick={prev} aria-label={t.prevImg}>
              <FiChevronLeft size={22} />
            </button>
            <button className="nc-lightbox__next" onClick={next} aria-label={t.nextImg}>
              <FiChevronRight size={22} />
            </button>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}

function GallerySection({ t, font }) {
  const [lightboxIdx,  setLightboxIdx]  = useState(null)
  const [albumViewer,  setAlbumViewer]  = useState(null)  // CMS album object
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

  const allItems = useMemo(() => [...cmsItems, ...GALLERY_ITEMS], [cmsItems])

  const openItem = (item) => {
    if (item.isAlbum) {
      setAlbumViewer(item.albumData)
    } else {
      const flatIdx = allItems.findIndex(x => x.id === item.id)
      setLightboxIdx(flatIdx)
    }
  }

  const closeLight  = () => setLightboxIdx(null)
  const closeAlbum  = () => setAlbumViewer(null)

  // Regular lightbox only navigates through non-album items
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
  }, [lightboxIdx, prevLight, nextLight])

  const getCaption = (item) => {
    if (!item) return ''
    if (font.includes('Sinhala') && item.captionSi) return item.captionSi
    if (font.includes('Tamil')   && item.captionTa) return item.captionTa
    return item.caption
  }

  return (
    <section className="nc-section">
      <div className="nc-section__inner">
        <SectionLabel icon={FiImage} label="Photo Gallery" />

        <div className="nc-gallery-grid">
          {allItems.map((item, i) => (
            <motion.div
              key={item.id}
              className={`nc-gallery-item nc-gallery-item--${item.span}`}
              variants={fadeUp}
              custom={i % 4}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              onClick={() => openItem(item)}
            >
              <img
                src={item.image}
                alt={getCaption(item)}
                className="nc-gallery-item__img"
                onError={e => { e.currentTarget.style.opacity = '0' }}
              />
              <div className="nc-gallery-item__overlay">
                <div className="nc-gallery-item__icon">
                  <FiEye size={20} style={{ color: '#fff' }} />
                </div>
                <p className="nc-gallery-item__caption" style={{ fontFamily: font }}>{getCaption(item)}</p>
              </div>
              {/* Album badge */}
              {item.isAlbum && item.photoCount > 0 && (
                <div style={{
                  position: 'absolute', top: 10, right: 10,
                  background: 'rgba(0,0,0,0.52)', backdropFilter: 'blur(4px)',
                  borderRadius: 6, padding: '3px 8px',
                  display: 'flex', alignItems: 'center', gap: 4,
                  fontSize: '0.65rem', fontWeight: 700, color: '#fff',
                  pointerEvents: 'none',
                }}>
                  <FiImage size={10} /> {item.photoCount}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="nc-load-more-row">
          <button className="nc-btn-outline" style={{ fontFamily: font }}>
            {t.loadMore} <FiArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Album viewer */}
      <AnimatePresence>
        {albumViewer && (
          <AlbumViewer album={albumViewer} font={font} t={t} onClose={closeAlbum} />
        )}
      </AnimatePresence>

      {/* Regular lightbox */}
      <AnimatePresence>
        {lightItem && !lightItem.isAlbum && (
          <motion.div
            className="nc-lightbox"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={closeLight}
          >
            <motion.div
              className="nc-lightbox__card"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
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
                <FiX size={18} />
              </button>
              <button className="nc-lightbox__prev" onClick={prevLight} aria-label={t.prevImg}>
                <FiChevronLeft size={22} />
              </button>
              <button className="nc-lightbox__next" onClick={nextLight} aria-label={t.nextImg}>
                <FiChevronRight size={22} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

// Open a provided attachment URL directly (Drive/Dropbox/OneDrive links)
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

// Check if user can download based on permissions
function canDownload(notice) {
  if (!notice.fileUrl) return false
  const access = notice.downloadAccess || 'Everyone'
  if (access === 'Everyone') return true
  if (access === 'RegisteredOnly') {
    // Check if user is logged in (CMS session)
    return !!sessionStorage.getItem('cms_auth')
  }
  if (access === 'AdminOnly') {
    // Only admins can download
    return !!sessionStorage.getItem('cms_auth')
  }
  return false
}

/* ══════════════════════════════════════════════════════════════════════════════
   NOTICES SECTION
══════════════════════════════════════════════════════════════════════════════ */
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

  const allNotices = [...cmsNotices, ...NOTICES]

  const filtered = allNotices.filter(n =>
    activeType === 'All' || n.type === activeType
  )

  return (
    <section className="nc-section">
      <div className="nc-section__inner">
        <SectionLabel icon={FiBell} label="Official Notices" />

        {/* Type filter */}
        <div className="nc-notice-filter">
          {NOTICE_TYPES.map(type => (
            <button
              key={type}
              className={`nc-cats__btn ${activeType === type ? 'nc-cats__btn--active' : ''}`}
              style={{ fontFamily: font }}
              onClick={() => setActiveType(type)}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Notice list */}
        <div className="nc-notice-list">
          {filtered.map((notice, i) => {
            const colors = NOTICE_TYPE_COLORS[notice.type] || NOTICE_TYPE_COLORS.Notice
            return (
              <motion.div
                key={notice.id}
                className={`nc-notice-row ${notice.isNew ? 'nc-notice-row--new' : ''}`}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                {/* Left accent bar */}
                <div className="nc-notice-row__bar" style={{ background: colors.text }} />

                {/* Icon */}
                <div className="nc-notice-row__icon-wrap"
                  style={{ background: colors.bg, border: `1px solid ${colors.border}` }}>
                  <FiFileText size={18} style={{ color: colors.text }} />
                </div>

                {/* Content */}
                <div className="nc-notice-row__content">
                  <div className="nc-notice-row__meta">
                    <span className="nc-notice-type-pill"
                      style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}>
                      {notice.type}
                    </span>
                    {notice.isNew && (
                      <span className="nc-notice-new-badge">{t.newBadge}</span>
                    )}
                    <span className="nc-date" style={{ marginLeft: 'auto' }}>
                      <FiCalendar size={11} /> {formatDate(notice.date)}
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

                {/* Actions */}
                <div className="nc-notice-row__actions">
                  <button
                    className={`nc-btn-dl ${notice.fileUrl ? '' : 'nc-btn-dl--disabled'}`}
                    onClick={() => notice.fileUrl ? openSignedUrl(notice.fileUrl, false) : null}
                    style={{ fontFamily: font }}
                    aria-label="View document"
                    disabled={!notice.fileUrl}
                    title={notice.fileUrl ? 'View document' : 'No document link available'}
                  >
                    <FiExternalLink size={14} />
                    <span>View document</span>
                  </button>
                  {canDownload(notice) && (
                      <button
                        className="nc-btn-dl"
                        onClick={() => openSignedUrl(notice.fileUrl, true, notice.fileName)}
                        style={{ fontFamily: font, background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
                        aria-label={t.noticeDl}
                      >
                        <FiDownload size={14} />
                        <span>{t.download}</span>
                      </button>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="nc-load-more-row">
          <button className="nc-btn-outline" style={{ fontFamily: font }}>
            {t.loadMore} <FiArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  )
}

/* ── Decorative helpers ──────────────────────────────────────────────────────── */
function PageFooterRibbon() {
  return (
    <div className="nc-footer-ribbon">
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


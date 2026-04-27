import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FiCalendar, FiArrowRight, FiDownload, FiExternalLink,
  FiSearch, FiX, FiChevronLeft, FiChevronRight, FiEye,
  FiFileText, FiBell, FiImage, FiTag,
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
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
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
export default function News() {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en')
  const [activeTab, setActiveTab] = useState('news')

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
              <NoticesSection t={t} font={font} />
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
        <path d="M0,60 Q360,8 720,32 Q1080,56 1440,12 L1440,60 Z" fill={CREAM} />
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
function GallerySection({ t, font }) {
  const [lightboxIdx, setLightboxIdx] = useState(null)

  const open  = (i) => setLightboxIdx(i)
  const close = () => setLightboxIdx(null)
  const prev  = useCallback(() => setLightboxIdx(i => (i - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length), [])
  const next  = useCallback(() => setLightboxIdx(i => (i + 1) % GALLERY_ITEMS.length), [])

  useEffect(() => {
    if (lightboxIdx === null) return
    const h = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [lightboxIdx, prev, next])

  return (
    <section className="nc-section">
      <div className="nc-section__inner">
        <SectionLabel icon={FiImage} label="Photo Gallery" />

        <div className="nc-gallery-grid">
          {GALLERY_ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              className={`nc-gallery-item nc-gallery-item--${item.span}`}
              variants={fadeUp}
              custom={i % 4}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              onClick={() => open(i)}
            >
              <img
                src={item.image}
                alt={item.caption}
                className="nc-gallery-item__img"
                onError={e => { e.currentTarget.style.opacity = '0' }}
              />
              <div className="nc-gallery-item__overlay">
                <div className="nc-gallery-item__icon">
                  <FiEye size={20} style={{ color: '#fff' }} />
                </div>
                <p className="nc-gallery-item__caption" style={{ fontFamily: font }}>{item.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="nc-load-more-row">
          <button className="nc-btn-outline" style={{ fontFamily: font }}>
            {t.loadMore} <FiArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            className="nc-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={close}
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
                src={GALLERY_ITEMS[lightboxIdx].image}
                alt={GALLERY_ITEMS[lightboxIdx].caption}
                className="nc-lightbox__img"
              />
              <div className="nc-lightbox__footer">
                <p className="nc-lightbox__caption" style={{ fontFamily: font }}>
                  {GALLERY_ITEMS[lightboxIdx].caption}
                </p>
                <span className="nc-lightbox__counter">
                  {lightboxIdx + 1} / {GALLERY_ITEMS.length}
                </span>
              </div>

              <button className="nc-lightbox__close" onClick={close} aria-label={t.closeLight}>
                <FiX size={18} />
              </button>
              <button className="nc-lightbox__prev" onClick={prev} aria-label={t.prevImg}>
                <FiChevronLeft size={22} />
              </button>
              <button className="nc-lightbox__next" onClick={next} aria-label={t.nextImg}>
                <FiChevronRight size={22} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════════════════════
   NOTICES SECTION
══════════════════════════════════════════════════════════════════════════════ */
function NoticesSection({ t, font }) {
  const [activeType, setActiveType] = useState('All')

  const filtered = NOTICES.filter(n =>
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
                  <h3 className="nc-notice-row__title" style={{ fontFamily: font }}>{notice.title}</h3>

                  {notice.deadline && (
                    <p className="nc-notice-row__deadline" style={{ fontFamily: font }}>
                      Closing Date: <strong>{formatDate(notice.deadline)}</strong>
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="nc-notice-row__actions">
                  <span className="nc-notice-row__size">{notice.fileSize} · {notice.fileType}</span>
                  <button className="nc-btn-dl" style={{ fontFamily: font }} aria-label={t.noticeDl}>
                    <FiDownload size={14} />
                    <span>{t.download}</span>
                  </button>
                  <button className="nc-btn-icon" aria-label="View">
                    <FiExternalLink size={14} />
                  </button>
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

function HoneycombSVG() {
  const r = 16, hx = r * Math.sqrt(3), vy = r * 1.5
  const cells = []
  for (let row = 0; row < 10; row++)
    for (let col = 0; col < 5; col++) {
      const cx = col * hx + (row % 2 ? hx / 2 : 0) + r
      const cy = row * vy + r
      const pts = Array.from({ length: 6 }, (_, k) => {
        const a = (Math.PI / 180) * (60 * k)
        return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`
      }).join(' ')
      cells.push(<polygon key={`${row}-${col}`} points={pts} stroke={GOLD} strokeWidth="1" fill="none" />)
    }
  const W = 5 * hx + r + 4, H = 9 * vy + r * 2 + 4
  return <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none">{cells}</svg>
}

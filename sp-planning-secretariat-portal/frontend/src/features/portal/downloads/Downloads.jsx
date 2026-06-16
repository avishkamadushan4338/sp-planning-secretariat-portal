import { useState, useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePageHold } from '@/shared/hooks/usePageHold'
import ComingSoon from '@/shared/components/ComingSoon'
import { SeoHead } from '@/shared/seo'
import {
  FiDownload, FiSearch, FiFilter, FiFile,
  FiGrid, FiList, FiExternalLink,
  FiCalendar, FiTag, FiChevronDown, FiX, FiAlertCircle,
  FiInbox,
} from 'react-icons/fi'
import {
  HiOutlineDocumentText, HiOutlineDocumentReport,
  HiOutlineDocument, HiOutlineDocumentDuplicate,
} from 'react-icons/hi'
import { useInView } from 'react-intersection-observer'
import './Downloads.css'

/* ── Brand tokens ─────────────────────────────────────────────────────────── */
const GOLD   = '#C79A2B'

/* ── Language meta ────────────────────────────────────────────────────────── */
const LANG_META = {
  en: { font: 'Inter, sans-serif',               headFont: "'Cinzel', 'Playfair Display', Georgia, serif", isNonLatin: false },
  si: { font: "'Noto Sans Sinhala', sans-serif", headFont: "'Noto Sans Sinhala', sans-serif",              isNonLatin: true  },
  ta: { font: "'Noto Sans Tamil', sans-serif",   headFont: "'Noto Sans Tamil', sans-serif",                isNonLatin: true  },
}

/* ── Translations ─────────────────────────────────────────────────────────── */
const T = {
  en: {
    heroAccent:    'Southern Province Planning Secretariat',
    pageTitle:     'Downloads',
    pageSub:       'Official documents, circulars, forms, reports and public resources',
    searchPh:      'Search documents, circulars, forms…',
    filterLabel:   'Category',
    sortLabel:     'Sort by',
    typeLabel:     'File Type',
    resultsOf:     'of',
    resultsFound:  'documents found',
    noResults:     'No documents match your search.',
    noResultsSub:  'Try adjusting your filters or search terms.',
    emptyState:    'No downloads available yet.',
    emptyStateSub: 'Check back soon — documents will appear here once published.',
    badgeNew:      'New',
    btnDownload:   'Download',
    btnPreview:    'Preview',
    lblCategory:   'Category',
    lblFileType:   'File Type',
    lblDate:       'Published',
    allCats:       'All',
    allTypes:      'All Types',
    sortNewest:    'Newest First',
    sortOldest:    'Oldest First',
    sortAZ:        'A – Z',
    cats: ['All', 'Circulars', 'Forms', 'Reports', 'Notices', 'Guidelines', 'Applications', 'Other'],
    types: ['All Types', 'PDF', 'DOC/DOCX', 'XLS/XLSX', 'Images', 'Other'],
    gridView:      'Grid view',
    listView:      'List view',
    clearFilters:  'Clear filters',
  },
  si: {
    heroAccent:    'දකුණු පළාත් සැලසුම් ලේකම් කාර්යාලය',
    pageTitle:     'බාගැනීම්',
    pageSub:       'නිල ලේඛන, චක්‍රලේඛ, ෆෝරම, වාර්තා සහ පොදු සම්පත්',
    searchPh:      'ලේඛන, චක්‍රලේඛ, ෆෝරම සොයන්න…',
    filterLabel:   'ප්‍රවර්ගය',
    sortLabel:     'අනුව වර්ග කරන්න',
    typeLabel:     'ගොනු වර්ගය',
    resultsOf:     'න්',
    resultsFound:  'ලේඛන හමු විය',
    noResults:     'ඔබගේ සෙවීමට ගැළපෙන ලේඛන නොමැත.',
    noResultsSub:  'ෆිල්ටර හෝ සෙවුම් පද සකස් කිරීමට උත්සාහ කරන්න.',
    emptyState:    'තවම බාගැනීම් නොමැත.',
    emptyStateSub: 'ලේඛන ප්‍රකාශිත වූ පසු මෙහි දිස් වනු ඇත.',
    badgeNew:      'නව',
    btnDownload:   'බාගන්න',
    btnPreview:    'පෙරදසුන',
    lblCategory:   'ප්‍රවර්ගය',
    lblFileType:   'ගොනු වර්ගය',
    lblDate:       'ප්‍රකාශිතයි',
    allCats:       'සියල්ල',
    allTypes:      'සියලු වර්ග',
    sortNewest:    'අලුත්ම පළමු',
    sortOldest:    'පැරණිම පළමු',
    sortAZ:        'A – Z',
    cats: ['සියල්ල', 'චක්‍රලේඛ', 'ෆෝරම', 'වාර්තා', 'නිවේදන', 'මාර්ගෝපදේශ', 'අයදුම්පත්', 'වෙනත්'],
    types: ['සියලු වර්ග', 'PDF', 'DOC/DOCX', 'XLS/XLSX', 'රූප', 'වෙනත්'],
    gridView:      'ජාල දර්ශනය',
    listView:      'ලැයිස්තු දර්ශනය',
    clearFilters:  'පෙරහන් හිස් කරන්න',
  },
  ta: {
    heroAccent:    'தென் மாகாண திட்டமிடல் செயலகம்',
    pageTitle:     'பதிவிறக்கங்கள்',
    pageSub:       'அதிகாரப்பூர்வ ஆவணங்கள், சுற்றறிக்கைகள், படிவங்கள், அறிக்கைகள் மற்றும் பொது வளங்கள்',
    searchPh:      'ஆவணங்கள், சுற்றறிக்கைகள், படிவங்கள் தேடுக…',
    filterLabel:   'வகை',
    sortLabel:     'வரிசைப்படுத்து',
    typeLabel:     'கோப்பு வகை',
    resultsOf:     'இல்',
    resultsFound:  'ஆவணங்கள் கண்டறியப்பட்டன',
    noResults:     'உங்கள் தேடலுக்கு பொருந்தும் ஆவணங்கள் இல்லை.',
    noResultsSub:  'வடிகட்டிகளை அல்லது தேடல் சொற்களை சரிசெய்யவும்.',
    emptyState:    'இன்னும் பதிவிறக்கங்கள் இல்லை.',
    emptyStateSub: 'ஆவணங்கள் வெளியிடப்பட்டதும் இங்கே தோன்றும்.',
    badgeNew:      'புதியது',
    btnDownload:   'பதிவிறக்கு',
    btnPreview:    'முன்னோட்டம்',
    lblCategory:   'வகை',
    lblFileType:   'கோப்பு வகை',
    lblDate:       'வெளியிடப்பட்டது',
    allCats:       'அனைத்தும்',
    allTypes:      'அனைத்து வகைகள்',
    sortNewest:    'புதியது முதலில்',
    sortOldest:    'பழையது முதலில்',
    sortAZ:        'A – Z',
    cats: ['அனைத்தும்', 'சுற்றறிக்கைகள்', 'படிவங்கள்', 'அறிக்கைகள்', 'அறிவிப்புகள்', 'வழிகாட்டுதல்கள்', 'விண்ணப்பங்கள்', 'மற்றவை'],
    types: ['அனைத்து வகைகள்', 'PDF', 'DOC/DOCX', 'XLS/XLSX', 'படங்கள்', 'மற்றவை'],
    gridView:      'கட்டம் காட்சி',
    listView:      'பட்டியல் காட்சி',
    clearFilters:  'வடிகட்டிகளை அழி',
  },
}

/* ── Category → English key map ──────────────────────────────────────────── */
const CAT_EN = ['All', 'Circulars', 'Forms', 'Reports', 'Notices', 'Guidelines', 'Applications', 'Other']
const TYPE_EN = ['All Types', 'PDF', 'DOC/DOCX', 'XLS/XLSX', 'Images', 'Other']

/* ── File type helpers ────────────────────────────────────────────────────── */
function getFileTypeGroup(fileType = '') {
  const ft = fileType.toUpperCase()
  if (ft === 'PDF') return 'PDF'
  if (ft === 'DOC' || ft === 'DOCX') return 'DOC/DOCX'
  if (ft === 'XLS' || ft === 'XLSX') return 'XLS/XLSX'
  if (['PNG', 'JPG', 'JPEG', 'GIF', 'WEBP', 'SVG'].includes(ft)) return 'Images'
  return 'Other'
}

function FileIcon({ fileType, size = 22 }) {
  const ft = (fileType || '').toUpperCase()
  const color = ft === 'PDF' ? '#e74c3c' : ft === 'DOC' || ft === 'DOCX' ? '#2980b9' : ft === 'XLS' || ft === 'XLSX' ? '#27ae60' : GOLD
  if (ft === 'PDF') return <HiOutlineDocumentReport style={{ color, fontSize: size }} />
  if (ft === 'DOC' || ft === 'DOCX') return <HiOutlineDocumentText style={{ color, fontSize: size }} />
  if (ft === 'XLS' || ft === 'XLSX') return <HiOutlineDocumentDuplicate style={{ color, fontSize: size }} />
  return <HiOutlineDocument style={{ color: GOLD, fontSize: size }} />
}

/* ── "New" badge threshold: 14 days ─────────────────────────────────────── */
function isNew(dateStr) {
  if (!dateStr) return false
  const diff = Date.now() - new Date(dateStr).getTime()
  return diff < 14 * 24 * 60 * 60 * 1000
}


/* ── Format date ─────────────────────────────────────────────────────────── */
function fmtDate(dateStr) {
  if (!dateStr) return '—'
  try {
    return new Date(dateStr).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
  } catch { return dateStr }
}

/* ── Check download access ────────────────────────────────────────────────── */
/* ── BroadcastChannel for cross-tab sync ─────────────────────────────────── */
const _bc = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('cms_downloads') : null

/* ── Load downloads from localStorage ────────────────────────────────────── */
function loadDownloads() {
  try {
    const raw = localStorage.getItem('cms_downloads')
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch { return [] }
}

/* ── Honeycomb SVG for Downloads hero ────────────────────────────────────── */
function DlHoneycomb() {
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

/* ═══════════════════════════════════════════════════════════════════════════
   HERO SECTION  — dark split layout (Contact style)
═══════════════════════════════════════════════════════════════════════════ */
function DownloadsHero({ lang }) {
  const t  = T[lang]  || T.en
  const lm = LANG_META[lang] || LANG_META.en
  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.10 } } }
  const itemV   = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 0.60, ease: [0.16, 1, 0.3, 1] } } }
  const slideR  = { hidden: { opacity: 0, x: 36 }, visible: { opacity: 1, x: 0, transition: { duration: 0.70, ease: [0.16, 1, 0.3, 1] } } }

  const pills = [t.cats[1], t.cats[2], t.cats[3], t.cats[4]]

  return (
    <section className="dl-hero" style={{ fontFamily: lm.font }} aria-label="Downloads hero">
      <div className="dl-hero__bg" aria-hidden="true" />
      <div className="dl-hero__noise" aria-hidden="true" />
      <div className="dl-hero__grid-lines" aria-hidden="true" />
      <div className="dl-hero__glow dl-hero__glow--gold"   aria-hidden="true" />
      <div className="dl-hero__glow dl-hero__glow--maroon" aria-hidden="true" />
      <div className="dl-hero__glow dl-hero__glow--right"  aria-hidden="true" />
      <div className="dl-hero__hc" aria-hidden="true"><DlHoneycomb /></div>
      {[...Array(6)].map((_, i) => (
        <div key={i} className={`dl-hero__dot dl-hero__dot--${i + 1}`} aria-hidden="true" />
      ))}
      <div className="dl-hero__watermark" aria-hidden="true">DOWNLOADS</div>

      <div className="dl-hero__inner">
        <motion.div className="dl-hero__left" initial="hidden" animate="visible" variants={stagger}>

          <motion.div className="dl-hero__badge" variants={itemV}>
            <span className="dl-hero__badge-dot" aria-hidden="true" />
            <span style={{
              fontFamily:    lm.isNonLatin ? lm.font : "'Cinzel', serif",
              letterSpacing: lm.isNonLatin ? 0 : '0.13em',
              textTransform: lm.isNonLatin ? 'none' : 'uppercase',
            }}>
              {t.pageTitle}
            </span>
          </motion.div>

          <motion.h1
            className="dl-hero__title"
            style={{ fontFamily: lm.headFont, lineHeight: lm.isNonLatin ? 1.35 : 1.08 }}
            variants={itemV}
          >
            {t.pageTitle}
          </motion.h1>

          <motion.div
            className="dl-hero__rule"
            variants={{
              hidden:  { scaleX: 0, opacity: 0 },
              visible: { scaleX: 1, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
            }}
            aria-hidden="true"
          />

          <motion.p className="dl-hero__body" style={{ fontFamily: lm.font }} variants={itemV}>
            {t.pageSub}
          </motion.p>

          <motion.div className="dl-hero__quick" variants={itemV} aria-hidden="true">
            {pills.map((label) => (
              <span key={label} className="dl-hero__quick-pill" style={{ fontFamily: lm.font }}>
                {label}
              </span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div className="dl-hero__right" initial="hidden" animate="visible" variants={slideR}>
          <img
            src="/branding/f-logo.svg"
            alt="Southern Province Planning Secretariat"
            className="dl-hero__logo"
            onError={e => { e.currentTarget.style.display = 'none' }}
          />
        </motion.div>
      </div>

      <svg className="dl-hero__wave" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,80 C240,20 480,60 720,40 C960,20 1200,60 1440,30 L1440,80 Z" fill="var(--dl-bg)" />
      </svg>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   TOOLBAR — search + filters + sort
═══════════════════════════════════════════════════════════════════════════ */
function Toolbar({
  t, lm, search, setSearch,
  catIdx, setCatIdx, typeIdx, setTypeIdx,
  sortIdx, setSortIdx, view, setView, total, filtered,
  hasActiveFilter, clearAll,
}) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const sortOptions = [t.sortNewest, t.sortOldest, t.sortAZ]

  return (
    <div className="dl-toolbar" role="search">
      {/* ── Row 1: Search + view toggle + mobile filter toggle ── */}
      <div className="dl-toolbar__row1">
        <div className="dl-toolbar__search-wrap">
          <FiSearch className="dl-toolbar__search-icon" aria-hidden="true" />
          <input
            type="search"
            className="dl-toolbar__search"
            placeholder={t.searchPh}
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label={t.searchPh}
            style={{ fontFamily: lm.font }}
          />
          {search && (
            <button
              className="dl-toolbar__search-clear"
              onClick={() => setSearch('')}
              aria-label="Clear search"
            >
              <FiX />
            </button>
          )}
        </div>

        <div className="dl-toolbar__right">
          {/* Result count */}
          <span className="dl-toolbar__count" aria-live="polite" style={{ fontFamily: lm.font }}>
            {filtered} {t.resultsOf} {total} {t.resultsFound}
          </span>

          {/* View toggle */}
          <div className="dl-toolbar__view-toggle" role="group" aria-label="View mode">
            <button
              className={`dl-toolbar__view-btn ${view === 'grid' ? 'dl-toolbar__view-btn--active' : ''}`}
              onClick={() => setView('grid')}
              aria-label={t.gridView}
              aria-pressed={view === 'grid'}
            >
              <FiGrid />
            </button>
            <button
              className={`dl-toolbar__view-btn ${view === 'list' ? 'dl-toolbar__view-btn--active' : ''}`}
              onClick={() => setView('list')}
              aria-label={t.listView}
              aria-pressed={view === 'list'}
            >
              <FiList />
            </button>
          </div>

          {/* Mobile filters toggle */}
          <button
            className={`dl-toolbar__mobile-filter-btn ${mobileFiltersOpen ? 'dl-toolbar__mobile-filter-btn--active' : ''}`}
            onClick={() => setMobileFiltersOpen(v => !v)}
            aria-expanded={mobileFiltersOpen}
            aria-controls="dl-filters-panel"
            aria-label="Toggle filters"
          >
            <FiFilter />
            <span>Filters</span>
            {hasActiveFilter && <span className="dl-toolbar__filter-dot" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* ── Row 2: Category pills + type + sort (collapsible on mobile) ── */}
      <div
        id="dl-filters-panel"
        className={`dl-toolbar__filters ${mobileFiltersOpen ? 'dl-toolbar__filters--open' : ''}`}
      >
        {/* Category pills */}
        <div className="dl-toolbar__cats" role="group" aria-label="Category filter">
          {t.cats.map((cat, i) => (
            <button
              key={cat}
              className={`dl-toolbar__cat ${catIdx === i ? 'dl-toolbar__cat--active' : ''}`}
              onClick={() => setCatIdx(i)}
              aria-pressed={catIdx === i}
              style={{ fontFamily: lm.font }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Type + Sort selects */}
        <div className="dl-toolbar__selects">
          <div className="dl-toolbar__select-wrap">
            <FiFile className="dl-toolbar__select-icon" aria-hidden="true" />
            <select
              className="dl-toolbar__select"
              value={typeIdx}
              onChange={e => setTypeIdx(Number(e.target.value))}
              aria-label={t.typeLabel}
              style={{ fontFamily: lm.font }}
            >
              {t.types.map((tp, i) => (
                <option key={tp} value={i}>{tp}</option>
              ))}
            </select>
            <FiChevronDown className="dl-toolbar__select-chevron" aria-hidden="true" />
          </div>

          <div className="dl-toolbar__select-wrap">
            <FiCalendar className="dl-toolbar__select-icon" aria-hidden="true" />
            <select
              className="dl-toolbar__select"
              value={sortIdx}
              onChange={e => setSortIdx(Number(e.target.value))}
              aria-label={t.sortLabel}
              style={{ fontFamily: lm.font }}
            >
              {sortOptions.map((s, i) => (
                <option key={s} value={i}>{s}</option>
              ))}
            </select>
            <FiChevronDown className="dl-toolbar__select-chevron" aria-hidden="true" />
          </div>

          {hasActiveFilter && (
            <button
              className="dl-toolbar__clear-btn"
              onClick={clearAll}
              aria-label={t.clearFilters}
              style={{ fontFamily: lm.font }}
            >
              <FiX />
              <span>{t.clearFilters}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   DOWNLOAD CARD — grid view
═══════════════════════════════════════════════════════════════════════════ */
function DownloadCard({ item, lang, t, lm, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 })
  const fresh = isNew(item.date)

  const displayTitle = lang === 'si' && item.titleSi ? item.titleSi
    : lang === 'ta' && item.titleTa ? item.titleTa
    : item.titleEn || item.title || 'Untitled Document'

  function handleDownload(e) {
    e.preventDefault()
    if (!item.fileUrl) return
    const a = document.createElement('a')
    a.href = item.fileUrl
    a.download = item.fileName || displayTitle
    a.target = '_blank'
    a.rel = 'noopener noreferrer'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  function handlePreview(e) {
    e.preventDefault()
    if (!item.fileUrl) return
    window.open(item.fileUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <motion.article
      ref={ref}
      className="dl-card"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.48, delay: Math.min(index * 0.06, 0.4), ease: [0.16, 1, 0.3, 1] }}
      aria-label={`${displayTitle} — ${item.category || ''}`}
    >
      {/* Top badges */}
      <div className="dl-card__badges">
        {fresh && (
          <span className="dl-card__badge dl-card__badge--new" aria-label={t.badgeNew}>
            {t.badgeNew}
          </span>
        )}
      </div>

      {/* Icon area */}
      <div className="dl-card__icon-wrap" aria-hidden="true">
        <div className="dl-card__icon-bg">
          <FileIcon fileType={item.fileType || item.type} size={28} />
        </div>
        <span className="dl-card__filetype-tag">
          {(item.fileType || item.type || 'FILE').toUpperCase()}
        </span>
      </div>

      {/* Meta */}
      <div className="dl-card__body">
        {item.category && (
          <span className="dl-card__category" style={{ fontFamily: lm.font }}>
            <FiTag style={{ fontSize: 11 }} aria-hidden="true" />
            {item.category}
          </span>
        )}

        <h3 className="dl-card__title" style={{ fontFamily: lm.font }}>
          {displayTitle}
        </h3>

        {item.description && (
          <p className="dl-card__desc" style={{ fontFamily: lm.font }}>
            {item.description}
          </p>
        )}

        <dl className="dl-card__meta-list">
          {item.date && (
            <div className="dl-card__meta-row">
              <dt className="dl-card__meta-label" style={{ fontFamily: lm.font }}>
                <FiCalendar aria-hidden="true" />
                {t.lblDate}
              </dt>
              <dd className="dl-card__meta-val">{fmtDate(item.date)}</dd>
            </div>
          )}
        </dl>
      </div>

      {/* Actions */}
      <div className="dl-card__actions">
        {item.fileUrl && (
          <button
            className="dl-card__btn dl-card__btn--preview"
            onClick={handlePreview}
            aria-label={`${t.btnPreview}: ${displayTitle}`}
            disabled={!item.fileUrl}
          >
            <FiExternalLink aria-hidden="true" />
            <span>{t.btnPreview}</span>
          </button>
        )}

        <button
          className="dl-card__btn dl-card__btn--download"
          onClick={handleDownload}
          aria-label={`${t.btnDownload}: ${displayTitle}`}
          disabled={!item.fileUrl}
        >
          <FiDownload aria-hidden="true" />
          <span>{t.btnDownload}</span>
        </button>
      </div>

      {/* Hover glow */}
      <div className="dl-card__hover-glow" aria-hidden="true" />
    </motion.article>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   DOWNLOAD ROW — list view
═══════════════════════════════════════════════════════════════════════════ */
function DownloadRow({ item, lang, t, lm, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })
  const fresh = isNew(item.date)

  const displayTitle = lang === 'si' && item.titleSi ? item.titleSi
    : lang === 'ta' && item.titleTa ? item.titleTa
    : item.titleEn || item.title || 'Untitled Document'

  function handleDownload(e) {
    e.preventDefault()
    if (!item.fileUrl) return
    const a = document.createElement('a')
    a.href = item.fileUrl
    a.download = item.fileName || displayTitle
    a.target = '_blank'
    a.rel = 'noopener noreferrer'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <motion.article
      ref={ref}
      className="dl-row"
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.28), ease: [0.16, 1, 0.3, 1] }}
      aria-label={displayTitle}
    >
      {/* File icon */}
      <div className="dl-row__icon" aria-hidden="true">
        <FileIcon fileType={item.fileType || item.type} size={20} />
      </div>

      {/* Main info */}
      <div className="dl-row__info">
        <div className="dl-row__title-line">
          <span className="dl-row__title" style={{ fontFamily: lm.font }}>{displayTitle}</span>
          <div className="dl-row__badges">
            {fresh && (
              <span className="dl-card__badge dl-card__badge--new" aria-label={t.badgeNew}>{t.badgeNew}</span>
            )}
          </div>
        </div>
        {item.description && (
          <p className="dl-row__desc" style={{ fontFamily: lm.font }}>{item.description}</p>
        )}
        <div className="dl-row__chips">
          {item.category && (
            <span className="dl-row__chip dl-row__chip--cat">
              <FiTag style={{ fontSize: 10 }} aria-hidden="true" />
              {item.category}
            </span>
          )}
          {(item.fileType || item.type) && (
            <span className="dl-row__chip dl-row__chip--type">
              {(item.fileType || item.type).toUpperCase()}
            </span>
          )}
          {item.date && (
            <span className="dl-row__chip">
              <FiCalendar style={{ fontSize: 10 }} aria-hidden="true" />
              {fmtDate(item.date)}
            </span>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="dl-row__actions">
        {item.fileUrl && (
          <button
            className="dl-card__btn dl-card__btn--preview dl-card__btn--sm"
            onClick={() => window.open(item.fileUrl, '_blank', 'noopener,noreferrer')}
            aria-label={`${t.btnPreview}: ${displayTitle}`}
          >
            <FiExternalLink aria-hidden="true" />
            <span className="dl-row__btn-label">{t.btnPreview}</span>
          </button>
        )}
        <button
          className="dl-card__btn dl-card__btn--download dl-card__btn--sm"
          onClick={handleDownload}
          aria-label={`${t.btnDownload}: ${displayTitle}`}
          disabled={!item.fileUrl}
        >
          <FiDownload aria-hidden="true" />
          <span className="dl-row__btn-label">{t.btnDownload}</span>
        </button>
      </div>
    </motion.article>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   EMPTY / NO-RESULTS STATE
═══════════════════════════════════════════════════════════════════════════ */
function EmptyState({ hasSearch, t, lm }) {
  return (
    <motion.div
      className="dl-empty"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      role="status"
    >
      <div className="dl-empty__icon-wrap" aria-hidden="true">
        {hasSearch ? (
          <FiAlertCircle className="dl-empty__icon dl-empty__icon--search" />
        ) : (
          <FiInbox className="dl-empty__icon" />
        )}
      </div>
      <p className="dl-empty__title" style={{ fontFamily: lm.font }}>
        {hasSearch ? t.noResults : t.emptyState}
      </p>
      <p className="dl-empty__sub" style={{ fontFamily: lm.font }}>
        {hasSearch ? t.noResultsSub : t.emptyStateSub}
      </p>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   ROOT PAGE COMPONENT
═══════════════════════════════════════════════════════════════════════════ */
export default function Downloads() {
  const held = usePageHold('downloads')
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en')
  const [downloads, setDownloads] = useState([])
  const [search, setSearch] = useState('')
  const [catIdx, setCatIdx] = useState(0)
  const [typeIdx, setTypeIdx] = useState(0)
  const [sortIdx, setSortIdx] = useState(0)
  const [view, setView] = useState('grid')

  const t  = T[lang]  || T.en
  const lm = LANG_META[lang] || LANG_META.en

  /* ── Language listener ─────────────────────────────────────────────────── */
  useEffect(() => {
    const onLang = e => setLang(e.detail || localStorage.getItem('lang') || 'en')
    window.addEventListener('langChange', onLang)
    return () => window.removeEventListener('langChange', onLang)
  }, [])

  /* ── Load + sync downloads ─────────────────────────────────────────────── */
  const refresh = useCallback(() => {
    const items = loadDownloads().filter(d => d.status === 'Active' || d.status === 'Published')
    setDownloads(items)
  }, [])

  useEffect(() => {
    refresh()

    // same-tab storage event won't fire, but cross-tab will
    const onStorage = e => { if (e.key === 'cms_downloads') refresh() }
    const onCustom   = () => refresh()

    window.addEventListener('storage', onStorage)
    window.addEventListener('cms_downloads_updated', onCustom)
    _bc?.addEventListener('message', onCustom)

    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('cms_downloads_updated', onCustom)
      _bc?.removeEventListener('message', onCustom)
    }
  }, [refresh])

  /* ── Filtered & sorted list ─────────────────────────────────────────────── */
  const filtered = useMemo(() => {
    let list = [...downloads]

    // Category
    if (catIdx > 0) {
      const catEn = CAT_EN[catIdx]
      list = list.filter(d => d.category === catEn)
    }

    // File type
    if (typeIdx > 0) {
      const typeEn = TYPE_EN[typeIdx]
      list = list.filter(d => getFileTypeGroup(d.fileType || d.type) === typeEn)
    }

    // Search
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(d => {
        const title = (d.titleEn || d.title || '').toLowerCase()
        const titleSi = (d.titleSi || '').toLowerCase()
        const titleTa = (d.titleTa || '').toLowerCase()
        const desc = (d.description || '').toLowerCase()
        const cat = (d.category || '').toLowerCase()
        const ft = (d.fileType || d.type || '').toLowerCase()
        return title.includes(q) || titleSi.includes(q) || titleTa.includes(q)
          || desc.includes(q) || cat.includes(q) || ft.includes(q)
      })
    }

    // Sort
    if (sortIdx === 0) list.sort((a, b) => new Date(b.date) - new Date(a.date))
    else if (sortIdx === 1) list.sort((a, b) => new Date(a.date) - new Date(b.date))
    else if (sortIdx === 2) {
      list.sort((a, b) => {
        const ta = (a.titleEn || a.title || '').toLowerCase()
        const tb = (b.titleEn || b.title || '').toLowerCase()
        return ta < tb ? -1 : ta > tb ? 1 : 0
      })
    }

    return list
  }, [downloads, catIdx, typeIdx, search, sortIdx])

  const hasActiveFilter = catIdx > 0 || typeIdx > 0 || search.trim().length > 0

  function clearAll() {
    setSearch('')
    setCatIdx(0)
    setTypeIdx(0)
    setSortIdx(0)
  }

  if (held) return <ComingSoon pageKey="downloads" />

  return (
    <>
      <SeoHead page="downloads" />
      <div className="dl-page" style={{ fontFamily: lm.font }}>
      {/* Hero */}
      <DownloadsHero lang={lang} />

      {/* Main content */}
      <section className="dl-main" aria-label="Downloads listing">
        <div className="dl-container">

          {/* Toolbar */}
          <Toolbar
            lang={lang} t={t} lm={lm}
            search={search} setSearch={setSearch}
            catIdx={catIdx} setCatIdx={setCatIdx}
            typeIdx={typeIdx} setTypeIdx={setTypeIdx}
            sortIdx={sortIdx} setSortIdx={setSortIdx}
            view={view} setView={setView}
            total={downloads.length} filtered={filtered.length}
            hasActiveFilter={hasActiveFilter}
            clearAll={clearAll}
          />

          {/* Content area */}
          <div className="dl-content">
            <AnimatePresence mode="wait">
              {filtered.length === 0 ? (
                <EmptyState
                  key="empty"
                  hasSearch={hasActiveFilter}
                  t={t} lm={lm}
                />
              ) : view === 'grid' ? (
                <motion.div
                  key="grid"
                  className="dl-grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.28 }}
                  role="list"
                  aria-label="Downloads grid"
                >
                  {filtered.map((item, i) => (
                    <DownloadCard
                      key={item.id || i}
                      item={item}
                      lang={lang}
                      t={t}
                      lm={lm}
                      index={i}
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="list"
                  className="dl-list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.28 }}
                  role="list"
                  aria-label="Downloads list"
                >
                  {filtered.map((item, i) => (
                    <DownloadRow
                      key={item.id || i}
                      item={item}
                      lang={lang}
                      t={t}
                      lm={lm}
                      index={i}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
    </>
  )
}

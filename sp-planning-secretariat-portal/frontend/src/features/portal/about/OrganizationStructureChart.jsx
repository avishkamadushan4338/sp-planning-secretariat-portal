/* ─────────────────────────────────────────────────────────────────────────────
   OrganizationStructureChart.jsx
   Southern Province Planning Secretariat — exact hierarchy from official image
   Premium 2050 government UI · responsive 320px → 4K
───────────────────────────────────────────────────────────────────────────── */
import { useState, useEffect, useCallback, useRef, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiZoomIn, FiZoomOut, FiMaximize2, FiMinimize2,
  FiShield, FiChevronDown, FiChevronRight,
  FiUsers, FiUser, FiGrid, FiLayers,
} from 'react-icons/fi'
import { HiOutlineChartBar, HiOutlineOfficeBuilding } from 'react-icons/hi'

/* ── Motion variants ─────────────────────────────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] } },
}
const stagger = (d = 0.07) => ({ hidden: {}, visible: { transition: { staggerChildren: d } } })

/* ═══════════════════════════════════════════════════════════════════════════
   DATA — exact structure from the provided org-chart image
   ───────────────────────────────────────────────────────────────────────────
   Hierarchy (Sinhala labels preserved exactly):

   [apex]   නියෝජ්‍ය ප්‍රධාන ලේකම් (සැලසුම් හා මෙහෙයුම්)
               │
   [dir]    අධ්‍යක්‍ෂ (සැලසුම්)
            ┌──────────────────────────────────────────────┐
   [dev]  සංවර්ධන අංශය                      [fin]  ගිණුම් සහ පිළිතුරීම් ශාඛාව
            │                                               │
     ┌──────┴──────┐                             [adm]  පරිපාලන නිලධාරී
  [dd8]           [stat]                                    │
  නියෝජ්‍ය          සංඛ්‍යා-                      [chief] ප්‍රධාන කළමනාකරණ සේවා නිලධාරී
  අධ්‍යක්‍ෂ ×8      ලේඛනය                                    │
     │                                           [ms10] කළමනාකරණ සේවා නිලධාරී - 10
     ├── [dn22] සංවර්ධන නිලධාරී - 22
     └── [da50] සංවර්ධන සහකාර(සැලසුම්)/සංවර්ධන නිලධාරී - 50
              │
        ┌─────┴──────┐
   [drv4] රියදුරු-4   [oa4] කාර්යාල කාර්යය සහායක-4
═══════════════════════════════════════════════════════════════════════════ */

/* Flat node list used by both desktop & mobile renderers */
const NODES = {
  apex: {
    id: 'apex', tier: 'apex',
    si: 'නියෝජ්‍ය ප්‍රධාන ලේකම්',
    siSub: 'සැලසුම් හා මෙහෙයුම්',
    en: 'Deputy Chief Secretary',
    enSub: 'Planning & Operations',
  },
  dir: {
    id: 'dir', tier: 'director',
    si: 'අධ්‍යක්‍ෂ',
    siSub: 'සැලසුම්',
    en: 'Director',
    enSub: 'Planning',
  },
  dev: {
    id: 'dev', tier: 'division',
    si: 'සංවර්ධන අංශය',
    en: 'Development Division',
  },
  fin: {
    id: 'fin', tier: 'division',
    si: 'ගිණුම් සහ පිළිතුරීම් ශාඛාව',
    en: 'Finance & Accounts Branch',
  },
  dd8: {
    id: 'dd8', tier: 'dd',
    si: 'නියෝජ්‍ය අධ්‍යක්‍ෂ',
    siSub: 'ක්‍රමසම්පාදන',
    siCount: '— 08',
    en: 'Deputy Director',
    enSub: 'Planning (Programme)',
    enCount: '— 08',
  },
  stat: {
    id: 'stat', tier: 'stat',
    si: 'සංඛ්‍යාලේඛනය',
    en: 'Statistics',
  },
  dn22: {
    id: 'dn22', tier: 'officer',
    si: 'සංවර්ධන නිලධාරී',
    siCount: '— 22',
    en: 'Development Officer',
    enCount: '— 22',
  },
  da50: {
    id: 'da50', tier: 'officer',
    si: 'සංවර්ධන සහකාර (සැලසුම්) / සංවර්ධන නිලධාරී',
    siCount: '— 50',
    en: 'Dev. Assistant (Planning) / Dev. Officer',
    enCount: '— 50',
  },
  drv: {
    id: 'drv', tier: 'support',
    si: 'රියදුරු',
    siCount: '— 04',
    en: 'Driver',
    enCount: '— 04',
  },
  oa: {
    id: 'oa', tier: 'support',
    si: 'කාර්යාල කාර්යය සහායක',
    siCount: '— 04',
    en: 'Office Aid',
    enCount: '— 04',
  },
  adm: {
    id: 'adm', tier: 'admin',
    si: 'පරිපාලන නිලධාරී',
    en: 'Administrative Officer',
  },
  chief: {
    id: 'chief', tier: 'admin',
    si: 'ප්‍රධාන කළමනාකරණ සේවා නිලධාරී',
    en: 'Chief Mgmt. Service Officer',
  },
  ms10: {
    id: 'ms10', tier: 'support',
    si: 'කළමනාකරණ සේවා නිලධාරී',
    siCount: '— 10',
    en: 'Mgmt. Service Officer',
    enCount: '— 10',
  },
}

/* ── Mobile tree structure (nested) ─────────────────────────────────────── */
const MOBILE_TREE = {
  ...NODES.apex,
  children: [{
    ...NODES.dir,
    children: [
      {
        ...NODES.dev,
        children: [
          {
            ...NODES.dd8,
            children: [
              { ...NODES.dn22, children: [] },
              {
                ...NODES.da50,
                children: [
                  { ...NODES.drv, children: [] },
                  { ...NODES.oa,  children: [] },
                ],
              },
            ],
          },
          { ...NODES.stat, children: [] },
        ],
      },
      {
        ...NODES.fin,
        children: [
          {
            ...NODES.adm,
            children: [
              {
                ...NODES.chief,
                children: [
                  { ...NODES.ms10, children: [] },
                ],
              },
            ],
          },
        ],
      },
    ],
  }],
}

/* ═══════════════════════════════════════════════════════════════════════════
   TIER VISUAL CONFIG
═══════════════════════════════════════════════════════════════════════════ */
const TIER_CFG = {
  apex:     { cls: 'osc-node--apex',     icon: <FiShield             aria-hidden="true" /> },
  director: { cls: 'osc-node--director', icon: <HiOutlineChartBar    aria-hidden="true" /> },
  division: { cls: 'osc-node--division', icon: <FiLayers             aria-hidden="true" /> },
  dd:       { cls: 'osc-node--dd',       icon: <HiOutlineOfficeBuilding aria-hidden="true" /> },
  stat:     { cls: 'osc-node--stat',     icon: <FiGrid               aria-hidden="true" /> },
  officer:  { cls: 'osc-node--officer',  icon: <FiUser               aria-hidden="true" /> },
  admin:    { cls: 'osc-node--admin',    icon: <FiUser               aria-hidden="true" /> },
  support:  { cls: 'osc-node--support',  icon: <FiUsers              aria-hidden="true" /> },
}

/* ═══════════════════════════════════════════════════════════════════════════
   NODE CARD — shared by desktop and labels
═══════════════════════════════════════════════════════════════════════════ */
const OrgNode = memo(function OrgNode({ node, lang, compact = false }) {
  const cfg   = TIER_CFG[node.tier] ?? TIER_CFG.support
  const title = lang === 'si' ? node.si  : node.en
  const sub   = lang === 'si' ? node.siSub  : node.enSub
  const count = lang === 'si' ? node.siCount : node.enCount
  const altLang = lang === 'si'
    ? (node.en  ? `${node.en}${node.enSub  ? ` (${node.enSub})` : ''}${node.enCount  ? ` ${node.enCount}` : ''}` : null)
    : (node.si  ? `${node.si}${node.siSub  ? ` — ${node.siSub}` : ''}${node.siCount  ? ` ${node.siCount}` : ''}` : null)

  return (
    <div
      className={`osc-node ${cfg.cls}${compact ? ' osc-node--compact' : ''}`}
      data-id={node.id}
      role="treeitem"
      aria-label={`${title}${sub ? ` — ${sub}` : ''}${count ? ` ${count}` : ''}`}
    >
      <div className="osc-node__icon" aria-hidden="true">{cfg.icon}</div>
      <div className="osc-node__body">
        <span className="osc-node__title-row">
          <span className="osc-node__title">{title}</span>
          {sub && <span className="osc-node__sub"> ({sub})</span>}
          {count && <span className="osc-node__count"> {count}</span>}
        </span>
        {altLang && altLang !== `${title}${sub ? ` (${sub})` : ''}${count ? ` ${count}` : ''}` && (
          <span className="osc-node__alt" lang={lang === 'si' ? 'en' : 'si'}>{altLang}</span>
        )}
      </div>
    </div>
  )
})

/* ═══════════════════════════════════════════════════════════════════════════
   DESKTOP CHART — pixel-faithful replica of the official image
   Layout grid rows:
     R0  apex
     R1  director
     R2  [dev division]          [fin division]
     R3  [dd8] [stat]            [adm]
     R4  [dn22] [da50]           [chief]
     R5          [drv] [oa]      [ms10]
═══════════════════════════════════════════════════════════════════════════ */
function DesktopChart({ lang }) {
  const N = NODES
  return (
    <div
      className="osc-chart"
      role="tree"
      aria-label="Organization Structure Chart"
    >

      {/* ════ ROW 0 — Apex ════ */}
      <div className="osc-r osc-r--apex">
        <OrgNode node={N.apex} lang={lang} />
      </div>

      {/* stem apex → dir */}
      <div className="osc-vstem" aria-hidden="true" />

      {/* ════ ROW 1 — Director ════ */}
      <div className="osc-r osc-r--dir">
        <OrgNode node={N.dir} lang={lang} />
      </div>

      {/* stem dir → horiz bar */}
      <div className="osc-vstem" aria-hidden="true" />
      {/* horizontal bar spanning dev + fin */}
      <div className="osc-hbar osc-hbar--l2" aria-hidden="true" />

      {/* ════ ROW 2 — Divisions ════ */}
      <div className="osc-r osc-r--l2">

        {/* ── LEFT: Development Division sub-tree ── */}
        <div className="osc-col osc-col--dev">
          <div className="osc-vstem" aria-hidden="true" />
          <OrgNode node={N.dev} lang={lang} />

          {/* stem dev → horiz bar for dd8 + stat */}
          <div className="osc-vstem" aria-hidden="true" />
          <div className="osc-hbar osc-hbar--devl3" aria-hidden="true" />

          {/* ── ROW 3: DD8 + Stat ── */}
          <div className="osc-r osc-r--devl3">

            {/* DD8 sub-tree */}
            <div className="osc-col osc-col--dd8">
              <div className="osc-vstem" aria-hidden="true" />
              <OrgNode node={N.dd8} lang={lang} />

              {/* stem dd8 → dn22 + da50 */}
              <div className="osc-vstem" aria-hidden="true" />
              <div className="osc-hbar osc-hbar--officers" aria-hidden="true" />

              <div className="osc-r osc-r--officers">
                {/* dn22 */}
                <div className="osc-col osc-col--officer">
                  <div className="osc-vstem" aria-hidden="true" />
                  <OrgNode node={N.dn22} lang={lang} />
                </div>

                {/* da50 → drv + oa */}
                <div className="osc-col osc-col--da50">
                  <div className="osc-vstem" aria-hidden="true" />
                  <OrgNode node={N.da50} lang={lang} />
                  <div className="osc-vstem" aria-hidden="true" />
                  <div className="osc-hbar osc-hbar--ground" aria-hidden="true" />
                  <div className="osc-r osc-r--ground">
                    <div className="osc-col osc-col--support">
                      <div className="osc-vstem" aria-hidden="true" />
                      <OrgNode node={N.drv} lang={lang} compact />
                    </div>
                    <div className="osc-col osc-col--support">
                      <div className="osc-vstem" aria-hidden="true" />
                      <OrgNode node={N.oa} lang={lang} compact />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stat — right side */}
            <div className="osc-col osc-col--stat">
              <div className="osc-vstem" aria-hidden="true" />
              <OrgNode node={N.stat} lang={lang} />
            </div>

          </div>
        </div>

        {/* ── RIGHT: Finance Branch sub-tree ── */}
        <div className="osc-col osc-col--fin">
          <div className="osc-vstem" aria-hidden="true" />
          <OrgNode node={N.fin} lang={lang} />
          <div className="osc-vstem" aria-hidden="true" />

          {/* Dashed connector hint — matches image dashed lines */}
          <div className="osc-dashed-hint" aria-hidden="true" />

          <OrgNode node={N.adm} lang={lang} />
          <div className="osc-vstem" aria-hidden="true" />
          <OrgNode node={N.chief} lang={lang} />
          <div className="osc-vstem" aria-hidden="true" />
          <OrgNode node={N.ms10} lang={lang} />
        </div>

      </div>{/* end osc-r--l2 */}

    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   MOBILE ACCORDION NODE
═══════════════════════════════════════════════════════════════════════════ */
function MobileNode({ node, lang, depth = 0 }) {
  const [open, setOpen] = useState(depth < 2)
  const cfg = TIER_CFG[node.tier] ?? TIER_CFG.support
  const hasChildren = (node.children ?? []).length > 0
  const title = lang === 'si' ? node.si  : node.en
  const sub   = lang === 'si' ? node.siSub  : node.enSub
  const count = lang === 'si' ? node.siCount : node.enCount

  return (
    <div className={`osc-m-node osc-m-node--d${Math.min(depth, 5)}`}>
      <button
        className="osc-m-node__header"
        onClick={() => hasChildren && setOpen(v => !v)}
        aria-expanded={hasChildren ? open : undefined}
        aria-label={`${title}${sub ? ` — ${sub}` : ''}${count ? ` ${count}` : ''}`}
        style={{ cursor: hasChildren ? 'pointer' : 'default' }}
      >
        <span className="osc-m-node__icon" aria-hidden="true">{cfg.icon}</span>
        <span className="osc-m-node__texts">
          <span className="osc-m-node__title">{title}</span>
          {sub   && <span className="osc-m-node__sub">{sub}</span>}
          {count && <span className="osc-m-node__count">{count}</span>}
        </span>
        {hasChildren && (
          <span className="osc-m-node__chevron" aria-hidden="true">
            {open ? <FiChevronDown /> : <FiChevronRight />}
          </span>
        )}
      </button>

      <AnimatePresence initial={false}>
        {hasChildren && open && (
          <motion.div
            className="osc-m-node__children"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
          >
            {node.children.map((child) => (
              <MobileNode key={child.id} node={child} lang={lang} depth={depth + 1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   ZOOM CONTROLS
═══════════════════════════════════════════════════════════════════════════ */
const ZOOM_STEPS = [0.45, 0.6, 0.75, 0.9, 1, 1.15, 1.3]

function ZoomControls({ zoom, onZoomIn, onZoomOut, onFit, isFullSize }) {
  return (
    <div className="osc-zoom" role="group" aria-label="Chart zoom controls">
      <button className="osc-zoom__btn" onClick={onZoomOut}
        disabled={zoom <= ZOOM_STEPS[0]} aria-label="Zoom out" title="Zoom out">
        <FiZoomOut aria-hidden="true" />
      </button>
      <span className="osc-zoom__val" aria-live="polite">
        {Math.round(zoom * 100)}%
      </span>
      <button className="osc-zoom__btn" onClick={onZoomIn}
        disabled={zoom >= ZOOM_STEPS[ZOOM_STEPS.length - 1]} aria-label="Zoom in" title="Zoom in">
        <FiZoomIn aria-hidden="true" />
      </button>
      <div className="osc-zoom__sep" aria-hidden="true" />
      <button className="osc-zoom__btn" onClick={onFit}
        aria-label={isFullSize ? 'Fit view' : 'Full size'}
        title={isFullSize ? 'Fit view' : 'Full size'}>
        {isFullSize ? <FiMinimize2 aria-hidden="true" /> : <FiMaximize2 aria-hidden="true" />}
      </button>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   ROOT EXPORT
═══════════════════════════════════════════════════════════════════════════ */
export default function OrganizationStructureChart({ lang = 'en' }) {
  const [zoom,       setZoom]     = useState(0.9)
  const [isFullSize, setFullSize] = useState(false)
  const [isMobile,   setMobile]   = useState(false)
  const [imgError,   setImgError] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth
      setMobile(w < 640)
      // Tablet state removed (was unused)
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2
  }, [])

  const zoomIn    = useCallback(() => setZoom(z => ZOOM_STEPS.find(s => s > z) ?? z), [])
  const zoomOut   = useCallback(() => setZoom(z => [...ZOOM_STEPS].reverse().find(s => s < z) ?? z), [])
  const toggleFit = useCallback(() => { setFullSize(v => !v); setZoom(0.9) }, [])


  return (
    <motion.div className="osc-shell" initial="hidden" animate="visible" variants={stagger(0.08)}>

      {/* ── Intro ── */}
      <motion.div className="osc-intro" variants={fadeUp} role="note">
        <div className="osc-intro__icon" aria-hidden="true"><HiOutlineChartBar /></div>
        <div className="osc-intro__body">
          <h2 className="osc-intro__title">
            {lang === 'si' ? 'සංවිධාන ව්‍යූහය' : 'Organization Structure'}
          </h2>
          <p className="osc-intro__text">
            {lang === 'si'
              ? 'සැලසුම් ලේකම් කාර්යාලයේ සංවිධාන ව්‍යූහය නායකත්වය, පරිපාලන අංශ, සැලසුම් ඒකක සහ පළාත් සංවර්ධන ක්‍රියාකාරකම් සම්බන්ධීකරණය කරන සහාය කාර්ය මණ්ඩල භූමිකාවන් නිදර්ශනය කරයි.'
              : 'The organizational structure of the Planning Secretariat illustrates the leadership, administrative divisions, planning units, and supporting staff roles that coordinate provincial development activities.'}
          </p>
        </div>
      </motion.div>

      {/* ── Chart card ── */}
      <motion.div
        className={`osc-card${isFullSize ? ' osc-card--fullsize' : ''}`}
        variants={fadeUp}
        aria-label="Organizational chart container"
      >
        {/* Header */}
        <div className="osc-card__header">
          <div className="osc-card__header-left">
            <HiOutlineChartBar className="osc-card__header-icon" aria-hidden="true" />
            <div>
              <h3 className="osc-card__header-title">
                {lang === 'si' ? 'සැලසුම් ලේකම් කාර්යාලය' : 'Planning Secretariat'}
              </h3>
              <p className="osc-card__header-sub">
                {lang === 'si' ? 'දකුණු පළාත' : 'Southern Province'}
              </p>
            </div>
          </div>
          {!isMobile && (
            <ZoomControls
              zoom={zoom} onZoomIn={zoomIn} onZoomOut={zoomOut}
              onFit={toggleFit} isFullSize={isFullSize}
            />
          )}
        </div>

        <div className="osc-card__divider" aria-hidden="true" />

        {/* Body */}
        {isMobile ? (
          <>
            <p className="osc-scroll-hint osc-scroll-hint--mobile" aria-hidden="true">
              ↕ Scroll to view · Tap nodes to expand
            </p>
            <div className="osc-mobile-scroll">
              <div className="osc-mobile-tree" role="tree" aria-label="Organization Structure Chart">
                <MobileNode node={MOBILE_TREE} lang={lang} depth={0} />
              </div>
            </div>
            <p className="osc-scroll-hint osc-scroll-hint--mobile-bottom" aria-hidden="true">
              ← Swipe left / right to see more →
            </p>
          </>
        ) : (
          <>
            <p className="osc-scroll-hint osc-scroll-hint--desktop" aria-hidden="true">
              ← Scroll left / right · ↕ Scroll up / down →
            </p>
            <div
              className="osc-scroll-wrap"
              ref={scrollRef}
              tabIndex={0}
              aria-label="Scrollable organization chart. Use arrow keys or scroll to navigate."
            >
              <div
                className="osc-scale-wrap"
                style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }}
              >
                <DesktopChart lang={lang} />
              </div>
            </div>
          </>
        )}

        {/* Official image reference (hidden if load fails) */}
        {!imgError && (
          <div className="osc-img-fallback-wrap">
            <p className="osc-img-fallback-label" aria-hidden="true">
              {lang === 'si' ? 'නිල සංවිධාන රූප සටහන' : 'Official Organization Chart Reference'}
            </p>
            <img
              src="/branding/organization-structure.png"
              alt="Official Organization Structure — Southern Province Planning Secretariat"
              className="osc-img-fallback"
              onError={() => setImgError(true)}
              loading="lazy"
            />
          </div>
        )}
      </motion.div>

      {/* ── Legend ── */}
      <motion.div className="osc-legend" variants={fadeUp} role="list" aria-label="Chart legend">
        {[
          { cls: 'osc-legend__dot--apex',     label: lang === 'si' ? 'නියෝජ්‍ය ප්‍රධාන ලේකම්'   : 'Deputy Chief Secretary' },
          { cls: 'osc-legend__dot--director', label: lang === 'si' ? 'අධ්‍යක්‍ෂ'                 : 'Director' },
          { cls: 'osc-legend__dot--division', label: lang === 'si' ? 'අංශය / ශාඛාව'              : 'Division / Branch' },
          { cls: 'osc-legend__dot--dd',       label: lang === 'si' ? 'නියෝජ්‍ය අධ්‍යක්‍ෂ'        : 'Deputy Director' },
          { cls: 'osc-legend__dot--officer',  label: lang === 'si' ? 'නිලධාරී'                   : 'Officer' },
          { cls: 'osc-legend__dot--admin',    label: lang === 'si' ? 'පරිපාලන / කළමනාකරණ'       : 'Admin / Management' },
          { cls: 'osc-legend__dot--support',  label: lang === 'si' ? 'සහාය කාර්ය'               : 'Support Staff' },
        ].map((item) => (
          <div key={item.label} className="osc-legend__item" role="listitem">
            <span className={`osc-legend__dot ${item.cls}`} aria-hidden="true" />
            <span className="osc-legend__label">{item.label}</span>
          </div>
        ))}
      </motion.div>

      {/* ── Footer accent ── */}
      <motion.div className="ab-glass-accent" variants={fadeUp}>
        <div className="ab-glass-accent__icon" aria-hidden="true"><FiShield /></div>
        <div className="ab-glass-accent__content">
          <div className="ab-glass-accent__title">
            {lang === 'si' ? 'නිල රජයේ ව්‍යූහය' : 'Official Government Structure'}
          </div>
          <div className="ab-glass-accent__sub">
            {lang === 'si'
              ? 'මෙම සංවිධාන ව්‍යූහය දකුණු පළාත් සැලසුම් ලේකම් කාර්යාලය විසින් නිකුත් කරන ලද නිල තොරතුරු මත පදනම් වේ.'
              : 'This organizational structure is based on official information issued by the Southern Province Planning Secretariat and is subject to periodic review.'}
          </div>
        </div>
      </motion.div>

    </motion.div>
  )
}

import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { FiArrowRight, FiShield, FiUsers, FiStar } from 'react-icons/fi'

/* ─────────────────────────────────────────────────────────────────────────────
   LANGUAGE DATA
───────────────────────────────────────────────────────────────────────────── */
const LANGUAGES = [
  {
    id: 'si',
    symbol: 'ඇ',
    native: 'සිංහල',
    english: 'Sinhala',
    nativeFont: "'Noto Sans Sinhala', sans-serif",
    symbolSize: '1.4rem',
    badgeColor: '#6E1024',
    nameColor: '#6E1024',
    btnColor: '#6E1024',
  },
  {
    id: 'ta',
    symbol: 'அ',
    native: 'தமிழ்',
    english: 'Tamil',
    nativeFont: "'Noto Sans Tamil', sans-serif",
    symbolSize: '1.45rem',
    badgeColor: '#C79A2B',
    nameColor: '#C79A2B',
    btnColor: '#C79A2B',
  },
  {
    id: 'en',
    symbol: 'En',
    native: 'English',
    english: 'English',
    nativeFont: "'Cinzel', serif",
    symbolSize: '1rem',
    badgeColor: '#4A0918',
    nameColor: '#4A0918',
    btnColor: '#4A0918',
  },
]

const FOOTER_ITEMS = [
  { Icon: FiShield, text: 'අපගේ මෙහෙවර ඔබ වෙනුවෙන්' },
  { Icon: FiUsers,  text: 'Our Service is For You'    },
  { Icon: FiStar,   text: 'எங்கள் சேவை உங்களுக்காக'  },
]

/* ─────────────────────────────────────────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────────────────────────────────────────── */
const pageIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
}

const stagger = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}

const fadeUp = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

const cardAnim = {
  hidden:  { opacity: 0, y: 24, scale: 0.97 },
  visible: (i) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, delay: 0.35 + i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────────────────────── */
export default function LandingPage() {
  const navigate = useNavigate()
  const [entering, setEntering] = useState(null)

  const handleSelect = (langId) => {
    if (entering) return
    setEntering(langId)
    localStorage.setItem('lang', langId)
    setTimeout(() => navigate('/home'), 850)
  }

  return (
    <>
      <Helmet>
        <title>Planning Secretariat – Southern Province | Sri Lanka</title>
        <meta name="description" content="Official portal of the Planning Secretariat, Southern Province, Sri Lanka." />
      </Helmet>

      <motion.div
        className="min-h-screen flex flex-col relative overflow-hidden"
        style={{ background: PAGE_BG }}
        variants={pageIn}
        initial="hidden"
        animate="visible"
      >
        {/* Decorative honeycomb corners — hidden on very small screens */}
        <div className="hidden sm:block">
          <HoneycombDecor corner="top-left"     />
          <HoneycombDecor corner="bottom-right" />
        </div>

        {/* Centre glow */}
        <div className="absolute inset-0 pointer-events-none" style={CENTER_GLOW} />

        {/* ── MAIN ──────────────────────────────────────────────────────────── */}
        <motion.main
          className="relative z-10 flex-1 flex flex-col items-center justify-center
                     px-4 sm:px-6 py-6 sm:py-8 md:py-10"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {/* Logo / Emblem */}
          <motion.div variants={fadeUp} className="mb-3 sm:mb-5 flex justify-center w-full">
            <EmblemBadge />
          </motion.div>

          {/* Tri-language welcome heading */}
          <motion.div variants={fadeUp} className="text-center px-2 mb-1 sm:mb-2">
            {/* Mobile: stack across two lines; sm+: single line */}
            <h1
              className="font-bold leading-snug"
              style={{
                fontFamily: "'Playfair Display', 'Noto Sans Sinhala', 'Noto Sans Tamil', serif",
                fontSize: 'clamp(1.2rem, 5vw, 2.9rem)',
                color: '#4A0918',
              }}
            >
              <span>ආයුබෝවන්</span>
              <span style={{ color: '#C79A2B', fontWeight: 400, margin: '0 0.3em' }}>|</span>
              <span>வரவேற்பு</span>
              <span style={{ color: '#C79A2B', fontWeight: 400, margin: '0 0.3em' }}>|</span>
              <span>Welcome</span>
            </h1>
          </motion.div>

          {/* Gold ornamental flourish */}
          <motion.div variants={fadeUp} className="my-2 sm:my-3 flex justify-center">
            <OrnamentDivider />
          </motion.div>

          {/* Trilingual subtitle — each language on its own line */}
          <motion.div
            variants={fadeUp}
            className="text-center w-full max-w-xl mb-4 sm:mb-6 px-3"
          >
            <p style={SUBTITLE_STYLE} className="mb-0.5">
              දකුණු පළාත් සැලසුම් ලේකම් කාර්යාලයේ නිල වෙබ් අඩවියට පිළිගනිමු.
            </p>
            <p style={SUBTITLE_STYLE} className="mb-0.5">
              தென் மாகாண திட்டமிடல் செயலகத்தின் அதிகாரப்பூர்வ இணையத்தளத்திற்கு வருக.
            </p>
            <p style={{ ...SUBTITLE_STYLE, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Official Website of the Planning Secretariat, Southern Province.
            </p>
          </motion.div>

          {/* ── LANGUAGE CARDS ─────────────────────────────────────────────── */}
          {/* Always 3 columns: compact on mobile, full on md+ */}
          <div className="w-full max-w-2xl grid grid-cols-3 gap-2 sm:gap-4 md:gap-5 px-1 sm:px-2">
            {LANGUAGES.map((lang, i) => (
              <LanguageCard
                key={lang.id}
                lang={lang}
                index={i}
                entering={entering}
                onSelect={handleSelect}
              />
            ))}
          </div>
        </motion.main>

        {/* ── FOOTER ────────────────────────────────────────────────────────── */}
        <motion.div
          className="relative z-10 flex-shrink-0"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.9 }}
        >
          {/* Arch wave */}
          <svg
            viewBox="0 0 1440 36"
            preserveAspectRatio="none"
            className="w-full block"
            style={{ height: '28px', marginBottom: '-1px' }}
          >
            <path d="M0,36 Q720,0,1440,36 L1440,36 L0,36 Z" fill="#4A0918" />
          </svg>

          <div className="py-2 sm:py-3 px-4 sm:px-6" style={{ background: '#4A0918' }}>
            {/* Footer items: wrap into 1 or 2 col on very small screens */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 sm:gap-x-8 sm:gap-y-0">
              {FOOTER_ITEMS.map(({ Icon, text }, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <Icon size={12} style={{ color: '#C79A2B', flexShrink: 0 }} />
                  <span style={FOOTER_TEXT}>{text}</span>
                </div>
              ))}
            </div>
            <p className="text-center mt-1" style={FOOTER_COPYRIGHT}>
              © {new Date().getFullYear()} Planning Secretariat – Southern Province, Sri Lanka. All Rights Reserved.
            </p>
          </div>
        </motion.div>

        {/* Page-enter transition overlay */}
        <AnimatePresence>
          {entering && (
            <motion.div
              key="overlay"
              className="fixed inset-0 z-50 pointer-events-none"
              style={{ background: LANGUAGES.find(l => l.id === entering)?.btnColor || '#4A0918' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.75, ease: 'easeInOut' }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   LANGUAGE CARD — responsive: compact on mobile, full on md+
───────────────────────────────────────────────────────────────────────────── */
function LanguageCard({ lang, index, entering, onSelect }) {
  const [hovered, setHovered] = useState(false)
  const isActive = entering === lang.id
  const isDimmed = entering && !isActive

  return (
    <motion.article
      custom={index}
      variants={cardAnim}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -4, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => onSelect(lang.id)}
      className="cursor-pointer select-none overflow-hidden rounded-xl sm:rounded-2xl flex flex-col"
      style={{
        background: '#FFFFFF',
        border: `1px solid ${hovered || isActive ? lang.btnColor + '55' : 'rgba(110,16,36,0.1)'}`,
        boxShadow: hovered || isActive
          ? `0 12px 32px rgba(0,0,0,0.13), 0 0 0 1px ${lang.btnColor}33`
          : '0 3px 14px rgba(0,0,0,0.07)',
        opacity: isDimmed ? 0.3 : 1,
        transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
      role="button"
      aria-label={`Select ${lang.english} language`}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(lang.id)}
    >
      {/* Card body */}
      <div className="flex-1 flex flex-col items-center text-center px-2 pt-3 pb-2 sm:px-4 sm:pt-5 sm:pb-3 md:px-5 md:pt-6 md:pb-4">

        {/* Circular badge */}
        <motion.div
          className="rounded-full flex items-center justify-center flex-shrink-0 mb-2 sm:mb-3"
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width:  'clamp(40px, 10vw, 68px)',
            height: 'clamp(40px, 10vw, 68px)',
            background: lang.badgeColor,
            boxShadow: hovered || isActive
              ? `0 5px 16px ${lang.badgeColor}55`
              : `0 2px 8px ${lang.badgeColor}33`,
            transition: 'box-shadow 0.28s ease',
          }}
        >
          <span
            style={{
              fontFamily: lang.nativeFont,
              fontSize: 'clamp(0.85rem, 2.5vw, 1.4rem)',
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1,
            }}
          >
            {lang.symbol}
          </span>
        </motion.div>

        {/* Native language name */}
        <h3
          className="font-bold leading-tight"
          style={{
            fontFamily: lang.nativeFont,
            fontSize: 'clamp(0.75rem, 2.5vw, 1.45rem)',
            color: lang.nameColor,
            letterSpacing: lang.id === 'en' ? '0.03em' : '0',
          }}
        >
          {lang.native}
        </h3>

        {/* English label — hidden on very small screens, shown sm+ */}
        <span
          className="hidden sm:block mt-1"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.68rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#777777',
          }}
        >
          {lang.english}
        </span>
      </div>

      {/* Full-width arrow button */}
      <motion.div
        className="flex items-center justify-center"
        animate={{
          backgroundColor: hovered || isActive ? lang.btnColor : lang.btnColor + 'dd',
        }}
        transition={{ duration: 0.22 }}
        style={{
          height: 'clamp(30px, 5vw, 46px)',
          borderBottomLeftRadius: 'inherit',
          borderBottomRightRadius: 'inherit',
          cursor: 'pointer',
        }}
      >
        <motion.span
          animate={{ x: hovered ? 3 : 0 }}
          transition={{ duration: 0.18 }}
          style={{ display: 'flex', alignItems: 'center', color: '#FFFFFF' }}
        >
          {isActive
            ? <span style={{ fontFamily: lang.nativeFont, fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.04em' }}>
                {lang.id === 'si' ? 'විවෘත වෙමින්…' : lang.id === 'ta' ? 'திறக்கிறது…' : 'Opening…'}
              </span>
            : <FiArrowRight size={16} strokeWidth={2.5} />
          }
        </motion.span>
      </motion.div>
    </motion.article>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   GOVERNMENT EMBLEM BADGE
───────────────────────────────────────────────────────────────────────────── */
function EmblemBadge() {
  const [imageError, setImageError] = useState(false)

  if (!imageError) {
    return (
      <img
        src="/branding/logo.svg"
        alt="Southern Province Planning Secretariat"
        onError={() => setImageError(true)}
        style={{
          width: 'clamp(200px, 80vw, 860px)',
          maxWidth: '100%',
          height: 'auto',
          objectFit: 'contain',
          display: 'block',
        }}
      />
    )
  }

  return (
    <div className="flex items-center gap-3">
      <div
        className="rounded-full flex items-center justify-center flex-shrink-0"
        style={{
          width: 'clamp(56px, 14vw, 90px)',
          height: 'clamp(56px, 14vw, 90px)',
          background: 'linear-gradient(145deg, #fff9ee 0%, #fef3d5 100%)',
          border: '2.5px solid #C79A2B',
          boxShadow: '0 2px 12px rgba(199,154,43,0.22)',
        }}
      >
        <EmblemSVG />
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   EMBLEM SVG
───────────────────────────────────────────────────────────────────────────── */
function EmblemSVG() {
  const spokes = Array.from({ length: 8 }, (_, i) => {
    const a = (i * 45 * Math.PI) / 180
    return { x1: 18 + 5 * Math.cos(a), y1: 18 + 5 * Math.sin(a), x2: 18 + 11 * Math.cos(a), y2: 18 + 11 * Math.sin(a) }
  })
  return (
    <svg width="34" height="34" viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="16" stroke="#C79A2B" strokeWidth="1.5" fill="none" opacity="0.9" />
      <circle cx="18" cy="18" r="11.5" stroke="#C79A2B" strokeWidth="0.9" fill="none" opacity="0.5" />
      <circle cx="18" cy="18" r="2.6" fill="#C79A2B" opacity="0.75" />
      {spokes.map((s, i) => (
        <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke="#C79A2B" strokeWidth="1" opacity="0.65" />
      ))}
      <path d="M15 23 C14 21 14 18 16 16.5 C17 15.5 18 15 18 15 C18 15 19 15.5 20 16.5 C22 18 22 21 21 23 Z"
        fill="#6E1024" opacity="0.9" />
      <circle cx="18" cy="13.8" r="2.8" fill="#6E1024" opacity="0.9" />
      <circle cx="18" cy="13.8" r="4.3" stroke="#C79A2B" strokeWidth="1" fill="none" opacity="0.4" />
      <line x1="21.2" y1="11.6" x2="25.5" y2="7.5" stroke="#C79A2B" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
      <line x1="24.5" y1="8" x2="25.8" y2="9.5" stroke="#C79A2B" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <path d="M21 22 C23.5 20 26 21.5 25 24.5" stroke="#6E1024" strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.65" />
    </svg>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   ORNAMENTAL GOLD FLOURISH DIVIDER
───────────────────────────────────────────────────────────────────────────── */
function OrnamentDivider() {
  return (
    <svg
      viewBox="0 0 260 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: 'clamp(140px, 60vw, 260px)', height: 'auto' }}
    >
      <path d="M130 4 L135 14 L130 24 L125 14 Z" fill="#C79A2B" opacity="0.9" />
      <path d="M130 8 L133 14 L130 20 L127 14 Z" fill="#FCFBFA" opacity="0.8" />
      <line x1="0" y1="14" x2="115" y2="14" stroke="#C79A2B" strokeWidth="1" opacity="0.35" />
      <line x1="145" y1="14" x2="260" y2="14" stroke="#C79A2B" strokeWidth="1" opacity="0.35" />
      <path d="M115 14 C104 14 98 7 90 9 C82 11 80 14 75 14 C70 14 68 10 64 12 C60 14 58 14 55 14"
        stroke="#C79A2B" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.75" />
      <path d="M145 14 C156 14 162 7 170 9 C178 11 180 14 185 14 C190 14 192 10 196 12 C200 14 202 14 205 14"
        stroke="#C79A2B" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.75" />
      <circle cx="50" cy="14" r="1.8" fill="#C79A2B" opacity="0.55" />
      <circle cx="44" cy="14" r="1.2" fill="#C79A2B" opacity="0.35" />
      <circle cx="210" cy="14" r="1.8" fill="#C79A2B" opacity="0.55" />
      <circle cx="216" cy="14" r="1.2" fill="#C79A2B" opacity="0.35" />
      <path d="M120 14 C118 11 116 11 115 14 C116 17 118 17 120 14 Z" fill="#C79A2B" opacity="0.6" />
      <path d="M140 14 C142 11 144 11 145 14 C144 17 142 17 140 14 Z" fill="#C79A2B" opacity="0.6" />
    </svg>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   HONEYCOMB CORNER DECORATION
───────────────────────────────────────────────────────────────────────────── */
function HoneycombDecor({ corner }) {
  const r  = 20
  const hx = r * Math.sqrt(3)
  const vy = r * 1.5

  const hexPoints = (cx, cy) =>
    Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 180) * (60 * i)
      return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`
    }).join(' ')

  const positions = []
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      positions.push({
        cx: col * hx + (row % 2 === 1 ? hx / 2 : 0) + r,
        cy: row * vy + r,
      })
    }
  }

  const svgW  = 5 * hx + r + 4
  const svgH  = 4 * vy + r * 2 + 4
  const isTop  = corner.includes('top')
  const isLeft = corner.includes('left')

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        top:    isTop  ? 0      : 'auto',
        bottom: isTop  ? 'auto' : 0,
        left:   isLeft ? 0      : 'auto',
        right:  isLeft ? 'auto' : 0,
        opacity: 0.15,
        transform: `scale(${isLeft ? 1 : -1}, ${isTop ? 1 : -1})`,
        transformOrigin: 'center',
      }}
    >
      <svg width={svgW} height={svgH} viewBox={`0 0 ${svgW} ${svgH}`} fill="none">
        {positions.map((p, i) => (
          <polygon
            key={i}
            points={hexPoints(p.cx, p.cy)}
            stroke="#C79A2B"
            strokeWidth="1.5"
            fill="none"
          />
        ))}
      </svg>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   STYLE CONSTANTS
───────────────────────────────────────────────────────────────────────────── */
const PAGE_BG = '#FCFBFA'

const CENTER_GLOW = {
  background: 'radial-gradient(ellipse 60% 50% at 50% 45%, rgba(199,154,43,0.05) 0%, transparent 70%)',
}

const SUBTITLE_STYLE = {
  fontFamily: "'Noto Sans Sinhala', 'Noto Sans Tamil', Plus Jakarta Sans, sans-serif",
  fontSize: 'clamp(0.7rem, 1.8vw, 0.82rem)',
  color: '#4A0918',
  lineHeight: 1.7,
  opacity: 0.82,
}

const FOOTER_TEXT = {
  fontFamily: "'Noto Sans Sinhala', 'Noto Sans Tamil', Plus Jakarta Sans, sans-serif",
  fontSize: 'clamp(0.58rem, 1.4vw, 0.72rem)',
  color: 'rgba(252,251,250,0.8)',
}

const FOOTER_COPYRIGHT = {
  fontFamily: 'Inter, sans-serif',
  fontSize: '0.54rem',
  letterSpacing: '0.05em',
  color: 'rgba(199,154,43,0.5)',
}

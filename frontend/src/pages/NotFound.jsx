import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiHome, FiCompass } from 'react-icons/fi'
import { useFooter } from '../contexts/FooterContext'

const MAROON = '#4A0918'
const GOLD   = '#C79A2B'
const CREAM  = '#FCFBFA'

const floatUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 32, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0,  filter: 'blur(0px)',
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] } },
})

export default function NotFound() {
  const navigate   = useNavigate()
  const [lang]     = useState(() => localStorage.getItem('lang') || 'en')
  const [count, setCount] = useState(10)
  const { setHidden } = useFooter()

  const t = LABELS[lang] || LABELS.en

  useEffect(() => { setHidden(true); return () => setHidden(false) }, [setHidden])

  useEffect(() => {
    if (count <= 0) { navigate('/home'); return }
    const id = setTimeout(() => setCount(c => c - 1), 1000)
    return () => clearTimeout(id)
  }, [count, navigate])

  return (
    <div
      style={{
        height: 'calc(100vh - 76px)',
        maxHeight: 'calc(100vh - 76px)',
        background: CREAM,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* ── Honeycomb corners ── */}
      <div className="hidden md:block" style={{ position: 'absolute', top: 0, left: 0, opacity: 0.08, pointerEvents: 'none' }}>
        <HoneycombCorner />
      </div>
      <div className="hidden md:block" style={{ position: 'absolute', bottom: 0, right: 0, opacity: 0.08, pointerEvents: 'none', transform: 'rotate(180deg)' }}>
        <HoneycombCorner />
      </div>

      {/* ── Radial glow ── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse 65% 55% at 50% 45%, rgba(199,154,43,0.07) 0%, transparent 70%)`,
      }} />

      {/* ── Content ── */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '1rem 1.5rem', maxWidth: 620 }}>

        {/* 404 large number */}
        <motion.div variants={floatUp(0)} initial="hidden" animate="visible">
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: '0.25rem' }}>
            <span style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(5rem, 13vw, 8.5rem)',
              fontWeight: 900,
              lineHeight: 1,
              color: 'transparent',
              WebkitTextStroke: `2px rgba(74,9,24,0.12)`,
              letterSpacing: '-0.04em',
              userSelect: 'none',
              display: 'block',
            }}>
              404
            </span>
            <span style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(5rem, 13vw, 8.5rem)',
              fontWeight: 900,
              lineHeight: 1,
              color: 'transparent',
              background: `linear-gradient(135deg, ${MAROON} 0%, #8B1535 40%, ${GOLD} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.04em',
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              404
            </span>
          </div>
        </motion.div>

        {/* Ornament divider */}
        <motion.div variants={floatUp(0.12)} initial="hidden" animate="visible"
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.75rem' }}>
          <OrnamentDivider />
        </motion.div>

        {/* Heading */}
        <motion.h1 variants={floatUp(0.2)} initial="hidden" animate="visible"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.2rem, 2.5vw, 1.65rem)',
            fontWeight: 700,
            color: MAROON,
            marginBottom: '0.5rem',
            lineHeight: 1.2,
          }}>
          {t.heading}
        </motion.h1>

        {/* Sub text */}
        <motion.p variants={floatUp(0.28)} initial="hidden" animate="visible"
          style={{
            fontFamily: t.font,
            fontSize: 'clamp(0.82rem, 1.3vw, 0.92rem)',
            color: '#5A2030',
            opacity: 0.8,
            lineHeight: 1.65,
            maxWidth: 480,
            margin: '0 auto 1rem',
          }}>
          {t.body}
        </motion.p>

        {/* Redirect countdown */}
        <motion.div variants={floatUp(0.35)} initial="hidden" animate="visible"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: 'rgba(74,9,24,0.06)',
            border: '1px solid rgba(74,9,24,0.1)',
            borderRadius: 100,
            padding: '6px 18px',
            marginBottom: '1rem',
          }}>
          <FiCompass size={14} style={{ color: GOLD }} />
          <span style={{ fontSize: '0.8rem', color: MAROON, opacity: 0.75 }}>
            {t.redirect.replace('{n}', count)}
          </span>
          {/* Countdown ring */}
          <svg width="20" height="20" style={{ flexShrink: 0 }}>
            <circle cx="10" cy="10" r="8" fill="none" stroke="rgba(74,9,24,0.12)" strokeWidth="2" />
            <circle
              cx="10" cy="10" r="8" fill="none"
              stroke={GOLD} strokeWidth="2"
              strokeDasharray={`${2 * Math.PI * 8}`}
              strokeDashoffset={`${2 * Math.PI * 8 * (1 - count / 10)}`}
              strokeLinecap="round"
              transform="rotate(-90 10 10)"
              style={{ transition: 'stroke-dashoffset 1s linear' }}
            />
          </svg>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          variants={floatUp(0.42)} initial="hidden" animate="visible"
          style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <motion.button
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(-1)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 24px', borderRadius: 9,
              background: 'transparent',
              border: `1.5px solid ${MAROON}`,
              color: MAROON, fontFamily: 'Inter, sans-serif',
              fontWeight: 600, fontSize: '0.88rem', cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <FiArrowLeft size={15} /> {t.back}
          </motion.button>

          <Link to="/home" style={{ textDecoration: 'none' }}>
            <motion.div
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '12px 24px', borderRadius: 9,
                background: MAROON, color: '#fff',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600, fontSize: '0.88rem', cursor: 'pointer',
                boxShadow: '0 4px 18px rgba(74,9,24,0.28)',
              }}
            >
              <FiHome size={15} /> {t.home}
            </motion.div>
          </Link>
        </motion.div>

      </div>

      {/* ── Bottom gold ribbon ── */}
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none"
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, width: '100%', height: 80, display: 'block' }}>
        <defs>
          <linearGradient id="nfGold" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#9A7520" stopOpacity="0.5" />
            <stop offset="50%"  stopColor={GOLD}    stopOpacity="0.7" />
            <stop offset="100%" stopColor="#9A7520" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <path d="M-40,55 Q360,10 720,32 Q1080,54 1480,20 L1480,80 L-40,80 Z" fill={MAROON} opacity="0.08" />
        <path d="M-40,65 Q300,25 720,44 Q1080,62 1480,35 L1480,80 L-40,80 Z" fill="url(#nfGold)" opacity="0.45" />
      </svg>
    </div>
  )
}

/* ── Translations ─────────────────────────────────────────────────────────── */
const LABELS = {
  en: {
    font:     'Inter, sans-serif',
    heading:  'Page Not Found',
    body:     'The page you are looking for may have been moved, renamed, or does not exist. Please check the URL or return to the homepage.',
    redirect: 'Redirecting to home in {n}s',
    back:     'Go Back',
    home:     'Go to Home',
  },
  si: {
    font:     "'Noto Sans Sinhala', sans-serif",
    heading:  'පිටුව හමු නොවීය',
    body:     'ඔබ සොයන පිටුව ගෙනයා ගොස්, නැවත නම් කර, හෝ නොපවතිනු ඇත. URL එක පරීක්ෂා කරන්න හෝ මුල් පිටුවට ආපසු යන්න.',
    redirect: 'තත්පර {n}කින් මුල් පිටුවට...',
    back:     'ආපසු යන්න',
    home:     'මුල් පිටුව',
  },
  ta: {
    font:     "'Noto Sans Tamil', sans-serif",
    heading:  'பக்கம் கிடைக்கவில்லை',
    body:     'நீங்கள் தேடும் பக்கம் நகர்த்தப்பட்டிருக்கலாம், மறுபெயரிடப்பட்டிருக்கலாம், அல்லது இல்லாமல் இருக்கலாம். URL ஐ சரிபார்க்கவும்.',
    redirect: '{n} வினாடிகளில் முகப்புக்கு...',
    back:     'திரும்பு',
    home:     'முகப்பு பக்கம்',
  },
}

/* ── Ornament divider ─────────────────────────────────────────────────────── */
function OrnamentDivider() {
  return (
    <svg viewBox="0 0 260 28" fill="none" style={{ width: 'clamp(140px, 50vw, 220px)', height: 'auto' }}>
      <path d="M130 4 L135 14 L130 24 L125 14 Z" fill={GOLD} opacity="0.9" />
      <path d="M130 8 L133 14 L130 20 L127 14 Z" fill={CREAM} opacity="0.8" />
      <line x1="0"   y1="14" x2="115" y2="14" stroke={GOLD} strokeWidth="1" opacity="0.3" />
      <line x1="145" y1="14" x2="260" y2="14" stroke={GOLD} strokeWidth="1" opacity="0.3" />
      <path d="M115 14 C104 14 98 7 90 9 C82 11 80 14 75 14"
        stroke={GOLD} strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.65" />
      <path d="M145 14 C156 14 162 7 170 9 C178 11 180 14 185 14"
        stroke={GOLD} strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.65" />
    </svg>
  )
}

/* ── Honeycomb corner ─────────────────────────────────────────────────────── */
function HoneycombCorner() {
  const r = 16, hx = r * Math.sqrt(3), vy = r * 1.5
  const pts = (cx, cy) =>
    Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 180) * (60 * i)
      return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`
    }).join(' ')
  const cells = []
  for (let row = 0; row < 6; row++)
    for (let col = 0; col < 5; col++)
      cells.push({ cx: col * hx + (row % 2 ? hx / 2 : 0) + r, cy: row * vy + r })
  const W = 5 * hx + r + 2, H = 5 * vy + r * 2 + 2
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none">
      {cells.map((p, i) => (
        <polygon key={i} points={pts(p.cx, p.cy)} stroke={GOLD} strokeWidth="1.3" fill="none" />
      ))}
    </svg>
  )
}

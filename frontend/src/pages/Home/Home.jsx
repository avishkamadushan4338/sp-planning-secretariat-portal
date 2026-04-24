import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import { FiArrowRight, FiUsers, FiFileText, FiTrendingUp } from 'react-icons/fi'
import { HiOutlineOfficeBuilding } from 'react-icons/hi'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'

const MAROON = '#4A0918'
const GOLD   = '#C79A2B'
const CREAM  = '#FCFBFA'
const SLIDE_INTERVAL = 6000

/* ── Slide content per language ──────────────────────────────────────────── */
const SLIDES = {
  en: [
    {
      img:    '/branding/hero.jpeg',
      accent: 'Towards a Prosperous Southern Province',
      line1:  'Planning for',
      line2:  'Sustainable Development',
      line3:  '& A Brighter Tomorrow',
      body:   'The Planning Secretariat – Southern Province is committed to effective planning, coordination, and implementation to ensure sustainable development and improved quality of life for all.',
      btn1: { label: 'Our Divisions',    path: '/departments' },
      btn2: { label: 'Explore Services', path: '/services'    },
    },
    {
      img:    '/branding/hero2.jpeg',
      accent: 'Coordinating Growth Across the Province',
      line1:  'Governing with',
      line2:  'Purpose & Vision',
      line3:  'Across 12+ Divisions',
      body:   'Twelve specialised divisions work in harmony to drive economic progress, infrastructure development, and social welfare throughout the Southern Province.',
      btn1: { label: 'Our Divisions',  path: '/departments' },
      btn2: { label: 'Learn More',     path: '/documents'   },
    },
    {
      img:    '/branding/hero3.jpeg',
      accent: 'Empowering Every Community',
      line1:  'Serving Over',
      line2:  '500,000 Citizens',
      line3:  'With Pride & Dedication',
      body:   'From Galle to Hambantota, our secretariat delivers inclusive public services, transparent governance, and community-driven development to every corner of the Southern Province.',
      btn1: { label: 'Our Services', path: '/services' },
      btn2: { label: 'Contact Us',   path: '/contact'  },
    },
  ],
  si: [
    {
      img:    '/branding/hero.jpeg',
      accent: 'සමෘද්ධිමත් දකුණු පළාතක් කරා',
      line1:  'සැලසුම් කිරීම',
      line2:  'තිරසාර සංවර්ධනය',
      line3:  'හා දීප්තිමත් හෙටක් සඳහා',
      body:   'දකුණු පළාත් සැලසුම් ලේකම් කාර්යාලය, සියලු දෙනාට තිරසාර සංවර්ධනය හා ජීවන තත්ත්වය ඉහළ නැංවීම සඳහා ඵලදායී සැලසුම් කිරීම, සම්බන්ධීකරණය හා ක්‍රියාත්මක කිරීමට කැපවී සිටී.',
      btn1: { label: 'අපගේ අංශ',       path: '/departments' },
      btn2: { label: 'සේවාවන් බලන්න', path: '/services' },
    },
    {
      img:    '/branding/hero2.jpeg',
      accent: 'පළාත පුරා සංවර්ධනය සම්බන්ධීකරණය',
      line1:  'ඉලක්කයක් සහිතව',
      line2:  'පාලනය කිරීම',
      line3:  'අංශ 12+ හරහා',
      body:   'දකුණු පළාතේ ආර්ථික සංවර්ධනය, යටිතල පහසුකම් සංවර්ධනය සහ සමාජ සුබසාධනය ඉදිරිරොු ගෙනයාමට විශේෂිත අංශ 12 ක් එකිනෙකා සමඟ කාර්යක්ෂමව ක්‍රියා කරයි.',
      btn1: { label: 'අපගේ අංශ',     path: '/departments' },
      btn2: { label: 'ලේඛන බලන්න',      path: '/documents' },
    },
    {
      img:    '/branding/hero3.jpeg',
      accent: 'සෑම ප්‍රජාවක්ම සවිබලගන්වමින්',
      line1:  'ජනතාව',
      line2:  '500,000 කට අධිකව',
      line3:  'සේවය කිරීම',
      body:   'ගාල්ලේ සිට හම්බන්තොට දක්වා, අපගේ ලේකම් කාර්යාලය දකුණු පළාතේ සෑම කෙළවරකම සියලු ජනතාවට සේවාවන් ලබා දේ.',
      btn1: { label: 'සේවාවන්',      path: '/services' },
      btn2: { label: 'අප අමතන්න',   path: '/contact'  },
    },
  ],
  ta: [
    {
      img:    '/branding/hero.jpeg',
      accent: 'வளமான தென் மாகாணத்தை நோக்கி',
      line1:  'திட்டமிடல்',
      line2:  'நிலையான வளர்ச்சி',
      line3:  'ஒரு பிரகாசமான நாளை நோக்கி',
      body:   'தென் மாகாண திட்டமிடல் செயலகம், அனைவருக்கும் நிலையான வளர்ச்சியையும் மேம்பட்ட வாழ்க்கைத் தரத்தையும் உறுதிப்படுத்த அர்ப்பணிக்கப்பட்டுள்ளது.',
      btn1: { label: 'எங்கள் பிரிவுகள்', path: '/departments' },
      btn2: { label: 'சேவைகளை காண்க',  path: '/services' },
    },
    {
      img:    '/branding/hero2.jpeg',
      accent: 'மாகாணம் முழுவதும் வளர்ச்சியை ஒருங்கிணைத்தல்',
      line1:  'நோக்கத்துடன்',
      line2:  'நிர்வகித்தல்',
      line3:  '12+ பிரிவுகள் வழியாக',
      body:   'பன்னிரண்டு சிறப்பு பிரிவுகள் இணைந்து தென் மாகாணத்தின் பொருளாதார முன்னேற்றம், உள்கட்டமைப்பு மேம்பாடு மற்றும் சமூக நலனை இயக்குகின்றன.',
      btn1: { label: 'எங்கள் பிரிவுகள்', path: '/departments' },
      btn2: { label: 'மேலும் பார்க்க',   path: '/documents'   },
    },
    {
      img:    '/branding/hero3.jpeg',
      accent: 'ஒவ்வொரு சமுதாயத்தையும் வலுப்படுத்துதல்',
      line1:  '500,000க்கும் அதிகமான',
      line2:  'குடிமக்களுக்கு',
      line3:  'சேவை செய்கிறோம்',
      body:   'காலி முதல் அம்பாந்தோட்டை வரை, தென் மாகாணத்தின் ஒவ்வொரு மூலையிலும் அனைவருக்கும் சேவைகளை வழங்குகிறோம்.',
      btn1: { label: 'சேவைகள்',        path: '/services' },
      btn2: { label: 'தொடர்பு கொள்',  path: '/contact'  },
    },
  ],
}

const LANG_META = {
  en: { font: 'Inter, sans-serif',                  headFont: "'Playfair Display', Georgia, serif", stats: ['Divisions & Departments','Active Projects','Beneficiaries','Project Success Rate'] },
  si: { font: "'Noto Sans Sinhala', sans-serif",    headFont: "'Noto Sans Sinhala', sans-serif",    stats: ['අංශ හා දෙපාර්තමේන්තු','සක්‍රීය ව්‍යාපෘති','ප්‍රතිලාභීන්','ව්‍යාපෘති සාර්ථකත්වය'] },
  ta: { font: "'Noto Sans Tamil', sans-serif",       headFont: "'Noto Sans Tamil', sans-serif",      stats: ['பிரிவுகள் & திணைக்களங்கள்','செயலில் உள்ள திட்டங்கள்','பயனாளிகள்','திட்ட வெற்றி விகிதம்'] },
}

const STAT_ICONS = [HiOutlineOfficeBuilding, FiFileText, FiUsers, FiTrendingUp]
const STAT_DATA  = [
  { end: 12,  suffix: '+',  decimals: 0 },
  { end: 250, suffix: '+',  decimals: 0 },
  { end: 500, suffix: 'K+', decimals: 0 },
  { end: 98,  suffix: '%',  decimals: 0 },
]

/* ── Animation variants ──────────────────────────────────────────────────── */
const textEnter = {
  hidden:  { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, x: -20, transition: { duration: 0.25, ease: [0.4, 0, 1, 1] } },
}

const mkLine = (delay) => ({
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] } },
})
const LINE_ENTER = [mkLine(0.04), mkLine(0.13), mkLine(0.22), mkLine(0.35), mkLine(0.46)]

const countUpEasing = (t, b, c, d) => c * (1 - Math.pow(2, -10 * t / d)) + b


/* ── Home ────────────────────────────────────────────────────────────────── */
export default function Home() {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en')

  useEffect(() => {
    const h = (e) => setLang(e.detail || 'en')
    window.addEventListener('langChange', h)
    return () => window.removeEventListener('langChange', h)
  }, [])

  const meta   = LANG_META[lang] || LANG_META.en
  const slides = SLIDES[lang]    || SLIDES.en

  return (
    <div style={{ background: CREAM }}>
      <HeroSection slides={slides} meta={meta} />
    </div>
  )
}

/* ── Hero section ────────────────────────────────────────────────────────── */
function HeroSection({ slides, meta }) {
  const [idx, setIdx] = useState(0)

  const total = slides.length
  const slide = slides[idx]
  const isNonLatin = meta.headFont.includes('Sinhala') || meta.headFont.includes('Tamil')

  const goTo = useCallback((n) => {
    setIdx((n + total) % total)
  }, [total])

  /* Pre-decode all slide images so they're compositor-ready before first transition */
  useEffect(() => {
    slides.forEach(s => {
      const img = new Image()
      img.src = s.img
      img.decode().catch(() => {})
    })
  }, [slides])

  /* Auto-advance — single timeout, no repeated state updates */
  useEffect(() => {
    const id = setTimeout(() => goTo(idx + 1), SLIDE_INTERVAL)
    return () => clearTimeout(id)
  }, [idx, goTo])

  return (
    <section
      className="hero-section relative overflow-hidden"
      style={{ height: 'calc(100vh - 76px)', minHeight: '600px', background: CREAM }}
    >

      {/* ── Slide progress bar — top edge ── */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, zIndex: 10, background: 'rgba(199,154,43,0.15)' }}>
        <motion.div
          key={idx}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: SLIDE_INTERVAL / 1000, ease: 'linear' }}
          style={{ height: '100%', background: `linear-gradient(90deg, ${GOLD}, #E8C55A)`, transformOrigin: 'left', width: '100%' }}
        />
      </div>

      {/* ── Image panels — all kept in DOM, pure CSS opacity crossfade ── */}
      {slides.map((s, i) => (
        <div
          key={s.img}
          className="hero-image-panel"
          aria-hidden="true"
          style={{
            position: 'absolute', top: 0, right: 0, bottom: 0, left: '32%', zIndex: 0,
            opacity: i === idx ? 1 : 0,
            transition: 'opacity 0.85s ease',
            willChange: 'opacity',
          }}
        >
          <img
            src={s.img}
            alt=""
            aria-hidden="true"
            onError={(e) => { e.currentTarget.style.opacity = '0' }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 25%', display: 'block' }}
          />
          <div className="hero-image-overlay" style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(to right, ${CREAM} 0%, ${CREAM}CC 12%, ${CREAM}66 28%, transparent 52%)`,
          }} />
        </div>
      ))}

      {/* ── Honeycomb left-edge ── */}
      <div className="hidden lg:block" style={{ position: 'absolute', left: 0, top: 0, opacity: 0.1, zIndex: 1, pointerEvents: 'none' }}>
        <HoneycombPanel />
      </div>

      {/* ── Text content — re-animates on slide change ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`text-${idx}`}
          className="hero-text-content"
          variants={textEnter}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            zIndex: 2,
            willChange: 'transform, opacity',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            paddingLeft: 'clamp(0.75rem, 2vw, 2rem)',
            paddingRight: '2rem',
            paddingBottom: '130px',
            maxWidth: '760px',
          }}
        >
          {/* Slide counter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1rem' }}>
            <DiamondIcon />
            <span className="hero-accent" style={{
              fontFamily: isNonLatin ? meta.font : "'Cinzel', serif",
              fontSize: 'clamp(0.65rem, 1.2vw, 0.8rem)',
              color: GOLD, fontWeight: 600, letterSpacing: isNonLatin ? 0 : '0.06em',
            }}>
              {slide.accent}
            </span>
          </div>

          {/* Heading */}
          <h1 className="hero-heading" style={{
            fontFamily: meta.headFont,
            fontSize: isNonLatin ? 'clamp(1.35rem, 2.5vw, 2.3rem)' : 'clamp(1.6rem, 3vw, 2.75rem)',
            lineHeight: isNonLatin ? 1.45 : 1.18,
            color: MAROON, fontWeight: 800,
            marginBottom: '0.5rem', overflow: 'hidden',
          }}>
            <motion.span className="hero-heading-line" style={{ display: 'block', whiteSpace: 'nowrap' }} variants={LINE_ENTER[0]} initial="hidden" animate="visible">
              {slide.line1}
            </motion.span>
            <motion.span className="hero-heading-line hero-heading-line--gold" style={{ display: 'block', whiteSpace: 'nowrap', color: GOLD }} variants={LINE_ENTER[1]} initial="hidden" animate="visible">
              {slide.line2}
            </motion.span>
            <motion.span className="hero-heading-line" style={{ display: 'block', whiteSpace: 'nowrap' }} variants={LINE_ENTER[2]} initial="hidden" animate="visible">
              {slide.line3}
            </motion.span>
          </h1>

          {/* Gold rule */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: 64, height: 3, background: `linear-gradient(90deg, ${GOLD}, transparent)`, borderRadius: 2, marginBottom: '0.75rem', transformOrigin: 'left' }}
          />

          {/* Body */}
          <motion.p
            className="hero-body"
            variants={LINE_ENTER[3]} initial="hidden" animate="visible"
            style={{ fontFamily: meta.font, fontSize: 'clamp(0.85rem, 1.3vw, 0.98rem)', color: '#5A2030', lineHeight: 1.85, maxWidth: 480, marginBottom: '1.2rem', opacity: 0.87 }}
          >
            {slide.body}
          </motion.p>

          {/* Buttons */}
          <motion.div className="hero-buttons flex flex-wrap gap-4" variants={LINE_ENTER[4]} initial="hidden" animate="visible">
            <HeroButton to={slide.btn1.path} icon={<FiUsers size={15} />}    variant="primary" font={meta.font}>{slide.btn1.label}</HeroButton>
            <HeroButton to={slide.btn2.path} icon={<FiFileText size={15} />} variant="gold"    font={meta.font}>{slide.btn2.label}</HeroButton>
          </motion.div>
        </motion.div>
      </AnimatePresence>


      {/* ── Stats bar ── */}
      <StatsBar labels={meta.stats} font={meta.font} />
    </section>
  )
}


/* ── Stats bar ───────────────────────────────────────────────────────────── */
function StatsBar({ labels, font }) {
  const { ref, inView } = useInView({ threshold: 0.4, triggerOnce: true })

  return (
    <div className="stats-bar-outer" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 3 }}>

      <div className="stats-bar-wrap" style={{ position: 'relative', zIndex: 2, padding: '0 40px', marginBottom: '32px' }}>
        <div ref={ref} className="stats-grid" style={{
          maxWidth: 920, margin: '0 auto',
          background: 'rgba(74,9,24,0.82)',
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(199,154,43,0.28)', borderRadius: '18px',
          padding: '18px 32px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.35), 0 6px 20px rgba(0,0,0,0.2), inset 0 1px 0 rgba(199,154,43,0.18)',
        }}>
          {STAT_DATA.map(({ end, suffix, decimals }, i) => {
            const Icon = STAT_ICONS[i]
            return (
              <div key={i} className="stat-item" style={{
                display: 'flex', alignItems: 'center', gap: 14,
                borderRight: i < 3 ? '1px solid rgba(199,154,43,0.18)' : 'none',
                paddingRight: i < 3 ? 24 : 0, paddingLeft: i > 0 ? 24 : 0,
              }}>
                <div style={{
                  width: 46, height: 46, borderRadius: '50%', flexShrink: 0,
                  background: 'rgba(40,4,14,0.65)', border: '1px solid rgba(199,154,43,0.32)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.25)',
                }}>
                  <Icon size={20} style={{ color: GOLD }} />
                </div>
                <div>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.1rem,1.9vw,1.45rem)', fontWeight: 700, color: GOLD, lineHeight: 1.1 }}>
                    {inView
                      ? <CountUp start={0} end={end} duration={2.2} delay={i * 0.15} decimals={decimals} suffix={suffix} useEasing easingFn={countUpEasing} />
                      : <span>0{suffix}</span>
                    }
                  </p>
                  <p style={{ fontFamily: font, fontSize: 'clamp(0.6rem,0.85vw,0.7rem)', color: 'rgba(252,251,250,0.65)', letterSpacing: '0.02em', lineHeight: 1.3 }}>
                    {labels[i]}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Gold ribbon */}
      <svg viewBox="0 0 1440 110" preserveAspectRatio="none" style={{ width: '100%', height: 110, display: 'block', position: 'absolute', bottom: 0, left: 0, zIndex: 0 }}>
        <defs>
          <linearGradient id="gr1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"  stopColor="#7A5A10" stopOpacity="0.7" />
            <stop offset="50%" stopColor={GOLD}    stopOpacity="0.55" />
            <stop offset="100%" stopColor="#7A5A10" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="gr2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"  stopColor="#9A7520" />
            <stop offset="35%" stopColor={GOLD} />
            <stop offset="65%" stopColor="#E8C55A" />
            <stop offset="100%" stopColor="#9A7520" />
          </linearGradient>
        </defs>
        <path d="M-40,75 Q360,18 800,52 Q1100,75 1480,30 L1480,110 L-40,110 Z" fill="url(#gr1)" />
        <path d="M-40,88 Q300,42 720,62 Q1080,80 1480,45 L1480,110 L-40,110 Z" fill="url(#gr2)" opacity="0.92" />
        <path d="M-40,88 Q300,42 720,62 Q1080,80 1480,45" stroke="rgba(255,240,180,0.5)" strokeWidth="1.5" fill="none" />
      </svg>
      {/* Maroon base */}
      <svg viewBox="0 0 1440 55" preserveAspectRatio="none" style={{ width: '100%', height: 55, display: 'block', position: 'absolute', bottom: 0, left: 0, zIndex: 0 }}>
        <path d="M0,55 Q360,8 720,28 Q1080,48 1440,12 L1440,55 Z" fill={MAROON} />
      </svg>
    </div>
  )
}

/* ── Hero button ─────────────────────────────────────────────────────────── */
function HeroButton({ to, icon, variant, font, children }) {
  const primary = variant === 'primary'
  return (
    <Link to={to} style={{ textDecoration: 'none' }}>
      <motion.div
        whileHover={{ y: -2, scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '12px 24px', borderRadius: 8,
          background: primary ? MAROON : GOLD,
          color: '#fff', fontFamily: font || 'Inter, sans-serif',
          fontWeight: 600, fontSize: '0.88rem', letterSpacing: '0.02em',
          cursor: 'pointer',
          boxShadow: primary ? '0 4px 18px rgba(74,9,24,0.28)' : '0 4px 18px rgba(199,154,43,0.35)',
        }}
      >
        {icon}{children}
        <FiArrowRight size={14} strokeWidth={2.5} style={{ marginLeft: 2 }} />
      </motion.div>
    </Link>
  )
}

function DiamondIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
      <path d="M7 0.5 L13.5 7 L7 13.5 L0.5 7 Z" fill={GOLD} opacity="0.9" />
      <path d="M7 3 L11 7 L7 11 L3 7 Z" fill={CREAM} opacity="0.7" />
    </svg>
  )
}

function HoneycombPanel() {
  const r = 18, hx = r * Math.sqrt(3), vy = r * 1.5
  const pts = (cx, cy) =>
    Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 180) * (60 * i)
      return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`
    }).join(' ')
  const cells = []
  for (let row = 0; row < 14; row++)
    for (let col = 0; col < 4; col++)
      cells.push({ cx: col * hx + (row % 2 ? hx / 2 : 0) + r, cy: row * vy + r })
  const W = 4 * hx + r + 4, H = 13 * vy + r * 2 + 4
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none">
      {cells.map((p, i) => <polygon key={i} points={pts(p.cx, p.cy)} stroke={GOLD} strokeWidth="1.4" fill="none" />)}
    </svg>
  )
}

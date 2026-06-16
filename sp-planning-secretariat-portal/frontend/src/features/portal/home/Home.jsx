import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { SeoHead } from '@/shared/seo'
import './Home.css'
import { FiArrowRight, FiUsers, FiMapPin, FiTrendingUp, FiFileText } from 'react-icons/fi'
import { HiOutlineOfficeBuilding } from 'react-icons/hi'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import HomeNewsBar from './HomeNewsBar'
import HomeQuickLinks from './HomeQuickLinks'
import HomeAboutSecretariat from './HomeAboutSecretariat'
import HomeDeputySecretaryMessage from './HomeDeputySecretaryMessage'
import HomeEventsAndInstitutes from './HomeEventsAndInstitutes'
import HomeFAQHighlights from './HomeFAQHighlights'

const GOLD           = '#C79A2B'
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
      line3:  'Across 03 Divisions',
      body:   'Twelve specialised divisions work in harmony to drive economic progress, infrastructure development, and social welfare throughout the Southern Province.',
      btn1: { label: 'Our Divisions', path: '/departments' },
      btn2: { label: 'Learn More',    path: '/documents'   },
    },
    {
      img:    '/branding/hero3.jpeg',
      accent: 'Empowering Every Community',
      line1:  'Serving Over',
      line2:  '2,600,000 Citizens',
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
      line1:  'තිරසාර සංවර්ධනය',
      line2:  'හා දීප්තිමත් හෙටක් සඳහා',
      line3:  'සැලසුම් කිරීම',
      body:   'දකුණු පළාත් සැලසුම් ලේකම් කාර්යාලය, සියලු දෙනාට තිරසාර සංවර්ධනය හා ජීවන තත්ත්වය ඉහළ නැංවීම සඳහා ඵලදායී සැලසුම් කිරීම, සම්බන්ධීකරණය හා ක්‍රියාත්මක කිරීමට කැපවී සිටී.',
      btn1: { label: 'අපගේ අංශ',       path: '/departments' },
      btn2: { label: 'සේවාවන් බලන්න', path: '/services'     },
    },
    {
      img:    '/branding/hero2.jpeg',
      accent: 'පළාත පුරා සංවර්ධනය සම්බන්ධීකරණය',
      line1:  'ඉලක්කයක් සහිතව',
      line2:  'අංශ 03 හරහා',
      line3:  'පාලනය කිරීම',
      body:   'දකුණු පළාතේ ආර්ථික සංවර්ධනය, යටිතල පහසුකම් සංවර්ධනය සහ සමාජ සුබසාධනය ඉදිරියට ගෙනයාමට විශේෂිත අංශ 3 ක් එකිනෙකා සමඟ කාර්යක්ෂමව ක්‍රියා කරයි.',
      btn1: { label: 'අපගේ අංශ',  path: '/departments' },
      btn2: { label: 'ලේඛන බලන්න', path: '/documents'  },
    },
    {
      img:    '/branding/hero3.jpeg',
      accent: 'සෑම ප්‍රජාවක්ම සවිබලගන්වමින්',
      line1:  'ජනතාව',
      line2:  '2,600,000 කට අධිකව',
      line3:  'සේවය කිරීම',
      body:   'ගාල්ලේ සිට හම්බන්තොට දක්වා, අපගේ ලේකම් කාර්යාලය දකුණු පළාතේ සෑම කෙළවරකම සියලු ජනතාවට සේවාවන් ලබා දේ.',
      btn1: { label: 'සේවාවන්',    path: '/services' },
      btn2: { label: 'අප අමතන්න', path: '/contact'  },
    },
  ],
  ta: [
    {
      img:    '/branding/hero.jpeg',
      accent: 'வளமான தென் மாகாணத்தை நோக்கி',
      line1:  'திட்டமிடல்',
      line2:  'நிலையான வளர்ச்சி',
      line3:  'ஒரு பிரகாசமான நாளை',
      body:   'தென் மாகாண திட்டமிடல் செயலகம், அனைவருக்கும் நிலையான வளர்ச்சியையும் மேம்பட்ட வாழ்க்கைத் தரத்தையும் உறுதிப்படுத்த அர்ப்பணிக்கப்பட்டுள்ளது.',
      btn1: { label: 'எங்கள் பிரிவுகள்', path: '/departments' },
      btn2: { label: 'சேவைகளை காண்க',   path: '/services'    },
    },
    {
      img:    '/branding/hero2.jpeg',
      accent: 'மாகாணம் முழுவதும் வளர்ச்சியை ஒருங்கிணைத்தல்',
      line1:  'நோக்கத்துடன்',
      line2:  'நிர்வகித்தல்',
      line3:  '03 பிரிவுகள் வழியாக',
      body:   'பன்னிரண்டு சிறப்பு பிரிவுகள் இணைந்து தென் மாகாணத்தின் பொருளாதார முன்னேற்றம், உள்கட்டமைப்பு மேம்பாடு மற்றும் சமூக நலனை இயக்குகின்றன.',
      btn1: { label: 'எங்கள் பிரிவுகள்', path: '/departments' },
      btn2: { label: 'மேலும் பார்க்க',   path: '/documents'   },
    },
    {
      img:    '/branding/hero3.jpeg',
      accent: 'ஒவ்வொரு சமுதாயத்தையும் வலுப்படுத்துதல்',
      line1:  '2,600,000 க்கும் அதிகமான',
      line2:  'குடிமக்களுக்கு',
      line3:  'சேவை செய்கிறோம்',
      body:   'காலி முதல் அம்பாந்தோட்டை வரை, தென் மாகாணத்தின் ஒவ்வொரு மூலையிலும் அனைவருக்கும் சேவைகளை வழங்குகிறோம்.',
      btn1: { label: 'சேவைகள்',       path: '/services' },
      btn2: { label: 'தொடர்பு கொள்', path: '/contact'  },
    },
  ],
}

const LANG_META = {
  en: { font: 'Inter, sans-serif',               headFont: "'Playfair Display', Georgia, serif", stats: ['Divisions','District','Beneficiaries','Project Success Rate'] },
  si: { font: "'Noto Sans Sinhala', sans-serif",  headFont: "'Noto Sans Sinhala', sans-serif",    stats: ['අංශ','දිස්ත්‍රික්කය','ප්‍රතිලාභීන්','සාර්ථකත්වය'] },
  ta: { font: "'Noto Sans Tamil', sans-serif",    headFont: "'Noto Sans Tamil', sans-serif",       stats: ['திணைக்களங்கள்','மாவட்டம்','பயனாளிகள்','வெற்றி விகிதம்'] },
}

const STAT_ICONS = [HiOutlineOfficeBuilding, FiMapPin, FiUsers, FiTrendingUp]
const STAT_DATA  = [
  { end: 3,   suffix: '',   decimals: 0 },
  { end: 3,   suffix: '',   decimals: 0 },
  { end: 500, suffix: 'K+', decimals: 0 },
  { end: 85,  suffix: '%',  decimals: 0 },
]

/* ── Animation variants ──────────────────────────────────────────────────── */

/* Glass card — fades + lifts in, dissolves out downward */
const cardVariants = {
  hidden:  { opacity: 0, y: 28, filter: 'blur(6px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] }
  },
  exit: {
    opacity: 0, y: -16, filter: 'blur(4px)',
    transition: { duration: 0.42, ease: [0.4, 0, 1, 1] }
  },
}

/* Individual content lines — staggered upward reveal with blur */
const mkLine = (delay) => ({
  hidden:  { opacity: 0, y: 22, filter: 'blur(4px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.60, delay, ease: [0.22, 1, 0.36, 1] }
  },
})
const LINE_ENTER = [
  mkLine(0.10),  /* line1   */
  mkLine(0.20),  /* line2 gold */
  mkLine(0.30),  /* line3   */
  mkLine(0.42),  /* body    */
  mkLine(0.54),  /* buttons */
]

/* Eyebrow pill — scales in from left */
const eyebrowVariants = {
  hidden:  { opacity: 0, x: -16, scale: 0.92 },
  visible: { opacity: 1, x: 0,   scale: 1,
    transition: { duration: 0.55, delay: 0.02, ease: [0.22, 1, 0.36, 1] }
  },
}

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
    <>
      <SeoHead page="home" />
      <div className="home-wrap">
        <HeroSection slides={slides} meta={meta} />
        <HomeNewsBar lang={lang} />
        <HomeQuickLinks lang={lang} />
        <HomeAboutSecretariat lang={lang} />
        <HomeDeputySecretaryMessage lang={lang} />
        <HomeFAQHighlights lang={lang} />
        <HomeEventsAndInstitutes lang={lang} />
      </div>
    </>
  )
}

/* ── Hero section ────────────────────────────────────────────────────────── */
function HeroSection({ slides, meta }) {
  const [idx, setIdx] = useState(0)

  const total      = slides.length
  const slide      = slides[idx]
  const isNonLatin = meta.headFont.includes('Sinhala') || meta.headFont.includes('Tamil')

  const goTo = useCallback((n) => setIdx((n + total) % total), [total])

  /* Pre-decode all slide images so they're compositor-ready before first transition */
  useEffect(() => {
    slides.forEach(s => {
      const img = new Image()
      img.src = s.img
      img.decode().catch(() => {})
    })
  }, [slides])

  /* Auto-advance */
  useEffect(() => {
    const id = setTimeout(() => goTo(idx + 1), SLIDE_INTERVAL)
    return () => clearTimeout(id)
  }, [idx, goTo])

  return (
    <section className="hero" aria-label="Hero carousel">

      {/* Top progress bar */}
      <div className="hero__progress" aria-hidden="true">
        <motion.div
          key={idx}
          className="hero__progress-fill"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: SLIDE_INTERVAL / 1000, ease: 'linear' }}
        />
      </div>

      {/* Background image panels — crossfade + Ken Burns zoom */}
      {slides.map((s, i) => (
        <div
          key={s.img}
          className={`hero__bg${i === idx ? ' hero__bg--active' : ''}`}
          aria-hidden="true"
        >
          <motion.img
            src={s.img}
            alt=""
            className="hero__bg-img"
            animate={i === idx ? { scale: 1.06 } : { scale: 1 }}
            initial={{ scale: 1 }}
            transition={{ duration: SLIDE_INTERVAL / 1000, ease: 'linear' }}
            onError={(e) => { e.currentTarget.style.opacity = '0' }}
          />
          <div className="hero__bg-overlay" />
        </div>
      ))}

      {/* Decorative layer */}
      <div className="hero__honeycomb" aria-hidden="true"><HoneycombPanel /></div>
      <div className="hero__orb hero__orb--a"   aria-hidden="true" />
      <div className="hero__orb hero__orb--b"   aria-hidden="true" />
      <div className="hero__beams"              aria-hidden="true" />

      {/* Main flex content */}
      <div className="hero__main">
        <AnimatePresence mode="wait">
          <motion.div
            key={`text-${idx}`}
            className="hero__glass"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >

            {/* Eyebrow */}
            <motion.div
              className="hero__eyebrow"
              variants={eyebrowVariants}
              initial="hidden"
              animate="visible"
            >
              <DiamondIcon />
              <span
                className={`hero__accent${isNonLatin ? ' hero__accent--nl' : ''}`}
                style={{ fontFamily: isNonLatin ? meta.font : "'Cinzel', serif" }}
              >
                {slide.accent}
              </span>
            </motion.div>

            {/* Heading */}
            <h1
              className={`hero__heading${isNonLatin ? ' hero__heading--nl' : ''}`}
              style={{ fontFamily: meta.headFont }}
            >
              <motion.span className="hero__line" variants={LINE_ENTER[0]} initial="hidden" animate="visible">
                {slide.line1}
              </motion.span>
              <motion.span className="hero__line hero__line--gold" variants={LINE_ENTER[1]} initial="hidden" animate="visible">
                {slide.line2}
              </motion.span>
              <motion.span className="hero__line" variants={LINE_ENTER[2]} initial="hidden" animate="visible">
                {slide.line3}
              </motion.span>
            </h1>

            {/* Gold rule */}
            <motion.div
              className="hero__rule"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Body */}
            <motion.p
              className="hero__body"
              style={{ fontFamily: meta.font }}
              variants={LINE_ENTER[3]}
              initial="hidden"
              animate="visible"
            >
              {slide.body}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              className="hero__actions"
              variants={LINE_ENTER[4]}
              initial="hidden"
              animate="visible"
            >
              <HeroBtn to={slide.btn1.path} icon={<FiUsers size={15} />} solid font={meta.font}>
                {slide.btn1.label}
              </HeroBtn>
              <HeroBtn to={slide.btn2.path} icon={<FiFileText size={15} />} font={meta.font}>
                {slide.btn2.label}
              </HeroBtn>
            </motion.div>

            {/* Slide dots */}
            <div className="hero__dots" role="tablist" aria-label="Slide navigation">
              {slides.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === idx}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`hero__dot${i === idx ? ' hero__dot--on' : ''}`}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Stats bar — flex child, sits naturally below hero__main */}
      <StatsBar labels={meta.stats} font={meta.font} />
    </section>
  )
}

/* ── Stats bar ───────────────────────────────────────────────────────────── */
function StatsBar({ labels, font }) {
  const { ref, inView } = useInView({ threshold: 0.4, triggerOnce: true })

  return (
    <div className="stats-bar">
      <div className="stats-bar__inner">
        <div ref={ref} className="stats-grid">
          {STAT_DATA.map(({ end, suffix, decimals }, i) => {
            const Icon = STAT_ICONS[i]
            return (
              <div key={i} className="stat-item">
                <div className="stat-icon">
                  <Icon size={20} style={{ color: GOLD }} />
                </div>
                <div className="stat-text">
                  <p className="stat-num" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {inView
                      ? <CountUp start={0} end={end} duration={2.2} delay={i * 0.15} decimals={decimals} suffix={suffix} useEasing easingFn={countUpEasing} />
                      : <span>0{suffix}</span>
                    }
                  </p>
                  <p className="stat-lbl" style={{ fontFamily: font }}>
                    {labels[i]}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Decorative wave SVGs */}
      <svg className="stats-wave stats-wave--gold" viewBox="0 0 1440 110" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="wg1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#7A5A10" stopOpacity="0.7" />
            <stop offset="50%"  stopColor="#C79A2B" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#7A5A10" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="wg2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#9A7520" />
            <stop offset="35%"  stopColor="#C79A2B" />
            <stop offset="65%"  stopColor="#E8C55A" />
            <stop offset="100%" stopColor="#9A7520" />
          </linearGradient>
        </defs>
        <path d="M-40,75 Q360,18 800,52 Q1100,75 1480,30 L1480,110 L-40,110 Z" fill="url(#wg1)" />
        <path d="M-40,88 Q300,42 720,62 Q1080,80 1480,45 L1480,110 L-40,110 Z" fill="url(#wg2)" opacity="0.92" />
        <path d="M-40,88 Q300,42 720,62 Q1080,80 1480,45" stroke="rgba(255,240,180,0.5)" strokeWidth="1.5" fill="none" />
      </svg>
      <svg className="stats-wave stats-wave--maroon" viewBox="0 0 1440 55" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,55 Q360,8 720,28 Q1080,48 1440,12 L1440,55 Z" fill="#4A0918" />
      </svg>
    </div>
  )
}

/* ── Hero button ─────────────────────────────────────────────────────────── */
function HeroBtn({ to, icon, solid, font, children }) {
  return (
    <Link
      to={to}
      className={`hbtn${solid ? ' hbtn--solid' : ' hbtn--gold'}`}
      style={{ fontFamily: font || 'Inter, sans-serif' }}
    >
      <motion.span
        className="hbtn__inner"
        whileHover={{ y: -2, scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
      >
        {icon}
        <span>{children}</span>
        <FiArrowRight size={14} strokeWidth={2.5} />
      </motion.span>
    </Link>
  )
}

/* ── Diamond icon ────────────────────────────────────────────────────────── */
function DiamondIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7 0.5 L13.5 7 L7 13.5 L0.5 7 Z" fill="#C79A2B" opacity="0.9" />
      <path d="M7 3 L11 7 L7 11 L3 7 Z"         fill="#FCFBFA" opacity="0.7" />
    </svg>
  )
}

/* ── Honeycomb panel ─────────────────────────────────────────────────────── */
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
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none" aria-hidden="true">
      {cells.map((p, i) => (
        <polygon key={i} points={pts(p.cx, p.cy)} stroke="#C79A2B" strokeWidth="1.4" fill="none" />
      ))}
    </svg>
  )
}

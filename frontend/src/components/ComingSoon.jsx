import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiHome, FiArrowLeft } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useFooter } from '../contexts/FooterContext'

const MAROON = '#4A0918'
const GOLD   = '#C79A2B'
const CREAM  = '#FCFBFA'

const floatUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 28, filter: 'blur(5px)' },
  visible: { opacity: 1, y: 0,  filter: 'blur(0px)',
    transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] } },
})

const LABELS = {
  en: { under: 'Under Development', body: 'This section is currently being built. We\'re working hard to bring it online soon.', back: 'Go Back', home: 'Back to Home' },
  si: { under: 'සංවර්ධනය වෙමින් පවතී', body: 'මෙම කොටස දැනට ගොඩනැගෙමින් පවතී. ඉක්මනින්ම ඔබ වෙත ලබා දීමට කටයුතු කරමින් සිටිමු.', back: 'ආපසු යන්න', home: 'මුල් පිටුව' },
  ta: { under: 'அபிவிருத்தியில் உள்ளது', body: 'இந்த பகுதி தற்போது உருவாக்கப்பட்டு வருகிறது. விரைவில் உங்களுக்கு கிடைக்கும்.', back: 'திரும்பு', home: 'முகப்பு' },
}

export default function ComingSoon({ pageKey }) {
  const navigate = useNavigate()
  const lang = localStorage.getItem('lang') || 'en'
  const t    = LABELS[lang] || LABELS.en
  const { setHidden } = useFooter()
  useEffect(() => { setHidden(true); return () => setHidden(false) }, [])

  const PAGE_NAMES = {
    en: {
      about:       'About Us',
      aboutMinistryOverview: 'Ministry Overview',
      aboutMinister: 'Hon. Minister',
      aboutDeputyMinisterEducation: 'Hon. Deputy Minister (Education & Higher Education)',
      aboutDeputyMinisterVocational: 'Hon. Deputy Minister (Vocational Education)',
      aboutOrganizationStructure: 'Organization Structure',
      aboutFunctionsDuties: 'Functions & Duties',
      aboutHistory: 'History',
      aboutAffiliatedInstitutions: 'Affiliated Institutions',
      aboutSecretary: 'About Secretary',
      contact:     'Contact Us',
      departments: 'Divisions',
      documents:   'Downloads',
      faq:         'FAQ',
      gallery:     'Gallery',
      news:        'Media Center',
      notices:     'Notices',
      tenders:     'Tenders',
    },
    si: {
      about:       'අප ගැන',
      aboutMinistryOverview: 'අමාත්‍යාංශය පිළිබඳ සාරාංශය',
      aboutMinister: 'ගරු අමාත්‍යතුමා',
      aboutDeputyMinisterEducation: 'ගරු නියෝජ්‍ය අමාත්‍ය (අධ්‍යාපන සහ උසස් අධ්‍යාපන)',
      aboutDeputyMinisterVocational: 'ගරු නියෝජ්‍ය අමාත්‍ය (වෘත්තීය අධ්‍යාපන)',
      aboutOrganizationStructure: 'සංවිධාන ව්‍යුහය',
      aboutFunctionsDuties: 'කාර්යයන් හා වගකීම්',
      aboutHistory: 'ඉතිහාසය',
      aboutAffiliatedInstitutions: 'අනුබද්ධ ආයතන',
      aboutSecretary: 'ලේකම් පිළිබඳව',
      contact:     'අප අමතන්න',
      departments: 'අංශ',
      documents:   'බාගත කිරීම්',
      faq:         'නිතර අසන පැන',
      gallery:     'ගැලරිය',
      news:        'මාධ්‍ය මධ්‍යස්ථානය',
      notices:     'නිවේදන',
      tenders:     'ටෙන්ඩර්',
    },
    ta: {
      about:       'எங்களைப் பற்றி',
      aboutMinistryOverview: 'அமைச்சக அறிமுகம்',
      aboutMinister: 'மாண்புமிகு அமைச்சர்',
      aboutDeputyMinisterEducation: 'மாண்புமிகு துணை அமைச்சர் (கல்வி மற்றும் உயர் கல்வி)',
      aboutDeputyMinisterVocational: 'மாண்புமிகு துணை அமைச்சர் (தொழில்வாழ்க்கை கல்வி)',
      aboutOrganizationStructure: 'அமைப்பு வடிவமைப்பு',
      aboutFunctionsDuties: 'செயல்பாடுகள் மற்றும் கடமைகள்',
      aboutHistory: 'வரலாறு',
      aboutAffiliatedInstitutions: 'இணைப்பு நிறுவனங்கள்',
      aboutSecretary: 'செயலாளர் பற்றி',
      contact:     'தொடர்பு கொள்ளுங்கள்',
      departments: 'பிரிவுகள்',
      documents:   'பதிவிறக்கங்கள்',
      faq:         'அடிக்கடி கேட்கப்படும் கேள்விகள்',
      gallery:     'தொகுப்பு',
      news:        'ஊடக மையம்',
      notices:     'அறிவிப்புகள்',
      tenders:     'டெண்டர்கள்',
    },
  }

  const pageName = (PAGE_NAMES[lang] || PAGE_NAMES.en)[pageKey] || pageKey

  return (
    <div style={{
      minHeight: 'calc(100vh - 76px)',
      background: CREAM,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'Inter, sans-serif',
      padding: '2rem 1.5rem',
    }}>

      {/* Honeycomb top-left */}
      <div className="hidden md:block" style={{ position: 'absolute', top: 0, left: 0, opacity: 0.07, pointerEvents: 'none' }}>
        <HoneycombCorner />
      </div>
      <div className="hidden md:block" style={{ position: 'absolute', bottom: 0, right: 0, opacity: 0.07, pointerEvents: 'none', transform: 'rotate(180deg)' }}>
        <HoneycombCorner />
      </div>

      {/* Radial glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse 60% 50% at 50% 45%, rgba(199,154,43,0.06) 0%, transparent 70%)`,
      }} />

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 580 }}>

        {/* Logo */}
        <motion.div variants={floatUp(0)} initial="hidden" animate="visible"
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.75rem' }}>
          <img
            src="/branding/logo.svg"
            alt="Planning Secretariat"
            onError={(e) => { e.currentTarget.src = '/branding/logo.png' }}
            style={{ width: 520, height: 'auto', objectFit: 'contain' }}
          />
        </motion.div>

        {/* Page name chip */}
        <motion.div variants={floatUp(0.08)} initial="hidden" animate="visible"
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <span style={{
            fontFamily: "'Cinzel', serif",
            fontSize: '0.72rem',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: GOLD,
            background: 'rgba(199,154,43,0.1)',
            border: '1px solid rgba(199,154,43,0.25)',
            borderRadius: 100,
            padding: '5px 16px',
          }}>
            {pageName}
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1 variants={floatUp(0.16)} initial="hidden" animate="visible"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
            fontWeight: 800,
            color: MAROON,
            marginBottom: '1rem',
            lineHeight: 1.2,
          }}>
          {t.under}
        </motion.h1>

        {/* Ornament */}
        <motion.div variants={floatUp(0.22)} initial="hidden" animate="visible"
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
          <OrnamentLine />
        </motion.div>

        {/* Body */}
        <motion.p variants={floatUp(0.28)} initial="hidden" animate="visible"
          style={{
            fontFamily: (lang === 'si' || lang === 'ta') ? LABELS[lang].font : 'Inter, sans-serif',
            fontSize: 'clamp(0.87rem, 1.4vw, 0.98rem)',
            color: '#5A2030',
            opacity: 0.78,
            lineHeight: 1.8,
            marginBottom: '2.25rem',
          }}>
          {t.body}
        </motion.p>

        {/* Buttons */}
        <motion.div variants={floatUp(0.36)} initial="hidden" animate="visible"
          style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>

          <motion.button
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(-1)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              padding: '11px 22px', borderRadius: 9,
              background: 'transparent',
              border: `1.5px solid ${MAROON}`,
              color: MAROON, fontFamily: 'Inter, sans-serif',
              fontWeight: 600, fontSize: '0.87rem', cursor: 'pointer',
            }}>
            <FiArrowLeft size={14} /> {t.back}
          </motion.button>

          <Link to="/home" style={{ textDecoration: 'none' }}>
            <motion.div
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '11px 22px', borderRadius: 9,
                background: MAROON, color: '#fff',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600, fontSize: '0.87rem', cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(74,9,24,0.26)',
              }}>
              <FiHome size={14} /> {t.home}
            </motion.div>
          </Link>
        </motion.div>
      </div>

      {/* Bottom ribbon */}
      <svg viewBox="0 0 1440 70" preserveAspectRatio="none"
        style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 70, display: 'block' }}>
        <defs>
          <linearGradient id="csGold" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#9A7520" stopOpacity="0.45" />
            <stop offset="50%"  stopColor={GOLD}    stopOpacity="0.65" />
            <stop offset="100%" stopColor="#9A7520" stopOpacity="0.45" />
          </linearGradient>
        </defs>
        <path d="M-40,48 Q360,8 720,28 Q1080,48 1480,18 L1480,70 L-40,70 Z" fill={MAROON} opacity="0.07" />
        <path d="M-40,58 Q300,22 720,38 Q1080,54 1480,28 L1480,70 L-40,70 Z" fill="url(#csGold)" opacity="0.4" />
      </svg>
    </div>
  )
}


function OrnamentLine() {
  return (
    <svg viewBox="0 0 200 16" fill="none" style={{ width: 180, height: 'auto' }}>
      <line x1="0"   y1="8" x2="82"  y2="8" stroke={GOLD} strokeWidth="1" opacity="0.3" />
      <line x1="118" y1="8" x2="200" y2="8" stroke={GOLD} strokeWidth="1" opacity="0.3" />
      <circle cx="100" cy="8" r="4"  fill={GOLD} opacity="0.8" />
      <circle cx="88"  cy="8" r="2"  fill={GOLD} opacity="0.45" />
      <circle cx="112" cy="8" r="2"  fill={GOLD} opacity="0.45" />
    </svg>
  )
}

function HoneycombCorner() {
  const r = 15, hx = r * Math.sqrt(3), vy = r * 1.5
  const pts = (cx, cy) =>
    Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 180) * (60 * i)
      return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`
    }).join(' ')
  const cells = []
  for (let row = 0; row < 5; row++)
    for (let col = 0; col < 5; col++)
      cells.push({ cx: col * hx + (row % 2 ? hx / 2 : 0) + r, cy: row * vy + r })
  const W = 5 * hx + r, H = 4 * vy + r * 2
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none">
      {cells.map((p, i) => (
        <polygon key={i} points={pts(p.cx, p.cy)} stroke={GOLD} strokeWidth="1.2" fill="none" />
      ))}
    </svg>
  )
}

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiFileText, FiArrowRight, FiHome, FiDownload } from 'react-icons/fi'
import { usePageHold } from '@/shared/hooks/usePageHold'
import ComingSoon from '@/shared/components/ComingSoon'
import { SeoHead } from '@/shared/seo'
import './Documents.css'

const MAROON = '#4A0918'
const GOLD   = '#C79A2B'
const CREAM  = '#FCFBFA'

const LANG_META = {
  en: { font: 'Inter, sans-serif',               headFont: "'Playfair Display', Georgia, serif", isNonLatin: false },
  si: { font: "'Noto Sans Sinhala', sans-serif", headFont: "'Noto Sans Sinhala', sans-serif",   isNonLatin: true  },
  ta: { font: "'Noto Sans Tamil', sans-serif",   headFont: "'Noto Sans Tamil', sans-serif",     isNonLatin: true  },
}

const T = {
  en: {
    heroAccent: 'Southern Province Planning Secretariat',
    pageTitle:  'Documents & Reports',
    badgeLabel: 'Documents',
    pageSub:    'Access official documents, annual reports, policy papers, and publications issued by the Southern Province Planning Secretariat.',
    breadHome:  'Home',
    breadCur:   'Documents',
    comingSoon: 'Document Repository Coming Soon',
    csSub:      'We are digitising and cataloguing our document archive. Download access will be available soon.',
    backHome:   'Back to Home',
    downloads:  'Go to Downloads',
  },
  si: {
    heroAccent: 'දකුණු පළාත් සැලසුම් ලේකම් කාර්යාලය',
    pageTitle:  'ලේඛන හා වාර්තා',
    badgeLabel: 'ලේඛන',
    pageSub:    'දකුණු පළාත් සැලසුම් ලේකම් කාර්යාලය විසින් නිකුත් කරන ලද නිල ලේඛන, වාර්ෂික වාර්තා, ප්‍රතිපත්ති ලිපි හා ප්‍රකාශන.',
    breadHome:  'මුල් පිටුව',
    breadCur:   'ලේඛන',
    comingSoon: 'ලේඛන ගබඩාව ළඟදීම',
    csSub:      'අපගේ ලේඛන සංරක්‍ෂාගාරය ඩිජිටල් කරමින් සිටිමු.',
    backHome:   'මුල් පිටුවට',
    downloads:  'බාගත කිරීම් වෙත',
  },
  ta: {
    heroAccent: 'தென் மாகாண திட்டமிடல் செயலகம்',
    pageTitle:  'ஆவணங்கள் & அறிக்கைகள்',
    badgeLabel: 'ஆவணங்கள்',
    pageSub:    'தென் மாகாண திட்டமிடல் செயலகத்தால் வெளியிடப்பட்ட அதிகாரப்பூர்வ ஆவணங்கள், வருடாந்திர அறிக்கைகள் மற்றும் வெளியீடுகள்.',
    breadHome:  'முகப்பு',
    breadCur:   'ஆவணங்கள்',
    comingSoon: 'ஆவண களஞ்சியம் விரைவில்',
    csSub:      'எங்கள் ஆவகல மூலக்கூறை டிஜிட்டல் மயமாக்கி வருகிறோம்.',
    backHome:   'முகப்புக்கு',
    downloads:  'பதிவிறக்கங்களுக்கு',
  },
}

function HoneycombBg() {
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

function PageHero({ t, meta }) {
  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.10 } } }
  const itemV   = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 0.60, ease: [0.16, 1, 0.3, 1] } } }
  const slideR  = { hidden: { opacity: 0, x: 36 }, visible: { opacity: 1, x: 0, transition: { duration: 0.70, ease: [0.16, 1, 0.3, 1] } } }

  return (
    <section className="docs-hero">
      <div className="docs-hero__bg" aria-hidden="true" />
      <div className="docs-hero__noise" aria-hidden="true" />
      <div className="docs-hero__grid-lines" aria-hidden="true" />
      <div className="docs-hero__glow docs-hero__glow--gold"   aria-hidden="true" />
      <div className="docs-hero__glow docs-hero__glow--maroon" aria-hidden="true" />
      <div className="docs-hero__glow docs-hero__glow--right"  aria-hidden="true" />
      <div className="docs-hero__watermark" aria-hidden="true">DOCUMENTS</div>
      <div className="docs-hero__hc" aria-hidden="true"><HoneycombBg /></div>
      {[...Array(6)].map((_, i) => (
        <div key={i} className={`docs-hero__dot docs-hero__dot--${i + 1}`} aria-hidden="true" />
      ))}

      <div className="docs-hero__inner">
        <motion.div className="docs-hero__left" initial="hidden" animate="visible" variants={stagger}>

          <motion.div className="docs-hero__badge" variants={itemV}>
            <span className="docs-hero__badge-dot" aria-hidden="true" />
            <span style={{
              fontFamily:    meta.isNonLatin ? meta.font : "'Cinzel', serif",
              letterSpacing: meta.isNonLatin ? 0 : '0.13em',
              textTransform: meta.isNonLatin ? 'none' : 'uppercase',
            }}>
              {t.badgeLabel}
            </span>
          </motion.div>

          <motion.h1
            className="docs-hero__title"
            style={{ fontFamily: meta.headFont, lineHeight: meta.isNonLatin ? 1.35 : 1.08 }}
            variants={itemV}
          >
            {t.pageTitle}
          </motion.h1>

          <motion.div
            className="docs-hero__rule"
            variants={{
              hidden:  { scaleX: 0, opacity: 0 },
              visible: { scaleX: 1, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
            }}
            aria-hidden="true"
          />

          <motion.p className="docs-hero__sub" style={{ fontFamily: meta.font }} variants={itemV}>
            {t.pageSub}
          </motion.p>

          <motion.div className="docs-hero__actions" variants={itemV}>
            <Link to="/downloads" className="docs-hero__btn docs-hero__btn--gold" style={{ fontFamily: meta.font }}>
              <FiDownload size={15} />
              <span>{t.downloads}</span>
            </Link>
            <Link to="/home" className="docs-hero__btn docs-hero__btn--ghost" style={{ fontFamily: meta.font }}>
              <FiHome size={15} />
              <span>{t.backHome}</span>
              <FiArrowRight size={13} className="docs-hero__btn-arrow" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div className="docs-hero__right" initial="hidden" animate="visible" variants={slideR}>
          <img
            src="/branding/f-logo.svg"
            alt="Southern Province Planning Secretariat"
            className="docs-hero__logo"
            onError={e => { e.currentTarget.style.display = 'none' }}
          />
        </motion.div>
      </div>

      <svg className="docs-hero__wave" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,80 C240,20 480,60 720,40 C960,20 1200,60 1440,30 L1440,80 Z" fill={CREAM} />
      </svg>
    </section>
  )
}

function ComingSoonSection({ t, meta }) {
  return (
    <section style={{ background: CREAM, padding: 'clamp(4rem,10vw,7rem) clamp(1rem,4vw,3rem)', textAlign: 'center' }}>
      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        <div style={{
          width: 64, height: 64, borderRadius: '50%',
          background: 'rgba(199,154,43,0.10)',
          border: '1.5px solid rgba(199,154,43,0.28)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 1.5rem',
        }}>
          <FiFileText size={26} color={GOLD} />
        </div>
        <h2 style={{
          fontFamily: meta.headFont, fontSize: 'clamp(1.4rem,3vw,2rem)',
          fontWeight: 800, color: MAROON, marginBottom: '0.75rem',
          lineHeight: meta.isNonLatin ? 1.4 : 1.2,
        }}>
          {t.comingSoon}
        </h2>
        <p style={{ fontFamily: meta.font, color: '#6B3545', fontSize: '0.95rem', lineHeight: 1.8 }}>
          {t.csSub}
        </p>
      </div>
    </section>
  )
}

export default function Documents() {
  const held = usePageHold('documents')
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en')

  useEffect(() => {
    const h = (e) => setLang(e.detail || 'en')
    window.addEventListener('langChange', h)
    return () => window.removeEventListener('langChange', h)
  }, [])

  const meta = LANG_META[lang] || LANG_META.en
  const t    = T[lang]         || T.en

  if (held) return <ComingSoon pageKey="documents" />

  return (
    <>
      <SeoHead page="documents" />
      <div style={{ background: CREAM, minHeight: '100vh' }}>
        <PageHero t={t} meta={meta} />
        <ComingSoonSection t={t} meta={meta} />
      </div>
    </>
  )
}

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiChevronDown, FiArrowRight, FiMessageCircle } from 'react-icons/fi'
import { faqsApi } from '@/features/cms/cmsContentApi'
import './HomeFAQHighlights.css'

const LANG_META = {
  en: { font: 'Inter, sans-serif',               headFont: "'Playfair Display', Georgia, serif", isNonLatin: false },
  si: { font: "'Noto Sans Sinhala', sans-serif", headFont: "'Noto Sans Sinhala', sans-serif",   isNonLatin: true  },
  ta: { font: "'Noto Sans Tamil', sans-serif",   headFont: "'Noto Sans Tamil', sans-serif",     isNonLatin: true  },
}

const T = {
  en: {
    eyebrow:   'Knowledge Base',
    title:     'Common Questions',
    subtitle:  'Everything you need to know about the Planning Secretariat — answered clearly.',
    moreQ:     'Still have questions?',
    contactUs: 'Reach our team',
  },
  si: {
    eyebrow:   'දැනුම් පදනම',
    title:     'සාමාන්‍ය ප්‍රශ්න',
    subtitle:  'සැලසුම් ලේකම් කාර්යාලය ගැන ඔබ දැනගත යුතු සෑම දෙයක්ම — පැහැදිලිව පිළිතුරු දෙනු ලැබේ.',
    moreQ:     'තවත් ප්‍රශ්න තිබේද?',
    contactUs: 'අප අමතන්න',
  },
  ta: {
    eyebrow:   'அறிவுத் தளம்',
    title:     'பொதுவான கேள்விகள்',
    subtitle:  'திட்டமிடல் செயலகம் பற்றி நீங்கள் தெரிந்துகொள்ள வேண்டிய அனைத்தும் — தெளிவாக பதிலளிக்கப்பட்டது.',
    moreQ:     'மேலும் கேள்விகள் உள்ளதா?',
    contactUs: 'எங்கள் குழுவை அணுகுங்கள்',
  },
}

function FAQItem({ faq, isOpen, onToggle, meta, index }) {
  const id    = `home-faq-panel-${index}`
  const btnId = `home-faq-btn-${index}`
  const num   = String(index + 1).padStart(2, '0')

  return (
    <div className={`hfaq__item${isOpen ? ' hfaq__item--open' : ''}`}>
      <button
        id={btnId}
        className="hfaq__trigger"
        aria-expanded={isOpen}
        aria-controls={id}
        onClick={onToggle}
        style={{ fontFamily: meta.font }}
      >
        <span className="hfaq__num" aria-hidden="true">{num}</span>
        <span className="hfaq__q" style={{ fontFamily: meta.headFont }}>{faq.q}</span>
        <span className="hfaq__arrow" aria-hidden="true">
          <FiChevronDown size={16} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={id}
            role="region"
            aria-labelledby={btnId}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p className="hfaq__a" style={{ fontFamily: meta.font }}>{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function HomeFAQHighlights({ lang: langProp }) {
  const [lang, setLang]     = useState(() => langProp || localStorage.getItem('lang') || 'en')
  const [openIdx, setOpenIdx] = useState(0)
  const [faqs, setFaqs] = useState([])

  useEffect(() => {
    const h = (e) => { setLang(e.detail || 'en'); setOpenIdx(0) }
    window.addEventListener('langChange', h)
    return () => window.removeEventListener('langChange', h)
  }, [])

  useEffect(() => { if (langProp) setLang(langProp) }, [langProp])

  useEffect(() => {
    let cancelled = false
    faqsApi.list()
      .then(({ data }) => {
        if (cancelled || !Array.isArray(data)) return
        const featured = data
          .filter((f) => f.featured === true)
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        setFaqs(featured)
      })
      .catch((err) => console.error('HomeFAQHighlights: failed to load FAQs', err))
    return () => { cancelled = true }
  }, [])

  const meta = LANG_META[lang] || LANG_META.en
  const t    = T[lang]         || T.en
  const items = faqs.map((f) => ({
    q: f.question?.[lang] || f.question?.en || '',
    a: f.answer?.[lang]   || f.answer?.en   || '',
  }))

  const toggle = (i) => setOpenIdx(prev => prev === i ? null : i)

  const fadeUp = (delay = 0) => ({
    hidden:  { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] } },
  })

  const stagger = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.07 } },
  }

  return (
    <section className="hfaq" aria-label={t.title}>

      {/* ── Noise texture overlay ── */}
      <div className="hfaq__noise" aria-hidden="true" />

      {/* ── Ambient glows ── */}
      <div className="hfaq__glow hfaq__glow--a" aria-hidden="true" />
      <div className="hfaq__glow hfaq__glow--b" aria-hidden="true" />

      {/* ── Grid lines ── */}
      <div className="hfaq__grid" aria-hidden="true" />

      {/* ── Gold rule accent top-left ── */}
      <div className="hfaq__rule" aria-hidden="true" />

      <div className="hfaq__inner">

        {/* ══ LEFT — sticky header panel ══ */}
        <motion.aside
          className="hfaq__aside"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          <motion.span className="hfaq__eyebrow" variants={fadeUp(0)} style={{
            fontFamily:    meta.isNonLatin ? meta.font : "'Cinzel', serif",
            letterSpacing: meta.isNonLatin ? 0 : '0.14em',
          }}>
            {t.eyebrow}
          </motion.span>

          <motion.h2
            className="hfaq__title"
            style={{ fontFamily: meta.headFont, lineHeight: meta.isNonLatin ? 1.4 : 1.1 }}
            variants={fadeUp(0.08)}
          >
            {t.title}
          </motion.h2>

          <motion.div className="hfaq__divider" variants={fadeUp(0.14)} aria-hidden="true" />

          <motion.p
            className="hfaq__subtitle"
            style={{ fontFamily: meta.font }}
            variants={fadeUp(0.18)}
          >
            {t.subtitle}
          </motion.p>

          {/* CTA card */}
          <motion.div className="hfaq__cta-card" variants={fadeUp(0.26)}>
            <div className="hfaq__cta-icon" aria-hidden="true">
              <FiMessageCircle size={20} />
            </div>
            <p className="hfaq__cta-label" style={{ fontFamily: meta.font }}>{t.moreQ}</p>
            <Link to="/contact" className="hfaq__cta-btn" style={{ fontFamily: meta.font }}>
              <span>{t.contactUs}</span>
              <FiArrowRight size={14} />
            </Link>
          </motion.div>
        </motion.aside>

        {/* ══ RIGHT — accordion list ══ */}
        <motion.div
          className="hfaq__list"
          role="list"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
        >
          {items.map((faq, i) => (
            <motion.div key={i} role="listitem" variants={fadeUp()}>
              <FAQItem
                faq={faq}
                isOpen={openIdx === i}
                onToggle={() => toggle(i)}
                meta={meta}
                index={i}
              />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

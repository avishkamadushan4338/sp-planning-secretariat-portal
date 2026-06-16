import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiChevronDown, FiArrowRight, FiMessageCircle } from 'react-icons/fi'
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
    faqs: [
      {
        q: 'How can I download provincial reports and publications?',
        a: 'All reports and publications are available free of charge through the Downloads section. Select a category, choose the year, and click the download button to save the PDF.',
      },
      {
        q: 'How is the Annual Development Plan prepared?',
        a: 'The Annual Development Plan is prepared through a consultative process with all provincial line ministries, departments, and public stakeholders, coordinated by the Planning Secretariat.',
      },
      {
        q: 'Can I submit a development proposal to the Secretariat?',
        a: 'Yes. Proposals should be submitted through the relevant provincial ministry or divisional secretariat. Community organisations may also submit formal requests via the Contact page.',
      },
      {
        q: 'How do I find out about development projects in the Southern Province?',
        a: 'Visit the Projects section for current and past special development programmes, the Reports section for progress reports, or the Downloads section for project publications. You may also contact the Secretariat directly for specific project inquiries.',
      },
      {
        q: 'What is the key role of the Planning Secretariat?',
        a: 'The Planning Secretariat coordinates, monitors, and evaluates all development activities in the Southern Province. It formulates provincial development plans, allocates resources across ministries and departments, provides technical planning guidance, and ensures development goals align with national and provincial policies.',
      },
    ],
  },
  si: {
    eyebrow:   'දැනුම් පදනම',
    title:     'සාමාන්‍ය ප්‍රශ්න',
    subtitle:  'සැලසුම් ලේකම් කාර්යාලය ගැන ඔබ දැනගත යුතු සෑම දෙයක්ම — පැහැදිලිව පිළිතුරු දෙනු ලැබේ.',
    moreQ:     'තවත් ප්‍රශ්න තිබේද?',
    contactUs: 'අප අමතන්න',
    faqs: [
      {
        q: 'පළාත් වාර්තා සහ ප්‍රකාශන බාගත කළ හැකි ආකාරය කෙසේද?',
        a: 'සියලු වාර්තා සහ ප්‍රකාශන බාගත කිරීමේ කොටස හරහා නොමිලේ ලබා ගත හැකිය. ප්‍රවර්ගයක් තෝරා, වර්ෂය තෝරා, PDF සුරැකීමට බාගත කිරීමේ බොත්තම ක්ලික් කරන්න.',
      },
      {
        q: 'වාර්ෂික සංවර්ධන සැලැස්ම සකස් කරන ආකාරය කෙසේද?',
        a: 'සාකච්ඡා ක්‍රියාවලියක් හරහා, සෑම පළාත් රේඛීය අමාත්‍යාංශ, අංශ, සහ මහජන ලාභාංශිකයන් සමඟ, සැලසුම් ලේකම් කාර්යාලය සම්බන්ධීකරණය කරයි.',
      },
      {
        q: 'ලේකම් කාර්යාලයට සංවර්ධන යෝජනාවක් ඉදිරිපත් කළ හැකිද?',
        a: 'ඔව්. අදාළ පළාත් අමාත්‍යාංශය හෝ ප්‍රාදේශීය ලේකම් කාර්යාලය හරහා ඉදිරිපත් කළ හැකිය. ප්‍රජා සංවිධාන, අප අමතන්න පිටුව හරහා ද ඉදිරිපත් කළ හැකිය.',
      },
      {
        q: 'දකුණු පළාතේ සංවර්ධන ව්‍යාපෘති ගැන දැනගත හැකි ආකාරය කෙසේද?',
        a: 'ව්‍යාපෘති කොටස, වාර්තා කොටස සහ බාගත කිරීමේ කොටස හරහා සංවර්ධන ව්‍යාපෘති ගැන තොරතුරු ලබා ගත හැකිය. නිශ්චිත ව්‍යාපෘති විමසීම් සඳහා සැලසුම් ලේකම් කාර්යාලය කෙලින්ම ද ඇමතිය හැකිය.',
      },
      {
        q: 'සැලසුම් ලේකම් කාර්යාලයේ ප්‍රධාන කාර්යභාරය කුමක්ද?',
        a: 'සැලසුම් ලේකම් කාර්යාලය දකුණු පළාත තුළ සියලු සංවර්ධන කටයුතු සම්බන්ධීකරණය, අධීක්ෂණය සහ ඇගයීම සිදු කරයි. එය පළාත් සංවර්ධන සැලසුම් සකස් කිරීම, අමාත්‍යාංශ හා අංශ හරහා සම්පත් වෙන් කිරීම, තාක්ෂණික සැලසුම් මඟ පෙන්වීම ලබා දීම සහ ජාතික හා පළාත් ප්‍රතිපත්තිවලට අනුකූල බව සහතික කිරීම ඇතුළත් කරයි.',
      },
    ],
  },
  ta: {
    eyebrow:   'அறிவுத் தளம்',
    title:     'பொதுவான கேள்விகள்',
    subtitle:  'திட்டமிடல் செயலகம் பற்றி நீங்கள் தெரிந்துகொள்ள வேண்டிய அனைத்தும் — தெளிவாக பதிலளிக்கப்பட்டது.',
    moreQ:     'மேலும் கேள்விகள் உள்ளதா?',
    contactUs: 'எங்கள் குழுவை அணுகுங்கள்',
    faqs: [
      {
        q: 'மாகாண அறிக்கைகள் மற்றும் வெளியீடுகளை எவ்வாறு பதிவிறக்கலாம்?',
        a: 'அனைத்து அறிக்கைகளும் வெளியீடுகளும் பதிவிறக்கங்கள் பிரிவு மூலம் இலவசமாக கிடைக்கின்றன. வகையை தேர்ந்தெடுத்து, ஆண்டை தேர்ந்தெடுத்து, PDF ஐ சேமிக்க பதிவிறக்க பொத்தானை கிளிக் செய்யுங்கள்.',
      },
      {
        q: 'ஆண்டு வளர்ச்சி திட்டம் எவ்வாறு தயாரிக்கப்படுகிறது?',
        a: 'ஆண்டு வளர்ச்சி திட்டம் அனைத்து மாகாண துறைகள் மற்றும் பொது பங்குதாரர்களுடன் ஆலோசனை செயல்முறை மூலம் திட்டமிடல் செயலகத்தால் ஒருங்கிணைக்கப்படுகிறது.',
      },
      {
        q: 'செயலகத்திற்கு வளர்ச்சி முன்மொழிவை சமர்ப்பிக்க முடியுமா?',
        a: 'ஆம். தொடர்புடைய மாகாண அமைச்சகம் அல்லது பிரிவு செயலகம் மூலம் சமர்ப்பிக்கலாம். சமூக அமைப்புகளும் தொடர்பு பக்கம் மூலம் சமர்ப்பிக்கலாம்.',
      },
      {
        q: 'தென் மாகாணத்தில் உள்ள வளர்ச்சி திட்டங்களை எவ்வாறு அறிந்துகொள்வது?',
        a: 'திட்டங்கள் பிரிவு, அறிக்கைகள் பிரிவு மற்றும் பதிவிறக்கங்கள் பிரிவு மூலம் வளர்ச்சி திட்டங்கள் பற்றிய தகவல்களை பெறலாம். குறிப்பிட்ட திட்ட விசாரணைகளுக்கு திட்டமிடல் செயலகத்தை நேரடியாகவும் தொடர்பு கொள்ளலாம்.',
      },
      {
        q: 'திட்டமிடல் செயலகத்தின் முக்கிய பங்கு என்ன?',
        a: 'திட்டமிடல் செயலகம் தென் மாகாணத்தில் உள்ள அனைத்து வளர்ச்சி நடவடிக்கைகளையும் ஒருங்கிணைத்தல், கண்காணித்தல் மற்றும் மதிப்பீடு செய்கிறது. மாகாண வளர்ச்சி திட்டங்களை உருவாக்குதல், வளங்களை ஒதுக்குதல், தொழில்நுட்ப வழிகாட்டுதல் வழங்குதல் மற்றும் தேசிய மற்றும் மாகாண கொள்கைகளுக்கு இணங்குவதை உறுதி செய்தல் ஆகியவை இதில் அடங்கும்.',
      },
    ],
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

  useEffect(() => {
    const h = (e) => { setLang(e.detail || 'en'); setOpenIdx(0) }
    window.addEventListener('langChange', h)
    return () => window.removeEventListener('langChange', h)
  }, [])

  useEffect(() => { if (langProp) setLang(langProp) }, [langProp])

  const meta = LANG_META[lang] || LANG_META.en
  const t    = T[lang]         || T.en

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
          {t.faqs.map((faq, i) => (
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

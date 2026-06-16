import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import {
  FiArrowRight,
  FiPhone,
  FiExternalLink,
} from 'react-icons/fi'
import ProgressiveImage from '@/shared/components/ProgressiveImage'
import './HomeAboutSecretariat.css'

/* ── Translations ─────────────────────────────────────────────────────────── */
const T = {
  en: {
    eyebrow:   'About the Secretariat',
    title:     'Planning Secretariat – Southern Province',
    subtitle:  'Coordinating development, monitoring progress, and guiding sustainable growth across the Southern Province.',
    body:      'The Planning Secretariat of the Southern Province serves as the key provincial institution responsible for development planning, policy coordination, and the strategic management of public investment across the districts of Galle, Matara, and Hambantota. Established under the 13th Amendment of the Constitution — the Provincial Councils Act — the Secretariat plays a leading role in guiding the socio-economic development of the Southern Province through integrated planning, evidence-based policy formulation, and effective resource allocation.',
    imgAlt:    'Planning Secretariat Image',
    readMore:  'Read More',
    telDir:    'Telephone Directory',
  },
  si: {
    eyebrow:   'ලේකම් කාර්යාලය ගැන',
    title:     'දකුණු පළාත් සැලසුම් ලේකම් කාර්යාලය',
    subtitle:  'දකුණු පළාත පුරා සංවර්ධනය සම්බන්ධීකරණය, ප්‍රගතිය අධීක්ෂණය සහ තිරසාර වර්ධනයට මඟ පෙන්වීම.',
    body:      'දකුණු පළාතේ සැලසුම් ලේකම් කාර්යාලය, ගාල්ල, මාතර සහ හම්බන්තොට දිස්ත්‍රික්ක හරහා සංවර්ධන සැලසුම් කිරීම, ප්‍රතිපත්ති සම්බන්ධීකරණය සහ රාජ්‍ය ආයෝජනවල උපාය මාර්ගික කළමනාකරණය සඳහා වගකිව යුතු ප්‍රධාන පළාත් ආයතනය ලෙස කටයුතු කරයි. ව්‍යවස්ථාවේ 13 වැනි සංශෝධනය — පළාත් සභා පනත — යටතේ ස්ථාපිත කරන ලද මෙම ලේකම් කාර්යාලය, ඒකාබද්ධ සැලසුම් කිරීම, සාක්ෂි-පදනම් ප්‍රතිපත්ති සම්පාදනය සහ ඵලදායී සම්පත් බෙදා හැරීම හරහා දකුණු පළාතේ සමාජ-ආර්ථික සංවර්ධනය මෙහෙයවීමේ ප්‍රමුඛ භූමිකාවක් ඉටු කරයි.',
    imgAlt:    'සැලසුම් ලේකම් කාර්යාල රූපය',
    readMore:  'තව කියවන්න',
    telDir:    'දූරකථන නාමාවලිය',
  },
  ta: {
    eyebrow:   'செயலகம் பற்றி',
    title:     'தென் மாகாண திட்டமிடல் செயலகம்',
    subtitle:  'தென் மாகாணம் முழுவதும் வளர்ச்சியை ஒருங்கிணைத்து, முன்னேற்றத்தை கண்காணித்து, நிலையான வளர்ச்சிக்கு வழிகாட்டுதல்.',
    body:      'தென் மாகாண திட்டமிடல் செயலகம், காலி, மாத்தறை மற்றும் ஹம்பாந்தோட்டை மாவட்டங்கள் முழுவதும் வளர்ச்சி திட்டமிடல், கொள்கை ஒருங்கிணைப்பு மற்றும் பொது முதலீட்டின் மூலோபாய மேலாண்மைக்கு பொறுப்பான முக்கிய மாகாண நிறுவனமாக செயல்படுகிறது. அரசியலமைப்பின் 13வது திருத்தம் — மாகாண சபைகள் சட்டம் — இன் கீழ் நிறுவப்பட்ட இச்செயலகம், ஒருங்கிணைந்த திட்டமிடல், சான்றுகள் அடிப்படையிலான கொள்கை வகுப்பு மற்றும் திறமையான வள ஒதுக்கீடு மூலம் தென் மாகாணத்தின் சமூக-பொருளாதார வளர்ச்சியை வழிநடத்துவதில் முன்னணி பங்கை வகிக்கிறது.',
    imgAlt:    'திட்டமிடல் செயலக படம்',
    readMore:  'மேலும் படிக்க',
    telDir:    'தொலைபேசி அடைவு',
  },
}

/* ── Motion variants ──────────────────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 28, filter: 'blur(5px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  },
})

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}

/* ── Component ────────────────────────────────────────────────────────────── */
export default function HomeAboutSecretariat({ lang: propLang }) {
  const [lang, setLang] = useState(
    () => propLang || localStorage.getItem('lang') || 'en'
  )
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const h = (e) => setLang(e.detail || 'en')
    window.addEventListener('langChange', h)
    return () => window.removeEventListener('langChange', h)
  }, [])

  useEffect(() => { if (propLang) setLang(propLang) }, [propLang])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const h = (e) => setReduced(e.matches)
    mq.addEventListener('change', h)
    return () => mq.removeEventListener('change', h)
  }, [])

  const t = T[lang] || T.en
  const isNonLatin = lang === 'si' || lang === 'ta'

  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.15 })
  const animState = (!reduced && inView) ? 'visible' : (reduced ? 'visible' : 'hidden')

  return (
    <section
      ref={sectionRef}
      className="has"
      aria-label={t.eyebrow}
      lang={lang === 'si' ? 'si' : lang === 'ta' ? 'ta' : 'en'}
    >
      {/* Decorative background layers */}
      <div className="has__bg-art" aria-hidden="true">
        <div className="has__orb has__orb--a" />
        <div className="has__orb has__orb--b" />
        <div className="has__orb has__orb--c" />
        <svg className="has__lattice" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hasGrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M40 0L0 0L0 40" fill="none" stroke="rgba(199,154,43,0.07)" strokeWidth="0.8"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hasGrid)" />
        </svg>
        <div className="has__shimmer-line has__shimmer-line--top"    aria-hidden="true" />
        <div className="has__shimmer-line has__shimmer-line--bottom" aria-hidden="true" />
      </div>

      <div className="has__container">

        {/* ── Left / Content column ── */}
        <motion.div
          className="has__content"
          variants={stagger}
          initial="hidden"
          animate={animState}
        >
          {/* Eyebrow pill */}
          <motion.div className="has__eyebrow" variants={fadeUp(0)}>
            <span className="has__eyebrow-diamond" aria-hidden="true" />
            <span className="has__eyebrow-text">{t.eyebrow}</span>
          </motion.div>

          {/* Title */}
          <motion.h2
            className={`has__title${isNonLatin ? ' has__title--nl' : ''}`}
            variants={fadeUp(0.08)}
          >
            {t.title}
          </motion.h2>

          {/* Gold rule */}
          <motion.div
            className="has__rule"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={animState === 'visible'
              ? { scaleX: 1, opacity: 1, transition: { duration: 0.55, delay: 0.22, ease: [0.16, 1, 0.3, 1] } }
              : { scaleX: 0, opacity: 0 }
            }
          />

          {/* Subtitle */}
          <motion.p
            className={`has__subtitle${isNonLatin ? ' has__subtitle--nl' : ''}`}
            variants={fadeUp(0.18)}
          >
            {t.subtitle}
          </motion.p>

          {/* Body */}
          <motion.p
            className={`has__body${isNonLatin ? ' has__body--nl' : ''}`}
            variants={fadeUp(0.28)}
          >
            {t.body}
          </motion.p>

          {/* CTA row */}
          <motion.div className="has__cta-row" variants={fadeUp(0.42)}>
            <Link to="/about/secretariat-overview" className="has__btn has__btn--primary">
              <span>{t.readMore}</span>
              <FiArrowRight size={14} aria-hidden="true" />
            </Link>
            <Link to="/contact#contact-info" className="has__btn has__btn--ghost">
              <FiPhone size={14} aria-hidden="true" />
              <span>{t.telDir}</span>
              <FiExternalLink size={13} aria-hidden="true" />
            </Link>
          </motion.div>
        </motion.div>

        {/* ── Right / Image panel ── */}
        <motion.div
          className="has__media"
          variants={fadeUp(0.12)}
          initial="hidden"
          animate={animState}
        >
          <div className="has__img-frame">
            {/* Corner accents */}
            <span className="has__corner has__corner--tl" aria-hidden="true" />
            <span className="has__corner has__corner--tr" aria-hidden="true" />
            <span className="has__corner has__corner--bl" aria-hidden="true" />
            <span className="has__corner has__corner--br" aria-hidden="true" />

            <ProgressiveImage
              src="/branding/office.png"
              alt={t.imgAlt}
              className="has__img"
              loading="lazy"
            />

            {/* Overlay badge */}
            <div className="has__img-badge" aria-hidden="true">
              <span className="has__badge-dot" />
              <span className="has__badge-text">Southern Province</span>
            </div>
          </div>

          {/* Floating stat card */}
          <div className="has__stat-card" aria-hidden="true">
            <span className="has__stat-num">3</span>
            <span className="has__stat-lbl">Divisions</span>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

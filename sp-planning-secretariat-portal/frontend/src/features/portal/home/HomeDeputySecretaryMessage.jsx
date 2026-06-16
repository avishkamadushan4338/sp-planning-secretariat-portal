import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Quote, BadgeCheck, PenLine } from 'lucide-react'
import ProgressiveImage from '@/shared/components/ProgressiveImage'
import './HomeDeputySecretaryMessage.css'

/* ── Translations ─────────────────────────────────────────────────────────── */
const T = {
  en: {
    eyebrow:   'Leadership Message',
    title:     'Message from the Deputy Chief Secretary – Planning',
    position:  'Deputy Chief Secretary – Planning',
    name:      'Mr. M.K.G.S.P.K. Jayasekara',
    message:   'As the Planning Secretariat of the Southern Province, our responsibility is to guide development with clarity, coordination, and accountability. We work closely with provincial ministries, departments, divisional secretariats, and local authorities as well as government-based and non-government based organizations to ensure that development initiatives respond to public needs and support long-term sustainable growth. Through effective planning, monitoring, and evaluation, we remain committed to building a more progressive and resilient to the Southern Province.',
    imgAlt:    'Deputy Secretary Image',
    sigAlt:    'Deputy Secretary Signature',
  },
  si: {
    eyebrow:   'නායකත්ව පණිවිඩය',
    title:     'නියෝජ්‍ය ප්‍රධාන ලේකම්තුමාගේ පණිවිඩය ',
    position:  'නියෝජ්‍ය ප්‍රධාන ලේකම් – සැලසුම්',
    name:      'Mr. M.K.G.S.P.K. Jayasekara',
    message:   'දකුණු පළාත් සැලසුම් ලේකම් කාර්යාලය ලෙස, සංවර්ධනය පැහැදිලි දැක්මක්, සම්බන්ධීකරණයක් සහ වගකීමක් සමඟ ඉදිරියට ගෙන යාම අපගේ ප්‍රධාන වගකීමකි. පළාත් අමාත්‍යාංශ, අංශ, ප්‍රාදේශීය ලේකම් කාර්යාල සහ පළාත් පාලන ආයතන සමඟ සමීපව කටයුතු කරමින්, ජනතා අවශ්‍යතාවයන්ට ප්‍රතිචාර දක්වන සහ දිගුකාලීන තිරසාර වර්ධනයට සහාය වන සංවර්ධන වැඩසටහන් ක්‍රියාත්මක කිරීමට අපි කැපවී සිටිමු.',
    imgAlt:    'නියෝජ්‍ය ප්‍රධාන ලේකම් රූපය',
    sigAlt:    'නියෝජ්‍ය ප්‍රධාන ලේකම් අත්සන',
  },
  ta: {
    eyebrow:   'தலைமைச் செய்தி',
    title:     'துணை தலைமை செயலர் – திட்டமிடல் அவர்களிடமிருந்து செய்தி',
    position:  'துணை தலைமை செயலர் – திட்டமிடல்',
    name:      'Mr. M.K.G.S.P.K. Jayasekara',
    message:   'தென் மாகாண திட்டமிடல் செயலகமாக, தெளிவான நோக்கம், ஒருங்கிணைப்பு மற்றும் பொறுப்புணர்வுடன் வளர்ச்சியை வழிநடத்துவது எங்கள் முக்கிய பொறுப்பாகும். மாகாண அமைச்சகங்கள், துறைகள், பிரதேச செயலகங்கள் மற்றும் உள்ளாட்சி நிறுவனங்களுடன் இணைந்து, பொதுமக்களின் தேவைகளுக்கு பதிலளிக்கும் மற்றும் நீண்டகால நிலையான வளர்ச்சியை ஆதரிக்கும் வளர்ச்சி முயற்சிகளை முன்னெடுக்க நாங்கள் அர்ப்பணிக்கப்பட்டுள்ளோம்.',
    imgAlt:    'துணை தலைமை செயலர் படம்',
    sigAlt:    'துணை தலைமை செயலர் கையொப்பம்',
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
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.12 } },
}

/* ── Component ────────────────────────────────────────────────────────────── */
export default function HomeDeputySecretaryMessage({ lang: propLang }) {
  const [lang, setLang] = useState(
    () => propLang || localStorage.getItem('lang') || 'en'
  )
  const [reduced,  setReduced]  = useState(false)

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

  const t          = T[lang] || T.en
  const isNonLatin = lang === 'si' || lang === 'ta'

  const sectionRef = useRef(null)
  const inView     = useInView(sectionRef, { once: true, amount: 0.12 })
  const animState  = (!reduced && inView) ? 'visible' : (reduced ? 'visible' : 'hidden')

  return (
    <section
      ref={sectionRef}
      className="dsm"
      aria-label={t.eyebrow}
      lang={lang === 'si' ? 'si' : lang === 'ta' ? 'ta' : 'en'}
    >
      {/* Decorative background */}
      <div className="dsm__bg-art" aria-hidden="true">
        <div className="dsm__orb dsm__orb--a" />
        <div className="dsm__orb dsm__orb--b" />
        <div className="dsm__orb dsm__orb--c" />
        <svg className="dsm__lattice" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dsmGrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M40 0L0 0L0 40" fill="none" stroke="rgba(199,154,43,0.065)" strokeWidth="0.8"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dsmGrid)" />
        </svg>
        <div className="dsm__shimmer-line dsm__shimmer-line--top"    aria-hidden="true" />
        <div className="dsm__shimmer-line dsm__shimmer-line--bottom" aria-hidden="true" />
      </div>

      <div className="dsm__container">

        {/* ── Left: Profile card ── */}
        <motion.div
          className="dsm__profile"
          variants={fadeUp(0.1)}
          initial="hidden"
          animate={animState}
        >
          {/* Glow ring behind frame */}
          <div className="dsm__glow-ring" aria-hidden="true" />

          {/* Image frame */}
          <div className="dsm__img-frame">
            <span className="dsm__corner dsm__corner--tl" aria-hidden="true" />
            <span className="dsm__corner dsm__corner--tr" aria-hidden="true" />
            <span className="dsm__corner dsm__corner--bl" aria-hidden="true" />
            <span className="dsm__corner dsm__corner--br" aria-hidden="true" />

            <ProgressiveImage
              src="/branding/sec-ho.png"
              alt={t.imgAlt}
              className="dsm__img"
              loading="lazy"
            />

            {/* Verified badge overlay */}
            <div className="dsm__verified-badge" aria-hidden="true">
              <BadgeCheck size={13} className="dsm__badge-icon" />
              <span className="dsm__badge-text">Southern Province</span>
            </div>
          </div>

          {/* Name & position card below image */}
          <div className="dsm__nameplate">
            <p className={`dsm__person-name${isNonLatin ? ' dsm__nl' : ''}`}>{t.name}</p>
            <p className={`dsm__person-pos${isNonLatin  ? ' dsm__nl' : ''}`}>{t.position}</p>
          </div>
        </motion.div>

        {/* ── Right: Message card ── */}
        <motion.div
          className="dsm__message-col"
          variants={stagger}
          initial="hidden"
          animate={animState}
        >
          {/* Eyebrow */}
          <motion.div className="dsm__eyebrow" variants={fadeUp(0)}>
            <span className="dsm__eyebrow-diamond" aria-hidden="true" />
            <span className={`dsm__eyebrow-text${isNonLatin ? ' dsm__nl' : ''}`}>{t.eyebrow}</span>
          </motion.div>

          {/* Title */}
          <motion.h2
            className={`dsm__title${isNonLatin ? ' dsm__title--nl' : ''}`}
            variants={fadeUp(0.08)}
          >
            {t.title}
          </motion.h2>

          {/* Gold rule */}
          <motion.div
            className="dsm__rule"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={animState === 'visible'
              ? { scaleX: 1, opacity: 1, transition: { duration: 0.55, delay: 0.22, ease: [0.16, 1, 0.3, 1] } }
              : { scaleX: 0, opacity: 0 }
            }
          />

          {/* Glass message card */}
          <motion.div className="dsm__card" variants={fadeUp(0.22)}>
            {/* Decorative large quote mark */}
            <Quote
              size={52}
              className="dsm__quote-mark"
              aria-hidden="true"
            />

            <p className={`dsm__message-text${isNonLatin ? ' dsm__message-text--nl' : ''}`}>
              {t.message}
            </p>

            {/* Signature row */}
            <div className="dsm__sig-row">
              <div className="dsm__sig-divider" aria-hidden="true" />

              <div className="dsm__sig-block">
                {/* Signature image or fallback */}
                <div className="dsm__sig-img-wrap">
                  <ProgressiveImage
                    src="/staff/deputy-secretary-signature.png"
                    alt={t.sigAlt}
                    className="dsm__sig-img"
                    loading="lazy"
                    fill={false}
                    fallback={
                      <div className="dsm__sig-fallback" aria-label={t.sigAlt}>
                        <PenLine size={16} className="dsm__sig-icon" aria-hidden="true" />
                        <span className="dsm__sig-fallback-text">Signature</span>
                      </div>
                    }
                  />
                </div>

                <div className="dsm__sig-meta">
                  <span className={`dsm__sig-name${isNonLatin ? ' dsm__nl' : ''}`}>{t.name}</span>
                  <span className={`dsm__sig-position${isNonLatin ? ' dsm__nl' : ''}`}>{t.position}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}

import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { FiBell, FiImage, FiDownload, FiMonitor, FiActivity } from 'react-icons/fi'
import { HiOutlineNewspaper } from 'react-icons/hi'
import './HomeQuickLinks.css'

const LINKS = {
  en: [
    { key: 'notice',     label: 'Notice',      Icon: FiBell,             to: '/news?tab=notices'                          },
    { key: 'news',       label: 'News',        Icon: HiOutlineNewspaper, to: '/news?tab=news'                             },
    { key: 'gallery',    label: 'Gallery',     Icon: FiImage,            to: '/news?tab=gallery'                          },
    { key: 'downloads',  label: 'Downloads',   Icon: FiDownload,         to: '/downloads'                                 },
    { key: 'pms-old',    label: 'PMS Old',     Icon: FiActivity,         href: 'https://progress.spfeedback.lk/index.php' },
    { key: 'pms-new',    label: 'PMS New',     Icon: FiMonitor,          href: 'https://planningsec.lk/login'             },
  ],
  si: [
    { key: 'notice',     label: 'නිවේදන',           Icon: FiBell,             to: '/news?tab=notices'                          },
    { key: 'news',       label: 'පුවත්',             Icon: HiOutlineNewspaper, to: '/news?tab=news'                             },
    { key: 'gallery',    label: 'ඡායාරූප ගැලරිය',   Icon: FiImage,            to: '/news?tab=gallery'                          },
    { key: 'downloads',  label: 'බාගත කිරීම්',       Icon: FiDownload,         to: '/downloads'                                 },
    { key: 'pms-old',    label: 'PMS Old',           Icon: FiActivity,         href: 'https://progress.spfeedback.lk/index.php' },
    { key: 'pms-new',    label: 'PMS New',           Icon: FiMonitor,          href: 'https://planningsec.lk/login'             },
  ],
  ta: [
    { key: 'notice',     label: 'அறிவிப்புகள்',       Icon: FiBell,             to: '/news?tab=notices'                          },
    { key: 'news',       label: 'செய்திகள்',          Icon: HiOutlineNewspaper, to: '/news?tab=news'                             },
    { key: 'gallery',    label: 'புகைப்பட தொகுப்பு', Icon: FiImage,            to: '/news?tab=gallery'                          },
    { key: 'downloads',  label: 'பதிவிறக்கங்கள்',     Icon: FiDownload,         to: '/downloads'                                 },
    { key: 'pms-old',    label: 'PMS Old',            Icon: FiActivity,         href: 'https://progress.spfeedback.lk/index.php' },
    { key: 'pms-new',    label: 'PMS New',            Icon: FiMonitor,          href: 'https://planningsec.lk/login'             },
  ],
}

const cardVariants = {
  hidden:  { opacity: 0, y: 32, filter: 'blur(8px)', scale: 0.97 },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)', scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

const itemVariants = {
  hidden:  { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: (i) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.55, delay: 0.08 + i * 0.07, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function HomeQuickLinks({ lang }) {
  const [activeLang, setActiveLang] = useState(lang || localStorage.getItem('lang') || 'en')
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  useEffect(() => {
    const handler = (e) => setActiveLang(e.detail || 'en')
    window.addEventListener('langChange', handler)
    return () => window.removeEventListener('langChange', handler)
  }, [])

  useEffect(() => {
    if (lang) setActiveLang(lang)
  }, [lang])

  const links = LINKS[activeLang] || LINKS.en

  return (
    <section ref={ref} className="hql" aria-label="Quick Links">
      <div className="hql__glow" aria-hidden="true" />

      {/* ── Premium background art ── */}
      <svg className="hql__art" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Fine diagonal crosshatch grid */}
          <pattern id="hql-grid" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="28" stroke="rgba(199,154,43,0.10)" strokeWidth="0.5"/>
            <line x1="0" y1="0" x2="28" y2="0" stroke="rgba(199,154,43,0.10)" strokeWidth="0.5"/>
          </pattern>
          {/* Diamond lattice */}
          <pattern id="hql-diamond" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <polygon points="20,2 38,20 20,38 2,20" fill="none" stroke="rgba(74,9,24,0.07)" strokeWidth="0.8"/>
            <circle cx="20" cy="20" r="1.5" fill="rgba(199,154,43,0.18)"/>
          </pattern>
          {/* Radial vignette mask */}
          <radialGradient id="hql-vignette" cx="50%" cy="50%" r="55%">
            <stop offset="0%"   stopColor="white" stopOpacity="0"/>
            <stop offset="100%" stopColor="white" stopOpacity="0.55"/>
          </radialGradient>
        </defs>

        {/* Layer 1 — crosshatch grid */}
        <rect width="100%" height="100%" fill="url(#hql-grid)"/>
        {/* Layer 2 — diamond lattice */}
        <rect width="100%" height="100%" fill="url(#hql-diamond)"/>
        {/* Layer 3 — vignette to fade edges */}
        <rect width="100%" height="100%" fill="url(#hql-vignette)"/>

        {/* Horizontal gold hairlines */}
        <line x1="0" y1="30%" x2="100%" y2="30%" stroke="rgba(199,154,43,0.08)" strokeWidth="1" strokeDasharray="6 10"/>
        <line x1="0" y1="70%" x2="100%" y2="70%" stroke="rgba(199,154,43,0.08)" strokeWidth="1" strokeDasharray="6 10"/>

        {/* ── Left filigree corner ornament — positioned via CSS ── */}
        <g className="hql__ornament hql__ornament--l">
          <line x1="0" y1="-32" x2="0" y2="32"  stroke="rgba(199,154,43,0.30)" strokeWidth="1.2"/>
          <line x1="-32" y1="0" x2="32" y2="0"  stroke="rgba(199,154,43,0.30)" strokeWidth="1.2"/>
          <polygon points="0,-10 10,0 0,10 -10,0" fill="none" stroke="rgba(199,154,43,0.45)" strokeWidth="1.1"/>
          <circle cx="0" cy="0" r="2.5" fill="rgba(199,154,43,0.55)"/>
          <circle cx="0" cy="-32" r="1.5" fill="rgba(199,154,43,0.30)"/>
          <circle cx="0" cy="32"  r="1.5" fill="rgba(199,154,43,0.30)"/>
          <circle cx="-32" cy="0" r="1.5" fill="rgba(199,154,43,0.30)"/>
          <circle cx="32"  cy="0" r="1.5" fill="rgba(199,154,43,0.30)"/>
        </g>

        {/* ── Right filigree corner ornament — positioned via CSS ── */}
        <g className="hql__ornament hql__ornament--r">
          <line x1="0" y1="-32" x2="0" y2="32"  stroke="rgba(199,154,43,0.30)" strokeWidth="1.2"/>
          <line x1="-32" y1="0" x2="32" y2="0"  stroke="rgba(199,154,43,0.30)" strokeWidth="1.2"/>
          <polygon points="0,-10 10,0 0,10 -10,0" fill="none" stroke="rgba(199,154,43,0.45)" strokeWidth="1.1"/>
          <circle cx="0" cy="0" r="2.5" fill="rgba(199,154,43,0.55)"/>
          <circle cx="0" cy="-32" r="1.5" fill="rgba(199,154,43,0.30)"/>
          <circle cx="0" cy="32"  r="1.5" fill="rgba(199,154,43,0.30)"/>
          <circle cx="-32" cy="0" r="1.5" fill="rgba(199,154,43,0.30)"/>
          <circle cx="32"  cy="0" r="1.5" fill="rgba(199,154,43,0.30)"/>
        </g>

        {/* ── Floating accent diamonds — positioned via CSS (% not valid in SVG transform) ── */}
        <polygon className="hql__float hql__float--a" points="0,-7 7,0 0,7 -7,0" fill="rgba(199,154,43,0.18)" stroke="rgba(199,154,43,0.40)" strokeWidth="0.8"/>
        <polygon className="hql__float hql__float--b" points="0,-5 5,0 0,5 -5,0" fill="rgba(74,9,24,0.10)"   stroke="rgba(74,9,24,0.25)"    strokeWidth="0.8"/>
        <polygon className="hql__float hql__float--c" points="0,-4 4,0 0,4 -4,0" fill="rgba(199,154,43,0.14)" stroke="rgba(199,154,43,0.32)" strokeWidth="0.7"/>
        <polygon className="hql__float hql__float--d" points="0,-6 6,0 0,6 -6,0" fill="rgba(199,154,43,0.12)" stroke="rgba(199,154,43,0.28)" strokeWidth="0.7"/>
        <polygon className="hql__float hql__float--e" points="0,-5 5,0 0,5 -5,0" fill="rgba(74,9,24,0.08)"   stroke="rgba(74,9,24,0.20)"    strokeWidth="0.7"/>

        {/* ── Subtle wide arc across the bottom ── */}
        <path className="hql__arc" d="M -20 110 Q 960 20 1940 110" fill="none" stroke="rgba(199,154,43,0.09)" strokeWidth="1.2"/>
      </svg>

      <div className="hql__container">
        <motion.div
          className="hql__card"
          role="list"
          variants={cardVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {links.map(({ key, label, Icon, to, href }, i) => {
            const inner = (
              <>
                {i > 0 && <span className="hql__divider" aria-hidden="true" />}
                <motion.span
                  className="hql__icon-wrap"
                  aria-hidden="true"
                  variants={itemVariants}
                  custom={i}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                >
                  <Icon size={22} />
                </motion.span>
                <motion.span
                  className="hql__label"
                  variants={itemVariants}
                  custom={i}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                >
                  {label}
                </motion.span>
                <span className="hql__bar" aria-hidden="true" />
              </>
            )
            return href ? (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="hql__item"
                role="listitem"
                aria-label={label}
              >
                {inner}
              </a>
            ) : (
              <Link
                key={key}
                to={to}
                className="hql__item"
                role="listitem"
                aria-label={label}
              >
                {inner}
              </Link>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

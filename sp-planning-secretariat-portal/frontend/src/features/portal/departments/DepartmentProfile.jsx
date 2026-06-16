import { useState, useEffect, useMemo } from 'react'
import { Link, useParams, Navigate, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { usePageHold } from '@/shared/hooks/usePageHold'
import ComingSoon from '@/shared/components/ComingSoon'
import {
  BookOpen, Settings, Users, ChevronRight, TrendingUp,
  Phone, Mail, MapPin, UserCircle2, ClipboardList,
  ArrowRight, Building2, Briefcase
} from 'lucide-react'
import './Departments.css'

/* ─── Constants ──────────────────────────────────────────────────── */

const MAROON = '#4A0918'
const GOLD   = '#C79A2B'
const CREAM  = '#FCFBFA'

const LANG_META = {
  en: { font: 'Inter, sans-serif',               headFont: "'Playfair Display', Georgia, serif", isNonLatin: false },
  si: { font: "'Noto Sans Sinhala', sans-serif", headFont: "'Noto Sans Sinhala', sans-serif",   isNonLatin: true  },
  ta: { font: "'Noto Sans Tamil', sans-serif",   headFont: "'Noto Sans Tamil', sans-serif",     isNonLatin: true  },
}

/* ─── Quick-nav ──────────────────────────────────────────────────── */

const QUICK_LINKS = [
  { key: 'accounts',       path: '/departments/accounts',           icon: BookOpen,      labelKey: 'navAccounts'  },
  { key: 'administration', path: '/departments/administration',      icon: Settings,      labelKey: 'navAdmin'     },
  { key: 'development',    path: '/departments/development',         icon: TrendingUp,    labelKey: 'navDev'       },
  { key: 'head-admin',     path: '/departments/head-administration', icon: Users,         labelKey: 'navHeadAdmin' },
  { key: 'head-accounts',  path: '/departments/head-accounts',       icon: ClipboardList, labelKey: 'navHeadAcc'   },
]

const NAV_T = {
  en: { navAccounts: 'Accounts', navAdmin: 'Administration', navDev: 'Development', navHeadAdmin: 'Head of Administration', navHeadAcc: 'Head of Accounts', quickNav: 'Quick Navigation' },
  si: { navAccounts: 'ගිණුම්',   navAdmin: 'පරිපාලන',       navDev: 'සංවර්ධන',     navHeadAdmin: 'පරිපාලන ප්‍රධානී',      navHeadAcc: 'ගිණුම් ප්‍රධානී',  quickNav: 'ශීඝ්‍ර සංචලනය' },
  ta: { navAccounts: 'கணக்குகள்',navAdmin: 'நிர்வாகம்',    navDev: 'வளர்ச்சி',    navHeadAdmin: 'நிர்வாக தலைவர்',         navHeadAcc: 'கணக்கு தலைவர்', quickNav: 'விரைவு வழிசெலுத்தல்' },
}

/* ─── Profile data ───────────────────────────────────────────────── */

const PROFILES = {
  'head-administration': {
    imgSrc:   '/branding/ao.png',
    deptPath: '/departments/administration',
    badge: {
      en: 'Head of Administration Division',
      si: 'පරිපාලන අංශ ප්‍රධානී',
      ta: 'நிர்வாகத் துறை தலைவர்',
    },
    name: {
      en: 'Mrs. A.B.C. Perera',
      si: 'ශ්‍රීමතී. ඒ.බී.සී. පෙරේරා',
      ta: 'திருமதி. ஏ.பி.சி. பெரேரா',
    },
    position: {
      en: 'Head of Administration Division',
      si: 'පරිපාලන අංශ ප්‍රධානී',
      ta: 'நிர்வாகத் துறை தலைவர்',
    },
    experience: {
      en: 'Over 18 years of experience in public administration and human resource management.',
      si: 'රාජ්‍ය පරිපාලනය සහ මානව සම්පත් කළමනාකරණ ක්ෂේත්‍රයේ වසර 18 කට වැඩි අත්දැකීම.',
      ta: 'பொது நிர்வாகம் மற்றும் மனிதவள மேலாண்மையில் 18 ஆண்டுகளுக்கும் மேலான அனுபவம்.',
    },
    responsibilities: {
      en: [
        'Overall administration and institutional management of the Secretariat',
        'Strategic human resource planning and staff development',
        'Policy implementation and compliance oversight',
        'Budget coordination and resource management for the department',
        'Stakeholder liaison and inter-departmental coordination',
        'Performance management and appraisal systems',
        'Ensuring adherence to government service procedures and regulations',
      ],
      si: [
        'ලේකම් කාර්යාලයේ සමස්ත පරිපාලනය සහ ආයතනික කළමනාකරණය',
        'උපායමාර්ගික මානව සම්පත් සැලසුම් සහ කාර්ය මණ්ඩල සංවර්ධනය',
        'ප්‍රතිපත්ති ක්‍රියාත්මක කිරීම සහ අනුකූලතා අධීක්ෂණය',
        'අංශය සඳහා අයවැය සම්බන්ධීකරණය සහ සම්පත් කළමනාකරණය',
        'මූලධාරා ස්ථාවරධාරියන් සම්බන්ධ කිරීම සහ අංශ අතර සම්බන්ධීකරණය',
        'ක්‍රියාකාරිත්ව කළමනාකරණය සහ ඇගයීම් පද්ධති',
        'රාජ්‍ය සේවා ක්‍රියා පටිපාටි සහ නීති රීතිවලට අනුකූලව සිටීම සහතික',
      ],
      ta: [
        'செயலகத்தின் ஒட்டுமொத்த நிர்வாகம் மற்றும் நிறுவன மேலாண்மை',
        'மூலோபாய மனிதவள திட்டமிடல் மற்றும் ஊழியர் மேம்பாடு',
        'கொள்கை செயல்படுத்தல் மற்றும் இணக்கம் மேற்பார்வை',
        'துறைக்கான பட்ஜெட் ஒருங்கிணைப்பு மற்றும் வள மேலாண்மை',
        'பங்குதாரர் தொடர்பு மற்றும் துறைகளுக்கிடையேயான ஒருங்கிணைப்பு',
        'செயல்திறன் மேலாண்மை மற்றும் மதிப்பீட்டு அமைப்புகள்',
        'அரசாங்க சேவை நடைமுறைகள் மற்றும் விதிமுறைகளை கடைப்பிடிப்பதை உறுதி செய்தல்',
      ],
    },
    contact: {
      phone:    '+94 91 222 XXXX',
      email:    'admin.dept@planning.sp.gov.lk',
      location: 'Administration Wing, Planning Secretariat, Galle',
    },
    dept: {
      en: 'Administration Division',
      si: 'පරිපාලන අංශය',
      ta: 'நிர்வாகத் துறை',
    },
  },

  'head-accounts': {
    imgSrc:   '/staff/head-accounts.jpg',
    deptPath: '/departments/accounts',
    badge: {
      en: 'Accountant (Acting)',
      si: 'ගණකාධිකාරී (වැඩබලන)',
      ta: 'கணக்காளர் (பொ.)',
    },
    name: {
      en: 'Mrs. D.V. Dishani',
      si: 'ඩී.වී. දිශානි මහත්මිය',
      ta: 'திருமதி. டி.வி. திஷானி',
    },
    position: {
      en: 'Accountant (Acting)',
      si: 'ගණකාධිකාරී (වැඩබලන)',
      ta: 'கணக்காளர் (பொ.)',
    },
    responsibilities: {
      en: [
        'Overall financial management and budget oversight of the Secretariat',
        'Ensuring timely and accurate preparation of all financial statements',
        'Coordination with the Auditor General and Treasury officials',
        'Implementation of government financial regulations and Treasury circulars',
        'Management of all accounts staff and capacity development',
        'Preparation and submission of annual budget estimates',
        'Supervision of advances, imprest accounts, and deposits management',
      ],
      si: [
        'ලේකම් කාර්යාලයේ සමස්ත මූල්‍ය කළමනාකරණය සහ අයවැය අධීක්ෂණය',
        'සියලු මූල්‍ය ප්‍රකාශ කාලෝචිත හා නිවැරදිව සකස් කිරීම සහතික',
        'ශ්‍රේෂ්ඨාධිකාරී සහ භාණ්ඩාගාර නිලධාරීන් සමඟ සම්බන්ධීකරණය',
        'රාජ්‍ය මූල්‍ය නියාමන සහ භාණ්ඩාගාර චක්‍ර ලේඛ ක්‍රියාත්මක කිරීම',
        'සියලු ගිණුම් කාර්ය මණ්ඩල කළමනාකරණය සහ ධාරිතා සංවර්ධනය',
        'වාර්ෂික අයවැය ඇස්තමේන්තු සකස් කිරීම සහ ඉදිරිපත් කිරීම',
        'අත්තිකාරම්, ඉම්ප්‍රෙස්ට් ගිණුම් සහ තැන්පතු කළමනාකරණය අධීක්ෂණය',
      ],
      ta: [
        'செயலகத்தின் ஒட்டுமொத்த நிதி மேலாண்மை மற்றும் பட்ஜெட் மேற்பார்வை',
        'அனைத்து நிதி அறிக்கைகளும் சரியான நேரத்தில் துல்லியமாக தயாரிக்கப்படுவதை உறுதி செய்தல்',
        'தணிக்கையாளர் நாயகம் மற்றும் கருவூல அதிகாரிகளுடன் ஒருங்கிணைப்பு',
        'அரசாங்க நிதி விதிமுறைகள் மற்றும் கருவூல சுற்றறிக்கைகளை செயல்படுத்துதல்',
        'அனைத்து கணக்கு ஊழியர்களை நிர்வகித்தல் மற்றும் திறன் மேம்பாடு',
        'ஆண்டு பட்ஜெட் மதிப்பீடுகளை தயாரித்தல் மற்றும் சமர்ப்பித்தல்',
        'முன்பணங்கள், இம்ப்ரெஸ்ட் கணக்குகள் மற்றும் வைப்பு மேலாண்மையை மேற்பார்வையிடுதல்',
      ],
    },
    contact: {
      phone:    '+94 91 212 1317',
      email:    'spdcsp@gmail.com',
      location: 'Planning Secretariat, Galle',
    },
    dept: {
      en: 'Accounts Division',
      si: 'ගිණුම් අංශය',
      ta: 'கணக்குத் துறை',
    },
  },
}

/* ─── UI Translations ────────────────────────────────────────────── */

const UI = {
  en: {
    breadHome:       'Home',
    breadDepts:      'Divisions',
    breadProfile:    'Head Profile',
    responsTitle:    'Responsibilities',
    expTitle:        'Experience',
    contactTitle:    'Contact Information',
    contactDeptBtn:  'Contact Division',
    viewDeptBtn:     'View Division',
    contactCTATitle: 'Get in Touch',
    contactCTASub:   'Reach out to the department for inquiries, assistance, or official correspondence.',
    phoneLbl:        'Phone',
    emailLbl:        'Email',
    locLbl:          'Location',
    deptLbl:         'Division',
  },
  si: {
    breadHome:       'මුල් පිටුව',
    breadDepts:      'අංශ',
    breadProfile:    'ප්‍රධානී පැතිකඩ',
    responsTitle:    'වගකීම්',
    expTitle:        'අත්දැකීම',
    contactTitle:    'සම්බන්ධතා තොරතුරු',
    contactDeptBtn:  'අංශය අමතන්න',
    viewDeptBtn:     'අංශය බලන්න',
    contactCTATitle: 'සම්බන්ධ වන්න',
    contactCTASub:   'විමසීම්, සහාය හෝ නිල ලිපි ලේඛන සඳහා අංශ සම්බන්ධ කරගන්න.',
    phoneLbl:        'දුරකථනය',
    emailLbl:        'විද්‍යුත් තැපෑල',
    locLbl:          'ස්ථානය',
    deptLbl:         'අංශය',
  },
  ta: {
    breadHome:       'முகப்பு',
    breadDepts:      'துறைகள்',
    breadProfile:    'தலைவர் சுயவிவரம்',
    responsTitle:    'பொறுப்புகள்',
    expTitle:        'அனுபவம்',
    contactTitle:    'தொடர்பு தகவல்',
    contactDeptBtn:  'துறையை தொடர்பு கொள்',
    viewDeptBtn:     'துறையை காண்க',
    contactCTATitle: 'தொடர்பு கொள்ளுங்கள்',
    contactCTASub:   'விசாரணைகள், உதவி அல்லது அதிகாரப்பூர்வ கடிதத்திற்கு துறையை அணுகவும்.',
    phoneLbl:        'தொலைபேசி',
    emailLbl:        'மின்னஞ்சல்',
    locLbl:          'இடம்',
    deptLbl:         'துறை',
  },
}

/* ─── Animations ─────────────────────────────────────────────────── */

const staggerV = { hidden: {}, visible: { transition: { staggerChildren: 0.10 } } }
const itemV    = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } } }
const fadeUpV  = (delay = 0) => ({ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] } } })

/* ─── Honeycomb ─────────────────────────────────────────────────── */

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

/* ─── Profile Hero ───────────────────────────────────────────────── */

function ProfileHero({ profile, lang, meta, ui }) {
  return (
    <section className="dprof-hero" aria-labelledby="dprof-name">
      <div className="dprof-hero__noise"       aria-hidden="true" />
      <div className="dprof-hero__grid-lines"  aria-hidden="true" />
      <div className="dprof-hero__glow dprof-hero__glow--gold"  aria-hidden="true" />
      <div className="dprof-hero__glow dprof-hero__glow--right" aria-hidden="true" />
      <div className="dep-hero__hc" aria-hidden="true" style={{ opacity: 0.05 }}><HoneycombBg /></div>
      {[...Array(6)].map((_, i) => (
        <div key={i} className={`dep-hero__dot dep-hero__dot--${i + 1}`} aria-hidden="true" />
      ))}

      <div className="dprof-hero__inner">
        {/* Profile image */}
        <motion.div
          className="dprof__img-frame"
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={profile.imgSrc}
            alt={profile.name[lang]}
            className="dprof__img"
            onError={e => {
              e.currentTarget.style.display = 'none'
              e.currentTarget.nextElementSibling.style.display = 'flex'
            }}
          />
          <div className="dprof__img-placeholder" style={{ display: 'none' }} aria-hidden="true">
            <UserCircle2 size={64} color="rgba(199,154,43,0.65)" />
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          className="dprof-hero__content"
          initial="hidden"
          animate="visible"
          variants={staggerV}
        >
          <motion.div className="dprof-hero__badge" variants={itemV}>
            <span className="dprof-hero__badge-dot" aria-hidden="true" />
            <span style={{
              fontFamily:    meta.isNonLatin ? meta.font : "'Cinzel', serif",
              letterSpacing: meta.isNonLatin ? 0 : '0.12em',
              textTransform: meta.isNonLatin ? 'none' : 'uppercase',
            }}>
              {profile.badge[lang]}
            </span>
          </motion.div>

          <motion.h1
            id="dprof-name"
            className="dprof-hero__name"
            style={{ fontFamily: meta.headFont, lineHeight: meta.isNonLatin ? 1.35 : 1.08 }}
            variants={itemV}
          >
            {profile.name[lang]}
          </motion.h1>

          <motion.div className="dprof-hero__rule" variants={itemV} aria-hidden="true" />

          <motion.p
            className="dprof-hero__position"
            style={{ fontFamily: meta.font }}
            variants={itemV}
          >
            {profile.position[lang]}
          </motion.p>

          <motion.div className="dprof-hero__actions" variants={itemV}>
            <Link to="/contact" className="dprof-hero__btn dprof-hero__btn--gold" style={{ fontFamily: meta.font }}>
              <Phone size={14} aria-hidden="true" />
              {ui.contactDeptBtn}
            </Link>
            <Link to={profile.deptPath} className="dprof-hero__btn dprof-hero__btn--ghost" style={{ fontFamily: meta.font }}>
              <Building2 size={14} aria-hidden="true" />
              {ui.viewDeptBtn}
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <svg className="dprof-hero__wave" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,80 C240,20 480,60 720,40 C960,20 1200,60 1440,30 L1440,80 Z" fill={CREAM} />
      </svg>
    </section>
  )
}

/* ─── Quick Nav ──────────────────────────────────────────────────── */

function QuickNav({ lang, meta, activePath }) {
  const nav  = useNavigate()
  const navT = NAV_T[lang] || NAV_T.en
  return (
    <nav className="dep-ql" aria-label={navT.quickNav}>
      <div className="dep-ql__inner">
        {QUICK_LINKS.map(({ key, path, labelKey, icon: Icon }) => (
          <button
            key={key}
            className={`dep-ql__pill${activePath === path ? ' active' : ''}`}
            onClick={() => nav(path)}
            style={{ fontFamily: meta.font }}
            aria-current={activePath === path ? 'page' : undefined}
          >
            <Icon size={14} aria-hidden="true" />
            {navT[labelKey]}
          </button>
        ))}
      </div>
    </nav>
  )
}

/* ─── Sidebar ─────────────────────────────────────────────────────── */

function ProfileSidebar({ profile, lang, meta, ui }) {
  return (
    <aside className="dprof-sidebar" aria-label="Profile details">

      {/* Contact info */}
      <div className="dprof-info-card">
        <div className="dprof-info-card__heading" aria-hidden="true">{ui.contactTitle}</div>

        <div className="dprof-info-row">
          <div className="dprof-info-row__icon"><Phone size={14} color={GOLD} aria-hidden="true" /></div>
          <div>
            <div className="dprof-info-row__label" style={{ fontFamily: "'Cinzel', serif" }}>{ui.phoneLbl}</div>
            <div className="dprof-info-row__value" style={{ fontFamily: meta.font }}>{profile.contact.phone}</div>
          </div>
        </div>

        <div className="dprof-info-row">
          <div className="dprof-info-row__icon"><Mail size={14} color={GOLD} aria-hidden="true" /></div>
          <div>
            <div className="dprof-info-row__label" style={{ fontFamily: "'Cinzel', serif" }}>{ui.emailLbl}</div>
            <div className="dprof-info-row__value" style={{ fontFamily: meta.font, wordBreak: 'break-all' }}>{profile.contact.email}</div>
          </div>
        </div>

        <div className="dprof-info-row">
          <div className="dprof-info-row__icon"><MapPin size={14} color={GOLD} aria-hidden="true" /></div>
          <div>
            <div className="dprof-info-row__label" style={{ fontFamily: "'Cinzel', serif" }}>{ui.locLbl}</div>
            <div className="dprof-info-row__value" style={{ fontFamily: meta.font }}>{profile.contact.location}</div>
          </div>
        </div>

        <div className="dprof-info-row">
          <div className="dprof-info-row__icon"><Building2 size={14} color={GOLD} aria-hidden="true" /></div>
          <div>
            <div className="dprof-info-row__label" style={{ fontFamily: "'Cinzel', serif" }}>{ui.deptLbl}</div>
            <div className="dprof-info-row__value" style={{ fontFamily: meta.font }}>{profile.dept[lang]}</div>
          </div>
        </div>
      </div>

      {/* Experience */}
      {profile.experience && (
        <div className="dprof-info-card">
          <div className="dprof-info-card__heading" aria-hidden="true">
            <Briefcase size={11} color={GOLD} style={{ display: 'inline', marginRight: 6 }} aria-hidden="true" />
            {ui.expTitle}
          </div>
          <p className="dprof-section-card__body" style={{ fontFamily: meta.font, lineHeight: 1.8 }}>
            {profile.experience[lang]}
          </p>
        </div>
      )}

      {/* Department link */}
      <Link
        to={profile.deptPath}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 18px',
          background: `linear-gradient(135deg, ${MAROON} 0%, #2E0812 100%)`,
          borderRadius: '14px',
          textDecoration: 'none',
          color: '#fff',
          fontFamily: meta.font,
          fontSize: '0.84rem',
          fontWeight: 700,
          boxShadow: '0 4px 18px rgba(74,9,24,0.22)',
          transition: 'transform 0.22s ease, box-shadow 0.22s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(74,9,24,0.32)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 18px rgba(74,9,24,0.22)' }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Building2 size={15} aria-hidden="true" />
          {ui.viewDeptBtn}
        </span>
        <ArrowRight size={14} aria-hidden="true" />
      </Link>

    </aside>
  )
}

/* ─── Main content ───────────────────────────────────────────────── */

function ProfileMainContent({ profile, lang, meta, ui }) {
  return (
    <div className="dprof-main-content">

      {/* Responsibilities */}
      <motion.div
        className="dprof-section-card"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        variants={fadeUpV(0)}
      >
        <h2 className="dprof-section-card__heading" style={{ fontFamily: meta.headFont, lineHeight: meta.isNonLatin ? 1.45 : 1.2 }}>
          {ui.responsTitle}
        </h2>
        <motion.ul
          className="dprof-resp-list"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerV}
          role="list"
        >
          {profile.responsibilities[lang].map((r, i) => (
            <motion.li key={i} style={{ fontFamily: meta.font }} variants={itemV}>
              {r}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      {/* Contact CTA */}
      <motion.div
        className="dprof-contact-cta"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        variants={fadeUpV(0)}
        role="region"
        aria-label="Contact section"
      >
        <div>
          <div className="dprof-contact-cta__title" style={{ fontFamily: meta.headFont, lineHeight: meta.isNonLatin ? 1.45 : 1.2 }}>
            {ui.contactCTATitle}
          </div>
          <p className="dprof-contact-cta__text" style={{ fontFamily: meta.font }}>
            {ui.contactCTASub}
          </p>
        </div>
        <Link to="/contact" className="dprof-contact-cta__btn" style={{ fontFamily: meta.font }}>
          <Phone size={15} aria-hidden="true" />
          {ui.contactDeptBtn}
        </Link>
      </motion.div>

    </div>
  )
}

/* ─── Main export ────────────────────────────────────────────────── */

export default function DepartmentProfile() {
  const heldParent = usePageHold('departments')
  const { slug: profileKey } = useParams()
  const heldSub = usePageHold(`departments__${profileKey}`)
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en')

  useEffect(() => {
    const h = (e) => setLang(e.detail || 'en')
    window.addEventListener('langChange', h)
    return () => window.removeEventListener('langChange', h)
  }, [])

  const meta    = useMemo(() => LANG_META[lang] || LANG_META.en, [lang])
  const ui      = useMemo(() => UI[lang]        || UI.en,        [lang])
  const profile = PROFILES[profileKey]

  if (heldParent || heldSub) return <ComingSoon pageKey="departments" />
  if (!profile) return <Navigate to="/departments" replace />

  const activePath = `/departments/${profileKey}`

  return (
    <div className="dprof-wrap">
      <ProfileHero profile={profile} lang={lang} meta={meta} ui={ui} />
      <QuickNav lang={lang} meta={meta} activePath={activePath} />

      {/* Breadcrumb */}
      <nav className="dep-breadcrumb" aria-label="Breadcrumb">
        <div className="dep-breadcrumb__inner">
          <Link to="/home"            style={{ fontFamily: meta.font }}>{ui.breadHome}</Link>
          <span className="dep-breadcrumb__sep" aria-hidden="true"><ChevronRight size={12} /></span>
          <Link to="/departments"     style={{ fontFamily: meta.font }}>{ui.breadDepts}</Link>
          <span className="dep-breadcrumb__sep" aria-hidden="true"><ChevronRight size={12} /></span>
          <Link to={profile.deptPath} style={{ fontFamily: meta.font }}>{profile.dept[lang]}</Link>
          <span className="dep-breadcrumb__sep" aria-hidden="true"><ChevronRight size={12} /></span>
          <span className="dep-breadcrumb__cur" style={{ fontFamily: meta.font }}>{ui.breadProfile}</span>
        </div>
      </nav>

      <div className="dep-divider" />

      {/* Body layout */}
      <main className="dprof-body">
        <ProfileSidebar     profile={profile} lang={lang} meta={meta} ui={ui} />
        <ProfileMainContent profile={profile} lang={lang} meta={meta} ui={ui} />
      </main>
    </div>
  )
}

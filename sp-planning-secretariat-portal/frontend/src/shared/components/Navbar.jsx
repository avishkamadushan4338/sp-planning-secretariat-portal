import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Building2,
  Users,
  Network,
  ClipboardList,
  BookOpen,
  UserCircle2,
  MapPin,
  Phone,
  Mail,
  Clock,
  Newspaper,
  Camera,
  Bell,
} from 'lucide-react'
import { FaBars, FaTimes, FaChevronDown } from 'react-icons/fa'
import './Navbar.css'

const SITE_LOGO_PATH = '/branding/logo.png'

const ABOUT_US_MENU = [
  {
    title: {
      en: 'Planning Secretariat Overview',
      si: 'සැලසුම් ලේකම් කාර්යාලය දළ විශ්ලේෂණය',
      ta: 'திட்டமிடல் செயலக கண்ணோட்டம்',
    },
    description: {
      en: 'Vision, Mission, Mandate and Scope of the Planning Secretariat',
      si: 'සැලසුම් ලේකම් කාර්යාලයේ දැක්ම, මෙහෙවර, බලය සහ විෂය පථය',
      ta: 'திட்டமிடல் செயலகத்தின் தொலைநோக்கு, நோக்கம், ஆணை மற்றும் நோக்கெல்லை',
    },
    path: '/about/secretariat-overview',
    icon: Building2,
  },
  {
    title: {
      en: 'Organization Structure',
      si: 'සංවිධාන ව්‍යුහය',
      ta: 'நிறுவன அமைப்பு',
    },
    description: {
      en: 'Organizational setup of the Planning Secretariat',
      si: 'සැලසුම් ලේකම් කාර්යාලයේ සංවිධානාත්මක සැකැස්ම',
      ta: 'திட்டமிடல் செயலகத்தின் நிறுவன அமைப்பு',
    },
    path: '/about/organization-structure',
    icon: Network,
  },
  {
    title: {
      en: 'Functions & Duties',
      si: 'කාර්යයන් හා රාජකාරි',
      ta: 'செயல்பாடுகள் & கடமைகள்',
    },
    description: {
      en: 'Key functions and responsibilities of the Secretariat',
      si: 'ලේකම් කාර්යාලයේ ප්‍රධාන කාර්යයන් සහ වගකීම්',
      ta: 'செயலகத்தின் முக்கிய செயல்பாடுகள் மற்றும் பொறுப்புகள்',
    },
    path: '/about/functions-duties',
    icon: ClipboardList,
  },
  {
    title: {
      en: 'History',
      si: 'ඉතිහාසය',
      ta: 'வரலாறு',
    },
    description: {
      en: 'Journey and milestones of the Planning Secretariat',
      si: 'සැලසුම් ලේකම් කාර්යාලයේ ගමන් මග සහ ජයග්‍රහණ',
      ta: 'திட்டமிடல் செயலகத்தின் பயணம் மற்றும் மைல்கற்கள்',
    },
    path: '/about/history',
    icon: BookOpen,
  },
]

const FEATURED_OFFICIALS = [
  {
    role: {
      en: 'Deputy Chief Secretary – Planning',
      si: 'නියෝජ්‍ය ප්‍රධාන ලේකම් – සැලසුම්',
      ta: 'துணை தலைமை செயலர் – திட்டமிடல்',
    },
    name: 'Mr. M.K.G.S.P.K. Jayasekara',
    path: '/about-deputy-secretary',
    photo: '/branding/sec-prof.png',
  },
  {
    role: {
      en: 'Director – Planning',
      si: 'අධ්‍යක්ෂ – සැලසුම්',
      ta: 'இயக்குநர் – திட்டமிடல்',
    },
    name: 'Mrs. K.S. Weerawardhane',
    path: '/about/director-planning',
    photo: '/branding/dir.png',
  },
]

const NEWS_MENU = [
  {
    title: {
      en: 'News & Updates',
      si: 'පුවත් සහ යාවත්කාලීන',
      ta: 'செய்திகள் & புதுப்பிப்புகள்',
    },
    description: {
      en: 'Latest announcements, press releases and secretariat updates',
      si: 'නවතම නිවේදන, මාධ්‍ය නිවේදන සහ ලේකම් කාර්යාල යාවත්කාලීන',
      ta: 'சமீபத்திய அறிவிப்புகள், செய்தி வெளியீடுகள் மற்றும் செயலக புதுப்பிப்புகள்',
    },
    path: '/news?tab=news',
    icon: Newspaper,
  },
  {
    title: {
      en: 'Photo Gallery',
      si: 'ඡායාරූප ගැලරිය',
      ta: 'புகைப்பட தொகுப்பு',
    },
    description: {
      en: 'Events, official programs and captured moments',
      si: 'සිදුවීම්, නිල වැඩසටහන් සහ ස්මරණීය මොහොත',
      ta: 'நிகழ்வுகள், உத்தியோகபூர்வ நிகழ்ச்சிகள் மற்றும் கைப்பற்றப்பட்ட தருணங்கள்',
    },
    path: '/news?tab=gallery',
    icon: Camera,
  },
  {
    title: {
      en: 'Official Notices',
      si: 'නිල නිවේදන',
      ta: 'அதிகாரப்பூர்வ அறிவிப்புகள்',
    },
    description: {
      en: 'Circulars, tenders, gazette and formal notifications',
      si: 'චක්‍රලේඛ, ටෙන්ඩර්, ගැසට් සහ නිල දැනුම්දීම්',
      ta: 'சுற்றறிக்கைகள், டெண்டர்கள், வர்த்தமானி மற்றும் முறையான அறிவிப்புகள்',
    },
    path: '/news?tab=notices',
    icon: Bell,
  },
]

const CONTACT_DETAILS = {
  address: '153B, S.H. Dahanayaka Mawatha, Galle, Sri Lanka',
  phone:   '+94 912234503',
  email:   'spdcsp@gmail.com',
  hours: {
    en: 'Mon – Fri: 8:30 AM – 4:30 PM',
    si: 'සඳු – සිකු: 8:30 – 16:30',
    ta: 'திங்கள் – வெள்ளி: 8:30 மு.ப – 4:30 பி.ப',
  },
}

// ─── Translations ─────────────────────────────────────────────────────────────

const DOWNLOADS_PORTALS = [
  { label: 'PMS New', href: 'https://planningsec.lk/login' },
  { label: 'PMS Old', href: 'https://progress.spfeedback.lk/index.php' },
]

const NAV_TRANSLATIONS = {
  en: [
    { id: 'home',  label: 'HOME',         path: '/home' },
    { id: 'about', label: 'ABOUT US',     path: '/about', megaMenu: true, dropdown: ABOUT_US_MENU },
    { id: 'divs',  label: 'DIVISIONS',   path: '/departments' },
    { id: 'media', label: 'MEDIA CENTER', path: '/news', newsPanel: true, dropdown: NEWS_MENU },
    { id: 'docs',  label: 'DOWNLOADS',    path: '/downloads', portalsPanel: true, dropdown: DOWNLOADS_PORTALS },
    {
      id: 'contact', label: 'CONTACT US', path: '/contact',
      contactPanel: true,
      dropdown: [
        { label: 'Find Our Office',      path: '/contact#find-office' },
        { label: 'Telephone Directory',  path: '/contact#contact-info' },
        { label: 'Complaint & Feedback', path: '/contact#feedback' },
      ],
    },
  ],
  si: [
    { id: 'home',  label: 'මුල් පිටුව',           path: '/home' },
    { id: 'about', label: 'අප ගැන',               path: '/about', megaMenu: true, dropdown: ABOUT_US_MENU },
    { id: 'divs',  label: 'අංශ',                   path: '/departments' },
    { id: 'media', label: 'මාධ්‍ය මධ්‍යස්ථානය', path: '/news', newsPanel: true, dropdown: NEWS_MENU },
    { id: 'docs',  label: 'බාගත කිරීම්',           path: '/downloads', portalsPanel: true, dropdown: DOWNLOADS_PORTALS },
    {
      id: 'contact', label: 'අප අමතන්න', path: '/contact',
      contactPanel: true,
      dropdown: [
        { label: 'කාර්යාලය සොයා ගන්න',      path: '/contact#find-office' },
        { label: 'දූරකථන නාමාවලිය',          path: '/contact#contact-info' },
        { label: 'පැමිණිලි සහ ප්‍රතිපෝෂණ', path: '/contact#feedback' },
      ],
    },
  ],
  ta: [
    { id: 'home',  label: 'முகப்பு',                path: '/home' },
    { id: 'about', label: 'எங்களைப் பற்றி',         path: '/about', megaMenu: true, dropdown: ABOUT_US_MENU },
    { id: 'divs',  label: 'பிரிவுகள்',              path: '/departments' },
    { id: 'media', label: 'ஊடக மையம்',             path: '/news', newsPanel: true, dropdown: NEWS_MENU },
    { id: 'docs',  label: 'பதிவிறக்கங்கள்',         path: '/downloads', portalsPanel: true, dropdown: DOWNLOADS_PORTALS },
    {
      id: 'contact', label: 'தொடர்பு கொள்ளுங்கள்', path: '/contact',
      contactPanel: true,
      dropdown: [
        { label: 'எங்கள் அலுவலகத்தைக் கண்டறியுங்கள்', path: '/contact#find-office' },
        { label: 'தொலைபேசி அடைவு',                       path: '/contact#contact-info' },
        { label: 'புகார் & கருத்து',                     path: '/contact#feedback' },
      ],
    },
  ],
}

const LANG_FONT = {
  en: 'inherit',
  si: "'Noto Sans Sinhala', sans-serif",
  ta: "'Noto Sans Tamil', sans-serif",
}

const NAVBAR_UI = {
  en: {
    contactTitle:       'Planning Secretariat',
    quickLinks:         'Quick Links',
    keyOfficials:       'Key Officials',
    planningTeam:       'Planning Team',
    deputyDirectors:    'Deputy Directors',
    deputyDirectorsSub: '6 Deputy Directors – Planning',
    readMore:           'Read More →',
    viewAll:            'View All →',
  },
  si: {
    contactTitle:       'සැලසුම් ලේකම් කාර්යාලය',
    quickLinks:         'ඉක්මන් සබැඳි',
    keyOfficials:       'ප්‍රධාන නිලධාරීන්',
    planningTeam:       'සැලසුම් කණ්ඩායම',
    deputyDirectors:    'නියෝජ්‍ය අධ්‍යක්ෂවරුන්',
    deputyDirectorsSub: 'නියෝජ්‍ය අධ්‍යක්ෂවරු 6 – සැලසුම්',
    readMore:           'තව කියවන්න →',
    viewAll:            'සියල්ල බලන්න →',
  },
  ta: {
    contactTitle:       'திட்டமிடல் செயலகம்',
    quickLinks:         'விரைவு இணைப்புகள்',
    keyOfficials:       'முக்கிய அதிகாரிகள்',
    planningTeam:       'திட்டமிடல் குழு',
    deputyDirectors:    'உதவி இயக்குநர்கள்',
    deputyDirectorsSub: '6 உதவி இயக்குநர்கள் – திட்டமிடல்',
    readMore:           'மேலும் படிக்கவும் →',
    viewAll:            'அனைத்தையும் காண்க →',
  },
}

const LANGUAGES = [
  { code: 'si', label: 'සිංහල' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'en', label: 'English' },
]

// ─── Official Avatar ──────────────────────────────────────────────────────────

function OfficialAvatar({ photo, name }) {
  const [err, setErr] = useState(false)
  if (!err) {
    return (
      <img
        src={photo}
        alt={name}
        className="w-full h-full object-cover object-top"
        onError={() => setErr(true)}
      />
    )
  }
  return (
    <div className="w-full h-full flex items-center justify-center bg-[rgba(199,154,43,0.12)]">
      <UserCircle2 size={32} className="text-gold/60" />
    </div>
  )
}

// ─── Government Emblem ────────────────────────────────────────────────────────

function GovernmentEmblem() {
  return (
    <div className="navbar-emblem flex-shrink-0 rounded-full border-[2.5px] border-gold bg-white flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-[5px] rounded-full border border-gold opacity-30 pointer-events-none" />
      <div className="absolute inset-[10px] rounded-full border border-maroon opacity-20 pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center justify-center text-center gap-[2px]">
        <span className="font-display text-[6px] font-bold text-maroon uppercase tracking-[0.18em] leading-none">
          ශ්‍රී ලංකා
        </span>
        <div className="w-5 h-px bg-gold opacity-80" />
        <span className="font-display text-[5.5px] font-bold text-deep-maroon uppercase tracking-[0.14em] leading-none">
          SRI LANKA
        </span>
      </div>
    </div>
  )
}

function SiteLogo() {
  const [loaded, setLoaded] = useState(false)
  const [error, setError]   = useState(false)

  if (error) return <GovernmentEmblem />

  return (
    <>
      {!loaded && <div className="navbar-logo-skeleton" aria-hidden="true" />}
      <img
        src={SITE_LOGO_PATH}
        alt="Southern Province Planning Secretariat logo"
        className="navbar-logo-image"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.4s ease' }}
      />
    </>
  )
}

// ─── Desktop Nav Item ─────────────────────────────────────────────────────────

function DesktopNavItem({ item, lang, isActive, activeDropdown, onEnter, onLeave, onToggle }) {
  const dropOpen    = activeDropdown === item.id
  const fontFamily  = LANG_FONT[lang]
  const isDisabled  = item.disabled === true
  const hasDropdown = Array.isArray(item.dropdown) && item.dropdown.length > 0
  const isAboutMega   = item.megaMenu === true
  const isPortalPanel = item.portalsPanel === true
  const active        = (isAboutMega ? isActive('/about') : isActive(item.path)) || dropOpen

  const ui = NAVBAR_UI[lang] || NAVBAR_UI.en

  const sharedLinkCls = `
    nav-item-bold relative flex items-center gap-1.5
    nav-px
    font-sans nav-label-size font-extrabold tracking-[0.07em] uppercase
    transition-colors duration-200 group whitespace-nowrap
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-1
  `
  const underbar = (isOn) => (
    <span
      className={`
        absolute bottom-0 left-0 right-0 h-[3px] bg-gold
        transition-all duration-200 origin-center
        ${isOn ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'}
      `}
    />
  )

  return (
    <li
      className="relative h-full flex items-stretch"
      onMouseEnter={() => hasDropdown && onEnter(item.id)}
      onMouseLeave={() => hasDropdown && onLeave()}
      role="none"
    >
      {isDisabled ? (
        <button
          type="button"
          role="menuitem"
          aria-disabled="true"
          tabIndex={-1}
          className={`${sharedLinkCls} text-prem-black/50 cursor-default`}
          style={{ fontFamily }}
        >
          <span>{item.label}</span>
        </button>

      ) : isAboutMega ? (
        <button
          type="button"
          role="menuitem"
          aria-haspopup="menu"
          aria-expanded={dropOpen}
          aria-label={`${item.label} menu`}
          onClick={() => onToggle(item.id)}
          className={`
            ${sharedLinkCls}
            ${dropOpen ? 'bg-maroon text-white rounded-t-md' : active ? 'text-maroon' : 'text-prem-black hover:text-maroon'}
          `}
          style={{ fontFamily }}
        >
          <span>{item.label}</span>
          <FaChevronDown className={`nav-chevron transition-transform duration-200 ${dropOpen ? 'rotate-180' : ''}`} />
          {underbar(active)}
        </button>

      ) : (
        <Link
          to={item.path}
          role="menuitem"
          aria-haspopup={hasDropdown ? 'menu' : undefined}
          aria-expanded={hasDropdown ? dropOpen : undefined}
          className={`${sharedLinkCls} ${active ? 'text-maroon' : 'text-prem-black hover:text-maroon'}`}
          style={{ fontFamily }}
        >
          <span>{item.label}</span>
          {hasDropdown && (
            <FaChevronDown className={`nav-chevron transition-transform duration-200 ${dropOpen ? 'rotate-180' : ''}`} />
          )}
          {underbar(active)}
        </Link>
      )}

      {/* ── Plain dropdown ── */}
      {hasDropdown && !isAboutMega && !item.contactPanel && !item.newsPanel && !isPortalPanel && dropOpen && (
        <div
          className="nav-plain-drop absolute top-full left-0 bg-white border-t-[3px] border-gold z-50"
          role="menu"
          aria-label={`${item.label} submenu`}
          onMouseEnter={() => onEnter(item.id)}
          onMouseLeave={onLeave}
        >
          {item.dropdown.map((sub) => (
            <Link
              key={sub.path}
              to={sub.path}
              role="menuitem"
              className="
                flex items-center gap-3 px-5 py-3
                font-sans text-[11px] font-bold tracking-[0.06em] uppercase text-prem-black
                hover:text-maroon hover:bg-ivory hover:pl-7
                border-b border-warm-neutral last:border-0
                transition-all duration-150
                focus-visible:outline-none focus-visible:bg-ivory focus-visible:text-maroon
              "
              style={{ fontFamily }}
            >
              <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0 opacity-70" />
              {sub.label}
            </Link>
          ))}
        </div>
      )}

      {/* ── Portals / Downloads panel ── */}
      {isPortalPanel && dropOpen && (
        <div
          className="nav-plain-drop absolute top-full left-0 bg-white border-t-[3px] border-gold z-50"
          role="menu"
          aria-label="Downloads submenu"
          onMouseEnter={() => onEnter(item.id)}
          onMouseLeave={onLeave}
        >
          {item.dropdown.map((sub) => (
            <a
              key={sub.label}
              href={sub.href}
              role="menuitem"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex items-center gap-3 px-5 py-3
                font-sans text-[11px] font-bold tracking-[0.06em] uppercase text-prem-black
                hover:text-maroon hover:bg-ivory hover:pl-7
                border-b border-warm-neutral last:border-0
                transition-all duration-150
                focus-visible:outline-none focus-visible:bg-ivory focus-visible:text-maroon
              "
              style={{ fontFamily }}
            >
              <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0 opacity-70" />
              {sub.label}
            </a>
          ))}
        </div>
      )}

      {/* ── News / Media Centre panel ── */}
      {item.newsPanel && dropOpen && (
        <div
          className="nav-news-drop absolute top-full left-0 z-50"
          role="menu"
          aria-label="Media centre submenu"
          onMouseEnter={() => onEnter(item.id)}
          onMouseLeave={onLeave}
        >
          <div className="relative overflow-hidden rounded-b-2xl border-t-[3px] border-gold shadow-[0_24px_48px_rgba(0,0,0,0.32)] bg-gradient-to-br from-maroon to-deep-maroon">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(199,154,43,0.15),transparent_55%)] pointer-events-none" />

            <div className="relative px-6 pt-5 pb-3 border-b border-white/10 flex items-center justify-between">
              <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-gold/70" style={{ fontFamily }}>
                {item.label}
              </p>
              <span className="text-[10px] text-white/25 tracking-widest select-none">— Official Communications</span>
            </div>

            <div className="relative flex flex-col">
              {NEWS_MENU.map((newsItem, idx) => {
                const Icon = newsItem.icon
                return (
                  <Link
                    key={newsItem.path}
                    to={newsItem.path}
                    role="menuitem"
                    className={`
                      group flex items-center gap-5 px-6 py-[18px]
                      hover:bg-white/10 transition-all duration-200
                      focus-visible:outline-none focus-visible:bg-white/10
                      ${idx < NEWS_MENU.length - 1 ? 'border-b border-white/10' : ''}
                    `}
                  >
                    <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-gold/60 text-gold group-hover:shadow-[0_0_18px_rgba(199,154,43,0.55)] transition-shadow duration-200">
                      <Icon size={19} strokeWidth={1.75} />
                    </span>
                    <span className="flex-1 min-w-0" style={{ fontFamily: LANG_FONT[lang] }}>
                      <span className="block text-[15px] font-semibold text-white leading-snug mb-0.5">
                        {newsItem.title[lang] || newsItem.title.en}
                      </span>
                      <span className="block text-[12px] text-[#f0ddd0]/65 leading-relaxed">
                        {newsItem.description[lang] || newsItem.description.en}
                      </span>
                    </span>
                    <span className="text-[17px] text-gold/35 group-hover:text-gold group-hover:translate-x-1.5 transition-all duration-200 flex-shrink-0 font-light" aria-hidden="true">
                      →
                    </span>
                  </Link>
                )
              })}
            </div>

            <div className="relative px-6 py-3 bg-black/20 border-t border-white/10 flex items-center justify-between">
              <Link
                to="/news?tab=news"
                className="text-[11px] font-semibold text-gold/70 hover:text-gold tracking-wide transition-colors duration-150 focus-visible:outline-none focus-visible:text-gold"
                style={{ fontFamily }}
              >
                {ui.viewAll} Media
              </Link>
              <span className="text-[10px] text-white/20 tracking-widest select-none" aria-hidden="true">✦</span>
            </div>
          </div>
        </div>
      )}

      {/* ── Contact Us panel ── */}
      {item.contactPanel && dropOpen && (
        <div
          className="nav-contact-drop absolute top-full right-0 z-50"
          role="menu"
          aria-label="Contact submenu"
          onMouseEnter={() => onEnter(item.id)}
          onMouseLeave={onLeave}
        >
          <div className="relative overflow-hidden rounded-b-2xl border-t-[3px] border-gold shadow-[0_20px_44px_rgba(0,0,0,0.3)] bg-gradient-to-b from-maroon to-deep-maroon">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(199,154,43,0.10),transparent_50%)] pointer-events-none" />
            <div className="relative grid nav-contact-grid">

              {/* Left — contact details */}
              <div className="px-6 py-6 border-r border-white/10">
                <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-gold/70 mb-4" style={{ fontFamily: LANG_FONT[lang] }}>
                  {ui.contactTitle}
                </p>
                <div className="flex flex-col gap-3.5">
                  <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-gold/60 text-gold mt-0.5" aria-hidden="true">
                      <MapPin size={14} strokeWidth={2} />
                    </span>
                    <span className="text-[12.5px] text-white/85 leading-snug">{CONTACT_DETAILS.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-gold/60 text-gold" aria-hidden="true">
                      <Phone size={14} strokeWidth={2} />
                    </span>
                    <a
                      href={`tel:${CONTACT_DETAILS.phone.replace(/\s/g, '')}`}
                      className="text-[12.5px] text-white/85 hover:text-gold transition-colors duration-150 focus-visible:outline-none focus-visible:text-gold"
                    >
                      {CONTACT_DETAILS.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-gold/60 text-gold" aria-hidden="true">
                      <Mail size={14} strokeWidth={2} />
                    </span>
                    <a
                      href={`mailto:${CONTACT_DETAILS.email}`}
                      className="text-[12.5px] text-white/85 hover:text-gold transition-colors duration-150 focus-visible:outline-none focus-visible:text-gold"
                    >
                      {CONTACT_DETAILS.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-gold/60 text-gold" aria-hidden="true">
                      <Clock size={14} strokeWidth={2} />
                    </span>
                    <span className="text-[12.5px] text-white/85" style={{ fontFamily: LANG_FONT[lang] }}>
                      {CONTACT_DETAILS.hours[lang] || CONTACT_DETAILS.hours.en}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right — quick links (single row) */}
              <div className="flex flex-col justify-center px-5 py-6 gap-2">
                <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-gold/70 mb-1" style={{ fontFamily: LANG_FONT[lang] }}>
                  {ui.quickLinks}
                </p>
                <div className="flex flex-row flex-wrap gap-1.5">
                  {item.dropdown.map((sub) => (
                    <Link
                      key={sub.path}
                      to={sub.path}
                      role="menuitem"
                      className="
                        group flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg
                        text-[13px] font-semibold tracking-wide text-white/80 whitespace-nowrap
                        hover:bg-white/10 hover:text-white
                        transition-all duration-150
                        focus-visible:outline-none focus-visible:bg-white/10 focus-visible:text-white
                      "
                      style={{ fontFamily }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </li>
  )
}

// ─── Mobile Nav Item ──────────────────────────────────────────────────────────

function MobileNavItem({ item, lang, isActive, onClose }) {
  const [open, setOpen] = useState(false)
  const hasDropdown = Array.isArray(item.dropdown) && item.dropdown.length > 0
  const isAboutMega = item.megaMenu === true
  const active      = (isAboutMega ? isActive('/about') : isActive(item.path)) || open
  const fontFamily  = LANG_FONT[lang]
  const isDisabled  = item.disabled === true

  const toggleOpen = () => setOpen((v) => !v)

  return (
    <li className="border-b border-warm-neutral last:border-0">
      <div className="flex items-stretch">
        {isDisabled ? (
          <button
            type="button"
            aria-disabled="true"
            tabIndex={-1}
            className="flex-1 px-5 py-4 text-left font-sans mobile-nav-label font-extrabold tracking-[0.07em] uppercase text-prem-black/50 cursor-default"
            style={{ fontFamily }}
          >
            {item.label}
          </button>

        ) : hasDropdown && !item.newsPanel && !item.contactPanel ? (
          <button
            type="button"
            onClick={toggleOpen}
            className={`
              flex-1 px-5 py-4 text-left
              font-sans mobile-nav-label font-extrabold tracking-[0.07em] uppercase
              transition-colors duration-200
              focus-visible:outline-none focus-visible:bg-ivory
              ${active ? 'bg-maroon text-white' : 'text-prem-black hover:bg-ivory/60'}
            `}
            style={{ fontFamily }}
            aria-expanded={open}
            aria-haspopup="menu"
            aria-label={`${item.label} — toggle submenu`}
          >
            {item.label}
          </button>

        ) : (
          <Link
            to={item.path}
            onClick={onClose}
            className={`
              flex-1 px-5 py-4
              font-sans mobile-nav-label font-extrabold tracking-[0.07em] uppercase
              transition-colors duration-200
              focus-visible:outline-none focus-visible:bg-ivory
              ${active ? 'text-maroon' : 'text-prem-black hover:text-maroon'}
            `}
            style={{ fontFamily }}
          >
            {item.label}
          </Link>
        )}

        {hasDropdown && (
          <button
            onClick={toggleOpen}
            className={`
              flex items-center justify-center w-14 flex-shrink-0
              transition-colors duration-200
              focus-visible:outline-none focus-visible:bg-ivory
              ${active ? 'bg-maroon text-white' : 'text-pro-gray hover:bg-ivory hover:text-maroon'}
            `}
            aria-label={open ? `Collapse ${item.label}` : `Expand ${item.label}`}
            aria-expanded={open}
          >
            <FaChevronDown className={`text-[11px] transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
          </button>
        )}
      </div>

      <AnimatePresence initial={false}>
        {hasDropdown && open && (
          <motion.div
            className="bg-ivory border-t border-warm-neutral overflow-hidden"
            role="menu"
            aria-label={`${item.label} submenu`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            {item.dropdown.map((sub) => {
              const Icon = sub.icon
              const sharedCls = `
                flex items-start gap-3 px-6 py-3.5
                font-sans text-[12px] font-medium tracking-wide text-pro-gray
                hover:text-maroon hover:bg-warm-neutral
                border-b border-warm-neutral last:border-0
                transition-colors duration-150
                focus-visible:outline-none focus-visible:bg-warm-neutral focus-visible:text-maroon
              `
              const inner = (
                <>
                  {Icon
                    ? <Icon size={14} className="text-gold mt-0.5 flex-shrink-0" aria-hidden="true" />
                    : <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0 mt-[7px]" aria-hidden="true" />}
                  <span className="leading-snug min-w-0">
                    <span className="block text-prem-black font-semibold">
                      {typeof sub.title === 'object' ? (sub.title[lang] || sub.title.en) : (sub.title || sub.label)}
                    </span>
                    {sub.description && (
                      <span className="block text-[11px] text-pro-gray/90 mt-0.5">
                        {typeof sub.description === 'object' ? (sub.description[lang] || sub.description.en) : sub.description}
                      </span>
                    )}
                  </span>
                </>
              )
              return sub.href ? (
                <a
                  key={sub.label}
                  href={sub.href}
                  role="menuitem"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className={sharedCls}
                  style={{ fontFamily }}
                >
                  {inner}
                </a>
              ) : (
                <Link
                  key={sub.path}
                  to={sub.path}
                  role="menuitem"
                  onClick={onClose}
                  className={sharedCls}
                  style={{ fontFamily }}
                >
                  {inner}
                </Link>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────

export default function Navbar() {
  const [mobileOpen,     setMobileOpen]     = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [scrolled,       setScrolled]       = useState(false)
  const [navbarHeight,   setNavbarHeight]   = useState(68)
  const [activeLang,     setActiveLang]     = useState(
    () => (typeof window !== 'undefined' ? localStorage.getItem('lang') : null) || 'en'
  )

  const location     = useLocation()
  const headerRef    = useRef(null)
  const dropTimerRef = useRef(null)

  const navItems       = NAV_TRANSLATIONS[activeLang] || NAV_TRANSLATIONS.en
  const activeMegaItem = navItems.find((item) => item.id === activeDropdown && item.megaMenu)

  // ── measure real navbar height so mobile menu never overlaps it ──
  useEffect(() => {
    if (!headerRef.current) return
    const ro = new ResizeObserver(() => {
      setNavbarHeight(headerRef.current.getBoundingClientRect().height)
    })
    ro.observe(headerRef.current)
    setNavbarHeight(headerRef.current.getBoundingClientRect().height)
    return () => ro.disconnect()
  }, [])

  // ── scroll shadow ──
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── close on route change ──
  useEffect(() => {
    setMobileOpen(false)
    setActiveDropdown(null)
  }, [location.pathname, location.hash])

  // ── click-outside close ──
  useEffect(() => {
    const handler = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setActiveDropdown(null)
        setMobileOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // ── Escape key close ──
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null)
        setMobileOpen(false)
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  // ── body scroll lock when mobile menu open ──
  useEffect(() => {
    // No body lock — mobile menu is position:fixed and self-contained.
    // Locking body overflow collapses background content visually.
  }, [mobileOpen])

  const handleLangChange = useCallback((code) => {
    localStorage.setItem('lang', code)
    setActiveLang(code)
    window.dispatchEvent(new CustomEvent('langChange', { detail: code }))
  }, [])

  const isActive = useCallback((path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path),
  [location.pathname])

  const handleDropEnter = useCallback((id) => {
    clearTimeout(dropTimerRef.current)
    setActiveDropdown(id)
  }, [])

  const handleDropLeave = useCallback(() => {
    dropTimerRef.current = setTimeout(() => setActiveDropdown(null), 180)
  }, [])

  const handleDropToggle = useCallback((id) => {
    clearTimeout(dropTimerRef.current)
    setActiveDropdown((cur) => (cur === id ? null : id))
  }, [])

  return (
    <>
      <header
        ref={headerRef}
        id="site-header"
        role="banner"
        className={`fixed top-0 left-0 right-0 z-[9999] w-full transition-shadow duration-300 ${scrolled ? 'shadow-nav' : ''}`}
      >
        {/* ══════════════════════════════════════════════════════════════════
            MAIN NAV BAR
        ══════════════════════════════════════════════════════════════════ */}
        <div className="bg-white border-b border-warm-neutral relative">

          {/* Language ribbon — desktop only */}
          <div
            className="hidden lg:flex absolute top-0 right-0 z-10 bg-maroon items-center px-3 py-[5px] select-none"
            style={{ borderBottomLeftRadius: '10px' }}
            role="navigation"
            aria-label="Language selector"
          >
            {LANGUAGES.map((lang, idx) => (
              <span key={lang.code} className="flex items-center">
                <button
                  onClick={() => handleLangChange(lang.code)}
                  aria-label={`Switch to ${lang.label}`}
                  aria-pressed={activeLang === lang.code}
                  className={`
                    px-3 py-1 text-[12px] font-medium tracking-wide
                    transition-all duration-200
                    focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold
                    ${activeLang === lang.code ? 'text-gold font-semibold' : 'text-white/75 hover:text-gold'}
                  `}
                  style={{ fontFamily: LANG_FONT[lang.code] }}
                >
                  {lang.label}
                </button>
                {idx < LANGUAGES.length - 1 && (
                  <span className="text-gold opacity-30 text-[11px] select-none" aria-hidden="true">│</span>
                )}
              </span>
            ))}
          </div>

          {/* ── Inner row ── */}
          <div className="navbar-inner">
            <div className="navbar-row">

              {/* Logo */}
              <Link
                to="/"
                className="navbar-logo-link group outline-none focus-visible:ring-2 focus-visible:ring-gold"
                aria-label="Southern Province Planning Secretariat — Home"
              >
                <SiteLogo />
              </Link>

              {/* Desktop nav */}
              <nav
                className="hidden lg:flex items-stretch self-stretch navbar-nav-gap"
                aria-label="Main navigation"
              >
                <ul className="flex items-stretch h-full" role="menubar">
                  {navItems.map((item) => (
                    <DesktopNavItem
                      key={item.id}
                      item={item}
                      lang={activeLang}
                      isActive={isActive}
                      activeDropdown={activeDropdown}
                      onEnter={handleDropEnter}
                      onLeave={handleDropLeave}
                      onToggle={handleDropToggle}
                    />
                  ))}
                </ul>
              </nav>

              {/* Hamburger */}
              <button
                className="
                  lg:hidden flex items-center justify-center
                  hamburger-btn
                  text-maroon hover:bg-ivory border border-transparent
                  hover:border-warm-neutral rounded
                  transition-all duration-200
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold
                "
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
              >
                {mobileOpen
                  ? <FaTimes className="text-[17px]" aria-hidden="true" />
                  : <FaBars  className="text-[17px]" aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            ABOUT US MEGA MENU
        ══════════════════════════════════════════════════════════════════ */}
        <AnimatePresence>
          {activeMegaItem && (
            <motion.div
              className="hidden lg:block absolute top-full z-[60] mega-menu-positioner"
              onMouseEnter={() => handleDropEnter(activeMegaItem.id)}
              onMouseLeave={handleDropLeave}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="relative overflow-hidden border-t border-gold rounded-b-2xl shadow-[0_28px_50px_rgba(0,0,0,0.32)] bg-gradient-to-b from-maroon to-deep-maroon"
                role="menu"
                aria-label="About Us menu"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(199,154,43,0.13),transparent_42%),radial-gradient(circle_at_80%_90%,rgba(255,255,255,0.05),transparent_36%)] pointer-events-none" />

                <div className="relative mega-grid">
                  {/* Menu items column */}
                  <div className="border-r border-white/10">
                    {activeMegaItem.dropdown.map((menuItem, rowIndex) => {
                      const Icon = menuItem.icon
                      return (
                        <Link
                          key={menuItem.path}
                          to={menuItem.path}
                          role="menuitem"
                          className={`
                            group flex items-center gap-4 px-6 py-[14px]
                            transition-colors duration-200 hover:bg-[#7a1a30]/65
                            focus-visible:outline-none focus-visible:bg-[#7a1a30]/65
                            ${rowIndex < activeMegaItem.dropdown.length - 1 ? 'border-b border-white/10' : ''}
                          `}
                        >
                          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-gold/80 text-gold group-hover:shadow-[0_0_14px_rgba(199,154,43,0.55)] transition-shadow duration-200" aria-hidden="true">
                            <Icon size={14} strokeWidth={2} />
                          </span>
                          <span className="min-w-0" style={{ fontFamily: LANG_FONT[activeLang] }}>
                            <span className="block mega-title font-semibold tracking-wide text-white leading-snug">
                              {menuItem.title[activeLang] || menuItem.title.en}
                            </span>
                            <span className="mt-1 block mega-desc leading-relaxed text-[#f0ddd0]/80">
                              {menuItem.description[activeLang] || menuItem.description.en}
                            </span>
                          </span>
                        </Link>
                      )
                    })}
                  </div>

                  {/* Officials column */}
                  <div className="flex flex-col gap-4 px-5 py-5 bg-black/25 border-l border-gold/20">
                    <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-gold/70" style={{ fontFamily: LANG_FONT[activeLang] }}>
                      {(NAVBAR_UI[activeLang] || NAVBAR_UI.en).keyOfficials}
                    </p>

                    {FEATURED_OFFICIALS.map((official) => (
                      <Link
                        key={official.path}
                        to={official.path}
                        role="menuitem"
                        className="group flex items-center gap-4 p-4 rounded-2xl border border-white/10 hover:border-gold/50 hover:bg-white/10 transition-all duration-200 focus-visible:outline-none focus-visible:border-gold/50 focus-visible:bg-white/10"
                      >
                        <div className="official-avatar-wrap rounded-2xl flex-shrink-0 overflow-hidden border-2 border-gold/50 group-hover:border-gold transition-colors duration-200">
                          <OfficialAvatar photo={official.photo} name={official.name} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[11px] text-gold font-bold tracking-[0.14em] leading-none mb-2 uppercase" style={{ fontFamily: LANG_FONT[activeLang] }}>
                            {official.role[activeLang] || official.role.en}
                          </p>
                          <p className="official-name font-bold text-white leading-snug mb-2">
                            {official.name}
                          </p>
                          <p className="text-[13px] text-white/40 group-hover:text-gold transition-colors duration-200 font-medium" style={{ fontFamily: LANG_FONT[activeLang] }}>
                            {(NAVBAR_UI[activeLang] || NAVBAR_UI.en).readMore}
                          </p>
                        </div>
                      </Link>
                    ))}

                    <div className="mt-1 border-t border-white/10 pt-3">
                      <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-gold/70 mb-2" style={{ fontFamily: LANG_FONT[activeLang] }}>
                        {(NAVBAR_UI[activeLang] || NAVBAR_UI.en).planningTeam}
                      </p>
                      <Link
                        to="/about/deputy-directors"
                        role="menuitem"
                        className="group flex items-center gap-4 p-4 rounded-2xl border border-white/10 hover:border-gold/50 hover:bg-white/10 transition-all duration-200 focus-visible:outline-none focus-visible:border-gold/50 focus-visible:bg-white/10"
                      >
                        <div className="w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center border-2 border-gold/40 group-hover:border-gold bg-[rgba(199,154,43,0.08)] transition-colors duration-200" aria-hidden="true">
                          <Users size={22} className="text-gold" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[15px] font-bold text-white leading-snug mb-1" style={{ fontFamily: LANG_FONT[activeLang] }}>
                            {(NAVBAR_UI[activeLang] || NAVBAR_UI.en).deputyDirectors}
                          </p>
                          <p className="text-[12.5px] text-[#f0ddd0]/70 leading-snug mb-1.5" style={{ fontFamily: LANG_FONT[activeLang] }}>
                            {(NAVBAR_UI[activeLang] || NAVBAR_UI.en).deputyDirectorsSub}
                          </p>
                          <p className="text-[12.5px] text-white/40 group-hover:text-gold transition-colors duration-200 font-medium" style={{ fontFamily: LANG_FONT[activeLang] }}>
                            {(NAVBAR_UI[activeLang] || NAVBAR_UI.en).viewAll}
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ══════════════════════════════════════════════════════════════════
            MOBILE MENU
        ══════════════════════════════════════════════════════════════════ */}
        <div
          id="mobile-menu"
          className={`
            lg:hidden bg-white
            mobile-menu-container
            transition-[opacity,visibility] duration-300
            ${mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
          `}
          style={{ top: navbarHeight }}
          aria-hidden={!mobileOpen}
          aria-label="Mobile navigation"
        >
          <div className="mobile-menu-inner">
            <nav aria-label="Mobile navigation menu" className="border-t border-warm-neutral">
              <ul role="menubar">
                {navItems.map((item) => (
                  <MobileNavItem
                    key={item.id}
                    item={item}
                    lang={activeLang}
                    isActive={isActive}
                    onClose={() => setMobileOpen(false)}
                  />
                ))}
              </ul>
            </nav>

            {/* Language strip */}
            <div className="bg-ivory border-t-2 border-warm-neutral px-5 py-4" role="navigation" aria-label="Language selector">
              <div className="flex flex-wrap items-center gap-2">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLangChange(lang.code)}
                    aria-label={`Switch to ${lang.label}`}
                    aria-pressed={activeLang === lang.code}
                    className={`
                      text-[13px] px-5 py-2.5 rounded-lg transition-all duration-200
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold
                      ${activeLang === lang.code
                        ? 'bg-maroon text-white font-semibold shadow-sm'
                        : 'text-pro-gray border border-warm-neutral hover:border-maroon hover:text-maroon'}
                    `}
                    style={{ fontFamily: LANG_FONT[lang.code] }}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

      </header>
    </>
  )
}

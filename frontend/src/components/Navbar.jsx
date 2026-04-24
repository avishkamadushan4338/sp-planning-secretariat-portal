import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Building2,
  Users,
  Network,
  ClipboardList,
  BookOpen,
  GitBranch,
  UserCircle2,
  MapPin,
  Phone,
  Mail,
  Clock,
} from 'lucide-react'
import {
  FaBars,
  FaTimes,
  FaChevronDown,
} from 'react-icons/fa'
import './Navbar.css'

const SITE_LOGO_PATH = '/branding/logo.png'

const ABOUT_US_MENU = [
  {
    title: 'Planning Secretariat Overview',
    description: 'Vision, Mission, Mandate and Scope of the Planning Secretariat',
    path: '/about/secretariat-overview',
    icon: Building2,
  },
  {
    title: 'Organization Structure',
    description: 'Organizational setup of the Planning Secretariat',
    path: '/about/organization-structure',
    icon: Network,
  },
  {
    title: 'Functions & Duties',
    description: 'Key functions and responsibilities of the Secretariat',
    path: '/about/functions-duties',
    icon: ClipboardList,
  },
  {
    title: 'History',
    description: 'Journey and milestones of the Planning Secretariat',
    path: '/about/history',
    icon: BookOpen,
  },
  {
    title: 'Affiliated Divisions',
    description: 'Departments, Boards, Councils and Statutory Bodies',
    path: '/about/affiliated-divisions',
    icon: GitBranch,
  },
]

// Update name and photo path for each official below
const FEATURED_OFFICIALS = [
  {
    role: 'Deputy Secretary – Planning',
    name: 'Mr. M.K.G.S.P.K. Jayasekara',
    path: '/about/deputy-secretary',
    photo: '/staff/deputy-secretary.jpg',
  },
  {
    role: 'Director – Planning',
    name: 'Mr. [Director Name]',
    path: '/about/director-planning',
    photo: '/staff/director-planning.jpg',
  },
]

const chunkIntoColumns = (items, chunkSize = 3) => {
  const chunks = []
  for (let index = 0; index < items.length; index += chunkSize) {
    chunks.push(items.slice(index, index + chunkSize))
  }
  return chunks
}

const CONTACT_DETAILS = {
  address: '153B, S.H. Dahanayaka Mawatha, Galle, Sri Lanka',
  phone:   '+94 91 222 5878',
  email:   'info@splanning.gov.lk',
  hours:   'Mon – Fri: 8:30 AM – 4:30 PM',
}

// ─── Translations ────────────────────────────────────────────────────────────

const NAV_TRANSLATIONS = {
  en: [
    { id: 'home',  label: 'HOME',      path: '/home' },
    { id: 'about', label: 'ABOUT US',  path: '/about', megaMenu: true, dropdown: ABOUT_US_MENU },
    { id: 'divs',  label: 'DIVISIONS',    path: '/departments' },
    { id: 'svcs',  label: 'SERVICES',     path: '/services' },
    { id: 'media', label: 'MEDIA CENTER', path: '/news' },
    { id: 'docs',  label: 'DOWNLOADS',    path: '/documents' },
    {
      id: 'contact', label: 'CONTACT US', path: '/contact',
      contactPanel: true,
      dropdown: [
        { label: 'Find Our Office',       path: '/contact#find-office' },
        { label: 'Telephone Directory',   path: '/contact#contact-info' },
        { label: 'Complaint & Feedback',  path: '/contact#feedback' },
      ],
    },
  ],
  si: [
    { id: 'home',  label: 'මුල් පිටුව',           path: '/home' },
    { id: 'about', label: 'අප ගැන',               path: '/about', megaMenu: true, dropdown: ABOUT_US_MENU },
    { id: 'divs',  label: 'අංශ',                   path: '/departments' },
    { id: 'svcs',  label: 'සේවාවන්',              path: '/services' },
    { id: 'media', label: 'මාධ්‍ය මධ්‍යස්ථානය', path: '/news' },
    { id: 'docs',  label: 'බාගත කිරීම්',           path: '/documents' },
    {
      id: 'contact', label: 'අප අමතන්න',           path: '/contact',
      contactPanel: true,
      dropdown: [
        { label: 'කාර්යාලය සොයා ගන්න',      path: '/contact#find-office' },
        { label: 'දූරකථන නාමාවලිය',          path: '/contact#contact-info' },
        { label: 'පැමිණිලි සහ ප්‍රතිපෝෂණ', path: '/contact#feedback' },
      ],
    },
  ],
  ta: [
    { id: 'home',  label: 'முகப்பு',                 path: '/home' },
    { id: 'about', label: 'எங்களைப் பற்றி',          path: '/about', megaMenu: true, dropdown: ABOUT_US_MENU },
    { id: 'divs',  label: 'பிரிவுகள்',               path: '/departments' },
    { id: 'svcs',  label: 'சேவைகள்',                 path: '/services' },
    { id: 'media', label: 'ஊடக மையம்',              path: '/news' },
    { id: 'docs',  label: 'பதிவிறக்கங்கள்',          path: '/documents' },
    {
      id: 'contact', label: 'தொடர்பு கொள்ளுங்கள்',  path: '/contact',
      contactPanel: true,
      dropdown: [
        { label: 'எங்கள் அலுவலகத்தைக் கண்டறியுங்கள்', path: '/contact#find-office' },
        { label: 'தொலைபேசி அடைவு',                      path: '/contact#contact-info' },
        { label: 'புகார் & கருத்து',                    path: '/contact#feedback' },
      ],
    },
  ],
}

const LANG_FONT = {
  en: 'inherit',
  si: "'Noto Sans Sinhala', sans-serif",
  ta: "'Noto Sans Tamil', sans-serif",
}

const LANGUAGES = [
  { code: 'si', label: 'සිංහල' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'en', label: 'English' },
]

// ─── Official Avatar ────────────────────────────────────────────────────────

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

// ─── Government Emblem ───────────────────────────────────────────────────────

function GovernmentEmblem() {
  return (
    <div className="navbar-emblem flex-shrink-0 w-[72px] h-[72px] rounded-full border-[2.5px] border-gold bg-white flex items-center justify-center relative overflow-hidden">
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
  const [imageError, setImageError] = useState(false)

  if (!imageError) {
    return (
      <img
        src={SITE_LOGO_PATH}
        alt="Southern Province Planning Secretariat logo"
        className="navbar-logo-image"
        onError={() => setImageError(true)}
      />
    )
  }

  return <GovernmentEmblem />
}

// ─── Desktop Nav Item ────────────────────────────────────────────────────────

function DesktopNavItem({ item, lang, isActive, activeDropdown, onEnter, onLeave, onToggle }) {
  const dropOpen = activeDropdown === item.id
  const fontFamily = LANG_FONT[lang]
  const isDisabled = item.disabled === true
  const hasDropdown = Array.isArray(item.dropdown) && item.dropdown.length > 0
  const isAboutMega = item.megaMenu === true
  const active = (isAboutMega ? isActive('/about') : isActive(item.path)) || dropOpen

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
          onClick={(e) => e.preventDefault()}
          className="
            nav-item-bold relative flex items-center gap-1.5 px-3 xl:px-[18px]
            font-sans text-[12px] font-extrabold tracking-[0.08em] uppercase
            text-prem-black/70 cursor-default whitespace-nowrap
          "
          style={{ fontFamily }}
        >
          <span>{item.label}</span>
        </button>
      ) : isAboutMega ? (
        <button
          type="button"
          role="menuitem"
          aria-haspopup="true"
          aria-expanded={dropOpen}
          onClick={() => onToggle(item.id)}
          className={`
            nav-item-bold relative flex items-center gap-1.5 px-3 xl:px-[18px]
            font-sans text-[12px] font-extrabold tracking-[0.08em] uppercase
            transition-all duration-200 group whitespace-nowrap
            ${dropOpen
              ? 'bg-maroon text-white rounded-t-md'
              : active
                ? 'text-maroon'
                : 'text-prem-black hover:text-maroon'}
          `}
          style={{ fontFamily }}
        >
          <span>{item.label}</span>
          <FaChevronDown
            className={`text-[7px] mt-px transition-transform duration-200 ${dropOpen ? 'rotate-180' : ''}`}
          />
          <span
            className={`
              absolute bottom-0 left-0 right-0 h-[3px] bg-gold
              transition-all duration-200 origin-center
              ${active
                ? 'scale-x-100 opacity-100'
                : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'}
            `}
          />
        </button>
      ) : (
        <Link
          to={item.path}
          role="menuitem"
          aria-haspopup={hasDropdown}
          aria-expanded={dropOpen}
          className={`
            nav-item-bold relative flex items-center gap-1.5 px-3 xl:px-[18px]
            font-sans text-[12px] font-extrabold tracking-[0.08em] uppercase
            transition-colors duration-200 group whitespace-nowrap
            ${active ? 'text-maroon' : 'text-prem-black hover:text-maroon'}
          `}
          style={{ fontFamily }}
        >
          <span>{item.label}</span>
          {item.dropdown && (
            <FaChevronDown
              className={`text-[7px] mt-px transition-transform duration-200 ${dropOpen ? 'rotate-180' : ''}`}
            />
          )}
          {/* Active / hover underline bar */}
          <span
            className={`
              absolute bottom-0 left-0 right-0 h-[3px] bg-gold
              transition-all duration-200 origin-center
              ${active
                ? 'scale-x-100 opacity-100'
                : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'}
            `}
          />
        </Link>
      )}

      {/* Plain dropdown panel */}
      {hasDropdown && !isAboutMega && !item.contactPanel && dropOpen && (
        <div
          className="absolute top-full left-0 min-w-[260px] bg-white shadow-dropdown border-t-[3px] border-gold z-50"
          role="menu"
          onMouseEnter={() => onEnter(item.id)}
          onMouseLeave={onLeave}
        >
          {item.dropdown.map((sub) => (
            <Link
              key={sub.path}
              to={sub.path}
              role="menuitem"
              className="
                flex items-center gap-3 px-5 py-[12px]
                font-sans text-[11px] font-bold tracking-[0.06em] uppercase text-prem-black
                hover:text-maroon hover:bg-ivory hover:pl-6
                border-b border-warm-neutral last:border-0
                transition-all duration-150
              "
              style={{ fontFamily }}
            >
              <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0 opacity-70" />
              {sub.label}
            </Link>
          ))}
        </div>
      )}

      {/* Rich Contact Us panel */}
      {item.contactPanel && dropOpen && (
        <div
          className="absolute top-full right-0 w-[540px] bg-gradient-to-b from-maroon to-deep-maroon shadow-[0_20px_40px_rgba(0,0,0,0.28)] border-t-[3px] border-gold rounded-b-2xl z-50 overflow-hidden"
          role="menu"
          onMouseEnter={() => onEnter(item.id)}
          onMouseLeave={onLeave}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(199,154,43,0.10),transparent_50%)] pointer-events-none" />
          <div className="relative grid grid-cols-[1fr_auto]">

            {/* Left — contact details */}
            <div className="px-7 py-6 border-r border-white/10">
              <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-gold/70 mb-4">
                Planning Secretariat
              </p>
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-gold/60 text-gold mt-0.5">
                    <MapPin size={14} strokeWidth={2} />
                  </span>
                  <span className="text-[13px] text-white/85 leading-snug">
                    {CONTACT_DETAILS.address}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-gold/60 text-gold">
                    <Phone size={14} strokeWidth={2} />
                  </span>
                  <a
                    href={`tel:${CONTACT_DETAILS.phone.replace(/\s/g, '')}`}
                    className="text-[13px] text-white/85 hover:text-gold transition-colors duration-150"
                  >
                    {CONTACT_DETAILS.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-gold/60 text-gold">
                    <Mail size={14} strokeWidth={2} />
                  </span>
                  <a
                    href={`mailto:${CONTACT_DETAILS.email}`}
                    className="text-[13px] text-white/85 hover:text-gold transition-colors duration-150"
                  >
                    {CONTACT_DETAILS.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-gold/60 text-gold">
                    <Clock size={14} strokeWidth={2} />
                  </span>
                  <span className="text-[13px] text-white/85">
                    {CONTACT_DETAILS.hours}
                  </span>
                </div>
              </div>
            </div>

            {/* Right — navigation links */}
            <div className="flex flex-col justify-center px-5 py-6 gap-1 min-w-[195px]">
              <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-gold/70 mb-3">
                Quick Links
              </p>
              {item.dropdown.map((sub) => (
                <Link
                  key={sub.path}
                  to={sub.path}
                  role="menuitem"
                  className="
                    group flex items-center gap-2.5 px-3 py-2.5 rounded-lg
                    text-[12px] font-semibold tracking-wide text-white/80
                    hover:bg-white/10 hover:text-white
                    transition-all duration-150
                  "
                  style={{ fontFamily }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
                  {sub.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </li>
  )
}

// ─── Mobile Nav Item ─────────────────────────────────────────────────────────

function MobileNavItem({ item, lang, isActive }) {
  const [open, setOpen] = useState(false)
  const hasDropdown = Array.isArray(item.dropdown) && item.dropdown.length > 0
  const isAboutMega = item.megaMenu === true
  const active = (isAboutMega ? isActive('/about') : isActive(item.path)) || open
  const fontFamily = LANG_FONT[lang]
  const isDisabled = item.disabled === true

  return (
    <li className="border-b border-warm-neutral last:border-0">
      <div className="flex items-center">
        {isDisabled ? (
          <button
            type="button"
            aria-disabled="true"
            onClick={(e) => e.preventDefault()}
            className="
              flex-1 px-5 py-4 text-left
              font-sans text-[12.5px] font-extrabold tracking-[0.08em] uppercase
              text-prem-black/70 cursor-default
            "
            style={{ fontFamily }}
          >
            {item.label}
          </button>
        ) : hasDropdown ? (
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className={`
              flex-1 px-5 py-4 text-left
              font-sans text-[12.5px] font-extrabold tracking-[0.08em] uppercase
              transition-colors duration-200
              ${active ? 'bg-maroon text-white' : 'text-prem-black'}
            `}
            style={{ fontFamily }}
            aria-expanded={open}
            aria-haspopup="true"
            aria-label={`Toggle ${item.id} submenu`}
          >
            {item.label}
          </button>
        ) : (
          <Link
            to={item.path}
            className={`
              flex-1 px-5 py-4
              font-sans text-[12.5px] font-extrabold tracking-[0.08em] uppercase
              ${active ? 'text-maroon' : 'text-prem-black'}
            `}
            style={{ fontFamily }}
          >
            {item.label}
          </Link>
        )}

        {hasDropdown && (
          <button
            onClick={() => setOpen((v) => !v)}
            className={`px-5 py-4 transition-colors ${active ? 'bg-maroon text-white' : 'text-pro-gray hover:text-maroon'}`}
            aria-label={`Toggle ${item.id} submenu`}
          >
            <FaChevronDown
              className={`text-[10px] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            />
          </button>
        )}
      </div>

      <AnimatePresence initial={false}>
        {hasDropdown && open && (
          <motion.div
            className="bg-ivory border-t border-warm-neutral overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            {item.dropdown.map((sub) => {
              const Icon = sub.icon
              return (
                <Link
                  key={sub.path}
                  to={sub.path}
                  className="
                    flex items-start gap-3 px-6 py-3.5
                    font-sans text-[12px] font-medium tracking-wide text-pro-gray
                    hover:text-maroon hover:bg-warm-neutral
                    border-b border-warm-neutral last:border-0
                    transition-colors duration-150
                  "
                  style={{ fontFamily }}
                >
                  {Icon
                    ? <Icon size={14} className="text-gold mt-0.5 flex-shrink-0" />
                    : <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0 mt-[7px]" />}
                  <span className="leading-snug">
                    <span className="block text-prem-black font-semibold">{sub.title || sub.label}</span>
                    {sub.description && <span className="block text-[11px] text-pro-gray/90">{sub.description}</span>}
                  </span>
                </Link>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

// ─── Main Navbar ─────────────────────────────────────────────────────────────

export default function Navbar() {
  const [mobileOpen, setMobileOpen]         = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [scrolled, setScrolled]             = useState(false)
  const [activeLang, setActiveLang]         = useState(
    () => localStorage.getItem('lang') || 'en'
  )

  const location     = useLocation()
  const headerRef    = useRef(null)
  const dropTimerRef = useRef(null)

  const navItems = NAV_TRANSLATIONS[activeLang] || NAV_TRANSLATIONS.en
  const activeMegaItem = navItems.find((item) => item.id === activeDropdown && item.megaMenu)
  const megaColumns = activeMegaItem ? [activeMegaItem.dropdown] : []

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setActiveDropdown(null)
  }, [location.pathname, location.hash])

  useEffect(() => {
    const onClickOutside = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setActiveDropdown(null)
        setMobileOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleLangChange = (code) => {
    localStorage.setItem('lang', code)
    setActiveLang(code)
    window.dispatchEvent(new CustomEvent('langChange', { detail: code }))
  }

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)

  const handleDropEnter = (id) => {
    clearTimeout(dropTimerRef.current)
    setActiveDropdown(id)
  }
  const handleDropLeave = () => {
    dropTimerRef.current = setTimeout(() => setActiveDropdown(null), 180)
  }
  const handleDropToggle = (id) => {
    clearTimeout(dropTimerRef.current)
    setActiveDropdown((current) => (current === id ? null : id))
  }

  return (
    <>
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-shadow duration-300 ${
        scrolled ? 'shadow-nav' : ''
      }`}
    >
      {/* ══════════════════════════════════════════════════════════════════════
          MAIN NAVIGATION BAR
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="bg-white border-b border-warm-neutral relative">
        {/* Language ribbon — top-right corner, desktop only */}
        <div
          className="hidden lg:flex absolute top-0 right-0 z-10 bg-maroon items-center px-3 py-[5px] select-none"
          style={{ borderBottomLeftRadius: '10px' }}
        >
          {LANGUAGES.map((lang, idx) => (
            <span key={lang.code} className="flex items-center">
              <button
                onClick={() => handleLangChange(lang.code)}
                className={`
                  px-2 py-0.5 text-[10px] font-medium tracking-wide
                  transition-all duration-200
                  ${activeLang === lang.code ? 'text-gold font-semibold' : 'text-white/75 hover:text-gold'}
                `}
                style={{
                  fontFamily: LANG_FONT[lang.code],
                }}
              >
                {lang.label}
              </button>
              {idx < LANGUAGES.length - 1 && (
                <span className="text-gold opacity-30 text-[9px] select-none">│</span>
              )}
            </span>
          ))}
        </div>

        <div className="w-full pl-6 pr-4 lg:pr-8">
          <div className="flex items-center justify-between h-[76px]">

            {/* ── Logo — flush left corner ── */}
            <Link
              to="/"
              className="flex items-center flex-shrink-0 group outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-none"
              aria-label="Southern Province Planning Secretariat — Home"
            >
              <SiteLogo />
            </Link>

            {/* ── Desktop Navigation ── */}
            <nav
              className="hidden lg:flex items-stretch self-stretch ml-32 mr-auto"
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

            {/* ── Hamburger (mobile / tablet) ── */}
            <button
              className="
                lg:hidden flex items-center justify-center w-10 h-10 rounded
                text-maroon hover:bg-ivory border border-transparent
                hover:border-warm-neutral transition-all duration-200
              "
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen
                ? <FaTimes className="text-[17px]" />
                : <FaBars  className="text-[17px]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Premium ABOUT US mega dropdown */}
      <AnimatePresence>
        {activeMegaItem && (
          <motion.div
            className="hidden lg:block absolute top-full left-[16%] z-[60] w-[74%] max-w-[1160px] min-w-[900px]"
            onMouseEnter={() => handleDropEnter(activeMegaItem.id)}
            onMouseLeave={handleDropLeave}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative overflow-hidden border-t border-gold rounded-b-2xl shadow-[0_24px_42px_rgba(0,0,0,0.3)] bg-gradient-to-b from-maroon to-deep-maroon">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(199,154,43,0.12),transparent_42%),radial-gradient(circle_at_80%_90%,rgba(255,255,255,0.05),transparent_36%)] pointer-events-none" />

              <div className="relative grid grid-cols-[1fr_440px]">
                {/* Regular menu items — single column */}
                <div className="border-r border-white/10">
                  {activeMegaItem?.dropdown.map((menuItem, rowIndex) => {
                    const Icon = menuItem.icon
                    return (
                      <Link
                        key={menuItem.path}
                        to={menuItem.path}
                        className={`group flex items-center gap-5 px-8 py-5 transition-colors duration-200 hover:bg-[#7a1a30]/65 ${rowIndex < activeMegaItem.dropdown.length - 1 ? 'border-b border-white/10' : ''}`}
                      >
                        <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-gold/80 text-gold group-hover:shadow-[0_0_18px_rgba(199,154,43,0.55)] transition-shadow duration-200">
                          <Icon size={18} strokeWidth={2} />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[18px] font-semibold tracking-wide text-white leading-snug">
                            {menuItem.title}
                          </span>
                          <span className="mt-1 block text-[14.5px] leading-relaxed text-[#f0ddd0]/80 whitespace-nowrap">
                            {menuItem.description}
                          </span>
                        </span>
                      </Link>
                    )
                  })}
                </div>

                {/* Featured officials column */}
                <div className="flex flex-col gap-4 px-5 py-5 bg-black/25 border-l border-gold/20">
                  {/* Key Officials label */}
                  <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-gold/70">
                    Key Officials
                  </p>

                  {/* Individual official cards */}
                  {FEATURED_OFFICIALS.map((official) => (
                    <Link
                      key={official.path}
                      to={official.path}
                      className="group flex items-center gap-5 p-5 rounded-2xl border border-white/10 hover:border-gold/50 hover:bg-white/10 transition-all duration-200"
                    >
                      <div className="w-[96px] h-[96px] rounded-2xl flex-shrink-0 overflow-hidden border-2 border-gold/50 group-hover:border-gold transition-colors duration-200">
                        <OfficialAvatar photo={official.photo} name={official.name} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11.5px] text-gold font-bold tracking-[0.15em] leading-none mb-2.5 uppercase">
                          {official.role}
                        </p>
                        <p className="text-[18px] font-bold text-white leading-snug mb-2">
                          {official.name}
                        </p>
                        <p className="text-[13px] text-white/40 group-hover:text-gold transition-colors duration-200 font-medium">
                          Read More →
                        </p>
                      </div>
                    </Link>
                  ))}

                  {/* Deputy Directors — group link */}
                  <div className="mt-1 border-t border-white/10 pt-3">
                    <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-gold/70 mb-2">
                      Planning Team
                    </p>
                    <Link
                      to="/about/deputy-directors"
                      className="group flex items-center gap-4 p-4 rounded-2xl border border-white/10 hover:border-gold/50 hover:bg-white/10 transition-all duration-200"
                    >
                      <div className="w-[56px] h-[56px] rounded-xl flex-shrink-0 flex items-center justify-center border-2 border-gold/40 group-hover:border-gold bg-[rgba(199,154,43,0.08)] transition-colors duration-200">
                        <Users size={24} className="text-gold" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[16px] font-bold text-white leading-snug mb-1">
                          Deputy Directors
                        </p>
                        <p className="text-[13px] text-[#f0ddd0]/70 leading-snug mb-1.5">
                          5 Deputy Directors – Planning
                        </p>
                        <p className="text-[13px] text-white/40 group-hover:text-gold transition-colors duration-200 font-medium">
                          View All →
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

      {/* ══════════════════════════════════════════════════════════════════════
          MOBILE MENU
      ══════════════════════════════════════════════════════════════════════ */}
      <div
        id="mobile-menu"
        className={`
          lg:hidden bg-white overflow-hidden
          transition-all duration-300 ease-in-out
          ${mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}
        `}
        aria-hidden={!mobileOpen}
      >
        <nav aria-label="Mobile navigation" className="border-t border-warm-neutral">
          <ul role="menubar">
            {navItems.map((item) => (
              <MobileNavItem
                key={item.id}
                item={item}
                lang={activeLang}
                isActive={isActive}
              />
            ))}
          </ul>
        </nav>

        {/* Language strip — mobile */}
        <div className="bg-ivory border-t-2 border-warm-neutral px-5 py-3">
          <div className="flex items-center gap-2">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLangChange(lang.code)}
                className={`
                  text-[11px] px-3 py-1.5 rounded transition-all duration-200
                  ${activeLang === lang.code
                    ? 'bg-maroon text-white font-semibold'
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
    </header>

    </>
  )
}

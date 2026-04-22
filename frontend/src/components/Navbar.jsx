import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  FaBars,
  FaTimes,
  FaChevronDown,
} from 'react-icons/fa'
import './Navbar.css'

const SITE_LOGO_PATH = '/branding/logo.png'

// ─── Translations ────────────────────────────────────────────────────────────

const NAV_TRANSLATIONS = {
  en: [
    { id: 'home',    label: 'HOME',         path: '/home' },
    { id: 'about',   label: 'ABOUT US',     path: '/about' },
    { id: 'divs',    label: 'DIVISIONS',    path: '/departments' },
    { id: 'svcs',    label: 'SERVICES',     path: '/services' },
    { id: 'media',   label: 'MEDIA CENTER', path: '/news' },
    { id: 'docs',    label: 'DOWNLOADS',    path: '/documents' },
    {
      id: 'contact', label: 'CONTACT US',   path: '/contact',
      dropdown: [
        { label: 'Contact Information',   path: '/contact' },
        { label: 'Complaint & Feedback',  path: '/contact/feedback' },
        { label: 'Find Our Office',       path: '/contact/location' },
      ],
    },
  ],
  si: [
    { id: 'home',    label: 'මුල් පිටුව',            path: '/home' },
    { id: 'about',   label: 'අප ගැන',                path: '/about' },
    { id: 'divs',    label: 'අංශ',                    path: '/departments' },
    { id: 'svcs',    label: 'සේවාවන්',               path: '/services' },
    { id: 'media',   label: 'මාධ්‍ය මධ්‍යස්ථානය',  path: '/news' },
    { id: 'docs',    label: 'බාගත කිරීම්',            path: '/documents' },
    {
      id: 'contact', label: 'අප අමතන්න',              path: '/contact',
      dropdown: [
        { label: 'සම්බන්ධතා තොරතුරු',        path: '/contact' },
        { label: 'පැමිණිලි සහ ප්‍රතිපෝෂණ',  path: '/contact/feedback' },
        { label: 'කාර්යාලය සොයා ගන්න',       path: '/contact/location' },
      ],
    },
  ],
  ta: [
    { id: 'home',    label: 'முகப்பு',                    path: '/home' },
    { id: 'about',   label: 'எங்களைப் பற்றி',            path: '/about' },
    { id: 'divs',    label: 'பிரிவுகள்',                 path: '/departments' },
    { id: 'svcs',    label: 'சேவைகள்',                   path: '/services' },
    { id: 'media',   label: 'ஊடக மையம்',                path: '/news' },
    { id: 'docs',    label: 'பதிவிறக்கங்கள்',            path: '/documents' },
    {
      id: 'contact', label: 'தொடர்பு கொள்ளுங்கள்',      path: '/contact',
      dropdown: [
        { label: 'தொடர்பு தகவல்',                         path: '/contact' },
        { label: 'புகார் & கருத்து',                      path: '/contact/feedback' },
        { label: 'எங்கள் அலுவலகத்தைக் கண்டறியுங்கள்',   path: '/contact/location' },
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

function DesktopNavItem({ item, lang, isActive, activeDropdown, onEnter, onLeave }) {
  const active   = isActive(item.path)
  const dropOpen = activeDropdown === item.id
  const fontFamily = LANG_FONT[lang]

  return (
    <li
      className="relative h-full flex items-stretch"
      onMouseEnter={() => item.dropdown && onEnter(item.id)}
      onMouseLeave={() => item.dropdown && onLeave()}
      role="none"
    >
      <Link
        to={item.path}
        role="menuitem"
        aria-haspopup={!!item.dropdown}
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

      {/* Dropdown panel */}
      {item.dropdown && dropOpen && (
        <div
          className="absolute top-full left-0 min-w-[240px] bg-white shadow-dropdown border-t-[3px] border-gold z-50"
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
    </li>
  )
}

// ─── Mobile Nav Item ─────────────────────────────────────────────────────────

function MobileNavItem({ item, lang, isActive }) {
  const [open, setOpen] = useState(false)
  const active = isActive(item.path)
  const fontFamily = LANG_FONT[lang]

  return (
    <li className="border-b border-warm-neutral last:border-0">
      <div className="flex items-center">
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

        {item.dropdown && (
          <button
            onClick={() => setOpen((v) => !v)}
            className="px-5 py-4 text-pro-gray hover:text-maroon transition-colors"
            aria-label={`Toggle ${item.id} submenu`}
          >
            <FaChevronDown
              className={`text-[10px] transition-transform duration-200 ${open ? 'rotate-180 text-maroon' : ''}`}
            />
          </button>
        )}
      </div>

      {item.dropdown && open && (
        <div className="bg-ivory border-t border-warm-neutral">
          {item.dropdown.map((sub) => (
            <Link
              key={sub.path}
              to={sub.path}
              className="
                flex items-center gap-3 px-8 py-3
                font-sans text-[12px] font-medium tracking-wide text-pro-gray
                hover:text-maroon hover:bg-warm-neutral
                border-b border-warm-neutral last:border-0
                transition-colors duration-150
              "
              style={{ fontFamily }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
              {sub.label}
            </Link>
          ))}
        </div>
      )}
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setActiveDropdown(null)
  }, [location.pathname])

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

  return (
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
  )
}

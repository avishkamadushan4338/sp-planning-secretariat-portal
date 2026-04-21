import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  FaPhone,
  FaEnvelope,
  FaSitemap,
  FaBars,
  FaTimes,
  FaChevronDown,
} from 'react-icons/fa'
import './Navbar.css'

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { label: 'HOME',         path: '/' },
  { label: 'ABOUT US',     path: '/about' },
  { label: 'DIVISIONS',    path: '/departments' },
  { label: 'SERVICES',     path: '/services' },
  { label: 'MEDIA CENTER', path: '/news' },
  { label: 'DOWNLOADS',    path: '/documents' },
  {
    label: 'CONTACT US',
    path: '/contact',
    dropdown: [
      { label: 'Contact Information', path: '/contact' },
      { label: 'Complaint & Feedback', path: '/contact/feedback' },
      { label: 'Find Our Office',      path: '/contact/location' },
    ],
  },
]

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
        {/* Cinzel for the Latin crest label */}
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

// ─── Desktop Nav Item ────────────────────────────────────────────────────────

function DesktopNavItem({ item, isActive, activeDropdown, onEnter, onLeave }) {
  const active  = isActive(item.path)
  const dropOpen = activeDropdown === item.label

  return (
    <li
      className="relative h-full flex items-stretch"
      onMouseEnter={() => item.dropdown && onEnter(item.label)}
      onMouseLeave={() => item.dropdown && onLeave()}
      role="none"
    >
      <Link
        to={item.path}
        role="menuitem"
        aria-haspopup={!!item.dropdown}
        aria-expanded={dropOpen}
        className={`
          relative flex items-center gap-1.5 px-3 xl:px-[18px]
          font-ui text-[10.5px] font-semibold tracking-[0.14em] uppercase
          transition-colors duration-200 group whitespace-nowrap
          ${active ? 'text-maroon' : 'text-prem-black hover:text-maroon'}
        `}
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
          onMouseEnter={() => onEnter(item.label)}
          onMouseLeave={onLeave}
        >
          {item.dropdown.map((sub) => (
            <Link
              key={sub.label}
              to={sub.path}
              role="menuitem"
              className="
                flex items-center gap-3 px-5 py-[12px]
                font-sans text-[12px] font-medium tracking-wide text-prem-black
                hover:text-maroon hover:bg-ivory hover:pl-6
                border-b border-warm-neutral last:border-0
                transition-all duration-150
              "
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

function MobileNavItem({ item, isActive }) {
  const [open, setOpen] = useState(false)
  const active = isActive(item.path)

  return (
    <li className="border-b border-warm-neutral last:border-0">
      <div className="flex items-center">
        <Link
          to={item.path}
          className={`
            flex-1 px-5 py-4
            font-ui text-[11px] font-semibold tracking-[0.13em] uppercase
            ${active ? 'text-maroon' : 'text-prem-black'}
          `}
        >
          {item.label}
        </Link>

        {item.dropdown && (
          <button
            onClick={() => setOpen((v) => !v)}
            className="px-5 py-4 text-pro-gray hover:text-maroon transition-colors"
            aria-label={`Toggle ${item.label} submenu`}
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
              key={sub.label}
              to={sub.path}
              className="
                flex items-center gap-3 px-8 py-3
                font-sans text-[12px] font-medium tracking-wide text-pro-gray
                hover:text-maroon hover:bg-warm-neutral
                border-b border-warm-neutral last:border-0
                transition-colors duration-150
              "
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
  const [activeLang, setActiveLang]         = useState('en')

  const location     = useLocation()
  const headerRef    = useRef(null)
  const dropTimerRef = useRef(null)

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

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)

  const handleDropEnter = (label) => {
    clearTimeout(dropTimerRef.current)
    setActiveDropdown(label)
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
          TOP UTILITY BAR  —  font-ui (Inter)
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="bg-maroon text-white select-none">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 h-[38px] flex items-center justify-between">

          {/* Left — contact links */}
          <div className="hidden sm:flex items-center gap-0">
            <a
              href="tel:+94912234503"
              className="flex items-center gap-1.5 px-3 py-1 opacity-85 hover:opacity-100 hover:text-gold transition-colors duration-200 group"
            >
              <FaPhone className="text-gold text-[9px] group-hover:scale-110 transition-transform flex-shrink-0" />
              {/* DM Mono for the phone number — tabular figures */}
              <span className="font-mono text-[10.5px] tracking-wide">+94 91 223 4503</span>
            </a>

            <span className="text-gold opacity-30 select-none">│</span>

            <a
              href="mailto:info@splanning.gov.lk"
              className="flex items-center gap-1.5 px-3 py-1 opacity-85 hover:opacity-100 hover:text-gold transition-colors duration-200 group"
            >
              <FaEnvelope className="text-gold text-[9px] group-hover:scale-110 transition-transform flex-shrink-0" />
              <span className="font-ui text-[10.5px] tracking-wide">info@splanning.gov.lk</span>
            </a>

            <span className="text-gold opacity-30 select-none">│</span>

            <Link
              to="/sitemap"
              className="flex items-center gap-1.5 px-3 py-1 opacity-85 hover:opacity-100 hover:text-gold transition-colors duration-200 group"
            >
              <FaSitemap className="text-gold text-[9px] group-hover:scale-110 transition-transform flex-shrink-0" />
              <span className="font-ui text-[10.5px] tracking-wide">Site Map</span>
            </Link>
          </div>

          {/* Right — language switcher */}
          <div className="flex items-center ml-auto sm:ml-0">
            {LANGUAGES.map((lang, idx) => (
              <span key={lang.code} className="flex items-center">
                <button
                  onClick={() => setActiveLang(lang.code)}
                  className={`
                    px-2.5 py-1 font-ui text-[10.5px] font-medium tracking-wide
                    transition-all duration-200 rounded-sm
                    ${activeLang === lang.code
                      ? 'text-gold font-semibold'
                      : 'text-white/75 hover:text-gold'}
                  `}
                >
                  {lang.label}
                </button>
                {idx < LANGUAGES.length - 1 && (
                  <span className="text-gold opacity-25 text-[10px] select-none">│</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          MAIN NAVIGATION BAR
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="bg-white border-b border-warm-neutral">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-[80px]">

            {/* ── Logo & Institution Name ── */}
            <Link
              to="/"
              className="flex items-center gap-4 flex-shrink-0 group outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
              aria-label="Southern Province Planning Secretariat — Home"
            >
              <GovernmentEmblem />

              <div className="flex flex-col justify-center leading-none gap-[3px]">
                {/* Native script labels — system fonts render these best */}
                <span className="text-[10px] text-maroon font-medium tracking-wide leading-snug">
                  දකුණු පළාත් සැලසුම් ලේකම් කාර්යාලය
                </span>
                <span className="text-[9.5px] text-pro-gray tracking-wide leading-snug">
                  தென் மாகாண திட்டமிடல் செயலகம்
                </span>

                {/* Cinzel for the authoritative English title */}
                <span className="font-display text-[11px] font-bold text-maroon tracking-[0.12em] uppercase leading-snug">
                  Southern Province Planning Secretariat
                </span>
              </div>
            </Link>

            {/* ── Desktop Navigation — font-ui (Inter) ── */}
            <nav
              className="hidden lg:flex items-stretch self-stretch ml-6"
              aria-label="Main navigation"
            >
              <ul className="flex items-stretch h-full" role="menubar">
                {NAV_ITEMS.map((item) => (
                  <DesktopNavItem
                    key={item.label}
                    item={item}
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
            {NAV_ITEMS.map((item) => (
              <MobileNavItem key={item.label} item={item} isActive={isActive} />
            ))}
          </ul>
        </nav>

        {/* Contact + language strip */}
        <div className="bg-ivory border-t-2 border-warm-neutral px-5 py-4 space-y-3">
          <div className="flex flex-col gap-2">
            <a
              href="tel:+94912234503"
              className="flex items-center gap-2.5 hover:text-maroon transition-colors"
            >
              <FaPhone className="text-gold text-[11px] flex-shrink-0" />
              {/* DM Mono for phone — tabular figures */}
              <span className="font-mono text-[12px] text-pro-gray tracking-wide">+94 91 223 4503</span>
            </a>
            <a
              href="mailto:info@splanning.gov.lk"
              className="flex items-center gap-2.5 hover:text-maroon transition-colors"
            >
              <FaEnvelope className="text-gold text-[11px] flex-shrink-0" />
              <span className="font-ui text-[12px] text-pro-gray tracking-wide">info@splanning.gov.lk</span>
            </a>
          </div>

          <div className="flex items-center gap-2 pt-1">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setActiveLang(lang.code)}
                className={`
                  font-ui text-[11px] px-3 py-1.5 rounded transition-all duration-200
                  ${activeLang === lang.code
                    ? 'bg-maroon text-white font-semibold'
                    : 'text-pro-gray border border-warm-neutral hover:border-maroon hover:text-maroon'}
                `}
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

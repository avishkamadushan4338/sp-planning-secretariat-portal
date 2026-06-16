/* ─────────────────────────────────────────────────────────────────────────────
   About.jsx — Southern Province Planning Secretariat
   Complete About section: Overview, Topic pages, Official profile pages.
   Light theme · Futuristic 2050 government UI
───────────────────────────────────────────────────────────────────────────── */
import { useState, useEffect, useMemo, memo, useCallback } from 'react'
import { Link, useLocation, useParams, Route, Routes, Navigate } from 'react-router-dom'
import { SeoHead } from '@/shared/seo'
import { usePageHold } from '@/shared/hooks/usePageHold'
import ComingSoon from '@/shared/components/ComingSoon'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiChevronRight, FiChevronDown, FiChevronLeft,
  FiUsers, FiUser, FiGrid,
  FiBook, FiClock, FiLayers, FiShield,
  FiBriefcase, FiMail, FiPhone, FiMapPin,
  FiStar, FiAward,
  FiCheckCircle, FiTarget, FiClipboard, FiTrendingUp,
  FiFileText, FiBarChart2, FiDatabase, FiSearch,
  FiSend, FiThumbsUp, FiMap, FiActivity,
  FiAlignLeft, FiGlobe,
  FiHeart, FiZap, FiEye,
  FiFlag, FiCompass, FiUnlock, FiLink,
} from 'react-icons/fi'
import {
  HiOutlineOfficeBuilding,
  HiOutlineChartBar,
  HiOutlineCollection,
} from 'react-icons/hi'
import './About.css'
import '../departments/Departments.css'
import {
  ABOUT_TOPICS,
  KEY_OFFICIALS,
  DEPUTY_DIRECTORS,
  ALL_QUICK_LINKS,
} from './aboutData'
import OrganizationStructureChart from './OrganizationStructureChart'
import HistoryPage from './History'

/* ─────────────────────────────────────────────────────────────────────────────
   Helpers
───────────────────────────────────────────────────────────────────────────── */
const TOPIC_ICONS = {
  overview: <HiOutlineOfficeBuilding />,
  structure: <HiOutlineChartBar />,
  functions: <HiOutlineCollection />,
  history: <FiClock />,
  divisions: <FiLayers />,
  'deputy-sec': <FiShield />,
  director: <FiBriefcase />,
  team: <FiUsers />,
}

function topicIcon(iconKey) {
  return TOPIC_ICONS[iconKey] ?? <FiGrid />
}

/* Framer Motion variants */
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] } },
}

const stagger = (delay = 0.07) => ({
  hidden: {},
  visible: { transition: { staggerChildren: delay } },
})

const slideIn = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.36, ease: [0.16, 1, 0.3, 1] } },
}

/* ─────────────────────────────────────────────────────────────────────────────
   AboutHero
───────────────────────────────────────────────────────────────────────────── */
function AbHoneycomb() {
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
      cells.push(<polygon key={`${row}-${col}`} points={pts} stroke="#C79A2B" strokeWidth="1" fill="none" />)
    }
  const W = 20 * hx + r + 4, H = 9 * vy + r * 2 + 4
  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" fill="none">
      {cells}
    </svg>
  )
}

const AboutHero = memo(function AboutHero({ title, sub }) {
  const staggerV = { hidden: {}, visible: { transition: { staggerChildren: 0.10 } } }
  const itemV    = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 0.60, ease: [0.16, 1, 0.3, 1] } } }
  const slideR   = { hidden: { opacity: 0, x: 36 }, visible: { opacity: 1, x: 0, transition: { duration: 0.70, ease: [0.16, 1, 0.3, 1] } } }

  return (
    <section className="ab-hero" aria-label={`Hero: ${title}`}>
      <div className="ab-hero__bg" aria-hidden="true" />
      <div className="ab-hero__noise" aria-hidden="true" />
      <div className="ab-hero__grid-lines" aria-hidden="true" />
      <div className="ab-hero__glow ab-hero__glow--gold"   aria-hidden="true" />
      <div className="ab-hero__glow ab-hero__glow--maroon" aria-hidden="true" />
      <div className="ab-hero__glow ab-hero__glow--right"  aria-hidden="true" />
      <div className="ab-hero__hc" aria-hidden="true"><AbHoneycomb /></div>
      {[...Array(6)].map((_, i) => (
        <div key={i} className={`ab-hero__dot ab-hero__dot--${i + 1}`} aria-hidden="true" />
      ))}
      <div className="ab-hero__watermark" aria-hidden="true">ABOUT</div>

      <div className="ab-hero__inner">
        <motion.div className="ab-hero__left" initial="hidden" animate="visible" variants={staggerV}>

          <motion.div className="ab-hero__badge" variants={itemV}>
            <span className="ab-hero__badge-dot" aria-hidden="true" />
            <span style={{ fontFamily: "'Cinzel', serif", letterSpacing: '0.13em', textTransform: 'uppercase' }}>
              {title}
            </span>
          </motion.div>

          <motion.h1 className="ab-hero__title" variants={itemV}>
            {title}
          </motion.h1>

          <motion.div
            className="ab-hero__rule"
            variants={{
              hidden:  { scaleX: 0, opacity: 0 },
              visible: { scaleX: 1, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
            }}
            aria-hidden="true"
          />

          {sub && (
            <motion.p className="ab-hero__sub" variants={itemV}>
              {sub}
            </motion.p>
          )}
        </motion.div>

        <motion.div className="ab-hero__right" initial="hidden" animate="visible" variants={slideR}>
          <img
            src="/branding/f-logo.svg"
            alt="Southern Province Planning Secretariat"
            className="ab-hero__logo"
            onError={e => { e.currentTarget.style.display = 'none' }}
          />
        </motion.div>
      </div>

      <svg className="ab-hero__wave" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,80 C240,20 480,60 720,40 C960,20 1200,60 1440,30 L1440,80 Z" fill="#F9F6F1" />
      </svg>
    </section>
  )
})

/* ─────────────────────────────────────────────────────────────────────────────
   AboutQuickLinks — Sidebar (desktop)
───────────────────────────────────────────────────────────────────────────── */
const AboutQuickLinks = memo(function AboutQuickLinks({ activePath }) {
  return (
    <aside className="ab-sidebar" aria-label="About quick links">
      <div className="ab-sidebar__inner">
        <div className="ab-sidebar__header">
          <FiGrid className="ab-sidebar__header-icon" aria-hidden="true" />
          <span className="ab-sidebar__header-title">Quick Links</span>
        </div>

        {ALL_QUICK_LINKS.map((group) => (
          <div key={group.group} className="ab-sidebar__group">
            <p className="ab-sidebar__group-label" aria-hidden="true">{group.group}</p>
            {group.items.map((item) => {
              const isActive = activePath === item.path ||
                (item.path === '/about/deputy-directors' && activePath.startsWith('/about/deputy-directors'))
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`ab-sidebar__link${isActive ? ' ab-sidebar__link--active' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="ab-sidebar__link-dot" aria-hidden="true" />
                  {item.label}
                </Link>
              )
            })}
          </div>
        ))}
      </div>
    </aside>
  )
})

/* ─────────────────────────────────────────────────────────────────────────────
   AboutQuickLinksMobile — collapsible accordion (mobile)
───────────────────────────────────────────────────────────────────────────── */
const AboutQuickLinksMobile = memo(function AboutQuickLinksMobile({ activePath }) {
  const [open, setOpen] = useState(false)

  const toggle = useCallback(() => setOpen(v => !v), [])

  const activeLabel = useMemo(() => {
    for (const g of ALL_QUICK_LINKS) {
      for (const item of g.items) {
        if (activePath === item.path ||
          (item.path === '/about/deputy-directors' && activePath.startsWith('/about/deputy-directors'))) {
          return item.label
        }
      }
    }
    return 'Quick Links'
  }, [activePath])

  return (
    <nav className="ab-quicklinks-mobile" aria-label="About navigation (mobile)">
      <button
        className="ab-quicklinks-mobile__toggle"
        aria-expanded={open}
        aria-controls="ql-mobile-panel"
        onClick={toggle}
      >
        <span>{activeLabel}</span>
        <FiChevronDown
          className={`ab-quicklinks-mobile__toggle-icon${open ? ' ab-quicklinks-mobile__toggle-icon--open' : ''}`}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="ql-mobile-panel"
            className="ab-quicklinks-mobile__panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
          >
            {ALL_QUICK_LINKS.map((group) => (
              <div key={group.group}>
                <p className="ab-quicklinks-mobile__group-label" aria-hidden="true">{group.group}</p>
                {group.items.map((item) => {
                  const isActive = activePath === item.path ||
                    (item.path === '/about/deputy-directors' && activePath.startsWith('/about/deputy-directors'))
                  return (
                    <Link
                      key={item.id}
                      to={item.path}
                      className={`ab-quicklinks-mobile__link${isActive ? ' ab-quicklinks-mobile__link--active' : ''}`}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={() => setOpen(false)}
                    >
                      <span className="ab-quicklinks-mobile__link-dot" aria-hidden="true" />
                      {item.label}
                    </Link>
                  )
                })}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
})

/* ─────────────────────────────────────────────────────────────────────────────
   AboutQuickLinksTablet — horizontal scrolling pills (tablet)
───────────────────────────────────────────────────────────────────────────── */
const AboutQuickLinksTablet = memo(function AboutQuickLinksTablet({ activePath }) {
  const allItems = useMemo(() => ALL_QUICK_LINKS.flatMap(g => g.items), [])
  return (
    <nav className="ab-quicklinks-tablet" aria-label="About navigation (tablet)">
      {allItems.map((item) => {
        const isActive = activePath === item.path ||
          (item.path === '/about/deputy-directors' && activePath.startsWith('/about/deputy-directors'))
        return (
          <Link
            key={item.id}
            to={item.path}
            className={`ab-quicklinks-tablet__pill${isActive ? ' ab-quicklinks-tablet__pill--active' : ''}`}
            aria-current={isActive ? 'page' : undefined}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
})

/* ─────────────────────────────────────────────────────────────────────────────
   AboutLayout — shared page shell
───────────────────────────────────────────────────────────────────────────── */
function AboutLayout({ heroTitle, heroSub, children }) {
  const { pathname } = useLocation()

  return (
    <div className="ab-page">
      <AboutHero title={heroTitle} sub={heroSub} />
      <AboutQuickLinksTablet activePath={pathname} />
      <AboutQuickLinksMobile activePath={pathname} />
      <div className="ab-body">
        <AboutQuickLinks activePath={pathname} />
        <main className="ab-main" id="main-content" tabIndex={-1}>
          {children}
        </main>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   Functions & Duties — multilingual data
───────────────────────────────────────────────────────────────────────────── */
const FD_ICON_COMPONENTS = [
  FiSend, FiClipboard, FiTarget, FiCheckCircle,
  FiThumbsUp, FiMap, FiActivity, FiBarChart2,
  FiFileText, FiDatabase, FiSearch, FiGlobe,
  FiAlignLeft, FiTrendingUp,
]

const FD_DATA = {
  en: {
    sectionLabel: 'Functions & Duties',
    intro: 'The Planning Secretariat performs key responsibilities in development planning, coordination, monitoring, evaluation, reporting, and policy guidance.',
    duties: [
      'Obtaining estimates related to the development plan for the coming year from the 05 Provincial Ministries and submitting them to the Finance Commission.',
      'Obtaining the allocations allocated to each ministry for the coming year from the Finance Commission and preparing the development plan accordingly.',
      'Evaluating the projects included in the development plan for the coming year prepared and submitted by the ministries and discussing them with the Finance Commission.',
      'Submitting the prepared development plan for the coming year for approval from the Finance Commission.',
      'Giving approval to the relevant ministries for implementation after obtaining the approval of the Finance Commission for the development plan.',
      'Preparing the provincial development plan and district development plans related to the year and submitting them to the relevant institutions.',
      'Monitoring and following up on the projects implemented by the ministries, departments and other affiliated institutions.',
      'Monthly physical and financial progress review of the ongoing annual development plan and holding progress review meetings.',
      'Preparing quarterly progress reports and submitting them to the relevant institutions.',
      'Collecting information on bills and pending projects at the end of the year (as of December 31).',
      'Identifying development objectives, strategies, methodologies and formulating policy recommendations.',
      'Preparing appropriate medium and long-term investment programs for the Southern Province through coordination with national level policy-making departments and obtaining technical advice.',
      'Studying, analyzing and compiling information on the socio-economic conditions, resource potential, problems and needs in the province.',
      'Coordinating with the planning units of the Divisional Secretariats and Local Government Institutions in preparing the Provincial Development Plan and providing necessary guidance.',
    ],
    font: "'Plus Jakarta Sans', sans-serif",
  },
  si: {
    sectionLabel: 'කාර්යයන්',
    intro: 'සැලසුම් ලේකම් කාර්යාලය සංවර්ධන සැලසුම් කිරීම, සම්බන්ධීකරණය, අධීක්‍ෂණය, ඇගයීම, වාර්තා කිරීම සහ ප්‍රතිපත්ති මාර්ගෝපදේශ ක්ෂේත්‍රවල ප්‍රධාන වගකීම් ඉටු කරයි.',
    duties: [
      'ඉදිරි වර්ෂය සඳහා සංවර්ධන සැලැස්මට අදාල ඇස්තමේන්තු පළාත් අමාත්‍යාංශ 05 මගින් ගෙන්වා ගැනීම හා මුදල් කොමිෂන් සභාව වෙත ඉදිරිපත් කිරිම.',
      'ඉදිරි වර්ෂය සඳහා එක් එක් අමාත්‍යාංශ වෙත වෙන් කරන ලද ප්‍රතිපාදන මුදල් කොමිෂන් සභාව මගින් ගෙන්වා ගැනීම හා ඒ අනුව සංවර්ධන සැලැස්ම සකස් කිරිම.',
      'අමාත්‍යාංශ මගින් සකස් කර යොමු කරනු ලබන ඉදිරි වර්ෂයේ සංවර්ධන සැලැස්මේ ඇතුලත් ව්‍යාපෘති සම්බන්ධව ඇගයුම් කිරීම හා මුදල් කොමිෂන් සභාව සමඟ සාකච්ඡා කිරීම.',
      'සකස් කරන ලද ඉදිරි වර්ෂයේ සංවර්ධන සැලැස්ම සඳහා මුදල් කොමිෂන් සභාවේ එකඟතාවය ලබා ගැනීම සඳහා යොමු කිරීම.',
      'සංවර්ධන සැලැස්ම සඳහා මුදල් කොම්ෂන් සභාවේ එකඟතාවය ලැබිමෙන් අනතුරුව ක්‍රියාත්මක කිරීම සඳහා අදාල අමාත්‍යාංශ වලට අනුමැතිය ලබා දීම.',
      'වර්ෂයට අදාල පළාත් සංවර්ධන සැලැස්ම, දිස්ත්‍රික් සංවර්ධන සැලසුම් පිළියෙල කර අදාල ආයතන වෙත යොමු කිරීම.',
      'අමාත්‍යාංශ අංශ හා අනෙකුත් අනුබද්ධිත ආයතන මගින් ක්‍රියාත්මක ව්‍යාපෘති අධීක්ෂණය හා පසු විපරම් කිරිම.',
      'ක්‍රියාත්මක වාර්ෂික සංවර්ධන සැලැස්මේ භෞතික හා මුල්‍ය ප්‍රගතිය මාසිකව ගෙන්වා ගැනීම හා ප්‍රගති සමාලෝචන රැස්වීම් පැවැත්වීම.',
      'කාර්තුමය ප්‍රගති වාර්තා සකස් කිරිම හා අදාල ආයතන වෙත යොමු කිරිම.',
      'වර්ෂ අවසානයේ දී (දෙසැම්බර් 31 දිනට) අතැති බිල් හා අවිච්ඡේද ව්‍යාපෘති පිළිබඳ තොරතුරු රැස් කිරීම.',
      'සංවර්ධන අරමුණු, උපායමාර්ග, ක්‍රමවේද හඳුනා ගැනිම හා ප්‍රතිපත්ති නිර්දේශ සම්පාදනය.',
      'ජාතික මට්ටමේ ප්‍රතිපත්ති සම්පාදන අංශ සමඟ සම්බන්ධිකරණය හා තාක්ෂණික උපදෙස් ලබාගැනිම තුළින් දකුණු පළාත සඳහා උචිත මධ්‍ය කාලින හා දිර්ඝ කාලින ආයෝජන වැඩසටහන් පිළියෙළ කිරිම.',
      'පළාත තුළ පවතින සමාජ ආර්ථික තත්ත්වයන් සම්පත් විභවතාවයන්, ගැටළු හා අවශ්‍යතාවයන් අධ්‍යනය කිරිම, විශ්ලේෂණය කිරිම හා තොරතුරු සම්පාදනය කිරිම.',
      'පළාත් සංවර්ධන සැලැස්ම සකස් කිරීමේදී, ප්‍රාදේශිය ලේකම් කාර්යාල සහ පළාත් පාලන ආයතන සැලසුම් ඒකක සම්බන්ධීකරණය හා අවශ්‍ය මාර්ගෝපදේශකත්වය සැපයීම.',
    ],
    font: "'Noto Sans Sinhala', sans-serif",
  },
  ta: {
    sectionLabel: 'பணிகள்',
    intro: 'திட்டமிடல் செயலகம் வளர்ச்சித் திட்டமிடல், ஒருங்கிணைப்பு, கண்காணிப்பு, மதிப்பீடு, அறிக்கையிடல் மற்றும் கொள்கை வழிகாட்டுதல் ஆகிய முக்கிய பொறுப்புகளை நிறைவேற்றுகிறது.',
    duties: [
      'வரும் ஆண்டிற்கான வளர்ச்சித் திட்டம் தொடர்பான மதிப்பீடுகளை 05 மாகாண அமைச்சகங்களிடமிருந்து பெற்று, அவற்றை நிதி ஆணையத்திடம் சமர்ப்பித்தல்.',
      'வரும் ஆண்டிற்காக ஒவ்வொரு அமைச்சகத்திற்கும் ஒதுக்கப்பட்ட நிதி ஒதுக்கீடுகளை நிதி ஆணையத்திடமிருந்து பெற்று, அதற்கேற்ப வளர்ச்சித் திட்டத்தைத் தயாரித்தல்.',
      'அமைச்சகங்களால் தயாரிக்கப்பட்டு சமர்ப்பிக்கப்பட்ட, வரும் ஆண்டிற்கான வளர்ச்சித் திட்டத்தில் உள்ள திட்டங்களை மதிப்பீடு செய்து, நிதி ஆணையத்துடன் விவாதித்தல்.',
      'தயாரிக்கப்பட்ட, வரும் ஆண்டிற்கான வளர்ச்சித் திட்டத்தை நிதி ஆணையத்தின் ஒப்புதலுக்காகச் சமர்ப்பித்தல்.',
      'வளர்ச்சித் திட்டத்திற்கு நிதி ஆணையத்தின் ஒப்புதலைப் பெற்ற பிறகு, அதனைச் செயல்படுத்துவதற்காக சம்பந்தப்பட்ட அமைச்சகங்களுக்கு ஒப்புதல் அளித்தல்.',
      'அந்த ஆண்டிற்கான மாகாண வளர்ச்சித் திட்டம் மற்றும் மாவட்ட வளர்ச்சித் திட்டங்களைத் தயாரித்து, அவற்றை சம்பந்தப்பட்ட நிறுவனங்களுக்குச் சமர்ப்பித்தல்.',
      'அமைச்சகங்கள், துறைகள் மற்றும் பிற இணைக்கப்பட்ட நிறுவனங்களால் செயல்படுத்தப்படும் திட்டங்களைக் கண்காணித்து, பின்தொடர்தல்.',
      'நடைபெற்று வரும் ஆண்டு வளர்ச்சித் திட்டத்தின் மாதாந்திர கள மற்றும் நிதி முன்னேற்றத்தைக் கண்காணித்து, முன்னேற்ற ஆய்வுக் கூட்டங்களை நடத்துதல்.',
      'காலாண்டு முன்னேற்ற அறிக்கைகளைத் தயாரித்து, அவற்றை சம்பந்தப்பட்ட நிறுவனங்களுக்குச் சமர்ப்பித்தல்.',
      'ஆண்டின் இறுதியில் (டிசம்பர் 31 நிலவரப்படி) மசோதாக்கள் மற்றும் நிலுவையில் உள்ள திட்டங்கள் குறித்த தகவல்களைச் சேகரித்தல்.',
      'வளர்ச்சி நோக்கங்கள், உத்திகள், வழிமுறைகளைக் கண்டறிந்து, கொள்கைப் பரிந்துரைகளை உருவாக்குதல்.',
      'தேசிய அளவிலான கொள்கை வகுக்கும் துறைகளுடன் ஒருங்கிணைந்து மற்றும் தொழில்நுட்ப ஆலோசனைகளைப் பெற்று, தெற்கு மாகாணத்திற்கான பொருத்தமான நடுத்தர மற்றும் நீண்ட கால முதலீட்டுத் திட்டங்களைத் தயாரித்தல்.',
      'மாகாணத்தின் சமூக-பொருளாதார நிலைமைகள், வள ஆற்றல், பிரச்சினைகள் மற்றும் தேவைகள் குறித்த தகவல்களை ஆய்வு செய்தல், பகுப்பாய்வு செய்தல் மற்றும் தொகுத்தல்.',
      'மாகாண வளர்ச்சித் திட்டத்தைத் தயாரிப்பதில் பிரதேச செயலகங்கள் மற்றும் உள்ளாட்சி நிறுவனங்களின் திட்டமிடல் பிரிவுகளுடன் ஒருங்கிணைந்து, தேவையான வழிகாட்டுதலை வழங்குதல்.',
    ],
    font: "'Noto Sans Tamil', sans-serif",
  },
}

/* ─────────────────────────────────────────────────────────────────────────────
   useLang — reads localStorage 'lang' key (same system as other pages)
───────────────────────────────────────────────────────────────────────────── */
function useLang() {
  const [lang, setLang] = useState(() => {
    const stored = localStorage.getItem('lang')
    return stored === 'si' || stored === 'ta' ? stored : 'en'
  })

  useEffect(() => {
    const handler = () => {
      const stored = localStorage.getItem('lang')
      setLang(stored === 'si' || stored === 'ta' ? stored : 'en')
    }
    window.addEventListener('storage', handler)
    window.addEventListener('langChange', handler)
    return () => {
      window.removeEventListener('storage', handler)
      window.removeEventListener('langChange', handler)
    }
  }, [])

  return lang
}

/* ─────────────────────────────────────────────────────────────────────────────
   FunctionsDutiesPage — content page for /about/functions-duties
───────────────────────────────────────────────────────────────────────────── */
function FunctionsDutiesPage({ topic }) {
  const lang = useLang()
  const t = FD_DATA[lang] ?? FD_DATA.en
  const isNonLatin = lang === 'si' || lang === 'ta'

  return (
    <AboutLayout heroTitle={topic.heroTitle} heroSub={topic.heroSub}>
      <motion.div
        className="ab-content"
        initial="hidden"
        animate="visible"
        variants={stagger(0.08)}
      >
        {/* ── Intro glass card ── */}
        <motion.div className="ab-fd-intro" variants={fadeUp} role="note">
          <div className="ab-fd-intro__icon" aria-hidden="true">
            <HiOutlineCollection />
          </div>
          <div className="ab-fd-intro__body">
            <h2 className="ab-fd-intro__title" style={{ fontFamily: isNonLatin ? t.font : undefined }}>
              {t.sectionLabel}
            </h2>
            <p className="ab-fd-intro__text" style={{ fontFamily: t.font }}>
              {t.intro}
            </p>
          </div>
        </motion.div>

        {/* ── Duty cards grid ── */}
        <motion.ol
          className="ab-fd-grid"
          variants={stagger(0.055)}
          aria-label={t.sectionLabel}
        >
          {t.duties.map((duty, i) => (
            <motion.li
              key={i}
              className="ab-fd-card"
              variants={fadeUp}
            >
              <div className="ab-fd-card__left">
                <div className="ab-fd-card__icon-wrap" aria-hidden="true">
                  {(() => { const Icon = FD_ICON_COMPONENTS[i % FD_ICON_COMPONENTS.length]; return <Icon /> })()}
                </div>
                <div className="ab-fd-card__number" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </div>
              </div>
              <p
                className="ab-fd-card__text"
                style={{ fontFamily: t.font }}
              >
                {duty}
              </p>
            </motion.li>
          ))}
        </motion.ol>

        {/* ── Bottom glass accent ── */}
        <motion.div className="ab-glass-accent" variants={fadeUp}>
          <div className="ab-glass-accent__icon" aria-hidden="true">
            <FiShield />
          </div>
          <div className="ab-glass-accent__content">
            <div className="ab-glass-accent__title">Official Government Content</div>
            <div className="ab-glass-accent__sub">
              All information published on this page is sourced from the Southern Province
              Planning Secretariat and is subject to official review before publication.
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AboutLayout>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   AboutContentPage — generic topic page with placeholder layout
───────────────────────────────────────────────────────────────────────────── */
function AboutContentPage({ topic }) {
  return (
    <AboutLayout heroTitle={topic.heroTitle} heroSub={topic.heroSub}>
      <motion.div
        className="ab-content"
        initial="hidden"
        animate="visible"
        variants={stagger(0.1)}
      >
        {/* Placeholder main card */}
        <motion.div className="ab-placeholder-card" variants={fadeUp}>
          <div className="ab-placeholder-card__icon-wrap" aria-hidden="true">
            {topicIcon(topic.icon)}
          </div>
          <h2 className="ab-placeholder-card__title">{topic.heroTitle}</h2>
          <p className="ab-placeholder-card__sub">
            Content for this section is being prepared and will be published soon.
            This page is part of the Southern Province Planning Secretariat&apos;s official About section.
          </p>
          <span className="ab-placeholder-card__badge">
            <FiClock aria-hidden="true" /> Coming Soon
          </span>
        </motion.div>

        {/* Stat placeholder row */}
        <motion.div className="ab-stat-row" variants={stagger(0.06)} role="list" aria-label="Key statistics">
          {[
            { icon: <FiUsers />, label: 'Established', value: '1978', desc: 'Year of establishment' },
            { icon: <HiOutlineOfficeBuilding />, label: 'Province', value: 'Southern', desc: 'Provincial coverage' },
            { icon: <FiLayers />, label: 'Divisions', value: '6', desc: 'Planning divisions' },
            { icon: <FiBook />, label: 'Districts', value: '3', desc: 'Districts covered' },
          ].map((s) => (
            <motion.div className="ab-stat-card" key={s.label} variants={slideIn} role="listitem">
              <div className="ab-stat-card__icon" aria-hidden="true">{s.icon}</div>
              <div className="ab-stat-card__label">{s.label}</div>
              <div className="ab-stat-card__value">{s.value}</div>
              <div className="ab-stat-card__desc">{s.desc}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Glass accent panel */}
        <motion.div className="ab-glass-accent" variants={fadeUp}>
          <div className="ab-glass-accent__icon" aria-hidden="true">
            <FiShield />
          </div>
          <div className="ab-glass-accent__content">
            <div className="ab-glass-accent__title">Official Government Content</div>
            <div className="ab-glass-accent__sub">
              All information published on this page is sourced from the Southern Province
              Planning Secretariat and is subject to official review before publication.
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AboutLayout>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   PremiumProfileHero — shared dark hero with spinning ring avatar
───────────────────────────────────────────────────────────────────────────── */
function AbHoneycombProfile() {
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
      cells.push(<polygon key={`${row}-${col}`} points={pts} stroke="#C79A2B" strokeWidth="1" fill="none" />)
    }
  const W = 20 * hx + r + 4, H = 9 * vy + r * 2 + 4
  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" fill="none">
      {cells}
    </svg>
  )
}

function PremiumProfileHero({ name, position, badge, imgSrc, backPath, backLabel, contactPath }) {
  const staggerV = { hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }
  const itemV    = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } } }
  const imgV     = { hidden: { opacity: 0, scale: 0.88 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.70, ease: [0.22, 1, 0.36, 1] } } }

  const [imgOk, setImgOk] = useState(true)

  return (
    <section className="dprof-hero" aria-label={`Profile: ${name}`}>
      <div className="dprof-hero__noise"       aria-hidden="true" />
      <div className="dprof-hero__grid-lines"  aria-hidden="true" />
      <div className="dprof-hero__glow dprof-hero__glow--gold"  aria-hidden="true" />
      <div className="dprof-hero__glow dprof-hero__glow--right" aria-hidden="true" />
      <div className="dep-hero__hc" aria-hidden="true" style={{ opacity: 0.05 }}><AbHoneycombProfile /></div>
      {[...Array(6)].map((_, i) => (
        <div key={i} className={`dep-hero__dot dep-hero__dot--${i + 1}`} aria-hidden="true" />
      ))}

      <div className="dprof-hero__inner">
        {/* ── Avatar column ── */}
        <motion.div initial="hidden" animate="visible" variants={imgV} style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="dprof__img-frame" role="img" aria-label={name}>
            {imgSrc && imgOk
              ? <img src={imgSrc} alt={name} className="dprof__img" onError={() => setImgOk(false)} />
              : <div className="dprof__img-placeholder" aria-hidden="true"><FiUser size={48} /></div>
            }
          </div>
        </motion.div>

        {/* ── Text column ── */}
        <motion.div className="dprof-hero__content" initial="hidden" animate="visible" variants={staggerV}>
          <motion.div className="dprof-hero__badge" variants={itemV}>
            <span className="dprof-hero__badge-dot" aria-hidden="true" />
            <span style={{ fontFamily: "'Cinzel', serif", letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: '0.72rem' }}>
              {badge}
            </span>
          </motion.div>

          <motion.h1 className="dprof-hero__name" style={{ fontFamily: "'Playfair Display', Georgia, serif" }} variants={itemV}>
            {name}
          </motion.h1>

          <motion.div
            className="dprof-hero__rule"
            variants={{ hidden: { scaleX: 0, opacity: 0 }, visible: { scaleX: 1, opacity: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } } }}
            aria-hidden="true"
          />

          <motion.p className="dprof-hero__position" variants={itemV}>{position}</motion.p>

          <motion.div className="dprof-hero__actions" variants={itemV}>
            {contactPath && (
              <Link to={contactPath} className="dprof-hero__btn dprof-hero__btn--gold">
                <FiPhone size={14} /><span>Contact Office</span>
              </Link>
            )}
            <Link to={backPath} className="dprof-hero__btn dprof-hero__btn--ghost">
              <FiChevronLeft size={14} /><span>{backLabel}</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <svg className="dprof-hero__wave" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,80 C240,20 480,60 720,40 C960,20 1200,60 1440,30 L1440,80 Z" fill="#FCFBFA" />
      </svg>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   OfficialProfilePage — Deputy Secretary / Director profile
───────────────────────────────────────────────────────────────────────────── */
function OfficialProfilePage({ official }) {
  return (
    <div className="dprof-wrap">
      <PremiumProfileHero
        name={official.name}
        position={official.position}
        badge={official.positionRank ?? official.position}
        imgSrc={official.photo}
        backPath="/about"
        backLabel="Back to About"
        contactPath="/contact"
      />

      {/* ── Body: sidebar + main ── */}
      <div className="dprof-body">
        {/* Sidebar */}
        <aside className="dprof-sidebar">
          {/* Contact card */}
          <motion.div
            className="dprof-info-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="dprof-info-card__heading">
              <FiPhone size={15} style={{ color: '#C79A2B' }} aria-hidden="true" />
              Contact
            </div>

            <div className="dprof-info-row">
              <div className="dprof-info-row__icon"><FiPhone aria-hidden="true" /></div>
              <div>
                <div className="dprof-info-row__label">Telephone</div>
                <div className="dprof-info-row__value">
                  <a href={`tel:${official.contact.phone}`}>{official.contact.phone}</a>
                </div>
              </div>
            </div>

            <div className="dprof-info-row">
              <div className="dprof-info-row__icon"><FiMail aria-hidden="true" /></div>
              <div>
                <div className="dprof-info-row__label">Email</div>
                <div className="dprof-info-row__value">
                  <a href={`mailto:${official.contact.email}`}>{official.contact.email}</a>
                </div>
              </div>
            </div>

            <div className="dprof-info-row">
              <div className="dprof-info-row__icon"><FiMapPin aria-hidden="true" /></div>
              <div>
                <div className="dprof-info-row__label">Office</div>
                <div className="dprof-info-row__value">{official.contact.office}</div>
              </div>
            </div>
          </motion.div>

          {/* Department card */}
          <motion.div
            className="dprof-info-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="dprof-info-card__heading">
              <FiBriefcase size={15} style={{ color: '#C79A2B' }} aria-hidden="true" />
              Division
            </div>
            <div className="dprof-info-row">
              <div className="dprof-info-row__icon"><FiBriefcase aria-hidden="true" /></div>
              <div>
                <div className="dprof-info-row__label">Unit</div>
                <div className="dprof-info-row__value">{official.department ?? 'Planning Secretariat, Southern Province'}</div>
              </div>
            </div>
          </motion.div>
        </aside>

        {/* Main content */}
        <main className="dprof-main-content">
          <motion.div
            className="dprof-section-card"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="dprof-section-card__heading">Key Responsibilities</h2>
            <div className="dprof-section-card__body">
              <ul className="dprof-resp-list" role="list">
                {official.responsibilities.map((r, i) => (
                  <li key={i} className={typeof r !== 'string' ? 'dprof-resp-list__has-sub' : ''}>
                    {typeof r === 'string' ? r : (
                      <>
                        <span>{r.text}</span>
                        <ul className="dprof-resp-sublist">
                          {r.subItems.map((s, j) => <li key={j}>{s}</li>)}
                        </ul>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            className="dprof-contact-cta"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="dprof-contact-cta__text">
              <div className="dprof-contact-cta__title">Get in touch with the Secretariat</div>
              <p>For official correspondence, use the contact details provided or visit our Contact page.</p>
            </div>
            <Link to="/contact" className="dprof-contact-cta__btn">
              Contact Office <FiChevronRight size={14} aria-hidden="true" />
            </Link>
          </motion.div>
        </main>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   DeputyDirectorProfilePage — single DD profile
───────────────────────────────────────────────────────────────────────────── */
function DeputyDirectorProfilePageWrapper() {
  const { id } = useParams()
  return (
    <SubHold holdKey={`about__deputy-directors__${id}`} pageKey="about__deputy-directors">
      <DeputyDirectorProfilePage />
    </SubHold>
  )
}

function DeputyDirectorProfilePage() {
  const { id } = useParams()
  const dd = useMemo(() => DEPUTY_DIRECTORS.find(d => d.id === id), [id])

  if (!dd) {
    return <Navigate to="/about/deputy-directors" replace />
  }

  return (
    <div className="dprof-wrap">
      <PremiumProfileHero
        name={dd.name}
        position={dd.position}
        badge="Deputy Director – Planning"
        imgSrc={dd.photo}
        backPath="/about/deputy-directors"
        backLabel="Deputy Directors"
        contactPath="/contact"
      />

      {/* ── Body: sidebar + main ── */}
      <div className="dprof-body">
        {/* Sidebar */}
        <aside className="dprof-sidebar">
          {/* Contact card */}
          <motion.div
            className="dprof-info-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="dprof-info-card__heading">
              <FiPhone size={15} style={{ color: '#C79A2B' }} aria-hidden="true" />
              Contact
            </div>

            <div className="dprof-info-row">
              <div className="dprof-info-row__icon"><FiPhone aria-hidden="true" /></div>
              <div>
                <div className="dprof-info-row__label">Telephone</div>
                <div className="dprof-info-row__value">
                  <a href={`tel:${dd.contact.phone}`}>{dd.contact.phone}</a>
                </div>
              </div>
            </div>

            <div className="dprof-info-row">
              <div className="dprof-info-row__icon"><FiMail aria-hidden="true" /></div>
              <div>
                <div className="dprof-info-row__label">Email</div>
                <div className="dprof-info-row__value">
                  <a href={`mailto:${dd.contact.email}`}>{dd.contact.email}</a>
                </div>
              </div>
            </div>

            <div className="dprof-info-row">
              <div className="dprof-info-row__icon"><FiMapPin aria-hidden="true" /></div>
              <div>
                <div className="dprof-info-row__label">Office</div>
                <div className="dprof-info-row__value">{dd.contact.office}</div>
              </div>
            </div>
          </motion.div>

        </aside>

        {/* Main content */}
        <main className="dprof-main-content">
          <motion.div
            className="dprof-section-card"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="dprof-section-card__heading">Key Responsibilities</h2>
            <div className="dprof-section-card__body">
              <ul className="dprof-resp-list" role="list">
                {dd.responsibilities.map((r, i) => (
                  <li key={i} className={typeof r !== 'string' ? 'dprof-resp-list__has-sub' : ''}>
                    {typeof r === 'string' ? r : (
                      <>
                        <span>{r.text}</span>
                        <ul className="dprof-resp-sublist">
                          {r.subItems.map((s, j) => <li key={j}>{s}</li>)}
                        </ul>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            className="dprof-contact-cta"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="dprof-contact-cta__text">
              <div className="dprof-contact-cta__title">Get in touch with the Secretariat</div>
              <p>For official correspondence, use the contact details provided or visit our Contact page.</p>
            </div>
            <Link to="/contact" className="dprof-contact-cta__btn">
              Contact Office <FiChevronRight size={14} aria-hidden="true" />
            </Link>
          </motion.div>
        </main>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   DeputyDirectorsListPage — grid of all 6 DDs
───────────────────────────────────────────────────────────────────────────── */
function DeputyDirectorsListPage() {
  return (
    <AboutLayout
      heroTitle="Deputy Directors – Planning"
      heroSub="Meet the planning team's deputy directors of the Southern Province Planning Secretariat."
    >
      <motion.div
        className="ab-content"
        initial="hidden"
        animate="visible"
        variants={stagger(0.09)}
      >
        {/* Back */}
        <motion.div variants={fadeUp}>
          <Link to="/about" className="ab-back-link">
            <FiChevronLeft aria-hidden="true" /> About Overview
          </Link>
        </motion.div>

        {/* DD grid */}
        <motion.div
          className="ab-dd-list"
          variants={stagger(0.07)}
          role="list"
          aria-label="Deputy Directors"
        >
          {DEPUTY_DIRECTORS.map((dd) => (
            <motion.div key={dd.id} variants={fadeUp} role="listitem">
              <Link
                to={dd.path}
                className="ab-dd-card"
                aria-label={`View profile: ${dd.position}`}
              >
                <div className="ab-dd-card__avatar" aria-hidden="true" role="img">
                  {dd.photo
                    ? <img src={dd.photo} alt={dd.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'block' }} />
                    : null}
                  <FiUser style={dd.photo ? { display: 'none' } : {}} />
                </div>
                <span className="ab-dd-card__name">{dd.name}</span>
                <span className="ab-dd-card__cta">
                  View Profile <FiChevronRight aria-hidden="true" />
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Glass accent */}
        <motion.div className="ab-glass-accent" variants={fadeUp}>
          <div className="ab-glass-accent__icon" aria-hidden="true"><FiUsers /></div>
          <div className="ab-glass-accent__content">
            <div className="ab-glass-accent__title">Planning Team</div>
            <div className="ab-glass-accent__sub">
              Six Deputy Directors lead the planning divisions across the Southern Province.
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AboutLayout>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   Values — multilingual data
───────────────────────────────────────────────────────────────────────────── */
const VALUE_ICONS = [
  FiHeart, FiUnlock, FiUsers, FiEye,
  FiStar, FiShield, FiFlag, FiLink,
]

const overviewValues = {
  en: {
    sectionLabel: 'Values',
    items: [
      'Compassion',
      'Working with integrity',
      'Teamwork',
      'Impartiality',
      'Respect',
      'Responsibility',
      'Leadership',
      'Integrity',
    ],
  },
  si: {
    sectionLabel: 'අගයන්',
    items: [
      'සායානුකම්පාව',
      'අවංකව වැඩ කිරීම',
      'සාමුහිකව කටයුතු කිරීම',
      'අපක්ෂපාතීත්වය',
      'ගරු කිරීම',
      'වගවීම',
      'නායකත්වය',
      'අඛණ්ඩතාවය',
    ],
  },
  ta: {
    sectionLabel: 'விழுமியங்கள்',
    items: [
      'கருணை',
      'நேர்மையுடன் பணியாற்றுதல்',
      'குழுப்பணி',
      'பாரபட்சமின்மை',
      'மரியாதை',
      'பொறுப்பு',
      'தலைமைத்துவம்',
      'ஒருங்கிணைப்பு',
    ],
  },
}

/* ─────────────────────────────────────────────────────────────────────────────
   Objectives — multilingual data
───────────────────────────────────────────────────────────────────────────── */
const overviewObjectives = {
  en: {
    sectionLabel: 'Objectives',
    items: [
      'To control the provincial planning process in line with the national policies and guidelines of the Finance Commission.',
      'To maintain a systematic operational and reporting process.',
      'To coordinate the planning values of provincial ministries, departments, other institutions as well as the planning departments and line ministries of other provincial councils.',
      'To develop the human resource capacity of the Planning and Accounting Office with the aim of providing solutions to the pressing problems of the province and especially in the neglected areas.',
    ],
  },
  si: {
    sectionLabel: 'අරමුණු',
    items: [
      'මුදල් කොමිසමේ ජාතික ප්‍රතිපත්ති හා මගපෙන්වීම් වලට අනුගත වෙමින් පළාත් සැලසුම් ක්‍රියාවලිය පාලනය කිරීම.',
      'විධිමත් මෙහෙයුම් හා අහයුම් ක්‍රියාවලියක් පවත්වාගෙන යාම.',
      'පළාත් අමාත්‍යාශ, අංශ, අනෙකුත් ආයතනවල මෙන්ම අනෙකුත් පළාත් සභාවල සැලසුම් අංශ හා රේඛීය අමාත්‍යංශවල සැලසුම් අගයන් සම්බන්ධීකරණය.',
      'පළාතේ සහ විශේෂයෙන්ම අවධානයට ලක් නොවූ ප්‍රදේශවල දැවෙන ගැටළු සඳහා විසඳුම් සැපයීමේ අරමුණෙන් සැලසුම් හා ගිණුම් කාර්යාලයේ මානව සම්පත් ධාරිතාව සංවර්ධනය කිරීම.',
    ],
  },
  ta: {
    sectionLabel: 'நோக்கங்கள்',
    items: [
      'தேசியக் கொள்கைகள் மற்றும் நிதி ஆணையத்தின் வழிகாட்டுதல்களுக்கு இணங்க மாகாணத் திட்டமிடல் செயல்முறையைக் கட்டுப்படுத்துதல்.',
      'ஒரு முறையான செயல்பாட்டு மற்றும் அறிக்கையிடல் செயல்முறையைப் பராமரித்தல்.',
      'மாகாண அமைச்சகங்கள், துறைகள், பிற நிறுவனங்கள் மற்றும் பிற மாகாண சபைகளின் திட்டமிடல் துறைகள் மற்றும் தொடர்புடைய அமைச்சகங்களின் திட்டமிடல் மதிப்புகளை ஒருங்கிணைத்தல்.',
      'மாகாணத்தின், குறிப்பாகப் புறக்கணிக்கப்பட்ட பகுதிகளின், அவசரப் பிரச்சினைகளுக்குத் தீர்வு காணும் நோக்கில் திட்டமிடல் மற்றும் கணக்குப்பதிவு அலுவலகத்தின் மனிதவளத் திறனை மேம்படுத்துதல்.',
    ],
  },
}

/* ─────────────────────────────────────────────────────────────────────────────
   Awards — static data (multilingual labels + placeholder images)
───────────────────────────────────────────────────────────────────────────── */
const overviewAwards = {
  sectionLabel: { en: 'Our Awards', si: 'අපගේ සම්මාන', ta: 'எங்கள் විருதுகள்' },
  items: [
    {
      id: 'award-1',
      img: '/branding/tp1.png',
      title: { en: 'National Productivity Award 2020', si: 'ජාතික ඵලදායිතා සම්මානය 2020', ta: 'தேசிய உற்பத்தித்திறன் விருது 2020' },
      year: '2020',
      desc: {
        en: 'Inter Departments Special Commendation',
        si: 'අන්තර් දෙපාර්තමේන්තු විශේෂ ප්‍රශංසා සම්මානය',
        ta: 'துறைகளுக்கிடையிலான சிறப்பு பாராட்டு',
      },
    },
    {
      id: 'award-2',
      img: '/branding/tp2.png',
      title: { en: 'Best Annual Reports and Accounts - 2022', si: 'හොඳම වාර්ෂික වාර්තා සහ ගිණුම් - 2022', ta: 'சிறந்த வருடாந்திர அறிக்கைகள் மற்றும் கணக்குகள் - 2022' },
      year: '2022',
      desc: {
        en: 'Best Annual Reports and Accounts - 2022',
        si: 'හොඳම වාර්ෂික වාර්තා සහ ගිණුම් - 2022',
        ta: 'சிறந்த வருடாந்திர அறிக்கைகள் மற்றும் கணக்குகள் - 2022',
      },
    },
    {
      id: 'award-3',
      img: '/branding/tp3.png',
      title: { en: 'Unmodified Audit Opinion - 2022', si: 'අකෙලෙස් විගණන මතය - 2022', ta: 'மாற்றப்படாத தணிக்கை கருத்து - 2022' },
      year: '2022',
      desc: {
        en: 'Unmodified Audit Opinion for Financial Statement of the year 2022 from National Audit Office',
        si: '2022 වර්ෂයේ මූල්‍ය ප්‍රකාශය සඳහා ජාතික විගණන කාර්යාලයෙන් ලැබූ අකෙලෙස් විගණන මතය',
        ta: '2022 ஆண்டின் நிதி அறிக்கைக்கான தேசிய தணிக்கை அலுவலகத்திடமிருந்து மாற்றப்படாத தணிக்கை கருத்து',
      },
    },
  ],
}

/* ─────────────────────────────────────────────────────────────────────────────
   OverviewValues — animated glassmorphism value cards grid
───────────────────────────────────────────────────────────────────────────── */
function OverviewValues({ lang }) {
  const t = overviewValues[lang] ?? overviewValues.en
  const fontFamily = lang === 'si'
    ? "'Noto Sans Sinhala', sans-serif"
    : lang === 'ta'
      ? "'Noto Sans Tamil', sans-serif"
      : 'inherit'

  return (
    <motion.section
      className="ab-ov-values"
      variants={fadeUp}
      aria-labelledby="ov-values-heading"
    >
      <div className="ab-ov-section-header">
        <p className="ab-ov-section-label" id="ov-values-heading" aria-label={t.sectionLabel}>
          {t.sectionLabel}
        </p>
      </div>

      <motion.div
        className="ab-ov-values__grid"
        variants={stagger(0.06)}
        role="list"
        aria-label={t.sectionLabel}
      >
        {t.items.map((value, i) => {
          const Icon = VALUE_ICONS[i % VALUE_ICONS.length]
          return (
            <motion.div
              key={i}
              className="ab-ov-value-card"
              variants={fadeUp}
              role="listitem"
              whileHover={{ y: -4, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } }}
            >
              <div className="ab-ov-value-card__icon-wrap" aria-hidden="true">
                <Icon className="ab-ov-value-card__icon" />
              </div>
              <span
                className="ab-ov-value-card__label"
                style={{ fontFamily: lang !== 'en' ? fontFamily : undefined }}
              >
                {value}
              </span>
              <div className="ab-ov-value-card__glow" aria-hidden="true" />
            </motion.div>
          )
        })}
      </motion.div>
    </motion.section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   OverviewObjectives — numbered timeline-style objective cards
───────────────────────────────────────────────────────────────────────────── */
const OBJ_ICONS = [FiCompass, FiClipboard, FiLink, FiZap]

function OverviewObjectives({ lang }) {
  const t = overviewObjectives[lang] ?? overviewObjectives.en
  const fontFamily = lang === 'si'
    ? "'Noto Sans Sinhala', sans-serif"
    : lang === 'ta'
      ? "'Noto Sans Tamil', sans-serif"
      : 'inherit'

  return (
    <motion.section
      className="ab-ov-objectives"
      variants={fadeUp}
      aria-labelledby="ov-objectives-heading"
    >
      <div className="ab-ov-section-header">
        <p className="ab-ov-section-label" id="ov-objectives-heading" aria-label={t.sectionLabel}>
          {t.sectionLabel}
        </p>
      </div>

      <motion.ol
        className="ab-ov-obj-list"
        variants={stagger(0.08)}
        aria-label={t.sectionLabel}
      >
        {t.items.map((obj, i) => {
          const Icon = OBJ_ICONS[i % OBJ_ICONS.length]
          return (
            <motion.li
              key={i}
              className="ab-ov-obj-card"
              variants={fadeUp}
            >
              <div className="ab-ov-obj-card__left" aria-hidden="true">
                <div className="ab-ov-obj-card__num">{String(i + 1).padStart(2, '0')}</div>
                <div className="ab-ov-obj-card__icon-wrap">
                  <Icon />
                </div>
                {i < t.items.length - 1 && <div className="ab-ov-obj-card__connector" />}
              </div>
              <div className="ab-ov-obj-card__body">
                <p
                  className="ab-ov-obj-card__text"
                  style={{ fontFamily }}
                >
                  {obj}
                </p>
              </div>
            </motion.li>
          )
        })}
      </motion.ol>
    </motion.section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   OverviewAwards — premium showcase cards with image fallback
───────────────────────────────────────────────────────────────────────────── */
function AwardCard({ award, lang }) {
  const [imgError, setImgError] = useState(false)
  const title = award.title[lang] ?? award.title.en
  const desc  = award.desc[lang]  ?? award.desc.en
  const fontFamily = lang === 'si'
    ? "'Noto Sans Sinhala', sans-serif"
    : lang === 'ta'
      ? "'Noto Sans Tamil', sans-serif"
      : 'inherit'

  return (
    <motion.article
      className="ab-award-card"
      variants={fadeUp}
      whileHover={{ y: -6, transition: { duration: 0.24, ease: [0.16, 1, 0.3, 1] } }}
      aria-labelledby={`award-title-${award.id}`}
    >
      <div className="ab-award-card__img-wrap" aria-label={title} role="img">
        <img
          key={award.img}
          src={award.img}
          alt={title}
          className="ab-award-card__img"
          onError={e => { e.currentTarget.style.display = 'none'; setImgError(true) }}
          onLoad={e => { e.currentTarget.style.display = 'block'; setImgError(false) }}
          loading="lazy"
          style={{ display: 'block' }}
        />
        {imgError && (
          <div className="ab-award-card__img-fallback" aria-hidden="true">
            <FiAward className="ab-award-card__img-fallback-icon" />
            <span className="ab-award-card__img-fallback-text">Award Image</span>
          </div>
        )}
        <div className="ab-award-card__year-badge" aria-label={`Year: ${award.year}`}>
          {award.year}
        </div>
      </div>

      <div className="ab-award-card__body">
        <div className="ab-award-card__badge-row" aria-hidden="true">
          <div className="ab-award-card__badge-icon">
            <FiAward />
          </div>
          <div className="ab-award-card__badge-line" />
        </div>
        <h3
          className="ab-award-card__title"
          id={`award-title-${award.id}`}
          style={{ fontFamily: lang !== 'en' ? fontFamily : undefined }}
        >
          {title}
        </h3>
        <p
          className="ab-award-card__desc"
          style={{ fontFamily }}
        >
          {desc}
        </p>
      </div>

      <div className="ab-award-card__glow" aria-hidden="true" />
    </motion.article>
  )
}

function OverviewAwards({ lang }) {
  const sectionLabel = overviewAwards.sectionLabel[lang] ?? overviewAwards.sectionLabel.en

  return (
    <motion.section
      className="ab-ov-awards"
      variants={fadeUp}
      aria-labelledby="ov-awards-heading"
    >
      <div className="ab-ov-section-header">
        <p className="ab-ov-section-label" id="ov-awards-heading" aria-label={sectionLabel}>
          {sectionLabel}
        </p>
      </div>

      <motion.div
        className="ab-ov-awards__grid"
        variants={stagger(0.09)}
        role="list"
        aria-label={sectionLabel}
      >
        {overviewAwards.items.map((award) => (
          <div key={award.id} role="listitem">
            <AwardCard award={award} lang={lang} />
          </div>
        ))}
      </motion.div>
    </motion.section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   Overview multilingual content
───────────────────────────────────────────────────────────────────────────── */
const overviewContent = {
  en: {
    introLabel: 'Introduction',
    introTitle: 'Planning Secretariat of the Southern Province',
    introParagraphs: [
      'The Planning Secretariat of the Southern Province serves as the key provincial institution responsible for the development planning, policy coordination and the strategic management of public investment across the districts of Galle, Matara, and Hambantota. The Secretariat, established under the 13th Amendment of the Constitution which was the Provincial Councils Act, plays a leading role in guiding the socio-economic development of the Southern Province through integrated planning, evidence-based policy formulation, and effective resource allocation throughout the province.',
      'The Secretariat works in close collaboration with provincial ministries, national government agencies, district and divisional administrative bodies, and development partners to formulate, implement, monitor, and evaluate development programs and projects that address the needs and aspirations of the people of the province. Its core responsibilities include the preparation of provincial development plans, appraisal of development proposals, coordination of annual and medium-term investment programs, monitoring project progress, and ensuring alignment with national development priorities and sustainable development goals.',
      'With a multidisciplinary team of professional planners, statisticians, and technical staff, the Planning Secretariat promotes data-driven decision-making approaches and direction for efficient utilization of public resources. The institution also facilitates inter-agency coordination, policy integration, and development research to strengthen good governance and improve service delivery within the province.',
      'Over the years, the Planning Secretariat has made significant contributions to regional development by supporting infrastructure improvement, rural development initiatives, climate adaptation planning, livelihood enhancement programmes, and environmentally sustainable projects. The Secretariat has also played a key role in introducing modern planning approaches, and strengthening project monitoring and evaluation systems.',
      'Committed to transparency, sustainability, and inclusive growth, the Planning Secretariat continues to work towards building a resilient, prosperous, and people-centered province for future generations.',
    ],
    visionLabel: 'Vision',
    visionText: 'Towards a prosperous Southern Province through balanced development.',
    missionLabel: 'Mission',
    missionText: 'To provide support and guidance to the institutions operating in the province to achieve sustainable development by optimally utilizing the limited resources available in the province.',
    imageAlt: 'Southern Province Planning Secretariat office building',
    officialGovt: 'Official Government Content',
    officialGovtSub: 'Official portal for provincial development planning, policy coordination, and institutional oversight.',
  },
  si: {
    introLabel: 'හැඳින්වීම',
    introTitle: 'දකුණු පළාතේ සැලසුම් ලේකම් කාර්යාලය',
    introParagraphs: [
      'දකුණු පළාතේ සැලසුම් ලේකම් කාර්යාලය, ගාල්ල, මාතර සහ හම්බන්තොට යන දිස්ත්‍රික් තුන හරහා සංවර්ධන සැලසුම් කිරීම, ප්‍රතිපත්ති සම්බන්ධීකරණය සහ රාජ්‍ය ආයෝජන කළමනාකරණය සඳහා වගකිව යුතු ප්‍රධාන පළාත් ආයතනය ලෙස සේවය කරයි. ව්‍යවස්ථාවේ 13 වැනි සංශෝධනය වන පළාත් සභා පනත යටතේ ස්ථාපිත කරන ලද මෙම ලේකම් කාර්යාලය, ඒකාබද්ධ සැලසුම් කිරීම, සාක්ෂි මත පදනම් වූ ප්‍රතිපත්ති සකස් කිරීම සහ ඵලදායී සම්පත් වෙන් කිරීම හරහා දකුණු පළාතේ සමාජ-ආර්ථික සංවර්ධනය මෙහෙයවීමේ ප්‍රමුඛ භූමිකාවක් ඉටු කරයි.',
      'ලේකම් කාර්යාලය, පළාත් අමාත්‍යාංශ, ජාතික රජයේ ආයතන, දිස්ත්‍රික් හා ප්‍රාදේශීය පරිපාලන ආයතන සහ සංවර්ධන හවුල්කරුවන් සමඟ සමීප සහයෝගිතාවෙන් ක්‍රියා කරමින් පළාතේ ජනතාගේ අවශ්‍යතා හා අභිලාෂයන් සපුරාලන සංවර්ධන වැඩසටහන් හා ව්‍යාපෘති සකස් කිරීම, ක්‍රියාත්මක කිරීම, අධීක්ෂණය කිරීම සහ ඇගයීම සිදු කරයි. එහි මූලික වගකීම් අතර පළාත් සංවර්ධන සැලසුම් සකස් කිරීම, සංවර්ධන යෝජනා ඇගයීම, වාර්ෂික හා මධ්‍යකාලීන ආයෝජන වැඩසටහන් සම්බන්ධීකරණය, ව්‍යාපෘති ප්‍රගතිය අධීක්ෂණය කිරීම සහ ජාතික සංවර්ධන ප්‍රමුඛතා හා තිරසාර සංවර්ධන ඉලක්ක සමඟ සමතුලිතතාව සහතික කිරීම ඇතුළත් වේ.',
      'වෘත්තීය සැලසුම්කරුවන්, සංඛ්‍යාන විශේෂඥයන් සහ තාක්ෂණික කාර්ය මණ්ඩලයෙන් සමන්විත බහු-විෂය අධ්‍යයන කණ්ඩායමක් සහිතව, සැලසුම් ලේකම් කාර්යාලය රාජ්‍ය සම්පත් ඵලදායිව භාවිතා කිරීම සඳහා දත්ත-ක්‍රමවේදයන් හා දිශාවන් ප්‍රවර්ධනය කරයි. මෙම ආයතනය ද ඒජන්සි අතර සම්බන්ධීකරණය, ප්‍රතිපත්ති ඒකාබද්ධ කිරීම සහ සංවර්ධන පර්යේෂණ සඳහා පහසුකම් සපයමින් පළාත තුළ යහ පාලනය ශක්තිමත් කිරීමට හා සේවා ලබාදීම වැඩිදියුණු කිරීමට ද දායක වේ.',
      'වසර ගණනාවක් පුරා, සැලසුම් ලේකම් කාර්යාලය යටිතල පහසුකම් වැඩිදියුණු කිරීමට, ග්‍රාමීය සංවර්ධන මුලපිරීම්, දේශගුණ අනුවර්තනය සැලසුම් කිරීම, ජීවන ශක්තිය ඉහළ නැංවීමේ වැඩසටහන් සහ පරිසර හිතකාමී ව්‍යාපෘති සඳහා සහාය ලබා දෙමින් ප්‍රාදේශීය සංවර්ධනයට සැලකිය යුතු දායකත්වයක් ලබා දී ඇත. නූතන සැලසුම් ක්‍රමවේද හඳුන්වාදීමේදී සහ ව්‍යාපෘති අධීක්ෂණ හා ඇගයීම් ක්‍රමවේද ශක්තිමත් කිරීමේදී ද ලේකම් කාර්යාලය ප්‍රධාන භූමිකාවක් ඉටු කර ඇත.',
      'විනිවිදභාවය, තිරසාරභාවය සහ ඇතුළත් සංවර්ධනය කෙරෙහි කැපවූ සැලසුම් ලේකම් කාර්යාලය, අනාගත පරම්පරාවන් සඳහා ශක්තිමත්, සෞභාග්‍යමත් සහ ජනතා-කේන්ද්‍රීය පළාතක් ගොඩ නැංවීම සඳහා කටයුතු කිරීම ඉදිරියටත් සිදු කරයි.',
    ],
    visionLabel: 'දැක්ම',
    visionText: 'තුලිත සංවර්ධනය තුළින් සෞභාග්‍යමත් දකුණක් කරා.',
    missionLabel: 'මෙහෙවර',
    missionText: 'පළාතේ ඇති සීමිත සම්පත් ප්‍රශස්ත ලෙස භාවිතා කිරීමෙන් තිරසාර සංවර්ධනයක් අත්කර ගැනීම සඳහා පළාතේ ක්‍රියාත්මක ආයතනවලට සහය ලබා දීම සහ මග පෙන්වීම.',
    imageAlt: 'දකුණු පළාත් සැලසුම් ලේකම් කාර්යාල ගොඩනැගිල්ල',
    officialGovt: 'නිල රජයේ අන්තර්ගතය',
    officialGovtSub: 'පළාත් සංවර්ධන සැලසුම් කිරීම, ප්‍රතිපත්ති සම්බන්ධීකරණය සහ ආයතනික අධීක්ෂණය සඳහා නිල ද්වාරය.',
  },
  ta: {
    introLabel: 'அறிமுகம்',
    introTitle: 'தென் மாகாண திட்டமிடல் செயலகம்',
    introParagraphs: [
      'தென் மாகாண திட்டமிடல் செயலகம், காலி, மாத்தறை மற்றும் ஹம்பாந்தோட்டை என்ற மூன்று மாவட்டங்கள் முழுவதும் வளர்ச்சித் திட்டமிடல், கொள்கை ஒருங்கிணைப்பு மற்றும் பொது முதலீட்டின் மூலோபாய மேலாண்மைக்கு பொறுப்பான முக்கிய மாகாண நிறுவனமாக செயல்படுகிறது. அரசியலமைப்பின் 13ஆவது திருத்தமாகிய மாகாண சபைகள் சட்டத்தின் கீழ் நிறுவப்பட்ட இந்த செயலகம், ஒருங்கிணைந்த திட்டமிடல், சான்று சார்ந்த கொள்கை உருவாக்கம் மற்றும் பயனுள்ள வள ஒதுக்கீடு மூலம் தென் மாகாணத்தின் சமூக-பொருளாதார வளர்ச்சியை வழிநடத்துவதில் முன்னணி பங்கு வகிக்கிறது.',
      'செயலகம், மாகாண அமைச்சகங்கள், தேசிய அரசு நிறுவனங்கள், மாவட்ட மற்றும் பிரிவு நிர்வாக அமைப்புகள் மற்றும் வளர்ச்சி கூட்டாளிகளுடன் நெருங்கிய ஒத்துழைப்புடன் செயல்பட்டு, மாகாண மக்களின் தேவைகள் மற்றும் அபிலாஷைகளை நிறைவேற்றும் வளர்ச்சித் திட்டங்கள் மற்றும் திட்டப்பணிகளை உருவாக்கவும், செயல்படுத்தவும், கண்காணிக்கவும் மற்றும் மதிப்பீடு செய்யவும் பணியாற்றுகிறது. மாகாண வளர்ச்சித் திட்டங்களை தயாரித்தல், வளர்ச்சி முன்மொழிவுகளை மதிப்பீடு செய்தல், வாரிய மற்றும் நடுத்தர கால முதலீட்டு திட்டங்களை ஒருங்கிணைத்தல், திட்டப்பணி முன்னேற்றத்தை கண்காணித்தல் மற்றும் தேசிய வளர்ச்சி முன்னுரிமைகள் மற்றும் நிலையான வளர்ச்சி இலக்குகளுடன் இணைவை உறுதி செய்தல் ஆகியவை இதன் முக்கிய பொறுப்புகளில் அடங்கும்.',
      'தொழில்முறை திட்டமிடல் வல்லுநர்கள், புள்ளியியல் நிபுணர்கள் மற்றும் தொழில்நுட்ப ஊழியர்களை உள்ளடக்கிய பல்துறை குழுவுடன், திட்டமிடல் செயலகம் பொது வளங்களை திறமையாகப் பயன்படுத்துவதற்கான தரவு சார்ந்த முடிவெடுத்தல் அணுகுமுறைகளை மேம்படுத்துகிறது. இந்த நிறுவனம் நிறுவனங்களுக்கிடையிலான ஒருங்கிணைப்பு, கொள்கை ஒருங்கிணைப்பு மற்றும் வளர்ச்சி ஆராய்ச்சிக்கும் வசதிகளை வழங்கி, மாகாணத்தில் நல்லாட்சியை வலுப்படுத்தவும் சேவை வழங்கலை மேம்படுத்தவும் உதவுகிறது.',
      'பல ஆண்டுகளாக, திட்டமிடல் செயலகம் உள்கட்டமைப்பு மேம்பாடு, கிராமப்புற வளர்ச்சி முன்முயற்சிகள், காலநிலை தகவமைப்பு திட்டமிடல், வாழ்வாதார மேம்பாட்டு திட்டங்கள் மற்றும் சுற்றுச்சூழல் நிலையான திட்டப்பணிகளை ஆதரிப்பதன் மூலம் பிராந்திய வளர்ச்சிக்கு குறிப்பிடத்தக்க பங்களிப்புகளை வழங்கியுள்ளது. நவீன திட்டமிடல் அணுகுமுறைகளை அறிமுகப்படுத்துவதிலும், திட்டப்பணி கண்காணிப்பு மற்றும் மதிப்பீட்டு முறைமைகளை வலுப்படுத்துவதிலும் செயலகம் முக்கிய பங்கு வகித்துள்ளது.',
      'வெளிப்படைத்தன்மை, நிலைத்தன்மை மற்றும் உள்ளடக்கிய வளர்ச்சிக்கு அர்ப்பணிக்கப்பட்ட திட்டமிடல் செயலகம், எதிர்கால தலைமுறைகளுக்கு ஒரு நெகிழ்திறன் மிக்க, வளமான மற்றும் மக்கள் மையமான மாகாணத்தை கட்டியெழுப்புவதற்காக தொடர்ந்து பணியாற்றுகிறது.',
    ],
    visionLabel: 'பார்வை',
    visionText: 'சமச்சீரான வளர்ச்சியின் மூலம் ஒரு வளமான தென்பகுதியை நோக்கி.',
    missionLabel: 'நோக்கம்',
    missionText: 'மாகாணத்தில் உள்ள வரையறுக்கப்பட்ட வளங்களை உகந்த முறையில் பயன்படுத்தி, நிலையான வளர்ச்சியை அடைவதற்கு, மாகாணத்தில் செயல்படும் நிறுவனங்களுக்கு ஆதரவும் வழிகாட்டுதலும் வழங்குதல்.',
    imageAlt: 'தென் மாகாண திட்டமிடல் செயலக அலுவலக கட்டிடம்',
    officialGovt: 'அரசு உத்தியோகபூர்வ உள்ளடக்கம்',
    officialGovtSub: 'மாகாண வளர்ச்சித் திட்டமிடல், கொள்கை ஒருங்கிணைப்பு மற்றும் நிறுவன மேற்பார்வைக்கான உத்தியோகபூர்வ போர்டல்.',
  },
}

/* ─────────────────────────────────────────────────────────────────────────────
   OverviewIntro — Image + text two-column introduction
───────────────────────────────────────────────────────────────────────────── */
function OverviewIntro({ t, lang }) {
  const [imgError, setImgError] = useState(false)
  const fontFamily = lang === 'si'
    ? "'Noto Sans Sinhala', sans-serif"
    : lang === 'ta'
      ? "'Noto Sans Tamil', sans-serif"
      : 'inherit'

  return (
    <motion.section
      className="ab-ov-intro"
      variants={fadeUp}
      aria-labelledby="ov-intro-heading"
    >
      {/* Section label */}
      <p className="ab-ov-section-label" aria-hidden="true">{t.introLabel}</p>

      {/* Image — full width above text */}
      <div className="ab-ov-intro__img-col">
        <div className="ab-ov-intro__img-frame" aria-label={t.imageAlt} role="img">
          <img
            src="/branding/office.png"
            alt={t.imageAlt}
            className="ab-ov-intro__img"
            onError={e => { e.currentTarget.style.display = 'none'; setImgError(true) }}
            onLoad={e => { e.currentTarget.style.display = 'block'; setImgError(false) }}
            loading="lazy"
            style={{ display: 'block' }}
          />
          {imgError && (
            <div className="ab-ov-intro__img-fallback" aria-hidden="true">
              <HiOutlineOfficeBuilding className="ab-ov-intro__img-fallback-icon" />
              <span className="ab-ov-intro__img-fallback-text">Southern Province<br />Planning Secretariat</span>
            </div>
          )}
          <div className="ab-ov-intro__img-badge" aria-hidden="true">
            <FiAward className="ab-ov-intro__img-badge-icon" />
            <span>Est. 1978</span>
          </div>
        </div>
      </div>

      {/* Text — full width below image */}
      <div className="ab-ov-intro__text-col">
        <h2
          className="ab-ov-intro__title"
          id="ov-intro-heading"
          style={{ fontFamily: lang !== 'en' ? fontFamily : undefined }}
        >
          {t.introTitle}
        </h2>
        <div className="ab-ov-intro__divider" aria-hidden="true" />
        <div className="ab-ov-intro__paras">
          {t.introParagraphs.map((para, i) => (
            <p
              key={i}
              className="ab-ov-intro__para"
              style={{ fontFamily }}
            >
              {para}
            </p>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   VisionMissionCards — Vision + Mission side by side cards
───────────────────────────────────────────────────────────────────────────── */
function VisionMissionCards({ t, lang }) {
  const fontFamily = lang === 'si'
    ? "'Noto Sans Sinhala', sans-serif"
    : lang === 'ta'
      ? "'Noto Sans Tamil', sans-serif"
      : 'inherit'

  return (
    <motion.div
      className="ab-vm-row"
      variants={stagger(0.1)}
      role="list"
      aria-label="Vision and Mission"
    >
      {/* Vision card */}
      <motion.article
        className="ab-vm-card ab-vm-card--vision"
        variants={fadeUp}
        role="listitem"
        aria-labelledby="vm-vision-title"
      >
        <div className="ab-vm-card__header">
          <div className="ab-vm-card__icon-wrap" aria-hidden="true">
            <FiTarget />
          </div>
          <div className="ab-vm-card__label-group">
            <span className="ab-vm-card__eyebrow" aria-hidden="true">
              {lang === 'si' ? 'දැක්ම' : lang === 'ta' ? 'பார்வை' : 'Vision'}
            </span>
            <h3
              id="vm-vision-title"
              className="ab-vm-card__title"
            >
              {t.visionLabel}
            </h3>
          </div>
        </div>
        <div className="ab-vm-card__sep" aria-hidden="true" />
        <p
          className="ab-vm-card__text"
          style={{ fontFamily }}
        >
          {t.visionText}
        </p>
        <div className="ab-vm-card__glow" aria-hidden="true" />
      </motion.article>

      {/* Mission card */}
      <motion.article
        className="ab-vm-card ab-vm-card--mission"
        variants={fadeUp}
        role="listitem"
        aria-labelledby="vm-mission-title"
      >
        <div className="ab-vm-card__header">
          <div className="ab-vm-card__icon-wrap" aria-hidden="true">
            <FiStar />
          </div>
          <div className="ab-vm-card__label-group">
            <span className="ab-vm-card__eyebrow" aria-hidden="true">
              {lang === 'si' ? 'මෙහෙවර' : lang === 'ta' ? 'நோக்கம்' : 'Mission'}
            </span>
            <h3
              id="vm-mission-title"
              className="ab-vm-card__title"
            >
              {t.missionLabel}
            </h3>
          </div>
        </div>
        <div className="ab-vm-card__sep" aria-hidden="true" />
        <p
          className="ab-vm-card__text"
          style={{ fontFamily }}
        >
          {t.missionText}
        </p>
        <div className="ab-vm-card__glow ab-vm-card__glow--mission" aria-hidden="true" />
      </motion.article>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   OrganizationStructurePage — /about/organization-structure
───────────────────────────────────────────────────────────────────────────── */
function OrganizationStructurePage({ topic }) {
  const lang = useLang()

  return (
    <AboutLayout heroTitle={topic.heroTitle} heroSub={topic.heroSub}>
      <motion.div
        className="ab-content"
        initial="hidden"
        animate="visible"
        variants={stagger(0.08)}
      >
        <OrganizationStructureChart lang={lang} />
      </motion.div>
    </AboutLayout>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   AboutOverviewDashboard — /about and /about/overview
   · No topic section
   · Key Officials panel: visible only on mobile + tablet (hidden on desktop)
───────────────────────────────────────────────────────────────────────────── */
function AboutOverviewDashboard() {
  const lang = useLang()
  const t = overviewContent[lang] ?? overviewContent.en

  return (
    <AboutLayout
      heroTitle="About the Secretariat"
      heroSub="Learn about the Southern Province Planning Secretariat — its structure, history, functions, and key officials."
    >
      <motion.div
        className="ab-ov-shell"
        initial="hidden"
        animate="visible"
        variants={stagger(0.09)}
      >
        {/* ── Introduction section ── */}
        <OverviewIntro t={t} lang={lang} />

        {/* ── Vision & Mission cards ── */}
        <VisionMissionCards t={t} lang={lang} />

        {/* ── Values ── */}
        <OverviewValues lang={lang} />

        {/* ── Awards ── */}
        <OverviewAwards lang={lang} />

        {/* ── Objectives ── */}
        <OverviewObjectives lang={lang} />

        {/* ── Key Officials — mobile + tablet only (hidden on desktop) ── */}
        <motion.section
          className="ab-ov-officials"
          variants={stagger(0.08)}
          aria-labelledby="ov-officials-heading"
        >
          <motion.p
            id="ov-officials-heading"
            className="ab-ov-section-label"
            variants={fadeUp}
          >
            Key Officials
          </motion.p>

          {/* Senior officials row */}
          <motion.div className="ab-ov-officials__row" variants={stagger(0.07)}>
            {KEY_OFFICIALS.map((official) => (
              <motion.div key={official.id} variants={fadeUp}>
                <Link
                  to={official.path}
                  className="ab-ov-official-card"
                  aria-label={`View profile: ${official.position}`}
                >
                  <div className="ab-ov-official-card__avatar" role="img" aria-label={`${official.name} avatar`}>
                    <FiUser aria-hidden="true" />
                  </div>
                  <div className="ab-ov-official-card__body">
                    <span className="ab-ov-official-card__pos">{official.position}</span>
                    <span className="ab-ov-official-card__name">{official.name}</span>
                  </div>
                  <FiChevronRight className="ab-ov-official-card__arrow" aria-hidden="true" />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Deputy Directors grid */}
          <motion.div className="ab-ov-dd-block" variants={fadeUp}>
            <p className="ab-ov-section-label ab-ov-section-label--sub">Planning Team — Deputy Directors</p>
            <div className="ab-ov-dd-grid" role="list" aria-label="Deputy Directors">
              {DEPUTY_DIRECTORS.map((dd) => (
                <div key={dd.id} role="listitem">
                  <Link
                    to={dd.path}
                    className="ab-ov-dd-pill"
                    aria-label={dd.label}
                  >
                    <div className="ab-ov-dd-pill__avatar" aria-hidden="true">
                      <FiUser />
                    </div>
                    <div className="ab-ov-dd-pill__text">
                      <span className="ab-ov-dd-pill__num">{dd.label}</span>
                    </div>
                    <FiChevronRight className="ab-ov-dd-pill__arrow" aria-hidden="true" />
                  </Link>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Glass footer accent */}
          <motion.div className="ab-glass-accent" variants={fadeUp}>
            <div className="ab-glass-accent__icon" aria-hidden="true"><FiShield /></div>
            <div className="ab-glass-accent__content">
              <div className="ab-glass-accent__title">{t.officialGovt}</div>
              <div className="ab-glass-accent__sub">{t.officialGovtSub}</div>
            </div>
          </motion.div>
        </motion.section>

        {/* Glass footer accent — desktop (always visible) */}
        <motion.div className="ab-glass-accent ab-ov-glass-desktop" variants={fadeUp}>
          <div className="ab-glass-accent__icon" aria-hidden="true"><FiShield /></div>
          <div className="ab-glass-accent__content">
            <div className="ab-glass-accent__title">{t.officialGovt}</div>
            <div className="ab-glass-accent__sub">{t.officialGovtSub}</div>
          </div>
        </motion.div>
      </motion.div>
    </AboutLayout>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   About — Root component with all nested routes
───────────────────────────────────────────────────────────────────────────── */
// Wraps a sub-page element — shows ComingSoon if that specific sub-page is on hold
function SubHold({ holdKey, pageKey, children }) {
  const held = usePageHold(holdKey)
  if (held) return <ComingSoon pageKey={pageKey} />
  return children
}

export default function About() {
  const held = usePageHold('about')
  if (held) return <ComingSoon pageKey="about" />

  return (
    <>
      <SeoHead page="about" />
      <Routes>
      {/* Overview dashboard */}
      <Route index element={
        <SubHold holdKey="about__overview" pageKey="about">
          <AboutOverviewDashboard />
        </SubHold>
      } />
      <Route path="overview" element={
        <SubHold holdKey="about__overview" pageKey="about">
          <AboutOverviewDashboard />
        </SubHold>
      } />

      {/* Topic pages */}
      {ABOUT_TOPICS.map((topic) => {
        const topicEl =
          topic.id === 'functions-duties'      ? <FunctionsDutiesPage topic={topic} /> :
          topic.id === 'organization-structure' ? <OrganizationStructurePage topic={topic} /> :
          topic.id === 'history'                ? <AboutLayout heroTitle={topic.heroTitle} heroSub={topic.heroSub}><HistoryPage /></AboutLayout> :
                                                  <AboutContentPage topic={topic} />
        return (
          <Route key={topic.id} path={topic.id} element={
            <SubHold holdKey={`about__${topic.id}`} pageKey="about">
              {topicEl}
            </SubHold>
          } />
        )
      })}

      {/* Key Officials */}
      {KEY_OFFICIALS.map((official) => (
        <Route key={official.id} path={official.id} element={
          <SubHold holdKey={`about__${official.id}`} pageKey="about">
            <OfficialProfilePage official={official} />
          </SubHold>
        } />
      ))}

      {/* Deputy Directors list */}
      <Route path="deputy-directors" element={
        <SubHold holdKey="about__deputy-directors" pageKey="about">
          <DeputyDirectorsListPage />
        </SubHold>
      } />

      {/* Deputy Director individual profiles — held by parent OR individual key */}
      <Route path="deputy-directors/:id" element={
        <SubHold holdKey="about__deputy-directors" pageKey="about">
          <DeputyDirectorProfilePageWrapper />
        </SubHold>
      } />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/about" replace />} />
    </Routes>
    </>
  )
}

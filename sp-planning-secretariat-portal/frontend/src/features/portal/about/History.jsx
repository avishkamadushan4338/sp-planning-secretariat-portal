/* ─────────────────────────────────────────────────────────────────────────────
   History.jsx — Southern Province Planning Secretariat
   Premium 2050-level institutional history page
   Multilingual (EN / SI / TA) · Fully responsive 320px → 4K
───────────────────────────────────────────────────────────────────────────── */
import { useState, useEffect, useMemo, memo } from 'react'
import { motion } from 'framer-motion'
import {
  FiShield, FiUsers, FiAward,
  FiExternalLink, FiCalendar,
} from 'react-icons/fi'
import { HiOutlineOfficeBuilding } from 'react-icons/hi'
import './History.css'

/* ─────────────────────────────────────────────────────────────────────────────
   Motion variants
───────────────────────────────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.44, ease: [0.16, 1, 0.3, 1] } },
}
const stagger = (d = 0.07) => ({
  hidden: {},
  visible: { transition: { staggerChildren: d } },
})
const slideLeft = {
  hidden: { opacity: 0, x: -14 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] } },
}

/* ─────────────────────────────────────────────────────────────────────────────
   useLang hook — reads localStorage 'lang' (same system as About.jsx)
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
   Multilingual data
───────────────────────────────────────────────────────────────────────────── */
const historyData = {
  en: {
    font: "'Plus Jakarta Sans', sans-serif",
    introLabel: 'Institutional History',
    introTitle: 'A Legacy of Planning Excellence',
    introPara1:
      'The Southern Province Planning Secretariat stands as one of Sri Lanka\'s premier provincial planning bodies, established in 1987 following the enactment of the Provincial Council Act No. 42. Since its founding, the Secretariat has served as the central hub for development planning, resource coordination, and policy formulation across the Southern Province.',
    introPara2:
      'Over more than three decades of dedicated public service, the institution has evolved through transformative phases — from its early administrative structure under the Deputy Chief Secretary to the modern, technology-driven governance model it employs today. Its work spans the districts of Galle, Matara, and Hambantota, delivering impactful development plans and rehabilitation programs.',
    tableTitle: 'Past Heads of Division',
    tableName: 'Name',
    tableService: 'Service Period',
    projectsTitle: 'Special Development Projects',
    projectsRead: 'Read More',
    officialGovt: 'Official Government Content',
    officialGovtSub:
      'All information on this page is sourced from the Southern Province Planning Secretariat and is subject to official review before publication.',
    directors: [
      { name: 'Mr. T.G. Jayasinghe', period: '1988 – 1997' },
      { name: 'Mr. H. A. S. Imbulgoda', period: '1997 – 2005' },
      { name: 'Mrs. K. K. Abeywickrama', period: '2005 – 2007' },
      { name: 'Mr. W. Seelarathna de Silva', period: '2007 – 2009' },
      { name: 'Mrs. I. V. N. Preethika Kumuduni', period: '2009 – 2019' },
      { name: 'Mr. S. G. Vidura Prasanna', period: '2019 – 2024' },
      { name: 'Mr. M.K.G.S.P.K. Jayasekara', period: '2025 – Present' },
    ],
    projects: [
      {
        id: 'irdp',
        img: '/projects/irdp.jpg',
        title: 'Integrated Rural Development Project',
        abbr: 'IRDP',
        desc: 'A comprehensive rural development initiative aimed at uplifting rural communities through infrastructure improvements, livelihood support, and community empowerment programmes across the Southern Province.',
        year: '1988 – 1999',
      },
      {
        id: 'spreap',
        img: '/projects/spreap.jpg',
        title: 'SPREAP',
        abbr: 'SPREAP',
        desc: 'Southern Province Rural Economic Advancement Programme — a targeted initiative to promote economic growth and rural enterprise development, strengthening agricultural and small business sectors.',
        year: '2000 – 2010',
      },
      {
        id: 'taarp',
        img: '/projects/taarp.jpg',
        title: 'Tsunami Affected Areas Rehabilitation Project',
        abbr: 'TAARP',
        desc: 'Following the 2004 Indian Ocean Tsunami, TAARP was launched to rehabilitate affected coastal areas. The project restored housing, infrastructure, and livelihoods for thousands of families along the Southern coastline.',
        year: '2005 – 2012',
      },
    ],
  },
  si: {
    font: "'Noto Sans Sinhala', sans-serif",
    introLabel: 'ආයතනික ඉතිහාසය',
    introTitle: 'සැලසුම් විශිෂ්ටතාවයේ උරුමය',
    introPara1:
      'දකුණු පළාත් සැලසුම් ලේකම් කාර්යාලය, 1987 දී පළාත් සභා පනත් අංක 42 ප්‍රකාරව ස්ථාපිත කරන ලද ශ්‍රී ලංකාවේ ප්‍රමුඛ පළාත් සැලසුම් ආයතනයකි. ආරම්භ සිටම, ලේකම් කාර්යාලය දකුණු පළාත පුරා සංවර්ධන සැලසුම්, සම්පත් සම්බන්ධීකරණය සහ ප්‍රතිපත්ති සම්පාදනය සඳහා කේන්ද්‍රීය කේන්ද්‍රයක් ලෙස සේවය කර ඇත.',
    introPara2:
      'දශක තුනකට අධික කාලයක් පුරා, ආයතනය නිළධාරි ප්‍රධාන ලේකම් (සැලසුම්) යටතේ ආරම්භක පරිපාලන ව්‍යුහයේ සිට නවීන, තාක්ෂණ-ප්‍රේරිත රාජ්‍ය පාලන ආකෘතිය දක්වා විකාශනය වී ඇත. එහි කාර්ය ගාල්ල, මාතර සහ හම්බන්තොට දිස්ත්‍රික් ආවරණය කරයි.',
    tableTitle: 'හිටපු අංශ ප්‍රධානීන්',
    tableName: 'නම',
    tableService: 'සේවා කාලය',
    projectsTitle: 'විශේෂ සංවර්ධන ව්‍යාපෘති',
    projectsRead: 'තව කියවන්න',
    officialGovt: 'නිල රජයේ අන්තර්ගතය',
    officialGovtSub:
      'මෙම පිටුවේ ඇති සියලු තොරතුරු දකුණු පළාත් සැලසුම් ලේකම් කාර්යාලයෙන් ලබාගත් ඒවා වන අතර ප්‍රකාශනයට පෙර නිල සමාලෝචනයකට යටත් වේ.',
    directors: [
      { name: 'ටී.ජී. ජයසිංහ මහතා ', period: '1988 – 1997' },
      { name: 'එච්.ඒ.එස්. ඉඹුල්ගොඩ මහතා ', period: '1997 – 2005' },
      { name: 'කේ.කේ. අබේවික්‍රම මහත්මිය ', period: '2005 – 2007' },
      { name: 'ඩබ්. සීලරත්න ද සිල්වා මහතා ', period: '2007 – 2009' },
      { name: 'අයි.වී.එන්. ප්‍රීතිකා කුමුදුනී මහත්මිය', period: '2009 – 2019' },
      { name: 'එස්.ජී. විදුර ප්‍රසන්න මහතා ', period: '2019 – 2024' },
      { name: 'එම්.කේ.ජී.එස්.පී.කේ. ජයසේකර මහතා ', period: '2025 – දැනට' },
    ],
    projects: [
      {
        id: 'irdp',
        img: '/projects/irdp.jpg',
        title: 'ඒකාබද්ධ ග්‍රාමීය සංවර්ධන ව්‍යාපෘතිය',
        abbr: 'IRDP',
        desc: 'දකුණු පළාත පුරා යටිතල පහසුකම් වැඩිදියුණු කිරීම, ජීවිකා සහාය සහ ප්‍රජා සවිබලගැන්වීම හරහා ග්‍රාමීය ප්‍රජාවන් ඔසවා තැබීම සඳහා ව්‍යාපෘතිය.',
        year: '1988 – 1999',
      },
      {
        id: 'spreap',
        img: '/projects/spreap.jpg',
        title: 'SPREAP',
        abbr: 'SPREAP',
        desc: 'දකුණු පළාත් ග්‍රාමීය ආර්ථික ප්‍රගති වැඩසටහන — කෘෂිකර්ම හා කුඩා ව්‍යාපාර අංශ ශක්තිමත් කිරිම, ආර්ථික වර්ධනය ප්‍රවර්ධනය.',
        year: '2000 – 2010',
      },
      {
        id: 'taarp',
        img: '/projects/taarp.jpg',
        title: 'සුනාමි ආපදා ප්‍රදේශ ප්‍රතිසංස්කරණ ව්‍යාපෘතිය',
        abbr: 'TAARP',
        desc: '2004 ඉන්දියන් සාගර සුනාමියෙන් පසු ආපදාවෙන් පීඩිත වෙරළ ප්‍රදේශ ප්‍රතිසංස්කරණය සඳහා TAARP ආරම්භ කරන ලදී.',
        year: '2005 – 2012',
      },
    ],
  },
  ta: {
    font: "'Noto Sans Tamil', sans-serif",
    introLabel: 'நிறுவன வரலாறு',
    introTitle: 'திட்டமிடல் சிறப்பின் மரபு',
    introPara1:
      'தெற்கு மாகாண திட்டமிடல் செயலகம், 1987 ஆம் ஆண்டு மாகாண சபை சட்டம் எண் 42 இன் கீழ் நிறுவப்பட்ட இலங்கையின் முன்னணி மாகாண திட்டமிடல் அமைப்புகளில் ஒன்றாகும். ஆரம்பத்திலிருந்தே, செயலகம் தெற்கு மாகாணம் முழுவதும் வளர்ச்சித் திட்டமிடல், வள ஒருங்கிணைப்பு மற்றும் கொள்கை உருவாக்கத்திற்கான மைய மையமாக செயல்படுகிறது.',
    introPara2:
      'மூன்று தசாப்தங்களுக்கும் மேலான அர்ப்பணிப்பான பொது சேவையில், நிறுவனம் துணை தலைமை செயலர் கீழ் ஆரம்பகால நிர்வாக கட்டமைப்பிலிருந்து நவீன, தொழில்நுட்ப-இயக்கப்படும் ஆட்சி மாதிரி வரை வளர்ந்துள்ளது.',
    tableTitle: 'முன்னாள் துறைத் தலைவர்கள்',
    tableName: 'பெயர்',
    tableService: 'சேவைக் காலம்',
    projectsTitle: 'சிறப்பு வளர்ச்சித் திட்டங்கள்',
    projectsRead: 'மேலும் படிக்க',
    officialGovt: 'அதிகாரப்பூர்வ அரசாங்க உள்ளடக்கம்',
    officialGovtSub:
      'இந்தப் பக்கத்தில் உள்ள அனைத்து தகவல்களும் தெற்கு மாகாண திட்டமிடல் செயலகத்திலிருந்து பெறப்பட்டவை மற்றும் வெளியீட்டிற்கு முன் அதிகாரப்பூர்வ மதிப்பாய்விற்கு உட்படுத்தப்படும்.',
    directors: [
      { name: 'திரு. டி.ஜி. ஜயசிங்க', period: '1988 – 1997' },
      { name: 'திரு. எச்.ஏ.எஸ். இம்புல்கொட', period: '1997 – 2005' },
      { name: 'திருமதி. கே.கே. அபேவிக்கிரம', period: '2005 – 2007' },
      { name: 'திரு. டபிள்யு. சீலரத்ன டி சில்வா', period: '2007 – 2009' },
      { name: 'திருமதி. ஐ.வி.என். பிரீதிகா குமுதுனி', period: '2009 – 2019' },
      { name: 'திரு. எஸ்.ஜி. விதுர பிரசன்னா', period: '2019 – 2024' },
      { name: 'திரு. எம்.கே.ஜி.எஸ்.பி.கே. ஜயசேகர', period: '2025 – தற்போது' },
    ],
    projects: [
      {
        id: 'irdp',
        img: '/projects/irdp.jpg',
        title: 'ஒருங்கிணைந்த கிராமப்புற வளர்ச்சி திட்டம்',
        abbr: 'IRDP',
        desc: 'தெற்கு மாகாணம் முழுவதும் உள்கட்டமைப்பு மேம்பாடு, வாழ்வாதார ஆதரவு மற்றும் சமூக மேம்பாட்டு திட்டங்கள் மூலம் கிராமப்புற சமூகங்களை உயர்த்துவதை நோக்கமாக கொண்ட ஒரு விரிவான திட்டம்.',
        year: '1988 – 1999',
      },
      {
        id: 'spreap',
        img: '/projects/spreap.jpg',
        title: 'SPREAP',
        abbr: 'SPREAP',
        desc: 'தெற்கு மாகாண கிராமப்புற பொருளாதார மேம்பாட்டு திட்டம் — விவசாய மற்றும் சிறு தொழில் துறைகளை வலுப்படுத்துவதற்கான குறிவைக்கப்பட்ட முன்முயற்சி.',
        year: '2000 – 2010',
      },
      {
        id: 'taarp',
        img: '/projects/taarp.jpg',
        title: 'சுனாமி பாதிக்கப்பட்ட பகுதிகள் மறுவாழ்வு திட்டம்',
        abbr: 'TAARP',
        desc: '2004 இந்தியப் பெருங்கடல் சுனாமிக்குப் பிறகு, TAARP பாதிக்கப்பட்ட கடலோரப் பகுதிகளை மறுவாழ்வு செய்ய தொடங்கப்பட்டது.',
        year: '2005 – 2012',
      },
    ],
  },
}

/* ─────────────────────────────────────────────────────────────────────────────
   Section 1 — Intro
───────────────────────────────────────────────────────────────────────────── */
const HistoryIntro = memo(function HistoryIntro({ t }) {
  const isNonLatin = t.font !== "'Plus Jakarta Sans', sans-serif"
  return (
    <motion.section
      className="hist-intro"
      variants={stagger(0.09)}
      initial="hidden"
      animate="visible"
      aria-labelledby="hist-intro-heading"
    >
      <motion.div className="hist-section-label" variants={fadeUp}>
        <span className="hist-section-label__dot" aria-hidden="true" />
        <span style={{ fontFamily: isNonLatin ? t.font : undefined }}>
          {t.introLabel}
        </span>
      </motion.div>

      <motion.div className="hist-intro-card" variants={fadeUp}>
        <div className="hist-intro-card__accent" aria-hidden="true" />
        <div className="hist-intro-card__inner">
          <div className="hist-intro-card__icon-wrap" aria-hidden="true">
            <HiOutlineOfficeBuilding />
          </div>
          <div className="hist-intro-card__body">
            <h2
              id="hist-intro-heading"
              className="hist-intro-card__title"
              style={{ fontFamily: isNonLatin ? t.font : undefined }}
            >
              {t.introTitle}
            </h2>
            <div className="hist-intro-card__rule" aria-hidden="true" />
            <p className="hist-intro-card__text" style={{ fontFamily: t.font }}>
              {t.introPara1}
            </p>
            <p className="hist-intro-card__text" style={{ fontFamily: t.font }}>
              {t.introPara2}
            </p>
          </div>
        </div>
        <div className="hist-intro-card__ornament" aria-hidden="true">
          <svg viewBox="0 0 80 80" fill="none" width="80" height="80">
            <circle cx="40" cy="40" r="36" stroke="rgba(199,154,43,0.18)" strokeWidth="1.5" strokeDasharray="4 6" />
            <circle cx="40" cy="40" r="24" stroke="rgba(199,154,43,0.12)" strokeWidth="1" />
            <circle cx="40" cy="40" r="10" fill="rgba(199,154,43,0.08)" />
          </svg>
        </div>
      </motion.div>

      <motion.div className="hist-stat-strip" variants={stagger(0.07)} role="list" aria-label="Key facts">
        {[
          { icon: <FiCalendar />, label: 'Established', value: '1987' },
          { icon: <HiOutlineOfficeBuilding />, label: 'Province', value: 'Southern' },
          { icon: <FiUsers />, label: 'Districts', value: '3' },
          { icon: <FiAward />, label: 'Years of Service', value: '37+' },
        ].map((s) => (
          <motion.div className="hist-stat-card" key={s.label} variants={slideLeft} role="listitem">
            <div className="hist-stat-card__icon" aria-hidden="true">{s.icon}</div>
            <div className="hist-stat-card__value">{s.value}</div>
            <div className="hist-stat-card__label">{s.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
})

/* ─────────────────────────────────────────────────────────────────────────────
   Section 2 — Past Directors Table
───────────────────────────────────────────────────────────────────────────── */
const HistoryDirectorsTable = memo(function HistoryDirectorsTable({ t }) {
  const isNonLatin = t.font !== "'Plus Jakarta Sans', sans-serif"
  return (
    <motion.section
      className="hist-directors-section"
      aria-labelledby="hist-directors-heading"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={stagger(0.08)}
    >
      <motion.div className="hist-section-label" variants={fadeUp}>
        <span className="hist-section-label__dot" aria-hidden="true" />
        <span
          id="hist-directors-heading"
          style={{ fontFamily: isNonLatin ? t.font : undefined }}
        >
          {t.tableTitle}
        </span>
      </motion.div>

      <motion.div className="hist-directors-card" variants={fadeUp}>
        {/* Desktop/tablet table */}
        <div className="hist-directors-table-wrap">
          <table className="hist-directors-table" aria-label={t.tableTitle}>
            <thead>
              <tr>
                <th scope="col" className="hist-directors-table__th hist-directors-table__th--num">#</th>
                <th scope="col" className="hist-directors-table__th">{t.tableName}</th>
                <th scope="col" className="hist-directors-table__th">{t.tableService}</th>
              </tr>
            </thead>
            <tbody>
              {t.directors.map((d, i) => (
                <tr key={i} className="hist-directors-table__row" tabIndex={0}>
                  <td className="hist-directors-table__td hist-directors-table__td--num">{i + 1}</td>
                  <td
                    className="hist-directors-table__td hist-directors-table__td--name"
                    style={{ fontFamily: isNonLatin ? t.font : undefined }}
                  >
                    {d.name}
                  </td>
                  <td className="hist-directors-table__td hist-directors-table__td--period">
                    {d.period}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards — shown via CSS below 600px */}
        <ul className="hist-directors-cards" aria-label={t.tableTitle}>
          {t.directors.map((d, i) => (
            <li key={i} className="hist-directors-card-item" tabIndex={0}>
              <div className="hist-directors-card-item__num">{i + 1}</div>
              <div className="hist-directors-card-item__body">
                <div
                  className="hist-directors-card-item__name"
                  style={{ fontFamily: isNonLatin ? t.font : undefined }}
                >
                  {d.name}
                </div>
                <div className="hist-directors-card-item__period">
                  <FiCalendar aria-hidden="true" style={{ flexShrink: 0 }} />
                  {d.period}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.section>
  )
})

/* ─────────────────────────────────────────────────────────────────────────────
   Section 3 — Special Projects
───────────────────────────────────────────────────────────────────────────── */
function ProjectCard({ project, t, isNonLatin }) {
  const [imgErr, setImgErr] = useState(false)
  return (
    <motion.div
      className="hist-project-card"
      variants={fadeUp}
      tabIndex={0}
      aria-label={project.title}
    >
      <div className="hist-project-card__img-wrap" aria-hidden="true">
        {!imgErr ? (
          <img
            src={project.img}
            alt={project.title}
            className="hist-project-card__img"
            onError={() => setImgErr(true)}
            loading="lazy"
          />
        ) : (
          <div className="hist-project-card__img-placeholder">
            <FiAward className="hist-project-card__placeholder-icon" aria-hidden="true" />
            <span className="hist-project-card__placeholder-abbr">{project.abbr}</span>
          </div>
        )}
        <div className="hist-project-card__img-overlay" aria-hidden="true" />
      </div>
      <div className="hist-project-card__body">
        <div className="hist-project-card__year">{project.year}</div>
        <h3
          className="hist-project-card__title"
          style={{ fontFamily: isNonLatin ? t.font : undefined }}
        >
          {project.title}
        </h3>
        <p className="hist-project-card__desc" style={{ fontFamily: t.font }}>
          {project.desc}
        </p>
        <button
          className="hist-project-card__btn"
          aria-label={`${t.projectsRead}: ${project.title}`}
        >
          {t.projectsRead}
          <FiExternalLink aria-hidden="true" />
        </button>
      </div>
      <div className="hist-project-card__glow" aria-hidden="true" />
    </motion.div>
  )
}

const HistoryProjects = memo(function HistoryProjects({ t }) {
  const isNonLatin = t.font !== "'Plus Jakarta Sans', sans-serif"
  return (
    <motion.section
      className="hist-projects-section"
      aria-labelledby="hist-projects-heading"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={stagger(0.09)}
    >
      <motion.div className="hist-section-label" variants={fadeUp}>
        <span className="hist-section-label__dot" aria-hidden="true" />
        <span
          id="hist-projects-heading"
          style={{ fontFamily: isNonLatin ? t.font : undefined }}
        >
          {t.projectsTitle}
        </span>
      </motion.div>

      <motion.div className="hist-projects-grid" variants={stagger(0.09)}>
        {t.projects.map((p) => (
          <ProjectCard key={p.id} project={p} t={t} isNonLatin={isNonLatin} />
        ))}
      </motion.div>
    </motion.section>
  )
})

/* ─────────────────────────────────────────────────────────────────────────────
   HistoryPage — root export (used from About.jsx)
───────────────────────────────────────────────────────────────────────────── */
export default function HistoryPage() {
  const lang = useLang()
  const t = useMemo(() => historyData[lang] ?? historyData.en, [lang])

  return (
    <motion.div
      className="hist-content"
      initial="hidden"
      animate="visible"
      variants={stagger(0.06)}
    >
      <HistoryIntro t={t} />
      <HistoryDirectorsTable t={t} />
      {/* Special Development Projects — hidden, do not remove */}
      {false && <HistoryProjects t={t} />}

      <motion.div className="ab-glass-accent" variants={fadeUp}>
        <div className="ab-glass-accent__icon" aria-hidden="true">
          <FiShield />
        </div>
        <div className="ab-glass-accent__content">
          <div className="ab-glass-accent__title">{t.officialGovt}</div>
          <div className="ab-glass-accent__sub">{t.officialGovtSub}</div>
        </div>
      </motion.div>
    </motion.div>
  )
}

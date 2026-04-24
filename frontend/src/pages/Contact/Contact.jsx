import { motion } from 'framer-motion'
import { useState, useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import {
  FiMail, FiPhone, FiMapPin, FiSearch, FiSend, FiClock,
  FiExternalLink, FiCheckCircle, FiAlertCircle, FiChevronDown,
  FiUser, FiMessageSquare,
} from 'react-icons/fi'
import { HiOutlineOfficeBuilding } from 'react-icons/hi'
import { useInView } from 'react-intersection-observer'
import './Contact.css'

const MAROON = '#4A0918'
const GOLD   = '#C79A2B'
const CREAM  = '#FCFBFA'
const DEEP   = '#2A0510'

/* ── Language meta ──────────────────────────────────────────────────────── */
const LANG_META = {
  en: { font: 'Inter, sans-serif',                headFont: "'Playfair Display', Georgia, serif", isNonLatin: false },
  si: { font: "'Noto Sans Sinhala', sans-serif",  headFont: "'Noto Sans Sinhala', sans-serif",   isNonLatin: true  },
  ta: { font: "'Noto Sans Tamil', sans-serif",    headFont: "'Noto Sans Tamil', sans-serif",     isNonLatin: true  },
}

/* ── Translations ───────────────────────────────────────────────────────── */
const T = {
  en: {
    heroAccent:   'Planning Secretariat – Southern Province',
    pageTitle:    'Contact Us',
    pageSub:      'We are here to help. Reach out through any of the channels below.',
    mapTitle:     'Find Our Office',
    mapSub:       'Planning Secretariat – Southern Province Headquarters',
    mapAddress:   '153B, S.H. Dahanayaka Mawatha, Galle, Sri Lanka.',
    mapPhone:     '+94 91 222 5878',
    mapFax:       '+94 91 222 5897',
    mapEmail:     'info@splanning.gov.lk',
    mapHours:     'Monday – Friday: 8:30 AM – 4:30 PM',
    mapHoursLbl:  'Office Hours',
    mapDirections:'Get Directions',
    dirTitle:     'Telephone Directory',
    dirSub:       'Direct contact numbers for all divisions and departments',
    dirSearch:    'Search department or division…',
    dirDept:      'Department / Division',
    dirExt:       'Ext.',
    dirPhone:     'Direct Line',
    dirEmail:     'Email',
    dirEmpty:     'No departments match your search.',
    frmTitle:     'Complaint & Feedback',
    frmSub:       'Submit your complaint, suggestion, or inquiry. We respond within 3 working days.',
    frmName:      'Full Name',
    frmNamePh:    'Enter your full name',
    frmEmail:     'Email Address',
    frmEmailPh:   'Enter your email address',
    frmPhone:     'Contact Number',
    frmPhonePh:   '+94 77 123 4567 (optional)',
    frmType:      'Type of Request',
    frmTypes:     ['Complaint', 'Suggestion', 'General Inquiry', 'Service Feedback', 'Right to Information (RTI)'],
    frmDept:      'Related Department',
    frmDeptDef:   'Select department (optional)',
    frmSubject:   'Subject',
    frmSubjectPh: 'Brief subject of your message',
    frmMsg:       'Message',
    frmMsgPh:     'Describe your complaint or feedback in detail (minimum 20 characters)…',
    frmSubmit:    'Send Message',
    frmNote:      'Sent to: info@splanning.gov.lk',
    frmSuccess:   'Your email client has opened with a pre-filled message. Please review and send it to complete your submission.',
    frmErrName:   'Full name is required.',
    frmErrEmail:  'A valid email address is required.',
    frmErrSubj:   'Subject is required.',
    frmErrMsg:    'Message must be at least 20 characters.',
  },
  si: {
    heroAccent:   'දකුණු පළාත් සැලසුම් ලේකම් කාර්යාලය',
    pageTitle:    'අප අමතන්න',
    pageSub:      'ඔබට ආධාර කිරීමට අපි සූදානම්. පහත ඕනෑම නාලිකාවක් හරහා අප හා සම්බන්ධ වන්න.',
    mapTitle:     'අපගේ කාර්යාලය සොයා ගන්න',
    mapSub:       'දකුණු පළාත් සැලසුම් ලේකම් ප්‍රධාන කාර්යාලය',
    mapAddress:   '153B, එස්.එච්. දහනායක මාවත, ගාල්ල, ශ්‍රී ලංකාව.',
    mapPhone:     '+94 91 222 5878',
    mapFax:       '+94 91 222 5897',
    mapEmail:     'info@splanning.gov.lk',
    mapHours:     'සඳු – සිකු: 8:30 – 16:30',
    mapHoursLbl:  'කාර්යාල වේලාවන්',
    mapDirections:'මාර්ගය ලබා ගන්න',
    dirTitle:     'දූරකථන නාමාවලිය',
    dirSub:       'සියලු අංශ හා දෙපාර්තමේන්තු සඳහා සෘජු සම්බන්ධතා අංක',
    dirSearch:    'අංශය සොයන්න…',
    dirDept:      'දෙපාර්තමේන්තුව / අංශය',
    dirExt:       'දිගු.',
    dirPhone:     'සෘජු රේඛාව',
    dirEmail:     'ඊමේල්',
    dirEmpty:     'ගැළපෙන අංශ හමු නොවීය.',
    frmTitle:     'පැමිණිලි හා ප්‍රතිපෝෂණ',
    frmSub:       'ඔබගේ පැමිණිල්ල, යෝජනාව හෝ විමසුම ඉදිරිපත් කරන්න. කාර්යාල දිනයන් 3ක් ඇතුළත ප්‍රතිචාර දනවන්නෙමු.',
    frmName:      'සම්පූර්ණ නම',
    frmNamePh:    'ඔබේ සම්පූර්ණ නම ඇතුළු කරන්න',
    frmEmail:     'විද්‍යුත් ලිපිනය',
    frmEmailPh:   'ඔබේ විද්‍යුත් ලිපිනය ඇතුළු කරන්න',
    frmPhone:     'සම්බන්ධතා අංකය',
    frmPhonePh:   '+94 77 123 4567 (අත්‍යවශ්‍ය නොවේ)',
    frmType:      'ඉල්ලීමේ වර්ගය',
    frmTypes:     ['පැමිණිල්ල', 'යෝජනාව', 'සාමාන්‍ය විමසුම', 'සේවා ප්‍රතිපෝෂණ', 'තොරතුරු ලබා ගැනීමේ අයිතිය (RTI)'],
    frmDept:      'සම්බන්ධිත අංශය',
    frmDeptDef:   'අංශයක් තෝරන්න (අත්‍යවශ්‍ය නොවේ)',
    frmSubject:   'විෂය',
    frmSubjectPh: 'ඔබේ පණිවිඩයේ කෙටි විෂයය',
    frmMsg:       'පණිවිඩය',
    frmMsgPh:     'ඔබේ පැමිණිල්ල හෝ ප්‍රතිපෝෂණය විස්තරාත්මකව ලියන්න (අවම අකුරු 20)…',
    frmSubmit:    'පණිවිඩය යවන්න',
    frmNote:      'යවනු ලබන්නේ: info@splanning.gov.lk',
    frmSuccess:   'ඔබේ ඊමේල් සේවාලාභිය ස්වයංක්‍රීයව කලින් සකස් කළ පණිවිඩය සමඟ විවෘත කර ඇත. ඔබේ ඉදිරිපත් කිරීම සම්පූර්ණ කිරීමට ඊමේලය යවන්න.',
    frmErrName:   'සම්පූර්ණ නම අවශ්‍ය වේ.',
    frmErrEmail:  'වලංගු විද්‍යුත් ලිපිනයක් අවශ්‍ය වේ.',
    frmErrSubj:   'විෂය අවශ්‍ය වේ.',
    frmErrMsg:    'පණිවිඩය අවම අකුරු 20 ක් විය යුතුය.',
  },
  ta: {
    heroAccent:   'தென் மாகாண திட்டமிடல் செயலகம்',
    pageTitle:    'தொடர்பு கொள்ளுங்கள்',
    pageSub:      'நாங்கள் உங்களுக்கு உதவ இங்கே இருக்கிறோம். கீழேயுள்ள ஏதேனும் ஒரு வழிமுறை மூலம் எங்களை தொடர்பு கொள்ளுங்கள்.',
    mapTitle:     'எங்கள் அலுவலகத்தை கண்டுபிடியுங்கள்',
    mapSub:       'தென் மாகாண திட்டமிடல் செயலக தலைமையகம்',
    mapAddress:   '153B, எஸ்.எச். தஹநாயக மாவத்தை, காலி, இலங்கை.',
    mapPhone:     '+94 91 222 5878',
    mapFax:       '+94 91 222 5897',
    mapEmail:     'info@splanning.gov.lk',
    mapHours:     'திங்கள் – வெள்ளி: 8:30 மு.ப – 4:30 பி.ப',
    mapHoursLbl:  'அலுவலக நேரம்',
    mapDirections:'வழிகாட்டுதல் பெறுங்கள்',
    dirTitle:     'தொலைபேசி அடைவு',
    dirSub:       'அனைத்து பிரிவுகள் மற்றும் திணைக்களங்களுக்கான நேரடி தொடர்பு எண்கள்',
    dirSearch:    'பிரிவை தேடுங்கள்…',
    dirDept:      'திணைக்களம் / பிரிவு',
    dirExt:       'நீட்.',
    dirPhone:     'நேரடி இணைப்பு',
    dirEmail:     'மின்னஞ்சல்',
    dirEmpty:     'பொருந்தும் திணைக்களங்கள் இல்லை.',
    frmTitle:     'புகார் & கருத்து',
    frmSub:       'உங்கள் புகார், ஆலோசனை அல்லது விசாரணையை சமர்ப்பியுங்கள். 3 வேலை நாட்களுக்குள் பதிலளிப்போம்.',
    frmName:      'முழு பெயர்',
    frmNamePh:    'உங்கள் முழு பெயரை உள்ளிடுங்கள்',
    frmEmail:     'மின்னஞ்சல் முகவரி',
    frmEmailPh:   'உங்கள் மின்னஞ்சல் முகவரியை உள்ளிடுங்கள்',
    frmPhone:     'தொடர்பு எண்',
    frmPhonePh:   '+94 77 123 4567 (விருப்பமானது)',
    frmType:      'கோரிக்கையின் வகை',
    frmTypes:     ['புகார்', 'ஆலோசனை', 'பொது விசாரணை', 'சேவை கருத்து', 'தகவல் உரிமை (RTI)'],
    frmDept:      'தொடர்புடைய பிரிவு',
    frmDeptDef:   'ஒரு பிரிவை தேர்ந்தெடுக்கவும் (விருப்பமானது)',
    frmSubject:   'விஷயம்',
    frmSubjectPh: 'உங்கள் செய்தியின் சுருக்கமான விஷயம்',
    frmMsg:       'செய்தி',
    frmMsgPh:     'உங்கள் புகார் அல்லது கருத்தை விரிவாக விளக்குங்கள் (குறைந்தது 20 எழுத்துக்கள்)…',
    frmSubmit:    'செய்தி அனுப்புங்கள்',
    frmNote:      'அனுப்பப்படும்: info@splanning.gov.lk',
    frmSuccess:   'உங்கள் மின்னஞ்சல் கிளையன்ட் முன்-நிரப்பப்பட்ட செய்தியுடன் திறக்கப்பட்டது. உங்கள் சமர்ப்பிப்பை முடிக்க அதை அனுப்புங்கள்.',
    frmErrName:   'முழு பெயர் தேவை.',
    frmErrEmail:  'சரியான மின்னஞ்சல் முகவரி தேவை.',
    frmErrSubj:   'விஷயம் தேவை.',
    frmErrMsg:    'செய்தி குறைந்தது 20 எழுத்துக்கள் இருக்க வேண்டும்.',
  },
}

/* ── Telephone directory data ───────────────────────────────────────────── */
const DIRECTORY = [
  { en: 'Office of the Provincial Secretary',                si: 'පළාත් ලේකම් කාර්යාලය',                           ta: 'மாகாண செயலாளர் அலுவலகம்',                ext: '101', phone: '+94 91 222 5878', email: 'secretary@splanning.gov.lk' },
  { en: 'Development Planning Division',                    si: 'සංවර්ධන සැලසුම් අංශය',                          ta: 'வளர்ச்சி திட்டமிடல் பிரிவு',             ext: '102', phone: '+94 91 222 5879', email: 'planning@splanning.gov.lk' },
  { en: 'Statistics & Research Division',                   si: 'සංඛ්‍යාලේඛන හා පර්යේෂණ අංශය',                  ta: 'புள்ளியியல் & ஆராய்ச்சி பிரிவு',         ext: '103', phone: '+94 91 222 5880', email: 'statistics@splanning.gov.lk' },
  { en: 'Monitoring & Evaluation Division',                 si: 'අධීක්ෂණ හා ඇගයුම් අංශය',                        ta: 'கண்காணிப்பு & மதிப்பீட்டு பிரிவு',       ext: '104', phone: '+94 91 222 5881', email: 'monitoring@splanning.gov.lk' },
  { en: 'Finance Division',                                 si: 'මූල්‍ය අංශය',                                   ta: 'நிதி பிரிவு',                            ext: '105', phone: '+94 91 222 5882', email: 'finance@splanning.gov.lk' },
  { en: 'Human Resources Division',                         si: 'මානව සම්පත් අංශය',                              ta: 'மனித வளங்கள் பிரிவு',                    ext: '106', phone: '+94 91 222 5883', email: 'hr@splanning.gov.lk' },
  { en: 'Information & Communication Technology Division',  si: 'තොරතුරු හා සන්නිවේදන තාක්ෂණ අංශය',             ta: 'ICT பிரிவு',                              ext: '107', phone: '+94 91 222 5884', email: 'ict@splanning.gov.lk' },
  { en: 'Project Implementation Division',                  si: 'ව්‍යාපෘති ක්‍රියාත්මක කිරීමේ අංශය',            ta: 'திட்ட செயல்படுத்தல் பிரிவு',             ext: '108', phone: '+94 91 222 5885', email: 'projects@splanning.gov.lk' },
  { en: 'Infrastructure Development Division',              si: 'යටිතල පහසුකම් සංවර්ධන අංශය',                    ta: 'உள்கட்டமைப்பு வளர்ச்சி பிரிவு',          ext: '109', phone: '+94 91 222 5886', email: 'infra@splanning.gov.lk' },
  { en: 'Social Services & Community Development Division', si: 'සමාජ සේවා හා ප්‍රජා සංවර්ධන අංශය',             ta: 'சமூக சேவைகள் & சமூக வளர்ச்சி பிரிவு',   ext: '110', phone: '+94 91 222 5887', email: 'social@splanning.gov.lk' },
  { en: 'Environmental Planning Division',                  si: 'පාරිසරික සැලසුම් අංශය',                         ta: 'சுற்றுச்சூழல் திட்டமிடல் பிரிவு',        ext: '111', phone: '+94 91 222 5888', email: 'environment@splanning.gov.lk' },
  { en: 'Legal Affairs Division',                           si: 'නීති කටයුතු අංශය',                              ta: 'சட்ட விவகாரங்கள் பிரிவு',                ext: '112', phone: '+94 91 222 5889', email: 'legal@splanning.gov.lk' },
  { en: 'Public Relations & Media Division',                si: 'මහජන සම්බන්ධතා හා මාධ්‍ය අංශය',                ta: 'பொது உறவுகள் & ஊடக பிரிவு',             ext: '113', phone: '+94 91 222 5890', email: 'media@splanning.gov.lk' },
  { en: 'Procurement & Supply Division',                    si: 'ප්‍රසම්පාදන හා සැපයුම් අංශය',                   ta: 'கொள்முதல் & விநியோக பிரிவு',             ext: '114', phone: '+94 91 222 5891', email: 'procurement@splanning.gov.lk' },
]

/* ── Shared animation variant ───────────────────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

/* ════════════════════════════════════════════════════════════════════════
   Main page
════════════════════════════════════════════════════════════════════════ */
export default function Contact() {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en')
  const location = useLocation()

  useEffect(() => {
    const h = (e) => setLang(e.detail || 'en')
    window.addEventListener('langChange', h)
    return () => window.removeEventListener('langChange', h)
  }, [])

  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.slice(1)
    const timer = setTimeout(() => {
      const el = document.getElementById(id)
      if (!el) return
      const top = el.getBoundingClientRect().top + window.scrollY - 90
      window.scrollTo({ top, behavior: 'smooth' })
    }, 150)
    return () => clearTimeout(timer)
  }, [location.hash])

  const meta = LANG_META[lang] || LANG_META.en
  const t    = T[lang]         || T.en

  return (
    <div style={{ background: CREAM, minHeight: '100vh' }}>
      <PageHero t={t} meta={meta} />
      <div id="find-office"><MapSection t={t} meta={meta} /></div>
      <div id="contact-info"><DirectorySection t={t} meta={meta} lang={lang} /></div>
      <div id="feedback"><ComplaintForm t={t} meta={meta} lang={lang} /></div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════════
   Page hero
════════════════════════════════════════════════════════════════════════ */
function PageHero({ t, meta }) {
  return (
    <section
      className="contact-hero"
      style={{
        background: `linear-gradient(135deg, ${DEEP} 0%, ${MAROON} 55%, #6E1024 100%)`,
        position: 'relative', overflow: 'hidden',
        paddingTop: 'clamp(3rem,8vw,5rem)',
        paddingBottom: 'clamp(2.5rem,6vw,4rem)',
      }}
    >
      {/* Honeycomb texture */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.06, pointerEvents: 'none' }}>
        <HoneycombBg />
      </div>

      {/* Gold arc bottom */}
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none"
        style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 60, display: 'block' }}>
        <path d="M0,60 Q360,10 720,30 Q1080,50 1440,15 L1440,60 Z" fill={CREAM} />
      </svg>

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 1.5rem' }}>
        {/* Gold badge */}
        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: '1rem' }}
        >
          <span style={{ display: 'block', width: 32, height: 1.5, background: GOLD, borderRadius: 2 }} />
          <span style={{
            fontFamily: meta.isNonLatin ? meta.font : "'Cinzel', serif",
            fontSize: 'clamp(0.62rem, 1.1vw, 0.75rem)',
            color: GOLD, fontWeight: 600,
            letterSpacing: meta.isNonLatin ? 0 : '0.08em',
            textTransform: meta.isNonLatin ? 'none' : 'uppercase',
          }}>
            {t.heroAccent}
          </span>
          <span style={{ display: 'block', width: 32, height: 1.5, background: GOLD, borderRadius: 2 }} />
        </motion.div>

        {/* Page title */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: meta.headFont,
            fontSize: 'clamp(2rem, 5vw, 3.4rem)',
            fontWeight: 800, color: '#fff',
            lineHeight: meta.isNonLatin ? 1.4 : 1.12,
            marginBottom: '0.75rem',
          }}
        >
          {t.pageTitle}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.17, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: meta.font,
            fontSize: 'clamp(0.88rem, 1.5vw, 1.05rem)',
            color: 'rgba(252,251,250,0.75)',
            maxWidth: 540, margin: '0 auto',
            lineHeight: 1.8,
          }}
        >
          {t.pageSub}
        </motion.p>

        {/* Quick contact chips */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.28 }}
          className="contact-chips"
        >
          <a href={`tel:${t.mapPhone}`} className="contact-chip">
            <FiPhone size={13} style={{ color: GOLD }} />
            <span style={{ fontFamily: meta.font }}>{t.mapPhone}</span>
          </a>
          <a href={`mailto:${t.mapEmail}`} className="contact-chip">
            <FiMail size={13} style={{ color: GOLD }} />
            <span style={{ fontFamily: meta.font }}>{t.mapEmail}</span>
          </a>
          <div className="contact-chip">
            <FiClock size={13} style={{ color: GOLD }} />
            <span style={{ fontFamily: meta.font }}>{t.mapHours}</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════════════
   Map section
════════════════════════════════════════════════════════════════════════ */
function MapSection({ t, meta }) {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })

  return (
    <section ref={ref} style={{ background: CREAM, padding: 'clamp(3rem,7vw,5rem) 0' }}>
      <div className="section-container">
        {/* Section header */}
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          style={{ textAlign: 'center', marginBottom: 'clamp(1.5rem,3vw,2.5rem)' }}>
          <SectionLabel icon={<FiMapPin size={14} />} meta={meta}>{t.mapTitle}</SectionLabel>
          <h2 style={{
            fontFamily: meta.headFont,
            fontSize: 'clamp(1.5rem,3.2vw,2.2rem)',
            fontWeight: 800, color: MAROON,
            lineHeight: meta.isNonLatin ? 1.45 : 1.2,
            marginBottom: '0.4rem',
          }}>{t.mapTitle}</h2>
          <p style={{ fontFamily: meta.font, fontSize: '0.92rem', color: '#6B3545' }}>{t.mapSub}</p>
        </motion.div>

        {/* Two-column layout */}
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          transition={{ delay: 0.1 }}
          className="map-grid"
        >
          {/* Info panel */}
          <div className="map-info-panel" style={{ background: `linear-gradient(150deg, ${MAROON}, ${DEEP})` }}>
            {/* Logo / crest */}
            <div style={{ marginBottom: '1.5rem' }}>
              <img src="/branding/f-logo.svg" alt="Logo"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
                style={{ height: 120, opacity: 0.9 }} />
            </div>

            <InfoRow icon={<FiMapPin size={16} />} label={t.mapAddress} meta={meta} />
            <InfoRow icon={<FiPhone size={16} />}  label={t.mapPhone}   meta={meta} href={`tel:${t.mapPhone}`} />
            <InfoRow icon={<FiPhone size={16} />}  label={`Fax: ${t.mapFax}`} meta={meta} />
            <InfoRow icon={<FiMail size={16} />}   label={t.mapEmail}   meta={meta} href={`mailto:${t.mapEmail}`} />

            <div style={{
              marginTop: '1.25rem',
              padding: '0.75rem 1rem',
              background: 'rgba(199,154,43,0.12)',
              border: '1px solid rgba(199,154,43,0.3)',
              borderRadius: 10,
            }}>
              <p style={{ fontFamily: meta.font, fontSize: '0.9rem', color: GOLD, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 4 }}>
                {t.mapHoursLbl}
              </p>
              <p style={{ fontFamily: meta.font, fontSize: '1.1rem', color: 'rgba(252,251,250,0.9)' }}>
                {t.mapHours}
              </p>
            </div>

            <a
              href="https://www.google.com/maps/place/Planning+Secretariat+Southern+Province/@6.0454187,80.2060789,18.45z/data=!4m6!3m5!1s0x3ae173fb2f6cce29:0x496be10f9a8fef84!8m2!3d6.0454558!4d80.2072194!16s%2Fg%2F11j9cdfv3b"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                marginTop: '1.5rem',
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '10px 20px', borderRadius: 8,
                background: GOLD, color: '#fff',
                fontFamily: meta.font, fontWeight: 600,
                fontSize: '1.1rem', textDecoration: 'none',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              <FiExternalLink size={14} />
              {t.mapDirections}
            </a>
          </div>

          {/* Map embed */}
          <div className="map-embed-wrap">
            <iframe
              title="Office Location"
              src="https://maps.google.com/maps?q=6.0454558,80.2072194&z=18&output=embed"
              style={{ width: '100%', height: '100%', border: 0, minHeight: 360 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function InfoRow({ icon, label, meta, href }) {
  const content = (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: '0.9rem' }}>
      <span style={{ color: GOLD, marginTop: 2, flexShrink: 0 }}>{icon}</span>
      <span style={{
        fontFamily: meta.font,
        fontSize: '1.1rem',
        color: 'rgba(252,251,250,0.85)',
        lineHeight: 1.6,
        whiteSpace: 'pre-line',
      }}>{label}</span>
    </div>
  )
  if (href) {
    return (
      <a href={href} style={{ textDecoration: 'none', display: 'block' }}
        onMouseEnter={e => e.currentTarget.querySelector('span:last-child').style.color = '#fff'}
        onMouseLeave={e => e.currentTarget.querySelector('span:last-child').style.color = 'rgba(252,251,250,0.85)'}
      >
        {content}
      </a>
    )
  }
  return content
}

/* ════════════════════════════════════════════════════════════════════════
   Telephone directory
════════════════════════════════════════════════════════════════════════ */
function DirectorySection({ t, meta, lang }) {
  const [query, setQuery] = useState('')
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return DIRECTORY
    return DIRECTORY.filter(d =>
      d.en.toLowerCase().includes(q) ||
      d[lang]?.toLowerCase().includes(q) ||
      d.ext.includes(q) ||
      d.email.toLowerCase().includes(q)
    )
  }, [query, lang])

  return (
    <section ref={ref} style={{ background: '#F8F2EC', padding: 'clamp(3rem,7vw,5rem) 0' }}>
      <div className="section-container">
        {/* Header */}
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          style={{ textAlign: 'center', marginBottom: 'clamp(1.5rem,3vw,2rem)' }}>
          <SectionLabel icon={<FiPhone size={14} />} meta={meta}>{t.dirTitle}</SectionLabel>
          <h2 style={{
            fontFamily: meta.headFont,
            fontSize: 'clamp(1.5rem,3.2vw,2.2rem)',
            fontWeight: 800, color: MAROON,
            lineHeight: meta.isNonLatin ? 1.45 : 1.2,
            marginBottom: '0.4rem',
          }}>{t.dirTitle}</h2>
          <p style={{ fontFamily: meta.font, fontSize: '0.92rem', color: '#6B3545', marginBottom: '1.5rem' }}>
            {t.dirSub}
          </p>

          {/* Search */}
          <div style={{ position: 'relative', maxWidth: 480, margin: '0 auto' }}>
            <FiSearch size={16} style={{
              position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
              color: '#9A7520', pointerEvents: 'none',
            }} />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={t.dirSearch}
              style={{
                width: '100%', padding: '11px 14px 11px 40px',
                borderRadius: 10, border: `1.5px solid rgba(199,154,43,0.35)`,
                background: '#fff', fontFamily: meta.font,
                fontSize: '0.9rem', color: '#1a1a1a',
                outline: 'none', boxSizing: 'border-box',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = GOLD}
              onBlur={e => e.target.style.borderColor = 'rgba(199,154,43,0.35)'}
            />
          </div>
        </motion.div>

        {/* Table card */}
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          transition={{ delay: 0.12 }}
          style={{
            background: '#fff',
            borderRadius: 16,
            border: `1px solid rgba(199,154,43,0.2)`,
            overflow: 'hidden',
            boxShadow: '0 4px 24px rgba(74,9,24,0.07)',
          }}
        >
          <div style={{ overflowX: 'auto' }}>
            <table className="dir-table">
              <thead>
                <tr style={{ background: `linear-gradient(90deg, ${MAROON}, #6E1024)` }}>
                  <th style={{ fontFamily: meta.isNonLatin ? meta.font : "'Cinzel', serif", color: GOLD, letterSpacing: meta.isNonLatin ? 0 : '0.05em' }}>
                    {t.dirDept}
                  </th>
                  <th style={{ fontFamily: meta.isNonLatin ? meta.font : "'Cinzel', serif", color: GOLD, letterSpacing: meta.isNonLatin ? 0 : '0.05em' }}>
                    {t.dirExt}
                  </th>
                  <th style={{ fontFamily: meta.isNonLatin ? meta.font : "'Cinzel', serif", color: GOLD, letterSpacing: meta.isNonLatin ? 0 : '0.05em' }}>
                    {t.dirPhone}
                  </th>
                  <th style={{ fontFamily: meta.isNonLatin ? meta.font : "'Cinzel', serif", color: GOLD, letterSpacing: meta.isNonLatin ? 0 : '0.05em' }}>
                    {t.dirEmail}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ textAlign: 'center', padding: '2rem', fontFamily: meta.font, color: '#9B7A82', fontSize: '0.9rem' }}>
                      {t.dirEmpty}
                    </td>
                  </tr>
                ) : filtered.map((d, i) => (
                  <tr key={d.ext} style={{ background: i % 2 === 0 ? '#fff' : '#FDF8F3' }}>
                    <td style={{ fontFamily: meta.font }}>
                      <div style={{ fontWeight: 600, color: MAROON, lineHeight: 1.4 }}>
                        {d[lang] || d.en}
                      </div>
                      {lang !== 'en' && (
                        <div style={{ fontSize: '0.75rem', color: '#9B7A82', marginTop: 2, fontFamily: 'Inter, sans-serif' }}>
                          {d.en}
                        </div>
                      )}
                    </td>
                    <td>
                      <span style={{
                        display: 'inline-block', padding: '3px 10px',
                        background: 'rgba(199,154,43,0.1)', borderRadius: 20,
                        border: '1px solid rgba(199,154,43,0.3)',
                        color: '#7A5A10', fontWeight: 700, fontSize: '0.82rem',
                        fontFamily: 'DM Mono, monospace',
                      }}>
                        {d.ext}
                      </span>
                    </td>
                    <td>
                      <a href={`tel:${d.phone}`} style={{
                        color: MAROON, textDecoration: 'none', fontFamily: 'DM Mono, monospace',
                        fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: 5,
                      }}
                        onMouseEnter={e => e.currentTarget.style.color = GOLD}
                        onMouseLeave={e => e.currentTarget.style.color = MAROON}
                      >
                        <FiPhone size={12} />{d.phone}
                      </a>
                    </td>
                    <td>
                      <a href={`mailto:${d.email}`} style={{
                        color: MAROON, textDecoration: 'none', fontFamily: 'DM Mono, monospace',
                        fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: 5,
                        wordBreak: 'break-all',
                      }}
                        onMouseEnter={e => e.currentTarget.style.color = GOLD}
                        onMouseLeave={e => e.currentTarget.style.color = MAROON}
                      >
                        <FiMail size={12} />{d.email}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{
            padding: '10px 20px', borderTop: '1px solid rgba(199,154,43,0.15)',
            background: '#FDFAF6', display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <HiOutlineOfficeBuilding size={13} style={{ color: GOLD }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: '#9B7A82' }}>
              {filtered.length} / {DIRECTORY.length} departments
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════════════
   Complaint / feedback form
════════════════════════════════════════════════════════════════════════ */
const EMPTY_FORM = { name: '', email: '', phone: '', type: '', dept: '', subject: '', message: '' }

function ComplaintForm({ t, meta, lang }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const [form, setForm]     = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // 'idle' | 'success'

  const set = (k) => (e) => setForm(prev => ({ ...prev, [k]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.name.trim())                                e.name    = t.frmErrName
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))  e.email   = t.frmErrEmail
    if (!form.subject.trim())                             e.subject = t.frmErrSubj
    if (form.message.trim().length < 20)                  e.message = t.frmErrMsg
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    const subject = encodeURIComponent(`[${form.type || 'Inquiry'}] ${form.subject}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\n` +
      `Email: ${form.email}\n` +
      `Phone: ${form.phone || 'N/A'}\n` +
      `Type: ${form.type || 'General Inquiry'}\n` +
      `Department: ${form.dept || 'N/A'}\n` +
      `\nMessage:\n${form.message}`
    )
    window.location.href = `mailto:info@splanning.gov.lk?subject=${subject}&body=${body}`
    setStatus('success')
    setForm(EMPTY_FORM)
  }

  const deptNames = DIRECTORY.map(d => d[lang] || d.en)

  const inputStyle = (hasError) => ({
    width: '100%', padding: '11px 14px',
    borderRadius: 10,
    border: `1.5px solid ${hasError ? '#C0392B' : 'rgba(199,154,43,0.3)'}`,
    background: '#fff', fontFamily: meta.font,
    fontSize: '0.9rem', color: '#1a1a1a',
    outline: 'none', boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  })

  return (
    <section ref={ref} style={{ background: CREAM, padding: 'clamp(3rem,7vw,5rem) 0' }}>
      <div className="section-container">
        {/* Header */}
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          style={{ textAlign: 'center', marginBottom: 'clamp(1.5rem,3vw,2rem)' }}>
          <SectionLabel icon={<FiMail size={14} />} meta={meta}>{t.frmTitle}</SectionLabel>
          <h2 style={{
            fontFamily: meta.headFont,
            fontSize: 'clamp(1.5rem,3.2vw,2.2rem)',
            fontWeight: 800, color: MAROON,
            lineHeight: meta.isNonLatin ? 1.45 : 1.2,
            marginBottom: '0.4rem',
          }}>{t.frmTitle}</h2>
          <p style={{ fontFamily: meta.font, fontSize: '0.92rem', color: '#6B3545' }}>{t.frmSub}</p>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          transition={{ delay: 0.1 }}
          style={{
            maxWidth: 780, margin: '0 auto',
            background: '#fff',
            borderRadius: 20,
            border: '1px solid rgba(199,154,43,0.2)',
            boxShadow: '0 8px 40px rgba(74,9,24,0.08)',
            padding: 'clamp(1.5rem,4vw,2.5rem)',
          }}
        >
          {/* Success state */}
          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: 12, padding: '2rem', textAlign: 'center',
              }}
            >
              <FiCheckCircle size={52} style={{ color: '#27AE60' }} />
              <p style={{ fontFamily: meta.font, fontSize: '1rem', color: '#1a4a2a', lineHeight: 1.7, maxWidth: 460 }}>
                {t.frmSuccess}
              </p>
              <button
                onClick={() => setStatus('idle')}
                style={{
                  marginTop: 8, padding: '10px 24px', borderRadius: 8,
                  background: MAROON, color: '#fff', border: 'none',
                  fontFamily: meta.font, fontWeight: 600, fontSize: '0.88rem',
                  cursor: 'pointer',
                }}
              >
                {lang === 'en' ? 'Submit Another' : lang === 'si' ? 'නැවත යවන්න' : 'மீண்டும் அனுப்புக'}
              </button>
            </motion.div>
          )}

          {/* Form */}
          {status !== 'success' && (
            <form onSubmit={handleSubmit} noValidate>
              {/* Row 1: Name + Email */}
              <div className="form-row">
                <Field label={t.frmName} error={errors.name} required meta={meta}>
                  <div style={{ position: 'relative' }}>
                    <FiUser size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#9B7A82' }} />
                    <input
                      type="text" value={form.name} onChange={set('name')}
                      placeholder={t.frmNamePh}
                      style={{ ...inputStyle(errors.name), paddingLeft: 36 }}
                      onFocus={e => e.target.style.borderColor = GOLD}
                      onBlur={e => e.target.style.borderColor = errors.name ? '#C0392B' : 'rgba(199,154,43,0.3)'}
                    />
                  </div>
                </Field>
                <Field label={t.frmEmail} error={errors.email} required meta={meta}>
                  <div style={{ position: 'relative' }}>
                    <FiMail size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#9B7A82' }} />
                    <input
                      type="email" value={form.email} onChange={set('email')}
                      placeholder={t.frmEmailPh}
                      style={{ ...inputStyle(errors.email), paddingLeft: 36 }}
                      onFocus={e => e.target.style.borderColor = GOLD}
                      onBlur={e => e.target.style.borderColor = errors.email ? '#C0392B' : 'rgba(199,154,43,0.3)'}
                    />
                  </div>
                </Field>
              </div>

              {/* Row 2: Phone + Type */}
              <div className="form-row">
                <Field label={t.frmPhone} meta={meta}>
                  <div style={{ position: 'relative' }}>
                    <FiPhone size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#9B7A82' }} />
                    <input
                      type="tel" value={form.phone} onChange={set('phone')}
                      placeholder={t.frmPhonePh}
                      style={{ ...inputStyle(false), paddingLeft: 36 }}
                      onFocus={e => e.target.style.borderColor = GOLD}
                      onBlur={e => e.target.style.borderColor = 'rgba(199,154,43,0.3)'}
                    />
                  </div>
                </Field>
                <Field label={t.frmType} meta={meta}>
                  <SelectBox value={form.type} onChange={set('type')} meta={meta} hasError={false}>
                    <option value="">{lang === 'en' ? 'Select type…' : lang === 'si' ? 'වර්ගය තෝරන්න…' : 'வகையை தேர்ந்தெடுக்கவும்…'}</option>
                    {t.frmTypes.map(tp => <option key={tp} value={tp}>{tp}</option>)}
                  </SelectBox>
                </Field>
              </div>

              {/* Row 3: Department */}
              <div style={{ marginBottom: '1.1rem' }}>
                <Field label={t.frmDept} meta={meta}>
                  <SelectBox value={form.dept} onChange={set('dept')} meta={meta} hasError={false}>
                    <option value="">{t.frmDeptDef}</option>
                    {deptNames.map(n => <option key={n} value={n}>{n}</option>)}
                  </SelectBox>
                </Field>
              </div>

              {/* Subject */}
              <Field label={t.frmSubject} error={errors.subject} required meta={meta}>
                <input
                  type="text" value={form.subject} onChange={set('subject')}
                  placeholder={t.frmSubjectPh}
                  style={inputStyle(errors.subject)}
                  onFocus={e => e.target.style.borderColor = GOLD}
                  onBlur={e => e.target.style.borderColor = errors.subject ? '#C0392B' : 'rgba(199,154,43,0.3)'}
                />
              </Field>

              {/* Message */}
              <Field label={t.frmMsg} error={errors.message} required meta={meta}>
                <div style={{ position: 'relative' }}>
                  <FiMessageSquare size={14} style={{ position: 'absolute', left: 12, top: 14, color: '#9B7A82' }} />
                  <textarea
                    value={form.message} onChange={set('message')}
                    placeholder={t.frmMsgPh}
                    rows={5}
                    style={{ ...inputStyle(errors.message), paddingLeft: 36, resize: 'vertical', lineHeight: 1.65 }}
                    onFocus={e => e.target.style.borderColor = GOLD}
                    onBlur={e => e.target.style.borderColor = errors.message ? '#C0392B' : 'rgba(199,154,43,0.3)'}
                  />
                  <span style={{
                    position: 'absolute', right: 12, bottom: 10,
                    fontSize: '0.72rem', color: form.message.length < 20 ? '#C0392B' : '#27AE60',
                    fontFamily: 'DM Mono, monospace',
                  }}>
                    {form.message.length}/20+
                  </span>
                </div>
              </Field>

              {/* Note + Submit */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginTop: '0.5rem' }}>
                <p style={{ fontFamily: meta.font, fontSize: '0.78rem', color: '#9B7A82', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <FiMail size={12} style={{ color: GOLD }} />
                  {t.frmNote}
                </p>
                <motion.button
                  type="submit"
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '12px 28px', borderRadius: 10,
                    background: `linear-gradient(135deg, ${MAROON}, #6E1024)`,
                    color: '#fff', border: 'none', cursor: 'pointer',
                    fontFamily: meta.font, fontWeight: 700,
                    fontSize: '0.92rem', letterSpacing: '0.02em',
                    boxShadow: '0 4px 18px rgba(74,9,24,0.3)',
                  }}
                >
                  <FiSend size={15} />
                  {t.frmSubmit}
                </motion.button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}

/* ── Small helper components ────────────────────────────────────────────── */
function Field({ label, children, error, required, meta }) {
  return (
    <div style={{ marginBottom: '1.1rem', flex: 1 }}>
      <label style={{
        display: 'block', marginBottom: 5,
        fontFamily: meta.font, fontSize: '0.82rem',
        fontWeight: 600, color: '#4A0918',
      }}>
        {label}
        {required && <span style={{ color: GOLD, marginLeft: 3 }}>*</span>}
      </label>
      {children}
      {error && (
        <p style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 4, fontFamily: meta.font, fontSize: '0.76rem', color: '#C0392B' }}>
          <FiAlertCircle size={12} /> {error}
        </p>
      )}
    </div>
  )
}

function SelectBox({ value, onChange, meta, children, hasError }) {
  return (
    <div style={{ position: 'relative' }}>
      <select
        value={value} onChange={onChange}
        style={{
          width: '100%', padding: '11px 36px 11px 14px', appearance: 'none',
          borderRadius: 10,
          border: `1.5px solid ${hasError ? '#C0392B' : 'rgba(199,154,43,0.3)'}`,
          background: '#fff', fontFamily: meta.font,
          fontSize: '0.9rem', color: value ? '#1a1a1a' : '#9B7A82',
          outline: 'none', cursor: 'pointer', boxSizing: 'border-box',
        }}
        onFocus={e => e.target.style.borderColor = GOLD}
        onBlur={e => e.target.style.borderColor = hasError ? '#C0392B' : 'rgba(199,154,43,0.3)'}
      >
        {children}
      </select>
      <FiChevronDown size={15} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#9B7A82', pointerEvents: 'none' }} />
    </div>
  )
}

function SectionLabel({ icon, children, meta }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, marginBottom: '0.6rem' }}>
      <span style={{ color: GOLD }}>{icon}</span>
      <span style={{
        fontFamily: meta.isNonLatin ? meta.font : "'Cinzel', serif",
        fontSize: '0.68rem', color: GOLD, fontWeight: 600,
        letterSpacing: meta.isNonLatin ? 0 : '0.1em',
        textTransform: meta.isNonLatin ? 'none' : 'uppercase',
      }}>{children}</span>
    </div>
  )
}

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

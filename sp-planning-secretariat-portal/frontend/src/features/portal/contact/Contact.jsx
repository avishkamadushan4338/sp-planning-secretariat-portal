import { motion } from 'framer-motion'
import { useState, useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { usePageHold } from '@/shared/hooks/usePageHold'
import ComingSoon from '@/shared/components/ComingSoon'
import { SeoHead } from '@/shared/seo'
import {
  FiMail, FiPhone, FiMapPin, FiSearch, FiSend,
  FiExternalLink, FiCheckCircle, FiAlertCircle, FiChevronDown,
  FiUser, FiMessageSquare, FiArrowRight,
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
    pageSub:      'We are here to assist you with dedication and professionalism.',
    mapTitle:     'Find Our Office',
    mapSub:       'Planning Secretariat – Southern Province Headquarters',
    mapAddress:   '153B, S.H. Dahanayaka Mawatha, Galle, Sri Lanka.',
    mapPhone:     '+94 912234503',
    mapFax:       '+94 912246554',
    mapEmail:     'spdcsp@gmail.com',
    mapHours:     'Monday – Friday: 8:30 AM – 4:30 PM',
    mapHoursLbl:  'Office Hours',
    mapAddressLbl:'Address',
    mapDirections:'Get Directions',
    mapFaxLbl:    'Fax',
    dirCount:     'divisions',
    dirTitle:     'Telephone Directory',
    dirSub:       'Direct contact numbers for all divisions',
    dirSearch:    'Search division…',
    dirDept:      'Division',
    dirPerson:    'Contact Person',
    dirPhone:     'Direct Line',
    dirEmpty:     'No divisions match your search.',
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
    frmDept:      'Related Division',
    frmDeptDef:   'Select division (optional)',
    frmSubject:   'Subject',
    frmSubjectPh: 'Brief subject of your message',
    frmMsg:       'Message',
    frmMsgPh:     'Describe your complaint or feedback in detail (minimum 20 characters)…',
    frmSubmit:    'Send Message',
    frmNote:      'Sent to: spdcsp@gmail.com',
    frmSuccess:   'Your submission has been received. A confirmation email has been sent to your inbox. We will respond within 3 working days.',
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
    mapPhone:     '+94 912234503',
    mapFax:       '+94 912246554',
    mapEmail:     'spdcsp@gmail.com',
    mapHours:     'සඳු – සිකු: 8:30 – 16:30',
    mapHoursLbl:  'කාර්යාල වේලාවන්',
    mapAddressLbl:'ලිපිනය',
    mapDirections:'මාර්ගය ලබා ගන්න',
    mapFaxLbl:    'ෆැක්ස්',
    dirCount:     'අංශ',
    dirTitle:     'දූරකථන නාමාවලිය',
    dirSub:       'සියලු අංශ හා අංශ සඳහා සෘජු සම්බන්ධතා අංක',
    dirSearch:    'අංශය සොයන්න…',
    dirDept:      'අංශය / අංශය',
    dirPerson:    'සම්බන්ධ පුද්ගලයා',
    dirPhone:     'සෘජු රේඛාව',
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
    frmNote:      'යවනු ලබන්නේ: spdcsp@gmail.com',
    frmSuccess:   'ඔබේ ඉදිරිපත් කිරීම ලැබී ඇත. ඔබගේ ඊමේල් ලිපිනයට තහවුරු කිරීමේ ඊමේලයක් යවා ඇත. කාර්යාල දිනයන් 3ක් ඇතුළත ප්‍රතිචාර දනවන්නෙමු.',
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
    mapPhone:     '+94 912234503',
    mapFax:       '+94 912246554',
    mapEmail:     'spdcsp@gmail.com',
    mapHours:     'திங்கள் – வெள்ளி: 8:30 மு.ப – 4:30 பி.ப',
    mapHoursLbl:  'அலுவலக நேரம்',
    mapAddressLbl:'முகவரி',
    mapDirections:'வழிகாட்டுதல் பெறுங்கள்',
    mapFaxLbl:    'தொலைநகல்',
    dirCount:     'திணைக்களங்கள்',
    dirTitle:     'தொலைபேசி அடைவு',
    dirSub:       'அனைத்து பிரிவுகள் மற்றும் திணைக்களங்களுக்கான நேரடி தொடர்பு எண்கள்',
    dirSearch:    'பிரிவை தேடுங்கள்…',
    dirDept:      'திணைக்களம் / பிரிவு',
    dirPerson:    'தொடர்பு நபர்',
    dirPhone:     'நேரடி இணைப்பு',
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
    frmNote:      'அனுப்பப்படும்: spdcsp@gmail.com',
    frmSuccess:   'உங்கள் சமர்ப்பிப்பு பெறப்பட்டது. உங்கள் மின்னஞ்சலுக்கு உறுதிப்படுத்தல் அனுப்பப்பட்டுள்ளது. 3 வேலை நாட்களுக்குள் பதிலளிப்போம்.',
    frmErrName:   'முழு பெயர் தேவை.',
    frmErrEmail:  'சரியான மின்னஞ்சல் முகவரி தேவை.',
    frmErrSubj:   'விஷயம் தேவை.',
    frmErrMsg:    'செய்தி குறைந்தது 20 எழுத்துக்கள் இருக்க வேண்டும்.',
  },
}

/* ── Telephone directory data ───────────────────────────────────────────── */
const DIRECTORY = [
  {
    en: 'Deputy Chief Secretary (Planning and Operations)',
    si: 'නියෝජ්‍ය ප්‍රධාන ලේකම් (සැලසුම් සහ මෙහෙයුම්)',
    ta: 'உதவி தலைமை செயலாளர் (திட்டமிடல் மற்றும் நடவடிக்கைகள்)',
    person: 'Mr. M.K.G.S.P.K. Jayasekara',
    phone: '+94 91 450 0656',
  },
  {
    en: 'Director (Planning)',
    si: 'අධ්‍යක්ෂ (සැලසුම්)',
    ta: 'இயக்குனர் (திட்டமிடல்)',
    person: 'Mrs. K.S.S. Weerawardena',
    phone: '+94 91 222 3868',
  },
  {
    en: 'Deputy Director (Planning)',
    si: 'නියෝජ්‍ය අධ්‍යක්ෂ (සැලසුම්)',
    ta: 'உதவி இயக்குனர் (திட்டமிடல்)',
    person: 'Mrs. N.C. Dissanayake',
    phone: '+94 91 223 1197',
  },
  {
    en: 'Deputy Director (Planning)',
    si: 'නියෝජ්‍ය අධ්‍යක්ෂ (සැලසුම්)',
    ta: 'உதவி இயக்குனர் (திட்டமிடல்)',
    person: 'Mrs. H.I.H. Salgamuwa',
    phone: '+94 91 224 8750',
  },
  {
    en: 'Deputy Director (Planning)',
    si: 'නියෝජ්‍ය අධ්‍යක්ෂ (සැලසුම්)',
    ta: 'உதவி இயக்குனர் (திட்டமிடல்)',
    person: 'Mrs. A.K.E. Madhusarani',
    phone: '+94 91 223 1943',
  },
  {
    en: 'Deputy Director (Planning)',
    si: 'නියෝජ්‍ය අධ්‍යක්ෂ (සැලසුම්)',
    ta: 'உதவி இயக்குனர் (திட்டமிடல்)',
    person: 'Mrs. Chandrika Malepathirana',
    phone: '+94 91 222 7882',
  },
  {
    en: 'Deputy Director (Planning)',
    si: 'නියෝජ්‍ය අධ්‍යක්ෂ (සැලසුම්)',
    ta: 'உதவி இயக்குனர் (திட்டமிடல்)',
    person: 'Mrs. A.D.S. Priyadarshani',
    phone: '+94 91 224 6481',
  },
  {
    en: 'Accountant (Acting)',
    si: 'ගණකාධිකාරී (වැඩබලන)',
    ta: 'கணக்காளர் (பணியாற்றுதல்)',
    person: 'Mrs. Manjula Gamage',
    phone: '+94 91 212 1376',
  },
  {
    en: 'Statistician',
    si: 'සංඛ්‍යාලේඛනඥ',
    ta: 'புள்ளியியலாளர்',
    person: 'Mrs. U.D.D. Dilhani',
    phone: '+94 91 224 7989',
  },
  {
    en: 'Administrative Officer',
    si: 'පරිපාලන නිලධාරී',
    ta: 'நிர்வாக அதிகாரி',
    person: 'Mrs. K.K.G. Chandrika',
    phone: '+94 91 223 1943',
  },
  {
    en: 'Chief Management Services Officer',
    si: 'ප්‍රධාන කළමනාකරණ සේවා නිලධාරී',
    ta: 'தலைமை மேலாண்மை சேவை அதிகாரி',
    person: 'Mrs. S.K.M. Liyanage',
    phone: '+94 71 818 6963',
  },
  {
    en: 'Cash Assistant',
    si: 'මුදල් සහකාර',
    ta: 'பண உதவியாளர்',
    person: 'Mrs. Muthumali Gunathilaka',
    phone: '+94 91 212 1376',
  },
]

/* ── Shared animation variant ───────────────────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
}

const MAP_URL = 'https://www.google.com/maps/place/Planning+Secretariat+Southern+Province/@6.0454187,80.2060789,18.45z/data=!4m6!3m5!1s0x3ae173fb2f6cce29:0x496be10f9a8fef84!8m2!3d6.0454558!4d80.2072194!16s%2Fg%2F11j9cdfv3b'

/* ════════════════════════════════════════════════════════════════════════
   Main page
════════════════════════════════════════════════════════════════════════ */
export default function Contact() {
  const held = usePageHold('contact')
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

  if (held) return <ComingSoon pageKey="contact" />

  return (
    <>
      <SeoHead page="contact" />
      <div style={{ background: CREAM, minHeight: '100vh' }}>
        <PageHero t={t} meta={meta} />
        <div id="find-office"><MapSection t={t} meta={meta} /></div>
        <div id="contact-info"><DirectorySection t={t} meta={meta} lang={lang} /></div>
        <div id="feedback"><ComplaintForm t={t} meta={meta} lang={lang} /></div>
      </div>
    </>
  )
}

/* ════════════════════════════════════════════════════════════════════════
   Hero — premium dark split layout
════════════════════════════════════════════════════════════════════════ */
function PageHero({ t, meta }) {
  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.10 } } }
  const itemV   = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 0.60, ease: [0.16, 1, 0.3, 1] } } }
  const slideR  = { hidden: { opacity: 0, x: 36 }, visible: { opacity: 1, x: 0, transition: { duration: 0.70, ease: [0.16, 1, 0.3, 1] } } }

  return (
    <section className="ch-hero">
      <div className="ch-hero__bg" />
      <div className="ch-hero__noise" />
      <div className="ch-hero__grid-lines" aria-hidden="true" />
      <div className="ch-hero__glow ch-hero__glow--gold"   aria-hidden="true" />
      <div className="ch-hero__glow ch-hero__glow--maroon" aria-hidden="true" />
      <div className="ch-hero__glow ch-hero__glow--right"  aria-hidden="true" />
      <div className="ch-hero__watermark" aria-hidden="true">CONTACT</div>
      <div className="ch-hero__hc" aria-hidden="true"><HoneycombBg /></div>
      {[...Array(6)].map((_, i) => (
        <div key={i} className={`ch-hero__dot ch-hero__dot--${i + 1}`} aria-hidden="true" />
      ))}

      <div className="ch-hero__inner">

        {/* LEFT — text */}
        <motion.div className="ch-hero__left" initial="hidden" animate="visible" variants={stagger}>
          <motion.div className="ch-hero__badge" variants={itemV}>
            <span className="ch-hero__badge-dot" />
            <span style={{
              fontFamily:    meta.isNonLatin ? meta.font : "'Cinzel', serif",
              letterSpacing: meta.isNonLatin ? 0 : '0.13em',
              textTransform: meta.isNonLatin ? 'none' : 'uppercase',
            }}>
              {t.pageTitle}
            </span>
          </motion.div>

          <motion.h1
            className="ch-hero__title"
            style={{ fontFamily: meta.headFont, lineHeight: meta.isNonLatin ? 1.35 : 1.08 }}
            variants={itemV}
          >
            {t.pageTitle}
          </motion.h1>

          <motion.div
            className="ch-hero__rule"
            variants={{
              hidden:  { scaleX: 0, opacity: 0 },
              visible: { scaleX: 1, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
            }}
          />

          <motion.p className="ch-hero__sub" style={{ fontFamily: meta.font }} variants={itemV}>
            {t.pageSub}
          </motion.p>

          <motion.div className="ch-hero__actions" variants={itemV}>
            <a href={`tel:${t.mapPhone}`} className="ch-hero__btn ch-hero__btn--gold" style={{ fontFamily: meta.font }}>
              <FiPhone size={15} />
              <span>{t.mapPhone}</span>
            </a>
            <a
              href={MAP_URL}
              target="_blank" rel="noopener noreferrer"
              className="ch-hero__btn ch-hero__btn--ghost"
              style={{ fontFamily: meta.font }}
            >
              <FiMapPin size={15} />
              <span>{t.mapDirections}</span>
              <FiArrowRight size={13} className="ch-hero__btn-arrow" />
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT — logo only */}
        <motion.div className="ch-hero__right" initial="hidden" animate="visible" variants={slideR}>
          <img
            src="/branding/f-logo.svg"
            alt="Southern Province Planning Secretariat"
            className="ch-hero__logo"
            onError={e => { e.currentTarget.style.display = 'none' }}
          />
        </motion.div>

      </div>

      <svg className="ch-hero__wave" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,80 C240,20 480,60 720,40 C960,20 1200,60 1440,30 L1440,80 Z" fill={CREAM} />
      </svg>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════════════
   Map section
════════════════════════════════════════════════════════════════════════ */
function MapSection({ t, meta }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section ref={ref} style={{ background: CREAM, padding: 'clamp(3rem,7vw,5rem) 0' }}>
      <div className="section-container">
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          style={{ textAlign: 'center', marginBottom: 'clamp(1.5rem,3vw,2.5rem)' }}
        >
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

        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          transition={{ delay: 0.1 }}
          className="map-grid"
        >
          {/* Info panel */}
          <div
            className="map-info-panel"
            style={{ background: `linear-gradient(150deg, ${MAROON}, ${DEEP})` }}
          >
            <div className="map-logo">
              <img
                src="/branding/f-logo.svg"
                alt="Southern Province Planning Secretariat logo"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
            </div>

            <MapInfoRow icon={<FiMapPin size={16} />} label={t.mapAddress} meta={meta} />
            <MapInfoRow icon={<FiPhone size={16} />}  label={t.mapPhone}   meta={meta} href={`tel:${t.mapPhone}`} />
            <MapInfoRow icon={<FiPhone size={16} />}  label={`${t.mapFaxLbl}: ${t.mapFax}`} meta={meta} />
            <MapInfoRow icon={<FiMail size={16} />}   label={t.mapEmail}   meta={meta} href={`mailto:${t.mapEmail}`} />

            <div className="map-hours-box">
              <p style={{
                fontFamily: meta.font, fontSize: '0.82rem', color: GOLD,
                fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 4,
              }}>
                {t.mapHoursLbl}
              </p>
              <p style={{ fontFamily: meta.font, fontSize: '1rem', color: 'rgba(252,251,250,0.9)', margin: 0 }}>
                {t.mapHours}
              </p>
            </div>

            <a
              href={MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="map-directions-btn"
              style={{ fontFamily: meta.font }}
            >
              <FiExternalLink size={15} />
              {t.mapDirections}
            </a>
          </div>

          {/* Responsive map embed */}
          <div className="map-embed-wrap">
            <iframe
              title="Office Location"
              src="https://maps.google.com/maps?q=6.0454558,80.2072194&z=18&output=embed"
              style={{ width: '100%', height: '100%', border: 0 }}
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

function MapInfoRow({ icon, label, meta, href }) {
  const inner = (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: '0.9rem' }}>
      <span style={{ color: GOLD, marginTop: 2, flexShrink: 0 }}>{icon}</span>
      <span style={{
        fontFamily: meta.font,
        fontSize: 'clamp(0.88rem, 1.1vw, 1rem)',
        color: 'rgba(252,251,250,0.85)',
        lineHeight: 1.6,
        whiteSpace: 'pre-line',
        wordBreak: 'break-word',
      }}>{label}</span>
    </div>
  )
  if (!href) return inner
  return (
    <a
      href={href}
      style={{ textDecoration: 'none', display: 'block' }}
      onMouseEnter={e => e.currentTarget.querySelector('span:last-child').style.color = '#fff'}
      onMouseLeave={e => e.currentTarget.querySelector('span:last-child').style.color = 'rgba(252,251,250,0.85)'}
    >
      {inner}
    </a>
  )
}

/* ════════════════════════════════════════════════════════════════════════
   Telephone directory
════════════════════════════════════════════════════════════════════════ */
function DirectorySection({ t, meta, lang }) {
  const [query, setQuery] = useState('')
  const { ref, inView } = useInView({ threshold: 0.06, triggerOnce: true })

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return DIRECTORY
    return DIRECTORY.filter(d =>
      d.en.toLowerCase().includes(q) ||
      d[lang]?.toLowerCase().includes(q) ||
      d.person.toLowerCase().includes(q) ||
      d.phone.includes(q)
    )
  }, [query, lang])

  const thFont = {
    fontFamily: meta.isNonLatin ? meta.font : "'Cinzel', serif",
    letterSpacing: meta.isNonLatin ? 0 : '0.06em',
  }

  return (
    <section ref={ref} className="dir-section">
      {/* subtle top-left glow */}
      <div className="dir-section__glow" aria-hidden="true" />

      <div className="section-container">

        {/* ── Header ── */}
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="dir-header"
        >
          <SectionLabel icon={<FiPhone size={14} />} meta={meta}>{t.dirTitle}</SectionLabel>
          <h2 className="dir-header__title" style={{ fontFamily: meta.headFont, lineHeight: meta.isNonLatin ? 1.45 : 1.15 }}>
            {t.dirTitle}
          </h2>
          <p className="dir-header__sub" style={{ fontFamily: meta.font }}>{t.dirSub}</p>

          {/* ── Search bar ── */}
          <div className="dir-search-wrap">
            <span className="dir-search-icon"><FiSearch size={16} /></span>
            <input
              type="text"
              className="dir-search-input"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={t.dirSearch}
              style={{ fontFamily: meta.font }}
              aria-label={t.dirSearch}
            />
            {query && (
              <button className="dir-search-clear" onClick={() => setQuery('')} aria-label="Clear search">
                ×
              </button>
            )}
          </div>
        </motion.div>

        {/* ── Stats strip ── */}
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          transition={{ delay: 0.08 }}
          className="dir-stats"
        >
          <div className="dir-stats__item">
            <span className="dir-stats__num">{DIRECTORY.length}</span>
            <span className="dir-stats__lbl" style={{ fontFamily: meta.font }}>{t.dirCount}</span>
          </div>
          <div className="dir-stats__divider" />
          <div className="dir-stats__item">
            <span className="dir-stats__num">{filtered.length}</span>
            <span className="dir-stats__lbl" style={{ fontFamily: meta.font }}>
              {query ? 'results found' : 'total listed'}
            </span>
          </div>
        </motion.div>

        {/* ── Table card ── */}
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          transition={{ delay: 0.14 }}
          className="dir-table-card"
        >
          {/* Desktop/tablet table */}
          <div className="dir-table-scroll">
            <table className="dir-table">
              <thead>
                <tr>
                  <th style={thFont}>{t.dirDept}</th>
                  <th style={thFont}>{t.dirPerson}</th>
                  <th style={thFont}>{t.dirPhone}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="dir-table__empty">
                      <FiSearch size={28} style={{ opacity: 0.25, marginBottom: 8, display: 'block', margin: '0 auto 8px' }} />
                      <span style={{ fontFamily: meta.font }}>{t.dirEmpty}</span>
                    </td>
                  </tr>
                ) : filtered.map((d, i) => (
                  <motion.tr
                    key={`${d.phone}-${i}`}
                    className="dir-table__row"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03, duration: 0.3 }}
                  >
                    <td style={{ fontFamily: meta.font }}>
                      <div className="dir-dept-name">{d[lang] || d.en}</div>
                      {lang !== 'en' && <div className="dir-dept-en">{d.en}</div>}
                    </td>
                    <td>
                      <span className="dir-person-name" style={{ fontFamily: meta.font }}>{d.person}</span>
                    </td>
                    <td>
                      <a href={`tel:${d.phone}`} className="dir-link">
                        <FiPhone size={12} />{d.phone}
                      </a>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards (≤ 480px) */}
          <div className="dir-cards-mobile">
            {filtered.length === 0 ? (
              <p className="dir-table__empty" style={{ fontFamily: meta.font }}>{t.dirEmpty}</p>
            ) : filtered.map((d, i) => (
              <motion.div
                key={`m-${d.phone}-${i}`}
                className="dir-mobile-card"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
              >
                <div className="dir-mobile-card__name" style={{ fontFamily: meta.font }}>
                  {d[lang] || d.en}
                </div>
                {lang !== 'en' && <div className="dir-mobile-card__en">{d.en}</div>}
                <div className="dir-mobile-card__person">
                  <FiUser size={12} style={{ color: '#C79A2B', flexShrink: 0 }} />
                  <span style={{ fontFamily: meta.font }}>{d.person}</span>
                </div>
                <div className="dir-mobile-card__links">
                  <a href={`tel:${d.phone}`} className="dir-mobile-card__link">
                    <span className="dir-mobile-card__link-icon"><FiPhone size={13} /></span>
                    {d.phone}
                  </a>
                </div>
                <div className="dir-mobile-card__bar" />
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <div className="dir-footer">
            <HiOutlineOfficeBuilding size={14} style={{ color: GOLD }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: '#9B7A82' }}>
              {filtered.length} / {DIRECTORY.length} {t.dirCount}
            </span>
            {query && (
              <span className="dir-footer__query" style={{ fontFamily: meta.font }}>
                — filtered by &ldquo;{query}&rdquo;
              </span>
            )}
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
const API_BASE   = import.meta.env.VITE_API_URL || ''

function ComplaintForm({ t, meta, lang }) {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true })
  const [form, setForm]       = useState(EMPTY_FORM)
  const [errors, setErrors]   = useState({})
  const [status, setStatus]   = useState('idle') // idle | submitting | success | error
  const [serverErr, setServerErr] = useState('')

  const set = (k) => (e) => setForm(prev => ({ ...prev, [k]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.name.trim())                               e.name    = t.frmErrName
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email   = t.frmErrEmail
    if (!form.subject.trim())                            e.subject = t.frmErrSubj
    if (form.message.trim().length < 20)                 e.message = t.frmErrMsg
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setStatus('submitting')
    setServerErr('')
    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Submission failed. Please try again.')
      }
      setStatus('success')
      setForm(EMPTY_FORM)
    } catch (err) {
      setServerErr(err.message)
      setStatus('error')
    }
  }

  const DEPT_OPTIONS = {
    en: ['Development', 'Accounts', 'Administration'],
    si: ['සංවර්ධන', 'ගිණුම්', 'පරිපාලන'],
    ta: ['வளர்ச்சி', 'கணக்குகள்', 'நிர்வாகம்'],
  }
  const deptNames = DEPT_OPTIONS[lang] || DEPT_OPTIONS.en

  return (
    <section ref={ref} style={{ background: CREAM, padding: 'clamp(3rem,7vw,5rem) 0' }}>
      <div className="section-container">
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          style={{ textAlign: 'center', marginBottom: 'clamp(1.5rem,3vw,2rem)' }}
        >
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

        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          transition={{ delay: 0.1 }}
          style={{
            maxWidth: 820,
            margin: '0 auto',
            background: '#fff',
            borderRadius: 20,
            border: '1px solid rgba(199,154,43,0.18)',
            boxShadow: '0 4px 24px rgba(74,9,24,0.06), 0 16px 48px rgba(74,9,24,0.07)',
            padding: 'clamp(1.5rem,4vw,2.5rem)',
          }}
        >
          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="form-success-panel"
            >
              <FiCheckCircle size={52} style={{ color: '#27AE60' }} />
              <p style={{ fontFamily: meta.font, fontSize: '1rem', color: '#1a4a2a', lineHeight: 1.75, maxWidth: 460 }}>
                {t.frmSuccess}
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="form-success-again-btn"
                style={{ fontFamily: meta.font }}
              >
                {lang === 'en' ? 'Submit Another' : lang === 'si' ? 'නැවත යවන්න' : 'மீண்டும் அனுப்புக'}
              </button>
            </motion.div>
          )}

          {status !== 'success' && (
            <form onSubmit={handleSubmit} noValidate>
              {status === 'error' && serverErr && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  background: 'rgba(192,57,43,0.07)', border: '1px solid rgba(192,57,43,0.25)',
                  borderRadius: 8, padding: '10px 14px', marginBottom: '1rem',
                  fontFamily: meta.font, fontSize: '0.88rem', color: '#C0392B',
                }}>
                  <FiAlertCircle size={15} style={{ flexShrink: 0 }} />
                  {serverErr}
                </div>
              )}
              {/* Row 1: Name + Email */}
              <div className="form-row">
                <FormField label={t.frmName} error={errors.name} required meta={meta}>
                  <div className="form-icon-wrap">
                    <span className="form-icon"><FiUser size={14} /></span>
                    <input
                      type="text"
                      className={`form-input${errors.name ? ' has-error' : ''}`}
                      value={form.name}
                      onChange={set('name')}
                      placeholder={t.frmNamePh}
                      style={{ fontFamily: meta.font }}
                      aria-required="true"
                      aria-invalid={!!errors.name}
                    />
                  </div>
                </FormField>
                <FormField label={t.frmEmail} error={errors.email} required meta={meta}>
                  <div className="form-icon-wrap">
                    <span className="form-icon"><FiMail size={14} /></span>
                    <input
                      type="email"
                      className={`form-input${errors.email ? ' has-error' : ''}`}
                      value={form.email}
                      onChange={set('email')}
                      placeholder={t.frmEmailPh}
                      style={{ fontFamily: meta.font }}
                      aria-required="true"
                      aria-invalid={!!errors.email}
                    />
                  </div>
                </FormField>
              </div>

              {/* Row 2: Phone + Type */}
              <div className="form-row">
                <FormField label={t.frmPhone} meta={meta}>
                  <div className="form-icon-wrap">
                    <span className="form-icon"><FiPhone size={14} /></span>
                    <input
                      type="tel"
                      className="form-input"
                      value={form.phone}
                      onChange={set('phone')}
                      placeholder={t.frmPhonePh}
                      style={{ fontFamily: meta.font }}
                    />
                  </div>
                </FormField>
                <FormField label={t.frmType} meta={meta}>
                  <div className="select-wrap">
                    <select
                      className="form-select"
                      value={form.type}
                      onChange={set('type')}
                      style={{ fontFamily: meta.font, color: form.type ? '#1a1a1a' : '#9B7A82' }}
                    >
                      <option value="">{lang === 'en' ? 'Select type…' : lang === 'si' ? 'වර්ගය තෝරන්න…' : 'வகையை தேர்ந்தெடுக்கவும்…'}</option>
                      {t.frmTypes.map(tp => <option key={tp} value={tp}>{tp}</option>)}
                    </select>
                    <span className="select-arrow"><FiChevronDown size={15} /></span>
                  </div>
                </FormField>
              </div>

              {/* Row 3: Department */}
              <FormField label={t.frmDept} meta={meta}>
                <div className="select-wrap">
                  <select
                    className="form-select"
                    value={form.dept}
                    onChange={set('dept')}
                    style={{ fontFamily: meta.font, color: form.dept ? '#1a1a1a' : '#9B7A82' }}
                  >
                    <option value="">{t.frmDeptDef}</option>
                    {deptNames.map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                  <span className="select-arrow"><FiChevronDown size={15} /></span>
                </div>
              </FormField>

              {/* Subject */}
              <FormField label={t.frmSubject} error={errors.subject} required meta={meta}>
                <input
                  type="text"
                  className={`form-input${errors.subject ? ' has-error' : ''}`}
                  value={form.subject}
                  onChange={set('subject')}
                  placeholder={t.frmSubjectPh}
                  style={{ fontFamily: meta.font }}
                  aria-required="true"
                  aria-invalid={!!errors.subject}
                />
              </FormField>

              {/* Message */}
              <FormField label={t.frmMsg} error={errors.message} required meta={meta}>
                <div className="form-icon-wrap" style={{ position: 'relative' }}>
                  <span className="form-icon form-icon--top"><FiMessageSquare size={14} /></span>
                  <textarea
                    className={`form-textarea${errors.message ? ' has-error' : ''}`}
                    value={form.message}
                    onChange={set('message')}
                    placeholder={t.frmMsgPh}
                    rows={5}
                    style={{ fontFamily: meta.font }}
                    aria-required="true"
                    aria-invalid={!!errors.message}
                  />
                  <span
                    className="form-char-count"
                    style={{ color: form.message.length < 20 ? '#C0392B' : '#27AE60' }}
                  >
                    {form.message.length}/20+
                  </span>
                </div>
              </FormField>

              {/* Note + Submit */}
              <div className="form-bottom-row">
                <p className="form-note" style={{ fontFamily: meta.font }}>
                  <FiMail size={12} style={{ color: GOLD }} />
                  {t.frmNote}
                </p>
                <motion.button
                  type="submit"
                  className="form-submit-btn"
                  whileHover={status !== 'submitting' ? { y: -2, scale: 1.02 } : {}}
                  whileTap={status !== 'submitting' ? { scale: 0.97 } : {}}
                  disabled={status === 'submitting'}
                  style={{ fontFamily: meta.font, opacity: status === 'submitting' ? 0.75 : 1, cursor: status === 'submitting' ? 'not-allowed' : 'pointer' }}
                >
                  <FiSend size={15} style={status === 'submitting' ? { animation: 'spin 1s linear infinite' } : {}} />
                  {status === 'submitting'
                    ? (lang === 'en' ? 'Sending…' : lang === 'si' ? 'යවමින්…' : 'அனுப்புகிறது…')
                    : t.frmSubmit}
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
function FormField({ label, children, error, required, meta }) {
  return (
    <div className="form-field">
      <label className="form-label" style={{ fontFamily: meta.font }}>
        {label}
        {required && <span style={{ color: GOLD, marginLeft: 3 }} aria-hidden="true">*</span>}
      </label>
      {children}
      {error && (
        <p className="form-error-msg" style={{ fontFamily: meta.font }}>
          <FiAlertCircle size={12} /> {error}
        </p>
      )}
    </div>
  )
}

function SectionLabel({ icon, children, meta }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, marginBottom: '0.6rem' }}>
      <span style={{ color: GOLD }}>{icon}</span>
      <span style={{
        fontFamily:    meta.isNonLatin ? meta.font : "'Cinzel', serif",
        fontSize:      '0.68rem',
        color:         GOLD,
        fontWeight:    600,
        letterSpacing: meta.isNonLatin ? 0 : '0.1em',
        textTransform: meta.isNonLatin ? 'none' : 'uppercase',
      }}>
        {children}
      </span>
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

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiUser, FiPhone, FiMail, FiMapPin, FiChevronLeft, FiChevronRight, FiBriefcase } from 'react-icons/fi'
import { usePageHold } from '@/shared/hooks/usePageHold'
import ComingSoon from '@/shared/components/ComingSoon'
import '../departments/Departments.css'
import './AboutDeputySecretary.css'

const GOLD  = '#C79A2B'
const CREAM = '#FCFBFA'

const LANG_META = {
  en: { font: 'Inter, sans-serif',               headFont: "'Playfair Display', Georgia, serif", isNonLatin: false },
  si: { font: "'Noto Sans Sinhala', sans-serif", headFont: "'Noto Sans Sinhala', sans-serif",   isNonLatin: true  },
  ta: { font: "'Noto Sans Tamil', sans-serif",   headFont: "'Noto Sans Tamil', sans-serif",     isNonLatin: true  },
}

const T = {
  en: {
    badge:           'Deputy Chief Secretary – Planning',
    name:            'Mr. M.K.G.S.P.K. Jayasekara',
    position:        'Deputy Chief Secretary – Planning, Southern Province Planning Secretariat',
    expTitle:        'Experience',
    experience:      'Over two decades of distinguished service in public administration and development planning since joining the Sri Lanka Planning Service (SLPS) in 2002.',
    descTitle:       'Profile',
    description:     'Mr. M.K.G.S.P.K. Jayasekara serves as the Deputy Chief Secretary (Planning and Monitoring) of the Southern Provincial Council. With more than two decades of experience in development planning, and organizational management, pertaining to the development disciplines he has made significant contributions to regional and national development initiatives throughout his distinguished career as a senior officer of the Sri Lanka Planning Service (SLPS).\n\nSince joining the public service in 2002, he has held several key leadership positions, including Assistant Director (Planning), District Samurdhi Commissioner, Director (Planning) at the Ministry of Agriculture, Director (Planning) of the Southern Provincial Council, Director (Planning) at the District Secretariat Galle, and the Director General (Planning) of the Ministry of Education, Higher Education Division.\n\nHe holds a Bachelor of Science (Agriculture) degree from the University of Ruhuna, a Postgraduate Diploma in Public Management from SLIDA in collaboration with the University of Sri Jayewardenepura, a Postgraduate Diploma in Regional Development and Planning from the University of Kelaniya, and a Master of Human Resources Planning and Development from the Guru Gobind Singh Indraprastha University, New Delhi, India.\n\nRenowned for his expertise in strategic planning, policy implementation, project monitoring, and public sector management, he continues to provide leadership in advancing sustainable development, effective governance, and socio-economic progress across the Southern Province.',
    respTitle:       'Key Responsibilities',
    responsibilities: [
      'Strategic planning oversight and information for the provincial policy formulation endeavors.',
      'Coordination with provincial and national level planning bodies to delivering an effectful and Results oriented Development Planning Approach.',
      'Administrative supervision of all planning divisions in the provincial setups.',
      'Budget planning, resource allocation and financial oversight of all department endeavors of the Southern Provincial Council.',
      'Monitoring and evaluation of provincial development projects.',
      'Liaison with Finance Commission and Relevant central government agencies.',
      'Representing the Secretariat at official inter-agency Discussions.',
    ],
    contactTitle:    'Contact',
    phone:           '+94 91 450 0656',
    email:           'spdcsp@gmail.com',
    office:          'Southern Province Planning Secretariat, Galle',
    deptTitle:       'Division',
    unitLabel:       'Unit',
    unit:            'Planning Secretariat, Southern Province',
    rankLabel:       'Rank',
    rank:            'Senior Executive Officer',
    ctaTitle:        'Get in touch with the Deputy Chief Secretary\'s Office',
    ctaSub:          'For official correspondence or inquiries, use the contact details provided or visit our Contact page.',
    ctaBtn:          'Contact Office',
    backAbout:       'Back to About',
  },
  si: {
    badge:           'නියෝජ්‍ය ප්‍රධාන ලේකම් – සැලසුම්',
    name:            'එම්.කේ.ජී.එස්.පී.කේ. ජයසේකර',
    position:        'නියෝජ්‍ය ප්‍රධාන ලේකම් – සැලසුම්, දකුණු පළාත් සැලසුම් ලේකම් කාර්යාලය',
    expTitle:        'අත්දැකීම',
    experience:      'ශ්‍රී ලංකා සැලසුම් සේවයට (SLPS) 2002 දී බැඳී, රාජ්‍ය පරිපාලනය සහ සංවර්ධන සැලසුම් ක්ෂේත්‍රවල දශක දෙකකට වැඩි කාලයක් කැපවූ සේවාව.',
    descTitle:       'පැතිකඩ',
    description:     'එම්.කේ.ජී.එස්.පී.කේ. ජයසේකර මහතා දකුණු පළාත් සභාවේ නියෝජ්‍ය ප්‍රධාන ලේකම් (සැලසුම් හා අධීක්ෂණ) ධුරය දරයි. රාජ්‍ය පරිපාලනය සහ සංවර්ධන සැලසුම් ක්ෂේත්‍රවල දශක දෙකකට වැඩි කාලය, ශ්‍රී ලංකා සැලසුම් සේවයේ (SLPS) ඔහු දිස්ත්‍රික්ක හා ජාතික සංවර්ධන මුලපිරීම්වලට සැලකිය යුතු දායකත්වයක් ලබා දී ඇත.\n\nඔහු 2002 දී රාජ්‍ය සේවයට බැඳී, සහකාර අධ්‍යක්ෂ (සැලසුම්), දිස්ත්‍රික් සමෘද්ධි කොමසාරිස්, කෘෂිකර්ම අමාත්‍යාංශයේ අධ්‍යක්ෂ (සැලසුම්), දකුණු පළාත් සභාවේ අධ්‍යක්ෂ (සැලසුම්), ගාල්ල දිස්ත්‍රික් ලේකම් කාර්යාලයේ අධ්‍යක්ෂ (සැලසුම්) සහ අධ්‍යාපන අමාත්‍යාංශයේ (උසස් අධ්‍යාපන අංශය) අධ්‍යක්ෂ ජනරාල් (සැලසුම්) ඇතුළු ප්‍රධාන නායකත්ව තනතුරු දරා ඇත.\n\nඔහු රුහුණ විශ්වවිද්‍යාලයෙන් කෘෂිකර්ම විද්‍යා ගෞරව විශේෂ (B.Sc. Agriculture) උපාධිය, SLIDA හා ශ්‍රී ජයවර්ධනපුර විශ්වවිද්‍යාලය ඒකාබද්ධව රාජ්‍ය කළමනාකරණ පශ්චාත් උපාධි ඩිප්ලෝමාව, කැළණිය විශ්වවිද්‍යාලයෙන් ප්‍රාදේශීය සංවර්ධනය සහ සැලසුම්කරණය පිළිබද පශ්චාත් උපාධි ඩිප්ලෝමාව සහ ඉන්දියාවේ Guru Gobind Singh Indraprastha University හි මානවසම්පත් සැලසුම්කරණය හා සංවර්ධනය පිළිබඳ ශාස්ත්‍රපති උපාධිය ලබා ඇත.\n\nඋපාය මාර්ගික සැලසුම්, ප්‍රතිපත්ති ක්‍රියාත්මක කිරීම, ව්‍යාපෘති අධීක්ෂණය සහ රාජ්‍ය අංශ කළමනාකරණ ක්ෂේත්‍රවල ප්‍රවීණතාව සඳහා ප්‍රකට ඔහු, දකුණු පළාතේ තිරසාර සංවර්ධනය, ඵලදායි පාලනය සහ සමාජ-ආර්ථික ප්‍රගතිය ඉදිරිපත් කිරීමේ නායකත්වය නිරන්තරව ලබා දෙයි.',
    respTitle:       'ප්‍රධාන වගකීම්',
    responsibilities: [
      'උපායමාර්ගික සැලසුම් අධීක්ෂණය සහ පළාත් ප්‍රතිපත්ති සකස් කිරීම',
      'පළාත් හා ජාතික සැලසුම් ආයතන සමඟ සම්බන්ධීකරණය',
      'සියලු සැලසුම් අංශවල පරිපාලන අධීක්ෂණය',
      'අයවැය සැලසුම්, සම්පත් බෙදාහැරීම සහ මූල්‍ය අධීක්ෂණය',
      'පළාත් සංවර්ධන ව්‍යාපෘති අධීක්ෂණය සහ ඇගයීම',
      'මුදල් කොමිෂන් සභාව සහ මධ්‍යම රජයේ ආයතන සමඟ සම්බන්ධතා',
      'නිල ආයතන අතර රැස්වීම්වලදී ලේකම් කාර්යාලය නියෝජනය',
    ],
    contactTitle:    'සම්බන්ධතා',
    phone:           '+94 91 450 0656',
    email:           'spdcsp@gmail.com',
    office:          'දකුණු පළාත් සැලසුම් ලේකම් කාර්යාලය, ගාල්ල',
    deptTitle:       'අංශය',
    unitLabel:       'ඒකකය',
    unit:            'සැලසුම් ලේකම් කාර්යාලය, දකුණු පළාත',
    rankLabel:       'තනතුර',
    rank:            'ජ්‍යෙෂ්ඨ විධායක නිලධාරී',
    ctaTitle:        'නියෝජ්‍ය ප්‍රධාන ලේකම් කාර්යාලය සමඟ සම්බන්ධ වන්න',
    ctaSub:          'නිල ලිපි හෝ විමසීම් සඳහා සම්බන්ධතා විස්තර භාවිතා කරන්න.',
    ctaBtn:          'කාර්යාලය අමතන්න',
    backAbout:       'අප ගැන',
  },
  ta: {
    badge:           'துணை தலைமை செயலர் – திட்டமிடல்',
    name:            'திரு. எம்.கே.ஜி.எஸ்.பி.கே. ஜயசேகர',
    position:        'துணை தலைமை செயலர் – திட்டமிடல், தென் மாகாண திட்டமிடல் செயலகம்',
    expTitle:        'அனுபவம்',
    experience:      '2002 ஆம் ஆண்டு இலங்கை திட்டமிடல் சேவையில் (SLPS) இணைந்து, பொது நிர்வாகம் மற்றும் வளர்ச்சித் திட்டமிடல் துறைகளில் இரண்டு தசாப்தங்களுக்கும் மேலான சேவை.',
    descTitle:       'சுயவிவரம்',
    description:     'திரு. எம்.கே.ஜி.எஸ்.பி.கே. ஜயசேகர தென் மாகாண சபையின் துணை தலைமை செயலர் (திட்டமிடல் மற்றும் கண்காணிப்பு) பதவியில் பணியாற்றுகிறார். பொது நிர்வாகம் மற்றும் வளர்ச்சித் திட்டமிடல் துறைகளில் இரண்டு தசாப்தங்களுக்கும் மேலான அனுபவத்துடன், இலங்கை திட்டமிடல் சேவையில் (SLPS) தனது சிறந்த தொழில் வாழ்க்கையில் பிராந்திய மற்றும் தேசிய வளர்ச்சி முயற்சிகளுக்கு குறிப்பிடத்தக்க பங்களிப்பை வழங்கியுள்ளார்.\n\n2002 ஆம் ஆண்டு பொதுச் சேவையில் இணைந்தது முதல், உதவி இயக்குநர் (திட்டமிடல்), மாவட்ட சமுர்த்தி ஆணையர், விவசாய அமைச்சகத்தில் இயக்குநர் (திட்டமிடல்), தென் மாகாண சபையில் இயக்குநர் (திட்டமிடல்), காலி மாவட்ட செயலகத்தில் இயக்குநர் (திட்டமிடல்) மற்றும் கல்வி அமைச்சகத்தில் (உயர்கல்வி பிரிவு) இயக்குநர் ஜெனரல் (திட்டமிடல்) உள்ளிட்ட முக்கிய தலைமை பதவிகளை வகித்துள்ளார்.\n\nரஹுண பல்கலைக்கழகத்தில் இருந்து விவசாயவியல் இளங்கலை (B.Sc.) பட்டம், SLIDA மற்றும் ஸ்ரீ ஜயவர்தனபுர பல்கலைக்கழகம் இணைந்து வழங்கும் பொது நிர்வாகத்தில் பட்டமேற்படிப்பு டிப்ளோமா, கேளணிய பல்கலைக்கழகத்தில் பிராந்திய வளர்ச்சி மற்றும் திட்டமிடலில் பட்டமேற்படிப்பு டிப்ளோமா மற்றும் இந்தியாவில் குரு கோவிந்த் சிங் இந்திரப்பிரஸ்த பல்கலைக்கழகத்தில் மனித வள திட்டமிடல் மற்றும் மேம்பாட்டில் முதுகலைப் பட்டம் பெற்றுள்ளார்.\n\nமூலோபாய திட்டமிடல், கொள்கை செயலாக்கம், திட்ட கண்காணிப்பு மற்றும் பொதுத் துறை மேலாண்மை ஆகியவற்றில் தனது நிபுணத்துவத்திற்காக பெயர் பெற்ற அவர், தென் மாகாணம் முழுவதும் நிலையான வளர்ச்சி, திறமையான ஆட்சி மற்றும் சமூக-பொருளாதார முன்னேற்றத்தை மேம்படுத்துவதில் தலைமை வழங்கி வருகிறார்.',
    respTitle:       'முக்கிய பொறுப்புகள்',
    responsibilities: [
      'மூலோபாய திட்டமிடல் மேற்பார்வை மற்றும் மாகாண கொள்கை உருவாக்கம்',
      'மாகாண மற்றும் தேசிய திட்டமிடல் அமைப்புகளுடன் ஒருங்கிணைப்பு',
      'அனைத்து திட்டமிடல் பிரிவுகளின் நிர்வாக மேற்பார்வை',
      'பட்ஜெட் திட்டமிடல், வள ஒதுக்கீடு மற்றும் நிதி மேற்பார்வை',
      'மாகாண வளர்ச்சி திட்டங்களை கண்காணித்தல் மற்றும் மதிப்பீடு',
      'நிதி ஆணையம் மற்றும் மத்திய அரசு நிறுவனங்களுடன் தொடர்பு',
      'அதிகாரப்பூர்வ நிறுவனங்களுக்கிடையான கூட்டங்களில் செயலகத்தை பிரதிநிதித்துவப்படுத்துதல்',
    ],
    contactTitle:    'தொடர்பு',
    phone:           '+94 91 450 0656',
    email:           'spdcsp@gmail.com',
    office:          'தென் மாகாண திட்டமிடல் செயலகம், காலி',
    deptTitle:       'துறை',
    unitLabel:       'பிரிவு',
    unit:            'திட்டமிடல் செயலகம், தென் மாகாணம்',
    rankLabel:       'தரம்',
    rank:            'மூத்த நிர்வாக அதிகாரி',
    ctaTitle:        'துணை தலைமை செயலர் அலுவலகத்தை தொடர்பு கொள்ளுங்கள்',
    ctaSub:          'உத்தியோகபூர்வ கடிதங்கள் அல்லது விசாரணைகளுக்கு தொடர்பு விவரங்களை பயன்படுத்தவும்.',
    ctaBtn:          'அலுவலகத்தை தொடர்பு கொள்ளுங்கள்',
    backAbout:       'எங்களைப் பற்றி',
  },
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

export default function AboutDeputySecretary() {
  const held = usePageHold('about-deputy-secretary')
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en')
  const [imgOk, setImgOk] = useState(true)

  useEffect(() => {
    const h = () => setLang(localStorage.getItem('lang') || 'en')
    window.addEventListener('langChange', h)
    return () => window.removeEventListener('langChange', h)
  }, [])

  const meta = LANG_META[lang] || LANG_META.en
  const t    = T[lang]         || T.en

  const staggerV = { hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }
  const itemV    = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } } }
  const imgV     = { hidden: { opacity: 0, scale: 0.88 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.70, ease: [0.22, 1, 0.36, 1] } } }

  if (held) return <ComingSoon pageKey="aboutDeputySecretary" />

  return (
    <div className="dprof-wrap" style={{ background: CREAM, minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <section className="dprof-hero" aria-label={`Profile: ${t.name}`}>
        <div className="dprof-hero__noise"      aria-hidden="true" />
        <div className="dprof-hero__grid-lines" aria-hidden="true" />
        <div className="dprof-hero__glow dprof-hero__glow--gold"  aria-hidden="true" />
        <div className="dprof-hero__glow dprof-hero__glow--right" aria-hidden="true" />
        <div className="dep-hero__hc" aria-hidden="true" style={{ opacity: 0.05 }}><HoneycombBg /></div>
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`dep-hero__dot dep-hero__dot--${i + 1}`} aria-hidden="true" />
        ))}

        <div className="dprof-hero__inner">
          {/* Avatar */}
          <motion.div initial="hidden" animate="visible" variants={imgV} style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="dprof__img-frame" role="img" aria-label={t.name}>
              {imgOk
                ? <img src="/branding/sec-prof.png" alt={t.name} className="dprof__img" onError={() => setImgOk(false)} />
                : <div className="dprof__img-placeholder" aria-hidden="true"><FiUser size={48} /></div>
              }
            </div>
          </motion.div>

          {/* Text */}
          <motion.div className="dprof-hero__content" initial="hidden" animate="visible" variants={staggerV}>
            <motion.div className="dprof-hero__badge" variants={itemV}>
              <span className="dprof-hero__badge-dot" aria-hidden="true" />
              <span style={{
                fontFamily:    meta.isNonLatin ? meta.font : "'Cinzel', serif",
                letterSpacing: meta.isNonLatin ? 0 : '0.12em',
                textTransform: meta.isNonLatin ? 'none' : 'uppercase',
                fontSize: '0.72rem',
              }}>
                {t.badge}
              </span>
            </motion.div>

            <motion.h1
              className="dprof-hero__name"
              style={{ fontFamily: meta.headFont, lineHeight: meta.isNonLatin ? 1.4 : 1.1 }}
              variants={itemV}
            >
              {t.name}
            </motion.h1>

            <motion.div
              className="dprof-hero__rule"
              variants={{ hidden: { scaleX: 0, opacity: 0 }, visible: { scaleX: 1, opacity: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } } }}
              aria-hidden="true"
            />

            <motion.p
              className="dprof-hero__position"
              style={{ fontFamily: meta.font }}
              variants={itemV}
            >
              {t.position}
            </motion.p>

            <motion.div className="dprof-hero__actions" variants={itemV}>
              <Link to="/contact" className="dprof-hero__btn dprof-hero__btn--gold" style={{ fontFamily: meta.font }}>
                <FiPhone size={14} /><span>{t.ctaBtn}</span>
              </Link>
              <Link to="/about" className="dprof-hero__btn dprof-hero__btn--ghost" style={{ fontFamily: meta.font }}>
                <FiChevronLeft size={14} /><span>{t.backAbout}</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <svg className="dprof-hero__wave" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,80 C240,20 480,60 720,40 C960,20 1200,60 1440,30 L1440,80 Z" fill={CREAM} />
        </svg>
      </section>

      {/* ── Body ── */}
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
              <FiPhone size={15} style={{ color: GOLD }} aria-hidden="true" />
              {t.contactTitle}
            </div>

            <div className="dprof-info-row">
              <div className="dprof-info-row__icon"><FiPhone aria-hidden="true" /></div>
              <div>
                <div className="dprof-info-row__label">Telephone</div>
                <div className="dprof-info-row__value">
                  <a href={`tel:${t.phone}`}>{t.phone}</a>
                </div>
              </div>
            </div>

            <div className="dprof-info-row">
              <div className="dprof-info-row__icon"><FiMail aria-hidden="true" /></div>
              <div>
                <div className="dprof-info-row__label">Email</div>
                <div className="dprof-info-row__value">
                  <a href={`mailto:${t.email}`}>{t.email}</a>
                </div>
              </div>
            </div>

            <div className="dprof-info-row">
              <div className="dprof-info-row__icon"><FiMapPin aria-hidden="true" /></div>
              <div>
                <div className="dprof-info-row__label">Office</div>
                <div className="dprof-info-row__value" style={{ fontFamily: meta.font }}>{t.office}</div>
              </div>
            </div>
          </motion.div>

          {/* Experience card */}
          <motion.div
            className="dprof-info-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="dprof-info-card__heading">
              <FiBriefcase size={15} style={{ color: GOLD }} aria-hidden="true" />
              {t.expTitle}
            </div>
            <div className="dprof-info-row">
              <div>
                <div className="dprof-info-row__value" style={{ fontFamily: meta.font }}>{t.experience}</div>
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
            <h2
              className="dprof-section-card__heading"
              style={{ fontFamily: meta.isNonLatin ? meta.font : undefined }}
            >
              {t.descTitle}
            </h2>
            <div className="dprof-section-card__body">
              {t.description.split('\n\n').map((para, i) => (
                <p key={i} className="dprof-desc-para" style={{ fontFamily: meta.font }}>{para}</p>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="dprof-section-card"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.48, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2
              className="dprof-section-card__heading"
              style={{ fontFamily: meta.isNonLatin ? meta.font : undefined }}
            >
              {t.respTitle}
            </h2>
            <div className="dprof-section-card__body">
              <ul className="dprof-resp-list" role="list">
                {t.responsibilities.map((r, i) => (
                  <li key={i} style={{ fontFamily: meta.font }}>{r}</li>
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
              <div
                className="dprof-contact-cta__title"
                style={{ fontFamily: meta.isNonLatin ? meta.font : undefined }}
              >
                {t.ctaTitle}
              </div>
              <p style={{ fontFamily: meta.font }}>{t.ctaSub}</p>
            </div>
            <Link to="/contact" className="dprof-contact-cta__btn" style={{ fontFamily: meta.font }}>
              {t.ctaBtn} <FiChevronRight size={14} aria-hidden="true" />
            </Link>
          </motion.div>
        </main>

      </div>
    </div>
  )
}

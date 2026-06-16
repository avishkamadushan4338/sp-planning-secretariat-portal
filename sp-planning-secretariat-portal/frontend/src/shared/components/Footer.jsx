import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiMail, FiPhone, FiMapPin, FiChevronRight } from 'react-icons/fi'
import { FaFacebookF, FaYoutube, FaLinkedinIn } from 'react-icons/fa'
import './Footer.css'

/* ── Translations ────────────────────────────────────────────────────────── */
const FOOTER_T = {
  en: {
    font:      'Inter, system-ui, sans-serif',
    headFont:  "'Cinzel', Georgia, serif",
    headStyle: { letterSpacing: '0.08em', textTransform: 'uppercase' },
    address:   '153B, S.H. Dahanayaka Mawatha, Galle, Sri Lanka.',
    navHeading:   'Site Navigations',
    mediaHeading: 'Media Center',
    navLinks: [
      { label: 'About Secretary', path: '/about' },
      { label: 'Divisions',        path: '/departments' },
      { label: 'Downloads',       path: '/downloads'   },
      { label: 'FAQs',            path: '/faq'         },
      { label: 'Contact Us',      path: '/contact'     },
    ],
    mediaLinks: [
      { label: 'Latest News',     path: '/news'      },
      { label: 'Photo Gallery',   path: '/gallery'   },
      { label: 'Official Notices', path: '/news?tab=notices' },
      { label: 'Downloads',       path: '/downloads' },
    ],
    copyright:  (y) => `© ${y} Planning Secretariat – Southern Province, Sri Lanka. All Rights Reserved.`,
    creditPre:  'Designed & Maintained by the',
    creditBold: 'ICT Division',
    creditPost: '',
    terms:      'Terms & Services',
  },

  si: {
    font:      "'Noto Sans Sinhala', sans-serif",
    headFont:  "'Noto Sans Sinhala', sans-serif",
    headStyle: { letterSpacing: 0, textTransform: 'none' },
    address:   '153B, එස්.එච්. දහනායක මාවත, ගාල්ල, ශ්‍රී ලංකාව.',
    navHeading:   'වෙබ් සිතියම',
    mediaHeading: 'මාධ්‍ය මධ්‍යස්ථානය',
    navLinks: [
      { label: 'අප ගැන',              path: '/about' },
      { label: 'අංශ',      path: '/departments' },
      { label: 'බාගත කිරීම්',        path: '/downloads'   },
      { label: 'නිතර අසන ප්‍රශ්න', path: '/faq'         },
      { label: 'අප අමතන්න',         path: '/contact'     },
    ],
    mediaLinks: [
      { label: 'නවතම ප්‍රවෘත්ති',  path: '/news'                },
      { label: 'ඡායාරූප ගැලරිය',  path: '/gallery'             },
      { label: 'නිල නිවේදන',       path: '/news?tab=notices'   },
      { label: 'බාගත කිරීම්',      path: '/downloads'          },
    ],
    copyright:  (y) => `© ${y} දකුණු පළාත් සැලසුම් ලේකම් කාර්යාලය. සියලු හිමිකම් ඇවිරිණි.`,
    creditPre:  '',
    creditBold: 'ICT',
    creditPost: ' අංශය විසින් සැලසුම් කර නඩත්තු කරනු ලැබේ',
    terms:      'නියම හා සේවා',
  },

  ta: {
    font:      "'Noto Sans Tamil', sans-serif",
    headFont:  "'Noto Sans Tamil', sans-serif",
    headStyle: { letterSpacing: 0, textTransform: 'none' },
    address:   '153B, எஸ்.எச். தஹநாயக மாவத்தை, காலி, இலங்கை.',
    navHeading:   'தள வழிசெலுத்தல்',
    mediaHeading: 'ஊடக மையம்',
    navLinks: [
      { label: 'எங்களைப் பற்றி',                    path: '/about' },
      { label: 'திணைக்களங்கள்',                     path: '/departments' },
      { label: 'பதிவிறக்கங்கள்',                   path: '/downloads'   },
      { label: 'அடிக்கடி கேட்கப்படும் கேள்விகள்', path: '/faq'        },
      { label: 'தொடர்பு கொள்ளுங்கள்',             path: '/contact'     },
    ],
    mediaLinks: [
      { label: 'சமீபத்திய செய்திகள்',          path: '/news'              },
      { label: 'புகைப்பட தொகுப்பு',             path: '/gallery'           },
      { label: 'அதிகாரப்பூர்வ அறிவிப்புகள்',   path: '/news?tab=notices' },
      { label: 'பதிவிறக்கங்கள்',                path: '/downloads'         },
    ],
    copyright:  (y) => `© ${y} தென் மாகாண திட்டமிடல் செயலகம். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.`,
    creditPre:  '',
    creditBold: 'ICT',
    creditPost: ' பிரிவால் வடிவமைக்கப்பட்டு பராமரிக்கப்படுகிறது',
    terms:      'விதிமுறைகள் & சேவைகள்',
  },
}

/* ── Footer ──────────────────────────────────────────────────────────────── */
export default function Footer() {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en')
  const year = new Date().getFullYear()

  useEffect(() => {
    const h = (e) => setLang(e.detail || 'en')
    window.addEventListener('langChange', h)
    return () => window.removeEventListener('langChange', h)
  }, [])

  const t  = FOOTER_T[lang] || FOOTER_T.en
  const en = FOOTER_T.en

  return (
    <footer className="footer">

      {/* ── Main body ── */}
      <div className="footer-main">
        <div className="footer-arc" aria-hidden="true" />

        <div className="footer-container">
          <div className="footer-grid">

            {/* Card 1 — Brand + Contact */}
            <div className="footer-card">
              <div className="footer-logo-wrap">
                <img
                  src="/branding/f-logo.svg"
                  alt="Planning Secretariat – Southern Province, Sri Lanka"
                  className="footer-logo"
                  onError={(e) => { e.currentTarget.src = '/branding/logo.png' }}
                />
              </div>

              <ul className="footer-contact-list">
                <li className="footer-contact-item">
                  <span className="footer-contact-icon-wrap"><FiMapPin size={15} /></span>
                  <span className="footer-contact-text" style={{ fontFamily: t.font }}>{t.address}</span>
                </li>
                <li className="footer-contact-item">
                  <span className="footer-contact-icon-wrap"><FiPhone size={15} /></span>
                  <span className="footer-contact-text">+94 912234503</span>
                </li>
                <li className="footer-contact-item">
                  <span className="footer-contact-icon-wrap"><FiMail size={15} /></span>
                  <span className="footer-contact-text">spdcsp@gmail.com</span>
                </li>
              </ul>

              <div className="footer-socials">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"
                  className="footer-social-btn" aria-label="Facebook">
                  <FaFacebookF size={13} />
                </a>
                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer"
                  className="footer-social-btn" aria-label="YouTube">
                  <FaYoutube size={15} />
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"
                  className="footer-social-btn" aria-label="LinkedIn">
                  <FaLinkedinIn size={13} />
                </a>
              </div>
            </div>

            {/* Card 2 — Site Navigation */}
            <div className="footer-card">
              <h3 className="footer-card-heading" style={{ fontFamily: t.headFont, ...t.headStyle }}>
                {t.navHeading}
              </h3>
              <ul className="footer-nav-list">
                {t.navLinks.map((l) => (
                  <li key={l.path + l.label}>
                    <Link to={l.path} className="footer-nav-link" style={{ fontFamily: t.font }}>
                      <FiChevronRight size={14} className="footer-chevron" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 3 — Media Center */}
            <div className="footer-card footer-card--media">
              <h3 className="footer-card-heading" style={{ fontFamily: t.headFont, ...t.headStyle }}>
                {t.mediaHeading}
              </h3>
              <ul className="footer-nav-list">
                {t.mediaLinks.map((l) => (
                  <li key={l.path + l.label}>
                    <Link to={l.path} className="footer-nav-link" style={{ fontFamily: t.font }}>
                      <FiChevronRight size={14} className="footer-chevron" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* ── Bottom bar — always English ── */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-inner">
          <p className="footer-copyright" style={{ fontFamily: en.font }}>
            {en.copyright(year)}
          </p>
          <p className="footer-credit" style={{ fontFamily: en.font }}>
            {en.creditPre && <>{en.creditPre} </>}
            <strong>{en.creditBold}</strong>
            {en.creditPost}
          </p>
          <Link to="/terms" className="footer-terms" style={{ fontFamily: en.font }}>
            {en.terms}
          </Link>
        </div>
      </div>

    </footer>
  )
}

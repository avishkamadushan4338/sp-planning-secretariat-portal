import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiUser, FiLock, FiEye, FiEyeOff, FiShield, FiAlertCircle } from 'react-icons/fi'
import { verifyLogin } from './cmsAuth'

const MAROON  = '#4A0918'
const MAROON2 = '#3A0712'
const GOLD    = '#C79A2B'
const GOLD2   = '#E8B84B'
const CREAM   = '#FCFBFA'

const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 24, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0,  filter: 'blur(0px)',
    transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] } },
})

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 1.5 + Math.random() * 2.5,
  duration: 6 + Math.random() * 8,
  delay: Math.random() * 4,
}))

export default function CMSLogin() {
  const [username, setUsername]     = useState('')
  const [password, setPassword]     = useState('')
  const [showPass, setShowPass]     = useState(false)
  const [remember, setRemember]     = useState(false)
  const [loading, setLoading]       = useState(false)
  const [error, setError]           = useState('')
  const [userFocus, setUserFocus]   = useState(false)
  const [passFocus, setPassFocus]   = useState(false)
  const [mounted, setMounted]       = useState(false)

  const navigate = useNavigate()

  useEffect(() => { setMounted(true) }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.')
      return
    }
    setError('')
    setLoading(true)
    try {
      const ok = await verifyLogin(username.trim(), password)
      if (!ok) {
        setError('Invalid username or password.')
        setLoading(false)
        return
      }
      sessionStorage.setItem('cms_auth', '1')
      navigate('/cms/dashboard')
    } catch {
      setError('Authentication error. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      fontFamily: 'Inter, sans-serif',
      background: MAROON2,
      overflow: 'hidden',
      position: 'relative',
    }}>

      {/* ── Left panel ──────────────────────────────────────────────────── */}
      <div className="hidden lg:flex" style={{
        width: '52%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        background: `linear-gradient(155deg, ${MAROON2} 0%, #5C1428 55%, #3A0710 100%)`,
        padding: '3rem 3.5rem',
      }}>

        {/* Geometric grid overlay */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.06, pointerEvents: 'none' }}>
          <defs>
            <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke={GOLD} strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Radial glow */}
        <div style={{
          position: 'absolute', top: '30%', left: '20%',
          width: 500, height: 500,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(199,154,43,0.12) 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />

        {/* Floating particles */}
        {mounted && PARTICLES.map(p => (
          <motion.div key={p.id}
            style={{
              position: 'absolute',
              left: `${p.x}%`, top: `${p.y}%`,
              width: p.size, height: p.size,
              borderRadius: '50%',
              background: GOLD,
              opacity: 0.25,
              pointerEvents: 'none',
            }}
            animate={{ y: [0, -18, 0], opacity: [0.15, 0.4, 0.15] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        {/* Large decorative ring */}
        <svg style={{ position: 'absolute', right: -120, top: '50%', transform: 'translateY(-50%)', opacity: 0.08, pointerEvents: 'none' }}
          width="520" height="520" viewBox="0 0 520 520">
          <circle cx="260" cy="260" r="240" stroke={GOLD} strokeWidth="1.2" fill="none" />
          <circle cx="260" cy="260" r="190" stroke={GOLD} strokeWidth="0.7" fill="none" />
          <circle cx="260" cy="260" r="130" stroke={GOLD} strokeWidth="0.5" fill="none" />
          {Array.from({ length: 12 }, (_, i) => {
            const a = (i / 12) * Math.PI * 2
            return <line key={i}
              x1={260 + 130 * Math.cos(a)} y1={260 + 130 * Math.sin(a)}
              x2={260 + 240 * Math.cos(a)} y2={260 + 240 * Math.sin(a)}
              stroke={GOLD} strokeWidth="0.5" />
          })}
        </svg>

        {/* Logo */}
        <motion.div variants={fadeUp(0.1)} initial="hidden" animate="visible" style={{ position: 'relative', zIndex: 1 }}>
          <img src="/branding/f-logo.svg" alt="Planning Secretariat"
            style={{ height: 200, width: 'auto', objectFit: 'contain', opacity: 0.92 }}
          />
        </motion.div>

        {/* Center copy */}
        <motion.div variants={fadeUp(0.2)} initial="hidden" animate="visible"
          style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(199,154,43,0.12)',
            border: '1px solid rgba(199,154,43,0.3)',
            borderRadius: 100, padding: '5px 14px', marginBottom: '1.5rem',
          }}>
            <FiShield size={11} color={GOLD} />
            <span style={{ fontFamily: "'Cinzel', serif", fontSize: '0.65rem', letterSpacing: '0.14em', color: GOLD, fontWeight: 600 }}>
              SECURE ADMIN PORTAL
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2rem, 3vw, 2.8rem)',
            fontWeight: 800,
            color: '#fff',
            lineHeight: 1.2,
            marginBottom: '1.1rem',
          }}>
            Content Management<br />
            <span style={{ color: GOLD }}>System</span>
          </h1>

          <p style={{
            fontSize: '0.9rem',
            color: 'rgba(255,255,255,0.52)',
            lineHeight: 1.8,
            maxWidth: 360,
          }}>
            Manage official content, publications, and announcements for the
            Planning Secretariat web portal from a single secure dashboard.
          </p>

          {/* Feature pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: '2rem' }}>
            {['Content Editor', 'Media Library', 'User Roles', 'Audit Logs', 'Multilingual'].map(f => (
              <span key={f} style={{
                fontSize: '0.73rem', fontWeight: 500,
                color: 'rgba(255,255,255,0.55)',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 6, padding: '4px 11px',
              }}>{f}</span>
            ))}
          </div>
        </motion.div>

        {/* Bottom strip */}
        <motion.p variants={fadeUp(0.3)} initial="hidden" animate="visible"
          style={{ position: 'relative', zIndex: 1, fontSize: '0.72rem', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.04em' }}>
          © {new Date().getFullYear()} Planning Secretariat – Southern Province, Sri Lanka.
        </motion.p>
      </div>

      {/* ── Right panel ─────────────────────────────────────────────────── */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: CREAM,
        position: 'relative',
        overflow: 'hidden',
        padding: '2rem 1.5rem',
      }}>

        {/* Subtle background pattern */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.025, pointerEvents: 'none' }}>
          <defs>
            <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.2" fill={MAROON} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>

        {/* Top-right glow */}
        <div style={{
          position: 'absolute', top: -100, right: -100,
          width: 360, height: 360, borderRadius: '50%',
          background: `radial-gradient(circle, rgba(199,154,43,0.1) 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />

        {/* Back to portal link */}
        <a href="/home"
          style={{
            position: 'absolute', top: '1.25rem', right: '1.5rem',
            display: 'flex', alignItems: 'center', gap: 5,
            fontSize: '0.72rem', color: 'rgba(74,9,24,0.42)',
            textDecoration: 'none', fontWeight: 500, zIndex: 2,
            padding: '5px 10px', borderRadius: 8,
            border: '1px solid rgba(74,9,24,0.1)',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = MAROON; e.currentTarget.style.background = 'rgba(74,9,24,0.04)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(74,9,24,0.42)'; e.currentTarget.style.background = 'transparent' }}>
          ← Public Portal
        </a>

        <div style={{ width: '100%', maxWidth: 420, position: 'relative', zIndex: 1 }}>

          {/* Mobile logo */}
          <motion.div className="flex lg:hidden" variants={fadeUp(0)} initial="hidden" animate="visible"
            style={{ justifyContent: 'center', marginBottom: '2rem' }}>
            <img src="/branding/f-logo.svg" alt="Planning Secretariat"
              style={{ height: 110, width: 'auto', objectFit: 'contain' }}
            />
          </motion.div>

          {/* Shield icon */}
          <motion.div variants={fadeUp(0.05)} initial="hidden" animate="visible"
            style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <div style={{
              width: 56, height: 56, borderRadius: 16,
              background: `linear-gradient(135deg, ${MAROON} 0%, #6E1528 100%)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 8px 28px rgba(74,9,24,0.28)`,
            }}>
              <FiShield size={24} color="#fff" />
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div variants={fadeUp(0.1)} initial="hidden" animate="visible"
            style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)',
              fontWeight: 800, color: MAROON, marginBottom: '0.4rem',
            }}>
              Administrator Sign In
            </h2>
            <p style={{ fontSize: '0.83rem', color: 'rgba(74,9,24,0.5)', lineHeight: 1.5 }}>
              Authorized personnel only — all access is monitored and logged
            </p>
          </motion.div>

          {/* Divider */}
          <motion.div variants={fadeUp(0.13)} initial="hidden" animate="visible"
            style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.75rem' }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(74,9,24,0.1)' }} />
            <OrnamentDot />
            <div style={{ flex: 1, height: 1, background: 'rgba(74,9,24,0.1)' }} />
          </motion.div>

          {/* Form */}
          <motion.form variants={fadeUp(0.16)} initial="hidden" animate="visible"
            onSubmit={handleSubmit} autoComplete="off">

            {/* Username */}
            <div style={{ marginBottom: '1.1rem' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600,
                color: MAROON, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Username
              </label>
              <div style={{
                position: 'relative',
                border: `1.5px solid ${userFocus ? GOLD : 'rgba(74,9,24,0.18)'}`,
                borderRadius: 10,
                background: userFocus ? 'rgba(199,154,43,0.03)' : '#fff',
                transition: 'border-color 0.2s, background 0.2s',
                boxShadow: userFocus ? `0 0 0 3px rgba(199,154,43,0.12)` : 'none',
              }}>
                <FiUser size={15} style={{
                  position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
                  color: userFocus ? GOLD : 'rgba(74,9,24,0.35)',
                  transition: 'color 0.2s',
                }} />
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                  placeholder="Enter your username"
                  autoComplete="username"
                  style={{
                    width: '100%', border: 'none', outline: 'none',
                    padding: '12px 14px 12px 40px',
                    fontSize: '0.875rem', color: MAROON,
                    background: 'transparent', borderRadius: 10,
                    fontFamily: 'Inter, sans-serif',
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: '1.1rem' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600,
                color: MAROON, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Password
              </label>
              <div style={{
                position: 'relative',
                border: `1.5px solid ${passFocus ? GOLD : 'rgba(74,9,24,0.18)'}`,
                borderRadius: 10,
                background: passFocus ? 'rgba(199,154,43,0.03)' : '#fff',
                transition: 'border-color 0.2s, background 0.2s',
                boxShadow: passFocus ? `0 0 0 3px rgba(199,154,43,0.12)` : 'none',
              }}>
                <FiLock size={15} style={{
                  position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
                  color: passFocus ? GOLD : 'rgba(74,9,24,0.35)',
                  transition: 'color 0.2s',
                }} />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onFocus={() => setPassFocus(true)}
                  onBlur={() => setPassFocus(false)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  style={{
                    width: '100%', border: 'none', outline: 'none',
                    padding: '12px 44px 12px 40px',
                    fontSize: '0.875rem', color: MAROON,
                    background: 'transparent', borderRadius: 10,
                    fontFamily: 'Inter, sans-serif',
                  }}
                />
                <button type="button" onClick={() => setShowPass(v => !v)}
                  style={{
                    position: 'absolute', right: 13, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', padding: 2,
                    color: 'rgba(74,9,24,0.4)', display: 'flex', alignItems: 'center',
                  }}>
                  {showPass ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                </button>
              </div>
            </div>

            {/* Remember me + Forgot */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <div onClick={() => setRemember(v => !v)} style={{
                  width: 18, height: 18, borderRadius: 5,
                  border: `1.5px solid ${remember ? GOLD : 'rgba(74,9,24,0.25)'}`,
                  background: remember ? GOLD : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.18s', cursor: 'pointer', flexShrink: 0,
                }}>
                  {remember && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span style={{ fontSize: '0.8rem', color: 'rgba(74,9,24,0.6)', userSelect: 'none' }}>
                  Keep me signed in
                </span>
              </label>
            </div>

            {/* Error message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -8, height: 0 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    background: 'rgba(220,38,38,0.07)',
                    border: '1px solid rgba(220,38,38,0.2)',
                    borderRadius: 8, padding: '9px 13px',
                    marginBottom: '1rem',
                  }}>
                  <FiAlertCircle size={14} color="#DC2626" />
                  <span style={{ fontSize: '0.8rem', color: '#DC2626' }}>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <motion.button
              type="submit"
              whileHover={!loading ? { y: -2, boxShadow: `0 10px 32px rgba(74,9,24,0.38)` } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
              disabled={loading}
              style={{
                width: '100%',
                padding: '13px',
                borderRadius: 10,
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                background: loading
                  ? 'rgba(74,9,24,0.5)'
                  : `linear-gradient(135deg, ${MAROON} 0%, #6E1528 100%)`,
                color: '#fff',
                fontFamily: "'Cinzel', serif",
                fontSize: '0.82rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                boxShadow: loading ? 'none' : `0 6px 22px rgba(74,9,24,0.3)`,
                transition: 'background 0.2s, box-shadow 0.2s',
              }}>
              {loading ? <Spinner /> : <><FiShield size={14} /> Sign In to Portal</>}
            </motion.button>
          </motion.form>

          {/* Footer note */}
          <motion.div variants={fadeUp(0.28)} initial="hidden" animate="visible"
            style={{ marginTop: '2rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.72rem', color: 'rgba(74,9,24,0.35)', lineHeight: 1.7 }}>
              This is a restricted system. Unauthorized access is prohibited and<br />
              subject to disciplinary and/or legal action.
            </p>
          </motion.div>

          {/* Divider + version */}
          <motion.div variants={fadeUp(0.34)} initial="hidden" animate="visible"
            style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(74,9,24,0.08)' }} />
            <span style={{ fontSize: '0.68rem', color: 'rgba(74,9,24,0.28)', fontFamily: "'Cinzel', serif", letterSpacing: '0.1em' }}>
              CMS v1.0
            </span>
            <div style={{ flex: 1, height: 1, background: 'rgba(74,9,24,0.08)' }} />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function Spinner() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
      style={{
        width: 18, height: 18, borderRadius: '50%',
        border: '2px solid rgba(255,255,255,0.25)',
        borderTopColor: '#fff',
      }}
    />
  )
}

function OrnamentDot() {
  return (
    <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
      <circle cx="9" cy="5" r="3" fill={GOLD} opacity="0.7" />
      <circle cx="3" cy="5" r="1.5" fill={GOLD} opacity="0.35" />
      <circle cx="15" cy="5" r="1.5" fill={GOLD} opacity="0.35" />
    </svg>
  )
}

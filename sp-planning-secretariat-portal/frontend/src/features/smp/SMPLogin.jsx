import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiUser, FiLock, FiEye, FiEyeOff, FiPackage, FiAlertCircle, FiShield } from 'react-icons/fi'
import { SMPProvider, useSMP } from './SMPContext'

const MAROON  = '#4A0918'
const MAROON2 = '#3A0712'
const GOLD    = '#C79A2B'
const CREAM   = '#FCFBFA'

const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  id: i, x: Math.random() * 100, y: Math.random() * 100,
  size: 1.5 + Math.random() * 2, duration: 6 + Math.random() * 8, delay: Math.random() * 4,
}))

const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0,  filter: 'blur(0px)',
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] } },
})

function LoginForm() {
  const { signIn, loading, error } = useSMP()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [uFocus,   setUFocus]   = useState(false)
  const [pFocus,   setPFocus]   = useState(false)
  const [mounted,  setMounted]  = useState(false)

  useEffect(() => {
    setMounted(true)
    const u = localStorage.getItem('smp_user')
    if (u) navigate('/smp/dashboard', { replace: true })
  }, [navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await signIn(username.trim(), password)
    if (res.ok) navigate('/smp/dashboard', { replace: true })
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', fontFamily: 'Inter, sans-serif', background: MAROON2, overflow: 'hidden', position: 'relative' }}>

      {/* Left decorative panel */}
      <div className="hidden lg:flex" style={{
        width: '50%', flexDirection: 'column', justifyContent: 'space-between',
        position: 'relative', overflow: 'hidden', padding: '3rem 3.5rem',
        background: `linear-gradient(155deg, ${MAROON2} 0%, #5C1428 55%, #3A0710 100%)`,
      }}>
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.06, pointerEvents: 'none' }}>
          <defs><pattern id="lg" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke={GOLD} strokeWidth="0.6" />
          </pattern></defs>
          <rect width="100%" height="100%" fill="url(#lg)" />
        </svg>
        <div style={{ position: 'absolute', top: '30%', left: '20%', width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle, rgba(199,154,43,0.1) 0%, transparent 70%)`, pointerEvents: 'none' }} />

        {mounted && PARTICLES.map(p => (
          <motion.div key={p.id} style={{ position: 'absolute', left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, borderRadius: '50%', background: GOLD, opacity: 0.2, pointerEvents: 'none' }}
            animate={{ y: [0, -16, 0], opacity: [0.12, 0.35, 0.12] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }} />
        ))}

        <svg style={{ position: 'absolute', right: -100, top: '50%', transform: 'translateY(-50%)', opacity: 0.07, pointerEvents: 'none' }} width="480" height="480" viewBox="0 0 480 480">
          <circle cx="240" cy="240" r="220" stroke={GOLD} strokeWidth="1" fill="none" />
          <circle cx="240" cy="240" r="170" stroke={GOLD} strokeWidth="0.6" fill="none" />
          {Array.from({ length: 12 }, (_, i) => { const a = (i/12)*Math.PI*2; return <line key={i} x1={240+170*Math.cos(a)} y1={240+170*Math.sin(a)} x2={240+220*Math.cos(a)} y2={240+220*Math.sin(a)} stroke={GOLD} strokeWidth="0.5" /> })}
        </svg>

        <motion.div variants={fadeUp(0.1)} initial="hidden" animate="visible" style={{ position: 'relative', zIndex: 1 }}>
          <img src="/branding/f-logo.svg" alt="Planning Secretariat" style={{ height: 180, width: 'auto', objectFit: 'contain', opacity: 0.92 }} />
        </motion.div>

        <motion.div variants={fadeUp(0.2)} initial="hidden" animate="visible" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(199,154,43,0.12)', border: '1px solid rgba(199,154,43,0.3)', borderRadius: 100, padding: '5px 14px', marginBottom: '1.5rem' }}>
            <FiPackage size={11} color={GOLD} />
            <span style={{ fontFamily: "'Cinzel', serif", fontSize: '0.65rem', letterSpacing: '0.14em', color: GOLD, fontWeight: 600 }}>STORE MANAGEMENT SYSTEM</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.9rem, 2.8vw, 2.6rem)', fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: '1rem' }}>
            Store & Inventory<br /><span style={{ color: GOLD }}>Management</span>
          </h1>
          <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, maxWidth: 340 }}>
            Secure inventory tracking, stock control, borrowing management, and audit reporting for the Planning Secretariat.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: '1.75rem' }}>
            {['Stock Control','Borrow Track','Issue Slips','Audit Logs','Reports'].map(f => (
              <span key={f} style={{ fontSize: '0.72rem', fontWeight: 500, color: 'rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, padding: '4px 11px' }}>{f}</span>
            ))}
          </div>
        </motion.div>

        <motion.p variants={fadeUp(0.3)} initial="hidden" animate="visible" style={{ position: 'relative', zIndex: 1, fontSize: '0.7rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.04em' }}>
          © {new Date().getFullYear()} Planning Secretariat — Southern Province, Sri Lanka.
        </motion.p>
      </div>

      {/* Right login panel */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: CREAM, position: 'relative', overflow: 'hidden', padding: '2rem 1.5rem' }}>
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.022, pointerEvents: 'none' }}>
          <defs><pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill={MAROON} />
          </pattern></defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
        <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, borderRadius: '50%', background: `radial-gradient(circle, rgba(199,154,43,0.08) 0%, transparent 70%)`, pointerEvents: 'none' }} />

        <a href="/home" style={{ position: 'absolute', top: '1.25rem', right: '1.5rem', display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.72rem', color: 'rgba(74,9,24,0.42)', textDecoration: 'none', fontWeight: 500, zIndex: 2, padding: '5px 10px', borderRadius: 8, border: '1px solid rgba(74,9,24,0.1)', transition: 'all 0.15s' }}
          onMouseEnter={e => { e.currentTarget.style.color = MAROON; e.currentTarget.style.background = 'rgba(74,9,24,0.04)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(74,9,24,0.42)'; e.currentTarget.style.background = 'transparent' }}>
          ← Public Portal
        </a>

        <div style={{ width: '100%', maxWidth: 400, position: 'relative', zIndex: 1 }}>
          <div className="flex lg:hidden" style={{ justifyContent: 'center', marginBottom: '1.75rem' }}>
            <img src="/branding/f-logo.svg" alt="logo" style={{ height: 100, objectFit: 'contain' }} />
          </div>

          <motion.div variants={fadeUp(0.05)} initial="hidden" animate="visible" style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <div style={{ width: 54, height: 54, borderRadius: 15, background: `linear-gradient(135deg, ${MAROON} 0%, #6E1528 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 8px 28px rgba(74,9,24,0.28)` }}>
              <FiShield size={24} color="#fff" />
            </div>
          </motion.div>

          <motion.div variants={fadeUp(0.1)} initial="hidden" animate="visible" style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.4rem, 2.5vw, 1.75rem)', fontWeight: 800, color: MAROON, marginBottom: '0.35rem' }}>Sign In to SMP</h2>
            <p style={{ fontSize: '0.82rem', color: 'rgba(74,9,24,0.48)', lineHeight: 1.5 }}>Authorized personnel only</p>
          </motion.div>

          <AnimatePresence>
            {error && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(220,38,38,0.07)', border: '1px solid rgba(220,38,38,0.2)', borderRadius: 8, padding: '9px 13px', marginBottom: '1rem' }}>
                <FiAlertCircle size={14} color="#DC2626" />
                <span style={{ fontSize: '0.8rem', color: '#DC2626' }}>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.form variants={fadeUp(0.15)} initial="hidden" animate="visible" onSubmit={handleSubmit} autoComplete="off">
            {/* Username */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: MAROON, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '0.45rem' }}>Username</label>
              <div style={{ position: 'relative', border: `1.5px solid ${uFocus ? GOLD : 'rgba(74,9,24,0.18)'}`, borderRadius: 10, background: uFocus ? 'rgba(199,154,43,0.02)' : '#fff', boxShadow: uFocus ? `0 0 0 3px rgba(199,154,43,0.1)` : 'none', transition: 'all 0.18s' }}>
                <FiUser size={14} style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: uFocus ? GOLD : 'rgba(74,9,24,0.35)', transition: 'color 0.18s' }} />
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} onFocus={() => setUFocus(true)} onBlur={() => setUFocus(false)} placeholder="Enter username" autoComplete="username"
                  style={{ width: '100%', border: 'none', outline: 'none', padding: '12px 12px 12px 38px', fontSize: '0.875rem', color: MAROON, background: 'transparent', borderRadius: 10, fontFamily: 'Inter, sans-serif' }} />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: MAROON, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '0.45rem' }}>Password</label>
              <div style={{ position: 'relative', border: `1.5px solid ${pFocus ? GOLD : 'rgba(74,9,24,0.18)'}`, borderRadius: 10, background: pFocus ? 'rgba(199,154,43,0.02)' : '#fff', boxShadow: pFocus ? `0 0 0 3px rgba(199,154,43,0.1)` : 'none', transition: 'all 0.18s' }}>
                <FiLock size={14} style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: pFocus ? GOLD : 'rgba(74,9,24,0.35)', transition: 'color 0.18s' }} />
                <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} onFocus={() => setPFocus(true)} onBlur={() => setPFocus(false)} placeholder="Enter password" autoComplete="current-password"
                  style={{ width: '100%', border: 'none', outline: 'none', padding: '12px 40px 12px 38px', fontSize: '0.875rem', color: MAROON, background: 'transparent', borderRadius: 10, fontFamily: 'Inter, sans-serif' }} />
                <button type="button" onClick={() => setShowPass(v => !v)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(74,9,24,0.38)', display: 'flex' }}>
                  {showPass ? <FiEyeOff size={14} /> : <FiEye size={14} />}
                </button>
              </div>
            </div>

            <motion.button type="submit" disabled={loading}
              whileHover={!loading ? { y: -2, boxShadow: `0 10px 32px rgba(74,9,24,0.4)` } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
              style={{ width: '100%', padding: '13px', borderRadius: 10, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', background: loading ? 'rgba(74,9,24,0.5)' : `linear-gradient(135deg, ${MAROON} 0%, #6E1528 100%)`, color: '#fff', fontFamily: "'Cinzel', serif", fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, boxShadow: `0 6px 22px rgba(74,9,24,0.3)`, transition: 'background 0.2s' }}>
              {loading ? <Spinner /> : <><FiShield size={14} /> Sign In</>}
            </motion.button>
          </motion.form>

        </div>
      </div>
    </div>
  )
}

function Spinner() {
  return (
    <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
      style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.25)', borderTopColor: '#fff' }} />
  )
}

export default function SMPLogin() {
  return <SMPProvider><LoginForm /></SMPProvider>
}

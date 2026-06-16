import { useEffect, useRef } from 'react'
import { motion, useAnimationFrame } from 'framer-motion'
import { FiExternalLink, FiPhone, FiMail } from 'react-icons/fi'

/* ─── Brand ─────────────────────────────────────────────────────────── */
const MAROON = '#4A0918'
const GOLD   = '#C79A2B'
const GOLD2  = '#9A7520'
const CREAM  = '#FCFBFA'

const PMS_NEW = 'https://planningsec.lk/login'
const PMS_OLD = 'https://progress.spfeedback.lk/index.php'

/* ─── Easings ───────────────────────────────────────────────────────── */
const EXPO   = [0.16, 1, 0.3, 1]
const SPRING = { type: 'spring', stiffness: 260, damping: 28 }

/* ─────────────────────────────────────────────────────────────────────
   ENTRANCE VARIANTS
───────────────────────────────────────────────────────────────────── */
const up = (delay = 0, distance = 30) => ({
  hidden:  { opacity: 0, y: distance, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.9, delay, ease: EXPO },
  },
})


const scaleIn = (delay = 0) => ({
  hidden:  { opacity: 0, scale: 0.82, filter: 'blur(6px)' },
  visible: { opacity: 1, scale: 1,    filter: 'blur(0px)',
    transition: { duration: 0.75, delay, ease: EXPO },
  },
})

/* ─────────────────────────────────────────────────────────────────────
   ANIMATED BACKGROUND CANVAS
   — Two slow arcs sweeping in opposite directions + pulsing rings
───────────────────────────────────────────────────────────────────── */
function BackgroundCanvas() {
  const ref = useRef(null)
  const t   = useRef(0)

  useAnimationFrame((_, delta) => {
    t.current += delta * 0.00018
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const { width: w, height: h } = canvas
    ctx.clearRect(0, 0, w, h)

    const cx = w * 0.5, cy = h * 0.48

    /* concentric faint rings */
    for (const [r, alpha] of [[w * 0.30, 0.028], [w * 0.38, 0.018], [w * 0.46, 0.011]]) {
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(199,154,43,${alpha})`
      ctx.lineWidth = 1
      ctx.stroke()
    }

    /* outer slow sweep arc 1 */
    const r1 = w * 0.36
    const a1s = t.current
    const a1e = a1s + Math.PI * (0.45 + 0.15 * Math.sin(t.current * 0.6))
    const g1 = ctx.createLinearGradient(cx - r1, cy, cx + r1, cy)
    g1.addColorStop(0, 'rgba(199,154,43,0)')
    g1.addColorStop(0.5, 'rgba(199,154,43,0.22)')
    g1.addColorStop(1, 'rgba(199,154,43,0)')
    ctx.beginPath()
    ctx.arc(cx, cy, r1, a1s, a1e)
    ctx.strokeStyle = g1
    ctx.lineWidth = 2
    ctx.stroke()

    /* inner sweep arc 2 — counter-rotate */
    const r2 = w * 0.22
    const a2s = -t.current * 1.4
    const a2e = a2s + Math.PI * (0.3 + 0.1 * Math.cos(t.current))
    const g2 = ctx.createLinearGradient(cx - r2, cy, cx + r2, cy)
    g2.addColorStop(0, 'rgba(199,154,43,0)')
    g2.addColorStop(0.5, 'rgba(199,154,43,0.18)')
    g2.addColorStop(1, 'rgba(199,154,43,0)')
    ctx.beginPath()
    ctx.arc(cx, cy, r2, a2s, a2e)
    ctx.strokeStyle = g2
    ctx.lineWidth = 1.5
    ctx.stroke()

    /* maroon accent arc */
    const r3 = w * 0.29
    const a3s = t.current * 0.5 + Math.PI
    const a3e = a3s + Math.PI * 0.22
    ctx.beginPath()
    ctx.arc(cx, cy, r3, a3s, a3e)
    ctx.strokeStyle = `rgba(74,9,24,0.07)`
    ctx.lineWidth = 1
    ctx.stroke()
  })

  return (
    <canvas
      ref={ref}
      width={900}
      height={900}
      style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -52%)',
        pointerEvents: 'none',
        width: 'min(92vw, 900px)',
        height: 'min(92vw, 900px)',
      }}
      aria-hidden="true"
    />
  )
}

/* ─────────────────────────────────────────────────────────────────────
   FLOATING PARTICLES
   — 16 particles, staggered starts, gentle drift
───────────────────────────────────────────────────────────────────── */
const PARTICLES = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  x:    [4, 12, 20, 28, 36, 44, 55, 62, 70, 78, 85, 92, 30, 50, 68, 88][i],
  y:    [20, 75, 35, 85, 55, 15, 65, 40, 80, 25, 50, 70, 90, 10, 60, 45][i],
  size: [3, 2, 4, 2, 5, 2, 3, 4, 2, 3, 4, 2, 3, 2, 4, 3][i],
  dur:  [20, 26, 18, 24, 22, 28, 19, 25, 21, 27, 23, 29, 17, 30, 20, 26][i],
  del:  [0, 3.5, 1.2, 5, 2, 6.5, 0.8, 4, 1.8, 7, 3, 2.5, 5.5, 1, 4.5, 6][i],
  gold: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1][i] === 1,
  dy:   [14, 22, 18, 16, 20, 12, 24, 17, 19, 15, 21, 13, 23, 16, 18, 20][i],
}))

/* ─────────────────────────────────────────────────────────────────────
   HONEYCOMB GRID (full edge, tessellated)
───────────────────────────────────────────────────────────────────── */
function HoneycombPanel({ flip }) {
  const R = 16, hx = R * Math.sqrt(3), vy = R * 1.5
  const pts = (cx, cy) =>
    Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i - Math.PI / 6
      return `${(cx + R * Math.cos(a)).toFixed(1)},${(cy + R * Math.sin(a)).toFixed(1)}`
    }).join(' ')
  const cells = []
  for (let row = 0; row < 7; row++)
    for (let col = 0; col < 7; col++)
      cells.push({ cx: col * hx + (row % 2 ? hx / 2 : 0) + R, cy: row * vy + R, idx: row * 7 + col })
  const W = 7 * hx + R, H = 6.5 * vy + R * 2

  return (
    <motion.svg
      width={W} height={H}
      viewBox={`0 0 ${W} ${H}`}
      fill="none"
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.8, ease: EXPO, delay: 0.3 }}
      style={{ transform: flip ? 'rotate(180deg)' : 'none' }}
    >
      {cells.map(({ cx, cy, idx }) => (
        <motion.polygon
          key={idx}
          points={pts(cx, cy)}
          stroke={GOLD}
          strokeWidth="0.9"
          fill="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.04 + (idx % 5) * 0.008 }}
          transition={{ duration: 0.5, delay: 0.3 + idx * 0.012, ease: 'easeOut' }}
        />
      ))}
    </motion.svg>
  )
}

/* ─────────────────────────────────────────────────────────────────────
   GOLD DIVIDER ORNAMENT
───────────────────────────────────────────────────────────────────── */
function Ornament({ delay = 0 }) {
  return (
    <svg viewBox="0 0 280 22" fill="none" style={{ width: 250, height: 'auto' }} aria-hidden="true">
      <motion.line x1="0" y1="11" x2="108" y2="11"
        stroke={GOLD} strokeWidth="1"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.32 }}
        transition={{ duration: 1.2, ease: EXPO, delay: delay + 0.1 }}
      />
      <motion.line x1="172" y1="11" x2="280" y2="11"
        stroke={GOLD} strokeWidth="1"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.32 }}
        transition={{ duration: 1.2, ease: EXPO, delay: delay + 0.1 }}
      />
      {/* centre diamond */}
      <motion.path
        d="M140,4 L147,11 L140,18 L133,11 Z"
        fill={GOLD}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.9 }}
        transition={{ duration: 0.5, delay: delay + 0.4, ease: EXPO }}
        style={{ transformOrigin: '140px 11px' }}
      />
      <motion.circle cx="120" cy="11" r="2.5" fill={GOLD}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.5 }}
        transition={{ duration: 0.4, delay: delay + 0.5, ease: EXPO }}
      />
      <motion.circle cx="160" cy="11" r="2.5" fill={GOLD}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.5 }}
        transition={{ duration: 0.4, delay: delay + 0.5, ease: EXPO }}
      />
    </svg>
  )
}

/* ─────────────────────────────────────────────────────────────────────
   LETTER-BY-LETTER TEXT REVEAL
───────────────────────────────────────────────────────────────────── */
function SplitText({ text, delay = 0, style }) {
  return (
    <span style={{ display: 'inline-block', overflow: 'hidden' }}>
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          transition={{ duration: 0.55, delay: delay + i * 0.032, ease: EXPO }}
          style={{ display: 'inline-block', ...style }}
        >
          {ch === ' ' ? ' ' : ch}
        </motion.span>
      ))}
    </span>
  )
}

/* ─────────────────────────────────────────────────────────────────────
   ANIMATED COUNTER — "Loading" visual (3 ticking dots)
───────────────────────────────────────────────────────────────────── */
function StatusDots() {
  return (
    <span style={{ display: 'inline-flex', gap: 4, alignItems: 'center' }}>
      {[0, 1, 2].map(i => (
        <motion.span
          key={i}
          animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.4, delay: i * 0.22, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            display: 'inline-block', width: 4, height: 4,
            borderRadius: '50%', background: GOLD,
          }}
        />
      ))}
    </span>
  )
}

/* ─────────────────────────────────────────────────────────────────────
   PMS BUTTON
───────────────────────────────────────────────────────────────────── */
function PMSButton({ href, label, sublabel, primary }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0,  filter: 'blur(0px)' }}
      whileHover={{ y: -5, scale: 1.04,
        boxShadow: primary
          ? '0 14px 40px rgba(199,154,43,0.42)'
          : '0 10px 30px rgba(74,9,24,0.18)',
      }}
      whileTap={{ scale: 0.96 }}
      transition={SPRING}
      style={{
        display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 4,
        padding: '15px 34px', borderRadius: 14,
        textDecoration: 'none', cursor: 'pointer',
        minWidth: 158, position: 'relative', overflow: 'hidden',
        background: primary
          ? `linear-gradient(140deg, ${GOLD} 0%, ${GOLD2} 100%)`
          : 'transparent',
        border: primary
          ? `1.5px solid ${GOLD}`
          : `1.5px solid rgba(74,9,24,0.2)`,
        boxShadow: primary
          ? '0 6px 28px rgba(199,154,43,0.3)'
          : '0 4px 14px rgba(74,9,24,0.07)',
      }}
    >
      {/* shimmer */}
      {primary && (
        <motion.div
          animate={{ x: ['-140%', '240%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 2.5 }}
          style={{
            position: 'absolute', inset: 0, width: '32%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent)',
            pointerEvents: 'none',
          }}
        />
      )}
      <span style={{
        display: 'flex', alignItems: 'center', gap: 6,
        fontFamily: "'Cinzel', serif", fontSize: '0.82rem',
        fontWeight: 700, letterSpacing: '0.05em',
        color: primary ? '#fff' : MAROON,
        position: 'relative',
      }}>
        {label} <FiExternalLink size={12} />
      </span>
      <span style={{
        fontSize: '0.63rem', fontFamily: 'Inter, sans-serif', fontWeight: 500,
        color: primary ? 'rgba(255,255,255,0.65)' : `rgba(74,9,24,0.5)`,
        letterSpacing: '0.04em', position: 'relative',
      }}>
        {sublabel}
      </span>
    </motion.a>
  )
}

/* ─────────────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────────────── */
export default function ComingSoonPage() {
  useEffect(() => {
    document.documentElement.classList.add('no-scroll')
    return () => document.documentElement.classList.remove('no-scroll')
  }, [])

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: CREAM,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden', fontFamily: 'Inter, sans-serif',
    }}>

      {/* ══ LAYER 0 — background canvas arcs (always running) ══ */}
      <BackgroundCanvas />

      {/* ══ LAYER 1 — radial soft glow ══ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.7, 1] }}
        transition={{ duration: 3, times: [0, 0.4, 0.7, 1], ease: 'easeOut' }}
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `radial-gradient(ellipse 65% 55% at 50% 46%,
            rgba(199,154,43,0.09) 0%,
            rgba(199,154,43,0.04) 45%,
            transparent 70%)`,
        }}
      />

      {/* ══ LAYER 2 — diagonal hairlines ══ */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `repeating-linear-gradient(
          -50deg, transparent, transparent 70px,
          rgba(199,154,43,0.016) 70px, rgba(199,154,43,0.016) 71px
        )`,
      }} />

      {/* ══ LAYER 3 — honeycomb corners ══ */}
      <div className="hidden lg:block" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
        <HoneycombPanel />
      </div>
      <div className="hidden lg:block" style={{ position: 'absolute', bottom: 0, right: 0, pointerEvents: 'none' }}>
        <HoneycombPanel flip />
      </div>

      {/* ══ LAYER 4 — floating particles ══ */}
      {PARTICLES.map(p => (
        <motion.div
          key={p.id}
          animate={{ y: [0, -p.dy, 0], opacity: [0, p.gold ? 0.6 : 0.22, 0] }}
          transition={{ duration: p.dur, delay: p.del, ease: 'easeInOut', repeat: Infinity }}
          style={{
            position: 'absolute',
            left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size,
            borderRadius: '50%',
            background: p.gold ? GOLD : MAROON,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* ══ LAYER 5 — ghost watermark ══ */}
      <div aria-hidden="true" style={{
        position: 'absolute', pointerEvents: 'none', userSelect: 'none',
        top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        fontFamily: "'Cinzel', serif", fontWeight: 800,
        fontSize: 'clamp(120px, 20vw, 240px)',
        color: `${MAROON}05`, letterSpacing: '0.1em',
        whiteSpace: 'nowrap', lineHeight: 1,
      }}>
        SPPS
      </div>

      {/* ══ TOP RULE ══ */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: EXPO, delay: 0.05 }}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 3,
          background: `linear-gradient(90deg,
            transparent 0%, ${GOLD}88 20%,
            ${GOLD} 50%,
            ${GOLD}88 80%, transparent 100%)`,
          transformOrigin: 'center', pointerEvents: 'none',
        }}
      />

      {/* ══ CONTENT ══ */}
      <div style={{
        position: 'relative', zIndex: 10,
        textAlign: 'center', maxWidth: 620,
        padding: '0 1.75rem',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0,
      }}>

        {/* Logo — scale + blur entrance */}
        <motion.div
          variants={scaleIn(0)}
          initial="hidden" animate="visible"
          style={{ marginBottom: '1.6rem' }}
        >
          <img
            src="/branding/logo.svg"
            alt="Southern Province Planning Secretariat"
            onError={e => { e.currentTarget.src = '/branding/logo.png' }}
            style={{ width: 480, maxWidth: '86vw', height: 'auto', objectFit: 'contain' }}
          />
        </motion.div>

        {/* Organisation chip */}
        <motion.div variants={up(0.12)} initial="hidden" animate="visible"
          style={{ marginBottom: '1.1rem' }}>
          <motion.span
            animate={{
              boxShadow: [
                `0 0 0 0 rgba(199,154,43,0.3)`,
                `0 0 0 7px rgba(199,154,43,0)`,
                `0 0 0 0 rgba(199,154,43,0.3)`,
              ],
            }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontFamily: "'Cinzel', serif",
              fontSize: 'clamp(0.65rem, 1.2vw, 0.75rem)',
              fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase',
              color: GOLD,
              background: 'rgba(199,154,43,0.08)',
              border: `1px solid rgba(199,154,43,0.28)`,
              borderRadius: 100, padding: '7px 22px',
            }}
          >
            <StatusDots />
            Southern Province Planning Secretariat
          </motion.span>
        </motion.div>

        {/* Heading — letter-by-letter clip reveal */}
        <div style={{ marginBottom: '1rem', overflow: 'hidden', lineHeight: 1 }}>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.4rem, 6vw, 3.6rem)',
            fontWeight: 800, color: MAROON, margin: 0, lineHeight: 1.18,
          }}>
            <SplitText text="Coming Soon" delay={0.22} />
          </h1>
        </div>

        {/* Ornament */}
        <motion.div variants={up(0.5)} initial="hidden" animate="visible"
          style={{ marginBottom: '1.1rem' }}>
          <Ornament delay={0.5} />
        </motion.div>

        {/* Body — word-by-word fade */}
        <motion.div variants={up(0.6)} initial="hidden" animate="visible"
          style={{ marginBottom: '2rem' }}>
          <p style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
            color: `rgba(74,9,24,0.62)`, lineHeight: 1.9,
            margin: '0 auto', maxWidth: 480,
          }}>
            The Southern Province Planning Secretariat official web site is
            currently under preparation. We are working to deliver a complete
            digital experience for our citizens and stakeholders.
          </p>
        </motion.div>

        {/* Contact info */}
        <motion.div variants={up(0.66)} initial="hidden" animate="visible"
          style={{ display: 'flex', gap: 22, justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1.1rem' }}>
          <a href="tel:+94912234503" style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            fontSize: '0.95rem', fontFamily: 'Inter, sans-serif', fontWeight: 500,
            color: MAROON, textDecoration: 'none', opacity: 0.75,
          }}>
            <FiPhone size={14} /> +94 912 234 503
          </a>
          <a href="mailto:spdcsp@gmail.com" style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            fontSize: '0.95rem', fontFamily: 'Inter, sans-serif', fontWeight: 500,
            color: MAROON, textDecoration: 'none', opacity: 0.75,
          }}>
            <FiMail size={14} /> spdcsp@gmail.com
          </a>
        </motion.div>

        {/* PMS section */}
        <motion.div variants={up(0.74)} initial="hidden" animate="visible"
          style={{ width: '100%' }}>

          {/* Divider label */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.3rem',
          }}>
            <motion.div
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 1, ease: EXPO, delay: 0.9 }}
              style={{ flex: 1, height: 1, background: `rgba(199,154,43,0.2)`, transformOrigin: 'left' }}
            />
            <span style={{
              fontFamily: "'Cinzel', serif", fontSize: '0.61rem', fontWeight: 700,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: `rgba(154,117,32,0.75)`, whiteSpace: 'nowrap',
            }}>
              Project Monitoring System
            </span>
            <motion.div
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 1, ease: EXPO, delay: 0.9 }}
              style={{ flex: 1, height: 1, background: `rgba(199,154,43,0.2)`, transformOrigin: 'right' }}
            />
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <PMSButton
              href={PMS_NEW} label="PMS New" sublabel="Latest version" primary
            />
            <PMSButton
              href={PMS_OLD} label="PMS Old" sublabel="Previous version"
            />
          </div>

        </motion.div>
      </div>

      {/* ══ BOTTOM WAVE ══ */}
      <motion.svg
        viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: EXPO, delay: 0.2 }}
        style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 80, pointerEvents: 'none' }}
      >
        <defs>
          <linearGradient id="wGold" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor={GOLD2} stopOpacity="0.3" />
            <stop offset="50%"  stopColor={GOLD}  stopOpacity="0.55" />
            <stop offset="100%" stopColor={GOLD2} stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <path d="M-20,50 Q360,10 720,30 Q1080,50 1460,18 L1460,80 L-20,80 Z"
          fill={MAROON} opacity="0.055" />
        <path d="M-20,62 Q300,24 720,42 Q1080,60 1460,32 L1460,80 L-20,80 Z"
          fill="url(#wGold)" opacity="0.45" />
      </motion.svg>

    </div>
  )
}

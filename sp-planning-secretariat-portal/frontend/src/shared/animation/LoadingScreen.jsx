/* ─────────────────────────────────────────────────────────────────────────
   LoadingScreen  —  Government-grade premium loading experience
   Shown once on initial app load. Auto-dismisses after ~2.2 s.
   Features:
    • Emblem / logo reveal with scale + blur
    • Animated progress arc (SVG)
    • Staggered text reveal
    • Elegant exit dissolve
    • Respects prefers-reduced-motion
   Usage in main.jsx / App.jsx:
     const [loaded, setLoaded] = useState(false)
     if (!loaded) return <LoadingScreen onDone={() => setLoaded(true)} />
───────────────────────────────────────────────────────────────────────── */
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence }     from 'framer-motion'
import { useReducedMotion }            from '@/shared/hooks/useReducedMotion'

const LOGO_PATH = '/branding/logo.png'

/* Government emblem fallback */
function EmblemFallback() {
  return (
    <div className="w-16 h-16 rounded-full border-2 border-[#C79A2B]/60 flex items-center justify-center bg-[#4A0918]/08">
      <div className="flex flex-col items-center gap-0.5">
        <span className="text-[7px] font-bold text-[#C79A2B] uppercase tracking-widest">ශ්‍රී ලංකා</span>
        <div className="w-6 h-px bg-[#C79A2B]/60" />
        <span className="text-[6px] font-bold text-[#C79A2B]/80 uppercase tracking-widest">SRI LANKA</span>
      </div>
    </div>
  )
}

export default function LoadingScreen({ onDone }) {
  const reduced  = useReducedMotion()
  const [progress, setProgress] = useState(0)
  const [phase, setPhase]       = useState('loading') // loading | done | exit
  const [logoErr, setLogoErr]   = useState(false)
  const rafRef   = useRef(null)
  const startRef = useRef(null)
  const DURATION = reduced ? 100 : 1200

  useEffect(() => {
    if (reduced) {
      setProgress(1)
      setPhase('done')
      setTimeout(onDone, 120)
      return
    }

    const animate = (ts) => {
      if (!startRef.current) startRef.current = ts
      const elapsed = ts - startRef.current
      const t = Math.min(elapsed / DURATION, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setProgress(eased)
      if (t < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        setProgress(1)
        setPhase('done')
        setTimeout(() => {
          setPhase('exit')
          setTimeout(onDone, 380)
        }, 160)
      }
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [reduced, onDone, DURATION])

  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(6px)', transition: { duration: 0.36, ease: [0.4, 0, 0.2, 1] } }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: '#FCFBFA' }}
          aria-label="Loading"
          role="status"
          aria-live="polite"
        >
          {/* Ambient background gradients */}
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
            style={{
              background: `
                radial-gradient(ellipse 60% 50% at 20% 20%, rgba(74,9,24,0.06) 0%, transparent 65%),
                radial-gradient(ellipse 50% 40% at 80% 80%, rgba(199,154,43,0.08) 0%, transparent 60%)
              `,
            }}
          />

          {/* Subtle grid lines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.06]"
            aria-hidden="true"
            style={{
              backgroundImage: `
                linear-gradient(rgba(199,154,43,0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(199,154,43,0.5) 1px, transparent 1px)
              `,
              backgroundSize: '52px 52px',
            }}
          />

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center gap-6">

            {/* Logo */}
            <motion.div
              initial={reduced ? {} : { scale: 0.7, opacity: 0, filter: 'blur(8px)' }}
              animate={reduced ? {} : { scale: 1, opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              {!logoErr ? (
                <img
                  src={LOGO_PATH}
                  alt="Southern Province Planning Secretariat"
                  className="h-96 w-96 object-contain"
                  onError={() => setLogoErr(true)}
                />
              ) : (
                <EmblemFallback />
              )}
            </motion.div>

            {/* Organisation name */}
            <div className="flex flex-col items-center gap-1 text-center">
              <motion.p
                initial={reduced ? {} : { opacity: 0, y: 14 }}
                animate={reduced ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="text-[0.68rem] font-bold tracking-[0.22em] uppercase text-[#C79A2B]"
              >
                Southern Province
              </motion.p>
              <motion.p
                initial={reduced ? {} : { opacity: 0, y: 14 }}
                animate={reduced ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-[#4A0918] text-lg font-bold tracking-[0.06em]"
              >
                Planning Secretariat
              </motion.p>
            </div>

            {/* Progress percentage */}
            <motion.div
              initial={reduced ? {} : { opacity: 0 }}
              animate={reduced ? {} : { opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.55 }}
              className="flex items-center gap-3"
            >
              <div
                className="h-px w-16 rounded-full"
                style={{
                  background: `linear-gradient(90deg, transparent, rgba(199,154,43,${(progress * 0.7).toFixed(2)}), transparent)`,
                }}
              />
              <span className="text-[0.7rem] tabular-nums text-[#C79A2B]/80 font-mono">
                {Math.round(progress * 100).toString().padStart(3, '0')}
              </span>
              <div
                className="h-px w-16 rounded-full"
                style={{
                  background: `linear-gradient(90deg, transparent, rgba(199,154,43,${(progress * 0.7).toFixed(2)}), transparent)`,
                }}
              />
            </motion.div>

            {/* Bottom tagline */}
            {phase === 'done' && !reduced && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="text-[0.65rem] font-medium tracking-[0.14em] uppercase text-[#4A0918]/40"
              >
                Digital Government Portal
              </motion.p>
            )}
          </div>

          {/* Screen reader text */}
          <span className="sr-only">
            Loading {Math.round(progress * 100)}%
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

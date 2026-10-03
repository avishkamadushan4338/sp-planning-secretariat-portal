/* ─────────────────────────────────────────────────────────────────────────
   AnimatedBackground  —  Ambient animated background system
   Three variants:
    • "mesh"     — soft animated gradient mesh (default)
    • "particles"— minimal floating dots on canvas
    • "grid"     — subtle animated grid with diagonal light sweep
   All GPU-accelerated (transform/opacity only). Canvas is hidden on mobile
   to protect battery. Respects prefers-reduced-motion.
   Usage:
     <AnimatedBackground variant="mesh" className="absolute inset-0" />
     <AnimatedBackground variant="particles" count={28} />
───────────────────────────────────────────────────────────────────────── */
import { useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/shared/hooks/useReducedMotion'

/* ── Mesh gradient background ────────────────────────────────────────────── */
export function MeshBackground({ className = '', dark = false, opacity = 1 }) {
  const reduced = useReducedMotion()

  const base = dark
    ? 'radial-gradient(ellipse 80% 60% at 10% 10%, rgba(74,9,24,0.55) 0%, transparent 65%), radial-gradient(ellipse 60% 50% at 85% 85%, rgba(199,154,43,0.10) 0%, transparent 60%), radial-gradient(ellipse 70% 80% at 50% 50%, rgba(10,6,4,0.85) 0%, transparent 100%)'
    : 'radial-gradient(ellipse 70% 55% at 8%  8%,  rgba(199,154,43,0.06) 0%, transparent 60%), radial-gradient(ellipse 55% 45% at 88% 88%, rgba(74,9,24,0.04)  0%, transparent 55%), radial-gradient(ellipse 85% 85% at 50% 50%, rgba(252,251,250,0)   0%, transparent 100%)'

  return (
    <div className={`pointer-events-none select-none ${className}`} style={{ opacity }} aria-hidden="true">
      {/* Static base */}
      <div className="absolute inset-0" style={{ background: base }} />

      {/* Animated orbs — hidden on mobile & reduced motion */}
      {!reduced && (
        <>
          <motion.div
            animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.06, 1] }}
            transition={{ duration: 14, ease: 'easeInOut', repeat: Infinity }}
            className="absolute hidden md:block"
            style={{
              width: 'clamp(300px,35vw,520px)',
              height: 'clamp(300px,35vw,520px)',
              borderRadius: '50%',
              top: '-10%',
              right: '5%',
              background: dark
                ? 'radial-gradient(circle, rgba(199,154,43,0.13) 0%, transparent 65%)'
                : 'radial-gradient(circle, rgba(199,154,43,0.07) 0%, transparent 65%)',
              filter: 'blur(60px)',
              willChange: 'transform',
            }}
          />
          <motion.div
            animate={{ x: [0, -20, 0], y: [0, 25, 0], scale: [1, 1.04, 1] }}
            transition={{ duration: 18, ease: 'easeInOut', repeat: Infinity, delay: 4 }}
            className="absolute hidden md:block"
            style={{
              width: 'clamp(240px,28vw,400px)',
              height: 'clamp(240px,28vw,400px)',
              borderRadius: '50%',
              bottom: '10%',
              left: '3%',
              background: dark
                ? 'radial-gradient(circle, rgba(74,9,24,0.35) 0%, transparent 65%)'
                : 'radial-gradient(circle, rgba(74,9,24,0.04) 0%, transparent 65%)',
              filter: 'blur(70px)',
              willChange: 'transform',
            }}
          />
        </>
      )}
    </div>
  )
}

/* ── Particles canvas ────────────────────────────────────────────────────── */
export function ParticlesBackground({
  count     = 30,
  color     = 'rgba(199,154,43,',
  className = '',
  maxSize   = 2.5,
  minSize   = 0.8,
  speed     = 0.3,
}) {
  const reduced = useReducedMotion()
  const canvasRef = useRef(null)
  const rafRef    = useRef(null)

  const initParticles = useCallback((W, H) =>
    Array.from({ length: count }, () => ({
      x:   Math.random() * W,
      y:   Math.random() * H,
      r:   minSize + Math.random() * (maxSize - minSize),
      vx:  (Math.random() - 0.5) * speed,
      vy:  (Math.random() - 0.5) * speed * 0.7,
      a:   0.15 + Math.random() * 0.55,
      da:  (Math.random() - 0.5) * 0.002,
    })),
  [count, minSize, maxSize, speed])

  useEffect(() => {
    if (reduced) return
    const canvas = canvasRef.current
    if (!canvas) return

    const isMobile = window.innerWidth < 768
    if (isMobile) return

    const ctx = canvas.getContext('2d')
    let pts

    const resize = () => {
      const { width, height } = canvas.parentElement.getBoundingClientRect()
      canvas.width  = width
      canvas.height = height
      pts = initParticles(width, height)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas.parentElement)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const p of pts) {
        p.x  += p.vx
        p.y  += p.vy
        p.a  += p.da
        if (p.a <= 0.05 || p.a >= 0.7) p.da *= -1
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `${color}${p.a.toFixed(2)})`
        ctx.fill()
      }
      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
    }
  }, [reduced, initParticles, color])

  if (reduced) return null

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none select-none absolute inset-0 hidden md:block ${className}`}
      aria-hidden="true"
    />
  )
}

/* ── Grid / line background ──────────────────────────────────────────────── */
export function GridBackground({
  className = '',
  opacity   = 0.04,
  size      = 52,
  color     = 'rgba(199,154,43,0.8)',
}) {
  const reduced = useReducedMotion()

  return (
    <div className={`pointer-events-none select-none overflow-hidden ${className}`} aria-hidden="true">
      {/* Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(${color} 1px, transparent 1px),
            linear-gradient(90deg, ${color} 1px, transparent 1px)
          `,
          backgroundSize: `${size}px ${size}px`,
          opacity,
        }}
      />

      {/* Diagonal light sweep */}
      {!reduced && (
        <motion.div
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 18, ease: 'linear', repeat: Infinity, repeatDelay: 8 }}
          className="absolute inset-0 pointer-events-none hidden md:block"
          style={{
            background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.02) 50%, transparent 60%)',
            willChange: 'transform',
          }}
        />
      )}
    </div>
  )
}

/* ── Wave divider SVG ───────────────────────────────────────────────────── */
export function WaveDivider({
  color    = '#FCFBFA',
  flip     = false,
  height   = 60,
  className = '',
}) {
  return (
    <div
      className={`pointer-events-none select-none overflow-hidden ${className}`}
      style={{ height, transform: flip ? 'scaleY(-1)' : 'none' }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <path
          d="M0,30 Q360,0 720,30 Q1080,60 1440,30 L1440,60 L0,60 Z"
          fill={color}
        />
      </svg>
    </div>
  )
}

/* ── Composite animated background (main export) ─────────────────────────── */
export default function AnimatedBackground({
  variant   = 'mesh',
  dark      = false,
  className = '',
  ...props
}) {
  if (variant === 'particles') return <ParticlesBackground className={className} {...props} />
  if (variant === 'grid')     return <GridBackground      className={className} {...props} />
  return <MeshBackground dark={dark} className={className} {...props} />
}

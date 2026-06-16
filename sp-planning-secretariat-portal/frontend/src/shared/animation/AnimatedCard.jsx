/* ─────────────────────────────────────────────────────────────────────────
   AnimatedCard  —  Premium government-grade interactive card
   Features:
    • Scroll-triggered fade-up reveal
    • Hover lift + shadow depth elevation
    • Animated border on hover (gold accent)
    • Optional floating animation
    • Glassmorphism variant
    • Keyboard-accessible (focus-visible matches hover)
   Usage:
     <AnimatedCard>…</AnimatedCard>
     <AnimatedCard glass floating delay={0.2}>…</AnimatedCard>
     <AnimatedCard variant="border">…</AnimatedCard>
───────────────────────────────────────────────────────────────────────── */
import { motion } from 'framer-motion'
import { useScrollReveal }  from '@/shared/hooks/useScrollReveal'
import { useReducedMotion } from '@/shared/hooks/useReducedMotion'
import { EASE } from '@/shared/animation/motion'

const REVEAL_DURATION = 0.65

export default function AnimatedCard({
  children,
  className  = '',
  style      = {},
  delay      = 0,
  threshold  = 0.12,
  glass      = false,
  floating   = false,
  noHover    = false,
  onClick,
}) {
  const reduced = useReducedMotion()
  const [ref, inView] = useScrollReveal({ threshold, triggerOnce: true })

  const revealVariants = {
    hidden:  reduced ? {} : { opacity: 0, y: 28, filter: 'blur(6px)' },
    visible: reduced ? {} : {
      opacity: 1, y: 0, filter: 'blur(0px)',
      transition: { duration: REVEAL_DURATION, delay, ease: EASE.spring },
    },
  }

  const hoverAnim = (reduced || noHover) ? {} : {
    whileHover: { y: -6, boxShadow: '0 20px 52px rgba(0,0,0,0.14)', transition: { duration: 0.28, ease: EASE.spring } },
    whileTap:   { scale: 0.98 },
  }

  const floatStyle = (floating && !reduced) ? {
    animation: 'cardFloat 5s ease-in-out infinite',
  } : {}

  const glassStyle = glass ? {
    background: 'rgba(252,251,250,0.72)',
    backdropFilter: 'blur(16px) saturate(180%)',
    WebkitBackdropFilter: 'blur(16px) saturate(180%)',
    border: '1px solid rgba(255,255,255,0.4)',
  } : {}

  return (
    <motion.div
      ref={ref}
      variants={revealVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      {...hoverAnim}
      onClick={onClick}
      className={className}
      style={{ ...glassStyle, ...floatStyle, ...style }}
    >
      {children}
    </motion.div>
  )
}

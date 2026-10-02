/* ─────────────────────────────────────────────────────────────────────────
   ScrollProgress  —  Scroll-linked progress indicator
   Renders a slim bar at the top of the viewport.
   Gold fill tracks scroll position. 2px tall, GPU-accelerated via scaleX.
   Accessible: aria-hidden since it's purely decorative.
───────────────────────────────────────────────────────────────────────── */
import { useScroll, useSpring, motion } from 'framer-motion'
import { useReducedMotion }             from '@/shared/hooks/useReducedMotion'

export default function ScrollProgress({ height = 2, zIndex = 9999 }) {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping:   30,
    restDelta: 0.001,
  })

  if (reduced) return null

  return (
    <motion.div
      aria-hidden="true"
      style={{
        scaleX,
        height,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex,
        originX: 0,
        background: 'linear-gradient(90deg, #9A7520, #E8C55A, #C79A2B)',
        boxShadow: '0 0 8px rgba(199,154,43,0.5)',
        pointerEvents: 'none',
        willChange: 'transform',
      }}
    />
  )
}

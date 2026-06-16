/* ─────────────────────────────────────────────────────────────────────────
   useParallax  —  Scroll-linked parallax offset
   Returns a MotionValue `y` offset driven by window scroll position.
   strength: pixels of travel per pixel scrolled (default 0.12)
   Uses transform: translateY — GPU-accelerated, no layout thrash.
───────────────────────────────────────────────────────────────────────── */
import { useRef } from 'react'
import { useTransform, useScroll } from 'framer-motion'
import { useReducedMotion } from './useReducedMotion'

export function useParallax(strength = 0.12) {
  const reduced = useReducedMotion()
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const range  = strength * 300
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [0, 0] : [-range / 2, range / 2],
  )

  return { ref, y }
}

/* ── Simpler scroll-to-value parallax (no target ref needed) ─────────────── */
export function useScrollParallax(inputRange, outputRange) {
  const reduced = useReducedMotion()
  const { scrollY } = useScroll()
  const y = useTransform(
    scrollY,
    inputRange,
    reduced ? [0, 0] : outputRange,
  )
  return y
}

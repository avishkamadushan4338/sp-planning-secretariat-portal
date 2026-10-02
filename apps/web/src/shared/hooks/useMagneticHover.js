/* ─────────────────────────────────────────────────────────────────────────
   useMagneticHover  —  Subtle magnetic cursor attraction effect
   Attach the returned ref to any button or nav item.
   Returns { ref, x, y } — bind x/y to framer-motion style.
   strength: 0.25 = quarter of cursor offset (subtle, professional)
───────────────────────────────────────────────────────────────────────── */
import { useRef }  from 'react'
import { useMotionValue, useSpring } from 'framer-motion'
import { useReducedMotion } from './useReducedMotion'

export function useMagneticHover(strength = 0.25) {
  const reduced  = useReducedMotion()
  const ref      = useRef(null)
  const rawX     = useMotionValue(0)
  const rawY     = useMotionValue(0)
  const x        = useSpring(rawX, { stiffness: 260, damping: 22 })
  const y        = useSpring(rawY, { stiffness: 260, damping: 22 })

  const onMouseMove = (e) => {
    if (reduced || !ref.current) return
    const rect   = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width  / 2
    const centerY = rect.top  + rect.height / 2
    rawX.set((e.clientX - centerX) * strength)
    rawY.set((e.clientY - centerY) * strength)
  }

  const onMouseLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  return { ref, x, y, onMouseMove, onMouseLeave }
}

/* ─────────────────────────────────────────────────────────────────────────
   useAnimatedCounter  —  RAF-driven smooth number counter
   Fires once when the element scrolls into view.
   Returns { ref, count, started } — attach ref to any container element.
───────────────────────────────────────────────────────────────────────── */
import { useRef, useState, useCallback, useEffect } from 'react'
import { useScrollReveal }   from './useScrollReveal'
import { useReducedMotion }  from './useReducedMotion'

export function useAnimatedCounter({
  end,
  start    = 0,
  duration = 2000,
  delay    = 0,
  decimals = 0,
  easing   = (t) => 1 - Math.pow(2, -10 * t),
} = {}) {
  const reduced        = useReducedMotion()
  const [count, setCount] = useState(start)
  const [started, setStarted] = useState(false)
  const [triggerRef, inView]  = useScrollReveal({ threshold: 0.4 })
  const rafRef  = useRef(null)
  const startTs = useRef(null)

  const run = useCallback(() => {
    if (reduced) { setCount(end); setStarted(true); return }

    const step = (ts) => {
      if (!startTs.current) startTs.current = ts
      const elapsed = ts - startTs.current
      const t       = Math.min(elapsed / duration, 1)
      const eased   = easing(t)
      const current = start + (end - start) * eased
      setCount(parseFloat(current.toFixed(decimals)))
      if (t < 1) {
        rafRef.current = requestAnimationFrame(step)
      } else {
        setCount(end)
        setStarted(true)
      }
    }

    rafRef.current = requestAnimationFrame(step)
    setStarted(true)
  }, [end, start, duration, decimals, easing, reduced])

  useEffect(() => {
    if (!inView) return
    const id = setTimeout(run, delay)
    return () => {
      clearTimeout(id)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [inView, delay, run])

  return { ref: triggerRef, count, started }
}

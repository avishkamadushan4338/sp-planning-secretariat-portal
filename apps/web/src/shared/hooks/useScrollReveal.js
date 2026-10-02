/* ─────────────────────────────────────────────────────────────────────────
   useScrollReveal  —  IntersectionObserver-based scroll trigger hook
   Returns a [ref, inView] tuple.  Used by RevealOnScroll and AnimatedCard.
   Triggers once by default; set triggerOnce:false to retrigger.
───────────────────────────────────────────────────────────────────────── */
import { useRef, useState, useEffect } from 'react'

export function useScrollReveal({
  threshold   = 0.12,
  rootMargin  = '0px 0px -40px 0px',
  triggerOnce = true,
} = {}) {
  const ref    = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (triggerOnce) observer.disconnect()
        } else if (!triggerOnce) {
          setInView(false)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, triggerOnce])

  return [ref, inView]
}

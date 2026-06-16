/* ─────────────────────────────────────────────────────────────────────────
   useGSAPScrollTrigger  —  GSAP ScrollTrigger integration hook
   Registers a GSAP animation on mount and cleans up on unmount.
   Returns a ref to attach to the target element.
───────────────────────────────────────────────────────────────────────── */
import { useRef, useEffect } from 'react'
import { gsap }              from 'gsap'
import { ScrollTrigger }     from 'gsap/ScrollTrigger'
import { useReducedMotion }  from './useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export function useGSAPScrollTrigger(buildAnimation, deps = []) {
  const ref     = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !ref.current) return

    const ctx = gsap.context(() => {
      buildAnimation(ref.current, gsap, ScrollTrigger)
    }, ref)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, ...deps])

  return ref
}

/* ── Preset: stagger children fade-up on scroll ─────────────────────────── */
export function useGSAPStaggerReveal(stagger = 0.1, y = 30) {
  return useGSAPScrollTrigger((el, g, _ST) => {
    const targets = el.querySelectorAll('[data-gsap-item]')
    if (!targets.length) return

    g.from(targets, {
      opacity: 0,
      y,
      filter: 'blur(6px)',
      duration: 0.68,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 82%',
        toggleActions: 'play none none none',
      },
    })
  })
}

/* ── Preset: horizontal marquee-style slide ─────────────────────────────── */
export function useGSAPHorizontalReveal(fromLeft = true) {
  return useGSAPScrollTrigger((el, g, _ST) => {
    g.from(el, {
      opacity: 0,
      x: fromLeft ? -48 : 48,
      duration: 0.72,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })
  })
}

/* ── Preset: counter animation (for non-React counter elements) ─────────── */
export function useGSAPCounter(endValue, duration = 2) {
  return useGSAPScrollTrigger((el, g, _ST) => {
    const obj = { val: 0 }
    g.to(obj, {
      val: endValue,
      duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      onUpdate() {
        el.textContent = Math.round(obj.val).toLocaleString()
      },
    })
  })
}

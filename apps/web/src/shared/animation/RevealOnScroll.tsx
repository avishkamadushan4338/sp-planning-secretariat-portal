/* ─────────────────────────────────────────────────────────────────────────
   RevealOnScroll  —  Scroll-triggered fade/slide reveal wrapper
   Usage:
     <RevealOnScroll>          → fade-up (default)
     <RevealOnScroll dir="left" delay={0.2}>
     <RevealOnScroll variant="scaleUp">
   Props:
     dir       : 'up' | 'down' | 'left' | 'right' | 'none'
     variant   : overrides dir with a named variant from motion.js
     delay     : seconds before animation starts
     duration  : override default duration
     threshold : 0–1, fraction of element visible before trigger
     once      : boolean, whether to re-animate on re-enter
     className : forwarded to motion.div wrapper
───────────────────────────────────────────────────────────────────────── */
import { motion } from 'framer-motion'
import { useScrollReveal } from '@/shared/hooks/useScrollReveal'
import { useReducedMotion } from '@/shared/hooks/useReducedMotion'
import { fadeUp, fadeDown, fadeLeft, fadeRight, fadeIn, scaleUp } from '@/shared/animation/motion'

const DIR_MAP = {
  up:    fadeUp,
  down:  fadeDown,
  left:  fadeLeft,
  right: fadeRight,
  none:  fadeIn,
}

const VARIANT_MAP = {
  fadeUp,
  fadeDown,
  fadeLeft,
  fadeRight,
  fadeIn,
  scaleUp,
}

export default function RevealOnScroll({
  children,
  dir       = 'up',
  variant   = null,
  delay     = 0,
  duration  = null,
  threshold = 0.10,
  once      = true,
  className = '',
  style     = {},
  as        = 'div',
}) {
  const reduced     = useReducedMotion()
  const [ref, inView] = useScrollReveal({ threshold, triggerOnce: once })

  const base = variant ? (VARIANT_MAP[variant] ?? fadeUp) : (DIR_MAP[dir] ?? fadeUp)

  const variants = reduced
    ? { hidden: {}, visible: {} }
    : {
        hidden: base.hidden,
        visible: {
          ...base.visible,
          transition: {
            ...(base.visible.transition ?? {}),
            delay,
            ...(duration ? { duration } : {}),
          },
        },
      }

  const Tag = motion[as] || motion.div

  return (
    <Tag
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={className}
      style={style}
    >
      {children}
    </Tag>
  )
}

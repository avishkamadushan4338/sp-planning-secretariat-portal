/* ─────────────────────────────────────────────────────────────────────────
   StaggerContainer  —  Orchestrates staggered child reveal animations
   Children must use RevealOnScroll or motion.div with variants.
   Usage:
     <StaggerContainer stagger={0.12} delay={0.08}>
       <motion.div variants={fadeUp}>…</motion.div>
       <motion.div variants={fadeUp}>…</motion.div>
     </StaggerContainer>
   Shorthand children — wraps each child automatically:
     <StaggerContainer autoWrap dir="left">
       <div>item</div>
       <div>item</div>
     </StaggerContainer>
───────────────────────────────────────────────────────────────────────── */
import React from 'react'
import { motion } from 'framer-motion'
import { useScrollReveal } from '@/shared/hooks/useScrollReveal'
import { useReducedMotion } from '@/shared/hooks/useReducedMotion'
import { fadeUp, fadeLeft, fadeRight } from '@/shared/animation/motion'

const AUTO_WRAP_DIRS = { up: fadeUp, left: fadeLeft, right: fadeRight }

export default function StaggerContainer({
  children,
  stagger    = 0.10,
  delay      = 0.06,
  threshold  = 0.08,
  once       = true,
  autoWrap   = false,
  dir        = 'up',
  className  = '',
  style      = {},
  as         = 'div',
}) {
  const reduced     = useReducedMotion()
  const [ref, inView] = useScrollReveal({ threshold, triggerOnce: once })

  const containerVariants = reduced
    ? { hidden: {}, visible: {} }
    : {
        hidden:  {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }

  const childVariant = AUTO_WRAP_DIRS[dir] ?? fadeUp

  const Tag = motion[as] || motion.div

  return (
    <Tag
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={className}
      style={style}
    >
      {autoWrap
        ? React.Children.map(children, (child, i) =>
            child ? (
              <motion.div key={i} variants={reduced ? {} : childVariant}>
                {child}
              </motion.div>
            ) : null,
          )
        : children}
    </Tag>
  )
}

/* ─────────────────────────────────────────────────────────────────────────
   AnimatedTimeline  —  Interactive scroll-driven timeline component
   Used on History, About, and milestone sections.
   Features:
    • Alternating left/right layout (desktop) / left-only (mobile)
    • Animated connector line grows as you scroll
    • Each event card fades in from the appropriate side
    • Active event highlighted on hover
    • Year node pulse animation
    • Respects prefers-reduced-motion
   Props:
     items: Array<{ year, title, body, icon? }>
     accent: accent color (default gold)
───────────────────────────────────────────────────────────────────────── */

import { motion } from 'framer-motion'
import { useScrollReveal }  from '@/shared/hooks/useScrollReveal'
import { useReducedMotion } from '@/shared/hooks/useReducedMotion'
import { EASE, fadeLeft, fadeRight, fadeUp } from '@/shared/animation/motion'

const LINE_VAR = {
  hidden:  { scaleY: 0, opacity: 0 },
  visible: { scaleY: 1, opacity: 1, transition: { duration: 1.2, ease: EASE.outExpo } },
}

const NODE_VAR = {
  hidden:  { scale: 0, opacity: 0 },
  visible: (delay) => ({
    scale: 1, opacity: 1,
    transition: { type: 'spring', stiffness: 320, damping: 22, delay },
  }),
}

function TimelineItem({ item, index, alternate }) {
  const reduced  = useReducedMotion()
  const delay    = index * 0.12

  const slideVar = alternate
    ? (index % 2 === 0 ? fadeLeft : fadeRight)
    : fadeUp

  const [ref, inView] = useScrollReveal({ threshold: 0.2, triggerOnce: true })

  return (
    <div
      ref={ref}
      className={`
        relative flex items-start gap-0
        ${alternate ? 'md:even:flex-row-reverse' : 'flex-row'}
      `}
    >
      {/* Card */}
      <motion.div
        variants={reduced ? {} : slideVar}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        custom={delay}
        transition={reduced ? {} : undefined}
        className={`
          flex-1 max-w-[calc(50%-2rem)]
          ${alternate ? '' : 'ml-8'}
          ${alternate && index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}
        `}
        whileHover={reduced ? {} : { y: -3, transition: { duration: 0.25, ease: EASE.spring } }}
      >
        <div className="
          p-5 rounded-xl border border-[rgba(199,154,43,0.18)]
          bg-white/70 backdrop-blur-sm
          shadow-[0_4px_20px_rgba(0,0,0,0.06)]
          hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)]
          hover:border-[rgba(199,154,43,0.45)]
          transition-all duration-300 cursor-default
        ">
          <span className="inline-block text-[0.7rem] font-bold tracking-[0.16em] uppercase text-[#C79A2B] mb-1">
            {item.year}
          </span>
          <h4 className="font-serif font-semibold text-[1rem] text-[#171717] leading-snug mb-2">
            {item.title}
          </h4>
          {item.body && (
            <p className="text-[0.85rem] text-[#777] leading-relaxed">
              {item.body}
            </p>
          )}
        </div>
      </motion.div>

      {/* Node — centred on the line */}
      {alternate && (
        <motion.div
          variants={reduced ? {} : NODE_VAR}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={delay}
          className="
            absolute left-1/2 top-5 -translate-x-1/2
            w-4 h-4 rounded-full z-10
            border-2 border-[#C79A2B]
            bg-white
            shadow-[0_0_0_4px_rgba(199,154,43,0.15)]
          "
        />
      )}

      {/* Mobile node */}
      {!alternate && (
        <motion.div
          variants={reduced ? {} : NODE_VAR}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={delay}
          className="
            absolute left-0 top-5
            w-3.5 h-3.5 rounded-full z-10
            border-2 border-[#C79A2B]
            bg-white
            shadow-[0_0_0_3px_rgba(199,154,43,0.15)]
          "
        />
      )}
    </div>
  )
}

export default function AnimatedTimeline({
  items     = [],
  className = '',
}) {
  const reduced   = useReducedMotion()
  const [lineRef, lineInView] = useScrollReveal({ threshold: 0.05, triggerOnce: true })

  if (!items.length) return null

  return (
    <div className={`relative ${className}`}>

      {/* Desktop alternating / mobile left-only */}
      <div className="hidden md:block">
        {/* Vertical connector line */}
        <motion.div
          ref={lineRef}
          variants={reduced ? {} : LINE_VAR}
          initial="hidden"
          animate={lineInView ? 'visible' : 'hidden'}
          className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 origin-top"
          style={{ background: 'linear-gradient(180deg, rgba(199,154,43,0.15) 0%, rgba(199,154,43,0.55) 40%, rgba(199,154,43,0.55) 60%, rgba(199,154,43,0.15) 100%)' }}
        />

        <div className="flex flex-col gap-12">
          {items.map((item, i) => (
            <TimelineItem key={i} item={item} index={i} alternate />
          ))}
        </div>
      </div>

      {/* Mobile: single column */}
      <div className="md:hidden relative pl-6">
        <motion.div
          ref={lineRef}
          variants={reduced ? {} : LINE_VAR}
          initial="hidden"
          animate={lineInView ? 'visible' : 'hidden'}
          className="absolute left-[6px] top-0 bottom-0 w-px origin-top"
          style={{ background: 'linear-gradient(180deg, rgba(199,154,43,0.15) 0%, rgba(199,154,43,0.5) 40%, rgba(199,154,43,0.5) 60%, rgba(199,154,43,0.15) 100%)' }}
        />
        <div className="flex flex-col gap-8">
          {items.map((item, i) => (
            <TimelineItem key={i} item={item} index={i} alternate={false} />
          ))}
        </div>
      </div>
    </div>
  )
}

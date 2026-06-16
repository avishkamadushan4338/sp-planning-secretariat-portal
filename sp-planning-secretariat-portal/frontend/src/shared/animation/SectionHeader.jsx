/* ─────────────────────────────────────────────────────────────────────────
   SectionHeader  —  Animated section heading with accent line reveal
   Features:
    • Animated left accent bar
    • Staggered eyebrow → title → subtitle reveal
    • Supports left / center alignment
   Usage:
     <SectionHeader
       eyebrow="About Us"
       title="Our Planning Secretariat"
       subtitle="Serving the Southern Province since 1978"
       align="center"
     />
───────────────────────────────────────────────────────────────────────── */
import { motion } from 'framer-motion'
import { useScrollReveal }  from '@/shared/hooks/useScrollReveal'
import { useReducedMotion } from '@/shared/hooks/useReducedMotion'
import { EASE } from '@/shared/animation/motion'

const mk = (delay) => ({
  hidden:  { opacity: 0, y: 22, filter: 'blur(4px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.62, delay, ease: EASE.spring },
  },
})

const lineVar = {
  hidden:  { scaleX: 0, opacity: 0 },
  visible: { scaleX: 1, opacity: 1, transition: { duration: 0.55, ease: EASE.outExpo, delay: 0.05 } },
}

export default function SectionHeader({
  eyebrow   = '',
  title     = '',
  subtitle  = '',
  align     = 'left',
  className = '',
  titleClassName = '',
  dark      = false,
}) {
  const reduced = useReducedMotion()
  const [ref, inView] = useScrollReveal({ threshold: 0.15, triggerOnce: true })

  const animate  = inView ? 'visible' : 'hidden'
  const centered = align === 'center'

  const textColor  = dark ? 'text-white'           : 'text-[#171717]'
  const eyeColor   = dark ? 'text-[#E8C55A]/90'    : 'text-[#C79A2B]'
  const subColor   = dark ? 'text-white/65'         : 'text-[#777]/90'

  return (
    <div
      ref={ref}
      className={`${centered ? 'flex flex-col items-center text-center' : ''} ${className}`}
    >
      {/* Accent line */}
      {!centered && (
        <motion.div
          variants={reduced ? {} : lineVar}
          initial="hidden"
          animate={animate}
          className="h-[3px] w-12 rounded-full mb-4 origin-left"
          style={{ background: 'linear-gradient(90deg, #C79A2B, rgba(199,154,43,0))' }}
        />
      )}

      {/* Eyebrow label */}
      {eyebrow && (
        <motion.p
          variants={reduced ? {} : mk(0.08)}
          initial="hidden"
          animate={animate}
          className={`text-[0.72rem] font-bold tracking-[0.18em] uppercase mb-2 ${eyeColor}`}
        >
          {eyebrow}
        </motion.p>
      )}

      {/* Main title */}
      <motion.h2
        variants={reduced ? {} : mk(0.16)}
        initial="hidden"
        animate={animate}
        className={`font-serif font-semibold leading-[1.18] ${titleClassName || 'text-2xl md:text-3xl lg:text-4xl'} ${textColor}`}
      >
        {title}
      </motion.h2>

      {/* Centered accent bar */}
      {centered && (
        <motion.div
          variants={reduced ? {} : {
            hidden:  { scaleX: 0, opacity: 0 },
            visible: { scaleX: 1, opacity: 1, transition: { duration: 0.5, delay: 0.22, ease: EASE.outExpo } },
          }}
          initial="hidden"
          animate={animate}
          className="h-[2px] w-16 rounded-full mt-4 mb-3 origin-center"
          style={{ background: 'linear-gradient(90deg, rgba(199,154,43,0), #C79A2B, rgba(199,154,43,0))' }}
        />
      )}

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          variants={reduced ? {} : mk(0.26)}
          initial="hidden"
          animate={animate}
          className={`text-base leading-relaxed mt-2 max-w-2xl ${subColor}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}

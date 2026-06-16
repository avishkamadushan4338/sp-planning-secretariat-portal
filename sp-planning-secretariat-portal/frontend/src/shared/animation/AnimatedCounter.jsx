/* ─────────────────────────────────────────────────────────────────────────
   AnimatedCounter  —  Scroll-triggered animated number counter
   Replaces / extends existing CountUp usage across the portal.
   Features:
    • RAF-driven smooth easing (expo out)
    • Prefix / suffix support
    • Decimals support
    • Optional icon slot
    • Scroll-triggered (fires once when visible)
    • Respects prefers-reduced-motion
   Usage:
     <AnimatedCounter end={85} suffix="%" label="Project Success" />
     <AnimatedCounter end={500} suffix="K+" label="Beneficiaries" icon={<FiUsers />} />
───────────────────────────────────────────────────────────────────────── */
import { motion } from 'framer-motion'
import { useAnimatedCounter } from '@/shared/hooks/useAnimatedCounter'
import { useReducedMotion }   from '@/shared/hooks/useReducedMotion'
import { fadeUp } from '@/shared/animation/motion'

export default function AnimatedCounter({
  end,
  start     = 0,
  duration  = 2000,
  delay     = 0,
  decimals  = 0,
  prefix    = '',
  suffix    = '',
  label     = '',
  icon      = null,
  className = '',
  numClassName  = 'text-3xl font-bold text-[#C79A2B]',
  labelClassName = 'text-sm text-white/60 mt-1',
}) {
  const reduced = useReducedMotion()
  const { ref, count } = useAnimatedCounter({ end, start, duration, delay, decimals })

  const display = `${prefix}${count.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}${suffix}`

  return (
    <motion.div
      ref={ref}
      variants={reduced ? {} : fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className={`flex flex-col items-center ${className}`}
    >
      {icon && (
        <motion.div
          initial={reduced ? {} : { scale: 0.7, opacity: 0 }}
          whileInView={reduced ? {} : { scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 320, damping: 22, delay: delay + 0.1 }}
          className="mb-2"
        >
          {icon}
        </motion.div>
      )}

      <span className={numClassName} aria-live="polite" aria-label={`${display} ${label}`}>
        {display}
      </span>

      {label && (
        <span className={labelClassName}>{label}</span>
      )}
    </motion.div>
  )
}

/* ── Stats grid preset (4-up with dividers) ─────────────────────────────── */
export function StatsGrid({ items = [], className = '' }) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-0 ${className}`}>
      {items.map((item, i) => (
        <div
          key={i}
          className={`
            flex flex-col items-center justify-center
            py-6 px-4
            ${i < items.length - 1 ? 'border-r border-[rgba(199,154,43,0.15)]' : ''}
            ${i >= 2 && i < items.length ? 'md:border-t-0 border-t border-[rgba(199,154,43,0.10)]' : ''}
          `}
        >
          <AnimatedCounter
            end={item.end}
            suffix={item.suffix}
            prefix={item.prefix}
            decimals={item.decimals ?? 0}
            label={item.label}
            icon={item.icon}
            delay={i * 0.15}
            numClassName="text-2xl md:text-3xl font-bold text-[#C79A2B] font-serif tabular-nums"
            labelClassName="text-xs text-white/55 mt-1 tracking-wide text-center"
          />
        </div>
      ))}
    </div>
  )
}

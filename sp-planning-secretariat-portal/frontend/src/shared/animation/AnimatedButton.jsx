/* ─────────────────────────────────────────────────────────────────────────
   AnimatedButton  —  Premium micro-interaction button
   Features:
    • Hover lift + scale spring
    • Tap scale feedback
    • Shimmer on hover via CSS overlay
    • Magnetic cursor attraction (optional)
    • Accessible focus ring
   Usage:
     <AnimatedButton variant="maroon" onClick={fn}>Label</AnimatedButton>
     <AnimatedButton variant="gold" magnetic>Label</AnimatedButton>
     <AnimatedButton variant="outline">Label</AnimatedButton>
───────────────────────────────────────────────────────────────────────── */
import { motion } from 'framer-motion'
import { useMagneticHover } from '@/shared/hooks/useMagneticHover'
import { useReducedMotion }  from '@/shared/hooks/useReducedMotion'

const VARIANTS = {
  maroon: {
    base: 'bg-[#4A0918] text-white border-transparent',
    hover: 'hover:bg-[#6E1024]',
    shadow: '0 6px 22px rgba(74,9,24,0.40)',
    shadowHover: '0 10px 30px rgba(74,9,24,0.55)',
  },
  gold: {
    base: 'bg-[#C79A2B] text-white border-transparent',
    hover: 'hover:bg-[#9A7520]',
    shadow: '0 6px 22px rgba(199,154,43,0.38)',
    shadowHover: '0 10px 30px rgba(199,154,43,0.52)',
  },
  outline: {
    base: 'bg-transparent text-[#4A0918] border-[#C79A2B]/60',
    hover: 'hover:bg-[#4A0918]/5',
    shadow: 'none',
    shadowHover: '0 6px 20px rgba(74,9,24,0.12)',
  },
  ghost: {
    base: 'bg-transparent text-[#4A0918]/80 border-transparent',
    hover: 'hover:text-[#4A0918]',
    shadow: 'none',
    shadowHover: 'none',
  },
}

export default function AnimatedButton({
  children,
  variant   = 'maroon',
  magnetic  = false,
  className = '',
  style     = {},
  onClick,
  type      = 'button',
  disabled  = false,
  ...rest
}) {
  const reduced = useReducedMotion()
  const magnet  = useMagneticHover(magnetic ? 0.22 : 0)
  const cfg     = VARIANTS[variant] ?? VARIANTS.maroon

  const motionProps = reduced || disabled ? {} : {
    whileHover: { scale: 1.03, y: -2, boxShadow: cfg.shadowHover },
    whileTap:   { scale: 0.97 },
    ...(magnetic ? {
      style: { ...style, x: magnet.x, y: magnet.y, boxShadow: cfg.shadow },
    } : {
      style: { ...style, boxShadow: cfg.shadow },
    }),
  }

  return (
    <motion.button
      ref={magnetic ? magnet.ref : undefined}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={magnetic ? magnet.onMouseMove : undefined}
      onMouseLeave={magnetic ? magnet.onMouseLeave : undefined}
      className={`
        inline-flex items-center gap-2
        px-[1.15rem] py-[0.65rem]
        rounded-[10px] border
        font-sans font-semibold text-[0.88rem] tracking-[0.025em]
        transition-colors duration-200
        cursor-pointer select-none
        relative overflow-hidden
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C79A2B] focus-visible:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${cfg.base} ${cfg.hover}
        ${className}
      `}
      {...(!magnetic ? { style: { ...style, boxShadow: cfg.shadow } } : {})}
      {...motionProps}
      {...rest}
    >
      {/* Shimmer overlay */}
      <span
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.14) 0%, transparent 55%)',
          opacity: 0,
          transition: 'opacity 0.25s ease',
        }}
        aria-hidden="true"
      />
      {children}
    </motion.button>
  )
}

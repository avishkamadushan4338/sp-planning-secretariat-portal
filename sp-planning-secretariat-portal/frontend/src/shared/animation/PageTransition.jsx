/* ─────────────────────────────────────────────────────────────────────────
   PageTransition  —  Route-level animated transitions
   Wrap around <Routes> inside App.jsx.
   On each pathname change:
    • Current page: fade-out + slight upward shift
    • Next page: fade-in + blur-clear from below
   Respects prefers-reduced-motion (instant swap if reduced).
───────────────────────────────────────────────────────────────────────── */
import { useLocation }   from 'react-router-dom'
import { motion } from 'framer-motion'
import { useReducedMotion }        from '@/shared/hooks/useReducedMotion'

const variants = {
  initial: { opacity: 0, y: 8, filter: 'blur(3px)' },
  animate: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0, filter: 'blur(2px)',
    transition: { duration: 0.18, ease: [0.4, 0, 0.2, 1] },
  },
}

const reducedVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.15 } },
  exit:    { opacity: 0, transition: { duration: 0.10 } },
}

export default function PageTransition({ children }) {
  const location = useLocation()
  const reduced  = useReducedMotion()
  const v        = reduced ? reducedVariants : variants

  return (
    <motion.div
      key={location.pathname}
      variants={v}
      initial="initial"
      animate="animate"
      style={{ willChange: 'opacity, filter' }}
    >
      {children}
    </motion.div>
  )
}

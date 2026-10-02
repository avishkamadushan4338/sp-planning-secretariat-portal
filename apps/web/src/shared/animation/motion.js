/* ─────────────────────────────────────────────────────────────────────────
   motion.js  —  Global animation configuration
   Government Digital 2050  ·  SP Planning Secretariat Portal
   Single source of truth for all animation constants, variants and easings.
───────────────────────────────────────────────────────────────────────── */

// ── Easing curves ────────────────────────────────────────────────────────────
export const EASE = {
  outExpo:   [0.16, 1, 0.3, 1],
  outQuart:  [0.25, 1, 0.5, 1],
  outCubic:  [0.33, 1, 0.68, 1],
  spring:    [0.22, 1, 0.36, 1],
  smooth:    [0.4, 0, 0.2, 1],
  inSine:    [0.12, 0, 0.39, 0],
  outBack:   [0.34, 1.56, 0.64, 1],
}

// ── Duration tokens ──────────────────────────────────────────────────────────
export const DUR = {
  instant: 0.12,
  fast:    0.22,
  base:    0.38,
  slow:    0.58,
  slower:  0.78,
  reveal:  0.65,
  hero:    0.95,
}

// ── Stagger tokens ───────────────────────────────────────────────────────────
export const STAGGER = {
  tight:  0.06,
  base:   0.10,
  loose:  0.15,
  wide:   0.20,
}

// ── Standard transition presets ──────────────────────────────────────────────
export const T = {
  fast:    { duration: DUR.fast,   ease: EASE.outQuart },
  base:    { duration: DUR.base,   ease: EASE.outExpo  },
  slow:    { duration: DUR.slow,   ease: EASE.outExpo  },
  spring:  { type: 'spring', stiffness: 280, damping: 28, mass: 0.9 },
  springTight: { type: 'spring', stiffness: 380, damping: 32 },
  reveal:  { duration: DUR.reveal, ease: EASE.spring   },
}

// ── Reduced-motion safe transition (minimal movement) ────────────────────────
export const T_REDUCED = { duration: 0.01, ease: 'linear' }

// ─────────────────────────────────────────────────────────────────────────────
//  FRAMER MOTION VARIANTS
// ─────────────────────────────────────────────────────────────────────────────

// ── Generic fade-up (the workhorse reveal) ───────────────────────────────────
export const fadeUp = {
  hidden:  { opacity: 0, y: 28, filter: 'blur(5px)' },
  visible: { opacity: 1, y: 0,  filter: 'blur(0px)', transition: T.reveal },
}

// ── Premium scroll reveal — richer motion, used for section entrances ────────
export const fadeUpPremium = {
  hidden:  { opacity: 0, y: 44, filter: 'blur(10px)', scale: 0.98 },
  visible: { opacity: 1, y: 0,  filter: 'blur(0px)',  scale: 1,
    transition: { duration: DUR.hero, ease: EASE.outExpo },
  },
}

// ── Slide up from bottom with clip ──────────────────────────────────────────
export const clipReveal = {
  hidden:  { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
  visible: { clipPath: 'inset(0% 0 0 0)',   opacity: 1,
    transition: { duration: DUR.reveal, ease: EASE.outExpo },
  },
}

export const fadeDown = {
  hidden:  { opacity: 0, y: -28, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0,   filter: 'blur(0px)', transition: T.reveal },
}

export const fadeLeft = {
  hidden:  { opacity: 0, x: -36, filter: 'blur(4px)' },
  visible: { opacity: 1, x: 0,   filter: 'blur(0px)', transition: T.reveal },
}

export const fadeRight = {
  hidden:  { opacity: 0, x: 36,  filter: 'blur(4px)' },
  visible: { opacity: 1, x: 0,   filter: 'blur(0px)', transition: T.reveal },
}

export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: T.base },
}

export const scaleUp = {
  hidden:  { opacity: 0, scale: 0.88, filter: 'blur(4px)' },
  visible: { opacity: 1, scale: 1,    filter: 'blur(0px)', transition: T.reveal },
}

export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1,    transition: T.spring },
}

// ── Stagger container ────────────────────────────────────────────────────────
export const staggerContainer = (stagger = STAGGER.base, delayChildren = 0.08) => ({
  hidden:  {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
})

// ── Card hover state ─────────────────────────────────────────────────────────
export const cardHover = {
  rest:  { y: 0,  boxShadow: '0 6px 20px rgba(0,0,0,0.08)', transition: T.base },
  hover: { y: -6, boxShadow: '0 18px 48px rgba(0,0,0,0.14)', transition: T.spring },
}

// ── Card with animated border ────────────────────────────────────────────────
export const cardBorder = {
  rest:  { borderColor: 'rgba(199,154,43,0.15)', transition: T.fast },
  hover: { borderColor: 'rgba(199,154,43,0.60)', transition: T.fast },
}

// ── Premium button ───────────────────────────────────────────────────────────
export const btnHover = {
  rest:  { scale: 1,    y: 0 },
  hover: { scale: 1.03, y: -2, transition: T.spring },
  tap:   { scale: 0.97, y: 0,  transition: T.fast },
}

// ── Slide-in overlay (mobile menu, drawers) ──────────────────────────────────
export const slideInLeft = {
  hidden:  { opacity: 0, x: '-100%' },
  visible: { opacity: 1, x: 0, transition: { duration: DUR.slow, ease: EASE.outExpo } },
  exit:    { opacity: 0, x: '-100%', transition: { duration: DUR.base, ease: EASE.smooth } },
}

export const slideInRight = {
  hidden:  { opacity: 0, x: '100%' },
  visible: { opacity: 1, x: 0, transition: { duration: DUR.slow, ease: EASE.outExpo } },
  exit:    { opacity: 0, x: '100%', transition: { duration: DUR.base, ease: EASE.smooth } },
}

// ── Page transition ──────────────────────────────────────────────────────────
export const pageEnter = {
  initial: { opacity: 0, y: 16, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0,  filter: 'blur(0px)',
    transition: { duration: DUR.slower, ease: EASE.outExpo },
  },
  exit:    { opacity: 0, y: -10, filter: 'blur(2px)',
    transition: { duration: DUR.base, ease: EASE.smooth },
  },
}

// ── Loading progress bar ─────────────────────────────────────────────────────
export const progressBar = {
  initial: { scaleX: 0 },
  animate: { scaleX: 1 },
}

// ── Section header reveal (left accent line) ─────────────────────────────────
export const sectionHeaderLine = {
  hidden:  { scaleX: 0, opacity: 0 },
  visible: { scaleX: 1, opacity: 1, transition: { duration: 0.55, ease: EASE.outExpo, delay: 0.1 } },
}

// ── Number count up variant ──────────────────────────────────────────────────
export const countVariant = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: T.reveal },
}

// ── Timeline item ────────────────────────────────────────────────────────────
export const timelineItem = (fromLeft = true) => ({
  hidden:  { opacity: 0, x: fromLeft ? -40 : 40, filter: 'blur(4px)' },
  visible: {
    opacity: 1, x: 0, filter: 'blur(0px)',
    transition: { duration: DUR.reveal, ease: EASE.spring },
  },
})

// ── Dot line fill (timeline connector) ──────────────────────────────────────
export const timelineLine = {
  hidden:  { scaleY: 0, opacity: 0 },
  visible: { scaleY: 1, opacity: 1, transition: { duration: 0.7, ease: EASE.outExpo } },
}

// ── Glassmorphism card entry ─────────────────────────────────────────────────
export const glassCard = {
  hidden:  { opacity: 0, y: 28, scale: 0.96, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0,  scale: 1,    filter: 'blur(0px)',
    transition: { duration: DUR.slower, ease: EASE.spring },
  },
}

// ── Tag / badge pop-in ───────────────────────────────────────────────────────
export const badgePop = {
  hidden:  { opacity: 0, scale: 0.7 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 360, damping: 22 } },
}

// ── Icon spin-reveal ─────────────────────────────────────────────────────────
export const iconReveal = {
  hidden:  { opacity: 0, rotate: -15, scale: 0.7 },
  visible: { opacity: 1, rotate: 0,   scale: 1,
    transition: { type: 'spring', stiffness: 320, damping: 24 },
  },
}

// ── Ambient floating (continuous) ────────────────────────────────────────────
export const floatLoop = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 5, ease: 'easeInOut', repeat: Infinity },
  },
}

// ── Shimmer sweep (loading state) ────────────────────────────────────────────
export const shimmerX = {
  animate: {
    backgroundPosition: ['200% center', '-200% center'],
    transition: { duration: 2.2, ease: 'linear', repeat: Infinity },
  },
}

// ── Gradient position shift ──────────────────────────────────────────────────
export const gradientShift = {
  animate: {
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    transition: { duration: 12, ease: 'linear', repeat: Infinity },
  },
}

// ── Pulse ring (status indicator) ───────────────────────────────────────────
export const pulseRing = {
  animate: {
    scale: [1, 1.5, 1],
    opacity: [0.8, 0, 0.8],
    transition: { duration: 2, ease: 'easeInOut', repeat: Infinity },
  },
}

// ── Orbit rotation ──────────────────────────────────────────────────────────
export const orbitSlow = {
  animate: {
    rotate: [0, 360],
    transition: { duration: 24, ease: 'linear', repeat: Infinity },
  },
}

// ── Reveal line (horizontal separator) ──────────────────────────────────────
export const revealLine = {
  hidden:  { scaleX: 0, opacity: 0, originX: 0 },
  visible: { scaleX: 1, opacity: 1, transition: { duration: 0.6, ease: EASE.outExpo, delay: 0.15 } },
}

// ── Number tick (slot machine style) ────────────────────────────────────────
export const numberTick = {
  initial: { y: 40, opacity: 0 },
  animate: { y: 0,  opacity: 1, transition: { duration: 0.45, ease: EASE.outBack } },
  exit:    { y: -40, opacity: 0, transition: { duration: 0.3,  ease: EASE.inSine } },
}

// ── Drawer / accordion expand ────────────────────────────────────────────────
export const accordionExpand = {
  hidden:  { height: 0, opacity: 0 },
  visible: { height: 'auto', opacity: 1, transition: { duration: DUR.base, ease: EASE.outExpo } },
  exit:    { height: 0,    opacity: 0, transition: { duration: DUR.fast,  ease: EASE.smooth } },
}

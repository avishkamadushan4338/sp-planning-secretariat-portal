import React from 'react'
import ReactDOM from 'react-dom/client'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Root from './Root'
import './styles/index.css'
import 'lenis/dist/lenis.css'

/* ── GSAP plugins ────────────────────────────────────────────────────────── */
gsap.registerPlugin(ScrollTrigger)

/* ── Lenis smooth scroll ─────────────────────────────────────────────────── */
const lenis = new Lenis({
  duration:        1.3,
  easing:          (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel:     true,
  wheelMultiplier: 0.9,
  touchMultiplier: 1.5,
  infinite:        false,
})

/* ── Sync Lenis with GSAP ScrollTrigger ─────────────────────────────────── */
lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})
gsap.ticker.lagSmoothing(0)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
)

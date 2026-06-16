/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      /* ── Brand colours ──────────────────────────────────────────────── */
      colors: {
        gold:          '#C79A2B',
        'gold-light':  '#E8C55A',
        'gold-dark':   '#9A7520',
        'gold-muted':  'rgba(199,154,43,0.15)',
        maroon:        '#6E1024',
        'deep-maroon': '#4A0918',
        ivory:         '#FCFBFA',
        'ivory-dark':  '#F5EFE6',
        'warm-neutral':'#E7E1DC',
        'prem-black':  '#171717',
        'pro-gray':    '#777777',
        'soft-gray':   '#F4F4F5',
        /* Animation system additions */
        navy:          '#0D1B3E',
        'navy-mid':    '#1A2F5E',
        royal:         '#1E3A8A',
        'glass-white': 'rgba(252,251,250,0.72)',
        'glass-dark':  'rgba(10,6,4,0.72)',
      },

      /* ── Font families ──────────────────────────────────────────────── */
      fontFamily: {
        sans:    ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Cinzel', 'Georgia', 'serif'],
        serif:   ['Playfair Display', 'Georgia', 'Times New Roman', 'serif'],
        ui:      ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono:    ['DM Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        sinhala: ["'Noto Sans Sinhala'", 'sans-serif'],
        tamil:   ["'Noto Sans Tamil'", 'sans-serif'],
      },

      /* ── Elevation shadows ──────────────────────────────────────────── */
      boxShadow: {
        'xs':       '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'sm':       '0 2px 8px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.05)',
        'nav':      '0 4px 24px rgba(0,0,0,0.12)',
        'card':     '0 6px 20px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04)',
        'dropdown': '0 8px 32px rgba(0,0,0,0.12)',
        'lg':       '0 14px 40px rgba(0,0,0,0.13), 0 4px 12px rgba(0,0,0,0.07)',
        'xl':       '0 24px 64px rgba(0,0,0,0.16), 0 8px 20px rgba(0,0,0,0.08)',
        'gold':     '0 6px 24px rgba(199,154,43,0.28)',
        'gold-lg':  '0 12px 40px rgba(199,154,43,0.35)',
        'maroon':   '0 6px 24px rgba(74,9,24,0.28)',
        'inner':    'inset 0 2px 6px rgba(0,0,0,0.06)',
      },

      /* ── Border radius ──────────────────────────────────────────────── */
      borderRadius: {
        'sm':  '6px',
        'md':  '10px',
        'lg':  '16px',
        'xl':  '24px',
        '2xl': '32px',
      },

      /* ── Easing curves ──────────────────────────────────────────────── */
      transitionTimingFunction: {
        'smooth':        'cubic-bezier(0.4, 0, 0.2, 1)',
        'out-expo':      'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-quart':     'cubic-bezier(0.25, 1, 0.5, 1)',
        'out-cubic':     'cubic-bezier(0.33, 1, 0.68, 1)',
        'spring':        'cubic-bezier(0.22, 1, 0.36, 1)',
        'out-back':      'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'in-sine':       'cubic-bezier(0.12, 0, 0.39, 0)',
      },

      /* ── Extended spacing ───────────────────────────────────────────── */
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '128': '32rem',
        '144': '36rem',
      },

      /* ── Animations ─────────────────────────────────────────────────── */
      animation: {
        /* Existing */
        'fade-in':       'fadeIn 0.5s ease both',
        'fade-in-up':    'fadeInUp 0.65s cubic-bezier(0.16,1,0.3,1) both',
        'shimmer':       'shimmer 2s linear infinite',
        'float':         'float 4s ease-in-out infinite',
        'spin-slow':     'spin-slow 12s linear infinite',
        'pulse-gold':    'pulse-gold 2s infinite',
        'slide-in-left': 'slideInLeft 0.5s cubic-bezier(0.16,1,0.3,1) both',
        /* Animation system — Government Digital 2050 */
        'card-float':        'cardFloat 5s ease-in-out infinite',
        'gradient-shift':    'gradientShift 12s ease infinite',
        'orb-drift-y':       'orbDriftY 10s ease-in-out infinite',
        'orb-drift-x':       'orbDriftX 14s ease-in-out infinite',
        'reveal-up':         'revealSlideUp 0.62s cubic-bezier(0.22,1,0.36,1) both',
        'reveal-left':       'revealSlideLeft 0.62s cubic-bezier(0.22,1,0.36,1) both',
        'reveal-right':      'revealSlideRight 0.62s cubic-bezier(0.22,1,0.36,1) both',
        'reveal-scale':      'scaleReveal 0.62s cubic-bezier(0.22,1,0.36,1) both',
        'line-grow-x':       'lineGrow 0.55s cubic-bezier(0.16,1,0.3,1) both',
        'line-grow-y':       'lineGrowY 0.7s cubic-bezier(0.16,1,0.3,1) both',
        'pulse-ring':        'pulseRing 2s ease-out infinite',
        'border-glow':       'borderGlow 2.4s ease-in-out infinite',
        'ambient-move':      'ambientMove 18s ease-in-out infinite',
        'number-tick':       'numberTick 0.45s cubic-bezier(0.34,1.56,0.64,1) both',
        'navbar-reveal':     'navBarReveal 0.5s cubic-bezier(0.22,1,0.36,1) both',
      },
      keyframes: {
        /* Existing */
        fadeIn:       { from: { opacity: '0' }, to: { opacity: '1' } },
        fadeInUp:     { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        shimmer:      { '0%': { backgroundPosition: '-200% center' }, '100%': { backgroundPosition: '200% center' } },
        float:        { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-6px)' } },
        'spin-slow':  { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } },
        'pulse-gold': { '0%,100%': { boxShadow: '0 0 0 0 rgba(199,154,43,0.4)' }, '50%': { boxShadow: '0 0 0 8px rgba(199,154,43,0)' } },
        slideInLeft:  { from: { opacity: '0', transform: 'translateX(-20px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        /* Animation system */
        cardFloat:        { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-8px)' } },
        gradientShift:    { '0%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' }, '100%': { backgroundPosition: '0% 50%' } },
        orbDriftY:        { '0%,100%': { transform: 'translateY(0px) scale(1)' }, '50%': { transform: 'translateY(-22px) scale(1.04)' } },
        orbDriftX:        { '0%,100%': { transform: 'translateX(0px) scale(1)' }, '50%': { transform: 'translateX(18px) scale(1.03)' } },
        revealSlideUp:    { from: { opacity: '0', transform: 'translateY(28px)', filter: 'blur(6px)' }, to: { opacity: '1', transform: 'translateY(0)', filter: 'blur(0)' } },
        revealSlideLeft:  { from: { opacity: '0', transform: 'translateX(-32px)', filter: 'blur(4px)' }, to: { opacity: '1', transform: 'translateX(0)', filter: 'blur(0)' } },
        revealSlideRight: { from: { opacity: '0', transform: 'translateX(32px)', filter: 'blur(4px)' }, to: { opacity: '1', transform: 'translateX(0)', filter: 'blur(0)' } },
        scaleReveal:      { from: { opacity: '0', transform: 'scale(0.88)', filter: 'blur(4px)' }, to: { opacity: '1', transform: 'scale(1)', filter: 'blur(0)' } },
        lineGrow:         { from: { transform: 'scaleX(0)', opacity: '0' }, to: { transform: 'scaleX(1)', opacity: '1' } },
        lineGrowY:        { from: { transform: 'scaleY(0)', opacity: '0' }, to: { transform: 'scaleY(1)', opacity: '1' } },
        pulseRing:        { '0%': { transform: 'scale(1)', opacity: '0.8' }, '100%': { transform: 'scale(2)', opacity: '0' } },
        borderGlow:       { '0%,100%': { boxShadow: '0 0 0 0 rgba(199,154,43,0.3)' }, '50%': { boxShadow: '0 0 0 4px rgba(199,154,43,0)' } },
        ambientMove:      { '0%': { transform: 'translate(0,0) scale(1)' }, '33%': { transform: 'translate(20px,-15px) scale(1.04)' }, '66%': { transform: 'translate(-10px,10px) scale(0.97)' }, '100%': { transform: 'translate(0,0) scale(1)' } },
        numberTick:       { from: { transform: 'translateY(100%)', opacity: '0' }, to: { transform: 'translateY(0)', opacity: '1' } },
        navBarReveal:     { from: { opacity: '0', transform: 'translateY(-100%)' }, to: { opacity: '1', transform: 'translateY(0)' } },
      },

      /* ── Backdrop blur ──────────────────────────────────────────────── */
      backdropBlur: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '40px',
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gold:         '#C79A2B',
        maroon:       '#6E1024',
        'deep-maroon':'#4A0918',
        ivory:        '#FCFBFA',
        'warm-neutral':'#E7E1DC',
        'prem-black': '#171717',
        'pro-gray':   '#777777',
      },
      fontFamily: {
        // Primary UI / body — humanist geometric sans
        sans:    ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        // Classical display — authoritative headings
        display: ['Cinzel', 'Georgia', 'serif'],
        // Editorial serif — elegant sub-headings, pull-quotes
        serif:   ['Playfair Display', 'Georgia', 'Times New Roman', 'serif'],
        // UI utility — labels, nav, micro-copy
        ui:      ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        // Data / numeric — tables, statistics, code
        mono:    ['DM Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        'nav': '0 4px 24px rgba(0,0,0,0.12)',
        'dropdown': '0 8px 32px rgba(0,0,0,0.12)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}

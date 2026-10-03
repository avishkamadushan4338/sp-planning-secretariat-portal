const router = require('express').Router()
const { appRouter, callPortal } = require('../../../services')

const { about } = appRouter.portal
const EMPTY_LANG = { en: '', si: '', ta: '' }

function defaultShape() {
  return {
    id: 'org',
    nodes: [],
    ui: {
      intro: { en: { title: '', text: '' }, si: { title: '', text: '' }, ta: { title: '', text: '' } },
      cardHeader: { en: { title: '', sub: '' }, si: { title: '', sub: '' }, ta: { title: '', sub: '' } },
      scrollHints: { en: { mobile: '', mobileBottom: '', desktop: '' }, si: { mobile: '', mobileBottom: '', desktop: '' }, ta: { mobile: '', mobileBottom: '', desktop: '' } },
      legend: { en: [], si: [], ta: [] },
      footer: { en: { title: '', sub: '' }, si: { title: '', sub: '' }, ta: { title: '', sub: '' } },
      imgFallbackLabel: { ...EMPTY_LANG },
    },
    updatedAt: null,
  }
}

/* ── GET /api/org-structure ───────────────────────────────────────────────── */
router.get('/', async (_req, res) => {
  const row = await callPortal(about.getOrgStructure, undefined)
  res.json(row || defaultShape())
})

/* ── PUT /api/org-structure ───────────────────────────────────────────────── */
router.put('/', async (req, res) => {
  const existing = await callPortal(about.getOrgStructure, undefined)
  const saved = await callPortal(about.saveOrgStructure, { ...defaultShape(), ...existing, ...req.body })
  res.json(saved)
})

module.exports = router

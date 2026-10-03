const router = require('express').Router()
const { appRouter, callPortal } = require('../../../services')

const { about } = appRouter.portal
const EMPTY_LANG_BLOCK = { sectionLabel: '', intro: '', duties: [] }

function defaultShape() {
  return {
    id: 'functions',
    en: { ...EMPTY_LANG_BLOCK },
    si: { ...EMPTY_LANG_BLOCK },
    ta: { ...EMPTY_LANG_BLOCK },
    updatedAt: null,
  }
}

/* ── GET /api/about-functions ─────────────────────────────────────────────── */
router.get('/', async (_req, res) => {
  const row = await callPortal(about.getFunctions, undefined)
  res.json(row || defaultShape())
})

/* ── PUT /api/about-functions ─────────────────────────────────────────────── */
router.put('/', async (req, res) => {
  const existing = await callPortal(about.getFunctions, undefined)
  const saved = await callPortal(about.saveFunctions, { ...defaultShape(), ...existing, ...req.body })
  res.json(saved)
})

module.exports = router

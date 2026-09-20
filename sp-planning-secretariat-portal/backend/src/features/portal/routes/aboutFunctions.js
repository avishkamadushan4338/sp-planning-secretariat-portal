const router = require('express').Router()
const db = require('../../../db')

const SINGLETON_ID = 'functions'

const EMPTY_LANG_BLOCK = { sectionLabel: '', intro: '', duties: [] }

function defaultShape() {
  return {
    id: SINGLETON_ID,
    en: { ...EMPTY_LANG_BLOCK },
    si: { ...EMPTY_LANG_BLOCK },
    ta: { ...EMPTY_LANG_BLOCK },
    updatedAt: null,
  }
}

/* ── GET /api/about-functions ─────────────────────────────────────────────── */
router.get('/', async (_req, res) => {
  const row = await db.findById('about_functions', SINGLETON_ID)
  res.json(row || defaultShape())
})

/* ── PUT /api/about-functions ─────────────────────────────────────────────── */
router.put('/', async (req, res) => {
  const patch = { ...(req.body || {}), id: SINGLETON_ID }
  const existing = await db.findById('about_functions', SINGLETON_ID)
  const saved = existing
    ? await db.update('about_functions', SINGLETON_ID, patch)
    : await db.insert('about_functions', { ...defaultShape(), ...patch, updatedAt: new Date().toISOString() })
  res.json(saved)
})

module.exports = router

const router = require('express').Router()
const db = require('../../../db')

const SINGLETON_ID = 'org'

const EMPTY_LANG = { en: '', si: '', ta: '' }

function defaultShape() {
  return {
    id: SINGLETON_ID,
    nodes: [],
    ui: {
      intro:       { en: { title: '', text: '' }, si: { title: '', text: '' }, ta: { title: '', text: '' } },
      cardHeader:  { en: { title: '', sub: '' },  si: { title: '', sub: '' },  ta: { title: '', sub: '' } },
      scrollHints: { en: { mobile: '', mobileBottom: '', desktop: '' }, si: { mobile: '', mobileBottom: '', desktop: '' }, ta: { mobile: '', mobileBottom: '', desktop: '' } },
      legend:      { en: [], si: [], ta: [] },
      footer:      { en: { title: '', sub: '' },  si: { title: '', sub: '' },  ta: { title: '', sub: '' } },
      imgFallbackLabel: { ...EMPTY_LANG },
    },
    updatedAt: null,
  }
}

/* ── GET /api/org-structure ───────────────────────────────────────────────── */
router.get('/', async (_req, res) => {
  const row = await db.findById('org_structure', SINGLETON_ID)
  res.json(row || defaultShape())
})

/* ── PUT /api/org-structure ───────────────────────────────────────────────── */
router.put('/', async (req, res) => {
  const patch = { ...(req.body || {}), id: SINGLETON_ID }
  const existing = await db.findById('org_structure', SINGLETON_ID)
  const saved = existing
    ? await db.update('org_structure', SINGLETON_ID, patch)
    : await db.insert('org_structure', { ...defaultShape(), ...patch, updatedAt: new Date().toISOString() })
  res.json(saved)
})

module.exports = router

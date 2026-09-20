const router = require('express').Router()
const db = require('../../../db')

const SINGLETON_ID = 'history'

const EMPTY_LANG_BLOCK = {
  introLabel: '', introTitle: '', introPara1: '', introPara2: '',
  tableTitle: '', tableName: '', tableService: '',
  projectsTitle: '', projectsRead: '',
  officialGovt: '', officialGovtSub: '',
  directors: [], projects: [],
}

function defaultShape() {
  return {
    id: SINGLETON_ID,
    en: { ...EMPTY_LANG_BLOCK },
    si: { ...EMPTY_LANG_BLOCK },
    ta: { ...EMPTY_LANG_BLOCK },
    stats: {
      established: '', province: '', districts: '', yearsOfService: '',
      labels: { en: {}, si: {}, ta: {} },
    },
    updatedAt: null,
  }
}

/* ── GET /api/about-history ───────────────────────────────────────────────── */
router.get('/', async (_req, res) => {
  const row = await db.findById('about_history', SINGLETON_ID)
  res.json(row || defaultShape())
})

/* ── PUT /api/about-history ───────────────────────────────────────────────── */
router.put('/', async (req, res) => {
  const patch = { ...(req.body || {}), id: SINGLETON_ID }
  const existing = await db.findById('about_history', SINGLETON_ID)
  const saved = existing
    ? await db.update('about_history', SINGLETON_ID, patch)
    : await db.insert('about_history', { ...defaultShape(), ...patch, updatedAt: new Date().toISOString() })
  res.json(saved)
})

module.exports = router

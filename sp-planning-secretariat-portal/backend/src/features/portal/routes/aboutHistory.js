const router = require('express').Router()
const { appRouter, callPortal } = require('../../../services')

const { about } = appRouter.portal
const EMPTY_LANG_BLOCK = {
  introLabel: '', introTitle: '', introPara1: '', introPara2: '',
  tableTitle: '', tableName: '', tableService: '',
  projectsTitle: '', projectsRead: '',
  officialGovt: '', officialGovtSub: '',
  directors: [], projects: [],
}

function defaultShape() {
  return {
    id: 'history',
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
  const row = await callPortal(about.getHistory, undefined)
  res.json(row || defaultShape())
})

/* ── PUT /api/about-history ───────────────────────────────────────────────── */
router.put('/', async (req, res) => {
  const existing = await callPortal(about.getHistory, undefined)
  const saved = await callPortal(about.saveHistory, { ...defaultShape(), ...existing, ...req.body })
  res.json(saved)
})

module.exports = router

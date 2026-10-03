const router = require('express').Router()
const { appRouter, callPortal } = require('../../../services')

const { homeContent } = appRouter.portal
const EMPTY_LANG = { en: '', si: '', ta: '' }

function defaultShape() {
  return {
    id: 'home',
    heroSlides: [],
    aboutSecretariat: {
      eyebrow: { ...EMPTY_LANG },
      title: { ...EMPTY_LANG },
      subtitle: { ...EMPTY_LANG },
      body: { ...EMPTY_LANG },
      image: '',
      statCard: null,
    },
    deputySecretaryStaffId: null,
    deputySecretaryMessage: { ...EMPTY_LANG },
    updatedAt: null,
  }
}

/* ── GET /api/home-content ────────────────────────────────────────────────── */
router.get('/', async (_req, res) => {
  const row = await callPortal(homeContent.get, undefined)
  res.json(row || defaultShape())
})

/* ── PUT /api/home-content ────────────────────────────────────────────────── */
router.put('/', async (req, res) => {
  const saved = await callPortal(homeContent.save, req.body || {})
  res.json(saved)
})

module.exports = router

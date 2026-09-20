const router = require('express').Router()
const db = require('../../../db')

const SINGLETON_ID = 'home'

const EMPTY_LANG = { en: '', si: '', ta: '' }

function defaultShape() {
  return {
    id: SINGLETON_ID,
    heroSlides: [],
    aboutSecretariat: {
      eyebrow:  { ...EMPTY_LANG },
      title:    { ...EMPTY_LANG },
      subtitle: { ...EMPTY_LANG },
      body:     { ...EMPTY_LANG },
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
  const row = await db.findById('home_content', SINGLETON_ID)
  res.json(row || defaultShape())
})

/* ── PUT /api/home-content ────────────────────────────────────────────────── */
router.put('/', async (req, res) => {
  const patch = { ...(req.body || {}), id: SINGLETON_ID }
  const existing = await db.findById('home_content', SINGLETON_ID)
  const saved = existing
    ? await db.update('home_content', SINGLETON_ID, patch)
    : await db.insert('home_content', { ...defaultShape(), ...patch, updatedAt: new Date().toISOString() })
  res.json(saved)
})

module.exports = router

const router = require('express').Router()
const db = require('../../../db')

const SINGLETON_ID = 'org'

function defaultShape() {
  return {
    id: SINGLETON_ID,
    address: '',
    phone: '',
    fax: '',
    email: '',
    hours: { en: '', si: '', ta: '' },
    socialLinks: { facebook: '', youtube: '', linkedin: '' },
    updatedAt: null,
  }
}

/* ── GET /api/site-settings ───────────────────────────────────────────────── */
router.get('/', async (_req, res) => {
  const row = await db.findById('site_settings', SINGLETON_ID)
  res.json(row || defaultShape())
})

/* ── PUT /api/site-settings ───────────────────────────────────────────────── */
router.put('/', async (req, res) => {
  const patch = { ...(req.body || {}), id: SINGLETON_ID }
  const existing = await db.findById('site_settings', SINGLETON_ID)
  const saved = existing
    ? await db.update('site_settings', SINGLETON_ID, patch)
    : await db.insert('site_settings', { ...defaultShape(), ...patch, updatedAt: new Date().toISOString() })
  res.json(saved)
})

module.exports = router

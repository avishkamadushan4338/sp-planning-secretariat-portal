const router = require('express').Router()
const { appRouter, callPortal } = require('../../../services')

const { siteSettings } = appRouter.portal

function defaultShape() {
  return {
    id: 'org',
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
  const row = await callPortal(siteSettings.get, undefined)
  res.json(row || defaultShape())
})

/* ── PUT /api/site-settings ───────────────────────────────────────────────── */
router.put('/', async (req, res) => {
  const existing = await callPortal(siteSettings.get, undefined)
  const saved = await callPortal(siteSettings.update, { ...defaultShape(), ...existing, ...req.body })
  res.json(saved)
})

module.exports = router

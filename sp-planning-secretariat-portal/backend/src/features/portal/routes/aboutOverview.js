const router = require('express').Router()
const db = require('../../../db')

const SINGLETON_ID = 'overview'

const EMPTY_LANG = { en: '', si: '', ta: '' }

function defaultShape() {
  return {
    id: SINGLETON_ID,
    intro: {
      en: { introLabel: '', introTitle: '', introParagraphs: [], visionLabel: '', visionText: '', missionLabel: '', missionText: '', imageAlt: '', officialGovt: '', officialGovtSub: '' },
      si: { introLabel: '', introTitle: '', introParagraphs: [], visionLabel: '', visionText: '', missionLabel: '', missionText: '', imageAlt: '', officialGovt: '', officialGovtSub: '' },
      ta: { introLabel: '', introTitle: '', introParagraphs: [], visionLabel: '', visionText: '', missionLabel: '', missionText: '', imageAlt: '', officialGovt: '', officialGovtSub: '' },
    },
    image: '',
    establishedBadge: { ...EMPTY_LANG },
    values: {
      en: { sectionLabel: '', items: [] },
      si: { sectionLabel: '', items: [] },
      ta: { sectionLabel: '', items: [] },
    },
    objectives: {
      en: { sectionLabel: '', items: [] },
      si: { sectionLabel: '', items: [] },
      ta: { sectionLabel: '', items: [] },
    },
    awards: {
      sectionLabel: { ...EMPTY_LANG },
      items: [],
    },
    updatedAt: null,
  }
}

/* ── GET /api/about-overview ──────────────────────────────────────────────── */
router.get('/', async (_req, res) => {
  const row = await db.findById('about_overview', SINGLETON_ID)
  res.json(row || defaultShape())
})

/* ── PUT /api/about-overview ──────────────────────────────────────────────── */
router.put('/', async (req, res) => {
  const patch = { ...(req.body || {}), id: SINGLETON_ID }
  const existing = await db.findById('about_overview', SINGLETON_ID)
  const saved = existing
    ? await db.update('about_overview', SINGLETON_ID, patch)
    : await db.insert('about_overview', { ...defaultShape(), ...patch, updatedAt: new Date().toISOString() })
  res.json(saved)
})

module.exports = router

const router = require('express').Router()
const { appRouter, callPortal } = require('../../../services')

const { about } = appRouter.portal
const EMPTY_LANG = { en: '', si: '', ta: '' }

function defaultShape() {
  return {
    id: 'overview',
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
  const row = await callPortal(about.getOverview, undefined)
  res.json(row || defaultShape())
})

/* ── PUT /api/about-overview ──────────────────────────────────────────────── */
router.put('/', async (req, res) => {
  const existing = await callPortal(about.getOverview, undefined)
  const saved = await callPortal(about.saveOverview, { ...defaultShape(), ...existing, ...req.body })
  res.json(saved)
})

module.exports = router

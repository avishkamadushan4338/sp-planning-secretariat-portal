const router = require('express').Router()
const { appRouter, callPortal } = require('../../../services')

const { faqs } = appRouter.portal

/* ── GET /api/faqs ────────────────────────────────────────────────────────── */
router.get('/', async (_req, res) => {
  res.json(await callPortal(faqs.list, undefined))
})

/* ── POST /api/faqs ───────────────────────────────────────────────────────── */
router.post('/', async (req, res) => {
  const question = req.body?.question
  const answer = req.body?.answer
  if (!question?.en?.trim()) return res.status(400).json({ error: 'English question is required.' })
  if (!answer?.en?.trim()) return res.status(400).json({ error: 'English answer is required.' })
  const saved = await callPortal(faqs.save, { ...req.body, id: undefined })
  res.status(201).json(saved)
})

/* ── PATCH /api/faqs/:id ──────────────────────────────────────────────────── */
router.patch('/:id', async (req, res) => {
  const rows = await callPortal(faqs.list, undefined)
  const existing = rows.find((r) => r.id === req.params.id)
  if (!existing) return res.status(404).json({ error: 'FAQ not found' })
  const saved = await callPortal(faqs.save, { ...existing, ...req.body, id: req.params.id })
  res.json(saved)
})

/* ── DELETE /api/faqs/:id ─────────────────────────────────────────────────── */
router.delete('/:id', async (req, res) => {
  const rows = await callPortal(faqs.list, undefined)
  const existing = rows.find((r) => r.id === req.params.id)
  if (!existing) return res.status(404).json({ error: 'FAQ not found' })
  await callPortal(faqs.delete, { id: req.params.id })
  res.json({ ok: true })
})

module.exports = router

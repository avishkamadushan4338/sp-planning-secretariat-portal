const router = require('express').Router()
const { v4: uuid } = require('uuid')
const db = require('../../../db')

/* ── GET /api/faqs ────────────────────────────────────────────────────────── */
router.get('/', async (_req, res) => {
  const rows = await db.findAll('faqs')
  rows.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  res.json(rows)
})

/* ── POST /api/faqs ───────────────────────────────────────────────────────── */
router.post('/', async (req, res) => {
  const now = new Date().toISOString()
  const record = {
    id:       uuid(),
    category: req.body?.category || 'general',
    question: req.body?.question || { en: '', si: '', ta: '' },
    answer:   req.body?.answer   || { en: '', si: '', ta: '' },
    featured: req.body?.featured ?? false,
    order:    req.body?.order    ?? 0,
    createdAt: now,
    updatedAt: now,
  }
  if (!record.question.en?.trim()) return res.status(400).json({ error: 'English question is required.' })
  if (!record.answer.en?.trim())   return res.status(400).json({ error: 'English answer is required.' })
  res.status(201).json(await db.insert('faqs', record))
})

/* ── PATCH /api/faqs/:id ──────────────────────────────────────────────────── */
router.patch('/:id', async (req, res) => {
  const updated = await db.update('faqs', req.params.id, req.body || {})
  if (!updated) return res.status(404).json({ error: 'FAQ not found' })
  res.json(updated)
})

/* ── DELETE /api/faqs/:id ─────────────────────────────────────────────────── */
router.delete('/:id', async (req, res) => {
  const ok = await db.remove('faqs', req.params.id)
  if (!ok) return res.status(404).json({ error: 'FAQ not found' })
  res.json({ ok: true })
})

module.exports = router

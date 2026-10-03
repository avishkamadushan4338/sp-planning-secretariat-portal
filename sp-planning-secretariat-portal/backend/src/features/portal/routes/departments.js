const router = require('express').Router()
const { appRouter, callPortal } = require('../../../services')

const { departments } = appRouter.portal

/* ── GET /api/departments ─────────────────────────────────────────────────── */
router.get('/', async (_req, res) => {
  const rows = await callPortal(departments.list, undefined)
  rows.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  res.json(rows)
})

/* ── GET /api/departments/:id ─────────────────────────────────────────────── */
router.get('/:id', async (req, res) => {
  const row = await callPortal(departments.getById, { id: req.params.id })
  if (!row) return res.status(404).json({ error: 'Department not found' })
  res.json(row)
})

/* ── POST /api/departments ────────────────────────────────────────────────── */
router.post('/', async (req, res) => {
  if (!req.body?.key?.trim()) return res.status(400).json({ error: 'Department key is required.' })
  if (!req.body?.label?.en?.trim()) return res.status(400).json({ error: 'English label is required.' })
  const saved = await callPortal(departments.save, { ...req.body, id: undefined })
  res.status(201).json(saved)
})

/* ── PATCH /api/departments/:id ───────────────────────────────────────────── */
router.patch('/:id', async (req, res) => {
  const existing = await callPortal(departments.getById, { id: req.params.id })
  if (!existing) return res.status(404).json({ error: 'Department not found' })
  const saved = await callPortal(departments.save, { ...existing, ...req.body, id: req.params.id })
  res.json(saved)
})

/* ── DELETE /api/departments/:id ──────────────────────────────────────────── */
router.delete('/:id', async (req, res) => {
  const existing = await callPortal(departments.getById, { id: req.params.id })
  if (!existing) return res.status(404).json({ error: 'Department not found' })
  await callPortal(departments.delete, { id: req.params.id })
  res.json({ ok: true })
})

module.exports = router

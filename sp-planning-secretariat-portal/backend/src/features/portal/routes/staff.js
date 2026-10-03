const router = require('express').Router()
const { appRouter, callPortal } = require('../../../services')

const { staff } = appRouter.portal

/* ── GET /api/staff ──────────────────────────────────────────────────────── */
router.get('/', async (_req, res) => {
  res.json(await callPortal(staff.list, undefined))
})

/* ── GET /api/staff/:id ──────────────────────────────────────────────────── */
router.get('/:id', async (req, res) => {
  const row = await callPortal(staff.getById, { id: req.params.id })
  if (!row) return res.status(404).json({ error: 'Staff member not found' })
  res.json(row)
})

/* ── POST /api/staff ─────────────────────────────────────────────────────── */
router.post('/', async (req, res) => {
  if (!req.body?.name?.en?.trim()) return res.status(400).json({ error: 'English name is required.' })
  const saved = await callPortal(staff.save, { ...req.body, id: undefined })
  res.status(201).json(saved)
})

/* ── PATCH /api/staff/:id ────────────────────────────────────────────────── */
router.patch('/:id', async (req, res) => {
  const existing = await callPortal(staff.getById, { id: req.params.id })
  if (!existing) return res.status(404).json({ error: 'Staff member not found' })
  const saved = await callPortal(staff.save, { ...existing, ...req.body, id: req.params.id })
  res.json(saved)
})

/* ── DELETE /api/staff/:id ───────────────────────────────────────────────── */
router.delete('/:id', async (req, res) => {
  const existing = await callPortal(staff.getById, { id: req.params.id })
  if (!existing) return res.status(404).json({ error: 'Staff member not found' })
  await callPortal(staff.delete, { id: req.params.id })
  res.json({ ok: true })
})

module.exports = router

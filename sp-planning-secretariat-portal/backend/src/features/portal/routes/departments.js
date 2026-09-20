const router = require('express').Router()
const { v4: uuid } = require('uuid')
const db = require('../../../db')

/* ── GET /api/departments ─────────────────────────────────────────────────── */
router.get('/', async (_req, res) => {
  const rows = await db.findAll('departments')
  rows.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  res.json(rows)
})

/* ── GET /api/departments/:id ─────────────────────────────────────────────── */
router.get('/:id', async (req, res) => {
  const row = await db.findById('departments', req.params.id)
  if (!row) return res.status(404).json({ error: 'Department not found' })
  res.json(row)
})

/* ── POST /api/departments ────────────────────────────────────────────────── */
router.post('/', async (req, res) => {
  const now = new Date().toISOString()
  const record = {
    id:            uuid(),
    key:           req.body?.key           || '',
    icon:          req.body?.icon          || 'Building2',
    accentColor:   req.body?.accentColor   || '#C79A2B',
    staffCount:    req.body?.staffCount    || '',
    label:         req.body?.label         || { en: '', si: '', ta: '' },
    shortLabel:    req.body?.shortLabel    || { en: '', si: '', ta: '' },
    desc:          req.body?.desc          || { en: '', si: '', ta: '' },
    badge:         req.body?.badge         || { en: '', si: '', ta: '' },
    subtitle:      req.body?.subtitle      || { en: '', si: '', ta: '' },
    overview:      req.body?.overview      || { en: '', si: '', ta: '' },
    functions:        req.body?.functions        || { en: [], si: [], ta: [] },
    responsibilities: req.body?.responsibilities || { en: [], si: [], ta: [] },
    services:         req.body?.services         || { en: [], si: [], ta: [] },
    order:         req.body?.order         ?? 0,
    createdAt: now,
    updatedAt: now,
  }
  if (!record.key.trim())        return res.status(400).json({ error: 'Department key is required.' })
  if (!record.label.en?.trim())  return res.status(400).json({ error: 'English label is required.' })
  res.status(201).json(await db.insert('departments', record))
})

/* ── PATCH /api/departments/:id ───────────────────────────────────────────── */
router.patch('/:id', async (req, res) => {
  const updated = await db.update('departments', req.params.id, req.body || {})
  if (!updated) return res.status(404).json({ error: 'Department not found' })
  res.json(updated)
})

/* ── DELETE /api/departments/:id ──────────────────────────────────────────── */
router.delete('/:id', async (req, res) => {
  const ok = await db.remove('departments', req.params.id)
  if (!ok) return res.status(404).json({ error: 'Department not found' })
  res.json({ ok: true })
})

module.exports = router

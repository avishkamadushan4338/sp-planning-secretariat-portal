const router = require('express').Router()
const { v4: uuid } = require('uuid')
const db = require('../../../db')

/* ── GET /api/staff ──────────────────────────────────────────────────────── */
router.get('/', async (_req, res) => {
  const rows = await db.findAll('staff')
  rows.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  res.json(rows)
})

/* ── GET /api/staff/:id ──────────────────────────────────────────────────── */
router.get('/:id', async (req, res) => {
  const row = await db.findById('staff', req.params.id)
  if (!row) return res.status(404).json({ error: 'Staff member not found' })
  res.json(row)
})

/* ── POST /api/staff ─────────────────────────────────────────────────────── */
router.post('/', async (req, res) => {
  const now = new Date().toISOString()
  const record = {
    id:               uuid(),
    name:             req.body?.name             || { en: '', si: '', ta: '' },
    position:         req.body?.position         || { en: '', si: '', ta: '' },
    photo:            req.body?.photo            || '',
    phone:            req.body?.phone            || '',
    email:            req.body?.email            || '',
    office:           req.body?.office           || '',
    bio:              req.body?.bio              || { en: '', si: '', ta: '' },
    experience:       req.body?.experience       || { en: '', si: '', ta: '' },
    responsibilities: req.body?.responsibilities || { en: [], si: [], ta: [] },
    departmentId:     req.body?.departmentId     || null,
    tier:             req.body?.tier             || 'department-head',
    positionRank:     req.body?.positionRank     || null,
    positionNumber:   req.body?.positionNumber   || null,
    featured:         req.body?.featured         ?? false,
    showInDirectory:  req.body?.showInDirectory  ?? true,
    order:            req.body?.order            ?? 0,
    slug:             req.body?.slug             || '',
    createdAt: now,
    updatedAt: now,
  }
  if (!record.name.en?.trim()) return res.status(400).json({ error: 'English name is required.' })
  res.status(201).json(await db.insert('staff', record))
})

/* ── PATCH /api/staff/:id ────────────────────────────────────────────────── */
router.patch('/:id', async (req, res) => {
  const updated = await db.update('staff', req.params.id, req.body || {})
  if (!updated) return res.status(404).json({ error: 'Staff member not found' })
  res.json(updated)
})

/* ── DELETE /api/staff/:id ───────────────────────────────────────────────── */
router.delete('/:id', async (req, res) => {
  const ok = await db.remove('staff', req.params.id)
  if (!ok) return res.status(404).json({ error: 'Staff member not found' })
  res.json({ ok: true })
})

module.exports = router

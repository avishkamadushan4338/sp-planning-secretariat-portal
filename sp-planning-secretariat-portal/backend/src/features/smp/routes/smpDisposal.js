const router = require('express').Router()
const { v4: uuid } = require('uuid')
const db     = require('../../../db')
const { requireAuth, requireRole } = require('../../../middleware/auth')

const canWrite = [requireAuth, requireRole('admin', 'storekeeper')]
const adminOnly = [requireAuth, requireRole('admin')]

/* ── POST /api/smp/disposal ──────────────────────────────────────────────── */
router.post('/', ...canWrite, async (req, res) => {
  const {
    itemId, uniqueItemIds, qty,
    disposalReason, disposalMethod,
    institute, authorizedBy, disposalNotes,
    estimatedDisposalValue,
  } = req.body || {}

  if (!itemId || !qty || !disposalReason || !disposalMethod)
    return res.status(400).json({ error: 'itemId, qty, disposalReason, disposalMethod required' })

  const item = await db.findById('items', itemId)
  if (!item) return res.status(404).json({ error: 'Item not found' })
  if (item.qty < Number(qty)) return res.status(400).json({ error: 'Insufficient stock to dispose' })

  const now = new Date().toISOString()

  // If specific unique IDs provided, validate and mark them
  const resolvedUniqueIds = []
  if (uniqueItemIds && uniqueItemIds.length > 0) {
    for (const uid of uniqueItemIds) {
      const ui = await db.findById('unique_items', uid)
      if (!ui) return res.status(404).json({ error: `Unique item ${uid} not found` })
      if (ui.parentItemId !== itemId) return res.status(400).json({ error: `Unique item ${uid} does not belong to this item` })
      await db.update('unique_items', uid, { status: 'disposed', updatedAt: now })
      resolvedUniqueIds.push(ui.uniqueNo)
    }
  }

  // Reduce item qty
  const newQty = item.qty - Number(qty)
  await db.update('items', itemId, { qty: newQty })

  const record = await db.insert('disposals', {
    id: uuid(),
    itemId,
    itemName: item.name,
    sku: item.sku,
    category: item.category,
    uniqueItemIds: resolvedUniqueIds,
    qty: Number(qty),
    disposalReason,
    disposalMethod,
    institute: institute || '',
    authorizedBy: authorizedBy || '',
    disposalNotes: disposalNotes || '',
    estimatedDisposalValue: Number(estimatedDisposalValue) || 0,
    status: 'pending_approval',
    disposedBy: req.user.username,
    disposalDate: now,
    approvedAt: null,
    approvedBy: null,
    createdAt: now,
    updatedAt: now,
  })

  await db.insert('transactions', {
    id: uuid(), userId: req.user.id, username: req.user.username,
    action: 'disposed', itemId, itemName: item.name,
    qtyBefore: item.qty, qtyAfter: newQty,
    note: `Disposed: ${qty} × ${item.name} | Reason: ${disposalReason} | Method: ${disposalMethod}`,
    meta: { disposalId: record.id }, createdAt: now,
  })

  res.status(201).json(record)
})

/* ── GET /api/smp/disposal ───────────────────────────────────────────────── */
router.get('/', requireAuth, async (req, res) => {
  let rows = await db.findAll('disposals')
  const { status, itemId, from, to } = req.query
  if (status) rows = rows.filter(r => r.status === status)
  if (itemId) rows = rows.filter(r => r.itemId === itemId)
  if (from)   rows = rows.filter(r => r.createdAt >= from)
  if (to)     rows = rows.filter(r => r.createdAt <= to + 'T23:59:59')
  res.json(rows.sort((a, b) => b.createdAt.localeCompare(a.createdAt)))
})

/* ── GET /api/smp/disposal/:id ───────────────────────────────────────────── */
router.get('/:id', requireAuth, async (req, res) => {
  const r = await db.findById('disposals', req.params.id)
  if (!r) return res.status(404).json({ error: 'Disposal record not found' })
  res.json(r)
})

/* ── PATCH /api/smp/disposal/:id/approve ────────────────────────────────── */
router.patch('/:id/approve', ...adminOnly, async (req, res) => {
  const record = await db.findById('disposals', req.params.id)
  if (!record) return res.status(404).json({ error: 'Disposal record not found' })
  if (record.status !== 'pending_approval') return res.status(400).json({ error: 'Record is not pending approval' })

  const now = new Date().toISOString()
  const updated = await db.update('disposals', record.id, {
    status: 'approved',
    approvedAt: now,
    approvedBy: req.user.username,
  })
  res.json(updated)
})

/* ── PATCH /api/smp/disposal/:id/status ─────────────────────────────────── */
router.patch('/:id/status', ...adminOnly, async (req, res) => {
  const { status, notes } = req.body || {}
  const valid = ['pending_approval','approved','disposed','recycled','auctioned','written_off']
  if (!valid.includes(status)) return res.status(400).json({ error: 'Invalid status' })

  const record = await db.findById('disposals', req.params.id)
  if (!record) return res.status(404).json({ error: 'Disposal record not found' })

  const updated = await db.update('disposals', record.id, {
    status,
    ...(notes ? { disposalNotes: notes } : {}),
    ...(status === 'approved' ? { approvedBy: req.user.username, approvedAt: new Date().toISOString() } : {}),
  })
  res.json(updated)
})

module.exports = router

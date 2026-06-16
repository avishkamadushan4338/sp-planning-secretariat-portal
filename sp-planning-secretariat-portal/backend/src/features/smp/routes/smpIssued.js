const router = require('express').Router()
const { v4: uuid } = require('uuid')
const db     = require('../../../db')
const { requireAuth, requireRole } = require('../../../middleware/auth')

/* ── POST /api/smp/issued ────────────────────────────────────────────── */
router.post('/', requireAuth, requireRole('admin','storekeeper'), (req, res) => {
  const { itemId, qty, receiverName, receiverNIC, receiverDept, receiverPhone,
    purpose, approvedBy, carrierName, expectedReturnDate, note } = req.body || {}

  if (!itemId || !qty || !receiverName || !purpose)
    return res.status(400).json({ error: 'itemId, qty, receiverName, purpose required' })

  const item = db.findById('items', itemId)
  if (!item) return res.status(404).json({ error: 'Item not found' })
  if (item.qty < Number(qty)) return res.status(400).json({ error: 'Insufficient stock' })

  const newQty   = item.qty - Number(qty)
  const now      = new Date().toISOString()
  const issuedId = uuid()

  db.update('items', itemId, { qty: newQty })

  const record = db.insert('issued', {
    id: issuedId, itemId, itemName: item.name, sku: item.sku, unit: item.unit,
    qty: Number(qty), issuedBy: req.user.username,
    receiverName, receiverNIC: receiverNIC || '', receiverDept: receiverDept || '',
    receiverPhone: receiverPhone || '', purpose, approvedBy: approvedBy || '',
    carrierName: carrierName || '', expectedReturnDate: expectedReturnDate || null,
    note: note || '', issuedAt: now, createdAt: now,
  })

  db.insert('transactions', {
    id: uuid(), userId: req.user.id, username: req.user.username,
    action: 'issued', itemId, itemName: item.name,
    qtyBefore: item.qty, qtyAfter: newQty,
    note: `Issued to ${receiverName} (${receiverDept || 'N/A'}) for: ${purpose}`,
    meta: { issuedId }, createdAt: now,
  })

  res.status(201).json(record)
})

/* ── GET /api/smp/issued ─────────────────────────────────────────────── */
router.get('/', requireAuth, (req, res) => {
  let records = db.findAll('issued')
  if (req.query.itemId)   records = records.filter(r => r.itemId === req.query.itemId)
  if (req.query.receiver) records = records.filter(r => r.receiverName.toLowerCase().includes(req.query.receiver.toLowerCase()))
  res.json(records.sort((a,b) => b.createdAt.localeCompare(a.createdAt)))
})

/* ── GET /api/smp/issued/:id ─────────────────────────────────────────── */
router.get('/:id', requireAuth, (req, res) => {
  const r = db.findById('issued', req.params.id)
  if (!r) return res.status(404).json({ error: 'Record not found' })
  res.json(r)
})

module.exports = router

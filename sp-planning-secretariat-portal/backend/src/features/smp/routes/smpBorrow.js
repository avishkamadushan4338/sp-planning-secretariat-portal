const router = require('express').Router()
const { v4: uuid } = require('uuid')
const db     = require('../../../db')
const { requireAuth, requireRole } = require('../../../middleware/auth')

const canWrite  = [requireAuth, requireRole('admin', 'storekeeper')]
const adminOnly = [requireAuth, requireRole('admin')]

/* ══════════════════════════════════════════════════════════════
   BORROW MANAGEMENT
══════════════════════════════════════════════════════════════ */

/* ── POST /api/smp/borrow ────────────────────────────────────────────────── */
router.post('/', ...canWrite, async (req, res) => {
  const {
    itemId, qty, borrowerName, borrowerNIC, borrowerDept, borrowerPhone,
    purpose, expectedReturnDate, approvedBy, note,
  } = req.body || {}

  if (!itemId || !qty || !borrowerName || !expectedReturnDate)
    return res.status(400).json({ error: 'itemId, qty, borrowerName, expectedReturnDate required' })

  const item = await db.findById('items', itemId)
  if (!item) return res.status(404).json({ error: 'Item not found' })
  if (!item.borrowable) return res.status(400).json({ error: 'Item is not borrowable' })

  const avail = item.qty - (item.borrowedQty || 0) - (item.reservedQty || 0)
  if (avail < Number(qty)) return res.status(400).json({ error: `Only ${avail} available to borrow` })

  const newBorrowed = (item.borrowedQty || 0) + Number(qty)
  await db.update('items', itemId, { borrowedQty: newBorrowed })

  const now    = new Date().toISOString()
  const record = await db.insert('borrowed', {
    id: uuid(), itemId, itemName: item.name, sku: item.sku, unit: item.unit,
    qty: Number(qty), borrowerName,
    borrowerNIC: borrowerNIC || '', borrowerDept: borrowerDept || '',
    borrowerPhone: borrowerPhone || '', purpose: purpose || '',
    expectedReturnDate, approvedBy: approvedBy || '',
    note: note || '', issuedBy: req.user.username,
    status: 'borrowed', borrowedAt: now, returnedAt: null,
    returnCondition: null, returnNote: null, createdAt: now,
  })

  await db.insert('transactions', {
    id: uuid(), userId: req.user.id, username: req.user.username,
    action: 'borrowed', itemId, itemName: item.name,
    qtyBefore: item.borrowedQty || 0, qtyAfter: newBorrowed,
    note: `Borrowed by ${borrowerName} until ${expectedReturnDate}`,
    meta: { borrowId: record.id }, createdAt: now,
  })

  res.status(201).json(record)
})

/* ── GET /api/smp/borrow ─────────────────────────────────────────────────── */
router.get('/', requireAuth, async (req, res) => {
  let records = await db.findAll('borrowed')
  if (req.query.status) records = records.filter(r => r.status === req.query.status)
  if (req.query.itemId) records = records.filter(r => r.itemId === req.query.itemId)

  const now = new Date()
  records = records.map(r => ({
    ...r,
    overdue: r.status === 'borrowed' && new Date(r.expectedReturnDate) < now,
  }))
  res.json(records.sort((a, b) => b.createdAt.localeCompare(a.createdAt)))
})

/* ── PATCH /api/smp/borrow/:id/return ───────────────────────────────────── */
router.patch('/:id/return', ...canWrite, async (req, res) => {
  const { returnCondition, returnNote } = req.body || {}

  const record = await db.findById('borrowed', req.params.id)
  if (!record) return res.status(404).json({ error: 'Borrow record not found' })
  if (record.status === 'returned') return res.status(400).json({ error: 'Already returned' })

  const item = await db.findById('items', record.itemId)
  const newBorrowed = Math.max(0, (item?.borrowedQty || 0) - record.qty)
  if (item) await db.update('items', item.id, { borrowedQty: newBorrowed, qty: item.qty + record.qty })

  const now     = new Date().toISOString()
  const updated = await db.update('borrowed', record.id, {
    status: 'returned', returnedAt: now,
    returnCondition: returnCondition || 'Good',
    returnNote: returnNote || '',
  })

  await db.insert('transactions', {
    id: uuid(), userId: req.user.id, username: req.user.username,
    action: 'returned', itemId: record.itemId, itemName: record.itemName,
    qtyBefore: newBorrowed + record.qty, qtyAfter: newBorrowed,
    note: `Returned by ${record.borrowerName}. Condition: ${returnCondition || 'Good'}`,
    meta: { borrowId: record.id }, createdAt: now,
  })

  res.json(updated)
})

/* ══════════════════════════════════════════════════════════════
   INSTITUTIONAL RESERVATION SYSTEM
══════════════════════════════════════════════════════════════ */

/* ── POST /api/smp/borrow/reservations ──────────────────────────────────── */
router.post('/reservations', ...canWrite, async (req, res) => {
  const {
    itemId, uniqueItemIds, qty,
    instituteName, reservedFromDivision,
    reservationStartDate, reservationEndDate,
    approvedBy, notes,
  } = req.body || {}

  if (!itemId || !qty || !instituteName || !reservationStartDate || !reservationEndDate)
    return res.status(400).json({
      error: 'itemId, qty, instituteName, reservationStartDate, reservationEndDate required',
    })

  const item = await db.findById('items', itemId)
  if (!item) return res.status(404).json({ error: 'Item not found' })

  // Check for overlapping active reservations
  const overlapping = await db.findWhere('reservations', r =>
    r.itemId === itemId &&
    ['pending','approved','active'].includes(r.reservationStatus) &&
    new Date(r.reservationStartDate) <= new Date(reservationEndDate) &&
    new Date(r.reservationEndDate)   >= new Date(reservationStartDate)
  )
  const reservedTotal = overlapping.reduce((s, r) => s + r.qty, 0)
  const avail = item.qty - (item.borrowedQty || 0) - reservedTotal
  if (avail < Number(qty))
    return res.status(400).json({ error: `Only ${avail} available during that period` })

  // Validate & lock specific unique IDs if provided
  const lockedUniqueNos = []
  if (uniqueItemIds && uniqueItemIds.length > 0) {
    if (uniqueItemIds.length !== Number(qty))
      return res.status(400).json({ error: 'uniqueItemIds count must match qty' })
    for (const uid of uniqueItemIds) {
      const ui = await db.findById('unique_items', uid)
      if (!ui) return res.status(404).json({ error: `Unique item ${uid} not found` })
      if (ui.parentItemId !== itemId) return res.status(400).json({ error: `Item ${uid} does not belong to this item` })
      if (ui.status !== 'available') return res.status(400).json({ error: `Item ${ui.uniqueNo} is not available` })
      await db.update('unique_items', uid, { status: 'reserved' })
      lockedUniqueNos.push(ui.uniqueNo)
    }
  }

  const newReserved = (item.reservedQty || 0) + Number(qty)
  await db.update('items', itemId, { reservedQty: newReserved })

  const now    = new Date().toISOString()
  const reservationId = `RES-${Date.now().toString(36).toUpperCase()}`
  const record = await db.insert('reservations', {
    id: uuid(),
    reservationId,
    itemId,
    itemName: item.name,
    sku: item.sku,
    uniqueItemNos: lockedUniqueNos,
    qty: Number(qty),
    instituteName,
    reservedFromDivision: reservedFromDivision || '',
    reservationStartDate,
    reservationEndDate,
    reservationDate: now,
    approvedBy: approvedBy || '',
    notes: notes || '',
    reservationStatus: 'pending',
    reservedBy: req.user.username,
    completedAt: null,
    cancelledAt: null,
    createdAt: now,
    updatedAt: now,
  })

  await db.insert('transactions', {
    id: uuid(), userId: req.user.id, username: req.user.username,
    action: 'reserved', itemId, itemName: item.name,
    qtyBefore: item.reservedQty || 0, qtyAfter: newReserved,
    note: `Reserved for ${instituteName} (${reservationId}) from ${reservationStartDate} to ${reservationEndDate}`,
    meta: { reservationId: record.id }, createdAt: now,
  })

  res.status(201).json(record)
})

/* ── GET /api/smp/borrow/reservations ───────────────────────────────────── */
router.get('/reservations', requireAuth, async (req, res) => {
  let records = await db.findAll('reservations')
  if (req.query.itemId)       records = records.filter(r => r.itemId === req.query.itemId)
  if (req.query.status)       records = records.filter(r => r.reservationStatus === req.query.status)
  if (req.query.instituteName) records = records.filter(r =>
    r.instituteName?.toLowerCase().includes(req.query.instituteName.toLowerCase()))
  res.json(records.sort((a, b) => b.createdAt.localeCompare(a.createdAt)))
})

/* ── GET /api/smp/borrow/reservations/:id ───────────────────────────────── */
router.get('/reservations/:id', requireAuth, async (req, res) => {
  const r = await db.findById('reservations', req.params.id)
  if (!r) return res.status(404).json({ error: 'Reservation not found' })
  res.json(r)
})

/* ── PATCH /api/smp/borrow/reservations/:id/approve ────────────────────── */
router.patch('/reservations/:id/approve', ...adminOnly, async (req, res) => {
  const record = await db.findById('reservations', req.params.id)
  if (!record) return res.status(404).json({ error: 'Reservation not found' })
  if (record.reservationStatus !== 'pending') return res.status(400).json({ error: 'Reservation not pending' })

  const updated = await db.update('reservations', record.id, {
    reservationStatus: 'approved',
    approvedBy: req.user.username,
  })
  res.json(updated)
})

/* ── PATCH /api/smp/borrow/reservations/:id/activate ───────────────────── */
router.patch('/reservations/:id/activate', ...canWrite, async (req, res) => {
  const record = await db.findById('reservations', req.params.id)
  if (!record) return res.status(404).json({ error: 'Reservation not found' })
  if (!['pending','approved'].includes(record.reservationStatus))
    return res.status(400).json({ error: 'Reservation must be pending or approved to activate' })

  const updated = await db.update('reservations', record.id, { reservationStatus: 'active' })
  res.json(updated)
})

/* ── PATCH /api/smp/borrow/reservations/:id/complete ───────────────────── */
router.patch('/reservations/:id/complete', ...canWrite, async (req, res) => {
  const record = await db.findById('reservations', req.params.id)
  if (!record) return res.status(404).json({ error: 'Reservation not found' })
  if (!['active','approved'].includes(record.reservationStatus))
    return res.status(400).json({ error: 'Reservation must be active or approved to complete' })

  const item = await db.findById('items', record.itemId)
  const newReserved = Math.max(0, (item?.reservedQty || 0) - record.qty)
  if (item) await db.update('items', item.id, { reservedQty: newReserved })

  // Release unique item IDs
  for (const uniqueNo of (record.uniqueItemNos || [])) {
    const ui = await db.findOneWhere('unique_items', u => u.uniqueNo === uniqueNo)
    if (ui) await db.update('unique_items', ui.id, { status: 'available' })
  }

  const now     = new Date().toISOString()
  const updated = await db.update('reservations', record.id, {
    reservationStatus: 'completed', completedAt: now,
  })
  res.json(updated)
})

/* ── PATCH /api/smp/borrow/reservations/:id/cancel ─────────────────────── */
router.patch('/reservations/:id/cancel', ...canWrite, async (req, res) => {
  const record = await db.findById('reservations', req.params.id)
  if (!record) return res.status(404).json({ error: 'Reservation not found' })
  if (['completed','cancelled'].includes(record.reservationStatus))
    return res.status(400).json({ error: 'Reservation already completed or cancelled' })

  const item = await db.findById('items', record.itemId)
  const newReserved = Math.max(0, (item?.reservedQty || 0) - record.qty)
  if (item) await db.update('items', item.id, { reservedQty: newReserved })

  // Release unique item IDs
  for (const uniqueNo of (record.uniqueItemNos || [])) {
    const ui = await db.findOneWhere('unique_items', u => u.uniqueNo === uniqueNo)
    if (ui) await db.update('unique_items', ui.id, { status: 'available' })
  }

  const now     = new Date().toISOString()
  const updated = await db.update('reservations', record.id, {
    reservationStatus: 'cancelled', cancelledAt: now,
  })
  res.json(updated)
})

module.exports = router

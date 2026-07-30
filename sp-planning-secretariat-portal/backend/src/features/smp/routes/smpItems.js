const router = require('express').Router()
const { v4: uuid } = require('uuid')
const db     = require('../../../db')
const { requireAuth, requireRole } = require('../../../middleware/auth')

const canWrite = [requireAuth, requireRole('admin', 'storekeeper')]
const canRead  = [requireAuth]

// Compute available qty for an item
function available(item) {
  return Math.max(0, item.qty - (item.reservedQty || 0))
}

// Compute display status from item state
function computeStatus(item) {
  if (item.qty === 0)               return 'out_of_stock'
  if ((item.reservedQty || 0) > 0)  return 'reserved'
  if (item.condition === 'Damaged') return 'damaged'
  return 'available'
}

// Build unique item records from caller-supplied ID strings
function buildUniqueIds(item, uniqueNos, condition) {
  return uniqueNos.map(no => ({
    id: uuid(),
    parentItemId: item.id,
    itemName: item.name,
    sku: item.sku,
    category: item.category,
    uniqueNo: no.trim(),
    status: 'available',
    condition: condition || item.condition || 'Good',
    purchaseValue: item.purchaseValue || 0,
    currentValue: item.currentValue || 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }))
}

async function enrichItem(item) {
  const uniqueIds = await db.findWhere('unique_items', ui => ui.parentItemId === item.id)
  return {
    ...item,
    status: computeStatus(item),
    availableQty: available(item),
    uniqueIdCount: uniqueIds.length,
  }
}

/* ── GET /api/smp/items ──────────────────────────────────────────────────── */
router.get('/', ...canRead, async (req, res) => {
  const items = await Promise.all((await db.findAll('items')).map(enrichItem))
  res.json(items)
})

/* ── GET /api/smp/items/meta/categories ─────────────────────────────────── */
router.get('/meta/categories', ...canRead, async (req, res) => res.json(await db.findAll('categories')))
router.post('/meta/categories', requireAuth, requireRole('admin'), async (req, res) => {
  const { name, color } = req.body || {}
  if (!name) return res.status(400).json({ error: 'name required' })
  if (await db.findOneWhere('categories', c => c.name.toLowerCase() === name.toLowerCase()))
    return res.status(409).json({ error: 'Category already exists' })
  const cat = await db.insert('categories', { id: uuid(), name, color: color || '#6366F1', createdAt: new Date().toISOString() })
  res.status(201).json(cat)
})

/* ── GET /api/smp/items/:id ──────────────────────────────────────────────── */
router.get('/:id', ...canRead, async (req, res) => {
  const item = await db.findById('items', req.params.id)
  if (!item) return res.status(404).json({ error: 'Item not found' })
  res.json(await enrichItem(item))
})

/* ── POST /api/smp/items ─────────────────────────────────────────────────── */
router.post('/', ...canWrite, async (req, res) => {
  const {
    name, category, description, qty, condition,
    purchaseValue, currentValue,
    uniqueIds: providedUniqueIds,
  } = req.body || {}

  if (!name) return res.status(400).json({ error: 'name required' })
  if (Number(qty) <= 0)    return res.status(400).json({ error: 'qty must be > 0' })

  const uidList = Array.isArray(providedUniqueIds) ? providedUniqueIds.map(s => String(s).trim()).filter(Boolean) : []
  if (uidList.length !== Number(qty))
    return res.status(400).json({ error: `Provide exactly ${Number(qty)} unique item ID(s), one per unit` })

  // Check for duplicates within the submission
  const uidSet = new Set(uidList)
  if (uidSet.size !== uidList.length)
    return res.status(400).json({ error: 'Duplicate unique IDs in submission' })

  // Check for conflicts with existing unique IDs
  let conflict = null
  for (const no of uidList) {
    if (await db.findOneWhere('unique_items', ui => ui.uniqueNo === no)) { conflict = no; break }
  }
  if (conflict)
    return res.status(409).json({ error: `Unique ID "${conflict}" is already in use` })

  const genSKU = async () => {
    let sku; let attempts = 0
    do { sku = 'SPPS-' + String(Math.floor(10000 + Math.random() * 90000)); attempts++ }
    while (await db.findOneWhere('items', i => i.sku === sku) && attempts < 100)
    return sku
  }

  const now  = new Date().toISOString()
  const item = await db.insert('items', {
    id: uuid(),
    name: name.trim(),
    sku: await genSKU(),
    category: category || 'General',
    description: description || '',
    qty: Number(qty),
    condition: condition || 'Good',
    reservedQty: 0,
    purchaseValue: Number(purchaseValue) || 0,
    currentValue: Number(currentValue) || 0,
    valueHistory: [],
    createdBy: req.user.username,
    createdAt: now,
    updatedAt: now,
  })

  for (const uid of buildUniqueIds(item, uidList)) await db.insert('unique_items', uid)

  await _logTx(req.user, 'created', item.id, item.name, 0, Number(qty), 'Item created')
  res.status(201).json(await enrichItem(item))
})

/* ── PATCH /api/smp/items/:id ────────────────────────────────────────────── */
router.patch('/:id', ...canWrite, async (req, res) => {
  const item = await db.findById('items', req.params.id)
  if (!item) return res.status(404).json({ error: 'Item not found' })

  const allowed = [
    'name', 'category', 'description',
    'condition', 'purchaseValue', 'currentValue',
  ]
  const patch = {}
  for (const k of allowed) if (req.body[k] !== undefined) patch[k] = req.body[k]

  // Track value changes
  if (patch.purchaseValue !== undefined || patch.currentValue !== undefined) {
    const history = [...(item.valueHistory || []), {
      date: new Date().toISOString(),
      updatedBy: req.user.username,
      prevPurchaseValue: item.purchaseValue,
      prevCurrentValue: item.currentValue,
      newPurchaseValue: patch.purchaseValue ?? item.purchaseValue,
      newCurrentValue: patch.currentValue ?? item.currentValue,
    }]
    patch.valueHistory = history
  }

  const updated = await db.update('items', item.id, patch)
  await _logTx(req.user, 'edited', item.id, item.name, item.qty, item.qty, 'Item details updated')
  res.json(await enrichItem(updated))
})

/* ── DELETE /api/smp/items/:id ───────────────────────────────────────────── */
router.delete('/:id', requireAuth, requireRole('admin'), async (req, res) => {
  const item = await db.findById('items', req.params.id)
  if (!item) return res.status(404).json({ error: 'Item not found' })
  await db.remove('items', item.id)
  // Remove associated unique item IDs
  await db.removeWhere('unique_items', ui => ui.parentItemId === item.id)
  await _logTx(req.user, 'deleted', item.id, item.name, item.qty, 0, 'Item deleted')
  res.json({ ok: true })
})

/* ── POST /api/smp/items/:id/stock-in ───────────────────────────────────── */
router.post('/:id/stock-in', ...canWrite, async (req, res) => {
  const { qty, supplier, purchaseDate, invoiceNo, note, condition, uniqueIds: providedUniqueIds } = req.body || {}
  if (!qty || Number(qty) <= 0) return res.status(400).json({ error: 'qty must be positive' })

  const item = await db.findById('items', req.params.id)
  if (!item) return res.status(404).json({ error: 'Item not found' })

  const addQty  = Number(qty)
  const uidList = Array.isArray(providedUniqueIds) ? providedUniqueIds.map(s => String(s).trim()).filter(Boolean) : []
  if (uidList.length !== addQty)
    return res.status(400).json({ error: `Provide exactly ${addQty} unique item ID(s), one per unit` })

  const uidSet = new Set(uidList)
  if (uidSet.size !== uidList.length)
    return res.status(400).json({ error: 'Duplicate unique IDs in submission' })

  let conflict = null
  for (const no of uidList) {
    if (await db.findOneWhere('unique_items', ui => ui.uniqueNo === no)) { conflict = no; break }
  }
  if (conflict)
    return res.status(409).json({ error: `Unique ID "${conflict}" is already in use` })

  const newQty  = item.qty + addQty
  const updated = await db.update('items', item.id, { qty: newQty })

  for (const uid of buildUniqueIds({ ...item, condition: condition || item.condition }, uidList)) await db.insert('unique_items', uid)

  await _logTx(req.user, 'stock_in', item.id, item.name, item.qty, newQty,
    `Stock added: +${qty}${supplier ? ` | Supplier: ${supplier}` : ''}${invoiceNo ? ` | Invoice: ${invoiceNo}` : ''}${note ? ` | ${note}` : ''}`,
    { supplier, purchaseDate, invoiceNo, note })

  res.json(await enrichItem(updated))
})

/* ── POST /api/smp/items/:id/stock-out ──────────────────────────────────── */
router.post('/:id/stock-out', ...canWrite, async (req, res) => {
  const { qty, reason, approvedBy, note } = req.body || {}
  if (!qty || Number(qty) <= 0) return res.status(400).json({ error: 'qty must be positive' })

  const item = await db.findById('items', req.params.id)
  if (!item) return res.status(404).json({ error: 'Item not found' })
  if (item.qty < Number(qty)) return res.status(400).json({ error: 'Insufficient stock' })

  const newQty  = item.qty - Number(qty)
  const updated = await db.update('items', item.id, { qty: newQty })

  await _logTx(req.user, 'stock_out', item.id, item.name, item.qty, newQty,
    `Stock removed: -${qty}${reason ? ` | Reason: ${reason}` : ''}${approvedBy ? ` | Approved by: ${approvedBy}` : ''}${note ? ` | ${note}` : ''}`,
    { reason, approvedBy, note })

  res.json(await enrichItem(updated))
})

/* ── GET /api/smp/items/:id/unique-ids ──────────────────────────────────── */
router.get('/:id/unique-ids', ...canRead, async (req, res) => {
  const item = await db.findById('items', req.params.id)
  if (!item) return res.status(404).json({ error: 'Item not found' })
  const uids = await db.findWhere('unique_items', ui => ui.parentItemId === item.id)
  res.json(uids.sort((a, b) => a.uniqueNo.localeCompare(b.uniqueNo)))
})

/* ── GET /api/smp/items/unique-ids/all ──────────────────────────────────── */
router.get('/unique-ids/all', ...canRead, async (req, res) => {
  res.json((await db.findAll('unique_items')).sort((a, b) => a.uniqueNo.localeCompare(b.uniqueNo)))
})

/* ── PATCH /api/smp/items/unique-ids/:uid ───────────────────────────────── */
router.patch('/unique-ids/:uid', ...canWrite, async (req, res) => {
  const ui = await db.findById('unique_items', req.params.uid)
  if (!ui) return res.status(404).json({ error: 'Unique item not found' })
  const { status, condition, location, note } = req.body || {}
  const patch = {}
  if (status    !== undefined) patch.status    = status
  if (condition !== undefined) patch.condition = condition
  if (location  !== undefined) patch.location  = location
  if (note      !== undefined) patch.note      = note
  const updated = await db.update('unique_items', ui.id, patch)
  res.json(updated)
})

/* ── helpers ─────────────────────────────────────────────────────────────── */
async function _logTx(user, action, itemId, itemName, qtyBefore, qtyAfter, note = '', meta = {}) {
  await db.insert('transactions', {
    id: uuid(), userId: user.id, username: user.username,
    action, itemId, itemName, qtyBefore, qtyAfter, note,
    meta, createdAt: new Date().toISOString(),
  })
}

module.exports = router

const router = require('express').Router()
const db     = require('../../../db')
const { requireAuth } = require('../../../middleware/auth')

/* ── GET /api/smp/reports/dashboard ─────────────────────────────────────── */
router.get('/dashboard', requireAuth, (req, res) => {
  const items        = db.findAll('items')
  const transactions = db.findAll('transactions')
  const users        = db.findAll('users')
  const disposals    = db.findAll('disposals')

  const totalItems    = items.length
  const totalQty      = items.reduce((s, i) => s + (i.qty || 0), 0)
  const outOfStock    = items.filter(i => i.qty === 0)
  const activeUsers   = users.filter(u => u.active).length
  const pendingDisp   = disposals.filter(d => d.status === 'pending_approval')

  // Total stock value
  const totalStockValue = items.reduce((s, i) => s + ((i.currentValue || 0) * (i.qty || 0)), 0)

  // Category breakdown
  const categoryMap = {}
  items.forEach(i => {
    if (!categoryMap[i.category]) categoryMap[i.category] = { count: 0, qty: 0 }
    categoryMap[i.category].count++
    categoryMap[i.category].qty += i.qty || 0
  })
  const categoryBreakdown = Object.entries(categoryMap).map(([name, v]) => ({ name, ...v }))

  // Recent transactions (last 15)
  const recentTransactions = transactions
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 15)

  // Monthly stock movement (last 6 months)
  const monthlyData = {}
  const sixMonthsAgo = new Date(); sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
  transactions
    .filter(t => new Date(t.createdAt) >= sixMonthsAgo)
    .forEach(t => {
      const month = t.createdAt.slice(0, 7)
      if (!monthlyData[month]) monthlyData[month] = { stock_in: 0, stock_out: 0, issued: 0, disposed: 0 }
      const delta = (t.qtyAfter || 0) - (t.qtyBefore || 0)
      if (t.action === 'stock_in')  monthlyData[month].stock_in  += Math.abs(delta)
      if (t.action === 'stock_out') monthlyData[month].stock_out += Math.abs(delta)
      if (t.action === 'issued')    monthlyData[month].issued    += Math.abs(delta)
      if (t.action === 'disposed')  monthlyData[month].disposed  += Math.abs(delta)
    })
  const monthlyMovement = Object.entries(monthlyData)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, data]) => ({ month, ...data }))

  // Action counts
  const actionCounts = transactions.reduce((acc, t) => {
    acc[t.action] = (acc[t.action] || 0) + 1
    return acc
  }, {})

  // Top 5 most disposed items
  const disposedCounts = {}
  disposals.forEach(r => {
    disposedCounts[r.itemName] = (disposedCounts[r.itemName] || 0) + (r.qty || 1)
  })
  const topDisposedItems = Object.entries(disposedCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([name, count]) => ({ name, count }))

  res.json({
    totalItems,
    totalQty,
    outOfStockCount: outOfStock.length,
    activeUsers,
    pendingDisposals: pendingDisp.length,
    totalDisposals: disposals.length,
    totalStockValue,
    recentTransactions,
    categoryBreakdown,
    monthlyMovement,
    actionCounts,
    topDisposedItems,
  })
})

/* ── GET /api/smp/reports/transactions ──────────────────────────────────── */
router.get('/transactions', requireAuth, (req, res) => {
  let rows = db.findAll('transactions')
  const { action, itemId, userId, from, to } = req.query
  if (action) rows = rows.filter(r => r.action === action)
  if (itemId) rows = rows.filter(r => r.itemId === itemId)
  if (userId) rows = rows.filter(r => r.userId === userId)
  if (from)   rows = rows.filter(r => r.createdAt >= from)
  if (to)     rows = rows.filter(r => r.createdAt <= to + 'T23:59:59')
  res.json(rows.sort((a, b) => b.createdAt.localeCompare(a.createdAt)))
})

/* ── GET /api/smp/reports/audit-logs ────────────────────────────────────── */
router.get('/audit-logs', requireAuth, (req, res) => {
  let rows = db.findAll('audit_logs')
  const { userId, action, from, to } = req.query
  if (userId) rows = rows.filter(r => r.userId === userId)
  if (action) rows = rows.filter(r => r.action === action)
  if (from)   rows = rows.filter(r => r.createdAt >= from)
  if (to)     rows = rows.filter(r => r.createdAt <= to + 'T23:59:59')
  res.json(rows.sort((a, b) => b.createdAt.localeCompare(a.createdAt)))
})

/* ── GET /api/smp/reports/login-logs ────────────────────────────────────── */
router.get('/login-logs', requireAuth, (req, res) => {
  let rows = db.findAll('login_logs')
  const { username, status, from, to } = req.query
  if (username) rows = rows.filter(r => r.username?.toLowerCase().includes(username.toLowerCase()))
  if (status)   rows = rows.filter(r => r.status === status)
  if (from)     rows = rows.filter(r => r.loginTime >= from)
  if (to)       rows = rows.filter(r => r.loginTime <= to + 'T23:59:59')
  res.json(rows.sort((a, b) => b.loginTime.localeCompare(a.loginTime)))
})

/* ── GET /api/smp/reports/disposals ─────────────────────────────────────── */
router.get('/disposals', requireAuth, (req, res) => {
  let rows = db.findAll('disposals')
  const { status, from, to } = req.query
  if (status) rows = rows.filter(r => r.status === status)
  if (from)   rows = rows.filter(r => r.createdAt >= from)
  if (to)     rows = rows.filter(r => r.createdAt <= to + 'T23:59:59')
  res.json(rows.sort((a, b) => b.createdAt.localeCompare(a.createdAt)))
})

/* ── GET /api/smp/reports/value-summary ─────────────────────────────────── */
router.get('/value-summary', requireAuth, (req, res) => {
  const items = db.findAll('items')
  const summary = items.map(i => ({
    id: i.id, name: i.name, sku: i.sku, category: i.category,
    qty: i.qty,
    purchaseValue: i.purchaseValue || 0,
    currentValue:  i.currentValue  || 0,
  }))
  res.json({
    items: summary,
    totalPurchaseValue: summary.reduce((s, i) => s + (i.purchaseValue || 0), 0),
    totalCurrentValue:  summary.reduce((s, i) => s + (i.currentValue  || 0), 0),
  })
})

module.exports = router

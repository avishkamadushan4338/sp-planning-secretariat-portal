const router = require('express').Router()
const bcrypt = require('bcryptjs')
const { v4: uuid } = require('uuid')
const db     = require('../../../db')
const { requireAuth, requireRole } = require('../../../middleware/auth')

const adminOnly = [requireAuth, requireRole('admin')]

/* ── GET /api/smp/users ───────────────────────────────────────────────── */
router.get('/', ...adminOnly, (req, res) => {
  const users = db.findAll('users').map(({ password: _, ...u }) => u)
  res.json(users)
})

/* ── POST /api/smp/users ──────────────────────────────────────────────── */
router.post('/', ...adminOnly, async (req, res) => {
  const { username, password, role, name, email } = req.body || {}
  if (!username || !password || !role || !name) return res.status(400).json({ error: 'username, password, role, name required' })
  if (!['admin','storekeeper','viewer'].includes(role)) return res.status(400).json({ error: 'Invalid role' })
  if (db.findOneWhere('users', u => u.username.toLowerCase() === username.toLowerCase()))
    return res.status(409).json({ error: 'Username already exists' })

  const hash = await bcrypt.hash(password, 10)
  const user = db.insert('users', { id: uuid(), username, password: hash, role, name, email: email || '', active: true, createdAt: new Date().toISOString() })
  const { password: _, ...safe } = user
  res.status(201).json(safe)
})

/* ── PATCH /api/smp/users/me/password ─────────────────────────────────── */
router.patch('/me/password', requireAuth, async (req, res) => {
  const { currentPassword, newPassword } = req.body || {}
  if (!currentPassword || !newPassword) return res.status(400).json({ error: 'currentPassword and newPassword required' })
  const user = db.findById('users', req.user.id)
  if (!user) return res.status(404).json({ error: 'User not found' })
  const match = await bcrypt.compare(currentPassword, user.password)
  if (!match) return res.status(401).json({ error: 'Current password incorrect' })
  db.update('users', user.id, { password: await bcrypt.hash(newPassword, 10) })
  res.json({ ok: true })
})

/* ── PATCH /api/smp/users/:id ─────────────────────────────────────────── */
router.patch('/:id', ...adminOnly, async (req, res) => {
  const { name, email, role, active, password } = req.body || {}
  const patch = {}
  if (name  !== undefined) patch.name   = name
  if (email !== undefined) patch.email  = email
  if (role  !== undefined) {
    if (!['admin','storekeeper','viewer'].includes(role)) return res.status(400).json({ error: 'Invalid role' })
    patch.role = role
  }
  if (active !== undefined) patch.active = !!active
  if (password) patch.password = await bcrypt.hash(password, 10)

  const updated = db.update('users', req.params.id, patch)
  if (!updated) return res.status(404).json({ error: 'User not found' })
  const { password: _, ...safe } = updated
  res.json(safe)
})

/* ── DELETE /api/smp/users/:id ────────────────────────────────────────── */
router.delete('/:id', ...adminOnly, (req, res) => {
  if (req.params.id === req.user.id) return res.status(400).json({ error: 'Cannot delete yourself' })
  const ok = db.remove('users', req.params.id)
  if (!ok) return res.status(404).json({ error: 'User not found' })
  res.json({ ok: true })
})

module.exports = router

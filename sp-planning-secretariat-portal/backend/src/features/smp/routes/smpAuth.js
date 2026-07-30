const router  = require('express').Router()
const bcrypt  = require('bcryptjs')
const { v4: uuid } = require('uuid')
const rateLimit = require('express-rate-limit')
const db      = require('../../../db')
const { signToken, requireAuth } = require('../../../middleware/auth')

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many login attempts. Please wait 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
})

/* ── POST /api/smp/auth/login ─────────────────────────────────────────── */
router.post('/login', loginLimiter, async (req, res) => {
  const { username, password } = req.body || {}
  if (!username || !password) return res.status(400).json({ error: 'Username and password required' })

  const ip         = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown'
  const deviceInfo = req.headers['user-agent'] || 'unknown'
  const now        = new Date().toISOString()

  const user = await db.findOneWhere('users', u => u.username.toLowerCase() === username.toLowerCase())

  if (!user || !user.active) {
    await db.insert('login_logs', {
      id: uuid(), userId: null, username, loginTime: now, logoutTime: null,
      ip, deviceInfo, status: 'failed', failReason: 'invalid_credentials', createdAt: now,
    })
    return res.status(401).json({ error: 'Invalid username or password' })
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    await db.insert('login_logs', {
      id: uuid(), userId: user.id, username, loginTime: now, logoutTime: null,
      ip, deviceInfo, status: 'failed', failReason: 'wrong_password', createdAt: now,
    })
    return res.status(401).json({ error: 'Invalid username or password' })
  }

  const logId = uuid()
  await db.insert('login_logs', {
    id: logId, userId: user.id, username, loginTime: now, logoutTime: null,
    ip, deviceInfo, status: 'success', failReason: null, createdAt: now,
  })

  const token = signToken({ id: user.id, username: user.username, role: user.role, name: user.name, logId })
  res.json({ token, user: { id: user.id, username: user.username, role: user.role, name: user.name, email: user.email } })
})

/* ── POST /api/smp/auth/logout ────────────────────────────────────────── */
router.post('/logout', requireAuth, async (req, res) => {
  const logId = req.user.logId
  if (logId) await db.update('login_logs', logId, { logoutTime: new Date().toISOString() })
  res.json({ ok: true })
})

/* ── GET /api/smp/auth/me ─────────────────────────────────────────────── */
router.get('/me', requireAuth, async (req, res) => {
  const user = await db.findById('users', req.user.id)
  if (!user) return res.status(404).json({ error: 'User not found' })
  const { password: _, ...safe } = user
  res.json(safe)
})

module.exports = router

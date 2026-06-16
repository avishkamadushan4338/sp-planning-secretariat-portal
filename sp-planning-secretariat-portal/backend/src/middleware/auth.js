const jwt = require('jsonwebtoken')
const db  = require('../db')

const SECRET = process.env.JWT_SECRET || 'smp_secret_key_change_in_production'

function signToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: '8h' })
}

function verifyToken(token) {
  return jwt.verify(token, SECRET)
}

function requireAuth(req, res, next) {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' })
  try {
    req.user = verifyToken(header.slice(7))
    next()
  } catch {
    return res.status(401).json({ error: 'Token expired or invalid' })
  }
}

function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) return res.status(403).json({ error: 'Forbidden' })
    next()
  }
}

module.exports = { signToken, verifyToken, requireAuth, requireRole }

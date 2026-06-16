const { v4: uuid } = require('uuid')
const db = require('../db')

function auditLog(action, resourceType, resourceId, details = {}) {
  return (req, res, next) => {
    const original = res.json.bind(res)
    res.json = (body) => {
      if (res.statusCode < 400 && req.user) {
        db.insert('audit_logs', {
          id:           uuid(),
          userId:       req.user.id,
          username:     req.user.username,
          action,
          resourceType,
          resourceId:   resourceId ? (typeof resourceId === 'function' ? resourceId(req, body) : req.params[resourceId]) : null,
          details:      typeof details === 'function' ? details(req, body) : details,
          ip:           req.ip || req.headers['x-forwarded-for'] || 'unknown',
          createdAt:    new Date().toISOString(),
        })
      }
      return original(body)
    }
    next()
  }
}

module.exports = { auditLog }

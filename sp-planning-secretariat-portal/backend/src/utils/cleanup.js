const cron = require('node-cron')
const db   = require('../db')

const DAYS_28 = 28 * 24 * 60 * 60 * 1000

async function runCleanup() {
  const cutoff = new Date(Date.now() - DAYS_28).toISOString()
  const removed = await db.removeWhere('login_logs', r => r.createdAt < cutoff)
  if (removed > 0) console.log(`[cleanup] Removed ${removed} login logs older than 28 days`)
}

function startCleanupCron() {
  // Run at midnight every day
  cron.schedule('0 0 * * *', runCleanup, { timezone: 'Asia/Colombo' })
  console.log('[cleanup] Login log cleanup cron scheduled (daily midnight)')
}

module.exports = { startCleanupCron, runCleanup }

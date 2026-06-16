const fs   = require('fs')
const path = require('path')

const DATA_DIR = path.join(__dirname, '../../data')

const FILES = {
  users:        'smp_users.json',
  login_logs:   'smp_login_logs.json',
  items:        'smp_items.json',
  unique_items: 'smp_unique_items.json',
  categories:   'smp_categories.json',
  transactions: 'smp_transactions.json',
  issued:       'smp_issued.json',
  borrowed:     'smp_borrowed.json',
  reservations: 'smp_reservations.json',
  disposals:    'smp_disposals.json',
  audit_logs:   'smp_audit_logs.json',
}

function filePath(key) {
  return path.join(DATA_DIR, FILES[key])
}

function read(key) {
  const fp = filePath(key)
  if (!fs.existsSync(fp)) return []
  try { return JSON.parse(fs.readFileSync(fp, 'utf8')) } catch { return [] }
}

function write(key, data) {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
  fs.writeFileSync(filePath(key), JSON.stringify(data, null, 2), 'utf8')
}

function findAll(key)           { return read(key) }
function findById(key, id)      { return read(key).find(r => r.id === id) || null }
function findWhere(key, fn)     { return read(key).filter(fn) }
function findOneWhere(key, fn)  { return read(key).find(fn) || null }

function insert(key, record) {
  const rows = read(key)
  rows.push(record)
  write(key, rows)
  return record
}

function update(key, id, patch) {
  const rows = read(key)
  const idx  = rows.findIndex(r => r.id === id)
  if (idx === -1) return null
  rows[idx] = { ...rows[idx], ...patch, updatedAt: new Date().toISOString() }
  write(key, rows)
  return rows[idx]
}

function remove(key, id) {
  const rows = read(key)
  const next = rows.filter(r => r.id !== id)
  if (next.length === rows.length) return false
  write(key, next)
  return true
}

function removeWhere(key, fn) {
  const rows = read(key)
  const next = rows.filter(r => !fn(r))
  write(key, next)
  return rows.length - next.length
}

module.exports = { findAll, findById, findWhere, findOneWhere, insert, update, remove, removeWhere }

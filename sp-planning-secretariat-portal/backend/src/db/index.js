const mysql  = require('mysql2/promise')
const { getPool } = require('./pool')
const { TABLES, ensureDatabase, ensureTables } = require('./schema')

let ready = null
function init() {
  if (!ready) ready = ensureDatabase(mysql).then(() => ensureTables(getPool()))
  return ready
}

function table(key) {
  const t = TABLES[key]
  if (!t) throw new Error(`Unknown db collection: ${key}`)
  return t
}

function parseData(raw) {
  return typeof raw === 'string' ? JSON.parse(raw) : raw
}

async function read(key) {
  await init()
  const [rows] = await getPool().query(`SELECT data FROM \`${table(key)}\``)
  return rows.map(r => parseData(r.data))
}

async function findAll(key)  { return read(key) }
async function findById(key, id) {
  await init()
  const [rows] = await getPool().query(`SELECT data FROM \`${table(key)}\` WHERE id = ?`, [id])
  return rows.length ? parseData(rows[0].data) : null
}
async function findWhere(key, fn)    { return (await read(key)).filter(fn) }
async function findOneWhere(key, fn) { return (await read(key)).find(fn) || null }

async function insert(key, record) {
  await init()
  await getPool().query(
    `INSERT INTO \`${table(key)}\` (id, data) VALUES (?, ?)`,
    [record.id, JSON.stringify(record)]
  )
  return record
}

async function update(key, id, patch) {
  await init()
  const current = await findById(key, id)
  if (!current) return null
  const next = { ...current, ...patch, updatedAt: new Date().toISOString() }
  await getPool().query(
    `UPDATE \`${table(key)}\` SET data = ? WHERE id = ?`,
    [JSON.stringify(next), id]
  )
  return next
}

async function remove(key, id) {
  await init()
  const [result] = await getPool().query(`DELETE FROM \`${table(key)}\` WHERE id = ?`, [id])
  return result.affectedRows > 0
}

async function removeWhere(key, fn) {
  const rows   = await read(key)
  const toKill = rows.filter(fn)
  if (!toKill.length) return 0
  await init()
  await getPool().query(
    `DELETE FROM \`${table(key)}\` WHERE id IN (?)`,
    [toKill.map(r => r.id)]
  )
  return toKill.length
}

module.exports = { findAll, findById, findWhere, findOneWhere, insert, update, remove, removeWhere }

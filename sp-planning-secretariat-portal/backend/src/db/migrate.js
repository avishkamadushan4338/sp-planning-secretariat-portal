require('dotenv').config()
const fs    = require('fs')
const path  = require('path')
const mysql = require('mysql2/promise')
const { getPool } = require('./pool')
const { TABLES, ensureDatabase, ensureTables } = require('./schema')

const pool = getPool()

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

async function migrate() {
  await ensureDatabase(mysql)
  await ensureTables(pool)

  for (const [key, file] of Object.entries(FILES)) {
    const fp = path.join(DATA_DIR, file)
    if (!fs.existsSync(fp)) { console.log(`  [migrate] skip ${file} (not found)`); continue }

    const rows = JSON.parse(fs.readFileSync(fp, 'utf8'))
    if (!Array.isArray(rows) || rows.length === 0) { console.log(`  [migrate] ${file}: 0 rows`); continue }

    const table = TABLES[key]
    for (const record of rows) {
      await pool.query(
        `INSERT INTO \`${table}\` (id, data) VALUES (?, ?)
         ON DUPLICATE KEY UPDATE data = ?`,
        [record.id, JSON.stringify(record), JSON.stringify(record)]
      )
    }
    console.log(`  [migrate] ${file}: ${rows.length} rows -> ${table}`)
  }

  await pool.end()
  console.log('[migrate] done.')
}

migrate().catch(err => { console.error('[migrate] failed:', err); process.exit(1) })

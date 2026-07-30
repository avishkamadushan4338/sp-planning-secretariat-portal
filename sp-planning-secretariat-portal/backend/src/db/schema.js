const TABLES = {
  users:        'smp_users',
  login_logs:   'smp_login_logs',
  items:        'smp_items',
  unique_items: 'smp_unique_items',
  categories:   'smp_categories',
  transactions: 'smp_transactions',
  issued:       'smp_issued',
  borrowed:     'smp_borrowed',
  reservations: 'smp_reservations',
  disposals:    'smp_disposals',
  audit_logs:   'smp_audit_logs',
}

async function ensureDatabase(mysql) {
  const dbName = process.env.DB_NAME || 'sp_planning_secretariat'
  const conn = await mysql.createConnection({
    host:     process.env.DB_HOST || '127.0.0.1',
    port:     Number(process.env.DB_PORT) || 3306,
    user:     process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
  })
  await conn.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`)
  await conn.end()
}

async function ensureTables(pool) {
  for (const table of Object.values(TABLES)) {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS \`${table}\` (
        id         VARCHAR(64) PRIMARY KEY,
        data       JSON NOT NULL,
        created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
        updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `)
  }
}

module.exports = { TABLES, ensureDatabase, ensureTables }

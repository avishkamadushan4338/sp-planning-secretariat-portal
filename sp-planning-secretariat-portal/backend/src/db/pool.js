const mysql = require('mysql2/promise')

let pool = null

function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host:               process.env.DB_HOST || '127.0.0.1',
      port:               Number(process.env.DB_PORT) || 3306,
      user:               process.env.DB_USER || 'root',
      password:           process.env.DB_PASSWORD || '',
      database:           process.env.DB_NAME || 'sp_planning_secretariat',
      waitForConnections: true,
      connectionLimit:    10,
      dateStrings:        true,
    })
  }
  return pool
}

module.exports = { getPool }

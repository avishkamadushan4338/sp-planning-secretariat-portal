require('dotenv').config()
const bcrypt  = require('bcryptjs')
const { v4: uuid } = require('uuid')
const db = require('./index')

async function ensureCollection(key, defaultRows) {
  const existing = await db.findAll(key)
  if (existing.length > 0) return
  for (const row of defaultRows) await db.insert(key, row)
  console.log(`  [seed] populated ${key} (${defaultRows.length} row(s))`)
}

async function seed() {
  const storeHash = bcrypt.hashSync('Store@123', 10)
  const now       = new Date().toISOString()

  await ensureCollection('users', [
    { id: uuid(), username: 'Store', password: storeHash, role: 'admin', name: 'Store Administrator', email: 'store@planning.lk', active: true, createdAt: now },
  ])

  await ensureCollection('categories', [
    { id: uuid(), name: 'Stationery',  color: '#C79A2B', createdAt: now },
    { id: uuid(), name: 'Furniture',   color: '#6366F1', createdAt: now },
    { id: uuid(), name: 'Electronics', color: '#0EA5E9', createdAt: now },
    { id: uuid(), name: 'Cleaning',    color: '#22C55E', createdAt: now },
    { id: uuid(), name: 'Printing',    color: '#F97316', createdAt: now },
    { id: uuid(), name: 'Borrowable',  color: '#EC4899', createdAt: now },
    { id: uuid(), name: 'Equipment',   color: '#8B5CF6', createdAt: now },
    { id: uuid(), name: 'Tools',       color: '#64748B', createdAt: now },
  ])
}

seed().then(() => { console.log('[seed] SMP MySQL data ready.'); process.exit(0) })

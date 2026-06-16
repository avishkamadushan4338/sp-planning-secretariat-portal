const fs      = require('fs')
const path    = require('path')
const bcrypt  = require('bcryptjs')
const { v4: uuid } = require('uuid')

const DATA_DIR = path.join(__dirname, '../../data')

function ensureFile(name, defaultData) {
  const fp = path.join(DATA_DIR, name)
  if (!fs.existsSync(fp)) {
    fs.writeFileSync(fp, JSON.stringify(defaultData, null, 2), 'utf8')
    console.log(`  [seed] created ${name}`)
  }
}

async function seed() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })

  const storeHash = bcrypt.hashSync('Store@123', 10)
  const now       = new Date().toISOString()

  ensureFile('smp_users.json', [
    { id: uuid(), username: 'Store', password: storeHash, role: 'admin', name: 'Store Administrator', email: 'store@planning.lk', active: true, createdAt: now },
  ])

  ensureFile('smp_login_logs.json',   [])
  ensureFile('smp_items.json',        [])
  ensureFile('smp_unique_items.json', [])
  ensureFile('smp_disposals.json',    [])
  ensureFile('smp_categories.json',   [
    { id: uuid(), name: 'Stationery',  color: '#C79A2B', createdAt: now },
    { id: uuid(), name: 'Furniture',   color: '#6366F1', createdAt: now },
    { id: uuid(), name: 'Electronics', color: '#0EA5E9', createdAt: now },
    { id: uuid(), name: 'Cleaning',    color: '#22C55E', createdAt: now },
    { id: uuid(), name: 'Printing',    color: '#F97316', createdAt: now },
    { id: uuid(), name: 'Borrowable',  color: '#EC4899', createdAt: now },
    { id: uuid(), name: 'Equipment',   color: '#8B5CF6', createdAt: now },
    { id: uuid(), name: 'Tools',       color: '#64748B', createdAt: now },
  ])
  ensureFile('smp_transactions.json', [])
  ensureFile('smp_issued.json',       [])
  ensureFile('smp_borrowed.json',     [])
  ensureFile('smp_reservations.json', [])
  ensureFile('smp_audit_logs.json',   [])
}

seed().then(() => console.log('[seed] SMP data files ready.'))

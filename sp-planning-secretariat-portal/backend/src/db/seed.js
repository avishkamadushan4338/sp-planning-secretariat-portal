require('dotenv').config()
const bcrypt  = require('bcryptjs')
const { v4: uuid } = require('uuid')
const db = require('./index')
const {
  staffSeed, faqsSeed, homeContentSeed, departmentsSeed, siteSettingsSeed,
  aboutOverviewSeed, aboutFunctionsSeed, orgStructureSeed, aboutHistorySeed,
} = require('./seedData')

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

  // Phase 1 CMS content — preserves existing production copy on first run
  await ensureCollection('staff',       staffSeed.map(r => ({ ...r, createdAt: now, updatedAt: now })))
  await ensureCollection('faqs',        faqsSeed.map(r => ({ ...r, createdAt: now, updatedAt: now })))
  await ensureCollection('departments', departmentsSeed.map(r => ({ ...r, createdAt: now, updatedAt: now })))

  const existingHome = await db.findAll('home_content')
  if (existingHome.length === 0) {
    await db.insert('home_content', { ...homeContentSeed, updatedAt: now })
    console.log('  [seed] populated home_content (1 row)')
  }

  const existingSettings = await db.findAll('site_settings')
  if (existingSettings.length === 0) {
    await db.insert('site_settings', { ...siteSettingsSeed, updatedAt: now })
    console.log('  [seed] populated site_settings (1 row)')
  }

  // Phase 2 CMS content — About page (Overview, Functions & Duties, Org Structure, History)
  const existingOverview = await db.findAll('about_overview')
  if (existingOverview.length === 0) {
    await db.insert('about_overview', { ...aboutOverviewSeed, updatedAt: now })
    console.log('  [seed] populated about_overview (1 row)')
  }

  const existingFunctions = await db.findAll('about_functions')
  if (existingFunctions.length === 0) {
    await db.insert('about_functions', { ...aboutFunctionsSeed, updatedAt: now })
    console.log('  [seed] populated about_functions (1 row)')
  }

  const existingOrgStructure = await db.findAll('org_structure')
  if (existingOrgStructure.length === 0) {
    await db.insert('org_structure', { ...orgStructureSeed, updatedAt: now })
    console.log('  [seed] populated org_structure (1 row)')
  }

  const existingHistory = await db.findAll('about_history')
  if (existingHistory.length === 0) {
    await db.insert('about_history', { ...aboutHistorySeed, updatedAt: now })
    console.log('  [seed] populated about_history (1 row)')
  }
}

seed().then(() => { console.log('[seed] SMP MySQL data ready.'); process.exit(0) })

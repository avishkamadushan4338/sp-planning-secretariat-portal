const express = require('express')
const fs      = require('fs')
const path    = require('path')

const router   = express.Router()
const DATA_FILE = path.join(__dirname, '../../../../data/news-bar.json')

function readItems() {
  try {
    if (!fs.existsSync(DATA_FILE)) return []
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'))
  } catch {
    return []
  }
}

function writeItems(items) {
  const dir = path.dirname(DATA_FILE)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(DATA_FILE, JSON.stringify(items, null, 2), 'utf8')
}

// GET /api/news-bar — return all items
router.get('/', (_req, res) => {
  res.json(readItems())
})

// PUT /api/news-bar — replace all items (sent as array)
router.put('/', (req, res) => {
  const items = req.body
  if (!Array.isArray(items)) return res.status(400).json({ error: 'Expected an array' })
  writeItems(items)
  res.json({ ok: true })
})

module.exports = router

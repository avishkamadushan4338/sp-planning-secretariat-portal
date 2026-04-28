require('dotenv').config()
const express = require('express')
const cors    = require('cors')

// Upload route removed: attachments are now external drive links managed by admins.

const app  = express()
const PORT = process.env.PORT || 5000

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }))
app.use(express.json())

// No upload route mounted — external links (Drive/Dropbox/etc.) are used instead.

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`))

require('dotenv').config()
const express       = require('express')
const cors          = require('cors')
const newsBarRouter = require('./features/portal/routes/newsBar')
const contactRouter = require('./features/portal/routes/contact')
const smpAuth       = require('./features/smp/routes/smpAuth')
const smpUsers      = require('./features/smp/routes/smpUsers')
const smpItems      = require('./features/smp/routes/smpItems')
const smpDisposal   = require('./features/smp/routes/smpDisposal')
const smpReports    = require('./features/smp/routes/smpReports')
const { startCleanupCron } = require('./utils/cleanup')

const app  = express()
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: (origin, cb) => {
    const allowed = (process.env.FRONTEND_URL || 'http://localhost:3000').split(',').map(s => s.trim())
    if (!origin || allowed.includes(origin) || /^http:\/\/localhost:\d+$/.test(origin)) return cb(null, true)
    cb(new Error('Not allowed by CORS'))
  },
}))
app.use(express.json())

// Portal routes
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))
app.use('/api/news-bar', newsBarRouter)
app.use('/api/contact',  contactRouter)

// SMP routes
app.use('/api/smp/auth',     smpAuth)
app.use('/api/smp/users',    smpUsers)
app.use('/api/smp/items',    smpItems)
app.use('/api/smp/disposal', smpDisposal)
app.use('/api/smp/reports',  smpReports)

startCleanupCron()

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`))

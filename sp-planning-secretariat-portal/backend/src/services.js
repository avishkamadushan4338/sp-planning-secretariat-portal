const { createDb } = require('@sp-planning/db')
const { createAuth, ensureBootstrapUsers } = require('@sp-planning/auth')
const { appRouter } = require('@sp-planning/api/routers/index')
const { call } = require('@orpc/server')

const DATABASE_URL = process.env.DATABASE_URL
  || 'postgresql://postgres:password@localhost:5433/sp_planning_secretariat'
const BETTER_AUTH_URL = process.env.BETTER_AUTH_URL || `http://localhost:${process.env.PORT || 5000}`
const BETTER_AUTH_SECRET = process.env.BETTER_AUTH_SECRET

const db = createDb({ DATABASE_URL })

const authEnv = {
  BETTER_AUTH_URL,
  BETTER_AUTH_SECRET,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  STORE_PASSWORD: process.env.STORE_PASSWORD,
  PRINCIPAL_PASSWORD: process.env.PRINCIPAL_PASSWORD,
}

const auth = createAuth(authEnv, db)

// Privileged context used only by the internal CMS REST shim, which has no
// real session of its own (cmsAuth.js on the frontend is a client-only check).
// This preserves the current security posture (CMS writes are already open
// at the HTTP layer) while swapping the storage backend from MySQL to Postgres.
const shimContext = {
  db,
  session: { user: { id: 'cms-shim', name: 'CMS Shim', email: 'cms-shim@local', role: 'admin' } },
}

async function bootstrap() {
  await ensureBootstrapUsers(db, authEnv)
}

// Invokes an oRPC procedure directly in-process (no HTTP round-trip),
// using the privileged shim context for all portal CMS routes.
function callPortal(procedure, input) {
  return call(procedure, input, { context: shimContext })
}

module.exports = { db, auth, appRouter, shimContext, bootstrap, callPortal }

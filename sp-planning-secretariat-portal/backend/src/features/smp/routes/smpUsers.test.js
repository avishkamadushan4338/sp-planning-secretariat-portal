const request  = require('supertest')
const express  = require('express')
const bcrypt   = require('bcryptjs')
const jwt      = require('jsonwebtoken')

jest.mock('../../../db')
const db = require('../../../db')

const router = require('./smpUsers')

const SECRET = 'smp_secret_key_change_in_production'

function makeToken(payload) {
  return jwt.sign(payload, SECRET)
}

const adminToken  = makeToken({ id: 'admin-1', role: 'admin' })
const viewerToken = makeToken({ id: 'viewer-1', role: 'viewer' })
const userToken   = makeToken({ id: 'user-1',  role: 'storekeeper' })

function buildApp() {
  const app = express()
  app.use(express.json())
  app.use('/', router)
  return app
}

let app
beforeEach(() => {
  jest.clearAllMocks()
  app = buildApp()
})

// ── GET / ─────────────────────────────────────────────────────────────────────

describe('GET /', () => {
  test('200 – returns users without passwords for admin', async () => {
    db.findAll.mockReturnValue([
      { id: '1', username: 'alice', password: 'hashed', role: 'admin', name: 'Alice' },
    ])

    const res = await request(app).get('/').set('Authorization', `Bearer ${adminToken}`)

    expect(res.status).toBe(200)
    expect(res.body).toEqual([{ id: '1', username: 'alice', role: 'admin', name: 'Alice' }])
  })

  test('401 – no token', async () => {
    const res = await request(app).get('/')
    expect(res.status).toBe(401)
  })

  test('403 – non-admin role', async () => {
    const res = await request(app).get('/').set('Authorization', `Bearer ${viewerToken}`)
    expect(res.status).toBe(403)
  })
})

// ── POST / ────────────────────────────────────────────────────────────────────

describe('POST /', () => {
  test('201 – creates user, omits password from response', async () => {
    db.findOneWhere.mockReturnValue(null)
    db.insert.mockImplementation((_, record) => record)

    const res = await request(app)
      .post('/')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ username: 'bob', password: 'secret', role: 'storekeeper', name: 'Bob' })

    expect(res.status).toBe(201)
    expect(res.body).toMatchObject({ username: 'bob', role: 'storekeeper', name: 'Bob' })
    expect(res.body.password).toBeUndefined()
    expect(db.insert).toHaveBeenCalledTimes(1)
  })

  test('400 – missing required fields', async () => {
    const res = await request(app)
      .post('/')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ username: 'bob', password: 'secret' })

    expect(res.status).toBe(400)
    expect(res.body.error).toMatch(/required/)
  })

  test('400 – invalid role', async () => {
    db.findOneWhere.mockReturnValue(null)

    const res = await request(app)
      .post('/')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ username: 'bob', password: 'secret', role: 'superuser', name: 'Bob' })

    expect(res.status).toBe(400)
    expect(res.body.error).toBe('Invalid role')
  })

  test('409 – duplicate username', async () => {
    db.findOneWhere.mockReturnValue({ id: 'existing' })

    const res = await request(app)
      .post('/')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ username: 'alice', password: 'secret', role: 'viewer', name: 'Alice' })

    expect(res.status).toBe(409)
    expect(res.body.error).toBe('Username already exists')
  })

  test('401 – unauthenticated', async () => {
    const res = await request(app)
      .post('/')
      .send({ username: 'bob', password: 'secret', role: 'viewer', name: 'Bob' })

    expect(res.status).toBe(401)
  })

  test('403 – non-admin', async () => {
    const res = await request(app)
      .post('/')
      .set('Authorization', `Bearer ${viewerToken}`)
      .send({ username: 'bob', password: 'secret', role: 'viewer', name: 'Bob' })

    expect(res.status).toBe(403)
  })
})

// ── PATCH /me/password ────────────────────────────────────────────────────────

describe('PATCH /me/password', () => {
  test('200 – correct current password updates successfully', async () => {
    const hash = await bcrypt.hash('oldpass', 10)
    db.findById.mockReturnValue({ id: 'user-1', password: hash })
    db.update.mockReturnValue({ id: 'user-1' })

    const res = await request(app)
      .patch('/me/password')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ currentPassword: 'oldpass', newPassword: 'newpass123' })

    expect(res.status).toBe(200)
    expect(res.body).toEqual({ ok: true })
    expect(db.update).toHaveBeenCalledWith('users', 'user-1', expect.objectContaining({ password: expect.any(String) }))
  })

  test('401 – wrong current password', async () => {
    const hash = await bcrypt.hash('realpass', 10)
    db.findById.mockReturnValue({ id: 'user-1', password: hash })

    const res = await request(app)
      .patch('/me/password')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ currentPassword: 'wrongpass', newPassword: 'newpass123' })

    expect(res.status).toBe(401)
    expect(res.body.error).toBe('Current password incorrect')
  })

  test('400 – missing fields', async () => {
    const res = await request(app)
      .patch('/me/password')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ currentPassword: 'oldpass' })

    expect(res.status).toBe(400)
    expect(res.body.error).toMatch(/required/)
  })

  test('404 – user not found in db', async () => {
    db.findById.mockReturnValue(null)

    const res = await request(app)
      .patch('/me/password')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ currentPassword: 'any', newPassword: 'newpass' })

    expect(res.status).toBe(404)
    expect(res.body.error).toBe('User not found')
  })

  test('401 – no token', async () => {
    const res = await request(app)
      .patch('/me/password')
      .send({ currentPassword: 'a', newPassword: 'b' })

    expect(res.status).toBe(401)
  })
})

// ── PATCH /:id ────────────────────────────────────────────────────────────────

describe('PATCH /:id', () => {
  test('200 – admin can update name, email, role', async () => {
    db.update.mockReturnValue({ id: 'u1', name: 'Updated', email: 'x@x.com', role: 'viewer', password: 'h' })

    const res = await request(app)
      .patch('/u1')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'Updated', email: 'x@x.com', role: 'viewer' })

    expect(res.status).toBe(200)
    expect(res.body.name).toBe('Updated')
    expect(res.body.password).toBeUndefined()
  })

  test('200 – hashes password when included', async () => {
    db.update.mockReturnValue({ id: 'u1', name: 'Bob', password: 'hashed' })

    const res = await request(app)
      .patch('/u1')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ password: 'newpassword' })

    expect(res.status).toBe(200)
    const updateArg = db.update.mock.calls[0][2]
    const isHashed = await bcrypt.compare('newpassword', updateArg.password)
    expect(isHashed).toBe(true)
  })

  test('400 – invalid role value', async () => {
    const res = await request(app)
      .patch('/u1')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ role: 'god' })

    expect(res.status).toBe(400)
    expect(res.body.error).toBe('Invalid role')
  })

  test('404 – user not found', async () => {
    db.update.mockReturnValue(null)

    const res = await request(app)
      .patch('/nonexistent')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'Ghost' })

    expect(res.status).toBe(404)
    expect(res.body.error).toBe('User not found')
  })

  test('401 – unauthenticated', async () => {
    const res = await request(app).patch('/u1').send({ name: 'X' })
    expect(res.status).toBe(401)
  })

  test('403 – non-admin', async () => {
    const res = await request(app)
      .patch('/u1')
      .set('Authorization', `Bearer ${viewerToken}`)
      .send({ name: 'X' })

    expect(res.status).toBe(403)
  })
})

// ── DELETE /:id ───────────────────────────────────────────────────────────────

describe('DELETE /:id', () => {
  test('200 – admin deletes another user', async () => {
    db.remove.mockReturnValue(true)

    const res = await request(app)
      .delete('/other-user')
      .set('Authorization', `Bearer ${adminToken}`)

    expect(res.status).toBe(200)
    expect(res.body).toEqual({ ok: true })
  })

  test('400 – admin cannot delete themselves', async () => {
    const res = await request(app)
      .delete('/admin-1')
      .set('Authorization', `Bearer ${adminToken}`)

    expect(res.status).toBe(400)
    expect(res.body.error).toBe('Cannot delete yourself')
  })

  test('404 – user not found', async () => {
    db.remove.mockReturnValue(false)

    const res = await request(app)
      .delete('/ghost')
      .set('Authorization', `Bearer ${adminToken}`)

    expect(res.status).toBe(404)
    expect(res.body.error).toBe('User not found')
  })

  test('401 – unauthenticated', async () => {
    const res = await request(app).delete('/u1')
    expect(res.status).toBe(401)
  })

  test('403 – non-admin', async () => {
    const res = await request(app)
      .delete('/u1')
      .set('Authorization', `Bearer ${viewerToken}`)

    expect(res.status).toBe(403)
  })
})

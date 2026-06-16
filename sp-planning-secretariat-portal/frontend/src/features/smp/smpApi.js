import axios from 'axios'

const api = axios.create({ baseURL: `${import.meta.env.VITE_API_URL || ''}/api/smp` })

api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('smp_token')
  if (token) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})

api.interceptors.response.use(
  r => r,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('smp_token')
      localStorage.removeItem('smp_user')
      window.location.href = '/smp'
    }
    return Promise.reject(err)
  }
)

// Auth
export const login          = (u, p)   => api.post('/auth/login', { username: u, password: p })
export const logout         = ()       => api.post('/auth/logout')
export const getMe          = ()       => api.get('/auth/me')

// Users
export const getUsers       = ()       => api.get('/users')
export const createUser     = d        => api.post('/users', d)
export const updateUser     = (id, d)  => api.patch(`/users/${id}`, d)
export const deleteUser     = id       => api.delete(`/users/${id}`)
export const changePassword = d        => api.patch('/users/me/password', d)

// Items
export const getItems       = ()       => api.get('/items')
export const getItem        = id       => api.get(`/items/${id}`)
export const createItem     = d        => api.post('/items', d)
export const updateItem     = (id, d)  => api.patch(`/items/${id}`, d)
export const deleteItem     = id       => api.delete(`/items/${id}`)
export const getCategories  = ()       => api.get('/items/meta/categories')
export const createCategory = d        => api.post('/items/meta/categories', d)

// Unique item IDs
export const getUniqueIds   = itemId   => api.get(`/items/${itemId}/unique-ids`)
export const getAllUniqueIds = ()       => api.get('/items/unique-ids/all')
export const updateUniqueId = (uid, d) => api.patch(`/items/unique-ids/${uid}`, d)

// Disposal
export const createDisposal       = d        => api.post('/disposal', d)
export const getDisposals         = (p = {}) => api.get('/disposal', { params: p })
export const getDisposalById      = id       => api.get(`/disposal/${id}`)
export const approveDisposal      = id       => api.patch(`/disposal/${id}/approve`)
export const updateDisposalStatus = (id, d)  => api.patch(`/disposal/${id}/status`, d)

// Reports
export const getDashboard      = ()        => api.get('/reports/dashboard')
export const getTransactions   = (p = {})  => api.get('/reports/transactions', { params: p })
export const getAuditLogs      = (p = {})  => api.get('/reports/audit-logs',   { params: p })
export const getLoginLogs      = (p = {})  => api.get('/reports/login-logs',   { params: p })
export const getDisposalReport = (p = {})  => api.get('/reports/disposals',    { params: p })
export const getValueSummary   = ()        => api.get('/reports/value-summary')

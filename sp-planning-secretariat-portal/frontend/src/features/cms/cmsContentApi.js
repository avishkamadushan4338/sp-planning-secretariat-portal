import axios from 'axios'

const api = axios.create({ baseURL: `${import.meta.env.VITE_API_URL || ''}/api` })

export const staffApi = {
  list:   ()       => api.get('/staff'),
  get:    (id)      => api.get(`/staff/${id}`),
  create: (d)       => api.post('/staff', d),
  update: (id, d)   => api.patch(`/staff/${id}`, d),
  remove: (id)       => api.delete(`/staff/${id}`),
}

export const faqsApi = {
  list:   ()       => api.get('/faqs'),
  create: (d)       => api.post('/faqs', d),
  update: (id, d)   => api.patch(`/faqs/${id}`, d),
  remove: (id)       => api.delete(`/faqs/${id}`),
}

export const homeContentApi = {
  get:  ()  => api.get('/home-content'),
  save: (d) => api.put('/home-content', d),
}

export const departmentsApi = {
  list:   ()       => api.get('/departments'),
  get:    (id)      => api.get(`/departments/${id}`),
  create: (d)       => api.post('/departments', d),
  update: (id, d)   => api.patch(`/departments/${id}`, d),
  remove: (id)       => api.delete(`/departments/${id}`),
}

export const siteSettingsApi = {
  get:  ()  => api.get('/site-settings'),
  save: (d) => api.put('/site-settings', d),
}

export const aboutOverviewApi = {
  get:  ()  => api.get('/about-overview'),
  save: (d) => api.put('/about-overview', d),
}

export const aboutFunctionsApi = {
  get:  ()  => api.get('/about-functions'),
  save: (d) => api.put('/about-functions', d),
}

export const orgStructureApi = {
  get:  ()  => api.get('/org-structure'),
  save: (d) => api.put('/org-structure', d),
}

export const aboutHistoryApi = {
  get:  ()  => api.get('/about-history'),
  save: (d) => api.put('/about-history', d),
}

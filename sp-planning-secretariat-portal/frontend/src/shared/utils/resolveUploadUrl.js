const API_BASE = import.meta.env.VITE_API_URL || ''

export function resolveUploadUrl(src) {
  if (typeof src !== 'string' || !src.startsWith('/uploads/')) return src
  return `${API_BASE}${src}`
}

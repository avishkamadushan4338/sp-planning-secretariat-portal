const KEY = 'cms_creds'

async function sha256(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('')
}

export function getCredentials() {
  const raw = localStorage.getItem(KEY)
  return raw ? JSON.parse(raw) : null
}

async function ensureDefaults() {
  if (!getCredentials()) {
    const hash = await sha256('Admin@123')
    localStorage.setItem(KEY, JSON.stringify({ username: 'Admin', hash }))
  }
}

export async function verifyLogin(username, password) {
  await ensureDefaults()
  const creds = getCredentials()
  const hash  = await sha256(password)
  return creds?.username === username && creds?.hash === hash
}

export async function changeUsername(newUsername, currentPassword) {
  const creds = getCredentials()
  if (!creds) throw new Error('No credentials found')
  const hash = await sha256(currentPassword)
  if (creds.hash !== hash) throw new Error('Incorrect current password')
  localStorage.setItem(KEY, JSON.stringify({ ...creds, username: newUsername }))
}

export async function changePassword(currentPassword, newPassword) {
  const creds = getCredentials()
  if (!creds) throw new Error('No credentials found')
  const curHash = await sha256(currentPassword)
  if (creds.hash !== curHash) throw new Error('Incorrect current password')
  const newHash = await sha256(newPassword)
  localStorage.setItem(KEY, JSON.stringify({ ...creds, hash: newHash }))
}

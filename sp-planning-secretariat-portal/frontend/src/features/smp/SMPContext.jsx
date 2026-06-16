import { createContext, useContext, useState, useCallback } from 'react'
import { login as apiLogin, logout as apiLogout } from './smpApi'

const Ctx = createContext(null)

export function SMPProvider({ children }) {
  const [user,    setUser]    = useState(() => {
    try { return JSON.parse(localStorage.getItem('smp_user')) } catch { return null }
  })
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  const signIn = useCallback(async (username, password) => {
    setLoading(true); setError('')
    try {
      const { data } = await apiLogin(username, password)
      localStorage.setItem('smp_token', data.token)
      localStorage.setItem('smp_user',  JSON.stringify(data.user))
      setUser(data.user)
      return { ok: true }
    } catch (e) {
      const msg = e.response?.data?.error || 'Login failed'
      setError(msg)
      return { ok: false, error: msg }
    } finally {
      setLoading(false)
    }
  }, [])

  const signOut = useCallback(async () => {
    try { await apiLogout() } catch (_e) { /* best-effort logout */ }
    localStorage.removeItem('smp_token')
    localStorage.removeItem('smp_user')
    setUser(null)
  }, [])

  const isAdmin      = user?.role === 'admin'
  const isStorekeeper= user?.role === 'storekeeper' || user?.role === 'admin'
  const isViewer     = !!user

  return (
    <Ctx.Provider value={{ user, loading, error, signIn, signOut, isAdmin, isStorekeeper, isViewer }}>
      {children}
    </Ctx.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSMP = () => useContext(Ctx)

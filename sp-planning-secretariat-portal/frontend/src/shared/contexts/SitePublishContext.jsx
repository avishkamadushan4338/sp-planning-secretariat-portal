import { useState, useEffect, useCallback } from 'react'
import { SitePublishContext } from './SitePublishContextInstance'

const STORAGE_KEY = 'site_publish_mode'

export function SitePublishProvider({ children }) {
  const [isLive, setIsLive] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) === 'live' }
    catch { return false }
  })

  const setLive = useCallback((value) => {
    setIsLive(value)
    try { localStorage.setItem(STORAGE_KEY, value ? 'live' : 'coming_soon') }
    catch { /* ignore */ }
    // Notify other tabs
    window.dispatchEvent(new StorageEvent('storage', { key: STORAGE_KEY, newValue: value ? 'live' : 'coming_soon' }))
  }, [])

  // Sync across tabs
  useEffect(() => {
    const handler = (e) => {
      if (e.key === STORAGE_KEY) {
        setIsLive(e.newValue === 'live')
      }
    }
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }, [])

  return (
    <SitePublishContext.Provider value={{ isLive, setLive }}>
      {children}
    </SitePublishContext.Provider>
  )
}


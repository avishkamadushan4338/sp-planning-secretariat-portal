import { useState, useEffect } from 'react'

const PAGE_HOLD_KEY = 'cms_page_hold'

export function usePageHold(pageKey) {
  const [held, setHeld] = useState(() => {
    try {
      return !!JSON.parse(localStorage.getItem(PAGE_HOLD_KEY) || '{}')[pageKey]
    } catch { return false }
  })

  useEffect(() => {
    const sync = () => {
      try {
        setHeld(!!JSON.parse(localStorage.getItem(PAGE_HOLD_KEY) || '{}')[pageKey])
      } catch { /* ignore */ }
    }
    window.addEventListener('cms_page_hold_updated', sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener('cms_page_hold_updated', sync)
      window.removeEventListener('storage', sync)
    }
  }, [pageKey])

  return held
}

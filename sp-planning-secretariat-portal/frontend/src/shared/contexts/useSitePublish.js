import { useContext } from 'react'
import { SitePublishContext } from './SitePublishContextInstance'

export function useSitePublish() {
  const ctx = useContext(SitePublishContext)
  if (!ctx) throw new Error('useSitePublish must be used inside SitePublishProvider')
  return ctx
}

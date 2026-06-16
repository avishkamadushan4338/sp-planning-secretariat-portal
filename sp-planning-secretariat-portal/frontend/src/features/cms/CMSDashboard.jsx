import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { toast, Toaster } from 'sonner'
import CMSHomeNewsBar from './CMSHomeNewsBar'
import { useSitePublish } from '@/shared/contexts/useSitePublish'
import CMSHomeEvents  from './CMSHomeEvents'
import {
  FiGrid, FiFileText, FiBell, FiDownload, FiImage,
  FiLogOut, FiPlus, FiEdit2, FiTrash2,
  FiChevronRight, FiChevronLeft, FiSearch, FiEye, FiEyeOff,
  FiCheck, FiClock, FiCalendar, FiActivity,
  FiChevronsLeft, FiHome, FiX, FiSettings, FiUser, FiLock, FiShield, FiAlertCircle, FiTag,
  FiRadio, FiMessageSquare, FiRefreshCw, FiMail, FiPhone, FiBookOpen,
  FiLayout, FiToggleLeft, FiToggleRight, FiGlobe, FiZap, FiAlertTriangle, FiExternalLink,
  FiInbox, FiBarChart2, FiTrendingUp, FiPackage,
} from 'react-icons/fi'
import { changeUsername, changePassword, getCredentials } from './cmsAuth'

// ── Brand tokens ──────────────────────────────────────────────────────────────
const MAROON  = '#4A0918'
const MAROON2 = '#3A0712'
const GOLD    = '#C79A2B'
const SIDEBAR_FULL = 242
const SIDEBAR_MINI = 66

// ── Default empty data ────────────────────────────────────────────────────────
const MOCK = {
  news:      [],
  notices:   [],
  gallery:   [],
  downloads: [],
}

const STATUS_COLORS = {
  Published: { bg: 'rgba(22,101,52,0.1)',  text: '#166534', dot: '#16a34a' },
  Draft:     { bg: 'rgba(180,83,9,0.1)',   text: '#92400e', dot: '#d97706' },
  Active:    { bg: 'rgba(22,101,52,0.1)',  text: '#166534', dot: '#16a34a' },
  Expired:   { bg: 'rgba(127,29,29,0.1)', text: '#7f1d1d', dot: '#dc2626' },
}

const NAV_GROUPS = [
  {
    label: 'Content',
    items: [
      { id: 'overview',      label: 'Overview',       icon: FiGrid     },
      { id: 'news',          label: 'News',            icon: FiFileText },
      { id: 'homenewsbar',   label: 'Home News Bar',   icon: FiRadio    },
      { id: 'homeevents',    label: 'Home Events',     icon: FiCalendar },
      { id: 'notices',       label: 'Notices',         icon: FiBell     },
    ],
  },
  {
    label: 'Media',
    items: [
      { id: 'downloads',  label: 'Downloads',  icon: FiDownload },
      { id: 'gallery',    label: 'Gallery',    icon: FiImage    },
    ],
  },
  {
    label: 'Feedback',
    items: [
      { id: 'complaints', label: 'Complaints & Feedback', icon: FiMessageSquare },
    ],
  },
  {
    label: 'Pages',
    items: [
      { id: 'pages', label: 'Page Visibility', icon: FiLayout },
    ],
  },
  {
    label: 'System',
    items: [
      { id: 'publish',  label: 'Publish Site',           icon: FiGlobe    },
      { id: 'settings', label: 'Settings',              icon: FiSettings  },
      { id: 'policy',   label: 'Policy & Privacy',      icon: FiBookOpen  },
    ],
  },
]

const NOTIFICATIONS = []

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

function friendlyDate() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })
}

// ── Cross-tab notice sync ─────────────────────────────────────────────────────
const _noticeChannel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('cms_notices') : null
function notifyNoticesUpdated() {
  window.dispatchEvent(new Event('cms_notices_updated'))
  _noticeChannel?.postMessage('updated')
}

// ── Cross-tab download sync ───────────────────────────────────────────────────
const _downloadChannel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('cms_downloads') : null
function notifyDownloadsUpdated() {
  window.dispatchEvent(new Event('cms_downloads_updated'))
  _downloadChannel?.postMessage('updated')
}

// Note: file attachments are now expected to be public Drive/URL links.
// Downloads/opening are performed directly by opening the provided URL.

// ── Root ──────────────────────────────────────────────────────────────────────
export default function CMSDashboard() {
  const navigate = useNavigate()
  const [active,      setActive]      = useState('overview')
  const [collapsed,   setCollapsed]   = useState(false)
  const [search,      setSearch]      = useState('')
  const [data, setData] = useState(() => {
    try {
      const savedNotices   = JSON.parse(localStorage.getItem('cms_notices')        || '[]')
      const savedNews      = JSON.parse(localStorage.getItem('cms_news')           || '[]')
      const savedDownloads = JSON.parse(localStorage.getItem('cms_downloads')      || '[]')
      const savedGallery   = JSON.parse(localStorage.getItem('cms_gallery_albums') || '[]')
      return {
        notices:   savedNotices,
        news:      savedNews,
        downloads: savedDownloads,
        gallery:   savedGallery,
      }
    } catch { /* ignore */ }
    return MOCK
  })
  const [deleteModal,    setDeleteModal]    = useState(null)
  const [albumModal,     setAlbumModal]     = useState(false)
  const [editAlbumData,  setEditAlbumData]  = useState(null)
  const [viewAlbumData,  setViewAlbumData]  = useState(null)
  const [noticeModal,    setNoticeModal]    = useState(false)
  const [editNoticeData, setEditNoticeData] = useState(null)
  const [viewNoticeData, setViewNoticeData] = useState(null)
  const [newsModal,      setNewsModal]      = useState(false)
  const [editNewsData,   setEditNewsData]   = useState(null)
  const [viewNewsData,   setViewNewsData]   = useState(null)
  const [downloadModal,     setDownloadModal]     = useState(false)
  const [editDownloadData,  setEditDownloadData]  = useState(null)
  const [notifOpen,   setNotifOpen]   = useState(false)
  const [adminName,   setAdminName]   = useState(() => getCredentials()?.username ?? 'Admin')
  const notifRef = useRef(null)

  useEffect(() => {
    if (!sessionStorage.getItem('cms_auth')) navigate('/cms', { replace: true })
  }, [navigate])

  useEffect(() => {
    const fn = e => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false)
    }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])

  const logout = () => {
    sessionStorage.removeItem('cms_auth')
    navigate('/cms', { replace: true })
  }

  const confirmDelete = (section, id) => {
    const row = data[section].find(r => r.id === id)
    setDeleteModal({ section, id, title: row?.title ?? 'this item' })
  }

  const executeDelete = () => {
    if (!deleteModal) return
    setData(d => ({ ...d, [deleteModal.section]: d[deleteModal.section].filter(r => r.id !== deleteModal.id) }))
    if (deleteModal.section === 'gallery') {
      const stored = JSON.parse(localStorage.getItem('cms_gallery_albums') || '[]')
      localStorage.setItem('cms_gallery_albums', JSON.stringify(stored.filter(a => a.id !== deleteModal.id)))
    }
    if (deleteModal.section === 'notices') {
      const stored = JSON.parse(localStorage.getItem('cms_notices') || '[]')
      localStorage.setItem('cms_notices', JSON.stringify(stored.filter(n => n.id !== deleteModal.id)))
      notifyNoticesUpdated()
    }
    if (deleteModal.section === 'downloads') {
      const stored = JSON.parse(localStorage.getItem('cms_downloads') || '[]')
      localStorage.setItem('cms_downloads', JSON.stringify(stored.filter(d => d.id !== deleteModal.id)))
      notifyDownloadsUpdated()
    }
    toast.success('Record deleted successfully')
    setDeleteModal(null)
  }

  const addDownload = (form) => {
    const newItem = {
      id:             Date.now(),
      titleEn:        form.titleEn,
      titleSi:        form.titleSi,
      titleTa:        form.titleTa,
      title:          form.titleEn || form.titleSi || form.titleTa || 'Untitled',
      description:    form.description,
      category:       form.category,
      fileUrl:        form.fileUrl,
      fileName:       form.fileName,
      fileType:       form.fileType,
      fileSize:       form.fileSize,
      date:           new Date().toISOString().split('T')[0],
      status:         form.status || 'Active',
      downloadAccess: form.downloadAccess || 'Everyone',
    }
    setData(d => ({ ...d, downloads: [newItem, ...d.downloads] }))
    try {
      const stored = JSON.parse(localStorage.getItem('cms_downloads') || '[]')
      localStorage.setItem('cms_downloads', JSON.stringify([newItem, ...stored]))
      notifyDownloadsUpdated()
    } catch {
      toast.error('Storage full — saved in session only')
    }
    toast.success('Download item added successfully')
    setDownloadModal(false)
  }

  const updateDownload = (form) => {
    const updated = {
      ...editDownloadData,
      titleEn:        form.titleEn,
      titleSi:        form.titleSi,
      titleTa:        form.titleTa,
      title:          form.titleEn || form.titleSi || form.titleTa || 'Untitled',
      description:    form.description,
      category:       form.category,
      fileUrl:        form.fileUrl,
      fileName:       form.fileName,
      fileType:       form.fileType,
      fileSize:       form.fileSize,
      status:         form.status || 'Active',
      downloadAccess: form.downloadAccess || 'Everyone',
    }
    setData(d => ({ ...d, downloads: d.downloads.map(it => it.id === updated.id ? updated : it) }))
    try {
      const stored = JSON.parse(localStorage.getItem('cms_downloads') || '[]')
      localStorage.setItem('cms_downloads', JSON.stringify(stored.map(it => it.id === updated.id ? updated : it)))
      notifyDownloadsUpdated()
    } catch { /* ignore */ }
    toast.success('Download item updated')
    setEditDownloadData(null)
  }

  const addAlbum = (form) => {
    const displayTitle = form.titleEn || form.titleSi || form.titleTa || 'Untitled Album'
    const newAlbum = {
      id: Date.now(),
      title: displayTitle,
      titleEn: form.titleEn,
      titleSi: form.titleSi,
      titleTa: form.titleTa,
      category: form.category,
      date: new Date().toISOString().split('T')[0],
      photos: form.images.length,
      imageUrl: form.images[0] || null,
      images: form.images,
    }
    setData(d => ({ ...d, gallery: [newAlbum, ...d.gallery] }))
    try {
      const stored = JSON.parse(localStorage.getItem('cms_gallery_albums') || '[]')
      localStorage.setItem('cms_gallery_albums', JSON.stringify([newAlbum, ...stored]))
    } catch {
      toast.error('Storage full — album saved in session only')
    }
    toast.success('Album created successfully')
    setAlbumModal(false)
  }

  const updateAlbum = (form) => {
    const displayTitle = form.titleEn || form.titleSi || form.titleTa || 'Untitled Album'
    const updated = {
      ...editAlbumData,
      title:    displayTitle,
      titleEn:  form.titleEn,
      titleSi:  form.titleSi,
      titleTa:  form.titleTa,
      category: form.category,
      photos:   form.images.length,
      imageUrl: form.images[0] || null,
      images:   form.images,
    }
    setData(d => ({ ...d, gallery: d.gallery.map(a => a.id === updated.id ? updated : a) }))
    try {
      const stored = JSON.parse(localStorage.getItem('cms_gallery_albums') || '[]')
      localStorage.setItem('cms_gallery_albums', JSON.stringify(
        stored.map(a => a.id === updated.id ? updated : a)
      ))
    } catch {
      toast.error('Storage full — changes saved in session only')
    }
    toast.success('Album updated successfully')
    setEditAlbumData(null)
  }

  const addNotice = (form) => {
    console.debug('[CMS] addNotice called', form)
    const newNotice = {
      id:            Date.now(),
      title:         form.title,
      titleSi:       form.titleSi       || '',
      titleTa:       form.titleTa       || '',
      type:          form.type,
      category:      form.type,
      ref:           form.ref,
      date:          new Date().toISOString().split('T')[0],
      deadline:      form.deadline      || null,
      status:        form.status,
      isNew:         true,
      fileName:      form.fileName      || null,
      fileUrl:       form.fileUrl       || null,
      fileMimeType:  form.fileMimeType  || null,
      description:   form.description   || '',
      descriptionSi: form.descriptionSi || '',
      descriptionTa: form.descriptionTa || '',
      downloadAccess: form.downloadAccess || 'Everyone',
    }
    setData(d => ({ ...d, notices: [newNotice, ...d.notices] }))
    try {
      const stored = JSON.parse(localStorage.getItem('cms_notices') || '[]')
      localStorage.setItem('cms_notices', JSON.stringify([newNotice, ...stored]))
      notifyNoticesUpdated()
    } catch { toast.error('Storage full — notice saved in session only') }
    toast.success('Notice added successfully')
    setNoticeModal(false)
  }

  const updateNotice = (form) => {
    console.debug('[CMS] updateNotice called', form)
    const updated = {
      ...editNoticeData,
      title:         form.title,
      titleSi:       form.titleSi       || '',
      titleTa:       form.titleTa       || '',
      type:          form.type,
      category:      form.type,
      ref:           form.ref,
      deadline:      form.deadline      || null,
      status:        form.status,
      fileName:      form.fileName      || editNoticeData?.fileName      || null,
      fileUrl:       form.fileUrl       || editNoticeData?.fileUrl       || null,
      fileMimeType:  form.fileMimeType  || editNoticeData?.fileMimeType  || null,
      description:   form.description   || '',
      descriptionSi: form.descriptionSi || '',
      descriptionTa: form.descriptionTa || '',
      downloadAccess: form.downloadAccess || editNoticeData?.downloadAccess || 'Everyone',
    }
    setData(d => ({ ...d, notices: d.notices.map(n => n.id === updated.id ? updated : n) }))
    try {
      const stored = JSON.parse(localStorage.getItem('cms_notices') || '[]')
      const exists = stored.some(n => n.id === updated.id)
      localStorage.setItem('cms_notices', JSON.stringify(
        exists ? stored.map(n => n.id === updated.id ? updated : n) : [updated, ...stored]
      ))
      notifyNoticesUpdated()
    } catch { toast.error('Storage full — changes saved in session only') }
    toast.success('Notice updated successfully')
    setEditNoticeData(null)
  }

  const addNews = (form) => {
    const newArticle = {
      id:        Date.now(),
      title:     form.title,
      titleSi:   form.titleSi   || '',
      titleTa:   form.titleTa   || '',
      category:  form.category,
      date:      new Date().toISOString().split('T')[0],
      status:    form.status,
      excerpt:   form.excerpt   || '',
      imageUrl:  form.imageUrl  || '',
      featured:  form.featured  || false,
    }
    setData(d => ({ ...d, news: [newArticle, ...d.news] }))
    try {
      const stored = JSON.parse(localStorage.getItem('cms_news') || '[]')
      localStorage.setItem('cms_news', JSON.stringify([newArticle, ...stored]))
    } catch { toast.error('Storage full — article saved in session only') }
    toast.success('News article added successfully')
    setNewsModal(false)
  }

  const updateNews = (form) => {
    const updated = {
      ...editNewsData,
      title:    form.title,
      titleSi:  form.titleSi  || '',
      titleTa:  form.titleTa  || '',
      category: form.category,
      status:   form.status,
      excerpt:  form.excerpt  || '',
      imageUrl: form.imageUrl || editNewsData?.imageUrl || '',
      featured: form.featured || false,
    }
    setData(d => ({ ...d, news: d.news.map(a => a.id === updated.id ? updated : a) }))
    try {
      const stored = JSON.parse(localStorage.getItem('cms_news') || '[]')
      const exists = stored.some(a => a.id === updated.id)
      localStorage.setItem('cms_news', JSON.stringify(
        exists ? stored.map(a => a.id === updated.id ? updated : a) : [updated, ...stored]
      ))
    } catch { toast.error('Storage full — changes saved in session only') }
    toast.success('News article updated successfully')
    setEditNewsData(null)
  }

  const allNavItems = NAV_GROUPS.flatMap(g => g.items)

  return (
    <>
      <Toaster position="top-right" richColors expand={false} />

      <div style={{
        display: 'flex', minHeight: '100vh', fontFamily: 'Inter, sans-serif',
        background: '#F0EBE3',
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(74,9,24,0.055) 1px, transparent 0)`,
        backgroundSize: '28px 28px',
      }}>

        {/* ── Sidebar ──────────────────────────────────────────────────────── */}
        <motion.aside
          animate={{ width: collapsed ? SIDEBAR_MINI : SIDEBAR_FULL }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          style={{
            background: `linear-gradient(170deg, #2A0510 0%, ${MAROON2} 35%, ${MAROON} 70%, #6E1528 100%)`,
            display: 'flex', flexDirection: 'column',
            overflow: 'hidden', flexShrink: 0,
            position: 'sticky', top: 0, height: '100vh',
            zIndex: 40,
            boxShadow: '6px 0 40px rgba(0,0,0,0.28), 2px 0 0 rgba(199,154,43,0.08)',
          }}>

          {/* Premium top accent — triple stripe */}
          <div style={{ flexShrink: 0 }}>
            <div style={{ height: 2, background: `linear-gradient(90deg, transparent 0%, ${GOLD} 30%, #F0D060 50%, ${GOLD} 70%, transparent 100%)` }} />
            <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />
          </div>

          {/* Logo row */}
          <div style={{
            padding: collapsed ? '1.1rem 0' : '1.2rem 1rem 1rem',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            display: 'flex', alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'space-between',
            gap: 8, flexShrink: 0,
            background: 'rgba(0,0,0,0.12)',
          }}>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.22 }}
                style={{ overflow: 'hidden', minWidth: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
                {/* Emblem dot */}
                <div style={{
                  width: 32, height: 32, borderRadius: 9, flexShrink: 0,
                  background: `linear-gradient(135deg, ${GOLD} 0%, #9A7520 100%)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 2px 10px rgba(199,154,43,0.4)`,
                  fontSize: '0.75rem', color: '#fff', fontWeight: 900,
                  fontFamily: "'Cinzel', serif", letterSpacing: '-0.02em',
                }}>P</div>
                <div>
                  <div style={{
                    color: '#fff', fontFamily: "'Cinzel', serif",
                    fontSize: '0.66rem', fontWeight: 700, letterSpacing: '0.1em', whiteSpace: 'nowrap',
                  }}>
                    Planning Secretariat
                  </div>
                  <div style={{ color: GOLD, fontSize: '0.56rem', letterSpacing: '0.08em', marginTop: 2, whiteSpace: 'nowrap', opacity: 0.9 }}>
                    Content Management System
                  </div>
                </div>
              </motion.div>
            )}
            {collapsed && (
              <div style={{
                width: 32, height: 32, borderRadius: 9,
                background: `linear-gradient(135deg, ${GOLD} 0%, #9A7520 100%)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 2px 10px rgba(199,154,43,0.4)`,
                fontSize: '0.75rem', color: '#fff', fontWeight: 900,
                fontFamily: "'Cinzel', serif",
              }}>P</div>
            )}
            {!collapsed && (
              <button
                onClick={() => setCollapsed(v => !v)}
                style={{
                  background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 8, padding: 7, cursor: 'pointer',
                  color: 'rgba(255,255,255,0.6)', display: 'flex', flexShrink: 0,
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.16)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}>
                <FiChevronsLeft size={14} />
              </button>
            )}
            {collapsed && (
              <button
                onClick={() => setCollapsed(v => !v)}
                style={{
                  position: 'absolute', top: 60, right: -10, zIndex: 50,
                  width: 20, height: 20, borderRadius: '50%',
                  background: GOLD, border: `2px solid ${MAROON}`,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                }}>
                <FiChevronsLeft size={10} color="#fff" style={{ transform: 'rotate(180deg)' }} />
              </button>
            )}
          </div>

          {/* Nav groups */}
          <nav style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '0.7rem 0' }}>
            {NAV_GROUPS.map(group => (
              <div key={group.label} style={{ marginBottom: '0.35rem' }}>
                {!collapsed && (
                  <div style={{
                    padding: '0.65rem 1rem 0.28rem',
                    fontSize: '0.56rem', fontWeight: 700, letterSpacing: '0.18em',
                    textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)',
                    display: 'flex', alignItems: 'center', gap: 8,
                  }}>
                    <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)', borderRadius: 1 }} />
                    {group.label}
                    <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)', borderRadius: 1 }} />
                  </div>
                )}
                {collapsed && <div style={{ height: 10 }} />}
                {group.items.map(item => {
                  const isActive = active === item.id
                  return (
                    <button
                      key={item.id}
                      onClick={() => { setActive(item.id); setSearch('') }}
                      title={collapsed ? item.label : undefined}
                      style={{
                        width: '100%', display: 'flex', alignItems: 'center',
                        gap: collapsed ? 0 : 10,
                        justifyContent: collapsed ? 'center' : 'flex-start',
                        padding: collapsed ? '11px 0' : '10px 1rem',
                        background: isActive
                          ? 'linear-gradient(90deg, rgba(199,154,43,0.18) 0%, rgba(199,154,43,0.08) 100%)'
                          : 'transparent',
                        border: 'none',
                        borderLeft: `3px solid ${isActive ? GOLD : 'transparent'}`,
                        color: isActive ? GOLD : 'rgba(255,255,255,0.5)',
                        fontSize: '0.81rem', fontWeight: isActive ? 600 : 400,
                        cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                        transition: 'all 0.15s', textAlign: 'left',
                        position: 'relative',
                      }}
                      onMouseEnter={e => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
                          e.currentTarget.style.color = 'rgba(255,255,255,0.9)'
                        }
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = isActive
                          ? 'linear-gradient(90deg, rgba(199,154,43,0.18) 0%, rgba(199,154,43,0.08) 100%)'
                          : 'transparent'
                        e.currentTarget.style.color = isActive ? GOLD : 'rgba(255,255,255,0.5)'
                      }}>
                      <item.icon size={15} style={{ flexShrink: 0 }} />
                      {!collapsed && (
                        <>
                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                            {item.label}
                          </span>
                          {isActive && (
                            <span style={{
                              width: 6, height: 6, borderRadius: '50%',
                              background: GOLD, flexShrink: 0, opacity: 0.8,
                              boxShadow: `0 0 6px ${GOLD}`,
                            }} />
                          )}
                        </>
                      )}
                      {collapsed && isActive && (
                        <span style={{
                          position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)',
                          width: 3, height: 20, borderRadius: '2px 0 0 2px',
                          background: GOLD, boxShadow: `0 0 8px ${GOLD}`,
                        }} />
                      )}
                    </button>
                  )
                })}
              </div>
            ))}
          </nav>

          {/* User + logout */}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.07)',
            padding: collapsed ? '0.9rem 0' : '0.85rem 0.9rem',
            flexShrink: 0,
            background: 'rgba(0,0,0,0.1)',
          }}>
            {!collapsed ? (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10, marginBottom: '0.7rem',
                padding: '8px 10px', borderRadius: 12,
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 9, flexShrink: 0,
                  background: `linear-gradient(135deg, ${GOLD}88 0%, ${GOLD}44 100%)`,
                  border: `1.5px solid ${GOLD}55`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.78rem', fontWeight: 800, color: GOLD,
                  fontFamily: "'Cinzel', serif",
                }}>
                  {(adminName[0] || 'A').toUpperCase()}
                </div>
                <div style={{ overflow: 'hidden', minWidth: 0 }}>
                  <div style={{ color: '#fff', fontSize: '0.8rem', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{adminName}</div>
                  <div style={{ color: GOLD, fontSize: '0.58rem', whiteSpace: 'nowrap', marginTop: 1, opacity: 0.85 }}>Admin</div>
                </div>
              </div>
            ) : (
              <div style={{
                display: 'flex', justifyContent: 'center', marginBottom: '0.7rem',
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 9,
                  background: `linear-gradient(135deg, ${GOLD}88 0%, ${GOLD}44 100%)`,
                  border: `1.5px solid ${GOLD}55`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.78rem', fontWeight: 800, color: GOLD,
                  fontFamily: "'Cinzel', serif",
                }}>
                  {(adminName[0] || 'A').toUpperCase()}
                </div>
              </div>
            )}
            <button
              onClick={logout}
              style={{
                width: '100%', display: 'flex', alignItems: 'center',
                justifyContent: collapsed ? 'center' : 'flex-start',
                gap: 8, padding: collapsed ? '8px 0' : '8px 10px',
                borderRadius: 9, background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.09)',
                color: 'rgba(255,255,255,0.42)', fontSize: '0.79rem',
                cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.15s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(220,38,38,0.16)'
                e.currentTarget.style.color = '#fca5a5'
                e.currentTarget.style.borderColor = 'rgba(220,38,38,0.3)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                e.currentTarget.style.color = 'rgba(255,255,255,0.42)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'
              }}>
              <FiLogOut size={13} />
              {!collapsed && 'Sign Out'}
            </button>
          </div>
        </motion.aside>

        {/* ── Main ─────────────────────────────────────────────────────────── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

          {/* Header */}
          <header style={{
            background: 'rgba(248,244,239,0.94)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(74,9,24,0.09)',
            padding: '0 1.5rem', height: 60,
            display: 'flex', alignItems: 'center', gap: 12,
            position: 'sticky', top: 0, zIndex: 20,
            boxShadow: '0 1px 0 rgba(74,9,24,0.06), 0 4px 20px rgba(74,9,24,0.05)',
          }}>
            {/* Breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{
                fontSize: '0.65rem', color: 'rgba(74,9,24,0.32)', fontWeight: 600,
                letterSpacing: '0.08em', textTransform: 'uppercase',
              }}>CMS</span>
              <FiChevronRight size={9} color="rgba(74,9,24,0.2)" />
              <span style={{
                fontSize: '0.84rem', fontWeight: 700, color: MAROON,
                borderBottom: `2px solid ${GOLD}`,
                paddingBottom: 1,
                lineHeight: 1.3,
              }}>
                {allNavItems.find(n => n.id === active)?.label}
              </span>
            </div>

            <div style={{ flex: 1 }} />

            {/* Notification bell */}
            <div ref={notifRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setNotifOpen(v => !v)}
                style={{
                  position: 'relative', background: notifOpen ? 'rgba(74,9,24,0.06)' : 'none',
                  border: '1px solid rgba(74,9,24,0.1)', borderRadius: 9,
                  padding: '7px 8px', cursor: 'pointer', color: MAROON,
                  display: 'flex', alignItems: 'center', transition: 'all 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(74,9,24,0.05)'}
                onMouseLeave={e => e.currentTarget.style.background = notifOpen ? 'rgba(74,9,24,0.06)' : 'none'}>
                <FiBell size={15} />
                <span style={{
                  position: 'absolute', top: 6, right: 6,
                  width: 7, height: 7, borderRadius: '50%',
                  background: '#ef4444', border: '1.5px solid #FCFBFA',
                }} />
              </button>

              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    style={{
                      position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                      width: 296, background: '#fff', borderRadius: 14,
                      boxShadow: '0 10px 40px rgba(74,9,24,0.15)',
                      border: '1px solid rgba(74,9,24,0.08)', overflow: 'hidden', zIndex: 50,
                    }}>
                    <div style={{
                      padding: '10px 14px', borderBottom: '1px solid rgba(74,9,24,0.07)',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: MAROON }}>Notifications</span>
                        <span style={{ background: '#ef4444', color: '#fff', fontSize: '0.6rem', fontWeight: 700, padding: '1px 6px', borderRadius: 100 }}>2</span>
                      </div>
                      <span style={{ fontSize: '0.65rem', color: GOLD, fontWeight: 600, cursor: 'pointer' }}>Mark all read</span>
                    </div>
                    {NOTIFICATIONS.map((n, i) => (
                      <div key={i}
                        style={{
                          padding: '10px 14px', borderBottom: i < NOTIFICATIONS.length - 1 ? '1px solid rgba(74,9,24,0.05)' : 'none',
                          display: 'flex', gap: 10, alignItems: 'flex-start',
                          background: n.unread ? 'rgba(199,154,43,0.04)' : 'transparent', cursor: 'pointer',
                          transition: 'background 0.12s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(74,9,24,0.03)'}
                        onMouseLeave={e => e.currentTarget.style.background = n.unread ? 'rgba(199,154,43,0.04)' : 'transparent'}>
                        <div style={{ width: 7, height: 7, borderRadius: '50%', background: n.unread ? GOLD : 'transparent', flexShrink: 0, marginTop: 6 }} />
                        <div>
                          <div style={{ fontSize: '0.78rem', color: MAROON, fontWeight: n.unread ? 600 : 400 }}>{n.title}</div>
                          <div style={{ fontSize: '0.67rem', color: 'rgba(74,9,24,0.38)', marginTop: 3 }}>{n.time}</div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User chip */}
            <button
              onClick={() => setActive('settings')}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '5px 12px 5px 6px', borderRadius: 10,
                border: '1px solid rgba(74,9,24,0.1)', background: 'rgba(74,9,24,0.02)',
                cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                transition: 'all 0.15s', boxShadow: '0 1px 4px rgba(74,9,24,0.06)',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(74,9,24,0.055)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(74,9,24,0.02)'}>
              <div style={{
                width: 26, height: 26, borderRadius: 7,
                background: `linear-gradient(135deg, ${GOLD} 0%, #9A7520 100%)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.65rem', fontWeight: 800, color: '#fff',
                fontFamily: "'Cinzel', serif",
              }}>{(adminName[0] || 'A').toUpperCase()}</div>
              <span style={{ fontSize: '0.79rem', fontWeight: 600, color: MAROON }}>{adminName}</span>
            </button>

            {/* Portal link */}
            <a href="/home" target="_blank" rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                padding: '6px 11px', borderRadius: 9,
                border: '1px solid rgba(74,9,24,0.1)', textDecoration: 'none',
                color: 'rgba(74,9,24,0.45)', fontSize: '0.75rem', transition: 'all 0.15s',
                boxShadow: '0 1px 4px rgba(74,9,24,0.05)',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = MAROON; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = MAROON }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(74,9,24,0.45)'; e.currentTarget.style.borderColor = 'rgba(74,9,24,0.1)' }}>
              <FiHome size={13} />
              <span style={{ display: 'none' }} className="sm:inline">Portal</span>
            </a>
          </header>

          {/* Page content */}
          <main style={{ flex: 1, padding: '1.6rem 1.75rem', overflowY: 'auto' }}>
            <AnimatePresence mode="wait">
              <motion.div key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}>

                {active === 'overview' && (
                  <Overview data={data} setActive={setActive} />
                )}
                {active === 'news' && (
                  <ContentSection
                    section="news" rows={data.news}
                    onDelete={id => confirmDelete('news', id)}
                    onAdd={() => setNewsModal(true)}
                    onEdit={row => setEditNewsData(row)}
                    onView={row => setViewNewsData(row)}
                    search={search} setSearch={setSearch}
                    columns={['Title', 'Category', 'Date', 'Status']}
                    rowCells={r => [r.title, r.category, r.date, <StatusBadge key="s" s={r.status} />]}
                  />
                )}
                {active === 'homenewsbar' && (
                  <CMSHomeNewsBar search={search} setSearch={setSearch} />
                )}
                {active === 'homeevents' && (
                  <CMSHomeEvents search={search} setSearch={setSearch} />
                )}
                {active === 'notices' && (
                  <ContentSection
                    section="notices" rows={data.notices}
                    onDelete={id => confirmDelete('notices', id)}
                    onAdd={() => setNoticeModal(true)}
                    onEdit={row => setEditNoticeData(row)}
                    onView={row => setViewNoticeData(row)}
                    search={search} setSearch={setSearch}
                    columns={['Title', 'Type', 'Date', 'Status']}
                    rowCells={r => [r.title, r.type || r.category, r.date, <StatusBadge key="s" s={r.status} />]}
                  />
                )}
                {active === 'downloads' && (
                  <DownloadsSection
                    rows={data.downloads}
                    onDelete={id => confirmDelete('downloads', id)}
                    onAdd={() => setDownloadModal(true)}
                    onEdit={item => setEditDownloadData(item)}
                    search={search} setSearch={setSearch}
                  />
                )}
                {active === 'gallery' && (
                  <GallerySection
                    rows={data.gallery}
                    onDelete={id => confirmDelete('gallery', id)}
                    onAdd={() => setAlbumModal(true)}
                    onEdit={album => setEditAlbumData(album)}
                    onView={album => setViewAlbumData(album)}
                  />
                )}
                {active === 'complaints' && (
                  <ComplaintsSection />
                )}
                {active === 'pages' && (
                  <PagesSection />
                )}
                {active === 'publish' && (
                  <PublishSiteSection />
                )}
                {active === 'settings' && (
                  <SettingsSection
                    onUsernameChange={name => setAdminName(name)}
                  />
                )}
                {active === 'policy' && (
                  <PolicySection />
                )}

              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* ── Add News modal ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {newsModal && (
          <ErrorBoundary>
            <NewsFormModal onClose={() => setNewsModal(false)} onSave={addNews} />
          </ErrorBoundary>
        )}
      </AnimatePresence>

      {/* ── Edit News modal ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {editNewsData && (
          <ErrorBoundary>
            <NewsFormModal
              initialData={editNewsData}
              onClose={() => setEditNewsData(null)}
              onSave={updateNews}
            />
          </ErrorBoundary>
        )}
      </AnimatePresence>

      {/* ── View News modal ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {viewNewsData && (
          <ErrorBoundary>
            <ViewNewsModal
              article={viewNewsData}
              onClose={() => setViewNewsData(null)}
              onEdit={a => { setViewNewsData(null); setEditNewsData(a) }}
            />
          </ErrorBoundary>
        )}
      </AnimatePresence>

      {/* ── Add Notice modal ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {noticeModal && (
          <ErrorBoundary>
            <NoticeFormModal onClose={() => setNoticeModal(false)} onSave={addNotice} />
          </ErrorBoundary>
        )}
      </AnimatePresence>

      {/* ── Edit Notice modal ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {editNoticeData && (
          <ErrorBoundary>
            <NoticeFormModal
              initialData={editNoticeData}
              onClose={() => setEditNoticeData(null)}
              onSave={updateNotice}
            />
          </ErrorBoundary>
        )}
      </AnimatePresence>

      {/* ── View Notice modal ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {viewNoticeData && (
          <ErrorBoundary>
            <ViewNoticeModal
              notice={viewNoticeData}
              onClose={() => setViewNoticeData(null)}
              onEdit={(n) => { setViewNoticeData(null); setEditNoticeData(n) }}
            />
          </ErrorBoundary>
        )}
      </AnimatePresence>

      {/* ── New Album modal ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {albumModal && (
          <NewAlbumModal onClose={() => setAlbumModal(false)} onSave={addAlbum} />
        )}
      </AnimatePresence>

      {/* ── Edit Album modal ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {editAlbumData && (
          <NewAlbumModal
            initialData={editAlbumData}
            onClose={() => setEditAlbumData(null)}
            onSave={updateAlbum}
          />
        )}
      </AnimatePresence>

      {/* ── View Album modal ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {viewAlbumData && (
          <ViewAlbumModal
            album={viewAlbumData}
            onClose={() => setViewAlbumData(null)}
            onEdit={(album) => { setViewAlbumData(null); setEditAlbumData(album) }}
          />
        )}
      </AnimatePresence>

      {/* ── Add Download modal ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {downloadModal && (
          <DownloadFormModal onClose={() => setDownloadModal(false)} onSave={addDownload} />
        )}
      </AnimatePresence>

      {/* ── Edit Download modal ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {editDownloadData && (
          <DownloadFormModal
            initialData={editDownloadData}
            onClose={() => setEditDownloadData(null)}
            onSave={updateDownload}
          />
        )}
      </AnimatePresence>

      {/* ── Delete confirmation modal ─────────────────────────────────────── */}
      <AnimatePresence>
        {deleteModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.48)',
              zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '1rem',
            }}>
            <motion.div
              initial={{ scale: 0.93, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.93, opacity: 0, y: 16 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: '#fff', borderRadius: 18, padding: '1.75rem',
                maxWidth: 420, width: '100%',
                boxShadow: '0 24px 64px rgba(0,0,0,0.22)',
              }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div style={{
                  width: 46, height: 46, borderRadius: 13, flexShrink: 0,
                  background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <FiTrash2 size={20} color="#DC2626" />
                </div>
                <div>
                  <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '1.15rem', fontWeight: 800, color: MAROON, marginBottom: '0.35rem',
                  }}>
                    Delete Record
                  </h3>
                  <p style={{ fontSize: '0.83rem', color: 'rgba(74,9,24,0.55)', lineHeight: 1.65 }}>
                    Are you sure you want to delete{' '}
                    <strong style={{ color: MAROON }}>&quot;{deleteModal.title}&quot;</strong>?
                    {' '}This action cannot be undone.
                  </p>
                </div>
              </div>
              <div style={{
                height: 1, background: 'rgba(74,9,24,0.06)', marginBottom: '1.25rem',
              }} />
              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                <button
                  onClick={() => setDeleteModal(null)}
                  style={{
                    padding: '9px 20px', borderRadius: 10,
                    border: '1px solid rgba(74,9,24,0.14)', background: 'transparent',
                    color: 'rgba(74,9,24,0.55)', fontSize: '0.83rem', cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif', fontWeight: 500, transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(74,9,24,0.04)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  Cancel
                </button>
                <motion.button
                  whileHover={{ y: -1, boxShadow: '0 6px 20px rgba(220,38,38,0.35)' }}
                  whileTap={{ scale: 0.97 }}
                  onClick={executeDelete}
                  style={{
                    padding: '9px 20px', borderRadius: 10, border: 'none',
                    background: 'linear-gradient(135deg, #DC2626 0%, #b91c1c 100%)',
                    color: '#fff', fontSize: '0.83rem', cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif', fontWeight: 600,
                    display: 'flex', alignItems: 'center', gap: 7,
                    boxShadow: '0 3px 12px rgba(220,38,38,0.3)',
                  }}>
                  <FiTrash2 size={13} /> Delete
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ── Overview ──────────────────────────────────────────────────────────────────
function Overview({ data, setActive }) {
  const { isLive } = useSitePublish()

  const publishedNews      = data.news.filter(n => n.status === 'Published').length
  const publishedNotices   = data.notices.filter(n => n.status === 'Active').length
  const publishedDownloads = data.downloads.filter(d => d.status === 'Active' || d.status === 'Published').length
  const publishedCount     = publishedNews + publishedNotices

  const draftNews      = data.news.filter(n => n.status === 'Draft').length
  const draftNotices   = data.notices.filter(n => n.status === 'Draft').length
  const draftDownloads = data.downloads.filter(d => d.status === 'Draft').length
  const totalDraft     = draftNews + draftNotices + draftDownloads

  const holdMap      = (() => { try { return JSON.parse(localStorage.getItem('cms_page_hold') || '{}') } catch { return {} } })()
  const pendingPages = Object.values(holdMap).filter(Boolean).length

  const totalContent = data.news.length + data.notices.length + data.downloads.length + data.gallery.length
  const healthScore  = totalContent === 0 ? 0 : Math.round((publishedCount / Math.max(data.news.length + data.notices.length, 1)) * 100)

  const METRIC_CARDS = [
    {
      label: 'Published Content', value: publishedCount,
      total: Math.max(data.news.length + data.notices.length, 1),
      icon: FiActivity, color: '#fff', iconBg: 'rgba(255,255,255,0.18)',
      gradient: `linear-gradient(135deg, ${MAROON} 0%, #7C1A32 60%, #9A2540 100%)`,
      border: 'rgba(199,154,43,0.3)',
      trend: totalDraft > 0 ? `${totalDraft} awaiting publish` : 'All content live',
      trendColor: totalDraft > 0 ? '#FCD34D' : '#6EE7B7',
      featured: true, onClick: null,
    },
    {
      label: 'News Articles', value: data.news.length,
      total: Math.max(data.news.length, 1),
      icon: FiFileText, color: '#1e40af', iconBg: 'rgba(30,64,175,0.1)',
      gradient: null, border: 'rgba(74,9,24,0.07)',
      trend: draftNews > 0 ? `${draftNews} draft${draftNews > 1 ? 's' : ''}` : `${publishedNews} published`,
      trendColor: draftNews > 0 ? '#b45309' : '#166534', onClick: 'news',
    },
    {
      label: 'Active Notices', value: publishedNotices,
      total: Math.max(data.notices.length, 1),
      icon: FiBell, color: '#166534', iconBg: 'rgba(22,101,52,0.1)',
      gradient: null, border: 'rgba(74,9,24,0.07)',
      trend: draftNotices > 0 ? `${draftNotices} pending` : `${data.notices.length} total`,
      trendColor: draftNotices > 0 ? '#b45309' : '#166534', onClick: 'notices',
    },
    {
      label: 'Pages On Hold', value: pendingPages, total: 39,
      icon: FiLayout, color: pendingPages > 0 ? '#dc2626' : '#7c3aed',
      iconBg: pendingPages > 0 ? 'rgba(220,38,38,0.1)' : 'rgba(124,58,237,0.1)',
      gradient: null, border: pendingPages > 0 ? 'rgba(220,38,38,0.18)' : 'rgba(74,9,24,0.07)',
      trend: pendingPages > 0 ? 'Hidden from public' : 'All pages visible',
      trendColor: pendingPages > 0 ? '#dc2626' : '#166534', onClick: 'pages',
    },
    {
      label: 'Total Assets', value: totalContent, total: Math.max(totalContent, 1),
      icon: FiPackage, color: '#7c3aed', iconBg: 'rgba(124,58,237,0.1)',
      gradient: null, border: 'rgba(74,9,24,0.07)',
      trend: `${data.gallery.length} albums · ${data.downloads.length} files`,
      trendColor: '#7c3aed', onClick: null,
    },
    {
      label: 'Downloads', value: data.downloads.length, total: Math.max(data.downloads.length, 1),
      icon: FiDownload, color: '#0e7490', iconBg: 'rgba(14,116,144,0.1)',
      gradient: null, border: 'rgba(74,9,24,0.07)',
      trend: draftDownloads > 0 ? `${draftDownloads} not published` : `${publishedDownloads} active`,
      trendColor: draftDownloads > 0 ? '#b45309' : '#0e7490', onClick: 'downloads',
    },
  ]

  const QUICK_ACTIONS = [
    { label: 'Add News',     icon: FiPlus,   section: 'news'        },
    { label: 'Post Notice',  icon: FiBell,   section: 'notices'     },
    { label: 'News Bar',     icon: FiRadio,  section: 'homenewsbar' },
    { label: 'Gallery',      icon: FiImage,  section: 'gallery'     },
    { label: 'Page Hold',    icon: FiLayout, section: 'pages'       },
    { label: 'Publish Site', icon: FiGlobe,  section: 'publish'     },
  ]

  const waitingItems = [
    ...data.news.filter(n => n.status === 'Draft').map(n => ({ ...n, _type: 'News', _section: 'news' })),
    ...data.notices.filter(n => n.status === 'Draft').map(n => ({ ...n, _type: 'Notice', _section: 'notices' })),
    ...data.downloads.filter(d => d.status === 'Draft').map(d => ({ ...d, _type: 'Download', _section: 'downloads' })),
  ]

  const heldPageKeys = Object.entries(holdMap).filter(([, v]) => v).map(([k]) => k)
  const PAGE_LABELS = {
    'about': 'About Us', 'about__overview': 'Overview',
    'about__organization-structure': 'Organization Structure',
    'about__functions-duties': 'Functions & Duties', 'about__history': 'History',
    'about__deputy-secretary-planning': 'Deputy Chief Secretary',
    'about__director-planning': 'Director – Planning',
    'about__deputy-directors': 'Deputy Directors',
    'about__deputy-directors__1': 'DD I', 'about__deputy-directors__2': 'DD II',
    'about__deputy-directors__3': 'DD III', 'about__deputy-directors__4': 'DD IV',
    'about__deputy-directors__5': 'DD V', 'about__deputy-directors__6': 'DD VI',
    'about-deputy-secretary': 'About Deputy Secretary',
    'departments': 'Departments', 'departments__accounts': 'Accounts Division',
    'departments__administration': 'Administration Division',
    'departments__development': 'Development Division',
    'departments__head-administration': 'Head of Administration',
    'departments__head-accounts': 'Head of Accounts',
    'news': 'Media Center', 'notices': 'Official Notices', 'downloads': 'Downloads',
    'gallery': 'Photo Gallery', 'documents': 'Documents', 'contact': 'Contact Us',
  }

  return (
    <div>
      {/* ── Hero Banner ──────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.32 }}
        style={{
          background: `linear-gradient(130deg, ${MAROON2} 0%, ${MAROON} 55%, #7C1A32 100%)`,
          borderRadius: 22, padding: '1.6rem 2rem', marginBottom: '1.4rem',
          overflow: 'hidden', position: 'relative',
          boxShadow: `0 8px 40px rgba(74,9,24,0.24), 0 2px 0 rgba(199,154,43,0.3) inset`,
        }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent 0%, ${GOLD} 30%, #F0D060 50%, ${GOLD} 70%, transparent 100%)` }} />
        <div style={{ position: 'absolute', right: -50, top: -50, width: 220, height: 220, borderRadius: '50%', background: 'rgba(199,154,43,0.06)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 80, bottom: -70, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: -30, bottom: -40, width: 140, height: 140, borderRadius: '50%', background: 'rgba(199,154,43,0.04)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <p style={{ fontSize: '0.63rem', fontWeight: 700, color: GOLD, letterSpacing: '0.16em', textTransform: 'uppercase', margin: '0 0 7px' }}>
              Content Management System
            </p>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.25rem, 2.5vw, 1.6rem)', fontWeight: 800, color: '#fff', margin: '0 0 8px', lineHeight: 1.2 }}>
              {getGreeting()},{' '}<span style={{ color: GOLD }}>{localStorage.getItem('cms_username') || 'Admin'}</span>
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
              <p style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.5)', margin: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
                <FiCalendar size={11} style={{ color: GOLD }} /> {friendlyDate()}
              </p>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em', padding: '3px 10px', borderRadius: 100, background: isLive ? 'rgba(34,197,94,0.18)' : 'rgba(239,68,68,0.18)', border: `1px solid ${isLive ? 'rgba(34,197,94,0.35)' : 'rgba(239,68,68,0.35)'}`, color: isLive ? '#86efac' : '#fca5a5' }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: isLive ? '#22c55e' : '#ef4444', display: 'inline-block', boxShadow: isLive ? '0 0 6px #22c55e' : '0 0 6px #ef4444' }} />
                {isLive ? 'Site Live' : 'Coming Soon'}
              </span>
              {totalDraft > 0 && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: '0.65rem', fontWeight: 700, padding: '3px 10px', borderRadius: 100, background: 'rgba(251,191,36,0.18)', border: '1px solid rgba(251,191,36,0.35)', color: '#fde68a' }}>
                  <FiClock size={9} /> {totalDraft} Awaiting Publish
                </span>
              )}
              {pendingPages > 0 && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: '0.65rem', fontWeight: 700, padding: '3px 10px', borderRadius: 100, background: 'rgba(239,68,68,0.18)', border: '1px solid rgba(239,68,68,0.35)', color: '#fca5a5' }}>
                  <FiLayout size={9} /> {pendingPages} Pages On Hold
                </span>
              )}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
            {QUICK_ACTIONS.map(a => (
              <motion.button key={a.label} whileHover={{ y: -2, boxShadow: '0 6px 20px rgba(0,0,0,0.3)' }} whileTap={{ scale: 0.95 }}
                onClick={() => setActive(a.section)}
                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 13px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.16)', background: 'rgba(255,255,255,0.09)', backdropFilter: 'blur(8px)', color: '#fff', fontSize: '0.73rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.15s', whiteSpace: 'nowrap' }}>
                <a.icon size={11} /> {a.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Content health bar */}
        <div style={{ position: 'relative', marginTop: 18, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 7 }}>
            <span style={{ fontSize: '0.63rem', color: 'rgba(255,255,255,0.45)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Content Health</span>
            <span style={{ fontSize: '0.68rem', color: GOLD, fontWeight: 700 }}>{healthScore}%</span>
          </div>
          <div style={{ height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 100, overflow: 'hidden' }}>
            <motion.div initial={{ width: 0 }} animate={{ width: `${healthScore}%` }} transition={{ delay: 0.5, duration: 1.2, ease: 'easeOut' }}
              style={{ height: '100%', borderRadius: 100, background: `linear-gradient(90deg, ${GOLD} 0%, #F0D060 60%, #FFF7CD 100%)`, boxShadow: `0 0 10px ${GOLD}` }} />
          </div>
        </div>
      </motion.div>

      {/* ── Metric Cards ─────────────────────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: '1rem', marginBottom: '1.4rem' }}>
        {METRIC_CARDS.map((mc, i) => (
          <motion.div key={mc.label}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            whileHover={{ y: -4, boxShadow: mc.featured ? '0 18px 50px rgba(74,9,24,0.3)' : '0 12px 36px rgba(74,9,24,0.13)' }}
            onClick={() => mc.onClick && setActive(mc.onClick)}
            style={{
              background: mc.gradient || '#fff', borderRadius: 18, padding: '1.25rem 1.35rem',
              border: `1px solid ${mc.border}`,
              boxShadow: mc.featured ? '0 8px 28px rgba(74,9,24,0.2)' : '0 2px 14px rgba(74,9,24,0.06)',
              overflow: 'hidden', position: 'relative',
              cursor: mc.onClick ? 'pointer' : 'default', transition: 'box-shadow 0.2s, transform 0.2s',
            }}>
            {mc.featured && (
              <>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />
                <div style={{ position: 'absolute', right: -24, bottom: -24, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
              </>
            )}
            {mc.label === 'Pages On Hold' && mc.value > 0 && (
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, #dc2626, transparent)' }} />
            )}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ width: 44, height: 44, borderRadius: 13, background: mc.featured ? 'rgba(255,255,255,0.16)' : mc.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', border: mc.featured ? '1px solid rgba(255,255,255,0.2)' : 'none' }}>
                <mc.icon size={19} color={mc.featured ? '#fff' : mc.color} />
              </div>
              <span style={{ fontSize: '0.61rem', fontWeight: 700, color: mc.trendColor, textAlign: 'right', lineHeight: 1.5, maxWidth: 108, background: mc.featured ? 'rgba(199,154,43,0.15)' : `${mc.color}12`, padding: '2px 8px', borderRadius: 6 }}>
                {mc.trend}
              </span>
            </div>
            <div style={{ fontSize: '2.1rem', fontWeight: 900, lineHeight: 1, marginBottom: 4, color: mc.featured ? '#fff' : (mc.label === 'Pages On Hold' && mc.value > 0 ? '#dc2626' : MAROON), fontFamily: "'Cinzel', serif" }}>
              {String(mc.value).padStart(2, '0')}
            </div>
            <div style={{ fontSize: '0.73rem', color: mc.featured ? 'rgba(255,255,255,0.65)' : 'rgba(74,9,24,0.48)', marginBottom: '0.85rem', fontWeight: 500 }}>
              {mc.label}
            </div>
            <div style={{ height: 3, background: mc.featured ? 'rgba(255,255,255,0.15)' : 'rgba(74,9,24,0.07)', borderRadius: 100, overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(Math.round((mc.value / mc.total) * 100), 100)}%` }}
                transition={{ delay: i * 0.06 + 0.4, duration: 1.1, ease: 'easeOut' }}
                style={{ height: '100%', borderRadius: 100, background: mc.featured ? `linear-gradient(90deg, ${GOLD}, #F0D060)` : (mc.label === 'Pages On Hold' && mc.value > 0 ? '#dc2626' : mc.color), boxShadow: mc.featured ? `0 0 8px ${GOLD}` : 'none' }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Waiting for Publish + Pages On Hold ──────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1rem', marginBottom: '1.4rem' }}>

        {/* Waiting for Publish */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          style={{ background: '#fff', borderRadius: 18, border: waitingItems.length > 0 ? '1px solid rgba(180,83,9,0.22)' : '1px solid rgba(74,9,24,0.07)', boxShadow: waitingItems.length > 0 ? '0 4px 20px rgba(180,83,9,0.09)' : '0 2px 14px rgba(74,9,24,0.06)', overflow: 'hidden' }}>
          <div style={{ padding: '0.95rem 1.25rem', borderBottom: '1px solid rgba(74,9,24,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: waitingItems.length > 0 ? 'rgba(180,83,9,0.04)' : 'rgba(74,9,24,0.015)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <div style={{ width: 3, height: 16, borderRadius: 2, background: waitingItems.length > 0 ? 'linear-gradient(#b45309, #d97706)' : `linear-gradient(${MAROON}, ${GOLD})` }} />
              <FiInbox size={13} color={waitingItems.length > 0 ? '#b45309' : GOLD} />
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: waitingItems.length > 0 ? '#92400e' : MAROON }}>Waiting for Publish</span>
              {waitingItems.length > 0 && (
                <span style={{ fontSize: '0.62rem', fontWeight: 800, background: '#b45309', color: '#fff', borderRadius: 100, padding: '1px 7px', minWidth: 18, textAlign: 'center' }}>{waitingItems.length}</span>
              )}
            </div>
            {waitingItems.length > 0 && <span style={{ fontSize: '0.67rem', color: '#92400e', fontWeight: 600, background: 'rgba(180,83,9,0.1)', padding: '2px 8px', borderRadius: 6 }}>Draft</span>}
          </div>
          {waitingItems.length === 0 ? (
            <div style={{ padding: '2rem 1.2rem', textAlign: 'center' }}>
              <div style={{ width: 46, height: 46, borderRadius: 13, margin: '0 auto 10px', background: 'rgba(22,101,52,0.08)', border: '1px dashed rgba(22,101,52,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FiCheck size={20} color="#16a34a" />
              </div>
              <div style={{ fontSize: '0.83rem', fontWeight: 700, color: '#166534', marginBottom: 4 }}>All content is published</div>
              <div style={{ fontSize: '0.71rem', color: 'rgba(74,9,24,0.3)' }}>No drafts waiting for approval</div>
            </div>
          ) : (
            <div style={{ maxHeight: 260, overflowY: 'auto' }}>
              {waitingItems.map((item, idx) => (
                <motion.div key={`${item._type}-${item.id}`} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.04 }}
                  onClick={() => setActive(item._section)}
                  style={{ padding: '0.75rem 1.25rem', borderBottom: idx < waitingItems.length - 1 ? '1px solid rgba(74,9,24,0.04)' : 'none', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', transition: 'background 0.12s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(180,83,9,0.04)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <span style={{ fontSize: '0.57rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '2px 7px', borderRadius: 5, flexShrink: 0, background: item._type === 'News' ? 'rgba(30,64,175,0.1)' : item._type === 'Notice' ? 'rgba(22,101,52,0.1)' : 'rgba(14,116,144,0.1)', color: item._type === 'News' ? '#1e40af' : item._type === 'Notice' ? '#166534' : '#0e7490' }}>
                    {item._type}
                  </span>
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1, fontSize: '0.8rem', fontWeight: 500, color: MAROON }}>{item.title}</span>
                  <span style={{ fontSize: '0.62rem', fontWeight: 700, background: 'rgba(180,83,9,0.1)', color: '#92400e', padding: '2px 7px', borderRadius: 5, flexShrink: 0 }}>Draft</span>
                  <FiChevronRight size={13} color="rgba(74,9,24,0.3)" style={{ flexShrink: 0 }} />
                </motion.div>
              ))}
            </div>
          )}
          {waitingItems.length > 0 && (
            <div style={{ padding: '8px 1.25rem', borderTop: '1px solid rgba(74,9,24,0.05)', display: 'flex', gap: 12, background: 'rgba(74,9,24,0.01)' }}>
              {[{ label: 'News', count: draftNews, color: '#1e40af' }, { label: 'Notices', count: draftNotices, color: '#166534' }, { label: 'Downloads', count: draftDownloads, color: '#0e7490' }].filter(s => s.count > 0).map(s => (
                <span key={s.label} style={{ fontSize: '0.68rem', color: s.color, fontWeight: 600 }}>{s.count} {s.label}</span>
              ))}
            </div>
          )}
        </motion.div>

        {/* Pages On Hold */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }}
          style={{ background: '#fff', borderRadius: 18, border: heldPageKeys.length > 0 ? '1px solid rgba(220,38,38,0.2)' : '1px solid rgba(74,9,24,0.07)', boxShadow: heldPageKeys.length > 0 ? '0 4px 20px rgba(220,38,38,0.08)' : '0 2px 14px rgba(74,9,24,0.06)', overflow: 'hidden' }}>
          <div style={{ padding: '0.95rem 1.25rem', borderBottom: '1px solid rgba(74,9,24,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: heldPageKeys.length > 0 ? 'rgba(220,38,38,0.03)' : 'rgba(74,9,24,0.015)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <div style={{ width: 3, height: 16, borderRadius: 2, background: heldPageKeys.length > 0 ? 'linear-gradient(#dc2626, #ef4444)' : `linear-gradient(${MAROON}, ${GOLD})` }} />
              <FiLayout size={13} color={heldPageKeys.length > 0 ? '#dc2626' : GOLD} />
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: heldPageKeys.length > 0 ? '#991b1b' : MAROON }}>Pending Pages</span>
              {heldPageKeys.length > 0 && (
                <span style={{ fontSize: '0.62rem', fontWeight: 800, background: '#dc2626', color: '#fff', borderRadius: 100, padding: '1px 7px', minWidth: 18, textAlign: 'center' }}>{heldPageKeys.length}</span>
              )}
            </div>
            <button onClick={() => setActive('pages')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.7rem', color: GOLD, fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>Manage →</button>
          </div>
          {heldPageKeys.length === 0 ? (
            <div style={{ padding: '2rem 1.2rem', textAlign: 'center' }}>
              <div style={{ width: 46, height: 46, borderRadius: 13, margin: '0 auto 10px', background: 'rgba(22,101,52,0.08)', border: '1px dashed rgba(22,101,52,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FiGlobe size={20} color="#16a34a" />
              </div>
              <div style={{ fontSize: '0.83rem', fontWeight: 700, color: '#166534', marginBottom: 4 }}>All pages are live</div>
              <div style={{ fontSize: '0.71rem', color: 'rgba(74,9,24,0.3)' }}>No pages are hidden from the public</div>
            </div>
          ) : (
            <div style={{ maxHeight: 260, overflowY: 'auto' }}>
              {heldPageKeys.slice(0, 10).map((key, idx) => (
                <motion.div key={key} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.04 }}
                  onClick={() => setActive('pages')}
                  style={{ padding: '0.72rem 1.25rem', borderBottom: idx < Math.min(heldPageKeys.length, 10) - 1 ? '1px solid rgba(74,9,24,0.04)' : 'none', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', transition: 'background 0.12s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(220,38,38,0.03)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#dc2626', flexShrink: 0 }} />
                  <span style={{ flex: 1, fontSize: '0.8rem', fontWeight: 500, color: '#991b1b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{PAGE_LABELS[key] || key}</span>
                  <span style={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', background: 'rgba(220,38,38,0.1)', color: '#dc2626', border: '1px solid rgba(220,38,38,0.2)', borderRadius: 100, padding: '1px 7px', flexShrink: 0 }}>On Hold</span>
                </motion.div>
              ))}
              {heldPageKeys.length > 10 && (
                <div style={{ padding: '8px 1.25rem', fontSize: '0.72rem', color: 'rgba(74,9,24,0.4)', textAlign: 'center' }}>+{heldPageKeys.length - 10} more pages on hold</div>
              )}
            </div>
          )}
          {heldPageKeys.length > 0 && (
            <div style={{ padding: '8px 1.25rem', borderTop: '1px solid rgba(74,9,24,0.05)', background: 'rgba(220,38,38,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.68rem', color: '#991b1b', fontWeight: 600 }}>{heldPageKeys.length} of 39 pages hidden</span>
              <div style={{ height: 4, width: 80, background: 'rgba(220,38,38,0.12)', borderRadius: 100, overflow: 'hidden' }}>
                <div style={{ height: '100%', borderRadius: 100, background: '#dc2626', width: `${Math.min((heldPageKeys.length / 39) * 100, 100)}%`, transition: 'width 0.8s ease' }} />
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* ── Content Breakdown + Recent Content ───────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem', marginBottom: '1.4rem' }}>

        {/* Content Breakdown */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.44 }}
          style={{ background: '#fff', borderRadius: 18, border: '1px solid rgba(74,9,24,0.07)', boxShadow: '0 2px 14px rgba(74,9,24,0.06)', overflow: 'hidden' }}>
          <div style={{ padding: '0.95rem 1.25rem', borderBottom: '1px solid rgba(74,9,24,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(74,9,24,0.015)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <div style={{ width: 3, height: 16, borderRadius: 2, background: `linear-gradient(${MAROON}, ${GOLD})` }} />
              <FiBarChart2 size={13} color={GOLD} />
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: MAROON }}>Content Breakdown</span>
            </div>
            <span style={{ fontSize: '0.66rem', color: 'rgba(74,9,24,0.35)', fontWeight: 500 }}>{totalContent} total items</span>
          </div>
          <div style={{ padding: '1.25rem' }}>
            {[
              { label: 'News', published: publishedNews, draft: draftNews, total: data.news.length, color: '#1e40af', section: 'news' },
              { label: 'Notices', published: publishedNotices, draft: draftNotices, total: data.notices.length, color: '#166534', section: 'notices' },
              { label: 'Downloads', published: publishedDownloads, draft: draftDownloads, total: data.downloads.length, color: '#0e7490', section: 'downloads' },
              { label: 'Gallery', published: data.gallery.length, draft: 0, total: data.gallery.length, color: '#7c3aed', section: 'gallery' },
            ].map((row, ri) => (
              <div key={row.label} onClick={() => setActive(row.section)} style={{ marginBottom: ri < 3 ? 14 : 0, cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: row.color, display: 'inline-block' }} />
                    <span style={{ fontSize: '0.77rem', fontWeight: 600, color: MAROON }}>{row.label}</span>
                    {row.draft > 0 && <span style={{ fontSize: '0.58rem', fontWeight: 700, background: 'rgba(180,83,9,0.1)', color: '#92400e', padding: '1px 6px', borderRadius: 4 }}>{row.draft} draft</span>}
                  </div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'rgba(74,9,24,0.5)' }}>{row.published}/{row.total}</span>
                </div>
                <div style={{ height: 6, background: 'rgba(74,9,24,0.06)', borderRadius: 100, overflow: 'hidden' }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${row.total > 0 ? Math.round((row.published / row.total) * 100) : 0}%` }} transition={{ delay: 0.5 + ri * 0.1, duration: 1, ease: 'easeOut' }}
                    style={{ height: '100%', background: row.color, borderRadius: 100 }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Latest News + Notices */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            { label: 'Latest News', key: 'news', items: data.news.slice(0, 3), icon: FiFileText },
            { label: 'Recent Notices', key: 'notices', items: data.notices.slice(0, 2), icon: FiBell },
          ].map(pcard => (
            <motion.div key={pcard.key} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              style={{ background: '#fff', borderRadius: 18, flex: 1, border: '1px solid rgba(74,9,24,0.07)', boxShadow: '0 2px 14px rgba(74,9,24,0.06)', overflow: 'hidden' }}>
              <div style={{ padding: '0.9rem 1.2rem', borderBottom: '1px solid rgba(74,9,24,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(74,9,24,0.015)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 3, height: 16, borderRadius: 2, background: `linear-gradient(${MAROON}, ${GOLD})` }} />
                  <pcard.icon size={13} color={GOLD} />
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: MAROON }}>{pcard.label}</span>
                </div>
                <button onClick={() => setActive(pcard.key)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.7rem', color: GOLD, fontWeight: 700, fontFamily: 'Inter, sans-serif', letterSpacing: '0.02em' }}>View all →</button>
              </div>
              {pcard.items.length === 0 ? (
                <div style={{ padding: '1.1rem 1.2rem', fontSize: '0.78rem', color: 'rgba(74,9,24,0.3)', textAlign: 'center' }}>No records yet</div>
              ) : pcard.items.map((item, idx) => (
                <div key={item.id} style={{ padding: '0.7rem 1.2rem', borderBottom: idx < pcard.items.length - 1 ? '1px solid rgba(74,9,24,0.04)' : 'none', display: 'flex', alignItems: 'center', gap: 9, transition: 'background 0.12s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(74,9,24,0.02)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: GOLD, flexShrink: 0, opacity: 0.8 }} />
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1, fontWeight: 500, fontSize: '0.78rem', color: MAROON }}>{item.title}</span>
                  {item.status && <StatusBadge s={item.status} />}
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── System Status Bar ─────────────────────────────────────────────────── */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
        style={{ background: `linear-gradient(135deg, rgba(74,9,24,0.04) 0%, rgba(199,154,43,0.04) 100%)`, borderRadius: 16, padding: '1rem 1.5rem', border: '1px solid rgba(74,9,24,0.07)', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 160 }}>
          <FiTrendingUp size={14} color={GOLD} />
          <span style={{ fontSize: '0.74rem', fontWeight: 700, color: MAROON }}>System Status</span>
        </div>
        {[
          { label: 'Site',    value: isLive ? 'Live' : 'Offline',   ok: isLive },
          { label: 'Drafts',  value: `${totalDraft} pending`,       ok: totalDraft === 0 },
          { label: 'Pages',   value: `${pendingPages} on hold`,      ok: pendingPages === 0 },
          { label: 'Content', value: `${totalContent} items`,       ok: true },
          { label: 'Health',  value: `${healthScore}%`,             ok: healthScore >= 80 },
        ].map(stat => (
          <div key={stat.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: stat.ok ? '#22c55e' : '#f59e0b', display: 'inline-block', flexShrink: 0, boxShadow: stat.ok ? '0 0 5px #22c55e' : '0 0 5px #f59e0b' }} />
            <span style={{ fontSize: '0.67rem', color: 'rgba(74,9,24,0.45)', fontWeight: 500 }}>{stat.label}:</span>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: stat.ok ? '#166534' : '#92400e' }}>{stat.value}</span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

// ── Content section with table ────────────────────────────────────────────────
function ContentSection({ section, rows, onDelete, onAdd, onEdit, onView, columns, rowCells, search, setSearch }) {
  const label    = section.charAt(0).toUpperCase() + section.slice(1)
  const [selected, setSelected] = useState([])

  const filtered = rows.filter(r =>
    Object.values(r).some(v => String(v).toLowerCase().includes(search.toLowerCase()))
  )

  const toggleSelect = id =>
    setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id])
  const allSelected  = filtered.length > 0 && filtered.every(r => selected.includes(r.id))
  const toggleAll    = () => setSelected(allSelected ? [] : filtered.map(r => r.id))

  return (
    <div>
      {/* Premium section header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.4rem', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 }}>
            <div style={{ width: 3, height: 24, borderRadius: 2, background: `linear-gradient(${MAROON}, ${GOLD})`, flexShrink: 0 }} />
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.35rem', fontWeight: 800, color: MAROON, margin: 0 }}>
              {label}
            </h1>
          </div>
          <p style={{ fontSize: '0.76rem', color: 'rgba(74,9,24,0.4)', marginLeft: 13 }}>
            <span style={{ fontWeight: 700, color: MAROON }}>{rows.length}</span> record{rows.length !== 1 ? 's' : ''} total
            {selected.length > 0 && (
              <span style={{
                color: GOLD, fontWeight: 600, marginLeft: 8,
                background: 'rgba(199,154,43,0.1)', padding: '1px 8px', borderRadius: 5,
              }}>· {selected.length} selected</span>
            )}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Search bar */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: '#fff', border: '1px solid rgba(74,9,24,0.11)',
            borderRadius: 11, padding: '8px 13px',
            boxShadow: '0 1px 6px rgba(74,9,24,0.05)',
          }}>
            <FiSearch size={13} color="rgba(74,9,24,0.32)" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search records…"
              style={{
                border: 'none', outline: 'none', fontSize: '0.8rem',
                color: MAROON, background: 'transparent', width: 165,
                fontFamily: 'Inter, sans-serif',
              }}
            />
            {search && (
              <button onClick={() => setSearch('')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(74,9,24,0.38)', padding: 0, display: 'flex' }}>
                <FiX size={13} />
              </button>
            )}
          </div>
          {/* Add button */}
          <motion.button
            whileHover={{ y: -2, boxShadow: '0 10px 28px rgba(74,9,24,0.36)' }}
            whileTap={{ scale: 0.97 }}
            onClick={onAdd}
            style={{
              display: 'flex', alignItems: 'center', gap: 7,
              padding: '9px 18px', borderRadius: 11, border: 'none',
              background: `linear-gradient(135deg, ${MAROON} 0%, #7C1A32 100%)`,
              color: '#fff', fontSize: '0.8rem', fontWeight: 600,
              cursor: 'pointer', fontFamily: 'Inter, sans-serif',
              boxShadow: '0 4px 16px rgba(74,9,24,0.3)',
              position: 'relative', overflow: 'hidden',
            }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 1,
              background: 'rgba(255,255,255,0.2)',
            }} />
            <FiPlus size={14} /> Add New
          </motion.button>
        </div>
      </div>

      {/* Table card */}
      <div style={{
        background: '#fff', borderRadius: 18, overflow: 'hidden',
        border: '1px solid rgba(74,9,24,0.07)',
        boxShadow: '0 4px 20px rgba(74,9,24,0.07)',
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{
                background: `linear-gradient(90deg, rgba(74,9,24,0.03) 0%, rgba(74,9,24,0.02) 100%)`,
                borderBottom: '1px solid rgba(74,9,24,0.07)',
              }}>
                <th style={{ padding: '12px 16px', width: 40 }}>
                  <div
                    onClick={toggleAll}
                    style={{
                      width: 17, height: 17, borderRadius: 5,
                      border: `2px solid ${allSelected ? GOLD : 'rgba(74,9,24,0.18)'}`,
                      background: allSelected ? GOLD : 'transparent',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.15s',
                    }}>
                    {allSelected && <FiCheck size={9} color="#fff" strokeWidth={3} />}
                  </div>
                </th>
                {columns.map(c => (
                  <th key={c} style={{
                    padding: '12px 16px', textAlign: 'left',
                    fontSize: '0.63rem', fontWeight: 800, color: 'rgba(74,9,24,0.38)',
                    textTransform: 'uppercase', letterSpacing: '0.11em', whiteSpace: 'nowrap',
                  }}>{c}</th>
                ))}
                <th style={{
                  padding: '12px 16px', textAlign: 'right',
                  fontSize: '0.63rem', fontWeight: 800, color: 'rgba(74,9,24,0.38)',
                  textTransform: 'uppercase', letterSpacing: '0.11em',
                }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={columns.length + 2} style={{ padding: '4rem', textAlign: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                      <div style={{
                        width: 60, height: 60, borderRadius: 18,
                        background: 'rgba(74,9,24,0.05)',
                        border: '1px dashed rgba(74,9,24,0.14)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <FiSearch size={24} color="rgba(74,9,24,0.22)" />
                      </div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'rgba(74,9,24,0.35)' }}>No records found</div>
                      <div style={{ fontSize: '0.74rem', color: 'rgba(74,9,24,0.25)' }}>Try adjusting your search query</div>
                    </div>
                  </td>
                </tr>
              )}
              {filtered.map((row, i) => {
                const isSel = selected.includes(row.id)
                return (
                  <motion.tr key={row.id}
                    initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.035 }}
                    style={{
                      borderBottom: i < filtered.length - 1 ? '1px solid rgba(74,9,24,0.045)' : 'none',
                      background: isSel ? 'rgba(199,154,43,0.05)' : 'transparent',
                      transition: 'background 0.12s',
                    }}
                    onMouseEnter={e => { if (!isSel) e.currentTarget.style.background = 'rgba(74,9,24,0.018)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = isSel ? 'rgba(199,154,43,0.05)' : 'transparent' }}>
                    <td style={{ padding: '12px 16px' }}>
                      <div
                        onClick={() => toggleSelect(row.id)}
                        style={{
                          width: 17, height: 17, borderRadius: 5,
                          border: `2px solid ${isSel ? GOLD : 'rgba(74,9,24,0.16)'}`,
                          background: isSel ? GOLD : 'transparent',
                          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          transition: 'all 0.15s',
                        }}>
                        {isSel && <FiCheck size={9} color="#fff" strokeWidth={3} />}
                      </div>
                    </td>
                    {rowCells(row).map((cell, ci) => (
                      <td key={ci} style={{
                        padding: '12px 16px', fontSize: '0.82rem',
                        color: ci === 0 ? MAROON : '#4b5563',
                        fontWeight: ci === 0 ? 600 : 400,
                        maxWidth: ci === 0 ? 260 : undefined,
                        overflow: 'hidden', textOverflow: 'ellipsis',
                        whiteSpace: ci === 0 ? 'nowrap' : undefined,
                      }}>{cell}</td>
                    ))}
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', gap: 5, justifyContent: 'flex-end' }}>
                        <ActionBtn icon={FiEye}    title="View"   color="rgba(74,9,24,0.45)" onClick={() => onView ? onView(row) : toast.info(`Viewing: ${row.title}`)} />
                        <ActionBtn icon={FiEdit2}  title="Edit"   color={GOLD}               onClick={() => onEdit ? onEdit(row) : toast.info(`Editing: ${row.title}`)} />
                        <ActionBtn icon={FiTrash2} title="Delete" color="#DC2626"             onClick={() => onDelete(row.id)} />
                      </div>
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination bar */}
        {filtered.length > 0 && (
          <div style={{
            padding: '10px 18px', borderTop: '1px solid rgba(74,9,24,0.06)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: 'rgba(74,9,24,0.012)',
          }}>
            <span style={{ fontSize: '0.71rem', color: 'rgba(74,9,24,0.38)', fontWeight: 500 }}>
              Showing <strong style={{ color: MAROON }}>{filtered.length}</strong> of <strong style={{ color: MAROON }}>{rows.length}</strong> records
            </span>
            <div style={{ display: 'flex', gap: 4 }}>
              {[FiChevronLeft, FiChevronRight].map((Icon, i) => (
                <button key={i}
                  style={{
                    width: 30, height: 30, borderRadius: 8,
                    border: '1px solid rgba(74,9,24,0.11)', background: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: 'rgba(74,9,24,0.4)', transition: 'all 0.12s',
                    boxShadow: '0 1px 4px rgba(74,9,24,0.05)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = MAROON; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = MAROON }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = 'rgba(74,9,24,0.4)'; e.currentTarget.style.borderColor = 'rgba(74,9,24,0.11)' }}>
                  <Icon size={13} />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Gallery grid ──────────────────────────────────────────────────────────────
function GallerySection({ rows, onDelete, onAdd, onEdit, onView }) {
  const PALETTE = [
    `linear-gradient(135deg, rgba(74,9,24,0.14) 0%, rgba(199,154,43,0.1) 100%)`,
    `linear-gradient(135deg, rgba(30,64,175,0.12) 0%, rgba(124,58,237,0.08) 100%)`,
    `linear-gradient(135deg, rgba(22,101,52,0.12) 0%, rgba(199,154,43,0.08) 100%)`,
  ]

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.4rem', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 }}>
            <div style={{ width: 3, height: 24, borderRadius: 2, background: `linear-gradient(${MAROON}, ${GOLD})`, flexShrink: 0 }} />
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.35rem', fontWeight: 800, color: MAROON, margin: 0 }}>Gallery</h1>
          </div>
          <p style={{ fontSize: '0.76rem', color: 'rgba(74,9,24,0.4)', marginLeft: 13 }}>
            <span style={{ fontWeight: 700, color: MAROON }}>{rows.length}</span> album{rows.length !== 1 ? 's' : ''}
          </p>
        </div>
        <motion.button
          whileHover={{ y: -2, boxShadow: '0 10px 28px rgba(74,9,24,0.36)' }}
          whileTap={{ scale: 0.97 }}
          onClick={onAdd}
          style={{
            display: 'flex', alignItems: 'center', gap: 7,
            padding: '9px 18px', borderRadius: 11, border: 'none',
            background: `linear-gradient(135deg, ${MAROON} 0%, #7C1A32 100%)`,
            color: '#fff', fontSize: '0.8rem', fontWeight: 600,
            cursor: 'pointer', fontFamily: 'Inter, sans-serif',
            boxShadow: '0 4px 16px rgba(74,9,24,0.3)',
          }}>
          <FiPlus size={14} /> New Album
        </motion.button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '1.1rem' }}>
        {rows.map((album, i) => (
          <motion.div key={album.id}
            initial={{ opacity: 0, scale: 0.95, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            whileHover={{ y: -5, boxShadow: '0 16px 48px rgba(74,9,24,0.16)' }}
            style={{
              background: '#fff', borderRadius: 18, overflow: 'hidden',
              border: '1px solid rgba(74,9,24,0.07)',
              boxShadow: '0 3px 16px rgba(74,9,24,0.07)',
              transition: 'box-shadow 0.22s, transform 0.22s',
            }}>
            {/* Cover image area */}
            <div style={{ height: 158, background: PALETTE[i % PALETTE.length], display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
              {album.imageUrl
                ? <img src={album.imageUrl} alt={album.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                : (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: 0.5 }}>
                    <FiImage size={36} color={MAROON} />
                    <span style={{ fontSize: '0.68rem', color: MAROON, fontWeight: 600 }}>No cover image</span>
                  </div>
                )
              }
              {/* Gradient overlay */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(42,5,16,0.55) 0%, transparent 55%)' }} />
              <div style={{ position: 'absolute', top: 10, right: 10 }}>
                <span style={{
                  background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)',
                  color: '#fff', fontSize: '0.61rem', fontWeight: 700,
                  padding: '3px 10px', borderRadius: 100,
                  border: '1px solid rgba(255,255,255,0.15)',
                }}>
                  {album.photos} photos
                </span>
              </div>
              <div style={{ position: 'absolute', bottom: 10, left: 10 }}>
                <span style={{
                  background: `linear-gradient(135deg, ${GOLD} 0%, #9A7520 100%)`,
                  color: '#fff', fontSize: '0.6rem', fontWeight: 700,
                  padding: '3px 11px', borderRadius: 100,
                  boxShadow: `0 2px 8px rgba(199,154,43,0.4)`,
                }}>
                  {album.category}
                </span>
              </div>
            </div>

            <div style={{ padding: '1rem 1.1rem' }}>
              <div style={{ fontSize: '0.87rem', fontWeight: 700, color: MAROON, marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {album.title}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'rgba(74,9,24,0.38)', display: 'flex', alignItems: 'center', gap: 5, marginBottom: '0.95rem', fontWeight: 500 }}>
                <FiCalendar size={10} /> {album.date}
              </div>
              <div style={{ display: 'flex', gap: 7 }}>
                <button
                  onClick={() => onView(album)}
                  style={{
                    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    gap: 5, padding: '7px 0', borderRadius: 9,
                    border: '1px solid rgba(74,9,24,0.12)', background: 'rgba(74,9,24,0.02)',
                    color: 'rgba(74,9,24,0.52)', fontSize: '0.75rem',
                    cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                    fontWeight: 600, transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = MAROON; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = MAROON }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(74,9,24,0.02)'; e.currentTarget.style.color = 'rgba(74,9,24,0.52)'; e.currentTarget.style.borderColor = 'rgba(74,9,24,0.12)' }}>
                  <FiEye size={12} /> View
                </button>
                <button
                  onClick={() => onEdit(album)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: 35, borderRadius: 9,
                    border: `1px solid ${GOLD}40`, background: `${GOLD}0e`,
                    color: GOLD, cursor: 'pointer', transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = GOLD; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={e => { e.currentTarget.style.background = `${GOLD}0e`; e.currentTarget.style.color = GOLD }}>
                  <FiEdit2 size={12} />
                </button>
                <button
                  onClick={() => onDelete(album.id)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: 35, borderRadius: 9,
                    border: '1px solid rgba(220,38,38,0.2)', background: 'rgba(220,38,38,0.05)',
                    color: '#DC2626', cursor: 'pointer', transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#DC2626'; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(220,38,38,0.05)'; e.currentTarget.style.color = '#DC2626' }}>
                  <FiTrash2 size={12} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ── New Album Modal ───────────────────────────────────────────────────────────
const ALBUM_CATEGORIES = ['Events', 'Infrastructure', 'Community', 'Planning', 'Environment', 'Other']

// ── News Form Modal (Add + Edit) ─────────────────────────────────────────────
const NEWS_CATEGORIES = ['Announcement', 'Event', 'Press Release', 'Development', 'Infrastructure', 'Planning', 'Community', 'Environment']
const NEWS_STATUSES   = ['Published', 'Draft']

function NewsFormModal({ onClose, onSave, initialData = null }) {
  const isEdit = initialData !== null
  const [title,    setTitle]    = useState(initialData?.title    ?? '')
  const [titleSi,  setTitleSi]  = useState(initialData?.titleSi  ?? '')
  const [titleTa,  setTitleTa]  = useState(initialData?.titleTa  ?? '')
  const [category, setCategory] = useState(initialData?.category ?? 'Announcement')
  const [status,   setStatus]   = useState(initialData?.status   ?? 'Published')
  const [excerpt,  setExcerpt]  = useState(initialData?.excerpt  ?? '')
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl ?? '')
  const [featured, setFeatured] = useState(initialData?.featured ?? false)
  const [langExpanded, setLangExpanded] = useState(!!(initialData?.titleSi || initialData?.titleTa))
  const [error,    setError]    = useState('')
  const [saving,   setSaving]   = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const fileRef = useRef(null)

  useEffect(() => {
    const h = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose])

  const readFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = (ev) => setImageUrl(ev.target.result)
    reader.readAsDataURL(file)
  }

  const handleFiles = (e) => {
    const file = e.target.files?.[0]
    if (file) readFile(file)
    e.target.value = ''
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const file = Array.from(e.dataTransfer.files).find(f => f.type.startsWith('image/'))
    if (file) readFile(file)
  }

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    if (!title.trim()) { setError('Title is required.'); return }
    setSaving(true)
    setTimeout(() => {
      onSave({ title: title.trim(), titleSi: titleSi.trim(), titleTa: titleTa.trim(), category, status, excerpt: excerpt.trim(), imageUrl, featured })
    }, 280)
  }, [title, titleSi, titleTa, category, status, excerpt, imageUrl, featured, onSave])

  const selectStyle = {
    width: '100%', padding: '9px 12px',
    border: '1.5px solid rgba(74,9,24,0.15)', borderRadius: 9,
    fontSize: '0.83rem', fontFamily: 'Inter, sans-serif',
    color: MAROON, background: '#fff', outline: 'none',
    cursor: 'pointer', appearance: 'none', boxSizing: 'border-box',
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.52)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem 1rem' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.93, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.93, opacity: 0, y: 20 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth: 520, boxShadow: '0 28px 72px rgba(0,0,0,0.24)', display: 'flex', flexDirection: 'column', maxHeight: 'calc(100vh - 3rem)', overflow: 'hidden' }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ height: 3, flexShrink: 0, background: `linear-gradient(90deg, ${GOLD} 0%, #E8C55A 50%, ${GOLD} 100%)` }} />

        <div style={{ flexShrink: 0, padding: '1.25rem 1.5rem 1rem', borderBottom: '1px solid rgba(74,9,24,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.15rem', fontWeight: 800, color: MAROON, marginBottom: 3 }}>
              {isEdit ? 'Edit News Article' : 'Add News Article'}
            </h2>
            <p style={{ fontSize: '0.73rem', color: 'rgba(74,9,24,0.42)', lineHeight: 1.5 }}>
              {isEdit ? 'Update the article details below.' : 'Fill in the article details. Title is required.'}
            </p>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(74,9,24,0.06)', border: 'none', borderRadius: 8, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: MAROON, flexShrink: 0, marginLeft: 12, transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(74,9,24,0.12)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(74,9,24,0.06)'}>
            <FiX size={15} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ flex: 1, overflowY: 'auto', padding: '1.2rem 1.5rem 1.4rem' }}>
          <Field label="Title" required>
            <FocusInput value={title} onChange={setTitle} placeholder="e.g. Annual Planning Review 2025 Completed" />
          </Field>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <Field label="Category" required>
              <select value={category} onChange={e => setCategory(e.target.value)} style={selectStyle}>
                {NEWS_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Status" required>
              <select value={status} onChange={e => setStatus(e.target.value)} style={selectStyle}>
                {NEWS_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </Field>
          </div>

          <Field label="Excerpt / Summary">
            <FocusTextarea value={excerpt} onChange={setExcerpt} placeholder="Brief summary shown in article listings…" rows={3} />
          </Field>

          <Field label="Cover Image">
            {imageUrl ? (
              <div style={{ position: 'relative', borderRadius: 10, overflow: 'hidden', height: 130 }}>
                <img src={imageUrl} alt="cover preview" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%)' }} />
                <div style={{ position: 'absolute', bottom: 8, left: 10, right: 10, display: 'flex', gap: 6 }}>
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    style={{ flex: 1, padding: '5px 10px', borderRadius: 7, border: '1px solid rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(6px)', color: '#fff', fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                    <FiImage size={11} /> Change Image
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageUrl('')}
                    style={{ padding: '5px 10px', borderRadius: 7, border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(220,38,38,0.55)', backdropFilter: 'blur(6px)', color: '#fff', fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', gap: 5 }}>
                    <FiX size={11} /> Remove
                  </button>
                </div>
              </div>
            ) : (
              <div
                onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileRef.current?.click()}
                style={{
                  border: `2px dashed ${dragOver ? GOLD : 'rgba(74,9,24,0.2)'}`,
                  borderRadius: 10, height: 100,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 7,
                  cursor: 'pointer', background: dragOver ? 'rgba(199,154,43,0.06)' : 'rgba(74,9,24,0.015)',
                  transition: 'all 0.18s',
                }}
                onMouseEnter={e => { if (!dragOver) e.currentTarget.style.background = 'rgba(74,9,24,0.03)' }}
                onMouseLeave={e => { if (!dragOver) e.currentTarget.style.background = 'rgba(74,9,24,0.015)' }}
              >
                <FiImage size={22} color={dragOver ? GOLD : 'rgba(74,9,24,0.28)'} />
                <span style={{ fontSize: '0.78rem', color: 'rgba(74,9,24,0.42)', fontWeight: 500, pointerEvents: 'none' }}>
                  Click or drag &amp; drop an image
                </span>
                <span style={{ fontSize: '0.67rem', color: 'rgba(74,9,24,0.28)', pointerEvents: 'none' }}>
                  JPG, PNG, WebP, GIF
                </span>
              </div>
            )}
            <input ref={fileRef} type="file" accept="image/*" onChange={handleFiles} style={{ display: 'none' }} />
          </Field>

          <Field label="">
            <label style={{ display: 'flex', alignItems: 'center', gap: 9, cursor: 'pointer', userSelect: 'none' }}>
              <div
                onClick={() => setFeatured(v => !v)}
                style={{ width: 18, height: 18, borderRadius: 5, border: `1.5px solid ${featured ? GOLD : 'rgba(74,9,24,0.2)'}`, background: featured ? GOLD : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s', flexShrink: 0, cursor: 'pointer' }}>
                {featured && <FiCheck size={10} color="#fff" />}
              </div>
              <span style={{ fontSize: '0.82rem', color: 'rgba(74,9,24,0.65)', fontWeight: 500 }}>Mark as featured article</span>
            </label>
          </Field>

          <div style={{ borderRadius: 10, border: '1px dashed rgba(199,154,43,0.35)', overflow: 'hidden', marginBottom: '0.9rem' }}>
            <button type="button" onClick={() => setLangExpanded(v => !v)}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(199,154,43,0.05)', border: 'none', cursor: 'pointer', color: MAROON, fontFamily: 'Inter, sans-serif' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(74,9,24,0.55)' }}>
                Sinhala / Tamil Translation <span style={{ color: 'rgba(74,9,24,0.35)', fontWeight: 400 }}>(optional)</span>
              </span>
              <span style={{ fontSize: '0.7rem', color: GOLD, fontWeight: 600 }}>{langExpanded ? '▲ Hide' : '▼ Show'}</span>
            </button>
            {langExpanded && (
              <div style={{ padding: '0.9rem 1rem 0.2rem' }}>
                <Field label="Title — සිංහල">
                  <FocusInput value={titleSi} onChange={setTitleSi} placeholder="සිංහල මාතෘකාව" />
                </Field>
                <Field label="Title — தமிழ்">
                  <FocusInput value={titleTa} onChange={setTitleTa} placeholder="தமிழ் தலைப்பு" />
                </Field>
              </div>
            )}
          </div>

          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px', borderRadius: 9, marginBottom: '1rem', background: 'rgba(220,38,38,0.07)', border: '1px solid rgba(220,38,38,0.18)' }}>
              <FiAlertCircle size={14} color="#dc2626" />
              <span style={{ fontSize: '0.78rem', color: '#dc2626' }}>{error}</span>
            </div>
          )}

          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button type="button" onClick={onClose}
              style={{ padding: '9px 20px', borderRadius: 10, border: '1px solid rgba(74,9,24,0.14)', background: 'transparent', color: 'rgba(74,9,24,0.55)', fontSize: '0.83rem', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 500, transition: 'all 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(74,9,24,0.04)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              Cancel
            </button>
            <motion.button type="submit" disabled={saving}
              whileHover={!saving ? { y: -1, boxShadow: '0 6px 20px rgba(74,9,24,0.34)' } : {}}
              whileTap={!saving ? { scale: 0.97 } : {}}
              style={{ padding: '9px 22px', borderRadius: 10, border: 'none', background: saving ? 'rgba(74,9,24,0.4)' : `linear-gradient(135deg, ${MAROON} 0%, #6E1528 100%)`, color: '#fff', fontSize: '0.83rem', cursor: saving ? 'default' : 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 7, boxShadow: '0 3px 12px rgba(74,9,24,0.28)', transition: 'background 0.15s' }}>
              <FiFileText size={13} />
              {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Add Article'}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

// ── View News Modal ───────────────────────────────────────────────────────────
function ViewNewsModal({ article, onClose, onEdit }) {
  const categoryColor = { bg: 'rgba(74,9,24,0.10)', text: MAROON, border: 'rgba(74,9,24,0.22)' }
  const statusColors  = STATUS_COLORS[article.status] ?? STATUS_COLORS.Draft

  useEffect(() => {
    const h = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.52)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem 1rem' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.93, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.93, opacity: 0, y: 20 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth: 520, boxShadow: '0 28px 72px rgba(0,0,0,0.24)', display: 'flex', flexDirection: 'column', maxHeight: 'calc(100vh - 3rem)', overflow: 'hidden' }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ height: 3, flexShrink: 0, background: `linear-gradient(90deg, ${GOLD} 0%, #E8C55A 50%, ${GOLD} 100%)` }} />

        {article.imageUrl && (
          <div style={{ height: 160, overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
            <img src={article.imageUrl} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)' }} />
          </div>
        )}

        <div style={{ flexShrink: 0, padding: '1.3rem 1.5rem 1.1rem', borderBottom: '1px solid rgba(74,9,24,0.07)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
            <div style={{ minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 700, padding: '3px 10px', borderRadius: 100, background: categoryColor.bg, color: categoryColor.text, border: `1px solid ${categoryColor.border}` }}>
                  {article.category}
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 9px', borderRadius: 100, background: statusColors.bg, color: statusColors.text, fontSize: '0.65rem', fontWeight: 600 }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: statusColors.dot }} />
                  {article.status}
                </span>
                {article.featured && (
                  <span style={{ fontSize: '0.6rem', fontWeight: 700, padding: '2px 7px', borderRadius: 100, background: 'rgba(199,154,43,0.12)', color: '#92400e', border: '1px solid rgba(199,154,43,0.3)' }}>FEATURED</span>
                )}
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', fontWeight: 800, color: MAROON, lineHeight: 1.3, margin: 0 }}>
                {article.title}
              </h2>
              {(article.titleSi || article.titleTa) && (
                <div style={{ marginTop: 6, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {article.titleSi && (
                    <p style={{ margin: 0, fontSize: '0.82rem', color: 'rgba(74,9,24,0.55)', fontFamily: "'Noto Sans Sinhala', sans-serif", lineHeight: 1.45 }}>{article.titleSi}</p>
                  )}
                  {article.titleTa && (
                    <p style={{ margin: 0, fontSize: '0.82rem', color: 'rgba(74,9,24,0.55)', fontFamily: "'Noto Sans Tamil', sans-serif", lineHeight: 1.45 }}>{article.titleTa}</p>
                  )}
                </div>
              )}
            </div>
            <button onClick={onClose} style={{ background: 'rgba(74,9,24,0.06)', border: 'none', borderRadius: 8, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: MAROON, flexShrink: 0, transition: 'background 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(74,9,24,0.12)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(74,9,24,0.06)'}>
              <FiX size={15} />
            </button>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.5rem' }}>
          {article.excerpt && (
            <div style={{ marginBottom: '1rem', padding: '0.8rem 1rem', background: 'rgba(74,9,24,0.025)', borderRadius: 9, borderLeft: `3px solid ${GOLD}` }}>
              <p style={{ margin: 0, fontSize: '0.83rem', color: '#4b5563', lineHeight: 1.65 }}>{article.excerpt}</p>
            </div>
          )}
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '0.6rem 0', borderBottom: '1px solid rgba(74,9,24,0.05)' }}>
            <FiCalendar size={14} style={{ color: GOLD, flexShrink: 0, marginTop: 2 }} />
            <div>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'rgba(74,9,24,0.38)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>Date Published</div>
              <div style={{ fontSize: '0.83rem', color: MAROON, fontWeight: 500 }}>{article.date}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '0.6rem 0', borderBottom: '1px solid rgba(74,9,24,0.05)' }}>
            <FiTag size={14} style={{ color: GOLD, flexShrink: 0, marginTop: 2 }} />
            <div>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'rgba(74,9,24,0.38)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>Category</div>
              <div style={{ fontSize: '0.83rem', color: MAROON, fontWeight: 500 }}>{article.category}</div>
            </div>
          </div>
        </div>

        <div style={{ flexShrink: 0, padding: '1rem 1.5rem 1.4rem', display: 'flex', gap: 10, justifyContent: 'flex-end', borderTop: '1px solid rgba(74,9,24,0.06)', flexWrap: 'wrap' }}>
          <button onClick={onClose}
            style={{ padding: '8px 18px', borderRadius: 10, border: '1px solid rgba(74,9,24,0.14)', background: 'transparent', color: 'rgba(74,9,24,0.55)', fontSize: '0.83rem', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 500, transition: 'all 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(74,9,24,0.04)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            Close
          </button>
          <motion.button
            whileHover={{ y: -1, boxShadow: '0 6px 20px rgba(74,9,24,0.3)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onEdit(article)}
            style={{ padding: '8px 18px', borderRadius: 10, border: 'none', background: `linear-gradient(135deg, ${MAROON} 0%, #6E1528 100%)`, color: '#fff', fontSize: '0.83rem', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 7, boxShadow: '0 3px 12px rgba(74,9,24,0.28)' }}>
            <FiEdit2 size={13} /> Edit Article
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Notice Form Modal (Add + Edit) ────────────────────────────────────────────
const NOTICE_TYPES_FORM = ['Circular', 'Notice']
const NOTICE_STATUSES   = ['Active', 'Draft', 'Expired']

function FocusInput({ value, onChange, placeholder, type: inputType = 'text' }) {
  const [focused, setFocused] = useState(false)
  const inputRef = useRef(null)
  const style = {
    width: '100%', padding: '9px 12px',
    border: `1.5px solid ${focused ? GOLD : 'rgba(74,9,24,0.15)'}`,
    borderRadius: 9, fontSize: '0.83rem', fontFamily: 'Inter, sans-serif',
    color: MAROON, background: '#fff', outline: 'none',
    transition: 'border-color 0.15s', boxSizing: 'border-box',
  }
  return (
    <input
      ref={inputRef}
      type={inputType} value={value} onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      style={style}
    />
  )
}

function DateInput({ value, onChange, placeholder }) {
  const [focused, setFocused] = useState(false)
  const inputRef = useRef(null)
  
  const handleChange = (e) => {
    let input = e.target.value.replace(/\D/g, '')
    if (input.length > 8) input = input.slice(0, 8)
    
    let formatted = input
    if (input.length >= 2) {
      formatted = input.slice(0, 2) + '/' + input.slice(2)
    }
    if (input.length >= 4) {
      formatted = input.slice(0, 2) + '/' + input.slice(2, 4) + '/' + input.slice(4)
    }
    
    onChange(formatted)
  }
  
  const style = {
    width: '100%', padding: '9px 12px',
    border: `1.5px solid ${focused ? GOLD : 'rgba(74,9,24,0.15)'}`,
    borderRadius: 9, fontSize: '0.83rem', fontFamily: 'Inter, sans-serif',
    color: MAROON, background: '#fff', outline: 'none',
    transition: 'border-color 0.15s', boxSizing: 'border-box',
  }
  
  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      maxLength="10"
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={style}
    />
  )
}

function FocusTextarea({ value, onChange, placeholder, rows = 3 }) {
  const [focused, setFocused] = useState(false)
  const inputRef = useRef(null)
  const style = {
    width: '100%', padding: '9px 12px',
    border: `1.5px solid ${focused ? GOLD : 'rgba(74,9,24,0.15)'}`,
    borderRadius: 9, fontSize: '0.83rem', fontFamily: 'Inter, sans-serif',
    color: MAROON, background: '#fff', outline: 'none',
    transition: 'border-color 0.15s', boxSizing: 'border-box',
    resize: 'vertical', minHeight: 72, lineHeight: 1.55,
  }
  return (
    <textarea
      ref={inputRef}
      value={value} onChange={e => onChange(e.target.value)}
      placeholder={placeholder} rows={rows}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      style={style}
    />
  )
}

function Field({ label, required, children }) {
  return (
    <div style={{ marginBottom: '0.9rem' }}>
      <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: 'rgba(74,9,24,0.55)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 5 }}>
        {label} {required && <span style={{ color: '#dc2626' }}>*</span>}
      </label>
      {children}
    </div>
  )
}

function NoticeFormModal({ onClose, onSave, initialData = null }) {
  const isEdit = initialData !== null
  const [title,          setTitle]          = useState(initialData?.title          ?? '')
  const [titleSi,        setTitleSi]        = useState(initialData?.titleSi        ?? '')
  const [titleTa,        setTitleTa]        = useState(initialData?.titleTa        ?? '')
  const [type,           setType]           = useState(initialData?.type           ?? initialData?.category ?? 'Circular')
  const [ref,            setRef]            = useState(initialData?.ref            ?? '')
  const [deadline,       setDeadline]       = useState(initialData?.deadline       ?? '')
  const [status,         setStatus]         = useState(initialData?.status         ?? 'Active')
  const [description,    setDescription]    = useState(initialData?.description    ?? '')
  const [descriptionSi,  setDescriptionSi]  = useState(initialData?.descriptionSi  ?? '')
  const [descriptionTa,  setDescriptionTa]  = useState(initialData?.descriptionTa  ?? '')
  const [attachment,     setAttachment]     = useState(initialData?.fileUrl ? {
    name: initialData.fileName ?? 'Attached file',
    url: initialData.fileUrl,
    type: initialData.fileMimeType ?? '',
  } : null)
  const [langExpanded,   setLangExpanded]   = useState(!!(initialData?.titleSi || initialData?.titleTa || initialData?.descriptionSi || initialData?.descriptionTa))
  const [downloadAccess, setDownloadAccess] = useState(initialData?.downloadAccess ?? 'Everyone')
  const [error,          setError]          = useState('')
  const [saving,         setSaving]         = useState(false)
  // Attachment is expected to be a drive/external link. No upload state required.

  // Replaced file uploads with a simple link input — admin pastes a Drive/Dropbox/OneDrive URL.

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    console.debug('[CMS] NoticeFormModal submit', { title, deadline, attachment })
    if (!title.trim()) { setError('Title is required.'); return }
    if (deadline) {
      const parts = deadline.split('/')
      const [mm, dd, yyyy] = parts.map(Number)
      const d = new Date(yyyy, mm - 1, dd)
      const invalid = parts.length !== 3 || deadline.length !== 10
        || isNaN(d) || d.getFullYear() !== yyyy || d.getMonth() !== mm - 1 || d.getDate() !== dd
      if (invalid) { setError('Closing date is not a valid date (mm/dd/yyyy).'); return }
    }
    setSaving(true)
    setTimeout(() => {
      onSave({
        title:         title.trim(),
        titleSi:       titleSi.trim(),
        titleTa:       titleTa.trim(),
        type,
        ref:           ref.trim(),
        deadline,
        status,
        description:   description.trim(),
        descriptionSi: descriptionSi.trim(),
        descriptionTa: descriptionTa.trim(),
        fileName:      attachment?.name ?? initialData?.fileName ?? '',
        fileUrl:       attachment?.url  ?? initialData?.fileUrl  ?? '',
        fileMimeType:  attachment?.type ?? initialData?.fileMimeType ?? '',
        downloadAccess: attachment ? downloadAccess : 'Everyone',
      })
    }, 280)
  }, [title, titleSi, titleTa, type, ref, deadline, status, description, descriptionSi, descriptionTa, attachment, initialData, onSave, downloadAccess])

  const selectStyle = {
    width: '100%', padding: '9px 12px',
    border: '1.5px solid rgba(74,9,24,0.15)', borderRadius: 9,
    fontSize: '0.83rem', fontFamily: 'Inter, sans-serif',
    color: MAROON, background: '#fff', outline: 'none',
    cursor: 'pointer', appearance: 'none', boxSizing: 'border-box',
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.52)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem 1rem' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.93, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.93, opacity: 0, y: 20 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth: 520, boxShadow: '0 28px 72px rgba(0,0,0,0.24)', display: 'flex', flexDirection: 'column', maxHeight: 'calc(100vh - 3rem)', overflow: 'hidden' }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ height: 3, flexShrink: 0, background: `linear-gradient(90deg, ${GOLD} 0%, #E8C55A 50%, ${GOLD} 100%)` }} />

        {/* Header — pinned */}
        <div style={{ flexShrink: 0, padding: '1.25rem 1.5rem 1rem', borderBottom: '1px solid rgba(74,9,24,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.15rem', fontWeight: 800, color: MAROON, marginBottom: 3 }}>
              {isEdit ? 'Edit Notice' : 'Add Notice'}
            </h2>
            <p style={{ fontSize: '0.73rem', color: 'rgba(74,9,24,0.42)', lineHeight: 1.5 }}>
              {isEdit ? 'Update the notice details below.' : 'Fill in the notice details. Title is required.'}
            </p>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(74,9,24,0.06)', border: 'none', borderRadius: 8, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: MAROON, flexShrink: 0, marginLeft: 12, transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(74,9,24,0.12)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(74,9,24,0.06)'}>
            <FiX size={15} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ flex: 1, overflowY: 'auto', padding: '1.2rem 1.5rem 1.4rem' }}>
          <Field label="Title" required>
            <FocusInput value={title} onChange={setTitle} placeholder="e.g. Annual Performance Appraisal Guidelines" />
          </Field>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <Field label="Type" required>
              <select value={type} onChange={e => setType(e.target.value)} style={selectStyle}>
                {NOTICE_TYPES_FORM.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </Field>
            <Field label="Status" required>
              <select value={status} onChange={e => setStatus(e.target.value)} style={selectStyle}>
                {NOTICE_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </Field>
          </div>

          <Field label="Reference Number">
            <FocusInput value={ref} onChange={setRef} placeholder="e.g. SPPS/CIR/2026/014" />
          </Field>

          <Field label="Closing / Deadline Date">
            <DateInput value={deadline} onChange={setDeadline} placeholder="mm/dd/yyyy" />
          </Field>

          <Field label="Attachment (Drive link)">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 8 }}>
              <input
                value={attachment?.url ?? ''}
                onChange={e => setAttachment(prev => prev ? { ...prev, url: e.target.value } : { name: '', url: e.target.value, type: '' })}
                placeholder="Paste a public Drive/Dropbox/OneDrive link here"
                style={{ width: '100%', padding: '9px 12px', border: '1.5px solid rgba(74,9,24,0.15)', borderRadius: 9, fontSize: '0.83rem', color: MAROON, background: '#fff' }}
              />
              <input
                value={attachment?.name ?? ''}
                onChange={e => setAttachment(prev => prev ? { ...prev, name: e.target.value } : { name: e.target.value, url: '', type: '' })}
                placeholder="Display name (optional)"
                style={{ width: '100%', padding: '9px 12px', border: '1.5px solid rgba(74,9,24,0.12)', borderRadius: 9, fontSize: '0.83rem', color: MAROON, background: '#fff' }}
              />
            </div>
            {attachment?.url && (
              <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <div style={{ fontSize: '0.72rem', color: 'rgba(74,9,24,0.48)' }}>
                  Link will be used as the attachment URL on the public portal.
                </div>
                <motion.button
                  whileHover={{ y: -1, boxShadow: '0 4px 12px rgba(199,154,43,0.2)' }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => window.open(attachment.url, '_blank', 'noopener,noreferrer')}
                  style={{ padding: '6px 14px', borderRadius: 7, border: '1px solid rgba(199,154,43,0.3)', background: 'rgba(199,154,43,0.12)', color: MAROON, fontSize: '0.72rem', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0, whiteSpace: 'nowrap' }}
                >
                  <FiDownload size={12} /> Open Link
                </motion.button>
              </div>
            )}
          </Field>

          <Field label="Download Access">
            <select value={downloadAccess} onChange={e => setDownloadAccess(e.target.value)} style={selectStyle}>
              <option value="Everyone">Everyone can download</option>
              <option value="RegisteredOnly">Registered users only</option>
              <option value="AdminOnly">Admin only</option>
            </select>
            {attachment && (
              <div style={{ marginTop: 6, fontSize: '0.72rem', color: 'rgba(74,9,24,0.48)' }}>
                Only applies when a file is attached. Download will be available to: <strong>{downloadAccess === 'Everyone' ? 'All visitors' : downloadAccess === 'RegisteredOnly' ? 'Registered users' : 'Administrators only'}</strong>
              </div>
            )}
          </Field>

          <Field label="Description">
            <FocusTextarea value={description} onChange={setDescription} placeholder="Optional — brief description of this notice…" />
          </Field>

          {/* ── Multilingual (optional) ── */}
          <div style={{ borderRadius: 10, border: '1px dashed rgba(199,154,43,0.35)', overflow: 'hidden', marginBottom: '0.9rem' }}>
            <button
              type="button"
              onClick={() => setLangExpanded(v => !v)}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(199,154,43,0.05)', border: 'none', cursor: 'pointer', color: MAROON, fontFamily: 'Inter, sans-serif' }}
            >
              <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(74,9,24,0.55)' }}>
                Sinhala / Tamil Translation <span style={{ color: 'rgba(74,9,24,0.35)', fontWeight: 400 }}>(optional)</span>
              </span>
              <span style={{ fontSize: '0.7rem', color: GOLD, fontWeight: 600 }}>{langExpanded ? '▲ Hide' : '▼ Show'}</span>
            </button>
            {langExpanded && (
              <div style={{ padding: '0.9rem 1rem 0.2rem' }}>
                <Field label="Title — සිංහල">
                  <FocusInput
                    value={titleSi}
                    onChange={setTitleSi}
                    placeholder="සිංහල මාතෘකාව"
                  />
                </Field>
                <Field label="Description — සිංහල">
                  <FocusTextarea
                    value={descriptionSi}
                    onChange={setDescriptionSi}
                    placeholder="සිංහල විස්තරය (අවශ්‍ය නොවේ)…"
                    rows={2}
                  />
                </Field>
                <Field label="Title — தமிழ்">
                  <FocusInput
                    value={titleTa}
                    onChange={setTitleTa}
                    placeholder="தமிழ் தலைப்பு"
                  />
                </Field>
                <Field label="Description — தமிழ்">
                  <FocusTextarea
                    value={descriptionTa}
                    onChange={setDescriptionTa}
                    placeholder="தமிழ் விவரம் (தேவையில்லை)…"
                    rows={2}
                  />
                </Field>
              </div>
            )}
          </div>

          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px', borderRadius: 9, marginBottom: '1rem', background: 'rgba(220,38,38,0.07)', border: '1px solid rgba(220,38,38,0.18)' }}>
              <FiAlertCircle size={14} color="#dc2626" />
              <span style={{ fontSize: '0.78rem', color: '#dc2626' }}>{error}</span>
            </div>
          )}

          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button type="button" onClick={onClose}
              style={{ padding: '9px 20px', borderRadius: 10, border: '1px solid rgba(74,9,24,0.14)', background: 'transparent', color: 'rgba(74,9,24,0.55)', fontSize: '0.83rem', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 500, transition: 'all 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(74,9,24,0.04)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              Cancel
            </button>
            <motion.button type="submit" disabled={saving}
              whileHover={!saving ? { y: -1, boxShadow: '0 6px 20px rgba(74,9,24,0.34)' } : {}}
              whileTap={!saving ? { scale: 0.97 } : {}}
              style={{ padding: '9px 22px', borderRadius: 10, border: 'none', background: saving ? 'rgba(74,9,24,0.4)' : `linear-gradient(135deg, ${MAROON} 0%, #6E1528 100%)`, color: '#fff', fontSize: '0.83rem', cursor: saving ? 'default' : 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 7, boxShadow: '0 3px 12px rgba(74,9,24,0.28)', transition: 'background 0.15s' }}>
              <FiBell size={13} />
              {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Add Notice'}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

// ── View Notice Modal ─────────────────────────────────────────────────────────
function ViewNoticeModal({ notice, onClose, onEdit }) {
  const typeColors = {
    Circular: { bg: 'rgba(74,9,24,0.10)',    text: MAROON,    border: 'rgba(74,9,24,0.22)'    },
    Notice:   { bg: 'rgba(154,117,32,0.10)', text: '#9A7520', border: 'rgba(154,117,32,0.30)' },
  }
  const colors = typeColors[notice.type || notice.category] ?? typeColors.Notice
  const statusColors = STATUS_COLORS[notice.status] ?? STATUS_COLORS.Draft

  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose])

  const Row = ({ icon: Icon, label, value }) => value ? (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '0.6rem 0', borderBottom: '1px solid rgba(74,9,24,0.05)' }}>
      <Icon size={14} style={{ color: GOLD, flexShrink: 0, marginTop: 2 }} />
      <div>
        <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'rgba(74,9,24,0.38)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>{label}</div>
        <div style={{ fontSize: '0.83rem', color: MAROON, fontWeight: 500 }}>{value}</div>
      </div>
    </div>
  ) : null

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.52)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem 1rem' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.93, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.93, opacity: 0, y: 20 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth: 500, boxShadow: '0 28px 72px rgba(0,0,0,0.24)', display: 'flex', flexDirection: 'column', maxHeight: 'calc(100vh - 3rem)', overflow: 'hidden' }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ height: 3, flexShrink: 0, background: `linear-gradient(90deg, ${GOLD} 0%, #E8C55A 50%, ${GOLD} 100%)` }} />

        {/* Header — pinned */}
        <div style={{ flexShrink: 0, padding: '1.3rem 1.5rem 1.1rem', borderBottom: '1px solid rgba(74,9,24,0.07)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
            <div style={{ minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 700, padding: '3px 10px', borderRadius: 100, background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}>
                  {notice.type || notice.category}
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 9px', borderRadius: 100, background: statusColors.bg, color: statusColors.text, fontSize: '0.65rem', fontWeight: 600 }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: statusColors.dot }} />
                  {notice.status}
                </span>
                {notice.isNew && (
                  <span style={{ fontSize: '0.6rem', fontWeight: 700, padding: '2px 7px', borderRadius: 100, background: 'rgba(22,101,52,0.1)', color: '#166534', border: '1px solid rgba(22,101,52,0.2)' }}>NEW</span>
                )}
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', fontWeight: 800, color: MAROON, lineHeight: 1.3, margin: 0 }}>
                {notice.title}
              </h2>
              {(notice.titleSi || notice.titleTa) && (
                <div style={{ marginTop: 6, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {notice.titleSi && (
                    <p style={{ margin: 0, fontSize: '0.82rem', color: 'rgba(74,9,24,0.55)', fontFamily: "'Noto Sans Sinhala', sans-serif", lineHeight: 1.45 }}>
                      {notice.titleSi}
                    </p>
                  )}
                  {notice.titleTa && (
                    <p style={{ margin: 0, fontSize: '0.82rem', color: 'rgba(74,9,24,0.55)', fontFamily: "'Noto Sans Tamil', sans-serif", lineHeight: 1.45 }}>
                      {notice.titleTa}
                    </p>
                  )}
                </div>
              )}
            </div>
            <button onClick={onClose} style={{ background: 'rgba(74,9,24,0.06)', border: 'none', borderRadius: 8, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: MAROON, flexShrink: 0, transition: 'background 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(74,9,24,0.12)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(74,9,24,0.06)'}>
              <FiX size={15} />
            </button>
          </div>
        </div>

        {/* Details — scrollable */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.5rem' }}>
          {(notice.description || notice.descriptionSi || notice.descriptionTa) && (
            <div style={{ marginBottom: '1rem', padding: '0.8rem 1rem', background: 'rgba(74,9,24,0.025)', borderRadius: 9, borderLeft: `3px solid ${GOLD}`, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {notice.description && (
                <p style={{ margin: 0, fontSize: '0.83rem', color: '#4b5563', lineHeight: 1.65 }}>
                  {notice.description}
                </p>
              )}
              {notice.descriptionSi && (
                <p style={{ margin: 0, fontSize: '0.81rem', color: 'rgba(74,9,24,0.55)', lineHeight: 1.6, fontFamily: "'Noto Sans Sinhala', sans-serif" }}>
                  {notice.descriptionSi}
                </p>
              )}
              {notice.descriptionTa && (
                <p style={{ margin: 0, fontSize: '0.81rem', color: 'rgba(74,9,24,0.55)', lineHeight: 1.6, fontFamily: "'Noto Sans Tamil', sans-serif" }}>
                  {notice.descriptionTa}
                </p>
              )}
            </div>
          )}
          <Row icon={FiFileText} label="Reference Number" value={notice.ref} />
          <Row icon={FiCalendar} label="Date Issued"      value={notice.date} />
          <Row icon={FiClock}    label="Closing Date"     value={notice.deadline} />
          <Row icon={FiDownload} label="Attachment"       value={notice.fileName || null} />
          {notice.fileUrl && (
            <Row icon={FiLock} label="Download Access" value={notice.downloadAccess === 'Everyone' ? 'All visitors' : notice.downloadAccess === 'RegisteredOnly' ? 'Registered users only' : 'Administrators only'} />
          )}
        </div>

        {/* Actions — pinned */}
        <div style={{ flexShrink: 0, padding: '1rem 1.5rem 1.4rem', display: 'flex', gap: 10, justifyContent: 'flex-end', borderTop: '1px solid rgba(74,9,24,0.06)', flexWrap: 'wrap' }}>
          {notice.fileUrl && (
            <motion.button
              whileHover={{ y: -1, boxShadow: '0 6px 20px rgba(74,9,24,0.18)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => window.open(notice.fileUrl, '_blank', 'noopener,noreferrer')}
              style={{ padding: '8px 18px', borderRadius: 10, border: '1px solid rgba(199,154,43,0.22)', background: 'rgba(199,154,43,0.08)', color: MAROON, fontSize: '0.83rem', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 7 }}>
              <FiDownload size={13} /> Open Attachment Link
            </motion.button>
          )}
          <button onClick={onClose}
            style={{ padding: '8px 18px', borderRadius: 10, border: '1px solid rgba(74,9,24,0.14)', background: 'transparent', color: 'rgba(74,9,24,0.55)', fontSize: '0.83rem', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 500, transition: 'all 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(74,9,24,0.04)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            Close
          </button>
          <motion.button
            whileHover={{ y: -1, boxShadow: '0 6px 20px rgba(74,9,24,0.3)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onEdit(notice)}
            style={{ padding: '8px 18px', borderRadius: 10, border: 'none', background: `linear-gradient(135deg, ${MAROON} 0%, #6E1528 100%)`, color: '#fff', fontSize: '0.83rem', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 7, boxShadow: '0 3px 12px rgba(74,9,24,0.28)' }}>
            <FiEdit2 size={13} /> Edit Notice
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── View Album Modal ──────────────────────────────────────────────────────────
function ViewAlbumModal({ album, onClose, onEdit }) {
  const images = album.images?.length
    ? album.images
    : album.imageUrl ? [album.imageUrl] : []

  const [lightIdx, setLightIdx] = useState(null)

  const openLight = (i) => setLightIdx(i)
  const closeLight = () => setLightIdx(null)
  const prevImg = useCallback(() => setLightIdx(i => (i - 1 + images.length) % images.length), [images.length])
  const nextImg = useCallback(() => setLightIdx(i => (i + 1) % images.length), [images.length])

  useEffect(() => {
    const h = (e) => {
      if (e.key === 'Escape')     { lightIdx !== null ? closeLight() : onClose() }
      if (e.key === 'ArrowLeft')  prevImg()
      if (e.key === 'ArrowRight') nextImg()
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [lightIdx, prevImg, nextImg, onClose])

  const hasImages = images.length > 0

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.58)',
        zIndex: 100, display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        padding: '1.5rem 1rem', overflowY: 'auto',
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 22 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 22 }}
        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: '#fff', borderRadius: 20, width: '100%', maxWidth: 680,
          boxShadow: '0 32px 80px rgba(0,0,0,0.28)',
          overflow: 'hidden',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Gold accent */}
        <div style={{ height: 3, background: `linear-gradient(90deg, ${GOLD} 0%, #E8C55A 50%, ${GOLD} 100%)` }} />

        {/* Hero banner */}
        <div style={{
          height: 200, position: 'relative', overflow: 'hidden',
          background: `linear-gradient(135deg, ${MAROON} 0%, #6E1528 100%)`,
          display: 'flex', alignItems: 'flex-end',
        }}>
          {hasImages && (
            <img
              src={images[0]}
              alt={album.title}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55 }}
            />
          )}
          {!hasImages && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FiImage size={56} color="rgba(255,255,255,0.15)" />
            </div>
          )}
          {/* Gradient overlay */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 60%)' }} />

          {/* Album info over banner */}
          <div style={{ position: 'relative', padding: '1.1rem 1.4rem', width: '100%', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12 }}>
              <div style={{ minWidth: 0 }}>
                <span style={{
                  display: 'inline-block', background: GOLD, color: '#fff',
                  fontSize: '0.6rem', fontWeight: 700, padding: '2px 9px',
                  borderRadius: 100, marginBottom: 6, letterSpacing: '0.06em',
                }}>
                  {album.category}
                </span>
                <h2 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1.25rem', fontWeight: 800, color: '#fff',
                  margin: 0, lineHeight: 1.25,
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {album.title}
                </h2>
                <div style={{ display: 'flex', gap: 14, marginTop: 5, color: 'rgba(255,255,255,0.62)', fontSize: '0.72rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <FiCalendar size={11} /> {album.date}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <FiImage size={11} /> {images.length} photo{images.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 7, flexShrink: 0 }}>
                <motion.button
                  whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}
                  onClick={() => onEdit(album)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '7px 14px', borderRadius: 9, border: 'none',
                    background: GOLD, color: '#fff',
                    fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                  }}>
                  <FiEdit2 size={12} /> Edit
                </motion.button>
              </div>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: 12, right: 12, zIndex: 2,
              width: 32, height: 32, borderRadius: '50%',
              background: 'rgba(0,0,0,0.45)', border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#fff', transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.7)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.45)'}>
            <FiX size={15} />
          </button>
        </div>

        {/* Photo grid */}
        <div style={{ padding: '1.25rem 1.4rem 1.5rem' }}>
          {hasImages ? (
            <>
              <div style={{
                fontSize: '0.65rem', fontWeight: 700, color: 'rgba(74,9,24,0.38)',
                textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.9rem',
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <FiImage size={11} /> Photos
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                gap: 10,
              }}>
                {images.map((src, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.03, boxShadow: '0 6px 20px rgba(0,0,0,0.18)' }}
                    onClick={() => openLight(idx)}
                    style={{
                      position: 'relative', aspectRatio: '1',
                      borderRadius: 10, overflow: 'hidden', cursor: 'pointer',
                      background: 'rgba(74,9,24,0.05)',
                    }}
                  >
                    <img
                      src={src} alt={`Photo ${idx + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                    {idx === 0 && (
                      <span style={{
                        position: 'absolute', bottom: 5, left: 5,
                        background: GOLD, color: '#fff',
                        fontSize: '0.52rem', fontWeight: 700,
                        padding: '2px 6px', borderRadius: 4,
                      }}>COVER</span>
                    )}
                    <div style={{
                      position: 'absolute', inset: 0, background: 'rgba(0,0,0,0)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'background 0.18s',
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.28)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0)'}
                    >
                      <FiEye size={18} color="rgba(255,255,255,0)" style={{ transition: 'color 0.18s' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              padding: '2.5rem 1rem', gap: 10,
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: 16,
                background: 'rgba(74,9,24,0.06)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <FiImage size={24} color="rgba(74,9,24,0.28)" />
              </div>
              <p style={{ fontSize: '0.88rem', fontWeight: 600, color: 'rgba(74,9,24,0.45)', margin: 0 }}>
                No photos uploaded yet
              </p>
              <p style={{ fontSize: '0.75rem', color: 'rgba(74,9,24,0.3)', margin: 0 }}>
                Click <strong>Edit</strong> to add up to {MAX_IMAGES} photos to this album.
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Lightbox inside viewer */}
      <AnimatePresence>
        {lightIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)',
              zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
            onClick={closeLight}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: 'relative', maxWidth: '88vw', maxHeight: '88vh' }}
              onClick={e => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={lightIdx}
                  src={images[lightIdx]}
                  alt={`Photo ${lightIdx + 1}`}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    maxWidth: '88vw', maxHeight: '80vh',
                    borderRadius: 12, display: 'block',
                    boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
                  }}
                />
              </AnimatePresence>

              {/* Caption & counter */}
              <div style={{
                position: 'absolute', bottom: -36, left: 0, right: 0,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.78rem' }}>
                  {album.title}
                </span>
                <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem' }}>
                  {lightIdx + 1} / {images.length}
                </span>
              </div>

              {/* Dot nav */}
              {images.length > 1 && (
                <div style={{
                  position: 'absolute', bottom: -60, left: '50%', transform: 'translateX(-50%)',
                  display: 'flex', gap: 6,
                }}>
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => { e.stopPropagation(); setLightIdx(i) }}
                      style={{
                        width: i === lightIdx ? 18 : 7, height: 7, borderRadius: 4,
                        background: i === lightIdx ? '#fff' : 'rgba(255,255,255,0.32)',
                        border: 'none', padding: 0, cursor: 'pointer', transition: 'all 0.2s',
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Close */}
              <button onClick={closeLight} style={{
                position: 'fixed', top: 18, right: 18,
                width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(255,255,255,0.12)', border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#fff', transition: 'background 0.15s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.22)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}>
                <FiX size={16} />
              </button>

              {/* Prev / Next */}
              {images.length > 1 && (
                <>
                  <button onClick={prevImg} style={{
                    position: 'fixed', left: 20, top: '50%', transform: 'translateY(-50%)',
                    width: 42, height: 42, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)', border: 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: '#fff', transition: 'background 0.15s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}>
                    <FiChevronLeft size={22} />
                  </button>
                  <button onClick={nextImg} style={{
                    position: 'fixed', right: 20, top: '50%', transform: 'translateY(-50%)',
                    width: 42, height: 42, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)', border: 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: '#fff', transition: 'background 0.15s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}>
                    <FiChevronRight size={22} />
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const MAX_IMAGES = 10

function albumLangFieldStyle(focused) {
  return {
    width: '100%', padding: '10px 12px',
    border: `1.5px solid ${focused ? GOLD : 'rgba(74,9,24,0.15)'}`,
    borderRadius: 9, fontSize: '0.83rem', fontFamily: 'Inter, sans-serif',
    color: MAROON, background: '#fff', outline: 'none',
    transition: 'border-color 0.15s', boxSizing: 'border-box',
  }
}

function LangField({ label, langLabel, value, onChange, placeholder }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ marginBottom: '0.85rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}>
        <label style={{ fontSize: '0.72rem', fontWeight: 600, color: 'rgba(74,9,24,0.58)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          {label}
        </label>
        <span style={{ fontSize: '0.63rem', padding: '2px 8px', borderRadius: 100, background: 'rgba(199,154,43,0.1)', color: GOLD, fontWeight: 600 }}>
          {langLabel} · optional
        </span>
      </div>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={albumLangFieldStyle(focused)}
      />
    </div>
  )
}

function NewAlbumModal({ onClose, onSave, initialData = null }) {
  const isEdit = initialData !== null
  const [titleEn,  setTitleEn]  = useState(initialData?.titleEn  ?? '')
  const [titleSi,  setTitleSi]  = useState(initialData?.titleSi  ?? '')
  const [titleTa,  setTitleTa]  = useState(initialData?.titleTa  ?? '')
  const [category, setCategory] = useState(initialData?.category ?? 'Events')
  const [images,   setImages]   = useState(() => {
    if (initialData?.images?.length) return initialData.images
    if (initialData?.imageUrl)       return [initialData.imageUrl]
    return []
  })
  const [error,    setError]    = useState('')
  const [saving,   setSaving]   = useState(false)
  const fileRef = useRef(null)

  const remaining = MAX_IMAGES - images.length

  const readFiles = (files) => {
    const toRead = files.slice(0, remaining)
    toRead.forEach(file => {
      const reader = new FileReader()
      reader.onload = (ev) => {
        setImages(prev => prev.length < MAX_IMAGES ? [...prev, ev.target.result] : prev)
      }
      reader.readAsDataURL(file)
    })
  }

  const handleFiles = (e) => {
    const files = Array.from(e.target.files)
    if (!files.length) return
    readFiles(files)
    e.target.value = ''
  }

  const removeImage = (idx) => setImages(prev => prev.filter((_, i) => i !== idx))

  const handleDrop = (e) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'))
    readFiles(files)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!titleEn.trim() && !titleSi.trim() && !titleTa.trim()) {
      setError('Please enter a topic title in at least one language.')
      return
    }
    setSaving(true)
    setTimeout(() => {
      onSave({
        titleEn: titleEn.trim(),
        titleSi: titleSi.trim(),
        titleTa: titleTa.trim(),
        category,
        images,
      })
    }, 320)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.52)',
        zIndex: 100, display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        padding: '1.5rem 1rem', overflowY: 'auto',
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.93, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.93, opacity: 0, y: 20 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: '#fff', borderRadius: 20, width: '100%', maxWidth: 560,
          boxShadow: '0 28px 72px rgba(0,0,0,0.24)',
          overflow: 'hidden', position: 'relative',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Gold top accent */}
        <div style={{ height: 3, background: `linear-gradient(90deg, ${GOLD} 0%, #E8C55A 50%, ${GOLD} 100%)` }} />

        {/* Header */}
        <div style={{
          padding: '1.3rem 1.5rem 1rem',
          borderBottom: '1px solid rgba(74,9,24,0.07)',
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
        }}>
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontWeight: 800, color: MAROON, marginBottom: 3 }}>
              {isEdit ? 'Edit Album' : 'Upload Gallery Album'}
            </h2>
            <p style={{ fontSize: '0.74rem', color: 'rgba(74,9,24,0.44)', lineHeight: 1.55 }}>
              {isEdit ? 'Update the album details and photos below.' : `Add up to ${MAX_IMAGES} photos. Topic titles are optional in each language.`}
            </p>
          </div>
          <button onClick={onClose}
            style={{
              background: 'rgba(74,9,24,0.06)', border: 'none', borderRadius: 8,
              width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: MAROON, flexShrink: 0, marginLeft: 12, transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(74,9,24,0.12)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(74,9,24,0.06)'}>
            <FiX size={15} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '1.2rem 1.5rem 1.4rem' }}>

          {/* ── Photo upload area ── */}
          <div style={{ marginBottom: '1.2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <label style={{ fontSize: '0.72rem', fontWeight: 600, color: 'rgba(74,9,24,0.58)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Photos
              </label>
              <span style={{ fontSize: '0.68rem', color: images.length >= MAX_IMAGES ? '#dc2626' : 'rgba(74,9,24,0.38)', fontWeight: 600 }}>
                {images.length} / {MAX_IMAGES}
              </span>
            </div>

            {/* Drop zone — shown when slots remain */}
            {remaining > 0 && (
              <div
                onDragOver={e => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileRef.current?.click()}
                style={{
                  border: `2px dashed ${images.length > 0 ? 'rgba(74,9,24,0.15)' : 'rgba(74,9,24,0.2)'}`,
                  borderRadius: 12, height: images.length > 0 ? 60 : 90,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  cursor: 'pointer', background: 'rgba(74,9,24,0.015)', transition: 'all 0.18s',
                  marginBottom: images.length > 0 ? '0.75rem' : 0,
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(74,9,24,0.035)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(74,9,24,0.015)'}
              >
                <FiPlus size={16} color="rgba(74,9,24,0.35)" />
                <span style={{ fontSize: '0.78rem', color: 'rgba(74,9,24,0.42)', fontWeight: 500, pointerEvents: 'none' }}>
                  {images.length === 0
                    ? `Click or drag to add photos (up to ${MAX_IMAGES})`
                    : `Add more — ${remaining} slot${remaining !== 1 ? 's' : ''} left`}
                </span>
              </div>
            )}
            <input
              ref={fileRef} type="file" accept="image/*" multiple
              onChange={handleFiles} style={{ display: 'none' }}
            />

            {/* Thumbnail grid */}
            {images.length > 0 && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: 8,
              }}>
                {images.map((src, idx) => (
                  <div key={idx} style={{ position: 'relative', aspectRatio: '1', borderRadius: 10, overflow: 'hidden' }}>
                    <img
                      src={src} alt={`photo ${idx + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                    {/* Cover badge on first image */}
                    {idx === 0 && (
                      <span style={{
                        position: 'absolute', bottom: 4, left: 4,
                        background: GOLD, color: '#fff',
                        fontSize: '0.52rem', fontWeight: 700,
                        padding: '2px 5px', borderRadius: 4,
                        letterSpacing: '0.05em',
                      }}>COVER</span>
                    )}
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      style={{
                        position: 'absolute', top: 4, right: 4,
                        width: 20, height: 20, borderRadius: '50%',
                        background: 'rgba(0,0,0,0.6)', border: 'none',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', color: '#fff', padding: 0,
                        transition: 'background 0.12s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(220,38,38,0.85)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.6)'}>
                      <FiX size={10} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Topic Title ── */}
          <div style={{ marginBottom: '0.2rem' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'rgba(74,9,24,0.42)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: 6 }}>
              <FiTag size={11} /> Topic Title
            </div>
            <LangField label="English" langLabel="EN" value={titleEn} onChange={setTitleEn} placeholder="e.g. Annual Planning Review 2026" />
            <LangField label="Sinhala" langLabel="SI" value={titleSi} onChange={setTitleSi} placeholder="e.g. වාර්ෂික සැලසුම් සමාලෝචනය" />
            <LangField label="Tamil"   langLabel="TA" value={titleTa} onChange={setTitleTa} placeholder="e.g. ஆண்டு திட்டமிடல் மதிப்பாய்வு" />
          </div>

          {/* ── Category ── */}
          <div style={{ marginBottom: '1.1rem' }}>
            <label style={{ fontSize: '0.72rem', fontWeight: 600, color: 'rgba(74,9,24,0.58)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 5 }}>
              Category
            </label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              style={{
                width: '100%', padding: '10px 12px',
                border: '1.5px solid rgba(74,9,24,0.15)', borderRadius: 9,
                fontSize: '0.83rem', fontFamily: 'Inter, sans-serif',
                color: MAROON, background: '#fff', outline: 'none', cursor: 'pointer',
                appearance: 'none', boxSizing: 'border-box',
              }}>
              {ALBUM_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* ── Error ── */}
          {error && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '9px 12px', borderRadius: 9, marginBottom: '1rem',
              background: 'rgba(220,38,38,0.07)', border: '1px solid rgba(220,38,38,0.18)',
            }}>
              <FiAlertCircle size={14} color="#dc2626" />
              <span style={{ fontSize: '0.78rem', color: '#dc2626' }}>{error}</span>
            </div>
          )}

          {/* ── Actions ── */}
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button type="button" onClick={onClose}
              style={{
                padding: '9px 20px', borderRadius: 10,
                border: '1px solid rgba(74,9,24,0.14)', background: 'transparent',
                color: 'rgba(74,9,24,0.55)', fontSize: '0.83rem', cursor: 'pointer',
                fontFamily: 'Inter, sans-serif', fontWeight: 500, transition: 'all 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(74,9,24,0.04)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              Cancel
            </button>
            <motion.button
              type="submit"
              disabled={saving}
              whileHover={!saving ? { y: -1, boxShadow: '0 6px 20px rgba(74,9,24,0.34)' } : {}}
              whileTap={!saving ? { scale: 0.97 } : {}}
              style={{
                padding: '9px 22px', borderRadius: 10, border: 'none',
                background: saving
                  ? 'rgba(74,9,24,0.4)'
                  : `linear-gradient(135deg, ${MAROON} 0%, #6E1528 100%)`,
                color: '#fff', fontSize: '0.83rem', cursor: saving ? 'default' : 'pointer',
                fontFamily: 'Inter, sans-serif', fontWeight: 600,
                display: 'flex', alignItems: 'center', gap: 7,
                boxShadow: '0 3px 12px rgba(74,9,24,0.28)',
                transition: 'background 0.15s',
              }}>
              <FiImage size={13} />
              {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Album'}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

// Simple error boundary to catch render errors in modals
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }
  static getDerivedStateFromError(error) {
    return { error }
  }
  componentDidCatch(error, info) {
    console.error('[ErrorBoundary] Caught error in modal:', error, info)
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.52)', zIndex: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: '1.25rem', maxWidth: 640, width: '100%' }}>
            <h3 style={{ marginTop: 0, color: '#b91c1c' }}>An error occurred</h3>
            <p style={{ color: '#374151' }}>Something went wrong while opening this dialog. Check the console for details.</p>
            <pre style={{ background: '#f8fafc', padding: 10, borderRadius: 8, overflowX: 'auto' }}>{String(this.state.error)}</pre>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
              <button onClick={() => this.setState({ error: null })} style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid rgba(74,9,24,0.12)', background: 'transparent', cursor: 'pointer' }}>Dismiss</button>
            </div>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

// ── Micro components ──────────────────────────────────────────────────────────
function ActionBtn({ icon: Icon, title, color, onClick }) {
  return (
    <button title={title} onClick={onClick}
      style={{
        width: 32, height: 32, borderRadius: 9,
        border: `1px solid ${color}22`, background: `${color}08`,
        color, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.15s',
        boxShadow: `0 1px 4px ${color}14`,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = color
        e.currentTarget.style.color = '#fff'
        e.currentTarget.style.borderColor = color
        e.currentTarget.style.transform = 'scale(1.06)'
        e.currentTarget.style.boxShadow = `0 4px 12px ${color}44`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = `${color}08`
        e.currentTarget.style.color = color
        e.currentTarget.style.borderColor = `${color}22`
        e.currentTarget.style.transform = 'scale(1)'
        e.currentTarget.style.boxShadow = `0 1px 4px ${color}14`
      }}>
      <Icon size={13} />
    </button>
  )
}

function StatusBadge({ s }) {
  const c = STATUS_COLORS[s] ?? { bg: 'rgba(0,0,0,0.06)', text: '#374151', dot: '#9ca3af' }
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '3px 10px', borderRadius: 100,
      background: c.bg, color: c.text,
      fontSize: '0.66rem', fontWeight: 700, letterSpacing: '0.03em', whiteSpace: 'nowrap',
      border: `1px solid ${c.dot}22`,
    }}>
      <span style={{
        width: 5, height: 5, borderRadius: '50%', background: c.dot,
        boxShadow: `0 0 5px ${c.dot}88`,
      }} />
      {s}
    </span>
  )
}

// ── Credential generators ─────────────────────────────────────────────────────
function secureInt(max) {
  const a = new Uint32Array(1)
  crypto.getRandomValues(a)
  return a[0] % max
}

function generateUsername() {
  const prefix = ['Plan', 'Admin', 'Gov', 'SP', 'Sec', 'PS'][secureInt(6)]
  const suffix = ['Officer', 'Admin', 'User', 'Staff', 'Mgr', 'Lead'][secureInt(6)]
  const num    = 100 + secureInt(900)
  return `${prefix}${suffix}${num}`
}

function generatePassword() {
  const U = 'ABCDEFGHJKLMNPQRSTUVWXYZ'
  const L = 'abcdefghjkmnpqrstuvwxyz'
  const D = '23456789'
  const S = '@#$!%^&*'
  const A = U + L + D + S
  // guarantee at least 2 of each class
  const pool = [U, U, L, L, D, D, S, S].map(s => s[secureInt(s.length)])
  for (let i = pool.length; i < 16; i++) pool.push(A[secureInt(A.length)])
  // Fisher-Yates shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = secureInt(i + 1);
    [pool[i], pool[j]] = [pool[j], pool[i]]
  }
  return pool.join('')
}

// ── Password strength helper ───────────────────────────────────────────────────
function passwordStrength(pw) {
  if (!pw) return { level: 0, label: '', color: 'transparent' }
  let score = 0
  if (pw.length >= 8)             score++
  if (pw.length >= 12)            score++
  if (/[A-Z]/.test(pw))          score++
  if (/[0-9]/.test(pw))          score++
  if (/[^A-Za-z0-9]/.test(pw))   score++
  if (score <= 1) return { level: 1, label: 'Weak',      color: '#dc2626' }
  if (score === 2) return { level: 2, label: 'Fair',      color: '#d97706' }
  if (score === 3) return { level: 3, label: 'Good',      color: '#2563eb' }
  return                          { level: 4, label: 'Strong',    color: '#16a34a' }
}

// Shared inline style atoms for Settings forms
const sInputBase = {
  width: '100%', border: 'none', outline: 'none',
  padding: '11px 14px 11px 38px',
  fontSize: '0.83rem', fontFamily: 'Inter, sans-serif',
  background: 'transparent', borderRadius: 9,
  color: MAROON,
}

// ── Publish Site Section ──────────────────────────────────────────────────────
function PublishSiteSection() {
  const { isLive, setLive } = useSitePublish()
  const [confirm, setConfirm] = useState(false)
  const [pending, setPending] = useState(null) // 'live' | 'soon'

  const requestToggle = (goLive) => {
    setPending(goLive ? 'live' : 'soon')
    setConfirm(true)
  }

  const executeToggle = () => {
    const goLive = pending === 'live'
    setLive(goLive)
    toast.success(goLive
      ? 'Site is now LIVE — visible to the public!'
      : 'Site set to Coming Soon — portal hidden from public.')
    setConfirm(false)
    setPending(null)
  }

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 }}>
          <div style={{ width: 3, height: 24, borderRadius: 2, background: `linear-gradient(${MAROON}, ${GOLD})`, flexShrink: 0 }} />
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.35rem', fontWeight: 800, color: MAROON, margin: 0 }}>
            Publish Site
          </h1>
        </div>
        <p style={{ fontSize: '0.76rem', color: 'rgba(74,9,24,0.4)', marginLeft: 13 }}>
          Control public visibility of the Southern Province Planning Secretariat Portal
        </p>
      </div>

      {/* Status hero card */}
      <motion.div
        key={isLive ? 'live' : 'soon'}
        initial={{ opacity: 0, y: 14, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        style={{
          borderRadius: 20,
          padding: '1.6rem 1.8rem',
          marginBottom: '1.4rem',
          position: 'relative',
          overflow: 'hidden',
          background: isLive
            ? `linear-gradient(135deg, #0d5e2e 0%, #166534 60%, #14532d 100%)`
            : `linear-gradient(135deg, ${MAROON2} 0%, ${MAROON} 60%, #7C1A32 100%)`,
          border: `1px solid ${isLive ? 'rgba(74,222,128,0.25)' : 'rgba(199,154,43,0.2)'}`,
          boxShadow: isLive
            ? '0 6px 32px rgba(22,101,52,0.28)'
            : '0 6px 28px rgba(74,9,24,0.22)',
        }}
      >
        {/* Top shimmer line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: isLive
            ? 'linear-gradient(90deg, transparent, #4ade80, transparent)'
            : `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
        }} />
        {/* BG orb */}
        <div style={{
          position: 'absolute', right: -40, bottom: -40,
          width: 160, height: 160, borderRadius: '50%',
          background: 'rgba(255,255,255,0.04)', pointerEvents: 'none',
        }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, position: 'relative', zIndex: 1 }}>
          {/* Icon */}
          <div style={{
            width: 58, height: 58, borderRadius: 16, flexShrink: 0,
            background: isLive ? 'rgba(74,222,128,0.2)' : `rgba(199,154,43,0.18)`,
            border: `1.5px solid ${isLive ? 'rgba(74,222,128,0.4)' : 'rgba(199,154,43,0.35)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {isLive
              ? <FiGlobe size={24} color="#4ade80" />
              : <FiZap   size={24} color={GOLD}    />
            }
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>
                {isLive ? 'Site is Live' : 'Coming Soon Mode'}
              </span>
              {/* Live pulse badge */}
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                background: isLive ? 'rgba(74,222,128,0.18)' : 'rgba(255,255,255,0.1)',
                border: `1px solid ${isLive ? 'rgba(74,222,128,0.4)' : 'rgba(255,255,255,0.2)'}`,
                borderRadius: 100, padding: '2px 10px',
                fontSize: '0.62rem', fontWeight: 700,
                color: isLive ? '#4ade80' : 'rgba(255,255,255,0.7)',
                letterSpacing: '0.06em', textTransform: 'uppercase',
              }}>
                <motion.span
                  animate={isLive ? { scale: [1, 1.7, 1], opacity: [1, 0.2, 1] } : {}}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    width: 5, height: 5, borderRadius: '50%',
                    background: isLive ? '#4ade80' : 'rgba(255,255,255,0.5)',
                    display: 'inline-block',
                  }}
                />
                {isLive ? 'Live' : 'Hidden'}
              </span>
            </div>
            <div style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.62)', lineHeight: 1.6 }}>
              {isLive
                ? 'The portal is publicly accessible. All pages are visible to visitors.'
                : 'The portal is hidden. Visitors see a Coming Soon screen instead.'}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Toggle buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.4rem' }}>

        {/* Go Live card */}
        <div style={{
          background: '#fff', borderRadius: 18,
          border: isLive ? '1.5px solid rgba(22,163,74,0.35)' : '1px solid rgba(74,9,24,0.07)',
          boxShadow: isLive ? '0 2px 12px rgba(22,163,74,0.1)' : '0 3px 16px rgba(74,9,24,0.06)',
          overflow: 'hidden', opacity: isLive ? 0.65 : 1,
        }}>
          <div style={{ padding: '1rem 1.2rem', borderBottom: '1px solid rgba(74,9,24,0.06)', background: 'rgba(22,163,74,0.03)', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(22,163,74,0.1)', border: '1px solid rgba(22,163,74,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <FiGlobe size={16} color="#16a34a" />
            </div>
            <div>
              <div style={{ fontSize: '0.86rem', fontWeight: 700, color: MAROON }}>Set Site Live</div>
              <div style={{ fontSize: '0.68rem', color: 'rgba(74,9,24,0.42)', marginTop: 1 }}>Publish to public internet</div>
            </div>
          </div>
          <div style={{ padding: '1.1rem 1.2rem' }}>
            <p style={{ fontSize: '0.73rem', color: 'rgba(74,9,24,0.55)', lineHeight: 1.7, margin: '0 0 1rem' }}>
              The entire portal becomes publicly visible. All pages — Home, About, Departments, Documents, News, Gallery — are accessible to anyone.
            </p>
            <motion.button
              whileHover={!isLive ? { y: -2, scale: 1.02 } : {}}
              whileTap={!isLive ? { scale: 0.97 } : {}}
              onClick={() => !isLive && requestToggle(true)}
              disabled={isLive}
              style={{
                width: '100%', padding: '10px 0', borderRadius: 10,
                background: isLive ? 'rgba(22,163,74,0.08)' : 'linear-gradient(135deg, #16a34a 0%, #14532d 100%)',
                border: isLive ? '1.5px solid rgba(22,163,74,0.3)' : 'none',
                color: isLive ? '#16a34a' : '#fff',
                fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '0.82rem',
                cursor: isLive ? 'default' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                boxShadow: isLive ? 'none' : '0 4px 16px rgba(22,163,74,0.28)',
              }}
            >
              <FiGlobe size={14} />
              {isLive ? 'Currently Live' : 'Go Live Now'}
            </motion.button>
          </div>
        </div>

        {/* Coming Soon card */}
        <div style={{
          background: '#fff', borderRadius: 18,
          border: !isLive ? `1.5px solid rgba(199,154,43,0.35)` : '1px solid rgba(74,9,24,0.07)',
          boxShadow: !isLive ? `0 2px 12px rgba(199,154,43,0.12)` : '0 3px 16px rgba(74,9,24,0.06)',
          overflow: 'hidden', opacity: !isLive ? 0.65 : 1,
        }}>
          <div style={{ padding: '1rem 1.2rem', borderBottom: '1px solid rgba(74,9,24,0.06)', background: 'rgba(199,154,43,0.03)', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(199,154,43,0.1)', border: `1px solid rgba(199,154,43,0.25)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <FiZap size={16} color={GOLD} />
            </div>
            <div>
              <div style={{ fontSize: '0.86rem', fontWeight: 700, color: MAROON }}>Coming Soon Mode</div>
              <div style={{ fontSize: '0.68rem', color: 'rgba(74,9,24,0.42)', marginTop: 1 }}>Hide portal from public</div>
            </div>
          </div>
          <div style={{ padding: '1.1rem 1.2rem' }}>
            <p style={{ fontSize: '0.73rem', color: 'rgba(74,9,24,0.55)', lineHeight: 1.7, margin: '0 0 1rem' }}>
              All portal pages are replaced with an animated Coming Soon screen. PMS New and PMS Old buttons remain accessible to staff.
            </p>
            <motion.button
              whileHover={isLive ? { y: -2, scale: 1.02 } : {}}
              whileTap={isLive ? { scale: 0.97 } : {}}
              onClick={() => isLive && requestToggle(false)}
              disabled={!isLive}
              style={{
                width: '100%', padding: '10px 0', borderRadius: 10,
                background: !isLive ? `rgba(199,154,43,0.08)` : `linear-gradient(135deg, ${GOLD} 0%, #9A7520 100%)`,
                border: !isLive ? `1.5px solid rgba(199,154,43,0.3)` : 'none',
                color: !isLive ? GOLD : '#fff',
                fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '0.82rem',
                cursor: !isLive ? 'default' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                boxShadow: !isLive ? 'none' : `0 4px 16px rgba(199,154,43,0.3)`,
              }}
            >
              <FiZap size={14} />
              {!isLive ? 'Currently in Coming Soon' : 'Switch to Coming Soon'}
            </motion.button>
          </div>
        </div>
      </div>

      {/* PMS links info card */}
      <div style={{
        background: '#fff', borderRadius: 18,
        border: '1px solid rgba(74,9,24,0.07)',
        boxShadow: '0 3px 16px rgba(74,9,24,0.06)',
        overflow: 'hidden', marginBottom: '1.1rem',
      }}>
        <div style={{ padding: '1rem 1.2rem', borderBottom: '1px solid rgba(74,9,24,0.06)', background: 'rgba(74,9,24,0.015)', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `rgba(74,9,24,0.07)`, border: `1px solid rgba(74,9,24,0.12)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <FiExternalLink size={16} color={MAROON} />
          </div>
          <div>
            <div style={{ fontSize: '0.86rem', fontWeight: 700, color: MAROON }}>PMS Quick Links</div>
            <div style={{ fontSize: '0.68rem', color: 'rgba(74,9,24,0.42)', marginTop: 1 }}>
              Shown on the Coming Soon screen for staff access
            </div>
          </div>
        </div>
        <div style={{ padding: '1.1rem 1.2rem', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {[
            { label: 'PMS New', sub: 'Latest version', href: 'https://pms.planning.gov.lk' },
            { label: 'PMS Old', sub: 'Previous version', href: 'https://pmsold.planning.gov.lk' },
          ].map(({ label, sub, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 1,
                padding: '10px 22px', borderRadius: 10,
                background: 'rgba(74,9,24,0.04)', border: '1.5px solid rgba(74,9,24,0.1)',
                textDecoration: 'none', cursor: 'pointer',
              }}
            >
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: MAROON, display: 'flex', alignItems: 'center', gap: 5 }}>
                {label} <FiExternalLink size={11} />
              </span>
              <span style={{ fontSize: '0.63rem', color: 'rgba(74,9,24,0.45)' }}>{sub}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Warning note */}
      <div style={{
        padding: '0.9rem 1.1rem', borderRadius: 12,
        background: 'rgba(180,83,9,0.05)', border: '1px solid rgba(180,83,9,0.15)',
        display: 'flex', alignItems: 'flex-start', gap: 10,
      }}>
        <FiAlertTriangle size={14} color="#d97706" style={{ marginTop: 2, flexShrink: 0 }} />
        <p style={{ fontSize: '0.73rem', color: 'rgba(74,9,24,0.55)', lineHeight: 1.7, margin: 0 }}>
          Switching to <strong>Live</strong> makes the entire portal accessible to the public immediately.
          Ensure all content is reviewed and approved before publishing.
          The CMS, SMP, and Admin sections are <strong>not affected</strong> by this setting.
        </p>
      </div>

      {/* Confirmation modal */}
      <AnimatePresence>
        {confirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 9999,
              background: 'rgba(10,4,8,0.55)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '1rem',
            }}
            onClick={() => setConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 10, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 26 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: '#fff', borderRadius: 22, width: '100%', maxWidth: 440,
                boxShadow: '0 24px 80px rgba(10,4,8,0.28)',
                overflow: 'hidden', border: '1px solid rgba(74,9,24,0.08)',
              }}
            >
              {/* Modal header */}
              <div style={{
                padding: '1.3rem 1.5rem', borderBottom: '1px solid rgba(74,9,24,0.07)',
                background: pending === 'live' ? 'rgba(22,163,74,0.04)' : `rgba(199,154,43,0.04)`,
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 13, flexShrink: 0,
                  background: pending === 'live' ? 'rgba(22,163,74,0.12)' : `rgba(199,154,43,0.12)`,
                  border: `1.5px solid ${pending === 'live' ? 'rgba(22,163,74,0.3)' : 'rgba(199,154,43,0.3)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {pending === 'live'
                    ? <FiGlobe size={20} color="#16a34a" />
                    : <FiZap   size={20} color={GOLD}    />
                  }
                </div>
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: MAROON }}>
                    {pending === 'live' ? 'Publish Site Live?' : 'Switch to Coming Soon?'}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(74,9,24,0.45)', marginTop: 2 }}>
                    This action takes effect immediately
                  </div>
                </div>
              </div>
              {/* Modal body */}
              <div style={{ padding: '1.3rem 1.5rem' }}>
                <p style={{ fontSize: '0.83rem', color: 'rgba(74,9,24,0.7)', lineHeight: 1.75, margin: '0 0 1.4rem' }}>
                  {pending === 'live'
                    ? 'The portal will become fully visible to the public. All pages will be accessible immediately. Are you sure you want to publish now?'
                    : 'The portal will be hidden from the public and replaced with the Coming Soon screen. Staff can still access PMS systems via the Coming Soon page. Continue?'
                  }
                </p>
                <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                  <motion.button
                    whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}
                    onClick={() => setConfirm(false)}
                    style={{
                      padding: '9px 20px', borderRadius: 9,
                      background: 'transparent', border: '1.5px solid rgba(74,9,24,0.15)',
                      color: 'rgba(74,9,24,0.6)', fontFamily: 'Inter, sans-serif',
                      fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer',
                    }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    onClick={executeToggle}
                    style={{
                      padding: '9px 22px', borderRadius: 9, border: 'none',
                      background: pending === 'live'
                        ? 'linear-gradient(135deg, #16a34a 0%, #14532d 100%)'
                        : `linear-gradient(135deg, ${GOLD} 0%, #9A7520 100%)`,
                      color: '#fff', fontFamily: 'Inter, sans-serif',
                      fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer',
                      boxShadow: pending === 'live'
                        ? '0 4px 16px rgba(22,163,74,0.3)'
                        : `0 4px 16px rgba(199,154,43,0.3)`,
                    }}
                  >
                    {pending === 'live' ? 'Yes, Go Live' : 'Yes, Hide Site'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Settings Section ──────────────────────────────────────────────────────────
function SettingsSection({ onUsernameChange }) {
  const [creds, setCreds] = useState(() => getCredentials())

  // ── Username form state
  const [newUser,      setNewUser]      = useState('')
  const [userPass,     setUserPass]     = useState('')
  const [showUserPass, setShowUserPass] = useState(false)
  const [userLoading,  setUserLoading]  = useState(false)
  const [userError,    setUserError]    = useState('')

  // ── Password form state
  const [curPass,        setCurPass]        = useState('')
  const [newPass,        setNewPass]        = useState('')
  const [confirmPass,    setConfirmPass]    = useState('')
  const [showCur,        setShowCur]        = useState(false)
  const [showNew,        setShowNew]        = useState(false)
  const [showConfirm,    setShowConfirm]    = useState(false)
  const [passLoading,    setPassLoading]    = useState(false)
  const [passError,      setPassError]      = useState('')

  const strength = passwordStrength(newPass)
  const passMatch = confirmPass && confirmPass === newPass

  const handleUsernameChange = async e => {
    e.preventDefault()
    if (!newUser.trim())                       return setUserError('Please enter a new username')
    if (newUser.trim() === creds?.username)    return setUserError('New username must be different from current')
    if (!userPass)                             return setUserError('Please enter your current password to verify')
    setUserLoading(true); setUserError('')
    try {
      await changeUsername(newUser.trim(), userPass)
      const updated = getCredentials()
      setCreds(updated)
      onUsernameChange(updated.username)
      toast.success(`Username changed to "${updated.username}"`)
      setNewUser(''); setUserPass('')
    } catch (err) {
      setUserError(err.message)
    } finally {
      setUserLoading(false)
    }
  }

  const handlePasswordChange = async e => {
    e.preventDefault()
    if (!curPass)                        return setPassError('Please enter your current password')
    if (!newPass)                        return setPassError('Please enter a new password')
    if (newPass.length < 8)              return setPassError('Password must be at least 8 characters')
    if (newPass !== confirmPass)         return setPassError('Passwords do not match')
    setPassLoading(true); setPassError('')
    try {
      await changePassword(curPass, newPass)
      toast.success('Password updated and re-encrypted successfully')
      setCurPass(''); setNewPass(''); setConfirmPass('')
    } catch (err) {
      setPassError(err.message)
    } finally {
      setPassLoading(false)
    }
  }

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 }}>
          <div style={{ width: 3, height: 24, borderRadius: 2, background: `linear-gradient(${MAROON}, ${GOLD})`, flexShrink: 0 }} />
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.35rem', fontWeight: 800, color: MAROON, margin: 0 }}>
            Settings
          </h1>
        </div>
        <p style={{ fontSize: '0.76rem', color: 'rgba(74,9,24,0.4)', marginLeft: 13 }}>
          Manage your account credentials and security
        </p>
      </div>

      {/* Account overview card */}
      <div style={{
        background: `linear-gradient(135deg, ${MAROON2} 0%, ${MAROON} 60%, #7C1A32 100%)`,
        borderRadius: 18,
        padding: '1.4rem 1.6rem', marginBottom: '1.4rem',
        border: '1px solid rgba(199,154,43,0.2)',
        boxShadow: '0 6px 28px rgba(74,9,24,0.2)',
        display: 'flex', alignItems: 'center', gap: 18,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />
        <div style={{ position: 'absolute', right: -30, bottom: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
        <div style={{
          width: 62, height: 62, borderRadius: 16, flexShrink: 0,
          background: `linear-gradient(135deg, ${GOLD} 0%, #9A7520 100%)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontSize: '1.5rem', fontWeight: 800,
          fontFamily: "'Cinzel', serif",
          boxShadow: `0 4px 16px rgba(199,154,43,0.4), 0 0 0 3px rgba(199,154,43,0.2)`,
        }}>
          {(creds?.username?.[0] ?? 'A').toUpperCase()}
        </div>
        <div style={{ flex: 1, minWidth: 0, position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>{creds?.username ?? 'Admin'}</div>
          <div style={{ fontSize: '0.74rem', color: GOLD, marginTop: 3, fontWeight: 600 }}>Super Administrator</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 100, padding: '3px 10px',
              fontSize: '0.63rem', fontWeight: 600, color: 'rgba(255,255,255,0.85)',
            }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 6px #4ade80' }} />
              SHA-256 Encrypted
            </span>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 100, padding: '3px 10px',
              fontSize: '0.63rem', fontWeight: 600, color: 'rgba(255,255,255,0.7)',
            }}>
              <FiShield size={10} /> Stored locally
            </span>
          </div>
        </div>
      </div>

      {/* Two-column form cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.1rem', marginBottom: '1.1rem' }}>

        {/* ── Change Username ── */}
        <div style={{ background: '#fff', borderRadius: 18, border: '1px solid rgba(74,9,24,0.07)', boxShadow: '0 3px 16px rgba(74,9,24,0.07)', overflow: 'hidden' }}>
          <div style={{ padding: '1.05rem 1.3rem', borderBottom: '1px solid rgba(74,9,24,0.06)', display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(74,9,24,0.015)' }}>
            <div style={{ width: 38, height: 38, borderRadius: 11, background: `linear-gradient(135deg, ${MAROON}18, ${MAROON}0a)`, border: `1px solid ${MAROON}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <FiUser size={16} color={MAROON} />
            </div>
            <div>
              <div style={{ fontSize: '0.87rem', fontWeight: 700, color: MAROON }}>Change Username</div>
              <div style={{ fontSize: '0.69rem', color: 'rgba(74,9,24,0.42)', marginTop: 1 }}>
                Current: <strong>{creds?.username ?? 'Admin'}</strong>
              </div>
            </div>
          </div>

          <form onSubmit={handleUsernameChange} style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>

            <SettingsField
              label="New Username"
              icon={FiUser}
              action={<>
                {newUser && <CopyBtn text={newUser} />}
                <GenBtn onClick={() => {
                  const u = generateUsername()
                  setNewUser(u)
                  toast.success(`Generated username: ${u}`)
                }} />
              </>}>
              <input
                value={newUser}
                onChange={e => setNewUser(e.target.value)}
                placeholder="Enter or generate a username"
                autoComplete="off"
                style={sInputBase}
              />
            </SettingsField>

            <SettingsField label="Current Password (to verify)" icon={FiLock}>
              <input
                type={showUserPass ? 'text' : 'password'}
                value={userPass}
                onChange={e => setUserPass(e.target.value)}
                placeholder="Enter current password"
                autoComplete="current-password"
                style={{ ...sInputBase, paddingRight: 40 }}
              />
              <EyeToggle show={showUserPass} onToggle={() => setShowUserPass(v => !v)} />
            </SettingsField>

            <AnimatePresence>
              {userError && <SettingsError msg={userError} />}
            </AnimatePresence>

            <SettingsSubmit loading={userLoading} icon={FiUser} label="Update Username" />
          </form>
        </div>

        {/* ── Change Password ── */}
        <div style={{ background: '#fff', borderRadius: 18, border: '1px solid rgba(74,9,24,0.07)', boxShadow: '0 3px 16px rgba(74,9,24,0.07)', overflow: 'hidden' }}>
          <div style={{ padding: '1.05rem 1.3rem', borderBottom: '1px solid rgba(74,9,24,0.06)', display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(74,9,24,0.015)' }}>
            <div style={{ width: 38, height: 38, borderRadius: 11, background: `linear-gradient(135deg, ${GOLD}22, ${GOLD}0e)`, border: `1px solid ${GOLD}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <FiLock size={16} color={GOLD} />
            </div>
            <div>
              <div style={{ fontSize: '0.87rem', fontWeight: 700, color: MAROON }}>Change Password</div>
              <div style={{ fontSize: '0.69rem', color: 'rgba(74,9,24,0.42)', marginTop: 1 }}>SHA-256 re-encrypted on save</div>
            </div>
          </div>

          <form onSubmit={handlePasswordChange} style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>

            <SettingsField label="Current Password" icon={FiLock}>
              <input
                type={showCur ? 'text' : 'password'}
                value={curPass}
                onChange={e => setCurPass(e.target.value)}
                placeholder="Enter current password"
                autoComplete="current-password"
                style={{ ...sInputBase, paddingRight: 40 }}
              />
              <EyeToggle show={showCur} onToggle={() => setShowCur(v => !v)} />
            </SettingsField>

            <SettingsField
              label="New Password"
              icon={FiLock}
              action={<>
                {newPass && <CopyBtn text={newPass} />}
                <GenBtn onClick={() => {
                  const p = generatePassword()
                  setNewPass(p)
                  setConfirmPass(p)
                  setShowNew(true)
                  toast.success('Strong password generated — remember to save it!')
                }} />
              </>}>
              <input
                type={showNew ? 'text' : 'password'}
                value={newPass}
                onChange={e => setNewPass(e.target.value)}
                placeholder="Enter or generate a password"
                autoComplete="new-password"
                style={{ ...sInputBase, paddingRight: 40 }}
              />
              <EyeToggle show={showNew} onToggle={() => setShowNew(v => !v)} />
              {/* Strength meter */}
              {newPass && (
                <div style={{ marginTop: 7 }}>
                  <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
                    {[1, 2, 3, 4].map(lvl => (
                      <div key={lvl} style={{
                        flex: 1, height: 3, borderRadius: 100,
                        background: lvl <= strength.level ? strength.color : 'rgba(74,9,24,0.08)',
                        transition: 'background 0.25s',
                      }} />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.65rem', fontWeight: 600, color: strength.color }}>{strength.label}</span>
                </div>
              )}
            </SettingsField>

            <SettingsField label="Confirm New Password" icon={FiShield}>
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirmPass}
                onChange={e => setConfirmPass(e.target.value)}
                placeholder="Re-enter new password"
                autoComplete="new-password"
                style={{
                  ...sInputBase, paddingRight: 40,
                  ...(confirmPass && !passMatch ? { color: '#dc2626' } : {}),
                }}
              />
              <EyeToggle show={showConfirm} onToggle={() => setShowConfirm(v => !v)} />
              {passMatch && (
                <div style={{ position: 'absolute', right: 40, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                  <FiCheck size={14} color="#16a34a" />
                </div>
              )}
            </SettingsField>

            <AnimatePresence>
              {passError && <SettingsError msg={passError} />}
            </AnimatePresence>

            <SettingsSubmit loading={passLoading} icon={FiLock} label="Update Password" gold />
          </form>
        </div>

      </div>

      {/* Security note */}
      <div style={{
        padding: '0.9rem 1.1rem', borderRadius: 12,
        background: 'rgba(74,9,24,0.04)', border: '1px solid rgba(74,9,24,0.08)',
        display: 'flex', alignItems: 'flex-start', gap: 10,
      }}>
        <FiShield size={14} color={GOLD} style={{ marginTop: 2, flexShrink: 0 }} />
        <p style={{ fontSize: '0.73rem', color: 'rgba(74,9,24,0.5)', lineHeight: 1.7, margin: 0 }}>
          All passwords are hashed with <strong>SHA-256</strong> using the browser&apos;s built-in Web Crypto API
          before being stored in <code style={{ fontSize: '0.7rem', background: 'rgba(74,9,24,0.07)', padding: '1px 5px', borderRadius: 4 }}>localStorage</code>.
          Plain-text passwords are never saved. After changing credentials, your current session remains active.
        </p>
      </div>
    </div>
  )
}

// ── Settings micro-components ─────────────────────────────────────────────────
function SettingsField({ label, icon: Icon, children, action }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
        <label style={{ fontSize: '0.7rem', fontWeight: 600, color: 'rgba(74,9,24,0.55)', letterSpacing: '0.07em', textTransform: 'uppercase' }}>
          {label}
        </label>
        {action && <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>{action}</div>}
      </div>
      <div style={{
        position: 'relative',
        border: '1.5px solid rgba(74,9,24,0.14)', borderRadius: 9,
        background: '#fff', display: 'flex', alignItems: 'center',
        transition: 'border-color 0.18s, box-shadow 0.18s',
      }}
        onFocusCapture={e => {
          e.currentTarget.style.borderColor = GOLD
          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(199,154,43,0.12)'
        }}
        onBlurCapture={e => {
          e.currentTarget.style.borderColor = 'rgba(74,9,24,0.14)'
          e.currentTarget.style.boxShadow = 'none'
        }}>
        <Icon size={14} color="rgba(74,9,24,0.35)" style={{ position: 'absolute', left: 13, pointerEvents: 'none' }} />
        {children}
      </div>
    </div>
  )
}

function EyeToggle({ show, onToggle }) {
  return (
    <button type="button" onClick={onToggle}
      style={{
        position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
        background: 'none', border: 'none', cursor: 'pointer', padding: 2,
        color: 'rgba(74,9,24,0.38)', display: 'flex', alignItems: 'center',
      }}>
      {show ? <FiEyeOff size={14} /> : <FiEye size={14} />}
    </button>
  )
}

function SettingsError({ msg }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6, height: 0 }}
      animate={{ opacity: 1, y: 0, height: 'auto' }}
      exit={{ opacity: 0, y: -6, height: 0 }}
      style={{
        display: 'flex', alignItems: 'center', gap: 8,
        background: 'rgba(220,38,38,0.07)', border: '1px solid rgba(220,38,38,0.2)',
        borderRadius: 8, padding: '8px 12px', overflow: 'hidden',
      }}>
      <FiAlertCircle size={13} color="#DC2626" />
      <span style={{ fontSize: '0.78rem', color: '#DC2626' }}>{msg}</span>
    </motion.div>
  )
}

function SettingsSubmit({ loading, icon: Icon, label, gold }) {
  const bg = gold
    ? `linear-gradient(135deg, ${GOLD} 0%, #9A7520 100%)`
    : `linear-gradient(135deg, ${MAROON} 0%, #6E1528 100%)`
  return (
    <motion.button
      type="submit"
      whileHover={!loading ? { y: -1.5, boxShadow: gold ? '0 8px 22px rgba(199,154,43,0.38)' : '0 8px 22px rgba(74,9,24,0.34)' } : {}}
      whileTap={!loading ? { scale: 0.97 } : {}}
      disabled={loading}
      style={{
        width: '100%', padding: '11px', borderRadius: 10, border: 'none',
        background: loading ? 'rgba(74,9,24,0.35)' : bg,
        color: '#fff', fontSize: '0.8rem', fontWeight: 600,
        cursor: loading ? 'not-allowed' : 'pointer',
        fontFamily: 'Inter, sans-serif',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        boxShadow: loading ? 'none' : gold ? '0 3px 12px rgba(199,154,43,0.3)' : '0 3px 12px rgba(74,9,24,0.28)',
        transition: 'background 0.2s, box-shadow 0.2s',
        marginTop: '0.25rem',
      }}>
      {loading
        ? <MiniSpinner />
        : <><Icon size={13} /> {label}</>}
    </motion.button>
  )
}

function MiniSpinner() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 0.85, repeat: Infinity, ease: 'linear' }}
      style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.28)', borderTopColor: '#fff' }}
    />
  )
}

function GenBtn({ onClick }) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 4,
        padding: '3px 9px', borderRadius: 6,
        border: `1px solid ${GOLD}55`,
        background: `${GOLD}12`,
        color: GOLD, fontSize: '0.65rem', fontWeight: 700,
        cursor: 'pointer', fontFamily: 'Inter, sans-serif',
        letterSpacing: '0.04em', whiteSpace: 'nowrap',
        transition: 'background 0.15s',
      }}
      onMouseEnter={e => e.currentTarget.style.background = `${GOLD}22`}
      onMouseLeave={e => e.currentTarget.style.background = `${GOLD}12`}>
      ↻ Generate
    </motion.button>
  )
}

function CopyBtn({ text }) {
  const [done, setDone] = useState(false)
  const handle = () => {
    navigator.clipboard.writeText(text).then(() => {
      setDone(true)
      setTimeout(() => setDone(false), 2000)
    })
  }
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.95 }}
      onClick={handle}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 4,
        padding: '3px 9px', borderRadius: 6,
        border: `1px solid ${done ? '#16a34a' : 'rgba(74,9,24,0.18)'}`,
        background: done ? 'rgba(22,101,52,0.1)' : 'rgba(74,9,24,0.05)',
        color: done ? '#166534' : 'rgba(74,9,24,0.5)',
        fontSize: '0.65rem', fontWeight: 700,
        cursor: 'pointer', fontFamily: 'Inter, sans-serif',
        letterSpacing: '0.04em', whiteSpace: 'nowrap',
        transition: 'all 0.2s',
      }}>
      {done ? '✓ Copied' : '⎘ Copy'}
    </motion.button>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CMS DOWNLOADS SECTION
// ─────────────────────────────────────────────────────────────────────────────
const DL_CATEGORIES = ['Circulars', 'Forms', 'Reports', 'Notices', 'Guidelines', 'Applications', 'Other']
const DL_FILE_TYPES = ['PDF', 'DOC', 'DOCX', 'XLS', 'XLSX', 'PNG', 'JPG', 'Other']
// ...existing code...

const dlLabelStyle = {
  fontSize: '0.72rem', fontWeight: 600, color: 'rgba(74,9,24,0.55)',
  textTransform: 'uppercase', letterSpacing: '0.06em',
  fontFamily: 'Inter, sans-serif', display: 'block', marginBottom: 5,
}

const dlInputStyle = {
  width: '100%', padding: '9px 12px',
  border: '1px solid rgba(74,9,24,0.15)',
  borderRadius: 8, fontSize: '0.84rem',
  fontFamily: 'Inter, sans-serif',
  color: MAROON, background: '#fff',
  outline: 'none', boxSizing: 'border-box',
}

const dlSelectStyle = {
  ...dlInputStyle,
  appearance: 'none',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%234A0918' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 10px center',
  paddingRight: 30,
}

function DownloadsSection({ rows, onDelete, onAdd, onEdit, search, setSearch }) {
  const filtered = (rows || []).filter(r => {
    if (!search.trim()) return true
    const q = search.toLowerCase()
    return (
      (r.titleEn || r.title || '').toLowerCase().includes(q) ||
      (r.category || '').toLowerCase().includes(q) ||
      (r.fileType || '').toLowerCase().includes(q) ||
      (r.status || '').toLowerCase().includes(q)
    )
  })

  const statusColors = {
    Active:    { bg: 'rgba(22,101,52,0.1)',  text: '#166534', dot: '#16a34a' },
    Inactive:  { bg: 'rgba(107,114,128,0.1)', text: '#374151', dot: '#6b7280' },
    Draft:     { bg: 'rgba(180,83,9,0.1)',   text: '#92400e', dot: '#d97706' },
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.4rem', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 }}>
            <div style={{ width: 3, height: 24, borderRadius: 2, background: `linear-gradient(${MAROON}, ${GOLD})`, flexShrink: 0 }} />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.1rem, 2vw, 1.35rem)', fontWeight: 800, color: MAROON, margin: 0 }}>
              Downloads
            </h2>
          </div>
          <p style={{ fontSize: '0.76rem', color: 'rgba(74,9,24,0.45)', marginLeft: 13, fontFamily: 'Inter, sans-serif' }}>
            Manage downloadable files visible on the public Downloads page
          </p>
        </div>
        <motion.button
          whileHover={{ y: -2, boxShadow: '0 10px 28px rgba(74,9,24,0.36)' }} whileTap={{ scale: 0.97 }}
          onClick={onAdd}
          style={{
            display: 'flex', alignItems: 'center', gap: 7,
            background: `linear-gradient(135deg, ${MAROON} 0%, #7C1A32 100%)`,
            color: '#fff', border: 'none', borderRadius: 11,
            padding: '9px 18px', fontSize: '0.8rem', fontWeight: 600,
            cursor: 'pointer', fontFamily: 'Inter, sans-serif',
            boxShadow: `0 4px 16px rgba(74,9,24,0.3)`,
          }}>
          <FiPlus size={14} /> Add Download
        </motion.button>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: '1rem' }}>
        <FiSearch size={14} style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: 'rgba(74,9,24,0.38)', pointerEvents: 'none' }} />
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search downloads…"
          style={{ ...dlInputStyle, paddingLeft: 32 }}
        />
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'rgba(74,9,24,0.4)', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
          {rows.length === 0 ? 'No downloads yet. Click "Add Download" to publish the first file.' : 'No matches found.'}
        </div>
      )}

      {/* Table */}
      {filtered.length > 0 && (
        <div style={{ overflowX: 'auto', borderRadius: 12, border: '1px solid rgba(74,9,24,0.08)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Inter, sans-serif', fontSize: '0.83rem' }}>
            <thead>
              <tr style={{ background: 'rgba(74,9,24,0.04)', borderBottom: '1px solid rgba(74,9,24,0.08)' }}>
                {['Title', 'Category', 'Type', 'Date', 'Status', ''].map(h => (
                  <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: 'rgba(74,9,24,0.5)', fontWeight: 600, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => {
                const sc = statusColors[r.status] || statusColors.Draft
                return (
                  <tr key={r.id} style={{ background: i % 2 === 0 ? '#fff' : 'rgba(74,9,24,0.016)', borderBottom: '1px solid rgba(74,9,24,0.06)', transition: 'background 0.15s' }}>
                    <td style={{ padding: '10px 12px', color: MAROON, fontWeight: 600, maxWidth: 220 }}>
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.titleEn || r.title || '—'}</div>
                      {r.titleSi && <div style={{ fontSize: '0.7rem', color: 'rgba(74,9,24,0.4)', marginTop: 2, fontFamily: "'Noto Sans Sinhala', sans-serif" }}>{r.titleSi}</div>}
                    </td>
                    <td style={{ padding: '10px 12px', color: 'rgba(74,9,24,0.65)', whiteSpace: 'nowrap' }}>{r.category || '—'}</td>
                    <td style={{ padding: '10px 12px' }}>
                      <span style={{ background: `${GOLD}18`, color: GOLD, border: `1px solid ${GOLD}30`, borderRadius: 5, padding: '2px 8px', fontSize: '0.68rem', fontWeight: 700, fontFamily: 'DM Mono, monospace', letterSpacing: '0.06em' }}>
                        {(r.fileType || '—').toUpperCase()}
                      </span>
                    </td>
                    <td style={{ padding: '10px 12px', color: 'rgba(74,9,24,0.5)', whiteSpace: 'nowrap' }}>{r.date || '—'}</td>
                    <td style={{ padding: '10px 12px' }}>
                      <span style={{ background: sc.bg, color: sc.text, borderRadius: 20, padding: '3px 10px', fontSize: '0.7rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 5, whiteSpace: 'nowrap' }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: sc.dot, flexShrink: 0 }} />
                        {r.status || 'Draft'}
                      </span>
                    </td>
                    <td style={{ padding: '10px 12px' }}>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <motion.button whileTap={{ scale: 0.93 }} onClick={() => onEdit(r)}
                          style={{ background: 'none', border: `1px solid ${GOLD}40`, borderRadius: 7, padding: '5px 8px', cursor: 'pointer', color: GOLD, display: 'flex', alignItems: 'center' }}>
                          <FiEdit2 size={13} />
                        </motion.button>
                        <motion.button whileTap={{ scale: 0.93 }} onClick={() => onDelete(r.id)}
                          style={{ background: 'none', border: '1px solid rgba(220,38,38,0.25)', borderRadius: 7, padding: '5px 8px', cursor: 'pointer', color: '#dc2626', display: 'flex', alignItems: 'center' }}>
                          <FiTrash2 size={13} />
                        </motion.button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      <p style={{ fontSize: '0.72rem', color: 'rgba(74,9,24,0.38)', marginTop: 10, fontFamily: 'Inter, sans-serif' }}>
        {filtered.length} of {rows.length} items shown · Only <strong>Active</strong> items appear on the public Downloads page
      </p>
    </div>
  )
}

// ── Download Add/Edit Form Modal ──────────────────────────────────────────────
function DownloadFormModal({ initialData, onClose, onSave }) {
  const isEdit = !!initialData
  const [form, setForm] = useState({
    titleEn:        initialData?.titleEn        || '',
    titleSi:        initialData?.titleSi        || '',
    titleTa:        initialData?.titleTa        || '',
    description:    initialData?.description    || '',
    category:       initialData?.category       || 'Reports',
    fileUrl:        initialData?.fileUrl        || '',
    fileName:       initialData?.fileName       || '',
    fileType:       initialData?.fileType       || 'PDF',
    fileSize:       initialData?.fileSize       || '',
    status:         initialData?.status         || 'Active',
    downloadAccess: initialData?.downloadAccess || 'Everyone',
  })
  const [errors, setErrors] = useState({})

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const validate = () => {
    const e = {}
    if (!form.titleEn.trim()) e.titleEn = 'English title is required'
    if (!form.fileUrl.trim()) e.fileUrl = 'File URL is required'
    if (!form.category)       e.category = 'Category is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSave = () => {
    if (validate()) onSave(form)
  }

  const inputStyle = { ...dlInputStyle, marginTop: 2 }
  const selectStyle = { ...dlSelectStyle, marginTop: 2 }
  const fieldStyle = { display: 'flex', flexDirection: 'column', gap: 0 }
  const errStyle = { fontSize: '0.72rem', color: '#dc2626', marginTop: 3, fontFamily: 'Inter, sans-serif' }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.52)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <motion.div
        initial={{ scale: 0.93, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.93, opacity: 0, y: 20 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        onClick={e => e.stopPropagation()}
        style={{ background: '#fff', borderRadius: 20, padding: 'clamp(1.25rem, 3vw, 1.75rem)', maxWidth: 600, width: '100%', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 24px 64px rgba(0,0,0,0.24)' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: `${MAROON}12`, border: `1px solid ${MAROON}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FiDownload size={18} color={MAROON} />
            </div>
            <div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', fontWeight: 800, color: MAROON, margin: 0 }}>
                {isEdit ? 'Edit Download' : 'Add Download'}
              </h3>
              <p style={{ fontSize: '0.72rem', color: 'rgba(74,9,24,0.45)', margin: '2px 0 0', fontFamily: 'Inter, sans-serif' }}>
                {isEdit ? 'Update the download item' : 'Publish a new downloadable file'}
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(74,9,24,0.45)', padding: 4, borderRadius: 6, display: 'flex', alignItems: 'center' }}>
            <FiX size={18} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>

          {/* Title EN */}
          <div style={{ ...fieldStyle, gridColumn: '1 / -1' }}>
            <label style={dlLabelStyle}>Title (English) <span style={{ color: '#dc2626' }}>*</span></label>
            <input value={form.titleEn} onChange={e => set('titleEn', e.target.value)} placeholder="Enter English title" style={{ ...inputStyle, borderColor: errors.titleEn ? '#dc2626' : undefined }} />
            {errors.titleEn && <span style={errStyle}>{errors.titleEn}</span>}
          </div>

          {/* Title SI */}
          <div style={fieldStyle}>
            <label style={dlLabelStyle}>Title (Sinhala)</label>
            <input value={form.titleSi} onChange={e => set('titleSi', e.target.value)} placeholder="සිංහල මාතෘකාව" style={{ ...inputStyle, fontFamily: "'Noto Sans Sinhala', sans-serif" }} />
          </div>

          {/* Title TA */}
          <div style={fieldStyle}>
            <label style={dlLabelStyle}>Title (Tamil)</label>
            <input value={form.titleTa} onChange={e => set('titleTa', e.target.value)} placeholder="தமிழ் தலைப்பு" style={{ ...inputStyle, fontFamily: "'Noto Sans Tamil', sans-serif" }} />
          </div>

          {/* Description */}
          <div style={{ ...fieldStyle, gridColumn: '1 / -1' }}>
            <label style={dlLabelStyle}>Description</label>
            <textarea value={form.description} onChange={e => set('description', e.target.value)} placeholder="Brief description of this document (optional)" rows={2}
              style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }} />
          </div>

          {/* File URL */}
          <div style={{ ...fieldStyle, gridColumn: '1 / -1' }}>
            <label style={dlLabelStyle}>File URL <span style={{ color: '#dc2626' }}>*</span></label>
            <input value={form.fileUrl} onChange={e => set('fileUrl', e.target.value)} placeholder="https://drive.google.com/… or direct file URL"
              style={{ ...inputStyle, borderColor: errors.fileUrl ? '#dc2626' : undefined }} />
            {errors.fileUrl && <span style={errStyle}>{errors.fileUrl}</span>}
            <span style={{ fontSize: '0.69rem', color: 'rgba(74,9,24,0.38)', marginTop: 3, fontFamily: 'Inter, sans-serif' }}>
              Use a Google Drive share link, OneDrive link, or direct URL to the file.
            </span>
          </div>

          {/* File Name */}
          <div style={fieldStyle}>
            <label style={dlLabelStyle}>File Name (download as)</label>
            <input value={form.fileName} onChange={e => set('fileName', e.target.value)} placeholder="annual-report-2025.pdf" style={inputStyle} />
          </div>

          {/* File Type */}
          <div style={fieldStyle}>
            <label style={dlLabelStyle}>File Type</label>
            <div style={{ position: 'relative' }}>
              <select value={form.fileType} onChange={e => set('fileType', e.target.value)} style={selectStyle}>
                {DL_FILE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          {/* Category */}
          <div style={fieldStyle}>
            <label style={dlLabelStyle}>Category <span style={{ color: '#dc2626' }}>*</span></label>
            <div style={{ position: 'relative' }}>
              <select value={form.category} onChange={e => set('category', e.target.value)} style={{ ...selectStyle, borderColor: errors.category ? '#dc2626' : undefined }}>
                {DL_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            {errors.category && <span style={errStyle}>{errors.category}</span>}
          </div>

          {/* Status */}
          <div style={fieldStyle}>
            <label style={dlLabelStyle}>Status</label>
            <div style={{ position: 'relative' }}>
              <select value={form.status} onChange={e => set('status', e.target.value)} style={selectStyle}>
                <option value="Active">Active (visible)</option>
                <option value="Draft">Draft (hidden)</option>
                <option value="Inactive">Inactive (hidden)</option>
              </select>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(74,9,24,0.08)' }}>
          <motion.button whileTap={{ scale: 0.97 }} onClick={onClose}
            style={{ background: 'none', border: '1px solid rgba(74,9,24,0.18)', borderRadius: 9, padding: '9px 20px', fontSize: '0.84rem', fontWeight: 600, cursor: 'pointer', color: 'rgba(74,9,24,0.6)', fontFamily: 'Inter, sans-serif' }}>
            Cancel
          </motion.button>
          <motion.button whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }} onClick={handleSave}
            style={{ background: `linear-gradient(135deg, ${MAROON}, #7c1730)`, border: 'none', borderRadius: 9, padding: '9px 22px', fontSize: '0.84rem', fontWeight: 600, cursor: 'pointer', color: '#fff', fontFamily: 'Inter, sans-serif', boxShadow: `0 4px 14px rgba(74,9,24,0.28)`, display: 'flex', alignItems: 'center', gap: 7 }}>
            <FiCheck size={14} />
            {isEdit ? 'Save Changes' : 'Add Download'}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Complaints & Feedback Section ─────────────────────────────────────────────
const API_BASE = import.meta.env.VITE_API_URL || ''

const COMPLAINT_STATUS_OPTIONS = ['New', 'In Review', 'Resolved', 'Closed']
const COMPLAINT_STATUS_STYLE = {
  New:         { bg: 'rgba(239,68,68,0.1)',   text: '#b91c1c',  dot: '#ef4444' },
  'In Review': { bg: 'rgba(234,179,8,0.1)',   text: '#854d0e',  dot: '#eab308' },
  Resolved:    { bg: 'rgba(22,163,74,0.1)',   text: '#166534',  dot: '#16a34a' },
  Closed:      { bg: 'rgba(107,114,128,0.1)', text: '#374151',  dot: '#6b7280' },
}
const COMPLAINT_TYPE_COLORS = {
  'Complaint':                  { bg: 'rgba(239,68,68,0.08)',   text: '#b91c1c' },
  'Suggestion':                 { bg: 'rgba(16,185,129,0.08)',  text: '#065f46' },
  'General Inquiry':            { bg: 'rgba(59,130,246,0.08)',  text: '#1e40af' },
  'Service Feedback':           { bg: 'rgba(139,92,246,0.08)',  text: '#4c1d95' },
  'Right to Information (RTI)': { bg: 'rgba(245,158,11,0.08)', text: '#78350f' },
}

function ComplaintsSection() {
  const [items,        setItems]        = useState([])
  const [loading,      setLoading]      = useState(true)
  const [fetchError,   setFetchError]   = useState('')
  const [search,       setSearch]       = useState('')
  const [filterType,   setFilterType]   = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterDept,   setFilterDept]   = useState('')
  const [viewItem,     setViewItem]     = useState(null)

  const fetchComplaints = useCallback(async () => {
    setLoading(true); setFetchError('')
    try {
      const res = await fetch(`${API_BASE}/api/contact`)
      if (!res.ok) throw new Error('Failed to load submissions.')
      setItems(await res.json())
    } catch (e) {
      setFetchError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchComplaints() }, [fetchComplaints])

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_BASE}/api/contact/${id}`, {
        method:  'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ status }),
      })
      if (!res.ok) throw new Error()
      setItems(prev => prev.map(c => c.id === id ? { ...c, status } : c))
      setViewItem(v => v?.id === id ? { ...v, status } : v)
      toast.success(`Status updated to "${status}"`)
    } catch {
      toast.error('Failed to update status.')
    }
  }

  const deleteItem = async (id) => {
    if (!confirm('Delete this submission? This cannot be undone.')) return
    try {
      const res = await fetch(`${API_BASE}/api/contact/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      setItems(prev => prev.filter(c => c.id !== id))
      setViewItem(v => v?.id === id ? null : v)
      toast.success('Submission deleted.')
    } catch {
      toast.error('Failed to delete submission.')
    }
  }

  const filtered = items.filter(c => {
    const q = search.toLowerCase()
    const matchSearch = !q || [c.name, c.email, c.subject, c.type, c.dept, c.message]
      .some(v => (v || '').toLowerCase().includes(q))
    const matchType   = !filterType   || c.type   === filterType
    const matchStatus = !filterStatus || c.status === filterStatus
    const matchDept   = !filterDept   || c.dept   === filterDept
    return matchSearch && matchType && matchStatus && matchDept
  })

  const types = [...new Set(items.map(c => c.type).filter(Boolean))]
  const depts = ['Development', 'Accounts', 'Administration']

  const statCounts = {
    total:    items.length,
    new:      items.filter(c => c.status === 'New').length,
    inReview: items.filter(c => c.status === 'In Review').length,
    resolved: items.filter(c => c.status === 'Resolved').length,
  }

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 }}>
            <div style={{ width: 3, height: 28, borderRadius: 2, background: `linear-gradient(${MAROON}, ${GOLD})`, flexShrink: 0 }} />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.45rem', fontWeight: 800, color: MAROON, margin: 0 }}>
              Complaints &amp; Feedback
            </h2>
          </div>
          <p style={{ fontSize: '0.76rem', color: 'rgba(74,9,24,0.45)', marginLeft: 13 }}>
            Submissions received through the public contact form
          </p>
        </div>
        <motion.button
          whileHover={{ y: -1, boxShadow: '0 6px 18px rgba(74,9,24,0.14)' }}
          whileTap={{ scale: 0.97 }}
          onClick={fetchComplaints}
          style={{
            display: 'flex', alignItems: 'center', gap: 7,
            padding: '9px 16px', borderRadius: 10,
            border: '1px solid rgba(74,9,24,0.12)', background: '#fff',
            color: MAROON, fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer',
            fontFamily: 'Inter, sans-serif', transition: 'all 0.15s',
            boxShadow: '0 2px 10px rgba(74,9,24,0.06)',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(74,9,24,0.04)'}
          onMouseLeave={e => e.currentTarget.style.background = '#fff'}>
          <FiRefreshCw size={13} /> Refresh
        </motion.button>
      </div>

      {/* Stats strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: '1.4rem' }}>
        {[
          { label: 'Total',     value: statCounts.total,    color: MAROON,    bg: `linear-gradient(135deg, ${MAROON} 0%, #7C1A32 100%)`, featured: true },
          { label: 'New',       value: statCounts.new,      color: '#ef4444', bg: null },
          { label: 'In Review', value: statCounts.inReview, color: '#d97706', bg: null },
          { label: 'Resolved',  value: statCounts.resolved, color: '#16a34a', bg: null },
        ].map(s => (
          <motion.div key={s.label}
            whileHover={{ y: -2, boxShadow: s.featured ? '0 10px 32px rgba(74,9,24,0.25)' : '0 6px 20px rgba(74,9,24,0.1)' }}
            style={{
              background: s.featured ? s.bg : '#fff',
              borderRadius: 16, padding: '1.1rem 1.3rem',
              border: s.featured ? '1px solid rgba(199,154,43,0.25)' : '1px solid rgba(74,9,24,0.07)',
              boxShadow: s.featured ? '0 4px 18px rgba(74,9,24,0.18)' : '0 2px 10px rgba(74,9,24,0.05)',
              position: 'relative', overflow: 'hidden',
              transition: 'box-shadow 0.2s',
            }}>
            {s.featured && (
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />
            )}
            <div style={{
              fontSize: '1.75rem', fontWeight: 900, lineHeight: 1,
              color: s.featured ? '#fff' : s.color,
              fontFamily: "'Cinzel', serif",
            }}>{String(s.value).padStart(2, '0')}</div>
            <div style={{
              fontSize: '0.7rem', marginTop: 6, fontWeight: 600,
              color: s.featured ? 'rgba(255,255,255,0.65)' : 'rgba(74,9,24,0.45)',
            }}>{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 10, marginBottom: '1rem', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <FiSearch size={13} style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: 'rgba(74,9,24,0.35)', pointerEvents: 'none' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search name, email, subject…"
            style={{
              width: '100%', paddingLeft: 32, paddingRight: 12, paddingTop: 8, paddingBottom: 8,
              border: '1px solid rgba(74,9,24,0.14)', borderRadius: 10,
              fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', color: MAROON,
              background: '#fff', outline: 'none', boxSizing: 'border-box',
            }}
          />
        </div>
        <select
          value={filterType}
          onChange={e => setFilterType(e.target.value)}
          style={{ padding: '8px 12px', border: '1px solid rgba(74,9,24,0.14)', borderRadius: 10, fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', color: filterType ? MAROON : 'rgba(74,9,24,0.4)', background: '#fff', cursor: 'pointer' }}>
          <option value="">All Types</option>
          {types.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          style={{ padding: '8px 12px', border: '1px solid rgba(74,9,24,0.14)', borderRadius: 10, fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', color: filterStatus ? MAROON : 'rgba(74,9,24,0.4)', background: '#fff', cursor: 'pointer' }}>
          <option value="">All Statuses</option>
          {COMPLAINT_STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select
          value={filterDept}
          onChange={e => setFilterDept(e.target.value)}
          style={{ padding: '8px 12px', border: '1px solid rgba(74,9,24,0.14)', borderRadius: 10, fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', color: filterDept ? MAROON : 'rgba(74,9,24,0.4)', background: '#fff', cursor: 'pointer' }}>
          <option value="">All Divisions</option>
          {depts.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: 16, border: '1px solid rgba(74,9,24,0.08)', overflow: 'hidden', boxShadow: '0 2px 12px rgba(74,9,24,0.05)' }}>
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'rgba(74,9,24,0.35)', fontSize: '0.85rem' }}>Loading submissions…</div>
        ) : fetchError ? (
          <div style={{ padding: '3rem', textAlign: 'center' }}>
            <FiAlertCircle size={28} style={{ color: '#ef4444', display: 'block', margin: '0 auto 8px' }} />
            <p style={{ color: '#b91c1c', fontSize: '0.85rem', marginBottom: 12 }}>{fetchError}</p>
            <button onClick={fetchComplaints} style={{ padding: '7px 18px', borderRadius: 8, border: '1px solid rgba(74,9,24,0.2)', background: '#fff', cursor: 'pointer', fontSize: '0.8rem', color: MAROON, fontFamily: 'Inter, sans-serif' }}>Retry</button>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'rgba(74,9,24,0.35)', fontSize: '0.85rem' }}>
            <FiMessageSquare size={28} style={{ display: 'block', margin: '0 auto 8px', opacity: 0.25 }} />
            {items.length === 0 ? 'No submissions received yet.' : 'No submissions match your filters.'}
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(74,9,24,0.08)', background: 'rgba(74,9,24,0.02)' }}>
                  {['Date', 'Name', 'Type', 'Division', 'Subject', 'Status', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontFamily: "'Cinzel', serif", fontSize: '0.65rem', letterSpacing: '0.08em', color: 'rgba(74,9,24,0.45)', fontWeight: 700, whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => {
                  const sc = COMPLAINT_STATUS_STYLE[c.status] || COMPLAINT_STATUS_STYLE.New
                  const tc = COMPLAINT_TYPE_COLORS[c.type]    || {}
                  return (
                    <tr key={c.id}
                      style={{ borderBottom: i < filtered.length - 1 ? '1px solid rgba(74,9,24,0.05)' : 'none', transition: 'background 0.12s' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(74,9,24,0.02)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                      <td style={{ padding: '10px 14px', color: 'rgba(74,9,24,0.45)', whiteSpace: 'nowrap' }}>
                        {new Date(c.createdAt).toLocaleDateString('en-LK')}
                      </td>
                      <td style={{ padding: '10px 14px' }}>
                        <div style={{ fontWeight: 600, color: MAROON }}>{c.name}</div>
                        <div style={{ fontSize: '0.72rem', color: 'rgba(74,9,24,0.45)' }}>{c.email}</div>
                      </td>
                      <td style={{ padding: '10px 14px' }}>
                        <span style={{ background: tc.bg || 'rgba(74,9,24,0.06)', color: tc.text || MAROON, padding: '2px 8px', borderRadius: 6, fontSize: '0.72rem', fontWeight: 600, whiteSpace: 'nowrap' }}>
                          {c.type}
                        </span>
                      </td>
                      <td style={{ padding: '10px 14px', whiteSpace: 'nowrap' }}>
                        {c.dept
                          ? <span style={{ background: 'rgba(74,9,24,0.06)', color: MAROON, padding: '2px 8px', borderRadius: 6, fontSize: '0.72rem', fontWeight: 600 }}>{c.dept}</span>
                          : <span style={{ fontSize: '0.72rem', color: 'rgba(74,9,24,0.25)' }}>—</span>
                        }
                      </td>
                      <td style={{ padding: '10px 14px', maxWidth: 200 }}>
                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: MAROON }}>{c.subject}</div>
                      </td>
                      <td style={{ padding: '10px 14px' }}>
                        <select
                          value={c.status}
                          onChange={e => updateStatus(c.id, e.target.value)}
                          style={{ background: sc.bg, color: sc.text, border: 'none', borderRadius: 6, padding: '3px 8px', fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                          {COMPLAINT_STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                      <td style={{ padding: '10px 14px' }}>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button
                            onClick={() => setViewItem(c)}
                            title="View details"
                            style={{ padding: '5px 8px', borderRadius: 7, border: '1px solid rgba(74,9,24,0.14)', background: '#fff', color: MAROON, cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'all 0.12s' }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(74,9,24,0.05)'}
                            onMouseLeave={e => e.currentTarget.style.background = '#fff'}>
                            <FiEye size={13} />
                          </button>
                          <button
                            onClick={() => deleteItem(c.id)}
                            title="Delete"
                            style={{ padding: '5px 8px', borderRadius: 7, border: '1px solid rgba(220,38,38,0.18)', background: '#fff', color: '#dc2626', cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'all 0.12s' }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(220,38,38,0.06)'}
                            onMouseLeave={e => e.currentTarget.style.background = '#fff'}>
                            <FiTrash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {viewItem && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.48)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 20 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ background: '#fff', borderRadius: 20, maxWidth: 560, width: '100%', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 24px 64px rgba(0,0,0,0.22)' }}>
              {/* Modal header */}
              <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(74,9,24,0.08)', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ background: (COMPLAINT_TYPE_COLORS[viewItem.type] || {}).bg || 'rgba(74,9,24,0.06)', color: (COMPLAINT_TYPE_COLORS[viewItem.type] || {}).text || MAROON, padding: '2px 9px', borderRadius: 6, fontSize: '0.72rem', fontWeight: 600 }}>{viewItem.type}</span>
                    <span style={{ fontSize: '0.72rem', color: 'rgba(74,9,24,0.38)' }}>#{viewItem.id}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', fontWeight: 800, color: MAROON, margin: 0 }}>{viewItem.subject}</h3>
                </div>
                <button onClick={() => setViewItem(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(74,9,24,0.4)', padding: 4, flexShrink: 0 }}>
                  <FiX size={18} />
                </button>
              </div>

              {/* Submitter info */}
              <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid rgba(74,9,24,0.06)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: `linear-gradient(135deg, ${MAROON} 0%, #6E1528 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.75rem', fontWeight: 800, flexShrink: 0 }}>
                    {viewItem.name[0].toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: MAROON, fontSize: '0.85rem' }}>{viewItem.name}</div>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(74,9,24,0.45)' }}>
                      {new Date(viewItem.createdAt).toLocaleString('en-LK', { timeZone: 'Asia/Colombo' })}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <a href={`mailto:${viewItem.email}`} style={{ display: 'flex', alignItems: 'center', gap: 5, color: MAROON, fontSize: '0.78rem', textDecoration: 'none' }}>
                    <FiMail size={12} style={{ color: GOLD }} /> {viewItem.email}
                  </a>
                  {viewItem.phone && (
                    <a href={`tel:${viewItem.phone}`} style={{ display: 'flex', alignItems: 'center', gap: 5, color: MAROON, fontSize: '0.78rem', textDecoration: 'none' }}>
                      <FiPhone size={12} style={{ color: GOLD }} /> {viewItem.phone}
                    </a>
                  )}
                  {viewItem.dept
                    ? <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.75rem' }}>
                        <span style={{ color: 'rgba(74,9,24,0.45)', fontWeight: 600 }}>Dept:</span>
                        <span style={{ background: 'rgba(74,9,24,0.06)', color: MAROON, padding: '1px 8px', borderRadius: 5, fontWeight: 600 }}>{viewItem.dept}</span>
                      </div>
                    : <div style={{ fontSize: '0.72rem', color: 'rgba(74,9,24,0.3)' }}>No department selected</div>
                  }
                </div>
              </div>

              {/* Message body */}
              <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(74,9,24,0.06)' }}>
                <p style={{ fontSize: '0.7rem', fontWeight: 700, color: GOLD, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>Message</p>
                <p style={{ fontSize: '0.88rem', color: MAROON, lineHeight: 1.75, whiteSpace: 'pre-wrap', margin: 0 }}>{viewItem.message}</p>
              </div>

              {/* Status buttons + actions */}
              <div style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.78rem', color: 'rgba(74,9,24,0.5)', fontWeight: 600 }}>Status:</span>
                  {COMPLAINT_STATUS_OPTIONS.map(s => {
                    const sc2 = COMPLAINT_STATUS_STYLE[s]
                    const isActive = viewItem.status === s
                    return (
                      <button key={s} onClick={() => updateStatus(viewItem.id, s)}
                        style={{
                          padding: '4px 12px', borderRadius: 8, fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer',
                          border: isActive ? 'none' : '1px solid rgba(74,9,24,0.14)',
                          background: isActive ? sc2.bg : 'transparent',
                          color: isActive ? sc2.text : 'rgba(74,9,24,0.45)',
                          fontFamily: 'Inter, sans-serif', transition: 'all 0.12s',
                        }}>
                        {s}
                      </button>
                    )
                  })}
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <a
                    href={`mailto:${viewItem.email}?subject=Re: ${encodeURIComponent(viewItem.subject)} (Ref #${viewItem.id})`}
                    style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 10, fontSize: '0.8rem', fontWeight: 600, background: `linear-gradient(135deg, ${MAROON} 0%, #6E1528 100%)`, color: '#fff', textDecoration: 'none', boxShadow: '0 3px 10px rgba(74,9,24,0.25)' }}>
                    <FiMail size={13} /> Reply
                  </a>
                  <button
                    onClick={() => deleteItem(viewItem.id)}
                    style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 10, fontSize: '0.8rem', fontWeight: 600, background: 'rgba(220,38,38,0.08)', color: '#dc2626', border: '1px solid rgba(220,38,38,0.18)', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                    <FiTrash2 size={13} /> Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Policy & Privacy Section ──────────────────────────────────────────────────
const POLICY_SECTIONS = [
  {
    n: '1',
    title: 'Purpose of This Policy',
    body: 'The purpose of this policy is to protect the integrity and security of the official website, ensure all website modifications are properly authorized, establish a secure development and deployment process, maintain accurate records of all updates and modifications, and prevent unauthorized publishing or misuse of source code and system resources.',
  },
  {
    n: '2',
    title: 'Authorized Personnel',
    body: 'Only officially approved personnel are permitted to access website administration systems, modify website content or source code, upload files or deploy updates, and manage databases or hosting systems. All developers, maintainers, and technical staff must receive proper authorization before performing any work on the website.',
  },
  {
    n: '3',
    title: 'Mandatory Approval Requirement',
    highlight: 'All website updates, developments, modifications, maintenance activities, or system changes must receive prior written or official approval from the Deputy Chief Secretary (Planning) before any development or modification process begins. No developer, maintainer, or technical officer is permitted to perform any modification without official approval.',
  },
  {
    n: '4',
    title: 'Development and Modification Procedures',
    steps: [
      { label: 'Step 1 — Approval', text: 'Developer submits the requested modification details. Approval must be obtained from the Deputy Chief Secretary (Planning).' },
      { label: 'Step 2 — Development Process', text: 'Changes must be implemented only within the authorized development environment. Direct modifications to the live/public website are strictly prohibited.' },
      { label: 'Step 3 — Change Recording', text: 'All updates must be individually recorded: date & time, developer name, description, affected sections, version details, and approval reference. Records must be securely maintained for auditing.' },
    ],
  },
  {
    n: '5',
    title: 'Testing and Quality Assurance Policy',
    body: 'After development is completed, developers are NOT allowed to directly publish the website to the public. The completed development must be submitted for testing and review. The system must undergo:',
    list: ['Functional testing', 'Security testing', 'Performance testing', 'Content verification', 'Compatibility testing'],
    listNote: 'A formal Testing Document / Testing Report must be attached and submitted during the testing process.',
  },
  {
    n: '6',
    title: 'Final Approval and Public Release',
    body: 'The website or modification can only be published after all testing processes are successfully completed, testing reports are reviewed, and final approval is granted by the Deputy Chief Secretary (Planning). Without final approval, no system, update, or modification may be released to the public environment.',
  },
  {
    n: '7',
    title: 'Source Code Protection Policy',
    highlight: 'The official website source code, design structure, database systems, configurations, and internal resources must remain confidential, cannot be copied, reused, distributed, or shared, cannot be used as templates for other projects, and cannot be resold, transferred, or reproduced for personal or commercial purposes. This restriction applies even after project completion or termination of employment/contract.',
  },
  {
    n: '8',
    title: 'Data Privacy and Confidentiality',
    body: 'All developers and maintainers must protect official government data, maintain confidentiality of internal systems, prevent unauthorized access to sensitive information, and avoid sharing credentials, server access, or confidential documents. Any data breach or unauthorized disclosure must be reported immediately to the administration.',
  },
  {
    n: '9',
    title: 'Security Responsibilities',
    body: 'Developers and maintainers must ensure secure coding practices, protection against cyber threats, proper password management, regular system updates and backups, and restricted access control mechanisms. Unauthorized software, plugins, or third-party integrations are prohibited unless officially approved.',
  },
  {
    n: '10',
    title: 'Backup and Recovery',
    body: 'Before implementing major modifications, full system backups must be created, database backups must be securely stored, and recovery procedures must be verified. This is required to ensure system restoration in case of failure or security incidents.',
  },
  {
    n: '11',
    title: 'Audit and Monitoring',
    body: 'The Secretariat reserves the right to monitor all website activities, review modification logs, audit developer actions and system access, and investigate security incidents or unauthorized changes. All technical staff must cooperate during official audits or investigations.',
  },
  {
    n: '12',
    title: 'Violation of Policy',
    body: 'Failure to comply with this policy may result in:',
    list: ['Removal of system access', 'Suspension of development privileges', 'Administrative disciplinary action', 'Legal action under applicable laws and government regulations'],
  },
  {
    n: '13',
    title: 'Policy Enforcement',
    body: 'This policy applies to internal developers, contract developers, website maintainers, IT officers, and third-party technical service providers. All personnel involved with the website are required to comply fully with these policies and procedures.',
  },
  {
    n: '14',
    title: 'Official Ownership',
    highlight: 'The official website, systems, source code, content, databases, designs, and associated digital resources are the exclusive property of the Provincial Planning Secretariat – Southern Province, Sri Lanka. All rights reserved.',
  },
  {
    n: '15',
    title: 'Policy Updates',
    body: 'The Secretariat reserves the right to revise or update this policy at any time based on administrative, technical, or legal requirements. Updated versions shall become effective immediately upon official publication.',
  },
]

function PolicySection() {
  const card = {
    background: '#fff',
    borderRadius: 14,
    border: '1px solid rgba(74,9,24,0.08)',
    boxShadow: '0 2px 12px rgba(74,9,24,0.05)',
    padding: '1.25rem 1.5rem',
    marginBottom: '0.75rem',
    fontFamily: 'Inter, sans-serif',
  }

  const highlightBox = {
    background: 'rgba(199,154,43,0.07)',
    border: '1px solid rgba(199,154,43,0.25)',
    borderLeft: `3px solid ${GOLD}`,
    borderRadius: '0 8px 8px 0',
    padding: '12px 16px',
    fontSize: '0.84rem',
    lineHeight: 1.75,
    color: MAROON,
    marginTop: 8,
  }

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '1.6rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 }}>
          <div style={{ width: 3, height: 24, borderRadius: 2, background: `linear-gradient(${MAROON}, ${GOLD})`, flexShrink: 0 }} />
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.35rem', fontWeight: 800, color: MAROON, margin: 0 }}>
            Policy &amp; Privacy
          </h1>
        </div>
        <p style={{ fontSize: '0.76rem', color: 'rgba(74,9,24,0.4)', margin: 0, marginLeft: 13 }}>
          Website Maintenance, Development, Privacy &amp; Security Policy — Effective 21 May 2026
        </p>
      </div>

      {/* Intro card */}
      <div style={{ ...card, background: `linear-gradient(135deg, ${MAROON} 0%, #2A0510 100%)`, color: '#FCFBFA', marginBottom: '1.25rem' }}>
        <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: GOLD, marginBottom: 6 }}>
          Provincial Planning Secretariat – Southern Province
        </div>
        <div style={{ fontSize: '0.92rem', lineHeight: 1.75, color: 'rgba(252,251,250,0.82)' }}>
          This policy defines the official procedures, responsibilities, security requirements, and development standards
          related to the maintenance, updating, modification, testing, deployment, and protection of the official website.
        </div>
      </div>

      {/* Sections */}
      {POLICY_SECTIONS.map(sec => (
        <div key={sec.n} style={card}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <span style={{
              flexShrink: 0,
              width: 28, height: 28,
              borderRadius: 8,
              background: `linear-gradient(135deg, ${MAROON} 0%, #6E1528 100%)`,
              color: '#fff',
              fontSize: '0.68rem',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>{sec.n}</span>
            <h2 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: MAROON, fontFamily: "'Playfair Display', serif" }}>
              {sec.title}
            </h2>
          </div>

          {sec.highlight && (
            <div style={highlightBox}>{sec.highlight}</div>
          )}

          {sec.body && (
            <p style={{ margin: sec.highlight ? '10px 0 0' : 0, fontSize: '0.84rem', lineHeight: 1.75, color: '#444' }}>
              {sec.body}
            </p>
          )}

          {sec.steps && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 6 }}>
              {sec.steps.map(step => (
                <div key={step.label} style={{
                  background: 'rgba(74,9,24,0.03)',
                  border: '1px solid rgba(74,9,24,0.07)',
                  borderRadius: 8,
                  padding: '10px 14px',
                }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: GOLD, marginBottom: 4, letterSpacing: '0.02em' }}>
                    {step.label}
                  </div>
                  <div style={{ fontSize: '0.83rem', lineHeight: 1.7, color: '#444' }}>{step.text}</div>
                </div>
              ))}
            </div>
          )}

          {sec.list && (
            <ul style={{ margin: sec.body ? '6px 0 0' : 0, paddingLeft: 20 }}>
              {sec.list.map(item => (
                <li key={item} style={{ fontSize: '0.83rem', lineHeight: 1.8, color: '#444' }}>{item}</li>
              ))}
            </ul>
          )}

          {sec.listNote && (
            <p style={{ margin: '8px 0 0', fontSize: '0.8rem', color: 'rgba(74,9,24,0.5)', fontStyle: 'italic' }}>{sec.listNote}</p>
          )}
        </div>
      ))}

      <div style={{ textAlign: 'center', padding: '16px 0 8px', borderTop: '1px solid rgba(74,9,24,0.08)', marginTop: 8 }}>
        <span style={{ fontSize: '0.75rem', color: 'rgba(74,9,24,0.35)', fontFamily: 'Inter, sans-serif' }}>
          © 2026 Provincial Planning Secretariat – Southern Province. All Rights Reserved.
        </span>
      </div>
    </div>
  )
}

// ── Page Hold storage key ─────────────────────────────────────────────────────
const PAGE_HOLD_KEY = 'cms_page_hold'

function getPageHoldMap() {
  try { return JSON.parse(localStorage.getItem(PAGE_HOLD_KEY) || '{}') } catch { return {} }
}

function savePageHoldMap(map) {
  localStorage.setItem(PAGE_HOLD_KEY, JSON.stringify(map))
  window.dispatchEvent(new Event('cms_page_hold_updated'))
}

// ── Page definitions (all portal pages except Home) ───────────────────────────
const HOLDABLE_PAGES = [
  {
    key: 'about', label: 'About Us', path: '/about', group: 'About',
    subPages: [
      { key: 'about__overview',                label: 'Overview',                   path: '/about/overview' },
      { key: 'about__organization-structure',  label: 'Organization Structure',     path: '/about/organization-structure' },
      { key: 'about__functions-duties',        label: 'Functions & Duties',         path: '/about/functions-duties' },
      { key: 'about__history',                 label: 'History',                    path: '/about/history' },
      { key: 'about__deputy-secretary-planning', label: 'Deputy Chief Secretary – Planning', path: '/about/deputy-secretary-planning' },
      { key: 'about__director-planning',       label: 'Director – Planning',        path: '/about/director-planning' },
      {
        key: 'about__deputy-directors', label: 'Deputy Directors', path: '/about/deputy-directors',
        subPages: [
          { key: 'about__deputy-directors__1', label: 'DD I – Mrs. M.A.K.N. Gunawardana',  path: '/about/deputy-directors/1' },
          { key: 'about__deputy-directors__2', label: 'DD II – Mrs. Chandrika Malepathirana', path: '/about/deputy-directors/2' },
          { key: 'about__deputy-directors__3', label: 'DD III – Mrs. N.C. Dissanayake',     path: '/about/deputy-directors/3' },
          { key: 'about__deputy-directors__4', label: 'DD IV – Mrs. H.I.H. Salgamuwa',     path: '/about/deputy-directors/4' },
          { key: 'about__deputy-directors__5', label: 'DD V – Mrs. A.K.E. Madusarani',     path: '/about/deputy-directors/5' },
          { key: 'about__deputy-directors__6', label: 'DD VI – Mrs. A.D.S. Priyadarshani', path: '/about/deputy-directors/6' },
        ],
      },
    ],
  },
  { key: 'about-deputy-secretary',label: 'About Deputy Secretary',       path: '/about-deputy-secretary', group: 'About' },
  {
    key: 'departments', label: 'Departments & Divisions', path: '/departments', group: 'Departments',
    subPages: [
      { key: 'departments__accounts',          label: 'Accounts Division',          path: '/departments/accounts' },
      { key: 'departments__administration',    label: 'Administration Division',    path: '/departments/administration' },
      { key: 'departments__development',       label: 'Development Division',       path: '/departments/development' },
      { key: 'departments__head-administration', label: 'Head of Administration',   path: '/departments/head-administration' },
      { key: 'departments__head-accounts',     label: 'Head of Accounts',           path: '/departments/head-accounts' },
    ],
  },
  { key: 'news',      label: 'Media Center (News)', path: '/news',      group: 'Content' },
  { key: 'notices',   label: 'Official Notices',    path: '/notices',   group: 'Content' },
  { key: 'downloads', label: 'Downloads',           path: '/downloads', group: 'Content' },
  { key: 'gallery',   label: 'Photo Gallery',       path: '/gallery',   group: 'Content' },
  { key: 'documents', label: 'Documents',           path: '/documents', group: 'Content' },
  { key: 'contact',   label: 'Contact Us',          path: '/contact',   group: 'General' },
]

// flat lookup: key → label (for toast messages, covers sub-pages and nested sub-pages too)
const ALL_PAGE_LABELS = HOLDABLE_PAGES.reduce((acc, p) => {
  acc[p.key] = p.label
  p.subPages?.forEach(s => {
    acc[s.key] = s.label
    s.subPages?.forEach(ss => { acc[ss.key] = ss.label })
  })
  return acc
}, {})

const card = {
  background: '#fff',
  borderRadius: 14,
  border: '1px solid rgba(74,9,24,0.07)',
  padding: '1.1rem 1.25rem',
  marginBottom: '1rem',
  boxShadow: '0 1px 6px rgba(74,9,24,0.04)',
}

function HoldToggle({ isHeld, onToggle }) {
  return (
    <button
      onClick={onToggle}
      title={isHeld ? 'Click to make page visible to public' : 'Click to put page on hold'}
      style={{
        background: 'none', border: 'none', cursor: 'pointer',
        padding: 0, display: 'flex', alignItems: 'center', flexShrink: 0,
        color: isHeld ? '#dc2626' : '#16a34a',
        transition: 'color 0.15s',
      }}>
      {isHeld
        ? <FiToggleRight size={28} style={{ filter: 'drop-shadow(0 0 3px rgba(220,38,38,0.3))' }} />
        : <FiToggleLeft  size={28} style={{ filter: 'drop-shadow(0 0 3px rgba(22,163,74,0.3))'  }} />
      }
    </button>
  )
}

function StatusBadgeHold({ isHeld }) {
  return isHeld ? (
    <motion.span key="held" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
      style={{
        fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
        background: 'rgba(220,38,38,0.1)', color: '#dc2626',
        border: '1px solid rgba(220,38,38,0.2)', borderRadius: 100, padding: '2px 8px',
      }}>On Hold</motion.span>
  ) : (
    <motion.span key="live" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
      style={{
        fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
        background: 'rgba(22,163,74,0.1)', color: '#15803d',
        border: '1px solid rgba(22,163,74,0.2)', borderRadius: 100, padding: '2px 8px',
      }}>Live</motion.span>
  )
}

function PageRow({ page, isHeld, onToggle, indent = false, deepIndent = false, hasSubPages = false, expanded = false, onExpandToggle }) {
  return (
    <motion.div layout style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: deepIndent ? '7px 12px 7px 12px' : indent ? '8px 12px 8px 36px' : '10px 12px',
      borderRadius: 9,
      background: isHeld
        ? 'rgba(220,38,38,0.04)'
        : deepIndent ? 'rgba(199,154,43,0.04)'
        : indent    ? 'rgba(74,9,24,0.015)'
        : 'transparent',
      border: isHeld ? '1px solid rgba(220,38,38,0.12)' : '1px solid transparent',
      transition: 'background 0.2s, border-color 0.2s',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
        {hasSubPages ? (
          <button onClick={onExpandToggle} style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: 2,
            color: 'rgba(74,9,24,0.45)', display: 'flex', alignItems: 'center', flexShrink: 0,
            transition: 'color 0.15s',
          }}>
            <motion.span animate={{ rotate: expanded ? 90 : 0 }} transition={{ duration: 0.18 }}
              style={{ display: 'flex' }}>
              <FiChevronRight size={14} />
            </motion.span>
          </button>
        ) : (
          <span style={{ width: (indent || deepIndent) ? 0 : 18, flexShrink: 0 }} />
        )}
        <FiLayout
          size={deepIndent ? 12 : 13}
          color={isHeld ? '#dc2626' : deepIndent ? 'rgba(199,154,43,0.6)' : indent ? 'rgba(74,9,24,0.25)' : 'rgba(74,9,24,0.35)'}
          style={{ flexShrink: 0 }}
        />
        <div style={{ minWidth: 0 }}>
          <div style={{
            fontSize: deepIndent ? '0.79rem' : indent ? '0.82rem' : '0.87rem',
            fontWeight: deepIndent ? 500 : indent ? 500 : 600,
            color: isHeld ? '#991b1b' : MAROON,
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>
            {page.label}
          </div>
          <div style={{ fontSize: '0.68rem', color: 'rgba(74,9,24,0.35)', marginTop: 1 }}>
            {page.path}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        <StatusBadgeHold isHeld={isHeld} />
        <HoldToggle isHeld={isHeld} onToggle={onToggle} />
      </div>
    </motion.div>
  )
}

function PagesSection() {
  const [holdMap, setHoldMap] = useState(getPageHoldMap)
  const [expanded, setExpanded] = useState({})

  const toggle = (key) => {
    const next = { ...holdMap, [key]: !holdMap[key] }
    setHoldMap(next)
    savePageHoldMap(next)
    const label = ALL_PAGE_LABELS[key] || key
    toast.success(next[key]
      ? `"${label}" is now hidden from public`
      : `"${label}" is now visible to public`
    )
  }

  const toggleExpand = (key) => setExpanded(e => ({ ...e, [key]: !e[key] }))

  const holdCount = Object.values(holdMap).filter(Boolean).length
  const groups = [...new Set(HOLDABLE_PAGES.map(p => p.group))]

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 }}>
          <div style={{ width: 3, height: 24, borderRadius: 2, background: `linear-gradient(${MAROON}, ${GOLD})`, flexShrink: 0 }} />
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
            fontWeight: 800, color: MAROON, margin: 0,
          }}>
            Page Visibility
          </h1>
        </div>
        <p style={{ fontSize: '0.76rem', color: 'rgba(74,9,24,0.4)', margin: 0, marginLeft: 13 }}>
          Control which portal pages are visible to the public. Pages with sub-pages can be expanded to hold individual sub-pages.
        </p>
      </div>

      {/* Summary banner */}
      {holdCount > 0 && (
        <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'linear-gradient(135deg, rgba(220,38,38,0.08) 0%, rgba(220,38,38,0.04) 100%)',
            border: '1px solid rgba(220,38,38,0.18)',
            borderRadius: 12, padding: '10px 16px',
            display: 'flex', alignItems: 'center', gap: 10,
            marginBottom: '1.25rem',
          }}>
          <FiAlertCircle size={15} color="#dc2626" style={{ flexShrink: 0 }} />
          <span style={{ fontSize: '0.8rem', color: '#991b1b', fontWeight: 600 }}>
            {holdCount} page{holdCount > 1 ? 's are' : ' is'} currently on hold — hidden from the public.
          </span>
        </motion.div>
      )}

      {/* Info box */}
      <div style={{
        ...card,
        background: `linear-gradient(135deg, ${MAROON} 0%, #2A0510 100%)`,
        color: '#FCFBFA', marginBottom: '1.5rem',
      }}>
        <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: GOLD, marginBottom: 6 }}>
          How Page Hold Works
        </div>
        <div style={{ fontSize: '0.84rem', lineHeight: 1.75, color: 'rgba(252,251,250,0.82)' }}>
          Toggle a page to hide it from the public — visitors will see a branded{' '}
          <strong style={{ color: GOLD }}>&quot;Page Under Development&quot;</strong> screen.
          Pages marked with <FiChevronRight size={12} style={{ verticalAlign: 'middle', opacity: 0.7 }} /> can be
          expanded to hold individual sub-pages without affecting the parent page.
        </div>
      </div>

      {/* Page groups */}
      {groups.map(group => {
        const pages = HOLDABLE_PAGES.filter(p => p.group === group)
        return (
          <div key={group} style={card}>
            <div style={{
              fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: GOLD,
              marginBottom: '0.75rem', paddingBottom: '0.5rem',
              borderBottom: '1px solid rgba(74,9,24,0.07)',
            }}>
              {group}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {pages.map(page => {
                const isHeld = !!holdMap[page.key]
                const hasSubPages = !!(page.subPages?.length)
                const isExpanded = !!expanded[page.key]
                return (
                  <React.Fragment key={page.key}>
                    <PageRow
                      page={page}
                      isHeld={isHeld}
                      onToggle={() => toggle(page.key)}
                      hasSubPages={hasSubPages}
                      expanded={isExpanded}
                      onExpandToggle={() => toggleExpand(page.key)}
                    />
                    {/* Sub-pages */}
                    <AnimatePresence initial={false}>
                      {hasSubPages && isExpanded && (
                        <motion.div
                          key="subs"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                          style={{ overflow: 'hidden' }}>
                          <div style={{
                            marginLeft: 36, marginRight: 4, marginBottom: 4,
                            borderLeft: `2px solid rgba(74,9,24,0.08)`,
                            paddingLeft: 12,
                            display: 'flex', flexDirection: 'column', gap: 2,
                          }}>
                            {page.subPages.map(sub => {
                              const subHasChildren = !!(sub.subPages?.length)
                              const subIsExpanded  = !!expanded[sub.key]
                              return (
                                <React.Fragment key={sub.key}>
                                  <PageRow
                                    page={sub}
                                    isHeld={!!holdMap[sub.key]}
                                    onToggle={() => toggle(sub.key)}
                                    indent
                                    hasSubPages={subHasChildren}
                                    expanded={subIsExpanded}
                                    onExpandToggle={() => toggleExpand(sub.key)}
                                  />
                                  {/* Third level — e.g. individual Deputy Director profiles */}
                                  <AnimatePresence initial={false}>
                                    {subHasChildren && subIsExpanded && (
                                      <motion.div
                                        key="subsubs"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                                        style={{ overflow: 'hidden' }}>
                                        <div style={{
                                          marginLeft: 24, marginRight: 4, marginBottom: 4,
                                          borderLeft: `2px solid rgba(199,154,43,0.18)`,
                                          paddingLeft: 12,
                                          display: 'flex', flexDirection: 'column', gap: 2,
                                        }}>
                                          {sub.subPages.map(ss => (
                                            <PageRow
                                              key={ss.key}
                                              page={ss}
                                              isHeld={!!holdMap[ss.key]}
                                              onToggle={() => toggle(ss.key)}
                                              indent
                                              deepIndent
                                            />
                                          ))}
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </React.Fragment>
                              )
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                )
              })}
            </div>
          </div>
        )
      })}

      {/* Home page — always live */}
      <div style={{ ...card, opacity: 0.7 }}>
        <div style={{
          fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em',
          textTransform: 'uppercase', color: GOLD,
          marginBottom: '0.75rem', paddingBottom: '0.5rem',
          borderBottom: '1px solid rgba(74,9,24,0.07)',
        }}>
          Core
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '10px 12px', borderRadius: 9,
          background: 'rgba(22,163,74,0.04)', border: '1px solid rgba(22,163,74,0.1)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 18, flexShrink: 0 }} />
            <FiHome size={13} color="rgba(74,9,24,0.35)" style={{ flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: '0.87rem', fontWeight: 600, color: MAROON }}>Home</div>
              <div style={{ fontSize: '0.68rem', color: 'rgba(74,9,24,0.35)', marginTop: 1 }}>/home</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{
              fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
              background: 'rgba(22,163,74,0.1)', color: '#15803d',
              border: '1px solid rgba(22,163,74,0.2)', borderRadius: 100, padding: '2px 8px',
            }}>Always Live</span>
            <FiShield size={18} color="rgba(74,9,24,0.25)" title="Home page cannot be put on hold" />
          </div>
        </div>
      </div>
    </div>
  )
}

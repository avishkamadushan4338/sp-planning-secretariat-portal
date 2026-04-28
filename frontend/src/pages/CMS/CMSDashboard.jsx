import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { toast, Toaster } from 'sonner'
import {
  FiGrid, FiFileText, FiBell, FiDownload, FiImage,
  FiLogOut, FiPlus, FiEdit2, FiTrash2,
  FiChevronRight, FiChevronLeft, FiSearch, FiEye, FiEyeOff,
  FiCheck, FiClock, FiCalendar, FiActivity,
  FiChevronsLeft, FiHome, FiX, FiSettings, FiUser, FiLock, FiShield, FiAlertCircle, FiTag,
} from 'react-icons/fi'
import { changeUsername, changePassword, getCredentials } from './cmsAuth'

// ── Brand tokens ──────────────────────────────────────────────────────────────
const MAROON  = '#4A0918'
const MAROON2 = '#3A0712'
const GOLD    = '#C79A2B'
const SIDEBAR_FULL = 242
const SIDEBAR_MINI = 66

// ── Mock data ─────────────────────────────────────────────────────────────────
const MOCK = {
  news: [
    { id: 1, title: 'Annual Planning Review 2025 Completed',    date: '2026-04-20', category: 'Announcement',  status: 'Published' },
    { id: 2, title: 'Southern Province Education Summit',       date: '2026-04-15', category: 'Event',         status: 'Published' },
    { id: 3, title: 'New Budget Allocation for Schools',        date: '2026-04-10', category: 'Press Release', status: 'Draft'     },
    { id: 4, title: 'Staff Development Programme 2026',         date: '2026-04-05', category: 'Announcement',  status: 'Published' },
  ],
  notices: [
    { id: 1, title: 'Office Closure – Public Holiday',          date: '2026-04-22', category: 'General',     status: 'Active'  },
    { id: 2, title: 'Submission Deadline – Q1 Reports',         date: '2026-04-18', category: 'Circular',    status: 'Active'  },
    { id: 3, title: 'Interview Schedule – Planning Officers',   date: '2026-04-12', category: 'Recruitment', status: 'Expired' },
  ],
  documents: [
    { id: 1, title: 'Annual Report 2025',          category: 'Reports',   date: '2026-03-01', type: 'PDF' },
    { id: 2, title: 'Strategic Plan 2024–2028',    category: 'Plans',     date: '2026-02-14', type: 'PDF' },
    { id: 3, title: 'Budget Estimates 2026',       category: 'Finance',   date: '2026-01-20', type: 'PDF' },
    { id: 4, title: 'Staff Circular No. 04/2026', category: 'Circulars', date: '2026-04-01', type: 'PDF' },
  ],
  gallery: [
    { id: 1, title: 'Planning Committee Meeting – March 2026', date: '2026-03-28', category: 'Events',         photos: 12 },
    { id: 2, title: 'Education Summit 2026',                   date: '2026-04-15', category: 'Events',         photos: 8  },
    { id: 3, title: 'Office Premises',                         date: '2026-01-10', category: 'Infrastructure', photos: 5  },
  ],
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
      { id: 'overview',  label: 'Overview',  icon: FiGrid     },
      { id: 'news',      label: 'News',       icon: FiFileText },
      { id: 'notices',   label: 'Notices',    icon: FiBell     },
    ],
  },
  {
    label: 'Media',
    items: [
      { id: 'documents', label: 'Documents', icon: FiDownload },
      { id: 'gallery',   label: 'Gallery',   icon: FiImage    },
    ],
  },
  {
    label: 'System',
    items: [
      { id: 'settings', label: 'Settings', icon: FiSettings },
    ],
  },
]

const NOTIFICATIONS = [
  { title: 'Draft article awaiting review',  time: '2 hours ago',  unread: true  },
  { title: 'Notice expiring tomorrow',       time: '5 hours ago',  unread: true  },
  { title: 'New document uploaded',          time: 'Yesterday',    unread: false },
]

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
  window.dispatchEvent(new Event('cms_notices_updated'))   // same tab
  _noticeChannel?.postMessage('updated')                   // other tabs
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
      const saved = JSON.parse(localStorage.getItem('cms_notices') || '[]')
      if (saved.length) return { ...MOCK, notices: saved }
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
      // If the notice had an attached link, no backend deletion is required.
      // Links are external (Drive/Dropbox/etc.) and should be revoked at the provider if needed.
    }
    toast.success('Record deleted successfully')
    setDeleteModal(null)
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

  const allNavItems = NAV_GROUPS.flatMap(g => g.items)

  return (
    <>
      <Toaster position="top-right" richColors expand={false} />

      <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Inter, sans-serif', background: '#EEE9E2' }}>

        {/* ── Sidebar ──────────────────────────────────────────────────────── */}
        <motion.aside
          animate={{ width: collapsed ? SIDEBAR_MINI : SIDEBAR_FULL }}
          transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
          style={{
            background: `linear-gradient(175deg, ${MAROON2} 0%, ${MAROON} 60%, #5C1428 100%)`,
            display: 'flex', flexDirection: 'column',
            overflow: 'hidden', flexShrink: 0,
            position: 'sticky', top: 0, height: '100vh',
            zIndex: 40,
            boxShadow: '4px 0 28px rgba(0,0,0,0.2)',
          }}>

          {/* Decorative top accent */}
          <div style={{ height: 3, background: `linear-gradient(90deg, ${GOLD} 0%, #E8C55A 50%, ${GOLD} 100%)`, flexShrink: 0 }} />

          {/* Logo row */}
          <div style={{
            padding: collapsed ? '1.1rem 0' : '1.15rem 1rem',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            display: 'flex', alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'space-between',
            gap: 8, flexShrink: 0,
          }}>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                style={{ overflow: 'hidden', minWidth: 0 }}>
                <div style={{
                  color: '#fff', fontFamily: "'Cinzel', serif",
                  fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', whiteSpace: 'nowrap',
                }}>
                  Planning Secretariat
                </div>
                <div style={{ color: GOLD, fontSize: '0.58rem', letterSpacing: '0.07em', marginTop: 3, whiteSpace: 'nowrap' }}>
                  Content Management System
                </div>
              </motion.div>
            )}
            <button
              onClick={() => setCollapsed(v => !v)}
              style={{
                background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8, padding: 7, cursor: 'pointer',
                color: 'rgba(255,255,255,0.65)', display: 'flex', flexShrink: 0,
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.14)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}>
              <FiChevronsLeft size={14}
                style={{ transform: collapsed ? 'rotate(180deg)' : 'none', transition: 'transform 0.22s' }} />
            </button>
          </div>

          {/* Nav groups */}
          <nav style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '0.6rem 0' }}>
            {NAV_GROUPS.map(group => (
              <div key={group.label} style={{ marginBottom: '0.25rem' }}>
                {!collapsed && (
                  <div style={{
                    padding: '0.6rem 1rem 0.25rem',
                    fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.15em',
                    textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)',
                  }}>
                    {group.label}
                  </div>
                )}
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
                        background: isActive ? 'rgba(199,154,43,0.14)' : 'transparent',
                        borderLeft: `3px solid ${isActive ? GOLD : 'transparent'}`,
                        border: 'none',
                        borderLeft: `3px solid ${isActive ? GOLD : 'transparent'}`,
                        color: isActive ? GOLD : 'rgba(255,255,255,0.52)',
                        fontSize: '0.82rem', fontWeight: isActive ? 600 : 400,
                        cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                        transition: 'all 0.15s', textAlign: 'left',
                      }}
                      onMouseEnter={e => {
                        if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                        e.currentTarget.style.color = isActive ? GOLD : 'rgba(255,255,255,0.88)'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = isActive ? 'rgba(199,154,43,0.14)' : 'transparent'
                        e.currentTarget.style.color = isActive ? GOLD : 'rgba(255,255,255,0.52)'
                      }}>
                      <item.icon size={15} style={{ flexShrink: 0 }} />
                      {!collapsed && (
                        <>
                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                            {item.label}
                          </span>
                          {isActive && <FiChevronRight size={11} style={{ flexShrink: 0, opacity: 0.6 }} />}
                        </>
                      )}
                    </button>
                  )
                })}
              </div>
            ))}
          </nav>

          {/* User + logout */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: collapsed ? '0.9rem 0' : '0.9rem 1rem', flexShrink: 0 }}>
            {!collapsed ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '0.7rem', padding: '6px 8px', borderRadius: 10, background: 'rgba(255,255,255,0.05)' }}>
                <div style={{
                  width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
                  background: `linear-gradient(135deg, ${GOLD} 0%, #9A7520 100%)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: '0.78rem', fontWeight: 800,
                  boxShadow: `0 0 0 2px rgba(199,154,43,0.35)`,
                }}>{adminName[0].toUpperCase()}</div>
                <div style={{ overflow: 'hidden', minWidth: 0 }}>
                  <div style={{ color: '#fff', fontSize: '0.8rem', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{adminName}</div>
                  <div style={{ color: GOLD, fontSize: '0.6rem', whiteSpace: 'nowrap', marginTop: 1 }}>Super Admin</div>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.7rem' }}>
                <div style={{
                  width: 34, height: 34, borderRadius: '50%',
                  background: `linear-gradient(135deg, ${GOLD} 0%, #9A7520 100%)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: '0.78rem', fontWeight: 800,
                  boxShadow: `0 0 0 2px rgba(199,154,43,0.3)`,
                }}>{adminName[0].toUpperCase()}</div>
              </div>
            )}
            <button
              onClick={logout}
              style={{
                width: '100%', display: 'flex', alignItems: 'center',
                justifyContent: collapsed ? 'center' : 'flex-start',
                gap: 8, padding: collapsed ? '8px 0' : '8px 10px',
                borderRadius: 8, background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.48)', fontSize: '0.8rem',
                cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.15s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(220,38,38,0.14)'
                e.currentTarget.style.color = '#fca5a5'
                e.currentTarget.style.borderColor = 'rgba(220,38,38,0.28)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                e.currentTarget.style.color = 'rgba(255,255,255,0.48)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
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
            background: 'rgba(252,251,250,0.92)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            borderBottom: '1px solid rgba(74,9,24,0.08)',
            padding: '0 1.5rem', height: 58,
            display: 'flex', alignItems: 'center', gap: 12,
            position: 'sticky', top: 0, zIndex: 20,
          }}>
            {/* Breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: '0.7rem', color: 'rgba(74,9,24,0.35)', fontWeight: 500 }}>CMS</span>
              <FiChevronRight size={10} color="rgba(74,9,24,0.25)" />
              <span style={{ fontSize: '0.83rem', fontWeight: 700, color: MAROON }}>
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
                padding: '5px 11px 5px 6px', borderRadius: 10,
                border: '1px solid rgba(74,9,24,0.1)', background: 'rgba(74,9,24,0.02)',
                cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(74,9,24,0.05)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(74,9,24,0.02)'}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: `linear-gradient(135deg, ${MAROON} 0%, #6E1528 100%)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: '0.7rem', fontWeight: 800,
              }}>{adminName[0].toUpperCase()}</div>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: MAROON }}>{adminName}</span>
            </button>

            {/* Portal link */}
            <a href="/home" target="_blank" rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                padding: '6px 10px', borderRadius: 8,
                border: '1px solid rgba(74,9,24,0.1)', textDecoration: 'none',
                color: 'rgba(74,9,24,0.45)', fontSize: '0.75rem', transition: 'all 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(74,9,24,0.04)'; e.currentTarget.style.color = MAROON }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(74,9,24,0.45)' }}>
              <FiHome size={13} />
              <span style={{ display: 'none' }} className="sm:inline">Portal</span>
            </a>
          </header>

          {/* Page content */}
          <main style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }}>
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
                    onAdd={() => toast.info('Add news article — coming soon')}
                    search={search} setSearch={setSearch}
                    columns={['Title', 'Category', 'Date', 'Status']}
                    rowCells={r => [r.title, r.category, r.date, <StatusBadge key="s" s={r.status} />]}
                  />
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
                {active === 'documents' && (
                  <ContentSection
                    section="documents" rows={data.documents}
                    onDelete={id => confirmDelete('documents', id)}
                    onAdd={() => toast.info('Upload document — coming soon')}
                    search={search} setSearch={setSearch}
                    columns={['Title', 'Category', 'Type', 'Date']}
                    rowCells={r => [r.title, r.category, <TypeBadge key="t" t={r.type} />, r.date]}
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
                {active === 'settings' && (
                  <SettingsSection
                    onUsernameChange={name => setAdminName(name)}
                  />
                )}

              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>

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
  const publishedCount = data.news.filter(n => n.status === 'Published').length
    + data.notices.filter(n => n.status === 'Active').length
  const activeNotices  = data.notices.filter(n => n.status === 'Active').length

  const METRIC_CARDS = [
    {
      label: 'Published Content', value: publishedCount,
      total: data.news.length + data.notices.length,
      icon: FiActivity, color: MAROON,
      bg: 'rgba(74,9,24,0.08)', trend: '+2 this week',
    },
    {
      label: 'News Articles', value: data.news.length,
      total: 10, icon: FiFileText, color: '#1e40af',
      bg: 'rgba(30,64,175,0.08)', trend: 'Latest: today',
    },
    {
      label: 'Active Notices', value: activeNotices,
      total: data.notices.length, icon: FiBell, color: '#166534',
      bg: 'rgba(22,101,52,0.08)', trend: '1 expiring soon',
    },
    {
      label: 'Documents', value: data.documents.length,
      total: 20, icon: FiDownload, color: '#7c3aed',
      bg: 'rgba(124,58,237,0.08)', trend: '4 categories',
    },
  ]

  const QUICK_ACTIONS = [
    { label: 'Add News Article', icon: FiPlus,     section: 'news',      color: MAROON     },
    { label: 'Post Notice',      icon: FiBell,     section: 'notices',   color: '#166534'  },
    { label: 'Upload Document',  icon: FiDownload, section: 'documents', color: '#7c3aed'  },
    { label: 'Add Gallery',      icon: FiImage,    section: 'gallery',   color: '#b45309'  },
  ]

  const RECENT_ACTIVITY = [
    { action: 'Published',    title: 'Annual Planning Review 2025', time: '2 hours ago',  color: '#16a34a', icon: FiCheck     },
    { action: 'Draft saved',  title: 'New Budget Allocation for Schools', time: '5 hours ago',  color: '#d97706', icon: FiFileText },
    { action: 'Notice added', title: 'Office Closure – Public Holiday', time: 'Yesterday',    color: MAROON,    icon: FiBell     },
    { action: 'Uploaded',     title: 'Strategic Plan 2024–2028', time: '3 days ago',    color: '#7c3aed', icon: FiDownload  },
    { action: 'Expired',      title: 'Interview Schedule – Planning Officers', time: '4 days ago',    color: '#dc2626', icon: FiClock    },
  ]

  return (
    <div>
      {/* Greeting */}
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(1.3rem, 2.5vw, 1.6rem)', fontWeight: 800, color: MAROON, marginBottom: '0.25rem',
        }}>
          {getGreeting()}, Admin
        </h1>
        <p style={{ fontSize: '0.78rem', color: 'rgba(74,9,24,0.42)', display: 'flex', alignItems: 'center', gap: 6 }}>
          <FiCalendar size={12} /> {friendlyDate()}
        </p>
      </div>

      {/* Metric cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
        {METRIC_CARDS.map((card, i) => (
          <motion.div key={card.label}
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            style={{
              background: '#fff', borderRadius: 16, padding: '1.25rem',
              border: '1px solid rgba(74,9,24,0.07)',
              boxShadow: '0 2px 12px rgba(74,9,24,0.05)', overflow: 'hidden',
            }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{
                width: 42, height: 42, borderRadius: 12, background: card.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <card.icon size={18} color={card.color} />
              </div>
              <span style={{ fontSize: '0.63rem', color: 'rgba(74,9,24,0.38)', textAlign: 'right', lineHeight: 1.55, maxWidth: 90 }}>
                {card.trend}
              </span>
            </div>
            <div style={{ fontSize: '2.1rem', fontWeight: 800, color: MAROON, lineHeight: 1, marginBottom: 4 }}>
              {card.value}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(74,9,24,0.48)', marginBottom: '0.9rem' }}>
              {card.label}
            </div>
            <div style={{ height: 3, background: 'rgba(74,9,24,0.07)', borderRadius: 100, overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((card.value / card.total) * 100, 100)}%` }}
                transition={{ delay: i * 0.07 + 0.35, duration: 0.9, ease: 'easeOut' }}
                style={{ height: '100%', background: card.color, borderRadius: 100 }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick actions */}
      <div style={{
        background: '#fff', borderRadius: 16, padding: '1rem 1.25rem',
        border: '1px solid rgba(74,9,24,0.07)',
        boxShadow: '0 2px 12px rgba(74,9,24,0.05)', marginBottom: '1.25rem',
      }}>
        <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'rgba(74,9,24,0.38)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.85rem' }}>
          Quick Actions
        </div>
        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
          {QUICK_ACTIONS.map(a => (
            <button key={a.label}
              onClick={() => setActive(a.section)}
              style={{
                display: 'flex', alignItems: 'center', gap: 7,
                padding: '7px 14px', borderRadius: 9,
                border: `1px solid ${a.color}28`, background: `${a.color}0c`,
                color: a.color, fontSize: '0.78rem', fontWeight: 600,
                cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = `${a.color}1a`; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = `${a.color}0c`; e.currentTarget.style.transform = 'none' }}>
              <a.icon size={13} /> {a.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem' }}>

        {/* Activity feed */}
        <div style={{
          background: '#fff', borderRadius: 16,
          border: '1px solid rgba(74,9,24,0.07)',
          boxShadow: '0 2px 12px rgba(74,9,24,0.05)', overflow: 'hidden',
        }}>
          <div style={{
            padding: '0.9rem 1.15rem', borderBottom: '1px solid rgba(74,9,24,0.06)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: MAROON }}>Recent Activity</span>
            <span style={{ fontSize: '0.67rem', color: 'rgba(74,9,24,0.38)' }}>Last 7 days</span>
          </div>
          {RECENT_ACTIVITY.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, padding: '0.7rem 1.15rem', alignItems: 'flex-start', borderBottom: i < RECENT_ACTIVITY.length - 1 ? '1px solid rgba(74,9,24,0.04)' : 'none' }}>
              <div style={{
                width: 30, height: 30, borderRadius: 9, flexShrink: 0, marginTop: 1,
                background: `${item.color}12`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <item.icon size={13} color={item.color} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 600, color: item.color, whiteSpace: 'nowrap' }}>{item.action}</span>
                  <span style={{ fontSize: '0.64rem', color: 'rgba(74,9,24,0.32)', whiteSpace: 'nowrap', flexShrink: 0 }}>{item.time}</span>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#374151', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {item.title}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Content previews */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            { label: 'Latest News',    key: 'news',    items: data.news.slice(0, 3),    icon: FiFileText },
            { label: 'Recent Notices', key: 'notices', items: data.notices.slice(0, 2), icon: FiBell     },
          ].map(card => (
            <div key={card.key} style={{
              background: '#fff', borderRadius: 16, flex: 1,
              border: '1px solid rgba(74,9,24,0.07)',
              boxShadow: '0 2px 12px rgba(74,9,24,0.05)', overflow: 'hidden',
            }}>
              <div style={{
                padding: '0.85rem 1.15rem', borderBottom: '1px solid rgba(74,9,24,0.06)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <card.icon size={13} color={GOLD} />
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: MAROON }}>{card.label}</span>
                </div>
                <button onClick={() => setActive(card.key)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.7rem', color: GOLD, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>
                  View all →
                </button>
              </div>
              {card.items.map(item => (
                <div key={item.id} style={{
                  padding: '0.65rem 1.15rem', borderBottom: '1px solid rgba(74,9,24,0.04)',
                  fontSize: '0.78rem', color: '#374151',
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <FiChevronRight size={10} color={GOLD} style={{ flexShrink: 0 }} />
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{item.title}</span>
                  {item.status && <StatusBadge s={item.status} />}
                </div>
              ))}
            </div>
          ))}
        </div>

      </div>
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
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.35rem', fontWeight: 800, color: MAROON, marginBottom: 4 }}>
            {label}
          </h1>
          <p style={{ fontSize: '0.78rem', color: 'rgba(74,9,24,0.4)' }}>
            {rows.length} record{rows.length !== 1 ? 's' : ''} total
            {selected.length > 0 && (
              <span style={{ color: GOLD, fontWeight: 600, marginLeft: 8 }}>· {selected.length} selected</span>
            )}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Search bar */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: '#fff', border: '1px solid rgba(74,9,24,0.12)',
            borderRadius: 10, padding: '7px 12px',
          }}>
            <FiSearch size={13} color="rgba(74,9,24,0.36)" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search records…"
              style={{
                border: 'none', outline: 'none', fontSize: '0.8rem',
                color: MAROON, background: 'transparent', width: 160,
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
            whileHover={{ y: -1.5, boxShadow: '0 8px 22px rgba(74,9,24,0.34)' }}
            whileTap={{ scale: 0.97 }}
            onClick={onAdd}
            style={{
              display: 'flex', alignItems: 'center', gap: 7,
              padding: '8px 17px', borderRadius: 10, border: 'none',
              background: `linear-gradient(135deg, ${MAROON} 0%, #6E1528 100%)`,
              color: '#fff', fontSize: '0.8rem', fontWeight: 600,
              cursor: 'pointer', fontFamily: 'Inter, sans-serif',
              boxShadow: '0 3px 12px rgba(74,9,24,0.28)',
            }}>
            <FiPlus size={13} /> Add New
          </motion.button>
        </div>
      </div>

      {/* Table card */}
      <div style={{
        background: '#fff', borderRadius: 16, overflow: 'hidden',
        border: '1px solid rgba(74,9,24,0.07)',
        boxShadow: '0 2px 12px rgba(74,9,24,0.05)',
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'rgba(74,9,24,0.025)', borderBottom: '1px solid rgba(74,9,24,0.08)' }}>
                <th style={{ padding: '11px 14px', width: 40 }}>
                  <div
                    onClick={toggleAll}
                    style={{
                      width: 16, height: 16, borderRadius: 4,
                      border: `1.5px solid ${allSelected ? GOLD : 'rgba(74,9,24,0.2)'}`,
                      background: allSelected ? GOLD : 'transparent',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.15s',
                    }}>
                    {allSelected && <FiCheck size={9} color="#fff" />}
                  </div>
                </th>
                {columns.map(c => (
                  <th key={c} style={{
                    padding: '11px 14px', textAlign: 'left',
                    fontSize: '0.67rem', fontWeight: 700, color: 'rgba(74,9,24,0.42)',
                    textTransform: 'uppercase', letterSpacing: '0.09em', whiteSpace: 'nowrap',
                  }}>{c}</th>
                ))}
                <th style={{
                  padding: '11px 14px', textAlign: 'right',
                  fontSize: '0.67rem', fontWeight: 700, color: 'rgba(74,9,24,0.42)',
                  textTransform: 'uppercase', letterSpacing: '0.09em',
                }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={columns.length + 2} style={{ padding: '3.5rem', textAlign: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 52, height: 52, borderRadius: 16, background: 'rgba(74,9,24,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FiSearch size={22} color="rgba(74,9,24,0.28)" />
                      </div>
                      <div style={{ fontSize: '0.86rem', fontWeight: 600, color: 'rgba(74,9,24,0.38)' }}>No records found</div>
                      <div style={{ fontSize: '0.74rem', color: 'rgba(74,9,24,0.28)' }}>Try adjusting your search query</div>
                    </div>
                  </td>
                </tr>
              )}
              {filtered.map((row, i) => {
                const isSel = selected.includes(row.id)
                return (
                  <motion.tr key={row.id}
                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    style={{
                      borderBottom: i < filtered.length - 1 ? '1px solid rgba(74,9,24,0.05)' : 'none',
                      background: isSel ? 'rgba(199,154,43,0.05)' : 'transparent',
                      transition: 'background 0.12s',
                    }}
                    onMouseEnter={e => { if (!isSel) e.currentTarget.style.background = 'rgba(74,9,24,0.02)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = isSel ? 'rgba(199,154,43,0.05)' : 'transparent' }}>
                    <td style={{ padding: '11px 14px' }}>
                      <div
                        onClick={() => toggleSelect(row.id)}
                        style={{
                          width: 16, height: 16, borderRadius: 4,
                          border: `1.5px solid ${isSel ? GOLD : 'rgba(74,9,24,0.18)'}`,
                          background: isSel ? GOLD : 'transparent',
                          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          transition: 'all 0.15s',
                        }}>
                        {isSel && <FiCheck size={9} color="#fff" />}
                      </div>
                    </td>
                    {rowCells(row).map((cell, ci) => (
                      <td key={ci} style={{
                        padding: '11px 14px', fontSize: '0.82rem',
                        color: ci === 0 ? MAROON : '#4b5563',
                        fontWeight: ci === 0 ? 500 : 400,
                        maxWidth: ci === 0 ? 260 : undefined,
                        overflow: 'hidden', textOverflow: 'ellipsis',
                        whiteSpace: ci === 0 ? 'nowrap' : undefined,
                      }}>{cell}</td>
                    ))}
                    <td style={{ padding: '11px 14px' }}>
                      <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
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
            padding: '10px 16px', borderTop: '1px solid rgba(74,9,24,0.06)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: 'rgba(74,9,24,0.015)',
          }}>
            <span style={{ fontSize: '0.72rem', color: 'rgba(74,9,24,0.4)' }}>
              Showing {filtered.length} of {rows.length} records
            </span>
            <div style={{ display: 'flex', gap: 4 }}>
              {[FiChevronLeft, FiChevronRight].map((Icon, i) => (
                <button key={i}
                  style={{
                    width: 30, height: 30, borderRadius: 8,
                    border: '1px solid rgba(74,9,24,0.12)', background: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: 'rgba(74,9,24,0.42)', transition: 'all 0.12s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(74,9,24,0.05)'}
                  onMouseLeave={e => e.currentTarget.style.background = '#fff'}>
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
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.35rem', fontWeight: 800, color: MAROON, marginBottom: 4 }}>Gallery</h1>
          <p style={{ fontSize: '0.78rem', color: 'rgba(74,9,24,0.4)' }}>{rows.length} album{rows.length !== 1 ? 's' : ''}</p>
        </div>
        <motion.button
          whileHover={{ y: -1.5, boxShadow: '0 8px 22px rgba(74,9,24,0.34)' }}
          whileTap={{ scale: 0.97 }}
          onClick={onAdd}
          style={{
            display: 'flex', alignItems: 'center', gap: 7,
            padding: '8px 17px', borderRadius: 10, border: 'none',
            background: `linear-gradient(135deg, ${MAROON} 0%, #6E1528 100%)`,
            color: '#fff', fontSize: '0.8rem', fontWeight: 600,
            cursor: 'pointer', fontFamily: 'Inter, sans-serif',
            boxShadow: '0 3px 12px rgba(74,9,24,0.28)',
          }}>
          <FiPlus size={13} /> New Album
        </motion.button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
        {rows.map((album, i) => (
          <motion.div key={album.id}
            initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(74,9,24,0.14)' }}
            style={{
              background: '#fff', borderRadius: 16, overflow: 'hidden',
              border: '1px solid rgba(74,9,24,0.07)',
              boxShadow: '0 2px 12px rgba(74,9,24,0.06)',
              transition: 'box-shadow 0.2s',
            }}>
            {/* Cover image area */}
            <div style={{ height: 148, background: PALETTE[i % PALETTE.length], display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
              {album.imageUrl
                ? <img src={album.imageUrl} alt={album.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                : <FiImage size={40} color={`${MAROON}30`} />
              }
              <div style={{ position: 'absolute', top: 10, right: 10 }}>
                <span style={{
                  background: 'rgba(0,0,0,0.38)', backdropFilter: 'blur(6px)',
                  color: '#fff', fontSize: '0.63rem', fontWeight: 600,
                  padding: '3px 9px', borderRadius: 100,
                }}>
                  {album.photos} photos
                </span>
              </div>
              <div style={{ position: 'absolute', bottom: 10, left: 10 }}>
                <span style={{
                  background: GOLD, color: '#fff',
                  fontSize: '0.6rem', fontWeight: 700,
                  padding: '3px 10px', borderRadius: 100,
                }}>
                  {album.category}
                </span>
              </div>
            </div>

            <div style={{ padding: '0.95rem 1.05rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: MAROON, marginBottom: 5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {album.title}
              </div>
              <div style={{ fontSize: '0.71rem', color: 'rgba(74,9,24,0.4)', display: 'flex', alignItems: 'center', gap: 5, marginBottom: '0.9rem' }}>
                <FiCalendar size={11} /> {album.date}
              </div>
              <div style={{ display: 'flex', gap: 7 }}>
                <button
                  onClick={() => onView(album)}
                  style={{
                    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    gap: 5, padding: '7px 0', borderRadius: 9,
                    border: '1px solid rgba(74,9,24,0.13)', background: 'transparent',
                    color: 'rgba(74,9,24,0.52)', fontSize: '0.75rem',
                    cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                    fontWeight: 500, transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(74,9,24,0.04)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <FiEye size={12} /> View
                </button>
                <button
                  onClick={() => onEdit(album)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: 33, borderRadius: 9,
                    border: `1px solid ${GOLD}38`, background: `${GOLD}0e`,
                    color: GOLD, cursor: 'pointer', transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = `${GOLD}1c`}
                  onMouseLeave={e => e.currentTarget.style.background = `${GOLD}0e`}>
                  <FiEdit2 size={12} />
                </button>
                <button
                  onClick={() => onDelete(album.id)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: 33, borderRadius: 9,
                    border: '1px solid rgba(220,38,38,0.22)', background: 'rgba(220,38,38,0.07)',
                    color: '#DC2626', cursor: 'pointer', transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(220,38,38,0.14)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(220,38,38,0.07)'}>
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
        width: 30, height: 30, borderRadius: 8,
        border: `1px solid ${color}28`, background: `${color}0e`,
        color, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.12s',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = `${color}22`; e.currentTarget.style.transform = 'scale(1.06)' }}
      onMouseLeave={e => { e.currentTarget.style.background = `${color}0e`; e.currentTarget.style.transform = 'scale(1)' }}>
      <Icon size={13} />
    </button>
  )
}

function StatusBadge({ s }) {
  const c = STATUS_COLORS[s] ?? { bg: 'rgba(0,0,0,0.06)', text: '#374151', dot: '#9ca3af' }
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '3px 9px', borderRadius: 100,
      background: c.bg, color: c.text,
      fontSize: '0.67rem', fontWeight: 600, letterSpacing: '0.02em', whiteSpace: 'nowrap',
    }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: c.dot }} />
      {s}
    </span>
  )
}

function TypeBadge({ t }) {
  return (
    <span style={{
      display: 'inline-block', padding: '2px 8px', borderRadius: 5,
      background: 'rgba(124,58,237,0.1)', color: '#7c3aed',
      fontSize: '0.67rem', fontWeight: 700, letterSpacing: '0.06em',
    }}>{t}</span>
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
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.35rem', fontWeight: 800, color: MAROON, marginBottom: 4 }}>
          Settings
        </h1>
        <p style={{ fontSize: '0.78rem', color: 'rgba(74,9,24,0.4)' }}>
          Manage your account credentials and security
        </p>
      </div>

      {/* Account overview card */}
      <div style={{
        background: '#fff', borderRadius: 16,
        padding: '1.2rem 1.4rem', marginBottom: '1.25rem',
        border: '1px solid rgba(74,9,24,0.07)',
        boxShadow: '0 2px 12px rgba(74,9,24,0.05)',
        display: 'flex', alignItems: 'center', gap: 18,
      }}>
        <div style={{
          width: 58, height: 58, borderRadius: '50%', flexShrink: 0,
          background: `linear-gradient(135deg, ${GOLD} 0%, #9A7520 100%)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontSize: '1.5rem', fontWeight: 800,
          boxShadow: `0 0 0 4px rgba(199,154,43,0.2)`,
        }}>
          {(creds?.username?.[0] ?? 'A').toUpperCase()}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '1.05rem', fontWeight: 700, color: MAROON }}>{creds?.username ?? 'Admin'}</div>
          <div style={{ fontSize: '0.74rem', color: 'rgba(74,9,24,0.45)', marginTop: 3 }}>Super Administrator</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              background: 'rgba(22,101,52,0.09)', border: '1px solid rgba(22,101,52,0.18)',
              borderRadius: 100, padding: '3px 10px',
              fontSize: '0.65rem', fontWeight: 600, color: '#166534',
            }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#16a34a' }} />
              SHA-256 Encrypted
            </span>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              background: 'rgba(74,9,24,0.06)', border: '1px solid rgba(74,9,24,0.1)',
              borderRadius: 100, padding: '3px 10px',
              fontSize: '0.65rem', fontWeight: 600, color: 'rgba(74,9,24,0.55)',
            }}>
              <FiShield size={10} /> Stored locally
            </span>
          </div>
        </div>
      </div>

      {/* Two-column form cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>

        {/* ── Change Username ── */}
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid rgba(74,9,24,0.07)', boxShadow: '0 2px 12px rgba(74,9,24,0.05)', overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid rgba(74,9,24,0.06)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(74,9,24,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <FiUser size={16} color={MAROON} />
            </div>
            <div>
              <div style={{ fontSize: '0.86rem', fontWeight: 700, color: MAROON }}>Change Username</div>
              <div style={{ fontSize: '0.7rem', color: 'rgba(74,9,24,0.42)', marginTop: 1 }}>
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
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid rgba(74,9,24,0.07)', boxShadow: '0 2px 12px rgba(74,9,24,0.05)', overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid rgba(74,9,24,0.06)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(199,154,43,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <FiLock size={16} color={GOLD} />
            </div>
            <div>
              <div style={{ fontSize: '0.86rem', fontWeight: 700, color: MAROON }}>Change Password</div>
              <div style={{ fontSize: '0.7rem', color: 'rgba(74,9,24,0.42)', marginTop: 1 }}>SHA-256 re-encrypted on save</div>
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

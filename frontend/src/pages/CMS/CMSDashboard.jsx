import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiGrid, FiFileText, FiBell, FiDownload, FiImage,
  FiLogOut, FiPlus, FiEdit2, FiTrash2, FiMenu, FiX,
  FiChevronRight, FiSearch, FiEye,
} from 'react-icons/fi'

const MAROON = '#4A0918'
const GOLD   = '#C79A2B'
const CREAM  = '#FCFBFA'
const SIDEBAR_W = 220

// ── Mock data ──────────────────────────────────────────────────────────────
const MOCK = {
  news: [
    { id: 1, title: 'Annual Planning Review 2025 Completed', date: '2026-04-20', category: 'Announcement', status: 'Published' },
    { id: 2, title: 'Southern Province Education Summit', date: '2026-04-15', category: 'Event', status: 'Published' },
    { id: 3, title: 'New Budget Allocation for Schools', date: '2026-04-10', category: 'Press Release', status: 'Draft' },
    { id: 4, title: 'Staff Development Programme 2026', date: '2026-04-05', category: 'Announcement', status: 'Published' },
  ],
  notices: [
    { id: 1, title: 'Office Closure – Public Holiday', date: '2026-04-22', category: 'General', status: 'Active' },
    { id: 2, title: 'Submission Deadline – Q1 Reports', date: '2026-04-18', category: 'Circular', status: 'Active' },
    { id: 3, title: 'Interview Schedule – Planning Officers', date: '2026-04-12', category: 'Recruitment', status: 'Expired' },
  ],
  documents: [
    { id: 1, title: 'Annual Report 2025', category: 'Reports', date: '2026-03-01', type: 'PDF' },
    { id: 2, title: 'Strategic Plan 2024–2028', category: 'Plans', date: '2026-02-14', type: 'PDF' },
    { id: 3, title: 'Budget Estimates 2026', category: 'Finance', date: '2026-01-20', type: 'PDF' },
    { id: 4, title: 'Staff Circular No. 04/2026', category: 'Circulars', date: '2026-04-01', type: 'PDF' },
  ],
  gallery: [
    { id: 1, title: 'Planning Committee Meeting – March 2026', date: '2026-03-28', category: 'Events' },
    { id: 2, title: 'Education Summit 2026', date: '2026-04-15', category: 'Events' },
    { id: 3, title: 'Office Premises', date: '2026-01-10', category: 'Infrastructure' },
  ],
}

const STATS = [
  { label: 'News Articles', value: MOCK.news.length,     icon: FiFileText, color: '#4A0918' },
  { label: 'Notices',       value: MOCK.notices.length,  icon: FiBell,     color: '#7C2D12' },
  { label: 'Documents',     value: MOCK.documents.length,icon: FiDownload, color: '#166534' },
]

const NAV = [
  { id: 'overview',  label: 'Overview',  icon: FiGrid     },
  { id: 'news',      label: 'News',      icon: FiFileText },
  { id: 'notices',   label: 'Notices',   icon: FiBell     },
  { id: 'documents', label: 'Documents', icon: FiDownload },
  { id: 'gallery',   label: 'Gallery',   icon: FiImage    },
]

const STATUS_COLORS = {
  Published: { bg: 'rgba(22,101,52,0.1)',   text: '#166534' },
  Draft:     { bg: 'rgba(120,53,15,0.1)',   text: '#92400e' },
  Active:    { bg: 'rgba(22,101,52,0.1)',   text: '#166534' },
  Expired:   { bg: 'rgba(127,29,29,0.1)',   text: '#7f1d1d' },
  Open:      { bg: 'rgba(22,101,52,0.1)',   text: '#166534' },
  Closed:    { bg: 'rgba(127,29,29,0.1)',   text: '#7f1d1d' },
}

export default function CMSDashboard() {
  const navigate   = useNavigate()
  const [active, setActive]     = useState('overview')
  const [sideOpen, setSideOpen] = useState(true)
  const [search, setSearch]     = useState('')
  const [data, setData]         = useState(MOCK)

  useEffect(() => {
    if (!sessionStorage.getItem('cms_auth')) navigate('/cms', { replace: true })
  }, [])

  const logout = () => {
    sessionStorage.removeItem('cms_auth')
    navigate('/cms', { replace: true })
  }

  const deleteRow = (section, id) =>
    setData(d => ({ ...d, [section]: d[section].filter(r => r.id !== id) }))

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Inter, sans-serif', background: '#F4F3F1' }}>

      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      <AnimatePresence initial={false}>
        {sideOpen && (
          <motion.aside
            key="sidebar"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: SIDEBAR_W, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            style={{
              background: MAROON,
              display: 'flex', flexDirection: 'column',
              overflow: 'hidden', flexShrink: 0,
              position: 'sticky', top: 0, height: '100vh',
            }}>

            {/* Logo area */}
            <div style={{ padding: '1.4rem 1.25rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <div>
                <div style={{ color: '#fff', fontFamily: "'Cinzel', serif", fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>
                  Planning Secretariat
                </div>
                <div style={{ color: GOLD, fontSize: '0.62rem', letterSpacing: '0.06em', marginTop: 3 }}>
                  Admin Portal
                </div>
              </div>
            </div>

            {/* Nav items */}
            <nav style={{ flex: 1, padding: '0.75rem 0', overflowY: 'auto' }}>
              {NAV.map(item => {
                const isActive = active === item.id
                return (
                  <button key={item.id} onClick={() => { setActive(item.id); setSearch('') }}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                      padding: '10px 1.25rem',
                      background: isActive ? 'rgba(199,154,43,0.15)' : 'transparent',
                      borderLeft: `3px solid ${isActive ? GOLD : 'transparent'}`,
                      border: 'none', borderLeft: `3px solid ${isActive ? GOLD : 'transparent'}`,
                      color: isActive ? GOLD : 'rgba(255,255,255,0.6)',
                      fontSize: '0.82rem', fontWeight: isActive ? 600 : 400,
                      cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                      transition: 'all 0.15s', textAlign: 'left',
                    }}>
                    <item.icon size={15} />
                    {item.label}
                    {isActive && <FiChevronRight size={12} style={{ marginLeft: 'auto' }} />}
                  </button>
                )
              })}
            </nav>

            {/* Logout */}
            <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <button onClick={logout} style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 9,
                padding: '9px 12px', borderRadius: 8,
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.55)', fontSize: '0.8rem',
                cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                transition: 'all 0.15s',
              }}>
                <FiLogOut size={14} /> Sign Out
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ── Main ────────────────────────────────────────────────────────── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

        {/* Header */}
        <header style={{
          background: '#fff', borderBottom: '1px solid rgba(74,9,24,0.08)',
          padding: '0 1.5rem', height: 56,
          display: 'flex', alignItems: 'center', gap: 12,
          position: 'sticky', top: 0, zIndex: 10,
        }}>
          <button onClick={() => setSideOpen(v => !v)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: MAROON, display: 'flex', padding: 4, borderRadius: 6,
          }}>
            {sideOpen ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: '0.72rem', color: 'rgba(74,9,24,0.4)' }}>CMS</span>
            <FiChevronRight size={11} color="rgba(74,9,24,0.3)" />
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: MAROON }}>
              {NAV.find(n => n.id === active)?.label}
            </span>
          </div>

          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 30, height: 30, borderRadius: '50%',
              background: `linear-gradient(135deg, ${MAROON} 0%, #6E1528 100%)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: '0.72rem', fontWeight: 700,
            }}>A</div>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: MAROON }}>Admin</span>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }}>
          <AnimatePresence mode="wait">
            <motion.div key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}>

              {active === 'overview' && <Overview data={data} setActive={setActive} />}
              {active === 'news'      && <Section section="news"      rows={data.news}      onDelete={id => deleteRow('news', id)}      search={search} setSearch={setSearch}
                columns={['Title', 'Category', 'Date', 'Status']}
                rowCells={r => [r.title, r.category, r.date, <StatusBadge s={r.status} />]} />}
              {active === 'notices'   && <Section section="notices"   rows={data.notices}   onDelete={id => deleteRow('notices', id)}   search={search} setSearch={setSearch}
                columns={['Title', 'Category', 'Date', 'Status']}
                rowCells={r => [r.title, r.category, r.date, <StatusBadge s={r.status} />]} />}
              {active === 'documents' && <Section section="documents" rows={data.documents} onDelete={id => deleteRow('documents', id)} search={search} setSearch={setSearch}
                columns={['Title', 'Category', 'Type', 'Date']}
                rowCells={r => [r.title, r.category, r.type, r.date]} />}
              {active === 'gallery'   && <Section section="gallery"   rows={data.gallery}   onDelete={id => deleteRow('gallery', id)}   search={search} setSearch={setSearch}
                columns={['Title', 'Category', 'Date']}
                rowCells={r => [r.title, r.category, r.date]} />}

            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

// ── Overview ───────────────────────────────────────────────────────────────
function Overview({ data, setActive }) {
  return (
    <div>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 800, color: MAROON, marginBottom: '0.3rem' }}>
        Dashboard
      </h1>
      <p style={{ fontSize: '0.82rem', color: 'rgba(74,9,24,0.45)', marginBottom: '1.75rem' }}>
        Welcome back, Admin. Here's a summary of your portal content.
      </p>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {STATS.map((s, i) => (
          <motion.div key={s.label}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            style={{
              background: '#fff', borderRadius: 12,
              padding: '1.25rem', cursor: 'pointer',
              border: '1px solid rgba(74,9,24,0.07)',
              boxShadow: '0 1px 4px rgba(74,9,24,0.06)',
            }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: `${s.color}15`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '0.85rem',
            }}>
              <s.icon size={17} color={s.color} />
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: MAROON, lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(74,9,24,0.5)', marginTop: 4 }}>{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Recent rows */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1rem' }}>
        {[
          { label: 'Latest News',      key: 'news',      items: data.news.slice(0, 3),      field: 'title' },
          { label: 'Recent Notices',   key: 'notices',   items: data.notices.slice(0, 3),   field: 'title' },
          { label: 'Recent Documents', key: 'documents', items: data.documents.slice(0, 3), field: 'title' },
        ].map(card => (
          <div key={card.key} style={{
            background: '#fff', borderRadius: 12, overflow: 'hidden',
            border: '1px solid rgba(74,9,24,0.07)',
            boxShadow: '0 1px 4px rgba(74,9,24,0.06)',
          }}>
            <div style={{
              padding: '0.85rem 1rem', borderBottom: '1px solid rgba(74,9,24,0.06)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: MAROON }}>{card.label}</span>
              <button onClick={() => setActive(card.key)} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: '0.72rem', color: GOLD, fontWeight: 600, fontFamily: 'Inter, sans-serif',
              }}>View all</button>
            </div>
            {card.items.map(item => (
              <div key={item.id} style={{
                padding: '0.7rem 1rem', borderBottom: '1px solid rgba(74,9,24,0.04)',
                fontSize: '0.78rem', color: '#374151',
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <FiChevronRight size={11} color={GOLD} style={{ flexShrink: 0 }} />
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item[card.field]}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Generic section table ──────────────────────────────────────────────────
function Section({ section, rows, onDelete, columns, rowCells, search, setSearch }) {
  const label = section.charAt(0).toUpperCase() + section.slice(1)

  const filtered = rows.filter(r =>
    Object.values(r).some(v => String(v).toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: 10 }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.35rem', fontWeight: 800, color: MAROON, marginBottom: 2 }}>
            {label}
          </h1>
          <p style={{ fontSize: '0.78rem', color: 'rgba(74,9,24,0.45)' }}>{rows.length} records</p>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: '#fff', border: '1px solid rgba(74,9,24,0.12)',
            borderRadius: 8, padding: '7px 12px',
          }}>
            <FiSearch size={13} color="rgba(74,9,24,0.4)" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search…"
              style={{
                border: 'none', outline: 'none', fontSize: '0.8rem',
                color: MAROON, background: 'transparent', width: 160,
                fontFamily: 'Inter, sans-serif',
              }} />
          </div>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '8px 14px', borderRadius: 8, border: 'none',
            background: MAROON, color: '#fff',
            fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
            boxShadow: '0 2px 8px rgba(74,9,24,0.25)',
          }}>
            <FiPlus size={13} /> Add New
          </button>
        </div>
      </div>

      <div style={{
        background: '#fff', borderRadius: 12, overflow: 'hidden',
        border: '1px solid rgba(74,9,24,0.07)',
        boxShadow: '0 1px 4px rgba(74,9,24,0.06)',
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'rgba(74,9,24,0.03)', borderBottom: '1px solid rgba(74,9,24,0.08)' }}>
                {columns.map(c => (
                  <th key={c} style={{
                    padding: '10px 14px', textAlign: 'left',
                    fontSize: '0.7rem', fontWeight: 700, color: 'rgba(74,9,24,0.5)',
                    textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap',
                  }}>{c}</th>
                ))}
                <th style={{ padding: '10px 14px', fontSize: '0.7rem', fontWeight: 700,
                  color: 'rgba(74,9,24,0.5)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={columns.length + 1} style={{ padding: '2rem', textAlign: 'center', fontSize: '0.82rem', color: 'rgba(74,9,24,0.35)' }}>
                  No records found.
                </td></tr>
              )}
              {filtered.map((row, i) => (
                <tr key={row.id} style={{
                  borderBottom: i < filtered.length - 1 ? '1px solid rgba(74,9,24,0.05)' : 'none',
                  transition: 'background 0.12s',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(74,9,24,0.02)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  {rowCells(row).map((cell, ci) => (
                    <td key={ci} style={{
                      padding: '11px 14px', fontSize: '0.82rem', color: '#374151',
                      maxWidth: ci === 0 ? 260 : undefined,
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: ci === 0 ? 'nowrap' : undefined,
                    }}>{cell}</td>
                  ))}
                  <td style={{ padding: '11px 14px', whiteSpace: 'nowrap' }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <ActionBtn icon={FiEye}    title="View"   color="rgba(74,9,24,0.45)" />
                      <ActionBtn icon={FiEdit2}  title="Edit"   color={GOLD} />
                      <ActionBtn icon={FiTrash2} title="Delete" color="#DC2626" onClick={() => onDelete(row.id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function ActionBtn({ icon: Icon, title, color, onClick }) {
  return (
    <button title={title} onClick={onClick} style={{
      width: 28, height: 28, borderRadius: 6, border: `1px solid ${color}22`,
      background: `${color}11`, color, cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      transition: 'all 0.12s',
    }}
      onMouseEnter={e => { e.currentTarget.style.background = `${color}22` }}
      onMouseLeave={e => { e.currentTarget.style.background = `${color}11` }}>
      <Icon size={12} />
    </button>
  )
}

function StatusBadge({ s }) {
  const c = STATUS_COLORS[s] || { bg: 'rgba(0,0,0,0.06)', text: '#374151' }
  return (
    <span style={{
      display: 'inline-block', padding: '3px 10px', borderRadius: 100,
      background: c.bg, color: c.text,
      fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.03em',
    }}>{s}</span>
  )
}

import React, { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import {
  FiPlus, FiEdit2, FiTrash2,
  FiSearch, FiX, FiCheck, FiCalendar, FiClock,
} from 'react-icons/fi'

const MAROON = '#4A0918'
const GOLD   = '#C79A2B'
const LS_KEY = 'cms_home_events'

/* ── BroadcastChannel ────────────────────────────────────────────────────── */
const _evChannel = typeof BroadcastChannel !== 'undefined'
  ? new BroadcastChannel('cms_home_events')
  : null

function notifyUpdated() {
  window.dispatchEvent(new Event('cms_home_events_updated'))
  _evChannel?.postMessage('updated')
}

/* ── localStorage helpers ────────────────────────────────────────────────── */
function loadFromStorage() {
  try {
    const raw = localStorage.getItem(LS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

function saveToStorage(items) {
  localStorage.setItem(LS_KEY, JSON.stringify(items))
  notifyUpdated()
}

/* ── Form defaults ───────────────────────────────────────────────────────── */
const EMPTY_FORM = {
  titleEn: '',
  titleSi: '',
  titleTa: '',
  date:    '',
  time:    '',
  status:  'Active',
}

/* ════════════════════════════════════════════════════════════════════════════
   Main section
   ════════════════════════════════════════════════════════════════════════════ */
export default function CMSHomeEvents({ search = '', setSearch = () => {} }) {
  const [items,       setItems]       = useState([])
  const [formModal,   setFormModal]   = useState(false)
  const [editData,    setEditData]    = useState(null)
  const [deleteModal, setDeleteModal] = useState(null)

  useEffect(() => { setItems(loadFromStorage()) }, [])

  const persistAndSet = useCallback((updated, msg) => {
    saveToStorage(updated)
    setItems(updated)
    if (msg) toast.success(msg)
  }, [])

  const addItem = useCallback((form) => {
    const item = {
      ...EMPTY_FORM, ...form,
      id:        Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    persistAndSet([item, ...items], 'Event added')
    setFormModal(false)
  }, [items, persistAndSet])

  const updateItem = useCallback((form) => {
    const updated = items.map(it =>
      it.id === editData.id
        ? { ...it, ...form, updatedAt: new Date().toISOString() }
        : it
    )
    persistAndSet(updated, 'Event updated')
    setEditData(null)
  }, [items, editData, persistAndSet])

  const confirmDelete = (id) => {
    const row = items.find(r => r.id === id)
    setDeleteModal({ id, title: row?.titleEn || 'this event' })
  }

  const executeDelete = () => {
    if (!deleteModal) return
    persistAndSet(items.filter(it => it.id !== deleteModal.id), 'Event deleted')
    setDeleteModal(null)
  }

  const q        = (search || '').toLowerCase()
  const filtered = items.filter(it =>
    !q ||
    (it.titleEn || '').toLowerCase().includes(q) ||
    (it.titleSi || '').toLowerCase().includes(q) ||
    (it.titleTa || '').toLowerCase().includes(q)
  )

  const activeCount = items.filter(it => it.status === 'Active').length

  return (
    <div>
      {/* ── Header ── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.35rem', fontWeight: 800, color: MAROON, marginBottom: 4 }}>
            Home Events Calendar
          </h1>
          <p style={{ fontSize: '0.78rem', color: 'rgba(74,9,24,0.45)', margin: 0 }}>
            {items.length} event{items.length !== 1 ? 's' : ''} total &nbsp;·&nbsp;
            <span style={{ color: '#16a34a', fontWeight: 600 }}>{activeCount} active</span>
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Search */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: '#fff', border: '1px solid rgba(74,9,24,0.12)',
            borderRadius: 10, padding: '7px 12px',
          }}>
            <FiSearch size={13} color="rgba(74,9,24,0.36)" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search events…"
              style={{
                border: 'none', outline: 'none', fontSize: '0.8rem',
                color: MAROON, background: 'transparent', width: 150,
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
            onClick={() => setFormModal(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: 7,
              padding: '8px 17px', borderRadius: 10, border: 'none',
              background: `linear-gradient(135deg, ${MAROON} 0%, #6E1528 100%)`,
              color: '#fff', fontSize: '0.8rem', fontWeight: 600,
              cursor: 'pointer', fontFamily: 'Inter, sans-serif',
              boxShadow: '0 3px 12px rgba(74,9,24,0.28)',
            }}>
            <FiPlus size={13} /> Add Event
          </motion.button>
        </div>
      </div>

      {/* ── Info banner ── */}
      <div style={{
        background: 'rgba(199,154,43,0.07)', border: '1px solid rgba(199,154,43,0.22)',
        borderRadius: 12, padding: '10px 16px', marginBottom: '1.25rem',
        display: 'flex', gap: 10, alignItems: 'flex-start',
      }}>
        <FiCalendar size={14} color={GOLD} style={{ marginTop: 1, flexShrink: 0 }} />
        <p style={{ fontSize: '0.77rem', color: 'rgba(74,9,24,0.65)', margin: 0, lineHeight: 1.6 }}>
          Events added here appear on the home page calendar. Sinhala and Tamil titles are optional.
        </p>
      </div>

      {/* ── Table ── */}
      <div style={{
        background: '#fff', borderRadius: 16, overflow: 'hidden',
        border: '1px solid rgba(74,9,24,0.07)',
        boxShadow: '0 2px 12px rgba(74,9,24,0.05)',
      }}>
        {filtered.length === 0 ? (
          <EmptyState search={search} onAdd={() => setFormModal(true)} />
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 560 }}>
              <thead>
                <tr style={{ background: 'rgba(74,9,24,0.025)', borderBottom: '1px solid rgba(74,9,24,0.08)' }}>
                  {['#', 'Event Name', 'Date', 'Time', 'Actions'].map(h => (
                    <th key={h} style={{
                      padding: '11px 14px', textAlign: 'left',
                      fontSize: '0.67rem', fontWeight: 700, color: 'rgba(74,9,24,0.42)',
                      textTransform: 'uppercase', letterSpacing: '0.09em', whiteSpace: 'nowrap',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((item, i) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    style={{
                      borderBottom: i < filtered.length - 1 ? '1px solid rgba(74,9,24,0.05)' : 'none',
                      transition: 'background 0.12s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(74,9,24,0.02)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    {/* # */}
                    <td style={{ padding: '11px 14px', fontSize: '0.76rem', color: 'rgba(74,9,24,0.32)', fontWeight: 600, width: 36 }}>
                      {i + 1}
                    </td>

                    {/* Name */}
                    <td style={{ padding: '11px 14px', maxWidth: 320 }}>
                      <div style={{ fontSize: '0.83rem', fontWeight: 600, color: MAROON, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {item.titleEn || <span style={{ color: 'rgba(74,9,24,0.3)', fontStyle: 'italic' }}>No title</span>}
                      </div>
                      {(item.titleSi || item.titleTa) && (
                        <div style={{ fontSize: '0.71rem', color: 'rgba(74,9,24,0.42)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {item.titleSi && <span>{item.titleSi}</span>}
                          {item.titleSi && item.titleTa && <span style={{ margin: '0 4px' }}>·</span>}
                          {item.titleTa && <span>{item.titleTa}</span>}
                        </div>
                      )}
                    </td>

                    {/* Date */}
                    <td style={{ padding: '11px 14px', whiteSpace: 'nowrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.8rem', fontWeight: 600, color: MAROON }}>
                        <FiCalendar size={11} color={GOLD} />
                        {item.date
                          ? new Date(item.date + 'T00:00:00').toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
                          : <span style={{ color: 'rgba(74,9,24,0.3)', fontStyle: 'italic', fontWeight: 400 }}>—</span>
                        }
                      </div>
                    </td>

                    {/* Time */}
                    <td style={{ padding: '11px 14px', whiteSpace: 'nowrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.8rem', color: 'rgba(74,9,24,0.65)' }}>
                        <FiClock size={11} color={GOLD} />
                        {item.time || <span style={{ color: 'rgba(74,9,24,0.28)', fontStyle: 'italic' }}>—</span>}
                      </div>
                    </td>

                    {/* Actions */}
                    <td style={{ padding: '11px 14px' }}>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button onClick={() => setEditData(item)} title="Edit"
                          style={{ ...iconBtn, color: GOLD, border: `1px solid ${GOLD}38`, background: `${GOLD}0e` }}>
                          <FiEdit2 size={13} />
                        </button>
                        <button onClick={() => confirmDelete(item.id)} title="Delete"
                          style={{ ...iconBtn, color: '#DC2626', border: '1px solid rgba(220,38,38,0.22)', background: 'rgba(220,38,38,0.07)' }}>
                          <FiTrash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Modals (portalled to document.body to escape transform stacking context) ── */}
      {createPortal(
        <AnimatePresence>
          {formModal && <EventFormModal onClose={() => setFormModal(false)} onSave={addItem} />}
        </AnimatePresence>,
        document.body
      )}
      {createPortal(
        <AnimatePresence>
          {editData && <EventFormModal initialData={editData} onClose={() => setEditData(null)} onSave={updateItem} />}
        </AnimatePresence>,
        document.body
      )}

      {/* ── Delete confirm ── */}
      {createPortal(
        <AnimatePresence>
          {deleteModal && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={overlayStyle}>
              <motion.div
                initial={{ scale: 0.93, opacity: 0, y: 16 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.93, opacity: 0, y: 16 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ background: '#fff', borderRadius: 18, padding: '1.75rem', maxWidth: 420, width: '100%', boxShadow: '0 24px 64px rgba(0,0,0,0.22)' }}>
                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                  <div style={{ width: 46, height: 46, borderRadius: 13, flexShrink: 0, background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FiTrash2 size={20} color="#DC2626" />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', fontWeight: 800, color: MAROON, marginBottom: '0.3rem' }}>
                      Delete Event
                    </h3>
                    <p style={{ fontSize: '0.83rem', color: 'rgba(74,9,24,0.55)', lineHeight: 1.65 }}>
                      Delete <strong style={{ color: MAROON }}>&quot;{deleteModal.title}&quot;</strong>? This cannot be undone.
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                  <button onClick={() => setDeleteModal(null)} style={cancelBtnStyle}>Cancel</button>
                  <motion.button
                    whileHover={{ y: -1, boxShadow: '0 6px 20px rgba(220,38,38,0.35)' }}
                    whileTap={{ scale: 0.97 }}
                    onClick={executeDelete}
                    style={deleteBtnStyle}>
                    <FiTrash2 size={13} /> Delete
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  )
}

/* ── Empty state ─────────────────────────────────────────────────────────── */
function EmptyState({ search, onAdd }) {
  return (
    <div style={{ padding: '4rem', textAlign: 'center' }}>
      <div style={{
        width: 56, height: 56, borderRadius: 18,
        background: 'rgba(74,9,24,0.06)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 1rem',
      }}>
        <FiCalendar size={24} color="rgba(74,9,24,0.28)" />
      </div>
      <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'rgba(74,9,24,0.38)', marginBottom: 6 }}>
        {search ? 'No events match your search' : 'No events yet'}
      </div>
      <div style={{ fontSize: '0.76rem', color: 'rgba(74,9,24,0.28)', marginBottom: search ? 0 : '1rem' }}>
        {search ? 'Try a different keyword' : 'Add your first event to show it on the home calendar.'}
      </div>
      {!search && (
        <motion.button
          whileHover={{ y: -1.5 }} whileTap={{ scale: 0.97 }}
          onClick={onAdd}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            padding: '9px 20px', borderRadius: 10, border: 'none',
            background: `linear-gradient(135deg, ${MAROON} 0%, #6E1528 100%)`,
            color: '#fff', fontSize: '0.82rem', fontWeight: 600,
            cursor: 'pointer', fontFamily: 'Inter, sans-serif',
            boxShadow: '0 3px 12px rgba(74,9,24,0.28)',
          }}>
          <FiPlus size={13} /> Add Event
        </motion.button>
      )}
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   Add / Edit Form Modal
   ════════════════════════════════════════════════════════════════════════════ */
function EventFormModal({ onClose, onSave, initialData = null }) {
  const isEdit    = initialData !== null
  const [form,    setForm]    = useState(() => ({ ...EMPTY_FORM, ...(initialData || {}) }))
  const [langTab, setLangTab] = useState('en')
  const [error,   setError]   = useState('')
  const [saving,  setSaving]  = useState(false)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  useEffect(() => {
    const h = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose])

  const handleSave = () => {
    if (!form.titleEn.trim()) { setError('English event name is required'); return }
    if (!form.date)            { setError('Date is required'); return }
    setSaving(true)
    setTimeout(() => { onSave(form); setSaving(false) }, 120)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={overlayStyle}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.93, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.93, opacity: 0, y: 20 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: '#fff', borderRadius: 20, width: '100%', maxWidth: 500,
          maxHeight: '90vh', overflow: 'hidden',
          boxShadow: '0 30px 80px rgba(0,0,0,0.28)',
          display: 'flex', flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '1.2rem 1.5rem', borderBottom: '1px solid rgba(74,9,24,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0,
        }}>
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.15rem', fontWeight: 800, color: MAROON, margin: 0 }}>
              {isEdit ? 'Edit Event' : 'Add New Event'}
            </h2>
            <p style={{ fontSize: '0.72rem', color: 'rgba(74,9,24,0.42)', margin: '3px 0 0' }}>
              Home Events Calendar · Southern Province
            </p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(74,9,24,0.42)', display: 'flex', padding: 6, borderRadius: 8 }}>
            <FiX size={18} />
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>

          {/* Event Name with language tabs */}
          <div>
            <LabelEl>Event Name</LabelEl>
            <div style={{ display: 'flex', gap: 4, marginBottom: '0.75rem', background: 'rgba(74,9,24,0.05)', borderRadius: 10, padding: 4, width: 'fit-content' }}>
              {[['en', 'English'], ['si', 'සිංහල'], ['ta', 'தமிழ்']].map(([code, lbl]) => (
                <button key={code} onClick={() => setLangTab(code)}
                  style={{
                    padding: '5px 14px', borderRadius: 7, border: 'none', cursor: 'pointer',
                    background: langTab === code ? '#fff' : 'transparent',
                    color: langTab === code ? MAROON : 'rgba(74,9,24,0.42)',
                    fontWeight: langTab === code ? 700 : 400, fontSize: '0.76rem',
                    fontFamily: 'Inter, sans-serif',
                    boxShadow: langTab === code ? '0 1px 4px rgba(74,9,24,0.12)' : 'none',
                    transition: 'all 0.15s',
                  }}>
                  {lbl}
                </button>
              ))}
            </div>

            {langTab === 'en' && (
              <FieldInput
                label="Event Name (English) *"
                value={form.titleEn}
                onChange={v => { set('titleEn', v); setError('') }}
                placeholder="e.g. Provincial Development Meeting"
              />
            )}
            {langTab === 'si' && (
              <FieldInput
                label="සිදුවීමේ නම (සිංහල)"
                value={form.titleSi}
                onChange={v => set('titleSi', v)}
                placeholder="සිදුවීමේ නම සිංහලෙන් ටයිප් කරන්න…"
              />
            )}
            {langTab === 'ta' && (
              <FieldInput
                label="நிகழ்வின் பெயர் (தமிழ்)"
                value={form.titleTa}
                onChange={v => set('titleTa', v)}
                placeholder="நிகழ்வின் பெயரை தமிழில் உள்ளிடவும்…"
              />
            )}
          </div>

          {/* Date & Time */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <FieldInput
              label="Date *"
              type="date"
              value={form.date}
              onChange={v => { set('date', v); setError('') }}
            />
            <FieldInput
              label="Time"
              value={form.time}
              onChange={v => set('time', v)}
              placeholder="e.g. 09:00 AM"
              icon={<FiClock size={13} />}
            />
          </div>

          {error && (
            <p style={{ color: '#DC2626', fontSize: '0.78rem', margin: 0, fontFamily: 'Inter, sans-serif' }}>
              ⚠ {error}
            </p>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '0.9rem 1.5rem', borderTop: '1px solid rgba(74,9,24,0.07)',
          display: 'flex', justifyContent: 'flex-end', gap: 10, flexShrink: 0,
          background: 'rgba(252,251,250,0.6)',
        }}>
          <button onClick={onClose} style={cancelBtnStyle}>Cancel</button>
          <motion.button
            whileHover={{ y: -1.5, boxShadow: '0 8px 22px rgba(74,9,24,0.34)' }}
            whileTap={{ scale: 0.97 }}
            onClick={handleSave}
            disabled={saving}
            style={{
              display: 'flex', alignItems: 'center', gap: 7,
              padding: '9px 22px', borderRadius: 10, border: 'none',
              background: `linear-gradient(135deg, ${MAROON} 0%, #6E1528 100%)`,
              color: '#fff', fontSize: '0.83rem', fontWeight: 700,
              cursor: saving ? 'not-allowed' : 'pointer',
              fontFamily: 'Inter, sans-serif', opacity: saving ? 0.7 : 1,
              boxShadow: '0 3px 12px rgba(74,9,24,0.28)',
            }}>
            <FiCheck size={14} />
            {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Add Event'}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── Shared style tokens ─────────────────────────────────────────────────── */
const iconBtn = {
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  width: 30, height: 30, borderRadius: 8,
  border: '1px solid rgba(74,9,24,0.13)',
  background: 'transparent', color: 'rgba(74,9,24,0.48)',
  cursor: 'pointer', transition: 'all 0.15s',
}

const overlayStyle = {
  position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.48)',
  zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
}

const cancelBtnStyle = {
  padding: '9px 20px', borderRadius: 10,
  border: '1px solid rgba(74,9,24,0.14)', background: 'transparent',
  color: 'rgba(74,9,24,0.55)', fontSize: '0.83rem', cursor: 'pointer',
  fontFamily: 'Inter, sans-serif', fontWeight: 500,
}

const deleteBtnStyle = {
  padding: '9px 20px', borderRadius: 10, border: 'none',
  background: 'linear-gradient(135deg, #DC2626 0%, #b91c1c 100%)',
  color: '#fff', fontSize: '0.83rem', cursor: 'pointer',
  fontFamily: 'Inter, sans-serif', fontWeight: 600,
  display: 'flex', alignItems: 'center', gap: 7,
  boxShadow: '0 3px 12px rgba(220,38,38,0.3)',
}

/* ── Form field widgets ──────────────────────────────────────────────────── */
function LabelEl({ children }) {
  return (
    <label style={{
      display: 'block', fontSize: '0.72rem', fontWeight: 700,
      color: 'rgba(74,9,24,0.55)', textTransform: 'uppercase',
      letterSpacing: '0.08em', marginBottom: '0.4rem',
      fontFamily: 'Inter, sans-serif',
    }}>
      {children}
    </label>
  )
}

function FieldInput({ label, value, onChange, placeholder, type = 'text', icon }) {
  return (
    <div style={{ marginBottom: '0.75rem' }}>
      <LabelEl>{label}</LabelEl>
      <div style={{ position: 'relative' }}>
        {icon && (
          <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'rgba(74,9,24,0.35)' }}>
            {icon}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            width: '100%', padding: icon ? '9px 12px 9px 30px' : '9px 12px',
            borderRadius: 10, boxSizing: 'border-box',
            border: '1px solid rgba(74,9,24,0.14)', outline: 'none',
            fontSize: '0.82rem', color: MAROON,
            fontFamily: 'Inter, sans-serif', background: '#fff',
          }}
        />
      </div>
    </div>
  )
}

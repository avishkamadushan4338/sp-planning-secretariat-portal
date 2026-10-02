/**
 * CMSHomeNewsBar.jsx
 * Admin section — Home News Bar.
 * Only fields: description (EN/SI/TA) + status (Active / Draft).
 * Max 2 Active items shown on the home page ticker.
 */
import React, { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import {
  FiPlus, FiEdit2, FiTrash2, FiEye,
  FiSearch, FiX, FiCheck, FiFileText, FiStar,
} from 'react-icons/fi'

const MAROON   = '#4A0918'
const GOLD     = '#C79A2B'
const API_BASE = import.meta.env.VITE_API_URL || ''

async function fetchItems() {
  const res = await fetch(`${API_BASE}/api/news-bar`)
  if (!res.ok) throw new Error('Failed to load')
  return res.json()
}

async function persistItems(items) {
  const res = await fetch(`${API_BASE}/api/news-bar`, {
    method:  'PUT',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(items),
  })
  if (!res.ok) throw new Error('Failed to save')
}

const EMPTY_FORM = {
  descriptionEn: '',
  descriptionSi: '',
  descriptionTa: '',
  status: 'Active',
}

/* ════════════════════════════════════════════════════════════════════════════
   Main section
   ════════════════════════════════════════════════════════════════════════════ */
export default function CMSHomeNewsBar({ search = '', setSearch = () => {} }) {
  const [items,       setItems]       = useState([])
  const [formModal,   setFormModal]   = useState(false)
  const [editData,    setEditData]    = useState(null)
  const [viewData,    setViewData]    = useState(null)
  const [deleteModal, setDeleteModal] = useState(null)

  useEffect(() => {
    fetchItems()
      .then(setItems)
      .catch(() => toast.error('Could not load news bar items'))
  }, [])

  const saveAndSet = useCallback(async (updated, successMsg) => {
    try {
      await persistItems(updated)
      setItems(updated)
      if (successMsg) toast.success(successMsg)
    } catch {
      toast.error('Save failed — check your connection')
    }
  }, [])

  const addItem = useCallback(async (form) => {
    const newItem = {
      ...EMPTY_FORM, ...form,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    await saveAndSet([newItem, ...items], 'News bar item added')
    setFormModal(false)
  }, [items, saveAndSet])

  const updateItem = useCallback(async (form) => {
    const updated = items.map(it =>
      it.id === editData.id
        ? { ...it, ...form, updatedAt: new Date().toISOString() }
        : it
    )
    await saveAndSet(updated, 'News bar item updated')
    setEditData(null)
  }, [items, editData, saveAndSet])

  const toggleStatus = useCallback(async (id) => {
    const updated = items.map(it =>
      it.id === id
        ? { ...it, status: it.status === 'Active' ? 'Draft' : 'Active', updatedAt: new Date().toISOString() }
        : it
    )
    await saveAndSet(updated, null)
  }, [items, saveAndSet])

  const confirmDelete = (id) => {
    const row = items.find(r => r.id === id)
    const preview = (row?.descriptionEn || '').slice(0, 50) || 'this item'
    setDeleteModal({ id, title: preview })
  }

  const executeDelete = async () => {
    if (!deleteModal) return
    const updated = items.filter(it => it.id !== deleteModal.id)
    await saveAndSet(updated, 'Item deleted')
    setDeleteModal(null)
  }

  const q = search.toLowerCase()
  const filtered = items.filter(it =>
    !q ||
    (it.descriptionEn || '').toLowerCase().includes(q) ||
    (it.status || '').toLowerCase().includes(q)
  )

  const activeCount = items.filter(it => it.status === 'Active').length

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.35rem', fontWeight: 800, color: MAROON, marginBottom: 4 }}>
            Home News Bar
          </h1>
          <p style={{ fontSize: '0.78rem', color: 'rgba(74,9,24,0.45)' }}>
            {items.length} item{items.length !== 1 ? 's' : ''} total &nbsp;·&nbsp;
            <span style={{ color: '#16a34a', fontWeight: 600 }}>
              {Math.min(activeCount, 2)} of {activeCount} active shown on home
            </span>
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          {/* search */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: '#fff', border: '1px solid rgba(74,9,24,0.12)',
            borderRadius: 10, padding: '7px 12px',
          }}>
            <FiSearch size={13} color="rgba(74,9,24,0.36)" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search…"
              style={{
                border: 'none', outline: 'none', fontSize: '0.8rem',
                color: MAROON, background: 'transparent', width: 140,
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
            <FiPlus size={13} /> Add News Item
          </motion.button>
        </div>
      </div>

      {/* Info banner */}
      <div style={{
        background: 'rgba(199,154,43,0.07)', border: '1px solid rgba(199,154,43,0.22)',
        borderRadius: 12, padding: '10px 16px', marginBottom: '1.25rem',
        display: 'flex', gap: 10, alignItems: 'flex-start',
      }}>
        <FiStar size={14} color={GOLD} style={{ marginTop: 1, flexShrink: 0 }} />
        <p style={{ fontSize: '0.77rem', color: 'rgba(74,9,24,0.65)', margin: 0, lineHeight: 1.6 }}>
          The <strong>2 most recently added Active items</strong> scroll as a running ticker below the hero section on the home page. Set an item to <strong>Draft</strong> to hide it.
        </p>
      </div>

      {/* Table */}
      <div style={{
        background: '#fff', borderRadius: 16, overflow: 'hidden',
        border: '1px solid rgba(74,9,24,0.07)',
        boxShadow: '0 2px 12px rgba(74,9,24,0.05)',
      }}>
        {filtered.length === 0 ? (
          <div style={{ padding: '4rem', textAlign: 'center' }}>
            <div style={{
              width: 56, height: 56, borderRadius: 18,
              background: 'rgba(74,9,24,0.06)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1rem',
            }}>
              <FiFileText size={24} color="rgba(74,9,24,0.28)" />
            </div>
            <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'rgba(74,9,24,0.38)', marginBottom: 6 }}>
              {search ? 'No items match your search' : 'No news bar items yet'}
            </div>
            <div style={{ fontSize: '0.76rem', color: 'rgba(74,9,24,0.28)' }}>
              {search ? 'Try a different keyword' : 'Click "Add News Item" to get started'}
            </div>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'rgba(74,9,24,0.025)', borderBottom: '1px solid rgba(74,9,24,0.08)' }}>
                  {['#', 'Description (English)', 'Status', 'Added', 'Actions'].map(h => (
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
                    {/* row number */}
                    <td style={{ padding: '11px 14px', fontSize: '0.76rem', color: 'rgba(74,9,24,0.32)', fontWeight: 600, width: 36 }}>
                      {i + 1}
                    </td>

                    {/* description preview */}
                    <td style={{ padding: '11px 14px', maxWidth: 360 }}>
                      <div style={{
                        fontSize: '0.83rem', fontWeight: 500, color: MAROON,
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      }}>
                        {item.descriptionEn || <span style={{ color: 'rgba(74,9,24,0.3)', fontStyle: 'italic' }}>No English description</span>}
                      </div>
                      {item.descriptionSi && (
                        <div style={{ fontSize: '0.72rem', color: 'rgba(74,9,24,0.42)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          SI: {item.descriptionSi}
                        </div>
                      )}
                    </td>

                    {/* status toggle */}
                    <td style={{ padding: '11px 14px' }}>
                      <button
                        onClick={() => toggleStatus(item.id)}
                        title="Click to toggle Active / Draft"
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: 6,
                          padding: '5px 12px', borderRadius: 100, border: 'none', cursor: 'pointer',
                          background: item.status === 'Active' ? 'rgba(22,101,52,0.1)' : 'rgba(180,83,9,0.1)',
                          color: item.status === 'Active' ? '#166534' : '#92400e',
                          fontSize: '0.72rem', fontWeight: 700,
                          fontFamily: 'Inter, sans-serif', transition: 'all 0.15s',
                        }}>
                        <span style={{
                          width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
                          background: item.status === 'Active' ? '#16a34a' : '#d97706',
                        }} />
                        {item.status}
                      </button>
                    </td>

                    {/* date added */}
                    <td style={{ padding: '11px 14px', fontSize: '0.76rem', color: '#9ca3af', whiteSpace: 'nowrap' }}>
                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                    </td>

                    {/* actions */}
                    <td style={{ padding: '11px 14px' }}>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button onClick={() => setViewData(item)} title="View" style={iconBtn}>
                          <FiEye size={13} />
                        </button>
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

      {/* Modals — portalled to escape the sidebar transform stacking context */}
      {createPortal(
        <AnimatePresence>
          {formModal && <NewsBarFormModal onClose={() => setFormModal(false)} onSave={addItem} />}
        </AnimatePresence>,
        document.body
      )}
      {createPortal(
        <AnimatePresence>
          {editData && <NewsBarFormModal initialData={editData} onClose={() => setEditData(null)} onSave={updateItem} />}
        </AnimatePresence>,
        document.body
      )}
      {createPortal(
        <AnimatePresence>
          {viewData && <ViewNewsBarModal item={viewData} onClose={() => setViewData(null)} onEdit={it => { setViewData(null); setEditData(it) }} />}
        </AnimatePresence>,
        document.body
      )}

      {/* Delete confirm */}
      {createPortal(
        <AnimatePresence>
        {deleteModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={overlay}>
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
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', fontWeight: 800, color: MAROON, marginBottom: '0.3rem' }}>Delete Item</h3>
                  <p style={{ fontSize: '0.83rem', color: 'rgba(74,9,24,0.55)', lineHeight: 1.65 }}>
                    Delete <strong style={{ color: MAROON }}>&quot;{deleteModal.title}&quot;</strong>? This cannot be undone.
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                <button onClick={() => setDeleteModal(null)} style={cancelBtn}>Cancel</button>
                <motion.button
                  whileHover={{ y: -1, boxShadow: '0 6px 20px rgba(220,38,38,0.35)' }}
                  whileTap={{ scale: 0.97 }}
                  onClick={executeDelete}
                  style={deleteBtn}>
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

/* ── shared tokens ────────────────────────────────────────────────────────── */
const iconBtn = {
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  width: 30, height: 30, borderRadius: 8,
  border: '1px solid rgba(74,9,24,0.13)',
  background: 'transparent', color: 'rgba(74,9,24,0.48)',
  cursor: 'pointer', transition: 'all 0.15s',
}
const overlay = {
  position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.48)',
  zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
}
const cancelBtn = {
  padding: '9px 20px', borderRadius: 10,
  border: '1px solid rgba(74,9,24,0.14)', background: 'transparent',
  color: 'rgba(74,9,24,0.55)', fontSize: '0.83rem', cursor: 'pointer',
  fontFamily: 'Inter, sans-serif', fontWeight: 500,
}
const deleteBtn = {
  padding: '9px 20px', borderRadius: 10, border: 'none',
  background: 'linear-gradient(135deg, #DC2626 0%, #b91c1c 100%)',
  color: '#fff', fontSize: '0.83rem', cursor: 'pointer',
  fontFamily: 'Inter, sans-serif', fontWeight: 600,
  display: 'flex', alignItems: 'center', gap: 7,
  boxShadow: '0 3px 12px rgba(220,38,38,0.3)',
}

/* ════════════════════════════════════════════════════════════════════════════
   Add / Edit Form Modal  — only description + status
   ════════════════════════════════════════════════════════════════════════════ */
function NewsBarFormModal({ onClose, onSave, initialData = null }) {
  const isEdit = initialData !== null
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
    if (!form.descriptionEn.trim()) { setError('English description is required'); return }
    setSaving(true)
    setTimeout(() => { onSave(form); setSaving(false) }, 120)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={overlay}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.93, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.93, opacity: 0, y: 20 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: '#fff', borderRadius: 20, width: '100%', maxWidth: 540,
          maxHeight: '88vh', overflow: 'hidden',
          boxShadow: '0 30px 80px rgba(0,0,0,0.28)',
          display: 'flex', flexDirection: 'column',
        }}
      >
        {/* header */}
        <div style={{
          padding: '1.2rem 1.5rem', borderBottom: '1px solid rgba(74,9,24,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0,
        }}>
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.15rem', fontWeight: 800, color: MAROON, margin: 0 }}>
              {isEdit ? 'Edit News Bar Text' : 'Add News Bar Text'}
            </h2>
            <p style={{ fontSize: '0.72rem', color: 'rgba(74,9,24,0.42)', margin: '3px 0 0' }}>
              Running ticker · Home page hero
            </p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(74,9,24,0.42)', display: 'flex', padding: 6, borderRadius: 8 }}>
            <FiX size={18} />
          </button>
        </div>

        {/* body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>

          {/* Language tabs */}
          <div>
            <LabelEl>News Text</LabelEl>
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
              <FieldTextarea
                label="Description (English) *"
                value={form.descriptionEn}
                onChange={v => { set('descriptionEn', v); setError('') }}
                placeholder="Type the news text that will scroll on the home page…"
              />
            )}
            {langTab === 'si' && (
              <FieldTextarea
                label="විස්තරය (සිංහල)"
                value={form.descriptionSi}
                onChange={v => set('descriptionSi', v)}
                placeholder="ගෙදර පිටුවේ ධාවනය වන පුවත් පෙළ ටයිප් කරන්න…"
              />
            )}
            {langTab === 'ta' && (
              <FieldTextarea
                label="விளக்கம் (தமிழ்)"
                value={form.descriptionTa}
                onChange={v => set('descriptionTa', v)}
                placeholder="முகப்புப் பக்கத்தில் ஓடும் செய்தி உரையை உள்ளிடவும்…"
              />
            )}
          </div>

          {/* Status */}
          <div>
            <LabelEl>Status</LabelEl>
            <div style={{ display: 'flex', gap: 8 }}>
              {['Active', 'Draft'].map(s => (
                <button key={s} onClick={() => set('status', s)}
                  style={{
                    flex: 1, padding: '10px 0', borderRadius: 10, cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif', fontSize: '0.82rem',
                    fontWeight: form.status === s ? 700 : 400,
                    border: `1.5px solid ${form.status === s
                      ? (s === 'Active' ? '#16a34a' : '#d97706')
                      : 'rgba(74,9,24,0.12)'}`,
                    background: form.status === s
                      ? (s === 'Active' ? 'rgba(22,101,52,0.1)' : 'rgba(180,83,9,0.1)')
                      : 'transparent',
                    color: form.status === s
                      ? (s === 'Active' ? '#166534' : '#92400e')
                      : 'rgba(74,9,24,0.42)',
                    transition: 'all 0.15s',
                  }}>
                  {s === 'Active' ? '● Active — shows on home' : '○ Draft — hidden'}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <p style={{ color: '#DC2626', fontSize: '0.78rem', margin: 0, fontFamily: 'Inter, sans-serif' }}>
              {error}
            </p>
          )}
        </div>

        {/* footer */}
        <div style={{
          padding: '0.9rem 1.5rem', borderTop: '1px solid rgba(74,9,24,0.07)',
          display: 'flex', justifyContent: 'flex-end', gap: 10, flexShrink: 0,
          background: 'rgba(252,251,250,0.6)',
        }}>
          <button onClick={onClose} style={cancelBtn}>Cancel</button>
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
            {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Add Item'}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   View Modal
   ════════════════════════════════════════════════════════════════════════════ */
function ViewNewsBarModal({ item, onClose, onEdit }) {
  useEffect(() => {
    const h = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose])

  const Row = ({ label, value }) => value ? (
    <div style={{ display: 'flex', gap: 12, padding: '9px 0', borderBottom: '1px solid rgba(74,9,24,0.05)' }}>
      <span style={{ fontSize: '0.72rem', color: 'rgba(74,9,24,0.42)', fontWeight: 600, minWidth: 130, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{label}</span>
      <span style={{ fontSize: '0.83rem', color: MAROON, fontWeight: 500, flex: 1, lineHeight: 1.6 }}>{value}</span>
    </div>
  ) : null

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={overlay}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.93, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.93, opacity: 0, y: 20 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: '#fff', borderRadius: 20, width: '100%', maxWidth: 500,
          maxHeight: '82vh', overflow: 'hidden',
          boxShadow: '0 30px 80px rgba(0,0,0,0.28)',
          display: 'flex', flexDirection: 'column',
        }}
      >
        <div style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid rgba(74,9,24,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', fontWeight: 800, color: MAROON, margin: 0 }}>
            News Bar Item
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(74,9,24,0.42)', display: 'flex', padding: 6, borderRadius: 8 }}>
            <FiX size={18} />
          </button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem' }}>
          <Row label="Description (EN)" value={item.descriptionEn} />
          <Row label="Description (SI)" value={item.descriptionSi} />
          <Row label="Description (TA)" value={item.descriptionTa} />
          <Row label="Status"           value={item.status} />
          <Row label="Added"            value={item.createdAt ? new Date(item.createdAt).toLocaleString() : ''} />
          <Row label="Updated"          value={item.updatedAt ? new Date(item.updatedAt).toLocaleString() : ''} />
        </div>
        <div style={{ padding: '0.9rem 1.5rem', borderTop: '1px solid rgba(74,9,24,0.07)', display: 'flex', justifyContent: 'flex-end', gap: 10, background: 'rgba(252,251,250,0.6)' }}>
          <button onClick={onClose} style={cancelBtn}>Close</button>
          <motion.button
            whileHover={{ y: -1.5 }} whileTap={{ scale: 0.97 }}
            onClick={() => onEdit(item)}
            style={{
              display: 'flex', alignItems: 'center', gap: 7,
              padding: '9px 22px', borderRadius: 10, border: 'none',
              background: `linear-gradient(135deg, ${MAROON} 0%, #6E1528 100%)`,
              color: '#fff', fontSize: '0.83rem', fontWeight: 700,
              cursor: 'pointer', fontFamily: 'Inter, sans-serif',
              boxShadow: '0 3px 12px rgba(74,9,24,0.28)',
            }}>
            <FiEdit2 size={14} /> Edit
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── widgets ──────────────────────────────────────────────────────────────── */
const inputStyle = {
  width: '100%', padding: '9px 12px', borderRadius: 10, boxSizing: 'border-box',
  border: '1px solid rgba(74,9,24,0.14)', outline: 'none',
  fontSize: '0.82rem', color: MAROON, fontFamily: 'Inter, sans-serif',
  background: '#fff',
}

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

function FieldTextarea({ label, value, onChange, placeholder }) {
  return (
    <div style={{ marginBottom: '0.75rem' }}>
      <LabelEl>{label}</LabelEl>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
      />
    </div>
  )
}


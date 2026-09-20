import React, { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiX, FiCheck, FiHelpCircle, FiRefreshCw } from 'react-icons/fi'
import { faqsApi } from './cmsContentApi'

const MAROON = '#4A0918'
const GOLD   = '#C79A2B'

const CATEGORIES = ['general', 'planning', 'downloads', 'reports', 'departments', 'tech']

const EMPTY_FORM = {
  category: 'general',
  question: { en: '', si: '', ta: '' },
  answer:   { en: '', si: '', ta: '' },
  featured: false,
  order: 0,
}

export default function CMSFaqs({ search = '', setSearch = () => {} }) {
  const [items,       setItems]       = useState([])
  const [loading,     setLoading]     = useState(true)
  const [formModal,   setFormModal]   = useState(false)
  const [editData,    setEditData]    = useState(null)
  const [deleteModal, setDeleteModal] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await faqsApi.list()
      setItems(res.data)
    } catch {
      toast.error('Failed to load FAQs.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const addItem = useCallback(async (form) => {
    try {
      await faqsApi.create(form)
      toast.success('FAQ added')
      setFormModal(false)
      load()
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to add FAQ.')
    }
  }, [load])

  const updateItem = useCallback(async (form) => {
    try {
      await faqsApi.update(editData.id, form)
      toast.success('FAQ updated')
      setEditData(null)
      load()
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to update FAQ.')
    }
  }, [editData, load])

  const confirmDelete = (id) => {
    const row = items.find(r => r.id === id)
    setDeleteModal({ id, question: row?.question?.en || 'this FAQ' })
  }

  const executeDelete = async () => {
    if (!deleteModal) return
    try {
      await faqsApi.remove(deleteModal.id)
      toast.success('FAQ deleted')
      setDeleteModal(null)
      load()
    } catch {
      toast.error('Failed to delete FAQ.')
    }
  }

  const q        = (search || '').toLowerCase()
  const filtered = items.filter(it => !q || (it.question?.en || '').toLowerCase().includes(q))

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.35rem', fontWeight: 800, color: MAROON, marginBottom: 4 }}>FAQs</h1>
          <p style={{ fontSize: '0.78rem', color: 'rgba(74,9,24,0.45)', margin: 0 }}>
            {items.length} question{items.length !== 1 ? 's' : ''} · featured items appear in the Home FAQ teaser
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: '1px solid rgba(74,9,24,0.12)', borderRadius: 10, padding: '7px 12px' }}>
            <FiSearch size={13} color="rgba(74,9,24,0.36)" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search FAQs…"
              style={{ border: 'none', outline: 'none', fontSize: '0.8rem', color: MAROON, background: 'transparent', width: 150, fontFamily: 'Inter, sans-serif' }} />
            {search && <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(74,9,24,0.38)', padding: 0, display: 'flex' }}><FiX size={13} /></button>}
          </div>
          <motion.button whileHover={{ y: -1.5, boxShadow: '0 8px 22px rgba(74,9,24,0.34)' }} whileTap={{ scale: 0.97 }} onClick={() => setFormModal(true)}
            style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 17px', borderRadius: 10, border: 'none', background: `linear-gradient(135deg, ${MAROON} 0%, #6E1528 100%)`, color: '#fff', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 3px 12px rgba(74,9,24,0.28)' }}>
            <FiPlus size={13} /> Add FAQ
          </motion.button>
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(74,9,24,0.07)', boxShadow: '0 2px 12px rgba(74,9,24,0.05)' }}>
        {loading ? (
          <div style={{ padding: '4rem', textAlign: 'center', color: 'rgba(74,9,24,0.4)' }}><FiRefreshCw size={22} style={{ animation: 'spin 0.9s linear infinite' }} /></div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: '4rem', textAlign: 'center' }}>
            <div style={{ width: 56, height: 56, borderRadius: 18, background: 'rgba(74,9,24,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <FiHelpCircle size={24} color="rgba(74,9,24,0.28)" />
            </div>
            <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'rgba(74,9,24,0.38)' }}>{search ? 'No FAQs match your search' : 'No FAQs yet'}</div>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 680 }}>
              <thead>
                <tr style={{ background: 'rgba(74,9,24,0.025)', borderBottom: '1px solid rgba(74,9,24,0.08)' }}>
                  {['Question', 'Category', 'Featured', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '11px 14px', textAlign: 'left', fontSize: '0.67rem', fontWeight: 700, color: 'rgba(74,9,24,0.42)', textTransform: 'uppercase', letterSpacing: '0.09em', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((item, i) => (
                  <motion.tr key={item.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                    style={{ borderBottom: i < filtered.length - 1 ? '1px solid rgba(74,9,24,0.05)' : 'none' }}>
                    <td style={{ padding: '11px 14px', fontSize: '0.82rem', fontWeight: 600, color: MAROON, maxWidth: 340, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.question?.en}</td>
                    <td style={{ padding: '11px 14px', fontSize: '0.75rem', color: 'rgba(74,9,24,0.55)' }}>{item.category}</td>
                    <td style={{ padding: '11px 14px' }}>{item.featured && <FiCheck size={13} color="#16a34a" />}</td>
                    <td style={{ padding: '11px 14px' }}>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button onClick={() => setEditData(item)} title="Edit" style={{ ...iconBtn, color: GOLD, border: `1px solid ${GOLD}38`, background: `${GOLD}0e` }}><FiEdit2 size={13} /></button>
                        <button onClick={() => confirmDelete(item.id)} title="Delete" style={{ ...iconBtn, color: '#DC2626', border: '1px solid rgba(220,38,38,0.22)', background: 'rgba(220,38,38,0.07)' }}><FiTrash2 size={13} /></button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {createPortal(<AnimatePresence>{formModal && <FaqFormModal onClose={() => setFormModal(false)} onSave={addItem} />}</AnimatePresence>, document.body)}
      {createPortal(<AnimatePresence>{editData && <FaqFormModal initialData={editData} onClose={() => setEditData(null)} onSave={updateItem} />}</AnimatePresence>, document.body)}
      {createPortal(
        <AnimatePresence>
          {deleteModal && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={overlayStyle}>
              <motion.div initial={{ scale: 0.93, opacity: 0, y: 16 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.93, opacity: 0, y: 16 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ background: '#fff', borderRadius: 18, padding: '1.75rem', maxWidth: 420, width: '100%', boxShadow: '0 24px 64px rgba(0,0,0,0.22)' }}>
                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                  <div style={{ width: 46, height: 46, borderRadius: 13, flexShrink: 0, background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FiTrash2 size={20} color="#DC2626" />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', fontWeight: 800, color: MAROON, marginBottom: '0.3rem' }}>Delete FAQ</h3>
                    <p style={{ fontSize: '0.83rem', color: 'rgba(74,9,24,0.55)', lineHeight: 1.65 }}>Delete <strong style={{ color: MAROON }}>&quot;{deleteModal.question}&quot;</strong>? This cannot be undone.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                  <button onClick={() => setDeleteModal(null)} style={cancelBtnStyle}>Cancel</button>
                  <motion.button whileHover={{ y: -1, boxShadow: '0 6px 20px rgba(220,38,38,0.35)' }} whileTap={{ scale: 0.97 }} onClick={executeDelete} style={deleteBtnStyle}>
                    <FiTrash2 size={13} /> Delete
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>, document.body
      )}
    </div>
  )
}

function FaqFormModal({ onClose, onSave, initialData = null }) {
  const isEdit = initialData !== null
  const [form,    setForm]    = useState(() => ({ ...EMPTY_FORM, ...(initialData || {}) }))
  const [langTab, setLangTab] = useState('en')
  const [error,   setError]   = useState('')
  const [saving,  setSaving]  = useState(false)

  const set     = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const setLang = (k, lang, v) => setForm(f => ({ ...f, [k]: { ...f[k], [lang]: v } }))

  useEffect(() => {
    const h = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose])

  const handleSave = () => {
    if (!form.question.en.trim()) { setError('English question is required.'); return }
    if (!form.answer.en.trim())   { setError('English answer is required.'); return }
    setSaving(true)
    setTimeout(() => { onSave(form); setSaving(false) }, 150)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={overlayStyle} onClick={e => e.target === e.currentTarget && onClose()}>
      <motion.div initial={{ scale: 0.93, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.93, opacity: 0, y: 20 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth: 560, maxHeight: '90vh', overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.28)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid rgba(74,9,24,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.15rem', fontWeight: 800, color: MAROON, margin: 0 }}>{isEdit ? 'Edit FAQ' : 'Add FAQ'}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(74,9,24,0.42)', display: 'flex', padding: 6, borderRadius: 8 }}><FiX size={18} /></button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <LabelEl>Category</LabelEl>
            <select value={form.category} onChange={e => set('category', e.target.value)} style={selectStyle}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div style={{ display: 'flex', gap: 4, background: 'rgba(74,9,24,0.05)', borderRadius: 10, padding: 4, width: 'fit-content' }}>
            {[['en', 'English'], ['si', 'සිංහල'], ['ta', 'தமிழ்']].map(([code, lbl]) => (
              <button key={code} onClick={() => setLangTab(code)}
                style={{ padding: '5px 14px', borderRadius: 7, border: 'none', cursor: 'pointer', background: langTab === code ? '#fff' : 'transparent', color: langTab === code ? MAROON : 'rgba(74,9,24,0.42)', fontWeight: langTab === code ? 700 : 400, fontSize: '0.76rem', fontFamily: 'Inter, sans-serif' }}>
                {lbl}
              </button>
            ))}
          </div>

          <FieldTextarea label={`Question (${langTab.toUpperCase()})${langTab === 'en' ? ' *' : ''}`} value={form.question[langTab]} onChange={v => setLang('question', langTab, v)} rows={2} />
          <FieldTextarea label={`Answer (${langTab.toUpperCase()})${langTab === 'en' ? ' *' : ''}`} value={form.answer[langTab]} onChange={v => setLang('answer', langTab, v)} rows={4} />

          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: '0.82rem', color: 'rgba(74,9,24,0.65)' }}>
            <input type="checkbox" checked={form.featured} onChange={e => set('featured', e.target.checked)} />
            Featured (shown in Home FAQ teaser)
          </label>

          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px', borderRadius: 9, background: 'rgba(220,38,38,0.07)', border: '1px solid rgba(220,38,38,0.18)' }}>
              <span style={{ fontSize: '0.78rem', color: '#dc2626' }}>{error}</span>
            </div>
          )}
        </div>

        <div style={{ padding: '0.9rem 1.5rem', borderTop: '1px solid rgba(74,9,24,0.07)', display: 'flex', justifyContent: 'flex-end', gap: 10, flexShrink: 0, background: 'rgba(252,251,250,0.6)' }}>
          <button onClick={onClose} style={cancelBtnStyle}>Cancel</button>
          <motion.button whileHover={!saving ? { y: -1.5, boxShadow: '0 8px 22px rgba(74,9,24,0.34)' } : {}} whileTap={!saving ? { scale: 0.97 } : {}} onClick={handleSave} disabled={saving}
            style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 22px', borderRadius: 10, border: 'none', background: `linear-gradient(135deg, ${MAROON} 0%, #6E1528 100%)`, color: '#fff', fontSize: '0.83rem', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'Inter, sans-serif', opacity: saving ? 0.7 : 1, boxShadow: '0 3px 12px rgba(74,9,24,0.28)' }}>
            <FiCheck size={14} />
            {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Add FAQ'}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

const iconBtn = { display: 'flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: 8, border: '1px solid rgba(74,9,24,0.13)', background: 'transparent', color: 'rgba(74,9,24,0.48)', cursor: 'pointer', transition: 'all 0.15s' }
const overlayStyle = { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.48)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }
const cancelBtnStyle = { padding: '9px 20px', borderRadius: 10, border: '1px solid rgba(74,9,24,0.14)', background: 'transparent', color: 'rgba(74,9,24,0.55)', fontSize: '0.83rem', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 500 }
const deleteBtnStyle = { padding: '9px 20px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg, #DC2626 0%, #b91c1c 100%)', color: '#fff', fontSize: '0.83rem', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 7, boxShadow: '0 3px 12px rgba(220,38,38,0.3)' }
const selectStyle = { width: '100%', padding: '9px 12px', border: '1.5px solid rgba(74,9,24,0.15)', borderRadius: 9, fontSize: '0.83rem', fontFamily: 'Inter, sans-serif', color: MAROON, background: '#fff', outline: 'none', cursor: 'pointer', appearance: 'none', boxSizing: 'border-box' }

function LabelEl({ children }) {
  return <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: 'rgba(74,9,24,0.55)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem', fontFamily: 'Inter, sans-serif' }}>{children}</label>
}

function FieldTextarea({ label, value, onChange, rows = 3 }) {
  return (
    <div>
      <LabelEl>{label}</LabelEl>
      <textarea value={value} onChange={e => onChange(e.target.value)} rows={rows}
        style={{ width: '100%', padding: '9px 12px', borderRadius: 10, boxSizing: 'border-box', border: '1px solid rgba(74,9,24,0.14)', outline: 'none', fontSize: '0.82rem', color: MAROON, fontFamily: 'Inter, sans-serif', background: '#fff', resize: 'vertical' }} />
    </div>
  )
}

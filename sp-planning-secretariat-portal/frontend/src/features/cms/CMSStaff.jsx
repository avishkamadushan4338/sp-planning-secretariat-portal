import React, { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import {
  FiPlus, FiEdit2, FiTrash2, FiSearch, FiX, FiCheck,
  FiUser, FiImage, FiRefreshCw,
} from 'react-icons/fi'
import { staffApi, departmentsApi } from './cmsContentApi'
import { uploadImage } from './cmsApi'
import { resolveUploadUrl } from '@/shared/utils/resolveUploadUrl'

const MAROON = '#4A0918'
const GOLD   = '#C79A2B'

const TIERS = [
  { value: 'deputy-secretary', label: 'Deputy Secretary' },
  { value: 'director',         label: 'Director' },
  { value: 'deputy-director',  label: 'Deputy Director' },
  { value: 'department-head',  label: 'Department Head' },
]

const EMPTY_FORM = {
  name:             { en: '', si: '', ta: '' },
  position:         { en: '', si: '', ta: '' },
  photo:            '',
  phone:            '',
  email:            '',
  office:           '',
  bio:              { en: '', si: '', ta: '' },
  experience:       { en: '', si: '', ta: '' },
  responsibilities: { en: [], si: [], ta: [] },
  departmentId:     null,
  tier:             'department-head',
  positionRank:     '',
  positionNumber:   '',
  featured:         false,
  showInDirectory:  true,
  order:            0,
  slug:             '',
}

export default function CMSStaff({ search = '', setSearch = () => {} }) {
  const [items,       setItems]       = useState([])
  const [departments, setDepartments] = useState([])
  const [loading,     setLoading]     = useState(true)
  const [formModal,   setFormModal]   = useState(false)
  const [editData,    setEditData]    = useState(null)
  const [deleteModal, setDeleteModal] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const [staffRes, deptRes] = await Promise.all([staffApi.list(), departmentsApi.list()])
      setItems(staffRes.data)
      setDepartments(deptRes.data)
    } catch {
      toast.error('Failed to load staff directory.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const addItem = useCallback(async (form) => {
    try {
      await staffApi.create(form)
      toast.success('Staff member added')
      setFormModal(false)
      load()
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to add staff member.')
    }
  }, [load])

  const updateItem = useCallback(async (form) => {
    try {
      await staffApi.update(editData.id, form)
      toast.success('Staff member updated')
      setEditData(null)
      load()
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to update staff member.')
    }
  }, [editData, load])

  const confirmDelete = (id) => {
    const row = items.find(r => r.id === id)
    setDeleteModal({ id, name: row?.name?.en || 'this staff member' })
  }

  const executeDelete = async () => {
    if (!deleteModal) return
    try {
      await staffApi.remove(deleteModal.id)
      toast.success('Staff member deleted')
      setDeleteModal(null)
      load()
    } catch {
      toast.error('Failed to delete staff member.')
    }
  }

  const q        = (search || '').toLowerCase()
  const filtered = items.filter(it =>
    !q ||
    (it.name?.en || '').toLowerCase().includes(q) ||
    (it.position?.en || '').toLowerCase().includes(q)
  )

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.35rem', fontWeight: 800, color: MAROON, marginBottom: 4 }}>
            Staff Directory
          </h1>
          <p style={{ fontSize: '0.78rem', color: 'rgba(74,9,24,0.45)', margin: 0 }}>
            {items.length} staff member{items.length !== 1 ? 's' : ''} · single source of truth for Navbar, Home, About & Contact
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: '1px solid rgba(74,9,24,0.12)', borderRadius: 10, padding: '7px 12px' }}>
            <FiSearch size={13} color="rgba(74,9,24,0.36)" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search staff…"
              style={{ border: 'none', outline: 'none', fontSize: '0.8rem', color: MAROON, background: 'transparent', width: 150, fontFamily: 'Inter, sans-serif' }}
            />
            {search && (
              <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(74,9,24,0.38)', padding: 0, display: 'flex' }}>
                <FiX size={13} />
              </button>
            )}
          </div>

          <motion.button
            whileHover={{ y: -1.5, boxShadow: '0 8px 22px rgba(74,9,24,0.34)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setFormModal(true)}
            style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 17px', borderRadius: 10, border: 'none', background: `linear-gradient(135deg, ${MAROON} 0%, #6E1528 100%)`, color: '#fff', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 3px 12px rgba(74,9,24,0.28)' }}>
            <FiPlus size={13} /> Add Staff Member
          </motion.button>
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(74,9,24,0.07)', boxShadow: '0 2px 12px rgba(74,9,24,0.05)' }}>
        {loading ? (
          <div style={{ padding: '4rem', textAlign: 'center', color: 'rgba(74,9,24,0.4)' }}>
            <FiRefreshCw size={22} style={{ animation: 'spin 0.9s linear infinite' }} />
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: '4rem', textAlign: 'center' }}>
            <div style={{ width: 56, height: 56, borderRadius: 18, background: 'rgba(74,9,24,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <FiUser size={24} color="rgba(74,9,24,0.28)" />
            </div>
            <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'rgba(74,9,24,0.38)' }}>
              {search ? 'No staff match your search' : 'No staff members yet'}
            </div>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 720 }}>
              <thead>
                <tr style={{ background: 'rgba(74,9,24,0.025)', borderBottom: '1px solid rgba(74,9,24,0.08)' }}>
                  {['', 'Name', 'Position', 'Tier', 'Featured', 'Directory', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '11px 14px', textAlign: 'left', fontSize: '0.67rem', fontWeight: 700, color: 'rgba(74,9,24,0.42)', textTransform: 'uppercase', letterSpacing: '0.09em', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((item, i) => (
                  <motion.tr key={item.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                    style={{ borderBottom: i < filtered.length - 1 ? '1px solid rgba(74,9,24,0.05)' : 'none' }}>
                    <td style={{ padding: '9px 14px' }}>
                      {item.photo ? (
                        <img src={resolveUploadUrl(item.photo)} alt="" style={{ width: 34, height: 34, borderRadius: '50%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(74,9,24,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <FiUser size={14} color="rgba(74,9,24,0.35)" />
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '11px 14px', fontSize: '0.83rem', fontWeight: 600, color: MAROON }}>{item.name?.en}</td>
                    <td style={{ padding: '11px 14px', fontSize: '0.78rem', color: 'rgba(74,9,24,0.6)' }}>{item.position?.en}</td>
                    <td style={{ padding: '11px 14px', fontSize: '0.72rem', color: 'rgba(74,9,24,0.5)' }}>{TIERS.find(t => t.value === item.tier)?.label || item.tier}</td>
                    <td style={{ padding: '11px 14px' }}>{item.featured && <FiCheck size={13} color="#16a34a" />}</td>
                    <td style={{ padding: '11px 14px' }}>{item.showInDirectory && <FiCheck size={13} color="#16a34a" />}</td>
                    <td style={{ padding: '11px 14px' }}>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button onClick={() => setEditData(item)} title="Edit" style={{ ...iconBtn, color: GOLD, border: `1px solid ${GOLD}38`, background: `${GOLD}0e` }}>
                          <FiEdit2 size={13} />
                        </button>
                        <button onClick={() => confirmDelete(item.id)} title="Delete" style={{ ...iconBtn, color: '#DC2626', border: '1px solid rgba(220,38,38,0.22)', background: 'rgba(220,38,38,0.07)' }}>
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

      {createPortal(
        <AnimatePresence>
          {formModal && <StaffFormModal departments={departments} onClose={() => setFormModal(false)} onSave={addItem} />}
        </AnimatePresence>, document.body
      )}
      {createPortal(
        <AnimatePresence>
          {editData && <StaffFormModal departments={departments} initialData={editData} onClose={() => setEditData(null)} onSave={updateItem} />}
        </AnimatePresence>, document.body
      )}
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
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', fontWeight: 800, color: MAROON, marginBottom: '0.3rem' }}>Delete Staff Member</h3>
                    <p style={{ fontSize: '0.83rem', color: 'rgba(74,9,24,0.55)', lineHeight: 1.65 }}>
                      Delete <strong style={{ color: MAROON }}>&quot;{deleteModal.name}&quot;</strong>? This cannot be undone and will remove them from all pages referencing this record.
                    </p>
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

function StaffFormModal({ departments, onClose, onSave, initialData = null }) {
  const isEdit = initialData !== null
  const [form,      setForm]      = useState(() => ({
    ...EMPTY_FORM,
    ...(initialData || {}),
    responsibilities: {
      en: (initialData?.responsibilities?.en || []).map(r => typeof r === 'string' ? r : r.text).join('\n'),
      si: (initialData?.responsibilities?.si || []).map(r => typeof r === 'string' ? r : r.text).join('\n'),
      ta: (initialData?.responsibilities?.ta || []).map(r => typeof r === 'string' ? r : r.text).join('\n'),
    },
  }))
  const [langTab,   setLangTab]   = useState('en')
  const [error,     setError]     = useState('')
  const [saving,    setSaving]    = useState(false)
  const [uploading, setUploading] = useState(false)

  const set     = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const setLang = (k, lang, v) => setForm(f => ({ ...f, [k]: { ...f[k], [lang]: v } }))

  useEffect(() => {
    const h = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose])

  const handlePhoto = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file || !file.type.startsWith('image/')) return
    setUploading(true)
    try {
      const res = await uploadImage(file)
      set('photo', res.data.url)
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to upload photo.')
    } finally {
      setUploading(false)
    }
  }

  const handleSave = () => {
    if (!form.name.en.trim())     { setError('English name is required.'); return }
    if (!form.position.en.trim()) { setError('English position is required.'); return }
    if (uploading) { setError('Please wait for the photo to finish uploading.'); return }
    setSaving(true)
    const payload = {
      ...form,
      responsibilities: {
        en: form.responsibilities.en.split('\n').map(s => s.trim()).filter(Boolean),
        si: form.responsibilities.si.split('\n').map(s => s.trim()).filter(Boolean),
        ta: form.responsibilities.ta.split('\n').map(s => s.trim()).filter(Boolean),
      },
    }
    setTimeout(() => { onSave(payload); setSaving(false) }, 150)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={overlayStyle} onClick={e => e.target === e.currentTarget && onClose()}>
      <motion.div initial={{ scale: 0.93, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.93, opacity: 0, y: 20 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth: 620, maxHeight: '90vh', overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.28)', display: 'flex', flexDirection: 'column' }}>

        <div style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid rgba(74,9,24,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.15rem', fontWeight: 800, color: MAROON, margin: 0 }}>
            {isEdit ? 'Edit Staff Member' : 'Add Staff Member'}
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(74,9,24,0.42)', display: 'flex', padding: 6, borderRadius: 8 }}>
            <FiX size={18} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>

          {/* Photo */}
          <div>
            <LabelEl>Photo</LabelEl>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {uploading ? (
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(74,9,24,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FiRefreshCw size={18} color={GOLD} style={{ animation: 'spin 0.9s linear infinite' }} />
                </div>
              ) : form.photo ? (
                <img src={resolveUploadUrl(form.photo)} alt="" style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(74,9,24,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FiUser size={24} color="rgba(74,9,24,0.28)" />
                </div>
              )}
              <label style={{ padding: '7px 14px', borderRadius: 9, border: '1px solid rgba(74,9,24,0.14)', fontSize: '0.78rem', fontWeight: 600, color: MAROON, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                <FiImage size={12} /> {form.photo ? 'Change' : 'Upload'} Photo
                <input type="file" accept="image/*" onChange={handlePhoto} style={{ display: 'none' }} />
              </label>
            </div>
          </div>

          {/* Language tabs */}
          <div style={{ display: 'flex', gap: 4, background: 'rgba(74,9,24,0.05)', borderRadius: 10, padding: 4, width: 'fit-content' }}>
            {[['en', 'English'], ['si', 'සිංහල'], ['ta', 'தமிழ்']].map(([code, lbl]) => (
              <button key={code} onClick={() => setLangTab(code)}
                style={{ padding: '5px 14px', borderRadius: 7, border: 'none', cursor: 'pointer', background: langTab === code ? '#fff' : 'transparent', color: langTab === code ? MAROON : 'rgba(74,9,24,0.42)', fontWeight: langTab === code ? 700 : 400, fontSize: '0.76rem', fontFamily: 'Inter, sans-serif' }}>
                {lbl}
              </button>
            ))}
          </div>

          <FieldInput label={`Name (${langTab.toUpperCase()})${langTab === 'en' ? ' *' : ''}`} value={form.name[langTab]} onChange={v => setLang('name', langTab, v)} placeholder="e.g. Mr. M.K.G.S.P.K. Jayasekara" />
          <FieldInput label={`Position (${langTab.toUpperCase()})${langTab === 'en' ? ' *' : ''}`} value={form.position[langTab]} onChange={v => setLang('position', langTab, v)} placeholder="e.g. Deputy Chief Secretary – Planning" />
          <FieldTextarea label={`Bio (${langTab.toUpperCase()})`} value={form.bio[langTab]} onChange={v => setLang('bio', langTab, v)} rows={3} />
          <FieldTextarea label={`Responsibilities (${langTab.toUpperCase()}) — one per line`} value={form.responsibilities[langTab]} onChange={v => setLang('responsibilities', langTab, v)} rows={4} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <FieldInput label="Phone" value={form.phone} onChange={v => set('phone', v)} />
            <FieldInput label="Email" value={form.email} onChange={v => set('email', v)} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div>
              <LabelEl>Tier</LabelEl>
              <select value={form.tier} onChange={e => set('tier', e.target.value)} style={selectStyle}>
                {TIERS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
            <div>
              <LabelEl>Department</LabelEl>
              <select value={form.departmentId || ''} onChange={e => set('departmentId', e.target.value || null)} style={selectStyle}>
                <option value="">— None —</option>
                {departments.map(d => <option key={d.id} value={d.id}>{d.label?.en}</option>)}
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 20 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: '0.82rem', color: 'rgba(74,9,24,0.65)' }}>
              <input type="checkbox" checked={form.featured} onChange={e => set('featured', e.target.checked)} />
              Featured (Navbar / Home widgets)
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: '0.82rem', color: 'rgba(74,9,24,0.65)' }}>
              <input type="checkbox" checked={form.showInDirectory} onChange={e => set('showInDirectory', e.target.checked)} />
              Show in Contact Directory
            </label>
          </div>

          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px', borderRadius: 9, background: 'rgba(220,38,38,0.07)', border: '1px solid rgba(220,38,38,0.18)' }}>
              <span style={{ fontSize: '0.78rem', color: '#dc2626' }}>{error}</span>
            </div>
          )}
        </div>

        <div style={{ padding: '0.9rem 1.5rem', borderTop: '1px solid rgba(74,9,24,0.07)', display: 'flex', justifyContent: 'flex-end', gap: 10, flexShrink: 0, background: 'rgba(252,251,250,0.6)' }}>
          <button onClick={onClose} style={cancelBtnStyle}>Cancel</button>
          <motion.button whileHover={!saving && !uploading ? { y: -1.5, boxShadow: '0 8px 22px rgba(74,9,24,0.34)' } : {}} whileTap={!saving && !uploading ? { scale: 0.97 } : {}}
            onClick={handleSave} disabled={saving || uploading}
            style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 22px', borderRadius: 10, border: 'none', background: `linear-gradient(135deg, ${MAROON} 0%, #6E1528 100%)`, color: '#fff', fontSize: '0.83rem', fontWeight: 700, cursor: (saving || uploading) ? 'not-allowed' : 'pointer', fontFamily: 'Inter, sans-serif', opacity: (saving || uploading) ? 0.7 : 1, boxShadow: '0 3px 12px rgba(74,9,24,0.28)' }}>
            <FiCheck size={14} />
            {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Add Staff Member'}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

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
const selectStyle = {
  width: '100%', padding: '9px 12px',
  border: '1.5px solid rgba(74,9,24,0.15)', borderRadius: 9,
  fontSize: '0.83rem', fontFamily: 'Inter, sans-serif',
  color: MAROON, background: '#fff', outline: 'none',
  cursor: 'pointer', appearance: 'none', boxSizing: 'border-box',
}

function LabelEl({ children }) {
  return (
    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: 'rgba(74,9,24,0.55)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem', fontFamily: 'Inter, sans-serif' }}>
      {children}
    </label>
  )
}

function FieldInput({ label, value, onChange, placeholder }) {
  return (
    <div>
      <LabelEl>{label}</LabelEl>
      <input
        type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{ width: '100%', padding: '9px 12px', borderRadius: 10, boxSizing: 'border-box', border: '1px solid rgba(74,9,24,0.14)', outline: 'none', fontSize: '0.82rem', color: MAROON, fontFamily: 'Inter, sans-serif', background: '#fff' }}
      />
    </div>
  )
}

function FieldTextarea({ label, value, onChange, rows = 3 }) {
  return (
    <div>
      <LabelEl>{label}</LabelEl>
      <textarea
        value={value} onChange={e => onChange(e.target.value)} rows={rows}
        style={{ width: '100%', padding: '9px 12px', borderRadius: 10, boxSizing: 'border-box', border: '1px solid rgba(74,9,24,0.14)', outline: 'none', fontSize: '0.82rem', color: MAROON, fontFamily: 'Inter, sans-serif', background: '#fff', resize: 'vertical' }}
      />
    </div>
  )
}

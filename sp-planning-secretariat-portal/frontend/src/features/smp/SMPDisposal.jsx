import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiTrash2, FiPlus, FiX, FiRefreshCw, FiAlertTriangle,
  FiCheckCircle, FiSearch, FiHash,
} from 'react-icons/fi'
import { createDisposal, getDisposals, approveDisposal, updateDisposalStatus, getItems, getUniqueIds } from './smpApi'
import { useSMP } from './SMPContext'

const MAROON = '#4A0918'
const GOLD   = '#C79A2B'

const STATUS_CFG = {
  pending_approval: { label: 'Pending Approval', color: '#F59E0B', bg: 'rgba(245,158,11,0.1)' },
  approved:         { label: 'Approved',          color: '#3B82F6', bg: 'rgba(59,130,246,0.1)' },
  disposed:         { label: 'Disposed',           color: '#6B7280', bg: 'rgba(107,114,128,0.1)' },
  recycled:         { label: 'Recycled',           color: '#10B981', bg: 'rgba(16,185,129,0.1)' },
  auctioned:        { label: 'Auctioned',          color: '#6366F1', bg: 'rgba(99,102,241,0.1)' },
  written_off:      { label: 'Written Off',        color: '#EF4444', bg: 'rgba(239,68,68,0.1)' },
}

const DISPOSAL_METHODS = ['Disposal', 'Recycling', 'Auction', 'Write-Off', 'Donation', 'Return to Supplier']
const DISPOSAL_REASONS = [
  'Broken / Non-functional', 'Damaged beyond repair', 'Expired / Outdated',
  'Obsolete equipment', 'End of useful life', 'Surplus stock', 'Other',
]

const BLANK_FORM = {
  itemId: '', uniqueItemIds: [], qty: '',
  disposalReason: '', disposalMethod: '',
  institute: '', authorizedBy: '',
  disposalNotes: '', estimatedDisposalValue: '',
}

function Modal({ title, onClose, children, wide }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, background: 'rgba(30,5,12,0.55)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '1rem' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <motion.div initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }} exit={{ opacity: 0, y: 16 }}
        style={{ background: '#fff', borderRadius: 16, boxShadow: '0 24px 64px rgba(0,0,0,0.22)', width: '100%', maxWidth: wide ? 680 : 460, overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.5rem', borderBottom: '1px solid rgba(74,9,24,0.1)', background: 'rgba(74,9,24,0.02)' }}>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1rem', fontWeight: 700, color: MAROON }}>{title}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(74,9,24,0.4)', display: 'flex', padding: 4, borderRadius: 6 }}><FiX size={17} /></button>
        </div>
        <div style={{ padding: '1.25rem 1.5rem 1.5rem', maxHeight: '82vh', overflowY: 'auto' }}>{children}</div>
      </motion.div>
    </motion.div>
  )
}

const FF = ({ label, value, onChange, placeholder, type = 'text', required, children }) => {
  const [f, setF] = useState(false)
  return (
    <div style={{ marginBottom: '0.8rem' }}>
      <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: 600, color: MAROON, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
        {label}{required && <span style={{ color: '#DC2626' }}> *</span>}
      </label>
      {children || (
        <input type={type} value={value} onChange={e => onChange(e.target.value)}
          onFocus={() => setF(true)} onBlur={() => setF(false)} placeholder={placeholder}
          style={{ width: '100%', border: `1.5px solid ${f ? GOLD : 'rgba(74,9,24,0.18)'}`, borderRadius: 8, outline: 'none', padding: '8px 11px', fontSize: '0.84rem', color: MAROON, background: f ? 'rgba(199,154,43,0.02)' : '#fff', fontFamily: 'Inter,sans-serif', boxShadow: f ? `0 0 0 3px rgba(199,154,43,0.1)` : 'none', transition: 'all 0.18s' }} />
      )}
    </div>
  )
}

function UniqueIdSelector({ itemId, qty, selected, onChange }) {
  const [ids, setIds]      = useState([])
  const [loading, setLoad] = useState(false)

  useEffect(() => {
    if (!itemId) { setIds([]); return }
    setLoad(true)
    getUniqueIds(itemId)
      .then(r => setIds(r.data.filter(u => u.status === 'available')))
      .catch(() => {})
      .finally(() => setLoad(false))
  }, [itemId])

  const toggle = id => {
    if (selected.includes(id)) onChange(selected.filter(x => x !== id))
    else if (selected.length < Number(qty)) onChange([...selected, id])
  }

  if (!itemId || ids.length === 0) return null
  return (
    <FF label="Select Specific Units (optional)">
      {loading
        ? <p style={{ fontSize: '0.75rem', color: 'rgba(74,9,24,0.4)' }}>Loading…</p>
        : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, maxHeight: 110, overflowY: 'auto', border: '1.5px solid rgba(74,9,24,0.12)', borderRadius: 8, padding: '8px 10px', background: '#FAFAFA' }}>
            {ids.map(uid => {
              const isSel = selected.includes(uid.id)
              return (
                <button key={uid.id} type="button" onClick={() => toggle(uid.id)}
                  style={{ fontSize: '0.67rem', fontWeight: 700, fontFamily: 'monospace', padding: '3px 8px', borderRadius: 5, cursor: 'pointer', background: isSel ? '#DC2626' : 'rgba(74,9,24,0.06)', color: isSel ? '#fff' : MAROON, border: `1px solid ${isSel ? '#DC2626' : 'rgba(74,9,24,0.15)'}`, transition: 'all 0.15s' }}>
                  {uid.uniqueNo}
                </button>
              )
            })}
          </div>
        )}
      {selected.length > 0 && <p style={{ fontSize: '0.68rem', color: '#DC2626', marginTop: 5, fontWeight: 600 }}>{selected.length} unit{selected.length > 1 ? 's' : ''} selected for disposal</p>}
    </FF>
  )
}

export default function SMPDisposal() {
  const { isStorekeeper, isAdmin } = useSMP()
  const [rows,    setRows]    = useState([])
  const [items,   setItems]   = useState([])
  const [loading, setLoad]    = useState(true)
  const [statusF, setStatusF] = useState('pending_approval')
  const [search,  setSearch]  = useState('')
  const [modal,   setModal]   = useState(null)
  const [target,  setTarget]  = useState(null)
  const [form,    setForm]    = useState(BLANK_FORM)
  const [saving,  setSaving]  = useState(false)
  const [err,     setErr]     = useState('')
  const [toast,   setToast]   = useState(null)
  const [newStatus, setNewStatus] = useState('')

  const showToast = (msg, type = 'success') => { setToast({ msg, type }); setTimeout(() => setToast(null), 3200) }

  const load = useCallback(async () => {
    setLoad(true)
    try {
      const [{ data: ds }, { data: its }] = await Promise.all([getDisposals(), getItems()])
      setRows(ds); setItems(its)
    } finally { setLoad(false) }
  }, [])
  useEffect(() => { load() }, [load])

  const visible = rows
    .filter(r => statusF === 'all' || r.status === statusF)
    .filter(r => {
      if (!search) return true
      const q = search.toLowerCase()
      return r.itemName?.toLowerCase().includes(q) ||
             r.institute?.toLowerCase().includes(q) ||
             r.disposedBy?.toLowerCase().includes(q)
    })

  const handleCreate = async e => {
    e.preventDefault()
    if (!form.itemId)            return setErr('Select an item')
    if (!form.qty || Number(form.qty) <= 0) return setErr('Quantity must be > 0')
    if (!form.disposalReason)    return setErr('Disposal reason required')
    if (!form.disposalMethod)    return setErr('Disposal method required')
    setErr(''); setSaving(true)
    try {
      await createDisposal({ ...form, qty: Number(form.qty) })
      showToast('Disposal record created — awaiting approval')
      setModal(null); setForm(BLANK_FORM); load()
    } catch (e) { setErr(e.response?.data?.error || 'Error creating disposal record') }
    finally { setSaving(false) }
  }

  const handleApprove = async id => {
    setSaving(true)
    try { await approveDisposal(id); showToast('Disposal approved'); load() }
    catch (e) { showToast(e.response?.data?.error || 'Error', 'error') }
    finally { setSaving(false) }
  }

  const handleUpdateStatus = async () => {
    if (!newStatus) return
    setSaving(true)
    try { await updateDisposalStatus(target.id, { status: newStatus }); showToast('Status updated'); setModal(null); load() }
    catch (e) { showToast(e.response?.data?.error || 'Error', 'error') }
    finally { setSaving(false) }
  }

  const selectedItem = items.find(i => i.id === form.itemId)
  const fmtDate = d => d ? new Date(d).toLocaleDateString('en-LK', { dateStyle: 'medium' }) : '—'
  const fmtVal  = v => v ? `Rs. ${Number(v).toLocaleString('en-LK')}` : '—'

  const FILTER_TABS = [
    { key: 'pending_approval', label: 'Pending' },
    { key: 'approved',         label: 'Approved' },
    { key: 'disposed',         label: 'Disposed' },
    { key: 'recycled',         label: 'Recycled' },
    { key: 'auctioned',        label: 'Auctioned' },
    { key: 'written_off',      label: 'Written Off' },
    { key: 'all',              label: 'All' },
  ]

  return (
    <div>
      {/* Info banner */}
      <div style={{ background: 'rgba(220,38,38,0.04)', border: '1px solid rgba(220,38,38,0.15)', borderRadius: 10, padding: '10px 14px', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
        <FiAlertTriangle size={14} color="#DC2626" style={{ flexShrink: 0 }} />
        <p style={{ fontSize: '0.78rem', color: 'rgba(74,9,24,0.6)' }}>
          Disposal records permanently reduce inventory. Admin approval required before items are finalized as disposed.
        </p>
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: '1rem', alignItems: 'center' }}>
        <div style={{ flex: '1 1 180px', position: 'relative', border: '1.5px solid rgba(74,9,24,0.15)', borderRadius: 8, background: '#FCFBFA', display: 'flex', alignItems: 'center' }}>
          <FiSearch size={13} style={{ position: 'absolute', left: 10, color: 'rgba(74,9,24,0.4)' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search item, institute…"
            style={{ border: 'none', outline: 'none', background: 'transparent', padding: '8px 8px 8px 30px', width: '100%', fontSize: '0.82rem', color: MAROON, fontFamily: 'Inter,sans-serif' }} />
          {search && <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 8px', color: 'rgba(74,9,24,0.4)', display: 'flex' }}><FiX size={12} /></button>}
        </div>

        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
          {FILTER_TABS.map(t => (
            <button key={t.key} onClick={() => setStatusF(t.key)}
              style={{ fontSize: '0.7rem', fontWeight: statusF === t.key ? 700 : 500, padding: '5px 12px', borderRadius: 100, cursor: 'pointer', border: `1.5px solid ${statusF === t.key ? GOLD : 'rgba(74,9,24,0.15)'}`, background: statusF === t.key ? GOLD : 'transparent', color: statusF === t.key ? '#fff' : 'rgba(74,9,24,0.6)', transition: 'all 0.15s', fontFamily: 'Inter,sans-serif', whiteSpace: 'nowrap' }}>
              {t.label} ({rows.filter(r => t.key === 'all' ? true : r.status === t.key).length})
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
          <button onClick={load} style={ghostBtn}><FiRefreshCw size={13} /></button>
          {isStorekeeper && (
            <button onClick={() => { setForm(BLANK_FORM); setErr(''); setModal('create') }} style={primaryBtn}>
              <FiPlus size={13} /> Record Disposal
            </button>
          )}
        </div>
      </div>

      {/* Records */}
      {loading
        ? <div style={{ textAlign: 'center', padding: '3rem', color: 'rgba(74,9,24,0.35)' }}>Loading…</div>
        : visible.length === 0
          ? (
            <div style={{ textAlign: 'center', padding: '3rem', background: '#fff', borderRadius: 12, border: '1px solid rgba(74,9,24,0.08)', color: 'rgba(74,9,24,0.35)', fontSize: '0.85rem' }}>
              <FiTrash2 size={28} style={{ display: 'block', margin: '0 auto 0.75rem', opacity: 0.25 }} />
              No disposal records found
            </div>
          )
          : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {visible.map(r => {
                const sc = STATUS_CFG[r.status] || STATUS_CFG.pending_approval
                return (
                  <motion.div key={r.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    style={{ background: '#fff', borderRadius: 12, border: '1px solid rgba(74,9,24,0.09)', boxShadow: '0 2px 8px rgba(74,9,24,0.05)', overflow: 'hidden' }}>
                    {/* Header */}
                    <div style={{ padding: '11px 16px', borderBottom: '1px solid rgba(74,9,24,0.07)', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                      <div style={{ width: 34, height: 34, borderRadius: 9, background: `${sc.color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <FiTrash2 size={15} color={sc.color} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontWeight: 700, color: MAROON, fontSize: '0.88rem' }}>{r.itemName}</p>
                        <p style={{ fontSize: '0.68rem', color: 'rgba(74,9,24,0.45)' }}>{r.sku} · {r.qty} units · {r.category}</p>
                      </div>
                      <span style={{ fontSize: '0.64rem', fontWeight: 700, padding: '2px 8px', borderRadius: 100, background: sc.bg, color: sc.color, flexShrink: 0 }}>{sc.label}</span>
                    </div>

                    {/* Body */}
                    <div style={{ padding: '11px 16px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 10, marginBottom: 10 }}>
                        {[
                          ['Disposal Reason',  r.disposalReason],
                          ['Method',           r.disposalMethod],
                          ['Disposed By',      r.disposedBy],
                          ['Date',             fmtDate(r.disposalDate)],
                          ['Authorized By',    r.authorizedBy || '—'],
                          ['Est. Value',       fmtVal(r.estimatedDisposalValue)],
                          ...(r.institute ? [['Institute / Dept', r.institute]] : []),
                          ...(r.approvedBy ? [['Approved By', r.approvedBy]] : []),
                        ].map(([k, v]) => (
                          <div key={k}>
                            <p style={{ fontSize: '0.61rem', fontWeight: 600, color: 'rgba(74,9,24,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>{k}</p>
                            <p style={{ fontSize: '0.78rem', fontWeight: 600, color: MAROON }}>{v}</p>
                          </div>
                        ))}
                      </div>

                      {r.uniqueItemIds && r.uniqueItemIds.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 10 }}>
                          <span style={{ fontSize: '0.63rem', fontWeight: 600, color: 'rgba(74,9,24,0.4)', display: 'flex', alignItems: 'center', gap: 4 }}>
                            <FiHash size={10} /> Units:
                          </span>
                          {r.uniqueItemIds.map(no => (
                            <span key={no} style={{ fontSize: '0.65rem', fontWeight: 700, fontFamily: 'monospace', padding: '2px 6px', borderRadius: 4, background: 'rgba(220,38,38,0.08)', color: '#B91C1C', border: '1px solid rgba(220,38,38,0.15)' }}>{no}</span>
                          ))}
                        </div>
                      )}

                      {r.disposalNotes && (
                        <p style={{ fontSize: '0.75rem', color: 'rgba(74,9,24,0.5)', background: 'rgba(74,9,24,0.03)', borderRadius: 7, padding: '6px 10px', marginBottom: 10 }}>{r.disposalNotes}</p>
                      )}

                      {/* Actions */}
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {isAdmin && r.status === 'pending_approval' && (
                          <button onClick={() => handleApprove(r.id)} disabled={saving}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 12px', borderRadius: 7, border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg,#1D4ED8 0%,#3B82F6 100%)', color: '#fff', fontSize: '0.74rem', fontWeight: 600, fontFamily: 'Inter,sans-serif', boxShadow: '0 3px 10px rgba(59,130,246,0.3)' }}>
                            <FiCheckCircle size={12} /> Approve
                          </button>
                        )}
                        {isAdmin && !['disposed','recycled','auctioned','written_off'].includes(r.status) && (
                          <button onClick={() => { setTarget(r); setNewStatus(''); setModal('status') }}
                            style={ghostBtn}>Update Status</button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}

      {/* Create Modal */}
      <AnimatePresence>
        {modal === 'create' && (
          <Modal title="Record Disposal" onClose={() => setModal(null)} wide>
            {err && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'rgba(220,38,38,0.07)', border: '1px solid rgba(220,38,38,0.2)', borderRadius: 8, padding: '8px 12px', marginBottom: '1rem' }}>
                <FiAlertTriangle size={13} color="#DC2626" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.78rem', color: '#DC2626' }}>{err}</span>
              </div>
            )}
            <form onSubmit={handleCreate}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }}>
                <div style={{ gridColumn: 'span 2' }}>
                  <FF label="Item *" required>
                    <select value={form.itemId} onChange={e => setForm(f => ({ ...f, itemId: e.target.value, uniqueItemIds: [] }))}
                      style={{ width: '100%', border: '1.5px solid rgba(74,9,24,0.18)', borderRadius: 8, outline: 'none', padding: '8px 11px', fontSize: '0.84rem', color: MAROON, background: '#fff', fontFamily: 'Inter,sans-serif', cursor: 'pointer' }}>
                      <option value="">— Select item —</option>
                      {items.map(i => <option key={i.id} value={i.id}>{i.name} ({i.sku}) — {i.qty} in stock</option>)}
                    </select>
                  </FF>
                </div>

                <FF label="Quantity to Dispose *" value={form.qty} onChange={v => setForm(f => ({ ...f, qty: v, uniqueItemIds: [] }))} placeholder="0" type="number" required />
                <FF label="Estimated Disposal Value (Rs.)" value={form.estimatedDisposalValue} onChange={v => setForm(f => ({ ...f, estimatedDisposalValue: v }))} placeholder="0" type="number" />

                {form.itemId && form.qty && Number(form.qty) > 0 && (
                  <div style={{ gridColumn: 'span 2' }}>
                    <UniqueIdSelector itemId={form.itemId} qty={form.qty} selected={form.uniqueItemIds} onChange={ids => setForm(f => ({ ...f, uniqueItemIds: ids }))} />
                  </div>
                )}

                {selectedItem && (
                  <div style={{ gridColumn: 'span 2', background: 'rgba(220,38,38,0.04)', borderRadius: 8, padding: '7px 12px', marginBottom: '0.5rem' }}>
                    <p style={{ fontSize: '0.72rem', color: 'rgba(74,9,24,0.5)' }}>
                      Current stock: <strong style={{ color: MAROON }}>{selectedItem.qty} {selectedItem.unit}</strong>
                      {Number(form.qty) > selectedItem.qty && <span style={{ color: '#DC2626', fontWeight: 700 }}> — Cannot exceed available stock!</span>}
                    </p>
                  </div>
                )}

                <FF label="Disposal Reason *" required>
                  <select value={form.disposalReason} onChange={e => setForm(f => ({ ...f, disposalReason: e.target.value }))}
                    style={{ width: '100%', border: '1.5px solid rgba(74,9,24,0.18)', borderRadius: 8, outline: 'none', padding: '8px 11px', fontSize: '0.84rem', color: MAROON, background: '#fff', fontFamily: 'Inter,sans-serif', cursor: 'pointer' }}>
                    <option value="">— Select reason —</option>
                    {DISPOSAL_REASONS.map(r => <option key={r}>{r}</option>)}
                  </select>
                </FF>

                <FF label="Disposal Method *" required>
                  <select value={form.disposalMethod} onChange={e => setForm(f => ({ ...f, disposalMethod: e.target.value }))}
                    style={{ width: '100%', border: '1.5px solid rgba(74,9,24,0.18)', borderRadius: 8, outline: 'none', padding: '8px 11px', fontSize: '0.84rem', color: MAROON, background: '#fff', fontFamily: 'Inter,sans-serif', cursor: 'pointer' }}>
                    <option value="">— Select method —</option>
                    {DISPOSAL_METHODS.map(m => <option key={m}>{m}</option>)}
                  </select>
                </FF>

                <FF label="Institute / Division" value={form.institute} onChange={v => setForm(f => ({ ...f, institute: v }))} placeholder="Requesting division" />
                <FF label="Authorized By" value={form.authorizedBy} onChange={v => setForm(f => ({ ...f, authorizedBy: v }))} placeholder="Authorizing officer" />

                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: 600, color: MAROON, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Disposal Notes</label>
                  <textarea value={form.disposalNotes} onChange={e => setForm(f => ({ ...f, disposalNotes: e.target.value }))} placeholder="Additional notes or observations…" rows={2}
                    style={{ width: '100%', border: '1.5px solid rgba(74,9,24,0.18)', borderRadius: 8, outline: 'none', padding: '8px 11px', fontSize: '0.84rem', color: MAROON, fontFamily: 'Inter,sans-serif', resize: 'vertical' }} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid rgba(74,9,24,0.08)' }}>
                <button type="button" onClick={() => setModal(null)} style={ghostBtn}>Cancel</button>
                <button type="submit" disabled={saving} style={{ ...primaryBtn, background: 'linear-gradient(135deg,#B91C1C 0%,#DC2626 100%)', boxShadow: '0 4px 16px rgba(185,28,28,0.25)' }}>
                  {saving ? 'Submitting…' : 'Submit for Approval'}
                </button>
              </div>
            </form>
          </Modal>
        )}
      </AnimatePresence>

      {/* Update status modal */}
      <AnimatePresence>
        {modal === 'status' && target && (
          <Modal title="Update Disposal Status" onClose={() => setModal(null)}>
            <p style={{ fontSize: '0.82rem', color: 'rgba(74,9,24,0.6)', marginBottom: '1rem' }}>
              Update status for <strong style={{ color: MAROON }}>{target.itemName}</strong> (×{target.qty}):
            </p>
            <FF label="New Status" required>
              <select value={newStatus} onChange={e => setNewStatus(e.target.value)}
                style={{ width: '100%', border: '1.5px solid rgba(74,9,24,0.18)', borderRadius: 8, outline: 'none', padding: '8px 11px', fontSize: '0.84rem', color: MAROON, background: '#fff', fontFamily: 'Inter,sans-serif', cursor: 'pointer' }}>
                <option value="">— Select new status —</option>
                {Object.entries(STATUS_CFG)
                  .filter(([k]) => k !== target.status)
                  .map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
            </FF>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(74,9,24,0.08)' }}>
              <button onClick={() => setModal(null)} style={ghostBtn}>Cancel</button>
              <button onClick={handleUpdateStatus} disabled={saving || !newStatus} style={primaryBtn}>{saving ? 'Updating…' : 'Update Status'}</button>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', background: '#fff', border: `1.5px solid ${toast.type === 'error' ? 'rgba(220,38,38,0.25)' : 'rgba(22,163,74,0.25)'}`, borderRadius: 10, padding: '10px 16px', boxShadow: '0 8px 28px rgba(0,0,0,0.12)', zIndex: 9999, fontSize: '0.82rem', color: MAROON, fontWeight: 500 }}>
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const primaryBtn = { display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', background: `linear-gradient(135deg,${MAROON} 0%,#6E1528 100%)`, color: '#fff', fontSize: '0.8rem', fontWeight: 600, boxShadow: `0 4px 14px rgba(74,9,24,0.25)`, fontFamily: 'Inter,sans-serif' }
const ghostBtn   = { display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 8, cursor: 'pointer', border: '1.5px solid rgba(74,9,24,0.18)', background: '#fff', color: MAROON, fontSize: '0.8rem', fontWeight: 500, fontFamily: 'Inter,sans-serif' }

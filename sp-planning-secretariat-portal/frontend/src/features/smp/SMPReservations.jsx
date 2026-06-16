import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiCalendar, FiPlus, FiX, FiCheck, FiCheckCircle, FiRefreshCw,
  FiSearch, FiHash, FiAlertCircle,
} from 'react-icons/fi'
import {
  getReservations, createReservation, approveReservation,
  activateReservation, completeReservation, cancelReservation,
  getItems, getUniqueIds,
} from './smpApi'
import { useSMP } from './SMPContext'

const MAROON = '#4A0918'
const GOLD   = '#C79A2B'

const STATUS_CFG = {
  pending:   { label: 'Pending',   color: '#F59E0B', bg: 'rgba(245,158,11,0.1)' },
  approved:  { label: 'Approved',  color: '#3B82F6', bg: 'rgba(59,130,246,0.1)' },
  active:    { label: 'Active',    color: '#16A34A', bg: 'rgba(22,163,74,0.1)' },
  completed: { label: 'Completed', color: '#6366F1', bg: 'rgba(99,102,241,0.1)' },
  cancelled: { label: 'Cancelled', color: '#9CA3AF', bg: 'rgba(107,114,128,0.1)' },
  expired:   { label: 'Expired',   color: '#DC2626', bg: 'rgba(220,38,38,0.1)' },
}

const BLANK_FORM = {
  itemId: '', qty: '', uniqueItemIds: [],
  instituteName: '', reservedFromDivision: '',
  reservationStartDate: '', reservationEndDate: '',
  approvedBy: '', notes: '',
}

function Modal({ title, onClose, children, wide }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, background: 'rgba(30,5,12,0.55)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '1rem' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <motion.div initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }} exit={{ opacity: 0, y: 16 }}
        style={{ background: '#fff', borderRadius: 16, boxShadow: '0 24px 64px rgba(0,0,0,0.22)', width: '100%', maxWidth: wide ? 720 : 480, overflow: 'hidden' }}>
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
          onFocus={() => setF(true)} onBlur={() => setF(false)} placeholder={placeholder} required={required}
          style={{ width: '100%', border: `1.5px solid ${f ? GOLD : 'rgba(74,9,24,0.18)'}`, borderRadius: 8, outline: 'none', padding: '8px 11px', fontSize: '0.84rem', color: MAROON, background: f ? 'rgba(199,154,43,0.02)' : '#fff', fontFamily: 'Inter,sans-serif', boxShadow: f ? `0 0 0 3px rgba(199,154,43,0.1)` : 'none', transition: 'all 0.18s' }} />
      )}
    </div>
  )
}

function UniqueIdSelector({ itemId, qty, selected, onChange }) {
  const [ids, setIds]     = useState([])
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
    if (selected.includes(id)) {
      onChange(selected.filter(x => x !== id))
    } else {
      if (selected.length >= Number(qty)) return
      onChange([...selected, id])
    }
  }

  if (!itemId || ids.length === 0) return null
  return (
    <div style={{ marginBottom: '0.8rem' }}>
      <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: 600, color: MAROON, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
        Select Specific Units <span style={{ color: 'rgba(74,9,24,0.4)', textTransform: 'none', letterSpacing: 0, fontWeight: 400, fontSize: '0.65rem' }}>(optional — leave blank to auto-assign)</span>
      </label>
      {loading
        ? <p style={{ fontSize: '0.75rem', color: 'rgba(74,9,24,0.4)' }}>Loading units…</p>
        : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, maxHeight: 120, overflowY: 'auto', border: '1.5px solid rgba(74,9,24,0.12)', borderRadius: 8, padding: '8px 10px', background: '#FAFAFA' }}>
            {ids.map(uid => {
              const isSelected = selected.includes(uid.id)
              return (
                <button key={uid.id} type="button" onClick={() => toggle(uid.id)}
                  style={{ fontSize: '0.67rem', fontWeight: 700, fontFamily: 'monospace', padding: '3px 8px', borderRadius: 5, cursor: 'pointer', background: isSelected ? GOLD : 'rgba(74,9,24,0.06)', color: isSelected ? '#fff' : MAROON, border: `1px solid ${isSelected ? GOLD : 'rgba(74,9,24,0.15)'}`, transition: 'all 0.15s' }}>
                  {uid.uniqueNo}
                </button>
              )
            })}
          </div>
        )}
      {selected.length > 0 && (
        <p style={{ fontSize: '0.68rem', color: GOLD, marginTop: 5, fontWeight: 600 }}>
          {selected.length} of {qty} unit{Number(qty) > 1 ? 's' : ''} selected
        </p>
      )}
    </div>
  )
}

export default function SMPReservations() {
  const { isStorekeeper, isAdmin } = useSMP()
  const [rows,    setRows]    = useState([])
  const [items,   setItems]   = useState([])
  const [loading, setLoad]    = useState(true)
  const [statusF, setStatusF] = useState('all_active')
  const [search,  setSearch]  = useState('')
  const [modal,   setModal]   = useState(null)
  const [target,  setTarget]  = useState(null)
  const [form,    setForm]    = useState(BLANK_FORM)
  const [saving,  setSaving]  = useState(false)
  const [err,     setErr]     = useState('')
  const [toast,   setToast]   = useState(null)

  const showToast = (msg, type = 'success') => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000) }

  const load = useCallback(async () => {
    setLoad(true)
    try {
      const [{ data: rs }, { data: its }] = await Promise.all([getReservations(), getItems()])
      setRows(rs); setItems(its)
    } finally { setLoad(false) }
  }, [])
  useEffect(() => { load() }, [load])

  const ACTIVE_STATUSES = new Set(['pending', 'approved', 'active'])

  const visible = rows
    .filter(r => {
      if (statusF === 'all_active') return ACTIVE_STATUSES.has(r.reservationStatus)
      if (statusF === 'all')        return true
      return r.reservationStatus === statusF
    })
    .filter(r => {
      if (!search) return true
      const q = search.toLowerCase()
      return r.instituteName?.toLowerCase().includes(q) ||
             r.itemName?.toLowerCase().includes(q) ||
             r.reservationId?.toLowerCase().includes(q)
    })

  const handleCreate = async e => {
    e.preventDefault()
    if (!form.itemId)                  return setErr('Select an item')
    if (!form.qty || Number(form.qty) <= 0) return setErr('Quantity must be > 0')
    if (!form.instituteName.trim())    return setErr('Institute / Division name required')
    if (!form.reservationStartDate)    return setErr('Start date required')
    if (!form.reservationEndDate)      return setErr('End date required')
    if (form.reservationEndDate < form.reservationStartDate) return setErr('End date must be after start date')
    setErr(''); setSaving(true)
    try {
      await createReservation({ ...form, qty: Number(form.qty) })
      showToast('Reservation created successfully')
      setModal(null); setForm(BLANK_FORM); load()
    } catch (e) { setErr(e.response?.data?.error || 'Error creating reservation') }
    finally { setSaving(false) }
  }

  const handleAction = async (action, id) => {
    setSaving(true)
    try {
      if (action === 'approve')  await approveReservation(id)
      if (action === 'activate') await activateReservation(id)
      if (action === 'complete') await completeReservation(id)
      if (action === 'cancel')   await cancelReservation(id)
      const labels = { approve: 'Approved', activate: 'Activated', complete: 'Completed', cancel: 'Cancelled' }
      showToast(`Reservation ${labels[action]}`, action === 'cancel' ? 'error' : 'success')
      setModal(null); load()
    } catch (e) { showToast(e.response?.data?.error || 'Error', 'error') }
    finally { setSaving(false) }
  }

  const selectedItem = items.find(i => i.id === form.itemId)
  const fmtDate = d => d ? new Date(d).toLocaleDateString('en-LK', { dateStyle: 'medium' }) : '—'

  const FILTER_TABS = [
    { key: 'all_active', label: 'Active' },
    { key: 'pending',    label: 'Pending' },
    { key: 'approved',   label: 'Approved' },
    { key: 'active',     label: 'In Progress' },
    { key: 'completed',  label: 'Completed' },
    { key: 'cancelled',  label: 'Cancelled' },
    { key: 'all',        label: 'All' },
  ]

  return (
    <div>
      {/* Toolbar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: '1rem', alignItems: 'center' }}>
        <div style={{ flex: '1 1 180px', position: 'relative', border: '1.5px solid rgba(74,9,24,0.15)', borderRadius: 8, background: '#FCFBFA', display: 'flex', alignItems: 'center' }}>
          <FiSearch size={13} style={{ position: 'absolute', left: 10, color: 'rgba(74,9,24,0.4)' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search institute, item, ID…"
            style={{ border: 'none', outline: 'none', background: 'transparent', padding: '8px 8px 8px 30px', width: '100%', fontSize: '0.82rem', color: MAROON, fontFamily: 'Inter,sans-serif' }} />
          {search && <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 8px', color: 'rgba(74,9,24,0.4)', display: 'flex' }}><FiX size={12} /></button>}
        </div>

        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
          {FILTER_TABS.map(t => (
            <button key={t.key} onClick={() => setStatusF(t.key)}
              style={{ fontSize: '0.72rem', fontWeight: statusF === t.key ? 700 : 500, padding: '5px 12px', borderRadius: 100, cursor: 'pointer', border: `1.5px solid ${statusF === t.key ? GOLD : 'rgba(74,9,24,0.15)'}`, background: statusF === t.key ? GOLD : 'transparent', color: statusF === t.key ? '#fff' : 'rgba(74,9,24,0.6)', transition: 'all 0.15s', fontFamily: 'Inter,sans-serif', whiteSpace: 'nowrap' }}>
              {t.label} {t.key !== 'all' && t.key !== 'all_active' ? `(${rows.filter(r => r.reservationStatus === t.key).length})` : ''}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
          <button onClick={load} style={ghostBtn}><FiRefreshCw size={13} /></button>
          {isStorekeeper && (
            <button onClick={() => { setForm(BLANK_FORM); setErr(''); setModal('create') }} style={primaryBtn}>
              <FiPlus size={13} /> New Reservation
            </button>
          )}
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'flex', gap: 10, marginBottom: '1rem', flexWrap: 'wrap' }}>
        {Object.entries(STATUS_CFG).map(([key, cfg]) => {
          const count = rows.filter(r => r.reservationStatus === key).length
          return (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 6, background: cfg.bg, borderRadius: 8, padding: '5px 12px', border: `1px solid ${cfg.color}22` }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: cfg.color, flexShrink: 0 }} />
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: cfg.color }}>{count} {cfg.label}</span>
            </div>
          )
        })}
      </div>

      {/* Reservation cards */}
      {loading
        ? <div style={{ textAlign: 'center', padding: '3rem', color: 'rgba(74,9,24,0.35)', fontSize: '0.85rem' }}>Loading…</div>
        : visible.length === 0
          ? (
            <div style={{ textAlign: 'center', padding: '3rem', background: '#fff', borderRadius: 12, border: '1px solid rgba(74,9,24,0.08)', color: 'rgba(74,9,24,0.35)', fontSize: '0.85rem' }}>
              <FiCalendar size={28} style={{ display: 'block', margin: '0 auto 0.75rem', opacity: 0.25 }} />
              No reservations found for this filter
            </div>
          )
          : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {visible.map(r => {
                const sc    = STATUS_CFG[r.reservationStatus] || STATUS_CFG.pending
                const isExp = r.reservationStatus === 'active' && new Date(r.reservationEndDate) < new Date()
                return (
                  <motion.div key={r.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    style={{
                      background: '#fff', borderRadius: 12,
                      border: `1px solid ${isExp ? 'rgba(220,38,38,0.2)' : 'rgba(74,9,24,0.09)'}`,
                      boxShadow: '0 2px 8px rgba(74,9,24,0.05)', overflow: 'hidden',
                      opacity: r.reservationStatus === 'cancelled' ? 0.65 : 1,
                    }}>
                    {/* Header */}
                    <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(74,9,24,0.07)', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 0 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 9, background: `${sc.color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <FiCalendar size={16} color={sc.color} />
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <p style={{ fontWeight: 700, color: MAROON, fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.instituteName}</p>
                          <p style={{ fontSize: '0.68rem', color: 'rgba(74,9,24,0.45)', marginTop: 1 }}>
                            {r.reservationId} · {r.reservedFromDivision ? `from ${r.reservedFromDivision}` : ''}
                          </p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                        {isExp && <span style={{ fontSize: '0.65rem', fontWeight: 700, padding: '2px 8px', borderRadius: 100, background: 'rgba(220,38,38,0.1)', color: '#DC2626' }}>OVERDUE</span>}
                        <span style={{ fontSize: '0.65rem', fontWeight: 700, padding: '2px 8px', borderRadius: 100, background: sc.bg, color: sc.color, textTransform: 'capitalize' }}>{sc.label}</span>
                      </div>
                    </div>

                    {/* Body */}
                    <div style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 10, marginBottom: 10 }}>
                        {[
                          ['Item', r.itemName],
                          ['Quantity', `${r.qty} units`],
                          ['Start Date', fmtDate(r.reservationStartDate)],
                          ['End Date',   fmtDate(r.reservationEndDate)],
                          ['Reserved By', r.reservedBy],
                          ['Approved By', r.approvedBy || '—'],
                        ].map(([k, v]) => (
                          <div key={k}>
                            <p style={{ fontSize: '0.62rem', fontWeight: 600, color: 'rgba(74,9,24,0.4)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>{k}</p>
                            <p style={{ fontSize: '0.8rem', fontWeight: 600, color: MAROON }}>{v}</p>
                          </div>
                        ))}
                      </div>

                      {r.uniqueItemNos && r.uniqueItemNos.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 10 }}>
                          <span style={{ fontSize: '0.65rem', fontWeight: 600, color: 'rgba(74,9,24,0.4)', display: 'flex', alignItems: 'center', gap: 4 }}>
                            <FiHash size={10} /> Units:
                          </span>
                          {r.uniqueItemNos.map(no => (
                            <span key={no} style={{ fontSize: '0.65rem', fontWeight: 700, fontFamily: 'monospace', padding: '2px 6px', borderRadius: 4, background: 'rgba(199,154,43,0.1)', color: GOLD, border: '1px solid rgba(199,154,43,0.2)' }}>{no}</span>
                          ))}
                        </div>
                      )}

                      {r.notes && (
                        <p style={{ fontSize: '0.75rem', color: 'rgba(74,9,24,0.5)', background: 'rgba(74,9,24,0.03)', borderRadius: 7, padding: '6px 10px', marginBottom: 10 }}>{r.notes}</p>
                      )}

                      {/* Actions */}
                      {isStorekeeper && !['completed','cancelled'].includes(r.reservationStatus) && (
                        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
                          {r.reservationStatus === 'pending' && isAdmin && (
                            <ActionBtn label="Approve" color="#3B82F6" icon={<FiCheck size={12} />}
                              onClick={() => handleAction('approve', r.id)} disabled={saving} />
                          )}
                          {['pending','approved'].includes(r.reservationStatus) && (
                            <ActionBtn label="Set Active" color="#16A34A" icon={<FiCheckCircle size={12} />}
                              onClick={() => handleAction('activate', r.id)} disabled={saving} />
                          )}
                          {['active','approved'].includes(r.reservationStatus) && (
                            <ActionBtn label="Complete" color={GOLD} icon={<FiCheckCircle size={12} />}
                              onClick={() => { setTarget(r); setModal('complete') }} disabled={saving} />
                          )}
                          <ActionBtn label="Cancel" color="#DC2626" ghost
                            onClick={() => { setTarget(r); setModal('cancel') }} disabled={saving} />
                        </div>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}

      {/* Create Reservation Modal */}
      <AnimatePresence>
        {modal === 'create' && (
          <Modal title="New Institutional Reservation" onClose={() => setModal(null)} wide>
            {err && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'rgba(220,38,38,0.07)', border: '1px solid rgba(220,38,38,0.2)', borderRadius: 8, padding: '8px 12px', marginBottom: '1rem' }}>
                <FiAlertCircle size={13} color="#DC2626" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.78rem', color: '#DC2626' }}>{err}</span>
              </div>
            )}
            <form onSubmit={handleCreate}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }}>
                <div style={{ gridColumn: 'span 2' }}>
                  <FF label="Institute / Division *" value={form.instituteName} onChange={v => setForm(f => ({ ...f, instituteName: v }))} placeholder="e.g. Planning Division, Western Province" required />
                </div>
                <FF label="Reserved From Division" value={form.reservedFromDivision} onChange={v => setForm(f => ({ ...f, reservedFromDivision: v }))} placeholder="e.g. Store Division" />
                <FF label="Approved By" value={form.approvedBy} onChange={v => setForm(f => ({ ...f, approvedBy: v }))} placeholder="Approving officer name" />

                <div style={{ gridColumn: 'span 2' }}>
                  <FF label="Item *" required>
                    <select value={form.itemId} onChange={e => setForm(f => ({ ...f, itemId: e.target.value, uniqueItemIds: [] }))}
                      style={{ width: '100%', border: '1.5px solid rgba(74,9,24,0.18)', borderRadius: 8, outline: 'none', padding: '8px 11px', fontSize: '0.84rem', color: MAROON, background: '#fff', fontFamily: 'Inter,sans-serif', cursor: 'pointer' }}>
                      <option value="">— Select item —</option>
                      {items.map(i => (
                        <option key={i.id} value={i.id}>
                          {i.name} ({i.sku}) — {i.availableQty ?? i.qty} available
                        </option>
                      ))}
                    </select>
                  </FF>
                </div>

                <FF label="Quantity *" value={form.qty} onChange={v => setForm(f => ({ ...f, qty: v, uniqueItemIds: [] }))} placeholder="Number of units" type="number" required />
                <div />

                {form.itemId && form.qty && Number(form.qty) > 0 && (
                  <div style={{ gridColumn: 'span 2' }}>
                    <UniqueIdSelector
                      itemId={form.itemId} qty={form.qty}
                      selected={form.uniqueItemIds}
                      onChange={ids => setForm(f => ({ ...f, uniqueItemIds: ids }))} />
                  </div>
                )}

                {selectedItem && (
                  <div style={{ gridColumn: 'span 2', background: 'rgba(74,9,24,0.03)', borderRadius: 8, padding: '8px 12px', marginBottom: '0.5rem' }}>
                    <p style={{ fontSize: '0.72rem', color: 'rgba(74,9,24,0.5)' }}>
                      Available: <strong style={{ color: MAROON }}>{selectedItem.availableQty ?? selectedItem.qty} {selectedItem.unit}</strong>
                      {' · '}Reserved: <strong style={{ color: MAROON }}>{selectedItem.reservedQty || 0}</strong>
                    </p>
                  </div>
                )}

                <FF label="Reservation Start Date *" value={form.reservationStartDate} onChange={v => setForm(f => ({ ...f, reservationStartDate: v }))} type="date" required />
                <FF label="Reservation End Date *"   value={form.reservationEndDate}   onChange={v => setForm(f => ({ ...f, reservationEndDate: v }))}   type="date" required />

                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: 600, color: MAROON, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Notes</label>
                  <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="Purpose, delivery instructions, special requirements…" rows={2}
                    style={{ width: '100%', border: '1.5px solid rgba(74,9,24,0.18)', borderRadius: 8, outline: 'none', padding: '8px 11px', fontSize: '0.84rem', color: MAROON, fontFamily: 'Inter,sans-serif', resize: 'vertical' }} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid rgba(74,9,24,0.08)' }}>
                <button type="button" onClick={() => setModal(null)} style={ghostBtn}>Cancel</button>
                <button type="submit" disabled={saving} style={primaryBtn}>{saving ? 'Creating…' : 'Create Reservation'}</button>
              </div>
            </form>
          </Modal>
        )}
      </AnimatePresence>

      {/* Confirm complete modal */}
      <AnimatePresence>
        {modal === 'complete' && target && (
          <Modal title="Complete Reservation" onClose={() => setModal(null)}>
            <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
              <div style={{ width: 50, height: 50, borderRadius: '50%', background: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <FiCheckCircle size={22} color="#6366F1" />
              </div>
              <p style={{ fontSize: '0.87rem', color: 'rgba(74,9,24,0.7)', lineHeight: 1.7 }}>
                Mark reservation for <strong style={{ color: MAROON }}>{target.instituteName}</strong> as completed?<br />
                <span style={{ fontSize: '0.75rem', color: 'rgba(74,9,24,0.5)' }}>Reserved items will be returned to available stock.</span>
              </p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid rgba(74,9,24,0.08)' }}>
              <button onClick={() => setModal(null)} style={ghostBtn}>Cancel</button>
              <button onClick={() => handleAction('complete', target.id)} disabled={saving} style={primaryBtn}>{saving ? 'Processing…' : 'Mark Complete'}</button>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {/* Confirm cancel modal */}
      <AnimatePresence>
        {modal === 'cancel' && target && (
          <Modal title="Cancel Reservation" onClose={() => setModal(null)}>
            <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
              <div style={{ width: 50, height: 50, borderRadius: '50%', background: 'rgba(220,38,38,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <FiX size={22} color="#DC2626" />
              </div>
              <p style={{ fontSize: '0.87rem', color: 'rgba(74,9,24,0.7)', lineHeight: 1.7 }}>
                Cancel reservation for <strong style={{ color: MAROON }}>{target.instituteName}</strong>?<br />
                <span style={{ fontSize: '0.75rem', color: 'rgba(74,9,24,0.5)' }}>Reserved items will be released back to available stock.</span>
              </p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid rgba(74,9,24,0.08)' }}>
              <button onClick={() => setModal(null)} style={ghostBtn}>Keep</button>
              <button onClick={() => handleAction('cancel', target.id)} disabled={saving} style={{ ...primaryBtn, background: 'linear-gradient(135deg,#B91C1C 0%,#DC2626 100%)', boxShadow: '0 4px 16px rgba(185,28,28,0.3)' }}>
                {saving ? 'Cancelling…' : 'Cancel Reservation'}
              </button>
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

const ActionBtn = ({ label, color, ghost, icon, onClick, disabled }) => (
  <button onClick={onClick} disabled={disabled}
    style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 12px', borderRadius: 7, cursor: disabled ? 'not-allowed' : 'pointer', fontSize: '0.74rem', fontWeight: 600, fontFamily: 'Inter,sans-serif', transition: 'all 0.15s', opacity: disabled ? 0.6 : 1, ...(ghost ? { border: `1px solid ${color}33`, background: `${color}08`, color } : { border: 'none', background: `linear-gradient(135deg,${color} 0%,${color}cc 100%)`, color: '#fff', boxShadow: `0 3px 10px ${color}30` }) }}>
    {icon}{label}
  </button>
)
const primaryBtn = { display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', background: `linear-gradient(135deg,${MAROON} 0%,#6E1528 100%)`, color: '#fff', fontSize: '0.8rem', fontWeight: 600, boxShadow: `0 4px 14px rgba(74,9,24,0.25)`, fontFamily: 'Inter,sans-serif' }
const ghostBtn   = { display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 8, cursor: 'pointer', border: '1.5px solid rgba(74,9,24,0.18)', background: '#fff', color: MAROON, fontSize: '0.8rem', fontWeight: 500, fontFamily: 'Inter,sans-serif' }

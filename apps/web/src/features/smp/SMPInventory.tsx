import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiPlus, FiEdit2, FiTrash2, FiSearch, FiX, FiPackage, FiRefreshCw,
  FiHash, FiDollarSign, FiChevronDown, FiChevronUp,
} from 'react-icons/fi'
import { getItems, getCategories, createItem, updateItem, deleteItem, getUniqueIds } from './smpApi'
import { useSMP } from './SMPContext'

const MAROON = '#4A0918'
const GOLD   = '#C79A2B'
const CREAM  = '#FCFBFA'

const STATUS_CFG = {
  available:    { label: 'Available',    bg: 'rgba(22,163,74,0.1)',   text: '#15803D', dot: '#22C55E' },
  out_of_stock: { label: 'Out of Stock', bg: 'rgba(220,38,38,0.1)',   text: '#B91C1C', dot: '#EF4444' },
  reserved:     { label: 'Reserved',     bg: 'rgba(139,92,246,0.1)',  text: '#7C3AED', dot: '#8B5CF6' },
  damaged:      { label: 'Damaged',      bg: 'rgba(107,114,128,0.1)', text: '#374151', dot: '#9CA3AF' },
}

const COND    = ['Good', 'Fair', 'Damaged', 'Under Repair']
const BLANK   = {
  name: '', category: 'Stationery', description: '', qty: '',
  condition: 'Good',
  purchaseValue: '', currentValue: '',
}

/* ─────────────────────── shared sub-components ─────────────────────────── */
function Modal({ title, onClose, children, wide }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, background: 'rgba(30,5,12,0.55)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '1rem' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <motion.div initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }} exit={{ opacity: 0, y: 16, scale: 0.97 }}
        style={{ background: '#fff', borderRadius: 16, boxShadow: '0 24px 64px rgba(0,0,0,0.22)', width: '100%', maxWidth: wide ? 760 : 440, overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.5rem', borderBottom: '1px solid rgba(74,9,24,0.1)', background: 'rgba(74,9,24,0.02)' }}>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1rem', fontWeight: 700, color: MAROON }}>{title}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(74,9,24,0.4)', display: 'flex', padding: 4, borderRadius: 6 }}><FiX size={17} /></button>
        </div>
        <div style={{ padding: '1.25rem 1.5rem 1.5rem', maxHeight: '82vh', overflowY: 'auto' }}>{children}</div>
      </motion.div>
    </motion.div>
  )
}

function Field({ label, error, children, half }) {
  return (
    <div style={{ gridColumn: half ? undefined : 'span 2' }}>
      <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: 600, color: MAROON, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '0.32rem' }}>{label}</label>
      {children}
      {error && <p style={{ fontSize: '0.68rem', color: '#DC2626', marginTop: '0.22rem' }}>{error}</p>}
    </div>
  )
}

function FInput({ value, onChange, placeholder, type = 'text', readOnly }) {
  const [f, setF] = useState(false)
  return (
    <input type={type} value={value} readOnly={readOnly}
      onChange={e => onChange(e.target.value)}
      onFocus={() => setF(true)} onBlur={() => setF(false)}
      placeholder={placeholder}
      style={{ width: '100%', border: `1.5px solid ${f ? GOLD : 'rgba(74,9,24,0.18)'}`, borderRadius: 8, outline: 'none', padding: '8px 11px', fontSize: '0.84rem', color: MAROON, background: readOnly ? 'rgba(74,9,24,0.03)' : f ? 'rgba(199,154,43,0.02)' : '#fff', fontFamily: 'Inter,sans-serif', boxShadow: f ? `0 0 0 3px rgba(199,154,43,0.1)` : 'none', transition: 'all 0.18s' }} />
  )
}

function StatusBadge({ status }) {
  const cfg = STATUS_CFG[status] || STATUS_CFG.available
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: '0.63rem', fontWeight: 700, padding: '2px 8px', borderRadius: 100, background: cfg.bg, color: cfg.text }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: cfg.dot, display: 'inline-block' }} />
      {cfg.label}
    </span>
  )
}

/* ─────────────────────── Unique IDs drawer ─────────────────────────────── */
function UniqueIdsDrawer({ item }) {
  const [open, setOpen] = useState(false)
  const [ids, setIds]   = useState([])
  const [loading, setLoad] = useState(false)

  const load = useCallback(async () => {
    if (!open) return
    setLoad(true)
    try { const { data } = await getUniqueIds(item.id); setIds(data) }
    catch (_e) { /* ignore fetch errors */ }
    finally { setLoad(false) }
  }, [open, item.id])
  useEffect(() => { load() }, [open, load])

  const UID_STATUS = {
    available: { color: '#15803D', bg: 'rgba(22,163,74,0.08)' },
    reserved:  { color: '#7C3AED', bg: 'rgba(139,92,246,0.08)' },
    disposed:  { color: '#9CA3AF', bg: 'rgba(107,114,128,0.08)' },
  }

  return (
    <div style={{ marginTop: 4 }}>
      <button onClick={() => setOpen(o => !o)}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: '0.68rem', fontWeight: 600, color: GOLD, background: 'rgba(199,154,43,0.08)', border: `1px solid rgba(199,154,43,0.2)`, borderRadius: 6, padding: '3px 9px', cursor: 'pointer' }}>
        <FiHash size={11} />
        {item.uniqueIdCount || 0} unique IDs
        {open ? <FiChevronUp size={11} /> : <FiChevronDown size={11} />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            style={{ overflow: 'hidden' }}>
            <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {loading
                ? <span style={{ fontSize: '0.72rem', color: 'rgba(74,9,24,0.4)' }}>Loading…</span>
                : ids.length === 0
                  ? <span style={{ fontSize: '0.72rem', color: 'rgba(74,9,24,0.4)' }}>No unique IDs found</span>
                  : ids.map(uid => {
                      const sc = UID_STATUS[uid.status] || UID_STATUS.available
                      return (
                        <span key={uid.id} title={uid.condition}
                          style={{ fontSize: '0.67rem', fontWeight: 700, fontFamily: 'monospace', padding: '2px 7px', borderRadius: 5, background: sc.bg, color: sc.color, border: `1px solid ${sc.color}22` }}>
                          {uid.uniqueNo}
                        </span>
                      )
                    })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─────────────────────── main component ────────────────────────────────── */
export default function SMPInventory() {
  const { isStorekeeper, isAdmin } = useSMP()
  const [items,   setItems]   = useState([])
  const [cats,    setCats]    = useState([])
  const [loading, setLoad]    = useState(true)
  const [search,  setSearch]  = useState('')
  const [catF,    setCatF]    = useState('All')
  const [stF,     setStF]     = useState('All')
  const [modal,   setModal]   = useState(null)
  const [target,  setTarget]  = useState(null)
  const [form,    setForm]    = useState(BLANK)
  const [errs,         setErrs]         = useState({})
  const [saving,       setSaving]       = useState(false)
  const [toast,        setToast]        = useState(null)
  const [showVal,      setShowVal]      = useState(false)
  const [uniqueIdInputs, setUniqueIdInputs] = useState([])

  const showToast = (msg, type = 'success') => { setToast({ msg, type }); setTimeout(() => setToast(null), 3200) }

  const load = useCallback(async () => {
    setLoad(true)
    try {
      const [{ data: its }, { data: cs }] = await Promise.all([getItems(), getCategories()])
      setItems(its); setCats(cs)
    } finally { setLoad(false) }
  }, [])
  useEffect(() => { load() }, [load])

  const visible = items
    .filter(i => catF === 'All' || i.category === catF)
    .filter(i => stF  === 'All' || i.status   === stF)
    .filter(i => {
      const q = search.toLowerCase()
      return !q || i.name.toLowerCase().includes(q) || i.sku.toLowerCase().includes(q) || i.category.toLowerCase().includes(q)
    })

  const validate = () => {
    const e = {}
    if (!form.name.trim())  e.name   = 'Required'
    if (form.qty   === '' || Number(form.qty)   <= 0) e.qty    = 'Must be > 0'
    if (modal === 'add') {
      const qty = Number(form.qty)
      const filled = uniqueIdInputs.filter(v => v.trim())
      if (filled.length !== qty) e.uniqueIds = `Enter exactly ${qty} unique ID${qty !== 1 ? 's' : ''} (${filled.length} entered)`
      else {
        const dupes = filled.filter((v, i) => filled.indexOf(v) !== i)
        if (dupes.length) e.uniqueIds = `Duplicate IDs: ${[...new Set(dupes)].join(', ')}`
      }
    }
    setErrs(e); return Object.keys(e).length === 0
  }

  const handleSave = async () => {
    if (!validate()) return
    setSaving(true)
    try {
      const payload = {
        ...form,
        qty: Number(form.qty),
        purchaseValue:     Number(form.purchaseValue)     || 0,
        currentValue:      Number(form.currentValue)      || 0,
      }
      if (modal === 'add') {
        payload.uniqueIds = uniqueIdInputs.map(v => v.trim())
        await createItem(payload)
      } else {
        await updateItem(target.id, payload)
      }
      showToast(modal === 'add' ? 'Item added successfully' : 'Item updated successfully')
      setModal(null); load()
    } catch (e) { showToast(e.response?.data?.error || 'Error saving item', 'error') }
    finally { setSaving(false) }
  }

  const handleDelete = async () => {
    setSaving(true)
    try { await deleteItem(target.id); showToast('Item removed', 'error'); setModal(null); load() }
    catch (e) { showToast(e.response?.data?.error || 'Error deleting item', 'error') }
    finally { setSaving(false) }
  }

  const openAdd  = () => { setForm({ ...BLANK, category: cats[0]?.name || 'Stationery' }); setErrs({}); setTarget(null); setUniqueIdInputs([]); setModal('add') }
  const openEdit = i => { setForm({ ...i, qty: String(i.qty), purchaseValue: String(i.purchaseValue || ''), currentValue: String(i.currentValue || '') }); setErrs({}); setTarget(i); setModal('edit') }
  const openDel  = i => { setTarget(i); setModal('delete') }

  const catList    = ['All', ...cats.map(c => c.name)]
  const statusList = ['All', ...Object.keys(STATUS_CFG)]

  const fmtVal = v => v ? `Rs. ${Number(v).toLocaleString('en-LK')}` : '—'

  return (
    <div>
      {/* Toolbar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: '1rem', alignItems: 'center' }}>
        <div style={{ flex: '1 1 200px', position: 'relative', border: '1.5px solid rgba(74,9,24,0.15)', borderRadius: 8, background: CREAM, display: 'flex', alignItems: 'center' }}>
          <FiSearch size={13} style={{ position: 'absolute', left: 10, color: 'rgba(74,9,24,0.4)' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name, SKU, category…"
            style={{ border: 'none', outline: 'none', background: 'transparent', padding: '8px 8px 8px 30px', width: '100%', fontSize: '0.82rem', color: MAROON, fontFamily: 'Inter,sans-serif' }} />
          {search && <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 8px', color: 'rgba(74,9,24,0.4)', display: 'flex' }}><FiX size={13} /></button>}
        </div>

        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
          {catList.map(c => <Chip key={c} label={c} active={catF === c} onClick={() => setCatF(c)} />)}
        </div>

        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
          {statusList.map(s => (
            <Chip key={s} label={s === 'All' ? 'All Status' : (STATUS_CFG[s]?.label || s)}
              active={stF === s} onClick={() => setStF(s)}
              color={s !== 'All' ? STATUS_CFG[s]?.text : undefined} />
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8, marginLeft: 'auto', alignItems: 'center' }}>
          <button onClick={() => setShowVal(v => !v)} title="Toggle value columns"
            style={{ ...ghostBtn, gap: 5 }}>
            <FiDollarSign size={13} />
            <span style={{ fontSize: '0.75rem' }}>{showVal ? 'Hide' : 'Values'}</span>
          </button>
          <button onClick={load} style={ghostBtn}><FiRefreshCw size={13} /></button>
          {isStorekeeper && <button onClick={openAdd} style={primaryBtn}><FiPlus size={13} /> Add Item</button>}
        </div>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: 12, border: '1px solid rgba(74,9,24,0.1)', boxShadow: '0 2px 12px rgba(74,9,24,0.06)', overflow: 'hidden' }}>
        <div style={{ padding: '0.65rem 1.1rem', borderBottom: '1px solid rgba(74,9,24,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.75rem', color: 'rgba(74,9,24,0.5)' }}>
            Showing <strong style={{ color: MAROON }}>{visible.length}</strong> of {items.length} items
          </span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {[
                  'Item Name', 'SKU', 'Category', 'Qty', 'Available', 'Condition', 'Status',
                  ...(showVal ? ['Purchase Val', 'Current Val'] : []),
                  'Unique IDs', '',
                ].map(h => (
                  <th key={h} style={{ padding: '9px 12px', textAlign: 'left', fontFamily: "'Cinzel',serif", fontSize: '0.62rem', letterSpacing: '0.09em', color: 'rgba(74,9,24,0.5)', fontWeight: 600, borderBottom: '1px solid rgba(74,9,24,0.1)', background: 'rgba(74,9,24,0.025)', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <tr key={i}><td colSpan={12} style={{ padding: '10px 12px' }}>
                      <div style={{ height: 22, background: 'rgba(74,9,24,0.06)', borderRadius: 4, animation: 'pulse 1.5s ease-in-out infinite' }} />
                    </td></tr>
                  ))
                : visible.length === 0
                  ? <tr><td colSpan={12} style={{ textAlign: 'center', padding: '3rem', color: 'rgba(74,9,24,0.35)', fontSize: '0.85rem' }}>
                      <FiPackage size={28} style={{ display: 'block', margin: '0 auto 0.5rem', opacity: 0.3 }} />
                      No items found
                    </td></tr>
                  : visible.map((item, idx) => (
                      <tr key={item.id}
                        style={{ borderBottom: '1px solid rgba(74,9,24,0.05)', background: idx % 2 === 0 ? '#fff' : 'rgba(252,251,250,0.6)', transition: 'background 0.12s' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(199,154,43,0.04)'}
                        onMouseLeave={e => e.currentTarget.style.background = idx % 2 === 0 ? '#fff' : 'rgba(252,251,250,0.6)'}>
                        <td style={{ padding: '10px 12px' }}>
                          <span style={{ fontWeight: 600, color: MAROON, fontSize: '0.83rem' }}>{item.name}</span>
                        </td>
                        <td style={{ padding: '10px 12px' }}><code style={{ fontSize: '0.7rem', color: 'rgba(74,9,24,0.55)', background: 'rgba(74,9,24,0.06)', padding: '2px 6px', borderRadius: 4 }}>{item.sku}</code></td>
                        <td style={{ padding: '10px 12px', fontSize: '0.79rem', color: 'rgba(74,9,24,0.7)' }}>{item.category}</td>
                        <td style={{ padding: '10px 12px', fontWeight: 700, color: item.qty === 0 ? '#B91C1C' : MAROON, fontSize: '0.88rem' }}>{item.qty}</td>
                        <td style={{ padding: '10px 12px', fontWeight: 600, color: 'rgba(74,9,24,0.7)', fontSize: '0.84rem' }}>{item.availableQty ?? item.qty}</td>
                        <td style={{ padding: '10px 12px', fontSize: '0.75rem', color: 'rgba(74,9,24,0.6)' }}>{item.condition}</td>
                        <td style={{ padding: '10px 12px' }}><StatusBadge status={item.status} /></td>
                        {showVal && <>
                          <td style={{ padding: '10px 12px', fontSize: '0.75rem', color: 'rgba(74,9,24,0.6)' }}>{fmtVal(item.purchaseValue)}</td>
                          <td style={{ padding: '10px 12px', fontSize: '0.75rem', color: 'rgba(74,9,24,0.6)' }}>{fmtVal(item.currentValue)}</td>
                        </>}
                        <td style={{ padding: '10px 12px' }}>
                          <UniqueIdsDrawer item={item} />
                        </td>
                        <td style={{ padding: '10px 12px' }}>
                          <div style={{ display: 'flex', gap: 5, justifyContent: 'flex-end' }}>
                            {isStorekeeper && <IBtn icon={<FiEdit2 size={12} />} color={GOLD}      onClick={() => openEdit(item)} />}
                            {isAdmin        && <IBtn icon={<FiTrash2 size={12} />} color="#DC2626" onClick={() => openDel(item)} />}
                          </div>
                        </td>
                      </tr>
                    ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {(modal === 'add' || modal === 'edit') && (
          <Modal title={modal === 'add' ? 'Add New Item' : 'Edit Item'} onClose={() => setModal(null)} wide>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
              <Field label="Item Name *" error={errs.name}>
                <FInput value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} placeholder="e.g. Office Chair" />
              </Field>
              {modal === 'edit' && (
                <Field label="SKU" half>
                  <div style={{ padding: '8px 11px', border: '1.5px solid rgba(74,9,24,0.1)', borderRadius: 8, background: 'rgba(74,9,24,0.03)', fontSize: '0.82rem', color: 'rgba(74,9,24,0.5)', fontFamily: 'monospace' }}>
                    {form.sku}
                  </div>
                </Field>
              )}
              <Field label="Category" half>
                <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} style={selectSt}>
                  {cats.map(c => <option key={c.id}>{c.name}</option>)}
                </select>
              </Field>
              {modal === 'add' && (
                <Field label="Initial Quantity *" half error={errs.qty}>
                  <FInput value={form.qty} onChange={v => setForm(f => ({ ...f, qty: v }))} placeholder="0" type="number" />
                </Field>
              )}
              <Field label="Condition" half>
                <select value={form.condition} onChange={e => setForm(f => ({ ...f, condition: e.target.value }))} style={selectSt}>
                  {COND.map(c => <option key={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="Description">
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Optional description" rows={2}
                  style={{ width: '100%', border: '1.5px solid rgba(74,9,24,0.18)', borderRadius: 8, outline: 'none', padding: '8px 11px', fontSize: '0.84rem', color: MAROON, fontFamily: 'Inter,sans-serif', resize: 'vertical' }} />
              </Field>

              {/* Value section */}
              <div style={{ gridColumn: 'span 2', borderTop: '1px solid rgba(74,9,24,0.08)', paddingTop: '0.75rem', marginTop: '0.25rem' }}>
                <p style={{ fontSize: '0.7rem', fontWeight: 700, color: GOLD, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <FiDollarSign size={12} /> Financial Value Tracking
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  {[
                    ['Purchase Value (Rs.)', 'purchaseValue'],
                    ['Current Value (Rs.)',  'currentValue'],
                  ].map(([label, key]) => (
                    <div key={key}>
                      <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: 600, color: 'rgba(74,9,24,0.55)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.28rem' }}>{label}</label>
                      <FInput value={form[key]} onChange={v => setForm(f => ({ ...f, [key]: v }))} placeholder="0" type="number" />
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {modal === 'add' && (() => {
              const qty = Math.max(0, parseInt(form.qty) || 0)
              // Keep array synced to qty
              const inputs = Array.from({ length: qty }, (_, i) => uniqueIdInputs[i] ?? '')
              return qty > 0 ? (
                <div style={{ marginTop: '0.85rem', borderTop: '1px solid rgba(74,9,24,0.08)', paddingTop: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: '0.65rem' }}>
                    <FiHash size={13} color={GOLD} />
                    <p style={{ fontSize: '0.7rem', fontWeight: 700, color: GOLD, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      Unique Item IDs <span style={{ color: 'rgba(74,9,24,0.4)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>— one per physical unit ({qty} required)</span>
                    </p>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 8 }}>
                    {inputs.map((val, i) => (
                      <div key={i}>
                        <label style={{ display: 'block', fontSize: '0.63rem', color: 'rgba(74,9,24,0.5)', marginBottom: '0.2rem', fontWeight: 600 }}>Unit {i + 1}</label>
                        <input
                          value={val}
                          onChange={e => {
                            const next = Array.from({ length: qty }, (_, j) => uniqueIdInputs[j] ?? '')
                            next[i] = e.target.value
                            setUniqueIdInputs(next)
                          }}
                          placeholder={`e.g. CHAIR-${String(i + 1).padStart(3, '0')}`}
                          style={{ width: '100%', border: `1.5px solid ${val.trim() ? GOLD : 'rgba(74,9,24,0.18)'}`, borderRadius: 8, outline: 'none', padding: '7px 10px', fontSize: '0.82rem', color: MAROON, fontFamily: 'monospace', background: '#fff', boxSizing: 'border-box', transition: 'border-color 0.15s' }}
                          onFocus={e => e.target.style.borderColor = GOLD}
                          onBlur={e => e.target.style.borderColor = val.trim() ? GOLD : 'rgba(74,9,24,0.18)'}
                        />
                      </div>
                    ))}
                  </div>
                  {errs.uniqueIds && (
                    <p style={{ fontSize: '0.72rem', color: '#DC2626', marginTop: '0.4rem' }}>{errs.uniqueIds}</p>
                  )}
                </div>
              ) : (
                <div style={{ marginTop: '0.75rem', background: 'rgba(74,9,24,0.03)', border: '1px solid rgba(74,9,24,0.1)', borderRadius: 8, padding: '9px 12px' }}>
                  <p style={{ fontSize: '0.72rem', color: 'rgba(74,9,24,0.45)' }}>Enter a quantity above to assign unique item IDs.</p>
                </div>
              )
            })()}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid rgba(74,9,24,0.08)' }}>
              <button onClick={() => setModal(null)} style={ghostBtn}>Cancel</button>
              <button onClick={handleSave} disabled={saving} style={primaryBtn}>
                {saving ? 'Saving…' : modal === 'add' ? 'Add Item' : 'Save Changes'}
              </button>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {/* Delete Modal */}
      <AnimatePresence>
        {modal === 'delete' && target && (
          <Modal title="Remove Item" onClose={() => setModal(null)}>
            <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
              <div style={{ width: 50, height: 50, borderRadius: '50%', background: 'rgba(220,38,38,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <FiTrash2 size={20} color="#DC2626" />
              </div>
              <p style={{ fontSize: '0.87rem', color: 'rgba(74,9,24,0.7)', lineHeight: 1.7 }}>
                Remove <strong style={{ color: MAROON }}>{target.name}</strong>?<br />
                <span style={{ fontSize: '0.78rem', color: 'rgba(74,9,24,0.5)' }}>All associated unique IDs will also be removed. This cannot be undone.</span>
              </p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid rgba(74,9,24,0.08)' }}>
              <button onClick={() => setModal(null)} style={ghostBtn}>Cancel</button>
              <button onClick={handleDelete} disabled={saving} style={{ ...primaryBtn, background: 'linear-gradient(135deg,#B91C1C 0%,#DC2626 100%)', boxShadow: '0 4px 16px rgba(185,28,28,0.3)' }}>
                {saving ? 'Removing…' : 'Remove Item'}
              </button>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20 }}
            style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', background: '#fff', border: `1.5px solid ${toast.type === 'error' ? 'rgba(220,38,38,0.25)' : 'rgba(22,163,74,0.25)'}`, borderRadius: 10, padding: '10px 16px', boxShadow: '0 8px 28px rgba(0,0,0,0.12)', zIndex: 9999, fontSize: '0.82rem', color: MAROON, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8 }}>
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const Chip = ({ label, active, onClick, color }) => (
  <button onClick={onClick} style={{ fontSize: '0.7rem', fontWeight: active ? 700 : 500, padding: '4px 11px', borderRadius: 100, cursor: 'pointer', border: `1.5px solid ${active ? GOLD : 'rgba(74,9,24,0.15)'}`, background: active ? GOLD : 'transparent', color: active ? '#fff' : (color || 'rgba(74,9,24,0.6)'), transition: 'all 0.15s', fontFamily: 'Inter,sans-serif', whiteSpace: 'nowrap' }}>{label}</button>
)
const IBtn = ({ icon, color, onClick }) => (
  <button onClick={onClick} style={{ width: 28, height: 28, borderRadius: 7, cursor: 'pointer', background: `${color}12`, border: `1px solid ${color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', color, transition: 'all 0.15s' }}
    onMouseEnter={e => { e.currentTarget.style.background = `${color}22` }}
    onMouseLeave={e => { e.currentTarget.style.background = `${color}12` }}>{icon}</button>
)
const primaryBtn = { display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', background: `linear-gradient(135deg,${MAROON} 0%,#6E1528 100%)`, color: '#fff', fontSize: '0.8rem', fontWeight: 600, boxShadow: `0 4px 14px rgba(74,9,24,0.25)`, fontFamily: 'Inter,sans-serif' }
const ghostBtn   = { display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 8, cursor: 'pointer', border: '1.5px solid rgba(74,9,24,0.18)', background: '#fff', color: MAROON, fontSize: '0.8rem', fontWeight: 500, fontFamily: 'Inter,sans-serif' }
const selectSt   = { width: '100%', border: '1.5px solid rgba(74,9,24,0.18)', borderRadius: 8, outline: 'none', padding: '8px 11px', fontSize: '0.84rem', color: MAROON, background: '#fff', fontFamily: 'Inter,sans-serif', cursor: 'pointer' }

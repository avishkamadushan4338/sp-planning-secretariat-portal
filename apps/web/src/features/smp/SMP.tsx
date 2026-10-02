import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiPackage, FiPlus, FiSearch, FiEdit2, FiTrash2,
  FiChevronDown, FiChevronUp, FiAlertCircle, FiCheckCircle,
  FiX, FiFilter, FiDownload, FiRefreshCw, FiBox,
} from 'react-icons/fi'

/* ── Brand tokens ───────────────────────────────────────────────────────── */
const MAROON  = '#4A0918'
const GOLD    = '#C79A2B'
const GOLD_L  = '#E8C55A'
const CREAM   = '#FCFBFA'

/* ── Animation helpers ──────────────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] },
  },
})

/* ── Seed data ──────────────────────────────────────────────────────────── */
const CATEGORIES = ['All', 'Stationery', 'Furniture', 'Electronics', 'Cleaning', 'Printing']

const SEED_ITEMS = [
  { id: 1, name: 'A4 Paper Ream',          category: 'Stationery',  sku: 'STN-001', qty: 145, unit: 'Ream',  minQty: 50  },
  { id: 2, name: 'Ball-Point Pens (Blue)',  category: 'Stationery',  sku: 'STN-002', qty: 320, unit: 'Box',   minQty: 100 },
  { id: 3, name: 'Office Chair',            category: 'Furniture',   sku: 'FRN-001', qty: 12,  unit: 'Nos',   minQty: 5   },
  { id: 4, name: 'Whiteboard Marker Set',   category: 'Stationery',  sku: 'STN-003', qty: 40,  unit: 'Set',   minQty: 20  },
  { id: 5, name: 'Laser Printer Cartridge', category: 'Printing',    sku: 'PRT-001', qty: 8,   unit: 'Nos',   minQty: 10  },
  { id: 6, name: 'Hand Sanitizer (500ml)',  category: 'Cleaning',    sku: 'CLN-001', qty: 24,  unit: 'Bottle',minQty: 15  },
  { id: 7, name: 'Stapler (Heavy Duty)',    category: 'Stationery',  sku: 'STN-004', qty: 18,  unit: 'Nos',   minQty: 5   },
  { id: 8, name: 'UPS (600VA)',             category: 'Electronics', sku: 'ELC-001', qty: 5,   unit: 'Nos',   minQty: 3   },
  { id: 9, name: 'Wooden Filing Cabinet',   category: 'Furniture',   sku: 'FRN-002', qty: 6,   unit: 'Nos',   minQty: 2   },
  { id: 10,'name': 'Floor Mop Set',         category: 'Cleaning',    sku: 'CLN-002', qty: 10,  unit: 'Set',   minQty: 5   },
  { id: 11, name: 'Toner Powder (Black)',   category: 'Printing',    sku: 'PRT-002', qty: 3,   unit: 'Bottle',minQty: 8   },
  { id: 12, name: 'Extension Cord (5m)',    category: 'Electronics', sku: 'ELC-002', qty: 15,  unit: 'Nos',   minQty: 5   },
]

/* ── Helpers ────────────────────────────────────────────────────────────── */
const stockStatus = (item) => {
  if (item.qty === 0)           return 'out'
  if (item.qty < item.minQty)  return 'low'
  return 'ok'
}
const STATUS_LABEL = { ok: 'In Stock', low: 'Low Stock', out: 'Out of Stock' }
const STATUS_COLOR = {
  ok:  { bg: 'rgba(22,163,74,0.1)',  text: '#15803D', dot: '#22C55E' },
  low: { bg: 'rgba(234,179,8,0.1)',  text: '#B45309', dot: '#EAB308' },
  out: { bg: 'rgba(220,38,38,0.1)', text: '#B91C1C', dot: '#EF4444' },
}

/* ── Blank form ─────────────────────────────────────────────────────────── */
const BLANK = { name: '', category: 'Stationery', qty: '', unit: '', minQty: '' }

/* ═══════════════════════════════════════════════════════════════════════════
   Main Page
═══════════════════════════════════════════════════════════════════════════ */
export default function SMP() {
  const [items, setItems]         = useState(SEED_ITEMS)
  const [search, setSearch]       = useState('')
  const [catFilter, setCatFilter] = useState('All')
  const [statusFilter, setStatus] = useState('All')
  const [sortKey, setSortKey]     = useState('name')
  const [sortDir, setSortDir]     = useState('asc')
  const [modal, setModal]         = useState(null)   // null | 'add' | 'edit' | 'delete'
  const [target, setTarget]       = useState(null)   // item being edited / deleted
  const [form, setForm]           = useState(BLANK)
  const [errors, setErrors]       = useState({})
  const [toast, setToast]         = useState(null)

  /* ── Toast helper ───────────────────────────────────────────────────── */
  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3200)
  }

  /* ── Sort toggle ────────────────────────────────────────────────────── */
  const toggleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
  }

  /* ── Filtered + sorted list ─────────────────────────────────────────── */
  const visible = items
    .filter(i => catFilter === 'All' || i.category === catFilter)
    .filter(i => statusFilter === 'All' || stockStatus(i) === statusFilter)
    .filter(i => {
      const q = search.toLowerCase()
      return !q || i.name.toLowerCase().includes(q) || i.sku.toLowerCase().includes(q) || i.category.toLowerCase().includes(q)
    })
    .sort((a, b) => {
      const [va, vb] = [a[sortKey], b[sortKey]]
      const cmp = typeof va === 'number' ? va - vb : String(va).localeCompare(String(vb))
      return sortDir === 'asc' ? cmp : -cmp
    })

  /* ── Stats ──────────────────────────────────────────────────────────── */
  const totalItems   = items.length

  /* ── Form helpers ───────────────────────────────────────────────────── */
  const openAdd = () => {
    setForm(BLANK); setErrors({}); setTarget(null); setModal('add')
  }
  const openEdit = (item) => {
    setForm({ ...item, qty: String(item.qty), minQty: String(item.minQty), sku: item.sku })
    setErrors({}); setTarget(item); setModal('edit')
  }
  const openDelete = (item) => { setTarget(item); setModal('delete') }
  const closeModal = () => { setModal(null); setTarget(null) }

  const validate = () => {
    const e = {}
    if (!form.name.trim())       e.name    = 'Item name is required'
    if (!form.unit.trim())       e.unit    = 'Unit is required'
    if (form.qty === '' || isNaN(Number(form.qty)) || Number(form.qty) <= 0)
                                 e.qty     = 'Must be > 0'
    if (form.minQty === '' || isNaN(Number(form.minQty)) || Number(form.minQty) <= 0)
                                 e.minQty  = 'Must be > 0'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSave = () => {
    if (!validate()) return
    const payload = {
      ...form,
      qty: Number(form.qty), minQty: Number(form.minQty),
    }
    if (modal === 'add') {
      setItems(prev => [...prev, { ...payload, id: Date.now() }])
      showToast('Item added successfully')
    } else {
      setItems(prev => prev.map(i => i.id === target.id ? { ...i, ...payload } : i))
      showToast('Item updated successfully')
    }
    closeModal()
  }

  const handleDelete = () => {
    setItems(prev => prev.filter(i => i.id !== target.id))
    showToast('Item removed from store', 'error')
    closeModal()
  }

  /* ── Column headers ─────────────────────────────────────────────────── */
  const ColHeader = ({ label, sk }) => (
    <th onClick={() => toggleSort(sk)}
      style={{
        padding: '11px 14px', textAlign: 'left', cursor: 'pointer',
        fontFamily: "'Cinzel', serif", fontSize: '0.68rem', letterSpacing: '0.1em',
        color: sortKey === sk ? GOLD : 'rgba(74,9,24,0.5)',
        fontWeight: 600, userSelect: 'none', whiteSpace: 'nowrap',
        borderBottom: `1px solid rgba(74,9,24,0.1)`,
        background: 'rgba(74,9,24,0.025)',
        transition: 'color 0.15s',
      }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
        {label}
        {sortKey === sk
          ? (sortDir === 'asc' ? <FiChevronUp size={11} /> : <FiChevronDown size={11} />)
          : <FiChevronDown size={11} style={{ opacity: 0.3 }} />}
      </span>
    </th>
  )

  return (
    <div style={{ minHeight: '100vh', background: CREAM, fontFamily: 'Inter, sans-serif' }}>

      {/* ── Geometric background ─────────────────────────────────────────── */}
      <svg style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', opacity: 0.022, pointerEvents: 'none', zIndex: 0 }}>
        <defs>
          <pattern id="smp-grid" width="56" height="56" patternUnits="userSpaceOnUse">
            <path d="M 56 0 L 0 0 0 56" fill="none" stroke={MAROON} strokeWidth="0.7" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#smp-grid)" />
      </svg>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1280, margin: '0 auto', padding: '2.5rem 1.5rem 4rem' }}>

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <motion.div variants={fadeUp(0)} initial="hidden" animate="visible"
          style={{ marginBottom: '2.25rem' }}>

          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                background: `linear-gradient(90deg, rgba(199,154,43,0.15) 0%, rgba(199,154,43,0.05) 100%)`,
                border: `1px solid rgba(199,154,43,0.35)`,
                borderRadius: 100, padding: '4px 14px', marginBottom: '0.9rem',
              }}>
                <FiPackage size={11} color={GOLD} />
                <span style={{ fontFamily: "'Cinzel', serif", fontSize: '0.65rem', letterSpacing: '0.14em', color: GOLD, fontWeight: 600 }}>
                  STORE MANAGEMENT SYSTEM
                </span>
              </div>

              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
                fontWeight: 800, color: MAROON, lineHeight: 1.15,
              }}>
                Store & Inventory
              </h1>
              <p style={{ fontSize: '0.88rem', color: 'rgba(74,9,24,0.5)', marginTop: '0.35rem' }}>
                Planning Secretariat — Southern Province
              </p>
            </div>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
              <ActionBtn icon={<FiDownload size={14} />} label="Export" onClick={() => showToast('Export feature coming soon', 'info')} variant="ghost" />
              <ActionBtn icon={<FiRefreshCw size={14} />} label="Refresh" onClick={() => showToast('Data refreshed')} variant="ghost" />
              <ActionBtn icon={<FiPlus size={14} />} label="Add Item" onClick={openAdd} variant="primary" />
            </div>
          </div>
        </motion.div>

        {/* ── Stat cards ─────────────────────────────────────────────────── */}
        <motion.div variants={fadeUp(0.05)} initial="hidden" animate="visible"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: '2rem' }}>

          <StatCard icon={<FiBox size={20} color={GOLD} />}      label="Total Items"      value={totalItems}                        sub="unique SKUs in store"  accent={GOLD} />
        </motion.div>

        {/* ── Filters & Search ───────────────────────────────────────────── */}
        <motion.div variants={fadeUp(0.1)} initial="hidden" animate="visible"
          style={{
            background: '#fff', borderRadius: 14,
            border: '1px solid rgba(74,9,24,0.1)',
            boxShadow: '0 2px 12px rgba(74,9,24,0.06)',
            padding: '1rem 1.25rem',
            marginBottom: '1.25rem',
            display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center',
          }}>

          {/* Search */}
          <div style={{
            flex: '1 1 220px', position: 'relative',
            border: '1.5px solid rgba(74,9,24,0.15)',
            borderRadius: 8, background: CREAM,
            display: 'flex', alignItems: 'center',
          }}>
            <FiSearch size={14} style={{ position: 'absolute', left: 11, color: 'rgba(74,9,24,0.4)' }} />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search name, SKU, category…"
              style={{
                border: 'none', outline: 'none', background: 'transparent',
                padding: '9px 10px 9px 34px', width: '100%',
                fontSize: '0.83rem', color: MAROON, fontFamily: 'Inter, sans-serif',
              }}
            />
            {search && (
              <button onClick={() => setSearch('')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 8px', color: 'rgba(74,9,24,0.4)', display: 'flex' }}>
                <FiX size={13} />
              </button>
            )}
          </div>

          {/* Category filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <FiFilter size={13} color="rgba(74,9,24,0.45)" />
            {CATEGORIES.map(c => (
              <FilterChip key={c} label={c} active={catFilter === c} onClick={() => setCatFilter(c)} />
            ))}
          </div>

          {/* Status filter */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {['All','ok','low','out'].map(s => (
              <FilterChip key={s}
                label={s === 'All' ? 'All Status' : STATUS_LABEL[s]}
                active={statusFilter === s}
                onClick={() => setStatus(s)}
                color={s !== 'All' ? STATUS_COLOR[s].text : undefined}
              />
            ))}
          </div>
        </motion.div>

        {/* ── Table ──────────────────────────────────────────────────────── */}
        <motion.div variants={fadeUp(0.14)} initial="hidden" animate="visible"
          style={{
            background: '#fff', borderRadius: 14,
            border: '1px solid rgba(74,9,24,0.1)',
            boxShadow: '0 4px 24px rgba(74,9,24,0.07)',
            overflow: 'hidden',
          }}>

          {/* Table header row with count */}
          <div style={{
            padding: '0.85rem 1.25rem',
            borderBottom: '1px solid rgba(74,9,24,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <span style={{ fontSize: '0.8rem', color: 'rgba(74,9,24,0.5)', fontWeight: 500 }}>
              Showing <strong style={{ color: MAROON }}>{visible.length}</strong> of {items.length} items
            </span>
            {(search || catFilter !== 'All' || statusFilter !== 'All') && (
              <button onClick={() => { setSearch(''); setCatFilter('All'); setStatus('All') }}
                style={{
                  fontSize: '0.75rem', color: MAROON, background: 'rgba(74,9,24,0.06)',
                  border: '1px solid rgba(74,9,24,0.12)', borderRadius: 6,
                  padding: '4px 10px', cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                }}>
                Clear filters
              </button>
            )}
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <ColHeader label="Item Name"  sk="name"     />
                  <ColHeader label="SKU"         sk="sku"      />
                  <ColHeader label="Category"    sk="category" />
                  <ColHeader label="Qty"         sk="qty"      />
                  <ColHeader label="Unit"        sk="unit"     />
                  <ColHeader label="Min Qty"     sk="minQty"   />
                  <th style={{ padding: '11px 14px', borderBottom: '1px solid rgba(74,9,24,0.1)', background: 'rgba(74,9,24,0.025)' }} />
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {visible.length === 0 ? (
                    <tr>
                      <td colSpan={9} style={{ textAlign: 'center', padding: '3.5rem 1rem', color: 'rgba(74,9,24,0.35)', fontSize: '0.88rem' }}>
                        <FiBox size={32} style={{ display: 'block', margin: '0 auto 0.75rem', opacity: 0.3 }} />
                        No items match the current filters
                      </td>
                    </tr>
                  ) : visible.map((item, idx) => {
                    const st = stockStatus(item)
                    const sc = STATUS_COLOR[st]
                    return (
                      <motion.tr key={item.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0, transition: { delay: idx * 0.03, duration: 0.3 } }}
                        exit={{ opacity: 0, transition: { duration: 0.2 } }}
                        style={{
                          borderBottom: '1px solid rgba(74,9,24,0.06)',
                          background: idx % 2 === 0 ? '#fff' : 'rgba(252,251,250,0.7)',
                          transition: 'background 0.15s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(199,154,43,0.04)'}
                        onMouseLeave={e => e.currentTarget.style.background = idx % 2 === 0 ? '#fff' : 'rgba(252,251,250,0.7)'}
                      >
                        <td style={{ padding: '12px 14px' }}>
                          <span style={{ fontWeight: 600, color: MAROON, fontSize: '0.855rem' }}>{item.name}</span>
                        </td>
                        <td style={{ padding: '12px 14px' }}>
                          <code style={{ fontSize: '0.78rem', color: 'rgba(74,9,24,0.55)', background: 'rgba(74,9,24,0.06)', padding: '2px 7px', borderRadius: 5 }}>{item.sku}</code>
                        </td>
                        <td style={{ padding: '12px 14px', fontSize: '0.83rem', color: 'rgba(74,9,24,0.7)' }}>{item.category}</td>
                        <td style={{ padding: '12px 14px' }}>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                            <span style={{ fontWeight: 700, color: st === 'out' ? '#B91C1C' : st === 'low' ? '#B45309' : MAROON, fontSize: '0.9rem' }}>
                              {item.qty}
                            </span>
                            <span style={{
                              fontSize: '0.68rem', fontWeight: 600,
                              padding: '2px 7px', borderRadius: 100,
                              background: sc.bg, color: sc.text,
                              display: 'inline-flex', alignItems: 'center', gap: 4,
                            }}>
                              <span style={{ width: 5, height: 5, borderRadius: '50%', background: sc.dot, display: 'inline-block' }} />
                              {STATUS_LABEL[st]}
                            </span>
                          </div>
                        </td>
                        <td style={{ padding: '12px 14px', fontSize: '0.83rem', color: 'rgba(74,9,24,0.6)' }}>{item.unit}</td>
                        <td style={{ padding: '12px 14px', fontSize: '0.83rem', color: 'rgba(74,9,24,0.6)' }}>{item.minQty}</td>
                        <td style={{ padding: '12px 14px' }}>
                          <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                            <IconBtn icon={<FiEdit2 size={13} />} color={GOLD}     title="Edit"   onClick={() => openEdit(item)} />
                            <IconBtn icon={<FiTrash2 size={13} />} color="#DC2626" title="Delete" onClick={() => openDelete(item)} />
                          </div>
                        </td>
                      </motion.tr>
                    )
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* ── Modal: Add / Edit ───────────────────────────────────────────── */}
      <AnimatePresence>
        {(modal === 'add' || modal === 'edit') && (
          <Modal onClose={closeModal} title={modal === 'add' ? 'Add New Item' : 'Edit Item'}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <Field label="Item Name *"    colSpan={2}  error={errors.name}>
                <FieldInput value={form.name}    onChange={v => setForm(f => ({ ...f, name: v }))}    placeholder="e.g. A4 Paper Ream" />
              </Field>
              {modal === 'edit' && (
                <Field label="SKU">
                  <div style={{ padding: '9px 12px', border: '1.5px solid rgba(74,9,24,0.1)', borderRadius: 9, background: 'rgba(74,9,24,0.03)', fontSize: '0.845rem', color: 'rgba(74,9,24,0.5)', fontFamily: 'monospace' }}>
                    {form.sku}
                  </div>
                </Field>
              )}
              <Field label="Category">
                <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                  style={selectStyle}>
                  {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="Quantity *"                  error={errors.qty}>
                <FieldInput value={form.qty}     onChange={v => setForm(f => ({ ...f, qty: v }))}     placeholder="0" type="number" />
              </Field>
              <Field label="Unit *"                      error={errors.unit}>
                <FieldInput value={form.unit}    onChange={v => setForm(f => ({ ...f, unit: v }))}    placeholder="e.g. Ream, Box, Nos" />
              </Field>
              <Field label="Minimum Qty *"               error={errors.minQty}>
                <FieldInput value={form.minQty}  onChange={v => setForm(f => ({ ...f, minQty: v }))}  placeholder="Reorder level" type="number" />
              </Field>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(74,9,24,0.08)' }}>
              <button onClick={closeModal} style={ghostBtnStyle}>Cancel</button>
              <button onClick={handleSave} style={primaryBtnStyle}>
                {modal === 'add' ? 'Add Item' : 'Save Changes'}
              </button>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {/* ── Modal: Confirm Delete ───────────────────────────────────────── */}
      <AnimatePresence>
        {modal === 'delete' && target && (
          <Modal onClose={closeModal} title="Remove Item" narrow>
            <div style={{ textAlign: 'center', padding: '0.5rem 0 0.25rem' }}>
              <div style={{
                width: 52, height: 52, borderRadius: '50%',
                background: 'rgba(220,38,38,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1rem',
              }}>
                <FiTrash2 size={22} color="#DC2626" />
              </div>
              <p style={{ fontSize: '0.88rem', color: 'rgba(74,9,24,0.7)', lineHeight: 1.7 }}>
                Remove <strong style={{ color: MAROON }}>{target.name}</strong> ({target.sku}) from store?<br />
                This action cannot be undone.
              </p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(74,9,24,0.08)' }}>
              <button onClick={closeModal}  style={ghostBtnStyle}>Cancel</button>
              <button onClick={handleDelete} style={{ ...primaryBtnStyle, background: 'linear-gradient(135deg, #B91C1C 0%, #DC2626 100%)', boxShadow: '0 4px 16px rgba(185,28,28,0.3)' }}>
                Remove Item
              </button>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {/* ── Toast ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            style={{
              position: 'fixed', bottom: '1.75rem', right: '1.75rem',
              display: 'flex', alignItems: 'center', gap: 10,
              background: '#fff',
              border: `1.5px solid ${toast.type === 'error' ? 'rgba(220,38,38,0.25)' : toast.type === 'info' ? 'rgba(59,130,246,0.25)' : 'rgba(22,163,74,0.25)'}`,
              borderRadius: 10, padding: '11px 16px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
              zIndex: 9999, maxWidth: 320,
            }}>
            {toast.type === 'error'
              ? <FiAlertCircle size={16} color="#DC2626" />
              : <FiCheckCircle size={16} color={toast.type === 'info' ? '#3B82F6' : '#16A34A'} />}
            <span style={{ fontSize: '0.83rem', color: MAROON, fontWeight: 500 }}>{toast.msg}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   Sub-components
═══════════════════════════════════════════════════════════════════════════ */

function StatCard({ icon, label, value, sub, accent }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 12,
      border: '1px solid rgba(74,9,24,0.09)',
      boxShadow: '0 2px 12px rgba(74,9,24,0.05)',
      padding: '1.1rem 1.25rem',
      display: 'flex', alignItems: 'flex-start', gap: 14,
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 10, flexShrink: 0,
        background: `${accent}14`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {icon}
      </div>
      <div>
        <p style={{ fontSize: '0.72rem', color: 'rgba(74,9,24,0.45)', fontWeight: 500, marginBottom: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</p>
        <p style={{ fontSize: '1.45rem', fontWeight: 800, color: MAROON, lineHeight: 1, fontFamily: "'Playfair Display', serif" }}>{value}</p>
        <p style={{ fontSize: '0.7rem', color: 'rgba(74,9,24,0.38)', marginTop: '0.25rem' }}>{sub}</p>
      </div>
    </div>
  )
}

function FilterChip({ label, active, onClick, color }) {
  return (
    <button onClick={onClick} style={{
      fontSize: '0.75rem', fontWeight: active ? 600 : 500,
      padding: '4px 12px', borderRadius: 100, cursor: 'pointer',
      border: `1.5px solid ${active ? GOLD : 'rgba(74,9,24,0.15)'}`,
      background: active ? `linear-gradient(90deg, ${GOLD} 0%, ${GOLD_L} 100%)` : 'transparent',
      color: active ? '#fff' : (color || 'rgba(74,9,24,0.6)'),
      transition: 'all 0.15s', fontFamily: 'Inter, sans-serif',
      whiteSpace: 'nowrap',
    }}>
      {label}
    </button>
  )
}

function ActionBtn({ icon, label, onClick, variant }) {
  const isPrimary = variant === 'primary'
  return (
    <motion.button
      whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}
      onClick={onClick}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 7,
        padding: '9px 16px', borderRadius: 9, cursor: 'pointer',
        border: isPrimary ? 'none' : '1.5px solid rgba(74,9,24,0.18)',
        background: isPrimary ? `linear-gradient(135deg, ${MAROON} 0%, #6E1528 100%)` : '#fff',
        color: isPrimary ? '#fff' : MAROON,
        fontSize: '0.82rem', fontWeight: 600,
        boxShadow: isPrimary ? `0 4px 16px rgba(74,9,24,0.28)` : '0 1px 4px rgba(74,9,24,0.08)',
        fontFamily: 'Inter, sans-serif',
      }}>
      {icon} {label}
    </motion.button>
  )
}

function IconBtn({ icon, color, title, onClick }) {
  return (
    <button title={title} onClick={onClick} style={{
      width: 30, height: 30, borderRadius: 7, cursor: 'pointer',
      background: `${color}12`, border: `1px solid ${color}28`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color, transition: 'all 0.15s',
    }}
      onMouseEnter={e => { e.currentTarget.style.background = `${color}22` }}
      onMouseLeave={e => { e.currentTarget.style.background = `${color}12` }}>
      {icon}
    </button>
  )
}

function Modal({ onClose, title, children, narrow }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(30,5,12,0.55)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1000, padding: '1rem',
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
        exit={{ opacity: 0, y: 20, scale: 0.96, transition: { duration: 0.2 } }}
        style={{
          background: '#fff', borderRadius: 16,
          boxShadow: '0 24px 64px rgba(0,0,0,0.22)',
          width: '100%', maxWidth: narrow ? 400 : 640,
          overflow: 'hidden',
        }}>
        {/* Modal header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1.1rem 1.5rem',
          borderBottom: '1px solid rgba(74,9,24,0.1)',
          background: `linear-gradient(90deg, rgba(74,9,24,0.03) 0%, rgba(199,154,43,0.03) 100%)`,
        }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', fontWeight: 700, color: MAROON }}>{title}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(74,9,24,0.4)', display: 'flex', padding: 4, borderRadius: 6 }}>
            <FiX size={18} />
          </button>
        </div>
        <div style={{ padding: '1.35rem 1.5rem 1.5rem' }}>
          {children}
        </div>
      </motion.div>
    </motion.div>
  )
}

function Field({ label, children, colSpan, error }) {
  return (
    <div style={{ gridColumn: colSpan ? `span ${colSpan}` : undefined }}>
      <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: MAROON, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
        {label}
      </label>
      {children}
      {error && (
        <p style={{ fontSize: '0.72rem', color: '#DC2626', marginTop: '0.3rem', display: 'flex', alignItems: 'center', gap: 4 }}>
          <FiAlertCircle size={11} /> {error}
        </p>
      )}
    </div>
  )
}

function FieldInput({ value, onChange, placeholder, type = 'text' }) {
  const [focused, setFocused] = useState(false)
  return (
    <input
      type={type} value={value}
      onChange={e => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      placeholder={placeholder}
      style={{
        width: '100%', border: `1.5px solid ${focused ? GOLD : 'rgba(74,9,24,0.18)'}`,
        borderRadius: 8, outline: 'none',
        padding: '9px 12px', fontSize: '0.855rem', color: MAROON,
        background: focused ? 'rgba(199,154,43,0.02)' : '#fff',
        fontFamily: 'Inter, sans-serif',
        boxShadow: focused ? `0 0 0 3px rgba(199,154,43,0.1)` : 'none',
        transition: 'border-color 0.18s, box-shadow 0.18s',
      }}
    />
  )
}

const selectStyle = {
  width: '100%', border: '1.5px solid rgba(74,9,24,0.18)',
  borderRadius: 8, outline: 'none',
  padding: '9px 12px', fontSize: '0.855rem', color: MAROON,
  background: '#fff', fontFamily: 'Inter, sans-serif', cursor: 'pointer',
}

const primaryBtnStyle = {
  padding: '9px 22px', borderRadius: 8, border: 'none', cursor: 'pointer',
  background: `linear-gradient(135deg, ${MAROON} 0%, #6E1528 100%)`,
  color: '#fff', fontSize: '0.83rem', fontWeight: 600,
  fontFamily: 'Inter, sans-serif',
  boxShadow: `0 4px 16px rgba(74,9,24,0.28)`,
}

const ghostBtnStyle = {
  padding: '9px 22px', borderRadius: 8, cursor: 'pointer',
  border: '1.5px solid rgba(74,9,24,0.18)',
  background: 'transparent', color: MAROON,
  fontSize: '0.83rem', fontWeight: 500,
  fontFamily: 'Inter, sans-serif',
}

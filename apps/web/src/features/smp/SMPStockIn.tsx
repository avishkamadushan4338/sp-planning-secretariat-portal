import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowDown, FiSearch, FiCheckCircle, FiHash } from 'react-icons/fi'
import { getItems, stockIn } from './smpApi'
import { useSMP } from './SMPContext'

const MAROON = '#4A0918'; const GOLD = '#C79A2B'; const CREAM = '#FCFBFA'

export default function SMPStockIn() {
  const { isStorekeeper: _isStorekeeper } = useSMP()
  const [items,    setItems]   = useState([])
  const [search,   setSearch]  = useState('')
  const [selected, setSel]     = useState(null)
  const [form,     setForm]    = useState({ qty: '', supplier: '', purchaseDate: '', invoiceNo: '', note: '' })
  const [uidInputs, setUidInputs] = useState([])
  const [saving,   setSaving]  = useState(false)
  const [success,  setSuccess] = useState(null)
  const [err,      setErr]     = useState('')

  useEffect(() => {
    getItems().then(r => setItems(r.data)).catch(() => {})
  }, [])

  // Sync uid inputs array length to qty
  const qty = Math.max(0, parseInt(form.qty) || 0)
  const uidArray = Array.from({ length: qty }, (_, i) => uidInputs[i] ?? '')

  const filtered = items.filter(i => {
    const q = search.toLowerCase()
    return !q || i.name.toLowerCase().includes(q) || i.sku.toLowerCase().includes(q)
  })

  const handleSubmit = async e => {
    e.preventDefault()
    if (!selected)                       return setErr('Select an item first')
    if (!form.qty || qty <= 0)           return setErr('Enter a valid quantity')

    const filled = uidArray.filter(v => v.trim())
    if (filled.length !== qty)
      return setErr(`Enter exactly ${qty} unique item ID${qty !== 1 ? 's' : ''} (${filled.length} entered)`)

    const dupes = filled.filter((v, i) => filled.indexOf(v) !== i)
    if (dupes.length)
      return setErr(`Duplicate IDs: ${[...new Set(dupes)].join(', ')}`)

    setErr(''); setSaving(true)
    try {
      const { data: updated } = await stockIn(selected.id, {
        ...form,
        qty,
        uniqueIds: filled,
      })
      setSuccess({ item: updated, qty })
      setForm({ qty: '', supplier: '', purchaseDate: '', invoiceNo: '', note: '' })
      setUidInputs([])
      setItems(prev => prev.map(i => i.id === updated.id ? updated : i))
    } catch (e) { setErr(e.response?.data?.error || 'Error') }
    finally { setSaving(false) }
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, alignItems: 'start' }}>
      {/* Item selector */}
      <div style={{ background: '#fff', borderRadius: 12, border: '1px solid rgba(74,9,24,0.1)', boxShadow: '0 2px 10px rgba(74,9,24,0.05)', overflow: 'hidden' }}>
        <div style={{ padding: '1rem', borderBottom: '1px solid rgba(74,9,24,0.08)' }}>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '0.95rem', fontWeight: 700, color: MAROON, marginBottom: '0.75rem' }}>Select Item</h3>
          <div style={{ position: 'relative', border: '1.5px solid rgba(74,9,24,0.15)', borderRadius: 8, display: 'flex', alignItems: 'center', background: CREAM }}>
            <FiSearch size={13} style={{ position: 'absolute', left: 10, color: 'rgba(74,9,24,0.4)' }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search…"
              style={{ border: 'none', outline: 'none', background: 'transparent', padding: '8px 8px 8px 30px', width: '100%', fontSize: '0.82rem', color: MAROON, fontFamily: 'Inter,sans-serif' }} />
          </div>
        </div>
        <div style={{ maxHeight: 400, overflowY: 'auto' }}>
          {filtered.map(item => (
            <div key={item.id} onClick={() => { setSel(item); setErr('') }}
              style={{ padding: '10px 14px', borderBottom: '1px solid rgba(74,9,24,0.05)', cursor: 'pointer', background: selected?.id === item.id ? 'rgba(199,154,43,0.08)' : 'transparent', borderLeft: selected?.id === item.id ? `3px solid ${GOLD}` : '3px solid transparent', transition: 'all 0.15s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ fontSize: '0.83rem', fontWeight: 600, color: MAROON }}>{item.name}</p>
                  <p style={{ fontSize: '0.72rem', color: 'rgba(74,9,24,0.5)' }}>{item.sku} · {item.category}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '0.88rem', fontWeight: 700, color: item.qty < item.minQty ? '#B91C1C' : MAROON }}>{item.qty} {item.unit}</p>
                  {item.qty < item.minQty && <p style={{ fontSize: '0.65rem', color: '#B91C1C', fontWeight: 600 }}>LOW</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stock in form */}
      <div>
        <div style={{ background: '#fff', borderRadius: 12, border: '1px solid rgba(74,9,24,0.1)', boxShadow: '0 2px 10px rgba(74,9,24,0.05)', overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid rgba(74,9,24,0.08)', background: 'rgba(74,9,24,0.02)' }}>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '0.95rem', fontWeight: 700, color: MAROON, display: 'flex', alignItems: 'center', gap: 8 }}>
              <FiArrowDown size={16} color="#16A34A" /> Stock In
            </h3>
            {selected && <p style={{ fontSize: '0.78rem', color: 'rgba(74,9,24,0.5)', marginTop: '0.25rem' }}>Adding stock for: <strong style={{ color: MAROON }}>{selected.name}</strong></p>}
          </div>

          <form onSubmit={handleSubmit} style={{ padding: '1.25rem' }}>
            {!selected
              ? <p style={{ fontSize: '0.82rem', color: 'rgba(74,9,24,0.4)', textAlign: 'center', padding: '1rem' }}>← Select an item from the list</p>
              : <>
                <AnimatePresence>
                  {err && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      style={{ fontSize: '0.8rem', color: '#DC2626', marginBottom: '0.75rem', padding: '8px 12px', background: 'rgba(220,38,38,0.07)', borderRadius: 8, border: '1px solid rgba(220,38,38,0.2)' }}>
                      {err}
                    </motion.p>
                  )}
                </AnimatePresence>

                <FormField label="Quantity to Add *">
                  <FI value={form.qty} onChange={v => { setForm(f => ({ ...f, qty: v })); setUidInputs([]) }} placeholder="Enter quantity" type="number" />
                </FormField>
                <FormField label="Supplier Name">
                  <FI value={form.supplier} onChange={v => setForm(f => ({ ...f, supplier: v }))} placeholder="Optional" />
                </FormField>
                <FormField label="Purchase Date">
                  <FI value={form.purchaseDate} onChange={v => setForm(f => ({ ...f, purchaseDate: v }))} type="date" />
                </FormField>
                <FormField label="Invoice Number">
                  <FI value={form.invoiceNo} onChange={v => setForm(f => ({ ...f, invoiceNo: v }))} placeholder="Optional" />
                </FormField>
                <FormField label="Note">
                  <textarea value={form.note} onChange={e => setForm(f => ({ ...f, note: e.target.value }))} placeholder="Optional note" rows={2}
                    style={{ width: '100%', border: '1.5px solid rgba(74,9,24,0.18)', borderRadius: 8, outline: 'none', padding: '8px 11px', fontSize: '0.845rem', color: MAROON, fontFamily: 'Inter,sans-serif', resize: 'vertical' }} />
                </FormField>

                {/* Unique IDs entry */}
                {qty > 0 && (
                  <div style={{ marginBottom: '1rem', borderTop: '1px solid rgba(74,9,24,0.08)', paddingTop: '0.85rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: '0.6rem' }}>
                      <FiHash size={13} color={GOLD} />
                      <p style={{ fontSize: '0.7rem', fontWeight: 700, color: GOLD, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        Unique Item IDs <span style={{ color: 'rgba(74,9,24,0.4)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>— {qty} required</span>
                      </p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 8 }}>
                      {uidArray.map((val, i) => (
                        <div key={i}>
                          <label style={{ display: 'block', fontSize: '0.63rem', color: 'rgba(74,9,24,0.5)', marginBottom: '0.2rem', fontWeight: 600 }}>Unit {i + 1}</label>
                          <input
                            value={val}
                            onChange={e => {
                              const next = Array.from({ length: qty }, (_, j) => uidInputs[j] ?? '')
                              next[i] = e.target.value
                              setUidInputs(next)
                            }}
                            placeholder={`e.g. ${(selected?.name || 'ITEM').split(' ')[0].slice(0, 5).toUpperCase()}-${String(i + 1).padStart(3, '0')}`}
                            style={{ width: '100%', border: `1.5px solid ${val.trim() ? GOLD : 'rgba(74,9,24,0.18)'}`, borderRadius: 8, outline: 'none', padding: '7px 10px', fontSize: '0.82rem', color: MAROON, fontFamily: 'monospace', background: '#fff', boxSizing: 'border-box', transition: 'border-color 0.15s' }}
                            onFocus={e => e.target.style.borderColor = GOLD}
                            onBlur={e => e.target.style.borderColor = val.trim() ? GOLD : 'rgba(74,9,24,0.18)'}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button type="submit" disabled={saving}
                  style={{ width: '100%', padding: '11px', borderRadius: 9, border: 'none', cursor: saving ? 'not-allowed' : 'pointer', background: `linear-gradient(135deg,#15803D 0%,#16A34A 100%)`, color: '#fff', fontSize: '0.85rem', fontWeight: 600, fontFamily: "'Cinzel',serif", letterSpacing: '0.06em', boxShadow: '0 4px 16px rgba(22,163,74,0.3)', marginTop: '0.25rem', opacity: saving ? 0.7 : 1 }}>
                  {saving ? 'Adding Stock…' : 'Add Stock'}
                </button>
              </>
            }
          </form>
        </div>

        <AnimatePresence>
          {success && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              style={{ marginTop: 12, background: 'rgba(22,163,74,0.06)', border: '1px solid rgba(22,163,74,0.2)', borderRadius: 10, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
              <FiCheckCircle size={18} color="#16A34A" />
              <div>
                <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#15803D' }}>Stock added successfully</p>
                <p style={{ fontSize: '0.75rem', color: 'rgba(21,128,61,0.7)' }}>{success.item.name} → new qty: <strong>{success.item.qty} {success.item.unit}</strong></p>
              </div>
              <button onClick={() => setSuccess(null)} style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(21,128,61,0.5)', fontSize: '1.1rem' }}>×</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

const FormField = ({ label, children }) => (
  <div style={{ marginBottom: '0.9rem' }}>
    <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600, color: MAROON, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>{label}</label>
    {children}
  </div>
)

const FI = ({ value, onChange, placeholder, type = 'text' }) => {
  const [f, setF] = useState(false)
  return (
    <input type={type} value={value} onChange={e => onChange(e.target.value)}
      onFocus={() => setF(true)} onBlur={() => setF(false)} placeholder={placeholder}
      style={{ width: '100%', border: `1.5px solid ${f ? GOLD : 'rgba(74,9,24,0.18)'}`, borderRadius: 8, outline: 'none', padding: '8px 11px', fontSize: '0.845rem', color: MAROON, background: f ? 'rgba(199,154,43,0.02)' : '#fff', fontFamily: 'Inter,sans-serif', boxShadow: f ? `0 0 0 3px rgba(199,154,43,0.1)` : 'none', transition: 'all 0.18s' }} />
  )
}

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  FiPackage, FiUsers, FiRefreshCw,
  FiTrendingDown, FiTrash2, FiDollarSign, FiBarChart2,
} from 'react-icons/fi'
import { getDashboard } from './smpApi'
import { useSMP } from './SMPContext'

const MAROON = '#4A0918'
const GOLD   = '#C79A2B'

const fmtDate = s => new Date(s).toLocaleString('en-LK', { dateStyle: 'medium', timeStyle: 'short' })
const fmtVal  = v => new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR', maximumFractionDigits: 0 }).format(v)

const ACTION_LABELS = {
  created:   { label: 'Created',    color: '#6366F1' },
  edited:    { label: 'Edited',     color: GOLD },
  deleted:   { label: 'Deleted',    color: '#DC2626' },
  stock_in:  { label: 'Stock In',   color: '#16A34A' },
  stock_out: { label: 'Stock Out',  color: '#EA580C' },
  issued:    { label: 'Issued',     color: '#0EA5E9' },
  reserved:  { label: 'Reserved',   color: '#8B5CF6' },
  disposed:  { label: 'Disposed',   color: '#6B7280' },
}

const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { delay, duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
})

export default function SMPDashboard() {
  const { isAdmin } = useSMP()
  const navigate    = useNavigate()
  const [data, setData]    = useState(null)
  const [loading, setLoad] = useState(true)
  const [error,  setErr]   = useState('')

  const load = async () => {
    setLoad(true); setErr('')
    try { const { data: d } = await getDashboard(); setData(d) }
    catch (e) { setErr(e.response?.data?.error || 'Failed to load dashboard') }
    finally { setLoad(false) }
  }
  useEffect(() => { load() }, [])

  if (loading) return <Skeleton />
  if (error)   return <ErrBox msg={error} onRetry={load} />

  const {
    totalItems, totalQty, outOfStockCount, activeUsers,
    pendingDisposals, totalDisposals, totalStockValue,
    recentTransactions, categoryBreakdown,
    actionCounts, topDisposedItems,
  } = data

  const statCards = [
    { label: 'Total Items',       value: totalItems,          icon: FiPackage,      color: GOLD,      sub: 'item types',       link: '/smp/inventory' },
    { label: 'Total Stock Qty',   value: totalQty,            icon: FiBarChart2,    color: '#0EA5E9', sub: 'units in store',   link: '/smp/inventory' },
    { label: 'Out of Stock',      value: outOfStockCount,     icon: FiTrendingDown, color: '#DC2626', sub: 'items empty',      link: '/smp/inventory', danger: outOfStockCount > 0 },
    { label: 'Total Disposals',    value: totalDisposals,      icon: FiTrash2,       color: '#6B7280', sub: 'all time',         link: '/smp/disposal' },
    ...(totalStockValue > 0 ? [{ label: 'Stock Value', value: fmtVal(totalStockValue), icon: FiDollarSign, color: '#10B981', sub: 'current value', link: null }] : []),
    ...(isAdmin ? [
      { label: 'Active Users',      value: activeUsers,       icon: FiUsers,        color: '#6366F1', sub: 'system users',     link: '/smp/users' },
      { label: 'Pending Disposals', value: pendingDisposals,  icon: FiTrash2,       color: '#9CA3AF', sub: 'awaiting approval', link: '/smp/disposal', warn: pendingDisposals > 0 },
    ] : []),
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Stat cards */}
      <motion.div variants={fadeUp(0)} initial="hidden" animate="visible"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
        {statCards.map((s, i) => (
          <motion.div key={s.label} variants={fadeUp(i * 0.04)} initial="hidden" animate="visible"
            onClick={() => s.link && navigate(s.link)}
            style={{
              background: s.danger ? 'rgba(220,38,38,0.04)' : s.warn ? 'rgba(245,158,11,0.04)' : '#fff',
              borderRadius: 12,
              border: `1px solid ${s.danger ? 'rgba(220,38,38,0.2)' : s.warn ? 'rgba(245,158,11,0.2)' : 'rgba(74,9,24,0.09)'}`,
              boxShadow: '0 2px 10px rgba(74,9,24,0.06)',
              padding: '1rem 1.1rem',
              display: 'flex', alignItems: 'flex-start', gap: 12,
              cursor: s.link ? 'pointer' : 'default',
              transition: 'box-shadow 0.15s, transform 0.15s',
            }}
            whileHover={s.link ? { y: -2, boxShadow: '0 6px 20px rgba(74,9,24,0.12)' } : {}}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: `${s.color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <s.icon size={17} color={s.color} />
            </div>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: '0.65rem', color: 'rgba(74,9,24,0.45)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.12rem' }}>{s.label}</p>
              <p style={{ fontSize: typeof s.value === 'string' ? '0.95rem' : '1.3rem', fontWeight: 800, color: s.danger ? '#DC2626' : s.warn ? '#B45309' : MAROON, lineHeight: 1, fontFamily: "'Playfair Display', serif" }}>{s.value}</p>
              <p style={{ fontSize: '0.65rem', color: 'rgba(74,9,24,0.38)', marginTop: '0.18rem' }}>{s.sub}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Alerts row */}
      {isAdmin && pendingDisposals > 0 && (
        <motion.div variants={fadeUp(0.1)} initial="hidden" animate="visible">
          <AlertBanner
            color="#6B7280" bg="rgba(107,114,128,0.06)" border="rgba(107,114,128,0.2)"
            icon={<FiTrash2 size={14} color="#6B7280" />}
            title={`${pendingDisposals} disposal record${pendingDisposals > 1 ? 's' : ''} awaiting approval`}
            action="View Disposals" onAction={() => navigate('/smp/disposal')}
          />
        </motion.div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Recent Transactions */}
        <motion.div variants={fadeUp(0.14)} initial="hidden" animate="visible"
          style={{ background: '#fff', borderRadius: 12, border: '1px solid rgba(74,9,24,0.09)', boxShadow: '0 2px 10px rgba(74,9,24,0.05)', overflow: 'hidden' }}>
          <div style={{ padding: '0.85rem 1.1rem', borderBottom: '1px solid rgba(74,9,24,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.92rem', fontWeight: 700, color: MAROON }}>Recent Transactions</h3>
            <button onClick={() => navigate('/smp/transactions')} style={{ fontSize: '0.72rem', color: GOLD, background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>View all →</button>
          </div>
          <div style={{ maxHeight: 320, overflowY: 'auto' }}>
            {recentTransactions.length === 0
              ? <p style={{ padding: '2rem', textAlign: 'center', color: 'rgba(74,9,24,0.35)', fontSize: '0.82rem' }}>No transactions yet</p>
              : recentTransactions.map(tx => {
                  const al = ACTION_LABELS[tx.action] || { label: tx.action, color: MAROON }
                  return (
                    <div key={tx.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '9px 14px', borderBottom: '1px solid rgba(74,9,24,0.05)' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 7px', borderRadius: 100, fontSize: '0.62rem', fontWeight: 700, background: `${al.color}14`, color: al.color, whiteSpace: 'nowrap', flexShrink: 0, marginTop: 2 }}>{al.label}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: '0.79rem', fontWeight: 600, color: MAROON, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tx.itemName}</p>
                        <p style={{ fontSize: '0.68rem', color: 'rgba(74,9,24,0.42)', marginTop: 2 }}>{tx.username} · {fmtDate(tx.createdAt)}</p>
                      </div>
                    </div>
                  )
                })}
          </div>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Category breakdown */}
          <motion.div variants={fadeUp(0.18)} initial="hidden" animate="visible"
            style={{ background: '#fff', borderRadius: 12, border: '1px solid rgba(74,9,24,0.09)', boxShadow: '0 2px 10px rgba(74,9,24,0.05)', padding: '0.85rem 1.1rem' }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.92rem', fontWeight: 700, color: MAROON, marginBottom: '0.85rem' }}>Category Breakdown</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {(categoryBreakdown || []).slice(0, 6).map(c => {
                const maxQty = Math.max(...(categoryBreakdown || []).map(x => x.qty), 1)
                return (
                  <div key={c.name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                      <span style={{ fontSize: '0.73rem', color: 'rgba(74,9,24,0.65)', fontWeight: 500 }}>{c.name}</span>
                      <span style={{ fontSize: '0.73rem', fontWeight: 700, color: MAROON }}>{c.qty} units</span>
                    </div>
                    <div style={{ height: 5, background: 'rgba(74,9,24,0.07)', borderRadius: 100 }}>
                      <div style={{ height: '100%', width: `${(c.qty / maxQty) * 100}%`, background: `linear-gradient(90deg, ${MAROON} 0%, ${GOLD} 100%)`, borderRadius: 100, transition: 'width 0.5s' }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Action summary */}
          <motion.div variants={fadeUp(0.22)} initial="hidden" animate="visible"
            style={{ background: '#fff', borderRadius: 12, border: '1px solid rgba(74,9,24,0.09)', boxShadow: '0 2px 10px rgba(74,9,24,0.05)', padding: '0.85rem 1.1rem' }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.92rem', fontWeight: 700, color: MAROON, marginBottom: '0.85rem' }}>Action Summary</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
              {Object.entries(ACTION_LABELS).map(([key, { label, color }]) => (
                <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: color, flexShrink: 0 }} />
                  <span style={{ fontSize: '0.72rem', color: 'rgba(74,9,24,0.58)', flex: 1 }}>{label}</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: MAROON }}>{actionCounts[key] || 0}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Top disposed items */}
      {topDisposedItems && topDisposedItems.length > 0 && (
        <motion.div variants={fadeUp(0.26)} initial="hidden" animate="visible"
          style={{ background: '#fff', borderRadius: 12, border: '1px solid rgba(74,9,24,0.09)', boxShadow: '0 2px 10px rgba(74,9,24,0.05)', padding: '0.85rem 1.1rem' }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.92rem', fontWeight: 700, color: MAROON, marginBottom: '0.85rem' }}>Most Disposed Items</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {topDisposedItems.map((item, i) => (
              <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(74,9,24,0.03)', border: '1px solid rgba(74,9,24,0.09)', borderRadius: 8, padding: '6px 12px' }}>
                <span style={{ width: 20, height: 20, borderRadius: '50%', background: '#6B7280', color: '#fff', fontSize: '0.65rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</span>
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: MAROON }}>{item.name}</span>
                <span style={{ fontSize: '0.72rem', color: 'rgba(74,9,24,0.45)', fontWeight: 500 }}>{item.count} disposed</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}

function AlertBanner({ color, bg, border, icon, title, detail, action, onAction }) {
  return (
    <div style={{ background: bg, border: `1px solid ${border}`, borderRadius: 10, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
      {icon}
      <div style={{ flex: 1, minWidth: 0 }}>
        <span style={{ fontSize: '0.8rem', fontWeight: 700, color }}>{title}</span>
        {detail && <span style={{ fontSize: '0.72rem', color: 'rgba(74,9,24,0.5)', marginLeft: 8 }}>{detail}</span>}
      </div>
      {action && (
        <button onClick={onAction} style={{ fontSize: '0.72rem', fontWeight: 600, color, background: 'none', border: `1px solid ${border}`, borderRadius: 6, padding: '3px 10px', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}>{action} →</button>
      )}
    </div>
  )
}

function Skeleton() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} style={{ height: 88, background: '#fff', borderRadius: 12, border: '1px solid rgba(74,9,24,0.08)', animation: 'pulse 1.5s ease-in-out infinite' }} />
      ))}
    </div>
  )
}

function ErrBox({ msg, onRetry }) {
  return (
    <div style={{ textAlign: 'center', padding: '3rem' }}>
      <p style={{ color: '#DC2626', marginBottom: '1rem', fontSize: '0.85rem' }}>{msg}</p>
      <button onClick={onRetry} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 18px', borderRadius: 8, background: MAROON, color: '#fff', border: 'none', cursor: 'pointer', fontSize: '0.83rem' }}>
        <FiRefreshCw size={13} /> Retry
      </button>
    </div>
  )
}

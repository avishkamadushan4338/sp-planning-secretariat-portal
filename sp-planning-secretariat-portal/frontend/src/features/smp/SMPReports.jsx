import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  FiFileText, FiDownload, FiPrinter, FiPackage,
  FiTrash2, FiDollarSign, FiActivity, FiAlertCircle, FiRefreshCw,
} from 'react-icons/fi'
import {
  getItems, getTransactions, getLoginLogs,
  getDisposals, getValueSummary,
} from './smpApi'
import { useSMP } from './SMPContext'

const MAROON = '#4A0918'
const GOLD   = '#C79A2B'

function fmtVal(n) {
  if (!n && n !== 0) return '—'
  return 'LKR ' + Number(n).toLocaleString('en-LK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function exportCSV(data, filename, columns) {
  const lines = [
    columns.map(c => c.label).join(','),
    ...data.map(row =>
      columns.map(c => {
        const v = c.key.split('.').reduce((o, k) => o?.[k], row) ?? ''
        return `"${String(v).replace(/"/g, '""')}"`
      }).join(',')
    ),
  ]
  const blob = new Blob([lines.join('\n')], { type: 'text/csv' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = `${filename}_${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
}

function printReport(title, headers, rows, subtitle) {
  const w = window.open('', '_blank')
  w.document.write(`
    <html><head><title>${title}</title>
    <style>
      @page { margin: 20mm 18mm; }
      body { font-family: Arial, sans-serif; padding: 0; color: #1a1a1a; font-size: 12px; }
      .header { border-bottom: 3px solid #C79A2B; padding-bottom: 14px; margin-bottom: 20px; }
      .header-top { display: flex; justify-content: space-between; align-items: flex-start; }
      .logo-block { display: flex; align-items: center; gap: 12px; }
      .logo-box { width: 48px; height: 48px; background: #4A0918; border-radius: 10px;
                  display: flex; align-items: center; justify-content: center; }
      .logo-box span { color: #C79A2B; font-weight: 900; font-size: 15px; letter-spacing: 2px; }
      .org-name { font-size: 11px; color: #4A0918; font-weight: 700; letter-spacing: 0.5px; }
      .org-sub  { font-size: 10px; color: #777; margin-top: 2px; }
      .report-title { font-family: Georgia, serif; font-size: 20px; color: #4A0918;
                      font-weight: 700; margin: 14px 0 4px; }
      .report-meta  { font-size: 11px; color: #888; }
      ${subtitle ? `.subtitle { background: rgba(199,154,43,0.08); border-left: 4px solid #C79A2B;
                    padding: 8px 14px; margin-bottom: 18px; font-size: 11px; color: #4A0918;
                    border-radius: 0 6px 6px 0; }` : ''}
      table { width: 100%; border-collapse: collapse; margin-top: 6px; }
      th { background: #4A0918; color: #fff; padding: 8px 10px; text-align: left; font-size: 11px; }
      td { padding: 6px 10px; border: 1px solid #e0d5c5; font-size: 11px; vertical-align: top; }
      tr:nth-child(even) td { background: #fdf9f0; }
      .footer { margin-top: 28px; border-top: 1px solid #e0d5c5; padding-top: 10px;
                display: flex; justify-content: space-between; font-size: 10px; color: #aaa; }
      .badge { display: inline-block; padding: 2px 8px; border-radius: 10px;
               font-size: 10px; font-weight: 700; }
      .badge-pending   { background: #FEF3C7; color: #92400E; }
      .badge-approved  { background: #D1FAE5; color: #065F46; }
      .badge-disposed  { background: #FEE2E2; color: #991B1B; }
      .badge-active    { background: #DBEAFE; color: #1E40AF; }
      .badge-completed { background: #F3F4F6; color: #374151; }
    </style></head><body>
    <div class="header">
      <div class="header-top">
        <div class="logo-block">
          <div class="logo-box"><span>SMP</span></div>
          <div>
            <div class="org-name">PLANNING SECRETARIAT — SOUTHERN PROVINCE</div>
            <div class="org-sub">Store Management System</div>
          </div>
        </div>
        <div style="text-align:right">
          <div style="font-size:11px;color:#555">Report Generated</div>
          <div style="font-size:12px;font-weight:700;color:#4A0918">${new Date().toLocaleString('en-LK')}</div>
        </div>
      </div>
      <div class="report-title">${title}</div>
      <div class="report-meta">Confidential · Internal Use Only · Planning Secretariat, Southern Province</div>
    </div>
    ${subtitle ? `<div class="subtitle">${subtitle}</div>` : ''}
    <table>
      <thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
      <tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c ?? '—'}</td>`).join('')}</tr>`).join('')}</tbody>
    </table>
    <div class="footer">
      <span>Planning Secretariat Store Management System</span>
      <span>CONFIDENTIAL — Do not distribute</span>
      <span>Total records: ${rows.length}</span>
    </div>
    </body></html>`)
  w.document.close()
  w.print()
}

function printValueSummary(data) {
  const rows = data.items || []
  const w = window.open('', '_blank')
  w.document.write(`
    <html><head><title>Asset Value Summary</title>
    <style>
      @page { margin: 20mm 18mm; }
      body { font-family: Arial, sans-serif; padding: 0; color: #1a1a1a; font-size: 12px; }
      .header { border-bottom: 3px solid #C79A2B; padding-bottom: 14px; margin-bottom: 20px; }
      h1 { font-family: Georgia, serif; font-size: 20px; color: #4A0918; margin: 14px 0 4px; }
      .org { font-size: 11px; color: #888; }
      .summary-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 24px; }
      .stat { background: rgba(74,9,24,0.04); border: 1px solid rgba(199,154,43,0.2); border-radius: 8px;
              padding: 14px; }
      .stat-label { font-size: 10px; color: #888; margin-bottom: 4px; }
      .stat-val   { font-size: 15px; font-weight: 700; color: #4A0918; }
      table { width: 100%; border-collapse: collapse; }
      th { background: #4A0918; color: #fff; padding: 8px 10px; text-align: left; font-size: 11px; }
      td { padding: 6px 10px; border: 1px solid #e0d5c5; font-size: 11px; }
      tr:nth-child(even) td { background: #fdf9f0; }
      .footer { margin-top: 28px; border-top: 1px solid #e0d5c5; padding-top: 10px;
                font-size: 10px; color: #aaa; text-align: center; }
    </style></head><body>
    <div class="header">
      <div style="font-size:11px;color:#4A0918;font-weight:700">PLANNING SECRETARIAT — SOUTHERN PROVINCE &nbsp;|&nbsp; Store Management System</div>
      <h1>Asset Value Summary Report</h1>
      <div class="org">Generated: ${new Date().toLocaleString('en-LK')} &nbsp;·&nbsp; Confidential</div>
    </div>
    <div class="summary-grid">
      <div class="stat"><div class="stat-label">Total Stock Value (Purchase)</div><div class="stat-val">LKR ${Number(data.totalPurchaseValue || 0).toLocaleString('en-LK', { minimumFractionDigits: 2 })}</div></div>
      <div class="stat"><div class="stat-label">Total Current Value</div><div class="stat-val">LKR ${Number(data.totalCurrentValue || 0).toLocaleString('en-LK', { minimumFractionDigits: 2 })}</div></div>
      <div class="stat"><div class="stat-label">Items Tracked</div><div class="stat-val">${rows.length}</div></div>
    </div>
    <table>
      <thead><tr><th>#</th><th>Item Name</th><th>SKU</th><th>Category</th><th>Qty</th><th>Purchase Value</th><th>Current Value</th></tr></thead>
      <tbody>${rows.map((r, i) => `<tr>
        <td>${i + 1}</td>
        <td>${r.name}</td>
        <td>${r.sku || '—'}</td>
        <td>${r.category || '—'}</td>
        <td>${r.qty || 0}</td>
        <td style="text-align:right">${r.purchaseValue ? 'LKR ' + Number(r.purchaseValue).toLocaleString('en-LK', { minimumFractionDigits: 2 }) : '—'}</td>
        <td style="text-align:right">${r.currentValue ? 'LKR ' + Number(r.currentValue).toLocaleString('en-LK', { minimumFractionDigits: 2 }) : '—'}</td>
      </tr>`).join('')}</tbody>
    </table>
    <div class="footer">Planning Secretariat Store Management System · CONFIDENTIAL · Total items: ${rows.length}</div>
    </body></html>`)
  w.document.close()
  w.print()
}

const REPORTS = [
  {
    id: 'inventory',
    title: 'Full Inventory Report',
    desc: 'All items with quantity, category, location and status',
    icon: FiPackage,
    iconBg: 'rgba(74,9,24,0.08)',
    iconColor: MAROON,
    fetch: async () => (await getItems()).data,
    csvCols: [
      { label: 'Name', key: 'name' }, { label: 'SKU', key: 'sku' },
      { label: 'Category', key: 'category' }, { label: 'Qty', key: 'qty' },
      { label: 'Available', key: 'availableQty' },
      { label: 'Status', key: 'status' }, { label: 'Purchase Value', key: 'purchaseValue' },
      { label: 'Current Value', key: 'currentValue' },
    ],
    printHeaders: ['Name', 'SKU', 'Category', 'Qty', 'Available', 'Status'],
    printRows: d => d.map(i => [i.name, i.sku, i.category, i.qty, i.availableQty ?? i.qty, i.status]),
    printSubtitle: null,
  },
  {
    id: 'transactions',
    title: 'Stock Movement Report',
    desc: 'All stock in/out and item action history',
    icon: FiActivity,
    iconBg: 'rgba(245,158,11,0.08)',
    iconColor: '#D97706',
    fetch: async () => (await getTransactions()).data,
    csvCols: [
      { label: 'Date', key: 'createdAt' }, { label: 'Action', key: 'action' },
      { label: 'Item', key: 'itemName' }, { label: 'Qty Before', key: 'qtyBefore' },
      { label: 'Qty After', key: 'qtyAfter' }, { label: 'User', key: 'username' },
      { label: 'Note', key: 'note' },
    ],
    printHeaders: ['Date', 'Action', 'Item', 'Qty Before', 'Qty After', 'User', 'Note'],
    printRows: d => d.map(r => [
      new Date(r.createdAt).toLocaleString('en-LK'),
      r.action, r.itemName, r.qtyBefore, r.qtyAfter, r.username, r.note || '—',
    ]),
  },
  {
    id: 'disposal',
    title: 'Disposal Report',
    desc: 'Item disposal records with approval status and methods',
    icon: FiTrash2,
    iconBg: 'rgba(220,38,38,0.08)',
    iconColor: '#DC2626',
    fetch: async () => (await getDisposals()).data,
    csvCols: [
      { label: 'Date', key: 'disposalDate' }, { label: 'Item', key: 'itemName' },
      { label: 'SKU', key: 'sku' }, { label: 'Qty', key: 'qty' },
      { label: 'Method', key: 'disposalMethod' }, { label: 'Reason', key: 'disposalReason' },
      { label: 'Institute', key: 'institute' }, { label: 'Authorized By', key: 'authorizedBy' },
      { label: 'Status', key: 'status' }, { label: 'Approved By', key: 'approvedBy' },
      { label: 'Est. Value', key: 'estimatedDisposalValue' }, { label: 'Disposed By', key: 'disposedBy' },
    ],
    printHeaders: ['Date', 'Item', 'SKU', 'Qty', 'Method', 'Reason', 'Institute', 'Auth. By', 'Status', 'Est. Value'],
    printRows: d => d.map(r => [
      r.disposalDate ? new Date(r.disposalDate).toLocaleDateString('en-LK') : '—',
      r.itemName, r.sku || '—', r.qty,
      r.disposalMethod, r.disposalReason, r.institute || '—',
      r.authorizedBy || '—', r.status,
      r.estimatedDisposalValue ? `LKR ${Number(r.estimatedDisposalValue).toLocaleString('en-LK', { minimumFractionDigits: 2 })}` : '—',
    ]),
  },
  {
    id: 'login_logs',
    title: 'Login Activity Report',
    desc: 'User login/logout history (28-day retention)',
    icon: FiAlertCircle,
    iconBg: 'rgba(139,92,246,0.08)',
    iconColor: '#7C3AED',
    adminOnly: true,
    fetch: async () => (await getLoginLogs()).data,
    csvCols: [
      { label: 'Username', key: 'username' }, { label: 'Status', key: 'status' },
      { label: 'Login Time', key: 'loginTime' }, { label: 'Logout Time', key: 'logoutTime' },
      { label: 'IP', key: 'ip' }, { label: 'Device', key: 'deviceInfo' },
    ],
    printHeaders: ['Username', 'Status', 'Login Time', 'Logout Time', 'IP', 'Device'],
    printRows: d => d.map(r => [
      r.username, r.status,
      new Date(r.loginTime).toLocaleString('en-LK'),
      r.logoutTime ? new Date(r.logoutTime).toLocaleString('en-LK') : 'Active',
      r.ip, (r.deviceInfo || '').slice(0, 60),
    ]),
  },
]

function ReportCard({ report, onCsv, onPrint, busy }) {
  const Icon = report.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      style={{ background: '#fff', borderRadius: 12, border: '1px solid rgba(74,9,24,0.1)', boxShadow: '0 2px 10px rgba(74,9,24,0.05)', overflow: 'hidden' }}
    >
      <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid rgba(74,9,24,0.07)', background: 'rgba(74,9,24,0.015)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 38, height: 38, borderRadius: 10, background: report.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon size={17} color={report.iconColor} />
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontFamily: "'Playfair Display',serif", fontSize: '0.9rem', fontWeight: 700, color: MAROON }}>{report.title}</p>
          <p style={{ fontSize: '0.71rem', color: 'rgba(74,9,24,0.45)', marginTop: 2, lineHeight: 1.4 }}>{report.desc}</p>
        </div>
        {report.adminOnly && (
          <span style={{ fontSize: '0.65rem', background: 'rgba(220,38,38,0.08)', color: '#DC2626', border: '1px solid rgba(220,38,38,0.2)', borderRadius: 6, padding: '2px 7px', fontWeight: 700, flexShrink: 0 }}>
            ADMIN
          </span>
        )}
      </div>
      <div style={{ padding: '0.875rem 1.25rem', display: 'flex', gap: 8 }}>
        <button
          onClick={onCsv}
          disabled={busy.csv}
          style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '8px', borderRadius: 8, border: `1.5px solid ${GOLD}`, background: 'transparent', color: GOLD, fontSize: '0.78rem', fontWeight: 600, cursor: busy.csv ? 'not-allowed' : 'pointer', fontFamily: 'Inter,sans-serif', opacity: busy.csv ? 0.6 : 1, transition: 'all 0.15s' }}
          onMouseEnter={e => { if (!busy.csv) e.currentTarget.style.background = `rgba(199,154,43,0.08)` }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
        >
          <FiDownload size={13} /> {busy.csv ? 'Exporting…' : 'Export CSV'}
        </button>
        <button
          onClick={onPrint}
          disabled={busy.print}
          style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '8px', borderRadius: 8, border: 'none', background: busy.print ? 'rgba(74,9,24,0.4)' : `linear-gradient(135deg,${MAROON} 0%,#6E1528 100%)`, color: '#fff', fontSize: '0.78rem', fontWeight: 600, cursor: busy.print ? 'not-allowed' : 'pointer', fontFamily: 'Inter,sans-serif', boxShadow: busy.print ? 'none' : `0 3px 12px rgba(74,9,24,0.22)` }}
        >
          <FiPrinter size={13} /> {busy.print ? 'Preparing…' : 'Print Report'}
        </button>
      </div>
    </motion.div>
  )
}

function ValueSummaryCard({ data, loading, onRefresh, onPrint }) {
  if (loading) {
    return (
      <div style={{ background: '#fff', borderRadius: 12, border: '1px solid rgba(74,9,24,0.1)', padding: '2rem', textAlign: 'center', color: 'rgba(74,9,24,0.4)', fontSize: '0.85rem' }}>
        Loading value summary…
      </div>
    )
  }
  if (!data) return null

  const stats = [
    { label: 'Total Purchase Value', value: fmtVal(data.totalPurchaseValue), color: MAROON },
    { label: 'Total Current Value', value: fmtVal(data.totalCurrentValue), color: '#059669' },
    { label: 'Items Tracked', value: (data.items || []).length, color: GOLD },
  ]

  return (
    <div style={{ background: '#fff', borderRadius: 12, border: '1px solid rgba(74,9,24,0.1)', boxShadow: '0 2px 10px rgba(74,9,24,0.05)', overflow: 'hidden' }}>
      <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid rgba(74,9,24,0.07)', background: 'rgba(74,9,24,0.015)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(199,154,43,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <FiDollarSign size={17} color={GOLD} />
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontFamily: "'Playfair Display',serif", fontSize: '0.9rem', fontWeight: 700, color: MAROON }}>Asset Value Summary</p>
          <p style={{ fontSize: '0.71rem', color: 'rgba(74,9,24,0.45)', marginTop: 2 }}>Purchase value and current value tracking</p>
        </div>
        <button onClick={onRefresh} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(74,9,24,0.4)', padding: 6, display: 'flex', borderRadius: 6, transition: 'all 0.15s' }}
          onMouseEnter={e => { e.currentTarget.style.color = MAROON; e.currentTarget.style.background = 'rgba(74,9,24,0.05)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(74,9,24,0.4)'; e.currentTarget.style.background = 'none' }}>
          <FiRefreshCw size={14} />
        </button>
      </div>

      <div style={{ padding: '1rem 1.25rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 10, marginBottom: 16 }}>
          {stats.map(s => (
            <div key={s.label} style={{ background: 'rgba(74,9,24,0.02)', border: '1px solid rgba(74,9,24,0.07)', borderRadius: 10, padding: '12px 14px' }}>
              <p style={{ fontSize: '0.7rem', color: 'rgba(74,9,24,0.5)', marginBottom: 5 }}>{s.label}</p>
              <p style={{ fontSize: '0.95rem', fontWeight: 700, color: s.color, fontFamily: "'Playfair Display',serif" }}>{s.value}</p>
            </div>
          ))}
        </div>

        {(data.items || []).length > 0 && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
              <thead>
                <tr>
                  {['Item', 'Category', 'Qty', 'Purchase Value', 'Current Value'].map(h => (
                    <th key={h} style={{ padding: '8px 10px', background: `rgba(74,9,24,0.04)`, borderBottom: `2px solid rgba(74,9,24,0.1)`, textAlign: 'left', fontSize: '0.7rem', fontWeight: 700, color: MAROON, whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.items.map((item, i) => (
                  <tr key={item.id || i} style={{ borderBottom: '1px solid rgba(74,9,24,0.06)' }}>
                    <td style={{ padding: '7px 10px', fontWeight: 600, color: MAROON }}>{item.name}</td>
                    <td style={{ padding: '7px 10px', color: 'rgba(74,9,24,0.6)' }}>{item.category || '—'}</td>
                    <td style={{ padding: '7px 10px', color: 'rgba(74,9,24,0.6)' }}>{item.qty}</td>
                    <td style={{ padding: '7px 10px', color: 'rgba(74,9,24,0.7)', textAlign: 'right' }}>{item.purchaseValue ? fmtVal(item.purchaseValue) : '—'}</td>
                    <td style={{ padding: '7px 10px', color: '#059669', textAlign: 'right', fontWeight: 500 }}>{item.currentValue ? fmtVal(item.currentValue) : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div style={{ marginTop: 14, display: 'flex', gap: 8 }}>
          <button
            onClick={() => exportCSV(data.items || [], 'value_summary', [
              { label: 'Name', key: 'name' }, { label: 'SKU', key: 'sku' },
              { label: 'Category', key: 'category' }, { label: 'Qty', key: 'qty' },
              { label: 'Purchase Value', key: 'purchaseValue' }, { label: 'Current Value', key: 'currentValue' },
            ])}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 8, border: `1.5px solid ${GOLD}`, background: 'transparent', color: GOLD, fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter,sans-serif', transition: 'all 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.background = `rgba(199,154,43,0.08)` }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
          >
            <FiDownload size={13} /> Export CSV
          </button>
          <button
            onClick={onPrint}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 8, border: 'none', background: `linear-gradient(135deg,${MAROON} 0%,#6E1528 100%)`, color: '#fff', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter,sans-serif', boxShadow: `0 3px 12px rgba(74,9,24,0.22)` }}
          >
            <FiPrinter size={13} /> Print Value Report
          </button>
        </div>
      </div>
    </div>
  )
}

export default function SMPReports() {
  const { isAdmin } = useSMP()
  const [busy, setBusy]             = useState({})
  const [valueSummary, setValueSummary] = useState(null)
  const [valueLoading, setValueLoading] = useState(true)

  const loadValueSummary = async () => {
    setValueLoading(true)
    try {
      const res = await getValueSummary()
      setValueSummary(res.data)
    } catch {
      setValueSummary(null)
    } finally {
      setValueLoading(false)
    }
  }

  useEffect(() => { loadValueSummary() }, [])

  const run = async (report, mode) => {
    const key = `${report.id}_${mode}`
    setBusy(b => ({ ...b, [key]: true }))
    try {
      const data = await report.fetch()
      if (mode === 'csv')   exportCSV(data, report.id, report.csvCols)
      if (mode === 'print') printReport(report.title, report.printHeaders, report.printRows(data), report.printSubtitle)
    } finally {
      setBusy(b => ({ ...b, [key]: false }))
    }
  }

  const available = isAdmin ? REPORTS : REPORTS.filter(r => !r.adminOnly)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Page header */}
      <div style={{ background: '#fff', borderRadius: 12, border: '1px solid rgba(74,9,24,0.1)', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: `rgba(199,154,43,0.1)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <FiFileText size={18} color={GOLD} />
        </div>
        <div>
          <p style={{ fontFamily: "'Playfair Display',serif", fontSize: '1rem', fontWeight: 700, color: MAROON }}>Reports &amp; Exports</p>
          <p style={{ fontSize: '0.73rem', color: 'rgba(74,9,24,0.5)', marginTop: 2 }}>Generate, print, and export inventory and activity reports</p>
        </div>
      </div>

      {/* Value Summary (full width) */}
      <ValueSummaryCard
        data={valueSummary}
        loading={valueLoading}
        onRefresh={loadValueSummary}
        onPrint={() => valueSummary && printValueSummary(valueSummary)}
      />

      {/* Report cards grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
        {available.map(report => (
          <ReportCard
            key={report.id}
            report={report}
            busy={{ csv: !!busy[`${report.id}_csv`], print: !!busy[`${report.id}_print`] }}
            onCsv={() => run(report, 'csv')}
            onPrint={() => run(report, 'print')}
          />
        ))}
      </div>
    </div>
  )
}

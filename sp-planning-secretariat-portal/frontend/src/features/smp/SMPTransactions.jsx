import { useState, useEffect } from 'react'
import { FiList, FiRefreshCw, FiDownload } from 'react-icons/fi'
import { getTransactions } from './smpApi'

const MAROON = '#4A0918'; const GOLD = '#C79A2B'
const ACTION_CFG = {
  created:  { label:'Created',   color:'#6366F1' },
  edited:   { label:'Edited',    color:GOLD },
  deleted:  { label:'Deleted',   color:'#DC2626' },
  stock_in: { label:'Stock In',  color:'#16A34A' },
  stock_out:{ label:'Stock Out', color:'#EA580C' },
  issued:   { label:'Issued',    color:'#0EA5E9' },
  borrowed: { label:'Borrowed',  color:'#EC4899' },
  returned: { label:'Returned',  color:'#10B981' },
}

function exportCSV(rows) {
  const cols = ['Date','Action','Item','SKU','Qty Before','Qty After','User','Note']
  const lines = [cols.join(','), ...rows.map(r => [
    new Date(r.createdAt).toLocaleString('en-LK'),
    r.action, r.itemName, r.sku || '', r.qtyBefore, r.qtyAfter, r.username,
    `"${(r.note||'').replace(/"/g,'""')}"`,
  ].join(','))]
  const blob = new Blob([lines.join('\n')], { type:'text/csv' })
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob)
  a.download = `transactions_${new Date().toISOString().slice(0,10)}.csv`; a.click()
}

export default function SMPTransactions() {
  const [rows,    setRows]    = useState([])
  const [loading, setLoad]    = useState(true)
  const [search,  setSearch]  = useState('')
  const [actF,    setActF]    = useState('All')
  const [dateF,   setDateF]   = useState({ from:'', to:'' })

  const load = async () => {
    setLoad(true)
    try { const { data } = await getTransactions(); setRows(data) }
    finally { setLoad(false) }
  }
  useEffect(() => { load() }, [])

  const visible = rows
    .filter(r => actF === 'All' || r.action === actF)
    .filter(r => !search || r.itemName?.toLowerCase().includes(search.toLowerCase()) || r.username?.toLowerCase().includes(search.toLowerCase()))
    .filter(r => !dateF.from || r.createdAt >= dateF.from)
    .filter(r => !dateF.to   || r.createdAt <= dateF.to + 'T23:59:59')

  return (
    <div>
      {/* Toolbar */}
      <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:'1rem', alignItems:'center' }}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search item or user…"
          style={{ flex:'1 1 180px', border:'1.5px solid rgba(74,9,24,0.15)', borderRadius:8, outline:'none', padding:'7px 11px', fontSize:'0.82rem', color:MAROON, fontFamily:'Inter,sans-serif', background:'#FCFBFA' }} />
        <input type="date" value={dateF.from} onChange={e=>setDateF(f=>({...f,from:e.target.value}))}
          style={{ border:'1.5px solid rgba(74,9,24,0.15)', borderRadius:8, outline:'none', padding:'7px 10px', fontSize:'0.8rem', color:MAROON, fontFamily:'Inter,sans-serif', background:'#fff' }} />
        <span style={{ fontSize:'0.8rem', color:'rgba(74,9,24,0.4)' }}>to</span>
        <input type="date" value={dateF.to} onChange={e=>setDateF(f=>({...f,to:e.target.value}))}
          style={{ border:'1.5px solid rgba(74,9,24,0.15)', borderRadius:8, outline:'none', padding:'7px 10px', fontSize:'0.8rem', color:MAROON, fontFamily:'Inter,sans-serif', background:'#fff' }} />
        <div style={{ display:'flex', gap:5, flexWrap:'wrap' }}>
          {['All',...Object.keys(ACTION_CFG)].map(a => (
            <button key={a} onClick={()=>setActF(a)} style={{ padding:'4px 10px', borderRadius:100, border:`1.5px solid ${actF===a?GOLD:'rgba(74,9,24,0.15)'}`, background:actF===a?GOLD:'transparent', color:actF===a?'#fff':(ACTION_CFG[a]?.color||'rgba(74,9,24,0.6)'), fontSize:'0.7rem', fontWeight:600, cursor:'pointer', fontFamily:'Inter,sans-serif', whiteSpace:'nowrap' }}>
              {a==='All'?'All':ACTION_CFG[a].label}
            </button>
          ))}
        </div>
        <button onClick={load}                  style={iconBtn}><FiRefreshCw size={13}/></button>
        <button onClick={()=>exportCSV(visible)} style={iconBtn}><FiDownload size={13}/></button>
      </div>

      <div style={{ background:'#fff', borderRadius:12, border:'1px solid rgba(74,9,24,0.1)', boxShadow:'0 2px 10px rgba(74,9,24,0.05)', overflow:'hidden' }}>
        <div style={{ padding:'0.65rem 1.1rem', borderBottom:'1px solid rgba(74,9,24,0.07)', fontSize:'0.75rem', color:'rgba(74,9,24,0.5)' }}>
          <strong style={{color:MAROON}}>{visible.length}</strong> of {rows.length} records
        </div>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead><tr>{['Date','Action','Item Name','Qty Δ','User','Note'].map(h=><th key={h} style={{padding:'9px 12px',textAlign:'left',fontFamily:"'Cinzel',serif",fontSize:'0.63rem',letterSpacing:'0.09em',color:'rgba(74,9,24,0.5)',fontWeight:600,borderBottom:'1px solid rgba(74,9,24,0.1)',background:'rgba(74,9,24,0.025)',whiteSpace:'nowrap'}}>{h}</th>)}</tr></thead>
            <tbody>
              {loading
                ? <tr><td colSpan={6} style={{textAlign:'center',padding:'2.5rem',color:'rgba(74,9,24,0.35)'}}>Loading…</td></tr>
                : visible.length===0
                  ? <tr><td colSpan={6} style={{textAlign:'center',padding:'2.5rem',fontSize:'0.85rem',color:'rgba(74,9,24,0.35)'}}><FiList size={28} style={{display:'block',margin:'0 auto 0.5rem',opacity:0.25}}/>No records match filters</td></tr>
                  : visible.map((r,i)=>{
                      const ac = ACTION_CFG[r.action]||{label:r.action,color:MAROON}
                      const delta = r.qtyAfter - r.qtyBefore
                      return (
                        <tr key={r.id} style={{borderBottom:'1px solid rgba(74,9,24,0.05)',background:i%2===0?'#fff':'rgba(252,251,250,0.6)'}}>
                          <td style={{padding:'9px 12px',fontSize:'0.75rem',color:'rgba(74,9,24,0.5)',whiteSpace:'nowrap'}}>{new Date(r.createdAt).toLocaleString('en-LK')}</td>
                          <td style={{padding:'9px 12px'}}><span style={{display:'inline-flex',alignItems:'center',padding:'2px 8px',borderRadius:100,fontSize:'0.65rem',fontWeight:700,background:`${ac.color}14`,color:ac.color,whiteSpace:'nowrap'}}>{ac.label}</span></td>
                          <td style={{padding:'9px 12px',fontWeight:600,color:MAROON,fontSize:'0.82rem'}}>{r.itemName}</td>
                          <td style={{padding:'9px 12px',fontWeight:700,fontSize:'0.85rem',color:delta>0?'#16A34A':delta<0?'#DC2626':MAROON}}>{delta>0?'+':''}{delta!==0?delta:'—'}</td>
                          <td style={{padding:'9px 12px',fontSize:'0.78rem',color:'rgba(74,9,24,0.6)'}}>{r.username}</td>
                          <td style={{padding:'9px 12px',fontSize:'0.75rem',color:'rgba(74,9,24,0.45)',maxWidth:200,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{r.note||'—'}</td>
                        </tr>
                      )
                    })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

const iconBtn = {display:'inline-flex',alignItems:'center',gap:6,padding:'7px 11px',borderRadius:8,cursor:'pointer',border:'1.5px solid rgba(74,9,24,0.18)',background:'#fff',color:MAROON,fontSize:'0.8rem',fontWeight:500,fontFamily:'Inter,sans-serif'}

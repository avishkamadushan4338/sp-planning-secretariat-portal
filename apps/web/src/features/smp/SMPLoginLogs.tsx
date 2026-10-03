import { useState, useEffect } from 'react'
import { FiActivity, FiRefreshCw, FiShield, FiAlertCircle } from 'react-icons/fi'
import { getLoginLogs } from './smpApi'

const MAROON = '#4A0918'; const GOLD = '#C79A2B'
const DAYS_28 = 28 * 24 * 60 * 60 * 1000

export default function SMPLoginLogs() {
  const [rows,    setRows]   = useState([])
  const [loading, setLoad]   = useState(true)
  const [search,  setSearch] = useState('')
  const [statusF, setStatusF]= useState('All')
  const [dateF,   setDateF]  = useState({ from:'', to:'' })

  const load = async () => {
    setLoad(true)
    try { const { data } = await getLoginLogs(); setRows(data) }
    finally { setLoad(false) }
  }
  useEffect(() => { load() }, [])

  const visible = rows
    .filter(r => statusF === 'All' || r.status === statusF)
    .filter(r => !search || r.username?.toLowerCase().includes(search.toLowerCase()) || r.ip?.includes(search))
    .filter(r => !dateF.from || r.loginTime >= dateF.from)
    .filter(r => !dateF.to   || r.loginTime <= dateF.to + 'T23:59:59')

  const agePercent = (ts) => {
    const age = Date.now() - new Date(ts).getTime()
    return Math.min(100, (age / DAYS_28) * 100)
  }

  return (
    <div>
      <div style={{ background:'rgba(74,9,24,0.04)', border:'1px solid rgba(74,9,24,0.1)', borderRadius:10, padding:'10px 14px', marginBottom:'1rem', display:'flex', alignItems:'center', gap:8 }}>
        <FiShield size={14} color={GOLD} />
        <p style={{ fontSize:'0.8rem', color:'rgba(74,9,24,0.6)' }}>Login logs are <strong>read-only</strong> and automatically deleted after <strong>28 days</strong>. Cannot be manually deleted.</p>
      </div>

      <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:'1rem', alignItems:'center' }}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Username or IP…"
          style={{ flex:'1 1 180px', border:'1.5px solid rgba(74,9,24,0.15)', borderRadius:8, outline:'none', padding:'7px 11px', fontSize:'0.82rem', color:MAROON, fontFamily:'Inter,sans-serif', background:'#FCFBFA' }} />
        <input type="date" value={dateF.from} onChange={e=>setDateF(f=>({...f,from:e.target.value}))}
          style={{ border:'1.5px solid rgba(74,9,24,0.15)', borderRadius:8, outline:'none', padding:'7px 10px', fontSize:'0.8rem', color:MAROON, fontFamily:'Inter,sans-serif', background:'#fff' }} />
        <span style={{ fontSize:'0.8rem', color:'rgba(74,9,24,0.4)' }}>to</span>
        <input type="date" value={dateF.to} onChange={e=>setDateF(f=>({...f,to:e.target.value}))}
          style={{ border:'1.5px solid rgba(74,9,24,0.15)', borderRadius:8, outline:'none', padding:'7px 10px', fontSize:'0.8rem', color:MAROON, fontFamily:'Inter,sans-serif', background:'#fff' }} />
        {['All','success','failed'].map(s => (
          <button key={s} onClick={()=>setStatusF(s)} style={{ padding:'5px 12px', borderRadius:100, border:`1.5px solid ${statusF===s?GOLD:'rgba(74,9,24,0.15)'}`, background:statusF===s?GOLD:'transparent', color:statusF===s?'#fff':(s==='failed'?'#DC2626':'rgba(74,9,24,0.6)'), fontSize:'0.72rem', fontWeight:600, cursor:'pointer', fontFamily:'Inter,sans-serif', textTransform:'capitalize' }}>
            {s==='All'?'All':s==='success'?'Success':'Failed'}
          </button>
        ))}
        <button onClick={load} style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'7px 11px', borderRadius:8, border:'1.5px solid rgba(74,9,24,0.18)', background:'#fff', color:MAROON, cursor:'pointer' }}><FiRefreshCw size={13}/></button>
      </div>

      <div style={{ background:'#fff', borderRadius:12, border:'1px solid rgba(74,9,24,0.1)', boxShadow:'0 2px 10px rgba(74,9,24,0.05)', overflow:'hidden' }}>
        <div style={{ padding:'0.65rem 1.1rem', borderBottom:'1px solid rgba(74,9,24,0.07)', fontSize:'0.75rem', color:'rgba(74,9,24,0.5)' }}>
          <strong style={{color:MAROON}}>{visible.length}</strong> of {rows.length} records
        </div>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead><tr>{['Status','Username','Login Time','Logout Time','IP Address','Device/Browser','Age (28d expiry)'].map(h=><th key={h} style={{padding:'9px 12px',textAlign:'left',fontFamily:"'Cinzel',serif",fontSize:'0.63rem',letterSpacing:'0.09em',color:'rgba(74,9,24,0.5)',fontWeight:600,borderBottom:'1px solid rgba(74,9,24,0.1)',background:'rgba(74,9,24,0.025)',whiteSpace:'nowrap'}}>{h}</th>)}</tr></thead>
            <tbody>
              {loading
                ? <tr><td colSpan={7} style={{textAlign:'center',padding:'2.5rem',color:'rgba(74,9,24,0.35)'}}>Loading…</td></tr>
                : visible.length===0
                  ? <tr><td colSpan={7} style={{textAlign:'center',padding:'2.5rem',fontSize:'0.85rem',color:'rgba(74,9,24,0.35)'}}><FiActivity size={28} style={{display:'block',margin:'0 auto 0.5rem',opacity:0.25}}/>No log records match filters</td></tr>
                  : visible.map((r,i)=>{
                      const age = agePercent(r.createdAt)
                      const isFailed = r.status === 'failed'
                      return (
                        <tr key={r.id} style={{borderBottom:'1px solid rgba(74,9,24,0.05)',background:i%2===0?'#fff':'rgba(252,251,250,0.6)'}}>
                          <td style={{padding:'9px 12px'}}>
                            <span style={{display:'inline-flex',alignItems:'center',gap:4,padding:'2px 8px',borderRadius:100,fontSize:'0.65rem',fontWeight:700,background:isFailed?'rgba(220,38,38,0.1)':'rgba(22,163,74,0.1)',color:isFailed?'#B91C1C':'#15803D'}}>
                              {isFailed ? <FiAlertCircle size={10}/> : <FiShield size={10}/>}
                              {isFailed ? 'Failed' : 'Success'}
                            </span>
                          </td>
                          <td style={{padding:'9px 12px',fontWeight:600,color:MAROON,fontSize:'0.83rem'}}>{r.username}</td>
                          <td style={{padding:'9px 12px',fontSize:'0.75rem',color:'rgba(74,9,24,0.6)',whiteSpace:'nowrap'}}>{new Date(r.loginTime).toLocaleString('en-LK')}</td>
                          <td style={{padding:'9px 12px',fontSize:'0.75rem',color:'rgba(74,9,24,0.5)',whiteSpace:'nowrap'}}>{r.logoutTime ? new Date(r.logoutTime).toLocaleString('en-LK') : '—'}</td>
                          <td style={{padding:'9px 12px',fontSize:'0.75rem',color:'rgba(74,9,24,0.55)',fontFamily:'monospace'}}>{r.ip}</td>
                          <td style={{padding:'9px 12px',fontSize:'0.72rem',color:'rgba(74,9,24,0.45)',maxWidth:180,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}} title={r.deviceInfo}>{r.deviceInfo}</td>
                          <td style={{padding:'9px 12px'}}>
                            <div style={{display:'flex',alignItems:'center',gap:8}}>
                              <div style={{flex:1,height:5,background:'rgba(74,9,24,0.08)',borderRadius:100,overflow:'hidden'}}>
                                <div style={{height:'100%',width:`${age}%`,background:age>80?'#DC2626':age>50?GOLD:'#16A34A',borderRadius:100,transition:'width 0.3s'}}/>
                              </div>
                              <span style={{fontSize:'0.65rem',color:'rgba(74,9,24,0.4)',whiteSpace:'nowrap'}}>{Math.round(age)}%</span>
                            </div>
                          </td>
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

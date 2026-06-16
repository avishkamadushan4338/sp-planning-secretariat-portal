import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowUp, FiSearch, FiPrinter, FiCheckCircle } from 'react-icons/fi'
import { getItems, issueItem, getIssued } from './smpApi'
import { useSMP } from './SMPContext'

const MAROON = '#4A0918'; const GOLD = '#C79A2B'; const CREAM = '#FCFBFA'
const BLANK_FORM = { qty:'', receiverName:'', receiverNIC:'', receiverDept:'', receiverPhone:'', purpose:'', approvedBy:'', carrierName:'', expectedReturnDate:'', note:'' }

export default function SMPIssue() {
  const { user } = useSMP()
  const [items,    setItems]   = useState([])
  const [issued,   setIssued]  = useState([])
  const [search,   setSearch]  = useState('')
  const [selected, setSel]     = useState(null)
  const [form,     setForm]    = useState(BLANK_FORM)
  const [saving,   setSaving]  = useState(false)
  const [slip,     setSlip]    = useState(null)
  const [err,      setErr]     = useState('')
  const [tab,      setTab]     = useState('issue') // 'issue' | 'history'

  useEffect(() => {
    getItems().then(r => setItems(r.data)).catch(()=>{})
    getIssued().then(r => setIssued(r.data)).catch(()=>{})
  }, [])

  const filtered = items.filter(i => {
    const q = search.toLowerCase()
    return !q || i.name.toLowerCase().includes(q) || i.sku.toLowerCase().includes(q)
  })

  const handleIssue = async e => {
    e.preventDefault()
    if (!selected)                            return setErr('Select an item')
    if (!form.qty || Number(form.qty) <= 0)   return setErr('Valid quantity required')
    if (!form.receiverName.trim())            return setErr('Receiver name required')
    if (!form.purpose.trim())                 return setErr('Purpose required')
    if (Number(form.qty) > selected.qty)      return setErr(`Only ${selected.qty} ${selected.unit} available`)
    setErr(''); setSaving(true)
    try {
      const { data } = await issueItem({ itemId: selected.id, ...form, qty: Number(form.qty) })
      setSlip({ ...data, issuedByName: user.name })
      setForm(BLANK_FORM); setSel(null)
      const [its, iss] = await Promise.all([getItems(), getIssued()])
      setItems(its.data); setIssued(iss.data)
    } catch(e) { setErr(e.response?.data?.error || 'Error') }
    finally { setSaving(false) }
  }

  const handlePrint = () => {
    const w = window.open('', '_blank')
    w.document.write(`
      <html><head><title>Issue Slip</title>
      <style>
        body{font-family:Arial,sans-serif;padding:30px;color:#1a1a1a}
        h2{color:#4A0918;border-bottom:2px solid #C79A2B;padding-bottom:8px;margin-bottom:20px}
        table{width:100%;border-collapse:collapse;margin:12px 0}
        td{padding:8px 10px;border:1px solid #ddd;font-size:13px}
        td:first-child{background:#fdf9f0;font-weight:600;width:35%}
        .header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:20px}
        .sign{margin-top:40px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px}
        .sign-box{border-top:1px solid #aaa;padding-top:8px;font-size:12px;color:#555}
        @media print{button{display:none}}
      </style></head><body>
      <div class="header">
        <div>
          <h2>Store Item Issue Slip</h2>
          <p style="font-size:12px;color:#666">Planning Secretariat — Southern Province, Sri Lanka</p>
        </div>
        <div style="text-align:right;font-size:12px;color:#555">
          <p><strong>Slip No:</strong> ${slip.id.slice(-8).toUpperCase()}</p>
          <p><strong>Date:</strong> ${new Date(slip.issuedAt).toLocaleString('en-LK')}</p>
        </div>
      </div>
      <h3 style="color:#4A0918;font-size:14px;margin-bottom:6px">Item Details</h3>
      <table><tbody>
        <tr><td>Item Name</td><td>${slip.itemName}</td></tr>
        <tr><td>SKU</td><td>${slip.sku}</td></tr>
        <tr><td>Quantity Issued</td><td>${slip.qty} ${slip.unit}</td></tr>
        <tr><td>Issued By</td><td>${slip.issuedBy}</td></tr>
      </tbody></table>
      <h3 style="color:#4A0918;font-size:14px;margin-bottom:6px;margin-top:16px">Receiver Details</h3>
      <table><tbody>
        <tr><td>Receiver Name</td><td>${slip.receiverName}</td></tr>
        <tr><td>NIC / Emp. ID</td><td>${slip.receiverNIC||'—'}</td></tr>
        <tr><td>Division</td><td>${slip.receiverDept||'—'}</td></tr>
        <tr><td>Contact</td><td>${slip.receiverPhone||'—'}</td></tr>
        <tr><td>Purpose</td><td>${slip.purpose}</td></tr>
        <tr><td>Approved By</td><td>${slip.approvedBy||'—'}</td></tr>
        <tr><td>Carrier</td><td>${slip.carrierName||'—'}</td></tr>
        ${slip.expectedReturnDate?`<tr><td>Expected Return</td><td>${slip.expectedReturnDate}</td></tr>`:''}
        ${slip.note?`<tr><td>Note</td><td>${slip.note}</td></tr>`:''}
      </tbody></table>
      <div class="sign">
        <div class="sign-box">Issued By<br/>${slip.issuedBy}</div>
        <div class="sign-box">Approved By<br/>${slip.approvedBy||'_______________'}</div>
        <div class="sign-box">Receiver Signature<br/>_______________</div>
      </div>
      <p style="margin-top:30px;font-size:11px;color:#aaa;text-align:center">Generated: ${new Date().toLocaleString('en-LK')} · Planning Secretariat Store Management System</p>
      </body></html>`)
    w.document.close(); w.print()
  }

  return (
    <div>
      <div style={{ display:'flex', gap:8, marginBottom:'1rem' }}>
        {['issue','history'].map(t => (
          <button key={t} onClick={()=>setTab(t)} style={{ padding:'7px 18px', borderRadius:8, border:`1.5px solid ${tab===t?GOLD:'rgba(74,9,24,0.15)'}`, background:tab===t?GOLD:'transparent', color:tab===t?'#fff':'rgba(74,9,24,0.6)', fontSize:'0.82rem', fontWeight:600, cursor:'pointer', fontFamily:'Inter,sans-serif', textTransform:'capitalize', transition:'all 0.15s' }}>
            {t === 'issue' ? 'Issue Items' : 'Issue History'}
          </button>
        ))}
      </div>

      {tab === 'issue' && (
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, alignItems:'start' }}>
          {/* Item picker */}
          <div style={{ background:'#fff', borderRadius:12, border:'1px solid rgba(74,9,24,0.1)', boxShadow:'0 2px 10px rgba(74,9,24,0.05)', overflow:'hidden' }}>
            <div style={{ padding:'1rem', borderBottom:'1px solid rgba(74,9,24,0.08)' }}>
              <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:'0.95rem', fontWeight:700, color:MAROON, marginBottom:'0.7rem' }}>Select Item</h3>
              <div style={{ position:'relative', border:'1.5px solid rgba(74,9,24,0.15)', borderRadius:8, display:'flex', alignItems:'center', background:CREAM }}>
                <FiSearch size={13} style={{ position:'absolute', left:10, color:'rgba(74,9,24,0.4)' }} />
                <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search…"
                  style={{ border:'none', outline:'none', background:'transparent', padding:'8px 8px 8px 30px', width:'100%', fontSize:'0.82rem', color:MAROON, fontFamily:'Inter,sans-serif' }} />
              </div>
            </div>
            <div style={{ maxHeight:380, overflowY:'auto' }}>
              {filtered.map(item => (
                <div key={item.id} onClick={() => { if(item.qty>0) setSel(item) }} style={{ padding:'10px 14px', borderBottom:'1px solid rgba(74,9,24,0.05)', cursor:item.qty>0?'pointer':'not-allowed', opacity:item.qty===0?0.45:1, background: selected?.id===item.id ? 'rgba(199,154,43,0.08)' : 'transparent', borderLeft: selected?.id===item.id ? `3px solid ${GOLD}` : '3px solid transparent', transition:'all 0.15s' }}>
                  <div style={{ display:'flex', justifyContent:'space-between' }}>
                    <div>
                      <p style={{ fontSize:'0.83rem', fontWeight:600, color:MAROON }}>{item.name}</p>
                      <p style={{ fontSize:'0.72rem', color:'rgba(74,9,24,0.5)' }}>{item.sku}</p>
                    </div>
                    <p style={{ fontSize:'0.88rem', fontWeight:700, color:item.qty===0?'#B91C1C':MAROON }}>{item.qty} {item.unit}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Issue form */}
          <div style={{ background:'#fff', borderRadius:12, border:'1px solid rgba(74,9,24,0.1)', boxShadow:'0 2px 10px rgba(74,9,24,0.05)', overflow:'hidden' }}>
            <div style={{ padding:'1rem 1.25rem', borderBottom:'1px solid rgba(74,9,24,0.08)', background:'rgba(74,9,24,0.02)' }}>
              <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:'0.95rem', fontWeight:700, color:MAROON, display:'flex', alignItems:'center', gap:8 }}><FiArrowUp size={16} color="#0EA5E9"/> Issue Form</h3>
              {selected && <p style={{ fontSize:'0.78rem', color:'rgba(74,9,24,0.5)', marginTop:'0.2rem' }}>Item: <strong style={{color:MAROON}}>{selected.name}</strong> ({selected.qty} available)</p>}
            </div>
            <form onSubmit={handleIssue} style={{ padding:'1.1rem 1.25rem', maxHeight:'65vh', overflowY:'auto' }}>
              {!selected && <p style={{ fontSize:'0.82rem', color:'rgba(74,9,24,0.4)', textAlign:'center', padding:'1.5rem' }}>← Select an item</p>}
              {selected && <>
                <AnimatePresence>
                  {err && <motion.p initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} style={{ fontSize:'0.78rem', color:'#DC2626', marginBottom:'0.75rem', padding:'7px 11px', background:'rgba(220,38,38,0.07)', borderRadius:7, border:'1px solid rgba(220,38,38,0.2)' }}>{err}</motion.p>}
                </AnimatePresence>
                {[
                  ['Quantity *', 'qty', 'number', `Max: ${selected.qty}`],
                  ['Receiver Name *', 'receiverName', 'text', 'Full name'],
                  ['NIC / Emp. ID', 'receiverNIC', 'text', 'Optional'],
                  ['Division', 'receiverDept', 'text', 'Optional'],
                  ['Contact No.', 'receiverPhone', 'tel', 'Optional'],
                  ['Purpose *', 'purpose', 'text', 'Reason for issuing'],
                  ['Approved By', 'approvedBy', 'text', 'Optional'],
                  ['Carrier Name', 'carrierName', 'text', 'If different from receiver'],
                  ['Expected Return', 'expectedReturnDate', 'date', ''],
                ].map(([label, key, type, ph]) => (
                  <FF key={key} label={label} value={form[key]} onChange={v=>setForm(f=>({...f,[key]:v}))} placeholder={ph} type={type} />
                ))}
                <FF label="Note" value={form.note} onChange={v=>setForm(f=>({...f,note:v}))} placeholder="Optional" />
                <button type="submit" disabled={saving} style={{ width:'100%', padding:'10px', borderRadius:9, border:'none', cursor:saving?'not-allowed':'pointer', background:`linear-gradient(135deg,${MAROON} 0%,#6E1528 100%)`, color:'#fff', fontSize:'0.82rem', fontWeight:700, fontFamily:"'Cinzel',serif", letterSpacing:'0.08em', boxShadow:'0 4px 14px rgba(74,9,24,0.28)', marginTop:'0.5rem' }}>
                  {saving ? 'Processing…' : 'Issue Item'}
                </button>
              </>}
            </form>
          </div>
        </div>
      )}

      {tab === 'history' && (
        <div style={{ background:'#fff', borderRadius:12, border:'1px solid rgba(74,9,24,0.1)', boxShadow:'0 2px 10px rgba(74,9,24,0.05)', overflow:'hidden' }}>
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse' }}>
              <thead><tr>{['Item','SKU','Qty','Issued To','Dept','Purpose','Issued By','Date',''].map(h=><th key={h} style={{padding:'9px 12px',textAlign:'left',fontFamily:"'Cinzel',serif",fontSize:'0.63rem',letterSpacing:'0.09em',color:'rgba(74,9,24,0.5)',fontWeight:600,borderBottom:'1px solid rgba(74,9,24,0.1)',background:'rgba(74,9,24,0.025)',whiteSpace:'nowrap'}}>{h}</th>)}</tr></thead>
              <tbody>
                {issued.length===0
                  ? <tr><td colSpan={9} style={{textAlign:'center',padding:'2.5rem',fontSize:'0.85rem',color:'rgba(74,9,24,0.35)'}}>No issue records yet</td></tr>
                  : issued.map((r,i)=>(
                    <tr key={r.id} style={{borderBottom:'1px solid rgba(74,9,24,0.05)',background:i%2===0?'#fff':'rgba(252,251,250,0.6)'}}>
                      <td style={{padding:'9px 12px',fontWeight:600,color:MAROON,fontSize:'0.82rem'}}>{r.itemName}</td>
                      <td style={{padding:'9px 12px'}}><code style={{fontSize:'0.7rem',color:'rgba(74,9,24,0.55)',background:'rgba(74,9,24,0.06)',padding:'1px 5px',borderRadius:4}}>{r.sku}</code></td>
                      <td style={{padding:'9px 12px',fontWeight:600,color:MAROON,fontSize:'0.85rem'}}>{r.qty} {r.unit}</td>
                      <td style={{padding:'9px 12px',fontSize:'0.8rem',color:'rgba(74,9,24,0.8)'}}>{r.receiverName}</td>
                      <td style={{padding:'9px 12px',fontSize:'0.78rem',color:'rgba(74,9,24,0.55)'}}>{r.receiverDept||'—'}</td>
                      <td style={{padding:'9px 12px',fontSize:'0.78rem',color:'rgba(74,9,24,0.6)',maxWidth:160,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{r.purpose}</td>
                      <td style={{padding:'9px 12px',fontSize:'0.78rem',color:'rgba(74,9,24,0.55)'}}>{r.issuedBy}</td>
                      <td style={{padding:'9px 12px',fontSize:'0.75rem',color:'rgba(74,9,24,0.45)',whiteSpace:'nowrap'}}>{new Date(r.issuedAt).toLocaleDateString('en-LK')}</td>
                      <td style={{padding:'9px 12px'}}><button onClick={()=>{ setSlip({...r,issuedByName:r.issuedBy}); setTab('issue') }} style={{fontSize:'0.72rem',padding:'3px 9px',borderRadius:6,border:`1px solid ${GOLD}`,background:'transparent',color:GOLD,cursor:'pointer',fontFamily:'Inter,sans-serif'}}>Reprint</button></td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Slip modal */}
      <AnimatePresence>
        {slip && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            style={{position:'fixed',inset:0,background:'rgba(30,5,12,0.55)',backdropFilter:'blur(4px)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:200,padding:'1rem'}}
            onClick={e=>{if(e.target===e.currentTarget)setSlip(null)}}>
            <motion.div initial={{opacity:0,y:24,scale:0.96}} animate={{opacity:1,y:0,scale:1,transition:{duration:0.35,ease:[0.16,1,0.3,1]}}} exit={{opacity:0,y:16}}
              style={{background:'#fff',borderRadius:16,boxShadow:'0 24px 64px rgba(0,0,0,0.22)',width:'100%',maxWidth:520,overflow:'hidden'}}>
              <div style={{padding:'1rem 1.5rem',borderBottom:'1px solid rgba(74,9,24,0.1)',background:'rgba(22,163,74,0.04)',display:'flex',alignItems:'center',gap:10}}>
                <FiCheckCircle size={18} color="#16A34A"/>
                <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:'1rem',fontWeight:700,color:MAROON}}>Item Issued Successfully</h3>
                <button onClick={()=>setSlip(null)} style={{marginLeft:'auto',background:'none',border:'none',cursor:'pointer',color:'rgba(74,9,24,0.4)',fontSize:'1.2rem'}}>×</button>
              </div>
              <div style={{padding:'1.25rem 1.5rem'}}>
                {[['Item',`${slip.itemName} (${slip.sku})`],['Qty Issued',`${slip.qty} ${slip.unit}`],['Issued To',slip.receiverName],['Dept',slip.receiverDept||'—'],['Purpose',slip.purpose],['Approved By',slip.approvedBy||'—'],['Date',new Date(slip.issuedAt).toLocaleString('en-LK')]].map(([k,v])=>(
                  <div key={k} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:'1px solid rgba(74,9,24,0.06)'}}>
                    <span style={{fontSize:'0.78rem',color:'rgba(74,9,24,0.5)',fontWeight:500}}>{k}</span>
                    <span style={{fontSize:'0.82rem',color:MAROON,fontWeight:600,textAlign:'right',maxWidth:'55%'}}>{v}</span>
                  </div>
                ))}
                <button onClick={handlePrint} style={{width:'100%',marginTop:'1rem',padding:'10px',borderRadius:9,border:'none',cursor:'pointer',background:`linear-gradient(135deg,${MAROON} 0%,#6E1528 100%)`,color:'#fff',fontSize:'0.82rem',fontWeight:600,display:'flex',alignItems:'center',justifyContent:'center',gap:8,fontFamily:'Inter,sans-serif',boxShadow:'0 4px 14px rgba(74,9,24,0.28)'}}>
                  <FiPrinter size={15}/> Print Issue Slip
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const FF = ({ label, value, onChange, placeholder, type='text' }) => {
  const [f,setF] = useState(false)
  return (
    <div style={{marginBottom:'0.75rem'}}>
      <label style={{display:'block',fontSize:'0.68rem',fontWeight:600,color:MAROON,letterSpacing:'0.07em',textTransform:'uppercase',marginBottom:'0.3rem'}}>{label}</label>
      <input type={type} value={value} onChange={e=>onChange(e.target.value)} onFocus={()=>setF(true)} onBlur={()=>setF(false)} placeholder={placeholder}
        style={{width:'100%',border:`1.5px solid ${f?GOLD:'rgba(74,9,24,0.18)'}`,borderRadius:8,outline:'none',padding:'7px 10px',fontSize:'0.835rem',color:MAROON,background:f?'rgba(199,154,43,0.02)':'#fff',fontFamily:'Inter,sans-serif',boxShadow:f?`0 0 0 3px rgba(199,154,43,0.1)`:'none',transition:'all 0.18s'}} />
    </div>
  )
}

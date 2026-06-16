import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiRepeat, FiCalendar, FiX } from 'react-icons/fi'
import { getItems, borrowItem, getBorrowed, returnItem, createReserv, getReservations, cancelReserv } from './smpApi'
import { useSMP } from './SMPContext'

const MAROON = '#4A0918'; const GOLD = '#C79A2B'
const TABS = ['Active Borrows','Return Item','Reservations','New Borrow']

function Modal({ title, onClose, children }) {
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      style={{position:'fixed',inset:0,background:'rgba(30,5,12,0.55)',backdropFilter:'blur(4px)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:200,padding:'1rem'}}
      onClick={e=>{if(e.target===e.currentTarget)onClose()}}>
      <motion.div initial={{opacity:0,y:24,scale:0.96}} animate={{opacity:1,y:0,scale:1,transition:{duration:0.35,ease:[0.16,1,0.3,1]}}} exit={{opacity:0,y:16}}
        style={{background:'#fff',borderRadius:16,boxShadow:'0 24px 64px rgba(0,0,0,0.22)',width:'100%',maxWidth:500,overflow:'hidden'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'1rem 1.5rem',borderBottom:'1px solid rgba(74,9,24,0.1)',background:'rgba(74,9,24,0.02)'}}>
          <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:'1rem',fontWeight:700,color:MAROON}}>{title}</h3>
          <button onClick={onClose} style={{background:'none',border:'none',cursor:'pointer',color:'rgba(74,9,24,0.4)',display:'flex',padding:4,borderRadius:6}}><FiX size={17}/></button>
        </div>
        <div style={{padding:'1.25rem 1.5rem 1.5rem',maxHeight:'80vh',overflowY:'auto'}}>{children}</div>
      </motion.div>
    </motion.div>
  )
}

const FF = ({ label, value, onChange, placeholder, type='text' }) => {
  const [f,setF] = useState(false)
  return (
    <div style={{marginBottom:'0.8rem'}}>
      <label style={{display:'block',fontSize:'0.68rem',fontWeight:600,color:MAROON,letterSpacing:'0.07em',textTransform:'uppercase',marginBottom:'0.3rem'}}>{label}</label>
      <input type={type} value={value} onChange={e=>onChange(e.target.value)} onFocus={()=>setF(true)} onBlur={()=>setF(false)} placeholder={placeholder}
        style={{width:'100%',border:`1.5px solid ${f?GOLD:'rgba(74,9,24,0.18)'}`,borderRadius:8,outline:'none',padding:'8px 11px',fontSize:'0.84rem',color:MAROON,background:f?'rgba(199,154,43,0.02)':'#fff',fontFamily:'Inter,sans-serif',boxShadow:f?`0 0 0 3px rgba(199,154,43,0.1)`:'none',transition:'all 0.18s'}} />
    </div>
  )
}

export default function SMPBorrow() {
  const { isStorekeeper } = useSMP()
  const [tab,       setTab]       = useState(0)
  const [items,     setItems]     = useState([])
  const [borrowed,  setBorrowed]  = useState([])
  const [reservations,setReserv]  = useState([])
  const [_loading,  setLoad]      = useState(true)
  const [modal,     setModal]     = useState(null) // 'return' | 'borrow' | 'reserve'
  const [target,    setTarget]    = useState(null)
  const [retForm,   setRetForm]   = useState({ returnCondition:'Good', returnNote:'' })
  const [borForm,   setBorForm]   = useState({ itemId:'', qty:'', borrowerName:'', borrowerNIC:'', borrowerDept:'', borrowerPhone:'', purpose:'', expectedReturnDate:'', approvedBy:'', note:'' })
  const [resForm,   setResForm]   = useState({ itemId:'', qty:'', reserverName:'', reserverDept:'', reserverPhone:'', reserveFrom:'', reserveTo:'', purpose:'', note:'' })
  const [saving,    setSaving]    = useState(false)
  const [err,       setErr]       = useState('')
  const [toast,     setToast]     = useState(null)

  const showToast = (msg, type='success') => { setToast({msg,type}); setTimeout(()=>setToast(null), 3000) }

  const load = useCallback(async () => {
    setLoad(true)
    try {
      const [it, br, rs] = await Promise.all([getItems(), getBorrowed(), getReservations()])
      setItems(it.data.filter(i => i.borrowable))
      setBorrowed(br.data)
      setReserv(rs.data)
    } finally { setLoad(false) }
  }, [])
  useEffect(() => { load() }, [load])

  const active   = borrowed.filter(b => b.status === 'borrowed')
  const returned = borrowed.filter(b => b.status === 'returned')

  const handleReturn = async () => {
    setSaving(true); setErr('')
    try {
      await returnItem(target.id, retForm)
      showToast('Item returned successfully')
      setModal(null); load()
    } catch(e) { setErr(e.response?.data?.error || 'Error') }
    finally { setSaving(false) }
  }

  const handleBorrow = async e => {
    e.preventDefault()
    if (!borForm.itemId || !borForm.qty || !borForm.borrowerName || !borForm.expectedReturnDate)
      return setErr('itemId, qty, borrower name and return date required')
    setSaving(true); setErr('')
    try {
      await borrowItem(borForm)
      showToast('Borrow record created')
      setModal(null); setBorForm({ itemId:'', qty:'', borrowerName:'', borrowerNIC:'', borrowerDept:'', borrowerPhone:'', purpose:'', expectedReturnDate:'', approvedBy:'', note:'' })
      load()
    } catch(e) { setErr(e.response?.data?.error || 'Error') }
    finally { setSaving(false) }
  }

  const handleReserve = async e => {
    e.preventDefault()
    setSaving(true); setErr('')
    try {
      await createReserv(resForm)
      showToast('Reservation created')
      setModal(null); load()
    } catch(e) { setErr(e.response?.data?.error || 'Error') }
    finally { setSaving(false) }
  }

  const handleCancelReserv = async id => {
    if (!confirm('Cancel this reservation?')) return
    try { await cancelReserv(id); showToast('Reservation cancelled', 'error'); load() }
    catch(e) { showToast(e.response?.data?.error || 'Error', 'error') }
  }

  const borrowableItems = items

  const TabBtn = ({ label, i }) => (
    <button onClick={() => setTab(i)} style={{ padding:'7px 16px', borderRadius:8, border:`1.5px solid ${tab===i?GOLD:'rgba(74,9,24,0.15)'}`, background:tab===i?GOLD:'transparent', color:tab===i?'#fff':'rgba(74,9,24,0.6)', fontSize:'0.8rem', fontWeight:600, cursor:'pointer', fontFamily:'Inter,sans-serif', transition:'all 0.15s', position:'relative' }}>
      {label}
    </button>
  )

  const BorrowCard = ({ b }) => {
    return (
      <div style={{ background:'#fff', borderRadius:10, border:'1px solid rgba(74,9,24,0.1)', padding:'12px 14px', marginBottom:10, boxShadow:'0 2px 8px rgba(74,9,24,0.05)' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8 }}>
          <div>
            <p style={{ fontWeight:700, color:MAROON, fontSize:'0.88rem' }}>{b.itemName}</p>
            <p style={{ fontSize:'0.72rem', color:'rgba(74,9,24,0.5)' }}>{b.sku} · {b.qty} {b.unit}</p>
          </div>
          <div style={{ textAlign:'right' }}>
            <span style={{ display:'inline-block', padding:'2px 8px', borderRadius:100, fontSize:'0.65rem', fontWeight:700, background:'rgba(99,102,241,0.1)', color:'#4F46E5' }}>BORROWED</span>
            <p style={{ fontSize:'0.7rem', color:'rgba(74,9,24,0.45)', marginTop:3 }}>Due: {new Date(b.expectedReturnDate).toLocaleDateString('en-LK')}</p>
          </div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:4, marginBottom:8 }}>
          {[['Borrower', b.borrowerName], ['Dept', b.borrowerDept||'—'], ['Purpose', b.purpose], ['Issued By', b.issuedBy]].map(([k,v])=>(
            <div key={k}><span style={{fontSize:'0.65rem',color:'rgba(74,9,24,0.4)',fontWeight:600}}>{k}: </span><span style={{fontSize:'0.72rem',color:'rgba(74,9,24,0.7)'}}>{v}</span></div>
          ))}
        </div>
        {isStorekeeper && (
          <button onClick={() => { setTarget(b); setRetForm({ returnCondition:'Good', returnNote:'' }); setModal('return') }}
            style={{ padding:'5px 14px', borderRadius:7, border:'none', cursor:'pointer', background:`linear-gradient(135deg,#15803D 0%,#16A34A 100%)`, color:'#fff', fontSize:'0.75rem', fontWeight:600, fontFamily:'Inter,sans-serif' }}>
            Mark Returned
          </button>
        )}
      </div>
    )
  }

  return (
    <div>
      <div style={{ display:'flex', gap:8, marginBottom:'1.25rem', flexWrap:'wrap', alignItems:'center' }}>
        {TABS.map((t,i) => <TabBtn key={t} label={t} i={i} />)}
        {isStorekeeper && (
          <div style={{ marginLeft:'auto', display:'flex', gap:8 }}>
            <button onClick={() => { setErr(''); setModal('borrow') }} style={{ padding:'7px 14px', borderRadius:8, border:'none', cursor:'pointer', background:`linear-gradient(135deg,${MAROON} 0%,#6E1528 100%)`, color:'#fff', fontSize:'0.8rem', fontWeight:600, fontFamily:'Inter,sans-serif', boxShadow:`0 3px 12px rgba(74,9,24,0.25)` }}>+ New Borrow</button>
            <button onClick={() => { setErr(''); setModal('reserve') }} style={{ padding:'7px 14px', borderRadius:8, border:`1.5px solid ${GOLD}`, cursor:'pointer', background:'transparent', color:GOLD, fontSize:'0.8rem', fontWeight:600, fontFamily:'Inter,sans-serif' }}>+ Reserve</button>
          </div>
        )}
      </div>

      {/* Active Borrows */}
      {tab === 0 && (
        <div>
          {active.length === 0 ? <Empty label="No active borrows"/> : active.map(b => <BorrowCard key={b.id} b={b}/>)}
        </div>
      )}

      {/* Return history */}
      {tab === 1 && (
        <div style={{ background:'#fff', borderRadius:12, border:'1px solid rgba(74,9,24,0.1)', boxShadow:'0 2px 10px rgba(74,9,24,0.05)', overflow:'hidden' }}>
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse' }}>
              <thead><tr>{['Item','Borrower','Qty','Borrowed','Returned','Condition',''].map(h=><th key={h} style={{padding:'9px 12px',textAlign:'left',fontFamily:"'Cinzel',serif",fontSize:'0.63rem',letterSpacing:'0.09em',color:'rgba(74,9,24,0.5)',fontWeight:600,borderBottom:'1px solid rgba(74,9,24,0.1)',background:'rgba(74,9,24,0.025)',whiteSpace:'nowrap'}}>{h}</th>)}</tr></thead>
              <tbody>
                {returned.length===0 ? <tr><td colSpan={7} style={{textAlign:'center',padding:'2.5rem',fontSize:'0.85rem',color:'rgba(74,9,24,0.35)'}}>No returned items yet</td></tr>
                  : returned.map((r,i)=>(
                    <tr key={r.id} style={{borderBottom:'1px solid rgba(74,9,24,0.05)',background:i%2===0?'#fff':'rgba(252,251,250,0.6)'}}>
                      <td style={{padding:'9px 12px',fontWeight:600,color:MAROON,fontSize:'0.82rem'}}>{r.itemName}</td>
                      <td style={{padding:'9px 12px',fontSize:'0.8rem',color:'rgba(74,9,24,0.7)'}}>{r.borrowerName}</td>
                      <td style={{padding:'9px 12px',fontSize:'0.85rem',fontWeight:600,color:MAROON}}>{r.qty} {r.unit}</td>
                      <td style={{padding:'9px 12px',fontSize:'0.75rem',color:'rgba(74,9,24,0.5)',whiteSpace:'nowrap'}}>{new Date(r.borrowedAt).toLocaleDateString('en-LK')}</td>
                      <td style={{padding:'9px 12px',fontSize:'0.75rem',color:'rgba(74,9,24,0.5)',whiteSpace:'nowrap'}}>{r.returnedAt?new Date(r.returnedAt).toLocaleDateString('en-LK'):'—'}</td>
                      <td style={{padding:'9px 12px'}}><span style={{fontSize:'0.7rem',fontWeight:600,padding:'2px 8px',borderRadius:100,background:r.returnCondition==='Damaged'?'rgba(220,38,38,0.1)':'rgba(22,163,74,0.1)',color:r.returnCondition==='Damaged'?'#B91C1C':'#15803D'}}>{r.returnCondition||'—'}</span></td>
                      <td style={{padding:'9px 12px',fontSize:'0.72rem',color:'rgba(74,9,24,0.45)'}}>{r.returnNote||''}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Reservations */}
      {tab === 2 && (
        <div>
          {reservations.filter(r=>r.status==='active').length===0
            ? <Empty label="No active reservations"/>
            : reservations.filter(r=>r.status==='active').map(r => (
              <div key={r.id} style={{ background:'#fff', borderRadius:10, border:'1px solid rgba(74,9,24,0.1)', padding:'12px 14px', marginBottom:8, display:'flex', alignItems:'center', gap:12, boxShadow:'0 2px 8px rgba(74,9,24,0.05)' }}>
                <FiCalendar size={20} color={GOLD} style={{flexShrink:0}}/>
                <div style={{flex:1}}>
                  <p style={{fontWeight:700,color:MAROON,fontSize:'0.87rem'}}>{r.itemName}</p>
                  <p style={{fontSize:'0.72rem',color:'rgba(74,9,24,0.5)'}}>{r.qty} {r.unit ? r.unit : ''} · Reserved by {r.reserverName} ({r.reserverDept||'—'})</p>
                  <p style={{fontSize:'0.7rem',color:'rgba(74,9,24,0.45)',marginTop:2}}>From: {new Date(r.reserveFrom).toLocaleDateString('en-LK')} → {new Date(r.reserveTo).toLocaleDateString('en-LK')}</p>
                </div>
                {isStorekeeper && <button onClick={()=>handleCancelReserv(r.id)} style={{padding:'4px 12px',borderRadius:7,border:'1px solid rgba(220,38,38,0.25)',background:'rgba(220,38,38,0.06)',color:'#DC2626',cursor:'pointer',fontSize:'0.73rem',fontWeight:600}}>Cancel</button>}
              </div>
            ))}
        </div>
      )}

      {/* New Borrow tab (button-triggered) */}
      {tab === 3 && <Empty label="Use the 'New Borrow' button above to create a borrow record"/>}

      {/* Return Modal */}
      <AnimatePresence>
        {modal==='return'&&target&&(
          <Modal title={`Return: ${target.itemName}`} onClose={()=>setModal(null)}>
            {err && <p style={{fontSize:'0.78rem',color:'#DC2626',marginBottom:'0.75rem',padding:'7px 11px',background:'rgba(220,38,38,0.07)',borderRadius:7,border:'1px solid rgba(220,38,38,0.2)'}}>{err}</p>}
            <FF label="Condition" value={retForm.returnCondition} onChange={v=>setRetForm(f=>({...f,returnCondition:v}))} placeholder="Good / Fair / Damaged"/>
            <FF label="Return Note" value={retForm.returnNote} onChange={v=>setRetForm(f=>({...f,returnNote:v}))} placeholder="Optional note"/>
            <div style={{display:'flex',justifyContent:'flex-end',gap:10,marginTop:'1rem',paddingTop:'1rem',borderTop:'1px solid rgba(74,9,24,0.08)'}}>
              <button onClick={()=>setModal(null)} style={ghostBtn}>Cancel</button>
              <button onClick={handleReturn} disabled={saving} style={primaryBtn}>{saving?'Processing…':'Confirm Return'}</button>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {/* New Borrow Modal */}
      <AnimatePresence>
        {modal==='borrow'&&(
          <Modal title="New Borrow Record" onClose={()=>setModal(null)}>
            {err && <p style={{fontSize:'0.78rem',color:'#DC2626',marginBottom:'0.75rem',padding:'7px 11px',background:'rgba(220,38,38,0.07)',borderRadius:7,border:'1px solid rgba(220,38,38,0.2)'}}>{err}</p>}
            <form onSubmit={handleBorrow}>
              <div style={{marginBottom:'0.8rem'}}>
                <label style={{display:'block',fontSize:'0.68rem',fontWeight:600,color:MAROON,letterSpacing:'0.07em',textTransform:'uppercase',marginBottom:'0.3rem'}}>Item *</label>
                <select value={borForm.itemId} onChange={e=>setBorForm(f=>({...f,itemId:e.target.value}))} style={{width:'100%',border:'1.5px solid rgba(74,9,24,0.18)',borderRadius:8,outline:'none',padding:'8px 11px',fontSize:'0.84rem',color:MAROON,background:'#fff',fontFamily:'Inter,sans-serif',cursor:'pointer'}}>
                  <option value="">— select item —</option>
                  {borrowableItems.map(i=><option key={i.id} value={i.id}>{i.name} (avail: {i.qty})</option>)}
                </select>
              </div>
              {[['Qty *','qty','number'],['Borrower Name *','borrowerName','text'],['NIC / Emp. ID','borrowerNIC','text'],['Division','borrowerDept','text'],['Phone','borrowerPhone','tel'],['Purpose','purpose','text'],['Expected Return *','expectedReturnDate','date'],['Approved By','approvedBy','text'],['Note','note','text']].map(([l,k,t])=>(
                <FF key={k} label={l} value={borForm[k]} onChange={v=>setBorForm(f=>({...f,[k]:v}))} type={t} placeholder=""/>
              ))}
              <div style={{display:'flex',justifyContent:'flex-end',gap:10,paddingTop:'1rem',borderTop:'1px solid rgba(74,9,24,0.08)'}}>
                <button type="button" onClick={()=>setModal(null)} style={ghostBtn}>Cancel</button>
                <button type="submit" disabled={saving} style={primaryBtn}>{saving?'Saving…':'Create Borrow'}</button>
              </div>
            </form>
          </Modal>
        )}
      </AnimatePresence>

      {/* Reserve Modal */}
      <AnimatePresence>
        {modal==='reserve'&&(
          <Modal title="New Reservation" onClose={()=>setModal(null)}>
            {err && <p style={{fontSize:'0.78rem',color:'#DC2626',marginBottom:'0.75rem',padding:'7px 11px',background:'rgba(220,38,38,0.07)',borderRadius:7,border:'1px solid rgba(220,38,38,0.2)'}}>{err}</p>}
            <form onSubmit={handleReserve}>
              <div style={{marginBottom:'0.8rem'}}>
                <label style={{display:'block',fontSize:'0.68rem',fontWeight:600,color:MAROON,letterSpacing:'0.07em',textTransform:'uppercase',marginBottom:'0.3rem'}}>Item *</label>
                <select value={resForm.itemId} onChange={e=>setResForm(f=>({...f,itemId:e.target.value}))} style={{width:'100%',border:'1.5px solid rgba(74,9,24,0.18)',borderRadius:8,outline:'none',padding:'8px 11px',fontSize:'0.84rem',color:MAROON,background:'#fff',fontFamily:'Inter,sans-serif',cursor:'pointer'}}>
                  <option value="">— select item —</option>
                  {borrowableItems.map(i=><option key={i.id} value={i.id}>{i.name}</option>)}
                </select>
              </div>
              {[['Qty *','qty','number'],['Reserver Name *','reserverName','text'],['Division','reserverDept','text'],['Phone','reserverPhone','tel'],['From *','reserveFrom','date'],['To *','reserveTo','date'],['Purpose','purpose','text'],['Note','note','text']].map(([l,k,t])=>(
                <FF key={k} label={l} value={resForm[k]} onChange={v=>setResForm(f=>({...f,[k]:v}))} type={t} placeholder=""/>
              ))}
              <div style={{display:'flex',justifyContent:'flex-end',gap:10,paddingTop:'1rem',borderTop:'1px solid rgba(74,9,24,0.08)'}}>
                <button type="button" onClick={()=>setModal(null)} style={ghostBtn}>Cancel</button>
                <button type="submit" disabled={saving} style={primaryBtn}>{saving?'Saving…':'Create Reservation'}</button>
              </div>
            </form>
          </Modal>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:20}} style={{position:'fixed',bottom:'1.5rem',right:'1.5rem',background:'#fff',border:`1.5px solid ${toast.type==='error'?'rgba(220,38,38,0.25)':'rgba(22,163,74,0.25)'}`,borderRadius:10,padding:'10px 16px',boxShadow:'0 8px 28px rgba(0,0,0,0.12)',zIndex:9999,fontSize:'0.82rem',color:MAROON,fontWeight:500,display:'flex',alignItems:'center',gap:8}}>{toast.msg}</motion.div>}
      </AnimatePresence>
    </div>
  )
}

const Empty = ({ label }) => <div style={{ textAlign:'center', padding:'3rem', background:'#fff', borderRadius:12, border:'1px solid rgba(74,9,24,0.08)', color:'rgba(74,9,24,0.35)', fontSize:'0.85rem' }}><FiRepeat size={28} style={{display:'block',margin:'0 auto 0.75rem',opacity:0.25}}/>{label}</div>
const primaryBtn = {display:'inline-flex',alignItems:'center',gap:6,padding:'8px 18px',borderRadius:8,border:'none',cursor:'pointer',background:`linear-gradient(135deg,${MAROON} 0%,#6E1528 100%)`,color:'#fff',fontSize:'0.8rem',fontWeight:600,boxShadow:`0 4px 14px rgba(74,9,24,0.25)`,fontFamily:'Inter,sans-serif'}
const ghostBtn   = {display:'inline-flex',alignItems:'center',gap:6,padding:'8px 14px',borderRadius:8,cursor:'pointer',border:'1.5px solid rgba(74,9,24,0.18)',background:'#fff',color:MAROON,fontSize:'0.8rem',fontWeight:500,fontFamily:'Inter,sans-serif'}

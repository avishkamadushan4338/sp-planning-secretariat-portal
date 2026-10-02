import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiEdit2, FiTrash2, FiX, FiUser, FiShield, FiEye } from 'react-icons/fi'
import { getUsers, createUser, updateUser, deleteUser } from './smpApi'
import { useSMP } from './SMPContext'

const MAROON = '#4A0918'; const GOLD = '#C79A2B'
const ROLES = ['admin','storekeeper','viewer']
const ROLE_CFG = {
  admin:       { label:'Admin',       color:'#DC2626', icon: FiShield, bg:'rgba(220,38,38,0.1)' },
  storekeeper: { label:'Store Keeper',color: GOLD,    icon: FiUser,   bg:'rgba(199,154,43,0.1)' },
  viewer:      { label:'Viewer',      color:'#6366F1', icon: FiEye,    bg:'rgba(99,102,241,0.1)' },
}
const BLANK = { username:'', password:'', name:'', email:'', role:'storekeeper', active:true }

function Modal({ title, onClose, children }) {
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      style={{position:'fixed',inset:0,background:'rgba(30,5,12,0.55)',backdropFilter:'blur(4px)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:200,padding:'1rem'}}
      onClick={e=>{if(e.target===e.currentTarget)onClose()}}>
      <motion.div initial={{opacity:0,y:24,scale:0.96}} animate={{opacity:1,y:0,scale:1,transition:{duration:0.35,ease:[0.16,1,0.3,1]}}} exit={{opacity:0,y:16}}
        style={{background:'#fff',borderRadius:16,boxShadow:'0 24px 64px rgba(0,0,0,0.22)',width:'100%',maxWidth:460,overflow:'hidden'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'1rem 1.5rem',borderBottom:'1px solid rgba(74,9,24,0.1)',background:'rgba(74,9,24,0.02)'}}>
          <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:'1rem',fontWeight:700,color:MAROON}}>{title}</h3>
          <button onClick={onClose} style={{background:'none',border:'none',cursor:'pointer',color:'rgba(74,9,24,0.4)',display:'flex',padding:4,borderRadius:6}}><FiX size={17}/></button>
        </div>
        <div style={{padding:'1.25rem 1.5rem 1.5rem',maxHeight:'80vh',overflowY:'auto'}}>{children}</div>
      </motion.div>
    </motion.div>
  )
}

const FF = ({ label, value, onChange, placeholder, type='text', required }) => {
  const [f,setF] = useState(false)
  return (
    <div style={{marginBottom:'0.85rem'}}>
      <label style={{display:'block',fontSize:'0.68rem',fontWeight:600,color:MAROON,letterSpacing:'0.07em',textTransform:'uppercase',marginBottom:'0.3rem'}}>{label}{required&&<span style={{color:'#DC2626'}}> *</span>}</label>
      <input type={type} value={value} onChange={e=>onChange(e.target.value)} onFocus={()=>setF(true)} onBlur={()=>setF(false)} placeholder={placeholder} required={required}
        style={{width:'100%',border:`1.5px solid ${f?GOLD:'rgba(74,9,24,0.18)'}`,borderRadius:8,outline:'none',padding:'8px 11px',fontSize:'0.845rem',color:MAROON,background:f?'rgba(199,154,43,0.02)':'#fff',fontFamily:'Inter,sans-serif',boxShadow:f?`0 0 0 3px rgba(199,154,43,0.1)`:'none',transition:'all 0.18s'}} />
    </div>
  )
}

export default function SMPUsers() {
  const { user: me } = useSMP()
  const [users,  setUsers]  = useState([])
  const [loading,setLoad]   = useState(true)
  const [modal,  setModal]  = useState(null)
  const [target, setTarget] = useState(null)
  const [form,   setForm]   = useState(BLANK)
  const [saving, setSaving] = useState(false)
  const [err,    setErr]    = useState('')
  const [toast,  setToast]  = useState(null)

  const showToast = (msg, type='success') => { setToast({msg,type}); setTimeout(()=>setToast(null), 3000) }

  const load = async () => { setLoad(true); try { const { data } = await getUsers(); setUsers(data) } finally { setLoad(false) } }
  useEffect(() => { load() }, [])

  const handleSave = async e => {
    e.preventDefault(); setSaving(true); setErr('')
    try {
      if (modal === 'add') {
        if (!form.username || !form.password || !form.name) { setErr('Username, password, and name are required'); setSaving(false); return }
        await createUser(form)
        showToast('User created')
      } else {
        const patch = { name: form.name, email: form.email, role: form.role, active: form.active }
        if (form.password) patch.password = form.password
        await updateUser(target.id, patch)
        showToast('User updated')
      }
      setModal(null); load()
    } catch(e) { setErr(e.response?.data?.error || 'Error') }
    finally { setSaving(false) }
  }

  const handleDelete = async () => {
    setSaving(true)
    try { await deleteUser(target.id); showToast('User deleted', 'error'); setModal(null); load() }
    catch(e) { setErr(e.response?.data?.error || 'Error') }
    finally { setSaving(false) }
  }

  const openAdd  = () => { setForm(BLANK); setErr(''); setTarget(null); setModal('add') }
  const openEdit = u  => { setForm({...u, password:''}); setErr(''); setTarget(u); setModal('edit') }
  const openDel  = u  => { setTarget(u); setErr(''); setModal('delete') }

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'flex-end', marginBottom:'1rem' }}>
        <button onClick={openAdd} style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'8px 16px', borderRadius:9, border:'none', cursor:'pointer', background:`linear-gradient(135deg,${MAROON} 0%,#6E1528 100%)`, color:'#fff', fontSize:'0.82rem', fontWeight:600, boxShadow:`0 4px 14px rgba(74,9,24,0.25)`, fontFamily:'Inter,sans-serif' }}>
          <FiPlus size={14}/> Add User
        </button>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:14 }}>
        {loading
          ? Array.from({length:3}).map((_,i)=><div key={i} style={{height:140,background:'#fff',borderRadius:12,border:'1px solid rgba(74,9,24,0.08)',animation:'pulse 1.5s ease-in-out infinite'}}/>)
          : users.map(u => {
              const rc = ROLE_CFG[u.role] || ROLE_CFG.viewer
              const isMe = u.id === me?.id
              return (
                <motion.div key={u.id} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}
                  style={{ background:'#fff', borderRadius:12, border:`1px solid ${isMe?'rgba(199,154,43,0.3)':'rgba(74,9,24,0.09)'}`, boxShadow: isMe ? '0 2px 14px rgba(199,154,43,0.12)' : '0 2px 10px rgba(74,9,24,0.05)', padding:'1.1rem 1.25rem', position:'relative', overflow:'hidden' }}>
                  {isMe && <div style={{position:'absolute',top:10,right:10,fontSize:'0.62rem',fontWeight:700,color:GOLD,background:'rgba(199,154,43,0.12)',padding:'2px 7px',borderRadius:100}}>YOU</div>}
                  <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:'0.9rem' }}>
                    <div style={{ width:44, height:44, borderRadius:'50%', background:rc.bg, border:`1.5px solid ${rc.color}33`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                      <rc.icon size={19} color={rc.color}/>
                    </div>
                    <div>
                      <p style={{ fontWeight:700, color:MAROON, fontSize:'0.9rem' }}>{u.name}</p>
                      <p style={{ fontSize:'0.72rem', color:'rgba(74,9,24,0.5)' }}>@{u.username}</p>
                    </div>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'0.75rem' }}>
                    <span style={{ fontSize:'0.7rem', fontWeight:700, padding:'2px 10px', borderRadius:100, background:rc.bg, color:rc.color }}>{rc.label}</span>
                    <span style={{ fontSize:'0.68rem', fontWeight:600, padding:'2px 8px', borderRadius:100, background:u.active?'rgba(22,163,74,0.1)':'rgba(220,38,38,0.1)', color:u.active?'#15803D':'#B91C1C' }}>{u.active?'Active':'Inactive'}</span>
                  </div>
                  {u.email && <p style={{ fontSize:'0.72rem', color:'rgba(74,9,24,0.45)', marginBottom:'0.75rem' }}>{u.email}</p>}
                  <div style={{ display:'flex', gap:8 }}>
                    <button onClick={()=>openEdit(u)} style={{ flex:1, padding:'6px', borderRadius:8, border:`1.5px solid ${GOLD}`, background:'transparent', color:GOLD, cursor:'pointer', fontSize:'0.75rem', fontWeight:600, display:'flex', alignItems:'center', justifyContent:'center', gap:5, fontFamily:'Inter,sans-serif' }}><FiEdit2 size={12}/> Edit</button>
                    {!isMe && <button onClick={()=>openDel(u)} style={{ flex:1, padding:'6px', borderRadius:8, border:'1.5px solid rgba(220,38,38,0.3)', background:'rgba(220,38,38,0.06)', color:'#DC2626', cursor:'pointer', fontSize:'0.75rem', fontWeight:600, display:'flex', alignItems:'center', justifyContent:'center', gap:5, fontFamily:'Inter,sans-serif' }}><FiTrash2 size={12}/> Delete</button>}
                  </div>
                </motion.div>
              )
            })}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {(modal==='add'||modal==='edit') && (
          <Modal title={modal==='add'?'Add New User':'Edit User'} onClose={()=>setModal(null)}>
            {err && <p style={{fontSize:'0.78rem',color:'#DC2626',marginBottom:'0.75rem',padding:'7px 11px',background:'rgba(220,38,38,0.07)',borderRadius:7,border:'1px solid rgba(220,38,38,0.2)'}}>{err}</p>}
            <form onSubmit={handleSave}>
              <FF label="Full Name" value={form.name} onChange={v=>setForm(f=>({...f,name:v}))} placeholder="Full name" required />
              {modal==='add' && <FF label="Username" value={form.username} onChange={v=>setForm(f=>({...f,username:v}))} placeholder="Login username" required />}
              <FF label={modal==='edit'?'New Password (leave blank to keep)':'Password'} value={form.password} onChange={v=>setForm(f=>({...f,password:v}))} type="password" placeholder="••••••••" required={modal==='add'} />
              <FF label="Email" value={form.email} onChange={v=>setForm(f=>({...f,email:v}))} placeholder="email@planning.lk" type="email" />
              <div style={{marginBottom:'0.85rem'}}>
                <label style={{display:'block',fontSize:'0.68rem',fontWeight:600,color:MAROON,letterSpacing:'0.07em',textTransform:'uppercase',marginBottom:'0.3rem'}}>Role *</label>
                <select value={form.role} onChange={e=>setForm(f=>({...f,role:e.target.value}))}
                  style={{width:'100%',border:'1.5px solid rgba(74,9,24,0.18)',borderRadius:8,outline:'none',padding:'8px 11px',fontSize:'0.845rem',color:MAROON,background:'#fff',fontFamily:'Inter,sans-serif',cursor:'pointer'}}>
                  {ROLES.map(r=><option key={r} value={r}>{ROLE_CFG[r].label}</option>)}
                </select>
              </div>
              <label style={{display:'flex',alignItems:'center',gap:8,cursor:'pointer',marginBottom:'1rem'}}>
                <div onClick={()=>setForm(f=>({...f,active:!f.active}))}
                  style={{width:18,height:18,borderRadius:5,border:`1.5px solid ${form.active?GOLD:'rgba(74,9,24,0.25)'}`,background:form.active?GOLD:'transparent',display:'flex',alignItems:'center',justifyContent:'center',transition:'all 0.18s',flexShrink:0}}>
                  {form.active&&<svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                <span style={{fontSize:'0.82rem',color:'rgba(74,9,24,0.7)'}}>Account active</span>
              </label>
              <div style={{display:'flex',justifyContent:'flex-end',gap:10,paddingTop:'1rem',borderTop:'1px solid rgba(74,9,24,0.08)'}}>
                <button type="button" onClick={()=>setModal(null)} style={ghostBtn}>Cancel</button>
                <button type="submit" disabled={saving} style={primaryBtn}>{saving?'Saving…':(modal==='add'?'Create User':'Save Changes')}</button>
              </div>
            </form>
          </Modal>
        )}
      </AnimatePresence>

      {/* Delete Modal */}
      <AnimatePresence>
        {modal==='delete'&&target&&(
          <Modal title="Delete User" onClose={()=>setModal(null)}>
            {err && <p style={{fontSize:'0.78rem',color:'#DC2626',marginBottom:'0.75rem'}}>{err}</p>}
            <div style={{textAlign:'center',padding:'0.5rem 0'}}>
              <div style={{width:50,height:50,borderRadius:'50%',background:'rgba(220,38,38,0.1)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 1rem'}}><FiTrash2 size={20} color="#DC2626"/></div>
              <p style={{fontSize:'0.87rem',color:'rgba(74,9,24,0.7)',lineHeight:1.7}}>Delete user <strong style={{color:MAROON}}>{target.name}</strong> (@{target.username})?<br/>This cannot be undone.</p>
            </div>
            <div style={{display:'flex',justifyContent:'center',gap:10,marginTop:'1.25rem',paddingTop:'1rem',borderTop:'1px solid rgba(74,9,24,0.08)'}}>
              <button onClick={()=>setModal(null)} style={ghostBtn}>Cancel</button>
              <button onClick={handleDelete} disabled={saving} style={{...primaryBtn,background:'linear-gradient(135deg,#B91C1C 0%,#DC2626 100%)',boxShadow:'0 4px 16px rgba(185,28,28,0.3)'}}>{saving?'Deleting…':'Delete User'}</button>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:20}} style={{position:'fixed',bottom:'1.5rem',right:'1.5rem',background:'#fff',border:`1.5px solid ${toast.type==='error'?'rgba(220,38,38,0.25)':'rgba(22,163,74,0.25)'}`,borderRadius:10,padding:'10px 16px',boxShadow:'0 8px 28px rgba(0,0,0,0.12)',zIndex:9999,fontSize:'0.82rem',color:MAROON,fontWeight:500}}>{toast.msg}</motion.div>}
      </AnimatePresence>
    </div>
  )
}

const primaryBtn = {display:'inline-flex',alignItems:'center',gap:6,padding:'8px 18px',borderRadius:8,border:'none',cursor:'pointer',background:`linear-gradient(135deg,${MAROON} 0%,#6E1528 100%)`,color:'#fff',fontSize:'0.8rem',fontWeight:600,boxShadow:`0 4px 14px rgba(74,9,24,0.25)`,fontFamily:'Inter,sans-serif'}
const ghostBtn   = {display:'inline-flex',alignItems:'center',gap:6,padding:'8px 14px',borderRadius:8,cursor:'pointer',border:'1.5px solid rgba(74,9,24,0.18)',background:'#fff',color:MAROON,fontSize:'0.8rem',fontWeight:500,fontFamily:'Inter,sans-serif'}

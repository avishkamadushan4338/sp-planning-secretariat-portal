import { useState, useEffect } from 'react'
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiGrid, FiPackage,
  FiList, FiFileText, FiUsers, FiLogOut, FiMenu, FiX, FiShield,
  FiActivity, FiChevronRight, FiUser, FiKey, FiEye, FiEyeOff,
  FiCheckCircle, FiAlertCircle, FiTrash2,
} from 'react-icons/fi'
import { SMPProvider, useSMP } from './SMPContext'
import { changePassword } from './smpApi'

const MAROON  = '#4A0918'
const MAROON2 = '#3A0712'
const GOLD    = '#C79A2B'
const SIDEBAR_W = 248

function buildNav(isAdmin, _isStorekeeper) {
  return [
    { label: 'Dashboard',     icon: FiGrid,         path: '/smp/dashboard'     },
    { label: 'Inventory',     icon: FiPackage,       path: '/smp/inventory'     },
    { label: 'Disposal',      icon: FiTrash2,        path: '/smp/disposal'      },
    { label: 'Transactions',  icon: FiList,          path: '/smp/transactions'  },
    { label: 'Reports',       icon: FiFileText,      path: '/smp/reports'       },
    ...(isAdmin ? [
      { label: 'Login Logs',  icon: FiActivity,      path: '/smp/login-logs'    },
      { label: 'Users',       icon: FiUsers,         path: '/smp/users'         },
    ] : []),
  ]
}

function Sidebar({ open, onClose }) {
  const { user, signOut, isAdmin, isStorekeeper } = useSMP()
  const navigate = useNavigate()
  const nav = buildNav(isAdmin, isStorekeeper)

  const [pwModal,  setPwModal]  = useState(false)
  const [pwForm,   setPwForm]   = useState({ current: '', next: '', confirm: '' })
  const [pwShow,   setPwShow]   = useState({ current: false, next: false, confirm: false })
  const [pwSaving, setPwSaving] = useState(false)
  const [pwErr,    setPwErr]    = useState('')
  const [pwOk,     setPwOk]     = useState(false)

  const openPwModal = () => {
    setPwForm({ current: '', next: '', confirm: '' })
    setPwErr(''); setPwOk(false); setPwModal(true)
  }

  const handlePwChange = async e => {
    e.preventDefault()
    if (!pwForm.current)                        return setPwErr('Current password is required')
    if (pwForm.next.length < 6)                 return setPwErr('New password must be at least 6 characters')
    if (pwForm.next !== pwForm.confirm)          return setPwErr('New passwords do not match')
    setPwSaving(true); setPwErr('')
    try {
      await changePassword({ currentPassword: pwForm.current, newPassword: pwForm.next })
      setPwOk(true)
      setTimeout(() => { setPwModal(false); setPwOk(false) }, 1800)
    } catch (err) {
      setPwErr(err.response?.data?.error || 'Failed to change password')
    } finally { setPwSaving(false) }
  }

  const handleLogout = async () => {
    await signOut()
    navigate('/smp', { replace: true })
  }

  const ROLE_COLORS = { admin: '#DC2626', storekeeper: GOLD, viewer: '#6366F1' }
  const roleColor   = ROLE_COLORS[user?.role] || GOLD

  const sidebarContent = (
    <div style={{ width: SIDEBAR_W, height: '100%', background: MAROON2, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      {/* Grid texture */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.04, pointerEvents: 'none' }}>
        <defs><pattern id="sg" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M 32 0 L 0 0 0 32" fill="none" stroke={GOLD} strokeWidth="0.5" />
        </pattern></defs>
        <rect width="100%" height="100%" fill="url(#sg)" />
      </svg>

      {/* Logo */}
      <div style={{ padding: '1.5rem 1.25rem 1rem', borderBottom: '1px solid rgba(199,154,43,0.15)', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${GOLD} 0%, #E8C55A 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <FiPackage size={18} color={MAROON2} />
          </div>
          <div>
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: '0.62rem', letterSpacing: '0.12em', color: GOLD, fontWeight: 700 }}>SMP</p>
            <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.2 }}>Store Management</p>
          </div>
          <button onClick={onClose} className="lg:hidden" style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', display: 'flex' }}>
            <FiX size={18} />
          </button>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 0.75rem', position: 'relative', zIndex: 1 }}>
        {nav.map(({ label, icon: Icon, path }) => (
          <NavLink key={path} to={path} onClick={onClose} style={{ textDecoration: 'none' }}>
            {({ isActive }) => (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 12px', borderRadius: 9, marginBottom: 2,
                background: isActive ? `rgba(199,154,43,0.15)` : 'transparent',
                border: isActive ? `1px solid rgba(199,154,43,0.25)` : '1px solid transparent',
                color: isActive ? '#fff' : 'rgba(255,255,255,0.5)',
                transition: 'all 0.15s', cursor: 'pointer',
              }}
                onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#fff' } }}
                onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)' } }}>
                <Icon size={15} style={{ color: isActive ? GOLD : 'inherit', flexShrink: 0 }} />
                <span style={{ fontSize: '0.82rem', fontWeight: isActive ? 600 : 400 }}>{label}</span>
                {isActive && <FiChevronRight size={12} style={{ marginLeft: 'auto', color: GOLD, opacity: 0.7 }} />}
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User info + logout */}
      <div style={{ padding: '0.75rem', borderTop: '1px solid rgba(199,154,43,0.15)', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: 10, marginBottom: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: `${roleColor}22`, border: `1.5px solid ${roleColor}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <FiUser size={14} color={roleColor} />
          </div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name || user?.username}</p>
            <p style={{ fontSize: '0.68rem', color: roleColor, fontWeight: 600, textTransform: 'capitalize' }}>{user?.role}</p>
          </div>
        </div>
        <button onClick={openPwModal} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 9, padding: '9px 12px', borderRadius: 9, border: `1px solid rgba(199,154,43,0.2)`, background: 'rgba(199,154,43,0.07)', color: GOLD, cursor: 'pointer', fontSize: '0.82rem', fontWeight: 500, fontFamily: 'Inter, sans-serif', marginBottom: 8, transition: 'all 0.15s' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(199,154,43,0.15)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(199,154,43,0.07)' }}>
          <FiKey size={14} /> Change Password
        </button>
        <button onClick={handleLogout} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 9, padding: '9px 12px', borderRadius: 9, border: '1px solid rgba(220,38,38,0.2)', background: 'rgba(220,38,38,0.07)', color: 'rgba(255,100,100,0.85)', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 500, fontFamily: 'Inter, sans-serif', transition: 'all 0.15s' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(220,38,38,0.15)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(220,38,38,0.07)' }}>
          <FiLogOut size={14} /> Sign Out
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:block" style={{ width: SIDEBAR_W, flexShrink: 0, height: '100vh', position: 'sticky', top: 0 }}>
        {sidebarContent}
      </div>
      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100 }}
            onClick={onClose}>
            <motion.div initial={{ x: -SIDEBAR_W }} animate={{ x: 0 }} exit={{ x: -SIDEBAR_W }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              style={{ width: SIDEBAR_W, height: '100%', position: 'absolute', left: 0 }}
              onClick={e => e.stopPropagation()}>
              {sidebarContent}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Change Password Modal */}
      <AnimatePresence>
        {pwModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
            onClick={() => setPwModal(false)}>
            <motion.div initial={{ scale: 0.94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.94, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 340, damping: 30 }}
              style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 380, padding: '1.75rem', boxShadow: '0 20px 60px rgba(74,9,24,0.18)' }}
              onClick={e => e.stopPropagation()}>

              {pwOk ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '1rem 0' }}>
                  <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(34,197,94,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FiCheckCircle size={26} color="#22C55E" />
                  </div>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', fontWeight: 700, color: MAROON }}>Password Changed</p>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(74,9,24,0.55)', textAlign: 'center' }}>Your password has been updated successfully.</p>
                </div>
              ) : (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.25rem' }}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: `rgba(199,154,43,0.12)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <FiKey size={18} color={GOLD} />
                    </div>
                    <div>
                      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', fontWeight: 700, color: MAROON, margin: 0 }}>Change Password</h2>
                      <p style={{ fontSize: '0.7rem', color: 'rgba(74,9,24,0.45)', margin: 0 }}>Update your account password</p>
                    </div>
                    <button onClick={() => setPwModal(false)} style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(74,9,24,0.4)', display: 'flex', padding: 4 }}>
                      <FiX size={18} />
                    </button>
                  </div>

                  <form onSubmit={handlePwChange} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {[
                      { key: 'current', label: 'Current Password' },
                      { key: 'next',    label: 'New Password' },
                      { key: 'confirm', label: 'Confirm New Password' },
                    ].map(({ key, label }) => (
                      <div key={key}>
                        <label style={{ fontSize: '0.73rem', fontWeight: 600, color: MAROON, display: 'block', marginBottom: 5 }}>{label}</label>
                        <div style={{ position: 'relative' }}>
                          <input
                            type={pwShow[key] ? 'text' : 'password'}
                            value={pwForm[key]}
                            onChange={e => setPwForm(f => ({ ...f, [key]: e.target.value }))}
                            placeholder={label}
                            style={{ width: '100%', padding: '9px 36px 9px 12px', border: '1.5px solid rgba(74,9,24,0.15)', borderRadius: 8, fontSize: '0.82rem', color: MAROON, background: '#FAFAFA', outline: 'none', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif' }}
                            onFocus={e => { e.target.style.borderColor = GOLD }}
                            onBlur={e => { e.target.style.borderColor = 'rgba(74,9,24,0.15)' }}
                          />
                          <button type="button" onClick={() => setPwShow(s => ({ ...s, [key]: !s[key] }))}
                            style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(74,9,24,0.4)', display: 'flex', padding: 0 }}>
                            {pwShow[key] ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                          </button>
                        </div>
                      </div>
                    ))}

                    {pwErr && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'rgba(220,38,38,0.07)', border: '1px solid rgba(220,38,38,0.2)', borderRadius: 8, padding: '8px 10px' }}>
                        <FiAlertCircle size={14} color="#DC2626" style={{ flexShrink: 0 }} />
                        <span style={{ fontSize: '0.75rem', color: '#DC2626' }}>{pwErr}</span>
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                      <button type="button" onClick={() => setPwModal(false)}
                        style={{ flex: 1, padding: '9px', borderRadius: 8, border: '1.5px solid rgba(74,9,24,0.15)', background: '#fff', color: 'rgba(74,9,24,0.6)', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 500, fontFamily: 'Inter, sans-serif' }}>
                        Cancel
                      </button>
                      <button type="submit" disabled={pwSaving}
                        style={{ flex: 1, padding: '9px', borderRadius: 8, border: 'none', background: pwSaving ? 'rgba(74,9,24,0.4)' : MAROON, color: '#fff', cursor: pwSaving ? 'not-allowed' : 'pointer', fontSize: '0.82rem', fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>
                        {pwSaving ? 'Saving…' : 'Update Password'}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function Topbar({ onMenuClick }) {
  const { user } = useSMP()
  const location = useLocation()
  const pageTitle = {
    '/smp/dashboard':    'Dashboard',
    '/smp/inventory':    'Inventory',
    '/smp/disposal':     'Disposal Management',
    '/smp/transactions': 'Transaction History',
    '/smp/reports':      'Reports',
    '/smp/login-logs':   'Login Logs',
    '/smp/users':        'User Management',
  }[location.pathname] || 'Store Management'

  return (
    <div style={{ height: 60, background: '#fff', borderBottom: '1px solid rgba(74,9,24,0.1)', display: 'flex', alignItems: 'center', paddingInline: '1.25rem', gap: 14, flexShrink: 0, position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 1px 8px rgba(74,9,24,0.06)' }}>
      <button className="lg:hidden" onClick={onMenuClick} style={{ background: 'none', border: 'none', cursor: 'pointer', color: MAROON, display: 'flex', padding: 4 }}>
        <FiMenu size={20} />
      </button>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: GOLD }} />
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', fontWeight: 700, color: MAROON }}>{pageTitle}</h1>
      </div>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(74,9,24,0.05)', border: '1px solid rgba(74,9,24,0.1)', borderRadius: 100, padding: '4px 12px' }}>
          <FiShield size={11} color={GOLD} />
          <span style={{ fontSize: '0.7rem', color: MAROON, fontWeight: 600, textTransform: 'capitalize' }}>{user?.role}</span>
        </div>
        <div style={{ fontSize: '0.78rem', color: 'rgba(74,9,24,0.5)', fontWeight: 500 }}>{user?.name}</div>
      </div>
    </div>
  )
}

function Guard({ children }) {
  const { user } = useSMP()
  const navigate  = useNavigate()
  useEffect(() => {
    if (!user) navigate('/smp', { replace: true })
  }, [user, navigate])
  if (!user) return null
  return children
}

function Shell() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <Guard>
      <div style={{ display: 'flex', minHeight: '100vh', background: '#F3F0EE', fontFamily: 'Inter, sans-serif' }}>
        <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
          <Topbar onMenuClick={() => setMenuOpen(true)} />
          <main style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
            <Outlet />
          </main>
        </div>
      </div>
    </Guard>
  )
}

export default function SMPLayout() {
  return <SMPProvider><Shell /></SMPProvider>
}

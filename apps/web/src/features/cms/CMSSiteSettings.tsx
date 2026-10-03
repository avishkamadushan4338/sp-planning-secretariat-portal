import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { FiCheck, FiRefreshCw } from 'react-icons/fi'
import { cmsApi, type CmsEditorItem } from './cmsContentApi'
import { CmsPublishBar } from './shared/CmsPublishBar'

const MAROON = '#4A0918'

const EMPTY = {
  address: '', phone: '', fax: '', email: '',
  hours: { en: '', si: '', ta: '' },
  socialLinks: { facebook: '', youtube: '', linkedin: '' },
}

export default function CMSSiteSettings() {
  const [item,    setItem]    = useState<CmsEditorItem | null>(null)
  const [form,    setForm]    = useState(EMPTY)
  const [loading, setLoading] = useState(true)
  const [langTab, setLangTab] = useState('en')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await cmsApi.getSingleton('siteSettings')
      const editorItem = res as CmsEditorItem
      setItem(editorItem)
      setForm({ ...EMPTY, ...((editorItem.data as any) || {}) })
    } catch {
      toast.error('Failed to load site settings.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const set     = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const setLang = (k, lang, v) => setForm(f => ({ ...f, [k]: { ...f[k], [lang]: v } }))
  const setSocial = (k, v) => setForm(f => ({ ...f, socialLinks: { ...f.socialLinks, [k]: v } }))

  const handleSave = async (note?: string) => {
    try {
      await cmsApi.saveDraft({
        contentType: 'siteSettings',
        data: form,
        note,
      })
      toast.success('Site settings draft saved')
      await load()
    } catch {
      toast.error('Failed to save site settings.')
      throw new Error('Save failed')
    }
  }

  if (loading) {
    return <div style={{ padding: '4rem', textAlign: 'center', color: 'rgba(74,9,24,0.4)' }}><FiRefreshCw size={22} style={{ animation: 'spin 0.9s linear infinite' }} /></div>
  }

  return (
    <div style={{ maxWidth: 640 }}>
      <div style={{ marginBottom: '1.25rem' }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.35rem', fontWeight: 800, color: MAROON, marginBottom: 4 }}>Site Settings</h1>
        <p style={{ fontSize: '0.78rem', color: 'rgba(74,9,24,0.45)', margin: 0 }}>
          Office contact info shown in the Navbar, Footer, and Contact page — edited once, used everywhere.
        </p>
      </div>

      <div style={{ background: '#fff', borderRadius: 16, border: '1px solid rgba(74,9,24,0.07)', boxShadow: '0 2px 12px rgba(74,9,24,0.05)', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <FieldInput label="Address" value={form.address} onChange={v => set('address', v)} placeholder="153B, S.H. Dahanayaka Mawatha, Galle, Sri Lanka" />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <FieldInput label="Phone" value={form.phone} onChange={v => set('phone', v)} placeholder="+94 912234503" />
          <FieldInput label="Fax" value={form.fax} onChange={v => set('fax', v)} placeholder="+94 912246554" />
        </div>
        <FieldInput label="Email" value={form.email} onChange={v => set('email', v)} placeholder="spdcsp@gmail.com" />

        <div>
          <LabelEl>Office Hours</LabelEl>
          <div style={{ display: 'flex', gap: 4, background: 'rgba(74,9,24,0.05)', borderRadius: 10, padding: 4, width: 'fit-content', marginBottom: 8 }}>
            {[['en', 'English'], ['si', 'සිංහල'], ['ta', 'தமிழ்']].map(([code, lbl]) => (
              <button key={code} onClick={() => setLangTab(code)}
                style={{ padding: '5px 14px', borderRadius: 7, border: 'none', cursor: 'pointer', background: langTab === code ? '#fff' : 'transparent', color: langTab === code ? MAROON : 'rgba(74,9,24,0.42)', fontWeight: langTab === code ? 700 : 400, fontSize: '0.76rem', fontFamily: 'Inter, sans-serif' }}>
                {lbl}
              </button>
            ))}
          </div>
          <input type="text" value={form.hours[langTab]} onChange={e => setLang('hours', langTab, e.target.value)} placeholder="Mon – Fri: 8:30 AM – 4:30 PM"
            style={{ width: '100%', padding: '9px 12px', borderRadius: 10, boxSizing: 'border-box', border: '1px solid rgba(74,9,24,0.14)', outline: 'none', fontSize: '0.82rem', color: MAROON, fontFamily: 'Inter, sans-serif', background: '#fff' }} />
        </div>

        <div style={{ borderTop: '1px dashed rgba(74,9,24,0.15)', paddingTop: '1rem' }}>
          <LabelEl>Social Media Links</LabelEl>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
            <FieldInput label="Facebook" value={form.socialLinks.facebook} onChange={v => setSocial('facebook', v)} placeholder="https://www.facebook.com/..." />
            <FieldInput label="YouTube" value={form.socialLinks.youtube} onChange={v => setSocial('youtube', v)} placeholder="https://www.youtube.com/..." />
            <FieldInput label="LinkedIn" value={form.socialLinks.linkedin} onChange={v => setSocial('linkedin', v)} placeholder="https://www.linkedin.com/..." />
          </div>
        </div>

        <div style={{ paddingTop: '0.5rem' }}>
          <CmsPublishBar
            item={item}
            onSave={handleSave}
            onChanged={load}
          />
        </div>
      </div>
    </div>
  )
}

function LabelEl({ children }) {
  return <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: 'rgba(74,9,24,0.55)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem', fontFamily: 'Inter, sans-serif' }}>{children}</label>
}

function FieldInput({ label, value, onChange, placeholder }) {
  return (
    <div>
      <LabelEl>{label}</LabelEl>
      <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{ width: '100%', padding: '9px 12px', borderRadius: 10, boxSizing: 'border-box', border: '1px solid rgba(74,9,24,0.14)', outline: 'none', fontSize: '0.82rem', color: MAROON, fontFamily: 'Inter, sans-serif', background: '#fff' }} />
    </div>
  )
}

import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { FiCheck, FiRefreshCw } from 'react-icons/fi'
import { cmsApi, type CmsEditorItem } from './cmsContentApi'
import { CmsPublishBar } from './shared/CmsPublishBar'

const MAROON = '#4A0918'

const EMPTY_LANG_BLOCK = { sectionLabel: '', intro: '', duties: '' }
const EMPTY_FORM = { en: { ...EMPTY_LANG_BLOCK }, si: { ...EMPTY_LANG_BLOCK }, ta: { ...EMPTY_LANG_BLOCK } }

const listToText = (arr) => (arr || []).join('\n')
const textToList = (text) => text.split('\n').map(s => s.trim()).filter(Boolean)

export default function CMSAboutFunctions() {
  const [item,    setItem]    = useState<CmsEditorItem | null>(null)
  const [form,    setForm]    = useState(EMPTY_FORM)
  const [loading, setLoading] = useState(true)
  const [langTab, setLangTab] = useState('en')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await cmsApi.getSingleton('aboutFunctions')
      const editorItem = res as CmsEditorItem
      setItem(editorItem)
      const data = (editorItem.data as any) || {}
      setForm({
        en: { sectionLabel: data.en?.sectionLabel || '', intro: data.en?.intro || '', duties: listToText(data.en?.duties) },
        si: { sectionLabel: data.si?.sectionLabel || '', intro: data.si?.intro || '', duties: listToText(data.si?.duties) },
        ta: { sectionLabel: data.ta?.sectionLabel || '', intro: data.ta?.intro || '', duties: listToText(data.ta?.duties) },
      })
    } catch {
      toast.error('Failed to load Functions & Duties content.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const setLang = (lang, key, v) => setForm(f => ({ ...f, [lang]: { ...f[lang], [key]: v } }))

  const handleSave = async (note?: string) => {
    try {
      const payload = {
        en: { sectionLabel: form.en.sectionLabel, intro: form.en.intro, duties: textToList(form.en.duties) },
        si: { sectionLabel: form.si.sectionLabel, intro: form.si.intro, duties: textToList(form.si.duties) },
        ta: { sectionLabel: form.ta.sectionLabel, intro: form.ta.intro, duties: textToList(form.ta.duties) },
      }
      await cmsApi.saveDraft({
        contentType: 'aboutFunctions',
        data: payload,
        note,
      })
      toast.success('Functions & Duties draft saved')
      await load()
    } catch {
      toast.error('Failed to save Functions & Duties draft.')
      throw new Error('Save failed')
    }
  }

  if (loading) {
    return <div style={{ padding: '4rem', textAlign: 'center', color: 'rgba(74,9,24,0.4)' }}><FiRefreshCw size={22} style={{ animation: 'spin 0.9s linear infinite' }} /></div>
  }

  return (
    <div style={{ maxWidth: 640 }}>
      <div style={{ marginBottom: '1.25rem' }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.35rem', fontWeight: 800, color: MAROON, marginBottom: 4 }}>About: Functions &amp; Duties</h1>
        <p style={{ fontSize: '0.78rem', color: 'rgba(74,9,24,0.45)', margin: 0 }}>Edits the &quot;Functions &amp; Duties&quot; page under About.</p>
      </div>

      <div style={{ background: '#fff', borderRadius: 16, border: '1px solid rgba(74,9,24,0.07)', boxShadow: '0 2px 12px rgba(74,9,24,0.05)', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: 4, background: 'rgba(74,9,24,0.05)', borderRadius: 10, padding: 4, width: 'fit-content' }}>
          {[['en', 'English'], ['si', 'සිංහල'], ['ta', 'தமிழ்']].map(([code, lbl]) => (
            <button key={code} onClick={() => setLangTab(code)}
              style={{ padding: '5px 14px', borderRadius: 7, border: 'none', cursor: 'pointer', background: langTab === code ? '#fff' : 'transparent', color: langTab === code ? MAROON : 'rgba(74,9,24,0.42)', fontWeight: langTab === code ? 700 : 400, fontSize: '0.76rem', fontFamily: 'Inter, sans-serif' }}>
              {lbl}
            </button>
          ))}
        </div>

        <FieldInput label={`Section Label (${langTab.toUpperCase()})`} value={form[langTab].sectionLabel} onChange={v => setLang(langTab, 'sectionLabel', v)} />
        <FieldTextarea label={`Intro Paragraph (${langTab.toUpperCase()})`} value={form[langTab].intro} onChange={v => setLang(langTab, 'intro', v)} rows={3} />
        <FieldTextarea label={`Duties (${langTab.toUpperCase()}) — one per line`} value={form[langTab].duties} onChange={v => setLang(langTab, 'duties', v)} rows={10} />

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

function FieldTextarea({ label, value, onChange, rows = 3 }) {
  return (
    <div>
      <LabelEl>{label}</LabelEl>
      <textarea value={value} onChange={e => onChange(e.target.value)} rows={rows}
        style={{ width: '100%', padding: '9px 12px', borderRadius: 10, boxSizing: 'border-box', border: '1px solid rgba(74,9,24,0.14)', outline: 'none', fontSize: '0.82rem', color: MAROON, fontFamily: 'Inter, sans-serif', background: '#fff', resize: 'vertical' }} />
    </div>
  )
}

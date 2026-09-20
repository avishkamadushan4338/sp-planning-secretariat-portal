import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { FiCheck, FiRefreshCw, FiImage, FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { homeContentApi, staffApi } from './cmsContentApi'
import { uploadImage } from './cmsApi'
import { resolveUploadUrl } from '@/shared/utils/resolveUploadUrl'

const MAROON = '#4A0918'
const GOLD   = '#C79A2B'

const EMPTY_LANG = { en: '', si: '', ta: '' }
const EMPTY_SLIDE = {
  image: '', accent: { ...EMPTY_LANG }, line1: { ...EMPTY_LANG }, line2: { ...EMPTY_LANG }, line3: { ...EMPTY_LANG },
  body: { ...EMPTY_LANG },
  btn1: { label: { ...EMPTY_LANG }, path: '' },
  btn2: { label: { ...EMPTY_LANG }, path: '' },
}
const EMPTY_FORM = {
  heroSlides: [{ ...EMPTY_SLIDE }, { ...EMPTY_SLIDE }, { ...EMPTY_SLIDE }],
  aboutSecretariat: {
    eyebrow: { ...EMPTY_LANG }, title: { ...EMPTY_LANG }, subtitle: { ...EMPTY_LANG }, body: { ...EMPTY_LANG },
    image: '', statCard: { value: '', label: { ...EMPTY_LANG } },
  },
  deputySecretaryStaffId: null,
  deputySecretaryMessage: { ...EMPTY_LANG },
}

export default function CMSHomeContent() {
  const [form,       setForm]       = useState(EMPTY_FORM)
  const [staff,      setStaff]      = useState([])
  const [loading,     setLoading]   = useState(true)
  const [saving,      setSaving]    = useState(false)
  const [openSlide,   setOpenSlide] = useState(0)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const [homeRes, staffRes] = await Promise.all([homeContentApi.get(), staffApi.list()])
      const data = homeRes.data
      setForm({
        ...EMPTY_FORM,
        ...data,
        heroSlides: data.heroSlides?.length ? data.heroSlides : EMPTY_FORM.heroSlides,
        aboutSecretariat: { ...EMPTY_FORM.aboutSecretariat, ...data.aboutSecretariat },
        deputySecretaryMessage: { ...EMPTY_LANG, ...data.deputySecretaryMessage },
      })
      setStaff(staffRes.data)
    } catch {
      toast.error('Failed to load home content.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const updateSlide = (idx, patch) => {
    setForm(f => ({ ...f, heroSlides: f.heroSlides.map((s, i) => i === idx ? { ...s, ...patch } : s) }))
  }
  const updateSlideLang = (idx, key, lang, v) => {
    setForm(f => ({ ...f, heroSlides: f.heroSlides.map((s, i) => i === idx ? { ...s, [key]: { ...s[key], [lang]: v } } : s) }))
  }
  const updateSlideBtn = (idx, btnKey, field, v) => {
    setForm(f => ({ ...f, heroSlides: f.heroSlides.map((s, i) => i === idx ? { ...s, [btnKey]: { ...s[btnKey], [field]: v } } : s) }))
  }
  const updateSlideBtnLabel = (idx, btnKey, lang, v) => {
    setForm(f => ({ ...f, heroSlides: f.heroSlides.map((s, i) => i === idx ? { ...s, [btnKey]: { ...s[btnKey], label: { ...s[btnKey].label, [lang]: v } } } : s) }))
  }

  const uploadSlideImage = async (idx, file) => {
    try {
      const res = await uploadImage(file)
      updateSlide(idx, { image: res.data.url })
    } catch {
      toast.error('Failed to upload hero image.')
    }
  }

  const setAbout = (patch) => setForm(f => ({ ...f, aboutSecretariat: { ...f.aboutSecretariat, ...patch } }))
  const setAboutLang = (key, lang, v) => setForm(f => ({ ...f, aboutSecretariat: { ...f.aboutSecretariat, [key]: { ...f.aboutSecretariat[key], [lang]: v } } }))

  const uploadAboutImage = async (file) => {
    try {
      const res = await uploadImage(file)
      setAbout({ image: res.data.url })
    } catch {
      toast.error('Failed to upload about-section image.')
    }
  }

  const setMessage = (lang, v) => setForm(f => ({ ...f, deputySecretaryMessage: { ...f.deputySecretaryMessage, [lang]: v } }))

  const handleSave = async () => {
    setSaving(true)
    try {
      await homeContentApi.save(form)
      toast.success('Home content saved')
    } catch {
      toast.error('Failed to save home content.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div style={{ padding: '4rem', textAlign: 'center', color: 'rgba(74,9,24,0.4)' }}><FiRefreshCw size={22} style={{ animation: 'spin 0.9s linear infinite' }} /></div>
  }

  return (
    <div style={{ maxWidth: 720 }}>
      <div style={{ marginBottom: '1.25rem' }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.35rem', fontWeight: 800, color: MAROON, marginBottom: 4 }}>Home Page Content</h1>
        <p style={{ fontSize: '0.78rem', color: 'rgba(74,9,24,0.45)', margin: 0 }}>Hero slider, about-secretariat blurb, and the Deputy Secretary&apos;s message.</p>
      </div>

      {/* Hero Slides */}
      <SectionCard title="Hero Slides">
        {form.heroSlides.map((slide, idx) => (
          <SlideEditor
            key={idx} idx={idx} slide={slide}
            open={openSlide === idx} onToggle={() => setOpenSlide(openSlide === idx ? -1 : idx)}
            onChangeLang={(key, lang, v) => updateSlideLang(idx, key, lang, v)}
            onChangeBtn={(btnKey, field, v) => updateSlideBtn(idx, btnKey, field, v)}
            onChangeBtnLabel={(btnKey, lang, v) => updateSlideBtnLabel(idx, btnKey, lang, v)}
            onUploadImage={(file) => uploadSlideImage(idx, file)}
          />
        ))}
      </SectionCard>

      {/* About Secretariat */}
      <SectionCard title="About Secretariat (Home Page)">
        <ImagePicker image={form.aboutSecretariat.image} onUpload={uploadAboutImage} />
        <LangTabbedField label="Eyebrow" value={form.aboutSecretariat.eyebrow} onChange={(lang, v) => setAboutLang('eyebrow', lang, v)} />
        <LangTabbedField label="Title" value={form.aboutSecretariat.title} onChange={(lang, v) => setAboutLang('title', lang, v)} />
        <LangTabbedField label="Subtitle" value={form.aboutSecretariat.subtitle} onChange={(lang, v) => setAboutLang('subtitle', lang, v)} textarea />
        <LangTabbedField label="Body" value={form.aboutSecretariat.body} onChange={(lang, v) => setAboutLang('body', lang, v)} textarea rows={4} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '0.75rem' }}>
          <FieldInput label="Stat Value" value={form.aboutSecretariat.statCard?.value || ''} onChange={v => setAbout({ statCard: { ...form.aboutSecretariat.statCard, value: v } })} placeholder="e.g. 3 Divisions" />
          <LangTabbedField label="Stat Label" value={form.aboutSecretariat.statCard?.label || EMPTY_LANG} onChange={(lang, v) => setAbout({ statCard: { ...form.aboutSecretariat.statCard, label: { ...form.aboutSecretariat.statCard?.label, [lang]: v } } })} />
        </div>
      </SectionCard>

      {/* Deputy Secretary Message */}
      <SectionCard title="Deputy Secretary's Message (Home Page)">
        <div>
          <LabelEl>Deputy Secretary</LabelEl>
          <select value={form.deputySecretaryStaffId || ''} onChange={e => setForm(f => ({ ...f, deputySecretaryStaffId: e.target.value || null }))} style={selectStyle}>
            <option value="">— Select from Staff Directory —</option>
            {staff.map(s => <option key={s.id} value={s.id}>{s.name?.en} — {s.position?.en}</option>)}
          </select>
          <p style={{ fontSize: '0.72rem', color: 'rgba(74,9,24,0.4)', marginTop: 6 }}>
            Name, position, and photo are pulled from the selected Staff Directory record.
          </p>
        </div>
        <LangTabbedField label="Message" value={form.deputySecretaryMessage} onChange={setMessage} textarea rows={5} />
      </SectionCard>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <motion.button whileHover={!saving ? { y: -1.5, boxShadow: '0 8px 22px rgba(74,9,24,0.34)' } : {}} whileTap={!saving ? { scale: 0.97 } : {}}
          onClick={handleSave} disabled={saving}
          style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 26px', borderRadius: 10, border: 'none', background: `linear-gradient(135deg, ${MAROON} 0%, #6E1528 100%)`, color: '#fff', fontSize: '0.85rem', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'Inter, sans-serif', opacity: saving ? 0.7 : 1, boxShadow: '0 3px 12px rgba(74,9,24,0.28)' }}>
          <FiCheck size={14} />
          {saving ? 'Saving…' : 'Save Home Content'}
        </motion.button>
      </div>
    </div>
  )
}

function SlideEditor({ idx, slide, open, onToggle, onChangeLang, onChangeBtn, onChangeBtnLabel, onUploadImage }) {
  const [langTab, setLangTab] = useState('en')
  return (
    <div style={{ border: '1px solid rgba(74,9,24,0.1)', borderRadius: 12, marginBottom: 10, overflow: 'hidden' }}>
      <button onClick={onToggle} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'rgba(74,9,24,0.03)', border: 'none', cursor: 'pointer' }}>
        <span style={{ fontSize: '0.82rem', fontWeight: 700, color: MAROON }}>Slide {idx + 1}</span>
        {open ? <FiChevronUp size={14} color={MAROON} /> : <FiChevronDown size={14} color={MAROON} />}
      </button>
      {open && (
        <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <ImagePicker image={slide.image} onUpload={onUploadImage} />

          <div style={{ display: 'flex', gap: 4, background: 'rgba(74,9,24,0.05)', borderRadius: 10, padding: 4, width: 'fit-content' }}>
            {[['en', 'English'], ['si', 'සිංහල'], ['ta', 'தமிழ்']].map(([code, lbl]) => (
              <button key={code} onClick={() => setLangTab(code)}
                style={{ padding: '5px 14px', borderRadius: 7, border: 'none', cursor: 'pointer', background: langTab === code ? '#fff' : 'transparent', color: langTab === code ? MAROON : 'rgba(74,9,24,0.42)', fontWeight: langTab === code ? 700 : 400, fontSize: '0.76rem', fontFamily: 'Inter, sans-serif' }}>
                {lbl}
              </button>
            ))}
          </div>

          <FieldInput label={`Accent (${langTab.toUpperCase()})`} value={slide.accent[langTab]} onChange={v => onChangeLang('accent', langTab, v)} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.6rem' }}>
            <FieldInput label="Heading Line 1" value={slide.line1[langTab]} onChange={v => onChangeLang('line1', langTab, v)} />
            <FieldInput label="Heading Line 2" value={slide.line2[langTab]} onChange={v => onChangeLang('line2', langTab, v)} />
            <FieldInput label="Heading Line 3" value={slide.line3[langTab]} onChange={v => onChangeLang('line3', langTab, v)} />
          </div>
          <FieldTextarea label="Body" value={slide.body[langTab]} onChange={v => onChangeLang('body', langTab, v)} rows={2} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div>
              <FieldInput label="Button 1 Label" value={slide.btn1.label[langTab]} onChange={v => onChangeBtnLabel('btn1', langTab, v)} />
              <div style={{ marginTop: 6 }}>
                <FieldInput label="Button 1 Path" value={slide.btn1.path} onChange={v => onChangeBtn('btn1', 'path', v)} placeholder="/departments" />
              </div>
            </div>
            <div>
              <FieldInput label="Button 2 Label" value={slide.btn2.label[langTab]} onChange={v => onChangeBtnLabel('btn2', langTab, v)} />
              <div style={{ marginTop: 6 }}>
                <FieldInput label="Button 2 Path" value={slide.btn2.path} onChange={v => onChangeBtn('btn2', 'path', v)} placeholder="/services" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function SectionCard({ title, children }) {
  return (
    <div style={{ background: '#fff', borderRadius: 16, border: '1px solid rgba(74,9,24,0.07)', boxShadow: '0 2px 12px rgba(74,9,24,0.05)', padding: '1.5rem', marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.02rem', fontWeight: 800, color: MAROON, margin: 0 }}>{title}</h2>
      {children}
    </div>
  )
}

function ImagePicker({ image, onUpload }) {
  const [uploading, setUploading] = useState(false)
  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setUploading(true)
    await onUpload(file)
    setUploading(false)
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      {uploading ? (
        <div style={{ width: 80, height: 50, borderRadius: 8, background: 'rgba(74,9,24,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FiRefreshCw size={16} color={GOLD} style={{ animation: 'spin 0.9s linear infinite' }} />
        </div>
      ) : image ? (
        <img src={resolveUploadUrl(image)} alt="" style={{ width: 80, height: 50, borderRadius: 8, objectFit: 'cover' }} />
      ) : (
        <div style={{ width: 80, height: 50, borderRadius: 8, background: 'rgba(74,9,24,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FiImage size={16} color="rgba(74,9,24,0.28)" />
        </div>
      )}
      <label style={{ padding: '7px 14px', borderRadius: 9, border: '1px solid rgba(74,9,24,0.14)', fontSize: '0.76rem', fontWeight: 600, color: MAROON, cursor: 'pointer' }}>
        {image ? 'Change Image' : 'Upload Image'}
        <input type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
      </label>
    </div>
  )
}

function LangTabbedField({ label, value, onChange, textarea = false, rows = 2 }) {
  const [langTab, setLangTab] = useState('en')
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
        <LabelEl>{label}</LabelEl>
        <div style={{ display: 'flex', gap: 2, background: 'rgba(74,9,24,0.05)', borderRadius: 8, padding: 3 }}>
          {[['en', 'EN'], ['si', 'SI'], ['ta', 'TA']].map(([code, lbl]) => (
            <button key={code} onClick={() => setLangTab(code)}
              style={{ padding: '3px 9px', borderRadius: 6, border: 'none', cursor: 'pointer', background: langTab === code ? '#fff' : 'transparent', color: langTab === code ? MAROON : 'rgba(74,9,24,0.42)', fontWeight: langTab === code ? 700 : 400, fontSize: '0.68rem', fontFamily: 'Inter, sans-serif' }}>
              {lbl}
            </button>
          ))}
        </div>
      </div>
      {textarea ? (
        <textarea value={value[langTab]} onChange={e => onChange(langTab, e.target.value)} rows={rows}
          style={{ width: '100%', padding: '9px 12px', borderRadius: 10, boxSizing: 'border-box', border: '1px solid rgba(74,9,24,0.14)', outline: 'none', fontSize: '0.82rem', color: MAROON, fontFamily: 'Inter, sans-serif', background: '#fff', resize: 'vertical' }} />
      ) : (
        <input type="text" value={value[langTab]} onChange={e => onChange(langTab, e.target.value)}
          style={{ width: '100%', padding: '9px 12px', borderRadius: 10, boxSizing: 'border-box', border: '1px solid rgba(74,9,24,0.14)', outline: 'none', fontSize: '0.82rem', color: MAROON, fontFamily: 'Inter, sans-serif', background: '#fff' }} />
      )}
    </div>
  )
}

const selectStyle = { width: '100%', padding: '9px 12px', border: '1.5px solid rgba(74,9,24,0.15)', borderRadius: 9, fontSize: '0.83rem', fontFamily: 'Inter, sans-serif', color: MAROON, background: '#fff', outline: 'none', cursor: 'pointer', appearance: 'none', boxSizing: 'border-box' }

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

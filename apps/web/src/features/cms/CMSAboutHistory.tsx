import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { FiCheck, FiRefreshCw, FiImage, FiChevronDown, FiChevronUp, FiPlus, FiTrash2, FiAlertTriangle } from 'react-icons/fi'
import { aboutHistoryApi } from './cmsContentApi'
import { uploadImage } from './cmsApi'
import { resolveUploadUrl } from '@/shared/utils/resolveUploadUrl'

const MAROON = '#4A0918'
const GOLD   = '#C79A2B'

const EMPTY_LANG_BLOCK = {
  introLabel: '', introTitle: '', introPara1: '', introPara2: '',
  tableTitle: '', tableName: '', tableService: '',
  projectsTitle: '', projectsRead: '',
  officialGovt: '', officialGovtSub: '',
  directors: [], projects: [],
}
const EMPTY_PROJECT = { id: '', img: '', title: '', abbr: '', desc: '', year: '' }

const EMPTY_FORM = {
  en: { ...EMPTY_LANG_BLOCK }, si: { ...EMPTY_LANG_BLOCK }, ta: { ...EMPTY_LANG_BLOCK },
  stats: { established: '', province: '', districts: '', yearsOfService: '', labels: { en: {}, si: {}, ta: {} } },
}

export default function CMSAboutHistory() {
  const [form,    setForm]    = useState(EMPTY_FORM)
  const [loading, setLoading] = useState(true)
  const [saving,  setSaving]  = useState(false)
  const [langTab, setLangTab] = useState('en')
  const [openProject, setOpenProject] = useState(0)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await aboutHistoryApi.get()
      setForm({
        en: { ...EMPTY_LANG_BLOCK, ...data.en, directors: data.en?.directors?.length ? data.en.directors : [], projects: data.en?.projects?.length ? data.en.projects : [{ ...EMPTY_PROJECT }, { ...EMPTY_PROJECT }, { ...EMPTY_PROJECT }] },
        si: { ...EMPTY_LANG_BLOCK, ...data.si, directors: data.si?.directors?.length ? data.si.directors : [], projects: data.si?.projects?.length ? data.si.projects : [{ ...EMPTY_PROJECT }, { ...EMPTY_PROJECT }, { ...EMPTY_PROJECT }] },
        ta: { ...EMPTY_LANG_BLOCK, ...data.ta, directors: data.ta?.directors?.length ? data.ta.directors : [], projects: data.ta?.projects?.length ? data.ta.projects : [{ ...EMPTY_PROJECT }, { ...EMPTY_PROJECT }, { ...EMPTY_PROJECT }] },
        stats: { established: '', province: '', districts: '', yearsOfService: '', labels: { en: {}, si: {}, ta: {} }, ...data.stats },
      })
    } catch {
      toast.error('Failed to load History content.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const setField = (lang, key, v) => setForm(f => ({ ...f, [lang]: { ...f[lang], [key]: v } }))
  const setStat = (key, v) => setForm(f => ({ ...f, stats: { ...f.stats, [key]: v } }))
  const setStatLabel = (lang, key, v) => setForm(f => ({ ...f, stats: { ...f.stats, labels: { ...f.stats.labels, [lang]: { ...f.stats.labels[lang], [key]: v } } } }))

  const addDirector = () => setForm(f => ({ ...f, [langTab]: { ...f[langTab], directors: [...f[langTab].directors, { name: '', period: '' }] } }))
  const removeDirector = (idx) => setForm(f => ({ ...f, [langTab]: { ...f[langTab], directors: f[langTab].directors.filter((_, i) => i !== idx) } }))
  const updateDirector = (idx, key, v) => setForm(f => ({ ...f, [langTab]: { ...f[langTab], directors: f[langTab].directors.map((d, i) => i === idx ? { ...d, [key]: v } : d) } }))

  const updateProjectField = (lang, idx, key, v) => setForm(f => ({ ...f, [lang]: { ...f[lang], projects: f[lang].projects.map((p, i) => i === idx ? { ...p, [key]: v } : p) } }))

  const uploadProjectImage = async (idx, file) => {
    try {
      const { data } = await uploadImage(file)
      // Image applies across all 3 languages (same visual asset)
      setForm(f => ({
        en: { ...f.en, projects: f.en.projects.map((p, i) => i === idx ? { ...p, img: data.url } : p) },
        si: { ...f.si, projects: f.si.projects.map((p, i) => i === idx ? { ...p, img: data.url } : p) },
        ta: { ...f.ta, projects: f.ta.projects.map((p, i) => i === idx ? { ...p, img: data.url } : p) },
        stats: f.stats,
      }))
    } catch {
      toast.error('Failed to upload project image.')
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await aboutHistoryApi.save(form)
      toast.success('History content saved')
    } catch {
      toast.error('Failed to save History content.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div style={{ padding: '4rem', textAlign: 'center', color: 'rgba(74,9,24,0.4)' }}><FiRefreshCw size={22} style={{ animation: 'spin 0.9s linear infinite' }} /></div>
  }

  const t = form[langTab]

  return (
    <div style={{ maxWidth: 720 }}>
      <div style={{ marginBottom: '1.25rem' }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.35rem', fontWeight: 800, color: MAROON, marginBottom: 4 }}>About: History</h1>
        <p style={{ fontSize: '0.78rem', color: 'rgba(74,9,24,0.45)', margin: 0 }}>Edits the History page under About.</p>
      </div>

      <div style={{ display: 'flex', gap: 4, background: 'rgba(74,9,24,0.05)', borderRadius: 10, padding: 4, width: 'fit-content', marginBottom: '1rem' }}>
        {[['en', 'English'], ['si', 'සිංහල'], ['ta', 'தமிழ்']].map(([code, lbl]) => (
          <button key={code} onClick={() => setLangTab(code)}
            style={{ padding: '5px 14px', borderRadius: 7, border: 'none', cursor: 'pointer', background: langTab === code ? '#fff' : 'transparent', color: langTab === code ? MAROON : 'rgba(74,9,24,0.42)', fontWeight: langTab === code ? 700 : 400, fontSize: '0.76rem', fontFamily: 'Inter, sans-serif' }}>
            {lbl}
          </button>
        ))}
      </div>

      <SectionCard title="Introduction">
        <FieldInput label="Intro Label" value={t.introLabel} onChange={v => setField(langTab, 'introLabel', v)} />
        <FieldInput label="Intro Title" value={t.introTitle} onChange={v => setField(langTab, 'introTitle', v)} />
        <FieldTextarea label="Intro Paragraph 1" value={t.introPara1} onChange={v => setField(langTab, 'introPara1', v)} rows={3} />
        <FieldTextarea label="Intro Paragraph 2" value={t.introPara2} onChange={v => setField(langTab, 'introPara2', v)} rows={3} />
      </SectionCard>

      <SectionCard title="Stat Strip">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <FieldInput label={`Established Label (${langTab.toUpperCase()})`} value={form.stats.labels[langTab]?.established || ''} onChange={v => setStatLabel(langTab, 'established', v)} />
          <FieldInput label="Established Value" value={form.stats.established} onChange={v => setStat('established', v)} placeholder="1987" />
          <FieldInput label={`Province Label (${langTab.toUpperCase()})`} value={form.stats.labels[langTab]?.province || ''} onChange={v => setStatLabel(langTab, 'province', v)} />
          <FieldInput label="Province Value" value={form.stats.province} onChange={v => setStat('province', v)} placeholder="Southern" />
          <FieldInput label={`Districts Label (${langTab.toUpperCase()})`} value={form.stats.labels[langTab]?.districts || ''} onChange={v => setStatLabel(langTab, 'districts', v)} />
          <FieldInput label="Districts Value" value={form.stats.districts} onChange={v => setStat('districts', v)} placeholder="3" />
          <FieldInput label={`Years of Service Label (${langTab.toUpperCase()})`} value={form.stats.labels[langTab]?.yearsOfService || ''} onChange={v => setStatLabel(langTab, 'yearsOfService', v)} />
          <FieldInput label="Years of Service Value" value={form.stats.yearsOfService} onChange={v => setStat('yearsOfService', v)} placeholder="37+" />
        </div>
      </SectionCard>

      <SectionCard title="Table Headers">
        <FieldInput label="Table Title" value={t.tableTitle} onChange={v => setField(langTab, 'tableTitle', v)} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <FieldInput label="Column: Name" value={t.tableName} onChange={v => setField(langTab, 'tableName', v)} />
          <FieldInput label="Column: Service Period" value={t.tableService} onChange={v => setField(langTab, 'tableService', v)} />
        </div>
      </SectionCard>

      <SectionCard title={`Past Heads of Division (${langTab.toUpperCase()})`}>
        {t.directors.map((d, idx) => (
          <div key={idx} style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
            <div style={{ flex: 2 }}><FieldInput label={`#${idx + 1} Name`} value={d.name} onChange={v => updateDirector(idx, 'name', v)} /></div>
            <div style={{ flex: 1 }}><FieldInput label="Period" value={d.period} onChange={v => updateDirector(idx, 'period', v)} placeholder="e.g. 2015 – 2018" /></div>
            <button onClick={() => removeDirector(idx)} style={{ ...iconBtn, marginBottom: 2 }}><FiTrash2 size={13} /></button>
          </div>
        ))}
        <button onClick={addDirector} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 9, border: '1px dashed rgba(74,9,24,0.25)', background: 'transparent', color: MAROON, fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', width: 'fit-content' }}>
          <FiPlus size={12} /> Add Director
        </button>
      </SectionCard>

      <SectionCard title="Special Development Projects">
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', padding: '10px 14px', borderRadius: 10, background: 'rgba(217,119,6,0.08)', border: '1px solid rgba(217,119,6,0.25)' }}>
          <FiAlertTriangle size={14} color="#b45309" style={{ flexShrink: 0, marginTop: 1 }} />
          <p style={{ fontSize: '0.76rem', color: '#92400e', margin: 0, lineHeight: 1.5 }}>
            This section is currently hidden on the public site. Editing it here does not make it visible again.
          </p>
        </div>
        <FieldInput label="Section Title" value={t.projectsTitle} onChange={v => setField(langTab, 'projectsTitle', v)} />
        <FieldInput label="&quot;Read More&quot; Label" value={t.projectsRead} onChange={v => setField(langTab, 'projectsRead', v)} />
        {t.projects.map((p, idx) => (
          <ProjectEditor
            key={idx} idx={idx} project={p}
            open={openProject === idx} onToggle={() => setOpenProject(openProject === idx ? -1 : idx)}
            onChangeField={(key, v) => updateProjectField(langTab, idx, key, v)}
            onUploadImage={(file) => uploadProjectImage(idx, file)}
          />
        ))}
      </SectionCard>

      <SectionCard title="Official Government Footer">
        <FieldInput label="Label" value={t.officialGovt} onChange={v => setField(langTab, 'officialGovt', v)} />
        <FieldInput label="Sub-label" value={t.officialGovtSub} onChange={v => setField(langTab, 'officialGovtSub', v)} />
      </SectionCard>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <motion.button whileHover={!saving ? { y: -1.5, boxShadow: '0 8px 22px rgba(74,9,24,0.34)' } : {}} whileTap={!saving ? { scale: 0.97 } : {}}
          onClick={handleSave} disabled={saving}
          style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 26px', borderRadius: 10, border: 'none', background: `linear-gradient(135deg, ${MAROON} 0%, #6E1528 100%)`, color: '#fff', fontSize: '0.85rem', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'Inter, sans-serif', opacity: saving ? 0.7 : 1, boxShadow: '0 3px 12px rgba(74,9,24,0.28)' }}>
          <FiCheck size={14} />
          {saving ? 'Saving…' : 'Save History Content'}
        </motion.button>
      </div>
    </div>
  )
}

function ProjectEditor({ idx, project, open, onToggle, onChangeField, onUploadImage }) {
  return (
    <div style={{ border: '1px solid rgba(74,9,24,0.1)', borderRadius: 12, marginBottom: 10, overflow: 'hidden' }}>
      <button onClick={onToggle} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'rgba(74,9,24,0.03)', border: 'none', cursor: 'pointer' }}>
        <span style={{ fontSize: '0.82rem', fontWeight: 700, color: MAROON }}>Project {idx + 1}{project.title ? ` — ${project.title}` : ''}</span>
        {open ? <FiChevronUp size={14} color={MAROON} /> : <FiChevronDown size={14} color={MAROON} />}
      </button>
      {open && (
        <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <ImagePicker image={project.img} onUpload={onUploadImage} />
          <FieldInput label="Title" value={project.title} onChange={v => onChangeField('title', v)} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <FieldInput label="Abbreviation" value={project.abbr} onChange={v => onChangeField('abbr', v)} placeholder="e.g. IRDP" />
            <FieldInput label="Year" value={project.year} onChange={v => onChangeField('year', v)} />
          </div>
          <FieldTextarea label="Description" value={project.desc} onChange={v => onChangeField('desc', v)} rows={3} />
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

const iconBtn = {
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  width: 32, height: 32, borderRadius: 8,
  border: '1px solid rgba(220,38,38,0.22)', background: 'rgba(220,38,38,0.07)',
  color: '#DC2626', cursor: 'pointer', flexShrink: 0,
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

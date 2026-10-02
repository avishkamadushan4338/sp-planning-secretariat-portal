import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { FiCheck, FiRefreshCw, FiImage, FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { aboutOverviewApi } from './cmsContentApi'
import { uploadImage } from './cmsApi'
import { resolveUploadUrl } from '@/shared/utils/resolveUploadUrl'

const MAROON = '#4A0918'
const GOLD   = '#C79A2B'

const EMPTY_LANG = { en: '', si: '', ta: '' }
const EMPTY_INTRO_LANG = { introLabel: '', introTitle: '', introParagraphs: '', visionLabel: '', visionText: '', missionLabel: '', missionText: '', imageAlt: '', officialGovt: '', officialGovtSub: '' }
const EMPTY_LIST_LANG = { sectionLabel: '', items: '' }
const EMPTY_AWARD = { id: '', img: '', title: { ...EMPTY_LANG }, year: '', desc: { ...EMPTY_LANG } }

const EMPTY_FORM = {
  intro: { en: { ...EMPTY_INTRO_LANG }, si: { ...EMPTY_INTRO_LANG }, ta: { ...EMPTY_INTRO_LANG } },
  image: '',
  establishedBadge: { ...EMPTY_LANG },
  values: { en: { ...EMPTY_LIST_LANG }, si: { ...EMPTY_LIST_LANG }, ta: { ...EMPTY_LIST_LANG } },
  objectives: { en: { ...EMPTY_LIST_LANG }, si: { ...EMPTY_LIST_LANG }, ta: { ...EMPTY_LIST_LANG } },
  awards: { sectionLabel: { ...EMPTY_LANG }, items: [{ ...EMPTY_AWARD }, { ...EMPTY_AWARD }, { ...EMPTY_AWARD }] },
}

const listToText = (arr) => (arr || []).join('\n')
const textToList = (text) => text.split('\n').map(s => s.trim()).filter(Boolean)

export default function CMSAboutOverview() {
  const [form,    setForm]    = useState(EMPTY_FORM)
  const [loading, setLoading] = useState(true)
  const [saving,  setSaving]  = useState(false)
  const [openAward, setOpenAward] = useState(0)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await aboutOverviewApi.get()
      setForm({
        intro: {
          en: { ...EMPTY_INTRO_LANG, ...data.intro?.en, introParagraphs: listToText(data.intro?.en?.introParagraphs) },
          si: { ...EMPTY_INTRO_LANG, ...data.intro?.si, introParagraphs: listToText(data.intro?.si?.introParagraphs) },
          ta: { ...EMPTY_INTRO_LANG, ...data.intro?.ta, introParagraphs: listToText(data.intro?.ta?.introParagraphs) },
        },
        image: data.image || '',
        establishedBadge: { ...EMPTY_LANG, ...data.establishedBadge },
        values: {
          en: { sectionLabel: data.values?.en?.sectionLabel || '', items: listToText(data.values?.en?.items) },
          si: { sectionLabel: data.values?.si?.sectionLabel || '', items: listToText(data.values?.si?.items) },
          ta: { sectionLabel: data.values?.ta?.sectionLabel || '', items: listToText(data.values?.ta?.items) },
        },
        objectives: {
          en: { sectionLabel: data.objectives?.en?.sectionLabel || '', items: listToText(data.objectives?.en?.items) },
          si: { sectionLabel: data.objectives?.si?.sectionLabel || '', items: listToText(data.objectives?.si?.items) },
          ta: { sectionLabel: data.objectives?.ta?.sectionLabel || '', items: listToText(data.objectives?.ta?.items) },
        },
        awards: {
          sectionLabel: { ...EMPTY_LANG, ...data.awards?.sectionLabel },
          items: data.awards?.items?.length
            ? data.awards.items.map(a => ({ ...EMPTY_AWARD, ...a, title: { ...EMPTY_LANG, ...a.title }, desc: { ...EMPTY_LANG, ...a.desc } }))
            : [{ ...EMPTY_AWARD }, { ...EMPTY_AWARD }, { ...EMPTY_AWARD }],
        },
      })
    } catch {
      toast.error('Failed to load Overview content.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const setIntroLang = (lang, key, v) => setForm(f => ({ ...f, intro: { ...f.intro, [lang]: { ...f.intro[lang], [key]: v } } }))
  const setValuesLang = (lang, key, v) => setForm(f => ({ ...f, values: { ...f.values, [lang]: { ...f.values[lang], [key]: v } } }))
  const setObjectivesLang = (lang, key, v) => setForm(f => ({ ...f, objectives: { ...f.objectives, [lang]: { ...f.objectives[lang], [key]: v } } }))
  const setEstablishedBadge = (lang, v) => setForm(f => ({ ...f, establishedBadge: { ...f.establishedBadge, [lang]: v } }))
  const setAwardsSectionLabel = (lang, v) => setForm(f => ({ ...f, awards: { ...f.awards, sectionLabel: { ...f.awards.sectionLabel, [lang]: v } } }))

  const updateAward = (idx, patch) => setForm(f => ({ ...f, awards: { ...f.awards, items: f.awards.items.map((a, i) => i === idx ? { ...a, ...patch } : a) } }))
  const updateAwardLang = (idx, key, lang, v) => setForm(f => ({ ...f, awards: { ...f.awards, items: f.awards.items.map((a, i) => i === idx ? { ...a, [key]: { ...a[key], [lang]: v } } : a) } }))

  const uploadIntroImage = async (file) => {
    try {
      const { data } = await uploadImage(file)
      setForm(f => ({ ...f, image: data.url }))
    } catch {
      toast.error('Failed to upload intro image.')
    }
  }

  const uploadAwardImage = async (idx, file) => {
    try {
      const { data } = await uploadImage(file)
      updateAward(idx, { img: data.url })
    } catch {
      toast.error('Failed to upload award image.')
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const payload = {
        intro: {
          en: { ...form.intro.en, introParagraphs: textToList(form.intro.en.introParagraphs) },
          si: { ...form.intro.si, introParagraphs: textToList(form.intro.si.introParagraphs) },
          ta: { ...form.intro.ta, introParagraphs: textToList(form.intro.ta.introParagraphs) },
        },
        image: form.image,
        establishedBadge: form.establishedBadge,
        values: {
          en: { sectionLabel: form.values.en.sectionLabel, items: textToList(form.values.en.items) },
          si: { sectionLabel: form.values.si.sectionLabel, items: textToList(form.values.si.items) },
          ta: { sectionLabel: form.values.ta.sectionLabel, items: textToList(form.values.ta.items) },
        },
        objectives: {
          en: { sectionLabel: form.objectives.en.sectionLabel, items: textToList(form.objectives.en.items) },
          si: { sectionLabel: form.objectives.si.sectionLabel, items: textToList(form.objectives.si.items) },
          ta: { sectionLabel: form.objectives.ta.sectionLabel, items: textToList(form.objectives.ta.items) },
        },
        awards: form.awards,
      }
      await aboutOverviewApi.save(payload)
      toast.success('Overview content saved')
    } catch {
      toast.error('Failed to save Overview content.')
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
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.35rem', fontWeight: 800, color: MAROON, marginBottom: 4 }}>About: Overview</h1>
        <p style={{ fontSize: '0.78rem', color: 'rgba(74,9,24,0.45)', margin: 0 }}>Introduction, vision/mission, values, objectives, and awards on the About Overview page.</p>
      </div>

      <SectionCard title="Introduction">
        <ImagePicker image={form.image} onUpload={uploadIntroImage} />
        <FieldInput label="Established Badge (EN)" value={form.establishedBadge.en} onChange={v => setEstablishedBadge('en', v)} placeholder="e.g. Est. 1978" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <FieldInput label="Established Badge (SI)" value={form.establishedBadge.si} onChange={v => setEstablishedBadge('si', v)} />
          <FieldInput label="Established Badge (TA)" value={form.establishedBadge.ta} onChange={v => setEstablishedBadge('ta', v)} />
        </div>
        <LangTabbedField label="Intro Label" value={{ en: form.intro.en.introLabel, si: form.intro.si.introLabel, ta: form.intro.ta.introLabel }}
          onChange={(lang, v) => setIntroLang(lang, 'introLabel', v)} />
        <LangTabbedField label="Intro Title" value={{ en: form.intro.en.introTitle, si: form.intro.si.introTitle, ta: form.intro.ta.introTitle }}
          onChange={(lang, v) => setIntroLang(lang, 'introTitle', v)} />
        <LangTabbedField label="Intro Paragraphs — one per line" value={{ en: form.intro.en.introParagraphs, si: form.intro.si.introParagraphs, ta: form.intro.ta.introParagraphs }}
          onChange={(lang, v) => setIntroLang(lang, 'introParagraphs', v)} textarea rows={8} />
        <LangTabbedField label="Image Alt Text" value={{ en: form.intro.en.imageAlt, si: form.intro.si.imageAlt, ta: form.intro.ta.imageAlt }}
          onChange={(lang, v) => setIntroLang(lang, 'imageAlt', v)} />
        <LangTabbedField label="Official Government Label" value={{ en: form.intro.en.officialGovt, si: form.intro.si.officialGovt, ta: form.intro.ta.officialGovt }}
          onChange={(lang, v) => setIntroLang(lang, 'officialGovt', v)} />
        <LangTabbedField label="Official Government Sub-label" value={{ en: form.intro.en.officialGovtSub, si: form.intro.si.officialGovtSub, ta: form.intro.ta.officialGovtSub }}
          onChange={(lang, v) => setIntroLang(lang, 'officialGovtSub', v)} />
      </SectionCard>

      <SectionCard title="Vision & Mission">
        <LangTabbedField label="Vision Label" value={{ en: form.intro.en.visionLabel, si: form.intro.si.visionLabel, ta: form.intro.ta.visionLabel }}
          onChange={(lang, v) => setIntroLang(lang, 'visionLabel', v)} />
        <LangTabbedField label="Vision Text" value={{ en: form.intro.en.visionText, si: form.intro.si.visionText, ta: form.intro.ta.visionText }}
          onChange={(lang, v) => setIntroLang(lang, 'visionText', v)} textarea rows={3} />
        <LangTabbedField label="Mission Label" value={{ en: form.intro.en.missionLabel, si: form.intro.si.missionLabel, ta: form.intro.ta.missionLabel }}
          onChange={(lang, v) => setIntroLang(lang, 'missionLabel', v)} />
        <LangTabbedField label="Mission Text" value={{ en: form.intro.en.missionText, si: form.intro.si.missionText, ta: form.intro.ta.missionText }}
          onChange={(lang, v) => setIntroLang(lang, 'missionText', v)} textarea rows={3} />
      </SectionCard>

      <SectionCard title="Values">
        <LangTabbedField label="Section Label" value={{ en: form.values.en.sectionLabel, si: form.values.si.sectionLabel, ta: form.values.ta.sectionLabel }}
          onChange={(lang, v) => setValuesLang(lang, 'sectionLabel', v)} />
        <LangTabbedField label="Values — one per line" value={{ en: form.values.en.items, si: form.values.si.items, ta: form.values.ta.items }}
          onChange={(lang, v) => setValuesLang(lang, 'items', v)} textarea rows={8} />
      </SectionCard>

      <SectionCard title="Objectives">
        <LangTabbedField label="Section Label" value={{ en: form.objectives.en.sectionLabel, si: form.objectives.si.sectionLabel, ta: form.objectives.ta.sectionLabel }}
          onChange={(lang, v) => setObjectivesLang(lang, 'sectionLabel', v)} />
        <LangTabbedField label="Objectives — one per line" value={{ en: form.objectives.en.items, si: form.objectives.si.items, ta: form.objectives.ta.items }}
          onChange={(lang, v) => setObjectivesLang(lang, 'items', v)} textarea rows={5} />
      </SectionCard>

      <SectionCard title="Awards">
        <LangTabbedField label="Section Label" value={form.awards.sectionLabel} onChange={setAwardsSectionLabel} />
        {form.awards.items.map((award, idx) => (
          <AwardEditor
            key={idx} idx={idx} award={award}
            open={openAward === idx} onToggle={() => setOpenAward(openAward === idx ? -1 : idx)}
            onChangeField={(key, v) => updateAward(idx, { [key]: v })}
            onChangeLang={(key, lang, v) => updateAwardLang(idx, key, lang, v)}
            onUploadImage={(file) => uploadAwardImage(idx, file)}
          />
        ))}
      </SectionCard>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <motion.button whileHover={!saving ? { y: -1.5, boxShadow: '0 8px 22px rgba(74,9,24,0.34)' } : {}} whileTap={!saving ? { scale: 0.97 } : {}}
          onClick={handleSave} disabled={saving}
          style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 26px', borderRadius: 10, border: 'none', background: `linear-gradient(135deg, ${MAROON} 0%, #6E1528 100%)`, color: '#fff', fontSize: '0.85rem', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'Inter, sans-serif', opacity: saving ? 0.7 : 1, boxShadow: '0 3px 12px rgba(74,9,24,0.28)' }}>
          <FiCheck size={14} />
          {saving ? 'Saving…' : 'Save Overview Content'}
        </motion.button>
      </div>
    </div>
  )
}

function AwardEditor({ idx, award, open, onToggle, onChangeField, onChangeLang, onUploadImage }) {
  return (
    <div style={{ border: '1px solid rgba(74,9,24,0.1)', borderRadius: 12, marginBottom: 10, overflow: 'hidden' }}>
      <button onClick={onToggle} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'rgba(74,9,24,0.03)', border: 'none', cursor: 'pointer' }}>
        <span style={{ fontSize: '0.82rem', fontWeight: 700, color: MAROON }}>Award {idx + 1}{award.title?.en ? ` — ${award.title.en}` : ''}</span>
        {open ? <FiChevronUp size={14} color={MAROON} /> : <FiChevronDown size={14} color={MAROON} />}
      </button>
      {open && (
        <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <ImagePicker image={award.img} onUpload={onUploadImage} />
          <LangTabbedField label="Title" value={award.title} onChange={(lang, v) => onChangeLang('title', lang, v)} />
          <FieldInput label="Year" value={award.year} onChange={v => onChangeField('year', v)} placeholder="e.g. 2023" />
          <LangTabbedField label="Description" value={award.desc} onChange={(lang, v) => onChangeLang('desc', lang, v)} textarea rows={3} />
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

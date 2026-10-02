import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { FiCheck, FiRefreshCw, FiChevronDown, FiChevronUp, FiPlus, FiTrash2 } from 'react-icons/fi'
import { orgStructureApi } from './cmsContentApi'

const MAROON = '#4A0918'

const TIERS = ['apex', 'director', 'division', 'dd', 'stat', 'officer', 'admin', 'support']

const EMPTY_LANG = { en: '', si: '', ta: '' }
const EMPTY_NODE = { id: '', parentId: null, tier: 'officer', order: 0, title: { ...EMPTY_LANG }, sub: { ...EMPTY_LANG }, count: { ...EMPTY_LANG } }
const EMPTY_UI = {
  intro:       { en: { title: '', text: '' }, si: { title: '', text: '' }, ta: { title: '', text: '' } },
  cardHeader:  { en: { title: '', sub: '' },  si: { title: '', sub: '' },  ta: { title: '', sub: '' } },
  scrollHints: { en: { mobile: '', mobileBottom: '', desktop: '' }, si: { mobile: '', mobileBottom: '', desktop: '' }, ta: { mobile: '', mobileBottom: '', desktop: '' } },
  legend:      { en: [], si: [], ta: [] },
  footer:      { en: { title: '', sub: '' },  si: { title: '', sub: '' },  ta: { title: '', sub: '' } },
  imgFallbackLabel: { ...EMPTY_LANG },
}
const EMPTY_FORM = { nodes: [], ui: EMPTY_UI }

const listToText = (arr) => (arr || []).join('\n')
const textToList = (text) => text.split('\n').map(s => s.trim()).filter(Boolean)

export default function CMSOrgStructure() {
  const [form,    setForm]    = useState(EMPTY_FORM)
  const [loading, setLoading] = useState(true)
  const [saving,  setSaving]  = useState(false)
  const [openNode, setOpenNode] = useState(-1)
  const [legendText, setLegendText] = useState({ en: '', si: '', ta: '' })

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await orgStructureApi.get()
      setForm({
        nodes: data.nodes?.length ? data.nodes.map(n => ({ ...EMPTY_NODE, ...n, title: { ...EMPTY_LANG, ...n.title }, sub: { ...EMPTY_LANG, ...n.sub }, count: { ...EMPTY_LANG, ...n.count } })) : [],
        ui: {
          intro: { ...EMPTY_UI.intro, ...data.ui?.intro },
          cardHeader: { ...EMPTY_UI.cardHeader, ...data.ui?.cardHeader },
          scrollHints: { ...EMPTY_UI.scrollHints, ...data.ui?.scrollHints },
          legend: { ...EMPTY_UI.legend, ...data.ui?.legend },
          footer: { ...EMPTY_UI.footer, ...data.ui?.footer },
          imgFallbackLabel: { ...EMPTY_LANG, ...data.ui?.imgFallbackLabel },
        },
      })
      setLegendText({
        en: listToText(data.ui?.legend?.en),
        si: listToText(data.ui?.legend?.si),
        ta: listToText(data.ui?.legend?.ta),
      })
    } catch {
      toast.error('Failed to load Organization Structure content.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const updateNode = (idx, patch) => setForm(f => ({ ...f, nodes: f.nodes.map((n, i) => i === idx ? { ...n, ...patch } : n) }))
  const updateNodeLang = (idx, key, lang, v) => setForm(f => ({ ...f, nodes: f.nodes.map((n, i) => i === idx ? { ...n, [key]: { ...n[key], [lang]: v } } : n) }))
  const addNode = () => setForm(f => ({ ...f, nodes: [...f.nodes, { ...EMPTY_NODE, id: `node-${Date.now()}`, order: f.nodes.length }] }))
  const removeNode = (idx) => setForm(f => ({ ...f, nodes: f.nodes.filter((_, i) => i !== idx) }))

  const setUiField = (section, lang, key, v) => setForm(f => ({ ...f, ui: { ...f.ui, [section]: { ...f.ui[section], [lang]: { ...f.ui[section][lang], [key]: v } } } }))
  const setImgFallback = (lang, v) => setForm(f => ({ ...f, ui: { ...f.ui, imgFallbackLabel: { ...f.ui.imgFallbackLabel, [lang]: v } } }))

  const handleSave = async () => {
    setSaving(true)
    try {
      const payload = {
        nodes: form.nodes,
        ui: {
          ...form.ui,
          legend: { en: textToList(legendText.en), si: textToList(legendText.si), ta: textToList(legendText.ta) },
        },
      }
      await orgStructureApi.save(payload)
      toast.success('Organization Structure saved')
    } catch {
      toast.error('Failed to save Organization Structure.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div style={{ padding: '4rem', textAlign: 'center', color: 'rgba(74,9,24,0.4)' }}><FiRefreshCw size={22} style={{ animation: 'spin 0.9s linear infinite' }} /></div>
  }

  return (
    <div style={{ maxWidth: 760 }}>
      <div style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.35rem', fontWeight: 800, color: MAROON, marginBottom: 4 }}>About: Organization Structure</h1>
          <p style={{ fontSize: '0.78rem', color: 'rgba(74,9,24,0.45)', margin: 0 }}>{form.nodes.length} node{form.nodes.length !== 1 ? 's' : ''} in the org chart tree.</p>
        </div>
        <button onClick={addNode} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 10, border: 'none', background: `linear-gradient(135deg, ${MAROON} 0%, #6E1528 100%)`, color: '#fff', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>
          <FiPlus size={13} /> Add Node
        </button>
      </div>

      <SectionCard title="Nodes">
        {form.nodes.map((node, idx) => (
          <NodeEditor
            key={idx} idx={idx} node={node} allNodes={form.nodes}
            open={openNode === idx} onToggle={() => setOpenNode(openNode === idx ? -1 : idx)}
            onChangeField={(key, v) => updateNode(idx, { [key]: v })}
            onChangeLang={(key, lang, v) => updateNodeLang(idx, key, lang, v)}
            onRemove={() => removeNode(idx)}
          />
        ))}
        {form.nodes.length === 0 && (
          <p style={{ fontSize: '0.82rem', color: 'rgba(74,9,24,0.4)', textAlign: 'center', padding: '1.5rem 0' }}>No nodes yet. Click &quot;Add Node&quot; to start building the chart.</p>
        )}
      </SectionCard>

      <SectionCard title="UI Chrome">
        <LangTabbedField label="Intro Title" value={{ en: form.ui.intro.en.title, si: form.ui.intro.si.title, ta: form.ui.intro.ta.title }}
          onChange={(lang, v) => setUiField('intro', lang, 'title', v)} />
        <LangTabbedField label="Intro Text" value={{ en: form.ui.intro.en.text, si: form.ui.intro.si.text, ta: form.ui.intro.ta.text }}
          onChange={(lang, v) => setUiField('intro', lang, 'text', v)} textarea rows={3} />
        <LangTabbedField label="Card Header Title" value={{ en: form.ui.cardHeader.en.title, si: form.ui.cardHeader.si.title, ta: form.ui.cardHeader.ta.title }}
          onChange={(lang, v) => setUiField('cardHeader', lang, 'title', v)} />
        <LangTabbedField label="Card Header Subtitle" value={{ en: form.ui.cardHeader.en.sub, si: form.ui.cardHeader.si.sub, ta: form.ui.cardHeader.ta.sub }}
          onChange={(lang, v) => setUiField('cardHeader', lang, 'sub', v)} />
        <LangTabbedField label="Scroll Hint (Mobile)" value={{ en: form.ui.scrollHints.en.mobile, si: form.ui.scrollHints.si.mobile, ta: form.ui.scrollHints.ta.mobile }}
          onChange={(lang, v) => setUiField('scrollHints', lang, 'mobile', v)} />
        <LangTabbedField label="Scroll Hint (Mobile Bottom)" value={{ en: form.ui.scrollHints.en.mobileBottom, si: form.ui.scrollHints.si.mobileBottom, ta: form.ui.scrollHints.ta.mobileBottom }}
          onChange={(lang, v) => setUiField('scrollHints', lang, 'mobileBottom', v)} />
        <LangTabbedField label="Scroll Hint (Desktop)" value={{ en: form.ui.scrollHints.en.desktop, si: form.ui.scrollHints.si.desktop, ta: form.ui.scrollHints.ta.desktop }}
          onChange={(lang, v) => setUiField('scrollHints', lang, 'desktop', v)} />
        <LangTabbedField label="Legend Labels — one per line" value={legendText} onChange={(lang, v) => setLegendText(t => ({ ...t, [lang]: v }))} textarea rows={7} />
        <LangTabbedField label="Footer Title" value={{ en: form.ui.footer.en.title, si: form.ui.footer.si.title, ta: form.ui.footer.ta.title }}
          onChange={(lang, v) => setUiField('footer', lang, 'title', v)} />
        <LangTabbedField label="Footer Subtitle" value={{ en: form.ui.footer.en.sub, si: form.ui.footer.si.sub, ta: form.ui.footer.ta.sub }}
          onChange={(lang, v) => setUiField('footer', lang, 'sub', v)} />
        <LangTabbedField label="Image Fallback Label" value={form.ui.imgFallbackLabel} onChange={setImgFallback} />
      </SectionCard>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <motion.button whileHover={!saving ? { y: -1.5, boxShadow: '0 8px 22px rgba(74,9,24,0.34)' } : {}} whileTap={!saving ? { scale: 0.97 } : {}}
          onClick={handleSave} disabled={saving}
          style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 26px', borderRadius: 10, border: 'none', background: `linear-gradient(135deg, ${MAROON} 0%, #6E1528 100%)`, color: '#fff', fontSize: '0.85rem', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'Inter, sans-serif', opacity: saving ? 0.7 : 1, boxShadow: '0 3px 12px rgba(74,9,24,0.28)' }}>
          <FiCheck size={14} />
          {saving ? 'Saving…' : 'Save Org Chart'}
        </motion.button>
      </div>
    </div>
  )
}

function NodeEditor({ idx, node, allNodes, open, onToggle, onChangeField, onChangeLang, onRemove }) {
  return (
    <div style={{ border: '1px solid rgba(74,9,24,0.1)', borderRadius: 12, marginBottom: 10, overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button onClick={onToggle} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'rgba(74,9,24,0.03)', border: 'none', cursor: 'pointer' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: MAROON }}>{node.id || `Node ${idx + 1}`}{node.title?.en ? ` — ${node.title.en}` : ''}</span>
          {open ? <FiChevronUp size={14} color={MAROON} /> : <FiChevronDown size={14} color={MAROON} />}
        </button>
        <button onClick={onRemove} style={{ ...iconBtn, borderRadius: 0 }}><FiTrash2 size={13} /></button>
      </div>
      {open && (
        <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
            <FieldInput label="Node ID" value={node.id} onChange={v => onChangeField('id', v)} placeholder="e.g. apex" />
            <div>
              <LabelEl>Parent</LabelEl>
              <select value={node.parentId || ''} onChange={e => onChangeField('parentId', e.target.value || null)} style={selectStyle}>
                <option value="">— None (root) —</option>
                {allNodes.filter(n => n.id !== node.id).map(n => <option key={n.id} value={n.id}>{n.id}</option>)}
              </select>
            </div>
            <div>
              <LabelEl>Tier</LabelEl>
              <select value={node.tier} onChange={e => onChangeField('tier', e.target.value)} style={selectStyle}>
                {TIERS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <FieldInput label="Order (sibling position)" value={String(node.order ?? 0)} onChange={v => onChangeField('order', Number(v) || 0)} />
          <LangTabbedField label="Title" value={node.title} onChange={(lang, v) => onChangeLang('title', lang, v)} />
          <LangTabbedField label="Subtitle" value={node.sub} onChange={(lang, v) => onChangeLang('sub', lang, v)} />
          <LangTabbedField label="Headcount" value={node.count} onChange={(lang, v) => onChangeLang('count', lang, v)} />
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

const iconBtn = {
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  width: 40, alignSelf: 'stretch',
  border: 'none', borderLeft: '1px solid rgba(220,38,38,0.15)', background: 'rgba(220,38,38,0.07)',
  color: '#DC2626', cursor: 'pointer', flexShrink: 0,
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

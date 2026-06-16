import { useState, useEffect, useMemo } from 'react'
import './HomeNewsBar.css'

const API_BASE = import.meta.env.VITE_API_URL || ''

async function loadItems() {
  try {
    const res = await fetch(`${API_BASE}/api/news-bar`)
    if (!res.ok) return []
    const all = await res.json()
    return all
      .filter(n => n.status === 'Active')
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
      .slice(0, 2)
  } catch {
    return []
  }
}

export default function HomeNewsBar({ lang = 'en' }) {
  const [items,   setItems]   = useState([])
  const [reduced, setReduced] = useState(false)

  /* prefers-reduced-motion */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const h = e => setReduced(e.matches)
    mq.addEventListener('change', h)
    return () => mq.removeEventListener('change', h)
  }, [])

  /* initial fetch + poll every 30 s so the bar stays fresh */
  useEffect(() => {
    let cancelled = false
    const run = () => loadItems().then(data => { if (!cancelled) setItems(data) })
    run()
    const id = setInterval(run, 30_000)
    return () => { cancelled = true; clearInterval(id) }
  }, [])

  /* pick description for current language */
  const descKey = lang === 'si' ? 'descriptionSi' : lang === 'ta' ? 'descriptionTa' : 'descriptionEn'

  const texts = useMemo(
    () => items.map(it => (it[descKey] || '').trim()).filter(Boolean),
    [items, descKey]
  )

  if (texts.length === 0) return null

  /* Build one long ticker string: item1  ◆  item2  ◆  (repeated) */
  const separator = '   ◆   '
  const ticker    = texts.join(separator) + separator

  return (
    <div
      className="hnb"
      role="marquee"
      aria-label="Latest news"
      aria-live="off"
    >
      <div className="hnb__shell">
        {/* "Latest News" label — always visible */}
        <div className="hnb__label" aria-hidden="true">
          <span className="hnb__dot" />
          <span className="hnb__label-text">Latest News</span>
        </div>

        <div className="hnb__divider" aria-hidden="true" />

        {/* Scrolling text track */}
        <div className="hnb__track-wrap" aria-hidden="true">
          <div className={`hnb__track${reduced ? ' hnb__track--paused' : ''}`}>
            {/* duplicate for seamless loop */}
            <span className="hnb__text">{ticker}</span>
            <span className="hnb__text" aria-hidden="true">{ticker}</span>
          </div>
        </div>
      </div>

      {/* visible-to-SR only static version */}
      <ul className="hnb__sr-only">
        {texts.map((t, i) => <li key={i}>{t}</li>)}
      </ul>
    </div>
  )
}

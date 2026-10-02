import { useState, useRef } from 'react'
import './ProgressiveImage.css'

/**
 * Drop-in <img> replacement with a gold shimmer skeleton.
 *
 * Props (all standard <img> props, plus):
 *   fill      — true (default): wrapper fills parent, img covers it (for framed images)
 *               false: wrapper is inline, img is sized by its className (for logos, signatures)
 *   fallback  — JSX shown on load error (optional)
 *   radius    — CSS border-radius override (optional)
 */
export default function ProgressiveImage({
  src,
  alt,
  className = '',
  fallback,
  fill = true,
  radius,
  style,
  ...rest
}) {
  const [loaded, setLoaded]   = useState(false)
  const [errored, setErrored] = useState(false)
  const imgRef = useRef(null)

  const wrapStyle = radius ? { borderRadius: radius } : undefined
  const imgStyle = {
    opacity: loaded ? 1 : 0,
    transition: 'opacity 0.45s cubic-bezier(0.16,1,0.3,1)',
    ...(radius ? { borderRadius: radius } : {}),
    ...style,
  }

  if (errored) {
    return fallback ?? (
      <div className="pi-error" style={wrapStyle} aria-label={alt} role="img">
        <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <rect x="4" y="10" width="40" height="28" rx="3" stroke="#C79A2B" strokeWidth="1.8"/>
          <circle cx="16" cy="20" r="4" stroke="#C79A2B" strokeWidth="1.5"/>
          <path d="M4 32 L14 22 L22 30 L30 22 L44 34" stroke="#C79A2B" strokeWidth="1.5" strokeLinejoin="round"/>
        </svg>
      </div>
    )
  }

  return (
    <div
      className={`pi-wrap${fill ? ' pi-wrap--fill' : ''}${loaded ? ' pi-wrap--loaded' : ''}`}
      style={wrapStyle}
    >
      {!loaded && <div className="pi-skeleton" aria-hidden="true" />}

      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`pi-img${className ? ` ${className}` : ''}`}
        style={imgStyle}
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
        decoding="async"
        {...rest}
      />
    </div>
  )
}

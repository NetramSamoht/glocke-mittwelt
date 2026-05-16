import { useState } from 'react'

/**
 * Charakter-Portrait mit Sigil-Fallback, wenn das Bild noch fehlt.
 */
export default function CharacterPortrait({ src, name, sigil = '✶' }) {
  const [failed, setFailed] = useState(false)

  return (
    <div className={`portrait ${failed ? 'portrait--fallback' : ''}`}>
      {!failed && src ? (
        <img
          src={src}
          alt={`Bildnis: ${name}`}
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="portrait__sigil" aria-hidden="true">
          {sigil}
        </div>
      )}
      <div className="portrait__ring" aria-hidden="true" />
    </div>
  )
}

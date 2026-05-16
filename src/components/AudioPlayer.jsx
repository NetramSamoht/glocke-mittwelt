import { useEffect, useRef, useState } from 'react'

/**
 * Audio-Player mit Fallback auf reinen Text, falls die Audiodatei
 * noch nicht existiert. Erkennt 404 / Loadfehler und blendet sich aus.
 */
export default function AudioPlayer({ src, label = 'Tonspur' }) {
  const audioRef = useRef(null)
  const [available, setAvailable] = useState(true)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  // Bei Quellen-Wechsel reset
  useEffect(() => {
    setAvailable(true)
    setPlaying(false)
    setProgress(0)
    setDuration(0)
  }, [src])

  if (!src || !available) {
    return (
      <div className="audio-placeholder" aria-hidden={!src}>
        <span className="audio-placeholder__icon">⌖</span>
        <span className="audio-placeholder__text">
          {src ? 'Tonspur noch nicht hinterlegt – lies den Text unten.' : 'Kein Audio für diese Szene.'}
        </span>
      </div>
    )
  }

  const toggle = () => {
    const el = audioRef.current
    if (!el) return
    if (el.paused) {
      el.play().catch(() => setAvailable(false))
    } else {
      el.pause()
    }
  }

  const pct = duration ? (progress / duration) * 100 : 0

  return (
    <div className="audio-player">
      <button
        type="button"
        className={`audio-player__btn ${playing ? 'is-playing' : ''}`}
        onClick={toggle}
        aria-label={playing ? 'Pause' : 'Abspielen'}
      >
        {playing ? '❚❚' : '▶'}
      </button>

      <div className="audio-player__meta">
        <div className="audio-player__label">{label}</div>
        <div
          className="audio-player__track"
          role="progressbar"
          aria-valuenow={Math.round(pct)}
        >
          <div
            className="audio-player__fill"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="audio-player__time">
          {fmt(progress)} <span>/</span> {fmt(duration)}
        </div>
      </div>

      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime || 0)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
        onError={() => setAvailable(false)}
      />
    </div>
  )
}

function fmt(seconds) {
  if (!seconds || !isFinite(seconds)) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

import { useGeolocation, distanceMeters } from '../hooks/useGeolocation'

/**
 * Sperrt children, bis der Spieler nah genug am Ziel ist.
 * - target: { lat, lon } | null  (null = überspringen, z.B. Station 1)
 * - toleranceMeters
 * - devMode: true → Gate übergehen
 */
export default function LocationGate({ target, toleranceMeters = 30, devMode = false, children }) {
  const { position, accuracy, error, status } = useGeolocation()

  if (!target || devMode) return children

  const dist = position ? distanceMeters(position, target) : null
  const isClose = dist !== null && dist <= toleranceMeters + (accuracy ?? 0)

  if (isClose) return children

  return (
    <div className="gate">
      <div className="gate__sigil" aria-hidden="true">
        <svg viewBox="0 0 60 60" width="48" height="48">
          <circle cx="30" cy="30" r="26" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path d="M30 8 v44 M8 30 h44" stroke="currentColor" strokeWidth="0.8" />
          <circle cx="30" cy="30" r="3" fill="currentColor" />
        </svg>
      </div>

      <h2 className="gate__title">Komm näher.</h2>

      {status === 'denied' && (
        <p className="gate__msg">
          Du hast den Standortzugriff verweigert. Ohne ihn kann die Mittwelt dich nicht
          finden. Erlaube den Zugriff in deinen Browser-Einstellungen und lade die Seite
          neu.
        </p>
      )}

      {status === 'error' && (
        <p className="gate__msg">
          Der Standort konnte nicht ermittelt werden.
          {error ? <> <span className="gate__err">({error})</span></> : null}
        </p>
      )}

      {status === 'pending' && (
        <p className="gate__msg">Lausche nach deinem Standort…</p>
      )}

      {status === 'active' && dist !== null && (
        <>
          <p className="gate__msg">
            Du bist noch <strong>{formatDist(dist)}</strong> entfernt.
            {accuracy ? (
              <> <span className="gate__hint">(±{Math.round(accuracy)} m)</span></>
            ) : null}
          </p>
          <p className="gate__sub">
            Gehe weiter. Wenn du nah genug bist, öffnet sich die Schwelle von selbst.
          </p>
        </>
      )}

      <details className="gate__dev">
        <summary>Probelauf?</summary>
        <p>
          Hänge <code>?dev=1</code> an die URL, um Standortprüfungen zu überspringen.
        </p>
      </details>
    </div>
  )
}

function formatDist(meters) {
  if (meters < 1000) return `${Math.round(meters)} m`
  return `${(meters / 1000).toFixed(2)} km`
}

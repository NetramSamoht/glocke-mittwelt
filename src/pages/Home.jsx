import { Link } from 'react-router-dom'
import { STATIONS } from '../data/stations.js'

export default function Home({ gameState, onReset, onStart }) {
  const { state } = gameState
  const hasProgress = state.visitedStations.length > 0
  const firstStation = STATIONS[0]

  return (
    <div className="home">
      <header className="home__header">
        <div className="home__overline">Eine Audio-Schnitzeljagd</div>
        <h1 className="home__title">
          Die Glocke<br />
          <span className="home__title-em">der Mittwelt</span>
        </h1>
        <div className="home__ornament" aria-hidden="true">
          <span>✦</span>
          <span className="home__ornament-line" />
          <span>✦</span>
        </div>
      </header>

      <section className="home__intro">
        <p>
          Drei Schläge in der Nacht. Eine Glocke, die seit achtzig Jahren nicht
          mehr geläutet hat. Fünf Stimmen, die sich erinnern. Und am Ende eine
          Wahl, die alles entscheidet.
        </p>
        <p className="home__intro-small">
          Du brauchst Kopfhörer, Standortzugriff und die Bereitschaft, ein
          Stück Weg zu gehen.
        </p>
      </section>

      <section className="home__actions">
        {hasProgress ? (
          <>
            <Link
              to={`/station/${nextUnvisited(state) ?? firstStation.id}`}
              className="btn btn--primary"
              onClick={onStart}
            >
              Weiter ziehen
            </Link>
            <button type="button" className="btn btn--ghost" onClick={onReset}>
              Von vorn beginnen
            </button>
          </>
        ) : (
          <Link
            to={`/station/${firstStation.id}`}
            className="btn btn--primary"
            onClick={onStart}
          >
            Beginnen
          </Link>
        )}
      </section>

      <section className="home__progress">
        <h2 className="home__progress-title">Dein Weg</h2>
        <ol className="trail">
          {STATIONS.map((s, i) => {
            const done = state.completedStations.includes(s.id)
            const visited = state.visitedStations.includes(s.id)
            return (
              <li
                key={s.id}
                className={`trail__step ${done ? 'is-done' : ''} ${
                  visited ? 'is-visited' : ''
                }`}
              >
                <span className="trail__num">{romanize(i + 1)}</span>
                <span className="trail__name">
                  {visited || done ? s.name : '— noch verborgen —'}
                </span>
                {state.choices[s.id] && (
                  <span className={`trail__choice trail__choice--${state.choices[s.id]}`}>
                    {state.choices[s.id] === 'open' ? 'Öffnen' : 'Zerstören'}
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </section>

      <footer className="home__footer">
        <p>Drüben gibt es keine Lüge.</p>
      </footer>
    </div>
  )
}

function nextUnvisited(state) {
  for (const s of STATIONS) {
    if (!state.completedStations.includes(s.id)) return s.id
  }
  return null
}

function romanize(n) {
  return ['I', 'II', 'III', 'IV', 'V'][n - 1] ?? String(n)
}

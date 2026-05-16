import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import AudioPlayer from '../components/AudioPlayer.jsx'
import CharacterPortrait from '../components/CharacterPortrait.jsx'
import ChoiceButtons from '../components/ChoiceButtons.jsx'
import LocationGate from '../components/LocationGate.jsx'
import { getStation, getNextStation } from '../data/stations.js'

/**
 * Phasen einer Station:
 * - 'main'    : Haupt-Audio + Text
 * - 'choice'  : (außer Rabe & nach Antwort) Frage Öffnen/Zerstören
 * - 'reaction': Reaktions-Audio + Hinweis zum nächsten Weg
 *
 * Rabe (Station 1) hat keine Wahl – direkt 'main' → nextHint.
 * Schmiedin (Station 5) hat zwar Wahl, aber das nextHint führt zum Ending.
 */
export default function Station({ gameState }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const devMode = searchParams.get('dev') === '1'

  const station = getStation(id)
  const { state, visitStation, completeStation, setChoice } = gameState

  // Beim ersten Render dieser Station: als visited markieren
  useEffect(() => {
    if (station) visitStation(station.id)
  }, [station, visitStation])

  const existingChoice = state.choices[id]
  // Wenn man eine Station erneut betritt, springe zur passenden Phase
  const initialPhase =
    station?.faction === 'neutral'
      ? 'main'
      : existingChoice
      ? 'reaction'
      : 'main'
  const [phase, setPhase] = useState(initialPhase)

  // Bei Routenwechsel: Phase neu setzen
  useEffect(() => {
    setPhase(initialPhase)
  }, [id, initialPhase])

  if (!station) {
    return (
      <div className="page">
        <p>Diese Stimme kennt niemand mehr.</p>
        <Link to="/" className="btn">Zurück</Link>
      </div>
    )
  }

  const handleChoice = (choice) => {
    setChoice(station.id, choice)
    setPhase('reaction')
  }

  const handleAdvance = () => {
    completeStation(station.id)
    if (station.isFinal) {
      navigate('/ende')
    } else {
      const next = getNextStation(station.id)
      if (next) navigate(`/station/${next.id}${devMode ? '?dev=1' : ''}`)
      else navigate('/ende')
    }
  }

  // Welcher Hinweis kommt nach der Wahl?
  const hint =
    existingChoice === 'open'
      ? station.nextHintOpen
      : existingChoice === 'destroy'
      ? station.nextHintDestroy
      : station.nextHint

  const reactionText =
    existingChoice === 'open'
      ? station.text.reactionOpen
      : station.text.reactionDestroy

  const reactionAudio =
    existingChoice === 'open'
      ? station.audio.reactionOpen
      : station.audio.reactionDestroy

  const isMatchingFaction =
    existingChoice && station.faction !== 'neutral'
      ? existingChoice === station.faction
      : true

  return (
    <LocationGate
      target={station.location}
      toleranceMeters={station.locationToleranceMeters}
      devMode={devMode}
    >
      <article className={`station station--${station.id}`}>
        <header className="station__header">
          <div className="station__index">Station {roman(station.index)}</div>
          <h1 className="station__name">{station.name}</h1>
          <div className="station__role">{station.role}</div>
        </header>

        <CharacterPortrait
          src={station.image}
          name={station.name}
          sigil={sigilFor(station.id)}
        />

        {phase === 'main' && (
          <>
            <AudioPlayer src={station.audio.main} label="Stimme" />
            <div className="scroll">
              <pre className="scroll__text">{station.text.main}</pre>
            </div>

            {station.faction === 'neutral' ? (
              <div className="station__actions">
                {/* Hier später Rätsel einbauen */}
                <RiddlePlaceholder />
                <NextHintBlock hint={station.nextHint} />
                <button type="button" className="btn btn--primary" onClick={handleAdvance}>
                  Weiterziehen
                </button>
              </div>
            ) : station.isFinal ? (
              <div className="station__actions">
                <p className="prompt">Sprich. Was wählst du?</p>
                <ChoiceButtons onChoose={handleChoice} />
              </div>
            ) : (
              <div className="station__actions">
                <p className="prompt">Sprich. Was wählst du?</p>
                <ChoiceButtons onChoose={handleChoice} />
              </div>
            )}
          </>
        )}

        {phase === 'reaction' && station.faction !== 'neutral' && (
          <>
            <div className={`reaction-tag reaction-tag--${isMatchingFaction ? 'aligned' : 'opposed'}`}>
              {isMatchingFaction
                ? 'Sie ist auf eurer Seite.'
                : 'Sie ist nicht eurer Meinung.'}
            </div>

            <AudioPlayer src={reactionAudio} label="Reaktion" />
            <div className="scroll">
              <pre className="scroll__text">{reactionText}</pre>
            </div>

            {!station.isFinal && (
              <>
                {/* Hier später Rätsel einbauen */}
                <RiddlePlaceholder hardened={!isMatchingFaction} />
                <NextHintBlock hint={hint} />
              </>
            )}

            <div className="station__actions">
              {station.isFinal ? (
                <button type="button" className="btn btn--primary" onClick={handleAdvance}>
                  Das Ende hören
                </button>
              ) : (
                <button type="button" className="btn btn--primary" onClick={handleAdvance}>
                  Zur nächsten Station
                </button>
              )}

              {!station.isFinal && (
                <button
                  type="button"
                  className="btn btn--ghost"
                  onClick={() => {
                    // Möglichkeit, Wahl zu revidieren, solange Station nicht abgeschlossen
                    setChoice(station.id, undefined)
                    setPhase('main')
                  }}
                >
                  Anders sprechen
                </button>
              )}
            </div>
          </>
        )}

        <nav className="station__nav">
          <Link to="/" className="link-back">← Übersicht</Link>
        </nav>
      </article>
    </LocationGate>
  )
}

function RiddlePlaceholder({ hardened }) {
  return (
    <div className={`riddle ${hardened ? 'riddle--hard' : ''}`}>
      <div className="riddle__label">
        {hardened ? 'Rätsel (verschlossen)' : 'Rätsel'}
      </div>
      <div className="riddle__body">
        <em>
          Hier kommt später das Rätsel der Station. Für jetzt: tippe weiter.
        </em>
      </div>
    </div>
  )
}

function NextHintBlock({ hint }) {
  if (!hint) return null
  return (
    <div className="hint">
      <div className="hint__label">Hinweis</div>
      <div className="hint__body">{hint}</div>
    </div>
  )
}

function roman(n) {
  return ['I', 'II', 'III', 'IV', 'V'][n - 1] ?? String(n)
}

function sigilFor(id) {
  switch (id) {
    case 'rabe':
      return '☩'
    case 'fee':
      return '✺'
    case 'wassermann':
      return '≈'
    case 'moosfrau':
      return '✾'
    case 'schmiedin':
      return '⚒'
    default:
      return '✶'
  }
}

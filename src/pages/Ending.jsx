import { Link } from 'react-router-dom'
import AudioPlayer from '../components/AudioPlayer.jsx'
import { determineEnding } from '../data/stations.js'

export default function Ending({ gameState, onReset }) {
  const { state } = gameState
  const ending = determineEnding(state.choices)

  if (!ending) {
    return (
      <div className="page page--centered">
        <h1>Der Weg ist noch nicht zu Ende.</h1>
        <p>Es fehlen noch Stimmen. Geh zurück und höre sie.</p>
        <Link to="/" className="btn btn--primary">Zurück</Link>
      </div>
    )
  }

  const honest =
    state.choices.fee === state.choices.schmiedin &&
    state.choices.wassermann === state.choices.schmiedin &&
    state.choices.moosfrau === state.choices.schmiedin

  return (
    <article className={`ending ending--${ending.id.toLowerCase()}`}>
      <header className="ending__header">
        <div className="ending__sigil" aria-hidden="true">
          {sigilForEnding(ending.id)}
        </div>
        <div className="ending__overline">Schlussstein {ending.id}</div>
        <h1 className="ending__title">{ending.title}</h1>
        <div className={`ending__tag ending__tag--${honest ? 'honest' : 'lied'}`}>
          {honest ? 'Mit klarer Stimme' : 'Mit gerissener Stimme'}
        </div>
      </header>

      <AudioPlayer src={ending.audio} label="Schluss" />

      <div className="scroll scroll--final">
        <pre className="scroll__text">{ending.text}</pre>
      </div>

      <div className="ending__choices">
        <h2>Was du gesagt hast</h2>
        <ul>
          <li>
            Bei der Fee: <strong>{choiceLabel(state.choices.fee)}</strong>
          </li>
          <li>
            Beim Wassermann: <strong>{choiceLabel(state.choices.wassermann)}</strong>
          </li>
          <li>
            Bei der Moosfrau: <strong>{choiceLabel(state.choices.moosfrau)}</strong>
          </li>
          <li>
            Bei der Schmiedin: <strong>{choiceLabel(state.choices.schmiedin)}</strong>
          </li>
        </ul>
      </div>

      <div className="ending__actions">
        <Link to="/" className="btn">Zur Übersicht</Link>
        <button type="button" className="btn btn--ghost" onClick={onReset}>
          Von vorn beginnen
        </button>
      </div>
    </article>
  )
}

function choiceLabel(c) {
  if (c === 'open') return 'Öffnen'
  if (c === 'destroy') return 'Zerstören'
  return '—'
}

function sigilForEnding(id) {
  switch (id) {
    case 'A':
      return '◯'
    case 'B':
      return '◐'
    case 'C':
      return '⨯'
    case 'D':
      return '◑'
    default:
      return '✶'
  }
}

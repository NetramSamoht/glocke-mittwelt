export default function ChoiceButtons({ onChoose, disabled }) {
  return (
    <div className="choices">
      <button
        type="button"
        className="choice choice--open"
        onClick={() => onChoose('open')}
        disabled={disabled}
      >
        <span className="choice__rune" aria-hidden="true">◯</span>
        <span className="choice__label">Öffnen</span>
        <span className="choice__sub">Lass durch, was wartet.</span>
      </button>

      <button
        type="button"
        className="choice choice--destroy"
        onClick={() => onChoose('destroy')}
        disabled={disabled}
      >
        <span className="choice__rune" aria-hidden="true">⨯</span>
        <span className="choice__label">Zerstören</span>
        <span className="choice__sub">Schließ es für immer.</span>
      </button>
    </div>
  )
}

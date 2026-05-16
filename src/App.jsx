import { useCallback, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Station from './pages/Station.jsx'
import Ending from './pages/Ending.jsx'
import { useGameState } from './hooks/useGameState.js'

export default function App() {
  const gameState = useGameState()
  const [confirmReset, setConfirmReset] = useState(false)

  const handleResetRequest = useCallback(() => setConfirmReset(true), [])

  const handleConfirmReset = useCallback(() => {
    gameState.reset()
    setConfirmReset(false)
  }, [gameState])

  return (
    <div className="app">
      <div className="app__bg" aria-hidden="true" />
      <div className="app__grain" aria-hidden="true" />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              gameState={gameState}
              onReset={handleResetRequest}
              onStart={gameState.start}
            />
          }
        />
        <Route
          path="/station/:id"
          element={<Station gameState={gameState} />}
        />
        <Route
          path="/ende"
          element={<Ending gameState={gameState} onReset={handleResetRequest} />}
        />
      </Routes>

      {confirmReset && (
        <div className="modal" role="dialog" aria-modal="true">
          <div className="modal__card">
            <h2>Wirklich von vorn?</h2>
            <p>Alle Stimmen, alle Wahlen werden vergessen.</p>
            <div className="modal__actions">
              <button
                type="button"
                className="btn btn--danger"
                onClick={handleConfirmReset}
              >
                Vergessen
              </button>
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => setConfirmReset(false)}
              >
                Behalten
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'glocke-mittwelt-state-v1'

const initialState = {
  visitedStations: [], // array of station ids the player has unlocked
  completedStations: [], // station ids where main audio + (if applicable) choice was made
  choices: {}, // { stationId: 'open' | 'destroy' }
  startedAt: null,
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return initialState
    const parsed = JSON.parse(raw)
    return { ...initialState, ...parsed }
  } catch {
    return initialState
  }
}

function save(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // localStorage full or disabled – nicht fatal
  }
}

export function useGameState() {
  const [state, setState] = useState(load)

  useEffect(() => {
    save(state)
  }, [state])

  const start = useCallback(() => {
    setState((s) => ({
      ...s,
      startedAt: s.startedAt ?? new Date().toISOString(),
    }))
  }, [])

  const visitStation = useCallback((id) => {
    setState((s) => {
      if (s.visitedStations.includes(id)) return s
      return { ...s, visitedStations: [...s.visitedStations, id] }
    })
  }, [])

  const completeStation = useCallback((id) => {
    setState((s) => {
      if (s.completedStations.includes(id)) return s
      return { ...s, completedStations: [...s.completedStations, id] }
    })
  }, [])

  const setChoice = useCallback((stationId, choice) => {
    setState((s) => ({
      ...s,
      choices: { ...s.choices, [stationId]: choice },
    }))
  }, [])

  const reset = useCallback(() => {
    setState(initialState)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* noop */
    }
  }, [])

  return {
    state,
    start,
    visitStation,
    completeStation,
    setChoice,
    reset,
  }
}

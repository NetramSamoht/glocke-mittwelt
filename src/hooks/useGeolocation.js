import { useEffect, useState } from 'react'

/**
 * Haversine-Distanz in Metern.
 */
export function distanceMeters(a, b) {
  if (!a || !b) return Infinity
  const R = 6371000
  const toRad = (deg) => (deg * Math.PI) / 180
  const dLat = toRad(b.lat - a.lat)
  const dLon = toRad(b.lon - a.lon)
  const lat1 = toRad(a.lat)
  const lat2 = toRad(b.lat)
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(h))
}

/**
 * Verfolgt die Position via watchPosition.
 * Liefert: { position, accuracy, error, status, retry }
 */
export function useGeolocation() {
  const [position, setPosition] = useState(null) // { lat, lon }
  const [accuracy, setAccuracy] = useState(null)
  const [error, setError] = useState(null)
  const [status, setStatus] = useState('idle') // idle | pending | active | denied | error

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setStatus('error')
      setError('Geolocation wird vom Browser nicht unterstützt.')
      return
    }

    setStatus('pending')

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setPosition({ lat: pos.coords.latitude, lon: pos.coords.longitude })
        setAccuracy(pos.coords.accuracy)
        setError(null)
        setStatus('active')
      },
      (err) => {
        setError(err.message)
        if (err.code === err.PERMISSION_DENIED) setStatus('denied')
        else setStatus('error')
      },
      {
        enableHighAccuracy: true,
        maximumAge: 5000,
        timeout: 20000,
      }
    )

    return () => navigator.geolocation.clearWatch(watchId)
  }, [])

  return { position, accuracy, error, status }
}

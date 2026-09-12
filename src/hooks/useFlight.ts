import { useState, useCallback } from 'react'
import { flightService } from '../services/flightService'
import { Flight } from '../mocks/flights.mock'
import { ApiError } from '../services/apiClient'

interface UseFlightReturn {
  flight: Flight | null
  loading: boolean
  error: string | null
  fetchFlight: (id: string) => Promise<void>
  clearError: () => void
}

export const useFlight = (): UseFlightReturn => {
  const [flight, setFlight] = useState<Flight | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchFlight = useCallback(async (id: string) => {
    setLoading(true)
    setError(null)

    try {
      const result = await flightService.getFlightById(id)
      if (result) {
        setFlight(result)
      } else {
        setError('Flight not found')
      }
    } catch (err) {
      const apiError = err as ApiError
      setError(apiError.message || 'Failed to fetch flight details. Please try again.')
      setFlight(null)
    } finally {
      setLoading(false)
    }
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    flight,
    loading,
    error,
    fetchFlight,
    clearError,
  }
}

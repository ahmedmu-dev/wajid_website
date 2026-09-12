import { useState, useCallback } from 'react'
import { flightService, FlightSearchParams } from '../services/flightService'
import { Flight } from '../mocks/flights.mock'
import { ApiError } from '../services/apiClient'

interface UseFlightSearchReturn {
  flights: Flight[]
  loading: boolean
  error: string | null
  searchFlights: (params: FlightSearchParams) => Promise<void>
  clearError: () => void
}

export const useFlightSearch = (): UseFlightSearchReturn => {
  const [flights, setFlights] = useState<Flight[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchFlights = useCallback(async (params: FlightSearchParams) => {
    setLoading(true)
    setError(null)

    try {
      const results = await flightService.searchFlights(params)
      setFlights(results)
    } catch (err) {
      const apiError = err as ApiError
      setError(apiError.message || 'Failed to search flights. Please try again.')
      setFlights([])
    } finally {
      setLoading(false)
    }
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    flights,
    loading,
    error,
    searchFlights,
    clearError,
  }
}

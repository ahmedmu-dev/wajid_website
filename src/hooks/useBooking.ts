import { useState, useCallback } from 'react'
import { bookingService } from '../services/bookingService'
import { BookingRequest, BookingResponse } from '../mocks/booking.mock'
import { ApiError } from '../services/apiClient'

interface UseBookingReturn {
  booking: BookingResponse | null
  loading: boolean
  error: string | null
  submitBooking: (request: BookingRequest) => Promise<BookingResponse | null>
  clearError: () => void
  reset: () => void
}

export const useBooking = (): UseBookingReturn => {
  const [booking, setBooking] = useState<BookingResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submitBooking = useCallback(
    async (request: BookingRequest): Promise<BookingResponse | null> => {
      setLoading(true)
      setError(null)
      setBooking(null)

      try {
        const response = await bookingService.submitBooking(request)
        setBooking(response)
        return response
      } catch (err) {
        const apiError = err as ApiError
        setError(apiError.message || 'Failed to submit booking. Please try again.')
        return null
      } finally {
        setLoading(false)
      }
    },
    []
  )

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const reset = useCallback(() => {
    setBooking(null)
    setError(null)
    setLoading(false)
  }, [])

  return {
    booking,
    loading,
    error,
    submitBooking,
    clearError,
    reset,
  }
}

import { apiClient } from './apiClient'
import { BookingRequest, BookingResponse } from '../mocks/booking.mock'

/**
 * Booking Service
 * All booking-related API calls go through this service
 * To switch to real backend, only change the implementation here
 */
class BookingService {
  /**
   * Submit a booking request
   */
  async submitBooking(request: BookingRequest): Promise<BookingResponse> {
    try {
      const response = await apiClient.post<BookingResponse>('/bookings', request)
      return response
    } catch (error) {
      console.error('Error submitting booking:', error)
      throw error
    }
  }
}

export const bookingService = new BookingService()

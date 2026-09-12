/**
 * Mock Adapter for Axios
 * Intercepts HTTP requests and routes them to mock handlers
 * This ensures we're using HTTP requests even with mock data
 */

import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { mockApiHandler } from './mockApiHandler'
import { BookingRequest } from '../mocks/booking.mock'

const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API !== 'false' // Default to true

export const createMockAdapter = () => {
  return async (config: AxiosRequestConfig): Promise<AxiosResponse> => {
    if (!USE_MOCK_API) {
      throw new Error('Mock adapter should not be used when real API is enabled')
    }

    const { url, method, params, data } = config
    let fullUrl = url || ''
    
    // Remove base URL if present (e.g., /api/flights/search -> /flights/search)
    if (fullUrl.startsWith('/api/')) {
      fullUrl = fullUrl.replace('/api', '')
    }

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    // Route GET /flights/search
    if (method === 'get' && (fullUrl.includes('/flights/search') || fullUrl === '/flights/search')) {
      const searchParams = {
        departure: params?.departure || '',
        destination: params?.destination || '',
        departureDate: params?.departureDate || '',
        returnDate: params?.returnDate,
        passengers: params?.passengers || 1,
      }

      const flights = await mockApiHandler.searchFlights(searchParams)

      return {
        data: { flights, total: flights.length },
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      } as unknown as AxiosResponse
    }

    // Route GET /flights/:id
    if (method === 'get' && fullUrl.match(/\/flights\/[^/]+$/)) {
      const match = fullUrl.match(/\/flights\/([^/]+)$/)
      const flightId = match ? match[1] : ''

      const flight = await mockApiHandler.getFlightById(flightId)

      if (!flight) {
        return {
          data: { message: 'Flight not found' },
          status: 404,
          statusText: 'Not Found',
          headers: {},
          config,
        } as unknown as AxiosResponse
      }

      return {
        data: flight,
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      } as unknown as AxiosResponse
    }

    // Route POST /bookings
    if (method === 'post' && (fullUrl.includes('/bookings') || fullUrl === '/bookings')) {
      const bookingRequest = data as BookingRequest
      const booking = await mockApiHandler.submitBooking(bookingRequest)

      return {
        data: booking,
        status: 201,
        statusText: 'Created',
        headers: {},
        config,
      } as unknown as AxiosResponse
    }

    // Default 404 for unmatched routes
    return {
      data: { message: 'Endpoint not found' },
      status: 404,
      statusText: 'Not Found',
      headers: {},
      config,
    } as unknown as AxiosResponse
  }
}

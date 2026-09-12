import { apiClient } from './apiClient'
import { Airport, Flight, mockAirports } from '../mocks/flights.mock'

export interface FlightSearchParams {
  departure: string
  destination: string
  departureDate: string
  returnDate?: string
  passengers: number
}

export interface FlightSearchResponse {
  flights: Flight[]
  total: number
}

/**
 * Flight Service
 * All flight-related API calls go through this service
 * To switch to real backend, only change the implementation here
 */
class FlightService {
  /**
   * Search for flights based on criteria
   */
  async searchFlights(params: FlightSearchParams): Promise<Flight[]> {
    try {
      const response = await apiClient.get<FlightSearchResponse>('/flights/search', {
        params: {
          departure: params.departure,
          destination: params.destination,
          departureDate: params.departureDate,
          returnDate: params.returnDate,
          passengers: params.passengers,
        },
      })
      return response.flights || []
    } catch (error) {
      console.error('Error searching flights:', error)
      throw error
    }
  }

  /**
   * Get flight details by ID
   */
  async getFlightById(id: string): Promise<Flight | null> {
    try {
      const flight = await apiClient.get<Flight>(`/flights/${id}`)
      return flight
    } catch (error) {
      console.error('Error fetching flight:', error)
      throw error
    }
  }

  /**
   * Get the list of airports available for search autocomplete
   */
  getAirports(): Airport[] {
    return mockAirports
  }
}

export const flightService = new FlightService()

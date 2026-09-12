/**
 * Mock API Handler
 * This simulates a real backend API using Vite's proxy or service worker
 * In production, this would be replaced by a real backend
 */

import { mockFlights, Flight } from '../mocks/flights.mock'
import { BookingRequest, BookingResponse, processMockBooking } from '../mocks/booking.mock'

export interface SearchParams {
  departure: string
  destination: string
  departureDate: string
  returnDate?: string
  passengers: number
}

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const addDays = (dateString: string, days: number): string => {
  const date = new Date(dateString)
  date.setDate(date.getDate() + days)
  return date.toISOString().split('T')[0]
}

export const mockApiHandler = {
  async searchFlights(params: SearchParams): Promise<Flight[]> {
    await delay(800) // Simulate network delay

    const { departure, destination, departureDate } = params

    // Filter flights based on search criteria
    let results = mockFlights.filter((flight) => {
      const matchesDeparture =
        flight.departure.airportCode.toLowerCase() === departure.toLowerCase() ||
        flight.departure.city.toLowerCase() === departure.toLowerCase()
      const matchesDestination =
        flight.arrival.airportCode.toLowerCase() === destination.toLowerCase() ||
        flight.arrival.city.toLowerCase() === destination.toLowerCase()
      const matchesDate = flight.departure.date === departureDate

      return matchesDeparture && matchesDestination && matchesDate
    })

    // If no exact matches, return some sample flights (for demo purposes)
    if (results.length === 0) {
      results = mockFlights.slice(0, 3).map((flight) => {
        // Preserve whether the original flight lands the same day or overnight
        const dayOffset = Math.round(
          (new Date(flight.arrival.date).getTime() - new Date(flight.departure.date).getTime()) /
            (24 * 60 * 60 * 1000)
        )

        return {
          ...flight,
          departure: {
            ...flight.departure,
            airportCode: departure.toUpperCase().slice(0, 3),
            city: departure,
            date: departureDate,
          },
          arrival: {
            ...flight.arrival,
            airportCode: destination.toUpperCase().slice(0, 3),
            city: destination,
            date: addDays(departureDate, dayOffset),
          },
        }
      })
    }

    return results
  },

  async getFlightById(id: string): Promise<Flight | null> {
    await delay(500)

    const flight = mockFlights.find((f) => f.id === id)
    return flight || null
  },

  async submitBooking(request: BookingRequest): Promise<BookingResponse> {
    await delay(1500)

    const response = await processMockBooking(request)

    // Get flight price
    const flight = mockFlights.find((f) => f.id === request.flightId)
    if (flight) {
      response.totalAmount = flight.price * request.passengers
      response.currency = flight.currency
    }

    return response
  },
}

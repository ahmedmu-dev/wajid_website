export interface BookingRequest {
  flightId: string
  passenger: {
    fullName: string
    dateOfBirth: string
    nationality: string
    gender: string
  }
  passport: {
    number: string
    issuingCountry: string
    expiryDate: string
  }
  contact: {
    email: string
    phone: string
  }
  passengers: number
}

export interface BookingResponse {
  bookingId: string
  status: 'confirmed' | 'pending' | 'failed'
  message: string
  flightId: string
  passengerName: string
  bookingDate: string
  totalAmount: number
  currency: string
}

// Simulate booking processing
export const processMockBooking = async (
  request: BookingRequest
): Promise<BookingResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Simulate occasional failures (10% chance)
  if (Math.random() < 0.1) {
    throw new Error('Booking failed. Please try again.')
  }

  return {
    bookingId: `BK${Date.now()}`,
    status: 'confirmed',
    message: 'Your booking has been confirmed successfully.',
    flightId: request.flightId,
    passengerName: request.passenger.fullName,
    bookingDate: new Date().toISOString(),
    totalAmount: 0, // Will be calculated based on flight price
    currency: 'USD',
  }
}

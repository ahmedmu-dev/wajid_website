import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './BookingConfirmationPage.css'

export const BookingConfirmationPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>()
  const navigate = useNavigate()

  // In a real app, we would fetch booking details using bookingId
  // For now, we'll just show a confirmation message

  return (
    <div className="booking-confirmation-page">
      <div className="booking-confirmation-page__container">
        <div className="booking-confirmation-page__card">
          <div className="booking-confirmation-page__icon">✓</div>
          <h1>Booking Confirmed!</h1>
          <p className="booking-confirmation-page__message">
            Your flight booking has been successfully confirmed.
          </p>
          {bookingId && (
            <div className="booking-confirmation-page__details">
              <p>
                <strong>Booking ID:</strong> {bookingId}
              </p>
            </div>
          )}
          <div className="booking-confirmation-page__actions">
            <button
              onClick={() => navigate('/')}
              className="booking-confirmation-page__button"
            >
              Search Another Flight
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

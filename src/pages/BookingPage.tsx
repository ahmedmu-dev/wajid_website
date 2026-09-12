import React, { useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useFlight } from '../hooks/useFlight'
import { useBooking } from '../hooks/useBooking'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { ErrorMessage } from '../components/ErrorMessage'
import { BookingRequest } from '../mocks/booking.mock'
import {
  validateEmail,
  validatePhone,
  validatePassportNumber,
  validateFullName,
} from '../utils/validation'
import './BookingPage.css'

interface BookingFormData {
  fullName: string
  dateOfBirth: string
  nationality: string
  gender: string
  passportNumber: string
  issuingCountry: string
  passportExpiryDate: string
  email: string
  phone: string
}

export const BookingPage: React.FC = () => {
  const { flightId } = useParams<{ flightId: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const passengers = (location.state as { passengers?: number } | null)?.passengers ?? 1
  const { flight, loading: flightLoading, error: flightError, fetchFlight } = useFlight()
  const { booking, loading: bookingLoading, error: bookingError, submitBooking } = useBooking()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormData>()

  useEffect(() => {
    if (flightId) {
      fetchFlight(flightId)
    }
  }, [flightId, fetchFlight])

  useEffect(() => {
    if (booking) {
      navigate(`/booking-confirmation/${booking.bookingId}`)
    }
  }, [booking, navigate])

  const onSubmit = async (data: BookingFormData) => {
    if (!flightId) return

    const bookingRequest: BookingRequest = {
      flightId,
      passenger: {
        fullName: data.fullName,
        dateOfBirth: data.dateOfBirth,
        nationality: data.nationality,
        gender: data.gender,
      },
      passport: {
        number: data.passportNumber,
        issuingCountry: data.issuingCountry,
        expiryDate: data.passportExpiryDate,
      },
      contact: {
        email: data.email,
        phone: data.phone,
      },
      passengers,
    }

    await submitBooking(bookingRequest)
  }

  if (flightLoading) {
    return (
      <div className="booking-page">
        <div className="booking-page__container">
          <LoadingSpinner />
        </div>
      </div>
    )
  }

  if (flightError || !flight) {
    return (
      <div className="booking-page">
        <div className="booking-page__container">
          <ErrorMessage message={flightError || 'Flight not found'} />
          <button onClick={() => navigate('/')} className="booking-page__back-button">
            Back to Search
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="booking-page">
      <div className="booking-page__container">
        <button onClick={() => navigate(-1)} className="booking-page__back-button">
          ← Back
        </button>

        <div className="booking-page__content">
          <div className="booking-page__flight-summary">
            <h2>Flight Details</h2>
            <div className="booking-page__flight-info">
              <div className="booking-page__flight-route">
                <div>
                  <div className="booking-page__airport-code">{flight.departure.airportCode}</div>
                  <div className="booking-page__city">{flight.departure.city}</div>
                  <div className="booking-page__time">{flight.departure.time}</div>
                </div>
                <div className="booking-page__arrow">→</div>
                <div>
                  <div className="booking-page__airport-code">{flight.arrival.airportCode}</div>
                  <div className="booking-page__city">{flight.arrival.city}</div>
                  <div className="booking-page__time">{flight.arrival.time}</div>
                </div>
              </div>
              <div className="booking-page__flight-details">
                <p>
                  <strong>{flight.airline}</strong> {flight.flightNumber}
                </p>
                <p>Duration: {flight.duration}</p>
                <p>
                  Passengers: <strong>{passengers}</strong>
                </p>
                <p>
                  Total Price:{' '}
                  <strong>
                    {flight.currency} {(flight.price * passengers).toLocaleString()}
                  </strong>
                </p>
              </div>
            </div>
          </div>

          <div className="booking-page__form-section">
            <h2>Passenger Information</h2>
            {bookingError && <ErrorMessage message={bookingError} />}

            <form onSubmit={handleSubmit(onSubmit)} className="booking-form">
              <div className="booking-form__section">
                <h3>Personal Details</h3>
                <div className="booking-form__grid">
                  <div className="booking-form__field">
                    <label htmlFor="fullName">
                      Full Name (as in passport) <span className="required">*</span>
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      {...register('fullName', {
                        required: 'Full name is required',
                        validate: (value) =>
                          validateFullName(value) || 'Please enter your full name (first and last)',
                      })}
                      className={errors.fullName ? 'error' : ''}
                    />
                    {errors.fullName && (
                      <span className="booking-form__error">{errors.fullName.message}</span>
                    )}
                  </div>

                  <div className="booking-form__field">
                    <label htmlFor="dateOfBirth">
                      Date of Birth <span className="required">*</span>
                    </label>
                    <input
                      id="dateOfBirth"
                      type="date"
                      {...register('dateOfBirth', {
                        required: 'Date of birth is required',
                      })}
                      className={errors.dateOfBirth ? 'error' : ''}
                    />
                    {errors.dateOfBirth && (
                      <span className="booking-form__error">{errors.dateOfBirth.message}</span>
                    )}
                  </div>

                  <div className="booking-form__field">
                    <label htmlFor="nationality">
                      Nationality <span className="required">*</span>
                    </label>
                    <input
                      id="nationality"
                      type="text"
                      {...register('nationality', {
                        required: 'Nationality is required',
                      })}
                      className={errors.nationality ? 'error' : ''}
                    />
                    {errors.nationality && (
                      <span className="booking-form__error">{errors.nationality.message}</span>
                    )}
                  </div>

                  <div className="booking-form__field">
                    <label htmlFor="gender">
                      Gender <span className="required">*</span>
                    </label>
                    <select
                      id="gender"
                      {...register('gender', {
                        required: 'Gender is required',
                      })}
                      className={errors.gender ? 'error' : ''}
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.gender && (
                      <span className="booking-form__error">{errors.gender.message}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="booking-form__section">
                <h3>Passport Information</h3>
                <div className="booking-form__grid">
                  <div className="booking-form__field">
                    <label htmlFor="passportNumber">
                      Passport Number <span className="required">*</span>
                    </label>
                    <input
                      id="passportNumber"
                      type="text"
                      {...register('passportNumber', {
                        required: 'Passport number is required',
                        validate: (value) =>
                          validatePassportNumber(value) ||
                          'Passport number must be 6-9 alphanumeric characters',
                      })}
                      className={errors.passportNumber ? 'error' : ''}
                      style={{ textTransform: 'uppercase' }}
                    />
                    {errors.passportNumber && (
                      <span className="booking-form__error">{errors.passportNumber.message}</span>
                    )}
                  </div>

                  <div className="booking-form__field">
                    <label htmlFor="issuingCountry">
                      Issuing Country <span className="required">*</span>
                    </label>
                    <input
                      id="issuingCountry"
                      type="text"
                      {...register('issuingCountry', {
                        required: 'Issuing country is required',
                      })}
                      className={errors.issuingCountry ? 'error' : ''}
                    />
                    {errors.issuingCountry && (
                      <span className="booking-form__error">{errors.issuingCountry.message}</span>
                    )}
                  </div>

                  <div className="booking-form__field">
                    <label htmlFor="passportExpiryDate">
                      Passport Expiry Date <span className="required">*</span>
                    </label>
                    <input
                      id="passportExpiryDate"
                      type="date"
                      {...register('passportExpiryDate', {
                        required: 'Passport expiry date is required',
                      })}
                      className={errors.passportExpiryDate ? 'error' : ''}
                    />
                    {errors.passportExpiryDate && (
                      <span className="booking-form__error">
                        {errors.passportExpiryDate.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="booking-form__section">
                <h3>Contact Information</h3>
                <div className="booking-form__grid">
                  <div className="booking-form__field">
                    <label htmlFor="email">
                      Email Address <span className="required">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register('email', {
                        required: 'Email is required',
                        validate: (value) => validateEmail(value) || 'Please enter a valid email',
                      })}
                      className={errors.email ? 'error' : ''}
                    />
                    {errors.email && (
                      <span className="booking-form__error">{errors.email.message}</span>
                    )}
                  </div>

                  <div className="booking-form__field">
                    <label htmlFor="phone">
                      Phone Number <span className="required">*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      {...register('phone', {
                        required: 'Phone number is required',
                        validate: (value) =>
                          validatePhone(value) || 'Please enter a valid phone number',
                      })}
                      className={errors.phone ? 'error' : ''}
                    />
                    {errors.phone && (
                      <span className="booking-form__error">{errors.phone.message}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="booking-form__submit">
                <button type="submit" disabled={bookingLoading} className="booking-form__button">
                  {bookingLoading
                    ? 'Processing...'
                    : `Confirm Booking - ${flight.currency} ${(flight.price * passengers).toLocaleString()}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

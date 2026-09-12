import React from 'react'
import { Flight } from '../mocks/flights.mock'
import { formatTime } from '../utils/dateUtils'
import './FlightCard.css'

interface FlightCardProps {
  flight: Flight
  onClick: () => void
}

const getAirlineInitials = (airline: string): string =>
  airline
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

export const FlightCard: React.FC<FlightCardProps> = ({ flight, onClick }) => {
  return (
    <div className="flight-card" onClick={onClick}>
      <div className="flight-card__header">
        <div className="flight-card__airline">
          <span className="flight-card__airline-badge" aria-hidden="true">
            {getAirlineInitials(flight.airline)}
          </span>
          <span className="flight-card__airline-text">
            <span className="flight-card__airline-name">{flight.airline}</span>
            <span className="flight-card__flight-number">{flight.flightNumber}</span>
          </span>
        </div>
        <div className="flight-card__price">
          <span className="flight-card__price-amount">
            {flight.currency} {flight.price.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="flight-card__route">
        <div className="flight-card__departure">
          <div className="flight-card__time">{formatTime(flight.departure.time)}</div>
          <div className="flight-card__airport-code">{flight.departure.airportCode}</div>
          <div className="flight-card__city">{flight.departure.city}</div>
        </div>

        <div className="flight-card__duration">
          <div className="flight-card__duration-line">
            <span className="flight-card__duration-text">{flight.duration}</span>
          </div>
          {flight.stops > 0 && (
            <div className="flight-card__stops">{flight.stops} stop{flight.stops > 1 ? 's' : ''}</div>
          )}
          {flight.stops === 0 && <div className="flight-card__stops">Direct</div>}
        </div>

        <div className="flight-card__arrival">
          <div className="flight-card__time">{formatTime(flight.arrival.time)}</div>
          <div className="flight-card__airport-code">{flight.arrival.airportCode}</div>
          <div className="flight-card__city">{flight.arrival.city}</div>
        </div>
      </div>

      <div className="flight-card__footer">
        <div className="flight-card__baggage">
          <span>Baggage: {flight.baggage.carryOn}</span>
          {flight.baggage.checked && <span> • {flight.baggage.checked}</span>}
        </div>
        <button className="flight-card__button">Select Flight</button>
      </div>
    </div>
  )
}

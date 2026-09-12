import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchForm, SearchFormData } from '../components/SearchForm'
import { FlightCard } from '../components/FlightCard'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { ErrorMessage } from '../components/ErrorMessage'
import { useFlightSearch } from '../hooks/useFlightSearch'
import './FlightSearchPage.css'

type SortOption = 'price' | 'duration'

export const FlightSearchPage: React.FC = () => {
  const navigate = useNavigate()
  const { flights, loading, error, searchFlights, clearError } = useFlightSearch()
  const [sortBy, setSortBy] = useState<SortOption>('price')
  const [hasSearched, setHasSearched] = useState(false)
  const [passengers, setPassengers] = useState(1)

  const handleSearch = async (data: SearchFormData) => {
    setHasSearched(true)
    setPassengers(data.passengers)
    await searchFlights({
      departure: data.departure,
      destination: data.destination,
      departureDate: data.departureDate,
      returnDate: data.returnDate || undefined,
      passengers: data.passengers,
    })
  }

  const handleFlightClick = (flightId: string) => {
    navigate(`/flight/${flightId}`, { state: { passengers } })
  }

  const sortedFlights = useMemo(() => {
    const sorted = [...flights]

    if (sortBy === 'price') {
      sorted.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'duration') {
      sorted.sort((a, b) => {
        const aMinutes = parseDurationToMinutes(a.duration)
        const bMinutes = parseDurationToMinutes(b.duration)
        return aMinutes - bMinutes
      })
    }

    return sorted
  }, [flights, sortBy])

  const parseDurationToMinutes = (duration: string): number => {
    const match = duration.match(/(\d+)h\s*(\d+)m/)
    if (match) {
      return parseInt(match[1]) * 60 + parseInt(match[2])
    }
    return 0
  }

  return (
    <div className="flight-search-page">
      <div className="flight-search-page__container">
        <header className="flight-search-page__header">
          <div className="flight-search-page__brand">
            <span className="flight-search-page__mark" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4 12.5l16-7.5-6.6 16-2.3-6.5L4 12.5z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <span className="flight-search-page__wordmark">Wajid</span>
          </div>
          <h1>Where to next?</h1>
          <p className="flight-search-page__subtitle">
            Compare fares and book your flight in a couple of minutes.
          </p>
        </header>

        <SearchForm onSubmit={handleSearch} loading={loading} />

        {error && <ErrorMessage message={error} onDismiss={clearError} />}

        {loading && <LoadingSpinner />}

        {!loading && hasSearched && flights.length === 0 && (
          <div className="flight-search-page__empty">
            <p>No flights found. Please try different search criteria.</p>
          </div>
        )}

        {!loading && flights.length > 0 && (
          <div className="flight-search-page__results">
            <div className="flight-search-page__results-header">
              <h2>
                {flights.length} flight{flights.length !== 1 ? 's' : ''} found
              </h2>
              <div className="flight-search-page__sort">
                <label>Sort by:</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortOption)}>
                  <option value="price">Price</option>
                  <option value="duration">Duration</option>
                </select>
              </div>
            </div>

            <div className="flight-search-page__flights">
              {sortedFlights.map((flight) => (
                <FlightCard
                  key={flight.id}
                  flight={flight}
                  onClick={() => handleFlightClick(flight.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

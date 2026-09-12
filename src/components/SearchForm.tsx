import React, { useState, FormEvent } from 'react'
import { flightService } from '../services/flightService'
import './SearchForm.css'

export interface SearchFormData {
  departure: string
  destination: string
  departureDate: string
  returnDate: string
  passengers: number
}

interface SearchFormProps {
  onSubmit: (data: SearchFormData) => void
  loading?: boolean
  initialValues?: Partial<SearchFormData>
}

const airports = flightService.getAirports()

export const SearchForm: React.FC<SearchFormProps> = ({
  onSubmit,
  loading = false,
  initialValues,
}) => {
  const [formData, setFormData] = useState<SearchFormData>({
    departure: initialValues?.departure || '',
    destination: initialValues?.destination || '',
    departureDate: initialValues?.departureDate || '',
    returnDate: initialValues?.returnDate || '',
    passengers: initialValues?.passengers || 1,
  })

  const [errors, setErrors] = useState<Partial<Record<keyof SearchFormData, string>>>({})

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof SearchFormData, string>> = {}

    if (!formData.departure.trim()) {
      newErrors.departure = 'Departure location is required'
    }

    if (!formData.destination.trim()) {
      newErrors.destination = 'Destination is required'
    }

    if (formData.departure === formData.destination) {
      newErrors.destination = 'Destination must be different from departure'
    }

    if (!formData.departureDate) {
      newErrors.departureDate = 'Departure date is required'
    }

    if (formData.passengers < 1 || formData.passengers > 9) {
      newErrors.passengers = 'Number of passengers must be between 1 and 9'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (validate()) {
      onSubmit(formData)
    }
  }

  const handleChange = (field: keyof SearchFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSwap = () => {
    setFormData((prev) => ({
      ...prev,
      departure: prev.destination,
      destination: prev.departure,
    }))
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-form__grid">
        <div className="search-form__field">
          <label htmlFor="departure">From</label>
          <input
            id="departure"
            type="text"
            list="search-form-airports"
            placeholder="City or Airport"
            value={formData.departure}
            onChange={(e) => handleChange('departure', e.target.value)}
            className={errors.departure ? 'error' : ''}
          />
          <span className="search-form__error">{errors.departure || ''}</span>
        </div>

        <div className="search-form__swap-wrapper">
          <button
            type="button"
            className="search-form__swap"
            onClick={handleSwap}
            aria-label="Swap departure and destination"
          >
            ⇄
          </button>
        </div>

        <div className="search-form__field">
          <label htmlFor="destination">To</label>
          <input
            id="destination"
            type="text"
            list="search-form-airports"
            placeholder="City or Airport"
            value={formData.destination}
            onChange={(e) => handleChange('destination', e.target.value)}
            className={errors.destination ? 'error' : ''}
          />
          <span className="search-form__error">{errors.destination || ''}</span>
        </div>

        <datalist id="search-form-airports">
          {airports.map((airport) => (
            <option key={airport.code} value={airport.city} label={`${airport.city} (${airport.code})`} />
          ))}
        </datalist>

        <div className="search-form__field">
          <label htmlFor="departureDate">Departure Date</label>
          <input
            id="departureDate"
            type="date"
            value={formData.departureDate}
            onChange={(e) => handleChange('departureDate', e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className={errors.departureDate ? 'error' : ''}
          />
          <span className="search-form__error">{errors.departureDate || ''}</span>
        </div>

        <div className="search-form__field">
          <label htmlFor="returnDate">Return Date (Optional)</label>
          <input
            id="returnDate"
            type="date"
            value={formData.returnDate}
            onChange={(e) => handleChange('returnDate', e.target.value)}
            min={formData.departureDate || new Date().toISOString().split('T')[0]}
            className={errors.returnDate ? 'error' : ''}
          />
          <span className="search-form__error">{errors.returnDate || ''}</span>
        </div>

        <div className="search-form__field">
          <label htmlFor="passengers">Passengers</label>
          <input
            id="passengers"
            type="number"
            min="1"
            max="9"
            value={formData.passengers}
            onChange={(e) => handleChange('passengers', parseInt(e.target.value) || 1)}
            className={errors.passengers ? 'error' : ''}
          />
          <span className="search-form__error">{errors.passengers || ''}</span>
        </div>

        <div className="search-form__field search-form__field--button">
          <button type="submit" className="search-form__submit" disabled={loading}>
            {loading ? 'Searching...' : 'Search Flights'}
          </button>
        </div>
      </div>
    </form>
  )
}

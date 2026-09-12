import { getFutureDate } from '../utils/dateUtils'

// All mock flights depart on this date, kept relative to "today" so search
// date filters (which reject past dates) can actually produce exact matches.
const DEPARTURE_DATE = getFutureDate(3)
const NEXT_DAY_DATE = getFutureDate(4)

export interface Flight {
  id: string
  airline: string
  flightNumber: string
  departure: {
    airport: string
    airportCode: string
    city: string
    time: string
    date: string
  }
  arrival: {
    airport: string
    airportCode: string
    city: string
    time: string
    date: string
  }
  duration: string
  price: number
  currency: string
  baggage: {
    carryOn: string
    checked: string
  }
  stops: number
  aircraft?: string
}

export const mockFlights: Flight[] = [
  {
    id: 'FL001',
    airline: 'Emirates',
    flightNumber: 'EK205',
    departure: {
      airport: 'Dubai International Airport',
      airportCode: 'DXB',
      city: 'Dubai',
      time: '08:30',
      date: DEPARTURE_DATE,
    },
    arrival: {
      airport: 'Heathrow Airport',
      airportCode: 'LHR',
      city: 'London',
      time: '12:45',
      date: DEPARTURE_DATE,
    },
    duration: '7h 15m',
    price: 1250,
    currency: 'USD',
    baggage: {
      carryOn: '1 piece (7kg)',
      checked: '1 piece (23kg)',
    },
    stops: 0,
    aircraft: 'Boeing 777',
  },
  {
    id: 'FL002',
    airline: 'Qatar Airways',
    flightNumber: 'QR815',
    departure: {
      airport: 'Dubai International Airport',
      airportCode: 'DXB',
      city: 'Dubai',
      time: '14:20',
      date: DEPARTURE_DATE,
    },
    arrival: {
      airport: 'Heathrow Airport',
      airportCode: 'LHR',
      city: 'London',
      time: '19:10',
      date: DEPARTURE_DATE,
    },
    duration: '6h 50m',
    price: 1180,
    currency: 'USD',
    baggage: {
      carryOn: '1 piece (7kg)',
      checked: '2 pieces (23kg each)',
    },
    stops: 0,
    aircraft: 'Airbus A350',
  },
  {
    id: 'FL003',
    airline: 'British Airways',
    flightNumber: 'BA106',
    departure: {
      airport: 'Dubai International Airport',
      airportCode: 'DXB',
      city: 'Dubai',
      time: '22:00',
      date: DEPARTURE_DATE,
    },
    arrival: {
      airport: 'Heathrow Airport',
      airportCode: 'LHR',
      city: 'London',
      time: '02:30',
      date: NEXT_DAY_DATE,
    },
    duration: '7h 30m',
    price: 1100,
    currency: 'USD',
    baggage: {
      carryOn: '1 piece (7kg)',
      checked: '1 piece (23kg)',
    },
    stops: 0,
    aircraft: 'Boeing 787',
  },
  {
    id: 'FL004',
    airline: 'Etihad Airways',
    flightNumber: 'EY11',
    departure: {
      airport: 'Dubai International Airport',
      airportCode: 'DXB',
      city: 'Dubai',
      time: '10:15',
      date: DEPARTURE_DATE,
    },
    arrival: {
      airport: 'Heathrow Airport',
      airportCode: 'LHR',
      city: 'London',
      time: '15:45',
      date: DEPARTURE_DATE,
    },
    duration: '7h 30m',
    price: 1320,
    currency: 'USD',
    baggage: {
      carryOn: '1 piece (7kg)',
      checked: '1 piece (23kg)',
    },
    stops: 1,
    aircraft: 'Boeing 777',
  },
  {
    id: 'FL005',
    airline: 'Turkish Airlines',
    flightNumber: 'TK78',
    departure: {
      airport: 'Dubai International Airport',
      airportCode: 'DXB',
      city: 'Dubai',
      time: '06:45',
      date: DEPARTURE_DATE,
    },
    arrival: {
      airport: 'Heathrow Airport',
      airportCode: 'LHR',
      city: 'London',
      time: '14:20',
      date: DEPARTURE_DATE,
    },
    duration: '9h 35m',
    price: 950,
    currency: 'USD',
    baggage: {
      carryOn: '1 piece (8kg)',
      checked: '1 piece (23kg)',
    },
    stops: 1,
    aircraft: 'Boeing 737',
  },
  {
    id: 'FL006',
    airline: 'Lufthansa',
    flightNumber: 'LH630',
    departure: {
      airport: 'Dubai International Airport',
      airportCode: 'DXB',
      city: 'Dubai',
      time: '13:30',
      date: DEPARTURE_DATE,
    },
    arrival: {
      airport: 'Heathrow Airport',
      airportCode: 'LHR',
      city: 'London',
      time: '20:15',
      date: DEPARTURE_DATE,
    },
    duration: '8h 45m',
    price: 1080,
    currency: 'USD',
    baggage: {
      carryOn: '1 piece (8kg)',
      checked: '1 piece (23kg)',
    },
    stops: 1,
    aircraft: 'Airbus A330',
  },
  {
    id: 'FL007',
    airline: 'Air France',
    flightNumber: 'AF381',
    departure: {
      airport: 'Dubai International Airport',
      airportCode: 'DXB',
      city: 'Dubai',
      time: '01:20',
      date: DEPARTURE_DATE,
    },
    arrival: {
      airport: 'Heathrow Airport',
      airportCode: 'LHR',
      city: 'London',
      time: '09:30',
      date: DEPARTURE_DATE,
    },
    duration: '8h 10m',
    price: 1020,
    currency: 'USD',
    baggage: {
      carryOn: '1 piece (7kg)',
      checked: '1 piece (23kg)',
    },
    stops: 1,
    aircraft: 'Airbus A350',
  },
  {
    id: 'FL008',
    airline: 'Emirates',
    flightNumber: 'EK207',
    departure: {
      airport: 'Dubai International Airport',
      airportCode: 'DXB',
      city: 'Dubai',
      time: '15:45',
      date: DEPARTURE_DATE,
    },
    arrival: {
      airport: 'Heathrow Airport',
      airportCode: 'LHR',
      city: 'London',
      time: '20:00',
      date: DEPARTURE_DATE,
    },
    duration: '7h 15m',
    price: 1280,
    currency: 'USD',
    baggage: {
      carryOn: '1 piece (7kg)',
      checked: '1 piece (23kg)',
    },
    stops: 0,
    aircraft: 'Boeing 777',
  },
]

export interface Airport {
  code: string
  name: string
  city: string
  country: string
}

export const mockAirports: Airport[] = [
  { code: 'DXB', name: 'Dubai International Airport', city: 'Dubai', country: 'UAE' },
  { code: 'LHR', name: 'Heathrow Airport', city: 'London', country: 'UK' },
  { code: 'JFK', name: 'John F. Kennedy International Airport', city: 'New York', country: 'USA' },
  { code: 'CDG', name: 'Charles de Gaulle Airport', city: 'Paris', country: 'France' },
  { code: 'SYD', name: 'Sydney Airport', city: 'Sydney', country: 'Australia' },
  { code: 'NRT', name: 'Narita International Airport', city: 'Tokyo', country: 'Japan' },
  { code: 'SIN', name: 'Changi Airport', city: 'Singapore', country: 'Singapore' },
]

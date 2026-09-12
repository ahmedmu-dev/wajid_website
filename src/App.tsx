import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { FlightSearchPage } from './pages/FlightSearchPage'
import { BookingPage } from './pages/BookingPage'
import { BookingConfirmationPage } from './pages/BookingConfirmationPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FlightSearchPage />} />
        <Route path="/flight/:flightId" element={<BookingPage />} />
        <Route path="/booking-confirmation/:bookingId" element={<BookingConfirmationPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

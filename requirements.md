# ✈️ Wajid – Flight Booking Website Requirements

## 1. Project Overview
Wajid is a web-based flight search and booking platform that allows users to:
- Browse available flight trips
- Preview flight details and prices
- Select a flight and submit booking information

The website focuses on **simplicity, clarity, and speed**, inspired by **Trip.com**, but with a limited and focused scope.

---

## 2. Scope & Pages

The website will consist of **2–3 main pages only**:

1. **Flight Search & Results Page**
2. **Flight Details / Booking Page**
3. *(Optional)* Booking Confirmation Page

No user authentication is required in the first version.

---

## 3. Core Features

### 3.1 Flight Search
Users can search for flights by:
- Departure location
- Destination
- Departure date
- Return date (optional)
- Number of passengers

Search results should display:
- Airline name
- Flight number
- Departure & arrival times
- Duration
- Price
- Currency
- Basic baggage info (if available)

---

### 3.2 Flight Results Listing
- Display results in a **card-based layout**
- Allow sorting by:
  - Price
  - Duration
- Clicking a flight opens the booking page

---

### 3.3 Flight Booking
When a user selects a flight, they must provide:

#### Passenger Information
- Full name (as in passport)
- Date of birth
- Nationality
- Gender

#### Passport Information
- Passport number
- Issuing country
- Expiry date

#### Contact Information
- Email address
- Phone number

Form requirements:
- Client-side validation
- Clear error messages
- No submission if required fields are missing

---

### 3.4 Booking Submission
- On submit:
  - Validate data
  - Send booking request using an API call
- Show:
  - Loading state
  - Success or error message
- On success:
  - Navigate to confirmation page (optional)

---

## 4. Mock Data & API Strategy (MANDATORY)

### 4.1 Mock Data Usage
- The application must use **mock flight data** and **mock booking responses**
- No real backend or third-party API is required in this phase

### 4.2 API Calls (MANDATORY)
- API calls must still be implemented using HTTP requests
- Use:
  - Mock API endpoints
  - OR local mock services that simulate real API behavior
- API integration must be written in a way that allows:
  - Easy replacement of mock endpoints with real APIs later
  - No changes required in UI components

### 4.3 Service Layer
- All API logic must live in a dedicated **services layer**
- UI components must never directly access mock data
- Switching to real APIs should only require changing:
  - Base URL
  - Service implementation

---

## 5. UI / UX Requirements

### 5.1 Design Guidelines
- UI inspired by **Trip.com**
- Clean, modern, and professional
- Focus on readability and ease of use
- Responsive design (mobile, tablet, desktop)

### 5.2 UX Principles
- Minimal steps to book
- Clear call-to-action buttons
- Visible pricing at all times
- Consistent spacing and typography

---

## 6. Technical Requirements

### 6.1 Frontend Stack
- **React**
- Modern JavaScript (ES6+)
- Functional components only
- Hooks-based architecture

Suggested libraries:
- React Router (navigation)
- Axios or Fetch API (HTTP requests)
- React Hook Form or Formik (forms)

---

### 6.2 Architecture & Best Practices
- Component-based architecture
- Clear separation of concerns:
  - UI components
  - Business logic
  - API services
- No business logic inside JSX
- Reusable components where applicable

Suggested structure:

src/
├── components/
├── pages/
├── services/
│   ├── apiClient.ts
│   ├── flightService.ts
│   └── bookingService.ts
├── hooks/
├── mocks/
│   ├── flights.mock.ts
│   └── booking.mock.ts
├── utils/
├── styles/
└── App.tsx / App.jsx

---

## 7. State Management
- Local component state for forms
- Lifted state where necessary
- Avoid unnecessary global state
- Use memoization where beneficial

---

## 8. Error Handling & Loading States
- Handle:
  - Loading states for all API calls
  - Empty search results
  - API failures (mocked)
- User-friendly error messages only

---

## 9. Performance & Code Quality
- Fast initial load
- Avoid unnecessary re-renders
- Meaningful variable and component names
- Small, focused components
- ESLint + Prettier configuration

---

## 10. Security & Data Handling
- Validate all user input
- Do not log sensitive data (passport info)
- Prepare for backend-side validation later

---

## 11. Future Enhancements (Out of Scope)
- Real backend integration
- Payment gateway
- User accounts
- Multi-language support

---

## 12. Deliverables
- Fully functional React website using mock APIs
- API service layer ready for real backend
- Clean, maintainable, production-ready codebase
- Responsive UI
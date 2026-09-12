# Wajid - Flight Booking Website

A modern, responsive flight search and booking platform built with React and TypeScript.

## Features

- ✈️ Flight search with filters (departure, destination, dates, passengers)
- 📋 Flight results with sorting (price, duration)
- 🎫 Detailed flight information
- 📝 Booking form with comprehensive validation
- ✅ Booking confirmation page
- 📱 Fully responsive design

## Tech Stack

- **React 18** with TypeScript
- **Vite** for build tooling
- **React Router** for navigation
- **React Hook Form** for form management
- **Axios** for HTTP requests
- **CSS** for styling

## Architecture

The application follows a clean architecture pattern with clear separation of concerns:

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── services/      # API service layer
│   ├── apiClient.ts
│   ├── flightService.ts
│   └── bookingService.ts
├── mocks/         # Mock data (not imported by components)
├── hooks/         # Custom React hooks
├── utils/         # Utility functions
└── styles/        # Global styles
```

### Key Architecture Principles

1. **Service Layer**: All API calls go through dedicated services
2. **Mock API**: Uses HTTP requests (Axios) with mock adapter
3. **No Direct Mock Imports**: Components never import mock data directly
4. **Easy Backend Integration**: Switch to real API by changing environment variables

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Deployment (Vercel)

This is a static Vite SPA — no server-side code or environment variables are required to deploy it.

1. From the project root: `vercel` for a preview deployment, or `vercel --prod` for production (the Vercel CLI auto-detects the Vite framework preset).
2. `vercel.json` adds a catch-all rewrite to `/index.html` so client-side routes (`/flight/:flightId`, `/booking-confirmation/:bookingId`) resolve correctly on a direct load or page refresh, since React Router's `BrowserRouter` relies on the server returning `index.html` for unknown paths.
3. No environment variables are needed — `VITE_USE_MOCK_API` defaults to `true` and the app never calls a real backend. If you later point it at a real API, set `VITE_USE_MOCK_API=false` and `VITE_API_BASE_URL` in the Vercel project's environment variables.

## Mock API

The application uses a mock API adapter that intercepts HTTP requests. To switch to a real backend:

1. Set `VITE_USE_MOCK_API=false` in your `.env` file
2. Set `VITE_API_BASE_URL` to your backend URL
3. Update service implementations if needed

## Project Structure

- **Pages**: FlightSearchPage, BookingPage, BookingConfirmationPage
- **Components**: FlightCard, SearchForm, LoadingSpinner, ErrorMessage
- **Services**: API client and service layers for flights and bookings
- **Hooks**: Custom hooks for flight search, flight details, and booking

## Code Quality

- ESLint configured for code quality
- Prettier for code formatting
- TypeScript for type safety
- Functional components only
- Hooks-based architecture

## License

MIT

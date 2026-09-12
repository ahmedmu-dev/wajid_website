# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at http://localhost:3000 (Vite, opens browser automatically)
npm run build     # Type-check (tsc) then production build via Vite
npm run preview   # Preview the production build locally
npm run lint      # ESLint over src/**/*.{ts,tsx}, zero warnings allowed (--max-warnings 0)
npm run format    # Prettier --write over src/**/*.{ts,tsx,css}
```

There is no test suite/runner configured in this project.

## Architecture

Wajid is a flight search & booking single-page app (React 18 + TypeScript + Vite). It has no real backend — see `requirements.md` for full product requirements — and the entire architecture is built around one constraint: **UI components must be able to switch from mock data to a real backend with zero component changes.**

### Request flow

```
Component → hook (src/hooks) → service (src/services/*Service.ts) → apiClient → [mock adapter | real axios]
```

- **`src/services/apiClient.ts`** — a thin wrapper around axios. Every `get/post/put/delete` call checks `VITE_USE_MOCK_API` (defaults to `true` when unset) and either routes the request through the in-process mock adapter or sends it via real axios to `VITE_API_BASE_URL` (defaults to `/api`). This is the *only* place that branches on mock-vs-real.
- **`src/services/mockAdapter.ts`** — implements the axios adapter interface. Pattern-matches on `method` + URL (e.g. `GET /flights/search`, `GET /flights/:id`, `POST /bookings`) and forwards to `mockApiHandler`, returning shapes that mimic real `AxiosResponse` objects (status codes, 404s included). Requests still go through this path as real async HTTP-shaped calls (with simulated network delay) — never as direct function calls into mock data — so swapping in a real backend later requires no change to callers.
- **`src/services/mockApiHandler.ts`** — the "server-side" logic: filters/searches `mockFlights`, looks up flights by id, and processes bookings, with its own artificial delays.
- **`src/services/flightService.ts` / `bookingService.ts`** — the public API domain code should call. Each method calls `apiClient`, unwraps the response, and rethrows on error. **UI components must never import `apiClient`, the mock adapter, or `src/mocks/*` directly — always go through these services (or the hooks that wrap them).**
- **`src/mocks/*.mock.ts`** — mock fixture data and types (e.g. `Flight`, `BookingRequest`, `BookingResponse`). Domain types are currently defined alongside the mock data rather than in a separate types module.
- **`src/hooks/*`** — one hook per async use case (`useFlightSearch`, `useFlight`, `useBooking`), each owning `loading`/`error`/data state and calling the corresponding service. Pages consume these hooks rather than calling services directly.

### Switching to a real backend

Set `VITE_USE_MOCK_API=false` and `VITE_API_BASE_URL` to the real API origin (env vars, not currently present as a checked-in `.env`). No component or hook code should need to change; at most the `services/*Service.ts` implementations are adjusted if the real API's request/response shape differs from the mock's.

### Routing / pages

`src/App.tsx` defines three routes (`react-router-dom`):
- `/` → `FlightSearchPage`
- `/flight/:flightId` → `BookingPage`
- `/booking-confirmation/:bookingId` → `BookingConfirmationPage`

Each page has a co-located `.css` file, matching the pattern used for components in `src/components/`.

### Code style

- Functional components + hooks only (no class components).
- TypeScript `strict` mode is on, including `noUnusedLocals`/`noUnusedParameters` — the build (`tsc`) will fail on these.
- ESLint enforces `react-hooks` rules and `react-refresh/only-export-components`, with zero warnings allowed in `npm run lint`.

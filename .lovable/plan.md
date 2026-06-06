# VitalGuard AI — Build Plan

A premium, futuristic healthcare monitoring & early-warning web app. Dark mode, glassmorphism, medical blue/cyan/purple accents, Stripe/Linear/Vercel-grade polish. **Front-end only with realistic mock data** (no backend), and **browser-side simulated real-time vitals**.

## Approach
First pass focuses on the **core flow** (landing, auth, main dashboard, live monitoring, patient details, AI center, alerts) built to a high finish. Remaining pages (doctor, nurse, analytics, notifications, settings) follow in a second pass, reusing the same shell and components.

## Design System (set up first)
- Rework `src/styles.css` tokens: deep navy/black backgrounds, medical blue + cyan + purple accents, success/warning/critical status colors, all in `oklch`. Default to dark.
- Add tokens for glassmorphism (translucent card bg, blur), gradient borders, glow shadows, and gradient utilities.
- Add `motion` (Motion for React) for page transitions, hover, and float animations. Recharts and lucide-react are already installed.
- Custom utilities: `.glass-card`, `.gradient-border`, `.glow`, animated ECG/pulse keyframes, floating-card animation.

## Mock Data + Simulation Engine
- `src/lib/mock/patients.ts` — ~12 patients (name, ID, age, room, baseline vitals, status, risk score, notes, lab results, treatment history, alerts).
- `src/lib/simulation.ts` + `useLiveVitals` hook — updates vitals every 2–5s with realistic drift (HR ±2–5 bpm, SpO₂ ±1%, Temp ±0.1–0.3°C, BP small variation, RR ±1–2). Critical patients occasionally trend worse, flipping status (Stable→Warning→Critical) and emitting alerts. Smooth number transitions + live timestamps. Shared store via React context so all pages stay in sync.

## Shared Layout
- `AppShell` with glassmorphic sidebar (nav to all sections), top bar (search, notifications bell, profile), and animated route transitions via `<Outlet />`.
- Reusable: `MetricCard`, `VitalStat` (with progress + color status), `EcgLine` (animated SVG), `StatusBadge`, `RiskGauge` (circular), `AlertCard`, loading skeletons, empty states.

## Routes (file-based, `src/routes/`)
Core flow (pass 1):
- `index.tsx` — Landing: hero (headline, description, "View Dashboard" + "Request Demo"), animated data-viz background, floating dashboard elements, Features / How It Works / Benefits / Testimonials / Footer.
- `login.tsx`, `register.tsx`, `forgot-password.tsx` — card-based auth; register has Doctor/Nurse/Admin role selector. UI-only (navigates to dashboard on submit).
- `dashboard.tsx` — main ops dashboard: 6 metric cards (Total/Critical/Active Alerts/ICU/Avg Risk/Today's Admissions) with icons, mini charts, trend indicators, glass effect.
- `monitoring.tsx` — live patient cards: name/ID/age/room, all 5 vitals with progress + color status, live pulse/ECG, status categories, search + filter. Cards link to details.
- `patients.$patientId.tsx` — patient details: health summary, risk score, status, AI recommendation, live trend charts (HR, BP, SpO₂, Temp), timeline, alerts, nurse notes, lab results, treatment history.
- `ai-center.tsx` — AI prediction center: circular risk gauge (Low/Moderate/High), risk %, deterioration probability, confidence score, AI insights cards.
- `alerts.tsx` — alert management: critical/warning/resolved cards with patient, severity, timestamp, suggested action; Acknowledge / Resolve / Escalate actions.

Second pass:
- `doctor.tsx`, `nurse.tsx`, `analytics.tsx`, `notifications.tsx`, `settings.tsx`.

Each route gets its own `head()` metadata (title/description/og) for SEO.

## Animations & Polish
Motion page transitions, hover lift on cards, floating elements, animated ECG/pulse lines, smooth vital number transitions, loading skeletons, beautiful empty states, fully responsive (sidebar collapses to drawer on mobile).

## Technical Notes
- Stack: TanStack Start + React + TS + Tailwind v4 (tokens in `src/styles.css`) + shadcn + Recharts + Motion.
- New dependency: `motion`.
- Simulation is client-only via `useEffect` timers + context; no WebSocket/backend.
- All colors via semantic tokens — no hard-coded colors in components.

I'll start with the design system + simulation engine + shell, then build the core-flow pages, then the remaining dashboards.
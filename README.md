# Pearl Clinic

Production-ready application for Pearl Clinic (Paediatric Excellence And Respiratory Life Clinic), Kachanr City Road, Opposite Children Book House, Vijay Nagar, Jabalpur, led by Dr. Diksha Asati, MBBS, MD Pediatrics, IDPCCM and Dr. Rahul Asati, MBBS, MD Pulmonologist.

## Stack

- Next.js App Router with TypeScript
- Tailwind CSS
- Framer Motion animations
- Lucide React icons
- Radix UI primitives for dialogs, tabs and accordions
- Python FastAPI backend
- Pydantic validation
- In-memory Python persistence for appointments and TPA data

## Features Implemented

- Sticky responsive navigation with live status badge, phone CTA and booking modal
- Hero section with clinic location, dual CTAs, animated stat cards and doctor image placeholder
- Doctor profile section with Radix Tabs for qualifications, specializations and hospital affiliations
- Hospital admissions and insurance coverage cards
- Live TPA/CGHS search connected to the Python `/api/tpa-check` endpoint
- Pediatric bronchoscopy section with procedure grid and safety disclaimer
- Filterable services grid with animated cards and detail slide-over
- Three-step admission helper wizard
- Filterable, draggable parent testimonial carousel
- Accessible Radix FAQ accordion
- Contact/location section with map placeholder, clinic exterior placeholder and async appointment form
- Mobile sticky call/book action bar

## Architecture

The frontend is a Next.js SPA. The backend is FastAPI in `backend/app`.

During development, Next rewrites:

```txt
/api/:path* -> http://127.0.0.1:8000/api/:path*
```

That means frontend code can call `/api/appointments` and `/api/tpa-check` without hardcoding a backend URL.

## Python API Endpoints

### `POST /api/appointments`

Validates with Pydantic and stores an appointment request in process memory.

Required JSON body:

```json
{
  "parentName": "Parent Name",
  "childName": "Child Name",
  "childAge": "4 years",
  "phone": "+917049451111",
  "date": "2026-08-10",
  "serviceType": "Pediatric OPD"
}
```

Allowed `serviceType` values:

- `Pediatric OPD`
- `Critical Care`
- `Vaccination`
- `Bronchoscopy`
- `Emergency`

Returns `201` with confirmation JSON when valid.

### `GET /api/tpa-check?query=`

Searches supported insurance, TPA, CGHS and government scheme records.

Example:

```txt
/api/tpa-check?query=star
```

Returns matched providers with eligibility status and document guidance.

## Getting Started

Create or use a Python virtual environment, then install backend dependencies:

```bash
pip install -r requirements.txt
```

Install frontend dependencies:

```bash
npm install
```

Run the Python backend:

```bash
npm run backend:dev
```

Run the Next.js frontend in a second terminal:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

Production frontend build:

```bash
npm run build
npm run start
```

Quality checks:

```bash
npm run lint
npm run typecheck
```

## Notes

- Appointment and TPA data currently use process-local in-memory persistence, suitable for a production-ready demo or single-instance deployment.
- For multi-instance production hosting, replace `backend/app/store.py` with SQLite/PostgreSQL while keeping the existing Pydantic models and API route contracts.
- Photo and map areas are intentionally marked with placeholders so final clinic-approved assets can be dropped in without changing layout.

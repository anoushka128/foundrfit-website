# GutTrigger

GutTrigger is a mobile-first wellness app for spotting likely food triggers behind digestive discomfort and allergy-like reactions. This repository includes a polished Next.js UI, a working local demo mode, Supabase-ready auth and schema wiring, sample data, and a modular trigger scoring engine designed to stay cautious and evidence-based.

## Recommended stack

- Next.js App Router with TypeScript: fast product iteration, great routing primitives, server/client flexibility, and easy Vercel deployment.
- Tailwind CSS: quick refinement of a premium mobile UI without overbuilding a component system too early.
- Supabase: simple auth, Postgres, storage for meal photos, and row-level security in one place.
- Recharts: lightweight trend charts for symptom severity and insight visualizations.

Prisma is not required for the first version because Supabase already gives us Postgres plus auth, and keeping the stack slimmer improves shipping speed. If the data model becomes more complex or you want more typed server-side querying, Prisma can be added later.

## Architecture

The app is organized around four layers:

1. `app/`
   Route-based pages for authentication, onboarding, dashboard, logging, insights, timeline, and safety.
2. `components/`
   Reusable mobile-first UI sections like cards, bottom nav, forms, charts, and trigger summaries.
3. `lib/`
   Shared types, mock seed data, utility helpers, Supabase client setup, and the trigger analysis engine.
4. `supabase/`
   SQL schema for auth-connected tables, onboarding preferences, tracking data, reminders, and analysis results.

## Core pages

- `/login`: email and password login
- `/signup`: account creation
- `/onboarding`: initial preference capture
- `/`: dashboard with quick actions, cards, and trend chart
- `/log`: fast logging hub for meals, symptoms, and check-ins
- `/check-in`: lightweight current-state logging
- `/insights`: trigger analysis, summary cards, and scoring table
- `/timeline`: chronological view of meals, symptoms, bowel movement, and check-ins
- `/safety`: safety disclaimers and serious symptom guardrails

## What is functional now

- working signup, login, and onboarding flows
- local demo persistence with `localStorage`
- optional Supabase auth and CRUD when environment keys are configured
- live meal, symptom, and check-in logging
- live dashboard, timeline, reminders, and insights that update from saved entries
- production build and TypeScript verification

## Component map

- Dashboard: hero, today overview, quick actions, weekly summary, trigger cards, reminders card
- Logging: meal form, symptom form, check-in form
- Insights: AI-style summary cards, reaction split, category pattern groups, trigger table, severity chart
- Navigation: bottom nav and floating quick-log button
- UI primitives: button, card, chip, input, progress

## Trigger scoring model

The analysis engine in [`lib/analysis.ts`](/Users/anoushkabharwani/Documents/Playground/lib/analysis.ts) calculates:

- exposures
- symptom-linked exposures
- average symptom severity
- consistency ratio
- time-pattern score
- confidence score
- weighted suspicion score
- final classification

### Current weighting

- Consistency: `45%`
- Average severity: `25%`
- Time delay pattern: `15%`
- Confidence based on repeat exposures: `15%`

### Classification

- `High suspicion`
- `Moderate suspicion`
- `Low suspicion`
- `Probably safe`
- `Not enough data`

The model is intentionally cautious:

- one bad meal should not dominate classification
- foods with fewer than 2 exposures are marked `Not enough data`
- late symptoms are weighted less strongly than immediate or 1 to 4 hour patterns
- language stays observational rather than diagnostic

## Database schema

The SQL schema lives at [`supabase/schema.sql`](/Users/anoushkabharwani/Documents/Playground/supabase/schema.sql) and includes:

- `profiles`
- `onboarding_preferences`
- `meals`
- `meal_foods`
- `meal_ingredients`
- `symptoms`
- `check_ins`
- `reminders`
- `analysis_results`

The schema includes row-level security policies for user-owned records.

## Seed data

Demo data lives in [`lib/mock-data.ts`](/Users/anoushkabharwani/Documents/Playground/lib/mock-data.ts) and powers:

- realistic meal logs
- symptom events with timing buckets
- check-ins
- reminders
- charts
- analysis summaries

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env.local
```

3. Add your Supabase values to `.env.local`.

4. Start the app:

```bash
npm run dev
```

5. Open `http://localhost:3000`.

For a faster, less laggy local experience after dependencies are installed, use the production preview server:

```bash
npm run build
npm run start
```

## Supabase setup

1. Create a Supabase project.
2. Enable email/password auth.
3. Run the SQL from [`supabase/schema.sql`](/Users/anoushkabharwani/Documents/Playground/supabase/schema.sql) in the Supabase SQL editor.
4. Create a storage bucket for meal photos if you want uploads in v1.
5. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to `.env.local`.

## Vercel deployment

1. Push this repo to GitHub.
2. Import the project into Vercel.
3. Add the same Supabase environment variables in Vercel.
4. Deploy.

If you deploy without Supabase environment variables, the app still works in demo mode with local browser persistence. With Supabase configured, auth and CRUD use your project tables.

## Future improvements

- protected routes and server-side session enforcement
- persistent meal photo upload flow
- food search and autocomplete
- elimination and reintroduction experiment mode
- ingredient category auto-tagging
- AI-assisted summary generation through an LLM endpoint
- PDF export for clinician visits
- push notifications for reminders
- bowel movement detail capture with Bristol stool scale
